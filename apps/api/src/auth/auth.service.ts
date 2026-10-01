import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import bcrypt from "bcryptjs";
import { decodeJwt, jwtVerify, SignJWT } from "jose";
import type { MeResponseDto, UserSummaryDto } from "./dto/auth-response.dto";
import type { RefreshToken } from "./entities/refresh-token.entity";
import type { User } from "./entities/user.entity";
import { RefreshTokenRepository } from "./repositories/refresh-token.repository";
import { SessionRepository } from "./repositories/session.repository";
import { UserRepository } from "./repositories/user.repository";
import {
  accessTokenTtlSeconds,
  refreshTokenTtlSeconds,
  type TokenPair,
} from "./token-config";

export type AuthenticatedUser = UserSummaryDto;

type Session = { user: UserSummaryDto; tokens: TokenPair };

const REFRESH_GRACE_MS = 10_000;

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UserRepository,
    private readonly refreshTokens: RefreshTokenRepository,
    private readonly sessions: SessionRepository,
  ) {}

  async register(input: {
    name: string;
    email: string;
    password: string;
  }): Promise<Session> {
    if (await this.users.findByEmail(input.email)) {
      throw new ConflictException("An account with this email already exists");
    }

    const user = await this.users.create({
      name: input.name,
      email: input.email,
      passwordHash: await bcrypt.hash(input.password, 10),
    });

    return {
      user: this.toSummary(user),
      tokens: await this.createExclusiveSession(user),
    };
  }

  async login(email: string, password: string): Promise<Session> {
    const user = await this.users.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException("Invalid email or password");
    }

    return {
      user: this.toSummary(user),
      tokens: await this.createExclusiveSession(user),
    };
  }

  async refresh(presentedToken: string): Promise<Session> {
    const record = await this.refreshTokens.findByToken(presentedToken);
    if (!record) throw new UnauthorizedException("Invalid refresh token");
    return this.rotateRefreshToken(record);
  }

  async logout(refreshToken?: string): Promise<void> {
    if (!refreshToken) return;
    const record = await this.refreshTokens.findByToken(refreshToken);
    if (record) {
      await this.sessions.revokeSession(record.userId, record.familyId);
    }
  }

  async authenticate(accessToken: string): Promise<AuthenticatedUser> {
    const { subject, sessionId } = await this.verifyAccessToken(accessToken);

    const user = await this.users.findById(subject);
    if (!user) throw new UnauthorizedException("User not found");
    if (user.sessionId !== sessionId) {
      throw new UnauthorizedException({
        error: "This session was replaced by a login on another device",
        code: "SESSION_REPLACED",
      });
    }

    return this.toSummary(user);
  }

  describeSession(user: AuthenticatedUser, accessToken: string): MeResponseDto {
    const { exp } = decodeJwt(accessToken);
    return {
      user,
      accessTokenExpiresAt: exp ? new Date(exp * 1000).toISOString() : null,
    };
  }

  private toSummary(user: User): UserSummaryDto {
    return { id: user.id, name: user.name, email: user.email };
  }

  private async verifyAccessToken(accessToken: string) {
    let subject: string | undefined;
    let sessionId: string | undefined;
    try {
      const { payload } = await jwtVerify(accessToken, this.jwtSecret());
      subject = payload.sub;
      sessionId = typeof payload.sid === "string" ? payload.sid : undefined;
    } catch {
      throw new UnauthorizedException("Access token missing or expired");
    }
    if (!subject || !sessionId) {
      throw new UnauthorizedException("Invalid access token session");
    }
    return { subject, sessionId };
  }

  private signAccessToken(user: User, sessionId: string) {
    return new SignJWT({ email: user.email, name: user.name, sid: sessionId })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(user.id)
      .setIssuedAt()
      .setExpirationTime(`${accessTokenTtlSeconds()}s`)
      .sign(this.jwtSecret());
  }

  private jwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not configured");
    return new TextEncoder().encode(secret);
  }

  private async createExclusiveSession(user: User): Promise<TokenPair> {
    const refresh = await this.sessions.startExclusiveSession(
      user.id,
      crypto.randomUUID(),
      refreshTokenTtlSeconds(),
    );
    return {
      accessToken: await this.signAccessToken(user, refresh.familyId),
      refreshToken: refresh.token,
    };
  }

  private async rotateRefreshToken(record: RefreshToken): Promise<Session> {
    if (record.used) {
      return this.resolveUsedRefreshToken(record);
    }
    if (record.expiresAt.getTime() <= Date.now()) {
      await this.sessions.revokeSession(record.userId, record.familyId);
      throw new UnauthorizedException("Refresh token expired");
    }

    const candidate = await this.refreshTokens.issue(
      record.userId,
      record.familyId,
      refreshTokenTtlSeconds(),
    );
    const claimed = await this.refreshTokens.claim(record.id, candidate.token);
    if (!claimed) {
      await this.refreshTokens.deleteById(candidate.id);
      const claimedRecord = await this.refreshTokens.findById(record.id);
      if (!claimedRecord) {
        throw new UnauthorizedException("Session is no longer active");
      }
      return this.resolveUsedRefreshToken(claimedRecord);
    }

    const user = await this.users.findById(record.userId);
    if (!user || user.sessionId !== record.familyId) {
      await this.sessions.revokeSession(record.userId, record.familyId);
      throw new UnauthorizedException("Session is no longer active");
    }

    return {
      user: this.toSummary(user),
      tokens: {
        accessToken: await this.signAccessToken(user, record.familyId),
        refreshToken: candidate.token,
      },
    };
  }

  private async resolveUsedRefreshToken(record: RefreshToken): Promise<Session> {
    const withinGrace =
      record.usedAt !== null &&
      Date.now() - record.usedAt.getTime() <= REFRESH_GRACE_MS;

    if (withinGrace && record.replacedByToken) {
      const [replacement, user] = await Promise.all([
        this.refreshTokens.findByToken(record.replacedByToken),
        this.users.findById(record.userId),
      ]);
      if (
        replacement &&
        !replacement.used &&
        replacement.expiresAt.getTime() > Date.now() &&
        user?.sessionId === record.familyId
      ) {
        return {
          user: this.toSummary(user),
          tokens: {
            accessToken: await this.signAccessToken(user, record.familyId),
            refreshToken: replacement.token,
          },
        };
      }
    }

    await this.sessions.revokeSession(record.userId, record.familyId);
    throw new UnauthorizedException({
      error: "Refresh token reuse detected; session revoked",
      code: "REUSE_DETECTED",
    });
  }
}

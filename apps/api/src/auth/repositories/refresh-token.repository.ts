import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { RefreshToken } from "../entities/refresh-token.entity";

export function newTokenValue() {
  return `${crypto.randomUUID()}.${crypto.randomUUID()}`;
}

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly tokens: Repository<RefreshToken>,
  ) {}

  findByToken(token: string): Promise<RefreshToken | null> {
    return this.tokens.findOneBy({ token });
  }

  findById(id: string): Promise<RefreshToken | null> {
    return this.tokens.findOneBy({ id });
  }

  issue(
    userId: string,
    familyId: string,
    ttlSeconds: number,
  ): Promise<RefreshToken> {
    return this.tokens.save(
      this.tokens.create({
        token: newTokenValue(),
        familyId,
        userId,
        expiresAt: new Date(Date.now() + ttlSeconds * 1000),
      }),
    );
  }

  async claim(id: string, replacedByToken: string): Promise<boolean> {
    const result = await this.tokens.update(
      { id, used: false },
      { used: true, usedAt: new Date(), replacedByToken },
    );
    return result.affected === 1;
  }

  async deleteById(id: string): Promise<void> {
    await this.tokens.delete({ id });
  }
}

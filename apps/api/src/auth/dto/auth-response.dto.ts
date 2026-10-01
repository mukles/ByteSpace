import { accessTokenTtlSeconds, type TokenPair } from "../token-config";

export class UserSummaryDto {
  id!: string;
  name!: string;
  email!: string;
}

export class AuthTokensResponseDto {
  token_type!: string;
  access_token!: string;
  refresh_token!: string;
  expires_in!: number;

  static from(tokens: TokenPair): AuthTokensResponseDto {
    return {
      token_type: "Bearer",
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      expires_in: accessTokenTtlSeconds(),
    };
  }
}

export class SessionResponseDto extends AuthTokensResponseDto {
  user!: UserSummaryDto;
}

export class MeResponseDto {
  user!: UserSummaryDto;
  accessTokenExpiresAt!: string | null;
}

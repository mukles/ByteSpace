import { decodeJwt } from "jose";
import {
  ACCESS_COOKIE,
  ACCESS_EXPIRY_SKEW_SECONDS,
  COOKIE_OPTIONS,
  REFRESH_COOKIE,
  REFRESH_COOKIE_MAX_AGE,
} from "./constants";
import type { AuthSession, AuthTokens, AuthUser } from "./types";

interface CookieWriter {
  set(name: string, value: string, options?: Record<string, unknown>): unknown;
}

interface SessionPayload {
  user?: AuthUser;
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
}

export function apiUrl(path: string) {
  const base = process.env.API_BASE_URL;
  if (!base) throw new Error("API_BASE_URL is not configured");
  return `${base.replace(/\/$/, "")}${path}`;
}

export function readSession(payload: unknown): AuthSession | null {
  const body = payload as SessionPayload | null;
  if (!body?.user || !body.access_token || !body.refresh_token) return null;
  return {
    user: body.user,
    tokens: {
      accessToken: body.access_token,
      refreshToken: body.refresh_token,
      expiresIn: body.expires_in ?? 0,
    },
  };
}

export function isAccessTokenFresh(token: string | undefined) {
  if (!token) return false;
  try {
    const { exp } = decodeJwt(token);
    return (
      typeof exp === "number" &&
      exp - ACCESS_EXPIRY_SKEW_SECONDS > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}

export async function rotateTokens(
  refreshToken: string,
): Promise<AuthSession | null> {
  try {
    const response = await fetch(apiUrl("/auth/refresh"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
      cache: "no-store",
    });
    if (!response.ok) return null;
    return readSession(await response.json());
  } catch {
    return null;
  }
}

export function setAuthCookies(cookies: CookieWriter, tokens: AuthTokens) {
  cookies.set(ACCESS_COOKIE, tokens.accessToken, {
    ...COOKIE_OPTIONS,
    ...(tokens.expiresIn ? { maxAge: tokens.expiresIn } : {}),
  });
  cookies.set(REFRESH_COOKIE, tokens.refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: REFRESH_COOKIE_MAX_AGE,
  });
}

export function clearAuthCookies(cookies: CookieWriter) {
  cookies.set(ACCESS_COOKIE, "", { ...COOKIE_OPTIONS, maxAge: 0 });
  cookies.set(REFRESH_COOKIE, "", { ...COOKIE_OPTIONS, maxAge: 0 });
}

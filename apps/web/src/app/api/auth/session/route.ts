import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/lib/auth/constants";
import {
  apiUrl,
  clearAuthCookies,
  rotateTokens,
  setAuthCookies,
} from "@/lib/auth/session";
import type { AuthUser } from "@/lib/auth/types";

async function fetchUser(accessToken: string): Promise<AuthUser | null> {
  try {
    const response = await fetch(apiUrl("/auth/me"), {
      headers: { authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
    if (!response.ok) return null;
    const body = (await response.json()) as { user?: AuthUser };
    return body.user ?? null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  const user = accessToken ? await fetchUser(accessToken) : null;
  if (user) return NextResponse.json({ user });

  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  const session = refreshToken ? await rotateTokens(refreshToken) : null;
  const response = NextResponse.json({ user: session?.user ?? null });

  if (session) setAuthCookies(response.cookies, session.tokens);
  else if (accessToken || refreshToken) clearAuthCookies(response.cookies);
  return response;
}

import { NextResponse, type NextRequest } from "next/server";
import {
  ACCESS_COOKIE,
  AUTH_ROUTES,
  REDIRECT_PARAM,
  REFRESH_COOKIE,
  safeRedirect,
} from "@/lib/auth/constants";
import {
  clearAuthCookies,
  isAccessTokenFresh,
  rotateTokens,
  setAuthCookies,
} from "@/lib/auth/session";

function signedInRedirect(request: NextRequest) {
  const destination = safeRedirect(
    request.nextUrl.searchParams.get(REDIRECT_PARAM),
  );
  return NextResponse.redirect(new URL(destination, request.url));
}

export async function proxy(request: NextRequest) {
  const isAuthRoute = AUTH_ROUTES.includes(request.nextUrl.pathname);

  if (isAccessTokenFresh(request.cookies.get(ACCESS_COOKIE)?.value)) {
    return isAuthRoute ? signedInRedirect(request) : NextResponse.next();
  }

  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) return NextResponse.next();

  const session = await rotateTokens(refreshToken);
  if (!session) {
    const response = NextResponse.next();
    clearAuthCookies(response.cookies);
    return response;
  }

  if (isAuthRoute) {
    const response = signedInRedirect(request);
    setAuthCookies(response.cookies, session.tokens);
    return response;
  }

  request.cookies.set(ACCESS_COOKIE, session.tokens.accessToken);
  request.cookies.set(REFRESH_COOKIE, session.tokens.refreshToken);
  const response = NextResponse.next({ request: { headers: request.headers } });
  setAuthCookies(response.cookies, session.tokens);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|fonts|.*\\..*).*)"],
};

export const ACCESS_COOKIE = "access_token";
export const REFRESH_COOKIE = "refresh_token";

export const ACCESS_EXPIRY_SKEW_SECONDS = 10;
export const REFRESH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const REDIRECT_PARAM = "from";
export const AUTH_ROUTES = ["/login", "/signup"];

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export function safeRedirect(value: unknown, fallback = "/") {
  return typeof value === "string" &&
    value.startsWith("/") &&
    !value.startsWith("//")
    ? value
    : fallback;
}

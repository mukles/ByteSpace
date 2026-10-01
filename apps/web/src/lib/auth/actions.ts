"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { REFRESH_COOKIE, safeRedirect } from "@/lib/auth/constants";
import {
  apiUrl,
  clearAuthCookies,
  readSession,
  setAuthCookies,
} from "@/lib/auth/session";

export interface AuthFormState {
  error?: string;
  values?: Record<string, string>;
}

type Endpoint = "/auth/login" | "/auth/register";

const FIELDS: Record<Endpoint, string[]> = {
  "/auth/login": ["email", "password"],
  "/auth/register": ["name", "email", "password"],
};

function errorMessage(payload: unknown, fallback: string) {
  const message = (payload as { message?: unknown } | null)?.message;
  if (Array.isArray(message) && typeof message[0] === "string") {
    return message[0];
  }
  return typeof message === "string" ? message : fallback;
}

async function authenticate(
  endpoint: Endpoint,
  formData: FormData,
): Promise<AuthFormState> {
  const body = Object.fromEntries(
    FIELDS[endpoint].map((name) => [name, String(formData.get(name) ?? "")]),
  );
  const values = { ...body };
  delete values.password;

  let response: Response;
  try {
    response = await fetch(apiUrl(endpoint), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    return { error: "We couldn't reach the server. Please try again.", values };
  }

  const payload: unknown = await response.json().catch(() => null);
  const session = response.ok ? readSession(payload) : null;
  if (!session) {
    return {
      error: errorMessage(payload, "Something went wrong. Please try again."),
      values,
    };
  }

  setAuthCookies(await cookies(), session.tokens);
  redirect(safeRedirect(formData.get("redirectTo")));
}

export async function login(_state: AuthFormState, formData: FormData) {
  return authenticate("/auth/login", formData);
}

export async function register(_state: AuthFormState, formData: FormData) {
  return authenticate("/auth/register", formData);
}

export async function logout() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;

  if (refreshToken) {
    await fetch(apiUrl("/auth/logout"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
      cache: "no-store",
    }).catch(() => null);
  }

  clearAuthCookies(cookieStore);
}

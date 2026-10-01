"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { logout } from "@/lib/auth/actions";
import type { AuthUser } from "@/lib/auth/types";
import { cn } from "@/lib/utils";

type SessionState =
  | { status: "loading" }
  | { status: "signed-out" }
  | { status: "signed-in"; user: AuthUser };

const listeners = new Set<(session: SessionState) => void>();

function broadcast(session: SessionState) {
  listeners.forEach((listener) => listener(session));
}

function useSession() {
  const [session, setSession] = useState<SessionState>({ status: "loading" });

  useEffect(() => {
    let active = true;
    listeners.add(setSession);
    fetch("/api/auth/session", { cache: "no-store" })
      .then((response) => response.json() as Promise<{ user: AuthUser | null }>)
      .catch(() => ({ user: null }))
      .then(({ user }) => {
        if (!active) return;
        setSession(
          user ? { status: "signed-in", user } : { status: "signed-out" },
        );
      });
    return () => {
      active = false;
      listeners.delete(setSession);
    };
  }, []);

  return session;
}

interface AuthNavProps {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
}

export function AuthNav({ variant, onNavigate }: AuthNavProps) {
  const session = useSession();
  const [pending, startTransition] = useTransition();
  const isDesktop = variant === "desktop";

  function handleLogout() {
    startTransition(async () => {
      await logout();
      broadcast({ status: "signed-out" });
      onNavigate?.();
    });
  }

  if (session.status === "signed-in") {
    return (
      <>
        <span
          title={session.user.email}
          className="max-w-40 truncate text-base leading-6 font-medium"
        >
          {session.user.name}
        </span>
        <button
          type="button"
          onClick={handleLogout}
          disabled={pending}
          className={cn(
            "cursor-pointer text-base leading-6 disabled:cursor-wait disabled:opacity-70",
            isDesktop
              ? "hover:text-secondary"
              : "rounded-[24px] bg-secondary px-6 py-2 font-medium text-shuttle-gray-950 hover:bg-secondary-hover",
          )}
        >
          Sign Out
        </button>
      </>
    );
  }

  return (
    <div
      aria-busy={session.status === "loading"}
      className={cn(
        "contents",
        session.status === "loading" && "[&>a]:invisible",
      )}
    >
      <Link
        href="/login"
        onClick={onNavigate}
        className={cn("text-base", isDesktop && "leading-6 hover:text-secondary")}
      >
        Sign In
      </Link>
      <Link
        href="/signup"
        onClick={onNavigate}
        className={cn(
          "text-base",
          isDesktop
            ? "leading-6 hover:text-secondary"
            : "rounded-[24px] bg-secondary px-6 py-2 font-medium text-shuttle-gray-950 hover:bg-secondary-hover",
        )}
      >
        Join Us
      </Link>
    </div>
  );
}

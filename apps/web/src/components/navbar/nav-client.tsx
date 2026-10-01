"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types/content";
import { AuthNav } from "./auth-nav";

interface NavClientProps {
  links: NavLink[];
}

function useIsActive() {
  const pathname = usePathname();
  return (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));
}

export function NavLinks({ links }: NavClientProps) {
  const isActive = useIsActive();

  return (
    <nav
      aria-label="Primary navigation"
      className="hidden items-center gap-6 md:flex"
    >
      {links.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          aria-current={isActive(href) ? "page" : undefined}
          className={cn(
            "text-base transition-colors hover:text-secondary",
            isActive(href) ? "leading-[1.2] font-medium" : "leading-[1.6]",
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function MobileMenu({ links }: NavClientProps) {
  const [open, setOpen] = useState(false);
  const isActive = useIsActive();

  return (
    <div className="justify-self-end md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
        className="p-2"
      >
        <span
          className={cn(
            "mb-1.5 block h-0.5 w-6 origin-center bg-current transition-transform",
            open && "translate-y-2 rotate-45",
          )}
        />
        <span
          className={cn(
            "mb-1.5 block h-0.5 w-6 bg-current transition-opacity",
            open && "opacity-0",
          )}
        />
        <span
          className={cn(
            "block h-0.5 w-6 origin-center bg-current transition-transform",
            open && "-translate-y-2 -rotate-45",
          )}
        />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full flex flex-col gap-2 border-t border-white/10 bg-primary px-4 pt-2 pb-6">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={isActive(href) ? "page" : undefined}
              className={cn(
                "border-b border-white/10 py-3 text-base",
                isActive(href) ? "font-medium" : "text-shuttle-gray-100",
              )}
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center gap-4 pt-4">
            <AuthNav variant="mobile" onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

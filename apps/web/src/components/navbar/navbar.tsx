"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { NavLink } from "@/types/content";
import { AuthNav } from "./auth-nav";
import { MobileMenu, NavLinks } from "./nav-client";

export function Navbar({ links }: { links: NavLink[] }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 180);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="group/header fixed inset-x-0 top-0 z-50 text-shuttle-gray-50"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-y-full bg-primary/90 shadow-lg shadow-primary/20 backdrop-blur-md transition-transform duration-300 ease-out group-data-scrolled/header:translate-y-0"
      />
      <div className="relative mx-auto grid h-20 max-w-[1232px] grid-cols-[1fr_auto] items-center px-4 md:grid-cols-[1fr_auto_1fr] transition-[height] duration-300 ease-out lg:h-[120px] lg:group-data-scrolled/header:h-20">
        <Link
          href="/"
          aria-label="ByteSpace home"
          className="flex items-center gap-2 justify-self-start"
        >
          <Image
            src="/images/hero/logo.svg"
            alt=""
            width={28.875}
            height={31.5}
          />
          <span className="font-display text-2xl font-bold">ByteSpace</span>
        </Link>

        <NavLinks links={links} />

        <div className="hidden items-center gap-6 justify-self-end md:flex">
          <AuthNav variant="desktop" />
          <Link href="/cart" aria-label="Cart" className="hover:opacity-80">
            <Image src="/images/hero/bag.svg" alt="" width={24} height={24} />
          </Link>
        </div>

        <MobileMenu links={links} />
      </div>
    </header>
  );
}

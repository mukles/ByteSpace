import Image from "next/image";
import Link from "next/link";
import { getNavLinks } from "@/lib/content";
import { AuthNav } from "./auth-nav";
import { MobileMenu, NavLinks } from "./nav-client";

export async function Navbar() {
  const navLinks = getNavLinks();

  return (
    <header className="relative z-50 bg-primary text-shuttle-gray-50">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero/grid.svg"
          alt=""
          width={1442}
          height={1026}
          className="absolute top-0 left-1/2 max-w-none -translate-x-1/2"
        />
      </div>
      <div className="relative mx-auto grid h-20 max-w-[1232px] grid-cols-[1fr_auto] items-center px-4 md:grid-cols-[1fr_auto_1fr] lg:h-[120px]">
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

        <NavLinks links={navLinks} />

        <div className="hidden items-center gap-6 justify-self-end md:flex">
          <AuthNav variant="desktop" />
          <Link href="/cart" aria-label="Cart" className="hover:opacity-80">
            <Image src="/images/hero/bag.svg" alt="" width={24} height={24} />
          </Link>
        </div>

        <MobileMenu links={navLinks} />
      </div>
    </header>
  );
}

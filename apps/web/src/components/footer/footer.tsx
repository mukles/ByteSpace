import Image from "next/image";
import Link from "next/link";
import { readMd } from "@/lib/content";
import type { FooterData } from "@/types/content";
import { NewsletterForm } from "./newsletter-form";

export function Footer() {
  const { data } = readMd<FooterData>("footer");

  return (
    <footer className="border-t border-shuttle-gray-200 bg-white text-shuttle-gray-950">
      <div className="mx-auto max-w-[1232px] px-4 pt-14 pb-10 lg:pt-[71px] lg:pb-[54px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-[92px]">
          <div className="flex max-w-[528px] flex-col gap-8 lg:gap-[45px]">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                aria-label="ByteSpace home"
                className="flex items-center gap-2 self-start"
              >
                <Image
                  src="/images/hero/logo.svg"
                  alt=""
                  width={28.875}
                  height={31.5}
                />
                <span className="font-display text-2xl font-bold">
                  ByteSpace
                </span>
              </Link>
              <p className="text-sm leading-[1.6]">{data.tagline}</p>
            </div>
            <NewsletterForm {...data.newsletter} />
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 lg:w-[580px] lg:pt-12"
          >
            {data.columns.map((column) => (
              <div key={column.title}>
                <h2 className="sr-only">{column.title}</h2>
                <ul className="flex flex-col gap-4 text-sm leading-[1.6]">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-shuttle-gray-200 pt-[22px] text-xs leading-[1.6] sm:flex-row sm:justify-between lg:mt-[130px]">
          <p>{data.copyright}</p>
          <ul className="flex flex-wrap gap-6">
            {data.legal.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

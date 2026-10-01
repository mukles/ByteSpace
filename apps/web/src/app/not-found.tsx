import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import { Heading } from "@/components/ui/heading";
import { getNavLinks, readMd } from "@/lib/content";
import type { NotFoundData } from "@/types/content";

export const metadata: Metadata = { title: "Page not found — ByteSpace" };

export default function NotFound() {
  const { data } = readMd<NotFoundData>("pages/not-found");

  return (
    <>
      <Navbar links={getNavLinks()} />
      <main className="relative isolate overflow-hidden bg-primary pt-20 lg:pt-30">
        <Image
          src="/images/auth/grid.svg"
          alt=""
          width={1442}
          height={1026}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -z-10 max-w-none -translate-x-1/2"
        />
        <div className="mx-auto flex max-w-[1232px] flex-col items-center px-4 pt-10 pb-20 text-center lg:pb-[125px]">
          <p
            aria-hidden="true"
            className="-mb-[0.25em] bg-[linear-gradient(180deg,#d4fb20_0%,rgba(212,251,32,0.96)_25%,rgba(212,251,32,0.81)_50.5%,rgba(212,251,32,0.61)_68%,rgba(255,255,255,0)_100%)] bg-clip-text font-heading text-[160px] leading-none font-semibold tracking-[-0.01em] text-transparent select-none sm:text-[280px] lg:text-[480px]"
          >
            404
          </p>
          <div className="relative flex flex-col items-center gap-6 md:gap-8">
            <Heading
              as="h1"
              size="heading-l"
              color="light"
              align="center"
              balance={false}
              className="max-w-[935px]"
            >
              {data.heading}
            </Heading>
            <p className="max-w-[486px] text-base leading-[1.6] text-shuttle-gray-100 md:max-w-none md:text-lg">
              {data.body}
            </p>
            <Link
              href={data.cta.href}
              className="rounded-[24px] bg-secondary px-6 py-3 text-lg leading-[1.2] font-medium text-shuttle-gray-950 transition-colors hover:bg-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {data.cta.label}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { HeroShape } from "@/components/hero/hero-shape";
import { Heading } from "@/components/ui/heading";
import { readMd } from "@/lib/content";
import type { CreatorCtaData } from "@/types/content";

const SHAPES = [
  {
    src: "/images/hero/shape-spring.png",
    size: 385,
    x: -645.5,
    y: -162,
    tint: "lime",
  },
  {
    src: "/images/hero/shape-spring-small.png",
    size: 175,
    x: -454.5,
    y: 5,
    tint: "white",
    flip: true,
  },
  {
    src: "/images/hero/shape-cone.png",
    size: 188,
    x: -674,
    y: 225,
    tint: "white",
  },
  {
    src: "/images/hero/shape-torus.png",
    size: 342,
    x: -529,
    y: 299,
    tint: "lime",
  },
  {
    src: "/images/hero/shape-pyramid.png",
    size: 188,
    x: 454,
    y: 0,
    tint: "lime",
  },
  {
    src: "/images/hero/shape-cylinder.png",
    size: 370,
    x: 691,
    y: 6,
    tint: "white",
  },
  {
    src: "/images/hero/shape-spring-upright.png",
    size: 330,
    x: 555,
    y: 289,
    tint: "lime",
  },
] as const;

export function CreatorCta() {
  const { data } = readMd<CreatorCtaData>("pages/creator-cta");

  return (
    <section className="relative isolate overflow-hidden bg-primary">
      <Image
        src="/images/cta/grid.svg"
        alt=""
        width={1442}
        height={1026}
        aria-hidden="true"
        className="pointer-events-none absolute -top-0.5 left-1/2 -z-10 max-w-none -translate-x-1/2"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[488px] w-[1440px] -translate-1/2 scale-[0.55] md:scale-[0.8] lg:scale-100"
      >
        {SHAPES.map((shape) => (
          <HeroShape key={shape.src} {...shape} />
        ))}
      </div>

      <div className="mx-auto flex max-w-[996px] flex-col items-center gap-8 px-4 py-20 text-center lg:gap-10 lg:py-[85px]">
        <Heading
          as="h2"
          size="heading-m"
          color="light"
          align="center"
          balance={false}
          className="max-w-[710px] text-shuttle-gray-50"
        >
          {data.heading}
        </Heading>
        <p className="text-base leading-[1.6] text-shuttle-gray-50 md:text-lg">
          {data.body}
        </p>
        <Link
          href={data.cta.href}
          className="rounded-[24px] bg-secondary px-6 py-3 text-lg leading-[1.2] font-medium text-secondary-foreground transition-colors hover:bg-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          {data.cta.label}
        </Link>
      </div>
    </section>
  );
}

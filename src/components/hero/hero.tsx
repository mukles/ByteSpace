import Image from "next/image";
import { Heading } from "@/components/ui/heading";
import { readMd } from "@/lib/content";
import type { HeroData } from "@/types/content";
import { CategoryCard, HappyStudentsCard, ProgressCard } from "./hero-cards";
import { HeroAnimator } from "./hero-animator";
import { HeroShape } from "./hero-shape";
import { SearchBar } from "./search-bar";

// Stage coordinates: x is offset from centre, y is from the stage top (Figma y − 512)
const SHAPES = [
  {
    src: "/images/hero/shape-spring.png",
    size: 385,
    x: -645.5,
    y: -291,
    tint: "lime",
  },
  {
    src: "/images/hero/shape-cylinder.png",
    size: 370,
    x: 696,
    y: -291,
    tint: "lime",
  },
  {
    src: "/images/hero/shape-spring-upright.png",
    size: 330,
    x: 572,
    y: 160,
    tint: "white",
  },
  {
    src: "/images/hero/shape-spring-small.png",
    size: 175,
    x: -449.5,
    y: -35,
    tint: "white",
    flip: true,
  },
  {
    src: "/images/hero/shape-torus.png",
    size: 342,
    x: -531,
    y: 170,
    tint: "white",
  },
  {
    src: "/images/hero/shape-pyramid.png",
    size: 188,
    x: 480,
    y: -48,
    tint: "white",
  },
] as const;

export async function Hero() {
  const { data } = readMd<HeroData>("pages/hero");

  return (
    <section className="relative isolate overflow-hidden bg-primary">
      <Image
        src="/images/hero/grid.svg"
        alt=""
        width={1442}
        height={1026}
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 lg:-top-30 -z-10 max-w-none -translate-x-1/2"
      />

      <HeroAnimator>
        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center gap-10 px-4 pt-12 text-center lg:gap-[60px]">
          <div className="flex flex-col items-center gap-6 lg:gap-8">
            <Heading
              as="h1"
              size="heading-l"
              color="light"
              align="center"
              className="max-w-[935px]"
              data-hero="intro"
            >
              {data.heading}
            </Heading>
            <p
              data-hero="intro"
              className="max-w-[819px] text-base leading-[1.6] text-shuttle-gray-100 md:text-lg"
            >
              {data.subheading}
            </p>
          </div>
          <div data-hero="intro" className="flex w-full justify-center">
            <SearchBar
              placeholder={data.searchPlaceholder}
              label={data.searchLabel}
            />
          </div>
        </div>

        {/* Visual stage — laid out at the 1440px design width and scaled down below lg */}
        <div className="relative h-[230px] sm:h-[333px] md:h-[410px] lg:h-[512px]">
          <div className="absolute top-0 left-1/2 h-[512px] w-[1440px] -translate-x-1/2 origin-top scale-[0.45] sm:scale-[0.65] md:scale-[0.8] lg:scale-100">
            <Image
              src="/images/hero/arc.svg"
              alt=""
              width={1149}
              height={1149}
              aria-hidden="true"
              data-hero="arc"
              className="pointer-events-none absolute top-[70px] left-1/2 max-w-none -translate-x-1/2"
            />

            <Image
              src="/images/hero/student.png"
              alt="Smiling student with headphones holding a laptop"
              width={578}
              height={541}
              preload
              data-hero="student"
              className="absolute top-0 left-1/2 max-w-none -translate-x-1/2 drop-shadow-elevated"
            />

            <ProgressCard {...data.progress} />
            <HappyStudentsCard {...data.happyStudents} />

            {SHAPES.map((shape) => (
              <HeroShape key={shape.src} {...shape} />
            ))}

            <CategoryCard {...data.category} />
          </div>
        </div>
      </HeroAnimator>
    </section>
  );
}

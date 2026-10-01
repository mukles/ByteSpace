import Image from "next/image";
import { Heading } from "@/components/ui/heading";
import { readMd } from "@/lib/content";
import type { TestimonialsData } from "@/types/content";
import { TestimonialSlider } from "./testimonial-slider";

const GLOWS = [
  { src: "/images/glows/glow-lime-lg.svg", size: 1217, left: 802, top: -281 },
  { src: "/images/glows/glow-lime-sm.svg", size: 752, left: 355, top: -178 },
  { src: "/images/glows/glow-blue-lg.svg", size: 1217, left: -482, top: 109 },
] as const;

export function Testimonials() {
  const { data } = readMd<TestimonialsData>("pages/testimonials");

  return (
    <section className="relative isolate overflow-hidden bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-full w-[1440px] -translate-x-1/2"
      >
        {GLOWS.map((glow) => (
          <Image
            key={glow.src}
            src={glow.src}
            alt=""
            width={glow.size}
            height={glow.size}
            className="absolute max-w-none"
            style={{ left: glow.left, top: glow.top }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-[1236px] px-4 pt-16 pb-10 lg:pt-[74px] lg:pb-[72px]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-[43px]">
          <Heading
            as="h2"
            size="heading-m"
            balance={false}
            className="text-black-950 lg:w-[577px] lg:shrink-0"
          >
            {data.heading}
          </Heading>
          <p className="text-base leading-[1.6] text-black-700 md:text-lg lg:w-[580px]">
            {data.body}
          </p>
        </div>
      </div>

      <div className="pb-16 lg:pb-[60px]">
        <TestimonialSlider testimonials={data.testimonials} />
      </div>
    </section>
  );
}

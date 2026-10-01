import Image from "next/image";
import type { Testimonial } from "@/types/content";

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

function Slides({
  testimonials,
  hidden,
}: TestimonialSliderProps & { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 gap-6 pr-6 lg:gap-10 lg:pr-10"
    >
      {testimonials.map((t) => (
        <li key={t.name} className="w-[300px] shrink-0 sm:w-[378px]">
          <figure className="flex h-full flex-col gap-6 rounded-[24px] bg-white p-6 transition-shadow duration-300 hover:shadow-card">
            <Image
              src={t.avatar}
              alt=""
              width={80}
              height={80}
              className="size-20 rounded-full object-cover"
            />
            <figcaption>
              <p className="font-heading text-xl leading-7 font-semibold tracking-[-0.01em] text-black-950">
                {t.name}
              </p>
              <p className="text-lg leading-[1.6] text-primary">{t.role}</p>
            </figcaption>
            <blockquote className="text-base leading-[1.6] text-black-700 md:text-lg">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
          </figure>
        </li>
      ))}
    </ul>
  );
}

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  return (
    <div className="overflow-hidden motion-reduce:overflow-x-auto">
      <div className="flex w-max animate-marquee py-4 hover:[animation-play-state:paused] has-focus-visible:[animation-play-state:paused] motion-reduce:animate-none">
        <Slides testimonials={testimonials} />
        <Slides testimonials={testimonials} hidden />
      </div>
    </div>
  );
}

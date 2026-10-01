"use client";

import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { Testimonial } from "@/types/content";

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const slides = [...testimonials, ...testimonials];

  return (
    <div className="mx-auto max-w-[1236px] px-4">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        onSwiper={(swiper) => {
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            swiper.autoplay.stop();
          }
        }}
        slidesPerView="auto"
        spaceBetween={24}
        breakpoints={{ 1024: { spaceBetween: 40 } }}
        grabCursor
        className="overflow-visible! py-4!"
      >
        {slides.map((t, i) => (
          <SwiperSlide
            key={`${t.name}-${i}`}
            className="h-auto! w-[300px]! sm:w-[378px]!"
          >
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

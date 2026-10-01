"use client";

import Image from "next/image";
import { useState } from "react";
import type { CourseDetailsData } from "@/types/content";

type CoursePreviewProps = CourseDetailsData["preview"];

export function CoursePreview({ image, playLabel, video }: CoursePreviewProps) {
  const [playing, setPlaying] = useState(false);

  if (playing && video) {
    return (
      <video
        src={video}
        poster={image}
        controls
        autoPlay
        playsInline
        className="absolute inset-0 size-full bg-black object-contain"
      />
    );
  }

  return (
    <>
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 720px, 100vw"
        className="object-cover"
      />
      <button
        type="button"
        aria-label={playLabel}
        disabled={!video}
        onClick={() => setPlaying(true)}
        className="absolute top-1/2 left-1/2 flex -translate-1/2 cursor-pointer items-center justify-center rounded-[24px] border border-black-700 bg-[rgba(61,61,61,0.24)] p-2 backdrop-blur-[20px] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:p-4"
      >
        <Image
          src="/images/course-details/play.svg"
          alt=""
          width={72}
          height={72}
          className="size-12 sm:size-[72px]"
        />
      </button>
    </>
  );
}

"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";
import type { CourseDetailsData } from "@/types/content";
import { LessonList } from "./lesson-list";

const sectionHeadingClass = "leading-[1.2]";
const bodyClass = "text-base leading-[1.6] text-shuttle-gray-700";

type CourseTabsProps = Pick<
  CourseDetailsData,
  "tabs" | "about" | "lessons" | "reviewsEmpty"
>;

function AboutPanel({ about }: Pick<CourseDetailsData, "about">) {
  return (
    <div className="flex flex-col gap-6">
      <Heading as="h2" size="heading-xs" className={sectionHeadingClass}>
        {about.descriptionHeading}
      </Heading>
      {/* Paragraphs are separated by one blank line in the design */}
      <div className={cn("flex flex-col gap-[1.6em]", bodyClass)}>
        {about.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <Heading as="h2" size="heading-xs" className={sectionHeadingClass}>
        {about.sneakPeekHeading}
      </Heading>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-[18px]">
        {about.sneakPeek.map((src) => (
          <li
            key={src}
            className="relative aspect-[167/125] overflow-hidden rounded-2xl bg-[#d9d9d9]"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 640px) 167px, 50vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>

      <Heading as="h2" size="heading-xs" className={sectionHeadingClass}>
        {about.keyPointsHeading}
      </Heading>
      <ul className="flex flex-col gap-3">
        {about.keyPoints.map((point) => (
          <li key={point} className={cn("flex items-start gap-2", bodyClass)}>
            <Image
              src="/images/course-details/check-circle.svg"
              alt=""
              width={24}
              height={24}
              className="shrink-0"
            />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CourseTabs({ tabs, about, lessons, reviewsEmpty }: CourseTabsProps) {
  const [active, setActive] = useState(0);
  const id = useId();

  const panels = [
    <AboutPanel key="about" about={about} />,
    <div key="lessons" className="flex max-w-[414px] flex-col gap-6">
      <Heading as="h2" size="heading-xs" className={sectionHeadingClass}>
        {lessons.heading}
      </Heading>
      <LessonList {...lessons} />
    </div>,
    <p key="reviews" className={bodyClass}>
      {reviewsEmpty}
    </p>,
  ];

  return (
    <div className="flex flex-col gap-10">
      <div role="tablist" aria-label="Course information" className="flex gap-4">
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={selected}
              aria-controls={selected ? `${id}-panel-${i}` : undefined}
              onClick={() => setActive(i)}
              className={cn(
                "cursor-pointer rounded-[24px] px-4 py-3 text-base leading-[1.2] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                selected
                  ? "bg-secondary text-shuttle-gray-950"
                  : "bg-shuttle-gray-50 text-shuttle-gray-700 hover:bg-shuttle-gray-100",
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel-${active}`}
        aria-labelledby={`${id}-tab-${active}`}
      >
        {panels[active]}
      </div>
    </div>
  );
}

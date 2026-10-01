"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";
import type { CourseDetailsData } from "@/types/content";
import { ReviewsPanel } from "./reviews-panel";

const sectionHeadingClass = "leading-[1.2]";
const bodyClass = "text-base leading-[1.6] text-shuttle-gray-700";

type CourseTabsProps = Pick<
  CourseDetailsData,
  "tabs" | "about" | "curriculum" | "reviews"
>;

function AboutPanel({ about }: Pick<CourseDetailsData, "about">) {
  return (
    <div className="flex flex-col gap-6">
      <Heading as="h2" size="heading-xs" className={sectionHeadingClass}>
        {about.descriptionHeading}
      </Heading>
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

function LessonsPanel({ curriculum }: Pick<CourseDetailsData, "curriculum">) {
  const { progress } = curriculum;

  return (
    <div className="flex flex-col gap-6">
      <Heading as="h2" size="heading-xs" className={sectionHeadingClass}>
        {curriculum.modulesHeading}
      </Heading>
      <p className={bodyClass}>{curriculum.modulesIntro}</p>

      <Heading as="h2" size="heading-xs" className={sectionHeadingClass}>
        {curriculum.listHeading}
      </Heading>
      <ol className="flex flex-col gap-6">
        {curriculum.modules.map((module) => (
          <li key={module.title} className="flex items-center gap-[13px]">
            <span className="flex shrink-0 items-center justify-center rounded-[24px] bg-secondary p-4">
              <Image
                src="/images/course-details/lesson-video.svg"
                alt=""
                width={40}
                height={40}
              />
            </span>
            <div className="flex flex-col gap-1 text-base">
              <h3 className="leading-[1.2] font-medium text-shuttle-gray-950">
                {module.title}
              </h3>
              <p className="max-w-[638px] leading-[1.6] text-shuttle-gray-700">
                {module.summary}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <Heading as="h2" size="heading-xs" className={sectionHeadingClass}>
        {curriculum.contentHeading}
      </Heading>
      <p className={bodyClass}>{curriculum.content}</p>

      <Heading as="h2" size="heading-xs" className={sectionHeadingClass}>
        {curriculum.progressHeading}
      </Heading>
      <p className={bodyClass}>{curriculum.progressIntro}</p>

      <div className="flex flex-col gap-2 rounded-2xl border border-shuttle-gray-200 bg-white p-4 backdrop-blur-[10px]">
        <p className="text-sm leading-[1.2] font-medium text-shuttle-gray-950">
          {progress.label}
        </p>
        <p className="font-heading text-[36px] leading-[1.2] font-semibold tracking-[-0.01em] text-shuttle-gray-950">
          {progress.value}%
        </p>
        <div
          role="progressbar"
          aria-label={progress.label}
          aria-valuenow={progress.value}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 overflow-hidden rounded-[24px] bg-shuttle-gray-100"
        >
          <div
            className="h-full rounded-[24px] bg-secondary"
            style={{ width: `${progress.value}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function CourseTabs({
  tabs,
  about,
  curriculum,
  reviews,
}: CourseTabsProps) {
  const [active, setActive] = useState(0);
  const id = useId();

  const panels = [
    <AboutPanel key="about" about={about} />,
    <LessonsPanel key="lessons" curriculum={curriculum} />,
    <ReviewsPanel key="reviews" reviews={reviews} />,
  ];

  return (
    <div className="flex flex-col gap-10">
      <div
        role="tablist"
        aria-label="Course information"
        className="flex gap-4"
      >
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <Button
              key={tab}
              variant={selected ? "primary" : "muted"}
              size="tab"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={selected}
              aria-controls={selected ? `${id}-panel-${i}` : undefined}
              onClick={() => setActive(i)}
            >
              {tab}
            </Button>
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

"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { CourseShowcaseData } from "@/types/content";
import { CourseCard } from "./course-card";

type CourseFilterProps = Pick<
  CourseShowcaseData,
  "featuredLabel" | "emptyMessage" | "categories" | "courses"
> &
  Partial<Pick<CourseShowcaseData, "moreLabel" | "moreHref">> & {
    tabsClassName?: string;
  };

export function CourseFilter({
  featuredLabel,
  moreLabel,
  moreHref,
  emptyMessage,
  categories,
  courses,
  tabsClassName,
}: CourseFilterProps) {
  const [active, setActive] = useState(featuredLabel);

  const visible =
    active === featuredLabel
      ? courses
      : courses.filter((course) => course.category === active);

  return (
    <>
      <div
        role="group"
        aria-label="Course categories"
        className={cn(
          "-mx-4 mt-10 flex items-center gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-auto md:max-w-[1100px] md:flex-wrap md:justify-center md:gap-x-4 md:gap-y-5 md:overflow-visible md:px-0 md:pb-0 lg:mt-[42px]",
          tabsClassName,
        )}
      >
        {[featuredLabel, ...categories].map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(category)}
              className={cn(
                "shrink-0 cursor-pointer whitespace-nowrap rounded-[24px] px-4 py-3 text-base leading-[1.2] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                isActive
                  ? "bg-secondary text-shuttle-gray-950"
                  : "bg-shuttle-gray-50 text-shuttle-gray-700 hover:bg-shuttle-gray-100",
              )}
            >
              {category}
            </button>
          );
        })}
        {moreLabel && moreHref && (
          <Link
            href={moreHref}
            className="shrink-0 whitespace-nowrap text-base leading-[1.2] font-medium text-primary hover:underline"
          >
            {moreLabel}
          </Link>
        )}
      </div>

      <div aria-live="polite" className="mt-12 lg:mt-[77px]">
        {visible.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {visible.map((course, i) => (
              <li key={`${course.title}-${i}`}>
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-16 text-center text-lg leading-[1.6] text-shuttle-gray-400">
            {emptyMessage}
          </p>
        )}
      </div>
    </>
  );
}

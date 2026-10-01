"use client";

import Image from "next/image";
import { useState } from "react";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";
import type { CourseDetailsData } from "@/types/content";

const bodyClass = "text-base leading-[1.6] text-shuttle-gray-700";
const STAR = "/images/course-details/star-filled.svg";

function Stars({ count = 5, label }: { count?: number; label: string }) {
  return (
    <span role="img" aria-label={label} className="flex shrink-0 gap-1">
      {Array.from({ length: count }, (_, i) => (
        <Image key={i} src={STAR} alt="" width={24} height={24} />
      ))}
    </span>
  );
}

export function ReviewsPanel({ reviews }: Pick<CourseDetailsData, "reviews">) {
  const [filter, setFilter] = useState<number | null>(null);
  const visible =
    filter === null
      ? reviews.items
      : reviews.items.filter((review) => review.rating === filter);

  const filters = [null, ...reviews.breakdown.map((row) => row.stars)];

  return (
    <div className="flex flex-col gap-6">
      <Heading as="h2" size="heading-xs" className="leading-[1.2]">
        {reviews.heading}
      </Heading>
      <p className={bodyClass}>{reviews.intro}</p>

      <div className="flex flex-col items-stretch gap-6 rounded-2xl border border-shuttle-gray-200 bg-white p-6 backdrop-blur-[10px] sm:flex-row sm:items-center sm:p-10">
        <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-secondary p-10 text-shuttle-gray-950 backdrop-blur-[20px]">
          <p className="text-sm leading-[1.2] font-medium">{reviews.ratingLabel}</p>
          <p className="font-heading text-[36px] leading-[1.2] font-semibold tracking-[-0.01em]">
            {reviews.rating}
          </p>
        </div>
        <ul className="flex min-w-0 flex-1 flex-col gap-1">
          {reviews.breakdown.map((row) => (
            <li key={row.stars} className="flex items-center gap-4">
              <span className="h-2 min-w-0 flex-1 overflow-hidden rounded-[24px] bg-shuttle-gray-100">
                <span
                  className="block h-full rounded-[24px] bg-secondary"
                  style={{ width: `${row.percent}%` }}
                />
              </span>
              <Stars label={`${row.stars} star reviews`} />
              <span className={cn("w-10 shrink-0 text-right", bodyClass)}>
                {row.count}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Heading as="h2" size="heading-xs" className="leading-[1.2]">
        {reviews.listHeading}
      </Heading>
      <div
        role="group"
        aria-label="Filter reviews by rating"
        className="-mx-4 flex gap-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0"
      >
        {filters.map((stars) => {
          const active = stars === filter;
          return (
            <button
              key={stars ?? "all"}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(stars)}
              className={cn(
                "flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-[24px] px-4 py-3 text-base leading-[1.2] font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                active
                  ? "bg-secondary text-shuttle-gray-950"
                  : "bg-shuttle-gray-50 text-shuttle-gray-700 hover:bg-shuttle-gray-100",
              )}
            >
              {stars === null ? (
                reviews.allLabel
              ) : (
                <>
                  <Image src={STAR} alt="" width={24} height={24} />
                  {stars}
                  <span className="sr-only"> stars</span>
                </>
              )}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className={bodyClass}>{reviews.emptyMessage}</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {visible.map((review) => (
            <li
              key={review.name}
              className="flex flex-col gap-6 rounded-[24px] border border-shuttle-gray-200 p-6 sm:p-10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-3">
                    <Image
                      src={review.avatar}
                      alt=""
                      width={52}
                      height={52}
                      className="shrink-0 rounded-full"
                    />
                    <div>
                      <p className="text-lg leading-[1.2] font-medium text-shuttle-gray-950">
                        {review.name}
                      </p>
                      <p className={bodyClass}>{review.role}</p>
                    </div>
                  </div>
                  <Stars count={review.rating} label={`Rated ${review.rating} out of 5`} />
                </div>
                <p className={cn("shrink-0 whitespace-nowrap", bodyClass)}>
                  {review.date}
                </p>
              </div>
              <p className={bodyClass}>{review.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

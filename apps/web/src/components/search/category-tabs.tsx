"use client";

import { cn } from "@/lib/utils";
import { useCourseSearch } from "./search-state";

interface CategoryTabsProps {
  featuredLabel: string;
  categories: string[];
  className?: string;
}

export function CategoryTabs({
  featuredLabel,
  categories,
  className,
}: CategoryTabsProps) {
  const { query, update } = useCourseSearch();

  return (
    <div
      role="group"
      aria-label="Course categories"
      className={cn(
        "-mx-4 flex items-center gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-auto md:flex-wrap md:justify-center md:gap-x-4 md:gap-y-5 md:overflow-visible md:px-0 md:pb-0",
        className,
      )}
    >
      {[featuredLabel, ...categories].map((category, i) => {
        const isActive =
          i === 0 ? !query.category : query.category === category;
        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => update({ category: i === 0 ? null : category })}
            className={cn(
              "shrink-0 cursor-pointer rounded-[24px] px-4 py-3 text-base leading-[1.2] font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              isActive
                ? "bg-secondary text-shuttle-gray-950"
                : "bg-shuttle-gray-50 text-shuttle-gray-700 hover:bg-shuttle-gray-100",
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { categorySlug } from "@/lib/course-search";
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
          i === 0 ? !query.category : query.category === categorySlug(category);
        return (
          <Button
            key={category}
            variant={isActive ? "primary" : "muted"}
            size="tab"
            aria-pressed={isActive}
            onClick={() =>
              update({ category: i === 0 ? null : categorySlug(category) })
            }
          >
            {category}
          </Button>
        );
      })}
    </div>
  );
}

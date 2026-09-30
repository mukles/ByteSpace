import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CoursesPageData, ToolbarButton } from "@/types/content";

const buttonClass =
  "flex min-h-12 shrink-0 cursor-pointer items-center gap-1 rounded-[24px] border border-shuttle-gray-200 bg-white px-4 py-3 text-base leading-[1.2] font-medium whitespace-nowrap text-shuttle-gray-950 transition-colors hover:bg-shuttle-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

function ToolbarItem({
  label,
  icon,
  className,
}: ToolbarButton & { className?: string }) {
  return (
    <button
      type="button"
      aria-haspopup="true"
      className={cn(buttonClass, className)}
    >
      {icon && <Image src={icon} alt="" width={24} height={24} />}
      {label}
    </button>
  );
}

// Design-only: the dropdowns are not wired up yet
export function CourseToolbar({
  filters,
  sort,
  itemClassName,
}: Pick<CoursesPageData, "filters" | "sort"> & { itemClassName?: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div
        role="group"
        aria-label="Filter courses"
        className="flex flex-wrap gap-4"
      >
        {filters.map((filter) => (
          <ToolbarItem key={filter.label} {...filter} className={itemClassName} />
        ))}
      </div>
      <ToolbarItem {...sort} className={itemClassName} />
    </div>
  );
}

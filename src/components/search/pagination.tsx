import Image from "next/image";
import Link from "next/link";
import { pageWindow } from "@/lib/course-search";
import { cn } from "@/lib/utils";

const arrowClass =
  "grid place-items-center rounded-[24px] border border-shuttle-gray-200 bg-white px-4 py-3 transition-colors";

interface PaginationProps {
  current: number;
  total: number;
  href: (page: number) => string;
}

function Arrow({
  direction,
  target,
}: {
  direction: "prev" | "next";
  /** null when there's no page in that direction */
  target: string | null;
}) {
  const label = direction === "prev" ? "Previous page" : "Next page";
  const icon = (
    <Image
      src={`/images/search/arrow-${direction}.svg`}
      alt=""
      width={24}
      height={24}
    />
  );

  return target ? (
    <Link
      href={target}
      aria-label={label}
      className={cn(
        arrowClass,
        "hover:bg-shuttle-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      )}
    >
      {icon}
    </Link>
  ) : (
    <span
      role="link"
      aria-disabled="true"
      aria-label={label}
      className={cn(arrowClass, "cursor-not-allowed opacity-40")}
    >
      {icon}
    </span>
  );
}

export function Pagination({ current, total, href }: PaginationProps) {
  if (total <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-3 sm:gap-6"
    >
      <Arrow direction="prev" target={current > 1 ? href(current - 1) : null} />

      <ol className="flex items-center gap-3 font-heading text-xl leading-7 font-semibold tracking-[-0.01em] sm:gap-6">
        {pageWindow(current, total).map((page, i) =>
          page === null ? (
            <li key={`gap-${i}`} aria-hidden="true" className="text-shuttle-gray-400">
              …
            </li>
          ) : (
            <li key={page}>
              <Link
                href={href(page)}
                aria-label={`Page ${page}`}
                aria-current={page === current ? "page" : undefined}
                className={cn(
                  "rounded-md px-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  page === current
                    ? "pointer-events-none text-shuttle-gray-200"
                    : "text-shuttle-gray-950 hover:text-primary",
                )}
              >
                {page}
              </Link>
            </li>
          ),
        )}
      </ol>

      <Arrow
        direction="next"
        target={current < total ? href(current + 1) : null}
      />
    </nav>
  );
}

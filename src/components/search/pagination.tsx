import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const arrowClass =
  "grid place-items-center rounded-[24px] border border-shuttle-gray-200 bg-white px-4 py-3";

interface PaginationProps {
  current: number;
  total: number;
  href: (page: number) => string;
}

export function Pagination({ current, total, href }: PaginationProps) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  const hasPrev = current > 1;
  const hasNext = current < total;

  const prevIcon = (
    <Image src="/images/search/arrow-prev.svg" alt="" width={24} height={24} />
  );
  const nextIcon = (
    <Image src="/images/search/arrow-next.svg" alt="" width={24} height={24} />
  );

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-6"
    >
      {hasPrev ? (
        <Link
          href={href(current - 1)}
          aria-label="Previous page"
          className={cn(arrowClass, "hover:bg-shuttle-gray-50")}
        >
          {prevIcon}
        </Link>
      ) : (
        <span
          aria-disabled="true"
          aria-label="Previous page"
          className={arrowClass}
        >
          {prevIcon}
        </span>
      )}

      <ol className="flex items-center gap-6 font-heading text-xl leading-7 font-semibold tracking-[-0.01em]">
        {pages.map((page) => (
          <li key={page}>
            <Link
              href={href(page)}
              aria-current={page === current ? "page" : undefined}
              className={cn(
                "transition-colors",
                page === current
                  ? "text-shuttle-gray-200"
                  : "text-shuttle-gray-950 hover:text-primary",
              )}
            >
              {page}
            </Link>
          </li>
        ))}
      </ol>

      {hasNext ? (
        <Link
          href={href(current + 1)}
          aria-label="Next page"
          className={cn(arrowClass, "hover:bg-shuttle-gray-50")}
        >
          {nextIcon}
        </Link>
      ) : (
        <span
          aria-disabled="true"
          aria-label="Next page"
          className={arrowClass}
        >
          {nextIcon}
        </span>
      )}
    </nav>
  );
}

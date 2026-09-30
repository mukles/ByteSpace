"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  use,
  useOptimistic,
  useTransition,
  type ReactNode,
} from "react";
import { parseCourseQuery, type CourseQuery } from "@/lib/course-search";
import { cn } from "@/lib/utils";

type Changes = Record<string, string | null>;

interface SearchState {
  query: CourseQuery;
  isPending: boolean;
  update: (changes: Changes) => void;
}

const SearchContext = createContext<SearchState | null>(null);

export function useCourseSearch() {
  const state = use(SearchContext);
  if (!state) throw new Error("useCourseSearch needs a CourseSearchProvider");
  return state;
}

export function CourseSearchProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [params, setOptimisticParams] = useOptimistic(searchParams.toString());

  const update = (changes: Changes) => {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    if (!("page" in changes)) next.delete("page");

    const qs = next.toString();
    startTransition(() => {
      setOptimisticParams(qs);
      router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    });
  };

  const query = parseCourseQuery(
    Object.fromEntries(new URLSearchParams(params)),
  );

  return (
    <SearchContext value={{ query, isPending, update }}>
      {children}
    </SearchContext>
  );
}

export function ResultsPane({ children }: { children: ReactNode }) {
  const { isPending } = useCourseSearch();
  return (
    <div
      aria-busy={isPending}
      className={cn("transition-opacity", isPending && "opacity-50")}
    >
      {children}
    </div>
  );
}

export const CLEARABLE = ["q", "scope", "category", "level", "price", "rating"];

export function ClearAllButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const { update } = useCourseSearch();
  return (
    <button
      type="button"
      onClick={() =>
        update(Object.fromEntries(CLEARABLE.map((key) => [key, null])))
      }
      className={cn(
        "cursor-pointer text-base leading-[1.2] font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
    >
      {label}
    </button>
  );
}

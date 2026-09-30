import Image from "next/image";
import { SearchBar } from "@/components/hero/search-bar";
import { Heading } from "@/components/ui/heading";
import type { CoursesPageData } from "@/types/content";

type SearchHeroProps = Pick<
  CoursesPageData,
  "heading" | "searchPlaceholder" | "scopes"
> & {
  query?: string;
  scope?: string;
  hiddenFields?: Record<string, string>;
};

export function SearchHero({
  heading,
  searchPlaceholder,
  scopes,
  query,
  scope,
  hiddenFields,
}: SearchHeroProps) {
  return (
    // Only the grid is clipped, so the scope dropdown can hang below the hero;
    // z-10 keeps that dropdown above the results toolbar
    <section className="relative isolate z-10 bg-primary">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <Image
          src="/images/auth/grid.svg"
          alt=""
          width={1442}
          height={1026}
          className="absolute -top-20 left-1/2 max-w-none -translate-x-1/2 lg:-top-30"
        />
      </div>
      <div className="mx-auto flex max-w-[1232px] flex-col items-center gap-6 px-4 pt-8 pb-14 text-center md:gap-8 lg:pt-11 lg:pb-[69px]">
        <Heading
          as="h1"
          size="heading-m"
          color="light"
          align="center"
          className="text-[28px]/[1.2] text-shuttle-gray-50 md:text-[36px]/[1.2]"
        >
          {heading}
        </Heading>
        <SearchBar
          key={`${query}|${scope}`}
          placeholder={searchPlaceholder}
          scopes={scopes}
          scopeValue={scope}
          defaultValue={query}
          hiddenFields={hiddenFields}
          className="max-w-[621px]"
        />
      </div>
    </section>
  );
}

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
    <section className="relative isolate overflow-hidden bg-primary">
      <Image
        src="/images/auth/grid.svg"
        alt=""
        width={1442}
        height={1026}
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 -z-10 max-w-none -translate-x-1/2 lg:-top-30"
      />
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

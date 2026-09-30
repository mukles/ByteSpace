import type { Metadata } from "next";
import { CourseFilter } from "@/components/courses/course-filter";
import { CourseToolbar } from "@/components/search/course-toolbar";
import { Pagination } from "@/components/search/pagination";
import { SearchHero } from "@/components/search/search-hero";
import { getPageMeta, readMd } from "@/lib/content";
import type { CourseShowcaseData, CoursesPageData } from "@/types/content";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = getPageMeta("courses");
  return { title: `${title} — ByteSpace`, description };
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CoursesPage({
  searchParams,
}: PageProps<"/courses">) {
  const params = await searchParams;
  const query = first(params.q)?.trim() ?? "";
  const requestedPage = Number.parseInt(first(params.page) ?? "", 10);

  const { data } = readMd<CoursesPageData>("pages/courses");
  const { data: catalog } = readMd<CourseShowcaseData>("pages/course-showcase");
  const { pageSize } = data;

  const needle = query.toLowerCase();
  // Searches match the real catalogue. With no query, the handful of courses is
  // cycled to fill the design's result pages until real search results exist
  const results = query
    ? catalog.courses.filter((course) =>
        [course.title, course.author, course.category].some((field) =>
          field.toLowerCase().includes(needle),
        ),
      )
    : Array.from(
        { length: pageSize * data.pagination.total },
        (_, i) => catalog.courses[i % catalog.courses.length],
      );

  const totalPages = Math.max(1, Math.ceil(results.length / pageSize));
  // Missing or junk values fall back to page 1; out-of-range ones clamp
  const page = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), totalPages);
  const courses = results.slice((page - 1) * pageSize, page * pageSize);

  const pageHref = (target: number) => {
    const search = new URLSearchParams();
    if (query) search.set("q", query);
    if (target > 1) search.set("page", String(target));
    const qs = search.toString();
    return `/courses${qs ? `?${qs}` : ""}#results`;
  };

  return (
    <main>
      <SearchHero
        heading={data.heading}
        searchPlaceholder={data.searchPlaceholder}
        scopeLabel={data.scopeLabel}
        query={query}
      />

      <section
        id="results"
        aria-label="Search results"
        className="mx-auto max-w-[1232px] scroll-mt-4 px-4 pt-10 pb-14 lg:pt-[72px] lg:pb-[72px]"
      >
        <CourseToolbar filters={data.filters} sort={data.sort} />

        {/* Keyed so the category tab resets when the results change */}
        <CourseFilter
          key={`${query}-${page}`}
          featuredLabel={catalog.featuredLabel}
          emptyMessage={results.length ? catalog.emptyMessage : data.noResults}
          categories={data.categories}
          courses={courses}
          tabsClassName="mt-8 lg:mt-8 xl:max-w-none xl:flex-nowrap xl:justify-between xl:gap-x-4"
        />

        <div className="mt-12 lg:mt-[72px]">
          <Pagination current={page} total={totalPages} href={pageHref} />
        </div>
      </section>
    </main>
  );
}

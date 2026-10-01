import type { Metadata } from "next";
import { CourseCard } from "@/components/courses/course-card";
import { CategoryTabs } from "@/components/search/category-tabs";
import { CoursesToolbar } from "@/components/search/courses-toolbar";
import { Pagination } from "@/components/search/pagination";
import { SearchHero } from "@/components/search/search-hero";
import {
  ClearAllButton,
  CourseSearchProvider,
  ResultsPane,
} from "@/components/search/search-state";
import {
  activeFilterCount,
  parseCourseQuery,
  searchCourses,
} from "@/lib/course-search";
import { getCatalog, getPageMeta, readMd } from "@/lib/content";
import type { CourseShowcaseData, CoursesPageData } from "@/types/content";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = getPageMeta("courses");
  return { title: `${title} — ByteSpace`, description };
}

export default async function CoursesPage({
  searchParams,
}: PageProps<"/courses">) {
  const params = await searchParams;
  const query = parseCourseQuery(params);

  const { data } = readMd<CoursesPageData>("pages/courses");
  const { data: showcase } = readMd<CourseShowcaseData>("pages/course-showcase");
  const catalog = getCatalog();
  const categories = [...new Set(catalog.map((c) => c.category))].sort();

  const results = searchCourses(catalog, query);
  const totalPages = Math.max(1, Math.ceil(results.length / data.pageSize));
  const page = Math.min(query.page, totalPages);
  const courses = results.slice(
    (page - 1) * data.pageSize,
    page * data.pageSize,
  );

  const current = Object.fromEntries(
    Object.entries(params).flatMap(([key, value]) => {
      const v = Array.isArray(value) ? value[0] : value;
      return v ? [[key, v]] : [];
    }),
  );
  const pageHref = (target: number) => {
    const search = new URLSearchParams(current);
    if (target > 1) search.set("page", String(target));
    else search.delete("page");
    const qs = search.toString();
    return `/courses${qs ? `?${qs}` : ""}#results`;
  };
  const hiddenFields = Object.fromEntries(
    Object.entries(current).filter(([key]) => !["q", "scope", "page"].includes(key)),
  );

  const isFiltered = Boolean(query.q) || activeFilterCount(query) > 0;
  const resultsLabel =
    results.length === 1
      ? data.resultsLabelOne
      : data.resultsLabel.replace("{count}", String(results.length));

  return (
    <main>
      <SearchHero
        heading={data.heading}
        searchPlaceholder={data.searchPlaceholder}
        scopes={data.scopes}
        query={query.q}
        scope={query.scope}
        hiddenFields={hiddenFields}
      />

      <CourseSearchProvider>
        <section
          id="results"
          aria-label="Search results"
          className="mx-auto max-w-[1232px] scroll-mt-4 px-4 pt-10 pb-14 lg:pt-[72px] lg:pb-[72px]"
        >
          <CoursesToolbar
            filterLabel={data.filterLabel}
            price={data.price}
            rating={data.rating}
            level={data.level}
            categoryLabel={data.categoryLabel}
            allCategoriesLabel={data.allCategoriesLabel}
            sortOptions={data.sortOptions}
            clearLabel={data.clearLabel}
            categories={categories}
          />

          <CategoryTabs
            featuredLabel={showcase.featuredLabel}
            categories={data.categories}
            className="mt-8 xl:flex-nowrap xl:justify-between xl:gap-x-4"
          />

          <div className="mt-8 flex min-h-6 items-center justify-between gap-4">
            <p
              role="status"
              className="text-base leading-[1.6] text-shuttle-gray-700"
            >
              {resultsLabel}
              {query.q && (
                <>
                  {" for "}
                  <span className="font-medium text-shuttle-gray-950">
                    “{query.q}”
                  </span>
                </>
              )}
            </p>
            {isFiltered && <ClearAllButton label={data.clearAllLabel} />}
          </div>

          <ResultsPane>
            {courses.length > 0 ? (
              <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-10">
                {courses.map((course) => (
                  <li key={course.slug}>
                    <CourseCard course={course} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <p className="text-lg leading-[1.6] text-shuttle-gray-400">
                  {data.noResults}
                </p>
                {isFiltered && <ClearAllButton label={data.clearAllLabel} />}
              </div>
            )}
          </ResultsPane>

          <div className="mt-12 lg:mt-[72px]">
            <Pagination current={page} total={totalPages} href={pageHref} />
          </div>
        </section>
      </CourseSearchProvider>
    </main>
  );
}

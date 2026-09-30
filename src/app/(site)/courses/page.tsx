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

export default function CoursesPage() {
  const { data } = readMd<CoursesPageData>("pages/courses");
  const { data: catalog } = readMd<CourseShowcaseData>("pages/course-showcase");

  // The catalogue only has a handful of courses, so cycle through them to fill
  // a full page as in the design until real search results exist
  const courses = Array.from(
    { length: data.pageSize },
    (_, i) => catalog.courses[i % catalog.courses.length],
  );

  return (
    <main>
      <SearchHero
        heading={data.heading}
        searchPlaceholder={data.searchPlaceholder}
        scopeLabel={data.scopeLabel}
      />

      <section className="mx-auto max-w-[1232px] px-4 pt-10 pb-14 lg:pt-[72px] lg:pb-[72px]">
        <CourseToolbar filters={data.filters} sort={data.sort} />

        <CourseFilter
          featuredLabel={catalog.featuredLabel}
          emptyMessage={catalog.emptyMessage}
          categories={data.categories}
          courses={courses}
          tabsClassName="mt-8 lg:mt-8 xl:max-w-none xl:flex-nowrap xl:justify-between xl:gap-x-4"
        />

        <div className="mt-12 lg:mt-[72px]">
          <Pagination
            {...data.pagination}
            href={(page) => `/courses?page=${page}`}
          />
        </div>
      </section>
    </main>
  );
}

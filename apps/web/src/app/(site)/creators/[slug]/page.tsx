import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseCard } from "@/components/courses/course-card";
import { CreatorHero } from "@/components/creators/creator-hero";
import { CoursesToolbar } from "@/components/search/courses-toolbar";
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
import {
  getCreatorCourses,
  getCreatorProfile,
  getCreatorSlugs,
  readMd,
} from "@/lib/content";
import type { CoursesPageData } from "@/types/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCreatorSlugs().map((slug) => ({ slug }));
}

async function getCreator(params: PageProps<"/creators/[slug]">["params"]) {
  const { slug } = await params;
  const profile = getCreatorProfile(slug);
  if (!profile) notFound();
  return { slug, ...profile };
}

export async function generateMetadata({
  params,
}: PageProps<"/creators/[slug]">): Promise<Metadata> {
  const { name, tagline } = await getCreator(params);
  return { title: `${name} — ByteSpace`, description: tagline };
}

export default async function CreatorProfilePage({
  params,
  searchParams,
}: PageProps<"/creators/[slug]">) {
  const {
    slug,
    productsLabel,
    toolbarIcons,
    emptyMessage,
    noResults,
    ...profile
  } = await getCreator(params);
  const query = parseCourseQuery(await searchParams);
  const { data } = readMd<CoursesPageData>("pages/courses");

  const own = getCreatorCourses(slug);
  const categories = [...new Set(own.map((c) => c.category))].sort();
  const courses = searchCourses(own, query);
  const isFiltered = activeFilterCount(query) > 0;

  return (
    <main>
      <CreatorHero
        {...profile}
        stats={[
          { value: String(own.length), label: productsLabel },
          ...profile.stats,
        ]}
      />

      <CourseSearchProvider>
        <section
          aria-label={`Courses by ${profile.name}`}
          className="mx-auto max-w-[1232px] px-4 pt-10 pb-14 lg:py-[62px]"
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
            icons={toolbarIcons}
            buttonClassName="text-shuttle-gray-700"
          />

          <ResultsPane>
            {courses.length > 0 ? (
              <ul
                data-reveal-stagger
                className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
              >
                {courses.map((course) => (
                  <li key={course.slug}>
                    <CourseCard course={course} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <p className="text-lg leading-[1.6] text-shuttle-gray-400">
                  {own.length > 0 ? noResults : emptyMessage}
                </p>
                {isFiltered && <ClearAllButton label={data.clearAllLabel} />}
              </div>
            )}
          </ResultsPane>
        </section>
      </CourseSearchProvider>
    </main>
  );
}

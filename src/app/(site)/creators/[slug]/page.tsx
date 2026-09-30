import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseCard } from "@/components/courses/course-card";
import { CreatorHero } from "@/components/creators/creator-hero";
import { CourseToolbar } from "@/components/search/course-toolbar";
import { getCreatorSlugs, readMd } from "@/lib/content";
import type { CourseShowcaseData, CreatorProfileData } from "@/types/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCreatorSlugs().map((slug) => ({ slug }));
}

async function getCreator(params: PageProps<"/creators/[slug]">["params"]) {
  const { slug } = await params;
  if (!getCreatorSlugs().includes(slug)) notFound();
  return readMd<CreatorProfileData>(`creators/${slug}`).data;
}

export async function generateMetadata({
  params,
}: PageProps<"/creators/[slug]">): Promise<Metadata> {
  const { name, tagline } = await getCreator(params);
  return { title: `${name} — ByteSpace`, description: tagline };
}

export default async function CreatorProfilePage({
  params,
}: PageProps<"/creators/[slug]">) {
  const { filters, sort, emptyMessage, ...profile } = await getCreator(params);
  const { data: catalog } = readMd<CourseShowcaseData>("pages/course-showcase");

  // Courses credit their creator by name in the catalogue
  const courses = catalog.courses.filter(
    (course) => course.author.toLowerCase() === profile.name.toLowerCase(),
  );

  return (
    <main>
      <CreatorHero {...profile} />

      <section
        aria-label={`Courses by ${profile.name}`}
        className="mx-auto max-w-[1232px] px-4 pt-10 pb-14 lg:py-[62px]"
      >
        <CourseToolbar
          filters={filters}
          sort={sort}
          itemClassName="text-shuttle-gray-700"
        />

        {courses.length > 0 ? (
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {courses.map((course) => (
              <li key={course.title}>
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-16 text-center text-lg leading-[1.6] text-shuttle-gray-400">
            {emptyMessage}
          </p>
        )}
      </section>
    </main>
  );
}

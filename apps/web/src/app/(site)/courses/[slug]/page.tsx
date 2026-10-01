import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CourseSidebar } from "@/components/course-details/course-sidebar";
import { CourseTabs } from "@/components/course-details/course-tabs";
import { ShareButton } from "@/components/course-details/share-button";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { getCourseDetails, getCourseSlugs } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCourseSlugs().map((slug) => ({ slug }));
}

async function getCourse(params: PageProps<"/courses/[slug]">["params"]) {
  const { slug } = await params;
  const course = getCourseDetails(slug);
  if (!course) notFound();
  return course;
}

export async function generateMetadata({
  params,
}: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { title, description } = await getCourse(params);
  return { title: `${title} — ByteSpace`, description };
}

export default async function CourseDetailsPage({
  params,
}: PageProps<"/courses/[slug]">) {
  const course = await getCourse(params);

  return (
    <main className="isolate overflow-x-clip pt-20 lg:pt-30">
      <div className="mx-auto grid max-w-[1232px] grid-cols-1 px-4 pb-20 lg:grid-cols-[minmax(0,720px)_414px] lg:justify-between lg:gap-x-8 lg:pb-[120px]">
        <div
          aria-hidden="true"
          className="pointer-events-none relative col-span-full row-start-1 row-end-3 -z-10"
        >
          <div className="absolute -top-20 -bottom-10 left-1/2 w-screen lg:-top-30 -translate-x-1/2 overflow-hidden bg-primary lg:-bottom-[62px]">
            <Image
              src="/images/auth/grid.svg"
              alt=""
              width={1442}
              height={1026}
              className="absolute top-0 left-1/2 max-w-none -translate-x-1/2"
            />
          </div>
        </div>

        <header className="col-span-full row-start-1 flex flex-col items-start justify-between gap-6 pt-8 pb-10 md:flex-row lg:pt-[52px] lg:pb-[59px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-shuttle-gray-50">
              <Heading
                as="h1"
                size="heading-m"
                color="light"
                balance={false}
                className="text-[28px]/[1.2] text-shuttle-gray-50 md:text-[36px]/[1.2]"
              >
                {course.title}
              </Heading>
              <p className="font-heading text-xl leading-[1.2] font-semibold tracking-[-0.01em]">
                {course.subtitle}
              </p>
            </div>
            <p className="text-lg leading-[1.2] font-medium text-[#f1f4fe]">
              by <span className="text-secondary">{course.author}</span>
            </p>
            <ul className="flex flex-wrap gap-3 md:gap-4">
              {course.stats.map((stat) => (
                <Badge
                  as="li"
                  key={stat.label}
                  variant="white"
                  className="backdrop-blur-[20px]"
                >
                  <Image src={stat.icon} alt="" width={24} height={24} />
                  {stat.label}
                </Badge>
              ))}
            </ul>
          </div>
          <ShareButton label={course.shareLabel} title={course.title} />
        </header>

        <div className="relative col-start-1 row-start-2 aspect-[720/479] overflow-hidden rounded-[24px] bg-[#443131]">
          <Image
            src={course.preview.image}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover"
          />
          <button
            type="button"
            aria-label={course.preview.playLabel}
            className="absolute top-1/2 left-1/2 flex -translate-1/2 cursor-pointer items-center justify-center rounded-[24px] border border-black-700 bg-[rgba(61,61,61,0.24)] p-2 backdrop-blur-[20px] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:p-4"
          >
            <Image
              src="/images/course-details/play.svg"
              alt=""
              width={72}
              height={72}
              className="size-12 sm:size-[72px]"
            />
          </button>
        </div>

        <CourseSidebar
          lessons={course.lessons}
          enroll={course.enroll}
          includes={course.includes}
          creator={course.creator}
          className="row-start-3 mt-16 self-start lg:col-start-2 lg:row-span-2 lg:row-start-2 lg:mt-0"
        />

        <div className="row-start-4 mt-12 lg:col-start-1 lg:row-start-3 lg:mt-[145px]">
          <CourseTabs
            tabs={course.tabs}
            about={course.about}
            curriculum={course.curriculum}
            reviews={course.reviews}
          />
        </div>
      </div>
    </main>
  );
}

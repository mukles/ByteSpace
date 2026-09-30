import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";
import { SignupShowcase } from "@/components/auth/signup-showcase";
import { getPageMeta, readMd } from "@/lib/content";
import type { CourseShowcaseData, SignupData } from "@/types/content";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = getPageMeta("signup");
  return { title: `${title} — ByteSpace`, description };
}

export default function SignupPage() {
  const { data } = readMd<SignupData>("pages/signup");
  const { data: catalog } = readMd<CourseShowcaseData>("pages/course-showcase");
  const courses = data.showcase.courses
    .map((title) => catalog.courses.find((course) => course.title === title))
    .filter((course) => course !== undefined);

  return (
    <main className="mx-auto flex w-full max-w-[1232px] flex-1 flex-col gap-10 px-4 pb-16 lg:pb-[120px] xl:grid xl:grid-cols-[1fr_579px] xl:gap-0">
      <div className="relative xl:h-[784px]">
        <div className="flex max-w-[475px] flex-col gap-4 text-shuttle-gray-50">
          <p className="font-heading text-xl leading-[1.2] font-semibold tracking-[-0.01em]">
            {data.intro.heading}
          </p>
          <p className="text-base leading-[1.6] md:text-lg">
            {data.intro.body}
          </p>
        </div>
        <div className="hidden xl:block">
          <SignupShowcase
            courses={courses}
            happyStudents={data.showcase.happyStudents}
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[579px] xl:mx-0">
        <SignupForm {...data.form} />
      </div>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";
import type { CourseDetailsData } from "@/types/content";
import { LessonList } from "./lesson-list";

const bodyClass = "text-base leading-[1.6] text-shuttle-gray-700";

type CourseSidebarProps = Pick<
  CourseDetailsData,
  "lessons" | "enroll" | "includes" | "creator"
> & { className?: string };

export function CourseSidebar({
  lessons,
  enroll,
  includes,
  creator,
  className,
}: CourseSidebarProps) {
  return (
    <aside
      aria-label="Course summary"
      className={cn(
        "flex flex-col gap-6 rounded-[24px] border border-shuttle-gray-200 bg-white p-6 sm:p-10",
        className,
      )}
    >
      <div className="flex flex-col gap-6">
        <Heading as="h2" size="heading-xs" className="leading-[1.2]">
          {lessons.heading}
        </Heading>
        <LessonList {...lessons} />
      </div>

      <div className="flex flex-col gap-6">
        <p className={bodyClass}>{enroll.pitch}</p>
        <p className="flex items-end">
          <span className="font-heading text-[36px] leading-[1.2] font-semibold tracking-[-0.01em] text-primary">
            {enroll.price}
          </span>
          <span className={bodyClass}>{enroll.priceSuffix}</span>
        </p>
        <button
          type="button"
          className="flex w-full cursor-pointer items-center justify-center rounded-[24px] bg-secondary px-6 py-3 text-lg leading-[1.2] font-medium text-shuttle-gray-950 transition-colors hover:bg-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {enroll.cta}
        </button>
      </div>

      <Heading as="h2" size="heading-xs" className="leading-[1.2]">
        {includes.heading}
      </Heading>
      <ul className="flex flex-col gap-3">
        {includes.items.map((item) => (
          <li key={item.label} className={cn("flex items-start gap-2", bodyClass)}>
            <Image src={item.icon} alt="" width={24} height={24} className="shrink-0" />
            {item.label}
          </li>
        ))}
      </ul>

      <Image
        src="/images/course-details/divider.svg"
        alt=""
        width={332}
        height={1}
        className="w-full"
      />

      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-3">
          <Image
            src={creator.avatar}
            alt=""
            width={52}
            height={52}
            className="shrink-0 rounded-full"
          />
          <div>
            <p className="text-lg leading-[1.2] font-medium text-shuttle-gray-950">
              {creator.name}
            </p>
            <p className={bodyClass}>{creator.role}</p>
          </div>
        </div>
        <p className={bodyClass}>{creator.bio}</p>
        <Link
          href={creator.profileHref}
          className="self-start rounded-[24px] border border-shuttle-gray-200 px-4 py-2 text-base leading-[1.2] font-medium text-shuttle-gray-700 transition-colors hover:bg-shuttle-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {creator.profileLabel}
        </Link>
      </div>
    </aside>
  );
}

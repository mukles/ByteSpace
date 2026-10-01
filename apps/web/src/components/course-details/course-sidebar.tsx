import Image from "next/image";
import { CreatorAvatar } from "@/components/creators/creator-avatar";
import { Button } from "@/components/ui/button";
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
        <Button fullWidth>{enroll.cta}</Button>
      </div>

      <Heading as="h2" size="heading-xs" className="leading-[1.2]">
        {includes.heading}
      </Heading>
      <ul className="flex flex-col gap-3">
        {includes.items.map((item) => (
          <li
            key={item.label}
            className={cn("flex items-start gap-2", bodyClass)}
          >
            <Image
              src={item.icon}
              alt=""
              width={24}
              height={24}
              className="shrink-0"
            />
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
          <CreatorAvatar
            name={creator.name}
            src={creator.avatar}
            size={52}
            className="size-[52px] rounded-full text-lg"
          />
          <div>
            <p className="text-lg leading-[1.2] font-medium text-shuttle-gray-950">
              {creator.name}
            </p>
            <p className={bodyClass}>{creator.role}</p>
          </div>
        </div>
        <p className={bodyClass}>{creator.bio}</p>
        <Button
          href={creator.profileHref}
          variant="outline"
          size="sm"
          className="self-start text-shuttle-gray-700"
        >
          {creator.profileLabel}
        </Button>
      </div>
    </aside>
  );
}

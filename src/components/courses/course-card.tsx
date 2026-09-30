import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";
import type { Course } from "@/types/content";

const AVATARS = Array.from(
  { length: 4 },
  (_, i) => `/images/courses/avatar-${i + 1}.png`,
);

const statChipClass =
  "rounded-[24px] bg-[rgba(246,246,246,0.6)] px-3 py-1.5 text-xs leading-[1.2] font-medium text-black-700 backdrop-blur-[4px]";

const VARIANTS = {
  default: {
    star: "/images/courses/star.svg",
    bubble: "/images/courses/count-bubble.svg",
    bubbleText: "text-shuttle-gray-950",
  },
  highlight: {
    star: "/images/courses/star-lime.svg",
    bubble: "/images/courses/count-bubble-dark.svg",
    bubbleText: "text-white",
  },
} as const;

interface CourseCardProps {
  course: Course;
  variant?: keyof typeof VARIANTS;
  className?: string;
}

export function CourseCard({
  course,
  variant = "default",
  className,
}: CourseCardProps) {
  const v = VARIANTS[variant];

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-[21px] overflow-hidden rounded-[24px] border border-shuttle-gray-200 bg-white p-[15px] pb-[22px] transition-shadow duration-300 hover:shadow-card-hover",
        className,
      )}
    >
      <div className="relative aspect-[341/195] overflow-hidden rounded-xl bg-[#443131]">
        <Image
          src={course.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 341px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <ul className="absolute bottom-[19px] left-3 flex flex-wrap gap-3">
          <li className={statChipClass}>{course.lessons}</li>
          <li className={statChipClass}>{course.duration}</li>
          <li className={statChipClass}>{course.comments}</li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Heading
              as="h3"
              size="heading-xs"
              balance={false}
              className="truncate leading-[1.2] text-black-950"
            >
              <Link
                href="/courses"
                className="after:absolute after:inset-0 focus-visible:outline-none after:rounded-[24px] focus-visible:after:ring-2 focus-visible:after:ring-primary"
              >
                {course.title}
              </Link>
            </Heading>
            <p className="text-xs leading-[1.6] text-black-700">
              by <span className="text-primary">{course.author}</span>
            </p>
          </div>
          <p className="flex shrink-0 items-center text-lg leading-[1.6] text-black-700">
            {course.rating}&nbsp;
            <Image src={v.star} alt="" width={24} height={24} />
            <span className="sr-only"> out of 5</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 rounded-[24px] bg-shuttle-gray-50 px-3 py-1.5 text-xs leading-[1.2] font-medium text-shuttle-gray-700">
            <Image
              src="/images/courses/level.svg"
              alt=""
              width={20}
              height={20}
            />
            {course.level}
          </span>
          <div className="flex">
            {AVATARS.map((src) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={32}
                height={32}
                className="-mr-2 shrink-0"
              />
            ))}
            <span className="relative grid size-8 shrink-0 place-items-center">
              <Image
                src={v.bubble}
                alt=""
                width={32}
                height={32}
                className="absolute inset-0"
              />
              <span
                className={cn(
                  "relative text-xs leading-[1.2] font-medium",
                  v.bubbleText,
                )}
              >
                {course.enrolled}
                <span className="sr-only"> students enrolled</span>
              </span>
            </span>
          </div>
        </div>

        <p className="flex items-end">
          <span className="font-heading text-xl leading-[1.2] font-semibold tracking-[-0.01em] text-primary">
            {course.price}
          </span>
          <span className="text-xs leading-[1.6] text-black-700">
            {course.priceSuffix}
          </span>
        </p>
      </div>
    </article>
  );
}

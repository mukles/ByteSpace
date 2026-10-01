import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import type { HeroData } from "@/types/content";

const AVATARS = Array.from(
  { length: 7 },
  (_, i) => `/images/hero/avatar-${i + 1}.png`,
);

const cardClass =
  "absolute flex flex-col rounded-2xl bg-white p-4 text-shuttle-gray-950 backdrop-blur-[10px]";

export function CategoryCard({
  name,
  courses,
  students,
}: HeroData["category"]) {
  return (
    <div
      data-hero="card"
      className={cardClass}
      style={{ left: "calc(50% - 316px)", top: 127 }}
    >
      <p className="text-base leading-[1.2] font-medium">{name}</p>
      <p className="flex items-center gap-2 text-xs leading-[1.6] text-shuttle-gray-400">
        <span>{courses}</span>
        <span className="text-[10px] leading-[1.5]">•</span>
        <span>{students}</span>
      </p>
    </div>
  );
}

type Positioned = { style?: CSSProperties };

export function ProgressCard({
  label,
  value,
  style = { left: "calc(50% + 122px)", top: 139 },
}: HeroData["progress"] & Positioned) {
  return (
    <div data-hero="card" className={`${cardClass} gap-2`} style={style}>
      <p className="text-sm leading-[1.2] font-medium">{label}</p>
      <p
        data-hero="progress-value"
        data-value={value}
        className="w-[200px] font-heading text-5xl leading-[1.2] font-semibold tracking-[-0.01em]"
      >
        {value}%
      </p>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-[200px] overflow-hidden rounded-[24px] bg-[#f6f6f6]"
      >
        <div
          data-hero="progress-bar"
          className="h-full rounded-[24px] bg-secondary"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

const HAPPY_VARIANTS = {
  default: {
    card: "",
    label: "leading-[1.2]",
    rating: "text-xs leading-[1.6]",
    reviews: "text-shuttle-gray-400",
    star: "/images/hero/star.svg",
    bubble: "/images/hero/count-bubble.svg",
    bubbleText: "",
  },
  lime: {
    card: "bg-secondary",
    label: "leading-6",
    rating: "text-[10px] leading-[1.5] font-bold",
    reviews: "font-normal text-shuttle-gray-800",
    star: "/images/hero/star-blue.svg",
    bubble: "/images/hero/count-bubble-dark.svg",
    bubbleText: "text-shuttle-gray-50",
  },
} as const;

export function HappyStudentsCard({
  label,
  rating,
  reviews,
  count,
  variant = "default",
  style = { left: "calc(50% - 392px)", top: 325 },
}: HeroData["happyStudents"] &
  Positioned & { variant?: keyof typeof HAPPY_VARIANTS }) {
  const v = HAPPY_VARIANTS[variant];

  return (
    <div
      data-hero="card"
      className={cn(cardClass, "w-[258px] gap-2", v.card)}
      style={style}
    >
      <div>
        <p className={cn("text-base font-medium", v.label)}>{label}</p>
        <p className={cn("flex items-center", v.rating)}>
          {rating}&nbsp;
          <span className={v.reviews}>{reviews}</span>
          <span className="relative ml-0.5 size-4">
            <Image
              src={v.star}
              alt=""
              width={13.16}
              height={12.57}
              className="absolute top-[6.92%] left-[8.87%]"
            />
          </span>
        </p>
      </div>
      <div className="flex">
        {AVATARS.map((src) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={43}
            height={43}
            data-hero="avatar"
            className="-mr-4 shrink-0"
          />
        ))}
        <span className="relative grid size-[43px] shrink-0 place-items-center">
          <Image
            src={v.bubble}
            alt=""
            width={43}
            height={43}
            className="absolute inset-0"
          />
          <span
            className={cn(
              "relative text-xs leading-[1.5] font-bold",
              v.bubbleText,
            )}
          >
            {count}
          </span>
        </span>
      </div>
    </div>
  );
}

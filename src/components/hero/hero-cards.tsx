import Image from "next/image";
import type { CSSProperties } from "react";
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

// Default positions are the hero stage's; pass `style` to place a card elsewhere
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

export function HappyStudentsCard({
  label,
  rating,
  reviews,
  count,
  style = { left: "calc(50% - 392px)", top: 325 },
}: HeroData["happyStudents"] & Positioned) {
  return (
    <div
      data-hero="card"
      className={`${cardClass} w-[258px] gap-2`}
      style={style}
    >
      <div>
        <p className="text-base leading-[1.2] font-medium">{label}</p>
        <p className="flex items-center text-xs leading-[1.6]">
          {rating}&nbsp;
          <span className="text-shuttle-gray-400">{reviews}</span>
          <span className="relative ml-0.5 size-4">
            <Image
              src="/images/hero/star.svg"
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
            src="/images/hero/count-bubble.svg"
            alt=""
            width={43}
            height={43}
            className="absolute inset-0"
          />
          <span className="relative text-xs leading-[1.5] font-bold">
            {count}
          </span>
        </span>
      </div>
    </div>
  );
}

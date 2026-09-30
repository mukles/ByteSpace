import Image from "next/image";
import { Heading } from "@/components/ui/heading";
import type { CreatorProfileData } from "@/types/content";
import { FollowButton } from "./follow-button";

type CreatorHeroProps = Omit<
  CreatorProfileData,
  "filters" | "sort" | "emptyMessage"
>;

export function CreatorHero({
  name,
  badge,
  tagline,
  avatar,
  bio,
  stats,
  followLabel,
  followingLabel,
}: CreatorHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-primary text-shuttle-gray-50">
      {/* Offset by the navbar height so the grid runs on from the header */}
      <Image
        src="/images/auth/grid.svg"
        alt=""
        width={1442}
        height={1026}
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 -z-10 max-w-none -translate-x-1/2 lg:-top-30"
      />
      <div className="mx-auto flex max-w-[1232px] flex-col gap-8 px-4 pt-8 pb-14 lg:gap-10 lg:pt-[52px] lg:pb-[82px]">
        <div className="flex flex-col gap-8 lg:gap-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Image
              src={avatar}
              alt=""
              width={96}
              height={96}
              priority
              className="size-20 shrink-0 rounded-[24px] object-cover sm:size-24"
            />
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Heading
                  as="h1"
                  size="heading-m"
                  color="light"
                  balance={false}
                  className="text-[28px]/[1.2] text-shuttle-gray-50 md:text-[36px]/[1.2]"
                >
                  {name}
                </Heading>
                <span className="rounded-[24px] bg-secondary px-6 py-2 text-base leading-[1.2] font-medium text-shuttle-gray-950 backdrop-blur-[20px]">
                  {badge}
                </span>
              </div>
              <p className="text-lg leading-[1.6]">{tagline}</p>
            </div>
          </div>

          <div className="text-base leading-[1.6] md:text-lg md:leading-[1.6]">
            {bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-4">
            {stats.map((stat) => (
              <li
                key={stat.label}
                className="flex items-center gap-2 rounded-[24px] bg-white px-6 py-3 text-lg leading-[1.2] font-medium whitespace-nowrap text-shuttle-gray-950 backdrop-blur-[20px]"
              >
                <span className="text-primary">{stat.value}</span>
                {stat.label}
              </li>
            ))}
          </ul>
          <FollowButton label={followLabel} followingLabel={followingLabel} />
        </div>
      </div>
    </section>
  );
}

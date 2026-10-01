import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import type { CreatorSummary, CreatorsPageData } from "@/types/content";
import { CreatorAvatar } from "./creator-avatar";

interface CreatorCardProps {
  creator: CreatorSummary;
  labels: CreatorsPageData["card"];
}

export function CreatorCard({ creator, labels }: CreatorCardProps) {
  const [specialty] = creator.categories;

  const stats = [
    { value: String(creator.courses), label: labels.courses },
    {
      value: `${creator.learners.toLocaleString("en-US")}+`,
      label: labels.learners,
    },
    { value: creator.rating?.toFixed(1) ?? "—", label: labels.rating },
  ];

  return (
    <article className="group relative flex h-full flex-col rounded-[24px] border border-shuttle-gray-200 bg-white p-6 transition duration-300 hover:border-primary/40 hover:shadow-card has-focus-visible:ring-2 has-focus-visible:ring-primary">
      <div className="flex items-center gap-4">
        <CreatorAvatar
          name={creator.name}
          src={creator.avatar}
          size={56}
          className="size-14 rounded-full text-lg"
        />
        <div className="min-w-0">
          <Heading
            as="h2"
            size="heading-xs"
            balance={false}
            className="truncate leading-[1.2] text-black-950"
          >
            <Link
              href={`/creators/${creator.slug}`}
              className="after:absolute after:inset-0 after:rounded-[24px] focus-visible:outline-none"
            >
              {creator.name}
            </Link>
          </Heading>
          {specialty && (
            <p className="mt-1 truncate text-sm leading-[1.6] text-primary">
              {specialty}
            </p>
          )}
        </div>
      </div>

      <p className="mt-5 line-clamp-2 min-h-[3.2em] text-base leading-[1.6] text-shuttle-gray-700">
        {creator.tagline}
      </p>

      <dl className="mt-6 grid grid-cols-3 border-t border-shuttle-gray-100 pt-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col-reverse gap-0.5 not-first:border-l not-first:border-shuttle-gray-100 not-first:pl-4"
          >
            <dt className="text-xs leading-[1.6] text-shuttle-gray-400">
              {stat.label}
            </dt>
            <dd className="font-heading text-lg leading-[1.2] font-semibold text-shuttle-gray-950">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <p
        aria-hidden="true"
        className="mt-6 flex items-center gap-2 text-base leading-[1.2] font-medium text-primary"
      >
        {labels.viewProfile}
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        >
          <path
            d="M3 8h10m0 0L9 4m4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </p>
    </article>
  );
}

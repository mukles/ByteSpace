import Image from "next/image";
import type { Metadata } from "next";
import { CreatorCta } from "@/components/creator-cta/creator-cta";
import { CreatorCard } from "@/components/creators/creator-card";
import { Heading } from "@/components/ui/heading";
import { getCreators, getPageMeta, readMd } from "@/lib/content";
import type { CreatorsPageData } from "@/types/content";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = getPageMeta("creators");
  return { title: `${title} — ByteSpace`, description };
}

export default function CreatorsPage() {
  const { data } = readMd<CreatorsPageData>("pages/creators");
  const creators = getCreators();

  const totalCourses = creators.reduce((sum, c) => sum + c.courses, 0);
  const rated = creators.filter((c) => c.rating !== null);
  const avgRating = rated.length
    ? rated.reduce((sum, c) => sum + (c.rating ?? 0), 0) / rated.length
    : null;

  const summary = [
    { value: String(creators.length), label: data.summary.creators },
    { value: String(totalCourses), label: data.summary.courses },
    { value: avgRating?.toFixed(1) ?? "—", label: data.summary.rating },
  ];

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-primary pt-20 text-shuttle-gray-50 lg:pt-30">
        <Image
          src="/images/auth/grid.svg"
          alt=""
          width={1442}
          height={1026}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -z-10 max-w-none -translate-x-1/2"
        />
        <div className="mx-auto flex max-w-[1232px] flex-col gap-10 px-4 pt-8 pb-14 lg:flex-row lg:items-end lg:justify-between lg:pt-[52px] lg:pb-[72px]">
          <div className="flex max-w-[640px] flex-col gap-4">
            <p className="text-sm leading-[1.2] font-medium tracking-[0.2em] text-secondary uppercase">
              {data.eyebrow}
            </p>
            <Heading
              as="h1"
              size="heading-m"
              color="light"
              balance={false}
              className="text-shuttle-gray-50 lg:text-[56px]/[1.1]"
            >
              {data.heading}
            </Heading>
            <p className="text-base leading-[1.6] md:text-lg">
              {data.subheading}
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-3 sm:gap-4">
            {summary.map((item) => (
              <div
                key={item.label}
                className="flex flex-col-reverse gap-1 rounded-[24px] border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-[20px] sm:px-6"
              >
                <dt className="text-xs leading-[1.6] whitespace-nowrap text-shuttle-gray-50/80 sm:text-sm">
                  {item.label}
                </dt>
                <dd className="font-heading text-[28px] leading-[1.2] font-semibold text-secondary sm:text-[32px]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        aria-label={data.heading}
        className="mx-auto max-w-[1232px] px-4 py-14 lg:py-20"
      >
        {creators.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {creators.map((creator) => (
              <li key={creator.slug}>
                <CreatorCard creator={creator} labels={data.card} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-16 text-center text-lg leading-[1.6] text-shuttle-gray-400">
            {data.emptyMessage}
          </p>
        )}
      </section>

      <CreatorCta />
    </main>
  );
}

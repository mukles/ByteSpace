import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import { readMd } from "@/lib/content";
import type { LearningPathsData } from "@/types/content";

export function LearningPaths() {
  const { data } = readMd<LearningPathsData>("pages/learning-paths");

  return (
    <section className="bg-white pb-16 lg:pb-[120px]">
      <div className="mx-auto max-w-[1234px] px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <Heading
            as="h2"
            size="heading-m"
            align="center"
            className="text-mirage-950 md:text-[36px]/[1.2]"
          >
            {data.heading}
          </Heading>
          <p className="max-w-[917px] text-base leading-[1.6] text-shuttle-gray-400 md:text-lg">
            {data.subheading}
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:mt-[68px] lg:grid-cols-6 lg:gap-10">
          {data.categories.map((category) => (
            <li key={category.name}>
              <Link
                href={category.href}
                className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-[24px] border border-shuttle-gray-200 bg-white transition-colors duration-300 ease-out hover:border-primary hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="rounded-full bg-secondary p-3 transition-transform duration-300 ease-out group-hover:-rotate-6">
                  <Image src={category.icon} alt="" width={36} height={36} />
                </span>
                <span className="text-lg leading-[1.2] font-medium text-shuttle-gray-950 transition-colors duration-300 group-hover:text-white md:text-xl">
                  {category.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

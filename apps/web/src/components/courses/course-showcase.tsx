import { Heading } from "@/components/ui/heading";
import { getShowcase } from "@/lib/content";
import { CourseFilter } from "./course-filter";

export function CourseShowcase() {
  const { heading, subheading, ...filter } = getShowcase();

  return (
    <section className="bg-white py-14 lg:py-[72px]">
      <div className="mx-auto max-w-[1231px] px-4">
        <div
          data-reveal
          className="flex flex-col items-center gap-4 text-center"
        >
          <Heading
            as="h2"
            size="heading-m"
            align="center"
            className="max-w-[588px] text-mirage-950"
          >
            {heading}
          </Heading>
          <p className="max-w-[917px] text-base leading-[1.6] text-shuttle-gray-400 md:text-lg">
            {subheading}
          </p>
        </div>

        <CourseFilter {...filter} />
      </div>
    </section>
  );
}

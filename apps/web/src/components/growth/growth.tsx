import Image from "next/image";
import { CourseCard } from "@/components/courses/course-card";
import { HappyStudentsCard, ProgressCard } from "@/components/hero/hero-cards";
import { HeroShape } from "@/components/hero/hero-shape";
import { Heading } from "@/components/ui/heading";
import { getShowcase, readMd } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { GrowthData, StatCardData } from "@/types/content";

function StatCard({
  label,
  period,
  amount,
  change,
  progress,
  className,
}: StatCardData & { progress?: number; className?: string }) {
  return (
    <div
      className={cn(
        "absolute flex flex-col gap-2 rounded-2xl bg-primary p-4 text-shuttle-gray-50 backdrop-blur-[10px]",
        className,
      )}
    >
      <div>
        <p className="text-base leading-[1.2] font-medium">{label}</p>
        <p className="text-[10px] leading-[1.2]">{period}</p>
      </div>
      {progress === undefined ? (
        <>
          <p className="font-heading text-2xl leading-8 font-semibold tracking-[-0.01em]">
            {amount}
          </p>
          <span className="self-start rounded-[24px] bg-secondary-hover px-2 py-0.5 text-[10px] leading-5 font-medium text-shuttle-gray-950">
            {change}
          </span>
        </>
      ) : (
        <>
          <div className="flex w-[200px] items-center justify-between">
            <p className="font-heading text-2xl leading-8 font-semibold tracking-[-0.01em]">
              {amount}
            </p>
            <span className="rounded-[24px] bg-secondary-hover px-2 py-0.5 text-[10px] leading-5 font-medium text-shuttle-gray-950">
              {change}
            </span>
          </div>
          <div className="h-2 w-[200px] overflow-hidden rounded-[24px] bg-white">
            <div
              className="h-full rounded-[24px] bg-secondary"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}

const stageWrap = "relative mx-auto shrink-0 lg:mx-0";
const stage = "absolute top-0 left-0 origin-top-left scale-[0.55] sm:scale-100";

export function Growth() {
  const { data } = readMd<GrowthData>("pages/growth");
  const showcase = getShowcase();
  const { learner, creator } = data;

  return (
    <section className="relative isolate overflow-hidden bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-full w-[1440px] -translate-x-1/2"
      >
        <Image
          src="/images/glows/growth-glows.svg"
          alt=""
          width={2536}
          height={2471}
          className="absolute top-[-506px] left-[-548px] max-w-none"
        />
        <Image
          src="/images/glows/glow-lime-sm.svg"
          alt=""
          width={752}
          height={752}
          className="absolute top-[906px] left-[-327px] max-w-none"
        />
      </div>

      <div className="mx-auto flex max-w-[1232px] flex-col gap-16 px-4 py-16 lg:gap-[72px] lg:py-[120px]">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-[63px]">
          <div
            data-reveal="left"
            className="flex max-w-[574px] flex-col gap-6 lg:w-[574px] lg:shrink-0 lg:gap-10"
          >
            <Heading as="h2" size="heading-m" balance={false}>
              {learner.heading}
            </Heading>
            <p className="max-w-[477px] text-base leading-[1.6] text-shuttle-gray-700 md:text-lg">
              {learner.body}
            </p>
            <dl className="flex gap-10 md:gap-14">
              {learner.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="text-base leading-[1.6] text-shuttle-gray-700 md:text-lg">
                    {stat.label}
                  </dt>
                  <dd className="font-heading text-[28px] leading-9 font-medium tracking-[-0.01em] text-primary md:text-4xl md:leading-11">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            aria-hidden="true"
            data-reveal="right"
            className={cn(
              stageWrap,
              "h-[304px] w-[342px] sm:h-[552px] sm:w-[621px]",
            )}
          >
            <div className={cn(stage, "h-[552px] w-[621px]")}>
              <CourseCard
                course={showcase.courses[0]}
                variant="highlight"
                className="absolute top-0 left-0 w-[373px]"
              />
              <Image
                src="/images/hero/student.png"
                alt=""
                width={577}
                height={540}
                className="absolute top-3 left-0 max-w-none drop-shadow-elevated"
              />
              <ProgressCard
                {...learner.progress}
                style={{ left: 345, top: 213 }}
              />
              <HeroShape
                src="/images/hero/shape-spring-upright.png"
                size={215}
                x={203}
                y={67}
                tint="lime"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-[79px]">
          <div
            aria-hidden="true"
            data-reveal="left"
            className={cn(
              stageWrap,
              "order-last h-[328px] w-[298px] sm:h-[596px] sm:w-[541px] lg:order-none",
            )}
          >
            <div className={cn(stage, "h-[596px] w-[541px]")}>
              <StatCard {...creator.revenue} className="top-11 left-0" />
              <StatCard
                {...creator.yearToDate}
                className="top-[194px] left-0 w-[134px]"
              />
              <div className="absolute top-0 left-7 h-[596px] w-[435px] overflow-hidden drop-shadow-elevated">
                <Image
                  src="/images/growth/creator.png"
                  alt=""
                  width={500}
                  height={500}
                  className="absolute top-0 left-[-28.51%] h-[114.6%] w-[157.01%] max-w-none"
                />
              </div>
              <HappyStudentsCard
                {...creator.happyStudents}
                style={{ left: 283, top: 413 }}
              />
              <HeroShape
                src="/images/hero/shape-spring.png"
                size={215}
                x={142}
                y={114}
                tint="lime"
              />
            </div>
          </div>

          <div
            data-reveal="right"
            className="flex max-w-[580px] flex-col gap-6 lg:gap-10"
          >
            <Heading
              as="h2"
              size="heading-m"
              balance={false}
              className="max-w-[391px]"
            >
              {creator.heading}
            </Heading>
            <p className="text-base leading-[1.6] text-shuttle-gray-700 md:text-lg">
              <strong className="font-bold text-shuttle-gray-950">
                {creator.brand}
              </strong>{" "}
              {creator.body}
            </p>
            <ul className="flex flex-col gap-4">
              {creator.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-end gap-2 text-base leading-[1.2] font-medium text-shuttle-gray-950 md:text-lg"
                >
                  <Image
                    src="/images/growth/check.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

import { CourseCard } from "@/components/courses/course-card";
import { HappyStudentsCard } from "@/components/hero/hero-cards";
import { HeroShape } from "@/components/hero/hero-shape";
import { readMd } from "@/lib/content";
import type { AuthShowcaseData, CourseShowcaseData } from "@/types/content";

const CARD_POSITIONS = [
  { left: 2, top: 274 },
  { left: 113, top: 185 },
];

const SHAPES = [
  {
    src: "/images/hero/shape-spring-small.png",
    size: 175,
    x: 127.5,
    y: 506,
    tint: "white",
    flip: true,
  },
  {
    src: "/images/hero/shape-torus.png",
    size: 146,
    x: -206,
    y: 200,
    tint: "lime",
  },
  {
    src: "/images/hero/shape-pyramid.png",
    size: 188,
    x: -239,
    y: 582,
    tint: "lime",
  },
] as const;

export function AuthShowcase() {
  const { data } = readMd<AuthShowcaseData>("auth-showcase");
  const { data: catalog } = readMd<CourseShowcaseData>("pages/course-showcase");
  const courses = data.courses
    .map((title) => catalog.courses.find((course) => course.title === title))
    .filter((course) => course !== undefined);

  return (
    <div
      aria-hidden="true"
      inert
      className="pointer-events-none absolute inset-y-0 left-0 w-[620px]"
    >
      {courses.map((course, i) => (
        <div key={course.title} className="absolute" style={CARD_POSITIONS[i]}>
          <CourseCard
            course={course}
            variant="highlight"
            className="h-[384px] w-[373px]"
          />
        </div>
      ))}
      <HappyStudentsCard
        {...data.happyStudents}
        variant="lime"
        style={{ left: 228, top: 620 }}
      />
      {SHAPES.map((shape) => (
        <HeroShape key={shape.src} {...shape} />
      ))}
    </div>
  );
}

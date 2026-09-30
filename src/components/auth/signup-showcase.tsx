import { CourseCard } from "@/components/courses/course-card";
import { HappyStudentsCard } from "@/components/hero/hero-cards";
import { HeroShape } from "@/components/hero/hero-shape";
import type { Course, SignupData } from "@/types/content";

// Positions are from the Figma frame, relative to the left column's top-left
const CARD_POSITIONS = [
  { left: 2, top: 274 },
  { left: 113, top: 185 },
];

// Shape x is the offset of its centre from the stage centre (stage is 620px wide)
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

interface SignupShowcaseProps {
  courses: Course[];
  happyStudents: SignupData["showcase"]["happyStudents"];
}

// Decorative collage beside the form — hidden from assistive tech and pointer input
export function SignupShowcase({
  courses,
  happyStudents,
}: SignupShowcaseProps) {
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
        {...happyStudents}
        variant="lime"
        style={{ left: 228, top: 620 }}
      />
      {SHAPES.map((shape) => (
        <HeroShape key={shape.src} {...shape} />
      ))}
    </div>
  );
}

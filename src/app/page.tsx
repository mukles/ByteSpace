import { CourseShowcase } from "@/components/courses/course-showcase";
import { Hero } from "@/components/hero/hero";
import { LearningPaths } from "@/components/learning-paths/learning-paths";
import { Partners } from "@/components/partners/partners";
import { getPageMeta } from "@/lib/content";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = getPageMeta("home");
  return { title: `${title} — ByteSpace`, description };
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Partners />
      <CourseShowcase />
      <LearningPaths />
    </main>
  );
}

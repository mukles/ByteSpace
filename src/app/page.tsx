import { CourseShowcase } from "@/components/courses/course-showcase";
import { Hero } from "@/components/hero/hero";
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
    </main>
  );
}

import { getPageMeta } from "@/lib/content";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = getPageMeta("courses");
  return { title: `${title} — ByteSpace`, description };
}

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-white text-[#242528]">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <p className="text-[#7F30F7] font-medium text-sm uppercase tracking-widest mb-3">
          Browse All Courses
        </p>
        <h1 className="text-5xl font-semibold text-[#040818] tracking-tight mb-6">
          Explore Diverse Learning Paths
        </h1>
        <p className="text-[#4B4F53] text-lg max-w-2xl leading-relaxed">
          At Bytespace, we believe in empowering individuals through knowledge.
          Our diverse range of courses spans various fields, ensuring there&apos;s
          something for everyone.
        </p>
      </div>
    </main>
  );
}

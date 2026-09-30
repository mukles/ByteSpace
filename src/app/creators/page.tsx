import { getPageMeta } from "@/lib/content";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { title, description } = getPageMeta("creators");
  return { title: `${title} — ByteSpace`, description };
}

export default function CreatorsPage() {
  return (
    <main className="min-h-screen bg-white text-[#242528]">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <p className="text-[#7F30F7] font-medium text-sm uppercase tracking-widest mb-3">
          For Creators
        </p>
        <h1 className="text-5xl font-semibold text-[#040818] tracking-tight mb-6">
          Create &amp; Manage Courses Easily.
        </h1>
        <p className="text-[#4B4F53] text-lg max-w-2xl leading-relaxed mb-10">
          ByteSpace supports individuals or entities in the creation,
          publication, and administration of educational courses.
        </p>
        <ul className="space-y-4">
          {[
            "Share Your Expertise",
            "Monetize Your Passion",
            "Flexibility and Autonomy",
            "Build a Community",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3 text-[#242528] text-lg">
              <span className="w-5 h-5 rounded-full bg-[#D4FB20] flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-black" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

import { Hero } from "@/components/hero/hero";
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
    </main>
  );
}

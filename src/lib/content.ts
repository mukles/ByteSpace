import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { MdFile, PageMeta, NavLink } from "@/types/content";

const ROOT = process.cwd();

export function readMd<T = Record<string, unknown>>(filePath: string): MdFile<T> {
  const abs = path.join(ROOT, "content", `${filePath}.md`);
  const raw = fs.readFileSync(abs, "utf-8");
  const { data, content } = matter(raw);
  return { data: data as T, content };
}

export function getPageMeta(slug: string): PageMeta {
  const { data } = readMd<PageMeta>(`pages/${slug}`);
  return { title: data.title ?? slug, description: data.description ?? "", slug };
}

export function getAllPages(): PageMeta[] {
  const dir = path.join(ROOT, "content/pages");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => getPageMeta(f.replace(/\.md$/, "")));
}

export function getCreatorSlugs(): string[] {
  const dir = path.join(ROOT, "content/creators");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getNavLinks(): NavLink[] {
  const { data } = readMd<{ links: NavLink[] }>("navigation");
  return data.links ?? [];
}

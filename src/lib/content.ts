import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  CourseDetailsData,
  CourseShowcaseData,
  MdFile,
  NavLink,
  PageMeta,
} from "@/types/content";

const ROOT = process.cwd();

export function readMd<T = Record<string, unknown>>(
  filePath: string,
): MdFile<T> {
  const abs = path.join(ROOT, "content", `${filePath}.md`);
  const raw = fs.readFileSync(abs, "utf-8");
  const { data, content } = matter(raw);
  return { data: data as T, content };
}

export function getPageMeta(slug: string): PageMeta {
  const { data } = readMd<PageMeta>(`pages/${slug}`);
  return {
    title: data.title ?? slug,
    description: data.description ?? "",
    slug,
  };
}

export function getAllPages(): PageMeta[] {
  const dir = path.join(ROOT, "content/pages");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => getPageMeta(f.replace(/\.md$/, "")));
}

export function getCatalog() {
  const featured = readMd<CourseShowcaseData>("pages/course-showcase").data;
  const extra = readMd<{ courses: CourseShowcaseData["courses"] }>(
    "catalog",
  ).data;
  return [...featured.courses, ...extra.courses];
}

export function getCourseSlugs(): string[] {
  return getCatalog().map((course) => course.slug);
}

const TEMPLATE_COURSE = "build-digital-asset";

export function getCourseDetails(slug: string): CourseDetailsData | null {
  const course = getCatalog().find((c) => c.slug === slug);
  if (!course) return null;

  const own = fs.existsSync(path.join(ROOT, "content/courses", `${slug}.md`));
  const { data } = readMd<CourseDetailsData>(
    `courses/${own ? slug : TEMPLATE_COURSE}`,
  );
  if (own) return data;

  const [level, ...stats] = data.stats;
  return {
    ...data,
    title: course.title,
    author: course.author,
    stats: [{ ...level, label: course.level }, ...stats],
    preview: { ...data.preview, image: course.image },
    enroll: {
      ...data.enroll,
      price: course.price,
      priceSuffix: course.priceSuffix,
    },
  };
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

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import type {
  Course,
  CourseDetailsData,
  CourseDetailsPage,
  CourseFile,
  CourseReview,
  CourseReviewsFile,
  CourseShowcaseData,
  CourseShowcaseFile,
  CoursesPageData,
  CreatorFile,
  CreatorProfileData,
  CreatorProfilePage,
  CreatorSummary,
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

function slugsIn(dir: string): string[] {
  return fs
    .readdirSync(path.join(ROOT, "content", dir))
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}

function paragraphs(markdown: string): string[] {
  return markdown
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

class ContentError extends Error {
  constructor(file: string, message: string) {
    super(`content/${file}.md: ${message}`);
    this.name = "ContentError";
  }
}

function assertFields<T>(file: string, data: T, fields: (keyof T)[]) {
  for (const field of fields) {
    const value = data[field];
    if (value === undefined || value === null || value === "") {
      throw new ContentError(file, `missing required field "${String(field)}"`);
    }
  }
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
  return slugsIn("pages").map(getPageMeta);
}

export function getCreatorSlugs(): string[] {
  return slugsIn("creators");
}

export function getCourseSlugs(): string[] {
  return slugsIn("courses");
}

const loadCreators = cache(() => {
  const creators = new Map<string, CreatorFile & { bio: string[] }>();
  for (const slug of getCreatorSlugs()) {
    const file = `creators/${slug}`;
    const { data, content } = readMd<CreatorFile>(file);
    assertFields(file, data, ["name", "tagline", "role", "followers"]);
    creators.set(slug, { ...data, bio: paragraphs(content) });
  }
  return creators;
});

const loadCourses = cache(() => {
  const creators = loadCreators();
  const { data: coursesPage } = readMd<CoursesPageData>("pages/courses");
  const levels = new Set(coursesPage.level.options.map((o) => o.label));
  const categories = new Set(coursesPage.categories);
  const reviewSlugs = new Set(slugsIn("reviews"));

  for (const slug of reviewSlugs) {
    if (!fs.existsSync(path.join(ROOT, "content/courses", `${slug}.md`))) {
      throw new ContentError(
        `reviews/${slug}`,
        `no course file courses/${slug}.md`,
      );
    }
  }

  return getCourseSlugs().map((slug) => {
    const file = `courses/${slug}`;
    const { data, content } = readMd<CourseFile>(file);
    assertFields(file, data, [
      "title",
      "image",
      "category",
      "level",
      "creator",
      "price",
      "students",
      "lessonCount",
      "duration",
    ]);
    if (!creators.has(data.creator)) {
      throw new ContentError(
        file,
        `creator "${data.creator}" has no creators/${data.creator}.md`,
      );
    }
    if (!levels.has(data.level)) {
      throw new ContentError(
        file,
        `level "${data.level}" is not one of ${[...levels].join(", ")}`,
      );
    }

    if (!categories.has(data.category)) {
      throw new ContentError(
        file,
        `category "${data.category}" is not listed in pages/courses.md`,
      );
    }

    const reviewsFile = `reviews/${slug}`;
    if (!reviewSlugs.has(slug)) {
      throw new ContentError(file, `missing review file ${reviewsFile}.md`);
    }
    const { data: reviews } = readMd<CourseReviewsFile>(reviewsFile);
    if (reviews.course !== slug) {
      throw new ContentError(
        reviewsFile,
        `course "${reviews.course}" does not match the file name "${slug}"`,
      );
    }
    for (const review of reviews.reviews ?? []) {
      assertFields(reviewsFile, review, ["name", "rating", "date", "body"]);
    }

    return { slug, data, body: content, reviews: reviews.reviews ?? [] };
  });
});

function averageRating(reviews: CourseReviewsFile["reviews"]) {
  if (reviews.length === 0) return null;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

export const getCatalog = cache((): Course[] => {
  const creators = loadCreators();
  return loadCourses().map(({ slug, data, reviews }) => {
    const rating = averageRating(reviews);
    return {
      title: data.title,
      slug,
      image: data.image,
      category: data.category,
      author: creators.get(data.creator)!.name,
      creatorSlug: data.creator,
      lessons: `${data.lessonCount} Lessons`,
      duration: data.duration,
      reviews: `${reviews.length} Reviews`,
      level: data.level,
      enrolled: `${data.students}+`,
      rating: rating === null ? "—" : rating.toFixed(1),
      price: data.price,
      priceSuffix: data.priceSuffix ?? "",
    };
  });
});

export function getCourses(slugs: string[], from: string): Course[] {
  const catalog = getCatalog();
  return slugs.map((slug) => {
    const course = catalog.find((c) => c.slug === slug);
    if (!course) throw new ContentError(from, `unknown course "${slug}"`);
    return course;
  });
}

export function getShowcase(): CourseShowcaseData {
  const { data } = readMd<CourseShowcaseFile>("pages/course-showcase");
  return {
    ...data,
    categories: getCategories(),
    courses: getCourses(data.courses, "pages/course-showcase"),
  };
}

const PREVIEW_VIDEOS = cache(
  () => readMd<{ videos?: string[] }>("preview-videos").data.videos ?? [],
);

function pickPreviewVideo(slug: string): string | undefined {
  const videos = PREVIEW_VIDEOS();
  if (videos.length === 0) return undefined;
  const hash = [...slug].reduce(
    (sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0,
    7,
  );
  return videos[hash % videos.length];
}

const reviewDate = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function getCourseDetails(slug: string): CourseDetailsData | null {
  const entry = loadCourses().find((c) => c.slug === slug);
  if (!entry) return null;

  const { data, body, reviews } = entry;
  const page = readMd<CourseDetailsPage>("pages/course-details").data;
  const creator = loadCreators().get(data.creator)!;
  const rating = averageRating(reviews);
  const total = reviews.length;

  const items: CourseReview[] = [...reviews]
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .map((r) => ({ ...r, date: reviewDate.format(new Date(r.date)) }));

  return {
    title: data.title,
    subtitle: data.subtitle,
    description: data.description,
    author: creator.name,
    stats: [
      { label: data.level, icon: page.stats.levelIcon },
      {
        label: fill(page.stats.ratingLabel, {
          rating: rating?.toFixed(1) ?? "—",
          count: total,
        }),
        icon: page.stats.ratingIcon,
      },
      {
        label: fill(page.stats.studentsLabel, { count: data.students }),
        icon: page.stats.studentsIcon,
      },
    ],
    shareLabel: page.shareLabel,
    preview: {
      image: data.image,
      playLabel: page.playLabel,
      video: data.previewVideo || pickPreviewVideo(slug),
    },
    tabs: page.tabs,
    about: {
      ...page.about,
      description: paragraphs(body),
      sneakPeek: data.sneakPeek ?? [],
      keyPoints: data.keyPoints ?? [],
    },
    curriculum: { ...page.curriculum, modules: data.modules ?? [] },
    reviews: {
      ...page.reviews,
      intro: fill(page.reviews.intro, { title: data.title }),
      rating: rating?.toFixed(1) ?? "—",
      breakdown: [5, 4, 3, 2, 1].map((stars) => {
        const count = reviews.filter((r) => r.rating === stars).length;
        return {
          stars,
          count,
          percent: total ? Math.round((count / total) * 10000) / 100 : 0,
        };
      }),
      items,
    },
    lessons: {
      heading: fill(page.lessons.heading, {
        count: data.lessonCount,
        duration: data.duration,
      }),
      items: data.featuredLessons ?? [],
      more: fill(page.lessons.more, {
        count: Math.max(
          0,
          data.lessonCount - (data.featuredLessons?.length ?? 0),
        ),
      }),
    },
    enroll: {
      ...page.enroll,
      price: data.price,
      priceSuffix: data.priceSuffix ?? "",
    },
    includes: { heading: page.includesHeading, items: data.includes ?? [] },
    creator: {
      name: creator.name,
      role: creator.role,
      avatar: creator.avatar,
      bio: creator.tagline,
      profileLabel: page.creator.profileLabel,
      profileHref: `/creators/${data.creator}`,
    },
  };
}

export function getCreatorProfile(slug: string): CreatorProfileData | null {
  const creator = loadCreators().get(slug);
  if (!creator) return null;
  const page = readMd<CreatorProfilePage>("pages/creator-profile").data;

  return {
    name: creator.name,
    badge: page.badge,
    tagline: creator.tagline,
    avatar: creator.avatar,
    bio: creator.bio,
    productsLabel: page.productsLabel,
    stats: [{ value: String(creator.followers), label: page.followersLabel }],
    followLabel: page.followLabel,
    followingLabel: page.followingLabel,
    toolbarIcons: page.toolbarIcons,
    emptyMessage: page.emptyMessage,
    noResults: page.noResults,
  };
}

export function getCreatorCourses(slug: string): Course[] {
  return getCatalog().filter((course) => course.creatorSlug === slug);
}

export function getCreators(): CreatorSummary[] {
  const catalog = getCatalog();

  const teachers = new Map<string, Set<string>>();
  for (const c of catalog) {
    const set = teachers.get(c.category) ?? new Set();
    teachers.set(c.category, set.add(c.creatorSlug));
  }
  const reach = (category: string) => teachers.get(category)?.size ?? 0;

  return [...loadCreators()]
    .map(([slug, { name, tagline, avatar }]) => {
      const own = catalog.filter((course) => course.creatorSlug === slug);
      const ratings = own
        .map((c) => Number.parseFloat(c.rating))
        .filter(Number.isFinite);

      return {
        slug,
        name,
        tagline,
        avatar,
        courses: own.length,
        learners: own.reduce(
          (sum, c) => sum + (Number.parseInt(c.enrolled, 10) || 0),
          0,
        ),
        rating: ratings.length
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : null,
        categories: [...new Set(own.map((c) => c.category))].sort(
          (a, b) => reach(a) - reach(b) || a.localeCompare(b),
        ),
      };
    })
    .sort((a, b) => b.learners - a.learners);
}

export function getCategories(): string[] {
  return readMd<CoursesPageData>("pages/courses").data.categories;
}

export function getNavLinks(): NavLink[] {
  const { data } = readMd<{ links: NavLink[] }>("navigation");
  return data.links ?? [];
}

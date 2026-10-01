import type { Course } from "@/types/content";

export type SearchScope = "courses" | "creators" | "categories";
export type SortKey =
  "relevant" | "rating" | "popular" | "price-asc" | "price-desc";
export type PriceFilter = "free" | "paid";

export interface CourseQuery {
  q: string;
  scope: SearchScope;
  category: string | null;
  levels: string[];
  price: PriceFilter | null;
  minRating: number | null;
  sort: SortKey;
  page: number;
}

type RawParams = Record<string, string | string[] | undefined>;

const SCOPES: SearchScope[] = ["courses", "creators", "categories"];
const SORTS: SortKey[] = [
  "relevant",
  "rating",
  "popular",
  "price-asc",
  "price-desc",
];
const PRICES: PriceFilter[] = ["free", "paid"];

function first(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

function oneOf<T extends string>(value: string, allowed: T[], fallback: T): T {
  return (allowed as string[]).includes(value) ? (value as T) : fallback;
}

export function categorySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function parseCourseQuery(params: RawParams): CourseQuery {
  const page = Number.parseInt(first(params.page), 10);
  const rating = Number.parseFloat(first(params.rating));
  const price = first(params.price);

  return {
    q: first(params.q),
    scope: oneOf(first(params.scope), SCOPES, "courses"),
    category: categorySlug(first(params.category)) || null,
    levels: first(params.level)
      .toLowerCase()
      .split(",")
      .map((level) => level.trim())
      .filter(Boolean),
    price: (PRICES as string[]).includes(price) ? (price as PriceFilter) : null,
    minRating: Number.isFinite(rating) ? rating : null,
    sort: oneOf(first(params.sort), SORTS, "relevant"),
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

export function priceOf(course: Course) {
  const amount = Number.parseFloat(course.price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
}

function enrolledOf(course: Course) {
  return Number.parseInt(course.enrolled, 10) || 0;
}

function searchFields(course: Course, scope: SearchScope) {
  if (scope === "creators") return [course.author];
  if (scope === "categories") return [course.category];
  return [course.title, course.category, course.author];
}

function relevance(course: Course, needle: string) {
  const title = course.title.toLowerCase();
  if (title.startsWith(needle)) return 3;
  if (title.includes(needle)) return 2;
  return 1;
}

export function searchCourses(courses: Course[], query: CourseQuery) {
  const needle = query.q.toLowerCase();

  const matches = courses.filter((course) => {
    if (
      needle &&
      !searchFields(course, query.scope).some((field) =>
        field.toLowerCase().includes(needle),
      )
    ) {
      return false;
    }
    if (query.category && categorySlug(course.category) !== query.category)
      return false;
    if (
      query.levels.length &&
      !query.levels.includes(course.level.toLowerCase())
    ) {
      return false;
    }
    if (query.price === "free" && priceOf(course) > 0) return false;
    if (query.price === "paid" && priceOf(course) === 0) return false;
    if (query.minRating && Number.parseFloat(course.rating) < query.minRating) {
      return false;
    }
    return true;
  });

  const by: Record<SortKey, (a: Course, b: Course) => number> = {
    relevant: (a, b) =>
      needle ? relevance(b, needle) - relevance(a, needle) : 0,
    rating: (a, b) => Number.parseFloat(b.rating) - Number.parseFloat(a.rating),
    popular: (a, b) => enrolledOf(b) - enrolledOf(a),
    "price-asc": (a, b) => priceOf(a) - priceOf(b),
    "price-desc": (a, b) => priceOf(b) - priceOf(a),
  };
  return [...matches].sort(by[query.sort]);
}

export function activeFilterCount(query: CourseQuery) {
  return (
    Number(Boolean(query.category)) +
    query.levels.length +
    Number(Boolean(query.price)) +
    Number(Boolean(query.minRating))
  );
}

export function pageWindow(current: number, total: number): (number | null)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
  return sorted.flatMap((page, i) =>
    i > 0 && page - sorted[i - 1] > 1 ? [null, page] : [page],
  );
}

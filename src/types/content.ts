export interface PageMeta {
  title: string;
  description: string;
  slug: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroData {
  heading: string;
  subheading: string;
  searchPlaceholder: string;
  searchLabel: string;
  category: { name: string; courses: string; students: string };
  progress: { label: string; value: number };
  happyStudents: {
    label: string;
    rating: string;
    reviews: string;
    count: string;
  };
}

export interface Course {
  title: string;
  /** URL segment for /courses/[slug]; details come from content/courses/<slug>.md when it exists */
  slug: string;
  image: string;
  category: string;
  author: string;
  lessons: string;
  duration: string;
  comments: string;
  level: string;
  enrolled: string;
  rating: string;
  price: string;
  priceSuffix: string;
}

export interface CourseShowcaseData {
  heading: string;
  subheading: string;
  featuredLabel: string;
  moreLabel: string;
  moreHref: string;
  emptyMessage: string;
  categories: string[];
  courses: Course[];
}

export interface MdFile<T = Record<string, unknown>> {
  data: T;
  content: string;
}

export interface LearningPathsData {
  heading: string;
  subheading: string;
  categories: { name: string; icon: string; href: string }[];
}

export interface AuthField {
  name: string;
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  autoComplete: string;
}

export interface AuthFormData {
  eyebrow: string;
  heading: string;
  fields: AuthField[];
  submit: string;
  prompt: string;
  promptLink: NavLink;
}

export interface AuthPageData {
  intro: { heading: string; body: string };
  form: AuthFormData;
  /** Login only: "or" divider and social sign-in buttons */
  social?: { divider: string; providers: { name: string; icon: string }[] };
}

export interface AuthShowcaseData {
  /** Titles of courses from the course showcase to feature */
  courses: string[];
  happyStudents: HeroData["happyStudents"];
}

export interface ToolbarButton {
  label: string;
  /** 24px icon, optional */
  icon?: string;
}

export interface CoursesPageData {
  heading: string;
  searchPlaceholder: string;
  scopeLabel: string;
  filters: ToolbarButton[];
  sort: ToolbarButton;
  categories: string[];
  /** Cards per page in the design's grid */
  pageSize: number;
  pagination: { current: number; total: number };
}

export interface IconLabel {
  label: string;
  /** 24px icon */
  icon: string;
}

export interface CourseLesson {
  title: string;
  duration: string;
}

export interface CourseReview {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  body: string;
}

export interface CourseDetailsData {
  title: string;
  subtitle: string;
  description: string;
  author: string;
  stats: IconLabel[];
  shareLabel: string;
  preview: { image: string; playLabel: string };
  tabs: string[];
  about: {
    descriptionHeading: string;
    description: string[];
    sneakPeekHeading: string;
    sneakPeek: string[];
    keyPointsHeading: string;
    keyPoints: string[];
  };
  curriculum: {
    modulesHeading: string;
    modulesIntro: string;
    listHeading: string;
    modules: { title: string; summary: string }[];
    contentHeading: string;
    content: string;
    progressHeading: string;
    progressIntro: string;
    /** Percentage, 0–100 */
    progress: { label: string; value: number };
  };
  reviews: {
    heading: string;
    intro: string;
    ratingLabel: string;
    rating: string;
    breakdown: { stars: number; count: number; percent: number }[];
    listHeading: string;
    allLabel: string;
    emptyMessage: string;
    items: CourseReview[];
  };
  lessons: { heading: string; items: CourseLesson[]; more: string };
  enroll: { pitch: string; price: string; priceSuffix: string; cta: string };
  includes: { heading: string; items: IconLabel[] };
  creator: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
    profileLabel: string;
    profileHref: string;
  };
}

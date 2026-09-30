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

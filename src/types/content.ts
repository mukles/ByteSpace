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

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

export interface MdFile<T = Record<string, unknown>> {
  data: T;
  content: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  heroImage: string;
  email: string;
  location: string;
  focusAreas: string[];
  skillsMarquee: string[];
  socials: SocialLink[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
  year: string;
  featured?: boolean;
}

export interface ExperienceItem {
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  href?: string;
  logo?: string;
}

export interface Tool {
  name: string;
  category: string;
  href: string;
  logo: string;
}

/** A post as the UI consumes it. `content` is Markdown. */
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  /** Raw stored value; null when no cover was set. `image` has the fallback applied. */
  coverImage: string | null;
  published: boolean;
  /** Pre-formatted for display, e.g. "Apr 8, 2026". */
  date: string;
  readTime: string;
  publishedAt: string | null;
  updatedAt: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  budget: string | null;
  message: string;
  date: string;
}

export type NavIcon = "home" | "projects" | "experience" | "tools" | "thoughts";

export interface NavLink {
  label: string;
  href: string;
  /** Key used by the header to pick the matching lucide icon. */
  icon: NavIcon;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Projects", href: "/projects", icon: "projects" },
  { label: "Experience", href: "/experience", icon: "experience" },
  { label: "Tools", href: "/tools", icon: "tools" },
  { label: "Thoughts", href: "/thoughts", icon: "thoughts" },
];

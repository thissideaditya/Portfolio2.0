import { Profile, Stat } from "@/lib/types";

/**
 * Core profile data. This is the single source of truth for
 * the hero section, footer, and contact info across the site.
 * Replace the placeholder values below with real content.
 */
export const profile: Profile = {
  name: "Aditya Chaurasia",
  role: "SOFTWARE ENGINEER",
  tagline: "A Software Engineer who has developed countless innovative solutions.",
  bio: "Passionate about building reliable, scalable systems and crafting products that ships confidence, not just code. Focused on turning complex requirements into clean, dependable products.",
  heroImage: "/heroImage.JPG",
  email: "adityac486@gmail.com",
  location: "Bangalore, India",
  focusAreas: ["DEVELOPER", "DESIGN"],
  skillsMarquee: [
    "JAVA",
    "SPRING BOOT",
    "NODE.JS",
    "REACT.JS",
    "TYPESCRIPT",
    "GOLANG",
    "KAFKA",
    "REDIS",
    "MONGODB",
    "DOCKER",
    "KUBERNETES",
    "AWS",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/thissideaditya" },
    { label: "LinkedIn", href: "https://linkedin.com/in/thissideaditya" },
    { label: "Twitter", href: "https://twitter.com/thissideaditya" },
  ],
};

/**
 * Headline stats shown under the hero (e.g. "+2 YEARS OF EXPERIENCE").
 * Replace with real numbers whenever you like.
 */
export const stats: Stat[] = [
  { value: "+2", label: "YEARS OF EXPERIENCE" },
  { value: "+15", label: "PROJECTS COMPLETED" },
  { value: "+5", label: "TEAMS COLLABORATED WITH" },
];

import { Project } from "@/lib/types";

/**
 * Replace each entry below with your real projects.
 * `featured: true` projects are the ones shown on the homepage preview.
 */
export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Automated Test Framework",
    description:
      "A Selenium + NUnit based automation framework with reusable page objects, parallel execution, and CI reporting.",
    image: "https://picsum.photos/seed/project-one/800/600",
    tags: ["C#", "Selenium", "NUnit", "CI/CD"],
    href: "#",
    year: "2025",
    featured: true,
  },
  {
    slug: "project-two",
    title: "Microservices Order Platform",
    description:
      "Event-driven backend built with Spring Boot, Kafka, and Redis for high-throughput order processing.",
    image: "https://picsum.photos/seed/project-two/800/600",
    tags: ["Java", "Spring Boot", "Kafka", "Redis"],
    href: "#",
    year: "2024",
    featured: true,
  },
  {
    slug: "project-three",
    title: "Realtime Dashboard",
    description:
      "A React + TypeScript dashboard for monitoring service health with live metrics and alerting.",
    image: "https://picsum.photos/seed/project-three/800/600",
    tags: ["React", "TypeScript", "WebSockets"],
    href: "#",
    year: "2024",
    featured: true,
  },
  {
    slug: "project-four",
    title: "GST Compliance Toolkit",
    description:
      "Internal tooling to automate GST return validation and reconciliation for finance teams.",
    image: "https://picsum.photos/seed/project-four/800/600",
    tags: ["Node.js", "MongoDB", "Fintech"],
    href: "#",
    year: "2023",
  },
  {
    slug: "project-five",
    title: "Cloud-Native Inventory System",
    description:
      "A Kubernetes-deployed inventory service across AWS, Azure, and GCP with a unified API gateway.",
    image: "https://picsum.photos/seed/project-five/800/600",
    tags: ["GoLang", "Docker", "Kubernetes", "Multi-cloud"],
    href: "#",
    year: "2023",
  },
  {
    slug: "project-six",
    title: "Insurance Claims Portal",
    description:
      "A NestJS backend and React frontend for submitting and tracking insurance claims end to end.",
    image: "https://picsum.photos/seed/project-six/800/600",
    tags: ["NestJS", "React", "Insurance"],
    href: "#",
    year: "2022",
  },
];

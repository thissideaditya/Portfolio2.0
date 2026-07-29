import { Tool } from "@/lib/types";

/**
 * Tools / tech you use daily. Shown as a grid on the homepage and /tools page.
 */
export const tools: Tool[] = [
  {
    name: "Java / Spring Boot",
    category: "Backend Framework",
    href: "https://spring.io/",
    logo: "https://picsum.photos/seed/tool-spring/100/100",
  },
  {
    name: "Node.js",
    category: "Runtime",
    href: "https://nodejs.org/",
    logo: "https://picsum.photos/seed/tool-node/100/100",
  },
  {
    name: "React.js",
    category: "Frontend Library",
    href: "https://react.dev/",
    logo: "https://picsum.photos/seed/tool-react/100/100",
  },
  {
    name: "Docker",
    category: "Containerization",
    href: "https://www.docker.com/",
    logo: "https://picsum.photos/seed/tool-docker/100/100",
  },
  {
    name: "Kubernetes",
    category: "Orchestration",
    href: "https://kubernetes.io/",
    logo: "https://picsum.photos/seed/tool-k8s/100/100",
  },
  {
    name: "Selenium",
    category: "Test Automation",
    href: "https://www.selenium.dev/",
    logo: "https://picsum.photos/seed/tool-selenium/100/100",
  },
];

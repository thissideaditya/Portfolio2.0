import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/shared/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Aditya Chaurasia",
};

export default function ProjectsPage() {
  return (
    <section className="pb-16 pt-32 sm:pb-24 sm:pt-36">
      <Container>
        <SectionHeading eyebrow="Portfolio" title="All Projects" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}

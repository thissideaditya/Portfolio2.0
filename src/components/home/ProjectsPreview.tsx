import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/shared/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPreview() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Selected Work"
          title="Recent Projects"
          action={
            <Link href="/projects" className="text-sm text-accent hover:underline">
              View all projects &rarr;
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}

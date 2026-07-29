import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ExperienceCard from "@/components/shared/ExperienceCard";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience | Aditya Chaurasia",
};

export default function ExperiencePage() {
  return (
    <section className="pb-16 pt-32 sm:pb-24 sm:pt-36">
      <Container>
        <SectionHeading eyebrow="Career" title="Work Experience" />
        <div>
          {experience.map((item) => (
            <ExperienceCard key={item.company} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

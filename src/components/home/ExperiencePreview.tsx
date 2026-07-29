import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ExperienceCard from "@/components/shared/ExperienceCard";
import { experience } from "@/data/experience";
import { stats } from "@/data/profile";

export default function ExperiencePreview() {
  return (
    <section className="border-t border-border/60 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Career"
          title={`${stats[0].value.replace("+", "")} Years of Experience`}
          action={
            <Link href="/experience" className="text-sm text-accent hover:underline">
              View full history &rarr;
            </Link>
          }
        />
        <div>
          {experience.map((item) => (
            <ExperienceCard key={item.company} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

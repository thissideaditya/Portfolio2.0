import Hero from "@/components/home/Hero";
import SkillsMarquee from "@/components/home/SkillsMarquee";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import ExperiencePreview from "@/components/home/ExperiencePreview";
import ToolsPreview from "@/components/home/ToolsPreview";
import ThoughtsPreview from "@/components/home/ThoughtsPreview";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      {/* Stats now live inside the hero, matching the reference layout. */}
      <Hero />
      <SkillsMarquee />
      <ProjectsPreview />
      <ExperiencePreview />
      <ToolsPreview />
      <ThoughtsPreview />
      <ContactSection />
    </>
  );
}

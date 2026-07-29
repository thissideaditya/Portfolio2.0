import { profile } from "@/data/profile";

export default function SkillsMarquee() {
  // Duplicate the list so the looping animation reads seamlessly.
  const items = [...profile.skillsMarquee, ...profile.skillsMarquee];

  return (
    <section className="overflow-hidden border-b border-border/60 py-6">
      <div className="flex w-max animate-marquee gap-10">
        {items.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="whitespace-nowrap text-sm font-medium uppercase tracking-widest2 text-muted"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

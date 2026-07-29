import Image from "next/image";
import { ExperienceItem } from "@/lib/types";

interface ExperienceCardProps {
  item: ExperienceItem;
}

export default function ExperienceCard({ item }: ExperienceCardProps) {
  return (
    <a
      href={item.href ?? "#"}
      className="group flex flex-col gap-5 border-b border-border py-8 transition-colors first:pt-0 last:border-none sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-4 sm:items-center">
        {item.logo && (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border bg-surface">
            <Image src={item.logo} alt={item.company} fill className="object-cover" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
            {item.company}
          </h3>
          <p className="text-sm text-accent">{item.role}</p>
          <p className="mt-2 max-w-xl text-sm text-muted">{item.description}</p>
        </div>
      </div>
      <span className="shrink-0 whitespace-nowrap text-sm text-muted sm:text-right">
        {item.startDate} &ndash; {item.endDate}
      </span>
    </a>
  );
}

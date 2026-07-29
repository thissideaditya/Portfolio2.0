import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  action?: ReactNode;
}

/**
 * Consistent section header used across the homepage and inner pages:
 * a small eyebrow label, a large title, and an optional right-aligned action/link.
 */
export default function SectionHeading({ eyebrow, title, action }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-medium tracking-widest2 text-accent">{eyebrow}</p>
        )}
        <h2 className="font-display text-3xl font-black uppercase tracking-[-0.02em] text-foreground sm:text-5xl">
          {title}
        </h2>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

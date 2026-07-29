interface SplitHeadingProps {
  /** Rendered in full white. */
  solid: string;
  /** Rendered in the recessed "ghost" grey, on its own line. */
  ghost?: string;
  className?: string;
}

/**
 * The site's signature headline: one line at full contrast, the next
 * dropped back into the background. Used by the hero, section headers,
 * and the admin screens so the treatment stays consistent.
 */
export default function SplitHeading({ solid, ghost, className = "" }: SplitHeadingProps) {
  return (
    <h1
      className={`font-display text-[clamp(2.5rem,9vw,6rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] ${className}`}
    >
      <span className="block text-foreground">{solid}</span>
      {ghost && <span className="block headline-ghost">{ghost}</span>}
    </h1>
  );
}

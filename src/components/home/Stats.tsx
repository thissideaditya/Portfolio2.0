import { stats } from "@/data/profile";

interface StatsProps {
  className?: string;
}

export default function Stats({ className = "" }: StatsProps) {
  return (
    <dl className={`grid max-w-2xl grid-cols-3 gap-6 sm:gap-10 ${className}`}>
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <span className="block font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-black leading-none tracking-tight text-foreground">
              {stat.value}
            </span>
            <span className="mt-3 block text-[11px] font-medium uppercase leading-snug tracking-widest2 text-muted">
              {stat.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

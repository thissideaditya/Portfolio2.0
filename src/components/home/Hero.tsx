import Image from "next/image";
import { Flame } from "lucide-react";
import Container from "@/components/ui/Container";
import SocialLinks from "@/components/ui/SocialLinks";
import Stats from "@/components/home/Stats";
import { profile } from "@/data/profile";

/**
 * Splits the role into a solid first word and a "ghost" remainder,
 * e.g. "SOFTWARE ENGINEER" -> "SOFTWARE" + "ENGINEER".
 */
function splitRole(role: string) {
  const [first, ...rest] = role.trim().split(/\s+/);
  return { first, rest: rest.join(" ") };
}

export default function Hero() {
  const { first, rest } = splitRole(profile.role);

  return (
    <section className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-40">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-16">
        {/* Portrait card */}
        <div className="relative order-1 mx-auto w-full max-w-[380px] animate-rise-in">
          {/* Dashed arc that loops behind the card */}
          <svg
            aria-hidden="true"
            viewBox="0 0 460 560"
            className="pointer-events-none absolute -left-12 -top-10 h-[calc(100%+6rem)] w-[calc(100%+7rem)] text-accent"
          >
            <path
              d="M20 300 A 210 210 0 1 1 300 520"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="18 22"
              className="animate-draw-arc [stroke-dashoffset:0]"
              style={{ strokeDasharray: "18 22" }}
            />
          </svg>

          <div className="relative rounded-card bg-card p-4 pb-12 shadow-2xl shadow-black/50">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-accent">
              <Image
                src={profile.heroImage}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 380px, 85vw"
                className="portrait-duotone object-cover"
              />
            </div>

            <h2 className="mt-6 text-center font-display text-3xl font-extrabold tracking-tight text-black sm:text-[2rem]">
              {profile.name}
            </h2>

            {/* Badge sits on the card's bottom edge */}
            <span className="absolute bottom-0 left-1/2 flex h-20 w-20 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-accent ring-4 ring-background">
              <Image className="rounded-full" src="/acLogo.png" alt="" width={112} height={112} aria-hidden="true" />
            </span>
          </div>
        </div>

        {/* Headline, tagline, stats */}
        <div className="order-2">
          <h1 className="font-display text-[clamp(3rem,11vw,7.5rem)] font-black uppercase leading-[0.88] tracking-[-0.03em]">
            <span className="block text-foreground">{first}</span>
            {rest && <span className="block headline-ghost">{rest}</span>}
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.bio}
          </p>

          <Stats className="mt-12" />

          <SocialLinks links={profile.socials} className="mt-10" />
        </div>
      </Container>
    </section>
  );
}

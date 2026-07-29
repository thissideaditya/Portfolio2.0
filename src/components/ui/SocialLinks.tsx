import { SocialLink } from "@/lib/types";

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
}

export default function SocialLinks({ links, className = "" }: SocialLinksProps) {
  return (
    <ul className={`flex flex-wrap items-center gap-5 ${className}`}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

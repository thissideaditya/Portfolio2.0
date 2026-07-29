import Image from "next/image";
import { Tool } from "@/lib/types";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <a
      href={tool.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/60"
    >
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-border bg-background">
        <Image src={tool.logo} alt={tool.name} fill className="object-cover" />
      </div>
      <div>
        <p className="font-medium text-foreground transition-colors group-hover:text-accent">
          {tool.name}
        </p>
        <p className="text-xs text-muted">{tool.category}</p>
      </div>
    </a>
  );
}

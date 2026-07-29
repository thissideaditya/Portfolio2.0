import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ToolCard from "@/components/shared/ToolCard";
import { tools } from "@/data/tools";

export default function ToolsPreview() {
  return (
    <section className="border-t border-border/60 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Toolkit"
          title="Tools I Use"
          action={
            <Link href="/tools" className="text-sm text-accent hover:underline">
              View all tools &rarr;
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.slice(0, 6).map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </Container>
    </section>
  );
}

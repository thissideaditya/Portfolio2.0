import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogCard from "@/components/shared/BlogCard";
import { listPosts } from "@/lib/db";

export default async function ThoughtsPreview() {
  // A missing or unreachable database hides the section rather than
  // breaking the homepage.
  let posts: Awaited<ReturnType<typeof listPosts>> = [];
  try {
    posts = (await listPosts()).slice(0, 3);
  } catch (error) {
    console.error("Could not load posts:", error);
  }

  if (posts.length === 0) return null;

  return (
    <section className="border-t border-border/60 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Writing"
          title="Design Thoughts"
          action={
            <Link href="/thoughts" className="text-sm text-accent hover:underline">
              View all posts &rarr;
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}

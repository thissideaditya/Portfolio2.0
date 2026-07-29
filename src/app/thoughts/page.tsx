import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SplitHeading from "@/components/ui/SplitHeading";
import BlogCard from "@/components/shared/BlogCard";
import { listPosts } from "@/lib/db";

export const metadata: Metadata = {
  title: "Thoughts | Aditya Chaurasia",
};

/** Re-checks the database at most once a minute; publishing revalidates immediately. */
export const revalidate = 60;

export default async function ThoughtsPage() {
  let posts: Awaited<ReturnType<typeof listPosts>> = [];
  try {
    posts = await listPosts();
  } catch (error) {
    console.error("Could not load posts:", error);
  }

  return (
    <section className="pb-24 pt-32 sm:pt-40">
      <Container>
        <SplitHeading solid="Design" ghost="Thoughts" />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        {posts.length === 0 && (
          <p className="mt-14 text-base text-muted">Nothing published yet. Check back soon.</p>
        )}
      </Container>
    </section>
  );
}

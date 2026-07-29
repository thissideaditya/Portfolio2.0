import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SplitHeading from "@/components/ui/SplitHeading";
import { requireSession } from "@/lib/auth";
import { listPosts } from "@/lib/db";
import { removePost, togglePublished } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Posts",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  await requireSession();
  const posts = await listPosts({ includeDrafts: true });

  return (
    <section className="pb-24 pt-40">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SplitHeading solid="Your" ghost="Writing" />
          <Link
            href="/admin/posts/new"
            className="rounded-xl bg-accent px-6 py-4 text-base font-semibold text-foreground transition-colors hover:bg-accent-soft"
          >
            New post
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="mt-16 text-base text-muted">
            No posts yet. Start with your first one.
          </p>
        ) : (
          <ul className="mt-16 divide-y divide-border border-y border-border">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex flex-wrap items-center justify-between gap-4 py-6"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${
                        post.published
                          ? "bg-accent/15 text-accent-soft"
                          : "bg-surface-hover text-muted"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                    <span className="text-sm text-muted">
                      {post.date} &middot; {post.readTime}
                    </span>
                  </div>
                  <h2 className="mt-2 truncate text-xl font-semibold text-foreground">
                    {post.title}
                  </h2>
                  <p className="mt-1 truncate text-sm text-muted">/thoughts/{post.slug}</p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    Edit
                  </Link>
                  <form action={togglePublished}>
                    <input type="hidden" name="id" value={post.id} />
                    <button
                      type="submit"
                      className="rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      {post.published ? "Unpublish" : "Publish"}
                    </button>
                  </form>
                  <form action={removePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <button
                      type="submit"
                      className="rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}

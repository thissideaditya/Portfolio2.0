import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Container from "@/components/ui/Container";
import { getPostBySlug } from "@/lib/db";

interface PageProps {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug).catch(() => null);
  return {
    title: post ? `${post.title} | Aditya Chaurasia` : "Thoughts",
    description: post?.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug).catch(() => null);
  if (!post) notFound();

  return (
    <article className="pb-24 pt-32 sm:pt-40">
      <Container className="max-w-3xl">
        <Link href="/thoughts" className="text-sm text-accent hover:underline">
          &larr; Back to Thoughts
        </Link>

        <h1 className="mt-8 font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.02em] text-foreground sm:text-6xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-muted">
          {post.date} &middot; {post.readTime}
        </p>

        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border">
          <Image src={post.image} alt={post.title} fill className="object-cover" />
        </div>

        <div className="mt-12 space-y-5 text-base leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_code]:rounded [&_code]:bg-surface-hover [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-surface [&_pre]:p-4 [&_strong]:text-foreground">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </Container>
    </article>
  );
}

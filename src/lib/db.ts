import { neon } from "@neondatabase/serverless";
import type { BlogPost, ContactMessage } from "@/lib/types";

/**
 * Single database entry point. Every SQL statement in the app lives in this
 * file, so swapping Neon for another Postgres provider is a one-file change.
 *
 * The client is created lazily: `next build` runs without DATABASE_URL set,
 * and we only want to fail when a request actually needs the database.
 */
let client: ReturnType<typeof neon> | null = null;

function sql() {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL is not set. Add a Postgres integration in the Vercel dashboard, or copy .env.example to .env.local for local development."
      );
    }
    client = neon(url);
  }
  return client;
}

/** Shape returned by Postgres, before we map it to the app's camelCase type. */
interface PostRow {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

const FALLBACK_COVER = "https://picsum.photos/seed/thoughts/900/600";

function formatDate(value: string | null): string {
  if (!value) return "Draft";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Rough reading time from word count, at 200 words per minute. */
function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function toPost(row: PostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    image: row.cover_image || FALLBACK_COVER,
    coverImage: row.cover_image,
    published: row.published,
    date: formatDate(row.published_at ?? row.created_at),
    readTime: readingTime(row.content),
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
  };
}

/** Turns a title into a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function listPosts(options: { includeDrafts?: boolean } = {}) {
  const rows = options.includeDrafts
    ? await sql()`
        select * from posts
        order by coalesce(published_at, created_at) desc
      `
    : await sql()`
        select * from posts
        where published = true
        order by coalesce(published_at, created_at) desc
      `;
  return (rows as PostRow[]).map(toPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const rows = (await sql()`
    select * from posts where slug = ${slug} and published = true limit 1
  `) as PostRow[];
  return rows[0] ? toPost(rows[0]) : null;
}

export async function getPostById(id: number): Promise<BlogPost | null> {
  const rows = (await sql()`
    select * from posts where id = ${id} limit 1
  `) as PostRow[];
  return rows[0] ? toPost(rows[0]) : null;
}

/** Appends -2, -3, ... until the slug is free. Ignores the post being edited. */
export async function uniqueSlug(base: string, ignoreId?: number): Promise<string> {
  const root = slugify(base) || "post";
  let candidate = root;
  let suffix = 1;

  for (;;) {
    const rows = (await sql()`
      select id from posts where slug = ${candidate} limit 1
    `) as { id: number }[];
    if (!rows[0] || rows[0].id === ignoreId) return candidate;
    suffix += 1;
    candidate = `${root}-${suffix}`;
  }
}

export interface PostInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  published: boolean;
}

export async function createPost(input: PostInput): Promise<BlogPost> {
  const rows = (await sql()`
    insert into posts (slug, title, excerpt, content, cover_image, published, published_at)
    values (
      ${input.slug}, ${input.title}, ${input.excerpt}, ${input.content},
      ${input.coverImage}, ${input.published},
      ${input.published ? new Date().toISOString() : null}
    )
    returning *
  `) as PostRow[];
  return toPost(rows[0]);
}

export async function updatePost(id: number, input: PostInput): Promise<BlogPost> {
  const rows = (await sql()`
    update posts set
      slug = ${input.slug},
      title = ${input.title},
      excerpt = ${input.excerpt},
      content = ${input.content},
      cover_image = ${input.coverImage},
      published = ${input.published},
      updated_at = now(),
      published_at = case
        when ${input.published} and published_at is null then now()
        when ${input.published} then published_at
        else null
      end
    where id = ${id}
    returning *
  `) as PostRow[];
  return toPost(rows[0]);
}

export async function deletePost(id: number): Promise<void> {
  await sql()`delete from posts where id = ${id}`;
}

/* ---------- Contact messages ---------- */

interface MessageRow {
  id: number;
  name: string;
  email: string;
  budget: string | null;
  message: string;
  created_at: string;
}

export async function createMessage(input: {
  name: string;
  email: string;
  budget: string | null;
  message: string;
}): Promise<void> {
  await sql()`
    insert into messages (name, email, budget, message)
    values (${input.name}, ${input.email}, ${input.budget}, ${input.message})
  `;
}

export async function listMessages(): Promise<ContactMessage[]> {
  const rows = (await sql()`
    select * from messages order by created_at desc limit 100
  `) as MessageRow[];
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    budget: row.budget,
    message: row.message,
    date: formatDate(row.created_at),
  }));
}

export async function deleteMessage(id: number): Promise<void> {
  await sql()`delete from messages where id = ${id}`;
}

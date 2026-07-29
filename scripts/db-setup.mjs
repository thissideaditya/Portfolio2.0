/**
 * Creates the tables this site needs and, on an empty database, seeds one
 * welcome post. Safe to re-run: everything is IF NOT EXISTS.
 *
 *   npm run db:setup
 */
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";

// Load .env.local without a dependency, so this runs before npm install of extras.
try {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
} catch (error) {
  const cause = error?.sourceError?.cause?.errors?.[0] ?? error?.sourceError ?? error;
  if (["ETIMEDOUT", "EHOSTUNREACH", "ENOTFOUND", "ECONNREFUSED"].includes(cause?.code)) {
    console.error(
      `\nCouldn't reach the database (${cause.code}).\n\n` +
        "The connection string looks fine — this is a network problem.\n" +
        "  - Disconnect any VPN and try again\n" +
        "  - Try a phone hotspot to rule out your network\n" +
        "  - Confirm the Neon project is still active\n"
    );
    process.exit(1);
  }
  throw error;
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Add it to .env.local first.");
  process.exit(1);
}

const sql = neon(url);

await sql`
  create table if not exists posts (
    id serial primary key,
    slug text unique not null,
    title text not null,
    excerpt text not null default '',
    content text not null default '',
    cover_image text,
    published boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    published_at timestamptz
  )
`;

await sql`
  create table if not exists messages (
    id serial primary key,
    name text not null,
    email text not null,
    budget text,
    message text not null,
    created_at timestamptz not null default now()
  )
`;

await sql`create index if not exists posts_published_idx on posts (published, published_at desc)`;

const [{ count }] = await sql`select count(*)::int as count from posts`;

if (count === 0) {
  await sql`
    insert into posts (slug, title, excerpt, content, cover_image, published, published_at)
    values (
      'hello-world',
      'Hello, world',
      'The first post — written and published from the admin panel.',
      ${"## This post came from the database\n\nEdit or delete it from `/admin`, then write your own.\n\nThe editor takes **Markdown**, so you get headings, lists, `code`, and [links](https://example.com) for free."},
      'https://picsum.photos/seed/hello-world/900/600',
      true,
      now()
    )
  `;
  console.log("Seeded one welcome post.");
}

console.log("Database ready.");

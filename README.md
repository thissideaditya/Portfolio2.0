# Aditya Chaurasia — Portfolio

Next.js 14 (App Router) portfolio with a password-protected admin panel for
writing and publishing blog posts.

- **Public site** — home, projects, experience, tools, thoughts
- **Admin panel** — `/admin`, behind a login at `/admin/login`
- **Storage** — Postgres (Neon), via `@neondatabase/serverless`

---

## Local setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable                | How to get it                                 |
| ----------------------- | --------------------------------------------- |
| `DATABASE_URL`        | Connection string from your Neon dashboard    |
| `AUTH_SECRET`         | `openssl rand -base64 32`                   |
| `ADMIN_EMAIL`         | The email you'll sign in with                 |
| `ADMIN_PASSWORD_HASH` | `npm run hash-password` — paste the output |

Then create the tables and start:

```bash
npm run db:setup
npm run dev
```

Sign in at http://localhost:3000/admin/login

`npm run db:setup` is safe to re-run — every statement is `IF NOT EXISTS`.

---

## Deploying to Vercel

1. **Push to GitHub**, then import the repo at vercel.com/new. Next.js is
   detected automatically; no build settings to change.
2. **Add the database.** In the project: **Storage → Create Database →
   Neon**, from the Vercel Marketplace. The integration injects `DATABASE_URL`
   into your project's environment variables for you.

   > If Vercel reports "Failed to set environment variables," you already have
   > a `DATABASE_URL` defined manually. Remove it, then reinstall.
   >
3. **Add the other three variables** under **Settings → Environment
   Variables**, for Production (and Preview, if you want the admin panel there):
   `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`.

   Use the *same* `ADMIN_PASSWORD_HASH` you generated locally — the hash is
   safe to paste into a dashboard; your plain password is never stored.
4. **Create the tables** against the production database:

   ```bash
   npx vercel env pull .env.local   # pulls DATABASE_URL down
   npm run db:setup
   ```
5. **Redeploy** so the new environment variables are picked up. A deploy
   triggered before step 3 won't see them.

Sign in at `https://your-domain.vercel.app/admin/login`.

---

## How publishing works

Posts are drafts until you tick **Published**. Saving calls
`revalidatePath()` on `/`, `/thoughts`, and the post's own URL, so a published
post appears on the live site within seconds rather than waiting out the
60-second `revalidate` window.

Deleting or unpublishing revalidates the same paths.

---

## A note on the admin security model

Every admin page and every server action calls `requireSession()` directly.
`middleware.ts` also redirects signed-out visitors, but it is **not** the
security boundary — it only prevents an admin screen flashing before the
redirect.

This is deliberate. CVE-2025-29927 (March 2025, CVSS 9.1) let attackers skip
Next.js middleware entirely with a crafted `x-middleware-subrequest` header,
which broke every app relying on middleware alone for authorization. It is
patched in 14.2.25+ and this project pins `next@^14.2.35`, so you are not
exposed — but checking at the point of use means middleware is never the only
thing between a request and the database.

---

## Project structure

```
src/
  app/
    admin/            Login, dashboard, post editor, messages
    thoughts/         Public blog index + post pages
    actions/          Contact form server action
  components/
    admin/            PostEditor
    home/             Hero, Stats, previews, ContactSection
    layout/           Header (sliding nav), Footer
    shared/           Cards
    ui/               Container, Field, SplitHeading, SectionHeading
  data/               profile, projects, experience, tools, navigation
  lib/
    db.ts             Every SQL statement lives here
    auth.ts           Session cookie + requireSession guard
    session-token.ts  JWT sign/verify (Edge-safe, no next/headers)
middleware.ts
scripts/              db-setup.mjs, hash-password.mjs
```

Static content — projects, experience, tools, your name and bio — lives in
`src/data/`. Only blog posts and contact messages are in the database.

## Color palette

Defined once in `tailwind.config.ts`. Nothing is hardcoded, so changing a
token updates the whole site.

| Token          | Hex                                               |
| -------------- | ------------------------------------------------- |
| `background` | `#0D0D0D`                                       |
| `surface`    | `#161616`                                       |
| `border`     | `#272727`                                       |
| `ghost`      | `#2B2B2B` (the outlined half of split headings) |
| `muted`      | `#8B8B8B`                                       |
| `accent`     | `#EF3E10`                                       |

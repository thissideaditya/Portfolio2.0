"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import {
  clearSessionCookie,
  requireSession,
  setSessionCookie,
} from "@/lib/auth";
import {
  createPost,
  deleteMessage,
  deletePost,
  getPostById,
  updatePost,
  uniqueSlug,
  type PostInput,
} from "@/lib/db";

export interface ActionState {
  error?: string;
}

/** Refresh every route that renders posts. */
function revalidatePosts(slug?: string) {
  revalidatePath("/");
  revalidatePath("/thoughts");
  if (slug) revalidatePath(`/thoughts/${slug}`);
  revalidatePath("/admin");
}

/* ---------- Auth ---------- */

export async function login(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  console.log("hash length:", (process.env.ADMIN_PASSWORD_HASH ?? "").length);
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH ?? "";

  if (!adminEmail || !passwordHash) {
    return {
      error:
        "Server is missing ADMIN_EMAIL or ADMIN_PASSWORD_HASH. Run npm run hash-password and add both to your environment variables.",
    };
  }

  // Always run the hash comparison so a wrong email and a wrong password take
  // the same amount of time, and report a single generic failure either way.
  const passwordMatches = await bcrypt.compare(password, passwordHash);
  if (email !== adminEmail || !passwordMatches) {
    return { error: "That email and password combination didn't match." };
  }

  await setSessionCookie(adminEmail);
  redirect("/admin");
}

export async function logout(): Promise<void> {
  clearSessionCookie();
  redirect("/admin/login");
}

/* ---------- Posts ---------- */

async function readPostForm(formData: FormData, ignoreId?: number): Promise<PostInput> {
  const title = String(formData.get("title") ?? "").trim();
  const requestedSlug = String(formData.get("slug") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim();

  return {
    title,
    slug: await uniqueSlug(requestedSlug || title, ignoreId),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content: String(formData.get("content") ?? ""),
    coverImage: coverImage || null,
    published: formData.get("published") === "on",
  };
}

export async function savePost(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireSession();

  const rawId = formData.get("id");
  const id = rawId ? Number(rawId) : null;

  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "Give the post a title before saving." };

  const input = await readPostForm(formData, id ?? undefined);

  if (id) {
    const existing = await getPostById(id);
    if (!existing) return { error: "That post no longer exists." };
    await updatePost(id, input);
    revalidatePosts(existing.slug);
    revalidatePosts(input.slug);
  } else {
    await createPost(input);
    revalidatePosts(input.slug);
  }

  redirect("/admin");
}

export async function togglePublished(formData: FormData): Promise<void> {
  await requireSession();

  const id = Number(formData.get("id"));
  const post = await getPostById(id);
  if (!post) return;

  await updatePost(id, {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    published: !post.published,
  });

  revalidatePosts(post.slug);
}

export async function removePost(formData: FormData): Promise<void> {
  await requireSession();

  const id = Number(formData.get("id"));
  const post = await getPostById(id);
  await deletePost(id);
  revalidatePosts(post?.slug);
}

/* ---------- Messages ---------- */

export async function removeMessage(formData: FormData): Promise<void> {
  await requireSession();
  await deleteMessage(Number(formData.get("id")));
  revalidatePath("/admin/messages");
}

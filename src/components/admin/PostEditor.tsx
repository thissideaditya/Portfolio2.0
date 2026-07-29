"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { savePost, type ActionState } from "@/app/admin/actions";
import Field, { fieldClass } from "@/components/ui/Field";
import type { BlogPost } from "@/lib/types";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-accent px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-accent-soft disabled:opacity-60"
    >
      {pending ? "Saving..." : "Save post"}
    </button>
  );
}

export default function PostEditor({ post }: { post?: BlogPost }) {
  const [state, formAction] = useFormState<ActionState, FormData>(savePost, {});
  const [content, setContent] = useState(post?.content ?? "");
  const [showPreview, setShowPreview] = useState(false);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {post && <input type="hidden" name="id" value={post.id} />}

      <Field label="Title" htmlFor="title">
        <input
          id="title"
          name="title"
          required
          defaultValue={post?.title}
          placeholder="What are you writing about?"
          className={fieldClass}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Slug"
          htmlFor="slug"
          hint="Leave blank to generate one from the title."
        >
          <input
            id="slug"
            name="slug"
            defaultValue={post?.slug}
            placeholder="my-first-post"
            className={fieldClass}
          />
        </Field>

        <Field label="Cover image URL" htmlFor="coverImage" hint="Optional.">
          <input
            id="coverImage"
            name="coverImage"
            type="url"
            defaultValue={post?.image}
            placeholder="https://..."
            className={fieldClass}
          />
        </Field>
      </div>

      <Field label="Excerpt" htmlFor="excerpt" hint="Shown on the cards in the Thoughts list.">
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt}
          placeholder="One or two sentences."
          className={fieldClass}
        />
      </Field>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor="content" className="text-base text-muted">
            Content
          </label>
          <button
            type="button"
            onClick={() => setShowPreview((value) => !value)}
            className="text-sm text-accent hover:underline"
          >
            {showPreview ? "Back to editing" : "Preview"}
          </button>
        </div>

        {showPreview ? (
          <div className="prose-invert min-h-[420px] rounded-xl bg-surface-hover px-5 py-4">
            <div className="space-y-4 text-base leading-relaxed text-muted [&_a]:text-accent [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || "_Nothing to preview yet._"}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <textarea
            id="content"
            name="content"
            rows={18}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={"Write in Markdown.\n\n## A heading\n\nSome **bold** text and a [link](https://example.com)."}
            className={`${fieldClass} font-mono text-sm leading-relaxed`}
          />
        )}

        {/* Keeps the value in the payload while the preview is open. */}
        {showPreview && <input type="hidden" name="content" value={content} />}
      </div>

      <label className="flex items-center gap-3 text-base text-muted">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published}
          className="h-5 w-5 accent-accent"
        />
        Publish this post
      </label>

      {state.error && (
        <p role="alert" className="rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent-soft">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-4">
        <SubmitButton />
      </div>
    </form>
  );
}

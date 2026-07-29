"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login, type ActionState } from "@/app/admin/actions";
import Field, { fieldClass } from "@/components/ui/Field";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-accent px-6 py-4 text-base font-semibold text-foreground transition-colors hover:bg-accent-soft disabled:opacity-60"
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useFormState<ActionState, FormData>(login, {});

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <Field label="Email" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          placeholder="you@email.com"
          className={fieldClass}
        />
      </Field>

      <Field label="Password" htmlFor="password">
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className={fieldClass}
        />
      </Field>

      {state.error && (
        <p role="alert" className="rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent-soft">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}

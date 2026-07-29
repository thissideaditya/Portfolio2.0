"use client";

import { useFormState, useFormStatus } from "react-dom";
import { sendMessage, type ContactState } from "@/app/actions/contact";
import Field, { fieldClass } from "@/components/ui/Field";

const budgetOptions = ["<$1k", "$1k - $3k", "$3k - $5k", ">$5k"];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-accent px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-accent-soft disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Sending..." : "Send message"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState<ContactState, FormData>(sendMessage, {
    status: "idle",
  });

  return (
    <form action={formAction} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <Field label="Name" htmlFor="name">
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          placeholder="Your Name"
          className={fieldClass}
        />
      </Field>

      <Field label="Email" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your@email.com"
          className={fieldClass}
        />
      </Field>

      <Field label="Budget" htmlFor="budget" className="sm:col-span-2">
        <select
          id="budget"
          name="budget"
          defaultValue=""
          className={`${fieldClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20fill%3D%22none%22%20stroke%3D%22%238B8B8B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right_1.25rem_center] bg-no-repeat pr-14`}
        >
          <option value="">Select...</option>
          {budgetOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" htmlFor="message" className="sm:col-span-2">
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Message"
          className={fieldClass}
        />
      </Field>

      <div className="sm:col-span-2">
        <SubmitButton />

        {state.status !== "idle" && state.message && (
          <p
            role="status"
            className={`mt-4 text-sm ${
              state.status === "success" ? "text-accent-soft" : "text-accent"
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

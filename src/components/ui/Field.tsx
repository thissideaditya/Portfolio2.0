import type { ReactNode } from "react";

/** Shared input styling for the contact form and the admin editor. */
export const fieldClass =
  "w-full rounded-xl border border-transparent bg-surface-hover px-5 py-4 text-base text-foreground placeholder:text-muted focus:border-accent focus:outline-none";

interface FieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
  hint?: string;
}

export default function Field({ label, htmlFor, children, className = "", hint }: FieldProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={htmlFor} className="text-base text-muted">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-muted/80">{hint}</p>}
    </div>
  );
}

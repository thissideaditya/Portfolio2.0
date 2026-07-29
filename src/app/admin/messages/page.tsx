import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SplitHeading from "@/components/ui/SplitHeading";
import { requireSession } from "@/lib/auth";
import { listMessages } from "@/lib/db";
import { removeMessage } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Messages",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  await requireSession();
  const messages = await listMessages();

  return (
    <section className="pb-24 pt-40">
      <Container className="max-w-4xl">
        <SplitHeading solid="Your" ghost="Inbox" />

        {messages.length === 0 ? (
          <p className="mt-16 text-base text-muted">No messages yet.</p>
        ) : (
          <ul className="mt-16 flex flex-col gap-4">
            {messages.map((message) => (
              <li key={message.id} className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-foreground">{message.name}</p>
                    <a
                      href={`mailto:${message.email}`}
                      className="text-sm text-accent hover:underline"
                    >
                      {message.email}
                    </a>
                    <p className="mt-1 text-sm text-muted">
                      {message.date}
                      {message.budget ? ` · Budget: ${message.budget}` : ""}
                    </p>
                  </div>
                  <form action={removeMessage}>
                    <input type="hidden" name="id" value={message.id} />
                    <button
                      type="submit"
                      className="rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      Delete
                    </button>
                  </form>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-base leading-relaxed text-muted">
                  {message.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}

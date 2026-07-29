import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logout } from "@/app/admin/actions";
import Container from "@/components/ui/Container";

/**
 * Admin chrome. The layout itself does not guard — /admin/login lives under
 * this path too. Each protected page calls requireSession() directly.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="min-h-screen">
      {session && (
        <div className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
          <Container className="flex h-16 items-center justify-between gap-4">
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/admin" className="font-semibold text-foreground">
                Posts
              </Link>
              <Link href="/admin/messages" className="text-muted hover:text-foreground">
                Messages
              </Link>
              <Link href="/" className="text-muted hover:text-foreground">
                View site
              </Link>
            </nav>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
              >
                Sign out
              </button>
            </form>
          </Container>
        </div>
      )}
      {children}
    </div>
  );
}

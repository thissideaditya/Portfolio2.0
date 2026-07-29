import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  signSession,
  verifySession,
  type Session,
} from "@/lib/session-token";

export type { Session };
export { SESSION_COOKIE };

export async function setSessionCookie(email: string): Promise<void> {
  const token = await signSession(email);
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export function clearSessionCookie(): void {
  cookies().delete(SESSION_COOKIE);
}

export async function getSession(): Promise<Session | null> {
  return verifySession(cookies().get(SESSION_COOKIE)?.value);
}

/**
 * Guard for every admin page and every server action that touches data.
 *
 * This is deliberately duplicated rather than left to middleware alone:
 * middleware-only authorization was bypassable via CVE-2025-29927, so a
 * check at the point of use means middleware is never the only thing
 * standing between a request and the database.
 */
export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

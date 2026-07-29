import { SignJWT, jwtVerify } from "jose";

/**
 * Pure token helpers with no `next/headers` import, so this module is safe to
 * use from middleware (Edge runtime) as well as from server components.
 */

export const SESSION_COOKIE = "portfolio_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface Session {
  email: string;
}

function secretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "AUTH_SECRET is missing or shorter than 32 characters. Generate one with: openssl rand -base64 32"
    );
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
}

/** Returns the session for a raw token, or null if missing/invalid/expired. */
export async function verifySession(token: string | undefined): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (typeof payload.email !== "string") return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}

// Single-user session for the private /predictor tool.
// The cookie value is HMAC-SHA256(PREDICTOR_SECRET, "predictor:v1") — stateless,
// verifiable in the edge proxy, and invalidated by rotating the secret.

export const PREDICTOR_COOKIE = "predictor_session"

/** Login password: PREDICTOR_PASSWORD, falling back to the site's ADMIN_PASSWORD. */
export function predictorPassword(): string | null {
  return process.env.PREDICTOR_PASSWORD ?? process.env.ADMIN_PASSWORD ?? null
}

export async function sessionToken(): Promise<string | null> {
  // Cookie-signing key: dedicated secret if set, else derived from the password —
  // rotating either invalidates existing sessions.
  const secret = process.env.PREDICTOR_SECRET ?? predictorPassword()
  if (!secret) return null
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode("predictor:v1"))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("")
}

export async function isValidSession(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue) return false
  const expected = await sessionToken()
  return expected !== null && cookieValue === expected
}

import "server-only";

/** Fixed-window in-memory rate limiter for public API routes. */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  opts: { limit?: number; windowMs?: number } = {},
): { ok: boolean; remaining: number; resetAt: number } {
  const { limit = 60, windowMs = 60_000 } = opts;
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now > b.resetAt) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }
  b.count += 1;
  return { ok: b.count <= limit, remaining: Math.max(0, limit - b.count), resetAt: b.resetAt };
}

/** Best-effort client key from request headers. */
export function clientKey(req: Request, prefix = ""): string {
  const fwd = req.headers.get("x-forwarded-for") || "";
  const ip = fwd.split(",")[0].trim() || "local";
  return `${prefix}:${ip}`;
}

import { kv } from "@vercel/kv";

/**
 * Rate limit requests per MSISDN.
 * Returns true if allowed, false if limit exceeded.
 */
export async function rateLimit(
  key: string,
  limit = 5,
  windowSeconds = 600
): Promise<boolean> {
  const current = await kv.incr(key);
  if (current === 1) {
    await kv.expire(key, windowSeconds);
  }
  return current <= limit;
}

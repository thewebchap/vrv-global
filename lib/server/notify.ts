import "server-only";
import { createLogger } from "./logger";
import { fetchWithTimeout } from "./retry";

const log = createLogger("notify");

/**
 * Admin notification on sync failure. Posts to INTEGRATIONS_ALERT_WEBHOOK if
 * configured (Slack/Teams compatible `{ text }` payload); always logs.
 */
export async function notifyAdmin(subject: string, detail: string): Promise<void> {
  log.error(`ADMIN ALERT — ${subject}`, detail);
  const webhook = process.env.INTEGRATIONS_ALERT_WEBHOOK;
  if (!webhook) return;
  try {
    await fetchWithTimeout(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: `🔴 VRV Global integration alert — ${subject}\n${detail}` }),
    });
  } catch (err) {
    log.warn("Failed to deliver admin webhook notification", err);
  }
}

/** Constant-time-ish comparison for shared secrets. */
export function secretMatches(provided: string | null | undefined, expected: string | undefined): boolean {
  if (!expected) return false; // secret not configured → deny
  if (!provided) return false;
  if (provided.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < provided.length; i++) diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

/** Extracts a bearer/secret from common header shapes. */
export function extractSecret(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return req.headers.get("x-cron-secret") || req.headers.get("x-admin-secret");
}

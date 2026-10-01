import "server-only";

/**
 * Central, server-only blog configuration. Every value comes from environment
 * variables — nothing here is hardcoded, and none of it is exposed to the
 * browser (no NEXT_PUBLIC_ prefixes; only imported by server code).
 *
 * Required (no defaults): BLOG_ADMIN_EMAIL, BLOG_SESSION_SECRET, and
 * RESEND_API_KEY when EMAIL_PROVIDER=resend.
 * Safe defaults: EMAIL_PROVIDER=console, EMAIL_FROM.
 */
export type EmailProvider = "console" | "resend";

export const isProd = process.env.NODE_ENV === "production";

export const blogConfig = {
  adminEmail: process.env.BLOG_ADMIN_EMAIL,
  sessionSecret: process.env.BLOG_SESSION_SECRET,
  emailProvider: (process.env.EMAIL_PROVIDER || "console").toLowerCase() as EmailProvider,
  emailFrom: process.env.EMAIL_FROM || "VRV Blog <no-reply@localhost>",
  resendApiKey: process.env.RESEND_API_KEY,
};

/** Human-readable list of configuration problems (never includes secret values). */
export function blogConfigIssues(): string[] {
  const issues: string[] = [];
  if (!blogConfig.adminEmail) issues.push("BLOG_ADMIN_EMAIL is not set");
  if (!blogConfig.sessionSecret) issues.push("BLOG_SESSION_SECRET is not set");
  if (!["console", "resend"].includes(blogConfig.emailProvider)) {
    issues.push("EMAIL_PROVIDER must be 'console' or 'resend'");
  }
  if (blogConfig.emailProvider === "resend" && !blogConfig.resendApiKey) {
    issues.push("RESEND_API_KEY is required when EMAIL_PROVIDER=resend");
  }
  if (blogConfig.emailProvider === "console" && isProd) {
    issues.push("EMAIL_PROVIDER=console must not be used in production — set EMAIL_PROVIDER=resend");
  }
  return issues;
}

/** Whether OTP email can actually be delivered in the current environment. */
export function canSendEmail(): { ok: boolean; reason?: string } {
  if (blogConfig.emailProvider === "resend") {
    return blogConfig.resendApiKey ? { ok: true } : { ok: false, reason: "email-not-configured" };
  }
  // console provider: only usable (prints to terminal) outside production.
  return isProd ? { ok: false, reason: "console-in-production" } : { ok: true };
}

// One-time server-side warning (names only, never values) to help operators.
if (typeof window === "undefined") {
  const issues = blogConfigIssues();
  if (issues.length) {
    // eslint-disable-next-line no-console
    console.warn(`[blog:config] ${issues.join("; ")}`);
  }
}

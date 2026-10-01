import "server-only";
import { blogConfig, canSendEmail } from "./config";

/**
 * Email provider abstraction for the blog OTP, driven by EMAIL_PROVIDER:
 *   - "console"  → prints the code to the SERVER terminal (local testing only;
 *                  never in production, so the OTP is never in production logs).
 *   - "resend"   → sends via Resend's REST API (no SDK dependency).
 * Extend `sendOtpEmail` to add SES / SMTP / SendGrid later.
 */
type SendResult = { sent: boolean; provider: string; error?: string };

const SUBJECT = "Your VRV Blog Login Code";
const bodyText = (code: string) =>
  `Your login code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you did not request this, you can ignore this email.`;

async function sendViaResend(to: string, subject: string, text: string): Promise<SendResult> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${blogConfig.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: blogConfig.emailFrom, to: [to], subject, text }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { sent: false, provider: "resend", error: `resend ${res.status} ${detail.slice(0, 120)}` };
    }
    return { sent: true, provider: "resend" };
  } catch (e) {
    return { sent: false, provider: "resend", error: (e as Error).message };
  }
}

export async function sendOtpEmail(to: string, code: string): Promise<SendResult> {
  const gate = canSendEmail();
  if (!gate.ok) return { sent: false, provider: blogConfig.emailProvider, error: gate.reason };

  if (blogConfig.emailProvider === "resend") {
    return sendViaResend(to, SUBJECT, bodyText(code));
  }

  // console provider — server terminal only (local dev). Gated by canSendEmail
  // so this never runs in production (OTP is never logged in production).
  // eslint-disable-next-line no-console
  console.info(`Blog OTP for ${to}: ${code}`);
  return { sent: true, provider: "console" };
}

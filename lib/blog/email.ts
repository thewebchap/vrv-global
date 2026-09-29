import "server-only";

/**
 * Email provider abstraction for the blog OTP. Uses Resend's REST API when
 * RESEND_API_KEY is set (no SDK dependency). Extend `sendEmail` to add SMTP /
 * SES / SendGrid later. The OTP code is never logged in production.
 */
type SendResult = { sent: boolean; provider: string; error?: string };

const FROM = process.env.EMAIL_FROM || "VRV Global <no-reply@vrvglobal.com>";

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

async function sendEmail(to: string, subject: string, text: string): Promise<SendResult> {
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from: FROM, to: [to], subject, text }),
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

  // No provider configured. In development only, surface the message to the
  // server console so the flow can be tested locally. Never in production.
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.info(`[blog:dev-email] to=${to} :: ${subject}\n${text}`);
    return { sent: true, provider: "dev-console" };
  }
  return { sent: false, provider: "none", error: "email-not-configured" };
}

export async function sendOtpEmail(to: string, code: string): Promise<SendResult> {
  const subject = "Your VRV Blog Login Code";
  const text = `Your login code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you did not request this, you can ignore this email.`;
  return sendEmail(to, subject, text);
}

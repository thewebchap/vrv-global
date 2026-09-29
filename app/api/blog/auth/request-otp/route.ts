import { NextResponse } from "next/server";
import {
  isApprovedEmail,
  isBootstrapAdmin,
  generateOtp,
  hashOtp,
  OTP_TTL_SECONDS,
  OTP_RESEND_COOLDOWN_SECONDS,
} from "@/lib/blog/auth";
import { ensureBootstrapAdmin, getOtp, setOtp, normalizeEmail } from "@/lib/blog/store";
import { sendOtpEmail } from "@/lib/blog/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let email = "";
  try {
    const body = await req.json();
    email = normalizeEmail(String(body?.email ?? ""));
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, message: "Enter a valid email address." }, { status: 400 });
  }

  if (!(await isApprovedEmail(email))) {
    return NextResponse.json(
      { ok: false, error: "not-approved", message: "This email is not approved for blog access." },
      { status: 403 },
    );
  }
  if (isBootstrapAdmin(email)) await ensureBootstrapAdmin(email);

  // Resend cooldown.
  const existing = await getOtp(email);
  if (existing) {
    const since = (Date.now() - new Date(existing.lastSentAt).getTime()) / 1000;
    if (since < OTP_RESEND_COOLDOWN_SECONDS) {
      return NextResponse.json(
        { ok: false, error: "cooldown", message: "Please wait a moment before requesting another code." },
        { status: 429 },
      );
    }
  }

  const code = generateOtp();
  const nowIso = new Date().toISOString();
  await setOtp(
    email,
    { email, otpHash: hashOtp(code), expiresAt: new Date(Date.now() + OTP_TTL_SECONDS * 1000).toISOString(), attempts: 0, lastSentAt: nowIso, createdAt: nowIso },
    OTP_TTL_SECONDS,
  );

  const result = await sendOtpEmail(email, code);
  if (!result.sent) {
    const msg =
      result.error === "email-not-configured"
        ? "Login email is not configured yet. Please contact the site administrator."
        : "We couldn't send your code right now. Please try again shortly.";
    return NextResponse.json({ ok: false, message: msg }, { status: 503 });
  }

  return NextResponse.json({ ok: true, message: "A login code has been sent to your email." });
}

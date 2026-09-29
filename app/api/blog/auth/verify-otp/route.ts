import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  verifyOtpHash,
  isBootstrapAdmin,
  OTP_MAX_ATTEMPTS,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  sessionCookieOptions,
} from "@/lib/blog/auth";
import {
  getOtp,
  setOtp,
  deleteOtp,
  getAuthorByEmail,
  ensureBootstrapAdmin,
  updateAuthor,
  createSession,
  normalizeEmail,
} from "@/lib/blog/store";
import { OTP_TTL_SECONDS } from "@/lib/blog/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let email = "";
  let code = "";
  try {
    const body = await req.json();
    email = normalizeEmail(String(body?.email ?? ""));
    code = String(body?.code ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }
  if (!email || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ ok: false, message: "Enter the 6-digit code." }, { status: 400 });
  }

  const otp = await getOtp(email);
  if (!otp || new Date(otp.expiresAt).getTime() < Date.now()) {
    await deleteOtp(email);
    return NextResponse.json({ ok: false, error: "expired", message: "Your code has expired. Request a new one." }, { status: 400 });
  }
  if (otp.attempts >= OTP_MAX_ATTEMPTS) {
    await deleteOtp(email);
    return NextResponse.json({ ok: false, error: "too-many", message: "Too many attempts. Request a new code." }, { status: 429 });
  }

  if (!verifyOtpHash(code, otp.otpHash)) {
    const attempts = otp.attempts + 1;
    if (attempts >= OTP_MAX_ATTEMPTS) {
      await deleteOtp(email);
      return NextResponse.json({ ok: false, error: "too-many", message: "Too many attempts. Request a new code." }, { status: 429 });
    }
    const remainingTtl = Math.max(1, Math.floor((new Date(otp.expiresAt).getTime() - Date.now()) / 1000));
    await setOtp(email, { ...otp, attempts }, Math.min(remainingTtl, OTP_TTL_SECONDS));
    return NextResponse.json(
      { ok: false, error: "invalid", message: `Invalid code. ${OTP_MAX_ATTEMPTS - attempts} attempt(s) left.` },
      { status: 400 },
    );
  }

  // Success — OTP is single-use.
  await deleteOtp(email);

  const author = isBootstrapAdmin(email) ? await ensureBootstrapAdmin(email) : await getAuthorByEmail(email);
  if (!author || author.status !== "active") {
    return NextResponse.json({ ok: false, message: "This email is not approved for blog access." }, { status: 403 });
  }
  await updateAuthor(author.id, { lastLoginAt: new Date().toISOString() });

  const session = await createSession(author, SESSION_TTL_SECONDS);
  cookies().set(SESSION_COOKIE, session.id, sessionCookieOptions());

  return NextResponse.json({ ok: true, role: author.role });
}

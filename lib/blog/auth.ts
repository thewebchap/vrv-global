import "server-only";
import { cookies } from "next/headers";
import { createHash, randomInt, timingSafeEqual } from "node:crypto";
import {
  getAuthorByEmail,
  getSession,
  getAuthorById,
  normalizeEmail,
} from "./store";
import type { BlogAuthor } from "./types";

export const SESSION_COOKIE = "vrv_blog_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const OTP_TTL_SECONDS = 60 * 10; // 10 minutes
export const OTP_RESEND_COOLDOWN_SECONDS = 60;
export const OTP_MAX_ATTEMPTS = 5;

/** Secret used to pepper OTP hashes. Falls back to a stable dev value. */
const OTP_PEPPER = process.env.BLOG_OTP_SECRET || "vrv-blog-otp-dev-pepper";

export function generateOtp(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}
export function hashOtp(code: string): string {
  return createHash("sha256").update(`${OTP_PEPPER}:${code}`).digest("hex");
}
export function verifyOtpHash(code: string, hash: string): boolean {
  const a = Buffer.from(hashOtp(code));
  const b = Buffer.from(hash);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function isBootstrapAdmin(email: string): boolean {
  const admin = process.env.BLOG_ADMIN_EMAIL;
  return Boolean(admin && normalizeEmail(admin) === normalizeEmail(email));
}

/** Approved = active author OR the bootstrap admin email. */
export async function isApprovedEmail(email: string): Promise<boolean> {
  if (isBootstrapAdmin(email)) return true;
  const a = await getAuthorByEmail(email);
  return Boolean(a && a.status === "active");
}

/** Read the current author from the session cookie (server components/routes). */
export async function getCurrentAuthor(): Promise<BlogAuthor | null> {
  const id = cookies().get(SESSION_COOKIE)?.value;
  if (!id) return null;
  const session = await getSession(id);
  if (!session) return null;
  const author = await getAuthorById(session.authorId);
  if (!author || author.status !== "active") return null;
  return author;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

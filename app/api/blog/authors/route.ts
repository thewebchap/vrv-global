import { NextResponse } from "next/server";
import { getCurrentAuthor } from "@/lib/blog/auth";
import { createAuthor, listAuthors } from "@/lib/blog/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function requireAdmin() {
  const author = await getCurrentAuthor();
  if (!author) return { error: NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 }) };
  if (author.role !== "admin") return { error: NextResponse.json({ ok: false, message: "Admin access required." }, { status: 403 }) };
  return { author };
}

export async function GET() {
  const r = await requireAdmin();
  if (r.error) return r.error;
  return NextResponse.json({ ok: true, authors: await listAuthors() });
}

export async function POST(req: Request) {
  const r = await requireAdmin();
  if (r.error) return r.error;
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const role = body?.role === "admin" ? "admin" : "author";
  if (!name) return NextResponse.json({ ok: false, message: "Name is required." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, message: "Enter a valid email." }, { status: 400 });
  const author = await createAuthor({ name, email, role, status: "active" });
  return NextResponse.json({ ok: true, author });
}

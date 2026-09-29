import { NextResponse } from "next/server";
import { getCurrentAuthor } from "@/lib/blog/auth";
import { updateAuthor, deleteAuthor, getAuthorById } from "@/lib/blog/store";
import type { BlogAuthor } from "@/lib/blog/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function requireAdmin() {
  const author = await getCurrentAuthor();
  if (!author) return { error: NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 }) };
  if (author.role !== "admin") return { error: NextResponse.json({ ok: false, message: "Admin access required." }, { status: 403 }) };
  return { author };
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const r = await requireAdmin();
  if (r.error) return r.error;
  const target = await getAuthorById(params.id);
  if (!target) return NextResponse.json({ ok: false, message: "Author not found." }, { status: 404 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }
  const patch: Partial<BlogAuthor> = {};
  if (body.name !== undefined) patch.name = String(body.name).trim() || target.name;
  if (body.role !== undefined) patch.role = body.role === "admin" ? "admin" : "author";
  if (body.status !== undefined) patch.status = body.status === "inactive" ? "inactive" : "active";

  // Guard: an admin cannot deactivate or demote their own account (avoid lockout).
  if (target.id === r.author!.id && (patch.status === "inactive" || patch.role === "author")) {
    return NextResponse.json({ ok: false, message: "You cannot change your own admin access." }, { status: 400 });
  }

  const updated = await updateAuthor(params.id, patch);
  return NextResponse.json({ ok: true, author: updated });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const r = await requireAdmin();
  if (r.error) return r.error;
  if (params.id === r.author!.id) {
    return NextResponse.json({ ok: false, message: "You cannot remove your own account." }, { status: 400 });
  }
  await deleteAuthor(params.id);
  return NextResponse.json({ ok: true });
}

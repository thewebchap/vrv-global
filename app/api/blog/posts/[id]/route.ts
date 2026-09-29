import { NextResponse } from "next/server";
import { getCurrentAuthor } from "@/lib/blog/auth";
import { getPostById, updatePost, deletePost } from "@/lib/blog/store";
import type { BlogPost } from "@/lib/blog/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function loadOwned(id: string) {
  const author = await getCurrentAuthor();
  if (!author) return { error: NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 }) };
  const post = await getPostById(id);
  if (!post) return { error: NextResponse.json({ ok: false, message: "Not found." }, { status: 404 }) };
  if (post.authorId !== author.id && author.role !== "admin") {
    return { error: NextResponse.json({ ok: false, message: "You can only manage your own posts." }, { status: 403 }) };
  }
  return { author, post };
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const r = await loadOwned(params.id);
  if (r.error) return r.error;
  return NextResponse.json({ ok: true, post: r.post });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const r = await loadOwned(params.id);
  if (r.error) return r.error;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const patch: Partial<BlogPost> = {};
  if (body.title !== undefined) {
    const title = String(body.title).trim();
    if (!title) return NextResponse.json({ ok: false, message: "A blog heading is required." }, { status: 400 });
    patch.title = title;
  }
  if (body.slug !== undefined) patch.slug = String(body.slug);
  if (body.body !== undefined) {
    if (!String(body.body).trim()) return NextResponse.json({ ok: false, message: "Blog body is required." }, { status: 400 });
    patch.body = String(body.body);
  }
  if (body.excerpt !== undefined) patch.excerpt = String(body.excerpt);
  if (body.coverMediaUrl !== undefined) patch.coverMediaUrl = String(body.coverMediaUrl);
  if (body.coverMediaAlt !== undefined) patch.coverMediaAlt = String(body.coverMediaAlt);
  if (body.seoTitle !== undefined) patch.seoTitle = String(body.seoTitle);
  if (body.seoDescription !== undefined) patch.seoDescription = String(body.seoDescription);
  if (body.tags !== undefined) {
    const tags = Array.isArray(body.tags) ? body.tags.map((t: unknown) => String(t).trim()).filter(Boolean).slice(0, 12) : [];
    if (tags.length === 0) return NextResponse.json({ ok: false, message: "Add at least one relevant tag." }, { status: 400 });
    patch.tags = tags;
  }
  if (body.status !== undefined) patch.status = body.status === "published" ? "published" : "draft";

  const post = await updatePost(params.id, patch);
  return NextResponse.json({ ok: true, post });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const r = await loadOwned(params.id);
  if (r.error) return r.error;
  await deletePost(params.id);
  return NextResponse.json({ ok: true });
}

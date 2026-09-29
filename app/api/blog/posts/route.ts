import { NextResponse } from "next/server";
import { getCurrentAuthor } from "@/lib/blog/auth";
import { createPost, listPostsByAuthor, listPosts } from "@/lib/blog/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const author = await getCurrentAuthor();
  if (!author) return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  const all = new URL(req.url).searchParams.get("all") === "1" && author.role === "admin";
  const posts = all ? await listPosts() : await listPostsByAuthor(author.id);
  return NextResponse.json({ ok: true, posts });
}

export async function POST(req: Request) {
  const author = await getCurrentAuthor();
  if (!author) return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }
  const title = String(body?.title ?? "").trim();
  const content = String(body?.body ?? "");
  const tags: string[] = Array.isArray(body?.tags) ? body.tags.map((t: unknown) => String(t).trim()).filter(Boolean).slice(0, 12) : [];
  const status = body?.status === "published" ? "published" : "draft";

  if (!title) return NextResponse.json({ ok: false, message: "A blog heading is required." }, { status: 400 });
  if (!content.trim()) return NextResponse.json({ ok: false, message: "Blog body is required." }, { status: 400 });
  if (tags.length === 0) return NextResponse.json({ ok: false, message: "Add at least one relevant tag." }, { status: 400 });

  const post = await createPost({
    title,
    slug: body?.slug ? String(body.slug) : undefined,
    body: content,
    excerpt: body?.excerpt ? String(body.excerpt) : undefined,
    coverMediaUrl: body?.coverMediaUrl ? String(body.coverMediaUrl) : undefined,
    coverMediaAlt: body?.coverMediaAlt ? String(body.coverMediaAlt) : undefined,
    tags,
    author,
    status,
    seoTitle: body?.seoTitle ? String(body.seoTitle) : undefined,
    seoDescription: body?.seoDescription ? String(body.seoDescription) : undefined,
  });
  return NextResponse.json({ ok: true, post });
}

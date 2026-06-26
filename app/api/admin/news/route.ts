import { NextResponse } from "next/server";
import { getAllPosts, addManualPost, setPostStatus } from "@/lib/integrations/linkedin/sync";
import { extractSecret, secretMatches } from "@/lib/server/notify";
import type { NewsStatus } from "@/lib/integrations/linkedin/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authed(req: Request): boolean {
  return secretMatches(extractSecret(req), process.env.CRON_SECRET);
}

/** List all news posts (any status) for the admin approval workflow. */
export async function GET(req: Request) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ ok: true, posts: await getAllPosts() });
}

/** Manually add a LinkedIn/news post by URL (API-unavailable fallback). */
export async function POST(req: Request) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body?.url || !body?.title) {
    return NextResponse.json({ ok: false, error: "url and title are required" }, { status: 400 });
  }
  const post = await addManualPost(body);
  return NextResponse.json({ ok: true, post }, { status: 201 });
}

/** Approve / reject / unpublish a post: { id, status }. */
export async function PATCH(req: Request) {
  if (!authed(req)) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => null)) as { id?: string; status?: NewsStatus } | null;
  const valid: NewsStatus[] = ["draft", "published", "rejected"];
  if (!body?.id || !body?.status || !valid.includes(body.status)) {
    return NextResponse.json({ ok: false, error: "id and valid status are required" }, { status: 400 });
  }
  const post = await setPostStatus(body.id, body.status);
  if (!post) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, post });
}

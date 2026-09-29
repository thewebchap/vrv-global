import { NextResponse } from "next/server";
import { getCurrentAuthor } from "@/lib/blog/auth";
import { ALLOWED_MEDIA_TYPES, MAX_MEDIA_BYTES } from "@/lib/blog/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Media upload endpoint. Uploads require a configured blob store
 * (BLOB_READ_WRITE_TOKEN, e.g. Vercel Blob). Until one is wired up we return a
 * clean "not configured" response and the editor falls back to a media URL.
 * Validation (type + size) is enforced here so it's ready when storage lands.
 */
export async function POST(req: Request) {
  const author = await getCurrentAuthor();
  if (!author) return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });

  const storageConfigured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  if (!storageConfigured) {
    return NextResponse.json(
      { ok: false, error: "storage-not-configured", message: "Media upload storage is not configured. Use media URL for now." },
      { status: 501 },
    );
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, message: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED_MEDIA_TYPES.includes(file.type)) {
    return NextResponse.json({ ok: false, message: "Unsupported file type." }, { status: 415 });
  }
  if (file.size > MAX_MEDIA_BYTES) {
    return NextResponse.json({ ok: false, message: "File is too large (max 8 MB)." }, { status: 413 });
  }

  // When a blob provider is added, upload here and return its public URL.
  return NextResponse.json(
    { ok: false, error: "storage-not-configured", message: "Media upload storage is not configured. Use media URL for now." },
    { status: 501 },
  );
}

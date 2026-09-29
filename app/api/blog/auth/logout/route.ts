import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/blog/auth";
import { deleteSession } from "@/lib/blog/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const id = cookies().get(SESSION_COOKIE)?.value;
  if (id) await deleteSession(id);
  cookies().set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import {
  getFeedbackItems,
  addFeedbackItem,
  isFeedbackRequestAuthorized,
  feedbackPasswordRequired,
} from "@/lib/designFeedback";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const unauthorized = () =>
  NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

/** GET — read & parse the Markdown file, return feedback as JSON. */
export async function GET(req: Request) {
  if (!isFeedbackRequestAuthorized(req)) return unauthorized();
  try {
    const items = await getFeedbackItems();
    return NextResponse.json(
      { ok: true, items, passwordRequired: feedbackPasswordRequired() },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not read the feedback file." },
      { status: 500 },
    );
  }
}

/** POST — add a new feedback item to the Markdown file. */
export async function POST(req: Request) {
  if (!isFeedbackRequestAuthorized(req)) return unauthorized();

  const body = (await req.json().catch(() => null)) as { feedback?: string; page?: string } | null;
  const feedback = (body?.feedback || "").trim();
  if (!feedback) {
    return NextResponse.json(
      { ok: false, error: "Feedback text is required." },
      { status: 400 },
    );
  }

  try {
    const item = await addFeedbackItem({ feedback, page: body?.page });
    return NextResponse.json({ ok: true, item }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not save feedback. Please try again." },
      { status: 500 },
    );
  }
}

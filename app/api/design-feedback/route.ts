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
  NextResponse.json({ error: "Unauthorized" }, { status: 401 });

/** GET — return all feedback items from KV as JSON. */
export async function GET(req: Request) {
  if (!isFeedbackRequestAuthorized(req)) return unauthorized();
  try {
    const items = await getFeedbackItems();
    return NextResponse.json(
      { success: true, items, passwordRequired: feedbackPasswordRequired() },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Failed to read design feedback:", error);
    return NextResponse.json({ error: "Failed to read design feedback" }, { status: 500 });
  }
}

/** POST — add a new feedback item to KV. */
export async function POST(req: Request) {
  if (!isFeedbackRequestAuthorized(req)) return unauthorized();
  try {
    const body = await req.json().catch(() => null);
    if (!body?.feedback || !String(body.feedback).trim()) {
      return NextResponse.json({ error: "Feedback is required" }, { status: 400 });
    }
    const item = await addFeedbackItem({ feedback: body.feedback, page: body.page });
    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error) {
    console.error("Failed to add design feedback:", error);
    return NextResponse.json({ error: "Failed to add design feedback" }, { status: 500 });
  }
}

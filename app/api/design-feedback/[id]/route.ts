import { NextResponse } from "next/server";
import {
  updateFeedbackStatus,
  isFeedbackRequestAuthorized,
  FEEDBACK_STATUSES,
  type FeedbackStatus,
} from "@/lib/designFeedback";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** PATCH — update an existing feedback item's status (persisted in KV). */
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!isFeedbackRequestAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json().catch(() => null);
    const status = body?.status as FeedbackStatus | undefined;

    if (!params.id) {
      return NextResponse.json({ error: "Feedback ID is required" }, { status: 400 });
    }
    if (!status || !FEEDBACK_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updatedItem = await updateFeedbackStatus(params.id, status);
    if (!updatedItem) {
      return NextResponse.json({ error: "Feedback item not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, item: updatedItem });
  } catch (error) {
    console.error("Failed to update design feedback:", error);
    return NextResponse.json({ error: "Failed to update design feedback" }, { status: 500 });
  }
}

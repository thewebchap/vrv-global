import { NextResponse } from "next/server";
import {
  updateFeedbackStatus,
  isFeedbackRequestAuthorized,
  FEEDBACK_STATUSES,
  type FeedbackStatus,
} from "@/lib/designFeedback";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** PATCH — update an existing feedback item's status. */
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!isFeedbackRequestAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as { status?: string } | null;
  const status = body?.status as FeedbackStatus | undefined;

  if (!status || !FEEDBACK_STATUSES.includes(status)) {
    return NextResponse.json(
      { ok: false, error: "Invalid status. Use 'Pending' or 'Completed'." },
      { status: 400 },
    );
  }

  try {
    const item = await updateFeedbackStatus(params.id, status);
    if (!item) {
      return NextResponse.json({ ok: false, error: "Feedback item not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, item });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not update feedback. Please try again." },
      { status: 500 },
    );
  }
}

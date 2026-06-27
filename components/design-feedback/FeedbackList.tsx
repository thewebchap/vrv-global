"use client";

import { FeedbackCard } from "./FeedbackCard";
import type { DesignFeedbackItem } from "./types";

/** List of feedback cards with an empty state. */
export function FeedbackList({
  items,
  onToggle,
  busyId,
  emptyMessage,
}: {
  items: DesignFeedbackItem[];
  onToggle: (item: DesignFeedbackItem) => void;
  busyId: string | null;
  emptyMessage: string;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
        <p className="text-[15px] text-ink/55">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <FeedbackCard key={item.id} item={item} onToggle={onToggle} busy={busyId === item.id} />
      ))}
    </div>
  );
}

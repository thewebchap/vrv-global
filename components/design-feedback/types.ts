/** Client-safe types for the Design Feedback tracker (no server imports). */
export type FeedbackStatus = "Pending" | "Completed";

export type DesignFeedbackItem = {
  id: string;
  status: FeedbackStatus;
  page?: string;
  created: string;
  feedback: string;
};

export type FeedbackFilter = "All" | "Pending" | "Completed";

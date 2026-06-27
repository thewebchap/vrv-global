import type { Metadata } from "next";

// Internal review tool — keep it out of search indexes.
export const metadata: Metadata = {
  title: "Design Feedback Tracker",
  description: "Internal design feedback tracker for the VRV Global website.",
  robots: { index: false, follow: false },
};

export default function DesignFeedbackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

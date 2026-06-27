import type { DesignFeedbackItem } from "./types";

/**
 * Client-safe Markdown export. Generates the human-readable feedback Markdown
 * from KV-backed data so it can be downloaded in the browser. Writing Markdown
 * to the deployed filesystem is intentionally avoided — see lib/designFeedback.
 */
export function feedbackToMarkdown(items: DesignFeedbackItem[]): string {
  const body = items
    .map((it) =>
      [
        `### ${it.id}`,
        "",
        `- Status: ${it.status}`,
        `- Page: ${it.page?.trim() || "—"}`,
        `- Created: ${it.created}`,
        `- Feedback: ${it.feedback.replace(/\s*\n\s*/g, " ").trim()}`,
      ].join("\n"),
    )
    .join("\n\n");

  return `# Design Feedback\n\n## Feedback Items\n\n${body}${body ? "\n" : ""}`;
}

/** Trigger a browser download of the feedback Markdown. */
export function downloadFeedbackMarkdown(items: DesignFeedbackItem[]): void {
  const blob = new Blob([feedbackToMarkdown(items)], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "design-feedback.md";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

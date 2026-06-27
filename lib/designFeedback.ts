import "server-only";
import { promises as fs } from "fs";
import path from "path";

/**
 * Design Feedback storage — reads/writes a human-readable Markdown file at
 * /content/design-feedback.md. Internal review tool.
 *
 * Note: Markdown file writes work in local development or persistent server
 * environments. For production on serverless platforms like Vercel, use a
 * database, GitHub API, CMS, or persistent storage instead of the filesystem.
 */

export type FeedbackStatus = "Pending" | "Completed";

export type DesignFeedbackItem = {
  id: string;
  status: FeedbackStatus;
  page?: string;
  created: string; // YYYY-MM-DD
  feedback: string;
};

export const FEEDBACK_STATUSES: FeedbackStatus[] = ["Pending", "Completed"];

/**
 * Optional internal protection. If DESIGN_FEEDBACK_PASSWORD is set, requests
 * must send a matching `x-feedback-password` header. If it is empty/missing,
 * access is open (so local development is never blocked).
 */
export function feedbackPasswordRequired(): boolean {
  return !!(process.env.DESIGN_FEEDBACK_PASSWORD || "").trim();
}

export function isFeedbackRequestAuthorized(req: Request): boolean {
  const pw = (process.env.DESIGN_FEEDBACK_PASSWORD || "").trim();
  if (!pw) return true;
  return req.headers.get("x-feedback-password") === pw;
}

const CONTENT_DIR = path.join(process.cwd(), "content");
const FEEDBACK_PATH = path.join(CONTENT_DIR, "design-feedback.md");

const FILE_HEADER = "# Design Feedback\n\n## Feedback Items\n";

/** Read the raw Markdown file, creating an empty one if it does not exist. */
export async function readFeedbackMarkdown(): Promise<string> {
  try {
    return await fs.readFile(FEEDBACK_PATH, "utf8");
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") {
      await fs.mkdir(CONTENT_DIR, { recursive: true });
      await fs.writeFile(FEEDBACK_PATH, FILE_HEADER, "utf8");
      return FILE_HEADER;
    }
    throw err;
  }
}

/** Parse the structured Markdown into feedback items. Tolerant of spacing. */
export function parseFeedbackMarkdown(markdown: string): DesignFeedbackItem[] {
  const items: DesignFeedbackItem[] = [];
  // Each item starts at a "### FB-xxx" heading and runs to the next heading.
  const blocks = markdown.split(/^###\s+/m).slice(1);

  for (const block of blocks) {
    const lines = block.split("\n");
    const id = (lines[0] || "").trim();
    if (!id) continue;

    const field = (key: string): string | undefined => {
      const re = new RegExp(`^\\s*-\\s*${key}\\s*:\\s*(.*)$`, "i");
      for (const line of lines) {
        const m = line.match(re);
        if (m) return m[1].trim();
      }
      return undefined;
    };

    const statusRaw = (field("Status") || "Pending").toLowerCase();
    const status: FeedbackStatus = statusRaw === "completed" ? "Completed" : "Pending";
    const page = field("Page");
    const created = field("Created") || "";
    const feedback = field("Feedback") || "";

    if (!feedback) continue; // skip malformed items without feedback text

    items.push({
      id,
      status,
      ...(page ? { page } : {}),
      created,
      feedback,
    });
  }

  return items;
}

/** Serialize items back into the stable Markdown format. */
export function serializeFeedbackMarkdown(items: DesignFeedbackItem[]): string {
  const body = items
    .map((it) => {
      const lines = [
        `### ${it.id}`,
        "", // blank line after heading (markdownlint MD022/MD032)
        `- Status: ${it.status}`,
        `- Page: ${it.page?.trim() || "—"}`,
        `- Created: ${it.created}`,
        // Keep feedback on a single line for a stable, human-readable format.
        `- Feedback: ${it.feedback.replace(/\s*\n\s*/g, " ").trim()}`,
      ];
      return lines.join("\n");
    })
    .join("\n\n");

  return `${FILE_HEADER}\n${body}${body ? "\n" : ""}`;
}

/** Write items to disk. Throws on failure so callers can surface an error. */
export async function writeFeedbackMarkdown(items: DesignFeedbackItem[]): Promise<void> {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(FEEDBACK_PATH, serializeFeedbackMarkdown(items), "utf8");
}

/** Convenience: read + parse. */
export async function getFeedbackItems(): Promise<DesignFeedbackItem[]> {
  return parseFeedbackMarkdown(await readFeedbackMarkdown());
}

/** Next sequential id, e.g. FB-001 → FB-002. */
export function getNextFeedbackId(items: DesignFeedbackItem[]): string {
  const max = items.reduce((acc, it) => {
    const m = it.id.match(/FB-(\d+)/i);
    return m ? Math.max(acc, parseInt(m[1], 10)) : acc;
  }, 0);
  return `FB-${String(max + 1).padStart(3, "0")}`;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Add a new feedback item; returns the created item. */
export async function addFeedbackItem(input: {
  feedback: string;
  page?: string;
}): Promise<DesignFeedbackItem> {
  const feedback = (input.feedback || "").trim();
  if (!feedback) throw new Error("Feedback text is required.");

  const items = await getFeedbackItems();
  const item: DesignFeedbackItem = {
    id: getNextFeedbackId(items),
    status: "Pending",
    ...(input.page && input.page.trim() ? { page: input.page.trim() } : {}),
    created: todayISO(),
    feedback,
  };
  items.push(item);
  await writeFeedbackMarkdown(items);
  return item;
}

/** Update an item's status; returns the updated item or null if not found. */
export async function updateFeedbackStatus(
  id: string,
  status: FeedbackStatus,
): Promise<DesignFeedbackItem | null> {
  if (!FEEDBACK_STATUSES.includes(status)) {
    throw new Error("Invalid status.");
  }
  const items = await getFeedbackItems();
  const idx = items.findIndex((it) => it.id.toLowerCase() === id.toLowerCase());
  if (idx === -1) return null;
  items[idx] = { ...items[idx], status };
  await writeFeedbackMarkdown(items);
  return items[idx];
}

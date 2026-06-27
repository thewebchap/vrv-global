"use client";

import { useState } from "react";
import { Field, Input, Textarea } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";

/** Feedback submission form. Calls onSubmit and clears on success. */
export function FeedbackForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (feedback: string, page: string) => Promise<boolean>;
  submitting: boolean;
}) {
  const [feedback, setFeedback] = useState("");
  const [page, setPage] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!feedback.trim()) {
      setError("Please enter feedback before submitting.");
      return;
    }
    setError(null);
    const ok = await onSubmit(feedback.trim(), page.trim());
    if (ok) {
      setFeedback("");
      setPage("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6">
      <h2 className="font-serif text-lg text-ink">Add design feedback</h2>
      <p className="mt-1 text-[13px] text-ink/55">Logged to <code className="rounded bg-paper px-1 py-0.5 text-[12px] text-ink/70">/content/design-feedback.md</code></p>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <Field label="Feedback" htmlFor="fb-text" required>
          <Textarea
            id="fb-text"
            value={feedback}
            onChange={(e) => { setFeedback(e.target.value); if (error) setError(null); }}
            placeholder="Describe the design change or issue…"
            aria-invalid={!!error}
          />
        </Field>

        <Field label="Page / Section" htmlFor="fb-page">
          <Input
            id="fb-page"
            value={page}
            onChange={(e) => setPage(e.target.value)}
            placeholder="e.g. Home Hero, Products, Footer (optional)"
          />
        </Field>
      </div>

      {error && <p role="alert" className="mt-3 text-sm font-medium text-flame">{error}</p>}

      <div className="mt-5 flex items-center gap-3">
        <Button type="submit" variant="primary" withArrow>
          {submitting ? "Adding…" : "Add Feedback"}
        </Button>
        <span className="text-xs text-ink/45">New items default to <span className="font-semibold text-gold-700">Pending</span>.</span>
      </div>
    </form>
  );
}

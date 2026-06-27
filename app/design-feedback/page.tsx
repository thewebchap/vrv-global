"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/forms/Fields";
import { Icon } from "@/components/ui/Icon";
import { FeedbackForm } from "@/components/design-feedback/FeedbackForm";
import { FeedbackList } from "@/components/design-feedback/FeedbackList";
import { FeedbackFilters } from "@/components/design-feedback/FeedbackFilters";
import { FeedbackStats } from "@/components/design-feedback/FeedbackStats";
import type { DesignFeedbackItem, FeedbackFilter } from "@/components/design-feedback/types";

const idNum = (id: string) => parseInt(id.replace(/\D/g, ""), 10) || 0;

export default function DesignFeedbackPage() {
  const [items, setItems] = useState<DesignFeedbackItem[]>([]);
  const [filter, setFilter] = useState<FeedbackFilter>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  // Optional password gate (only enforced when DESIGN_FEEDBACK_PASSWORD is set).
  const [needPassword, setNeedPassword] = useState(false);
  const [authPassword, setAuthPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const load = useCallback(
    async (password?: string): Promise<boolean> => {
      setError(null);
      const headers: Record<string, string> = {};
      const pw = password ?? authPassword;
      if (pw) headers["x-feedback-password"] = pw;
      try {
        const res = await fetch("/api/design-feedback", { headers, cache: "no-store" });
        if (res.status === 401) {
          setNeedPassword(true);
          return false;
        }
        if (!res.ok) {
          setError("Could not load feedback.");
          return false;
        }
        const data = await res.json();
        setItems(data.items as DesignFeedbackItem[]);
        setNeedPassword(false);
        if (password) setAuthPassword(password);
        return true;
      } catch {
        setError("Network error — could not load feedback.");
        return false;
      }
    },
    [authPassword],
  );

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [load]);

  const authHeaders = useCallback((): Record<string, string> => {
    const h: Record<string, string> = { "content-type": "application/json" };
    if (authPassword) h["x-feedback-password"] = authPassword;
    return h;
  }, [authPassword]);

  const addFeedback = useCallback(
    async (feedback: string, page: string): Promise<boolean> => {
      setSubmitting(true);
      setError(null);
      try {
        const res = await fetch("/api/design-feedback", {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify({ feedback, page }),
        });
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          setError(d.error || "Could not save feedback.");
          return false;
        }
        await load();
        return true;
      } catch {
        setError("Network error — could not save feedback.");
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [authHeaders, load],
  );

  const toggleStatus = useCallback(
    async (item: DesignFeedbackItem) => {
      setBusyId(item.id);
      setError(null);
      const next = item.status === "Completed" ? "Pending" : "Completed";
      try {
        const res = await fetch(`/api/design-feedback/${item.id}`, {
          method: "PATCH",
          headers: authHeaders(),
          body: JSON.stringify({ status: next }),
        });
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          setError(d.error || "Could not update status.");
          return;
        }
        await load();
      } catch {
        setError("Network error — could not update status.");
      } finally {
        setBusyId(null);
      }
    },
    [authHeaders, load],
  );

  const counts: Record<FeedbackFilter, number> = useMemo(
    () => ({
      All: items.length,
      Pending: items.filter((i) => i.status === "Pending").length,
      Completed: items.filter((i) => i.status === "Completed").length,
    }),
    [items],
  );

  const visible = useMemo(() => {
    const list = filter === "All" ? items : items.filter((i) => i.status === filter);
    return [...list].sort((a, b) => idNum(b.id) - idNum(a.id));
  }, [items, filter]);

  // ── Password gate ──────────────────────────────────────────────────────
  if (!loading && needPassword) {
    return (
      <div className="min-h-[70vh] bg-paper">
        <Container className="flex min-h-[70vh] items-center justify-center py-16">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const ok = await load(passwordInput);
              if (!ok) setError("Incorrect password.");
            }}
            className="w-full max-w-sm rounded-2xl border border-line bg-white p-7 shadow-card"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ocean-50 text-ocean">
              <Icon name="lock" className="h-5 w-5" />
            </span>
            <h1 className="mt-4 font-serif text-xl text-ink">Design Feedback Tracker</h1>
            <p className="mt-1 text-[13px] text-ink/55">This internal tool is password protected.</p>
            <div className="mt-5">
              <Input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                autoFocus
                aria-label="Password"
              />
            </div>
            {error && <p role="alert" className="mt-2 text-sm font-medium text-flame">{error}</p>}
            <div className="mt-5">
              <Button type="submit" variant="primary" className="w-full">Unlock</Button>
            </div>
          </form>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <Container className="py-12 lg:py-16">
        {/* Header */}
        <header className="border-b border-line pb-6">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-ocean">
            <Icon name="doc" className="h-4 w-4" /> Internal tool
          </p>
          <h1 className="mt-3 font-serif text-3xl text-ocean-700 sm:text-4xl">Design Feedback Tracker</h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink/65">
            Track website design feedback, implementation status, and completion notes.
          </p>
        </header>

        {loading ? (
          <div className="mt-10 animate-pulse space-y-4">
            <div className="h-24 rounded-2xl bg-white" />
            <div className="h-20 rounded-2xl bg-white" />
            <div className="h-20 rounded-2xl bg-white" />
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-start">
            {/* Left column — form + stats */}
            <div className="space-y-6 lg:sticky lg:top-6">
              <FeedbackForm onSubmit={addFeedback} submitting={submitting} />
              <FeedbackStats items={items} />
            </div>

            {/* Right column — filters + list */}
            <div className="space-y-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <FeedbackFilters value={filter} onChange={setFilter} counts={counts} />
                <button
                  type="button"
                  onClick={() => load()}
                  className="inline-flex items-center gap-1.5 self-start rounded-full border border-line bg-white px-3.5 py-2 text-sm font-medium text-ink/70 transition-colors hover:border-brand/40 hover:text-brand"
                >
                  <Icon name="route" className="h-4 w-4" /> Refresh
                </button>
              </div>

              {error && (
                <p role="alert" className="rounded-xl border border-flame/30 bg-flame/5 px-4 py-3 text-sm font-medium text-flame">
                  {error}
                </p>
              )}

              <FeedbackList
                items={visible}
                onToggle={toggleStatus}
                busyId={busyId}
                emptyMessage={
                  items.length === 0
                    ? "No design feedback yet. Add the first item to begin tracking changes."
                    : "No feedback items match this filter."
                }
              />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

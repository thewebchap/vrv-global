"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Input, Textarea } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { renderMarkdown } from "@/lib/blog/markdown";
import { SUGGESTED_TAGS, type BlogPost } from "@/lib/blog/types";

export function EditorClient({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const editing = Boolean(post);
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [coverUrl, setCoverUrl] = useState(post?.coverMediaUrl ?? "");
  const [coverAlt, setCoverAlt] = useState(post?.coverMediaAlt ?? "");
  const [tags, setTags] = useState<string[]>(post?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(post?.seoDescription ?? "");

  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const previewNodes = useMemo(() => (preview ? renderMarkdown(body) : null), [preview, body]);

  function addTag(raw: string) {
    const t = raw.trim();
    if (t && !tags.includes(t) && tags.length < 12) setTags((cur) => [...cur, t]);
    setTagInput("");
  }
  function toggleTag(t: string) {
    setTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : cur.length < 12 ? [...cur, t] : cur));
  }

  async function tryUpload(file: File) {
    setNotice(null);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/blog/media", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok && data.url) {
      setCoverUrl(data.url);
    } else {
      setNotice(data.message || "Media upload storage is not configured. Use media URL for now.");
    }
  }

  async function save(status: "draft" | "published") {
    setError(null);
    if (!title.trim()) return setError("A blog heading is required.");
    if (!body.trim()) return setError("Blog body is required.");
    if (tags.length === 0) return setError("Add at least one relevant tag.");

    setBusy(true);
    const payload = { title, excerpt, body, coverMediaUrl: coverUrl, coverMediaAlt: coverAlt, tags, seoTitle, seoDescription, status };
    try {
      const res = editing
        ? await fetch(`/api/blog/posts/${post!.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        : await fetch("/api/blog/posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message || "Could not save. Please try again.");
        return;
      }
      router.push("/blog/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!post) return;
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    setBusy(true);
    await fetch(`/api/blog/posts/${post.id}`, { method: "DELETE" });
    router.push("/blog/dashboard");
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-label text-brand">{editing ? "Edit article" : "New article"}</p>
          <h1 className="mt-2 font-serif text-3xl text-ink">{editing ? "Edit blog post" : "Write a new blog post"}</h1>
        </div>
        <button type="button" onClick={() => router.push("/blog/dashboard")} className="text-sm font-semibold text-ink/60 hover:text-ink">
          ← Dashboard
        </button>
      </div>

      {error && <p role="alert" className="mt-6 rounded-xl border border-flame/30 bg-flame/5 px-4 py-3 text-sm font-medium text-flame">{error}</p>}
      {notice && <p className="mt-6 rounded-xl border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-gold-700">{notice}</p>}

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Left — content */}
        <div className="space-y-5">
          <Field label="Blog heading" htmlFor="e-title" required>
            <Input id="e-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Traceability in natural rubber supply chains" required />
          </Field>
          <Field label="Excerpt (short summary)" htmlFor="e-excerpt">
            <Textarea id="e-excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="One or two sentences shown on the blog listing." className="min-h-[70px]" />
          </Field>

          <Field label="Body (Markdown)" htmlFor="e-body" required>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[12px] text-ink/45"># heading · **bold** · *italic* · - list · [link](url) · ![alt](image-url)</span>
              <button type="button" onClick={() => setPreview((v) => !v)} className="text-[13px] font-semibold text-brand">
                {preview ? "Edit" : "Preview"}
              </button>
            </div>
            {preview ? (
              <div className="min-h-[320px] rounded-xl border border-line bg-white p-5">{previewNodes}</div>
            ) : (
              <Textarea id="e-body" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your article in Markdown…" className="min-h-[320px] font-mono text-[14px]" required />
            )}
          </Field>
        </div>

        {/* Right — meta */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-line bg-paper p-5">
            <p className="text-[11px] font-semibold uppercase tracking-label text-ink/55">Cover media</p>
            <div className="mt-3 space-y-3">
              <Input value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="https://… image URL" />
              <Input value={coverAlt} onChange={(e) => setCoverAlt(e.target.value)} placeholder="Alt text (accessibility)" />
              <div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && tryUpload(e.target.files[0])}
                />
                <button type="button" onClick={() => fileRef.current?.click()} className="text-[13px] font-semibold text-brand">
                  Upload image…
                </button>
              </div>
              {coverUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverUrl} alt={coverAlt || "cover preview"} className="w-full rounded-xl border border-line" />
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-5">
            <p className="text-[11px] font-semibold uppercase tracking-label text-ink/55">Relevant tags</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <button key={t} type="button" onClick={() => toggleTag(t)} className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-[12px] font-medium text-brand">
                  {t} <Icon name="check" className="h-3 w-3" />
                </button>
              ))}
            </div>
            <Input
              className="mt-3"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  addTag(tagInput);
                }
              }}
              placeholder="Type a tag and press Enter"
            />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {SUGGESTED_TAGS.filter((t) => !tags.includes(t)).map((t) => (
                <button key={t} type="button" onClick={() => toggleTag(t)} className="rounded-full border border-line bg-white px-2.5 py-1 text-[12px] text-ink/60 hover:border-brand/40 hover:text-brand">
                  + {t}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-5">
            <p className="text-[11px] font-semibold uppercase tracking-label text-ink/55">SEO (optional)</p>
            <div className="mt-3 space-y-3">
              <Input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="SEO title" />
              <Textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder="SEO description" className="min-h-[60px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6">
        <Button type="button" variant="royal" onClick={() => save("draft")}>{busy ? "Saving…" : "Save Draft"}</Button>
        <Button type="button" variant="primary" withArrow onClick={() => save("published")}>{editing && post?.status === "published" ? "Update & Publish" : "Publish"}</Button>
        {editing && (
          <button type="button" onClick={remove} className="ml-auto text-sm font-semibold text-flame/80 hover:text-flame">Delete</button>
        )}
      </div>
    </div>
  );
}

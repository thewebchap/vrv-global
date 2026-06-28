"use client";

import { useMemo, useState } from "react";
import type { CaseStudy, CaseStudyCategory } from "@/data/caseStudies";
import { caseStudyCategoryLabels } from "@/data/caseStudies";
import { cn } from "@/lib/cn";

/*
 * Temporary basic admin protection for testing only.
 * Replace with proper authentication before production use.
 */
const ADMIN_USER = "vrv";
const ADMIN_PASS = "abcd";

const CATEGORIES = Object.keys(caseStudyCategoryLabels) as CaseStudyCategory[];

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

type Preview = { name: string; url: string };

export default function AdminCaseStudiesPage() {
  const [authed, setAuthed] = useState(false);

  if (!authed) return <LoginGate onPass={() => setAuthed(true)} />;
  return <CaseStudyBuilder />;
}

/* ------------------------------------------------------------------ */
/* Login gate (client-side, testing only)                              */
/* ------------------------------------------------------------------ */
function LoginGate({ onPass }: { onPass: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) onPass();
    else setError(true);
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-paper px-5 py-20">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-line bg-white p-8 shadow-soft">
        <p className="text-[11px] font-semibold uppercase tracking-label text-brand">Internal tool</p>
        <h1 className="mt-2 font-serif text-2xl text-ink">Case Studies Admin</h1>
        <p className="mt-2 text-sm text-ink/55">Sign in to add or export case studies. Temporary testing access only.</p>
        <label className="mt-6 block text-sm font-medium text-ink">
          Username
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand"
            autoComplete="off"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-ink">
          Password
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>
        {error && <p className="mt-3 text-sm text-flame">Incorrect username or password.</p>}
        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-flame px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-flame-600"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Builder form + export                                               */
/* ------------------------------------------------------------------ */
const EMPTY = {
  title: "",
  slug: "",
  summary: "",
  category: "general" as CaseStudyCategory,
  date: "",
  status: "Draft" as "Draft" | "Published",
  featured: false,
  problem: "",
  vrvRole: "",
  process: "",
  traceability: "",
  outcome: "",
  sustainability: "",
  thumbnail: "",
  images: "",
  files: "",
};

function CaseStudyBuilder() {
  const [form, setForm] = useState({ ...EMPTY });
  const [slugEdited, setSlugEdited] = useState(false);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [imgPreviews, setImgPreviews] = useState<Preview[]>([]);
  const [filePreviews, setFilePreviews] = useState<Preview[]>([]);
  const [generated, setGenerated] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  function onTitle(v: string) {
    setForm((f) => ({ ...f, title: v, slug: slugEdited ? f.slug : slugify(v) }));
  }

  // ---- file pickers: preview only, plus suggest a public path ----
  function pickThumbnail(file?: File) {
    if (!file) return;
    setThumbPreview(URL.createObjectURL(file));
    if (!form.thumbnail) set("thumbnail", `/images/case-studies/${file.name}`);
  }
  function pickImages(files: FileList | null) {
    if (!files?.length) return;
    const arr = Array.from(files);
    setImgPreviews((p) => [...p, ...arr.map((f) => ({ name: f.name, url: URL.createObjectURL(f) }))]);
    const paths = arr.map((f) => `/images/case-studies/${f.name}`).join("\n");
    set("images", form.images ? `${form.images}\n${paths}` : paths);
  }
  function pickFiles(files: FileList | null) {
    if (!files?.length) return;
    const arr = Array.from(files);
    setFilePreviews((p) => [...p, ...arr.map((f) => ({ name: f.name, url: URL.createObjectURL(f) }))]);
    const lines = arr.map((f) => `${f.name} | /resources/case-studies/${f.name}`).join("\n");
    set("files", form.files ? `${form.files}\n${lines}` : lines);
  }

  const study = useMemo<CaseStudy>(() => {
    const images = form.images.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean);
    const files = form.files
      .split(/\n+/)
      .map((line) => {
        const [name, url] = line.split("|").map((s) => s.trim());
        return url ? { name: name || url, url } : null;
      })
      .filter(Boolean) as { name: string; url: string }[];

    const content = {
      problem: form.problem.trim() || undefined,
      vrvRole: form.vrvRole.trim() || undefined,
      process: form.process.trim() || undefined,
      traceability: form.traceability.trim() || undefined,
      outcome: form.outcome.trim() || undefined,
      sustainability: form.sustainability.trim() || undefined,
    };

    const slug = form.slug || slugify(form.title);
    return {
      id: slug ? `cs-${slug}` : "cs-new",
      slug,
      title: form.title,
      summary: form.summary,
      category: form.category,
      date: form.date,
      status: form.status,
      featured: form.featured,
      thumbnail: form.thumbnail || undefined,
      content,
      images: images.length ? images : undefined,
      files: files.length ? files : undefined,
    };
  }, [form]);

  function generate() {
    setGenerated(JSON.stringify(study, null, 2));
    setCopied(false);
  }

  async function copy() {
    if (!generated) return;
    try {
      await navigator.clipboard.writeText(generated);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function download() {
    const blob = new Blob([generated ?? JSON.stringify(study, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${study.slug || "case-study"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="text-[11px] font-semibold uppercase tracking-label text-brand">Internal tool · testing only</p>
      <h1 className="mt-2 font-serif text-3xl text-ink">Add a Case Study</h1>

      {/* No-DB notice */}
      <div className="mt-5 rounded-xl border border-amber/30 bg-amber/10 p-4 text-[13.5px] leading-relaxed text-ink/70">
        This admin tool is running without a database. On Vercel, new case studies must be exported and committed into
        the project (<code className="text-ink">/data/caseStudies.ts</code>), or connected to persistent storage later.
        File uploads here are for in-browser preview only — upload the actual files to <code className="text-ink">/public</code>
        {" "}and reference their paths.
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Title">
          <input className={inputCls} value={form.title} onChange={(e) => onTitle(e.target.value)} />
        </Field>
        <Field label="Slug (auto from title, editable)">
          <input
            className={inputCls}
            value={form.slug}
            onChange={(e) => {
              setSlugEdited(true);
              set("slug", slugify(e.target.value));
            }}
          />
        </Field>
        <Field label="Summary" full>
          <textarea className={cn(inputCls, "min-h-[64px]")} value={form.summary} onChange={(e) => set("summary", e.target.value)} />
        </Field>
        <Field label="Category">
          <select className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value as CaseStudyCategory)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{caseStudyCategoryLabels[c]}</option>
            ))}
          </select>
        </Field>
        <Field label="Date">
          <input type="date" className={inputCls} value={form.date} onChange={(e) => set("date", e.target.value)} />
        </Field>
        <Field label="Status">
          <select className={inputCls} value={form.status} onChange={(e) => set("status", e.target.value as "Draft" | "Published")}>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </Field>
        <Field label="Featured">
          <label className="inline-flex items-center gap-2 py-2 text-sm text-ink/70">
            <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="h-4 w-4 accent-[#15724E]" />
            Show on homepage (featured)
          </label>
        </Field>

        <Field label="Problem" full>
          <textarea className={cn(inputCls, "min-h-[64px]")} value={form.problem} onChange={(e) => set("problem", e.target.value)} />
        </Field>
        <Field label="VRV Role" full>
          <textarea className={cn(inputCls, "min-h-[64px]")} value={form.vrvRole} onChange={(e) => set("vrvRole", e.target.value)} />
        </Field>
        <Field label="Supply Chain Process" full>
          <textarea className={cn(inputCls, "min-h-[64px]")} value={form.process} onChange={(e) => set("process", e.target.value)} />
        </Field>
        <Field label="Traceability / Documentation" full>
          <textarea className={cn(inputCls, "min-h-[64px]")} value={form.traceability} onChange={(e) => set("traceability", e.target.value)} />
        </Field>
        <Field label="Outcome" full>
          <textarea className={cn(inputCls, "min-h-[64px]")} value={form.outcome} onChange={(e) => set("outcome", e.target.value)} />
        </Field>
        <Field label="Sustainability Angle" full>
          <textarea className={cn(inputCls, "min-h-[64px]")} value={form.sustainability} onChange={(e) => set("sustainability", e.target.value)} />
        </Field>

        {/* Thumbnail */}
        <Field label="Thumbnail image — public path" full>
          <input className={inputCls} placeholder="/images/case-studies/my-study.jpg" value={form.thumbnail} onChange={(e) => set("thumbnail", e.target.value)} />
          <div className="mt-2 flex items-center gap-3">
            <input type="file" accept="image/*" onChange={(e) => pickThumbnail(e.target.files?.[0])} className="text-xs text-ink/60" />
            {thumbPreview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={thumbPreview} alt="thumbnail preview" className="h-12 w-12 rounded-md object-cover" />
            )}
          </div>
        </Field>

        {/* Additional images */}
        <Field label="Additional images — one public path per line" full>
          <textarea className={cn(inputCls, "min-h-[64px] font-mono text-[12.5px]")} value={form.images} onChange={(e) => set("images", e.target.value)} placeholder="/images/case-studies/photo-1.jpg" />
          <input type="file" accept="image/*" multiple onChange={(e) => pickImages(e.target.files)} className="mt-2 text-xs text-ink/60" />
          {imgPreviews.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {imgPreviews.map((p) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={p.url} src={p.url} alt={p.name} className="h-12 w-12 rounded-md object-cover" />
              ))}
            </div>
          )}
        </Field>

        {/* Related files */}
        <Field label="Related files — one per line as: Name | /path/file.pdf" full>
          <textarea className={cn(inputCls, "min-h-[64px] font-mono text-[12.5px]")} value={form.files} onChange={(e) => set("files", e.target.value)} placeholder="Spec Sheet | /resources/case-studies/spec.pdf" />
          <input type="file" multiple onChange={(e) => pickFiles(e.target.files)} className="mt-2 text-xs text-ink/60" />
          {filePreviews.length > 0 && (
            <ul className="mt-2 space-y-1 text-[12.5px] text-ink/55">
              {filePreviews.map((p) => (
                <li key={p.url}>{p.name} (preview only)</li>
              ))}
            </ul>
          )}
        </Field>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        <button onClick={generate} className="rounded-lg bg-flame px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-flame-600">
          Generate Case Study Data
        </button>
        <button onClick={download} className="rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand">
          Download JSON
        </button>
        {generated && (
          <button onClick={copy} className="rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand">
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>
        )}
      </div>

      {generated && (
        <div className="mt-6">
          <p className="text-sm text-ink/60">
            Paste this object into the <code className="text-ink">caseStudies</code> array in
            {" "}<code className="text-ink">/data/caseStudies.ts</code>, then commit and deploy.
          </p>
          <pre className="mt-3 max-h-[420px] overflow-auto rounded-xl border border-line bg-ink-900 p-4 text-[12.5px] leading-relaxed text-white/85">
            {generated}
          </pre>
        </div>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand";

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={cn(full && "md:col-span-2")}>
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
    </div>
  );
}

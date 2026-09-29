"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { BlogAuthor, BlogPost } from "@/lib/blog/types";

function fmtDate(iso?: string) {
  return iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";
}

export function DashboardClient({ author, initialPosts }: { author: BlogAuthor; initialPosts: BlogPost[] }) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function logout() {
    await fetch("/api/blog/auth/logout", { method: "POST" });
    router.push("/blog/login");
    router.refresh();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    setBusyId(id);
    const res = await fetch(`/api/blog/posts/${id}`, { method: "DELETE" });
    if (res.ok) setPosts((p) => p.filter((x) => x.id !== id));
    setBusyId(null);
  }

  const drafts = posts.filter((p) => p.status === "draft");
  const published = posts.filter((p) => p.status === "published");

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-label text-brand">Author dashboard</p>
          <h1 className="mt-2 font-serif text-3xl text-ink">Welcome, {author.name}</h1>
          <p className="mt-1 text-[14px] text-ink/55">
            {author.email} · {author.role === "admin" ? "Admin" : "Author"}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {author.role === "admin" && (
            <Button href="/admin/blog-authors" variant="outline">Manage authors</Button>
          )}
          <Button href="/blog/editor/new" variant="primary" withArrow>Write New Blog</Button>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <PostGroup title="Published" empty="No published blogs yet." posts={published} onDelete={remove} busyId={busyId} />
        <PostGroup title="Drafts" empty="No draft blogs yet." posts={drafts} onDelete={remove} busyId={busyId} />
      </div>
    </div>
  );
}

function PostGroup({
  title,
  empty,
  posts,
  onDelete,
  busyId,
}: {
  title: string;
  empty: string;
  posts: BlogPost[];
  onDelete: (id: string) => void;
  busyId: string | null;
}) {
  return (
    <section>
      <h2 className="text-[12px] font-semibold uppercase tracking-label text-ink/50">
        {title} ({posts.length})
      </h2>
      {posts.length === 0 ? (
        <p className="mt-3 rounded-xl border border-line bg-paper px-4 py-3 text-[14px] text-ink/50">{empty}</p>
      ) : (
        <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-white">
          {posts.map((p) => (
            <li key={p.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      p.status === "published" ? "bg-brand-50 text-brand" : "bg-gold/15 text-gold-700"
                    }`}
                  >
                    {p.status}
                  </span>
                  {p.status === "published" ? (
                    <Link href={`/blog/${p.slug}`} className="truncate font-serif text-[17px] text-ink hover:text-brand">{p.title}</Link>
                  ) : (
                    <span className="truncate font-serif text-[17px] text-ink">{p.title}</span>
                  )}
                </div>
                <p className="mt-1 text-[12.5px] text-ink/45">
                  {p.status === "published" ? `Published ${fmtDate(p.publishedAt)}` : `Updated ${fmtDate(p.updatedAt)}`}
                  {p.tags.length > 0 && ` · ${p.tags.slice(0, 3).join(", ")}`}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Link href={`/blog/editor/${p.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-600">
                  <Icon name="doc" className="h-4 w-4" /> Edit
                </Link>
                <button
                  type="button"
                  disabled={busyId === p.id}
                  onClick={() => onDelete(p.id)}
                  className="text-sm font-semibold text-flame/80 hover:text-flame disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

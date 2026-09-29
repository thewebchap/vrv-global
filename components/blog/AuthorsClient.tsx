"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Input, Select } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";
import type { BlogAuthor } from "@/lib/blog/types";

function fmtDate(iso?: string) {
  return iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";
}

export function AuthorsClient({ initialAuthors, meId }: { initialAuthors: BlogAuthor[]; meId: string }) {
  const router = useRouter();
  const [authors, setAuthors] = useState(initialAuthors);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"author" | "admin">("author");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function logout() {
    await fetch("/api/blog/auth/logout", { method: "POST" });
    router.push("/blog/login");
    router.refresh();
  }

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const res = await fetch("/api/blog/authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, role }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok || !data.ok) return setError(data.message || "Could not add author.");
    setAuthors((cur) => [data.author, ...cur.filter((a) => a.id !== data.author.id)]);
    setName("");
    setEmail("");
    setRole("author");
  }

  async function patch(id: string, body: Partial<BlogAuthor>) {
    const res = await fetch(`/api/blog/authors/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok && data.ok) setAuthors((cur) => cur.map((a) => (a.id === id ? data.author : a)));
    else alert(data.message || "Update failed.");
  }

  async function remove(id: string) {
    if (!window.confirm("Remove this author? They will lose blog access.")) return;
    const res = await fetch(`/api/blog/authors/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok && data.ok) setAuthors((cur) => cur.filter((a) => a.id !== id));
    else alert(data.message || "Could not remove author.");
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-label text-brand">Admin</p>
          <h1 className="mt-2 font-serif text-3xl text-ink">Blog authors</h1>
          <p className="mt-1 text-[14px] text-ink/55">Approve people to sign in and write blog posts.</p>
        </div>
        <div className="flex gap-3">
          <Button href="/blog/dashboard" variant="outline">Dashboard</Button>
          <button type="button" onClick={logout} className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-brand hover:text-brand">
            Log out
          </button>
        </div>
      </div>

      {/* Add author */}
      <form onSubmit={add} className="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-line bg-paper p-5 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end">
        <Field label="Name" htmlFor="a-name" required>
          <Input id="a-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required />
        </Field>
        <Field label="Email" htmlFor="a-email" required>
          <Input id="a-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" required />
        </Field>
        <Field label="Role" htmlFor="a-role">
          <Select id="a-role" value={role} onChange={(e) => setRole(e.target.value as "author" | "admin")}>
            <option value="author">Author</option>
            <option value="admin">Admin</option>
          </Select>
        </Field>
        <Button type="submit" variant="primary">{busy ? "Adding…" : "Add author"}</Button>
      </form>
      {error && <p role="alert" className="mt-3 text-sm font-medium text-flame">{error}</p>}

      {/* Author list */}
      <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[640px] text-left text-[14px]">
          <thead className="border-b border-line text-[11px] font-semibold uppercase tracking-label text-ink/50">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Last login</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {authors.map((a) => {
              const isMe = a.id === meId;
              return (
                <tr key={a.id} className={a.status === "inactive" ? "opacity-55" : ""}>
                  <td className="px-4 py-3 font-medium text-ink">{a.name}{isMe && <span className="ml-1 text-[11px] text-brand">(you)</span>}</td>
                  <td className="px-4 py-3 text-ink/70">{a.email}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${a.role === "admin" ? "bg-ocean-50 text-ocean" : "bg-brand-50 text-brand"}`}>{a.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${a.status === "active" ? "bg-brand-50 text-brand" : "bg-ink/10 text-ink/60"}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3 text-ink/55">{fmtDate(a.createdAt)}</td>
                  <td className="px-4 py-3 text-ink/55">{fmtDate(a.lastLoginAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3 whitespace-nowrap">
                      {!isMe && (
                        <>
                          <button type="button" onClick={() => patch(a.id, { status: a.status === "active" ? "inactive" : "active" })} className="text-[13px] font-semibold text-ink/70 hover:text-brand">
                            {a.status === "active" ? "Deactivate" : "Activate"}
                          </button>
                          <button type="button" onClick={() => patch(a.id, { role: a.role === "admin" ? "author" : "admin" })} className="text-[13px] font-semibold text-ink/70 hover:text-brand">
                            {a.role === "admin" ? "Make author" : "Make admin"}
                          </button>
                          <button type="button" onClick={() => remove(a.id)} className="text-[13px] font-semibold text-flame/80 hover:text-flame">Remove</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

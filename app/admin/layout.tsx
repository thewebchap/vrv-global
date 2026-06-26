import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Integrations",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[60vh] bg-paper">{children}</div>;
}

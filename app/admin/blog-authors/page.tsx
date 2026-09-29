import { redirect } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { AuthorsClient } from "@/components/blog/AuthorsClient";
import { getCurrentAuthor } from "@/lib/blog/auth";
import { listAuthors } from "@/lib/blog/store";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Blog Authors",
  description: "Manage approved VRV Global blog authors.",
  path: "/admin/blog-authors",
  noindex: true,
});

export default async function BlogAuthorsAdminPage() {
  const author = await getCurrentAuthor();
  if (!author) redirect("/blog/login");
  if (author.role !== "admin") redirect("/blog/dashboard");
  const authors = await listAuthors();

  return (
    <Section tone="white">
      <AuthorsClient initialAuthors={authors} meId={author.id} />
    </Section>
  );
}

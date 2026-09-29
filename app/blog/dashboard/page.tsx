import { redirect } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { DashboardClient } from "@/components/blog/DashboardClient";
import { getCurrentAuthor } from "@/lib/blog/auth";
import { listPostsByAuthor } from "@/lib/blog/store";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Blog Dashboard",
  description: "Manage your VRV Global blog posts.",
  path: "/blog/dashboard",
  noindex: true,
});

export default async function BlogDashboardPage() {
  const author = await getCurrentAuthor();
  if (!author) redirect("/blog/login");
  const posts = await listPostsByAuthor(author.id);

  return (
    <Section tone="white">
      <DashboardClient author={author} initialPosts={posts} />
    </Section>
  );
}

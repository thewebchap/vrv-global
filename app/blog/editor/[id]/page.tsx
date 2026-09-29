import { redirect, notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { EditorClient } from "@/components/blog/EditorClient";
import { getCurrentAuthor } from "@/lib/blog/auth";
import { getPostById } from "@/lib/blog/store";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Edit Blog Post",
  description: "Edit a VRV Global blog post.",
  path: "/blog/editor",
  noindex: true,
});

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const author = await getCurrentAuthor();
  if (!author) redirect("/blog/login");
  const post = await getPostById(params.id);
  if (!post) notFound();
  if (post.authorId !== author.id && author.role !== "admin") redirect("/blog/dashboard");

  return (
    <Section tone="white">
      <EditorClient post={post} />
    </Section>
  );
}

import { redirect } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { EditorClient } from "@/components/blog/EditorClient";
import { getCurrentAuthor } from "@/lib/blog/auth";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "New Blog Post",
  description: "Write a new VRV Global blog post.",
  path: "/blog/editor/new",
  noindex: true,
});

export default async function NewPostPage() {
  if (!(await getCurrentAuthor())) redirect("/blog/login");
  return (
    <Section tone="white">
      <EditorClient />
    </Section>
  );
}

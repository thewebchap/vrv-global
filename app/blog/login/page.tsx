import { redirect } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { LoginForm } from "@/components/blog/LoginForm";
import { getCurrentAuthor } from "@/lib/blog/auth";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Author Sign In",
  description: "Sign in to the VRV Global blog with a one-time email code.",
  path: "/blog/login",
  noindex: true,
});

export default async function BlogLoginPage() {
  if (await getCurrentAuthor()) redirect("/blog/dashboard");
  return (
    <Section tone="white">
      <LoginForm />
    </Section>
  );
}

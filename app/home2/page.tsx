import { Home2Story } from "@/components/home2/Home2Story";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Home Concept 2",
  description:
    "An alternate minimalist VRV Global homepage concept focused on sustainable sourcing, technology, ESG and global connectivity.",
  path: "/home2",
});

export default function Home2Page() {
  return <Home2Story />;
}

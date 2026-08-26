import { Home3GraffitiRouteStory } from "@/components/home3/Home3GraffitiRouteStory";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Home Concept 3",
  description:
    "An alternate VRV Global homepage concept showing an end-to-end integrated supply chain through a maritime route journey.",
  path: "/home3",
});

export default function Home3Page() {
  return <Home3GraffitiRouteStory />;
}

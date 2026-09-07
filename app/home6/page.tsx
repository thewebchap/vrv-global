import { Home6RouteStory } from "@/components/home6/Home6RouteStory";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Home Concept 6",
  description:
    "An alternate VRV Global homepage concept: a cinematic scroll voyage through sourcing, processing, assurance, logistics and responsible growth, from origin to destination.",
  path: "/home6",
});

export default function Home6Page() {
  return <Home6RouteStory />;
}

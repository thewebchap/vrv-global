import { Home4RouteStory } from "@/components/home4/Home4RouteStory";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Home Concept 4",
  description:
    "An alternate VRV Global homepage concept: an image-led maritime route journey integrating sustainable commodity supply chains from source to destination.",
  path: "/home4",
});

export default function Home4Page() {
  return <Home4RouteStory />;
}

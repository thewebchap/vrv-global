import type { NewsPost } from "./types";

/**
 * Sample LinkedIn company posts — used when no LINKEDIN_ACCESS_TOKEN is
 * configured so the site renders end-to-end before API approval.
 * Replace by connecting the real LinkedIn API (see client.ts) or by adding
 * posts manually in the admin dashboard.
 */
export const mockLinkedInPosts: NewsPost[] = [
  {
    id: "linkedin:mock-1",
    source: "linkedin",
    status: "published",
    title: "VRV Global advances its sustainable natural rubber traceability programme",
    excerpt:
      "We're deepening supplier engagement and origin data capture across our natural rubber supply chain — building toward deforestation-free, EUDR-ready sourcing. [Sample LinkedIn post — connect the API or edit in admin.]",
    image: undefined,
    url: "https://www.linkedin.com/company/vrv-global",
    publishedDate: "2026-06-10",
    category: "Sustainability",
    tags: ["sustainable rubber", "traceability", "responsible sourcing"],
    createdAt: "2026-06-10T09:00:00.000Z",
    updatedAt: "2026-06-10T09:00:00.000Z",
  },
  {
    id: "linkedin:mock-2",
    source: "linkedin",
    status: "published",
    title: "Recycled copper: closing the loop on the energy transition",
    excerpt:
      "Our circular economy desk continues to scale recycled copper volumes — cutting embodied carbon while meeting electrification demand. [Sample LinkedIn post.]",
    image: undefined,
    url: "https://www.linkedin.com/company/vrv-global",
    publishedDate: "2026-05-28",
    category: "Circular Economy",
    tags: ["recycled metals", "circular economy", "copper"],
    createdAt: "2026-05-28T09:00:00.000Z",
    updatedAt: "2026-05-28T09:00:00.000Z",
  },
  {
    id: "linkedin:mock-3",
    source: "linkedin",
    status: "draft",
    title: "VRV Global at the Singapore commodity trade forum",
    excerpt:
      "Reflections on Singapore's role as a regional hub for responsible, traceable commodity supply chains. [Sample LinkedIn post awaiting admin approval.]",
    image: undefined,
    url: "https://www.linkedin.com/company/vrv-global",
    publishedDate: "2026-05-15",
    category: "Company Updates",
    tags: ["Singapore", "supply chain", "events"],
    createdAt: "2026-05-15T09:00:00.000Z",
    updatedAt: "2026-05-15T09:00:00.000Z",
  },
];

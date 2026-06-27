import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { productDetails } from "@/data/productDetails";
import { ventures } from "@/data/ventures";
import { articles } from "@/lib/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  type Route = {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  };

  const staticRoutes: Route[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/products", changeFrequency: "monthly", priority: 0.9 },
    { path: "/sustainability", changeFrequency: "monthly", priority: 0.8 },
    { path: "/technology", changeFrequency: "monthly", priority: 0.7 },
    { path: "/ventures", changeFrequency: "monthly", priority: 0.8 },
    { path: "/ethics-governance", changeFrequency: "monthly", priority: 0.7 },
    { path: "/ask-vrv", changeFrequency: "monthly", priority: 0.6 },
    { path: "/ai-summary", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact-routing", changeFrequency: "monthly", priority: 0.5 },
    { path: "/about-vrv-global", changeFrequency: "monthly", priority: 0.6 },
    { path: "/products-overview", changeFrequency: "monthly", priority: 0.6 },
    { path: "/sustainability-overview", changeFrequency: "monthly", priority: 0.6 },
    { path: "/ventures-overview", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact-vrv-global", changeFrequency: "monthly", priority: 0.6 },
    { path: "/news", changeFrequency: "weekly", priority: 0.8 },
    { path: "/careers", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const productPages: MetadataRoute.Sitemap = productDetails.map((p) => ({
    url: `${site.url}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const venturePages: MetadataRoute.Sitemap = [
    { url: `${site.url}/ventures`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...ventures.map((v) => ({
      url: `${site.url}/ventures/${v.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  const newsPages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${site.url}/news/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...venturePages, ...newsPages];
}

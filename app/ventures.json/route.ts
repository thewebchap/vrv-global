import { NextResponse } from "next/server";
import { ventures } from "@/data/ventures";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/** Machine-readable ventures overview. */
export function GET() {
  const data = {
    company: site.legalName,
    base: "Singapore",
    summary:
      "VRV Global's ventures extend commodity trading into strategic projects, upstream resource access, circular economy materials, and sustainable supply chain growth.",
    ventures: ventures.map((v) => ({
      title: v.title,
      slug: v.slug,
      path: `/ventures/${v.slug}`,
      segment: v.segment,
      geography: v.geography,
      focus: v.focus,
      status: v.status,
      summary: v.summary,
    })),
    contact: "/contact?type=ventures",
    disclaimer:
      "Mining and venture project specifics (geographies, status, ownership) are forward-looking and marked for confirmation before publishing.",
  };
  return NextResponse.json(data);
}

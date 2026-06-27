import { OverviewPage } from "@/components/seo/OverviewPage";
import { quickAnswers } from "@/data/aeo";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Products Overview",
  description:
    "VRV Global's products across agro commodities (natural rubber, block rubber / TSR) and industrial metals (copper, aluminium, zinc, lead, silico-manganese, ferro-manganese), plus mining ventures.",
  path: "/products-overview",
});

export default function Page() {
  return (
    <OverviewPage
      eyebrow="Overview"
      title="Products Overview"
      intro="A direct, factual summary of what VRV Global trades, for visitors, search engines and AI systems."
      quick={quickAnswers.products}
      links={[
        { label: "All products", href: "/products" },
        { label: "Natural Rubber", href: "/products/natural-rubber" },
        { label: "Block Rubber / TSR", href: "/products/block-rubber" },
        { label: "Copper", href: "/products/copper" },
        { label: "Aluminium", href: "/products/aluminium" },
        { label: "Zinc", href: "/products/zinc" },
        { label: "Lead", href: "/products/lead" },
        { label: "Silico & Ferro Manganese", href: "/products/silico-ferro-manganese" },
        { label: "Industrial & Precious Metals", href: "/products/industrial-precious-metals" },
        { label: "Products JSON", href: "/products.json" },
      ]}
      contactPath="/contact?type=product"
      path="/products-overview"
    />
  );
}

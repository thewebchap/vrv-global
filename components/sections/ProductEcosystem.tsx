import Image from "next/image";
import Link from "next/link";
import { productEcosystem } from "@/data/productEcosystem";
import { Icon } from "@/components/ui/Icon";

/**
 * Three product-category cards — image on top, content in a clean panel below
 * (no text-over-image overlap). Relevant, free-to-use imagery per category.
 */
export function ProductEcosystem() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {productEcosystem.map((c) => (
        <article
          key={c.category}
          id={c.category}
          className="group flex scroll-mt-24 flex-col overflow-hidden rounded-[2rem] border border-line bg-white shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:border-brand/30 hover:shadow-hover"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand">
            <Image
              src={c.image}
              alt={c.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectPosition: c.imagePosition ?? "center" }}
              className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-105"
            />
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="font-serif text-2xl text-ink">{c.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{c.description}</p>
            <div className="mt-5 flex flex-1 flex-wrap content-start gap-2">
              {c.tags.map((t) => (
                <span key={t} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand">
                  {t}
                </span>
              ))}
            </div>
            <Link
              href={c.href}
              className="mt-6 inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-semibold text-brand"
            >
              Explore {c.title}
              <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

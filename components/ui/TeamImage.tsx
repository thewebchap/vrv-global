import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Stable, optimised team portrait.
 *
 * Uses next/image with `fill` inside a fixed `aspect-[4/5]` container so every
 * card reserves the exact same space before the image loads — no layout shift
 * or "shape change" on refresh, regardless of the source file's real
 * dimensions (the source portraits are very large and differ in ratio).
 * Always `object-cover` (never `object-fill`), with a configurable
 * object-position so faces aren't cropped awkwardly.
 */
type TeamImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  objectPosition?: string;
  sizes?: string;
  rounded?: string;
  className?: string;
};

export function TeamImage({
  src,
  alt,
  priority = false,
  objectPosition = "center top",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px",
  rounded = "rounded-2xl",
  className,
}: TeamImageProps) {
  return (
    <div className={cn("relative aspect-[4/5] w-full overflow-hidden bg-sand", rounded, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.03]"
        style={{ objectPosition }}
      />
    </div>
  );
}

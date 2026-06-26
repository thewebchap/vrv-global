import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Official VRV Global logo (/vrv-logo.png — 400×108, transparent).
 * The warm gradient mark reads clearly on both light (header) and dark
 * (footer) surfaces, so no backing plate is needed. Rendered with a stable
 * intrinsic size and `object-contain` so it never stretches.
 */
export function Logo({
  className,
  priority = true,
}: {
  tone?: "dark" | "light";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/vrv-logo.png"
      alt="VRV Global"
      width={400}
      height={108}
      priority={priority}
      className={cn("h-9 w-auto object-contain", className)}
    />
  );
}

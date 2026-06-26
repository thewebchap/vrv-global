import { Media } from "./Media";

/**
 * Thin wrapper over <Media>. Pass `src` to show a real image (with the label
 * as graceful fallback); omit `src` to render the branded placeholder panel.
 * Kept for backward-compatible call sites across the site.
 */
export function Placeholder({
  label,
  src,
  alt,
  className,
  ratio = "16/9",
  overlay = false,
}: {
  label: string;
  src?: string;
  alt?: string;
  className?: string;
  ratio?: "16/9" | "4/3" | "1/1" | "3/4" | "21/9" | "3/2" | "none";
  overlay?: boolean;
  /** legacy prop, ignored */
  tone?: "paper" | "ink";
}) {
  return (
    <Media
      src={src}
      alt={alt ?? label}
      label={label}
      className={className}
      ratio={ratio}
      overlay={overlay}
    />
  );
}

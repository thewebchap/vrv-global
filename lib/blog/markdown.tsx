import React from "react";

/**
 * Minimal, SAFE markdown renderer → React nodes. It never uses
 * dangerouslySetInnerHTML, so no author-supplied HTML is ever executed. Only a
 * curated subset is supported: headings, paragraphs, bullet/ordered lists,
 * links, bold/italic/code, images, blockquotes and horizontal rules. URLs are
 * restricted to http(s), mailto and site-relative paths.
 */
function safeUrl(url: string): string | null {
  const u = url.trim();
  if (/^(https?:\/\/|mailto:)/i.test(u)) return u;
  if (u.startsWith("/") || u.startsWith("#")) return u;
  return null; // drop javascript:, data:, etc.
}

// ---- inline formatting (bold, italic, code, links) ----------------------
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let rest = text;
  let k = 0;
  // Ordered by specificity. Links first, then bold, italic, code.
  const patterns: { re: RegExp; make: (m: RegExpMatchArray) => React.ReactNode }[] = [
    {
      re: /\[([^\]]+)\]\(([^)\s]+)\)/,
      make: (m) => {
        const href = safeUrl(m[2]);
        if (!href) return m[1];
        const external = /^https?:\/\//i.test(href);
        return (
          <a
            key={`${keyPrefix}-${k}`}
            href={href}
            className="font-medium text-brand underline underline-offset-2 hover:text-brand-600"
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {m[1]}
          </a>
        );
      },
    },
    { re: /\*\*([^*]+)\*\*/, make: (m) => <strong key={`${keyPrefix}-${k}`}>{m[1]}</strong> },
    { re: /(?<!\*)\*([^*]+)\*(?!\*)/, make: (m) => <em key={`${keyPrefix}-${k}`}>{m[1]}</em> },
    { re: /`([^`]+)`/, make: (m) => <code key={`${keyPrefix}-${k}`} className="rounded bg-paper px-1.5 py-0.5 text-[0.9em] text-ink">{m[1]}</code> },
  ];

  while (rest.length) {
    let best: { index: number; length: number; node: React.ReactNode } | null = null;
    for (const p of patterns) {
      const m = rest.match(p.re);
      if (m && m.index !== undefined && (best === null || m.index < best.index)) {
        best = { index: m.index, length: m[0].length, node: p.make(m) };
      }
    }
    if (!best) {
      nodes.push(rest);
      break;
    }
    if (best.index > 0) nodes.push(rest.slice(0, best.index));
    nodes.push(best.node);
    k += 1;
    rest = rest.slice(best.index + best.length);
  }
  return nodes;
}

export function renderMarkdown(md: string): React.ReactNode {
  const lines = (md ?? "").replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    let line = lines[i];

    // blank
    if (!line.trim()) {
      i += 1;
      continue;
    }

    // horizontal rule
    if (/^\s*---+\s*$/.test(line)) {
      blocks.push(<hr key={key++} className="my-8 border-line" />);
      i += 1;
      continue;
    }

    // image on its own line
    const img = line.match(/^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/);
    if (img) {
      const src = safeUrl(img[2]);
      if (src) {
        // eslint-disable-next-line @next/next/no-img-element
        blocks.push(
          <img key={key++} src={src} alt={img[1]} className="my-6 w-full rounded-2xl border border-line" />,
        );
      }
      i += 1;
      continue;
    }

    // heading
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const cls =
        level <= 1
          ? "mt-10 font-serif text-[clamp(1.6rem,3vw,2.1rem)] text-ink"
          : level === 2
            ? "mt-9 font-serif text-2xl text-ink"
            : "mt-7 font-serif text-xl text-ink";
      const Tag = (`h${Math.min(level + 1, 6)}` as unknown) as keyof JSX.IntrinsicElements;
      blocks.push(
        <Tag key={key++} className={cls}>
          {renderInline(h[2], `h${key}`)}
        </Tag>,
      );
      i += 1;
      continue;
    }

    // blockquote
    if (/^\s*>\s?/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*>\s?/, ""));
        i += 1;
      }
      blocks.push(
        <blockquote key={key++} className="my-6 border-l-2 border-gold pl-4 font-serif text-[17px] leading-relaxed text-ink/80">
          {renderInline(items.join(" "), `q${key}`)}
        </blockquote>,
      );
      continue;
    }

    // unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i += 1;
      }
      blocks.push(
        <ul key={key++} className="my-4 list-disc space-y-1.5 pl-6 text-[16.5px] leading-relaxed text-ink/75">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it, `ul${key}-${idx}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    // ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i += 1;
      }
      blocks.push(
        <ol key={key++} className="my-4 list-decimal space-y-1.5 pl-6 text-[16.5px] leading-relaxed text-ink/75">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it, `ol${key}-${idx}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    // paragraph (gather consecutive non-blank, non-special lines)
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,4})\s+/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !/^\s*>\s?/.test(lines[i]) &&
      !/^\s*---+\s*$/.test(lines[i]) &&
      !/^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/.test(lines[i])
    ) {
      para.push(lines[i]);
      i += 1;
    }
    line = para.join(" ");
    blocks.push(
      <p key={key++} className="mt-5 text-[16.5px] leading-relaxed text-ink/75 text-pretty">
        {renderInline(line, `p${key}`)}
      </p>,
    );
  }

  return <>{blocks}</>;
}

/** Plain-text excerpt from markdown (for cards / meta descriptions). */
export function excerptFromMarkdown(md: string, max = 180): string {
  const text = (md ?? "")
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

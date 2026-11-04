"use client";

import { Annotate } from "@/components/site/draw/Annotate";

/**
 * The client quote, set like the homepage testimonial (Brule, large) with no card: a hairline above, the quote,
 * the client below. Exactly one phrase carries the orange highlight; the wording is the testimonial's own.
 */
export function Quote({ quote, name, company, highlight }: { quote: string; name: string; company: string; highlight: string }) {
  const at = quote.indexOf(highlight);
  const before = at >= 0 ? quote.slice(0, at) : quote;
  const after = at >= 0 ? quote.slice(at + highlight.length) : "";
  return (
    <figure className="border-t border-ink/30 pt-10">
      <blockquote className="max-w-[48rem] font-[family-name:var(--font-brule)] text-[clamp(1.4rem,2.4vw,2rem)] font-semibold leading-[1.25] tracking-tight">
        “{before}
        {at >= 0 && (
          <Annotate type="highlight" color="rgba(230, 80, 50, 0.35)" iterations={1} padding={[2, 6, 2, 6]} multiline>
            {highlight}
          </Annotate>
        )}
        {after}”
      </blockquote>
      <figcaption className="gl-mono mt-5 text-ink/70">
        {name}, {company}
      </figcaption>
    </figure>
  );
}

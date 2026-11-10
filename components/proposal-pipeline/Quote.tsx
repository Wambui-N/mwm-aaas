"use client";

import { Fragment, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Annotate } from "@/components/site/draw/Annotate";
import { MONO } from "@/lib/site/labels";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Words = ({ text }: { text: string }) => (
  <>
    {text.split(/(\s+)/).map((w, i) =>
      /^\s+$/.test(w) ? (
        w
      ) : (
        <span key={i} className="quote-word inline-block">
          {w}
        </span>
      ),
    )}
  </>
);

/**
 * The client quote, built the same way as the homepage testimonial row: a ruled card with the quote in Brule on
 * the wide left (words fade in as it scrolls into view; shown in full with reduced motion), a hairline, then the
 * client details with the mono CLIENT / 01 label. Exactly one phrase carries the orange highlight; the wording is
 * the testimonial's own.
 */
export function Quote({ quote, name, company, highlight }: { quote: string; name: string; company: string; highlight: string }) {
  const root = useRef<HTMLDivElement>(null);
  const at = quote.indexOf(highlight);
  const before = at >= 0 ? quote.slice(0, at) : quote;
  const after = at >= 0 ? quote.slice(at + highlight.length) : "";

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".quote-word",
        { opacity: 0.2 },
        { opacity: 1, ease: "none", stagger: 0.05, scrollTrigger: { trigger: ".quote-text", start: "top 80%", end: "bottom 60%", scrub: true } },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className="calm-card grid gap-6 px-6 py-10 md:grid-cols-12 md:items-stretch md:gap-x-6 md:px-10 md:py-12">
      <blockquote className="quote-text font-[family-name:var(--font-brule)] text-[clamp(1.4rem,2.4vw,2rem)] font-semibold leading-[1.25] tracking-tight md:col-span-8">
        <Fragment>
          <Words text={before} />
          {at >= 0 && (
            <Annotate type="highlight" color="rgba(230, 80, 50, 0.35)" iterations={1} padding={[2, 6, 2, 6]} multiline>
              <Words text={highlight} />
            </Annotate>
          )}
          <Words text={after} />
        </Fragment>
      </blockquote>

      <div aria-hidden className="md:col-span-1 md:flex md:justify-center">
        <div className="h-px w-full bg-ink/25 md:h-full md:w-px" />
      </div>

      <div className="md:col-span-3 md:self-center">
        <p className="gl-mono text-ink/60">
          {MONO.testimonialPrefix} <span aria-hidden>/</span> 01
        </p>
        <p className="calm-body mt-4 font-bold">{name}</p>
        <p className="calm-body">{company}</p>
      </div>
    </div>
  );
}

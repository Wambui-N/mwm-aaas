"use client";

import { Fragment, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Annotate } from "@/components/homepage/draw/Annotate";
import { MONO } from "@/lib/homepage/labels";
import { testimonial, testimonials } from "@/lib/homepage/copy";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Part = { text: string; hl: boolean };

/** Split a quote around its highlighted phrase, preserving the exact wording. */
function parts(quote: string, highlights: readonly string[]): Part[] {
  const out: Part[] = [];
  let rest = quote;
  while (rest.length) {
    const hits = highlights.map((h) => ({ h, i: rest.indexOf(h) })).filter((x) => x.i >= 0);
    if (!hits.length) {
      out.push({ text: rest, hl: false });
      break;
    }
    const first = hits.sort((a, b) => a.i - b.i)[0];
    if (first.i > 0) out.push({ text: rest.slice(0, first.i), hl: false });
    out.push({ text: first.h, hl: true });
    rest = rest.slice(first.i + first.h.length);
  }
  return out;
}

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

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Testimonials as ruled rows: the quote on the wide left, a hairline, then the client details. No pin,
 * no tilt, no tape. Exactly one phrase per quote has the orange highlight (the first listed in
 * lib/copy.ts). With more than one testimonial a mono counter (01/03) follows the scroll.
 */
export function Testimonial() {
  const root = useRef<HTMLElement>(null);
  const total = testimonials.length;

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.utils.toArray<HTMLElement>(".t-row").forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            const counter = root.current?.querySelector(".t-counter");
            if (self.isActive && counter) counter.textContent = `${pad(i + 1)}/${pad(total)}`;
          },
        });
        if (reduced) return;
        gsap.fromTo(
          row.querySelectorAll(".quote-word"),
          { opacity: 0.2 },
          { opacity: 1, ease: "none", stagger: 0.05, scrollTrigger: { trigger: row.querySelector(".quote-text"), start: "top 80%", end: "bottom 60%", scrub: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-4 py-[4.5rem] md:px-8 md:py-[6.75rem]">
      <div className="mx-auto max-w-[81.25rem]">
        <p className="gl-mono text-ink/60">{testimonial.label}</p>

        <div className="relative mt-8">
          {total > 1 && (
            <div className="pointer-events-none sticky top-24 z-10 -mb-4 flex h-0 justify-end">
              <span className="t-counter gl-mono px-2 py-1 text-ink/60" style={{ background: "var(--paper)" }}>{`${pad(1)}/${pad(total)}`}</span>
            </div>
          )}

          <ol className="space-y-6">
            {testimonials.map((t, i) => (
              <li key={t.name + i} className="t-row calm-card grid gap-6 px-6 py-10 md:grid-cols-12 md:items-stretch md:gap-x-6 md:px-10 md:py-12">
                <blockquote className="quote-text font-[family-name:var(--font-brule)] text-[clamp(1.4rem,2.4vw,2rem)] font-semibold leading-[1.25] tracking-tight md:col-span-8">
                  {parts(t.quote, t.highlights.slice(0, 1)).map((p, k) => (
                    <Fragment key={k}>
                      {p.hl ? (
                        <Annotate type="highlight" color="rgba(230, 80, 50, 0.35)" iterations={1} padding={[2, 6, 2, 6]} multiline>
                          <Words text={p.text} />
                        </Annotate>
                      ) : (
                        <Words text={p.text} />
                      )}
                    </Fragment>
                  ))}
                </blockquote>

                {/* a straight hairline between the quote and the client: vertical on desktop, horizontal on mobile */}
                <div aria-hidden className="md:col-span-1 md:flex md:justify-center">
                  <div className="h-px w-full bg-ink/25 md:h-full md:w-px" />
                </div>

                <div className="md:col-span-3 md:self-center">
                  <p className="gl-mono text-ink/60">
                    {MONO.testimonialPrefix} <span aria-hidden>/</span> {pad(i + 1)}
                  </p>
                  <p className="calm-body mt-4 font-bold">{t.name}</p>
                  <p className="calm-body">{t.company}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

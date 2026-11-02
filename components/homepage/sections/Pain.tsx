"use client";

import { Fragment, useEffect, useRef } from "react";
import { annotate } from "rough-notation";
import type { RoughAnnotation } from "rough-notation/lib/model";
import { DrawIn } from "@/components/homepage/draw/DrawIn";
import { ScrawlUnderline } from "@/components/homepage/ScrawlStrike";
import { pain } from "@/lib/homepage/copy";

// The one orange highlight in this section: card 02, an exact phrase from lib/copy.ts.
const HIGHLIGHT_CARD = 1;
const HIGHLIGHT = "Nobody knows which version is current.";

/** Split a body string around its highlighted phrase without retyping any copy. */
function around(body: string, phrase: string): [string, string, string] {
  const i = body.indexOf(phrase);
  return i < 0 ? [body, "", ""] : [body.slice(0, i), phrase, body.slice(i + phrase.length)];
}

export function Pain() {
  const root = useRef<HTMLElement>(null);
  const [h1, h2] = pain.heading.split("processes");

  // The highlight is created and drawn when its card is about 60% in view (after fonts and layout
  // have settled, and rebuilt on resize), so it always sits on its text.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      const card = el.querySelector<HTMLElement>(".pain-card-hl");
      const target = card?.querySelector<HTMLElement>(".pain-hl");
      if (!card || !target) return;
      let a: RoughAnnotation | null = null;
      let shown = false;
      const make = (animate: boolean) => {
        a?.remove();
        a = annotate(target, { type: "highlight", color: "rgba(230, 80, 50, 0.35)", multiline: true, iterations: 1, padding: [2, 3, 2, 3], animate, animationDuration: 700 });
        a.show();
        shown = true;
      };
      if (reduced) {
        make(false);
      } else {
        const io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              make(true);
              io.disconnect();
            }
          },
          { threshold: 0.6 },
        );
        io.observe(card);
        cleanups.push(() => io.disconnect());
      }
      let timer: ReturnType<typeof setTimeout> | undefined;
      const onResize = () => {
        clearTimeout(timer);
        timer = setTimeout(() => shown && make(false), 250);
      };
      window.addEventListener("resize", onResize);
      cleanups.push(() => {
        window.removeEventListener("resize", onResize);
        clearTimeout(timer);
        (a as RoughAnnotation | null)?.remove();
      });
    });

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section id={pain.id} ref={root} className="px-4 py-[4.5rem] md:px-8 md:py-[6.75rem]">
      <div className="mx-auto max-w-[81.25rem]">
        <p className="gl-mono mb-5 text-ink/60">{pain.label}</p>

        {/* one orange marker underline, under "processes" only */}
        <h2 className="sk-h2 max-w-[20ch]">
          {h1}
          <span className="relative inline-block">
            processes
            <DrawIn as="span" on="scroll" start="top 85%" duration={0.5} stagger={0.2} className="pointer-events-none absolute -inset-x-[0.05em] -bottom-[0.14em] block h-[0.3em]">
              <ScrawlUnderline seed={8} />
            </DrawIn>
          </span>
          {h2}
        </h2>
        <p className="calm-body mt-6 max-w-xl">{pain.intro}</p>

        {/* four identical hairline cards in an equal 2 x 2 grid (one column on mobile) */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
          {pain.items.map((item, i) => {
            const [before, phrase, after] = i === HIGHLIGHT_CARD ? around(item.body, HIGHLIGHT) : [item.body, "", ""];
            return (
              <article key={item.title} className={`calm-card p-6 md:p-7 ${i === HIGHLIGHT_CARD ? "pain-card-hl" : ""}`}>
                <p className="gl-mono text-ink/60" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="calm-h3 mt-3">{item.title}</h3>
                <p className="calm-body mt-3">
                  <Fragment>
                    {before}
                    {phrase && <span className="pain-hl">{phrase}</span>}
                    {after}
                  </Fragment>
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

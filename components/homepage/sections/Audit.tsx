"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import Magnet from "@/components/homepage/reactbits/Magnet";
import { SketchButton } from "@/components/site/SketchButton";
import { tornTopBottom } from "@/lib/site/torn";
import { AUDIT_HREF, audit as auditCopy } from "@/lib/homepage/copy";
import { SCORECARD_LIVE } from "@/lib/scorecard/config";
import { scorecardAudit } from "@/lib/scorecard/homepageCopy";
import { Underlined } from "@/components/site/Underlined";

/** The scorecard copy once the launch flag is on; the audit copy until then. */
const audit: typeof auditCopy & { note?: string } = SCORECARD_LIVE ? scorecardAudit : auditCopy;

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

/**
 * The one torn sheet on the page: a work-order form. The three bullets are ink tick-boxes, the stats
 * are three ruled rows (number, label, hairline) instead of ovals, and the button is the single orange
 * thing besides the heading underline. The sheet is straight (no tilt) and carries no notes.
 */
export function Audit() {
  const root = useRef<HTMLElement>(null);
  const [before, after] = audit.heading.split("how fast");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".audit-sheet", { y: 30, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: ".audit-sheet", start: "top 85%" } });

      const tl = gsap.timeline({ scrollTrigger: { trigger: ".audit-bullets", start: "top 80%" } });
      gsap.utils.toArray<HTMLElement>(".audit-tick").forEach((tick, i) => {
        tl.fromTo(tick.querySelectorAll(".sk-stroke"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.4, ease: "power1.inOut" }, i * 0.4);
      });

      root.current?.querySelectorAll<HTMLElement>("[data-stat]").forEach((el) => {
        const to = Number(el.dataset.stat);
        const state = { n: 0 };
        gsap.to(state, {
          n: to,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => void (el.textContent = String(Math.round(state.n))),
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-4 py-[4.5rem] md:px-8 md:py-[6.75rem]">
      {/* drop-shadow on the wrapper so the torn clip-path doesn't cut the soft paper shadow */}
      <div className="audit-sheet mx-auto w-full max-w-[68.75rem]" style={{ filter: "drop-shadow(0 6px 8px rgb(20 16 16 / 0.15))" }}>
        <div className="sk-paper relative px-6 py-12 md:px-12 md:py-16" style={{ clipPath: tornTopBottom(11) }}>
          <p className="gl-mono text-ink/60">{audit.label}</p>

          {/* one orange marker underline, under "how fast" only */}
          <h2 className="sk-h2 mt-4">
            {before}
            <Underlined seed={19}>how fast</Underlined>
            {after}
          </h2>
          <p className="calm-body mt-6 max-w-2xl">{audit.body}</p>

          <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14">
            <div>
              <p className="gl-mono text-ink/60">{audit.panelTitle}</p>
              <p className="calm-h3 mt-3">{audit.panelSub}</p>
              <ul className="audit-bullets mt-6 space-y-4">
                {audit.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="audit-tick mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-ink" aria-hidden>
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path className="sk-stroke" d="M2.5 8.5 6.5 12.5 13.5 3.5" />
                      </svg>
                    </span>
                    <span className="text-[1.0625rem] leading-snug">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Magnet padding={50} magnetStrength={4}>
                  <SketchButton href={AUDIT_HREF} variant="marker" seed={6} className="text-lg">
                    {audit.cta} -&gt;
                  </SketchButton>
                </Magnet>
                {audit.note && <p className="gl-mono mt-4 text-ink/60">{audit.note}</p>}
              </div>
            </div>

            {/* the stats: three ruled rows, number left, label right */}
            <dl className="audit-stats self-center border-t border-ink/40">
              {audit.stats.map((s) => (
                <div key={s.label} className="flex items-baseline justify-between gap-6 border-b border-ink/40 py-4">
                  <dd className="font-[family-name:var(--font-brule)] text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-none">
                    <span data-stat={s.value}>{s.value}</span>
                  </dd>
                  <dt className="gl-mono text-right">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

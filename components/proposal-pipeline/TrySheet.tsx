"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { tornTopBottom } from "@/lib/site/torn";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

/**
 * The "Try it free" section set like the homepage's [05] Start here: the one torn paper sheet, mono label, heading
 * with its single underline, a short body, then two columns (a ticked list on the left, three ruled rows on the
 * right) and the form below. Ticks draw in on scroll; with reduced motion everything is shown as is.
 * The heading, body, lists and form are passed in so the page keeps the copy.
 */
export function TrySheet({
  label,
  heading,
  body,
  panelTitle,
  panelSub,
  bullets,
  rows,
  children,
}: {
  label: string;
  heading: React.ReactNode;
  body: string;
  panelTitle: string;
  panelSub: string;
  bullets: readonly string[];
  rows: readonly (readonly [string, string])[];
  children: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".try-sheet", { y: 30, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: ".try-sheet", start: "top 85%" } });
      const tl = gsap.timeline({ scrollTrigger: { trigger: ".try-bullets", start: "top 80%" } });
      gsap.utils.toArray<HTMLElement>(".try-tick").forEach((tick, i) => {
        tl.fromTo(tick.querySelectorAll(".sk-stroke"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.4, ease: "power1.inOut" }, i * 0.4);
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* drop-shadow on the wrapper so the torn clip-path doesn't cut the soft paper shadow */}
      <div className="try-sheet mx-auto w-full max-w-[68.75rem]" style={{ filter: "drop-shadow(0 6px 8px rgb(20 16 16 / 0.15))" }}>
        <div className="sk-paper relative px-6 py-12 md:px-12 md:py-16" style={{ clipPath: tornTopBottom(11) }}>
          <p className="gl-mono text-ink/60">{label}</p>
          {heading}
          <p className="calm-body mt-6 max-w-2xl">{body}</p>

          <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-14">
            <div>
              <p className="gl-mono text-ink/60">{panelTitle}</p>
              <p className="calm-h3 mt-3">{panelSub}</p>
              <ul className="try-bullets mt-6 space-y-4">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="try-tick mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-ink" aria-hidden>
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path className="sk-stroke" d="M2.5 8.5 6.5 12.5 13.5 3.5" />
                      </svg>
                    </span>
                    <span className="text-[1.0625rem] leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="self-center border-t border-ink/40">
              {rows.map(([value, label]) => (
                <div key={label} className="flex items-baseline justify-between gap-6 border-b border-ink/40 py-4">
                  <dd className="font-[family-name:var(--font-brule)] text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-none">{value}</dd>
                  <dt className="gl-mono text-right">{label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-12">{children}</div>
        </div>
      </div>
    </div>
  );
}

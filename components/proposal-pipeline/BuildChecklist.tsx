"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

/**
 * "Every build includes": a ruled checklist, two columns from 768px. Each row has a hairline checkbox whose ink
 * tick draws as the row scrolls in (the same tick as the homepage checklist, drawn row by row). With reduced
 * motion the ticks stay fully drawn.
 */
export function BuildChecklist({ items }: { items: readonly (readonly string[])[] }) {
  const root = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>(".bc-row").forEach((row, i) => {
        gsap.fromTo(
          row.querySelectorAll(".bc-tick .sk-stroke"),
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 0.4, ease: "power1.inOut", delay: (i % 2) * 0.12, scrollTrigger: { trigger: row, start: "top 85%", once: true } },
        );
      });
    },
    { scope: root },
  );

  return (
    <ul ref={root} className="mt-4 grid border-b border-ink/20 md:grid-cols-2 md:gap-x-12">
      {items.map(([t, b]) => (
        <li key={t} className="bc-row flex items-start gap-4 border-t border-ink/20 py-5">
          <span className="bc-tick mt-1 grid h-5 w-5 shrink-0 place-items-center border border-ink" aria-hidden>
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path className="sk-stroke" d="M2.5 8.5 6.5 12.5 13.5 3.5" />
            </svg>
          </span>
          <div>
            <p className="font-bold">{t}</p>
            <p className="calm-body mt-1 text-ink/80">{b.charAt(0).toUpperCase() + b.slice(1)}.</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

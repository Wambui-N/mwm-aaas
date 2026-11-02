"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { fit } from "@/lib/homepage/copy";
import { Underlined } from "@/components/site/Underlined";
import { SectionLabel } from "@/components/site/SectionLabel";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

/** A ruled list: a hairline checkbox per line that gets an ink tick as you scroll past it. */
export function Checklist() {
  const root = useRef<HTMLElement>(null);
  const [before, after] = fit.heading.split("right place");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>(".fit-row").forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 80%", once: true } });
        tl.from(row.querySelector(".fit-text"), { y: 10, opacity: 0, duration: 0.5, ease: "power2.out" }).fromTo(
          row.querySelectorAll(".fit-tick .sk-stroke"),
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 0.4, ease: "power1.inOut" },
          0.2,
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-4 py-[4.5rem] md:px-8 md:py-[6.75rem]">
      <div className="mx-auto grid max-w-[81.25rem] gap-10 md:grid-cols-12 md:gap-x-6">
        <div className="md:col-span-5">
          <SectionLabel>{fit.label}</SectionLabel>

          {/* one orange marker underline, under "right place" only */}
          <h2 className="sk-h2">
            {before}
            <Underlined seed={23}>right place</Underlined>
            {after}
          </h2>
        </div>

        <ul className="calm-card md:col-span-7">
          {fit.items.map((item, i) => (
            <li key={item} className={`fit-row flex items-center gap-4 px-5 py-5 md:px-7 ${i ? "border-t border-ink/20" : ""}`}>
              <span className="fit-tick grid h-5 w-5 shrink-0 place-items-center border border-ink" aria-hidden>
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path className="sk-stroke" d="M2.5 8.5 6.5 12.5 13.5 3.5" />
                </svg>
              </span>
              <p className="fit-text calm-body">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

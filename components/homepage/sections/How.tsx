"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { how } from "@/lib/homepage/copy";
import { Underlined } from "@/components/site/Underlined";
import { SectionLabel } from "@/components/site/SectionLabel";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Four steps in a clean vertical list on the paper background: a number on the left, the step on
 * the right. One orange line runs down the page and connects the four numbers; it draws as you
 * scroll (DrawSVG, scrubbed). No boxes, no pinned number, no doodles.
 */
export function How() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const path = useRef<SVGPathElement>(null);
  const [line, setLine] = useState({ top: 0, height: 0 });

  // Measure from the centre of the first number to the centre of the last one.
  useEffect(() => {
    const ol = list.current;
    if (!ol) return;
    const measure = () => {
      const nums = ol.querySelectorAll<HTMLElement>(".how-num");
      if (nums.length < 2) return;
      const base = ol.getBoundingClientRect().top;
      const a = nums[0].getBoundingClientRect();
      const b = nums[nums.length - 1].getBoundingClientRect();
      setLine({ top: a.top - base + a.height / 2, height: b.top - a.top });
    };
    measure();
    document.fonts.ready.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(ol);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!line.height) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        path.current,
        { drawSVG: "0%" },
        { drawSVG: "100%", ease: "none", scrollTrigger: { trigger: list.current, start: "top 65%", end: "bottom 60%", scrub: true } },
      );
    },
    { scope: root, dependencies: [line.height] },
  );

  return (
    <section ref={root} className="px-4 py-[4.5rem] md:px-8 md:py-[6.75rem]">
      <div className="mx-auto max-w-[81.25rem]">
        <SectionLabel>{how.label}</SectionLabel>

        {/* one orange marker underline, under "it just runs" only */}
        <h2 className="sk-h2">
          {how.heading[0]}
          <br />
          {how.heading[1].split("it just runs")[0]}
          <Underlined seed={15}>it just runs</Underlined>
          {how.heading[1].split("it just runs")[1]}
        </h2>
        <p className="calm-body mt-6 max-w-xl">{how.intro}</p>

        <ol ref={list} className="relative mt-12 max-w-3xl">
          {/* the orange line: from the first number to the last */}
          <svg aria-hidden focusable="false" className="pointer-events-none absolute left-[1.25rem] w-[3px] -translate-x-1/2 overflow-visible" style={{ top: line.top, height: line.height }} viewBox={`0 0 3 ${Math.max(line.height, 1)}`}>
            <path ref={path} d={`M1.5 0 L1.5 ${line.height}`} fill="none" stroke="var(--signal)" strokeWidth="2" strokeLinecap="round" />
          </svg>

          {how.steps.map((s, i) => (
            <li key={s.title} className="relative grid grid-cols-[2.5rem_1fr] gap-x-6 pb-12 last:pb-0 md:gap-x-8">
              <span className="how-num relative z-10 grid h-10 w-10 place-items-center rounded-full border border-ink/40 font-[family-name:var(--font-brule)] text-[0.95rem] font-semibold" style={{ background: "var(--paper)" }}>
                {pad(i + 1)}
              </span>
              <div className="pt-1.5">
                <h3 className="calm-h3">{s.title}</h3>
                <p className="calm-body mt-2 max-w-xl">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

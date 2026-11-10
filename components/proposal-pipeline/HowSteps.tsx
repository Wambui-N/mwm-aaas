"use client";

import { useEffect, useRef, useState } from "react";
import { DrawIn } from "@/components/site/draw/DrawIn";

type Step = readonly string[];

/**
 * Three steps with no boxes: a numbered circle, a title and a line of text. One orange line is drawn through the
 * three numbers: across from 768px, down the left edge below that (the line follows whatever layout is showing,
 * because it is measured from the circles themselves). Drawn once on scroll; already drawn with reduced motion.
 */
export function HowSteps({ steps }: { steps: readonly Step[] }) {
  const list = useRef<HTMLOListElement>(null);
  const [line, setLine] = useState<{ x1: number; y1: number; x2: number; y2: number; w: number; h: number } | null>(null);

  useEffect(() => {
    const ol = list.current;
    if (!ol) return;
    const measure = () => {
      const nums = ol.querySelectorAll<HTMLElement>(".hs-num");
      if (nums.length < 2) return;
      const o = ol.getBoundingClientRect();
      const a = nums[0].getBoundingClientRect();
      const b = nums[nums.length - 1].getBoundingClientRect();
      setLine({
        x1: a.left - o.left + a.width / 2,
        y1: a.top - o.top + a.height / 2,
        x2: b.left - o.left + b.width / 2,
        y2: b.top - o.top + b.height / 2,
        w: o.width,
        h: o.height,
      });
    };
    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(ol);
    return () => ro.disconnect();
  }, []);

  return (
    <ol ref={list} className="relative mt-8 md:grid md:grid-cols-3 md:gap-x-10">
      {line && (
        <DrawIn as="div" className="pointer-events-none absolute inset-0">
          <svg aria-hidden focusable="false" className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${line.w} ${line.h}`}>
            <path className="sk-stroke" d={`M${line.x1} ${line.y1} L${line.x2} ${line.y2}`} fill="none" stroke="var(--signal)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </DrawIn>
      )}
      {steps.map(([t, b], i) => (
        <li key={t} className="relative grid grid-cols-[2.5rem_1fr] gap-x-6 pb-10 last:pb-0 md:block md:pb-0">
          <span
            className="hs-num relative z-10 grid h-10 w-10 place-items-center rounded-full border border-ink/40 font-[family-name:var(--font-brule)] text-[0.95rem] font-semibold"
            style={{ background: "var(--paper)" }}
          >
            <span className="sr-only">Step </span>
            {i + 1}
          </span>
          <div className="pt-1.5 md:mt-5 md:pt-0">
            <p className="calm-h3">{t}</p>
            <p className="calm-body mt-2 max-w-xs text-ink/80 md:max-w-none">{b}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

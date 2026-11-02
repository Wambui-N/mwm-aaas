"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Annotate } from "@/components/site/draw/Annotate";
import { TypedMono } from "@/components/homepage/TypedMono";
import { MONO } from "@/lib/site/labels";
import { cases } from "@/lib/homepage/copy";
import { Underlined } from "@/components/site/Underlined";
import { SectionLabel } from "@/components/site/SectionLabel";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Two hairline case-study cards. On each, the result is the largest thing. The one orange circle in
 * the section is on the 50 -> 500 result, which also has a bar chart drawn to scale (50 : 500 = 1 : 10).
 */
export function Cases() {
  const root = useRef<HTMLElement>(null);
  const [before, after] = cases.heading[0].split("before and after");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".case-card", { y: 24, opacity: 0, duration: 0.7, ease: "power2.out", stagger: 0.12, scrollTrigger: { trigger: ".case-grid", start: "top 80%" } });
      gsap.from(".chart-bar", { scaleY: 0, transformOrigin: "bottom", duration: 1, ease: "power2.out", stagger: 0.2, scrollTrigger: { trigger: ".chart", start: "top 85%", once: true } });

      root.current?.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const from = Number(el.dataset.from);
        const to = Number(el.dataset.to);
        const state = { n: from };
        gsap.to(state, {
          n: to,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => void (el.textContent = String(Math.round(state.n))),
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-4 py-[4.5rem] md:px-8 md:py-[6.75rem]">
      <div className="mx-auto max-w-[81.25rem]">
        <SectionLabel>{cases.label}</SectionLabel>

        {/* one orange marker underline, under "before and after" only */}
        <h2 className="sk-h2">
          {before}
          <Underlined seed={17}>before and after</Underlined>
          {after}
          <br />
          {cases.heading[1]}
        </h2>
        <p className="calm-body mt-6 max-w-xl">{cases.intro}</p>

        <div className="case-grid mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
          {cases.items.map((c, i) => (
            <Link key={c.client} href={c.href} className="case-card calm-card group flex flex-col p-6 md:p-7">
              <p className="gl-mono text-ink/60">{pad(i + 1)}</p>
              <h3 className="calm-h3 mt-3 underline-offset-4 group-hover:underline group-focus-visible:underline">{c.title}</h3>
              <p className="calm-body mt-3">{c.body}</p>

              {/* the result: the largest element on the card */}
              <div className="mt-6 border-t border-ink/25 pt-5">
                <p className="gl-mono text-ink/60">{MONO.caseResult}</p>
                <p className="mt-7 font-[family-name:var(--font-brule)] text-[clamp(2.25rem,4vw,3.25rem)] font-semibold leading-none tracking-tight">
                  {c.count ? (
                    <Annotate type="circle" strokeWidth={3} padding={[8, 18, 8, 18]} iterations={1}>
                      {c.count.from} -&gt; {c.count.toPrefix}
                      <span data-count data-from={c.count.from} data-to={c.count.to}>
                        {c.count.to}
                      </span>
                    </Annotate>
                  ) : (
                    c.result
                  )}
                </p>
                {c.count && <p className="gl-mono mt-7 text-ink/60">{c.count.unit}</p>}
              </div>

              {/* bar chart drawn to scale: bar heights are exactly from : to */}
              {c.count && (
                <div className="chart mt-5" aria-hidden>
                  <div className="flex h-24 items-end gap-6 border-b border-ink/40">
                    <div className="chart-bar w-10 bg-ink/25" style={{ height: `${(c.count.from / c.count.to) * 100}%` }} />
                    <div className="chart-bar w-10 bg-ink" style={{ height: "100%" }} />
                  </div>
                  <div className="gl-mono mt-2 flex gap-6 text-ink/60">
                    <span className="w-10">{c.count.from}</span>
                    <span className="w-10 whitespace-nowrap">
                      {c.count.toPrefix}
                      {c.count.to}
                    </span>
                  </div>
                </div>
              )}

              <dl className="mt-6 border-t border-ink/25">
                {(
                  [
                    [MONO.caseClient, c.client],
                    [MONO.caseStack, c.stack],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[5rem_1fr] gap-x-4 border-b border-ink/25 py-2.5">
                    <dt className="gl-mono pt-0.5 text-ink/60">{k}</dt>
                    <dd>
                      <TypedMono>{v}</TypedMono>
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 font-bold underline-offset-4 group-hover:underline group-focus-visible:underline">{cases.cta} -&gt;</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

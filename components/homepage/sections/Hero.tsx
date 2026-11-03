"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Magnet from "@/components/homepage/reactbits/Magnet";
import { DrawIn } from "@/components/site/draw/DrawIn";
import { useLenis, useReady } from "@/components/site/providers/SmoothScrollProvider";
import { SketchButton } from "@/components/site/SketchButton";
import { ScrawlStrike } from "@/components/site/ScrawlStrike";
import { AUDIT_HREF, hero, pain } from "@/lib/homepage/copy";

gsap.registerPlugin(useGSAP, SplitText);

/** Renders `text` with the exact `bold` phrases in <b>, as on the live site. Wording is untouched. */
function BoldPhrases({ text, bold }: { text: string; bold: readonly string[] }) {
  const nodes: React.ReactNode[] = [];
  let rest = text;
  let key = 0;
  while (rest.length) {
    const hits = bold.map((b) => ({ b, i: rest.indexOf(b) })).filter((x) => x.i >= 0);
    if (!hits.length) {
      nodes.push(rest);
      break;
    }
    const first = hits.sort((a, b) => a.i - b.i)[0];
    if (first.i > 0) nodes.push(rest.slice(0, first.i));
    nodes.push(<b key={key++}>{first.b}</b>);
    rest = rest.slice(first.i + first.b.length);
  }
  return <>{nodes}</>;
}

/**
 * One message (the headline) and one action (the Audit button). Everything else is quiet. The single
 * orange mark is the scrawl through "manually". Motion: headline reveals, the scrawl draws, then the
 * paragraph and button fade up. Reduced motion: everything is visible at once.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const ready = useReady();
  const lenis = useLenis();
  const [before, after] = hero.lines[1].split("manually");

  useGSAP(
    () => {
      if (!ready) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".hero-label", { opacity: 0, duration: 0.5, ease: "power1.out" });
      SplitText.create(".hero-title", {
        type: "lines",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, { y: 20, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.1 });
        },
      });
      gsap.from(".hero-after", { y: 12, opacity: 0, duration: 0.35, ease: "power2.out", delay: 1.35 });
    },
    { scope: root, dependencies: [ready] },
  );

  const goToPain = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(pain.id);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -80 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={root} className="flex min-h-[88svh] flex-col justify-center px-4 pb-[4.5rem] pt-[7.5rem] md:px-8">
      <div className="mx-auto w-full max-w-[81.25rem]">
        <p className="hero-label gl-mono text-ink/60">{hero.label}</p>

        <h1 className="sk-display hero-title mt-6 max-w-[22ch]">
          {hero.lines[0]}
          <br />
          {before}
          <span className="relative inline-block">
            manually
            <DrawIn
              as="span"
              on="ready"
              delay={0.7}
              duration={0.28}
              stagger={0.18}
              className="pointer-events-none absolute -inset-x-[0.06em] top-[0.3em] block h-[0.5em]"
            >
              <ScrawlStrike seed={5} />
            </DrawIn>
          </span>
          {after}
        </h1>

        <p className="hero-after mt-8 max-w-[52ch] text-[1.3125rem] leading-relaxed text-ink/80">
          <BoldPhrases text={hero.body} bold={hero.bodyBold} />
        </p>

        <div className="hero-after mt-8 flex flex-wrap items-center gap-x-10 gap-y-5">
          <Magnet padding={50} magnetStrength={4}>
            <SketchButton href={AUDIT_HREF} variant="marker" seed={6} className="text-lg">
              {hero.cta} -&gt;
            </SketchButton>
          </Magnet>
          <a href={`#${pain.id}`} onClick={goToPain} className="font-bold underline-offset-4 hover:underline focus-visible:underline">
            {hero.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SketchButton } from "@/components/homepage/SketchButton";
import { DrawIn } from "@/components/homepage/draw/DrawIn";
import { ScrawlUnderline } from "@/components/homepage/ScrawlStrike";
import { AUDIT_HREF, founder } from "@/lib/homepage/copy";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Founder() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".founder-photo", { y: 24, opacity: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: ".founder-photo", start: "top 82%" } });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="px-4 py-[4.5rem] md:px-8 md:py-[6.75rem]">
      <div className="mx-auto grid max-w-[81.25rem] gap-10 md:grid-cols-12 md:gap-x-6">
        {/* a plain photo with a mono caption: no frame, no tape, no tilt, no note */}
        <figure className="founder-photo md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden" style={{ background: "var(--paper-2)" }}>
            <Image src="/founder.jpg" alt={`${founder.name}, ${founder.title}`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
          <figcaption className="gl-mono mt-3 text-ink/60">{founder.caption}</figcaption>
        </figure>

        <div className="md:col-span-6 md:col-start-7 md:self-center">
          <p className="gl-mono mb-5 text-ink/60">{founder.label}</p>

          {/* one orange marker underline, under the name */}
          <h2 className="sk-h2">
            <span className="relative inline-block">
              {founder.name}
              <DrawIn as="span" on="scroll" duration={0.5} stagger={0.2} className="pointer-events-none absolute -inset-x-[0.05em] -bottom-[0.14em] block h-[0.3em]">
                <ScrawlUnderline seed={27} />
              </DrawIn>
            </span>
          </h2>
          <p className="mt-5 text-lg font-bold">{founder.title}</p>
          <div className="calm-body mt-6 max-w-xl space-y-4">
            {founder.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <SketchButton href={AUDIT_HREF} variant="marker" seed={6} className="text-lg">
              {founder.cta} -&gt;
            </SketchButton>
            <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="font-bold underline-offset-4 hover:underline focus-visible:underline">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

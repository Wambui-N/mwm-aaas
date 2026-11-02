"use client";

import Magnet from "@/components/homepage/reactbits/Magnet";
import { DrawIn } from "@/components/homepage/draw/DrawIn";
import { SketchButton } from "@/components/homepage/SketchButton";
import { ScrawlUnderline } from "@/components/homepage/ScrawlStrike";
import { AUDIT_HREF, finalCta } from "@/lib/homepage/copy";

export function FinalCta() {
  const [before, after] = finalCta.heading.split("leaking time.");

  return (
    <section className="px-4 py-[4.5rem] md:px-8 md:py-[6.75rem]">
      <div className="mx-auto w-full max-w-[81.25rem]">
        <p className="gl-mono mb-5 text-ink/60">{finalCta.label}</p>

        {/* one orange marker underline, under "leaking time." only */}
        <h2 className="sk-h2 max-w-[20ch]">
          {before}
          <span className="relative inline-block">
            leaking time.
            <DrawIn as="span" on="scroll" duration={0.5} stagger={0.2} className="pointer-events-none absolute -inset-x-[0.04em] -bottom-[0.1em] block h-[0.24em]">
              <ScrawlUnderline seed={33} />
            </DrawIn>
          </span>
          {after}
        </h2>
        <p className="calm-body mt-6 max-w-md">{finalCta.body}</p>

        <div className="mt-8">
          <Magnet padding={50} magnetStrength={4}>
            <SketchButton href={AUDIT_HREF} variant="marker" seed={6} className="text-lg">
              {finalCta.cta} -&gt;
            </SketchButton>
          </Magnet>
        </div>
      </div>
    </section>
  );
}

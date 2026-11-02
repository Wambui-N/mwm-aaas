"use client";

import Magnet from "@/components/homepage/reactbits/Magnet";
import { SketchButton } from "@/components/site/SketchButton";
import { AUDIT_HREF, finalCta } from "@/lib/homepage/copy";
import { Underlined } from "@/components/site/Underlined";
import { SectionLabel } from "@/components/site/SectionLabel";

export function FinalCta() {
  const [before, after] = finalCta.heading.split("leaking time.");

  return (
    <section className="px-4 py-[4.5rem] md:px-8 md:py-[6.75rem]">
      <div className="mx-auto w-full max-w-[81.25rem]">
        <SectionLabel>{finalCta.label}</SectionLabel>

        {/* one orange marker underline, under "leaking time." only */}
        <h2 className="sk-h2 max-w-[20ch]">
          {before}
          <Underlined seed={33} size="compact">leaking time.</Underlined>
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

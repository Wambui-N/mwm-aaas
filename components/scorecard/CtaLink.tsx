"use client";

import { SketchButton } from "@/components/site/SketchButton";
import { track } from "@/lib/scorecard/track";

/** A results-page call to action that records which one was clicked. */
export function CtaLink({ href, cta, segment, primary, seed = 6, children }: { href: string; cta: string; segment?: string; primary?: boolean; seed?: number; children: React.ReactNode }) {
  const external = /^https?:\/\//.test(href);
  return (
    <SketchButton
      href={href}
      variant={primary ? "marker" : "paper"}
      seed={seed}
      className="text-lg"
      onClick={() => track("results_cta_clicked", segment ? { cta, segment } : { cta })}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </SketchButton>
  );
}

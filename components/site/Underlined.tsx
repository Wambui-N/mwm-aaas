import type { ReactNode } from "react";
import { DrawIn } from "@/components/site/draw/DrawIn";
import { ScrawlUnderline } from "@/components/site/ScrawlStrike";

const BOX = {
  default: "pointer-events-none absolute -inset-x-[0.05em] -bottom-[0.14em] block h-[0.3em]",
  compact: "pointer-events-none absolute -inset-x-[0.04em] -bottom-[0.1em] block h-[0.24em]",
} as const;

/**
 * The one orange marker underline under a key word of a heading (three loose strokes, drawn once on
 * scroll). Use it once per page title or section heading. `seed` makes the hand-drawn shape stable
 * between server and client; give each heading its own.
 */
export function Underlined({
  children,
  seed,
  start,
  size = "default",
}: {
  children: ReactNode;
  seed: number;
  /** ScrollTrigger start, when the default ("top 82%") is wrong for the section. */
  start?: string;
  size?: keyof typeof BOX;
}) {
  return (
    <span className="relative inline-block">
      {children}
      <DrawIn as="span" on="scroll" start={start} duration={0.5} stagger={0.2} className={BOX[size]}>
        <ScrawlUnderline seed={seed} />
      </DrawIn>
    </span>
  );
}

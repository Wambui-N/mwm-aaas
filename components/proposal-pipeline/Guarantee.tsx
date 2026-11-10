"use client";

import { Annotate } from "@/components/site/draw/Annotate";

/**
 * The guarantee: a paper panel with a hairline border (no fill, not dark). Its name is ringed by a hand-drawn
 * ink circle (rough-notation, drawn on scroll, already drawn with reduced motion), like a stamp.
 */
export function Guarantee({ name, items }: { name: string; items: readonly string[] }) {
  return (
    <aside className="border border-ink/40 p-6 md:p-8">
      <h3 className="calm-h3 px-4 py-3">
        <Annotate type="circle" color="#141010" strokeWidth={2} iterations={1} padding={[10, 26, 10, 26]} duration={900}>
          {name}
        </Annotate>
      </h3>
      <ul className="calm-body mt-5 list-disc space-y-2 pl-5">
        {items.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </aside>
  );
}

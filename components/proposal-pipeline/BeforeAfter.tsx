"use client";

import { Annotate } from "@/components/site/draw/Annotate";

type Row = { before: [string, string]; after: [string, string] };

/**
 * A ruled two-column table, BEFORE | AFTER, one hairline between rows. When a row scrolls into view an ink
 * strike-through draws across the BEFORE line and a sage highlight draws behind the AFTER line (rough-notation,
 * via Annotate: already drawn with prefers-reduced-motion). Below 768px each row stacks, BEFORE above AFTER.
 */
export function BeforeAfter({ rows }: { rows: Row[] }) {
  return (
    <div className="mt-10">
      <div className="hidden border-b border-ink/30 pb-3 md:grid md:grid-cols-12 md:gap-x-6" aria-hidden>
        <p className="gl-mono col-span-6 text-ink/60">Before</p>
        <p className="gl-mono col-span-6 text-ink/60">After</p>
      </div>
      <ul className="border-t border-ink/30 md:border-t-0">
        {rows.map((r) => (
          <li key={r.before[0]} className="grid gap-y-6 border-b border-ink/20 py-7 last:border-b-0 md:grid-cols-12 md:gap-x-6 md:py-8">
            <div className="md:col-span-6">
              <p className="gl-mono text-ink/60 md:hidden">Before</p>
              <p className="calm-h3 mt-2 text-ink/60 md:mt-0">
                <Annotate type="strike-through" color="#141010" strokeWidth={1} iterations={1} padding={2} multiline>
                  {r.before[0]}
                </Annotate>
              </p>
              <p className="calm-body mt-2 text-ink/70">{r.before[1]}</p>
            </div>
            <div className="md:col-span-6">
              <p className="gl-mono text-ink/60 md:hidden">After</p>
              <p className="calm-h3 mt-2 md:mt-0">
                <Annotate type="highlight" color="rgba(197, 214, 208, 0.95)" iterations={1} padding={[2, 6, 2, 6]} multiline>
                  {r.after[0]}
                </Annotate>
              </p>
              <p className="calm-body mt-2 text-ink/85">{r.after[1]}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

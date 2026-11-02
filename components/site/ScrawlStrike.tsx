import { scrawlPaths, scrawlUnderlinePaths } from "@/lib/site/scrawl";

/**
 * Orange marker scrawl to cancel a word: two thin, messy strokes. Place it inside a
 * `relative inline-block` word wrapper; wrap in <DrawIn> to draw it. Decorative: aria-hidden.
 */
export function ScrawlStrike({ seed = 3 }: { seed?: number }) {
  return (
    <svg aria-hidden focusable="false" className="sk-draw" viewBox="0 0 1000 120" preserveAspectRatio="none">
      {scrawlPaths(seed).map((d, i) => (
        <path key={i} d={d} className="sk-stroke" fill="none" stroke="var(--signal)" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

/** Messy orange marker underline (three loose passes) for a single word. Same placement rules as ScrawlStrike. */
export function ScrawlUnderline({ seed = 3 }: { seed?: number }) {
  return (
    <svg aria-hidden focusable="false" className="sk-draw" viewBox="0 0 1000 60" preserveAspectRatio="none">
      {scrawlUnderlinePaths(seed).map((d, i) => (
        <path key={i} d={d} className="sk-stroke" fill="none" stroke="var(--signal)" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

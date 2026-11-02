import rough from "roughjs/bin/rough";

/**
 * A messy hand-scribbled cancel mark: several rough, overlapping strokes of different slope and
 * length. Seeded, and rounded to 2 decimals (fixedDecimalPlaceDigits) so the server and the browser
 * produce identical path strings.
 */
const gen = rough.generator();
const cache = new Map<number, string[]>();

/** viewBox is 1000 x 120; the two strokes centre on y = 60. disableMultiStroke keeps it to exactly two lines. */
export function scrawlPaths(seed: number): string[] {
  let v = cache.get(seed);
  if (!v) {
    const o = { roughness: 2.6, bowing: 3, strokeWidth: 1, fixedDecimalPlaceDigits: 2, disableMultiStroke: true };
    const strokes: [number, number][][] = [
      [[-10, 70], [250, 50], [520, 66], [790, 48], [1010, 58]],
      [[10, 48], [300, 68], [560, 52], [820, 72], [990, 62]],
    ];
    v = strokes.flatMap((pts, i) => gen.toPaths(gen.curve(pts, { ...o, seed: seed + i * 7 })).map((p) => p.d));
    cache.set(seed, v);
  }
  return v;
}

const underCache = new Map<number, string[]>();

/** A messy marker underline: a long wobbly stroke, then a shorter, slightly crossing second pass. viewBox 1000 x 60. */
export function scrawlUnderlinePaths(seed: number): string[] {
  let v = underCache.get(seed);
  if (!v) {
    const o = { roughness: 3, bowing: 3.5, strokeWidth: 1, fixedDecimalPlaceDigits: 2, disableMultiStroke: true };
    const strokes: [number, number][][] = [
      [[-8, 20], [180, 30], [420, 16], [660, 34], [860, 22], [1008, 30]],
      [[60, 38], [300, 26], [540, 42], [790, 30], [940, 40]],
      [[240, 14], [520, 28], [780, 18]],
    ];
    v = strokes.flatMap((pts, i) => gen.toPaths(gen.curve(pts, { ...o, seed: seed + i * 5 })).map((p) => p.d));
    underCache.set(seed, v);
  }
  return v;
}

const markerCache = new Map<number, string[]>();

/** One rough marker stroke for an underline (viewBox 400 x 20). Seeded and rounded, so server and browser agree. */
export function markerUnderlinePaths(seed: number): string[] {
  let v = markerCache.get(seed);
  if (!v) {
    const o = { roughness: 2.2, bowing: 2.6, strokeWidth: 1, fixedDecimalPlaceDigits: 2, disableMultiStroke: true, seed };
    v = gen.toPaths(gen.curve([[2, 12], [110, 7], [230, 14], [330, 8], [398, 12]], o)).map((p) => p.d);
    markerCache.set(seed, v);
  }
  return v;
}

import rough from "roughjs/bin/rough";
import type { Options } from "roughjs/bin/core";

/**
 * Deterministic hand-drawn geometry. rough.generator() needs no DOM and every shape takes an
 * explicit seed, so the server and the client produce identical path strings (no hydration
 * mismatch). Results are memoised by key; nothing is recomputed on scroll.
 */
const gen = rough.generator();
const cache = new Map<string, string[]>();

const base = (seed: number, o: Options = {}): Options => ({
  seed,
  roughness: 1.4,
  bowing: 1.6,
  strokeWidth: 2,
  ...o,
});

const toD = (drawable: ReturnType<typeof gen.line>) => gen.toPaths(drawable).map((p) => p.d);

function memo(key: string, make: () => string[]) {
  let v = cache.get(key);
  if (!v) {
    v = make();
    cache.set(key, v);
  }
  return v;
}

export function boxPaths(w: number, h: number, seed: number, rough_ = 1.4): string[] {
  return memo(`box:${w}:${h}:${seed}:${rough_}`, () => {
    // four slightly overshooting lines read as a hand-drawn box that is never perfectly closed
    const j = (n: number) => ((seed * 9301 + n * 49297) % 233280) / 233280; // 0..1, deterministic
    const o = base(seed, { roughness: rough_ });
    const x0 = 3, y0 = 3, x1 = w - 3, y1 = h - 3;
    const over = 7;
    return [
      ...toD(gen.line(x0 - over * j(1), y0 + 2, x1 + over * j(2), y0 - 1, o)),
      ...toD(gen.line(x1 + 1, y0 - over * j(3), x1 - 2, y1 + over * j(4), { ...o, seed: seed + 1 })),
      ...toD(gen.line(x1 + over * j(5), y1 - 1, x0 - over * j(6), y1 + 2, { ...o, seed: seed + 2 })),
      ...toD(gen.line(x0 + 1, y1 + over * j(7), x0 - 2, y0 - over * j(8), { ...o, seed: seed + 3 })),
    ];
  });
}

export function underlinePaths(w: number, h: number, seed: number, double = false): string[] {
  return memo(`under:${w}:${h}:${seed}:${double}`, () => {
    const o = base(seed, { roughness: 1.8, bowing: 3 });
    const y = h / 2;
    const out = toD(gen.line(4, y + 1, w - 4, y - 1, o));
    if (double) out.push(...toD(gen.line(10, y + 8, w - 14, y + 6, { ...o, seed: seed + 5 })));
    return out;
  });
}

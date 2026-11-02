import type { CSSProperties } from "react";
import { boxPaths, underlinePaths } from "@/lib/homepage/rough";

/**
 * Hand-drawn primitives. Server-safe: geometry comes from seeded rough.js generators, so server
 * and client render the same path strings. Everything is aria-hidden and pointer-events none.
 * Strokes carry `.sk-stroke` so <DrawIn> can animate them with DrawSVG.
 */
type Common = {
  seed?: number;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
};

export function Draw({
  paths,
  w,
  h,
  stroke = "var(--ink)",
  strokeWidth = 2,
  className = "",
  style,
}: Common & { paths: string[]; w: number; h: number }) {
  return (
    <svg aria-hidden focusable="false" className={`sk-draw ${className}`} style={style} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          className="sk-stroke"
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export function SketchBox({ seed = 1, w = 400, h = 260, rough = 1.4, ...c }: Common & { w?: number; h?: number; rough?: number }) {
  return <Draw paths={boxPaths(w, h, seed, rough)} w={w} h={h} {...c} />;
}

export function SketchUnderline({ seed = 1, w = 300, h = 24, double = false, ...c }: Common & { w?: number; h?: number; double?: boolean }) {
  return <Draw paths={underlinePaths(w, h, seed, double)} w={w} h={h} {...c} />;
}

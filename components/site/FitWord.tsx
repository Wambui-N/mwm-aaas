"use client";

import { useEffect, useRef, useState } from "react";

const SIZE = 100; // font-size in SVG units; the viewBox width is the measured text length

/**
 * Text that fills the width of its container exactly, with no glyph distortion: after the web font
 * loads it measures the text's natural length and sets the SVG viewBox to it, so the SVG scales to the
 * container. Solid fill, uppercase, Brule 800. The server renders with a close estimate.
 */
export function FitWord({ text, className = "", label }: { text: string; className?: string; label?: string }) {
  const word = text.toUpperCase();
  const el = useRef<SVGTextElement>(null);
  const [len, setLen] = useState(word.length * 66);

  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled || !el.current) return;
      const n = el.current.getComputedTextLength();
      if (n > 0) setLen(Math.ceil(n));
    });
    return () => {
      cancelled = true;
    };
  }, [word]);

  return (
    <svg viewBox={`0 0 ${len} ${SIZE * 1.1}`} className={`w-full overflow-visible ${className}`} role="img" aria-label={label ?? text} preserveAspectRatio="xMinYMid meet">
      <text
        ref={el}
        x="0"
        y={SIZE * 0.88}
        style={{ fill: "var(--signal)", fontFamily: "var(--font-brule), system-ui, sans-serif", fontWeight: 800, fontSize: SIZE }}
      >
        {word}
      </text>
    </svg>
  );
}

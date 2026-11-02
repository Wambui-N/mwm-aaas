"use client";

import { useRef, type ComponentProps, type ReactNode } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { markerUnderlinePaths } from "@/lib/site/scrawl";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

type Props = {
  href: string;
  children: ReactNode;
  /** internal route: uses Link; otherwise a plain anchor (mailto, external) */
  internal?: boolean;
  seed?: number;
  /** classes for the text, e.g. its size */
  textClass?: string;
} & Omit<ComponentProps<"a">, "href" | "children">;

/**
 * A footer link with no permanent underline. On hover and keyboard focus one rough orange marker
 * underline draws in (DrawSVG, fixed seed) and a real arrow slides in beside the text; on leave it
 * undraws. With reduced motion both appear instantly.
 */
export function FooterLink({ href, children, internal = false, seed = 1, textClass = "", className = "", ...rest }: Props) {
  const root = useRef<HTMLSpanElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const strokes = gsap.utils.toArray<SVGGeometryElement>(".fl-stroke", root.current);
      gsap.set(".fl-underline", { opacity: 1 }); // hidden in the server HTML so there is never a resting underline
      gsap.set(strokes, { drawSVG: "0%" });
      gsap.set(".fl-arrow", { opacity: 0, x: -6 });
      const t = gsap.timeline({ paused: true });
      t.to(strokes, { drawSVG: "100%", duration: reduced ? 0 : 0.35, ease: "power1.inOut" }, 0).to(
        ".fl-arrow",
        { opacity: 1, x: 0, duration: reduced ? 0 : 0.3, ease: "power2.out" },
        reduced ? 0 : 0.1,
      );
      tl.current = t;
    },
    { scope: root },
  );

  const on = () => tl.current?.play();
  const off = () => tl.current?.reverse();
  const handlers = { onMouseEnter: on, onFocus: on, onMouseLeave: off, onBlur: off };

  const inner = (
    <span ref={root} className="relative inline-flex items-center gap-3 pb-2">
      <span className={textClass}>{children}</span>
      <svg aria-hidden focusable="false" viewBox="0 0 24 24" className="fl-arrow h-[0.75em] w-[0.75em] shrink-0 opacity-0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h16M13 5l7 7-7 7" />
      </svg>
      <span aria-hidden className="fl-underline pointer-events-none absolute inset-x-0 bottom-0 block h-3 opacity-0">
        <svg focusable="false" viewBox="0 0 400 20" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          {markerUnderlinePaths(seed).map((d, i) => (
            <path key={i} d={d} className="fl-stroke" fill="none" stroke="var(--signal)" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          ))}
        </svg>
      </span>
    </span>
  );

  return internal ? (
    <Link href={href} className={className} {...handlers}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={className} {...handlers} {...rest}>
      {inner}
    </a>
  );
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { tornBottom } from "@/lib/homepage/torn";
import { ARIA, MONO } from "@/lib/homepage/labels";
import { footer } from "@/lib/homepage/copy";
import { FitWord } from "./FitWord";
import { FooterLink } from "./FooterLink";
import { HomeGridBackground } from "./HomeGridBackground";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LEGAL = new Set(["/terms", "/privacy"]);
const BIG_LINK = "font-[family-name:var(--font-brule)] text-[clamp(1.6rem,3.2vw,2.6rem)] font-bold leading-none";

/** One cell of the title block: a sage hairline box with a mono label (13px, comfortably legible on ink). */
function Cell({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col border border-sage/40 p-4 md:p-5 ${className}`}>
      <p className="gl-mono mb-3 !text-[13px] text-sage/70">{label}</p>
      {children}
    </div>
  );
}

/**
 * The main content is an opaque paper sheet with a torn bottom edge that lifts off a fixed ink
 * "desk" footer, laid out as an engineering title block: cells with sage
 * hairlines holding the wordmark and tagline, the links, the email and the year (with the legal links).
 * The footer is at least 80svh tall (never more than the viewport). The company name is the only orange
 * element at rest: MADE WITH MAKE in solid orange, fitted to its cell, wiping in as the footer is revealed.
 */
export function HomeFooter({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const footerEl = useRef<HTMLElement>(null);
  const [height, setHeight] = useState(0);
  // Computed during render so the server HTML already contains the year; the effect corrects a stale build year.
  const [year, setYear] = useState(() => String(new Date().getFullYear()));

  const [wordA, wordB, wordC] = footer.brand.split(" "); // "Made" "with" "Make"
  const mainLinks = footer.links.filter((l) => !LEGAL.has(l.href));
  const legalLinks = footer.links.filter((l) => LEGAL.has(l.href));

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  useEffect(() => {
    const el = footerEl.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    setHeight(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !height) return;
      // the company name is wiped in left to right as the footer is revealed (clip-path only)
      gsap.set(".gl-wordmark", { clipPath: "inset(0 100% 0 0)" });
      ScrollTrigger.create({
        trigger: ".gl-sheet",
        start: "bottom bottom",
        end: `bottom bottom-=${height}`,
        scrub: true,
        onUpdate: (self) => void gsap.set(".gl-wordmark", { clipPath: `inset(0 ${(1 - self.progress) * 100}% 0 0)` }),
      });
    },
    { scope: root, dependencies: [height] },
  );

  return (
    <div ref={root} className="flow-root">
      {/* the sheet carries its own column grid; margin-bottom reveals the fixed footer below */}
      <div className="gl-sheet relative z-10 pb-10" style={{ marginBottom: height, clipPath: tornBottom(5) }}>
        <HomeGridBackground />
        <div className="relative z-10">{children}</div>
      </div>

      <footer
        ref={footerEl}
        className="gl-footer fixed inset-x-0 bottom-0 z-0 flex min-h-[80svh] max-h-[100svh] flex-col overflow-hidden bg-ink px-4 pb-6 pt-14 text-sage md:px-8 md:pt-20"
      >
        <div className="mx-auto flex w-full max-w-[81.25rem] flex-1 flex-col">
          <div className="grid flex-1 gap-px md:grid-cols-12 md:grid-rows-[1fr_auto]">
            {/* NAME: MADE WITH MAKE in solid orange, fitted to the cell (two lines on mobile), with the tagline */}
            <Cell label={MONO.titleBlock.name} className="justify-between md:col-span-8">
              <div className="flex flex-1 items-center py-6">
                <FitWord text={footer.brand} label={footer.brand} className="gl-wordmark hidden md:block" />
                <div className="gl-wordmark w-full space-y-1 md:hidden">
                  <FitWord text={`${wordA} ${wordB}`} label={footer.brand} />
                  <FitWord text={wordC} label={footer.brand} />
                </div>
              </div>
              <p className="mt-4 font-[family-name:var(--font-brule)] text-xl font-bold md:text-2xl">{footer.tagline}</p>
            </Cell>

            {/* LINKS: the large display links, evenly spaced; no underline until hover or focus */}
            <Cell label={MONO.titleBlock.links} className="md:col-span-4 md:row-span-2">
              <nav aria-label={ARIA.footerNav} className="flex flex-1 flex-col justify-evenly gap-6">
                {mainLinks.map((l, i) => (
                  <FooterLink key={l.href} href={l.href} internal seed={400 + i} textClass={BIG_LINK} className="self-start">
                    {l.label}
                  </FooterLink>
                ))}
                <FooterLink href={footer.linkedin} target="_blank" rel="noopener noreferrer" seed={410} textClass={BIG_LINK} className="self-start">
                  LinkedIn
                </FooterLink>
              </nav>
            </Cell>

            {/* CONTACT and YEAR */}
            <div className="grid gap-px md:col-span-8 md:grid-cols-2">
              <Cell label={MONO.titleBlock.contact}>
                <FooterLink href={`mailto:${footer.email}`} seed={420} textClass="break-all text-[1.3125rem] font-bold leading-tight text-sage" className="self-start">
                  {footer.email}
                </FooterLink>
              </Cell>
              <Cell label={MONO.titleBlock.year}>
                <p className="text-sm" suppressHydrationWarning>
                  &copy; {year} {footer.brand}. All rights reserved.
                </p>
                {/* legal links: small mono, plain underline on hover and keyboard focus only */}
                <div className="mt-3 flex gap-5">
                  {legalLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="gl-mono underline-offset-4 hover:underline focus-visible:underline">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </Cell>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

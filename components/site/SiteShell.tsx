import "@/components/site/site.css";
import type { ReactNode } from "react";
import { brule, geistMono, satoshi } from "@/lib/site/fonts";
import { SmoothScrollProvider } from "@/components/site/providers/SmoothScrollProvider";
import { ReadyOnMount } from "@/components/site/providers/ReadyOnMount";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { GridBackground } from "@/components/site/GridBackground";

/**
 * The one shell for every page on the redesigned site: the scoped wrapper (design tokens, the three
 * font variables, the 75% root size via `html:has([data-calm])`), the scroll provider, the nav and the footer.
 *
 * - `footer="curtain"` (homepage): the page is a paper sheet that lifts off a fixed footer.
 * - `footer="static"` (inner pages, default): paper sheet, then the same footer in normal flow.
 *
 * Pages pass their own <main>. All CSS is scoped to [data-sketch][data-calm].
 */
export function SiteShell({
  children,
  footer = "static",
  grid = true,
}: {
  children: ReactNode;
  footer?: "curtain" | "static";
  /** The 12-column hairline grid behind the content (static variant only; the curtain sheet always has it). */
  grid?: boolean;
}) {
  return (
    <div data-sketch data-calm className={`${brule.variable} ${satoshi.variable} ${geistMono.variable}`}>
      <SmoothScrollProvider>
        <ReadyOnMount />
        <SiteNav />
        {footer === "curtain" ? (
          <div className="relative z-10">
            <SiteFooter variant="curtain">{children}</SiteFooter>
          </div>
        ) : (
          <div className="relative z-10 flex min-h-[100svh] flex-col">
            <div className="gl-sheet relative flex-1 pt-[5rem]">
              {grid && <GridBackground />}
              <div className="relative z-10">{children}</div>
            </div>
            <SiteFooter variant="static" />
          </div>
        )}
      </SmoothScrollProvider>
    </div>
  );
}

import "@/components/site/site.css";
import type { ReactNode } from "react";
import { brule, geistMono, satoshi } from "@/lib/site/fonts";

/**
 * The scoped site wrapper (design tokens, fonts, 75% root size) without the nav, footer or grid, for the
 * full-screen scorecard flow. SiteShell is the same wrapper plus the site chrome.
 */
export function FlowShell({ children }: { children: ReactNode }) {
  return (
    <div data-sketch data-calm className={`${brule.variable} ${satoshi.variable} ${geistMono.variable}`}>
      {children}
    </div>
  );
}

import type { Metadata } from "next";
import { SiteShell } from "@/components/site/SiteShell";
import { ScorecardFlow } from "@/components/scorecard/ScorecardFlow";
import { SCORECARD_LIVE } from "@/lib/scorecard/config";
import { landing } from "@/lib/scorecard/copy";
import { siteConfig } from "@/lib/seo";
import { Landing } from "./Landing";

export const metadata: Metadata = {
  title: "The Proposal Pipeline Scorecard | Made with Make",
  description: landing.sub,
  alternates: { canonical: `${siteConfig.url}/scorecard` },
  // stays out of search until the launch flag is on
  robots: SCORECARD_LIVE ? { index: true, follow: true } : { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function ScorecardPage() {
  const demoUrl = process.env.DEMO_VIDEO_URL?.trim() || "";
  return (
    // Native scrolling here: eased scroll physics makes form inputs feel laggy.
    <SiteShell smoothScroll={false}>
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
          <ScorecardFlow landing={<Landing demoUrl={demoUrl} />} />
        </div>
      </main>
    </SiteShell>
  );
}

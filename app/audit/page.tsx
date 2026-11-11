import type { Metadata } from "next";
import { FlowShell } from "@/components/scorecard/FlowShell";
import { ScorecardFlow } from "@/components/scorecard/ScorecardFlow";
import { SCORECARD_LIVE } from "@/lib/scorecard/config";
import { landing } from "@/lib/scorecard/copy";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "The Proposal Audit",
  description: landing.sub,
  alternates: { canonical: `${siteConfig.url}/audit` },
  // stays out of search until the launch flag is on
  robots: SCORECARD_LIVE ? { index: true, follow: true } : { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/** Full-screen flow: no site header or footer. The flow draws its own logo and close button. */
export default function ScorecardPage() {
  return (
    <FlowShell>
      <ScorecardFlow />
    </FlowShell>
  );
}

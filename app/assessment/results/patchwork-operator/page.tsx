import type { Metadata } from "next";
import { AssessmentResult } from "@/components/assessment/AssessmentResult";
import { SiteShell } from "@/components/site/SiteShell";

export const metadata: Metadata = {
  title: "Your Result: The Patchwork Operator | The Automation Gap Audit",
  description:
    "You scored in the Patchwork Operator band. You have pieces in place, but they don't fully connect — here's how to close the gaps.",
  robots: { index: false },
};

export default function PatchworkOperatorPage() {
  return (
    <SiteShell smoothScroll={false}>
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
        <AssessmentResult
          config={{
            profileKey: "patchwork",
            label: "The Patchwork Operator",
            tagline: "the pieces are there, but the gaps are costing you.",
            description:
              "You have some processes and automations in place, but there are still points where work falls through the cracks, data gets duplicated, or things depend on the right person remembering what to do. These hidden gaps compound as the business grows.",
            accentColor: "bg-ink text-sage",
          }}
        />
        </div>
      </main>
    </SiteShell>
  );
}

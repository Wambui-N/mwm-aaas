import type { Metadata } from "next";
import { AssessmentResult } from "@/components/assessment/AssessmentResult";
import { SiteShell } from "@/components/site/SiteShell";

export const metadata: Metadata = {
  title: "Your Result: The Systems Builder | The Automation Gap Audit",
  description:
    "You scored in the Systems Builder band. You think in systems — now it's about refinement and the next level of leverage.",
  robots: { index: false },
};

export default function SystemsBuilderPage() {
  return (
    <SiteShell smoothScroll={false}>
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
        <AssessmentResult
          config={{
            profileKey: "systems",
            label: "The Systems Builder",
            tagline: "strong foundations — the gains come from what's left.",
            description:
              "You already think in systems and have solid processes in place. The highest-leverage moves now are identifying the workflows left to optimise and designing a clear roadmap before the business complexity grows beyond them.",
            accentColor: "bg-ink text-sage",
          }}
        />
        </div>
      </main>
    </SiteShell>
  );
}

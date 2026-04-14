import type { Metadata } from "next";
import { AssessmentResult } from "@/components/assessment/AssessmentResult";

export const metadata: Metadata = {
  title: "Your Result: The Systems Builder | The Automation Gap Audit",
  description:
    "You scored in the Systems Builder band. You think in systems — now it's about refinement and the next level of leverage.",
  robots: { index: false },
};

export default function SystemsBuilderPage() {
  return (
    <AssessmentResult
      config={{
        profileKey: "systems",
        label: "The Systems Builder",
        tagline: "you think in systems, now it's about refinement.",
        description:
          "You already have solid processes and some automations in place. The next step is identifying the highest-leverage workflows left to optimise and designing a clear roadmap for where to go next. At this stage, the gains come from compounding what you've already built.",
        scoreRange: "Score: 65–100%",
        accentColor: "bg-emerald-100 text-emerald-800",
        accentBg: "bg-emerald-50/60",
        borderColor: "border-emerald-100",
      }}
    />
  );
}

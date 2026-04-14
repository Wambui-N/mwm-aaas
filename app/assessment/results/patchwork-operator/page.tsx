import type { Metadata } from "next";
import { AssessmentResult } from "@/components/assessment/AssessmentResult";

export const metadata: Metadata = {
  title: "Your Result: The Patchwork Operator | The Automation Gap Audit",
  description:
    "You scored in the Patchwork Operator band. You have pieces in place, but they don't fully connect — here's how to close the gaps.",
  robots: { index: false },
};

export default function PatchworkOperatorPage() {
  return (
    <AssessmentResult
      config={{
        profileKey: "patchwork",
        label: "The Patchwork Operator",
        tagline: "you have pieces in place, but they don't fully connect.",
        description:
          "Some workflows are automated or systemised, but there are still gaps where work falls through the cracks, data is duplicated, or things depend on the right person remembering what to do. You're close to a much more resilient setup — you just need to join the dots.",
        scoreRange: "Score: 35–64%",
        accentColor: "bg-amber-100 text-amber-800",
        accentBg: "bg-amber-50/60",
        borderColor: "border-amber-100",
      }}
    />
  );
}

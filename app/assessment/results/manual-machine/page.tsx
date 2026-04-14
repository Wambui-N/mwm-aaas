import type { Metadata } from "next";
import { AssessmentResult } from "@/components/assessment/AssessmentResult";

export const metadata: Metadata = {
  title: "Your Result: The Manual Machine | The Automation Gap Audit",
  description:
    "You scored in the Manual Machine band. Most things still run on human effort — here's exactly where to start automating.",
  robots: { index: false },
};

export default function ManualMachinePage() {
  return (
    <AssessmentResult
      config={{
        profileKey: "manual",
        label: "The Manual Machine",
        tagline: "most things still run on human effort.",
        description:
          "Right now, your team is keeping everything moving through memory, spreadsheets, and one-off fixes. That's completely normal at this stage — and also exactly where automation starts to pay off quickly. A handful of targeted changes could save you several hours every week.",
        scoreRange: "Score: 0–34%",
        accentColor: "bg-red-100 text-red-800",
        accentBg: "bg-red-50/60",
        borderColor: "border-red-100",
      }}
    />
  );
}

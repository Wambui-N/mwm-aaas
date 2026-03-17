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
        scoreRange: "Score: 0–35%",
        accentColor: "bg-red-100 text-red-800",
        accentBg: "bg-red-50/60",
        borderColor: "border-red-100",
        primaryCta: {
          label: "Get the free checklist",
          href: "/resources/checklist/10-workflows-to-automate-first",
        },
        gapCards: [
          {
            title: "Your core workflows live in people's heads",
            body: "Start by documenting the 2–3 workflows you run most often — onboarding, delivery, or reporting. Once it's written down, it's much easier to spot which steps should be automated.",
            cta: "Use the 10-workflow checklist to choose what to document first",
            href: "/resources/checklist/10-workflows-to-automate-first",
          },
          {
            title: "No standard starting point for projects",
            body: "If every project is set up from scratch, task creation is a quick win. A single template for 'how we start a project' can save dozens of clicks every week.",
            cta: "Read the guide on automating internal task creation",
            href: "/blog/how-to-automate-internal-task-creation-when-a-new-project-starts",
          },
          {
            title: "Reporting steals more time than it should",
            body: "Weekly or monthly updates shouldn't require manual number-chasing. Once your metrics are clear, you can automate how they're pulled and shared.",
            cta: "Read the guide on automated reporting and status updates",
            href: "/blog/how-to-set-up-automated-reporting-and-status-updates",
          },
        ],
        areasToFocus: ["operations", "clients", "tools"],
      }}
    />
  );
}

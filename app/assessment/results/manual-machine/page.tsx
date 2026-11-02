import type { Metadata } from "next";
import { AssessmentResult } from "@/components/assessment/AssessmentResult";
import { SiteShell } from "@/components/site/SiteShell";

export const metadata: Metadata = {
  title: "Your Result: The Manual Machine | The Automation Gap Audit",
  description:
    "You scored in the Manual Machine band. Most things still run on human effort — here's exactly where to start automating.",
  robots: { index: false },
};

export default function ManualMachinePage() {
  return (
    <SiteShell smoothScroll={false}>
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
        <AssessmentResult
          config={{
            profileKey: "manual",
            label: "The Manual Machine",
            tagline: "your operations are running on effort, not systems.",
            description:
              "Right now your team is keeping everything moving through memory, goodwill, and one-off fixes. That's a growth ceiling with a hard limit — and it's probably closer than it feels. The good news: this is exactly where targeted automation pays off fastest.",
            accentColor: "bg-ink text-sage",
          }}
        />
        </div>
      </main>
    </SiteShell>
  );
}

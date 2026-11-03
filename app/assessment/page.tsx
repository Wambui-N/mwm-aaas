import React from "react";
import type { Metadata } from "next";
import { AutomationAssessment } from "@/components/assessment/AutomationAssessment";
import { SiteShell } from "@/components/site/SiteShell";

export const metadata: Metadata = {
  title: "The Automation Gap Audit | Made with Make",
  description:
    "Answer 10 questions to find out exactly where your business is bleeding time — and get a focused plan for your next 2–3 automation moves. Results emailed to you.",
};

export default function AssessmentPage() {
  return (
    // Native scrolling here: eased scroll physics makes form inputs feel laggy.
    <SiteShell smoothScroll={false}>
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
          <AutomationAssessment />
        </div>
      </main>
    </SiteShell>
  );
}

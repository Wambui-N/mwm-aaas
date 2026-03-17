import React from "react";
import type { Metadata } from "next";
import { AutomationAssessment } from "@/components/assessment/AutomationAssessment";

export const metadata: Metadata = {
  title: "The Automation Gap Audit | Made with Make",
  description:
    "Answer 10 questions to find out exactly where your business is bleeding time — and get a focused plan for your next 2–3 automation moves. Results emailed to you.",
};

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-brand-grey/10">
      <main className="w-full h-screen flex items-center justify-center">
        <div className="w-full max-w-3xl px-4">
          <AutomationAssessment fullPage />
        </div>
      </main>
    </div>
  );
}


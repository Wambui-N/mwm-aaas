import React from "react";
import type { Metadata } from "next";
import { AutomationAssessment } from "@/components/assessment/AutomationAssessment";
import NavigationWrapper from "@/components/layout/NavigationWrapper";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "The Automation Gap Audit | Made with Make",
  description:
    "Answer 10 questions to find out exactly where your business is bleeding time — and get a focused plan for your next 2–3 automation moves. Results emailed to you.",
};

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-brand-grey/10">
      <NavigationWrapper />
      <main className="pt-12 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AutomationAssessment />
        </div>
      </main>
      <Footer />
    </div>
  );
}


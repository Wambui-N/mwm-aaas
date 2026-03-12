import React from "react";
import type { Metadata } from "next";
import NavigationWrapper from "@/components/layout/NavigationWrapper";
import Footer from "@/components/layout/Footer";
import { AutomationAssessment } from "@/components/assessment/AutomationAssessment";

export const metadata: Metadata = {
  title: "Automation Readiness Assessment | Made with Make",
  description:
    "Answer 10 questions to see where your business is bleeding time and manual effort — and get a focused plan for your next 2–3 automation moves.",
};

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-brand-grey/10">
      <NavigationWrapper />
      <main className="pt-12 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AutomationAssessment />
        </div>
      </main>
      <Footer />
    </div>
  );
}


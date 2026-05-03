import type { Metadata } from "next";
import { AssessmentResult } from "@/components/assessment/AssessmentResult";
import NavigationWrapper from "@/components/layout/NavigationWrapper";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Your Result: The Manual Machine | The Automation Gap Audit",
  description:
    "You scored in the Manual Machine band. Most things still run on human effort — here's exactly where to start automating.",
  robots: { index: false },
};

export default function ManualMachinePage() {
  return (
    <div className="min-h-screen bg-brand-grey/10">
      <NavigationWrapper />
      <main className="pt-12 pb-24">
        <AssessmentResult
          config={{
            profileKey: "manual",
            label: "The Manual Machine",
            tagline: "your operations are running on effort, not systems.",
            description:
              "Right now your team is keeping everything moving through memory, goodwill, and one-off fixes. That's a growth ceiling with a hard limit — and it's probably closer than it feels. The good news: this is exactly where targeted automation pays off fastest.",
            accentColor: "bg-red-100 text-red-800",
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

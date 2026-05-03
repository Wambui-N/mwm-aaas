import type { Metadata } from "next";
import { AssessmentResult } from "@/components/assessment/AssessmentResult";
import NavigationWrapper from "@/components/layout/NavigationWrapper";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Your Result: The Systems Builder | The Automation Gap Audit",
  description:
    "You scored in the Systems Builder band. You think in systems — now it's about refinement and the next level of leverage.",
  robots: { index: false },
};

export default function SystemsBuilderPage() {
  return (
    <div className="min-h-screen bg-brand-grey/10">
      <NavigationWrapper />
      <main className="pt-12 pb-24">
        <AssessmentResult
          config={{
            profileKey: "systems",
            label: "The Systems Builder",
            tagline: "strong foundations — the gains come from what's left.",
            description:
              "You already think in systems and have solid processes in place. The highest-leverage moves now are identifying the workflows left to optimise and designing a clear roadmap before the business complexity grows beyond them.",
            accentColor: "bg-emerald-100 text-emerald-800",
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import { AssessmentResult } from "@/components/assessment/AssessmentResult";
import NavigationWrapper from "@/components/layout/NavigationWrapper";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Your Result: The Patchwork Operator | The Automation Gap Audit",
  description:
    "You scored in the Patchwork Operator band. You have pieces in place, but they don't fully connect — here's how to close the gaps.",
  robots: { index: false },
};

export default function PatchworkOperatorPage() {
  return (
    <div className="min-h-screen bg-brand-grey/10">
      <NavigationWrapper />
      <main className="pt-12 pb-24">
        <AssessmentResult
          config={{
            profileKey: "patchwork",
            label: "The Patchwork Operator",
            tagline: "the pieces are there, but the gaps are costing you.",
            description:
              "You have some processes and automations in place, but there are still points where work falls through the cracks, data gets duplicated, or things depend on the right person remembering what to do. These hidden gaps compound as the business grows.",
            accentColor: "bg-amber-100 text-amber-800",
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

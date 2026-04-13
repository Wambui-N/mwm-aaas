import type { Metadata } from "next";
import { AssessmentResult } from "@/components/assessment/AssessmentResult";

export const metadata: Metadata = {
  title: "Your Result: The Patchwork Operator | The Automation Gap Audit",
  description:
    "You scored in the Patchwork Operator band. You have pieces in place, but they don't fully connect — here's how to close the gaps.",
  robots: { index: false },
};

export default function PatchworkOperatorPage() {
  return (
    <AssessmentResult
      config={{
        profileKey: "patchwork",
        label: "The Patchwork Operator",
        tagline: "you have pieces in place, but they don't fully connect.",
        description:
          "Some workflows are automated or systemised, but there are still gaps where work falls through the cracks, data is duplicated, or things depend on the right person remembering what to do. You're close to a much more resilient setup — you just need to join the dots.",
        scoreRange: "Score: 36–65%",
        accentColor: "bg-amber-100 text-amber-800",
        accentBg: "bg-amber-50/60",
        borderColor: "border-amber-100",
        primaryCta: {
          label: "Book a free consultation",
          href: "/contact-us",
        },
        diagnosisCopy: {
          operations:
            "You have processes, but they're inconsistent — some steps are documented, others live with specific team members. The opportunity is in standardising the most frequent workflows so execution doesn't depend on who's available.",
          clients:
            "Leads are coming in but the follow-through isn't reliable. Speed and consistency in your client management pipeline will have an outsized impact — especially tightening response time and onboarding steps.",
          tools:
            "You have tools, but they're operating as silos. Connecting the ones you already have — so data flows automatically rather than being copied by hand — is the highest-leverage move at this stage.",
        },
        gapCards: [
          {
            title: "Leads wait too long for a response",
            body: "Speed to response is one of the biggest drivers of conversion. An automated acknowledgement and a simple follow-up flow can transform your pipeline without any extra manual effort.",
            cta: "Read the guide on automated lead follow-up",
            href: "/blog/how-to-set-up-automated-lead-follow-up",
          },
          {
            title: "Your tools don't talk to each other",
            body: "Copy-pasting data between tools is a clear signal for automation. Start with one high-frequency handoff — like form submissions into your CRM — and work outward from there.",
            cta: "Use the checklist to pick your first integration",
            href: "/resources/checklist/10-workflows-to-automate-first",
          },
          {
            title: "Onboarding is inconsistent client to client",
            body: "When onboarding depends on who remembers what, you get uneven experiences. A simple sequence and a few automations can make this smooth and repeatable every time.",
            cta: "Read the guide on building an automated client onboarding flow",
            href: "/blog/how-to-build-an-automated-client-onboarding-flow",
          },
        ],
        areasToFocus: ["clients", "tools", "operations"],
      }}
    />
  );
}

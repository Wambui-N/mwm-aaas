import type { Metadata } from "next";
import { AssessmentResult } from "@/components/assessment/AssessmentResult";

export const metadata: Metadata = {
  title: "Your Result: The Systems Builder | The Automation Gap Audit",
  description:
    "You scored in the Systems Builder band. You think in systems — now it's about refinement and the next level of leverage.",
  robots: { index: false },
};

export default function SystemsBuilderPage() {
  return (
    <AssessmentResult
      config={{
        profileKey: "systems",
        label: "The Systems Builder",
        tagline: "you think in systems — now it's about refinement.",
        description:
          "You already have solid processes and some automations in place. The next step is identifying the highest-leverage workflows left to optimise and designing a clear roadmap for where to go next. At this stage, the gains come from compounding what you've already built.",
        scoreRange: "Score: 66–100%",
        accentColor: "bg-emerald-100 text-emerald-800",
        accentBg: "bg-emerald-50/60",
        borderColor: "border-emerald-100",
        primaryCta: {
          label: "Book a strategy call",
          href: "/contact-us",
        },
        gapCards: [
          {
            title: "Automations exist, but there's no roadmap",
            body: "Scattered one-off automations can be fragile and hard to maintain. A simple roadmap — which workflows to optimise in what order — keeps your systems strategic instead of reactive.",
            cta: "Book a free consultation to prioritise your next 2–3 automations",
            href: "/contact-us",
          },
          {
            title: "Reporting requires digging in multiple places",
            body: "If you have to open three tools to answer a basic question, you likely need a simple 'source of truth' and a few automations to keep it up to date automatically.",
            cta: "Read the guide on eliminating manual data entry",
            href: "/blog/how-to-eliminate-manual-data-entry-between-your-business-tools",
          },
          {
            title: "You chase invoices manually",
            body: "Even in a well-systemised business, invoice follow-up often gets skipped. An automated sequence handles it consistently, without the awkwardness.",
            cta: "Read the guide on automating invoice and payment follow-up",
            href: "/blog/how-to-automate-invoice-and-payment-follow-up",
          },
        ],
        areasToFocus: ["tools", "operations", "clients"],
      }}
    />
  );
}

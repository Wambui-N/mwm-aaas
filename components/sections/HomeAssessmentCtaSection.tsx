import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeAssessmentCtaSection() {
  return (
    <section className="py-10 border-t border-brand-grey/20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid gap-6 rounded-2xl bg-brand-black px-6 py-7 text-left text-white md:grid-cols-[1.7fr,auto] md:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-grey/80">
              New · Free assessment
            </p>
            <h2 className="mt-2 text-2xl font-display font-semibold md:text-3xl">
              Not sure where to start with automation?
            </h2>
            <p className="mt-2 text-sm text-gray-200 md:text-base">
              In about 5 minutes, you&apos;ll go from &quot;everything feels a
              bit messy&quot; to a clear shortlist of the 2–3 workflows that
              are costing you the most time — across operations, clients, and
              tools.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-brand-black transition-colors hover:bg-brand-grey/20"
            >
              Take the automation assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <p className="text-[11px] text-gray-400">
              10 questions · no email required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


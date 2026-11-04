import React from "react";
import type { Metadata } from "next";
import { generatePageMetadata, siteConfig } from "@/lib/seo";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { SketchButton } from "@/components/site/SketchButton";
import { ConsultCard } from "@/components/site/ConsultCard";
import { AUDIT_CTA, AUDIT_HREF } from "@/lib/site/shell";

export const metadata: Metadata = {
  ...generatePageMetadata(
    "Services — Made with Make",
    "Automation consulting, Make.com builds and ongoing optimisation for service businesses. I find what to automate, build it, and hand over a system your team can run.",
    "services",
    ["automation consulting", "Make.com consultant", "workflow automation services", "proposal automation", "AI integrations"]
  ),
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
};

const services = [
  {
    n: "01",
    tag: "Consult",
    title: "Automation & AI Consulting",
    body: "Before anything is built, I work out what is worth automating and what is not, so you spend time and money where it pays back.",
    items: ["Process audits", "Automation opportunity assessment", "Architecture and tool selection", "Strategy and roadmap design"],
  },
  {
    n: "02",
    tag: "Build",
    title: "Automation Execution",
    body: "I build the systems myself, on Make.com and the tools your team already uses, then test them and document how they work.",
    items: ["Make.com workflows", "AI integrations", "API connections", "Process automation"],
  },
  {
    n: "03",
    tag: "Improve",
    title: "Optimisation & Scaling",
    body: "Once a system is live I can keep improving it, and extend it as your business grows.",
    items: ["Performance improvements", "System refinement", "Expansion as you grow"],
  },
];

const process = [
  { title: "Discovery", body: "A deep dive into your operations, goals and constraints." },
  { title: "Strategy & roadmap", body: "Map the opportunities and prioritise them by impact." },
  { title: "System design", body: "Design the workflows, integrations and data flows." },
  { title: "Build & deploy", body: "Build, test and launch the automations." },
  { title: "Review & handover", body: "Validate performance and document everything for your team." },
];

export default function ServicesPage() {
  return (
    <SiteShell>
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
          <PageHeader
            label="What I do"
            title="Services"
            mark="Services"
            seed={53}
            lede="Strategy-led and execution-driven, with no handoffs. I find the opportunities, build the systems, and leave you with something your team can maintain."
          />

          <section aria-label="Services" className="mt-10">
            <div className="site-grid gap-y-4 md:gap-y-6">
              {services.map((s) => (
                <article
                  key={s.n}
                  className="col-span-4 flex flex-col border border-ink/[0.22] bg-white p-5 text-ink md:col-span-4 md:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="gl-mono text-ink/70">[{s.n}]</span>
                    <span className="gl-mono bg-sage px-2 py-1 text-ink">{s.tag}</span>
                  </div>
                  <h2 className="calm-h3 mt-3">{s.title}</h2>
                  <p className="calm-body mt-3 text-ink/80">{s.body}</p>
                  <ul className="rd-prose mt-4 list-disc space-y-1 pl-5 text-ink/80">
                    {s.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="how-i-work" className="mt-16">
            <h2 id="how-i-work" className="sk-h2">
              How an engagement runs
            </h2>
            <ol className="site-grid mt-6 gap-y-4 md:gap-y-6">
              {process.map((p, i) => (
                <li
                  key={p.title}
                  className="col-span-4 border border-ink/[0.22] bg-white p-5 md:col-span-4 md:p-6 lg:col-span-4"
                >
                  <span className="gl-mono text-signal">Step {i + 1}</span>
                  <h3 className="calm-h3 mt-2">{p.title}</h3>
                  <p className="calm-body mt-2 text-ink/80">{p.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-16 border border-ink bg-sage p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div>
                <h2 className="calm-h3">Not sure where to start?</h2>
                <p className="calm-body mt-2 max-w-xl text-ink/85">
                  The Proposal Pipeline Scorecard takes about three minutes and shows where your proposal process is
                  losing time.
                </p>
              </div>
              <SketchButton href={AUDIT_HREF} variant="marker" seed={21} className="whitespace-nowrap text-lg">
                {AUDIT_CTA} {"->"}
              </SketchButton>
            </div>
          </section>

          <ConsultCard
            className="mt-10"
            heading="Ready to talk it through?"
            body="Book a free consultation and we can work out together what is worth automating in your business."
          />
        </div>
      </main>
    </SiteShell>
  );
}

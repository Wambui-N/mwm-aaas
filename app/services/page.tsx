import React from "react";
import type { Metadata } from "next";
import { generatePageMetadata, siteConfig } from "@/lib/seo";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { SketchButton } from "@/components/site/SketchButton";
import { ConsultCard } from "@/components/site/ConsultCard";

export const metadata: Metadata = {
  ...generatePageMetadata(
    "Services — Made with Make",
    "Three ways I can help: a proposal pipeline that sends proposals in minutes, web scraping that collects data for you, and websites built to bring in work.",
    "services",
    ["proposal automation", "web scraping services", "web development", "Make.com consultant", "workflow automation services"]
  ),
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
};

type Service = {
  n: string;
  title: string;
  popular?: boolean;
  summary: string;
  forWho: string;
  gets: string[];
  result: string;
  cta: { label: string; href: string };
};

const services: Service[] = [
  {
    n: "01",
    title: "Proposal Pipeline",
    popular: true,
    summary:
      "Send one RFP and get a complete first draft back in under 20 minutes, written in your firm's voice from your own past work.",
    forWho: "Development consultancies sending 4+ proposals a month without a dedicated proposal team.",
    gets: [
      "Complete first drafts in minutes, in your firm's voice",
      "Your ToR read for you: requirements, scoring and expert roles",
      "The right experts matched, with CVs in the donor's format",
      "Go/no-go scoring and a compliance checklist",
    ],
    result: "Proposal creation went from several hours to a few minutes for Founders Freedom Africa.",
    cta: { label: "See how it works", href: "/proposal-pipeline" },
  },
  {
    n: "02",
    title: "Web Scraping",
    summary:
      "I collect data from websites for you, on a schedule, and deliver it clean and ready to use, so nobody has to copy and paste it by hand.",
    forWho: "Teams that need listings, prices, leads or research gathered regularly.",
    gets: [
      "Scrapers built for the sites and data you care about",
      "Data cleaned and sent to a sheet, database or inbox",
      "Runs automatically, daily or weekly",
      "Set up so it keeps working when you are not watching",
    ],
    result: "We Are Kusudi went from about 50 hand-found job listings a week to up to 500.",
    cta: { label: "Tell me what you need", href: "/contact-us" },
  },
  {
    n: "03",
    title: "Web Development",
    summary:
      "A fast, clear website that explains what you do and makes it easy for the right people to get in touch.",
    forWho: "Founders who need a new site or a rebuild of one that is not working for them.",
    gets: [
      "Design and build, mobile-friendly and quick to load",
      "Clear structure and copy guidance so visitors understand your offer",
      "Contact forms and booking connected to your tools",
      "Handover so you can keep it updated yourself",
    ],
    result: "A site that supports your sales process instead of sitting beside it.",
    cta: { label: "Start a conversation", href: "/contact-us" },
  },
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
            lede="Three ways I can help. Each one is built around a real problem, comes with a clear outcome, and is handed over so your team can run it."
          />

          <section aria-label="Services" className="mt-10">
            <div className="site-grid gap-y-4 md:gap-y-6">
              {services.map((s) => (
                <article
                  key={s.n}
                  className={`col-span-4 flex flex-col p-5 text-ink md:p-6 ${
                    s.popular ? "border-2 border-ink bg-sage" : "border border-ink/[0.22] bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="gl-mono text-ink/70">[{s.n}]</span>
                    {s.popular && <span className="gl-mono bg-signal px-2 py-1 text-ink">Popular</span>}
                  </div>
                  <h2 className="calm-h3 mt-3">{s.title}</h2>
                  <p className="calm-body mt-3 text-ink/85">{s.summary}</p>

                  <h3 className="gl-mono mt-5 text-ink/70">Who it is for</h3>
                  <p className="calm-body mt-1 text-ink/85">{s.forWho}</p>

                  <h3 className="gl-mono mt-5 text-ink/70">What you get</h3>
                  <ul className="rd-prose mt-1 list-disc space-y-1 pl-5 text-ink/85">
                    {s.gets.map((g) => (
                      <li key={g}>{g}</li>
                    ))}
                  </ul>

                  <h3 className="gl-mono mt-5 text-ink/70">{s.n === "03" ? "The goal" : "Example result"}</h3>
                  <p className="calm-body mt-1 flex-1 text-ink/85">{s.result}</p>

                  <div className="mt-6">
                    <SketchButton
                      href={s.cta.href}
                      variant={s.popular ? "marker" : "paper"}
                      seed={20 + Number(s.n)}
                      className="text-base"
                    >
                      {s.cta.label} {"->"}
                    </SketchButton>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <ConsultCard
            className="mt-12"
            heading="Not sure which one you need?"
            body="Tell me what is slowing you down and I will point you to the right fit. The first conversation is free."
          />
        </div>
      </main>
    </SiteShell>
  );
}

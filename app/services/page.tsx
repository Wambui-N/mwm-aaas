import React from "react";
import type { Metadata } from "next";
import { generatePageMetadata, siteConfig } from "@/lib/seo";
import { serviceList } from "@/lib/site/services";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { SketchButton } from "@/components/site/SketchButton";
import { ConsultCard } from "@/components/site/ConsultCard";

export const metadata: Metadata = {
  ...generatePageMetadata(
    "Services — Made with Make",
    "Four ways I can help: a proposal pipeline that sends proposals in minutes, web scraping, web development, and custom automations built to fit your business.",
    "services",
    ["proposal automation", "web scraping services", "web development", "custom automation", "Make.com consultant", "workflow automation services"]
  ),
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
};

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
            lede="Four ways I can help. Each one is built around a real problem and handed over so your team can run it."
          />

          <section aria-label="Services" className="mt-10">
            <div className="site-grid gap-y-4 md:gap-y-6">
              {serviceList.map((s, i) => (
                <article
                  key={s.slug}
                  className={`col-span-4 flex flex-col p-5 text-ink md:col-span-6 md:p-6 ${
                    s.popular ? "border-2 border-ink bg-sage" : "border border-ink/[0.22] bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="gl-mono text-ink/70">[0{i + 1}]</span>
                    {s.popular && <span className="gl-mono bg-signal px-2 py-1 text-ink">Popular</span>}
                  </div>
                  <h2 className="calm-h3 mt-3">{s.title}</h2>
                  <p className="calm-body mt-3 flex-1 text-ink/85">{s.summary}</p>
                  <div className="mt-6">
                    <SketchButton href={s.href} variant={s.popular ? "marker" : "paper"} seed={20 + i} className="text-base">
                      {s.cta} {"->"}
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

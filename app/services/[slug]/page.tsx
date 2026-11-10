import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generatePageMetadata, siteConfig } from "@/lib/seo";
import { serviceDetails } from "@/lib/site/services";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { SketchButton } from "@/components/site/SketchButton";
import { ConsultCard } from "@/components/site/ConsultCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceDetails.find((d) => d.slug === slug);
  if (!s) return {};
  return {
    ...generatePageMetadata(`${s.title} — Made with Make`, s.metaDescription, `services/${s.slug}`, s.keywords),
    alternates: { canonical: `${siteConfig.url}/services/${s.slug}` },
  };
}

const card = "border border-ink/[0.22] bg-white p-5 md:p-6";

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceDetails.find((d) => d.slug === slug);
  if (!s) notFound();

  return (
    <SiteShell>
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
          <Link href="/services" className="gl-mono text-ink/70 underline-offset-4 hover:underline">
            ← All services
          </Link>

          <PageHeader className="mt-6" label="Service" title={s.title} mark={s.mark} seed={80 + s.slug.length} lede={s.lede} />

          <div className="mt-6">
            <SketchButton href="/contact-us" variant="marker" seed={81} className="text-lg">
              {s.ctaLabel} {"->"}
            </SketchButton>
          </div>

          <section aria-label="What it is" className="site-grid mt-12 gap-y-4 md:gap-y-6">
            <div className={`col-span-4 md:col-span-6 ${card}`}>
              <h2 className="gl-mono text-ink/70">Who it is for</h2>
              <p className="calm-body mt-2 text-ink/85">{s.forWho}</p>

              <h2 className="gl-mono mt-6 text-ink/70">What you get</h2>
              <ul className="rd-prose mt-2 list-disc space-y-1 pl-5 text-ink/85">
                {s.gets.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>

            <div className="col-span-4 border-2 border-ink bg-sage p-5 md:col-span-6 md:p-6">
              <h2 className="gl-mono text-ink/70">{s.result ? "Example result" : s.slug === "custom-automations" ? "What I build" : "The goal"}</h2>
              {s.result ? (
                <>
                  <p className="calm-body mt-2 text-ink/85">{s.result.text}</p>
                  <Link href={s.result.href} className="mt-4 inline-block font-bold text-signal underline underline-offset-4 hover:no-underline">
                    {s.result.linkLabel} {"->"}
                  </Link>
                </>
              ) : s.examples && s.examples.length > 1 ? (
                <ul className="rd-prose mt-2 list-disc space-y-1 pl-5 marker:text-signal">
                  {s.examples.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              ) : (
                <p className="calm-body mt-2 text-ink/85">{s.examples?.[0]}</p>
              )}
            </div>
          </section>

          <section aria-labelledby="how-h" className="mt-14">
            <h2 id="how-h" className="calm-h3">
              How it works
            </h2>
            <ol className="site-grid mt-4 gap-y-4 md:gap-y-6">
              {s.steps.map(([t, b], i) => (
                <li key={t} className={`col-span-4 ${card}`}>
                  <span className="gl-mono text-signal">Step {i + 1}</span>
                  <p className="calm-h3 mt-2">{t}</p>
                  <p className="calm-body mt-2 text-ink/80">{b}</p>
                </li>
              ))}
            </ol>
          </section>

          <ConsultCard
            className="mt-14"
            heading="Want to talk it through?"
            body="Tell me what you are trying to do and I will tell you honestly whether I can help. The first conversation is free."
          />
        </div>
      </main>
    </SiteShell>
  );
}

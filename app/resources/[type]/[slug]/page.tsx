import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo";
import {
  getResource,
  getAllResources,
  type Resource,
  type ResourceType,
} from "@/lib/content/resources";
import { scorecardUrl, bookingUrl } from "@/lib/links";
import NavigationWrapper from "@/components/layout/NavigationWrapper";
import Footer from "@/components/layout/Footer";
import ToolRenderer from "@/components/tools/ToolRenderer";
import { Calculator, FileCheck, ListChecks, ArrowRight } from "lucide-react";

type Props = {
  params: Promise<{ type: string; slug: string }>;
};

const typeConfig: Record<
  ResourceType,
  { label: string; icon: typeof Calculator }
> = {
  tool: { label: "Tool", icon: Calculator },
  template: { label: "Template", icon: FileCheck },
  checklist: { label: "Checklist", icon: ListChecks },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, slug } = await params;
  const resource = getResource(type as ResourceType, slug);
  if (!resource) return { title: "Resource Not Found" };
  return generatePageMetadata(
    `${resource.title} - Made with Make`,
    resource.description,
    `resources/${type}/${slug}`,
    []
  );
}

export async function generateStaticParams() {
  return getAllResources().map((r) => ({ type: r.type, slug: r.slug }));
}

export default async function ResourceDetailPage({ params }: Props) {
  const { type, slug } = await params;
  const resource = getResource(type as ResourceType, slug);
  if (!resource) notFound();

  const { label, icon: Icon } = typeConfig[resource.type];
  const otherTools = getAllResources().filter(
    (r: Resource) => !(r.type === resource.type && r.slug === resource.slug)
  );

  return (
    <div className="min-h-screen bg-brand-grey/10">
      <NavigationWrapper />
      <main className="pt-12 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/resources"
            className="text-sm text-gray-500 hover:text-brand-black mb-8 inline-flex items-center gap-1 transition-colors"
          >
            ← Back to Resources
          </Link>

          <article>
            <div className="flex items-center gap-3 mb-6 mt-6">
              <div className="w-12 h-12 bg-brand-grey/30 border border-brand-grey/60 rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-brand-black" />
              </div>
              <span className="text-xs font-semibold text-brand-orange uppercase tracking-widest">
                {label}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-semibold text-brand-black mb-4">
              {resource.title}
            </h1>
            <p className="text-lg text-gray-600 mb-10">{resource.description}</p>

            {/* Interactive tool or fallback */}
            {resource.component ? (
              <div className="mb-16">
                <ToolRenderer componentKey={resource.component} />
              </div>
            ) : resource.url !== "#" ? (
              <div className="p-6 bg-brand-grey/20 rounded-2xl border border-brand-grey/50 mb-16">
                <a
                  href={resource.url}
                  target={resource.external ? "_blank" : undefined}
                  rel={resource.external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange text-white font-medium rounded-lg hover:bg-brand-orange/90 transition-colors"
                >
                  {resource.external ? "Open Resource" : "Download"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            ) : (
              <div className="p-6 bg-brand-grey/20 rounded-2xl border border-brand-grey/50 mb-16">
                <p className="text-gray-500 text-sm">
                  This resource is coming soon. Contact us if you&apos;d like
                  early access.
                </p>
              </div>
            )}
          </article>

          {/* Other tools */}
          {otherTools.length > 0 && (
            <section className="mb-10">
              <p className="text-sm font-bold text-brand-black mb-4 uppercase tracking-wide">
                Other tools —{" "}
                <span className="font-normal normal-case text-gray-500">
                  Try our other tools!
                </span>
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {otherTools.map((t: Resource) => {
                  const { label: tLabel, icon: TIcon } = typeConfig[t.type];
                  return (
                    <Link
                      key={`${t.type}-${t.slug}`}
                      href={`/resources/${t.type}/${t.slug}`}
                      className="group flex items-start gap-3 p-4 border border-gray-100 rounded-xl hover:border-brand-grey hover:shadow-sm transition-all"
                    >
                      <div className="w-9 h-9 bg-brand-grey/20 border border-brand-grey/40 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-grey/40 transition-colors">
                        <TIcon className="w-4 h-4 text-brand-black" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-semibold text-brand-orange uppercase tracking-widest block">
                          {tLabel}
                        </span>
                        <span className="text-sm font-medium text-brand-black group-hover:text-brand-orange transition-colors block leading-snug">
                          {t.title}
                        </span>
                        <span className="text-xs text-gray-500 line-clamp-1">
                          {t.description}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-orange transition-colors flex-shrink-0 mt-0.5" />
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          
          {/* booking CTA */}
        <aside className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-8">
          <h2 className="text-xl font-display font-semibold text-brand-black mb-3">
          Want more customised help?
          </h2>
          <p className="text-gray-600 mb-6">
            If you&apos;d like to talk through how this could work in your own
            business, you can request a free consultation and we&apos;ll figure
            out what makes sense for you.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center rounded-lg bg-brand-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-orange/90"
          >
            Get a free consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

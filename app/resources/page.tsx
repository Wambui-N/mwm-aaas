import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { getAllResources, type ResourceType } from "@/lib/content/resources";
import NavigationWrapper from "@/components/layout/NavigationWrapper";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Wrench, FileText } from "lucide-react";

export const metadata: Metadata = generatePageMetadata(
  "Resources - Made with Make",
  "Free tools and templates to help you automate smarter.",
  "resources",
  [
    "automation tools",
    "webhook tester",
    "workflow templates",
    "automation resources",
  ]
);

type ResourcesPageProps = {
  searchParams?: Promise<{ type?: string }>;
};

const VALID_FILTER_TYPES: ResourceType[] = ["tool", "template"];

const TYPE_ICONS: Record<ResourceType, React.ElementType> = {
  tool: Wrench,
  template: FileText,
  checklist: FileText,
};

const TYPE_LABELS: Record<ResourceType, string> = {
  tool: "Tool",
  template: "Template",
  checklist: "Checklist",
};

export default async function ResourcesPage({
  searchParams,
}: ResourcesPageProps) {
  const resolvedParams: { type?: string } = await (
    searchParams ?? Promise.resolve({})
  );

  const rawType = resolvedParams.type;
  const activeType: ResourceType | null =
    rawType && (VALID_FILTER_TYPES as string[]).includes(rawType)
      ? (rawType as ResourceType)
      : null;

  const allResources = getAllResources();

  const visibleResources = activeType
    ? allResources.filter((r) => r.type === activeType)
    : allResources;

  return (
    <div className="min-h-screen bg-brand-grey/10">
      <NavigationWrapper />
      <main className="pt-12 pb-24">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-4xl font-display font-semibold text-brand-black md:text-5xl">
              {activeType
                ? activeType === "tool"
                  ? "Tools"
                  : "Templates"
                : "Resources"}
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
              {activeType
                ? activeType === "tool"
                  ? "Interactive utilities to make your work easier."
                  : "Ready-made structures you can download and adapt to your own workflows."
                : "Free tools and templates to help you work smarter and automate faster."}
            </p>
          </div>

          {/* Filter pills */}
          <div className="mb-12">
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">
              Filter by type
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                href="/resources"
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  !activeType
                    ? "bg-brand-black text-white"
                    : "bg-brand-grey/30 text-brand-black hover:bg-brand-orange/10 hover:text-brand-orange"
                }`}
              >
                All
              </Link>
              <Link
                href="/resources?type=tool"
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  activeType === "tool"
                    ? "bg-brand-orange text-white"
                    : "bg-brand-grey/30 text-brand-black hover:bg-brand-orange/10 hover:text-brand-orange"
                }`}
              >
                Tools
              </Link>
              <Link
                href="/resources?type=template"
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  activeType === "template"
                    ? "bg-brand-orange text-white"
                    : "bg-brand-grey/30 text-brand-black hover:bg-brand-orange/10 hover:text-brand-orange"
                }`}
              >
                Templates
              </Link>
            </div>
          </div>

          {/* Grid */}
          {visibleResources.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-gray-500">
                {activeType
                  ? `No ${TYPE_LABELS[activeType].toLowerCase()}s yet,  check back soon.`
                  : "Resources coming soon."}
              </p>
              {activeType && (
                <Link
                  href="/resources"
                  className="mt-4 inline-block text-sm text-brand-orange hover:underline"
                >
                  View all resources
                </Link>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleResources.map((resource) => {
                const Icon = TYPE_ICONS[resource.type];
                return (
                  <article
                    key={`${resource.type}-${resource.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 transition-all hover:border-brand-grey hover:shadow-sm"
                  >
                    <Link
                      href={`/resources/${resource.type}/${resource.slug}`}
                      className="flex flex-1 flex-col p-6"
                    >
                      {/* Icon + type badge */}
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-grey/20 border border-brand-grey/40 transition-colors group-hover:bg-brand-orange/10 group-hover:border-brand-orange/30">
                          <Icon className="h-4 w-4 text-brand-black transition-colors group-hover:text-brand-orange" />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
                          {TYPE_LABELS[resource.type]}
                        </span>
                      </div>

                      {/* Title + description */}
                      <h2 className="mb-2 text-lg font-display font-semibold leading-snug text-brand-black transition-colors group-hover:text-brand-orange">
                        {resource.title}
                      </h2>
                      <p className="flex-1 text-sm leading-relaxed text-gray-500">
                        {resource.description}
                      </p>

                      {/* "Open" indicator */}
                      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand-orange opacity-0 transition-opacity group-hover:opacity-100">
                        Open <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

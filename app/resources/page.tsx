import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { getAllResources, type ResourceType } from "@/lib/content/resources";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { MonoFilterRow, type FilterItem } from "@/components/site/MonoFilterRow";
import { ArrowRight, Wrench, FileText, ExternalLink } from "lucide-react";

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

const VALID_FILTER_TYPES: ResourceType[] = ["tool", "template", "checklist"];

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

const TYPE_FILTER_LABELS: Record<ResourceType, string> = {
  tool: "Tools",
  template: "Templates",
  checklist: "Checklists",
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

  const filtered = activeType
    ? allResources.filter((r) => r.type === activeType)
    : allResources;

  // Featured resources always appear first
  const visibleResources = [
    ...filtered.filter((r) => r.featured),
    ...filtered.filter((r) => !r.featured),
  ];

  // ALL plus one chip per type that has resources (the active type is always shown).
  const filterItems: FilterItem[] = [
    { label: "All", href: "/resources", active: !activeType },
    ...VALID_FILTER_TYPES.filter((t) => t === activeType || allResources.some((r) => r.type === t)).map((t) => ({
      label: TYPE_FILTER_LABELS[t],
      href: `/resources?type=${t}`,
      active: activeType === t,
    })),
  ];

  const title = activeType ? TYPE_FILTER_LABELS[activeType] : "Resources";

  return (
    <SiteShell>
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
          <PageHeader
            title={title}
            mark={title}
            seed={49}
            lede={
              activeType === "tool"
                ? "Interactive utilities to make your work easier."
                : activeType === "template"
                ? "Ready-made structures you can download and adapt to your own workflows."
                : activeType === "checklist"
                ? "Step-by-step checklists to help you decide what to automate first."
                : "Free tools and templates to help you work smarter and automate faster."
            }
          />

          <MonoFilterRow className="mt-10" label="Filter by type" items={filterItems} />

          {visibleResources.length === 0 ? (
            <div className="mt-12">
              <p className="calm-body">
                {activeType
                  ? `No ${TYPE_LABELS[activeType].toLowerCase()}s yet,  check back soon.`
                  : "Resources coming soon."}
              </p>
              {activeType && (
                <Link href="/resources" className="mt-4 inline-block font-bold underline underline-offset-4 hover:no-underline">
                  View all resources
                </Link>
              )}
            </div>
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {visibleResources.map((resource) => {
                const Icon = TYPE_ICONS[resource.type];
                const isExternal = !!(resource.external && resource.url && resource.url !== "#");
                const href = isExternal
                  ? resource.url
                  : `/resources/${resource.type}/${resource.slug}`;
                const body = (
                  <>
                    <div className="flex items-center justify-between gap-3">
                      <span className="gl-mono inline-flex items-center gap-2 text-ink/70">
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                        {TYPE_LABELS[resource.type]}
                      </span>
                      {resource.featured && <span className="gl-mono bg-ink px-2 py-1 text-sage">Featured</span>}
                    </div>

                    <h2 className="calm-h3 mt-4 underline-offset-4 group-hover:underline group-focus-visible:underline">{resource.title}</h2>
                    <p className="calm-body mt-3 flex-1 text-ink/75">{resource.description}</p>

                    <span className="mt-5 inline-flex items-center gap-2 font-bold">
                      {isExternal ? (
                        <>Visit site <ExternalLink className="h-3.5 w-3.5" aria-hidden /></>
                      ) : (
                        <>Open <ArrowRight className="h-3.5 w-3.5" aria-hidden /></>
                      )}
                    </span>
                  </>
                );
                const cardClass = `calm-card group flex h-full flex-col p-5 md:p-6 ${resource.featured ? "!border-ink/70" : ""}`;

                return (
                  <article key={`${resource.type}-${resource.slug}`} className="h-full">
                    {isExternal ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                        {body}
                      </a>
                    ) : (
                      <Link href={href} className={cardClass}>
                        {body}
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </SiteShell>
  );
}

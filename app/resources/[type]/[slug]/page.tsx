import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/seo";
import {
  getResource,
  getAllResources,
  type ResourceType,
} from "@/lib/content/resources";
import { SiteShell } from "@/components/site/SiteShell";
import { SectionLabel } from "@/components/site/SectionLabel";
import { SketchButton } from "@/components/site/SketchButton";
import { ConsultCard } from "@/components/site/ConsultCard";
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

  return (
    <SiteShell>
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
          <Link
            href="/resources"
            className="gl-mono inline-block py-2 text-ink/70 underline-offset-4 hover:text-ink hover:underline focus-visible:underline"
          >
            ← Back to Resources
          </Link>

          <article className="mt-6">
            <SectionLabel className="mb-4">
              <span className="inline-flex items-center gap-2">
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {label}
              </span>
            </SectionLabel>

            <h1 className="sk-title">{resource.title}</h1>
            <p className="pg-lede mt-5">{resource.description}</p>

            {/* Interactive tool or fallback */}
            {resource.component ? (
              <div className="calm-card mt-10 overflow-hidden p-3 md:p-5">
                <div className="tool-zoom">
                  <ToolRenderer componentKey={resource.component} />
                </div>
              </div>
            ) : resource.url !== "#" ? (
              <div className="calm-card mt-10 max-w-[41rem] p-6">
                <SketchButton
                  href={resource.url}
                  {...(resource.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  variant="marker"
                  seed={16}
                  className="text-lg"
                >
                  <span className="inline-flex items-center gap-2">
                    {resource.external ? "Open Resource" : "Download"}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </SketchButton>
              </div>
            ) : (
              <div className="calm-card mt-10 max-w-[41rem] p-6">
                <p className="calm-body text-ink/75">
                  This resource is coming soon. Contact us if you&apos;d like
                  early access.
                </p>
              </div>
            )}
          </article>

          {/* booking CTA */}
          <ConsultCard
            heading={
              resource.type === "checklist"
                ? "Want help actually building these workflows?"
                : "Want more customised help?"
            }
            body={
              resource.type === "checklist"
                ? "If you’d like to talk through which of these workflows make the most sense for your business, you can request a free consultation and we’ll prioritise the first 2–3 together."
                : undefined
            }
            className="mt-12"
          />
        </div>
      </main>
    </SiteShell>
  );
}

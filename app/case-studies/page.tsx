import React from "react";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/seo";
import { getAllPosts } from "@/lib/content/blog";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import CaseStudyGrid from "@/components/case-studies/CaseStudyGrid";

export const metadata: Metadata = {
  ...generatePageMetadata(
    "Case Studies — Made with Make",
    "Real automation results for real service businesses. Before and after breakdowns of how we've helped founders and operators build smarter systems.",
    "case-studies",
    ["automation case study", "Make.com case study", "workflow automation results", "business automation examples"]
  ),
  alternates: {
    canonical: `${siteConfig.url}/case-studies`,
  },
};

export default function CaseStudiesPage() {
  const allPosts = getAllPosts();

  // Case studies are posts tagged with "case-study" OR categorised as "Case Study"
  const caseStudies = allPosts.filter(
    (p) =>
      p.category === "Case Study" ||
      p.tags.some((t) => t.toLowerCase() === "case-study" || t.toLowerCase() === "case study")
  );

  return (
    <SiteShell>
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
          <PageHeader
            label="Results"
            title="Case Studies"
            mark="Studies"
            seed={47}
            lede="Real automation builds, real before-and-after numbers. How we've helped service businesses stop doing manually what a system can do for them."
          />

          <div className="mt-10">
            {caseStudies.length === 0 ? (
              <p className="calm-body">Case studies coming soon. Check back shortly.</p>
            ) : (
              <CaseStudyGrid caseStudies={caseStudies} />
            )}
          </div>
        </div>
      </main>
    </SiteShell>
  );
}

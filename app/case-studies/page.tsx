import React from "react";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/seo";
import { getAllPosts } from "@/lib/content/blog";
import NavigationWrapper from "@/components/layout/NavigationWrapper";
import Footer from "@/components/layout/Footer";
import NewsletterSection from "@/components/sections/NewsletterSection";
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
    <div className="min-h-screen bg-brand-grey/10">
      <NavigationWrapper />
      <main className="pt-12 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Header */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-orange">
              Results
            </p>
            <h1 className="mb-3 text-4xl font-display font-semibold text-brand-black md:text-5xl">
              Case Studies
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
              Real automation builds, real before-and-after numbers. How we&apos;ve helped service businesses
              stop doing manually what a system can do for them.
            </p>
          </div>

          {caseStudies.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              Case studies coming soon. Check back shortly.
            </p>
          ) : (
            <CaseStudyGrid caseStudies={caseStudies} />
          )}
        </div>

        <div className="mt-16 -mx-6">
          <NewsletterSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

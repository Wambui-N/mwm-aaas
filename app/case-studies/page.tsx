import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/seo";
import { getAllPosts } from "@/lib/content/blog";
import NavigationWrapper from "@/components/layout/NavigationWrapper";
import Footer from "@/components/layout/Footer";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import NewsletterSection from "@/components/sections/NewsletterSection";

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
            <div className="grid gap-8 sm:grid-cols-2">
              {caseStudies.map((post) => (
                <article
                  key={post.slug}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-all hover:border-brand-grey hover:shadow-sm"
                >
                  <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
                    {post.image ? (
                      <div className="h-52 w-full overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                        />
                      </div>
                    ) : (
                      <div className="h-52 w-full bg-brand-grey/20" />
                    )}

                    <div className="flex flex-1 flex-col p-6">
                      <time
                        dateTime={post.date}
                        className="mb-3 block text-xs text-gray-400"
                      >
                        {format(new Date(post.date), "MMMM d, yyyy")}
                      </time>
                      <h2 className="mb-3 text-xl font-display font-semibold leading-snug text-brand-black transition-colors group-hover:text-brand-orange">
                        {post.title}
                      </h2>
                      <p className="flex-1 text-sm leading-relaxed text-gray-500">
                        {post.description}
                      </p>
                    </div>
                  </Link>

                  <div className="flex items-center justify-between px-6 pb-5">
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.filter((t) => t.toLowerCase() !== "case-study" && t.toLowerCase() !== "case study").slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full bg-brand-grey/30 text-brand-black"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="ml-auto flex items-center gap-1 text-xs font-medium text-brand-orange"
                    >
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
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

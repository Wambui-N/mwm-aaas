import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import {
  getAllResources,
  getResourcesByType,
  type ResourceType,
} from "@/lib/content/resources";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import NewsletterSection from "@/components/sections/NewsletterSection";
import { Calculator, FileCheck, ListChecks, ArrowRight } from "lucide-react";

export const metadata: Metadata = generatePageMetadata(
  "Resources - Made with Make",
  "Free tools, templates, and checklists to assess automation readiness and design better workflows.",
  "resources",
  [
    "automation tools",
    "ROI calculator",
    "webhook tester",
    "automation checklist",
    "workflow templates",
  ]
);

const sections: Array<{
  type: ResourceType;
  heading: string;
  description: string;
  icon: typeof Calculator;
}> = [
  {
    type: "tool",
    heading: "Tools",
    description: "Interactive utilities you can use right in the browser.",
    icon: Calculator,
  },
  {
    type: "template",
    heading: "Templates",
    description: "Ready-made structures you can download and adapt.",
    icon: FileCheck,
  },
  {
    type: "checklist",
    heading: "Checklists",
    description: "Step-by-step guides to keep your work on track.",
    icon: ListChecks,
  },
];

export default function ResourcesPage() {
  const allResources = getAllResources();
  const hasAny = allResources.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-12 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-brand-black mb-6">
              Resources
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Free tools, templates, and checklists to help you assess
              automation readiness and design better workflows.
            </p>
          </div>

          {hasAny ? (
            sections.map(({ type, heading, description, icon: Icon }) => {
              const items = getResourcesByType(type);
              if (items.length === 0) return null;
              return (
                <section key={type} className="mb-16">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-brand-grey/30 border border-brand-grey/60 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-brand-black" />
                    </div>
                    <h2 className="text-2xl font-display font-semibold text-brand-black">
                      {heading}
                    </h2>
                  </div>
                  <p className="text-gray-500 text-sm mb-6 ml-11">
                    {description}
                  </p>
                  <div className="grid gap-5 md:grid-cols-2">
                    {items.map((resource) => (
                      <Link
                        key={resource.slug}
                        href={`/resources/${resource.type}/${resource.slug}`}
                        className="group block border border-gray-100 rounded-xl p-6 hover:border-brand-grey hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-brand-grey/20 border border-brand-grey/40 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-grey/40 transition-colors">
                            <Icon className="w-5 h-5 text-brand-black" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-semibold text-brand-orange uppercase tracking-widest">
                              {type}
                            </span>
                            <h3 className="text-lg font-display font-semibold text-brand-black mt-0.5 mb-2 group-hover:text-brand-orange transition-colors">
                              {resource.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                              {resource.description}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-orange transition-colors flex-shrink-0 mt-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })
          ) : (
            <p className="text-gray-500">Resources coming soon.</p>
          )}
        </div>

        <div className="mt-24">
          <NewsletterSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

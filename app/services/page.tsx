import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { scorecardUrl, bookingUrl } from "@/lib/links";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Target, Zap, BarChart3, ArrowRight } from "lucide-react";

export const metadata: Metadata = generatePageMetadata(
  "Services - Made with Make",
  "Consulting, execution, and optimization for automation and AI. Process audits, Make.com workflows, AI integrations, and system scaling.",
  "services",
  ["automation consulting", "automation execution", "Make.com", "process audit", "workflow build"]
);

const services = [
  {
    id: "consulting",
    title: "Consulting",
    icon: Target,
    description:
      "We start with a deep dive into your operations to understand where automation will create real value.",
    deliverables: [
      "Process audit",
      "Automation opportunity assessment",
      "Architecture & tool selection",
      "Strategy and roadmap design",
    ],
  },
  {
    id: "execution",
    title: "Execution",
    icon: Zap,
    description:
      "We build, test, and deploy the systems—no handoffs, no waiting for someone else to implement.",
    deliverables: [
      "Make.com workflow build",
      "AI integrations",
      "API connections",
      "Process automation & QA",
    ],
  },
  {
    id: "optimization",
    title: "Optimization & Scaling",
    icon: BarChart3,
    description:
      "We refine what’s running, improve reliability, and help systems grow with your business.",
    deliverables: [
      "Monitoring & reliability",
      "Performance improvements",
      "System refinement",
      "Expansion as business grows",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-12 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-black mb-6">
              Services
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Strategy-led. Execution-driven. No handoffs. From insight to implementation.
            </p>
          </div>

          <div className="space-y-12 mb-20">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <section
                  key={service.id}
                  className="border border-gray-100 rounded-2xl p-8 md:p-10 bg-white hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-brand-black rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-semibold text-black mb-2">
                        {service.title}
                      </h2>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  <div className="pl-16">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                      Deliverables
                    </h3>
                    <ul className="space-y-2">
                      {service.deliverables.map((d, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <span className="w-1.5 h-1.5 bg-brand-black rounded-full" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              );
            })}
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 md:p-10 text-center border border-gray-100">
            <h2 className="text-2xl font-display font-semibold text-black mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Take the Automation Readiness Scorecard to see where you stand, or book a discovery call to discuss your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {scorecardUrl ? (
                <a
                  href={scorecardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-brand-orange text-white font-medium rounded-lg hover:bg-brand-orange/90 transition-colors"
                >
                  Take the Scorecard
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              ) : null}
              <Link
                href={bookingUrl}
                className="inline-flex items-center justify-center px-8 py-3 border border-brand-grey font-medium rounded-lg hover:border-brand-black text-brand-black transition-colors"
              >
                Book a Discovery Call
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

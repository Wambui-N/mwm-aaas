"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  excerpt: string;
  imageUrl: string;
  notionUrl: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "How One Consulting Firm Cut Proposal Writing Time by 50%",
    company: "Triple C Advisory",
    excerpt:
      "Triple C Advisory stopped wasting days on manual proposal writing and now generates comprehensive 15-page proposals in just 8 minutes.",
    imageUrl: "/tca.jpg",
    notionUrl: "https://www.papermark.com/view/cmegp1sug0001le044jkptz7z",
  },
  {
    id: "2",
    title: "How a Leadership Development Firm Cut Proposal Time From Hours to 2 Minutes",
    company: "Founder's Freedom",
    excerpt:
      "Founders Freedom cut proposal creation from hours to 2 minutes and stopped losing leads to forgotten follow-ups.",
    imageUrl: "/ff.jpg",
    notionUrl: "https://www.papermark.com/view/cmegqs5ty0008l804wci7bjb6",
  },
];

export default function CaseStudiesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -400 : 400,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-black mb-4">
            Case studies
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how our consulting and execution approach delivers results
          </p>
        </div>
        <div className="relative">
          {caseStudies.length > 3 && (
            <>
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-lg"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-lg"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </>
          )}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            tabIndex={0}
            aria-label="Case studies list"
          >
            {caseStudies.map((study) => (
              <a
                key={study.id}
                href={study.notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-80 bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer group"
              >
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={study.imageUrl}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-blue-600 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{study.company}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 h-16 overflow-hidden">
                    {study.excerpt}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3 group-hover:bg-blue-50 transition-colors">
                    <p className="text-sm font-medium text-black group-hover:text-blue-600">
                      Read full case study →
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

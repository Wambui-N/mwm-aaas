"use client";

import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { contentfulClient } from '@/lib/contentful';

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  description: string;
  category: string;
  imageUrl: string;
}

export default function CaseStudiesSection() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
          setError('Contentful environment variables are missing.');
          setLoading(false);
          return;
        }
        const response = await contentfulClient.getEntries({ content_type: 'blogPage' });
        const studies = response.items.map((item: any) => ({
          id: item.sys.id,
          title: item.fields.title || 'Untitled',
          company: item.fields.company || 'Unknown',
          description: item.fields.excerpt || 'No description.',
          category: item.fields.tags?.[0] || 'General',
          imageUrl: item.fields.image?.fields?.file?.url ? `https:${item.fields.image.fields.file.url}` : '/placeholder-case-1.jpg',
        }));
        setCaseStudies(studies);
      } catch (err: any) {
        setError('Failed to fetch case studies.');
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -400 : 400, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>Loading case studies...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (!caseStudies.length) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-black mb-4">
            Real results from real clients
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how automation has transformed businesses like yours
          </p>
        </div>
        <div className="relative">
          {caseStudies.length > 3 && (
            <>
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-lg"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => scroll('right')}
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
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            tabIndex={0}
            aria-label="Case studies list"
          >
            {caseStudies.map((study) => (
              <div
                key={study.id}
                className="flex-shrink-0 w-80 bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 transition-colors hover:shadow-lg"
              >
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <img src={study.imageUrl} alt={study.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {study.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {study.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {study.company}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 h-24 overflow-hidden">
                    {study.description}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-black">
                      Click to read more
                    </p>
                  </div>
                </div>
              </div>
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
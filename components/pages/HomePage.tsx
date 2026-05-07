'use client';

import React from 'react';
import Navigation, { type NavigationProps } from '@/components/layout/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import GrowthPainSection from '@/components/sections/GrowthPainSection';
import DeliveryProcessSection from '@/components/sections/DeliveryProcessSection';
import CaseStudyHighlightSection from '@/components/sections/CaseStudyHighlightSection';
import FounderSection from '@/components/sections/FounderSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import Footer from '@/components/layout/Footer';
import HomeConsultCtaSection from '@/components/sections/HomeConsultCtaSection';
import HomeAssessmentCtaSection from '@/components/sections/HomeAssessmentCtaSection';
import RightPlaceSection from '@/components/sections/RightPlaceSection';
import type { BlogPost } from '@/lib/content/blog';

type HomePageProps = NavigationProps & {
  caseStudyPosts?: BlogPost[];
};

export default function HomePage({ topTags = [], caseStudyPosts = [] }: HomePageProps) {
  return (
    <div className="min-h-screen bg-brand-grey/10">
      <Navigation topTags={topTags} />
      <HeroSection />
      <GrowthPainSection />
      <DeliveryProcessSection />
      <CaseStudyHighlightSection posts={caseStudyPosts} />
      <HomeAssessmentCtaSection />
      <RightPlaceSection />
      <TestimonialSection />
      <FounderSection />
      <HomeConsultCtaSection />
      <Footer />
    </div>
  );
}

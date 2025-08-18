'use client';

import React from 'react';
import Navigation from '@/components/layout/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import WhatsSlowingSection from '@/components/sections/WhatsSlowingSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import FounderSection from '@/components/sections/FounderSection';
import WhatToExpectSection from '@/components/sections/WhatToExpectSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import FinalCTASection from '@/components/sections/FinalCTASection';
import Footer from '@/components/layout/Footer';
import NewsletterSection from '../sections/NewsletterSection';
import { EnvTest } from '@/components/debug/EnvTest';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* {process.env.NODE_ENV === 'development' && <EnvTest />} */}
      <HeroSection />
      <TestimonialSection />
      <CaseStudiesSection />
      <WhatsSlowingSection />
      <HowItWorksSection />
      <WhyChooseSection />
      {/* <PricingSection /> */}
      <FinalCTASection />
      <WhatToExpectSection />
      <FAQSection />
      <FounderSection />
      <NewsletterSection />
      <Footer />

    </div>
  );
}
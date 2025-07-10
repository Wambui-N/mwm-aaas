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
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import FinalCTASection from '@/components/sections/FinalCTASection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <TestimonialSection />
      <WhatsSlowingSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <PricingSection />
      <FinalCTASection />
      <WhatToExpectSection />
      <FAQSection />
      <FounderSection />
      <Footer />
    </div>
  );
} 
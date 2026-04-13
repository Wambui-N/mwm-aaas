'use client';

import React from 'react';
import Navigation, { type NavigationProps } from '@/components/layout/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import GrowthPainSection from '@/components/sections/GrowthPainSection';
import DeliveryProcessSection from '@/components/sections/DeliveryProcessSection';
import ProspectFitSection from '@/components/sections/ProspectFitSection';
import AboutSnapshotSection from '@/components/sections/AboutSnapshotSection';
import PositioningStripSection from '@/components/sections/PositioningStripSection';
import WhatsSlowingSection from '@/components/sections/WhatsSlowingSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import FounderSection from '@/components/sections/FounderSection';
import WhatToExpectSection from '@/components/sections/WhatToExpectSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import Footer from '@/components/layout/Footer';
import HomeConsultCtaSection from '@/components/sections/HomeConsultCtaSection';
import HomeAssessmentCtaSection from '@/components/sections/HomeAssessmentCtaSection';
import RightPlaceSection from '@/components/sections/RightPlaceSection';
import FinalCTASection from '@/components/sections/FinalCTASection';
import Shelfcue from '../sections/shelfcue';
import { EnvTest } from '@/components/debug/EnvTest';

export default function HomePage({ topTags = [] }: NavigationProps) {
  return (
    <div className="min-h-screen bg-brand-grey/10">
      <Navigation topTags={topTags} />
      {/* {process.env.NODE_ENV === 'development' && <EnvTest />} */}
      <HeroSection />
      <GrowthPainSection />
      <DeliveryProcessSection />
      {/* <ProspectFitSection /> */}
      <HomeAssessmentCtaSection />
      <RightPlaceSection />
      <TestimonialSection />
      <FounderSection />
      <HomeConsultCtaSection />
      <Footer />
      {/* <FinalCTASection /> */}
      {/* <AboutSnapshotSection /> */}
      {/* <CaseStudiesSection /> */}
      {/* <PositioningStripSection /> */}
      {/* <WhatsSlowingSection /> */}
      {/* <HowItWorksSection /> */}
      {/* <WhyChooseSection /> */}
      {/* <PricingSection />  */}
      {/* <Shelfcue />  */}
      {/* <WhatToExpectSection /> */}
      {/* <FAQSection /> */}
    </div>
  );
}

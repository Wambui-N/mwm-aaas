'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const features = [
  "Unlimited automation requests",
  "One automation at a time", 
  "Average 48-72hr delivery",
  "Unlimited revisions",
  "Full lifecycle management",
  "24/7 monitoring & support",
  "Pause or cancel anytime",
  "No contracts or commitments"
];

export default function PricingSection() {
  const scrollToBookCall = () => {
    const element = document.getElementById('book-call');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Made with Make Automations",
            "description": "Custom automation service for busy founders. Subscription with unlimited requests.",
            "brand": {
              "@type": "Brand",
              "name": "Made with Make"
            },
            "offers": {
              "@type": "Offer",
              "price": "620",
              "priceCurrency": "USD",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": "620",
                "priceCurrency": "USD",
                "billingIncrement": "P1M",
                "description": "Monthly subscription"
              },
              "availability": "https://schema.org/InStock",
              "url": "https://madewithmake.com"
            },
            "category": "Business Automation Service",
            "features": [
              "Unlimited automation requests",
              "One automation at a time",
              "Average 48-72hr delivery",
              "Unlimited revisions",
              "Full lifecycle management",
              "24/7 monitoring & support",
              "Pause or cancel anytime",
              "No contracts or commitments"
            ]
          })
        }}
      />
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-black mb-4">
            One subscription. Zero headaches.
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Simple, transparent pricing that scales with your ambitions
          </p>

          <motion.div whileHover={{ y: -4 }}>
            <Card className="p-8 border-2 border-gray-100 hover:border-gray-200 transition-colors bg-white">
              <CardContent className="p-0">
                <div className="mb-8">
                  <div className="mb-2">
                    <div className="text-2xl text-gray-400 line-through mb-1">$1,792</div>
                    <div className="text-5xl font-bold text-black">$896</div>
                    <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mt-2">
                      50% OFF - Limited Time
                    </div>
                  </div>
                  <div className="text-gray-600">per month</div>
                  <div className="text-sm text-gray-500 mt-3 italic">
                    I only work with up to 5 clients at any given time to ensure each receives exceptional attention and results.
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={scrollToBookCall}
                    className="w-full bg-black hover:bg-gray-800 text-white py-3 mb-8"
                  >
                    Start with discovery call
                  </Button>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-4 text-left">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 
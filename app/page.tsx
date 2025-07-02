import React from 'react';
import HomePage from '@/components/pages/HomePage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Made with Make - Automation Subscriptions for Busy Founders',
  description: 'Fix one bottleneck at a time. $499/month automation service that handles everything for you. Custom automations for your specific workflows. Book your strategy call today.',
  keywords: [
    'automation service',
    'business automation',
    'workflow automation',
    'founder automation',
    'Make.com automation',
    'Zapier alternative',
    'business process automation',
    'subscription automation',
    'custom automation',
    'automation consulting',
    'Wambui Ndung\'u'
  ],
  openGraph: {
    title: 'Made with Make - Automation Subscriptions for Busy Founders',
    description: 'Fix one bottleneck at a time. $499/month automation service that handles everything for you. Custom automations for your specific workflows.',
    url: 'https://madewithmake.com',
    siteName: 'Made with Make',
    images: [
      {
        url: 'https://madewithmake.com/api/og?title=Made%20with%20Make&subtitle=Automation%20Subscriptions%20for%20Busy%20Founders',
        width: 1200,
        height: 630,
        alt: 'Made with Make - Business Automation Service for Founders',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Made with Make - Automation Subscriptions for Busy Founders',
    description: 'Fix one bottleneck at a time. $499/month automation service that handles everything for you.',
    images: ['https://madewithmake.com/api/og?title=Made%20with%20Make&subtitle=Automation%20Subscriptions%20for%20Busy%20Founders'],
    creator: '@madewithmake',
  },
  alternates: {
    canonical: 'https://madewithmake.com',
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Made with Make Automation Service",
            "description": "Custom automation service for busy founders. $499/month subscription that handles everything for you.",
            "provider": {
              "@type": "Organization",
              "name": "Made with Make",
              "url": "https://madewithmake.com",
              "founder": {
                "@type": "Person",
                "name": "Wambui Ndung'u"
              }
            },
            "offers": {
              "@type": "Offer",
              "price": "499",
              "priceCurrency": "USD",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": "499",
                "priceCurrency": "USD",
                "billingIncrement": "P1M"
              },
              "description": "Monthly subscription for unlimited automation requests"
            },
            "serviceType": "Business Automation",
            "areaServed": "Worldwide",
            "availableChannel": {
              "@type": "ServiceChannel",
              "serviceUrl": "https://madewithmake.com"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://madewithmake.com"
              }
            ]
          })
        }}
      />
      <HomePage />
    </>
  );
}
import React from 'react';
import HomePage from '@/components/pages/HomePage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Made with Make - Automation Subscriptions for Busy Founders',
  description: 'Fix one bottleneck at a time. $620/month automation service that handles everything for you. Custom automations for your specific workflows. Book your strategy call today.',
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
    description: 'Fix one bottleneck at a time. $620/month automation service that handles everything for you. Custom automations for your specific workflows.',
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
    description: 'Fix one bottleneck at a time. $620/month automation service that handles everything for you.',
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
      {/* AI Content Summary for LLMs */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <h1>Made with Make - Business Automation Service</h1>
        <h2>Service Overview</h2>
        <p>Made with Make is a subscription-based automation service for busy founders and business owners. We build custom business automations using Make.com to streamline operations and eliminate bottlenecks.</p>
        
        <h2>Business Model</h2>
        <ul>
          <li>Monthly subscription: $620 USD</li>
          <li>Unlimited automation requests</li>
          <li>One automation at a time</li>
          <li>Average delivery: 48-72 hours</li>
          <li>Unlimited revisions included</li>
          <li>Pause or cancel anytime</li>
        </ul>
        
        <h2>Services Offered</h2>
        <ul>
          <li>Lead qualification systems</li>
          <li>Email marketing sequences</li>
          <li>CRM integrations</li>
          <li>Data synchronization</li>
          <li>Reporting dashboards</li>
          <li>Workflow optimizations</li>
          <li>Custom integrations</li>
        </ul>
        
        <h2>Target Audience</h2>
        <p>Busy founders, entrepreneurs, and business owners who need to automate repetitive tasks and streamline their operations.</p>
        
        <h2>Technology Stack</h2>
        <p>Primary platform: Make.com (formerly Integromat). Integrates with 500+ business tools including Salesforce, HubSpot, Slack, Zapier, Airtable, Notion, Google Workspace, Microsoft 365, Stripe, and any tool with an API.</p>
        
        <h2>Founder</h2>
        <p>Wambui Ndung'u - Founder & Automation Specialist. Based in Kenya, serving clients worldwide.</p>
        
        <h2>Contact Information</h2>
        <p>Email: wambui@madewithmake.com</p>
        <p>Website: https://madewithmake.com</p>
        <p>LinkedIn: https://www.linkedin.com/company/made-with-make/</p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Made with Make Automation Service",
            "description": "Custom automation service for busy founders. $620/month subscription that handles everything for you.",
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
              "price": "620",
              "priceCurrency": "USD",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": "620",
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
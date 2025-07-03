import { NextResponse } from 'next/server';

export async function GET() {
  const companyInfo = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Made with Make",
    "url": "https://madewithmake.com",
    "logo": "https://madewithmake.com/Vector.svg",
    "description": "Automation subscription service for busy founders. We build custom business automations using Make.com to streamline operations and eliminate bottlenecks.",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "Wambui Ndung'u",
      "jobTitle": "Founder & Automation Specialist",
      "description": "Founder of Made with Make, helping founders streamline operations through automation",
      "knowsAbout": [
        "Business Automation",
        "Workflow Optimization",
        "Make.com",
        "Process Automation",
        "Founder Operations"
      ]
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "wambui@madewithmake.com",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.linkedin.com/company/made-with-make/"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "KE"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 0,
        "longitude": 0
      },
      "geoRadius": "40075000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Automation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Business Automation",
            "description": "Tailored automation solutions for business processes"
          },
          "price": "620",
          "priceCurrency": "USD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "620",
            "priceCurrency": "USD",
            "billingIncrement": "P1M"
          }
        }
      ]
    },
    "keywords": "automation service, business automation, workflow automation, founder automation, Make.com automation, Zapier alternative",
    "category": "Business Services",
    "industry": "Technology Services",
    "businessModel": "subscription-service",
    "pricingModel": "monthly-subscription",
    "serviceDelivery": "digital-automation",
    "targetAudience": "founders, entrepreneurs, business owners",
    "geographicFocus": "worldwide",
    "services": [
      "Lead qualification systems",
      "Email marketing sequences", 
      "CRM integrations",
      "Data synchronization",
      "Reporting dashboards",
      "Workflow optimizations",
      "Custom integrations"
    ],
    "technologyStack": {
      "primary": "Make.com (formerly Integromat)",
      "integrations": [
        "Salesforce",
        "HubSpot", 
        "Slack",
        "Zapier",
        "Airtable",
        "Notion",
        "Google Workspace",
        "Microsoft 365",
        "Stripe",
        "Any tool with API"
      ]
    },
    "pricing": {
      "monthly": 620,
      "currency": "USD",
      "includes": [
        "Unlimited automation requests",
        "One automation at a time",
        "Average 48-72hr delivery",
        "Unlimited revisions",
        "Full lifecycle management",
        "24/7 monitoring & support",
        "Pause or cancel anytime",
        "No contracts or commitments"
      ]
    }
  };

  return NextResponse.json(companyInfo, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'public, max-age=3600'
    }
  });
} 
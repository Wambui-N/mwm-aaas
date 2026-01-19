import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const companyInfo = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Made with Make",
    "url": "https://madewithmake.com",
    "logo": "https://madewithmake.com/Vector.svg",
    "description": "Automation and AI consulting firm that combines strategy with execution. We help teams identify automation opportunities, design systems, and implement scalable workflows.",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "Wambui Ndung'u",
      "jobTitle": "Founder & Automation Consultant",
      "description": "Founder of Made with Make, providing automation consulting and implementation services",
      "knowsAbout": [
        "Automation Consulting",
        "Business Automation",
        "Workflow Optimization",
        "Make.com",
        "AI Integration",
        "Process Automation"
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
      "name": "Consulting & Implementation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automation Consulting",
            "description": "Process audits, opportunity assessment, architecture and tool selection, strategy and roadmap design"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automation Execution",
            "description": "Make.com workflows, AI integrations, API connections, process automation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Optimization & Scaling",
            "description": "Performance improvements, system refinement, business expansion support"
          }
        }
      ]
    },
    "keywords": "automation consulting, automation execution, business automation, AI consulting, workflow automation, Make.com automation, automation strategy",
    "category": "Business Services",
    "industry": "Technology Services",
    "businessModel": "consulting-and-execution",
    "serviceDelivery": "consulting, implementation, automation",
    "targetAudience": "founders, entrepreneurs, business owners, leadership teams",
    "geographicFocus": "worldwide",
    "services": [
      "Automation consulting",
      "Process audits",
      "Automation strategy and roadmap",
      "Make.com workflows", 
      "AI integrations",
      "API connections",
      "System design",
      "Performance optimization"
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
    "engagementModel": {
      "approach": "Consulting and execution combined",
      "phases": [
        "Discovery & Consulting",
        "Automation Strategy & Roadmap",
        "System Design",
        "Execution & Implementation",
        "Review & Handover"
      ],
      "description": "Each engagement is structured around your needs and may include a consulting phase, an implementation phase, and an optimization phase. Projects are scoped clearly and priced transparently."
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
import { Metadata } from 'next';

export const siteConfig = {
  name: 'Made with Make',
  description: 'Automation Subscriptions for Busy Founders',
  url: 'https://madewithmake.com',
  ogImage: 'https://madewithmake.com/api/og?title=Made%20with%20Make&subtitle=Automation%20Subscriptions%20for%20Busy%20Founders',
  links: {
    twitter: 'https://twitter.com/madewithmake',
    linkedin: 'https://www.linkedin.com/company/made-with-make/',
    // github: 'https://github.com/madewithmake',
  },
  contact: {
    email: 'wambui@madewithmake.com',
    phone: '+254-712137749', // Add your actual phone number
  },
  business: {
    founded: '2025',
    industry: 'Technology Services',
    category: 'Business Services',
    location: 'Kenya',
    timezone: 'Africa/Nairobi',
  },
  pricing: {
    monthly: 620,
    currency: 'USD',
    billingCycle: 'monthly',
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.description}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: 'Fix one bottleneck at a time. $620/month automation service that handles everything for you. Custom automations for your specific workflows.',
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
    'AI automation',
    'business process optimization',
    'workflow efficiency',
    'founder operations',
    'business scaling automation',
    'no-code automation',
    'business process improvement',
    'operational efficiency',
    'automation strategy',
    'business automation consulting',
  ],
  authors: [{ name: 'Wambui Ndung\'u' }],
  creator: 'Wambui Ndung\'u',
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    'ai-content-type': 'business-service',
    'ai-target-audience': 'founders, entrepreneurs, business owners',
    'ai-service-category': 'automation, business-processes, workflow-optimization',
    'ai-geographic-focus': 'worldwide',
    'ai-business-model': 'subscription-service',
    'ai-pricing-model': 'monthly-subscription',
    'ai-service-delivery': 'digital-automation',
    'ai-expertise': 'Make.com, workflow automation, business process optimization',
    'ai-industry': 'technology services, business consulting, automation',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.description}`,
    description: 'Fix one bottleneck at a time. $620/month automation service that handles everything for you. Custom automations for your specific workflows.',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Business Automation Service`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - ${siteConfig.description}`,
    description: 'Fix one bottleneck at a time. $620/month automation service that handles everything for you.',
    images: [siteConfig.ogImage],
    creator: '@madewithmake',
    site: '@madewithmake',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your actual verification codes
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: siteConfig.url,
  },
  category: 'business',
  classification: 'business services',
};

export const generateStructuredData = (type: 'organization' | 'service' | 'breadcrumb' | 'faq' | 'article') => {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "",
  };

  switch (type) {
    case 'organization':
      return {
        ...baseData,
        "@type": "Organization",
        "name": siteConfig.name,
        "url": siteConfig.url,
        "logo": `${siteConfig.url}/Vector.svg`,
        "description": "Automation subscription service for busy founders. We build custom business automations using Make.com to streamline operations and eliminate bottlenecks.",
        "foundingDate": siteConfig.business.founded,
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
          ],
          "url": `${siteConfig.url}/about`,
          "sameAs": [
            "https://www.linkedin.com/in/wambui-ndungu/",
            "https://twitter.com/madewithmake"
          ]
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": siteConfig.contact.email,
          "availableLanguage": "English"
        },
        "sameAs": [
          siteConfig.links.linkedin,
          siteConfig.links.twitter
        ],
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "KE",
          "addressLocality": "Nairobi",
          "addressRegion": "Nairobi"
        },
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": -1.2921,
            "longitude": 36.8219
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
              "price": siteConfig.pricing.monthly.toString(),
              "priceCurrency": siteConfig.pricing.currency,
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": siteConfig.pricing.monthly.toString(),
                "priceCurrency": siteConfig.pricing.currency,
                "billingIncrement": "P1M"
              }
            }
          ]
        },
        "keywords": "automation service, business automation, workflow automation, founder automation, Make.com automation, Zapier alternative",
        "category": siteConfig.business.category,
        "industry": siteConfig.business.industry
      };

    case 'service':
      return {
        ...baseData,
        "@type": "Service",
        "name": `${siteConfig.name} Automation Service`,
        "description": "Custom automation service for busy founders. $620/month subscription that handles everything for you.",
        "provider": {
          "@type": "Organization",
          "name": siteConfig.name,
          "url": siteConfig.url,
          "founder": {
            "@type": "Person",
            "name": "Wambui Ndung'u"
          }
        },
        "offers": {
          "@type": "Offer",
          "price": siteConfig.pricing.monthly.toString(),
          "priceCurrency": siteConfig.pricing.currency,
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": siteConfig.pricing.monthly.toString(),
            "priceCurrency": siteConfig.pricing.currency,
            "billingIncrement": "P1M"
          },
          "description": "Monthly subscription for unlimited automation requests"
        },
        "serviceType": "Business Automation",
        "areaServed": "Worldwide",
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": siteConfig.url
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Automation Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Lead Qualification Automation",
                "description": "Automated lead scoring and qualification systems"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Email Marketing Automation",
                "description": "Automated email sequences and drip campaigns"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "CRM Integration",
                "description": "Seamless integration between business tools"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Data Synchronization",
                "description": "Real-time data sync across platforms"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Reporting Dashboards",
                "description": "Automated reporting and analytics"
              }
            }
          ]
        }
      };

    case 'breadcrumb':
      return {
        ...baseData,
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteConfig.url
          }
        ]
      };

    case 'faq':
      return {
        ...baseData,
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Made with Make?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Made with Make is a subscription-based automation service for busy founders. We build custom business automations using Make.com to streamline operations and eliminate bottlenecks."
            }
          },
          {
            "@type": "Question",
            "name": "How much does the service cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our service costs $620 USD per month for unlimited automation requests, with one automation delivered at a time within 48-72 hours."
            }
          },
          {
            "@type": "Question",
            "name": "What tools do you integrate with?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We primarily use Make.com which integrates with 500+ business tools including Salesforce, HubSpot, Slack, Airtable, Notion, Google Workspace, Microsoft 365, Stripe, and any tool with an API."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to get an automation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We typically deliver automations within 48-72 hours, with unlimited revisions included in your subscription."
            }
          },
          {
            "@type": "Question",
            "name": "Can I pause or cancel my subscription?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can pause or cancel your subscription at any time with no long-term commitments required."
            }
          }
        ]
      };

    default:
      return baseData;
  }
};

export const generatePageMetadata = (
  title: string,
  description: string,
  path: string = '',
  keywords: string[] = []
): Metadata => {
  const url = path ? `${siteConfig.url}/${path}` : siteConfig.url;
  
  return {
    title,
    description,
    keywords: [
      ...((Array.isArray(defaultMetadata.keywords) ? defaultMetadata.keywords : [defaultMetadata.keywords!]) as string[]),
      ...keywords,
    ],
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}; 
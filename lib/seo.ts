import { Metadata } from 'next';

export const siteConfig = {
  name: 'Made with Make',
  description: 'Automation & AI Consulting , with Execution',
  url: 'https://madewithmake.com',
  ogImage: 'https://madewithmake.com/api/og?title=Made%20with%20Make&subtitle=Automation%20%26%20AI%20Consulting%20%E2%80%94%20with%20Execution',
  links: {
    twitter: 'https://twitter.com/madewithmake',
    linkedin: 'https://www.linkedin.com/company/made-with-make/',
    // github: 'https://github.com/madewithmake',
  },
  contact: {
    email: 'wambui@madewithmake.com',
    phone: '+254-712137749',
  },
  business: {
    founded: '2025',
    industry: 'Technology Services',
    category: 'Business Services',
    location: 'Kenya',
    timezone: 'Africa/Nairobi',
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.description}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: 'We consult and execute automation solutions that work. From identifying opportunities to implementing scalable AI-powered workflows , end to end.',
  keywords: [
    'automation consulting',
    'automation execution',
    'business automation',
    'AI consulting',
    'workflow automation',
    'automation implementation',
    'Make.com automation',
    'process automation',
    'automation strategy',
    'automation roadmap',
    'custom automation',
    'AI integration',
    'business process optimization',
    'workflow efficiency',
    'operational efficiency',
    'automation services',
    'consulting and implementation',
    'automation consulting services',
    'business process consulting',
    'automation strategy consulting',
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
    'ai-target-audience': 'founders, entrepreneurs, business owners, leadership teams',
    'ai-service-category': 'automation-consulting, automation-implementation, business-processes, workflow-optimization',
    'ai-geographic-focus': 'worldwide',
    'ai-business-model': 'consulting-and-execution',
    'ai-service-delivery': 'consulting, implementation, automation',
    'ai-expertise': 'Make.com, workflow automation, AI integration, business process optimization, automation strategy',
    'ai-industry': 'technology services, business consulting, automation',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.description}`,
    description: 'We consult and execute automation solutions that work. From identifying opportunities to implementing scalable AI-powered workflows , end to end.',
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
    description: 'We consult and execute automation solutions that work. Strategy-led. Execution-driven. No handoffs.',
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
        "description": "Automation and AI consulting firm that combines strategy with execution. We help teams identify automation opportunities, design systems, and implement scalable workflows.",
        "foundingDate": siteConfig.business.founded,
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
          "name": "Automation Consulting & Execution Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Automation Consulting",
                "description": "Process audits, opportunity assessment, strategy and roadmap design"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Automation Execution",
                "description": "Implementation of Make.com workflows, AI integrations, and custom automations"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Optimization & Scaling",
                "description": "Performance improvements and system refinement"
              }
            }
          ]
        },
        "keywords": "automation consulting, automation execution, business automation, AI consulting, workflow automation, Make.com automation, automation strategy",
        "category": siteConfig.business.category,
        "industry": siteConfig.business.industry
      };

    case 'service':
      return {
        ...baseData,
        "@type": "Service",
        "name": `${siteConfig.name} Automation Consulting & Execution`,
        "description": "Automation and AI consulting combined with hands-on execution. From insight to implementation.",
        "provider": {
          "@type": "Organization",
          "name": siteConfig.name,
          "url": siteConfig.url,
          "founder": {
            "@type": "Person",
            "name": "Wambui Ndung'u"
          }
        },
        "serviceType": "Business Automation Consulting",
        "areaServed": "Worldwide",
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": siteConfig.url
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
                "name": "System Design",
                "description": "Workflow design, integration architecture, data flow planning"
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
              "text": "Made with Make is an automation and AI consulting firm that combines strategy with execution. We help teams identify what to automate, design the right systems, and implement scalable workflows end to end."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between consulting and execution?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Consulting includes process audits, opportunity assessment, and strategy design. Execution means we actually build, test, and deploy the systems ourselves. We do both , from insight to implementation."
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
            "name": "How are engagements structured?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each engagement is tailored to your needs. Typically, there's a consulting phase (discovery and strategy), an implementation phase (building and deploying), and an optimization phase (refinement). Projects are scoped clearly and priced transparently."
            }
          },
          {
            "@type": "Question",
            "name": "Do you provide strategy only or implementation too?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We provide both. Unlike traditional consultants, we own the execution. We don't hand you a deck and disappear , we build, test, and deploy the systems ourselves."
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
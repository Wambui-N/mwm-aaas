import { generateStructuredData } from '@/lib/seo';

interface JsonLdProps {
  type: 'organization' | 'service' | 'breadcrumb' | 'faq' | 'article';
  data?: Record<string, any>;
}

export function JsonLd({ type, data }: JsonLdProps) {
  const structuredData = data || generateStructuredData(type);
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

export function OrganizationJsonLd() {
  return <JsonLd type="organization" />;
}

export function ServiceJsonLd() {
  return <JsonLd type="service" />;
}

export function BreadcrumbJsonLd() {
  return <JsonLd type="breadcrumb" />;
}

export function FAQJsonLd() {
  return <JsonLd type="faq" />;
}

export function ArticleJsonLd({ 
  title, 
  description, 
  author, 
  datePublished, 
  dateModified, 
  image 
}: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "publisher": {
      "@type": "Organization",
      "name": "Made with Make",
      "logo": {
        "@type": "ImageObject",
        "url": "https://madewithmake.com/Vector.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://madewithmake.com"
    },
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": image
      }
    })
  };

  return <JsonLd type="article" data={articleData} />;
} 
import './globals.css';
import type { Metadata } from 'next';
import { satoshi, cormorantGaramond } from '../fonts/fonts';

export const metadata: Metadata = {
  metadataBase: new URL('https://madewithmake.com'),
  title: {
    default: 'Made with Make - Automation Subscriptions for Busy Founders',
    template: '%s | Made with Make'
  },
  description: 'Fix one bottleneck at a time. $499/month automation service that handles everything for you. Custom automations for your specific workflows.',
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
    'automation consulting'
  ],
  authors: [{ name: 'Wambui Ndung\'u' }],
  creator: 'Wambui Ndung\'u',
  publisher: 'Made with Make',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://madewithmake.com',
    siteName: 'Made with Make',
    title: 'Made with Make - Automation Subscriptions for Busy Founders',
    description: 'Fix one bottleneck at a time. $499/month automation service that handles everything for you. Custom automations for your specific workflows.',
    images: [
      {
        url: 'https://madewithmake.com/api/og?title=Made%20with%20Make&subtitle=Automation%20Subscriptions%20for%20Busy%20Founders',
        width: 1200,
        height: 630,
        alt: 'Made with Make - Business Automation Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Made with Make - Automation Subscriptions for Busy Founders',
    description: 'Fix one bottleneck at a time. $499/month automation service that handles everything for you.',
    images: ['https://madewithmake.com/api/og?title=Made%20with%20Make&subtitle=Automation%20Subscriptions%20for%20Busy%20Founders'],
    creator: '@madewithmake',
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://madewithmake.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Made with Make",
              "url": "https://madewithmake.com",
              "logo": "https://madewithmake.com/Vector.svg",
              "description": "Automation subscription service for busy founders",
              "foundingDate": "2024",
              "founder": {
                "@type": "Person",
                "name": "Wambui Ndung'u"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "wambui@madewithmake.com"
              },
              "sameAs": [
                "https://www.linkedin.com/company/made-with-make/"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "KE"
              }
            })
          }}
        />
      </head>
      <body className={`${satoshi.variable} ${cormorantGaramond.variable} font-sans`}>{children}</body>
    </html>
  );
}
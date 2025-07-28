import "./globals.css";
import type { Metadata } from "next";
import { satoshi, cormorantGaramond } from "../fonts/fonts";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/next';
import { defaultMetadata, generateStructuredData } from '@/lib/seo';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* MailerLite Universal */}
        <script
  dangerouslySetInnerHTML={{
    __html: `
      (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);};
      l=d.createElement(e);l.async=1;l.src=u;
      n=d.getElementsByTagName(e)[0];n.parentNode.insertBefore(l,n);
      })(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
      ml('account', '1316698');
    `,
  }}
></script>
{/* End MailerLite Universal */}
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VEZ9LJV6X5"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VEZ9LJV6X5');
            `,
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />

        {/* Enhanced Structured Data for AI/LLM Understanding */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData('organization')),
          }}
        />
      </head>
      <body
        className={`${satoshi.variable} ${cormorantGaramond.variable} font-sans`}
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

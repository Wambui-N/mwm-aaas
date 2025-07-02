import './globals.css';
import type { Metadata } from 'next';
import { satoshi, cormorantGaramond } from '../fonts/fonts';

export const metadata: Metadata = {
  title: 'Made with Make - Automation Subscriptions for Busy Founders',
  description: 'Fix one bottleneck at a time. $499/month automation service that handles everything for you.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} ${cormorantGaramond.variable} font-sans`}>{children}</body>
    </html>
  );
}
import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import NavigationWrapper from '@/components/layout/NavigationWrapper';
import Footer from '@/components/layout/Footer';
import ContactPanel from '@/components/contact/ContactPanel';
import { Mail } from 'lucide-react';

export const metadata: Metadata = generatePageMetadata(
  'Contact Us - Made with Make',
  'Get a free consultation to see if automation is right for your business, or book a discovery call directly.',
  'contact-us',
  ['automation consultation', 'book a call', 'Made with Make', 'workflow audit']
);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-grey/10">
      <NavigationWrapper />

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-2 flex items-center gap-2 text-brand-orange">
          <Mail className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-widest">Get in touch</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-display font-medium text-brand-black leading-tight mb-4">
          Let&apos;s talk about your business
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
          Not sure if automation is right for you? The consultation is free. Fill the short form
          and we&apos;ll use our 30 minutes to figure that out together.
        </p>

        <ContactPanel />
      </main>

      <Footer />
    </div>
  );
}

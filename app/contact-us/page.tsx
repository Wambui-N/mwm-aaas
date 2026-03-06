import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import NavigationWrapper from '@/components/layout/NavigationWrapper';
import Footer from '@/components/layout/Footer';
import ContactPanel from '@/components/contact/ContactPanel';

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

      <main className="pt-12 pb-24">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-orange">
              Get in touch
            </p>
            <h1 className="mb-3 text-4xl font-display font-semibold text-brand-black md:text-5xl">
              Let&apos;s talk about your business
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
              Not sure if automation is right for you? The consultation is free. Fill the short
              form and we&apos;ll use our 30 minutes to figure that out together.
            </p>
          </div>

          {/* Contact options */}
          <div className="max-w-3xl mx-auto mt-10">
            <ContactPanel />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

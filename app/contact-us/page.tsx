import React from 'react';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { SiteShell } from '@/components/site/SiteShell';
import { PageHeader } from '@/components/site/PageHeader';
import ContactPanel from '@/components/contact/ContactPanel';

export const metadata: Metadata = generatePageMetadata(
  'Contact Us - Made with Make',
  'Book a free consultation to see if automation is right for your business, or book a discovery call directly.',
  'contact-us',
  ['automation consultation', 'book a call', 'Made with Make', 'workflow audit']
);

export default function ContactPage() {
  return (
    <SiteShell>
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
          <PageHeader
            label="Get in touch"
            title="Let's talk about your business"
            mark="business"
            seed={51}
            lede="Not sure if automation is right for you? The consultation is free. Fill the short form and we'll use our 30 minutes to figure that out together."
          />

          {/* Contact options */}
          <div className="mt-10 max-w-3xl">
            <ContactPanel />
          </div>
        </div>
      </main>
    </SiteShell>
  );
}

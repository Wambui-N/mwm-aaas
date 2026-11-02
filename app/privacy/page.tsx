import { SiteShell } from '@/components/site/SiteShell';

export const metadata = {
  title: 'Privacy Policy - Made with Make',
  description: 'Privacy policy for Made with Make consulting and automation services. Learn how we collect, use, and protect your information.',
  keywords: [
    'Made with Make privacy',
    'automation service privacy',
    'data protection',
    'privacy policy',
    'GDPR compliance',
    'automation service data protection',
    'business automation privacy'
  ],
  other: {
    'ai-content-type': 'legal-document',
    'ai-document-type': 'privacy-policy',
    'ai-business-context': 'automation-service',
  },
  openGraph: {
    title: 'Privacy Policy - Made with Make',
    description: 'Privacy policy for Made with Make Automations service.',
    url: 'https://madewithmake.com/privacy',
    images: [
      {
        url: 'https://madewithmake.com/api/og?title=Privacy%20Policy&subtitle=Made%20with%20Make%20Automation%20Service',
      },
    ],
  },
  alternates: {
    canonical: 'https://madewithmake.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://madewithmake.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Privacy Policy",
                "item": "https://madewithmake.com/privacy"
              }
            ]
          })
        }}
      />
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
          {/* Header */}
          <div className="mb-10">
            <h1 className="sk-title">
              Privacy Policy
            </h1>
            <p className="gl-mono mt-4 text-ink/60">
              Last Updated: July 2025
            </p>
          </div>

          {/* Content */}
          <div className="rd-prose">
            <div className="border border-ink/20 bg-sage/25 p-5 md:p-6">
              <p>
                Your privacy is important to us. Here's how we collect, use, and protect your information.
              </p>
            </div>

            <div className="space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className="!mt-0">
                  1. Information We Collect
                </h2>
                <p>
                  We may collect:
                </p>
                <ul className="!list-none !pl-0">
                  <li>• Your name and contact details</li>
                  <li>• Business information you share during calls or via forms</li>
                  <li>• Usage data (e.g. website interactions, form submissions)</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="!mt-0">
                  2. How We Use It
                </h2>
                <p>
                  We use your information to:
                </p>
                <ul className="!list-none !pl-0">
                  <li>• Provide and improve our services</li>
                  <li>• Communicate about your projects</li>
                  <li>• Send updates, invoices, or helpful resources</li>
                  <li>• Understand client needs and improve the experience</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="!mt-0">
                  3. Data Sharing
                </h2>
                <p>
                  We never sell your data. We only share it with:
                </p>
                <ul className="!list-none !pl-0">
                  <li>• Trusted service providers (e.g. Paystack, scheduling tools) for necessary operations</li>
                  <li>• Legal authorities if required by law</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="!mt-0">
                  4. Data Security
                </h2>
                <p>
                  We take data protection seriously and use secure platforms to manage client information.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="!mt-0">
                  5. Your Choices
                </h2>
                <p>
                  You can request to view, update, or delete your data at any time by contacting us at{' '}
                  <a href="mailto:wambui@madewithmake.com">
                    wambui@madewithmake.com
                  </a>
                  .
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="!mt-0">
                  6. Cookies
                </h2>
                <p>
                  We may use cookies or similar tools to understand how visitors interact with our site. You can disable cookies in your browser settings.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="!mt-0">
                  7. Changes to This Policy
                </h2>
                <p>
                  We may update this policy from time to time. We'll notify you of major updates by email.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="!mt-0">
                  8. Contact
                </h2>
                <p>
                  If you have questions about this policy, reach out to{' '}
                  <a href="mailto:wambui@madewithmake.com">
                    wambui@madewithmake.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}

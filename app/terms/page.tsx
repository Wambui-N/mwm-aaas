import { SiteShell } from '@/components/site/SiteShell';

export const metadata = {
  title: 'Terms & Conditions - Made with Make',
  description: 'Terms and conditions for Made with Make consulting and automation services. Learn about our engagement model, project scope, and client responsibilities.',
  keywords: [
    'Made with Make terms',
    'automation consulting terms',
    'automation service terms',
    'business automation terms',
    'service agreement',
    'consulting terms',
    'automation service legal',
    'business automation terms'
  ],
  other: {
    'ai-content-type': 'legal-document',
    'ai-document-type': 'terms-and-conditions',
    'ai-business-context': 'automation-service',
  },
  openGraph: {
    title: 'Terms & Conditions - Made with Make',
    description: 'Terms and conditions for Made with Make Automations service.',
    url: 'https://madewithmake.com/terms',
    images: [
      {
        url: 'https://madewithmake.com/api/og?title=Terms%20%26%20Conditions&subtitle=Made%20with%20Make%20Automation%20Service',
        width: 1200,
        height: 630,
        alt: 'Terms & Conditions - Made with Make',
      },
    ],
  },
  alternates: {
    canonical: 'https://madewithmake.com/terms',
  },
};

export default function TermsPage() {
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
                "name": "Terms & Conditions",
                "item": "https://madewithmake.com/terms"
              }
            ]
          })
        }}
      />
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
          {/* columns 3-10 of the grid, like posts */}
          <div className="cols-8 mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="sk-title">
              Terms & Conditions
            </h1>
            <p className="gl-mono mt-4 text-ink/60">
              Last Updated: July 2025
            </p>
          </div>

          {/* Content */}
          <div className="rd-prose">
            <div className="border border-ink/20 bg-sage/25 p-5 md:p-6">
              <p>
                Welcome to Made With Make. By engaging our consulting and automation services, you agree to the following terms:
              </p>
            </div>

            <div className="space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className="!mt-0">
                  1. Service Description
                </h2>
                <p>
                  We provide automation consulting and execution services. Our engagements combine strategic planning with hands-on implementation. Services include process audits, automation strategy, system design, implementation, and optimization. Each engagement is tailored to your specific needs and workflows.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="!mt-0">
                  2. Engagement Structure & Payments
                </h2>
                <ul className="!list-none !pl-0">
                  <li>• Engagements are scoped and priced transparently based on your specific needs.</li>
                  <li>• Each engagement may include consulting, implementation, and optimization phases.</li>
                  <li>• Payment terms and schedules will be agreed upon before work begins.</li>
                  <li>• All charges are non-refundable once work has commenced, unless otherwise agreed in writing.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="!mt-0">
                  3. Project Scope
                </h2>
                <ul className="!list-none !pl-0">
                  <li>• The scope of each engagement will be clearly defined and agreed upon before work begins.</li>
                  <li>• We provide automation consulting, strategy, design, and implementation services.</li>
                  <li>• We do not offer full software/app development, third-party tool tech support, or marketing services.</li>
                  <li>• Any work beyond the agreed scope may require a separate agreement or additional fees.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="!mt-0">
                  4. Client Responsibilities
                </h2>
                <ul className="!list-none !pl-0">
                  <li>• You agree to provide clear information, access to necessary tools, and timely feedback.</li>
                  <li>• Any delays in communication may impact delivery timelines.</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="!mt-0">
                  5. Intellectual Property
                </h2>
                <ul className="!list-none !pl-0">
                  <li>• You own the rights to all automations built for your business.</li>
                  <li>• We reserve the right to showcase anonymized examples for portfolio or marketing purposes unless you request otherwise in writing.</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="!mt-0">
                  6. Support & Optimization
                </h2>
                <ul className="!list-none !pl-0">
                  <li>• Support terms will be outlined in your engagement agreement.</li>
                  <li>• We can provide ongoing support, optimization, and scaling services under separate arrangements.</li>
                  <li>• Post-implementation refinements and adjustments may be included or arranged separately based on the engagement scope.</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="!mt-0">
                  7. Disclaimer
                </h2>
                <p>
                  While we strive to deliver high-quality, stable automations, we are not liable for any direct or indirect losses resulting from software bugs, third-party platform outages, or client misuse of automations.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="!mt-0">
                  8. Changes to Terms
                </h2>
                <p>
                  We may update these terms from time to time. Major changes will be communicated via email.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="!mt-0">
                  9. Contact
                </h2>
                <p>
                  For questions or concerns, reach out to{' '}
                  <a href="mailto:wambui@madewithmake.com">
                    wambui@madewithmake.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}

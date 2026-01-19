import { satoshi, cormorantGaramond } from '../../fonts/fonts';

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
    <div className="min-h-screen bg-white">
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
      {/* Simple Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg width="32" height="28" viewBox="0 0 539 468" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M219.95 185.773C195.606 227.866 6.57676 154.931 0.175575 172.583C-1.66719 177.432 10.8442 188.198 44.8869 207.498C80.9172 227.851 110.851 257.466 131.587 293.277C152.323 329.088 163.108 369.792 162.824 411.172C162.824 449.967 165.539 466.358 170.68 467.134C189.204 470.238 220.434 270.249 269.122 270.249C317.81 270.249 349.04 470.238 367.565 467.134C372.705 466.358 375.809 450.064 375.421 410.881C375.136 369.501 385.921 328.797 406.657 292.986C427.394 257.176 457.327 227.56 493.358 207.207C527.4 187.81 540.009 177.141 538.166 172.292C531.474 154.64 342.736 227.575 318.392 185.482C294.048 143.39 451.556 16.2389 439.626 1.20579C436.329 -2.7707 420.229 2.75759 386.768 22.737C351.048 43.7885 310.342 54.891 268.88 54.891C227.418 54.891 186.712 43.7885 150.991 22.737C117.434 3.33952 101.916 -2.47973 98.618 1.49676C86.6885 16.7238 243.905 143.584 219.95 185.773Z" fill="currentColor" className="text-black"/>
                </svg>
              </div>
              <span className="text-lg font-semibold">Made with Make</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/" className="text-gray-600 hover:text-black transition-colors text-sm">Home</a>
              <a href="/privacy" className="text-gray-600 hover:text-black transition-colors text-sm">Privacy</a>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className={`${cormorantGaramond.className} text-4xl md:text-5xl font-bold text-gray-900 mb-4`}>
              Terms & Conditions
            </h1>
            <p className="text-gray-600 text-lg">
              Last Updated: July 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Welcome to Made With Make. By engaging our consulting and automation services, you agree to the following terms:
              </p>
            </div>

            <div className="space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className={`${cormorantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                  1. Service Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We provide automation consulting and execution services. Our engagements combine strategic planning with hands-on implementation. Services include process audits, automation strategy, system design, implementation, and optimization. Each engagement is tailored to your specific needs and workflows.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className={`${cormorantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                  2. Engagement Structure & Payments
                </h2>
                <ul className="text-gray-700 leading-relaxed space-y-2">
                  <li>• Engagements are scoped and priced transparently based on your specific needs.</li>
                  <li>• Each engagement may include consulting, implementation, and optimization phases.</li>
                  <li>• Payment terms and schedules will be agreed upon before work begins.</li>
                  <li>• All charges are non-refundable once work has commenced, unless otherwise agreed in writing.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className={`${cormorantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                  3. Project Scope
                </h2>
                <ul className="text-gray-700 leading-relaxed space-y-2">
                  <li>• The scope of each engagement will be clearly defined and agreed upon before work begins.</li>
                  <li>• We provide automation consulting, strategy, design, and implementation services.</li>
                  <li>• We do not offer full software/app development, third-party tool tech support, or marketing services.</li>
                  <li>• Any work beyond the agreed scope may require a separate agreement or additional fees.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className={`${cormorantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                  4. Client Responsibilities
                </h2>
                <ul className="text-gray-700 leading-relaxed space-y-2">
                  <li>• You agree to provide clear information, access to necessary tools, and timely feedback.</li>
                  <li>• Any delays in communication may impact delivery timelines.</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className={`${cormorantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                  5. Intellectual Property
                </h2>
                <ul className="text-gray-700 leading-relaxed space-y-2">
                  <li>• You own the rights to all automations built for your business.</li>
                  <li>• We reserve the right to showcase anonymized examples for portfolio or marketing purposes unless you request otherwise in writing.</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className={`${cormorantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                  6. Support & Optimization
                </h2>
                <ul className="text-gray-700 leading-relaxed space-y-2">
                  <li>• Support terms will be outlined in your engagement agreement.</li>
                  <li>• We can provide ongoing support, optimization, and scaling services under separate arrangements.</li>
                  <li>• Post-implementation refinements and adjustments may be included or arranged separately based on the engagement scope.</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className={`${cormorantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                  7. Disclaimer
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  While we strive to deliver high-quality, stable automations, we are not liable for any direct or indirect losses resulting from software bugs, third-party platform outages, or client misuse of automations.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className={`${cormorantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                  8. Changes to Terms
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update these terms from time to time. Major changes will be communicated via email.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className={`${cormorantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                  9. Contact
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  For questions or concerns, reach out to{' '}
                  <a href="mailto:wambui@madewithmake.com" className="text-blue-600 hover:text-blue-800 underline">
                    wambui@madewithmake.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg width="32" height="28" viewBox="0 0 539 468" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M219.95 185.773C195.606 227.866 6.57676 154.931 0.175575 172.583C-1.66719 177.432 10.8442 188.198 44.8869 207.498C80.9172 227.851 110.851 257.466 131.587 293.277C152.323 329.088 163.108 369.792 162.824 411.172C162.824 449.967 165.539 466.358 170.68 467.134C189.204 470.238 220.434 270.249 269.122 270.249C317.81 270.249 349.04 470.238 367.565 467.134C372.705 466.358 375.809 450.064 375.421 410.881C375.136 369.501 385.921 328.797 406.657 292.986C427.394 257.176 457.327 227.56 493.358 207.207C527.4 187.81 540.009 177.141 538.166 172.292C531.474 154.64 342.736 227.575 318.392 185.482C294.048 143.39 451.556 16.2389 439.626 1.20579C436.329 -2.7707 420.229 2.75759 386.768 22.737C351.048 43.7885 310.342 54.891 268.88 54.891C227.418 54.891 186.712 43.7885 150.991 22.737C117.434 3.33952 101.916 -2.47973 98.618 1.49676C86.6885 16.7238 243.905 143.584 219.95 185.773Z" fill="currentColor" className="text-black"/>
                </svg>
              </div>
              <span className="text-lg font-semibold">Made with Make</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="/terms" className="text-gray-500 hover:text-black transition-colors text-sm">Terms</a>
              <a href="/privacy" className="text-gray-500 hover:text-black transition-colors text-sm">Privacy</a>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 Made with Make. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 
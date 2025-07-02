import { satoshi, cormorantGaramond } from '../../fonts/fonts';

export const metadata = {
  title: 'Privacy Policy - Made with Make',
  description: 'Privacy policy for Made with Make automation subscription service.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
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
              <a href="/terms" className="text-gray-600 hover:text-black transition-colors text-sm">Terms</a>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className={`${cormorantGaramond.className} text-4xl md:text-5xl font-bold text-gray-900 mb-4`}>
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-lg">
              Last Updated: July 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Your privacy is important to us. Here's how we collect, use, and protect your information.
              </p>
            </div>

            <div className="space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className={`${cormorantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                  1. Information We Collect
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We may collect:
                </p>
                <ul className="text-gray-700 leading-relaxed space-y-2 ml-6">
                  <li>• Your name and contact details</li>
                  <li>• Business information you share during calls or via forms</li>
                  <li>• Usage data (e.g. website interactions, form submissions)</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className={`${cormorantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                  2. How We Use It
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We use your information to:
                </p>
                <ul className="text-gray-700 leading-relaxed space-y-2 ml-6">
                  <li>• Provide and improve our services</li>
                  <li>• Communicate about your projects</li>
                  <li>• Send updates, invoices, or helpful resources</li>
                  <li>• Understand client needs and improve the experience</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className={`${cormorantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                  3. Data Sharing
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We never sell your data. We only share it with:
                </p>
                <ul className="text-gray-700 leading-relaxed space-y-2 ml-6">
                  <li>• Trusted service providers (e.g. Paystack, scheduling tools) for necessary operations</li>
                  <li>• Legal authorities if required by law</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className={`${cormorantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                  4. Data Security
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We take data protection seriously and use secure platforms to manage client information.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className={`${cormorantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                  5. Your Choices
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  You can request to view, update, or delete your data at any time by contacting us at{' '}
                  <a href="mailto:wambui@madewithmake.com" className="text-blue-600 hover:text-blue-800 underline">
                    wambui@madewithmake.com
                  </a>
                  .
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className={`${cormorantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                  6. Cookies
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We may use cookies or similar tools to understand how visitors interact with our site. You can disable cookies in your browser settings.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className={`${cormorantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                  7. Changes to This Policy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this policy from time to time. We'll notify you of major updates by email.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className={`${cormorantGaramond.className} text-2xl font-semibold text-gray-900 mb-4`}>
                  8. Contact
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have questions about this policy, reach out to{' '}
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
import { satoshi, cormorantGaramond } from '../fonts/fonts';
import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found - Made with Make',
  description: 'The page you are looking for could not be found. Return to Made with Make automation services.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://madewithmake.com/404',
  },
};

export default function NotFound() {
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
              <Link href="/" className="text-gray-600 hover:text-black transition-colors text-sm">Home</Link>
              <Link href="/terms" className="text-gray-600 hover:text-black transition-colors text-sm">Terms</Link>
              <Link href="/privacy" className="text-gray-600 hover:text-black transition-colors text-sm">Privacy</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className={`${cormorantGaramond.className} text-8xl md:text-9xl font-bold text-gray-200 mb-4`}>
              404
            </h1>
          </div>

          {/* Main Message */}
          <div className="mb-8">
            <h2 className={`${cormorantGaramond.className} text-3xl md:text-4xl font-semibold text-gray-900 mb-4`}>
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track to automating your business.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/"
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 inline-block"
            >
              Go Home
            </Link>
            <Link 
              href="mailto:wambui@madewithmake.com"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-3 rounded-lg font-medium transition-colors duration-200 inline-block"
            >
              Contact Us
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-gray-500 mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/terms" className="text-blue-600 hover:text-blue-800 underline">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
              </Link>
              <a href="mailto:wambui@madewithmake.com" className="text-blue-600 hover:text-blue-800 underline">
                Get Support
              </a>
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
              <Link href="/terms" className="text-gray-500 hover:text-black transition-colors text-sm">Terms</Link>
              <Link href="/privacy" className="text-gray-500 hover:text-black transition-colors text-sm">Privacy</Link>
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
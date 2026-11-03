import Link from 'next/link';
import { SiteShell } from '@/components/site/SiteShell';
import { SketchButton } from '@/components/site/SketchButton';

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
    // Native scrolling: this short page does not need smooth scroll.
    <SiteShell smoothScroll={false}>
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
          {/* 404 Number */}
          <h1 className="font-[family-name:var(--font-brule)] text-[clamp(6rem,18vw,12rem)] font-bold leading-none tracking-tight text-ink/[0.15]">
            404
          </h1>

          {/* Main Message */}
          <h2 className="sk-title mt-2">Page Not Found</h2>
          <p className="pg-lede mt-5">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track to automating your business.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
            <SketchButton href="/" variant="marker" seed={18} className="text-lg">
              Go Home
            </SketchButton>
            <a href="mailto:wambui@madewithmake.com" className="font-bold underline underline-offset-4 hover:no-underline">
              Contact Us
            </a>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 max-w-[41rem] border-t border-ink/25 pt-6">
            <p className="gl-mono text-ink/60">Looking for something specific?</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              <Link href="/terms" className="font-bold underline underline-offset-4 hover:no-underline">
                Terms &amp; Conditions
              </Link>
              <Link href="/privacy" className="font-bold underline underline-offset-4 hover:no-underline">
                Privacy Policy
              </Link>
              <a href="mailto:wambui@madewithmake.com" className="font-bold underline underline-offset-4 hover:no-underline">
                Get Support
              </a>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}

'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis } from 'lenis/react';

// Routes that have moved onto the shared shell (components/site) run their own scroll provider there.
// The assessment funnel is form-heavy, so it stays on native scroll.
const SHELL_PREFIXES = ['/assessment', '/blog', '/case-studies', '/resources'];

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // The shared shell (components/site/providers) runs its own Lenis instance, so "/" must not get a second one.
  if (pathname === '/' || SHELL_PREFIXES.some((p) => pathname?.startsWith(p))) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

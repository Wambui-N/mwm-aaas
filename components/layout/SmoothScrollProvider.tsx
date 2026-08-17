'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis } from 'lenis/react';

// The assessment funnel is form-heavy — eased scroll physics makes inputs feel
// laggy there, so it stays on native scroll.
const EXCLUDED_PREFIX = '/assessment';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith(EXCLUDED_PREFIX)) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

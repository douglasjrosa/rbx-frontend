'use client';

import { useEffect } from 'react';
import {
  SITE_NAVBAR_SELECTOR,
  syncNavbarHeightCssVar,
} from '@/lib/navbar-offset';

function readNavbarHeightPx(entry: ResizeObserverEntry): number {
  const blockSize = entry.borderBoxSize[0]?.blockSize;

  if (blockSize !== undefined) {
    return Math.round(blockSize);
  }

  return Math.round(entry.contentRect.height);
}

export default function NavbarHeightSync() {
  useEffect(() => {
    const navbar = document.querySelector<HTMLElement>(SITE_NAVBAR_SELECTOR);

    if (!navbar) {
      return;
    }

    syncNavbarHeightCssVar();

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      syncNavbarHeightCssVar(readNavbarHeightPx(entry));
    });

    observer.observe(navbar);

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}

'use client';

import { useEffect } from 'react';
import { scrollToSection } from '@/lib/scroll-to-section';
import { syncNavbarHeightCssVar } from '@/lib/navbar-offset';

export default function HashScrollHandler() {
  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    syncNavbarHeightCssVar();

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        scrollToSection(window.location.hash);
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

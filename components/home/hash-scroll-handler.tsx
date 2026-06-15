'use client';

import { useEffect } from 'react';
import { scrollToSection } from '@/lib/scroll-to-section';

export default function HashScrollHandler() {
  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      scrollToSection(window.location.hash);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

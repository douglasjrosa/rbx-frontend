'use client';

import { useEffect } from 'react';
import { scrollToSection } from '@/lib/scroll-to-section';
import { syncNavbarHeightCssVar } from '@/lib/navbar-offset';

const HASH_SCROLL_RETRY_MS = 100;
const HASH_SCROLL_MAX_ATTEMPTS = 40;

export default function HashScrollHandler() {
  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    syncNavbarHeightCssVar();

    let attempts = 0;
    let timerId = 0;

    const tryScroll = () => {
      attempts += 1;
      const targetId = window.location.hash.slice(1);
      const target = targetId ? document.getElementById(targetId) : null;

      if (target) {
        scrollToSection(window.location.hash);
        return;
      }

      if (attempts < HASH_SCROLL_MAX_ATTEMPTS) {
        timerId = window.setTimeout(tryScroll, HASH_SCROLL_RETRY_MS);
      }
    };

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(tryScroll);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timerId);
    };
  }, []);

  return null;
}

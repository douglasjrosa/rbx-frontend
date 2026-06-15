'use client';

import { useEffect } from 'react';
import { syncNavbarHeightCssVar } from '@/lib/navbar-offset';

export default function NavbarHeightSync() {
  useEffect(() => {
    const updateNavbarHeight = () => {
      syncNavbarHeightCssVar();
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);

    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  return null;
}

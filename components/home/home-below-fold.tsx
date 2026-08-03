'use client';

import dynamic from 'next/dynamic';
import type { HomePage } from '@/lib/content/types';

const HomeBelowFoldContent = dynamic(
  () => import('@/components/home/home-below-fold-content'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[280vh] w-full bg-white" aria-hidden />
    ),
  },
);

interface HomeBelowFoldProps {
  page: HomePage;
}

/**
 * Client-only below-fold home content so hero LCP is not competed with by
 * images and JS for sections outside the first viewport.
 */
export default function HomeBelowFold({ page }: HomeBelowFoldProps) {
  return <HomeBelowFoldContent page={page} />;
}

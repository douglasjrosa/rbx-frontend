import { Suspense } from 'react';
import AnalyticsPageView from '@/components/analytics/analytics-page-view';
import DeferredChrome from '@/components/deferred-chrome';
import Navbar from '@/components/elements/navbar';
import Footer from '@/components/elements/footer';
import NavbarHeightSync from '@/components/navbar-height-sync';

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={null}>
        <AnalyticsPageView />
      </Suspense>
      <div className="flex-1">
        <div className="fixed w-full z-50" data-site-navbar>
          <Navbar />
          <NavbarHeightSync />
        </div>
        <div className="relative z-10">{children}</div>
      </div>
      <Footer />
      <DeferredChrome />
    </div>
  );
}

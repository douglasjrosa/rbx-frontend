'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './elements/navbar';
import Footer from './elements/footer';
import NotificationBanner from './elements/notification-banner';
import WhatsAppButton from './elements/whatsapp-button';
import { siteConfig } from '@/content/site';

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const [bannerIsShown, setBannerIsShown] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    notificationBanner,
    whatsappImage,
    whatsappContacts,
    whatsappMsg,
  } = siteConfig;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="fixed w-full z-50">
          <Navbar />
        </div>
        <div className={isHome ? 'relative z-10' : 'relative z-10 pt-[72px]'}>
          {children}
        </div>
      </div>
      <Footer />
      {mounted && whatsappImage && whatsappContacts.length > 0 && (
        <WhatsAppButton
          media={whatsappImage}
          contatos={whatsappContacts}
          msg={whatsappMsg}
        />
      )}
      {mounted && notificationBanner && bannerIsShown && (
        <NotificationBanner
          data={notificationBanner}
          closeSelf={() => setBannerIsShown(false)}
        />
      )}
    </div>
  );
}

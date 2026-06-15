'use client';

import { useState, useEffect } from 'react';
import Navbar from './elements/navbar';
import NavbarHeightSync from './navbar-height-sync';
import Footer from './elements/footer';
import CookieConsentBanner from './elements/cookie-consent-banner';
import WhatsAppButton from './elements/whatsapp-button';
import { siteConfig } from '@/content/site';

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    cookieConsent,
    whatsappImage,
    whatsappPhone,
    whatsappMsg,
  } = siteConfig;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="fixed w-full z-50" data-site-navbar>
          <Navbar />
          <NavbarHeightSync />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </div>
      <Footer />
      {mounted && whatsappImage && whatsappPhone && (
        <WhatsAppButton
          media={whatsappImage}
          phone={whatsappPhone}
          message={whatsappMsg}
        />
      )}
      {mounted && cookieConsent && (
        <CookieConsentBanner data={cookieConsent} />
      )}
    </div>
  );
}

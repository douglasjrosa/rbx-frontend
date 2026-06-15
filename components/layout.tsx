'use client';

import { useState, useEffect } from 'react';
import Navbar from './elements/navbar';
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
    whatsappContacts,
    whatsappMsg,
  } = siteConfig;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="fixed w-full z-50">
          <Navbar />
        </div>
        <div className="relative z-10">
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
      {mounted && cookieConsent && (
        <CookieConsentBanner data={cookieConsent} />
      )}
    </div>
  );
}

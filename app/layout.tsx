import type { Metadata, Viewport } from 'next';
import SiteLayout from '@/components/layout';
import TrackingScripts, {
  GoogleTagManagerNoScript,
} from '@/components/analytics/tracking-scripts';
import HeadHints from '@/components/performance/head-hints';
import { siteConfig } from '@/content/site';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#8b572a',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ribermax.com.br'),
  title: {
    default: siteConfig.metadata.metaTitle,
    template: `%s | ${siteConfig.metaTitleSuffix}`,
  },
  description: siteConfig.metadata.metaDescription,
  manifest: '/manifest.json',
  openGraph: {
    title: siteConfig.metadata.metaTitle,
    description: siteConfig.metadata.metaDescription,
    siteName: siteConfig.metaTitleSuffix,
    locale: 'pt_BR',
    type: 'website',
    images: siteConfig.metadata.shareImage
      ? [{ url: siteConfig.metadata.shareImage.src }]
      : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.metadata.twitterUsername,
  },
  icons: {
    icon: siteConfig.favicon.src,
    apple: siteConfig.favicon.src,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadHints />
      </head>
      <body>
        <GoogleTagManagerNoScript />
        <TrackingScripts />
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}

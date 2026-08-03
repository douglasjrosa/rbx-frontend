import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';

const isDevelopment = process.env.NODE_ENV !== 'production';
const configDirectory = path.dirname(fileURLToPath(import.meta.url));
const emptyPolyfillPath = path.join(configDirectory, 'lib', 'empty-polyfill.js');

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    // React DevTools / Next.js turbopack need eval() in development only.
    ...(isDevelopment ? ["'unsafe-eval'"] : []),
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://static.cloudflareinsights.com',
    'https://vercel.live',
  ].join(' '),
  [
    "connect-src 'self'",
    'https://www.google-analytics.com',
    'https://analytics.google.com',
    'https://www.googletagmanager.com',
    'https://region1.google-analytics.com',
    'https://tagassistant.google.com',
    'https://static.cloudflareinsights.com',
    'https://cloudflareinsights.com',
    'https://vercel.live',
    'wss://vercel.live',
  ].join(' '),
  "img-src 'self' data: blob: https:",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  [
    'frame-src',
    'https://www.googletagmanager.com',
    'https://tagassistant.google.com',
    'https://www.google.com',
    'https://maps.google.com',
    'https://vercel.live',
  ].join(' '),
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    inlineCss: true,
    optimizePackageImports: ['react-icons'],
  },
  // Browserslist already targets modern engines; drop unconditional polyfills.
  turbopack: {
    resolveAlias: {
      'next/dist/build/polyfills/polyfill-module': './lib/empty-polyfill.js',
      '../build/polyfills/polyfill-module': './lib/empty-polyfill.js',
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'next/dist/build/polyfills/polyfill-module': emptyPolyfillPath,
      'next/dist/build/polyfills/polyfill-module.js': emptyPolyfillPath,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: CONTENT_SECURITY_POLICY,
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import type { Metadata, Viewport } from 'next';
import './globals.css';
import { site } from '@/lib/site';
import { Header, Footer } from '@/components/Chrome';
import { themeScript } from '@/components/ThemeToggle';
import { Analytics } from '@/components/Analytics';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – ${site.tagline}`, template: `%s` },
  description: site.description,
  applicationName: site.name,
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }], apple: '/icon-512.png' },
  manifest: '/manifest.webmanifest',
  ...(site.gscVerification ? { verification: { google: site.gscVerification } } : {}),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#fafaf7' }, { media: '(prefers-color-scheme: dark)', color: '#0e1113' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-3 focus:py-2 focus:text-white">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

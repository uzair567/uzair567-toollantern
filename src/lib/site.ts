// Central site configuration. All tracking / verification IDs come from
// environment variables so nothing sensitive is hard-coded. See SETUP.md.
export const site = {
  name: 'ToolLantern',
  tagline: 'Free online tools for everyday work',
  description:
    'Free online tools for everyday work: image converters, unit converters, business, home, energy and fitness calculators, and developer tools. No sign-up.',
  // Priority: explicit domain → Vercel production domain (set automatically at build) → fallback.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
    'https://toollantern.vercel.app'
  ).replace(/\/$/, ''),
  locale: 'en_US',
  twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '',
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || '',
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '',
};

export const absUrl = (path = '/') => `${site.url}${path.startsWith('/') ? path : `/${path}`}`;

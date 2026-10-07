// Central site configuration. All tracking / verification IDs come from
// environment variables so nothing sensitive is hard-coded. See SETUP.md.
export const site = {
  name: 'ToolLantern',
  tagline: 'Free online tools that solve everyday problems',
  description:
    'Free, fast online calculators and utilities for money, home projects, energy, developers and SEO. No sign-up, works on any device.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://toollantern.netlify.app').replace(/\/$/, ''),
  locale: 'en_US',
  twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '',
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || '',
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '',
};

export const absUrl = (path = '/') => `${site.url}${path.startsWith('/') ? path : `/${path}`}`;

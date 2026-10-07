import type { Metadata } from 'next';
import { site, absUrl } from './site';
import type { ToolContent } from './types';
import { categoryById } from './categories';
import { getTool, toolPath } from './tools';
import { seoOf } from './seo-data';

export function pageMeta({ title, description, path, noindex = false }: { title: string; description: string; path: string; noindex?: boolean }): Metadata {
  const url = absUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { type: 'website', url, title, description, siteName: site.name, locale: site.locale, images: [{ url: absUrl('/og.png'), width: 1200, height: 630, alt: site.name }] },
    twitter: { card: 'summary_large_image', title, description, images: [absUrl('/og.png')], ...(site.twitter ? { site: site.twitter } : {}) },
  };
}

export function toolCrumbs(t: ToolContent) {
  const cat = categoryById[t.category];
  const crumbs = [{ name: 'Home', href: '/' }, { name: cat.name, href: `/category/${cat.id}/` }];
  if (t.parent) { const p = getTool(t.parent)!; crumbs.push({ name: p.name, href: toolPath(p) }); }
  crumbs.push({ name: t.name, href: toolPath(t) });
  return crumbs;
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absUrl(c.href) })),
  };
}

const strip = (h: string) => h.replace(/<[^>]+>/g, '');

export function toolSchemas(t: ToolContent) {
  const url = absUrl(toolPath(t));
  const out: object[] = [
    {
      '@context': 'https://schema.org', '@type': 'WebApplication', name: t.name, url, description: seoOf(t.slug)?.metaDescription ?? t.description,
      applicationCategory: t.category === 'developer' ? 'DeveloperApplication' : t.category === 'business' ? 'BusinessApplication' : 'UtilitiesApplication',
      operatingSystem: 'Any (runs in the browser)', browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': `${site.url}/#organization` }, dateModified: t.updated,
    },
    breadcrumbSchema(toolCrumbs(t)),
  ];
  if (t.faqs.length) out.push({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: t.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: strip(f.a) } })),
  });
  return out;
}

export const siteSchemas = [
  { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${site.url}/#organization`, name: site.name, url: site.url, logo: absUrl('/icon-512.png') },
  {
    '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${site.url}/#website`, name: site.name, url: site.url,
    publisher: { '@id': `${site.url}/#organization` },
  },
];

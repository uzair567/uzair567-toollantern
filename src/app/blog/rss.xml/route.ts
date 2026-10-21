import { posts, postPath } from '@/lib/blog';
import { coverPath } from '@/lib/blog-meta';
import { site, absUrl } from '@/lib/site';

export const dynamic = 'force-static';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET() {
  const items = [...posts].sort((a, b) => b.published.localeCompare(a.published)).map((p) => `
    <item>
      <title>${esc(p.h1)}</title>
      <link>${absUrl(postPath(p))}</link>
      <guid isPermaLink="true">${absUrl(postPath(p))}</guid>
      <pubDate>${new Date(p.published + 'T09:00:00Z').toUTCString()}</pubDate>
      <description>${esc(p.summary)}</description>
      <enclosure url="${absUrl(coverPath(p))}" type="image/png" length="0"/>
    </item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} Blog</title>
    <link>${absUrl('/blog/')}</link>
    <atom:link href="${absUrl('/blog/rss.xml')}" rel="self" type="application/rss+xml"/>
    <description>Guides with worked examples, each paired with a free calculator.</description>
    <language>en</language>${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}

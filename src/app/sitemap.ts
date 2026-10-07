import type { MetadataRoute } from 'next';
import { tools, toolPath } from '@/lib/tools';
import { categories } from '@/lib/categories';
import { absUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = tools.map((t) => t.updated).sort().at(-1)!;
  return [
    { url: absUrl('/'), lastModified: latest, changeFrequency: 'weekly', priority: 1 },
    { url: absUrl('/all-tools/'), lastModified: latest, changeFrequency: 'weekly', priority: 0.6 },
    ...categories.map((c) => ({ url: absUrl(`/category/${c.id}/`), lastModified: latest, changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...tools.map((t) => ({ url: absUrl(toolPath(t)), lastModified: t.updated, changeFrequency: 'monthly' as const, priority: t.parent ? 0.7 : 0.9 })),
    ...['about', 'privacy', 'terms'].map((p) => ({ url: absUrl(`/${p}/`), lastModified: latest, changeFrequency: 'yearly' as const, priority: 0.2 })),
  ];
}

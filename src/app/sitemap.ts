import type { MetadataRoute } from 'next';
import { tools, toolPath } from '@/lib/tools';
import { categories } from '@/lib/categories';
import { seoOf } from '@/lib/seo-data';
import { absUrl } from '@/lib/site';
import { posts, postPath } from '@/lib/blog';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = tools.map((t) => t.updated).sort().at(-1)!;
  return [
    { url: absUrl('/'), lastModified: latest, changeFrequency: 'weekly', priority: 1 },
    { url: absUrl('/all-tools/'), lastModified: latest, changeFrequency: 'weekly', priority: 0.6 },
    ...categories.map((c) => ({ url: absUrl(`/category/${c.id}/`), lastModified: latest, changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...tools.map((t) => ({ url: absUrl(toolPath(t)), lastModified: t.updated, changeFrequency: 'monthly' as const, priority: ({ 1: 0.9, 2: 0.8, 3: 0.7, 4: 0.6 } as const)[seoOf(t.slug)?.priority ?? 3] })),
    { url: absUrl('/blog/'), lastModified: posts.map((p) => p.updated).sort().at(-1)!, changeFrequency: 'weekly', priority: 0.7 },
    ...posts.map((p) => ({ url: absUrl(postPath(p)), lastModified: p.updated, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...['about', 'privacy', 'terms'].map((p) => ({ url: absUrl(`/${p}/`), lastModified: latest, changeFrequency: 'yearly' as const, priority: 0.2 })),
  ];
}

import Link from '@/components/A';
import { pageMeta, breadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { posts, postPath } from '@/lib/blog';
import { absUrl } from '@/lib/site';
import { Icon } from '@/components/Icon';

export const metadata = pageMeta({
  title: 'ToolLantern Blog – Calculator Guides & How-Tos',
  description: 'Practical guides with worked examples: mulch and gravel quantities, appliance running costs, percentages and more — each paired with a free calculator.',
  path: '/blog/',
});

const crumbs = [{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog/' }];
const date = (d: string) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-6">
      <JsonLd data={[breadcrumbSchema(crumbs), {
        '@context': 'https://schema.org', '@type': 'Blog', name: 'ToolLantern Blog', url: absUrl('/blog/'),
        blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.h1, url: absUrl(postPath(p)), datePublished: p.published, dateModified: p.updated })),
      }]} />
      <header className="rounded-[26px] card p-6 sm:p-10">
        <Breadcrumbs items={crumbs} />
        <h1 className="display mt-2 text-4xl sm:text-5xl">Guides & how-tos</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">Straight answers with the working shown — then a free calculator to run your own numbers.</p>
      </header>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.slug} href={postPath(p)} className="group flex flex-col rounded-[24px] card p-6 transition hover:-translate-y-0.5">
            <p className="text-xs font-bold uppercase tracking-wide text-muted">{date(p.updated)}</p>
            <h2 className="mt-2 text-xl font-extrabold tracking-tight">{p.h1}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold">Read guide <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}

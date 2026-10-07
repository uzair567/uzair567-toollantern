import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, categoryById } from '@/lib/categories';
import { toolsInCategory, toolPath } from '@/lib/tools';
import { pageMeta, breadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { ToolCard, cardOf } from '@/components/ToolCard';
import { Icon } from '@/components/Icon';
import { absUrl } from '@/lib/site';
import type { CategoryId } from '@/lib/types';

type Params = { id: CategoryId };
export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ id: c.id }));

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const c = categoryById[(await params).id];
  if (!c) return {};
  return pageMeta({ title: `${c.name} – Free Online Tools | ToolLantern`, description: c.description, path: `/category/${c.id}/` });
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const c = categoryById[(await params).id];
  if (!c) notFound();
  const list = toolsInCategory(c.id);
  const crumbs = [{ name: 'Home', href: '/' }, { name: c.name, href: `/category/${c.id}/` }];
  return (
    <div className="mx-auto max-w-7xl px-4 pt-6">
      <JsonLd data={[breadcrumbSchema(crumbs), {
        '@context': 'https://schema.org', '@type': 'CollectionPage', name: c.name, description: c.description, url: absUrl(`/category/${c.id}/`),
        mainEntity: { '@type': 'ItemList', itemListElement: list.map((t, i) => ({ '@type': 'ListItem', position: i + 1, url: absUrl(toolPath(t)), name: t.name })) },
      }]} />
      <header className="relative overflow-hidden rounded-[26px] card p-6 sm:p-10">
        <div aria-hidden className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-70 blur-2xl ${c.tint}`} />
        <div className="relative">
          <Breadcrumbs items={crumbs} />
          <span className={`tile h-14 w-14 ${c.tint}`}><Icon name={c.icon} className="h-6 w-6" /></span>
          <h1 className="display mt-5 text-4xl sm:text-6xl">{c.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{c.description}</p>
          <p className="mt-5 chip">{list.length} free tools</p>
        </div>
      </header>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{list.map((t) => <ToolCard key={t.slug} tool={cardOf(t)} />)}</div>
      <nav aria-label="Other categories" className="mt-16">
        <h2 className="display mb-5 text-3xl">Other categories</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{categories.filter((x) => x.id !== c.id).map((x) => (
          <Link key={x.id} href={`/category/${x.id}/`} className="flex items-center gap-3 rounded-[24px] card p-4">
            <span className={`tile h-11 w-11 ${x.tint}`}><Icon name={x.icon} className="h-5 w-5" /></span><span className="font-bold">{x.short}</span>
          </Link>))}</div>
      </nav>
    </div>
  );
}

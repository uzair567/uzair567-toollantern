import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, categoryById } from '@/lib/categories';
import { toolsInCategory, toolPath } from '@/lib/tools';
import { pageMeta, breadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { ToolCard } from '@/components/ToolCard';
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
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <JsonLd data={[breadcrumbSchema(crumbs), {
        '@context': 'https://schema.org', '@type': 'CollectionPage', name: c.name, description: c.description, url: absUrl(`/category/${c.id}/`),
        mainEntity: { '@type': 'ItemList', itemListElement: list.map((t, i) => ({ '@type': 'ListItem', position: i + 1, url: absUrl(toolPath(t)), name: t.name })) },
      }]} />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.name}</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">{c.description}</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{list.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
      <nav aria-label="Other categories" className="mt-14">
        <h2 className="mb-3 text-lg font-bold">Other categories</h2>
        <div className="flex flex-wrap gap-2">{categories.filter((x) => x.id !== c.id).map((x) => <Link key={x.id} href={`/category/${x.id}/`} className="rounded-full surface px-3 py-1.5 text-sm hover:border-brand-500">{x.name}</Link>)}</div>
      </nav>
    </div>
  );
}

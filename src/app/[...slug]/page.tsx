import { notFound } from 'next/navigation';
import { tools, getTool, toolPath } from '@/lib/tools';
import { pageMeta } from '@/lib/seo';
import { seoOf } from '@/lib/seo-data';
import { ToolLayout } from '@/components/ToolLayout';

type Params = { slug: string[] };

export const dynamicParams = false;
export function generateStaticParams(): Params[] {
  return tools.map((t) => ({ slug: t.slug.split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const t = getTool(slug.join('/'));
  if (!t) return {};
  const seo = seoOf(t.slug);
  return pageMeta({ title: seo?.title ?? t.title, description: seo?.metaDescription ?? t.description, path: toolPath(t) });
}

export default async function ToolPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const t = getTool(slug.join('/'));
  if (!t) notFound();
  return <ToolLayout tool={t} />;
}

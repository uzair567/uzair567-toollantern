import { notFound } from 'next/navigation';
import { tools, getTool, toolPath } from '@/lib/tools';
import { pageMeta } from '@/lib/seo';
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
  return pageMeta({ title: t.title, description: t.description, path: toolPath(t) });
}

export default async function ToolPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const t = getTool(slug.join('/'));
  if (!t) notFound();
  return <ToolLayout tool={t} />;
}

import { notFound } from 'next/navigation';
import { tools, getTool, toolPath, engineOf } from '@/lib/tools';
import { pageMeta } from '@/lib/seo';
import { seoOf } from '@/lib/seo-data';
import { ToolWidget } from '@/components/ToolWidget';
import { absUrl } from '@/lib/site';

type Params = { slug: string[] };
export const dynamicParams = false;
export const generateStaticParams = (): Params[] => tools.map((t) => ({ slug: t.slug.split('/') }));

// Embeddable version of each tool, for other sites to place in an iframe. Not indexed; links back to the full page.
export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const t = getTool((await params).slug.join('/'));
  if (!t) return {};
  return { ...pageMeta({ title: `${t.name} (embed) | ToolLantern`, description: seoOf(t.slug)?.metaDescription ?? t.description, path: toolPath(t), noindex: true }) };
}

export default async function EmbedPage({ params }: { params: Promise<Params> }) {
  const t = getTool((await params).slug.join('/'));
  if (!t) notFound();
  return (
    <div className="mx-auto max-w-3xl p-3 sm:p-4">
      <div className="rounded-[22px] card p-4 sm:p-6">
        <h1 className="mb-4 text-xl font-extrabold tracking-tight">{seoOf(t.slug)?.h1 ?? t.name}</h1>
        <ToolWidget engine={engineOf(t)} defaults={t.defaults} />
        <p className="mt-4 text-right text-xs text-muted">
          Free calculator by <a href={absUrl(toolPath(t))} target="_blank" rel="noopener" className="font-bold text-[var(--ink)] underline decoration-glow decoration-2 underline-offset-2">ToolLantern</a>
        </p>
      </div>
    </div>
  );
}

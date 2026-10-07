import Link from 'next/link';
import type { ToolContent } from '@/lib/types';
import { categoryById } from '@/lib/categories';
import { Icon } from './Icon';

export type CardTool = Pick<ToolContent, 'slug' | 'name' | 'lead' | 'category'>;

export const cardOf = (t: ToolContent): CardTool => ({ slug: t.slug, name: t.name, lead: t.lead.split(/(?<=\.)\s/)[0], category: t.category });

export function ToolCard({ tool }: { tool: CardTool }) {
  const cat = categoryById[tool.category];
  return (
    <Link href={`/${tool.slug}/`} className="group relative flex gap-4 overflow-hidden rounded-xl card p-4 transition hover:border-[color-mix(in_srgb,var(--color-glow)_70%,transparent)] hover:shadow-[0_10px_30px_-18px_rgba(245,165,36,.9)]">
      <span className={`tile h-10 w-10 ${cat.tint}`}><Icon name={cat.icon} className="h-[18px] w-[18px]" /></span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 font-semibold leading-snug">{tool.name}<Icon name="arrow" className="h-3.5 w-3.5 -translate-x-1 text-brand-700 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 dark:text-glow" /></span>
        <span className="mt-1 line-clamp-2 block text-sm text-muted">{tool.lead}</span>
        <span className="mt-2 block text-[11px] font-bold uppercase tracking-[.12em] text-muted">{cat.short}</span>
      </span>
    </Link>
  );
}

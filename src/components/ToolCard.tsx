import Link from '@/components/A';
import type { ToolContent } from '@/lib/types';

export type CardTool = Pick<ToolContent, 'slug' | 'name' | 'lead' | 'category'>;
import { categoryById } from '@/lib/categories';
import { Icon } from './Icon';

export const cardOf = (t: ToolContent): CardTool => ({ slug: t.slug, name: t.name, lead: t.lead.split(/(?<=\.)\s/)[0], category: t.category });

export function ToolCard({ tool }: { tool: CardTool }) {
  const cat = categoryById[tool.category];
  return (
    <Link href={`/${tool.slug}/`} className="group relative flex flex-col gap-4 rounded-[24px] card p-5 transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(14,23,38,.18)]">
      <div className="flex items-start justify-between">
        <span className={`tile h-11 w-11 ${cat.tint}`}><Icon name={cat.icon} className="h-5 w-5" /></span>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition group-hover:rotate-45 group-hover:border-transparent group-hover:bg-ink group-hover:text-white"><Icon name="arrow-up-right" className="h-4 w-4" /></span>
      </div>
      <div>
        <p className="text-[1.05rem] font-bold leading-snug tracking-tight">{tool.name}</p>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{tool.lead}</p>
      </div>
      <p className="mt-auto text-xs font-semibold text-muted">{cat.short}</p>
    </Link>
  );
}

import Link from 'next/link';
import type { ToolContent } from '@/lib/types';
import { categoryById } from '@/lib/categories';
import { toolPath } from '@/lib/tools';
import { Icon } from './Icon';

export function ToolCard({ tool }: { tool: ToolContent }) {
  const cat = categoryById[tool.category];
  return (
    <Link href={toolPath(tool)} className="group flex flex-col gap-2 rounded-2xl surface p-4 transition hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-md">
      <span className="flex items-center gap-2 text-xs font-medium text-muted"><Icon name={cat.icon} className="h-4 w-4 text-brand-600 dark:text-brand-200" />{cat.short}</span>
      <span className="font-semibold leading-snug group-hover:text-brand-700 dark:group-hover:text-brand-200">{tool.name}</span>
      <span className="line-clamp-2 text-sm text-muted">{tool.lead}</span>
    </Link>
  );
}

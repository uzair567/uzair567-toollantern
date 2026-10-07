'use client';

import { useState } from 'react';
import { ToolCard, type CardTool } from './ToolCard';

export function ToolGrid({ tools, tabs }: { tools: CardTool[]; tabs: { id: string; label: string }[] }) {
  const [tab, setTab] = useState('all');
  const list = tab === 'all' ? tools : tools.filter((t) => t.category === tab);
  return (
    <div>
      <div role="tablist" aria-label="Filter tools" className="-mx-4 mb-6 flex gap-6 overflow-x-auto border-b border-line px-4">
        {[{ id: 'all', label: 'All' }, ...tabs].map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
            className={`-mb-px whitespace-nowrap border-b-2 py-3 text-sm font-semibold transition ${tab === t.id ? 'border-glow text-ink' : 'border-transparent text-muted hover:text-ink'}`}>{t.label}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{list.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
    </div>
  );
}

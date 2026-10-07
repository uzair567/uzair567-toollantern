'use client';

import { useState } from 'react';
import { ToolCard, type CardTool } from './ToolCard';

export function ToolGrid({ tools, tabs }: { tools: CardTool[]; tabs: { id: string; label: string }[] }) {
  const [tab, setTab] = useState('all');
  const list = tab === 'all' ? tools : tools.filter((t) => t.category === tab);
  return (
    <div>
      <div role="tablist" aria-label="Filter tools" className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1">
        {[{ id: 'all', label: 'All' }, ...tabs].map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${tab === t.id ? 'bg-ink text-white' : 'card hover:bg-[var(--surface-2)]'}`}>{t.label}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{list.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
    </div>
  );
}

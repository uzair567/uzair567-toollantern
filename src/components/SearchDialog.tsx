'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { rank, type SearchEntry } from '@/lib/search';
import { Icon } from './Icon';

const SUGGEST = ['jpg to png', 'compress image', 'profit margin', 'how much electricity does my ac use', 'kg to lbs', 'json formatter'];

export function SearchDialog({ open, onClose, index }: { open: boolean; onClose: () => void; index: SearchEntry[] }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = useMemo(() => (q.trim() ? rank(index, q) : []), [index, q]);

  useEffect(() => { if (open) { setQ(''); setActive(0); setTimeout(() => inputRef.current?.focus(), 10); } }, [open]);
  if (!open) return null;

  const go = (s: string) => { onClose(); router.push(`/${s}/`); };

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center p-3 pt-[10vh]" role="dialog" aria-modal="true" aria-label="Search tools">
      <div className="absolute inset-0 bg-ink/45 backdrop-blur-sm" onClick={onClose} />
      <div className="menu-in relative w-full max-w-xl overflow-hidden rounded-[28px] card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Icon name="search" className="h-5 w-5 text-muted" />
          <input
            ref={inputRef}
            className="h-16 flex-1 bg-transparent text-lg font-medium outline-none placeholder:text-[var(--muted)]"
            placeholder="What do you need to calculate, convert or check?"
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
              if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
              if (e.key === 'Enter' && results[active]) go(results[active].s);
              if (e.key === 'Escape') onClose();
            }}
            role="combobox" aria-expanded={results.length > 0} aria-controls="search-results"
            aria-activedescendant={results.length ? `sr-${active}` : undefined}
          />
          <kbd className="rounded-md surface-2 px-2 py-1 text-[11px] font-semibold text-muted">Esc</kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!q.trim() ? (
            <div className="p-3">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">Try</p>
              <div className="flex flex-wrap gap-2">{SUGGEST.map((s) => <button key={s} type="button" onClick={() => setQ(s)} className="rounded-full surface-2 px-3 py-1.5 text-sm font-semibold hover:bg-[var(--line)]">{s}</button>)}</div>
            </div>
          ) : results.length ? (
            <ul id="search-results" role="listbox">
              {results.map((r, i) => (
                <li key={r.s} id={`sr-${i}`} role="option" aria-selected={i === active}>
                  <button type="button" onMouseEnter={() => setActive(i)} onClick={() => go(r.s)} className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left ${i === active ? 'surface-2' : ''}`}>
                    <span className="min-w-0 flex-1"><span className="block font-bold">{r.n}</span><span className="block truncate text-sm text-muted">{r.l}</span></span>
                    <Icon name="arrow" className={`h-4 w-4 ${i === active ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                </li>
              ))}
            </ul>
          ) : <p className="p-4 text-sm text-muted">No tool matches “{q}” yet. Try a simpler word like “paint”, “png” or “percent”.</p>}
        </div>
      </div>
    </div>
  );
}

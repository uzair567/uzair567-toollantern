'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { SearchEntry } from '@/lib/tools';
import { Icon } from './Icon';
import { rank } from '@/lib/search';

export function SearchTools({ index, big = false, id = big ? 'hero' : 'nav' }: { index: SearchEntry[]; big?: boolean; id?: string }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const results = useMemo(() => rank(index, q), [index, q]);
  const list = useRef<HTMLUListElement>(null);
  const go = (s: string) => { window.location.href = `/${s}/`; };

  return (
    <div className="relative w-full" role="search">
      <label htmlFor={`${id}-search`} className="sr-only">Search tools</label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted"><Icon name="search" className={big ? 'h-6 w-6' : 'h-4 w-4'} /></span>
        <input
          id={`${id}-search`}
          type="search"
          autoComplete="off"
          placeholder={big ? 'What do you need to calculate, convert, generate or check?' : 'Search tools…'}
          className={`input ${big ? '!rounded-2xl !py-4 !text-base shadow-sm sm:!text-lg' : '!py-2 !pl-10 !text-sm'}`}
          style={{ paddingLeft: big ? '3.25rem' : '2.5rem' }}
          value={q}
          onChange={(e) => { setQ(e.target.value); setActive(0); }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
            if (e.key === 'Enter' && results[active]) go(results[active].s);
            if (e.key === 'Escape') setQ('');
          }}
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls={`${id}-results`}
          aria-activedescendant={results.length ? `${id}-opt-${active}` : undefined}
        />
      </div>
      {q.trim() && (
        <ul ref={list} id={`${id}-results`} role="listbox" className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl surface text-left shadow-xl">
          {results.length ? results.map((r, i) => (
            <li key={r.s} id={`${id}-opt-${i}`} role="option" aria-selected={i === active}>
              <Link href={`/${r.s}/`} className={`block px-4 py-3 ${i === active ? 'bg-brand-50 dark:bg-[#10201e]' : ''}`} onMouseEnter={() => setActive(i)}>
                <span className="block font-semibold">{r.n}</span>
                <span className="block truncate text-sm text-muted">{r.l}</span>
              </Link>
            </li>
          )) : <li className="px-4 py-3 text-sm text-muted">No tool matches “{q}” yet. Try a simpler word like “paint”, “percent” or “json”.</li>}
        </ul>
      )}
    </div>
  );
}

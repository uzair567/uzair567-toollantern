'use client';
import { useEffect, useState } from 'react';
import Link from '@/components/A';

const KEY = 'tl-recent';
type Item = { s: string; n: string };

/** Records a visit (call on tool pages). Per-browser convenience only. */
export function TrackRecent({ slug, name }: { slug: string; name: string }) {
  useEffect(() => {
    try {
      const list: Item[] = JSON.parse(localStorage.getItem(KEY) || '[]');
      const next = [{ s: slug, n: name }, ...list.filter((i) => i.s !== slug)].slice(0, 8);
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch { /* storage unavailable */ }
  }, [slug, name]);
  return null;
}

export function RecentTools() {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => { try { setItems(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch { /* ignore */ } }, []);
  if (!items.length) return null;
  return (
    <section aria-labelledby="recent-h" className="mx-auto max-w-7xl px-4 pt-10">
      <h2 id="recent-h" className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Recently used</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((i) => <Link key={i.s} href={`/${i.s}/`} className="rounded-full card px-4 py-2 text-sm font-semibold hover:bg-[var(--surface-2)]">{i.n}</Link>)}
      </div>
    </section>
  );
}

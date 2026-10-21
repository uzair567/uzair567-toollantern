'use client';
import { useState } from 'react';
import { BlogCard, type CardPost } from './BlogCard';

// Topic filter for the blog index. All cards are in the static HTML; filtering only hides them.
export function BlogGrid({ posts, topics }: { posts: CardPost[]; topics: string[] }) {
  const [t, setT] = useState('All');
  const list = t === 'All' ? posts : posts.filter((p) => p.topic === t);
  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter guides by topic">
        {['All', ...topics].map((x) => (
          <button key={x} type="button" role="tab" aria-selected={t === x} onClick={() => setT(x)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${t === x ? 'bg-ink text-white dark:bg-glow dark:text-ink' : 'card hover:bg-[var(--surface-2)]'}`}>
            {x}<span className="ml-1.5 opacity-60">{x === 'All' ? posts.length : posts.filter((p) => p.topic === x).length}</span>
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <BlogCard key={p.slug} p={p} />)}</div>
    </>
  );
}

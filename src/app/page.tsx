import Link from 'next/link';
import { categories } from '@/lib/categories';
import { searchIndex, popularTools, toolsInCategory, toolPath, tools } from '@/lib/tools';
import { pageMeta, siteSchemas } from '@/lib/seo';
import { site } from '@/lib/site';
import { SearchTools } from '@/components/SearchTools';
import { ToolCard } from '@/components/ToolCard';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { RecentTools } from '@/components/RecentTools';

export const metadata = pageMeta({
  title: `${site.name} – Free Online Calculators & Everyday Tools`,
  description: 'Free online tools that solve everyday problems: profit margin, tile, paint and electricity cost calculators, JSON formatter, word counter and more. No sign-up.',
  path: '/',
});

const examples = [
  { q: 'How much electricity does my AC use?', s: 'electricity-cost-calculator/ac' },
  { q: 'How many tiles do I need?', s: 'tile-calculator' },
  { q: 'What’s my profit margin?', s: 'profit-margin-calculator' },
  { q: 'Format this JSON', s: 'json-formatter' },
];

export default function Home() {
  return (
    <>
      <JsonLd data={siteSchemas} />
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_50%_-10%,color-mix(in_srgb,var(--color-brand-500)_16%,transparent),transparent)]" />
        <div className="mx-auto max-w-3xl px-4 pb-16 pt-14 text-center sm:pt-20">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full surface px-3 py-1 text-xs font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> {tools.length} free tools · no sign-up
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Free online tools that solve <span className="text-brand-600 dark:text-brand-200">everyday problems</span></h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">Calculators and utilities that show their working — for pricing, home projects, energy bills, code and content.</p>
          <div className="mx-auto mt-8 max-w-2xl"><SearchTools index={searchIndex} big /></div>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
            <span className="text-muted">Try:</span>
            {examples.map((e) => <Link key={e.s} href={toolPath(e.s)} className="rounded-full surface px-3 py-1 text-muted hover:border-brand-500 hover:text-[var(--ink)]">{e.q}</Link>)}
          </div>
        </div>
      </section>

      <RecentTools />

      <section aria-labelledby="popular-h" className="mx-auto max-w-6xl px-4 pt-14">
        <div className="mb-5 flex items-end justify-between">
          <h2 id="popular-h" className="text-2xl font-bold tracking-tight">Popular tools</h2>
          <Link href="/all-tools/" className="text-sm font-semibold text-brand-700 dark:text-brand-200">All tools →</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{popularTools.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
      </section>

      <section aria-labelledby="cat-h" className="mx-auto max-w-6xl px-4 pt-16">
        <h2 id="cat-h" className="mb-5 text-2xl font-bold tracking-tight">Browse by category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const list = toolsInCategory(c.id);
            return (
              <div key={c.id} className="flex flex-col rounded-2xl surface p-5">
                <Link href={`/category/${c.id}/`} className="group flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-[#10201e] dark:text-brand-200"><Icon name={c.icon} /></span>
                  <span><span className="block font-semibold group-hover:text-brand-700 dark:group-hover:text-brand-200">{c.name}</span><span className="text-xs text-muted">{list.length} tools</span></span>
                </Link>
                <p className="mt-3 text-sm text-muted">{c.description}</p>
                <ul className="mt-3 space-y-1 text-sm">
                  {list.slice(0, 4).map((t) => <li key={t.slug}><Link href={toolPath(t)} className="hover:text-brand-700 dark:hover:text-brand-200">{t.name}</Link></li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="why-h" className="mx-auto max-w-6xl px-4 pt-16">
        <h2 id="why-h" className="sr-only">Why ToolLantern</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ['Shows the working', 'Every calculator explains the formula and can show each step, so you can trust — and check — the answer.'],
            ['Private by design', 'Developer and text tools run entirely in your browser. What you paste never leaves your device.'],
            ['Fast on any device', 'Pages are pre-rendered and load only the code the tool needs. No pop-ups, no sign-up walls.'],
          ].map(([h, p]) => (
            <div key={h} className="rounded-2xl surface-2 p-5"><h3 className="font-semibold">{h}</h3><p className="mt-2 text-sm text-muted">{p}</p></div>
          ))}
        </div>
      </section>
    </>
  );
}

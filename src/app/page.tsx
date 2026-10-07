import Link from 'next/link';
import { categories } from '@/lib/categories';
import { tools, toolsInCategory, toolPath } from '@/lib/tools';
import { categoryById } from '@/lib/categories';
import { pageMeta, siteSchemas } from '@/lib/seo';
import { site } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { RecentTools } from '@/components/RecentTools';
import { cardOf } from '@/components/ToolCard';
import { QuickAnswer } from '@/components/QuickAnswer';

export const metadata = pageMeta({
  title: `${site.name} – Free Online Calculators, Converters & Tools`,
  description: 'Free online tools that solve everyday problems: JPG to PNG and image compressor, profit margin, tile and electricity calculators, unit converters and developer tools. No sign-up.',
  path: '/',
});

const featured = ['jpg-to-png', 'image-compressor', 'profit-margin-calculator', 'electricity-cost-calculator/ac', 'kg-to-lbs', 'json-formatter', 'tile-calculator', 'percentage-calculator'];

export default function Home() {
  const pick = featured.map((s) => tools.find((t) => t.slug === s)!);
  return (
    <>
      <JsonLd data={siteSchemas} />

      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="dot-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div aria-hidden className="lantern-glow absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="eyebrow">{tools.length} free tools · {categories.length} categories</p>
            <h1 className="display mt-5 text-[2.7rem] sm:text-6xl lg:text-[4.4rem]">Small tools that <span className="glow-mark italic">light up</span> everyday problems.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">Convert images, price products, plan home projects and check your energy bill. Every answer comes with the formula behind it, so you can check it yourself.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/all-tools/" className="btn">Browse all tools <Icon name="arrow" className="h-4 w-4" /></Link>
              <Link href="/image-converter/" className="btn-ghost !py-[0.72rem]"><Icon name="image" className="h-4 w-4" /> Convert an image</Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {['Runs in your browser', 'Shows the working', 'No account needed'].map((x) => (
                <li key={x} className="flex items-center gap-1.5"><Icon name="check" className="h-4 w-4 text-emerald-600" />{x}</li>
              ))}
            </ul>
          </div>
          <QuickAnswer />
        </div>
      </section>

      <RecentTools />

      <section aria-labelledby="pop-h" className="mx-auto max-w-7xl px-4 pt-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="eyebrow">Popular right now</p>
            <h2 id="pop-h" className="display mt-2 text-4xl sm:text-5xl">Start with these</h2>
          </div>
          <Link href="/all-tools/" className="text-sm font-bold text-brand-700 hover:underline dark:text-glow">See every tool →</Link>
        </div>
        <ol className="grid gap-x-12 md:grid-cols-2">
          {pick.map((t, i) => {
            const c = categoryById[t.category];
            return (
              <li key={t.slug}>
                <Link href={toolPath(t)} className="group flex items-center gap-5 border-b border-line py-5">
                  <span className="display w-10 text-2xl text-muted tabular-nums transition group-hover:text-brand-600">{String(i + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-semibold tracking-tight">{t.name}</span>
                    <span className="mt-0.5 line-clamp-1 block text-sm text-muted">{cardOf(t).lead}</span>
                  </span>
                  <span className={`hidden rounded-md px-2 py-1 text-xs font-semibold sm:inline ${c.tint}`}>{c.short}</span>
                  <Icon name="arrow" className="h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-ink" />
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="cat-h" className="mx-auto max-w-7xl px-4 pt-24">
        <p className="eyebrow">The directory</p>
        <h2 id="cat-h" className="display mt-2 text-4xl sm:text-5xl">Browse by category</h2>
        <div className="mt-8 grid overflow-hidden rounded-2xl border border-line bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '1px' }}>
          {categories.map((c) => {
            const list = toolsInCategory(c.id);
            return (
              <div key={c.id} className="flex flex-col bg-[var(--surface)] p-6">
                <Link href={`/category/${c.id}/`} className="group flex items-center gap-3">
                  <span className={`tile h-10 w-10 ${c.tint}`}><Icon name={c.icon} className="h-[18px] w-[18px]" /></span>
                  <span><span className="block font-semibold group-hover:underline">{c.name}</span><span className="text-xs text-muted">{toolsInCategory(c.id).length} tools</span></span>
                </Link>
                <ul className="mt-4 grid gap-1.5 text-sm">
                  {list.slice(0, 5).map((t) => <li key={t.slug}><Link href={toolPath(t)} className="text-muted hover:text-ink">{t.name}</Link></li>)}
                </ul>
                <Link href={`/category/${c.id}/`} className="mt-auto pt-4 text-sm font-bold text-brand-700 hover:underline dark:text-glow">{list.length > 5 ? `+ ${list.length - 5} more` : 'Open category'} →</Link>
              </div>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="why-h" className="mx-auto max-w-7xl px-4 pt-24">
        <h2 id="why-h" className="sr-only">Why ToolLantern</h2>
        <div className="grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[var(--line)]">
          {[
            ['Shows the working', 'Every calculator explains its formula and can show each step, so you can check the answer instead of trusting a black box.'],
            ['Private by design', 'Images, JSON, tokens and text are processed on your device. Nothing you add is uploaded or stored.'],
            ['Fast on any device', 'Pages are pre-rendered and load only the code each tool needs. No pop-ups, no sign-up walls.'],
          ].map(([h, p], i) => (
            <div key={h} className="md:px-8 md:first:pl-0 md:last:pr-0">
              <p className="display text-5xl italic text-brand-600 dark:text-glow">{['i', 'ii', 'iii'][i]}.</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{h}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-24">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-[var(--surface)] px-6 py-10 sm:px-12">
          <div aria-hidden className="lantern-glow absolute inset-0" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="display text-3xl sm:text-4xl">Got a folder of photos to convert?</h2>
              <p className="mt-2 max-w-xl text-muted">Turn up to 30 JPG, PNG or WebP images into the format you need, then download them all at once. Nothing leaves your device.</p>
            </div>
            <Link href="/image-converter/" className="btn shrink-0">Open Image Converter <Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

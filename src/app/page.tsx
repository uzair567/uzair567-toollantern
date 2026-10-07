import Link from '@/components/A';
import { categories } from '@/lib/categories';
import { tools, toolsInCategory, primaryTools } from '@/lib/tools';
import { pageMeta, siteSchemas } from '@/lib/seo';
import { site } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { RecentTools } from '@/components/RecentTools';
import { ToolGrid } from '@/components/ToolGrid';
import { ToolCard, cardOf } from '@/components/ToolCard';

export const metadata = pageMeta({
  title: `${site.name} – Free Online Tools for Everyday Work`,
  description: 'Free online tools for everyday work: image converters, unit converters, business, home and electricity cost calculators, and developer tools. No sign-up.',
  path: '/',
});

const featured = ['jpg-to-png', 'image-compressor', 'profit-margin-calculator', 'electricity-cost-calculator/ac', 'kg-to-lbs', 'json-formatter', 'tile-calculator', 'percentage-calculator'];

export default function Home() {
  const pick = featured.map((s) => tools.find((t) => t.slug === s)!).map(cardOf);
  return (
    <>
      <JsonLd data={siteSchemas} />

      <section className="mx-auto max-w-7xl px-4 pt-6">
        <div className="grid gap-3 lg:grid-cols-12">
          <div className="flex flex-col justify-between rounded-[26px] card p-7 sm:p-10 lg:col-span-7">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted"><span className="h-2 w-2 rounded-full bg-emerald-500" />{tools.length} tools live · no sign-up</span>
              <h1 className="display mt-6 text-[2.6rem] sm:text-6xl lg:text-[4.1rem]">Free online tools for <span className="glow-mark">everyday work.</span></h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">Convert images, price products, plan home projects and check your energy bill — each tool shows exactly how the answer was worked out.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/all-tools/" className="btn !py-2 !pl-5 !pr-2">Browse all tools <span className="dot-icon"><Icon name="grid" className="h-4 w-4" /></span></Link>
                <Link href="/category/image/" className="btn-ghost !px-5 !py-3">Image converters</Link>
              </div>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {[['Tools live', tools.length], ['Categories', categories.length], ['Sign-ups needed', 0]].map(([k, v]) => (
                <div key={k}><dt className="text-sm text-muted">{k}</dt><dd className="mt-1 text-3xl font-extrabold tracking-tight">{v}</dd></div>
              ))}
            </dl>
          </div>

          <div className="grid gap-3 lg:col-span-5 lg:grid-rows-[1.25fr_1fr]">
            <Link href="/image-converter/" className="group flex flex-col justify-between rounded-[26px] bg-ink p-7 text-white">
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-glow text-glow"><Icon name="image" className="h-5 w-5" /></span>
                <span className="rounded-full bg-glow px-3 py-1.5 text-xs font-bold text-ink">Most popular</span>
              </div>
              <div className="mt-10">
                <div className="mb-4 flex flex-wrap gap-1.5">{['JPG → PNG', 'PNG → JPG', 'WebP → JPG', 'Compress'].map((x) => <span key={x} className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold">{x}</span>)}</div>
                <p className="display text-4xl">Image Converter</p>
                <p className="mt-2 max-w-sm font-medium opacity-80">Batch-convert and compress photos in your browser. Nothing is uploaded.</p>
                <span className="mt-5 inline-flex items-center gap-2 font-bold">Open tool <span className="grid h-10 w-10 place-items-center rounded-full bg-glow text-ink transition group-hover:rotate-45"><Icon name="arrow-up-right" className="h-4 w-4" /></span></span>
              </div>
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/all-tools/" className="group flex flex-col justify-between rounded-[26px] bg-t-lilac p-6 text-ink">
                <div className="flex items-start justify-between"><span className="display text-5xl">{categories.length}</span><span className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink/70 transition group-hover:rotate-45"><Icon name="arrow-up-right" className="h-4 w-4" /></span></div>
                <p className="mt-6 font-semibold">Categories to explore</p>
              </Link>
              <div className="flex flex-col justify-between rounded-[26px] bg-glow p-6 text-ink">
                <Icon name="lock" className="h-6 w-6" />
                <p className="mt-6"><span className="block text-lg font-extrabold">100% private</span><span className="text-sm text-ink/70">Runs in your browser</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.id} href={`/category/${c.id}/`} className="group flex items-center gap-3 rounded-[24px] card p-4 transition hover:shadow-[0_12px_32px_-14px_rgba(14,23,38,.2)]">
              <span className={`tile h-12 w-12 ${c.tint}`}><Icon name={c.icon} className="h-5 w-5" /></span>
              <span className="min-w-0"><span className="block truncate font-bold">{c.short}</span><span className="text-xs text-muted">{toolsInCategory(c.id).length} tools</span></span>
            </Link>
          ))}
        </div>
      </section>

      <RecentTools />

      <section aria-labelledby="pop-h" className="mx-auto max-w-7xl px-4 pt-20">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="pop-h" className="display text-4xl sm:text-5xl">Most used</h2>
            <p className="mt-2 text-muted">The tools people open first — each one answers a single question well.</p>
          </div>
          <Link href="/all-tools/" className="inline-flex items-center gap-2 rounded-full card py-1.5 pl-4 pr-1.5 text-sm font-bold">View all tools <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-white"><Icon name="arrow" className="h-4 w-4" /></span></Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{pick.map((t) => <ToolCard key={t.slug} tool={t} />)}</div>
      </section>

      <section aria-labelledby="all-h" className="mx-auto max-w-7xl px-4 pt-20">
        <h2 id="all-h" className="display mb-2 text-4xl sm:text-5xl">Every tool, one place</h2>
        <p className="mb-6 text-muted">Filter by category. New tools are added every week.</p>
        <ToolGrid tools={primaryTools.map(cardOf)} tabs={categories.map((c) => ({ id: c.id, label: c.short }))} />
      </section>

      <section aria-labelledby="why-h" className="mx-auto max-w-7xl px-4 pt-20">
        <h2 id="why-h" className="sr-only">Why ToolLantern</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ['sparkle', 'bg-t-amber', 'Shows the working', 'Every calculator explains its formula and can show each step, so you can check the answer instead of trusting a black box.'],
            ['lock', 'bg-t-mint', 'Private by design', 'Images, JSON, tokens and text are processed on your device. Nothing you add is uploaded or stored.'],
            ['bolt', 'bg-t-sky', 'Fast on any device', 'Pages are pre-rendered and load only the code each tool needs. No pop-ups, no sign-up walls.'],
          ].map(([icon, tint, h, p]) => (
            <div key={h} className="rounded-[22px] card p-7">
              <span className={`tile h-12 w-12 ${tint}`}><Icon name={icon} className="h-5 w-5" /></span>
              <h3 className="mt-6 text-xl font-extrabold tracking-tight">{h}</h3>
              <p className="mt-2 text-muted">{p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

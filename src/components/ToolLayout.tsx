import Link from 'next/link';
import type { ToolContent } from '@/lib/types';
import { getTool, toolPath, childrenOf, popularTools, engineOf } from '@/lib/tools';
import { categoryById } from '@/lib/categories';
import { toolCrumbs, toolSchemas } from '@/lib/seo';
import { Breadcrumbs } from './Breadcrumbs';
import { JsonLd } from './JsonLd';
import { ToolCard, cardOf } from './ToolCard';
import { ToolWidget } from './ToolWidget';
import { TrackRecent } from './RecentTools';
import { Icon } from './Icon';

const Html = ({ html, as: Tag = 'p' }: { html: string; as?: 'p' | 'li' }) => <Tag dangerouslySetInnerHTML={{ __html: html }} />;

export function ToolLayout({ tool }: { tool: ToolContent }) {
  const cat = categoryById[tool.category];
  const related = tool.related.map((s) => getTool(s)!).filter(Boolean);
  const kids = childrenOf(tool.parent ?? tool.slug).filter((k) => k.slug !== tool.slug);
  const parent = tool.parent ? getTool(tool.parent) : undefined;
  const popular = popularTools.filter((p) => p.slug !== tool.slug && !tool.related.includes(p.slug)).slice(0, 4);
  const updated = new Date(tool.updated + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' });

  return (
    <article className="mx-auto max-w-7xl px-4 pt-6">
      <JsonLd data={toolSchemas(tool)} />
      <TrackRecent slug={tool.slug} name={tool.name} />

      <header className="relative pb-8 pt-4">
        <Breadcrumbs items={toolCrumbs(tool)} />
        <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow flex items-center gap-2"><span className={`tile h-6 w-6 !rounded-md ${cat.tint}`}><Icon name={cat.icon} className="h-3.5 w-3.5" /></span>{cat.name}</p>
            <h1 className="display mt-3 text-[2.3rem] sm:text-[3.4rem]">{tool.name}</h1>
            <p className="mt-3 text-lg leading-relaxed text-muted">{tool.lead}</p>
          </div>
        </div>
        <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          {['Free', 'No sign-up', `Updated ${updated}`].map((x) => <li key={x} className="flex items-center gap-1.5"><Icon name="check" className="h-4 w-4 text-emerald-600" />{x}</li>)}
        </ul>
      </header>

      <section aria-label={`${tool.name} tool`} className="rounded-2xl card border-t-[3px] !border-t-glow p-4 shadow-[0_24px_50px_-34px_rgba(26,23,18,.45)] sm:p-7">
        <ToolWidget engine={engineOf(tool)} defaults={tool.defaults} />
      </section>

      {kids.length > 0 && (
        <nav aria-label={parent ? `More ${parent.name} pages` : `${tool.name} by appliance`} className="mt-4 flex flex-wrap items-center gap-2">
          <span className="px-2 text-sm font-bold">{parent ? 'Other appliances:' : 'By appliance:'}</span>
          {parent && <Link href={toolPath(parent)} className="rounded-md border border-line px-3 py-1.5 text-sm font-semibold hover:border-glow">Any appliance</Link>}
          {kids.map((k) => <Link key={k.slug} href={toolPath(k)} className="rounded-md border border-line px-3 py-1.5 text-sm font-semibold hover:border-glow">{k.name.replace(/ (Electricity )?(Running )?Cost Calculator$/, '')}</Link>)}
        </nav>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="prose-tl max-w-3xl">
          <h2 className="!mt-0">About the {tool.name.replace(/ (Calculator|Converter)$/, (m) => m.toLowerCase())}</h2>
          {tool.about.map((p, i) => <Html key={i} html={p} />)}

          <h2>How to use it</h2>
          <ol>{tool.howTo.map((s, i) => <Html key={i} as="li" html={s} />)}</ol>

          {tool.formula && (
            <>
              <h2>{tool.category === 'developer' || tool.category === 'text-seo' ? 'How it works' : 'The formula'}</h2>
              <p className="formula">{tool.formula.expression}</p>
              {tool.formula.explanation.length > 0 && <ul>{tool.formula.explanation.map((e, i) => <Html key={i} as="li" html={e} />)}</ul>}
            </>
          )}

          {tool.example && (
            <>
              <h2>Worked example</h2>
              <div className="rounded-xl surface-2 p-5">
                <h3 className="!mt-0">{tool.example.title}</h3>
                <ol className="!mb-0">{tool.example.steps.map((s, i) => <Html key={i} as="li" html={s} />)}</ol>
              </div>
            </>
          )}

          <h2>Frequently asked questions</h2>
          <div className="mt-4 grid gap-2">
            {tool.faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-line bg-[var(--surface)] px-5 py-4 open:border-[color-mix(in_srgb,var(--color-glow)_70%,transparent)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="!m-0 text-base font-bold">{f.q}</h3>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-line text-lg transition group-open:rotate-45 group-open:border-glow" aria-hidden>+</span>
                </summary>
                <p className="!mb-0 mt-2 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="!mt-8 text-sm text-muted">Results are estimates for planning — check critical figures with a professional or the official source.</p>
        </div>

        <aside className="grid content-start gap-3 lg:sticky lg:top-24 lg:self-start" aria-label="More tools">
          <section className="rounded-2xl card p-4">
            <h2 className="eyebrow mb-3">Related tools</h2>
            <ul className="grid gap-1">{related.map((r) => {
              const rc = categoryById[r.category];
              return (
                <li key={r.slug}><Link href={toolPath(r)} className="group flex items-center gap-3 rounded-2xl p-2 hover:bg-[var(--surface-2)]">
                  <span className={`tile h-10 w-10 ${rc.tint}`}><Icon name={rc.icon} className="h-[18px] w-[18px]" /></span>
                  <span className="flex-1 text-sm font-bold">{r.name}</span>
                  <Icon name="arrow" className="h-4 w-4 text-muted transition group-hover:translate-x-0.5" />
                </Link></li>
              );
            })}</ul>
          </section>
          <Link href={`/category/${cat.id}/`} className="group flex items-center justify-between rounded-2xl border border-dashed border-[color-mix(in_srgb,var(--color-glow)_80%,transparent)] bg-[color-mix(in_srgb,var(--color-glow)_10%,transparent)] p-5 font-semibold">
            <span>More {cat.short.toLowerCase()} tools</span>
            <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          {/* Reserved, non-intrusive ad slot. Renders nothing until AdSense is configured. */}
        </aside>
      </div>

      {popular.length > 0 && (
        <section aria-labelledby="pop-h" className="mt-16">
          <h2 id="pop-h" className="display mb-5 border-t border-line pt-10 text-3xl">Popular tools</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{popular.map((p) => <ToolCard key={p.slug} tool={cardOf(p)} />)}</div>
        </section>
      )}
    </article>
  );
}

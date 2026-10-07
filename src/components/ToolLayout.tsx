import Link from 'next/link';
import type { ToolContent } from '@/lib/types';
import { getTool, toolPath, childrenOf, popularTools, engineOf } from '@/lib/tools';
import { toolCrumbs, toolSchemas } from '@/lib/seo';
import { Breadcrumbs } from './Breadcrumbs';
import { JsonLd } from './JsonLd';
import { ToolCard } from './ToolCard';
import { ToolWidget } from './ToolWidget';
import { TrackRecent } from './RecentTools';

const Html = ({ html, as: Tag = 'p' }: { html: string; as?: 'p' | 'li' }) => <Tag dangerouslySetInnerHTML={{ __html: html }} />;

export function ToolLayout({ tool }: { tool: ToolContent }) {
  const related = tool.related.map((s) => getTool(s)!).filter(Boolean);
  const kids = childrenOf(tool.parent ?? tool.slug).filter((k) => k.slug !== tool.slug);
  const parent = tool.parent ? getTool(tool.parent) : undefined;
  const popular = popularTools.filter((p) => p.slug !== tool.slug && !tool.related.includes(p.slug)).slice(0, 4);
  const updated = new Date(tool.updated + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

  return (
    <article className="mx-auto max-w-6xl px-4 pt-6">
      <JsonLd data={toolSchemas(tool)} />
      <TrackRecent slug={tool.slug} name={tool.name} />
      <Breadcrumbs items={toolCrumbs(tool)} />

      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{tool.name}</h1>
        <p className="mt-3 text-lg text-muted">{tool.lead}</p>
      </header>

      <section aria-label={`${tool.name} tool`} className="mt-6 rounded-3xl surface p-4 shadow-sm sm:p-6">
        <ToolWidget engine={engineOf(tool)} defaults={tool.defaults} />
      </section>

      {kids.length > 0 && (
        <nav aria-label={parent ? `More ${parent.name} pages` : `${tool.name} by appliance`} className="mt-6">
          <p className="mb-2 text-sm font-semibold">{parent ? 'Other appliances' : 'Calculate for a specific appliance'}</p>
          <div className="flex flex-wrap gap-2">
            {parent && <Link href={toolPath(parent)} className="rounded-full surface px-3 py-1.5 text-sm hover:border-brand-500">Any appliance</Link>}
            {kids.map((k) => <Link key={k.slug} href={toolPath(k)} className="rounded-full surface px-3 py-1.5 text-sm hover:border-brand-500">{k.name.replace(/ (Electricity )?(Running )?Cost Calculator$/, '')}</Link>)}
          </div>
        </nav>
      )}

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="prose-tl max-w-3xl">
          <h2>About the {tool.name.replace(/ Calculator$/, ' calculator')}</h2>
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
              <h3>{tool.example.title}</h3>
              <ol>{tool.example.steps.map((s, i) => <Html key={i} as="li" html={s} />)}</ol>
            </>
          )}

          <h2>Frequently asked questions</h2>
          <div className="not-prose mt-4 divide-y divide-[var(--line)] rounded-2xl surface">
            {tool.faqs.map((f) => (
              <details key={f.q} className="group px-5 py-4" open={false}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  <h3 className="text-base">{f.q}</h3>
                  <span className="text-muted transition group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-2 leading-7 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">Last reviewed {updated}. Results are estimates for planning — check critical figures with a professional or the official source.</p>
        </div>

        <aside className="grid content-start gap-8" aria-label="More tools">
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Related tools</h2>
            <ul className="grid gap-2">{related.map((r) => (
              <li key={r.slug}><Link href={toolPath(r)} className="block rounded-xl surface px-4 py-3 text-sm font-medium hover:border-brand-500">{r.name}</Link></li>
            ))}</ul>
          </section>
          {/* Reserved, non-intrusive ad slot. Renders nothing until AdSense is configured. */}
        </aside>
      </div>

      {popular.length > 0 && (
        <section aria-labelledby="pop-h" className="mt-16">
          <h2 id="pop-h" className="mb-4 text-xl font-bold">Popular tools</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{popular.map((p) => <ToolCard key={p.slug} tool={p} />)}</div>
        </section>
      )}
    </article>
  );
}

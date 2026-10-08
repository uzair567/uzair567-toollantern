import Link from '@/components/A';
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
import { UnitTable } from './UnitTable';
import { seoOf } from '@/lib/seo-data';
import type { Kind } from '@/tools/units';

const Html = ({ html, as: Tag = 'p' }: { html: string; as?: 'p' | 'li' }) => <Tag dangerouslySetInnerHTML={{ __html: html }} />;

export function ToolLayout({ tool }: { tool: ToolContent }) {
  const cat = categoryById[tool.category];
  const related = tool.related.map((s) => getTool(s)!).filter(Boolean);
  const kids = childrenOf(tool.parent ?? tool.slug).filter((k) => k.slug !== tool.slug);
  const parent = tool.parent ? getTool(tool.parent) : undefined;
  const popular = popularTools.filter((p) => p.slug !== tool.slug && !tool.related.includes(p.slug)).slice(0, 4);
  const seo = seoOf(tool.slug);
  const d = (tool.defaults ?? {}) as Record<string, string>;
  const updated = new Date(tool.updated + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' });

  return (
    <article className="mx-auto max-w-7xl px-4 pt-6">
      <JsonLd data={toolSchemas(tool)} />
      <TrackRecent slug={tool.slug} name={tool.name} />

      <header className="relative overflow-hidden rounded-[26px] card p-6 sm:p-9">
        <div aria-hidden className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-60 blur-2xl ${cat.tint}`} />
        <div className="relative">
          <Breadcrumbs items={toolCrumbs(tool)} />
          <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className={`tile h-14 w-14 ${cat.tint}`}><Icon name={cat.icon} className="h-6 w-6" /></span>
            <div className="max-w-3xl">
              <h1 className="display text-[2.1rem] sm:text-5xl">{seo?.h1 ?? tool.name}</h1>
              <p className="mt-3 text-lg leading-relaxed text-muted">{tool.lead}</p>
              {seo?.answer && (
                <div className="answer mt-5 rounded-2xl border-l-4 border-glow surface-2 px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-glow">Quick answer</p>
                  <p className="mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: seo.answer }} />
                </div>
              )}
              <ul className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
                <li className="chip">Free</li>
                <li className="rounded-full surface-2 px-3 py-1.5">No sign-up</li>
                <li className="rounded-full surface-2 px-3 py-1.5">{cat.short}</li>
                <li className="rounded-full surface-2 px-3 py-1.5">Updated {updated}</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <section aria-label={`${tool.name} tool`} className="mt-3 rounded-[26px] card p-4 sm:p-7">
        <ToolWidget engine={engineOf(tool)} defaults={tool.defaults} />
      </section>

      {kids.length > 0 && (
        <nav aria-label={parent ? `More ${parent.name} pages` : `${tool.name} by appliance`} className="mt-3 flex flex-wrap items-center gap-2 rounded-[24px] card p-3">
          <span className="px-2 text-sm font-bold">{parent ? 'Other appliances:' : 'By appliance:'}</span>
          {parent && <Link href={toolPath(parent)} className="rounded-full surface-2 px-4 py-2 text-sm font-semibold hover:bg-[var(--line)]">Any appliance</Link>}
          {kids.map((k) => <Link key={k.slug} href={toolPath(k)} className="rounded-full surface-2 px-4 py-2 text-sm font-semibold hover:bg-[var(--line)]">{k.name.replace(/ (Electricity )?(Running )?Cost Calculator$/, '')}</Link>)}
        </nav>
      )}

      <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="prose-tl rounded-[26px] card p-6 sm:p-10">
          <h2 className="!mt-0">About the {tool.name.replace(/ (Calculator|Converter)$/, (m) => m.toLowerCase())}</h2>
          {tool.about.map((p, i) => <Html key={i} html={p} />)}

          <h2>How to use it</h2>
          <ol>{tool.howTo.map((s, i) => <Html key={i} as="li" html={s} />)}</ol>

          {engineOf(tool) === 'unit' && <UnitTable kind={d.kind as Kind} from={d.from} to={d.to} />}

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
              <div className="rounded-3xl surface-2 p-5">
                <h3 className="!mt-0">{tool.example.title}</h3>
                <ol className="!mb-0">{tool.example.steps.map((s, i) => <Html key={i} as="li" html={s} />)}</ol>
              </div>
            </>
          )}

          <h2>Frequently asked questions</h2>
          <div className="mt-4 grid gap-2">
            {tool.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl surface-2 px-5 py-4 open:bg-[var(--surface)] open:ring-1 open:ring-[var(--line)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="!m-0 text-base font-bold">{f.q}</h3>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--surface)] text-lg transition group-open:rotate-45 group-open:bg-ink group-open:text-white" aria-hidden>+</span>
                </summary>
                <p className="!mb-0 mt-2 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="!mt-8 text-sm text-muted">{tool.category === 'fitness' ? 'Results are estimates for healthy adults, not medical advice. Talk to a doctor or registered dietitian before major changes to diet or training, especially if you are pregnant or have a health condition.' : 'Results are estimates for planning — check critical figures with a professional or the official source.'}</p>
        </div>

        <aside className="grid content-start gap-3 lg:sticky lg:top-24 lg:self-start" aria-label="More tools">
          <section className="rounded-[22px] card p-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">Related tools</h2>
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
          <Link href={`/category/${cat.id}/`} className="group flex items-center justify-between rounded-[22px] bg-glow p-5 font-bold text-ink">
            <span>More {cat.short.toLowerCase()} tools</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition group-hover:rotate-45"><Icon name="arrow-up-right" className="h-4 w-4" /></span>
          </Link>
          {/* Reserved, non-intrusive ad slot. Renders nothing until AdSense is configured. */}
        </aside>
      </div>

      {popular.length > 0 && (
        <section aria-labelledby="pop-h" className="mt-16">
          <h2 id="pop-h" className="display mb-5 text-3xl">Popular tools</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{popular.map((p) => <ToolCard key={p.slug} tool={cardOf(p)} />)}</div>
        </section>
      )}
    </article>
  );
}

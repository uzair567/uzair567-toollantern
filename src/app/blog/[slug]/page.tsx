import { notFound } from 'next/navigation';
import Link from '@/components/A';
import { pageMeta, breadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { posts, postBySlug, postPath } from '@/lib/blog';
import { getTool, toolPath } from '@/lib/tools';
import { categoryById } from '@/lib/categories';
import { site, absUrl } from '@/lib/site';

type Params = { slug: string };
export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const p = postBySlug.get((await params).slug);
  if (!p) return {};
  const m = pageMeta({ title: p.title, description: p.metaDescription, path: postPath(p) });
  return { ...m, openGraph: { ...m.openGraph, type: 'article', publishedTime: p.published, modifiedTime: p.updated } };
}

const date = (d: string) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const p = postBySlug.get((await params).slug);
  if (!p) notFound();
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog/' }, { name: p.h1, href: postPath(p) }];
  const tools = p.tools.map((s) => getTool(s)!).filter(Boolean);
  const main = tools[0];
  const others = posts.filter((x) => x.slug !== p.slug).slice(0, 3);
  const url = absUrl(postPath(p));

  return (
    <article className="mx-auto max-w-7xl px-4 pt-6">
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        {
          '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.h1, description: p.metaDescription, url, mainEntityOfPage: url,
          datePublished: p.published, dateModified: p.updated, image: absUrl('/og.png'), inLanguage: 'en',
          author: { '@id': `${site.url}/#organization` }, publisher: { '@id': `${site.url}/#organization` },
          about: p.focusKeyword,
        },
        { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      ]} />
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[26px] card p-6 sm:p-10">
          <Breadcrumbs items={crumbs} />
          <div className="prose-tl">
          <h1 className="display !mt-2 text-[2rem] sm:text-[2.6rem]">{p.h1}</h1>
          <p className="!mt-3 text-sm text-muted">By the ToolLantern team · Updated {date(p.updated)}</p>

          <div className="answer my-6 rounded-2xl surface-2 border-l-4 !border-l-[var(--color-glow)] px-5 py-4">
            <p className="!m-0 text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-glow">Short answer</p>
            <p className="!mb-0 !mt-1">{p.summary}</p>
          </div>

          {main && (
            <Link href={toolPath(main)} className="not-prose group my-6 flex items-center justify-between gap-4 rounded-2xl bg-ink p-5 text-white !no-underline">
              <span><span className="block text-xs font-bold uppercase tracking-wide text-glow">Free calculator</span><span className="mt-1 block text-lg font-extrabold !text-white">Use the {main.name}</span></span>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-glow text-ink transition group-hover:rotate-45"><Icon name="arrow-up-right" className="h-4 w-4" /></span>
            </Link>
          )}

          {p.body.map((s) => (
            <section key={s.h2}>
              <h2>{s.h2}</h2>
              <div dangerouslySetInnerHTML={{ __html: s.html }} />
            </section>
          ))}

          <h2>Frequently asked questions</h2>
          <div className="mt-4 grid gap-2">
            {p.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl surface-2 px-5 py-4 open:bg-[var(--surface)] open:ring-1 open:ring-[var(--line)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h3 className="!m-0 text-base font-bold">{f.q}</h3>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--surface)] text-lg transition group-open:rotate-45 group-open:bg-ink group-open:text-white" aria-hidden>+</span>
                </summary>
                <p className="!mb-0 mt-2 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="!mt-8 text-sm text-muted">Figures are worked examples for planning. Prices, rates and material weights vary — use your own numbers in the calculator.</p>
          </div>
        </div>

        <aside className="grid content-start gap-3 lg:sticky lg:top-24 lg:self-start" aria-label="Tools and guides">
          <section className="rounded-[22px] card p-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">Calculators for this guide</h2>
            <ul className="grid gap-1">{tools.map((t) => {
              const c = categoryById[t.category];
              return (
                <li key={t.slug}><Link href={toolPath(t)} className="group flex items-center gap-3 rounded-2xl p-2 hover:bg-[var(--surface-2)]">
                  <span className={`tile h-10 w-10 ${c.tint}`}><Icon name={c.icon} className="h-[18px] w-[18px]" /></span>
                  <span className="flex-1 text-sm font-bold">{t.name}</span>
                  <Icon name="arrow" className="h-4 w-4 text-muted transition group-hover:translate-x-0.5" />
                </Link></li>
              );
            })}</ul>
          </section>
          <section className="rounded-[22px] card p-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">More guides</h2>
            <ul className="grid gap-2">{others.map((o) => <li key={o.slug}><Link href={postPath(o)} className="text-sm font-bold hover:underline">{o.h1}</Link></li>)}</ul>
            <Link href="/blog/" className="mt-3 inline-block text-sm font-bold text-muted hover:underline">All guides →</Link>
          </section>
        </aside>
      </div>
    </article>
  );
}

import { notFound } from 'next/navigation';
import Link from '@/components/A';
import { pageMeta, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { BlogCard } from '@/components/BlogCard';
import { ShareLinks } from '@/components/ShareLinks';
import { posts, postBySlug, postPath } from '@/lib/blog';
import { covers, figures } from '@/lib/blog-art';
import { topicOf, readMins, fmtDate, anchor, coverPath } from '@/lib/blog-meta';
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
  const img = { url: absUrl(coverPath(p)), width: 1200, height: 630, alt: covers[p.slug]?.alt ?? p.h1 };
  return { ...m, openGraph: { ...m.openGraph, type: 'article', publishedTime: p.published, modifiedTime: p.updated, images: [img] }, twitter: { ...m.twitter, images: [img.url] } };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const p = postBySlug.get((await params).slug);
  if (!p) notFound();
  const url = absUrl(postPath(p));
  const crumbs = [{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog/' }, { name: p.h1, href: postPath(p) }];
  const tools = p.tools.map((s) => getTool(s)!).filter(Boolean);
  const main = tools[0];
  const figs = figures[p.slug] ?? {};
  const topic = topicOf(p), mins = readMins(p);
  const related = [...posts.filter((x) => x.slug !== p.slug && topicOf(x) === topic), ...posts.filter((x) => x.slug !== p.slug && topicOf(x) !== topic)].slice(0, 3);
  const toc = [...p.body.map((b) => ({ id: anchor(b.h2), t: b.h2 })), { id: 'faq', t: 'Frequently asked questions' }];

  const Cta = () => main ? (
    <Link href={toolPath(main)} className="not-prose group my-8 flex items-center justify-between gap-4 rounded-2xl bg-ink p-5 text-white !no-underline sm:p-6">
      <span className="flex items-center gap-4">
        <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-glow text-ink sm:grid"><Icon name={categoryById[main.category].icon} className="h-5 w-5" /></span>
        <span><span className="block text-xs font-bold uppercase tracking-wide text-glow">Free calculator</span><span className="mt-1 block text-lg font-extrabold !text-white">Work it out with the {main.name}</span></span>
      </span>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-glow text-ink transition group-hover:rotate-45"><Icon name="arrow-up-right" className="h-4 w-4" /></span>
    </Link>
  ) : null;

  return (
    <article className="mx-auto max-w-7xl px-4 pt-6">
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        {
          '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.h1, description: p.metaDescription, url, mainEntityOfPage: url,
          datePublished: p.published, dateModified: p.updated, inLanguage: 'en', wordCount: mins * 220, articleSection: topic,
          image: { '@type': 'ImageObject', url: absUrl(coverPath(p)), width: 1200, height: 630 },
          author: { '@id': `${site.url}/#organization` }, publisher: { '@id': `${site.url}/#organization` }, about: p.focusKeyword,
        },
        { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      ]} />

      {/* Header */}
      <header className="mx-auto max-w-4xl pt-4 text-center">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-muted">
          <Link href="/" className="hover:text-[var(--ink)]">Home</Link><span aria-hidden>/</span><Link href="/blog/" className="hover:text-[var(--ink)]">Blog</Link><span aria-hidden>/</span><span className="font-semibold text-[var(--ink)]">{topic}</span>
        </nav>
        <h1 className="display mt-5 text-[2.2rem] leading-[1.08] sm:text-[3.4rem]">{p.h1}</h1>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
          <span className="flex items-center gap-2 font-semibold text-[var(--ink)]"><span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-glow"><Icon name="lantern" className="h-4 w-4" /></span>ToolLantern team</span>
          <span>Updated <time dateTime={p.updated}>{fmtDate(p.updated)}</time></span>
          <span className="flex items-center gap-1.5"><Icon name="clock" className="h-4 w-4" />{mins} min read</span>
        </div>
      </header>

      <figure className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-[28px]">
        <img src={coverPath(p)} alt={covers[p.slug]?.alt ?? ''} width={1200} height={630} loading="eager" fetchPriority="high" className="aspect-[1200/630] w-full object-cover" />
      </figure>

      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
        <div className="min-w-0">
          <div className="rounded-[26px] card p-6 sm:p-12">
            <div className="prose-tl prose-blog">
              <div className="answer rounded-2xl surface-2 border-l-4 !border-l-[var(--color-glow)] px-5 py-5 sm:px-6">
                <p className="!m-0 text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-glow">Short answer</p>
                <p className="!mb-0 !mt-1.5 text-[1.05rem] font-medium">{p.summary}</p>
              </div>

              <details className="not-prose mt-6 rounded-2xl border border-line p-4 lg:hidden">
                <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-bold"><Icon name="list" className="h-4 w-4" /> On this page</summary>
                <ol className="mt-3 grid gap-2 text-sm">{toc.map((x) => <li key={x.id}><a href={`#${x.id}`} className="text-muted hover:text-[var(--ink)]">{x.t}</a></li>)}</ol>
              </details>

              {p.body.map((s, i) => {
                const fig = figs[s.h2];
                return (
                  <section key={s.h2} aria-labelledby={anchor(s.h2)}>
                    <h2 id={anchor(s.h2)} className="scroll-mt-28">{s.h2}</h2>
                    <div dangerouslySetInnerHTML={{ __html: s.html }} />
                    {fig && (
                      <figure className="not-prose my-6 rounded-2xl surface-2 p-5 sm:p-7">
                        <div className="text-[var(--ink)] [&_svg]:h-auto [&_svg]:w-full" role="img" aria-label={fig.alt} dangerouslySetInnerHTML={{ __html: fig.svg }} />
                        <figcaption className="mt-3 border-t border-line pt-3 text-sm text-muted">{fig.caption}</figcaption>
                      </figure>
                    )}
                    {i === 1 && <Cta />}
                  </section>
                );
              })}

              <h2 id="faq" className="scroll-mt-28">Frequently asked questions</h2>
              <div className="not-prose mt-4 grid gap-2">
                {p.faqs.map((f) => (
                  <details key={f.q} className="group rounded-2xl surface-2 px-5 py-4 open:bg-[var(--surface)] open:ring-1 open:ring-[var(--line)]">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                      <h3 className="text-base font-bold">{f.q}</h3>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--surface)] text-lg transition group-open:rotate-45 group-open:bg-ink group-open:text-white" aria-hidden>+</span>
                    </summary>
                    <p className="mt-2 leading-relaxed text-muted">{f.a}</p>
                  </details>
                ))}
              </div>
              {p.body.length < 2 && <Cta />}
            </div>

            <div className="mt-10 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <ShareLinks url={url} title={p.h1} />
              <p className="text-sm text-muted">Figures are worked examples — prices and rates vary.</p>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-4 rounded-[26px] card p-6 sm:p-8">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink text-glow"><Icon name="lantern" className="h-6 w-6" /></span>
            <div>
              <p className="font-extrabold">Written by the ToolLantern team</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">We build free calculators that show their working. Every figure in our guides is calculated with the same formulas as our tools, and the calculation code is covered by automated tests. <Link href="/about/" className="font-bold text-[var(--ink)] underline decoration-glow decoration-2 underline-offset-4">About us</Link></p>
            </div>
          </div>
        </div>

        <aside className="hidden content-start gap-4 lg:sticky lg:top-24 lg:grid lg:self-start" aria-label="On this page">
          <nav className="rounded-[22px] card p-5">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted"><Icon name="list" className="h-4 w-4" /> On this page</p>
            <ol className="grid gap-1 border-l-2 border-line">{toc.map((x) => <li key={x.id}><a href={`#${x.id}`} className="-ml-0.5 block border-l-2 border-transparent py-1 pl-3 text-sm font-semibold text-muted hover:border-glow hover:text-[var(--ink)]">{x.t}</a></li>)}</ol>
          </nav>
          <section className="rounded-[22px] bg-glow p-5 text-ink">
            <p className="text-xs font-bold uppercase tracking-wider opacity-70">Calculators for this guide</p>
            <ul className="mt-3 grid gap-1.5">{tools.map((t) => (
              <li key={t.slug}><Link href={toolPath(t)} className="group flex items-center justify-between gap-2 rounded-xl bg-white/60 px-3 py-2.5 text-sm font-bold hover:bg-white">{t.name}<Icon name="arrow" className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" /></Link></li>
            ))}</ul>
          </section>
        </aside>
      </div>

      <section aria-labelledby="more-h" className="mx-auto mt-16 max-w-6xl">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 id="more-h" className="display text-3xl sm:text-4xl">Keep reading</h2>
          <Link href="/blog/" className="text-sm font-bold text-muted hover:underline">All guides →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => <BlogCard key={r.slug} p={{ slug: r.slug, h1: r.h1, summary: r.summary, topic: topicOf(r), mins: readMins(r), date: fmtDate(r.updated), cover: coverPath(r), alt: covers[r.slug]?.alt ?? '' }} />)}
        </div>
      </section>
    </article>
  );
}

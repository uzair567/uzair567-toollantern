import Link from '@/components/A';
import { pageMeta, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { BlogGrid } from '@/components/BlogGrid';
import type { CardPost } from '@/components/BlogCard';
import { posts, postPath } from '@/lib/blog';
import { covers } from '@/lib/blog-art';
import { topicOf, topics, readMins, fmtDate, coverPath } from '@/lib/blog-meta';
import { absUrl } from '@/lib/site';

const baseMeta = pageMeta({
  title: 'ToolLantern Blog – Calculator Guides & How-Tos',
  description: 'Practical guides with worked examples: mulch and gravel quantities, appliance running costs, percentages and more — each paired with a free calculator.',
  path: '/blog/',
});
export const metadata = { ...baseMeta, alternates: { ...baseMeta.alternates, types: { 'application/rss+xml': absUrl('/blog/rss.xml') } } };

const crumbs = [{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog/' }];
const sorted = [...posts].sort((a, b) => b.updated.localeCompare(a.updated) || posts.indexOf(a) - posts.indexOf(b));
const card = (p: (typeof posts)[number]): CardPost => ({ slug: p.slug, h1: p.h1, summary: p.summary, topic: topicOf(p), mins: readMins(p), date: fmtDate(p.updated), cover: coverPath(p), alt: covers[p.slug]?.alt ?? '' });

export default function BlogIndex() {
  const [lead, ...rest] = sorted;
  const f = card(lead);
  return (
    <div className="mx-auto max-w-7xl px-4 pt-6">
      <JsonLd data={[breadcrumbSchema(crumbs), {
        '@context': 'https://schema.org', '@type': 'Blog', name: 'ToolLantern Blog', url: absUrl('/blog/'), description: 'Guides with worked examples, each paired with a free calculator.',
        blogPost: sorted.map((p) => ({ '@type': 'BlogPosting', headline: p.h1, url: absUrl(postPath(p)), image: absUrl(coverPath(p)), datePublished: p.published, dateModified: p.updated })),
      }]} />

      <header className="relative overflow-hidden rounded-[26px] bg-ink px-6 py-10 text-white sm:px-12 sm:py-14">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-glow opacity-25 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute right-10 top-1/2 hidden w-[380px] -translate-y-1/2 xl:block">
          {sorted.slice(1, 4).map((p, i) => (
            <img key={p.slug} src={coverPath(p)} alt="" width={1200} height={630} loading="eager"
              className={`absolute w-[300px] rounded-2xl border-4 border-white/10 shadow-2xl ${['-top-44 left-0 -rotate-6', '-top-20 left-20 rotate-3', 'top-2 left-4 -rotate-2'][i]}`} />
          ))}
        </div>
        <div className="relative">
          <nav aria-label="Breadcrumb" className="text-sm text-white/60"><Link href="/" className="hover:text-white">Home</Link> <span aria-hidden>/</span> <span className="text-white">Blog</span></nav>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-glow"><Icon name="book" className="h-3.5 w-3.5" /> The ToolLantern blog</p>
          <h1 className="display mt-4 max-w-3xl text-4xl text-white sm:text-6xl">Guides & how-tos, <span className="text-glow">with the maths shown.</span></h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">Straight answers to the questions people ask before they buy materials or check a bill — worked examples, clear tables, and a free calculator for your own numbers.</p>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/60"><span>{posts.length} guides</span><span>{topics(posts).length} topics</span><span>Updated {fmtDate(lead.updated)}</span></p>
        </div>
      </header>

      <section aria-labelledby="feat-h" className="mt-4">
        <h2 id="feat-h" className="sr-only">Featured guide</h2>
        <Link href={postPath(lead)} className="group grid overflow-hidden rounded-[26px] card transition hover:shadow-[0_16px_40px_-16px_rgba(14,23,38,.3)] lg:grid-cols-[1.25fr_1fr]">
          <div className="overflow-hidden"><img src={f.cover} alt={f.alt} width={1200} height={630} loading="eager" fetchPriority="high" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" /></div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-glow">Latest guide <span className="h-1 w-1 rounded-full bg-current" /> {f.topic}</p>
            <h3 className="display mt-3 text-3xl sm:text-4xl">{lead.h1}</h3>
            <p className="mt-3 leading-relaxed text-muted">{lead.summary}</p>
            <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-muted"><Icon name="clock" className="h-4 w-4" />{f.mins} min read · {f.date}</p>
            <span className="btn mt-6 w-fit">Read the guide <span className="dot-icon h-7 w-7"><Icon name="arrow" className="h-4 w-4" /></span></span>
          </div>
        </Link>
      </section>

      <section aria-labelledby="all-h" className="mt-14">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 id="all-h" className="display text-3xl sm:text-4xl">All guides</h2>
        </div>
        <BlogGrid posts={rest.map(card)} topics={topics(rest)} />
      </section>

      <section className="mt-14 flex flex-col items-start justify-between gap-5 rounded-[26px] bg-glow p-6 text-ink sm:flex-row sm:items-center sm:p-10">
        <div>
          <h2 className="display text-2xl sm:text-3xl">Rather just run the numbers?</h2>
          <p className="mt-2 max-w-xl text-ink/75">Every guide has a matching calculator. Browse all of them — free, no sign-up.</p>
        </div>
        <Link href="/all-tools/" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-bold text-white">Browse all tools <Icon name="arrow" className="h-4 w-4" /></Link>
      </section>
    </div>
  );
}

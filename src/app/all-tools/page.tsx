import Link from 'next/link';
import { categories } from '@/lib/categories';
import { toolsInCategory, toolPath } from '@/lib/tools';
import { pageMeta } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Icon } from '@/components/Icon';

export const metadata = pageMeta({ title: 'All Free Online Tools & Calculators | ToolLantern', description: 'Every ToolLantern calculator and utility in one list — business, home, energy, everyday, developer, text and SEO tools.', path: '/all-tools/' });

export default function AllTools() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-6">
      <header className="rounded-2xl card p-6 sm:p-10">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'All tools', href: '/all-tools/' }]} />
        <h1 className="display text-4xl sm:text-6xl">All tools</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">Every calculator, converter and utility on ToolLantern, grouped by category.</p>
      </header>
      <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <section key={c.id} className="rounded-2xl card p-6">
            <Link href={`/category/${c.id}/`} className="mb-4 flex items-center gap-3">
              <span className={`tile h-11 w-11 ${c.tint}`}><Icon name={c.icon} className="h-5 w-5" /></span>
              <h2 className="text-lg font-extrabold tracking-tight">{c.name}</h2>
            </Link>
            <ul className="grid gap-0.5">{toolsInCategory(c.id).map((t) => <li key={t.slug}><Link className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold hover:bg-[var(--surface-2)]" href={toolPath(t)}>{t.name}<Icon name="arrow" className="h-3.5 w-3.5 text-muted" /></Link></li>)}</ul>
          </section>
        ))}
      </div>
    </div>
  );
}

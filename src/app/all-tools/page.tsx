import Link from 'next/link';
import { categories } from '@/lib/categories';
import { toolsInCategory, toolPath } from '@/lib/tools';
import { pageMeta } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata = pageMeta({ title: 'All Free Online Tools & Calculators | ToolLantern', description: 'Every ToolLantern calculator and utility in one list — business, home, energy, everyday, developer, text and SEO tools.', path: '/all-tools/' });

export default function AllTools() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'All tools', href: '/all-tools/' }]} />
      <h1 className="text-3xl font-bold tracking-tight">All tools</h1>
      <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <section key={c.id}>
            <h2 className="mb-3 text-lg font-bold"><Link href={`/category/${c.id}/`}>{c.name}</Link></h2>
            <ul className="space-y-1.5">{toolsInCategory(c.id).map((t) => <li key={t.slug}><Link className="text-muted hover:text-[var(--ink)]" href={toolPath(t)}>{t.name}</Link></li>)}</ul>
          </section>
        ))}
      </div>
    </div>
  );
}

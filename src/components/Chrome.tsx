import Link from 'next/link';
import { categories } from '@/lib/categories';
import { searchIndex, toolsInCategory, toolPath, primaryTools, tools } from '@/lib/tools';
import { site } from '@/lib/site';
import { Header as HeaderClient, Logo, type NavCategory } from './Header';
import { Icon } from './Icon';

const nav: NavCategory[] = categories.map((c) => ({
  id: c.id, name: c.name, short: c.short, icon: c.icon, tint: c.tint, description: c.description,
  tools: toolsInCategory(c.id).map((t) => ({ slug: t.slug, name: t.name, lead: t.lead.split(/(?<=\.)\s/)[0] })),
}));

export function Header() {
  return <HeaderClient nav={nav} total={tools.length} index={searchIndex} />;
}

export { Logo };

export function Footer() {
  return (
    <footer className="mt-28 border-t border-line bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>
            <Link href="/all-tools/" className="btn-ghost mt-6">Browse all {tools.length} tools <Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {categories.map((c) => (
              <div key={c.id}>
                <p className="eyebrow mb-3"><Link href={`/category/${c.id}/`}>{c.short}</Link></p>
                <ul className="space-y-2 text-sm text-muted">
                  {primaryTools.filter((t) => t.category === c.id).slice(0, 5).map((t) => <li key={t.slug}><Link href={toolPath(t)} className="hover:text-ink">{t.name.replace(/ (Calculator|Converter)$/, '')}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-sm text-muted">
          <p>© {new Date().getFullYear()} {site.name}. Free tools, no sign-up.</p>
          <nav aria-label="Legal" className="flex gap-5">
            <Link href="/about/" className="hover:text-ink">About</Link><Link href="/privacy/" className="hover:text-ink">Privacy</Link><Link href="/terms/" className="hover:text-ink">Terms</Link><Link href="/all-tools/" className="hover:text-ink">All tools</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

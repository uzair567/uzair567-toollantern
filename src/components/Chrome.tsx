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
    <footer className="mx-auto mt-24 max-w-7xl px-4 pb-4">
      <div className="rounded-[26px] bg-ink px-6 py-12 text-white sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-glow text-ink"><Icon name="lantern" className="h-5 w-5" /></span>ToolLantern
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">{site.description}</p>
            <Link href="/all-tools/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-4 pr-1.5 text-sm font-bold text-ink">
              Browse all {tools.length} tools <span className="grid h-8 w-8 place-items-center rounded-full bg-glow"><Icon name="arrow-up-right" className="h-4 w-4" /></span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {categories.map((c) => (
              <div key={c.id}>
                <p className="mb-3 text-sm font-bold"><Link href={`/category/${c.id}/`}>{c.short}</Link></p>
                <ul className="space-y-2 text-sm text-white/60">
                  {primaryTools.filter((t) => t.category === c.id).slice(0, 5).map((t) => <li key={t.slug}><Link href={toolPath(t)} className="hover:text-white">{t.name.replace(/ (Calculator|Converter)$/, '')}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50">
          <p>© {new Date().getFullYear()} {site.name}. Free tools, no sign-up.</p>
          <nav aria-label="Legal" className="flex gap-5">
            <Link href="/about/" className="hover:text-white">About</Link><Link href="/privacy/" className="hover:text-white">Privacy</Link><Link href="/terms/" className="hover:text-white">Terms</Link><Link href="/all-tools/" className="hover:text-white">All tools</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

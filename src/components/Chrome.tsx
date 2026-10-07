import Link from 'next/link';
import { categories } from '@/lib/categories';
import { searchIndex, primaryTools, toolPath } from '@/lib/tools';
import { site } from '@/lib/site';
import { SearchTools } from './SearchTools';
import { ThemeToggle } from './ThemeToggle';
import { Icon } from './Icon';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold tracking-tight" aria-label={`${site.name} home`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white"><Icon name="lantern" className="h-5 w-5" /></span>
      <span className="text-lg">Tool<span className="text-brand-600 dark:text-brand-200">Lantern</span></span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Logo />
        <nav aria-label="Categories" className="hidden flex-1 items-center gap-1 text-sm lg:flex">
          {categories.map((c) => (
            <Link key={c.id} href={`/category/${c.id}/`} className="rounded-md px-2.5 py-1.5 text-muted hover:text-[var(--ink)]">{c.short}</Link>
          ))}
        </nav>
        <div className="ml-auto hidden w-64 sm:block"><SearchTools index={searchIndex} /></div>
        <ThemeToggle />
      </div>
      <div className="px-4 pb-2 sm:hidden"><SearchTools index={searchIndex} id="mnav" /></div>
      <nav aria-label="Categories" className="flex gap-1 overflow-x-auto px-4 pb-2 text-sm lg:hidden">
        {categories.map((c) => (
          <Link key={c.id} href={`/category/${c.id}/`} className="whitespace-nowrap rounded-full border border-line px-3 py-1 text-muted">{c.short}</Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-3 text-sm text-muted">{site.description}</p>
        </div>
        {categories.slice(0, 6).reduce<typeof categories[]>((cols, c, i) => { (cols[i % 3] ||= []).push(c); return cols; }, []).map((col, i) => (
          <div key={i} className="grid content-start gap-6">
            {col.map((c) => (
              <div key={c.id}>
                <p className="mb-2 text-sm font-semibold"><Link href={`/category/${c.id}/`}>{c.name}</Link></p>
                <ul className="space-y-1 text-sm text-muted">
                  {primaryTools.filter((t) => t.category === c.id).map((t) => <li key={t.slug}><Link href={toolPath(t)} className="hover:text-[var(--ink)]">{t.name}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-muted">
          <p>© {new Date().getFullYear()} {site.name}. Free tools, no sign-up.</p>
          <nav aria-label="Legal" className="flex gap-4">
            <Link href="/about/">About</Link><Link href="/privacy/">Privacy</Link><Link href="/terms/">Terms</Link><Link href="/all-tools/">All tools</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

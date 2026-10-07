'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { ThemeToggle } from './ThemeToggle';
import { SearchDialog } from './SearchDialog';
import type { SearchEntry } from '@/lib/search';

export interface NavCategory {
  id: string; name: string; short: string; icon: string; tint: string; description: string;
  tools: { slug: string; name: string; lead: string }[];
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 tracking-tight" aria-label="ToolLantern home">
      <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-b from-[#ffc565] to-[#f5a524] text-[#1a1712] shadow-[0_4px_14px_-4px_rgba(245,165,36,.8)]"><Icon name="lantern" className="h-[18px] w-[18px]" /></span>
      <span className="font-serif text-[1.3rem] font-semibold">Tool<span className="italic text-brand-700 dark:text-glow">Lantern</span></span>
    </Link>
  );
}

export function Header({ nav, total, index }: { nav: NavCategory[]; total: number; index: SearchEntry[] }) {
  const [open, setOpen] = useState<null | 'tools' | 'convert'>(null);
  const [active, setActive] = useState(nav[0].id);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const path = usePathname();

  useEffect(() => { setOpen(null); setMobile(false); }, [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(null); setMobile(false); }
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !/input|textarea|select/i.test((e.target as HTMLElement).tagName))) { e.preventDefault(); setSearch(true); }
    };
    const onClick = (e: MouseEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(null); };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, []);
  useEffect(() => { document.body.style.overflow = mobile ? 'hidden' : ''; }, [mobile]);

  const hoverOpen = (m: 'tools' | 'convert') => { clearTimeout(closeTimer.current); setOpen(m); };
  const hoverClose = () => { closeTimer.current = setTimeout(() => setOpen(null), 180); };
  const cat = nav.find((c) => c.id === active)!;
  const converters = nav.filter((c) => c.id === 'image' || c.id === 'convert');

  const navLink = 'relative py-5 text-[0.92rem] font-semibold text-muted transition hover:text-ink';
  const under = (on: boolean) => `after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:rounded after:bg-glow after:transition ${on ? 'text-ink after:opacity-100' : 'after:opacity-0 hover:after:opacity-100'}`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md" ref={wrap}>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex" onMouseLeave={hoverClose}>
          <button type="button" aria-expanded={open === 'tools'} aria-controls="mega-tools" onMouseEnter={() => hoverOpen('tools')} onClick={() => setOpen(open === 'tools' ? null : 'tools')}
            className={`flex items-center gap-1 ${navLink} ${under(open === 'tools')}`}>
            Tools <Icon name="chevron" className={`h-3.5 w-3.5 transition ${open === 'tools' ? 'rotate-180' : ''}`} />
          </button>
          <button type="button" aria-expanded={open === 'convert'} aria-controls="mega-convert" onMouseEnter={() => hoverOpen('convert')} onClick={() => setOpen(open === 'convert' ? null : 'convert')}
            className={`flex items-center gap-1 ${navLink} ${under(open === 'convert')}`}>
            Converters <Icon name="chevron" className={`h-3.5 w-3.5 transition ${open === 'convert' ? 'rotate-180' : ''}`} />
          </button>
          <Link href="/category/business/" className={`${navLink} ${under(path?.startsWith('/category/business') ?? false)}`}>Business</Link>
          <Link href="/category/developer/" className={`${navLink} ${under(path?.startsWith('/category/developer') ?? false)}`}>Developers</Link>
          <Link href="/about/" className={`${navLink} ${under(path === '/about/')}`}>About</Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button type="button" onClick={() => setSearch(true)} className="hidden h-10 w-64 items-center gap-2 rounded-lg border border-line bg-[var(--surface)] px-3 text-sm text-muted transition hover:border-[color-mix(in_srgb,var(--ink)_30%,transparent)] md:flex" aria-label="Search tools">
            <Icon name="search" className="h-4 w-4" /> <span className="flex-1 text-left">Search {total} tools…</span> <kbd className="rounded border border-line px-1.5 font-sans text-[11px] font-semibold">/</kbd>
          </button>
          <button type="button" onClick={() => setSearch(true)} className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-[var(--surface)] md:hidden" aria-label="Search tools"><Icon name="search" className="h-4 w-4" /></button>
          <ThemeToggle />
          <button type="button" onClick={() => setMobile(true)} className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-[var(--surface)] lg:hidden" aria-label="Open menu" aria-expanded={mobile}><Icon name="menu" className="h-5 w-5" /></button>
        </div>
      </div>

      {open === 'tools' && (
        <div id="mega-tools" className="menu-in absolute inset-x-0 top-full border-b border-line bg-[var(--surface)] shadow-[0_24px_48px_-24px_rgba(26,23,18,.25)]" onMouseEnter={() => hoverOpen('tools')} onMouseLeave={hoverClose}>
          <div className="mx-auto grid max-w-7xl grid-cols-[220px_1fr] gap-8 px-4 py-7">
            <ul className="grid content-start gap-0.5 border-r border-line pr-6" role="list">
              <li className="eyebrow mb-2">Categories</li>
              {nav.map((c) => (
                <li key={c.id}>
                  <Link href={`/category/${c.id}/`} onMouseEnter={() => setActive(c.id)} onFocus={() => setActive(c.id)}
                    className={`flex items-center justify-between rounded-md border-l-2 px-3 py-2 text-sm font-semibold transition ${active === c.id ? 'border-glow bg-[var(--surface-2)] text-ink' : 'border-transparent text-muted hover:text-ink'}`}>
                    {c.short}<span className="text-xs font-medium tabular-nums text-muted">{c.tools.length}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <div className="mb-5 flex items-baseline justify-between gap-4">
                <div><p className="display text-2xl">{cat.name}</p><p className="mt-1 max-w-xl text-sm text-muted">{cat.description}</p></div>
                <Link href={`/category/${cat.id}/`} className="shrink-0 text-sm font-bold text-brand-700 hover:underline dark:text-glow">All {cat.short.toLowerCase()} tools →</Link>
              </div>
              <ul className="grid grid-cols-3 gap-x-6 gap-y-1" role="list">
                {cat.tools.slice(0, 12).map((t) => (
                  <li key={t.slug}><Link href={`/${t.slug}/`} className="group block rounded-md px-3 py-2.5 transition hover:bg-[var(--surface-2)]">
                    <span className="block text-sm font-semibold group-hover:text-brand-700 dark:group-hover:text-glow">{t.name}</span>
                    <span className="mt-0.5 line-clamp-1 text-xs text-muted">{t.lead}</span>
                  </Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {open === 'convert' && (
        <div id="mega-convert" className="menu-in absolute inset-x-0 top-full border-b border-line bg-[var(--surface)] shadow-[0_24px_48px_-24px_rgba(26,23,18,.25)]" onMouseEnter={() => hoverOpen('convert')} onMouseLeave={hoverClose}>
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 py-7">
            {converters.map((c) => (
              <div key={c.id}>
                <Link href={`/category/${c.id}/`} className="eyebrow mb-3 block">{c.name}</Link>
                <ul className="grid grid-cols-2 gap-x-4" role="list">
                  {c.tools.map((t) => <li key={t.slug}><Link href={`/${t.slug}/`} className="flex items-center justify-between border-b border-dashed border-line px-1 py-2.5 text-sm font-semibold hover:text-brand-700 dark:hover:text-glow">{t.name.replace(/ Converter$/, '')}<Icon name="arrow" className="h-3.5 w-3.5 text-muted" /></Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {mobile && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobile(false)} />
          <div className="drawer-in absolute inset-y-0 right-0 w-[min(92vw,420px)] overflow-y-auto border-l border-line bg-page">
            <div className="flex h-16 items-center justify-between border-b border-line px-4"><Logo /><button type="button" onClick={() => setMobile(false)} className="grid h-10 w-10 place-items-center rounded-lg border border-line" aria-label="Close menu"><Icon name="close" className="h-5 w-5" /></button></div>
            <div className="p-4">
              <button type="button" onClick={() => { setMobile(false); setSearch(true); }} className="flex w-full items-center gap-2 rounded-lg border border-line bg-[var(--surface)] px-3 py-3 text-left text-sm text-muted"><Icon name="search" className="h-4 w-4" /> Search {total} tools…</button>
              <div className="mt-4 divide-y divide-[var(--line)] border-y border-line">
                {nav.map((c) => (
                  <details key={c.id} className="group">
                    <summary className="flex cursor-pointer list-none items-center gap-3 py-3.5">
                      <span className="flex-1 font-semibold">{c.name}</span>
                      <span className="text-xs text-muted">{c.tools.length}</span>
                      <Icon name="chevron" className="h-4 w-4 transition group-open:rotate-180" />
                    </summary>
                    <ul className="grid gap-0.5 pb-3 pl-3" role="list">
                      {c.tools.map((t) => <li key={t.slug}><Link href={`/${t.slug}/`} className="block border-l border-line py-2 pl-3 text-sm text-muted active:text-ink">{t.name}</Link></li>)}
                      <li><Link href={`/category/${c.id}/`} className="block py-2 pl-3 text-sm font-bold text-brand-700 dark:text-glow">All {c.short.toLowerCase()} tools →</Link></li>
                    </ul>
                  </details>
                ))}
              </div>
              <Link href="/all-tools/" className="btn mt-5 w-full">Browse all {total} tools</Link>
            </div>
          </div>
        </div>
      )}

      <SearchDialog open={search} onClose={() => setSearch(false)} index={index} />
    </header>
  );
}

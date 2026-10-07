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
    <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight" aria-label="ToolLantern home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-glow"><Icon name="lantern" className="h-5 w-5" /></span>
      <span className="text-[1.15rem]">ToolLantern</span>
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

  return (
    <header className="sticky top-0 z-50 pt-3" ref={wrap}>
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4">
        <div className="flex flex-1 items-center"><Logo /></div>

        <nav aria-label="Main" className="hidden items-center gap-1 rounded-full card p-1.5 shadow-[0_1px_2px_rgba(14,23,38,.06)] lg:flex" onMouseLeave={hoverClose}>
          <button type="button" aria-expanded={open === 'tools'} aria-controls="mega-tools" onMouseEnter={() => hoverOpen('tools')} onClick={() => setOpen(open === 'tools' ? null : 'tools')}
            className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition ${open === 'tools' ? 'bg-ink text-white' : 'hover:bg-[var(--surface-2)]'}`}>
            Tools <Icon name="chevron" className={`h-3.5 w-3.5 transition ${open === 'tools' ? 'rotate-180' : ''}`} />
          </button>
          <button type="button" aria-expanded={open === 'convert'} aria-controls="mega-convert" onMouseEnter={() => hoverOpen('convert')} onClick={() => setOpen(open === 'convert' ? null : 'convert')}
            className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition ${open === 'convert' ? 'bg-ink text-white' : 'hover:bg-[var(--surface-2)]'}`}>
            Converters <Icon name="chevron" className={`h-3.5 w-3.5 transition ${open === 'convert' ? 'rotate-180' : ''}`} />
          </button>
          <Link href="/category/business/" className="rounded-full px-4 py-2 text-sm font-semibold hover:bg-[var(--surface-2)]">Business</Link>
          <Link href="/category/developer/" className="rounded-full px-4 py-2 text-sm font-semibold hover:bg-[var(--surface-2)]">Developers</Link>
          <Link href="/about/" className="rounded-full px-4 py-2 text-sm font-semibold hover:bg-[var(--surface-2)]">About</Link>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <button type="button" onClick={() => setSearch(true)} className="hidden h-11 items-center gap-2 rounded-full card px-4 text-sm text-muted sm:flex" aria-label="Search tools">
            <Icon name="search" className="h-4 w-4" /> <span>Search</span> <kbd className="rounded-md surface-2 px-1.5 py-0.5 font-sans text-[11px] font-semibold">Ctrl K</kbd>
          </button>
          <button type="button" onClick={() => setSearch(true)} className="grid h-11 w-11 place-items-center rounded-full card sm:hidden" aria-label="Search tools"><Icon name="search" className="h-4 w-4" /></button>
          <ThemeToggle />
          <Link href="/all-tools/" className="hidden items-center gap-2 rounded-full bg-gradient-to-b from-[#ffc565] to-[#f5a524] py-1.5 pl-4 pr-1.5 text-sm font-bold text-ink md:flex">
            <Icon name="grid" className="h-4 w-4" /> All tools <span className="grid h-8 min-w-8 place-items-center rounded-full bg-ink px-2 text-xs font-bold text-glow">{total}</span>
          </Link>
          <button type="button" onClick={() => setMobile(true)} className="grid h-11 w-11 place-items-center rounded-full card lg:hidden" aria-label="Open menu" aria-expanded={mobile}><Icon name="menu" className="h-5 w-5" /></button>
        </div>
      </div>

      {open === 'tools' && (
        <div id="mega-tools" className="menu-in absolute inset-x-0 top-full px-4 pt-2" onMouseEnter={() => hoverOpen('tools')} onMouseLeave={hoverClose}>
          <div className="mx-auto grid max-w-[calc(80rem-2rem)] grid-cols-[280px_1fr_280px] gap-2 rounded-[22px] card p-2 shadow-2xl shadow-black/10">
            <ul className="grid content-start gap-1 p-2" role="list">
              {nav.map((c) => (
                <li key={c.id}>
                  <Link href={`/category/${c.id}/`} onMouseEnter={() => setActive(c.id)} onFocus={() => setActive(c.id)}
                    className={`flex items-center gap-3 rounded-2xl p-2.5 transition ${active === c.id ? 'surface-2' : 'hover:bg-[var(--surface-2)]'}`}>
                    <span className={`tile h-10 w-10 ${c.tint}`}><Icon name={c.icon} className="h-[18px] w-[18px]" /></span>
                    <span className="min-w-0 flex-1"><span className="block text-sm font-bold">{c.name}</span><span className="text-xs text-muted">{c.tools.length} tools</span></span>
                    <Icon name="chevron" className={`h-3.5 w-3.5 -rotate-90 text-muted transition ${active === c.id ? 'opacity-100' : 'opacity-0'}`} />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="rounded-3xl surface-2 p-5">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div><p className="text-lg font-extrabold tracking-tight">{cat.name}</p><p className="mt-0.5 max-w-md text-sm text-muted">{cat.description}</p></div>
                <Link href={`/category/${cat.id}/`} className="shrink-0 text-sm font-bold underline decoration-glow decoration-2 underline-offset-4">View all</Link>
              </div>
              <ul className="grid grid-cols-2 gap-1.5" role="list">
                {cat.tools.slice(0, 10).map((t) => (
                  <li key={t.slug}><Link href={`/${t.slug}/`} className="group block rounded-2xl p-3 transition hover:bg-[var(--surface)]">
                    <span className="flex items-center gap-1.5 text-sm font-bold">{t.name}<Icon name="arrow-up-right" className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" /></span>
                    <span className="mt-0.5 line-clamp-1 text-xs text-muted">{t.lead}</span>
                  </Link></li>
                ))}
              </ul>
            </div>
            <Link href="/image-converter/" className="group flex flex-col justify-between rounded-3xl bg-glow p-5 text-ink">
              <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink/80"><Icon name="image" className="h-5 w-5" /></span><span className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-glow">New</span></div>
              <div>
                <p className="text-2xl font-extrabold leading-tight tracking-tight">Image Converter</p>
                <p className="mt-1 text-sm font-medium opacity-80">JPG, PNG &amp; WebP in seconds. Private — nothing is uploaded.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">Open tool <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-white transition group-hover:rotate-45"><Icon name="arrow-up-right" className="h-4 w-4" /></span></span>
              </div>
            </Link>
          </div>
        </div>
      )}

      {open === 'convert' && (
        <div id="mega-convert" className="menu-in absolute inset-x-0 top-full px-4 pt-2" onMouseEnter={() => hoverOpen('convert')} onMouseLeave={hoverClose}>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 rounded-[22px] card p-2 shadow-2xl shadow-black/10">
            {converters.map((c) => (
              <div key={c.id} className="rounded-3xl surface-2 p-4">
                <Link href={`/category/${c.id}/`} className="mb-2 flex items-center gap-3">
                  <span className={`tile h-10 w-10 ${c.tint}`}><Icon name={c.icon} className="h-[18px] w-[18px]" /></span>
                  <span className="font-extrabold">{c.name}</span>
                </Link>
                <ul className="grid gap-0.5" role="list">
                  {c.tools.map((t) => <li key={t.slug}><Link href={`/${t.slug}/`} className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold hover:bg-[var(--surface)]">{t.name.replace(/ Converter$/, '')}<Icon name="arrow" className="h-3.5 w-3.5 text-muted" /></Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {mobile && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setMobile(false)} />
          <div className="menu-in absolute inset-x-2 top-2 bottom-2 overflow-y-auto rounded-[22px] bg-page p-3">
            <div className="flex items-center justify-between p-2"><Logo /><button type="button" onClick={() => setMobile(false)} className="grid h-11 w-11 place-items-center rounded-full card" aria-label="Close menu"><Icon name="close" className="h-5 w-5" /></button></div>
            <button type="button" onClick={() => { setMobile(false); setSearch(true); }} className="mt-2 flex w-full items-center gap-2 rounded-2xl card px-4 py-3.5 text-left text-muted"><Icon name="search" className="h-4 w-4" /> Search {total} tools…</button>
            <div className="mt-3 grid gap-2">
              {nav.map((c) => (
                <details key={c.id} className="group rounded-3xl card">
                  <summary className="flex cursor-pointer list-none items-center gap-3 p-3">
                    <span className={`tile h-10 w-10 ${c.tint}`}><Icon name={c.icon} className="h-[18px] w-[18px]" /></span>
                    <span className="flex-1 font-bold">{c.name}<span className="block text-xs font-medium text-muted">{c.tools.length} tools</span></span>
                    <Icon name="chevron" className="h-4 w-4 transition group-open:rotate-180" />
                  </summary>
                  <ul className="grid gap-0.5 px-3 pb-3" role="list">
                    {c.tools.map((t) => <li key={t.slug}><Link href={`/${t.slug}/`} className="block rounded-xl px-3 py-2.5 text-sm font-semibold active:bg-[var(--surface-2)]">{t.name}</Link></li>)}
                    <li><Link href={`/category/${c.id}/`} className="block px-3 py-2 text-sm font-bold underline decoration-glow decoration-2 underline-offset-4">All {c.short.toLowerCase()} tools</Link></li>
                  </ul>
                </details>
              ))}
            </div>
            <Link href="/all-tools/" className="btn mt-3 w-full">Browse all {total} tools <span className="dot-icon h-7 w-7"><Icon name="grid" className="h-4 w-4" /></span></Link>
          </div>
        </div>
      )}

      <SearchDialog open={search} onClose={() => setSearch(false)} index={index} />
    </header>
  );
}

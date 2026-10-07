'use client';

import Link from 'next/link';
import { useState } from 'react';

const fmt = (n: number) => (Number.isFinite(n) ? n.toLocaleString('en-US', { maximumFractionDigits: 2 }) : '—');

const TABS = [
  { id: 'pct', label: 'Percent of', href: '/percentage-calculator/' },
  { id: 'kg', label: 'kg → lbs', href: '/kg-to-lbs/' },
  { id: 'temp', label: '°C → °F', href: '/celsius-to-fahrenheit/' },
] as const;

export function QuickAnswer() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('pct');
  const [p, setP] = useState('15');
  const [of, setOf] = useState('240');
  const [kg, setKg] = useState('70');
  const [c, setC] = useState('25');
  const num = (v: string) => parseFloat(v.replace(/,/g, ''));
  const current = TABS.find((t) => t.id === tab)!;

  let sentence: React.ReactNode;
  if (tab === 'pct') sentence = <><b>{p || 0}%</b> of <b>{of || 0}</b> is</>;
  else if (tab === 'kg') sentence = <><b>{kg || 0} kg</b> equals</>;
  else sentence = <><b>{c || 0} °C</b> equals</>;
  const result = tab === 'pct' ? fmt((num(p) / 100) * num(of)) : tab === 'kg' ? `${fmt(num(kg) * 2.20462262)} lbs` : `${fmt(num(c) * 9 / 5 + 32)} °F`;

  return (
    <div className="relative rounded-2xl card p-5 shadow-[0_30px_60px_-30px_rgba(26,23,18,.35)] sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <p className="eyebrow">Quick answer</p>
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Live</span>
      </div>
      <div role="tablist" aria-label="Quick calculators" className="grid grid-cols-3 gap-1 rounded-lg bg-[var(--surface-2)] p-1">
        {TABS.map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
            className={`rounded-md px-2 py-2 text-sm font-semibold transition ${tab === t.id ? 'bg-[var(--surface)] shadow-sm' : 'text-muted hover:text-ink'}`}>{t.label}</button>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {tab === 'pct' && (<>
          <label className="text-sm font-medium text-muted">Percent<input className="input mt-1.5" inputMode="decimal" value={p} onChange={(e) => setP(e.target.value)} /></label>
          <label className="text-sm font-medium text-muted">Of number<input className="input mt-1.5" inputMode="decimal" value={of} onChange={(e) => setOf(e.target.value)} /></label>
        </>)}
        {tab === 'kg' && <label className="col-span-2 text-sm font-medium text-muted">Kilograms<input className="input mt-1.5" inputMode="decimal" value={kg} onChange={(e) => setKg(e.target.value)} /></label>}
        {tab === 'temp' && <label className="col-span-2 text-sm font-medium text-muted">Celsius<input className="input mt-1.5" inputMode="decimal" value={c} onChange={(e) => setC(e.target.value)} /></label>}
      </div>
      <div aria-live="polite" className="mt-5 rounded-xl border border-dashed border-[color-mix(in_srgb,var(--color-glow)_70%,transparent)] bg-[color-mix(in_srgb,var(--color-glow)_10%,transparent)] p-4">
        <p className="text-sm text-muted">{sentence}</p>
        <p className="display mt-1 text-4xl">{result}</p>
      </div>
      <Link href={current.href} className="mt-4 inline-flex text-sm font-bold text-brand-700 hover:underline dark:text-glow">Open the full tool, with the working →</Link>
    </div>
  );
}

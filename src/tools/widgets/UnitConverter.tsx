'use client';

import { useMemo, useState } from 'react';
import { UNITS, convert, nice, type Kind } from '@/tools/units';
import { Icon } from '@/components/Icon';
import { CopyButton } from '@/components/CopyButton';

const TABLE: Record<Kind, number[]> = {
  length: [1, 2, 5, 10, 12, 20, 25, 50, 100, 150, 180],
  weight: [1, 2, 5, 10, 20, 50, 60, 70, 80, 100],
  temperature: [-40, -10, 0, 10, 20, 25, 30, 37, 40, 100],
};

export function UnitConverter({ kind = 'length', from, to, value = '1' }: { kind?: Kind; from?: string; to?: string; value?: string }) {
  const units = UNITS[kind];
  const [a, setA] = useState(from ?? units[0].id);
  const [b, setB] = useState(to ?? units[1].id);
  const [v, setV] = useState(String(value));
  const n = parseFloat(v.replace(/,/g, ''));
  const out = useMemo(() => (isFinite(n) ? convert(kind, n, a, b) : NaN), [kind, n, a, b]);
  const ua = units.find((u) => u.id === a)!, ub = units.find((u) => u.id === b)!;
  const factor = kind === 'temperature' ? null : convert(kind, 1, a, b);

  return (
    <div className="grid gap-6">
      <div className="grid items-end gap-3 md:grid-cols-[1fr_auto_1fr]">
        <div className="rounded-3xl surface-2 p-4">
          <label htmlFor="u-from" className="text-sm font-semibold text-muted">From</label>
          <div className="mt-2 flex gap-2">
            <input id="u-val" aria-label="Value" inputMode="decimal" className="input !bg-[var(--surface)] text-2xl font-bold" value={v} onChange={(e) => setV(e.target.value)} />
            <select id="u-from" className="input w-auto !bg-[var(--surface)]" value={a} onChange={(e) => setA(e.target.value)}>
              {units.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
        </div>
        <button type="button" onClick={() => { setA(b); setB(a); }} className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-ink text-white transition hover:rotate-180" aria-label="Swap units">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 4v16M3 8l4-4 4 4M17 20V4m4 12l-4 4-4-4" /></svg>
        </button>
        <div className="rounded-3xl bg-glow-soft p-4 dark:bg-[#2a2210]">
          <label htmlFor="u-to" className="text-sm font-semibold text-muted">To</label>
          <div className="mt-2 flex gap-2">
            <output aria-live="polite" className="flex min-h-[52px] flex-1 items-center overflow-x-auto rounded-[14px] bg-[var(--surface)] px-4 text-2xl font-extrabold tabular-nums">{nice(out)}</output>
            <select id="u-to" className="input w-auto !bg-[var(--surface)]" value={b} onChange={(e) => setB(e.target.value)}>
              {units.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl surface p-4 text-sm">
        <Icon name="sparkle" className="h-4 w-4 text-amber-600" />
        <span className="font-semibold">{isFinite(n) ? `${nice(n)} ${ua.symbol} = ${nice(out)} ${ub.symbol}` : 'Enter a number'}</span>
        {factor !== null && <span className="text-muted">· 1 {ua.symbol} = {nice(factor)} {ub.symbol}</span>}
        <span className="ml-auto"><CopyButton text={isFinite(out) ? String(+out.toPrecision(10)) : ''} label="Copy result" /></span>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">{ua.name} to {ub.name.toLowerCase()} table</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {TABLE[kind].map((x) => (
            <button type="button" key={x} onClick={() => setV(String(x))} className="flex justify-between rounded-xl surface px-3 py-2 text-left text-sm tabular-nums hover:border-[var(--ink)]">
              <span className="text-muted">{x} {ua.symbol}</span><span className="font-semibold">{nice(convert(kind, x, a, b))} {ub.symbol}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

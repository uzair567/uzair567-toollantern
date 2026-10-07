'use client';

import { useEffect, useMemo, useState } from 'react';
import { calcDefs, type Values, type Field } from '@/tools/calc-defs';
import { ToolOutput } from './ToolOutput';

export function Calculator({ engine, defaults }: { engine: string; defaults?: Record<string, string | number> }) {
  const def = calcDefs[engine];
  const initial = useMemo(() => {
    const v: Values = {};
    for (const f of def.fields) v[f.id] = defaults?.[f.id] !== undefined ? String(defaults[f.id]) : f.default;
    return v;
  }, [def, defaults]);
  const [values, setValues] = useState<Values>(initial);

  // Allow pre-filling from the URL (?watts=1500&hours=6) so results can be shared.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (![...p.keys()].length) return;
    setValues((prev) => {
      const next = { ...prev };
      for (const f of def.fields) { const q = p.get(f.id); if (q !== null) next[f.id] = q; }
      return next;
    });
  }, [def]);

  const out = useMemo(() => def.compute(values), [def, values]);
  const set = (id: string, val: string) => setValues((p) => ({ ...p, [id]: val }));

  const share = async () => {
    const p = new URLSearchParams();
    for (const f of def.fields) if (values[f.id] !== '') p.set(f.id, values[f.id]);
    const url = `${window.location.origin}${window.location.pathname}?${p.toString()}`;
    try { await navigator.clipboard.writeText(url); } catch { /* ignore */ }
    window.history.replaceState(null, '', url);
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  };
  const [copied, setCopied] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-4" onSubmit={(e) => e.preventDefault()} aria-label="Calculator inputs">
        {def.fields.filter((f) => !f.show || f.show(values)).map((f) => (
          <FieldInput key={f.id} f={f} values={values} onChange={set} />
        ))}
        <div className="col-span-2 flex flex-wrap gap-2 pt-1">
          <button type="button" className="btn-ghost" onClick={() => setValues(initial)}>Reset</button>
          <button type="button" className="btn-ghost" onClick={share}>{copied ? 'Link copied ✓' : 'Copy link to these results'}</button>
        </div>
      </form>
      <ToolOutput out={out} />
    </div>
  );
}

function FieldInput({ f, values, onChange }: { f: Field; values: Values; onChange: (id: string, v: string) => void }) {
  const id = `f-${f.id}`;
  const label = f.label2 ? f.label2(values) : f.label;
  const unit = typeof f.unit === 'function' ? f.unit(values) : f.unit;
  const wide = f.type === 'select' || f.type === 'date';
  return (
    <div className={wide ? 'col-span-2 sm:col-span-1' : ''}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}{f.optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {f.type === 'select' ? (
        <select id={id} className="input" value={values[f.id]} onChange={(e) => onChange(f.id, e.target.value)}>
          {f.options!.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : (
        <div className="relative">
          <input
            id={id}
            className="input"
            type={f.type === 'date' ? 'date' : 'text'}
            inputMode={f.type === 'number' ? 'decimal' : undefined}
            value={values[f.id]}
            onChange={(e) => onChange(f.id, e.target.value)}
            style={unit ? { paddingRight: '3.25rem' } : undefined}
            aria-describedby={f.help ? `${id}-help` : undefined}
          />
          {unit && <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted">{unit}</span>}
        </div>
      )}
      {f.help && <p id={`${id}-help`} className="mt-1 text-xs text-muted">{f.help}</p>}
    </div>
  );
}

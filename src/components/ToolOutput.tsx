import type { CalcOutput } from '@/tools/calc-defs';

export function ToolOutput({ out }: { out: CalcOutput }) {
  const primary = out.results.find((r) => r.primary);
  const rest = out.results.filter((r) => !r.primary);
  return (
    <section aria-live="polite" aria-label="Result" className="rounded-2xl border border-line bg-brand-50 p-5 dark:bg-[#10201e]">
      {out.error ? (
        <p className="text-sm font-medium text-muted">{out.error}</p>
      ) : (
        <>
          {primary && (
            <div className="mb-4">
              <p className="text-sm font-medium text-brand-700 dark:text-brand-200">{primary.label}</p>
              <p className="mt-1 break-words text-3xl font-bold tracking-tight sm:text-4xl">{primary.value}</p>
              {primary.note && <p className="mt-1 text-sm text-muted">{primary.note}</p>}
            </div>
          )}
          {rest.length > 0 && (
            <dl className="divide-y divide-[var(--line)] rounded-xl surface">
              {rest.map((r) => (
                <div key={r.label} className="flex items-start justify-between gap-4 px-4 py-2.5">
                  <dt className="text-sm text-muted">{r.label}{r.note && <span className="block text-xs">{r.note}</span>}</dt>
                  <dd className="text-right font-semibold tabular-nums">{r.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {out.working && out.working.length > 0 && (
            <details className="mt-4 text-sm">
              <summary className="cursor-pointer font-semibold text-brand-700 dark:text-brand-200">Show the working</summary>
              <ol className="mt-2 space-y-1 font-mono text-xs text-muted">
                {out.working.map((w, i) => <li key={i}>{w}</li>)}
              </ol>
            </details>
          )}
        </>
      )}
    </section>
  );
}

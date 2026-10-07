import type { CalcOutput } from '@/tools/calc-defs';

export function ToolOutput({ out }: { out: CalcOutput }) {
  const primary = out.results.find((r) => r.primary);
  const rest = out.results.filter((r) => !r.primary);
  return (
    <section aria-live="polite" aria-label="Result" className="rounded-[24px] bg-glow-soft p-5 sm:p-6 dark:bg-[#2a2210]">
      {out.error ? (
        <p className="text-sm font-medium text-muted">{out.error}</p>
      ) : (
        <>
          {primary && (
            <div className="mb-4">
              <p className="text-sm font-medium text-amber-800 dark:text-glow">{primary.label}</p>
              <p className="mt-1 break-words display text-4xl sm:text-5xl">{primary.value}</p>
              {primary.note && <p className="mt-1 text-sm text-muted">{primary.note}</p>}
            </div>
          )}
          {rest.length > 0 && (
            <dl className="divide-y divide-[var(--line)] rounded-2xl bg-[var(--surface)]">
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
              <summary className="cursor-pointer font-semibold text-amber-800 dark:text-glow">Show the working</summary>
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

import { UNITS, convert, type Kind } from '@/tools/units';

const nice = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

// Static (server-rendered) conversion tables, so common lookups like "70 kg in lbs"
// are answered in the page HTML without running any JavaScript.
const VALUES: Record<Kind, Record<string, number[]>> = {
  length: {
    cm: [1, 2, 5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100, 150, 160, 170, 180, 200],
    in: [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 18, 24, 27, 32, 36, 40, 50, 65],
    m: [1, 2, 5, 10, 20, 50, 100, 200, 400, 1000],
  },
  weight: {
    kg: [1, 2, 5, 10, 20, 23, 30, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 100, 120],
    lb: [1, 5, 10, 20, 50, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 220, 250],
  },
  temperature: {
    c: [-40, -20, -10, 0, 10, 15, 20, 22, 25, 30, 35, 37, 40, 100, 180, 200, 220],
    f: [-40, 0, 32, 50, 60, 68, 70, 75, 80, 90, 98.6, 100, 212, 350, 400, 450],
    k: [0, 233.15, 273.15, 293.15, 310.15, 373.15],
  },
};

export function UnitTable({ kind, from, to }: { kind: Kind; from: string; to: string }) {
  const values = VALUES[kind][from];
  if (!values) return null;
  const f = UNITS[kind].find((u) => u.id === from)!, t = UNITS[kind].find((u) => u.id === to)!;
  return (
    <>
      <h2>{f.name} to {t.name.toLowerCase()} table</h2>
      <div className="not-prose overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-sm">
          <thead className="surface-2 text-left">
            <tr><th scope="col" className="px-4 py-2.5 font-bold">{f.name} ({f.symbol})</th><th scope="col" className="px-4 py-2.5 font-bold">{t.name} ({t.symbol})</th></tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {values.map((v) => (
              <tr key={v}><td className="px-4 py-2 tabular-nums">{nice(v)} {f.symbol}</td><td className="px-4 py-2 font-semibold tabular-nums">{nice(convert(kind, v, from, to))} {t.symbol}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

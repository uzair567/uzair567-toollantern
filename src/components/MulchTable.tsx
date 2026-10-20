// Static mulch reference tables (server-rendered): bags ↔ cubic yards and coverage per yard.
const f = (n: number, d = 2) => n.toLocaleString('en-US', { maximumFractionDigits: d });
const BAGS = [5, 10, 14, 20, 27, 30, 40, 50, 54, 60, 75, 100];
const DEPTHS = [1, 2, 3, 4, 6];

export function MulchTable() {
  return (
    <>
      <h2>Mulch bags to cubic yards</h2>
      <p>One cubic yard is 27 cubic feet, so it equals 13.5 bags of 2 cu ft or 9 bags of 3 cu ft.</p>
      <div className="not-prose overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-sm">
          <thead className="surface-2 text-left">
            <tr><th scope="col" className="px-4 py-2.5 font-bold">Bags</th><th scope="col" className="px-4 py-2.5 font-bold">2 cu ft bags = cubic yards</th><th scope="col" className="px-4 py-2.5 font-bold">3 cu ft bags = cubic yards</th></tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {BAGS.map((b) => (
              <tr key={b}><td className="px-4 py-2 font-semibold tabular-nums">{b} bags</td><td className="px-4 py-2 tabular-nums">{f((b * 2) / 27)} yd³ ({b * 2} cu ft)</td><td className="px-4 py-2 tabular-nums">{f((b * 3) / 27)} yd³ ({b * 3} cu ft)</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>How much does a cubic yard of mulch cover?</h2>
      <div className="not-prose overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-sm">
          <thead className="surface-2 text-left">
            <tr><th scope="col" className="px-4 py-2.5 font-bold">Depth</th><th scope="col" className="px-4 py-2.5 font-bold">1 cubic yard covers</th><th scope="col" className="px-4 py-2.5 font-bold">One 2 cu ft bag covers</th><th scope="col" className="px-4 py-2.5 font-bold">Cubic feet per 100 sq ft</th></tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {DEPTHS.map((d) => (
              <tr key={d}><td className="px-4 py-2 font-semibold">{d} inch{d > 1 ? 'es' : ''}</td><td className="px-4 py-2 tabular-nums">{f(324 / d, 0)} sq ft</td><td className="px-4 py-2 tabular-nums">{f(24 / d, 1)} sq ft</td><td className="px-4 py-2 tabular-nums">{f((100 * d) / 12, 1)} cu ft</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

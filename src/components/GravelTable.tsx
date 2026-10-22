// Static cubic-yards-to-tons table for the gravel calculator page (server-rendered for search).
const MATERIALS = [
  { name: 'Pea / crushed gravel', d: 1.4 },
  { name: 'Crushed stone #57', d: 1.5 },
  { name: 'River rock', d: 1.2 },
  { name: 'Sand', d: 1.35 },
];
const YARDS = [0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30];
const f = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

export function GravelTable() {
  return (
    <>
      <h2>Cubic yards to tons of gravel</h2>
      <p>US short tons, using typical dry weights. Check your supplier’s figure — moisture and stone size change it slightly.</p>
      <div className="not-prose overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-sm">
          <thead className="surface-2 text-left">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-bold">Cubic yards</th>
              {MATERIALS.map((m) => <th key={m.name} scope="col" className="px-4 py-2.5 font-bold">{m.name} <span className="font-normal text-muted">({m.d} t/yd³)</span></th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {YARDS.map((y) => (
              <tr key={y}>
                <td className="px-4 py-2 font-semibold tabular-nums">{f(y)} yd³</td>
                {MATERIALS.map((m) => <td key={m.name} className="px-4 py-2 tabular-nums">{f(y * m.d)} tons</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Tons to cubic yards of gravel</h2>
      <p>How many yards are in a ton? Divide tons by the weight per cubic yard: 1 ton of typical gravel is about {f(1 / 1.4)} cubic yards.</p>
      <div className="not-prose overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-sm">
          <thead className="surface-2 text-left">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-bold">Tons</th>
              {MATERIALS.map((m) => <th key={m.name} scope="col" className="px-4 py-2.5 font-bold">{m.name}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {[1, 2, 5, 10, 15, 20, 25].map((t) => (
              <tr key={t}>
                <td className="px-4 py-2 font-semibold tabular-nums">{t} ton{t > 1 ? 's' : ''}</td>
                {MATERIALS.map((m) => <td key={m.name} className="px-4 py-2 tabular-nums">{f(t / m.d)} yd³</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>How much does a ton of gravel cover?</h2>
      <p>One ton of typical gravel (about {f(1 / 1.4)} cubic yards) spread at common depths:</p>
      <div className="not-prose overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-sm">
          <thead className="surface-2 text-left">
            <tr><th scope="col" className="px-4 py-2.5 font-bold">Depth</th><th scope="col" className="px-4 py-2.5 font-bold">1 ton covers</th><th scope="col" className="px-4 py-2.5 font-bold">Tons per 100 sq ft</th></tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {[2, 3, 4, 6].map((d) => (
              <tr key={d}><td className="px-4 py-2 font-semibold">{d} inches</td><td className="px-4 py-2 tabular-nums">{Math.round(27 / 1.4 / (d / 12))} sq ft</td><td className="px-4 py-2 tabular-nums">{f((100 * d) / 12 / 27 * 1.4)} t</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

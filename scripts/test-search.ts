import { rank } from '../src/lib/search.ts';
import { tools } from '../src/lib/tools.ts';
const index = tools.map((t) => ({ s: t.slug, n: t.name, c: t.category, l: t.lead, k: [t.name, ...t.keywords].join(' ').toLowerCase() }));
for (const q of ['How much electricity does my AC use?', 'how many tiles do i need', 'fridge cost', 'json', 'how old am i', 'stripe fees', 'gallons of paint', 'days between dates', '20% off', 'decode token']) {
  console.log(q.padEnd(40), '→', rank(index, q).slice(0, 3).map((e) => e.s).join(', '));
}

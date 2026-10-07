export interface SearchEntry { s: string; n: string; c: string; l: string; k: string }

const STOP = new Set('a an the of to for in on my is how much many does do what whats what\'s i me can use uses using need calculate calculator tool online free and or with by it this that much your you'.split(' '));
const SYN: Record<string, string> = {
  aircon: 'ac', 'air-conditioner': 'ac', conditioner: 'ac', ac: 'ac', fridge: 'refrigerator', freezer: 'refrigerator',
  heater: 'heater', telly: 'tv', television: 'tv', power: 'electricity', energy: 'electricity', bill: 'electricity',
  kwh: 'electricity', watt: 'electricity', watts: 'electricity', washer: 'washing', laundry: 'washing',
  tiles: 'tile', tiling: 'tile', painting: 'paint', floor: 'flooring', floors: 'flooring', laminate: 'flooring',
  cement: 'concrete', slab: 'concrete', stone: 'gravel', rock: 'gravel', percent: 'percentage', '%': 'percentage',
  epoch: 'timestamp', guid: 'uuid', token: 'jwt', words: 'word', characters: 'character', chars: 'character',
  old: 'age', birthday: 'age', days: 'date', profit: 'margin', fees: 'fee', sale: 'discount', off: 'discount',
};

const norm = (t: string) => SYN[t] ?? t.replace(/s$/, '');
const tokens = (q: string) => q.toLowerCase().replace(/[^a-z0-9%\s-]/g, ' ').split(/\s+/).filter((t) => t && !STOP.has(t)).map(norm);

export function rank(index: SearchEntry[], q: string) {
  const qt = tokens(q);
  if (!qt.length) return [];
  return index
    .map((e) => {
      const nameT = new Set(e.n.toLowerCase().split(/[^a-z0-9]+/).map(norm));
      const keyT = new Set(e.k.split(/[^a-z0-9%]+/).map(norm));
      let score = 0, hits = 0;
      for (const t of qt) {
        if (nameT.has(t)) { score += 5; hits++; }
        else if (keyT.has(t)) { score += 2; hits++; }
        else if (t.length >= 3 && [...nameT].some((w) => w.startsWith(t))) { score += 2; hits++; }
        else if (t.length >= 4 && e.k.includes(t)) { score += 1; hits++; }
      }
      if (e.k.includes(q.toLowerCase().trim())) score += 3;
      if (hits && hits === qt.length) score += 4; // every meaningful word matched
      return { e, score: hits ? score + hits * 2 : 0 };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 7)
    .map((r) => r.e);
}


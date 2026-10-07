// Pure calculator definitions: input fields + compute function.
// No React here, so these can be unit-tested directly (scripts/test-calcs.ts).

export type FieldType = 'number' | 'select' | 'date';

export interface Field {
  id: string;
  label: string;
  type: FieldType;
  default: string;
  unit?: string | ((v: Values) => string);
  options?: { value: string; label: string }[];
  step?: string;
  min?: number;
  help?: string;
  optional?: boolean;
  /** hide field unless predicate passes */
  show?: (v: Values) => boolean;
  label2?: (v: Values) => string;
}

export type Values = Record<string, string>;

export interface ResultRow { label: string; value: string; primary?: boolean; note?: string }
export interface CalcOutput { results: ResultRow[]; working?: string[]; error?: string }

export interface CalcDef {
  fields: Field[];
  compute: (v: Values) => CalcOutput;
}

// ---------- helpers ----------
export const num = (v: string | undefined) => {
  if (v === undefined || v === null) return NaN;
  const s = String(v).replace(/,/g, '').trim();
  if (s === '') return NaN;
  return Number(s);
};
export const fmt = (n: number, max = 2) => {
  if (!isFinite(n)) return '—';
  return n.toLocaleString('en-US', { maximumFractionDigits: max, minimumFractionDigits: 0 });
};
export const money = (n: number, sym = '$') => {
  if (!isFinite(n)) return '—';
  const s = Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${n < 0 ? '−' : ''}${sym}${s}`;
};
const pct = (n: number, max = 2) => (isFinite(n) ? `${fmt(n, max)}%` : '—');
export const ceil = (n: number) => Math.ceil(Number(n.toFixed(6)));
const need = (...xs: number[]) => xs.every((x) => isFinite(x));
const err = (error: string): CalcOutput => ({ results: [], error });

const currencyField: Field = {
  id: 'cur', label: 'Currency', type: 'select', default: '$',
  options: [
    { value: '$', label: 'US Dollar ($)' }, { value: '€', label: 'Euro (€)' }, { value: '£', label: 'Pound (£)' },
    { value: 'Rs ', label: 'Rupee (Rs)' }, { value: 'A$', label: 'Australian $ (A$)' }, { value: 'C$', label: 'Canadian $ (C$)' },
  ],
};
const unitSys: Field = {
  id: 'units', label: 'Units', type: 'select', default: 'imperial',
  options: [{ value: 'imperial', label: 'Feet & inches' }, { value: 'metric', label: 'Meters & cm' }],
};
const len = (v: Values) => (v.units === 'metric' ? 'm' : 'ft');
const small = (v: Values) => (v.units === 'metric' ? 'cm' : 'in');

// ---------- definitions ----------
export const calcDefs: Record<string, CalcDef> = {
  'percentage-calculator': {
    fields: [
      { id: 'mode', label: 'What do you want to find?', type: 'select', default: 'of', options: [
        { value: 'of', label: 'What is X% of Y?' },
        { value: 'is', label: 'X is what percent of Y?' },
        { value: 'whole', label: 'X is Y% of what number?' },
      ] },
      { id: 'a', label: 'X', type: 'number', default: '15', label2: (v) => (v.mode === 'of' ? 'Percentage (X)' : v.mode === 'is' ? 'Part (X)' : 'Part (X)') },
      { id: 'b', label: 'Y', type: 'number', default: '240', label2: (v) => (v.mode === 'of' ? 'Number (Y)' : v.mode === 'is' ? 'Whole (Y)' : 'Percentage (Y)') },
    ],
    compute: (v) => {
      const a = num(v.a), b = num(v.b);
      if (!need(a, b)) return err('Enter both numbers.');
      if (v.mode === 'of') {
        const r = (a / 100) * b;
        return { results: [{ label: `${fmt(a, 6)}% of ${fmt(b, 6)}`, value: fmt(r, 6), primary: true }], working: [`${fmt(a, 6)} ÷ 100 × ${fmt(b, 6)} = ${fmt(r, 6)}`] };
      }
      if (v.mode === 'is') {
        if (b === 0) return err('The whole (Y) cannot be zero.');
        const r = (a / b) * 100;
        return { results: [{ label: `${fmt(a, 6)} is this percent of ${fmt(b, 6)}`, value: pct(r, 4), primary: true }], working: [`${fmt(a, 6)} ÷ ${fmt(b, 6)} × 100 = ${fmt(r, 4)}%`] };
      }
      if (b === 0) return err('The percentage (Y) cannot be zero.');
      const r = a / (b / 100);
      return { results: [{ label: `${fmt(a, 6)} is ${fmt(b, 6)}% of`, value: fmt(r, 6), primary: true }], working: [`${fmt(a, 6)} ÷ (${fmt(b, 6)} ÷ 100) = ${fmt(r, 6)}`] };
    },
  },

  'percentage-change-calculator': {
    fields: [
      { id: 'from', label: 'Original value', type: 'number', default: '80' },
      { id: 'to', label: 'New value', type: 'number', default: '100' },
    ],
    compute: (v) => {
      const a = num(v.from), b = num(v.to);
      if (!need(a, b)) return err('Enter both values.');
      if (a === 0) return err('Percentage change from zero is undefined. Use a non-zero original value.');
      const ch = ((b - a) / Math.abs(a)) * 100;
      const diff = b - a;
      const pdiff = (Math.abs(a - b) / ((a + b) / 2)) * 100;
      return {
        results: [
          { label: ch >= 0 ? 'Percentage increase' : 'Percentage decrease', value: pct(Math.abs(ch)), primary: true },
          { label: 'Change in value', value: (diff >= 0 ? '+' : '−') + fmt(Math.abs(diff), 4) },
          { label: 'Percentage difference (symmetric)', value: isFinite(pdiff) ? pct(pdiff) : '—', note: 'Compares the gap to the average of both values.' },
        ],
        working: [`(${fmt(b, 4)} − ${fmt(a, 4)}) ÷ |${fmt(a, 4)}| × 100 = ${fmt(ch, 4)}%`],
      };
    },
  },

  'profit-margin-calculator': {
    fields: [
      currencyField,
      { id: 'cost', label: 'Cost', type: 'number', default: '30', help: 'What the item costs you (COGS).' },
      { id: 'price', label: 'Selling price (revenue)', type: 'number', default: '50' },
    ],
    compute: (v) => {
      const c = num(v.cost), p = num(v.price), s = v.cur || '$';
      if (!need(c, p)) return err('Enter cost and selling price.');
      if (p === 0) return err('Selling price cannot be zero.');
      const profit = p - c;
      const margin = (profit / p) * 100;
      const markup = c === 0 ? NaN : (profit / c) * 100;
      return {
        results: [
          { label: 'Gross margin', value: pct(margin), primary: true },
          { label: 'Gross profit', value: money(profit, s) },
          { label: 'Markup', value: pct(markup) },
        ],
        working: [`Profit = ${money(p, s)} − ${money(c, s)} = ${money(profit, s)}`, `Margin = ${money(profit, s)} ÷ ${money(p, s)} × 100 = ${fmt(margin)}%`],
      };
    },
  },

  'markup-calculator': {
    fields: [
      currencyField,
      { id: 'cost', label: 'Cost', type: 'number', default: '40' },
      { id: 'markup', label: 'Markup', type: 'number', default: '50', unit: '%' },
    ],
    compute: (v) => {
      const c = num(v.cost), m = num(v.markup), s = v.cur || '$';
      if (!need(c, m)) return err('Enter cost and markup.');
      const price = c * (1 + m / 100);
      const profit = price - c;
      const margin = price === 0 ? NaN : (profit / price) * 100;
      return {
        results: [
          { label: 'Selling price', value: money(price, s), primary: true },
          { label: 'Profit per unit', value: money(profit, s) },
          { label: 'Equivalent gross margin', value: pct(margin) },
        ],
        working: [`Price = ${money(c, s)} × (1 + ${fmt(m)} ÷ 100) = ${money(price, s)}`],
      };
    },
  },

  'discount-calculator': {
    fields: [
      currencyField,
      { id: 'price', label: 'Original price', type: 'number', default: '120' },
      { id: 'd1', label: 'Discount', type: 'number', default: '25', unit: '%' },
      { id: 'd2', label: 'Extra discount (optional)', type: 'number', default: '', unit: '%', optional: true, help: 'Applied after the first discount, e.g. "extra 10% off sale price".' },
      { id: 'tax', label: 'Sales tax (optional)', type: 'number', default: '', unit: '%', optional: true },
    ],
    compute: (v) => {
      const p = num(v.price), d1 = num(v.d1), s = v.cur || '$';
      const d2 = isFinite(num(v.d2)) ? num(v.d2) : 0;
      const tax = isFinite(num(v.tax)) ? num(v.tax) : 0;
      if (!need(p, d1)) return err('Enter the price and discount.');
      const after1 = p * (1 - d1 / 100);
      const after2 = after1 * (1 - d2 / 100);
      const withTax = after2 * (1 + tax / 100);
      const saved = p - after2;
      const effective = p === 0 ? 0 : (saved / p) * 100;
      const rows: ResultRow[] = [
        { label: 'Final price', value: money(tax ? withTax : after2, s), primary: true, note: tax ? `Includes ${fmt(tax)}% tax` : undefined },
        { label: 'You save', value: money(saved, s) },
        { label: 'Effective total discount', value: pct(effective) },
      ];
      return { results: rows, working: [`${money(p, s)} × (1 − ${fmt(d1)}%) = ${money(after1, s)}`, ...(d2 ? [`${money(after1, s)} × (1 − ${fmt(d2)}%) = ${money(after2, s)}`] : [])] };
    },
  },

  'break-even-calculator': {
    fields: [
      currencyField,
      { id: 'fixed', label: 'Fixed costs (per period)', type: 'number', default: '5000', help: 'Rent, salaries, software — costs that don’t change with sales.' },
      { id: 'price', label: 'Price per unit', type: 'number', default: '25' },
      { id: 'var', label: 'Variable cost per unit', type: 'number', default: '10', help: 'Materials, shipping, payment fees per sale.' },
    ],
    compute: (v) => {
      const f = num(v.fixed), p = num(v.price), vc = num(v.var), s = v.cur || '$';
      if (!need(f, p, vc)) return err('Fill in all three fields.');
      const cm = p - vc;
      if (cm <= 0) return err('Price must be higher than variable cost per unit, otherwise you can never break even.');
      const units = f / cm;
      return {
        results: [
          { label: 'Break-even units', value: fmt(ceil(units), 0), primary: true, note: `Exact: ${fmt(units)} units` },
          { label: 'Break-even revenue', value: money(ceil(units) * p, s) },
          { label: 'Contribution margin per unit', value: money(cm, s) },
          { label: 'Contribution margin ratio', value: pct((cm / p) * 100) },
        ],
        working: [`Units = ${money(f, s)} ÷ (${money(p, s)} − ${money(vc, s)}) = ${fmt(units)}`],
      };
    },
  },

  'stripe-fee-calculator': feeCalc('2.9', '0.30'),
  'paypal-fee-calculator': feeCalc('3.49', '0.49'),

  'age-calculator': {
    fields: [
      { id: 'dob', label: 'Date of birth', type: 'date', default: '1995-06-15' },
      { id: 'at', label: 'Age on this date', type: 'date', default: '', help: 'Leave as today, or pick any date.' },
    ],
    compute: (v) => {
      const d = parseDate(v.dob), at = v.at ? parseDate(v.at) : today();
      if (!d || !at) return err('Pick a valid date of birth.');
      if (at < d) return err('The "age on" date must be after the date of birth.');
      const { y, m, dd } = ymdDiff(d, at);
      const days = Math.round((at.getTime() - d.getTime()) / 864e5);
      let next = new Date(Date.UTC(at.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
      if (next < at) next = new Date(Date.UTC(at.getUTCFullYear() + 1, d.getUTCMonth(), d.getUTCDate()));
      const toNext = Math.round((next.getTime() - at.getTime()) / 864e5);
      return {
        results: [
          { label: 'Age', value: `${y} years, ${m} months, ${dd} days`, primary: true },
          { label: 'Total months', value: fmt(y * 12 + m, 0) },
          { label: 'Total weeks', value: fmt(Math.floor(days / 7), 0) },
          { label: 'Total days', value: fmt(days, 0) },
          { label: 'Next birthday', value: toNext === 0 ? 'Today 🎉' : `in ${fmt(toNext, 0)} days (${next.toUTCString().slice(0, 16)})` },
        ],
      };
    },
  },

  'date-difference-calculator': {
    fields: [
      { id: 'start', label: 'Start date', type: 'date', default: '2026-01-01' },
      { id: 'end', label: 'End date', type: 'date', default: '2026-12-31' },
      { id: 'incl', label: 'Include end date?', type: 'select', default: 'no', options: [{ value: 'no', label: 'No (standard)' }, { value: 'yes', label: 'Yes, count it too' }] },
    ],
    compute: (v) => {
      let a = parseDate(v.start), b = parseDate(v.end);
      if (!a || !b) return err('Pick both dates.');
      let sign = '';
      if (b < a) { [a, b] = [b, a]; sign = '(end is before start) '; }
      let days = Math.round((b.getTime() - a.getTime()) / 864e5);
      if (v.incl === 'yes') days += 1;
      const { y, m, dd } = ymdDiff(a, b);
      // business days (Mon–Fri), counting start, excluding end unless incl
      let biz = 0;
      const total = days;
      for (let i = 0; i < total; i++) {
        const t = new Date(a.getTime() + i * 864e5).getUTCDay();
        if (t !== 0 && t !== 6) biz++;
      }
      return {
        results: [
          { label: `${sign}Total days`, value: fmt(days, 0), primary: true },
          { label: 'Years, months, days', value: `${y}y ${m}m ${dd}d` },
          { label: 'Weeks', value: `${fmt(Math.floor(days / 7), 0)} weeks ${days % 7} days` },
          { label: 'Weekdays (Mon–Fri)', value: fmt(biz, 0), note: 'Public holidays are not excluded.' },
          { label: 'Hours', value: fmt(days * 24, 0) },
        ],
      };
    },
  },

  'tile-calculator': {
    fields: [
      unitSys,
      { id: 'L', label: 'Area length', type: 'number', default: '12', unit: len },
      { id: 'W', label: 'Area width', type: 'number', default: '10', unit: len },
      { id: 'tl', label: 'Tile length', type: 'number', default: '12', unit: small },
      { id: 'tw', label: 'Tile width', type: 'number', default: '12', unit: small },
      { id: 'gap', label: 'Grout joint', type: 'number', default: '0.125', unit: small, help: 'Typical: 1/8 in (0.125) or 3 mm (0.3 cm).' },
      { id: 'waste', label: 'Waste allowance', type: 'number', default: '10', unit: '%', help: '10% for straight lay, 15% for diagonal or herringbone.' },
      { id: 'box', label: 'Tiles per box (optional)', type: 'number', default: '', optional: true },
      { id: 'boxPrice', label: 'Price per box (optional)', type: 'number', default: '', optional: true },
    ],
    compute: (v) => {
      const L = num(v.L), W = num(v.W), tl = num(v.tl), tw = num(v.tw);
      const gap = isFinite(num(v.gap)) ? num(v.gap) : 0;
      const waste = isFinite(num(v.waste)) ? num(v.waste) : 0;
      if (!need(L, W, tl, tw) || tl <= 0 || tw <= 0) return err('Enter the area and tile size.');
      const metric = v.units === 'metric';
      const area = L * W; // ft² or m²
      const conv = metric ? 0.01 : 1 / 12; // small unit → large unit
      const tileArea = (tl + gap) * conv * (tw + gap) * conv;
      const raw = area / tileArea;
      const withWaste = ceil(raw * (1 + waste / 100));
      const rows: ResultRow[] = [
        { label: 'Tiles needed (with waste)', value: fmt(withWaste, 0), primary: true },
        { label: 'Area to cover', value: `${fmt(area)} ${metric ? 'm²' : 'sq ft'}` },
        { label: 'Tiles without waste', value: fmt(ceil(raw), 0) },
      ];
      const box = num(v.box), bp = num(v.boxPrice);
      if (isFinite(box) && box > 0) {
        const boxes = ceil(withWaste / box);
        rows.push({ label: 'Boxes to buy', value: fmt(boxes, 0) });
        if (isFinite(bp)) rows.push({ label: 'Estimated tile cost', value: money(boxes * bp) });
      }
      return { results: rows, working: [`Area = ${fmt(L)} × ${fmt(W)} = ${fmt(area)} ${metric ? 'm²' : 'sq ft'}`, `One tile incl. grout ≈ ${fmt(tileArea, 4)} ${metric ? 'm²' : 'sq ft'}`, `${fmt(area)} ÷ ${fmt(tileArea, 4)} = ${fmt(raw)} tiles, + ${fmt(waste)}% waste → ${withWaste}`] };
    },
  },

  'paint-calculator': {
    fields: [
      unitSys,
      { id: 'L', label: 'Room length', type: 'number', default: '14', unit: len },
      { id: 'W', label: 'Room width', type: 'number', default: '12', unit: len },
      { id: 'H', label: 'Wall height', type: 'number', default: '8', unit: len },
      { id: 'doors', label: 'Doors', type: 'number', default: '1' },
      { id: 'windows', label: 'Windows', type: 'number', default: '2' },
      { id: 'coats', label: 'Coats', type: 'number', default: '2' },
      { id: 'ceiling', label: 'Paint the ceiling too?', type: 'select', default: 'no', options: [{ value: 'no', label: 'No, walls only' }, { value: 'yes', label: 'Yes, include ceiling' }] },
      { id: 'cov', label: 'Coverage per gallon / litre', type: 'number', default: '', optional: true, help: 'Leave blank for typical 350 sq ft per US gallon (≈10 m² per litre). Check your paint tin.' },
    ],
    compute: (v) => {
      const metric = v.units === 'metric';
      const L = num(v.L), W = num(v.W), H = num(v.H);
      const doors = num(v.doors) || 0, windows = num(v.windows) || 0, coats = num(v.coats) || 1;
      if (!need(L, W, H)) return err('Enter room length, width and height.');
      const doorA = metric ? 1.9 : 21, winA = metric ? 1.4 : 15; // standard openings
      const walls = 2 * (L + W) * H;
      const net = Math.max(0, walls - doors * doorA - windows * winA) + (v.ceiling === 'yes' ? L * W : 0);
      const cov = isFinite(num(v.cov)) && num(v.cov) > 0 ? num(v.cov) : metric ? 10 : 350;
      const amount = (net * coats) / cov;
      const unitName = metric ? 'litres' : 'gallons';
      return {
        results: [
          { label: `Paint needed`, value: `${fmt(amount, 2)} ${unitName}`, primary: true, note: metric ? `Buy ${ceil(amount)} L` : `Buy ${ceil(amount)} gal (or ${ceil(amount * 4)} quarts)` },
          { label: 'Paintable area (one coat)', value: `${fmt(net)} ${metric ? 'm²' : 'sq ft'}` },
          { label: 'Total area incl. all coats', value: `${fmt(net * coats)} ${metric ? 'm²' : 'sq ft'}` },
        ],
        working: [`Walls = 2 × (${fmt(L)} + ${fmt(W)}) × ${fmt(H)} = ${fmt(walls)}`, `Minus ${doors} door(s) × ${doorA} and ${windows} window(s) × ${winA}`, `${fmt(net)} × ${coats} coats ÷ ${cov} = ${fmt(amount)} ${unitName}`],
      };
    },
  },

  'flooring-calculator': {
    fields: [
      unitSys,
      { id: 'L', label: 'Room length', type: 'number', default: '15', unit: len },
      { id: 'W', label: 'Room width', type: 'number', default: '12', unit: len },
      { id: 'waste', label: 'Waste allowance', type: 'number', default: '10', unit: '%', help: '5–7% for simple rooms, 10–15% for many corners or diagonal installs.' },
      { id: 'boxCov', label: 'Coverage per box (optional)', type: 'number', default: '', optional: true, unit: (v) => (v.units === 'metric' ? 'm²' : 'sq ft'), help: 'Printed on the box, e.g. 20 sq ft.' },
      { id: 'price', label: 'Price per sq ft / m² (optional)', type: 'number', default: '', optional: true },
    ],
    compute: (v) => {
      const metric = v.units === 'metric', L = num(v.L), W = num(v.W);
      const waste = isFinite(num(v.waste)) ? num(v.waste) : 0;
      if (!need(L, W)) return err('Enter room length and width.');
      const area = L * W, total = area * (1 + waste / 100);
      const u = metric ? 'm²' : 'sq ft';
      const rows: ResultRow[] = [
        { label: 'Flooring to buy', value: `${fmt(total)} ${u}`, primary: true },
        { label: 'Room area', value: `${fmt(area)} ${u}` },
      ];
      const bc = num(v.boxCov), price = num(v.price);
      let boxes = NaN;
      if (isFinite(bc) && bc > 0) { boxes = ceil(total / bc); rows.push({ label: 'Boxes', value: fmt(boxes, 0), note: `${fmt(boxes * bc)} ${u} in total` }); }
      if (isFinite(price)) rows.push({ label: 'Material cost', value: money((isFinite(boxes) ? boxes * bc : total) * price) });
      return { results: rows, working: [`${fmt(L)} × ${fmt(W)} = ${fmt(area)} ${u}`, `+ ${fmt(waste)}% waste = ${fmt(total)} ${u}`] };
    },
  },

  'concrete-calculator': {
    fields: [
      unitSys,
      { id: 'L', label: 'Length', type: 'number', default: '10', unit: len },
      { id: 'W', label: 'Width', type: 'number', default: '10', unit: len },
      { id: 'T', label: 'Thickness', type: 'number', default: '4', unit: small },
      { id: 'waste', label: 'Extra for spillage & uneven base', type: 'number', default: '10', unit: '%' },
    ],
    compute: (v) => {
      const metric = v.units === 'metric', L = num(v.L), W = num(v.W), T = num(v.T);
      const waste = isFinite(num(v.waste)) ? num(v.waste) : 0;
      if (!need(L, W, T)) return err('Enter length, width and thickness.');
      const f = 1 + waste / 100;
      let m3: number, ft3: number;
      if (metric) { m3 = L * W * (T / 100) * f; ft3 = m3 * 35.3147; }
      else { ft3 = L * W * (T / 12) * f; m3 = ft3 / 35.3147; }
      const yd3 = ft3 / 27;
      return {
        results: [
          { label: metric ? 'Concrete volume' : 'Cubic yards', value: metric ? `${fmt(m3, 2)} m³` : `${fmt(yd3, 2)} yd³`, primary: true },
          { label: metric ? 'Cubic yards' : 'Cubic meters', value: metric ? `${fmt(yd3, 2)} yd³` : `${fmt(m3, 2)} m³` },
          { label: 'Cubic feet', value: `${fmt(ft3, 1)} ft³` },
          { label: '80 lb bags (0.60 ft³ each)', value: fmt(ceil(ft3 / 0.6), 0) },
          { label: '60 lb bags (0.45 ft³ each)', value: fmt(ceil(ft3 / 0.45), 0) },
          { label: '25 kg bags (≈0.012 m³ each)', value: fmt(ceil(m3 / 0.012), 0) },
        ],
        working: metric ? [`${fmt(L)} × ${fmt(W)} × ${fmt(T / 100, 3)} m × ${fmt(f, 2)} = ${fmt(m3, 3)} m³`] : [`${fmt(L)} × ${fmt(W)} × (${fmt(T)} ÷ 12) × ${fmt(f, 2)} = ${fmt(ft3, 2)} ft³`, `${fmt(ft3, 2)} ÷ 27 = ${fmt(yd3, 2)} yd³`],
      };
    },
  },

  'gravel-calculator': {
    fields: [
      unitSys,
      { id: 'L', label: 'Length', type: 'number', default: '20', unit: len },
      { id: 'W', label: 'Width', type: 'number', default: '10', unit: len },
      { id: 'D', label: 'Depth', type: 'number', default: '3', unit: small, help: 'Paths: 2–3 in. Driveways: 4–6 in in layers.' },
      { id: 'dens', label: 'Material', type: 'select', default: '1.4', options: [
        { value: '1.4', label: 'Pea / crushed gravel (≈1.4 t/yd³)' },
        { value: '1.5', label: 'Crushed stone #57 (≈1.5 t/yd³)' },
        { value: '1.2', label: 'River rock (≈1.2 t/yd³)' },
        { value: '1.35', label: 'Sand (≈1.35 t/yd³)' },
      ] },
    ],
    compute: (v) => {
      const metric = v.units === 'metric', L = num(v.L), W = num(v.W), D = num(v.D), dens = num(v.dens);
      if (!need(L, W, D)) return err('Enter length, width and depth.');
      const ft3 = metric ? L * W * (D / 100) * 35.3147 : L * W * (D / 12);
      const yd3 = ft3 / 27, m3 = ft3 / 35.3147;
      const shortTons = yd3 * dens;
      const tonnes = shortTons * 0.907185;
      return {
        results: [
          { label: metric ? 'Gravel needed' : 'Gravel needed', value: metric ? `${fmt(tonnes, 2)} tonnes` : `${fmt(shortTons, 2)} tons`, primary: true },
          { label: 'Volume', value: metric ? `${fmt(m3, 2)} m³` : `${fmt(yd3, 2)} yd³` },
          { label: metric ? 'In US tons' : 'In metric tonnes', value: metric ? `${fmt(shortTons, 2)} tons` : `${fmt(tonnes, 2)} t` },
        ],
        working: [`Volume = ${fmt(yd3, 3)} yd³ × ${dens} t/yd³ = ${fmt(shortTons, 2)} US tons`],
      };
    },
  },

  'electricity-cost-calculator': {
    fields: [
      currencyField,
      { id: 'watts', label: 'Power rating', type: 'number', default: '1000', unit: 'W', help: 'On the label or manual. 1 kW = 1000 W.' },
      { id: 'hours', label: 'Hours used per day', type: 'number', default: '8' },
      { id: 'duty', label: 'Average load', type: 'number', default: '100', unit: '%', help: 'Share of time it actually draws full power. AC and fridges cycle on and off; lights and TVs are 100%.' },
      { id: 'rate', label: 'Electricity price per kWh', type: 'number', default: '0.17', help: 'Find it on your bill (cents ÷ 100).' },
      { id: 'qty', label: 'Number of units', type: 'number', default: '1' },
    ],
    compute: (v) => {
      const w = num(v.watts), h = num(v.hours), r = num(v.rate), s = v.cur || '$';
      const duty = isFinite(num(v.duty)) ? num(v.duty) / 100 : 1;
      const q = isFinite(num(v.qty)) && num(v.qty) > 0 ? num(v.qty) : 1;
      if (!need(w, h, r)) return err('Enter wattage, hours and price per kWh.');
      if (h > 24) return err('Hours per day cannot exceed 24.');
      const kwhDay = (w * h * duty * q) / 1000;
      return {
        results: [
          { label: 'Cost per month (30 days)', value: money(kwhDay * 30 * r, s), primary: true },
          { label: 'Cost per day', value: money(kwhDay * r, s) },
          { label: 'Cost per year', value: money(kwhDay * 365 * r, s) },
          { label: 'Cost per hour of use', value: money(((w * duty * q) / 1000) * r, s) },
          { label: 'Energy per day', value: `${fmt(kwhDay, 3)} kWh` },
          { label: 'Energy per month', value: `${fmt(kwhDay * 30, 1)} kWh` },
        ],
        working: [`${fmt(w)} W × ${fmt(h)} h × ${fmt(duty * 100)}% × ${q} ÷ 1000 = ${fmt(kwhDay, 3)} kWh/day`, `${fmt(kwhDay, 3)} kWh × ${s}${r} = ${money(kwhDay * r, s)} per day`],
      };
    },
  },
};

function feeCalc(defPct: string, defFixed: string): CalcDef {
  return {
    fields: [
      currencyField,
      { id: 'mode', label: 'Calculate', type: 'select', default: 'receive', options: [
        { value: 'receive', label: 'What I receive after fees' },
        { value: 'charge', label: 'What to charge to receive an exact amount' },
      ] },
      { id: 'amount', label: 'Amount', type: 'number', default: '100', label2: (v) => (v.mode === 'charge' ? 'Amount you want to receive' : 'Payment amount') },
      { id: 'pct', label: 'Percentage fee', type: 'number', default: defPct, unit: '%' },
      { id: 'fixed', label: 'Fixed fee per transaction', type: 'number', default: defFixed },
      { id: 'extra', label: 'Extra % (international / currency conversion)', type: 'number', default: '0', unit: '%', optional: true },
    ],
    compute: (v) => {
      const a = num(v.amount), p = (num(v.pct) || 0) + (num(v.extra) || 0), f = num(v.fixed) || 0, s = v.cur || '$';
      if (!isFinite(a)) return err('Enter an amount.');
      if (v.mode === 'charge') {
        if (p >= 100) return err('Percentage fee must be below 100%.');
        const charge = (a + f) / (1 - p / 100);
        const fee = charge - a;
        return {
          results: [
            { label: 'Charge the customer', value: money(ceil(charge * 100) / 100, s), primary: true },
            { label: 'Total fee', value: money(fee, s) },
            { label: 'You receive', value: money(a, s) },
          ],
          working: [`(${money(a, s)} + ${money(f, s)}) ÷ (1 − ${fmt(p)}%) = ${money(charge, s)}`],
        };
      }
      const fee = a * (p / 100) + f;
      return {
        results: [
          { label: 'You receive', value: money(a - fee, s), primary: true },
          { label: 'Total fee', value: money(fee, s) },
          { label: 'Fee as % of payment', value: a ? pct((fee / a) * 100) : '—' },
        ],
        working: [`Fee = ${money(a, s)} × ${fmt(p)}% + ${money(f, s)} = ${money(fee, s)}`],
      };
    },
  };
}

// ---------- date helpers (UTC to avoid DST off-by-one) ----------
export function parseDate(s?: string): Date | null {
  if (!s) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
}
function today() { const n = new Date(); return new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())); }
export function ymdDiff(a: Date, b: Date) {
  let y = b.getUTCFullYear() - a.getUTCFullYear();
  let m = b.getUTCMonth() - a.getUTCMonth();
  let dd = b.getUTCDate() - a.getUTCDate();
  if (dd < 0) {
    m -= 1;
    dd += new Date(Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), 0)).getUTCDate();
  }
  if (m < 0) { y -= 1; m += 12; }
  return { y, m, dd };
}

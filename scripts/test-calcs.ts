// Sanity tests for calculator math. Run: npm test
import { calcDefs } from '../src/tools/calc-defs.ts';

let fail = 0;
function check(slug: string, values: Record<string, string>, label: string, expected: string) {
  const def = calcDefs[slug];
  const v: Record<string, string> = {};
  for (const f of def.fields) v[f.id] = f.default;
  Object.assign(v, values);
  const out = def.compute(v);
  const row = out.results.find((r) => r.label.includes(label));
  const got = row?.value ?? out.error ?? '(none)';
  const ok = got.includes(expected);
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${slug} → ${label}: ${got}${ok ? '' : `  (expected ${expected})`}`);
}

check('percentage-calculator', { mode: 'of', a: '15', b: '240' }, 'of', '36');
check('percentage-calculator', { mode: 'is', a: '36', b: '240' }, 'percent', '15%');
check('percentage-calculator', { mode: 'whole', a: '36', b: '15' }, 'is 15% of', '240');
check('percentage-change-calculator', { from: '80', to: '100' }, 'increase', '25%');
check('percentage-change-calculator', { from: '100', to: '80' }, 'decrease', '20%');
check('profit-margin-calculator', { cost: '30', price: '50' }, 'Gross margin', '40%');
check('profit-margin-calculator', { cost: '30', price: '50' }, 'Markup', '66.67%');
check('markup-calculator', { cost: '40', markup: '50' }, 'Selling price', '$60.00');
check('discount-calculator', { price: '120', d1: '25', d2: '10' }, 'Final price', '$81.00');
check('discount-calculator', { price: '120', d1: '25', d2: '10' }, 'Effective', '32.5%');
check('break-even-calculator', { fixed: '5000', price: '25', var: '10' }, 'Break-even units', '334');
check('stripe-fee-calculator', { amount: '100' }, 'You receive', '$96.80');
check('stripe-fee-calculator', { mode: 'charge', amount: '100' }, 'Charge', '$103.30');
check('paypal-fee-calculator', { amount: '100' }, 'You receive', '$96.02');
check('age-calculator', { dob: '2000-02-29', at: '2026-10-07' }, 'Age', '26 years, 7 months');
check('date-difference-calculator', { start: '2026-01-01', end: '2026-12-31' }, 'Total days', '364');
check('date-difference-calculator', { start: '2026-01-05', end: '2026-01-12' }, 'Weekdays', '5');
check('tile-calculator', { L: '10', W: '10', tl: '12', tw: '12', gap: '0', waste: '0' }, 'Tiles needed', '100');
check('tile-calculator', { L: '10', W: '10', tl: '12', tw: '12', gap: '0', waste: '10' }, 'Tiles needed', '110');
check('paint-calculator', { L: '12', W: '12', H: '8', doors: '0', windows: '0', coats: '1' }, 'Paint needed', '1.1 gallons');
check('concrete-calculator', { L: '10', W: '10', T: '4', waste: '0' }, 'Cubic yards', '1.23');
check('gravel-calculator', { L: '27', W: '12', D: '12', dens: '1.4' }, 'Gravel needed', '16.8 tons');
check('electricity-cost-calculator', { watts: '1000', hours: '10', rate: '0.2', duty: '100' }, 'per day', '$2.00');
check('electricity-cost-calculator', { watts: '1000', hours: '10', rate: '0.2', duty: '100' }, 'per month', '$60.00');
check('flooring-calculator', { L: '10', W: '10', waste: '10' }, 'Flooring to buy', '110');

check('bmi-calculator', { sys: 'metric', wt: '70', cm: '175' }, 'Your BMI', '22.9');
check('bmi-calculator', { sys: 'us', wt: '170', ft: '5', in: '10' }, 'Your BMI', '24.4');
check('bmr-calculator', { sys: 'metric', sex: 'male', age: '30', wt: '80', cm: '180' }, 'Mifflin', '1,780');
check('bmr-calculator', { sys: 'metric', sex: 'female', age: '30', wt: '60', cm: '165' }, 'Mifflin', '1,320');
check('tdee-calculator', { sys: 'metric', sex: 'male', age: '30', wt: '80', cm: '180', act: '1.55' }, 'TDEE', '2,759');
check('macro-calculator', { kcal: '2000', split: '30-40-30' }, 'Protein', '150 g');
check('macro-calculator', { kcal: '2000', split: '30-40-30' }, 'Fat', '67 g');
check('body-fat-calculator', { sys: 'metric', sex: 'male', cm: '178', neck: '38', waist: '86' }, 'Body fat', '17.2%');
check('one-rep-max-calculator', { w: '100', u: 'kg', r: '5' }, 'Estimated', '115 kg');
check('protein-calculator', { sys: 'metric', wt: '80', goal: '1.6-2.2' }, 'Daily protein', '128–176 g');
check('ideal-weight-calculator', { sys: 'metric', sex: 'male', cm: '177.8' }, 'Devine', '73 kg');

console.log(fail ? `\n${fail} failing` : '\nAll calculator checks passed');
process.exit(fail ? 1 : 0);

// Unit definitions. Linear units are factors to a base unit (metre, gram).
// Temperature is handled with explicit formulas.

export type Kind = 'length' | 'weight' | 'temperature';

export const UNITS: Record<Kind, { id: string; name: string; symbol: string; f?: number }[]> = {
  length: [
    { id: 'mm', name: 'Millimetres', symbol: 'mm', f: 0.001 },
    { id: 'cm', name: 'Centimetres', symbol: 'cm', f: 0.01 },
    { id: 'm', name: 'Metres', symbol: 'm', f: 1 },
    { id: 'km', name: 'Kilometres', symbol: 'km', f: 1000 },
    { id: 'in', name: 'Inches', symbol: 'in', f: 0.0254 },
    { id: 'ft', name: 'Feet', symbol: 'ft', f: 0.3048 },
    { id: 'yd', name: 'Yards', symbol: 'yd', f: 0.9144 },
    { id: 'mi', name: 'Miles', symbol: 'mi', f: 1609.344 },
  ],
  weight: [
    { id: 'mg', name: 'Milligrams', symbol: 'mg', f: 0.001 },
    { id: 'g', name: 'Grams', symbol: 'g', f: 1 },
    { id: 'kg', name: 'Kilograms', symbol: 'kg', f: 1000 },
    { id: 't', name: 'Tonnes', symbol: 't', f: 1_000_000 },
    { id: 'oz', name: 'Ounces', symbol: 'oz', f: 28.349523125 },
    { id: 'lb', name: 'Pounds', symbol: 'lb', f: 453.59237 },
    { id: 'st', name: 'Stone', symbol: 'st', f: 6350.29318 },
  ],
  temperature: [
    { id: 'c', name: 'Celsius', symbol: '°C' },
    { id: 'f', name: 'Fahrenheit', symbol: '°F' },
    { id: 'k', name: 'Kelvin', symbol: 'K' },
  ],
};

export function convert(kind: Kind, value: number, from: string, to: string): number {
  if (kind === 'temperature') {
    const c = from === 'c' ? value : from === 'f' ? ((value - 32) * 5) / 9 : value - 273.15;
    return to === 'c' ? c : to === 'f' ? (c * 9) / 5 + 32 : c + 273.15;
  }
  const u = UNITS[kind];
  const a = u.find((x) => x.id === from)!.f!, b = u.find((x) => x.id === to)!.f!;
  return (value * a) / b;
}

export const nice = (n: number) => {
  if (!isFinite(n)) return '—';
  const abs = Math.abs(n);
  const digits = abs >= 1000 ? 2 : abs >= 1 ? 4 : 6;
  return n.toLocaleString('en-US', { maximumFractionDigits: digits });
};

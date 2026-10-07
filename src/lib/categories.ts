import type { Category } from './types';

export const categories: Category[] = [
  { id: 'image', name: 'Image Converters', short: 'Image', icon: 'image', tint: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    description: 'Convert JPG, PNG and WebP, compress photos and resize images — processed privately in your browser.' },
  { id: 'convert', name: 'Unit Converters', short: 'Units', icon: 'ruler', tint: 'bg-teal-500/10 text-teal-700 dark:text-teal-400',
    description: 'Length, weight and temperature conversions with exact factors and handy reference tables.' },
  { id: 'business', name: 'Business & E-commerce', short: 'Business', icon: 'chart', tint: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
    description: 'Margins, markups, discounts, break-even and payment fees — the numbers behind pricing and selling online.' },
  { id: 'home', name: 'Home & Construction', short: 'Home', icon: 'home', tint: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
    description: 'Estimate tiles, paint, flooring, concrete and gravel before you buy, with waste allowances built in.' },
  { id: 'energy', name: 'Energy & Electricity', short: 'Energy', icon: 'bolt', tint: 'bg-sky-500/10 text-sky-700 dark:text-sky-400',
    description: 'Find out what your appliances really cost to run per hour, day, month and year.' },
  { id: 'everyday', name: 'Everyday Calculators', short: 'Everyday', icon: 'calc', tint: 'bg-violet-500/10 text-violet-700 dark:text-violet-400',
    description: 'Percentages, ages and date differences — quick answers for everyday questions.' },
  { id: 'developer', name: 'Developer Tools', short: 'Developer', icon: 'code', tint: 'bg-slate-500/15 text-slate-700 dark:text-slate-300',
    description: 'Format JSON, decode JWTs, convert timestamps and encode data — all processed locally in your browser.' },
  { id: 'text-seo', name: 'Text & SEO Tools', short: 'Text & SEO', icon: 'text', tint: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    description: 'Count words, change case, build slugs and UTM links, and preview how pages look in Google.' },
];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<Category['id'], Category>;

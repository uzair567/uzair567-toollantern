import type { Category } from './types';

export const categories: Category[] = [
  { id: 'business', name: 'Business & E-commerce', short: 'Business', icon: 'chart',
    description: 'Margins, markups, discounts, break-even and payment fees — the numbers behind pricing and selling online.' },
  { id: 'home', name: 'Home & Construction', short: 'Home', icon: 'home',
    description: 'Estimate tiles, paint, flooring, concrete and gravel before you buy, with waste allowances built in.' },
  { id: 'energy', name: 'Energy & Electricity', short: 'Energy', icon: 'bolt',
    description: 'Find out what your appliances really cost to run per hour, day, month and year.' },
  { id: 'everyday', name: 'Everyday Calculators', short: 'Everyday', icon: 'calc',
    description: 'Percentages, ages and date differences — quick answers for everyday questions.' },
  { id: 'developer', name: 'Developer Tools', short: 'Developer', icon: 'code',
    description: 'Format JSON, decode JWTs, convert timestamps and encode data — all processed locally in your browser.' },
  { id: 'text-seo', name: 'Text & SEO Tools', short: 'Text & SEO', icon: 'text',
    description: 'Count words, change case, build slugs and UTM links, and preview how pages look in Google.' },
];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<Category['id'], Category>;

import type { Category } from './types';

export const categories: Category[] = [
  { id: 'image', name: 'Image Converters', short: 'Image', icon: 'image', tint: 'bg-t-rose',
    description: 'Convert JPG, PNG and WebP, compress photos and resize images — processed privately in your browser.' },
  { id: 'convert', name: 'Unit Converters', short: 'Units', icon: 'ruler', tint: 'bg-t-teal',
    description: 'Length, weight and temperature conversions with exact factors and handy reference tables.' },
  { id: 'business', name: 'Business & E-commerce', short: 'Business', icon: 'chart', tint: 'bg-t-amber',
    description: 'Margins, markups, discounts, break-even and payment fees — the numbers behind pricing and selling online.' },
  { id: 'home', name: 'Home & Construction', short: 'Home', icon: 'home', tint: 'bg-t-peach',
    description: 'Estimate tiles, paint, flooring, concrete and gravel before you buy, with waste allowances built in.' },
  { id: 'energy', name: 'Energy & Electricity', short: 'Energy', icon: 'bolt', tint: 'bg-t-sky',
    description: 'Find out what your appliances really cost to run per hour, day, month and year.' },
  { id: 'everyday', name: 'Everyday Calculators', short: 'Everyday', icon: 'calc', tint: 'bg-t-lilac',
    description: 'Percentages, ages and date differences — quick answers for everyday questions.' },
  { id: 'developer', name: 'Developer Tools', short: 'Developer', icon: 'code', tint: 'bg-t-ink text-white',
    description: 'Format JSON, decode JWTs, convert timestamps and encode data — all processed locally in your browser.' },
  { id: 'text-seo', name: 'Text & SEO Tools', short: 'Text & SEO', icon: 'text', tint: 'bg-t-mint',
    description: 'Count words, change case, build slugs and UTM links, and preview how pages look in Google.' },
];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<Category['id'], Category>;

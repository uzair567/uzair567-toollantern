/**
 * Central SEO data for every tool and category.
 *
 * - primaryKeyword / secondaryKeywords: the queries each page is written for.
 * - intent: what the searcher wants to do.
 * - priority: 1 = highest opportunity … 4 = low (see the SEO audit). Drives sitemap priority.
 * - answer: a short, direct answer shown under the H1 (simple HTML allowed, used for contextual links).
 * - title / metaDescription / h1: optional overrides of the values in the content files.
 *
 * Search volumes are intentionally NOT stored: no verified volume data was available when this was written.
 */
import type { CategoryId } from './types';

export type Intent = 'calculate' | 'convert' | 'do' | 'check';

export interface ToolSeo {
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: Intent;
  priority: 1 | 2 | 3 | 4;
  answer: string;
  title?: string;
  metaDescription?: string;
  h1?: string;
}

const a = (slug: string, text: string) => `<a href="/${slug}/">${text}</a>`;

const imagePair = (from: string, to: string, why: string, priority: 3 | 4 = 4): ToolSeo => ({
  primaryKeyword: `${from.toLowerCase()} to ${to.toLowerCase()}`,
  secondaryKeywords: [`convert ${from.toLowerCase()} to ${to.toLowerCase()}`, `${from.toLowerCase()} to ${to.toLowerCase()} converter`, `${from.toLowerCase()} to ${to.toLowerCase()} online free`],
  intent: 'do',
  priority,
  metaDescription: `Convert ${from} to ${to} free in your browser. Batch up to 30 images, set quality and download — files never leave your device.`,
  answer: why,
});

export const toolSeo: Record<string, ToolSeo> = {
  // ── Image ──────────────────────────────────────────────────────────────
  'image-converter': {
    primaryKeyword: 'image converter', secondaryKeywords: ['convert image to jpg', 'image format converter', 'jpg png webp converter'], intent: 'do', priority: 4,
    answer: `Drop images below and pick JPG, PNG or WebP. Use JPG for photos, PNG for screenshots and transparency, and WebP for the smallest web files. For a single pair, the ${a('jpg-to-png', 'JPG to PNG')} and ${a('webp-to-jpg', 'WebP to JPG')} pages open with the right settings.`,
  },
  'jpg-to-png': imagePair('JPG', 'PNG', 'PNG is lossless, so converting a JPG to PNG stops further quality loss when you edit and re-save it. It will not restore detail the JPG already lost, and the file usually gets larger.', 3),
  'png-to-jpg': imagePair('PNG', 'JPG', `JPG files are typically several times smaller than PNG for photos. Transparent areas become a solid colour — white by default — because JPG has no transparency. To shrink a PNG further, try the ${a('image-compressor', 'image compressor')}.`),
  'webp-to-jpg': imagePair('WebP', 'JPG', 'Convert WebP to JPG when an app, printer or upload form rejects WebP. JPG opens everywhere; expect a slightly larger file at the same visual quality.', 3),
  'webp-to-png': imagePair('WebP', 'PNG', 'Choose PNG over JPG when the WebP has transparency (logos, stickers, cut-outs) — PNG keeps the transparent background, JPG fills it.'),
  'png-to-webp': imagePair('PNG', 'WebP', 'WebP keeps transparency like PNG but is usually much smaller, which makes it the better format for website images. Every current browser supports it.'),
  'jpg-to-webp': imagePair('JPG', 'WebP', `Converting JPG photos to WebP typically cuts file size noticeably at the same visual quality, which speeds up web pages. Keep the JPG if you need to share with older software.`),
  'image-compressor': {
    primaryKeyword: 'image compressor', secondaryKeywords: ['compress image', 'reduce image size', 'compress jpg', 'compress png online'], intent: 'do', priority: 3,
    answer: `Most phone photos shrink by 80–90% with no visible change when you cap the width at 2,000 px and save at 70–80% quality. Choose WebP output for the smallest files, or set exact dimensions with the ${a('image-resizer', 'image resizer')}.`,
  },
  'image-resizer': {
    primaryKeyword: 'image resizer', secondaryKeywords: ['resize image', 'resize image to pixels', 'resize photo online', 'change image size'], intent: 'do', priority: 3,
    answer: 'Enter a width or height in pixels with the aspect-ratio lock on, and the other side is calculated so nothing looks stretched. Resizing smaller is the fastest way to cut file size; enlarging cannot add real detail.',
  },

  // ── Units ──────────────────────────────────────────────────────────────
  'length-converter': {
    primaryKeyword: 'length converter', secondaryKeywords: ['metric to imperial length', 'feet to meters', 'cm to feet', 'km to miles'], intent: 'convert', priority: 4,
    answer: 'Key factors: 1 inch = 2.54 cm, 1 foot = 0.3048 m and 1 mile = 1.609344 km — all exact by international definition. Enter any value below to convert between eight units at once.',
  },
  'cm-to-inches': {
    primaryKeyword: 'cm to inches', secondaryKeywords: ['centimeters to inches', 'convert cm to inches', 'cm to in'], intent: 'convert', priority: 4,
    answer: `1 centimetre = 0.3937 inches. Divide centimetres by 2.54 to get inches — for example 30 cm ÷ 2.54 = 11.81 in. Going the other way? Use ${a('inches-to-cm', 'inches to cm')}.`,
  },
  'inches-to-cm': {
    primaryKeyword: 'inches to cm', secondaryKeywords: ['inches to centimeters', 'convert inches to cm', 'in to cm'], intent: 'convert', priority: 4,
    answer: `1 inch = 2.54 cm exactly. Multiply inches by 2.54 — for example a 12-inch ruler is 30.48 cm. For the reverse, use ${a('cm-to-inches', 'cm to inches')}.`,
  },
  'weight-converter': {
    primaryKeyword: 'weight converter', secondaryKeywords: ['kg to stone', 'grams to ounces', 'pounds to kg', 'weight conversion'], intent: 'convert', priority: 4,
    answer: 'Key factors: 1 kg = 2.20462 lb, 1 lb = 453.59237 g exactly, 1 oz = 28.35 g and 1 stone = 14 lb. Enter a value below to convert between all seven units.',
  },
  'kg-to-lbs': {
    primaryKeyword: 'kg to lbs', secondaryKeywords: ['kilograms to pounds', 'convert kg to lbs', 'kg in pounds'], intent: 'convert', priority: 4,
    answer: `1 kilogram = 2.20462 pounds. Multiply kilograms by 2.20462 — for example 70 kg = 154.32 lb. For the reverse, use ${a('lbs-to-kg', 'lbs to kg')}.`,
  },
  'lbs-to-kg': {
    primaryKeyword: 'lbs to kg', secondaryKeywords: ['pounds to kilograms', 'convert lbs to kg', 'pounds in kg'], intent: 'convert', priority: 4,
    answer: `1 pound = 0.45359237 kg exactly. Multiply pounds by 0.4536 — for example 150 lb = 68.04 kg. For the reverse, use ${a('kg-to-lbs', 'kg to lbs')}.`,
  },
  'temperature-converter': {
    primaryKeyword: 'temperature converter', secondaryKeywords: ['celsius fahrenheit kelvin', 'convert temperature', 'c to f'], intent: 'convert', priority: 4,
    answer: '°F = °C × 9/5 + 32, °C = (°F − 32) × 5/9 and K = °C + 273.15. Water freezes at 0 °C (32 °F) and boils at 100 °C (212 °F) at sea level.',
  },
  'celsius-to-fahrenheit': {
    primaryKeyword: 'celsius to fahrenheit', secondaryKeywords: ['c to f', 'convert celsius to fahrenheit', '°c to °f'], intent: 'convert', priority: 4,
    answer: `Multiply by 9/5 (1.8) and add 32: 25 °C × 1.8 + 32 = 77 °F. Quick check: 10 °C = 50 °F, 20 °C = 68 °F, 30 °C = 86 °F. For the reverse, use ${a('fahrenheit-to-celsius', 'Fahrenheit to Celsius')}.`,
  },
  'fahrenheit-to-celsius': {
    primaryKeyword: 'fahrenheit to celsius', secondaryKeywords: ['f to c', 'convert fahrenheit to celsius', '°f to °c'], intent: 'convert', priority: 4,
    answer: `Subtract 32, then multiply by 5/9: (98.6 °F − 32) × 5/9 = 37 °C. Quick check: 50 °F = 10 °C, 68 °F = 20 °C, 86 °F = 30 °C. For the reverse, use ${a('celsius-to-fahrenheit', 'Celsius to Fahrenheit')}.`,
  },

  // ── Business ───────────────────────────────────────────────────────────
  'profit-margin-calculator': {
    primaryKeyword: 'profit margin calculator', secondaryKeywords: ['gross margin calculator', 'margin formula', 'profit percentage calculator'], intent: 'calculate', priority: 3,
    answer: `Margin = (price − cost) ÷ price × 100. An item that costs $30 and sells for $50 has a 40% margin and a 66.7% markup. To price from cost instead, use the ${a('markup-calculator', 'markup calculator')}; to see how many sales cover your fixed costs, use the ${a('break-even-calculator', 'break-even calculator')}.`,
  },
  'markup-calculator': {
    primaryKeyword: 'markup calculator', secondaryKeywords: ['markup percentage', 'selling price from cost', 'cost plus pricing calculator'], intent: 'calculate', priority: 3,
    answer: `Selling price = cost × (1 + markup ÷ 100). A $40 item with a 100% markup sells for $80 — a 50% margin. Markup is measured on cost, margin on price; check yours with the ${a('profit-margin-calculator', 'profit margin calculator')}.`,
  },
  'discount-calculator': {
    primaryKeyword: 'discount calculator', secondaryKeywords: ['sale price calculator', 'percent off calculator', 'double discount calculator'], intent: 'calculate', priority: 3,
    answer: `Sale price = price × (1 − discount ÷ 100). Stacked discounts multiply, not add: 30% off plus an extra 20% is a 44% total discount, not 50%. For other percentage questions, use the ${a('percentage-calculator', 'percentage calculator')}.`,
  },
  'break-even-calculator': {
    primaryKeyword: 'break even calculator', secondaryKeywords: ['break even point calculator', 'break even units', 'break even analysis'], intent: 'calculate', priority: 2,
    answer: `Break-even units = fixed costs ÷ (price − variable cost per unit). With $5,000 a month in fixed costs and $25 of profit per unit, you need 200 sales a month to break even. Get the per-unit profit from the ${a('profit-margin-calculator', 'profit margin calculator')}.`,
  },
  'stripe-fee-calculator': {
    primaryKeyword: 'stripe fee calculator', secondaryKeywords: ['stripe fees', 'stripe processing fee', 'how much does stripe charge'], intent: 'calculate', priority: 2,
    answer: `Stripe's standard US card fee is 2.9% + 30¢ per successful charge, so a $100 payment nets $96.80. International cards and currency conversion add extra percentages. Compare with the ${a('paypal-fee-calculator', 'PayPal fee calculator')}.`,
  },
  'paypal-fee-calculator': {
    primaryKeyword: 'paypal fee calculator', secondaryKeywords: ['paypal fees', 'paypal goods and services fee', 'how much does paypal take'], intent: 'calculate', priority: 2,
    answer: `For US PayPal checkout payments the rate used here is 3.49% + 49¢, so a $100 payment nets $96.02. To receive an exact amount, the calculator works backwards and tells you what to charge. Compare with the ${a('stripe-fee-calculator', 'Stripe fee calculator')}.`,
  },

  // ── Home ───────────────────────────────────────────────────────────────
  'tile-calculator': {
    primaryKeyword: 'tile calculator', secondaryKeywords: ['how many tiles do i need', 'floor tile calculator', 'wall tile calculator'], intent: 'calculate', priority: 2,
    answer: `Tiles needed = area ÷ area of one tile, plus 10% for cuts and breakage (15% for diagonal layouts). Round up to whole boxes so every tile comes from the same batch. Covering the floor with planks instead? Use the ${a('flooring-calculator', 'flooring calculator')}.`,
  },
  'paint-calculator': {
    primaryKeyword: 'paint calculator', secondaryKeywords: ['how much paint do i need', 'paint coverage calculator', 'gallons of paint for a room'], intent: 'calculate', priority: 3,
    answer: `One US gallon covers roughly 350–400 sq ft per coat on smooth walls. Measure wall area, subtract doors and windows, multiply by the number of coats and divide by coverage. Re-doing the floor too? See the ${a('flooring-calculator', 'flooring calculator')}.`,
  },
  'flooring-calculator': {
    primaryKeyword: 'flooring calculator', secondaryKeywords: ['how much flooring do i need', 'square footage flooring', 'laminate flooring calculator'], intent: 'calculate', priority: 2,
    answer: `Flooring needed = room area plus 5–10% waste (more for diagonal or herringbone layouts), rounded up to whole boxes. Tiling instead? Use the ${a('tile-calculator', 'tile calculator')}.`,
  },
  'concrete-calculator': {
    primaryKeyword: 'concrete calculator', secondaryKeywords: ['concrete slab calculator', 'cubic yards of concrete', 'how many bags of concrete'], intent: 'calculate', priority: 3,
    answer: `Cubic yards = length (ft) × width (ft) × depth (ft) ÷ 27. A 10 × 10 ft slab 4 inches deep needs about 1.23 cubic yards. Laying a gravel base first? Use the ${a('gravel-calculator', 'gravel calculator')}.`,
  },
  'gravel-calculator': {
    primaryKeyword: 'gravel calculator', secondaryKeywords: ['gravel calculator tons', 'how much gravel do i need', 'cubic yards of gravel'], intent: 'calculate', priority: 2,
    answer: `Volume = length × width × depth; most gravel weighs about 1.4 tons per cubic yard. Driveways typically need 4–6 inches, paths 2–3 inches. Pouring a slab on top? Use the ${a('concrete-calculator', 'concrete calculator')}.`,
  },

  // ── Energy ─────────────────────────────────────────────────────────────
  'electricity-cost-calculator': {
    primaryKeyword: 'electricity cost calculator', secondaryKeywords: ['appliance electricity cost', 'kwh cost calculator', 'how much does it cost to run'], intent: 'calculate', priority: 2,
    answer: `Cost = watts ÷ 1,000 × hours used × price per kWh. A 1,000 W appliance running 1 hour at $0.17/kWh costs 17¢. Pick an appliance for typical wattages: ${a('electricity-cost-calculator/ac', 'air conditioner')}, ${a('electricity-cost-calculator/space-heater', 'space heater')}, ${a('electricity-cost-calculator/refrigerator', 'refrigerator')}.`,
  },
  'electricity-cost-calculator/ac': {
    primaryKeyword: 'ac electricity cost calculator', secondaryKeywords: ['cost to run air conditioner', 'air conditioner electricity cost per hour', 'ac running cost'], intent: 'calculate', priority: 1,
    title: 'AC Electricity Cost Calculator – Air Conditioner Running Cost',
    answer: `A 1,200 W window AC running 8 hours a day with the compressor on 70% of the time uses about 6.7 kWh — roughly $1.14 a day or $34 a month at $0.17/kWh. A ${a('electricity-cost-calculator/ceiling-fan', 'ceiling fan')} costs about a penny an hour by comparison.`,
  },
  'electricity-cost-calculator/refrigerator': {
    primaryKeyword: 'refrigerator electricity cost', secondaryKeywords: ['how much does it cost to run a fridge', 'fridge kwh per year', 'refrigerator running cost'], intent: 'calculate', priority: 1,
    answer: `A typical 150 W fridge whose compressor runs about 35% of the time uses around 460 kWh a year — about $78 at $0.17/kWh. Older fridges can use twice that. Compare other appliances on the ${a('electricity-cost-calculator', 'electricity cost calculator')}.`,
  },
  'electricity-cost-calculator/space-heater': {
    primaryKeyword: 'space heater cost per hour', secondaryKeywords: ['cost to run space heater', 'space heater electricity cost', '1500 watt heater cost per hour'], intent: 'calculate', priority: 1,
    answer: `A 1,500 W space heater costs about 26¢ an hour at full power and $0.17/kWh. Run 5 hours a day with the thermostat cycling 80% of the time, that is about $1.02 a day or $31 a month. Cooling instead? See the ${a('electricity-cost-calculator/ac', 'AC cost calculator')}.`,
  },
  'electricity-cost-calculator/ceiling-fan': {
    primaryKeyword: 'ceiling fan electricity cost', secondaryKeywords: ['how much does a ceiling fan cost to run', 'ceiling fan watts', 'fan running cost per hour'], intent: 'calculate', priority: 1,
    answer: `A 60 W ceiling fan costs about 1¢ an hour at $0.17/kWh — roughly $3 a month at 10 hours a day. That is a small fraction of what an ${a('electricity-cost-calculator/ac', 'air conditioner')} costs for the same hours.`,
  },
  'electricity-cost-calculator/tv': {
    primaryKeyword: 'tv electricity cost', secondaryKeywords: ['how much electricity does a tv use', 'tv watts', 'tv running cost per hour'], intent: 'calculate', priority: 2,
    title: 'TV Electricity Cost Calculator – Power Use & Running Cost',
    answer: `A 90 W LED TV watched 5 hours a day uses about 0.45 kWh — around 8¢ a day or $2.30 a month at $0.17/kWh. Larger and brighter screens draw more; check the wattage on the label or in the manual. Compare other devices on the ${a('electricity-cost-calculator', 'electricity cost calculator')}.`,
  },
  'electricity-cost-calculator/washing-machine': {
    primaryKeyword: 'washing machine cost per load', secondaryKeywords: ['washing machine electricity cost', 'cost to run washing machine', 'laundry cost per load'], intent: 'calculate', priority: 1,
    answer: `A washer drawing about 500 W for a one-hour cycle uses 0.5 kWh — about 8.5¢ per load at $0.17/kWh. Hot washes cost more because heating water takes most of the energy. Compare other appliances on the ${a('electricity-cost-calculator', 'electricity cost calculator')}.`,
  },

  // ── Everyday ───────────────────────────────────────────────────────────
  'percentage-calculator': {
    primaryKeyword: 'percentage calculator', secondaryKeywords: ['what is x percent of y', 'percent of a number', 'what percent is x of y'], intent: 'calculate', priority: 4,
    answer: `X% of Y = X ÷ 100 × Y, so 15% of 240 = 36. To find what percent A is of B, divide A by B and multiply by 100. For change between two numbers, use the ${a('percentage-change-calculator', 'percentage change calculator')}.`,
  },
  'percentage-change-calculator': {
    primaryKeyword: 'percentage increase calculator', secondaryKeywords: ['percentage change calculator', 'percentage decrease calculator', 'percent difference'], intent: 'calculate', priority: 4,
    answer: `Percentage change = (new − old) ÷ old × 100. Going from 80 to 100 is a 25% increase; from 100 back to 80 is a 20% decrease, because the starting value changed.`,
  },
  'age-calculator': {
    primaryKeyword: 'age calculator', secondaryKeywords: ['how old am i', 'calculate age from date of birth', 'age in days'], intent: 'calculate', priority: 4,
    answer: `Enter a date of birth to get exact age in years, months and days, plus totals in months, weeks and days. To count days between any two dates, use the ${a('date-difference-calculator', 'days between dates calculator')}.`,
  },
  'date-difference-calculator': {
    primaryKeyword: 'days between dates', secondaryKeywords: ['date difference calculator', 'how many days until', 'days calculator'], intent: 'calculate', priority: 4,
    answer: `Pick two dates to get the number of days between them, plus the same span in weeks, months and years. For someone's exact age, use the ${a('age-calculator', 'age calculator')}.`,
  },

  // ── Developer ──────────────────────────────────────────────────────────
  'json-formatter': {
    primaryKeyword: 'json formatter', secondaryKeywords: ['json validator', 'json beautifier', 'format json online', 'json minify'], intent: 'do', priority: 4,
    answer: 'Paste JSON to pretty-print it, minify it or find the exact line and column of a syntax error. Everything runs in your browser, so API responses and config files are never uploaded.',
  },
  'base64-encode-decode': {
    primaryKeyword: 'base64 decode', secondaryKeywords: ['base64 encode', 'base64 converter', 'decode base64 online'], intent: 'do', priority: 4,
    answer: `Base64 turns bytes into 64 safe text characters so binary data can travel in JSON, email or URLs. It is encoding, not encryption — anyone can decode it. Tokens with three dot-separated Base64 parts are JWTs; read them with the ${a('jwt-decoder', 'JWT decoder')}.`,
  },
  'url-encode-decode': {
    primaryKeyword: 'url encode', secondaryKeywords: ['url decode', 'percent encoding', 'urlencode online'], intent: 'do', priority: 4,
    answer: `URL encoding replaces unsafe characters with % codes — a space becomes %20 and & becomes %26 — so values survive inside a query string. Building campaign links? The ${a('utm-builder', 'UTM builder')} encodes them for you.`,
  },
  'jwt-decoder': {
    primaryKeyword: 'jwt decoder', secondaryKeywords: ['decode jwt', 'jwt parser', 'jwt token decoder'], intent: 'do', priority: 3,
    answer: `A JWT is three Base64URL parts — header, payload, signature — separated by dots. Paste one to read its claims and expiry time. Decoding does not verify the signature, and the token never leaves your browser. Expiry times are Unix timestamps; convert them with the ${a('unix-timestamp-converter', 'timestamp converter')}.`,
  },
  'unix-timestamp-converter': {
    primaryKeyword: 'unix timestamp converter', secondaryKeywords: ['epoch converter', 'timestamp to date', 'unix time now'], intent: 'convert', priority: 3,
    answer: 'A Unix timestamp counts seconds since 1 January 1970 UTC. Ten digits means seconds, thirteen means milliseconds — the converter detects which and shows the date in UTC and your local time.',
  },
  'uuid-generator': {
    primaryKeyword: 'uuid generator', secondaryKeywords: ['guid generator', 'random uuid', 'uuid v4'], intent: 'do', priority: 4,
    answer: 'Generates version 4 UUIDs from your browser’s cryptographic random source — up to hundreds at once. The chance of two v4 UUIDs colliding is negligible for practical use.',
  },

  // ── Text & SEO ─────────────────────────────────────────────────────────
  'word-counter': {
    primaryKeyword: 'word counter', secondaryKeywords: ['character counter', 'word count', 'reading time calculator'], intent: 'do', priority: 4,
    answer: `Paste or type text to count words, characters, sentences and paragraphs, with reading time at 238 words a minute. Writing a meta description? Check how it looks with the ${a('serp-snippet-preview', 'SERP snippet preview')}.`,
  },
  'case-converter': {
    primaryKeyword: 'case converter', secondaryKeywords: ['uppercase to lowercase', 'title case converter', 'camelcase converter'], intent: 'do', priority: 4,
    answer: `Convert text to UPPER, lower, Title, Sentence, camelCase, snake_case or kebab-case in one click. For URL-ready text, use the ${a('slug-generator', 'slug generator')}.`,
  },
  'slug-generator': {
    primaryKeyword: 'slug generator', secondaryKeywords: ['url slug generator', 'seo friendly url', 'text to slug'], intent: 'do', priority: 3,
    answer: `A good slug is short, lowercase and hyphen-separated, with accents removed: “10 Best Café Ideas!” becomes 10-best-cafe-ideas. Preview the full result in Google with the ${a('serp-snippet-preview', 'SERP snippet preview')}.`,
  },
  'utm-builder': {
    primaryKeyword: 'utm builder', secondaryKeywords: ['campaign url builder', 'utm link generator', 'google analytics utm'], intent: 'do', priority: 3,
    answer: 'Add utm_source, utm_medium and utm_campaign to any link so Google Analytics shows exactly which post, email or ad sent the visit. Keep values lowercase and consistent — “Facebook” and “facebook” are counted separately.',
  },
  'serp-snippet-preview': {
    primaryKeyword: 'serp preview tool', secondaryKeywords: ['google snippet preview', 'meta title length checker', 'meta description length'], intent: 'check', priority: 2,
    answer: `Google cuts titles at about 600 pixels (roughly 50–60 characters) and descriptions at about 920 pixels on desktop. Type yours to see where they truncate before you publish; build a clean URL with the ${a('slug-generator', 'slug generator')}.`,
  },
};

export interface CategorySeo { title: string; metaDescription: string; h1: string; intro: string }

export const categorySeo: Record<CategoryId, CategorySeo> = {
  image: {
    title: 'Free Image Converters – JPG, PNG & WebP Online | ToolLantern',
    metaDescription: 'Convert, compress and resize JPG, PNG and WebP images free in your browser. Batch up to 30 files — nothing is uploaded.',
    h1: 'Image converters',
    intro: 'Convert between JPG, PNG and WebP, shrink file sizes and resize to exact pixels. All processing happens in your browser, so photos never leave your device.',
  },
  convert: {
    title: 'Unit Converters – Length, Weight & Temperature | ToolLantern',
    metaDescription: 'Convert cm to inches, kg to lbs, Celsius to Fahrenheit and more with exact factors and quick reference tables. Free, instant, no sign-up.',
    h1: 'Unit converters',
    intro: 'Length, weight and temperature conversions using exact international definitions, each with a reference table for the values people look up most.',
  },
  business: {
    title: 'Free Business Calculators – Margin, Markup & Fees | ToolLantern',
    metaDescription: 'Profit margin, markup, discount, break-even, Stripe and PayPal fee calculators with the formulas shown. Free tools for pricing and selling online.',
    h1: 'Business & e-commerce calculators',
    intro: 'The numbers behind pricing and selling online: margins, markups, discounts, break-even points and what payment processors keep from each sale.',
  },
  home: {
    title: 'Home Project Calculators – Tile, Paint, Concrete | ToolLantern',
    metaDescription: 'Estimate tiles, paint, flooring, concrete and gravel before you buy, with waste allowances built in. Free home and construction calculators.',
    h1: 'Home & construction calculators',
    intro: 'Work out how much material to buy for floors, walls, slabs and driveways — with waste allowances included, so you order once.',
  },
  energy: {
    title: 'Appliance Electricity Cost Calculators | ToolLantern',
    metaDescription: 'See what your AC, space heater, fridge, TV, fan and washing machine cost to run per hour, day, month and year. Enter your own rate in $/kWh.',
    h1: 'Energy & electricity calculators',
    intro: 'Find out what each appliance really costs to run. Every calculator starts with typical wattage and usage for that appliance — change them to match yours and enter your own electricity rate.',
  },
  everyday: {
    title: 'Everyday Calculators – Percentage, Age & Dates | ToolLantern',
    metaDescription: 'Percentages, percentage change, exact age and days between dates — quick calculators for everyday questions, with the working shown.',
    h1: 'Everyday calculators',
    intro: 'Quick answers to everyday maths: percentages, increases and decreases, exact ages and the number of days between two dates.',
  },
  developer: {
    title: 'Free Developer Tools – JSON, JWT, Base64 | ToolLantern',
    metaDescription: 'Format JSON, decode JWTs, convert Unix timestamps, encode Base64 and URLs, and generate UUIDs — all processed locally in your browser.',
    h1: 'Developer tools',
    intro: 'Everyday utilities for working with APIs and data. Everything runs in your browser, so tokens, payloads and config never leave your machine.',
  },
  'text-seo': {
    title: 'Text & SEO Tools – Word Counter, UTM, SERP Preview | ToolLantern',
    metaDescription: 'Count words, change case, create URL slugs, build UTM links and preview Google snippets. Free text and SEO tools, no sign-up.',
    h1: 'Text & SEO tools',
    intro: 'Tools for writing and publishing: count words, fix capitalisation, make clean URLs, tag campaign links and check how a page will look in Google.',
  },
};

export const seoOf = (slug: string): ToolSeo | undefined => toolSeo[slug];

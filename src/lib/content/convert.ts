import type { ToolContent, FAQ } from '../types';

const updated = '2026-10-07';
const PRIVATE = 'Files are converted in your browser and never uploaded.';

// ---------------- Image converters ----------------
type Fmt = 'jpg' | 'png' | 'webp';
const FMT_INFO: Record<Fmt, { name: string; good: string }> = {
  jpg: { name: 'JPG', good: 'photos — small files and universal support, but no transparency and some quality loss each time it is saved' },
  png: { name: 'PNG', good: 'logos, screenshots, text and anything with transparency — lossless, but photos come out large' },
  webp: { name: 'WebP', good: 'websites — usually 25–35% smaller than JPG at similar quality, with transparency support' },
};

function pair(from: Fmt, to: Fmt, extra: { why: string; caveat: string; faqs: FAQ[]; popular?: boolean; kw: string[] }): ToolContent {
  const F = FMT_INFO[from].name, T = FMT_INFO[to].name;
  return {
    slug: `${from}-to-${to}`, name: `${F} to ${T} Converter`, category: 'image', engine: 'image', updated, popular: extra.popular,
    defaults: { mode: 'convert', from, to },
    title: `${F} to ${T} Converter – Free, Fast & Private`,
    description: `Convert ${F} images to ${T} in seconds. Batch convert up to 30 files, adjust quality and download instantly. ${PRIVATE}`,
    lead: `Turn ${F} files into ${T} right in your browser — drag in one image or thirty. ${PRIVATE}`,
    keywords: [`${from} to ${to}`, `convert ${from} to ${to}`, `${F} ${T}`, `${from} ${to} converter online`, 'image converter', ...extra.kw],
    about: [
      `${F} is best for ${FMT_INFO[from].good}. ${T} is best for ${FMT_INFO[to].good}.`,
      extra.why,
      extra.caveat,
    ],
    howTo: [`Drop your ${F} files on the box above, click “Choose files”, or paste an image.`, `Check the output format is ${T}${to !== 'png' ? ' and set the quality (85–92% is a good balance)' : ''}.`, `Click “Convert to ${T}”.`, 'Download each image, or use “Download all”.'],
    faqs: [
      { q: 'Are my images uploaded to a server?', a: 'No. The conversion uses your browser’s built-in image engine, so the files stay on your device. That also makes it fast — there is no upload or download wait.' },
      ...extra.faqs,
      { q: 'Can I convert several files at once?', a: 'Yes. Add up to 30 images and convert them in one go, then download them individually or all together.' },
    ],
    related: ['image-converter', 'image-compressor', 'image-resizer', `${to}-to-${from}`].filter((s, i, a) => a.indexOf(s) === i),
  };
}

export const imageTools: ToolContent[] = [
  {
    slug: 'image-converter', name: 'Image Converter', category: 'image', engine: 'image', updated, popular: true,
    defaults: { mode: 'convert', to: 'webp' },
    title: 'Image Converter – JPG, PNG & WebP Online, Free',
    description: 'Convert images between JPG, PNG and WebP in your browser. Batch convert, set quality, resize and download instantly. No upload, no sign-up.',
    lead: `Convert any image to JPG, PNG or WebP, with quality and size controls. ${PRIVATE}`,
    keywords: ['convert image', 'image format converter', 'photo converter', 'change image format', 'jpeg png webp', 'picture converter'],
    about: [
      'Different image formats suit different jobs. JPG is the default for photos, PNG keeps sharp edges and transparency for logos and screenshots, and WebP gives smaller files for websites.',
      'This converter reads any image your browser can open — including GIF, BMP and AVIF — and saves it as JPG, PNG or WebP. Because it runs locally, it works with private documents and is quick even for large photos.',
      'Converting a JPG to PNG will not restore detail that JPG compression already removed; it only stops further loss. For the smallest web-ready files, convert to WebP at around 80–85% quality.',
    ],
    howTo: ['Add images by dropping, choosing or pasting them.', 'Pick the output format.', 'Adjust quality and, if needed, a maximum width.', 'Convert, then download.'],
    faqs: [
      { q: 'Which format should I use?', a: 'Photos: JPG or WebP. Logos, icons, screenshots and anything transparent: PNG or WebP. For websites, WebP is usually the smallest at the same visual quality.' },
      { q: 'Does converting reduce quality?', a: 'Saving to JPG or WebP is lossy — lower quality settings remove more detail. PNG is lossless. Converting to a lossless format does not bring back detail that was already lost.' },
      { q: 'Can it convert HEIC iPhone photos?', a: 'Only in browsers that can open HEIC natively, such as Safari on Mac and iPhone. Elsewhere, set your iPhone camera to “Most Compatible” to shoot JPG.' },
    ],
    related: ['jpg-to-png', 'png-to-jpg', 'webp-to-jpg', 'image-compressor'],
  },
  pair('jpg', 'png', {
    popular: true, kw: ['jpeg to png', 'jpg 2 png', 'transparent png'],
    why: 'People convert JPG to PNG when a platform only accepts PNG, when they want to edit an image repeatedly without adding more compression artefacts, or before removing a background.',
    caveat: 'Expect the PNG to be larger than the JPG — often several times larger for photos — because PNG stores every pixel without lossy compression. Converting does not add transparency on its own; you need an editor to remove the background.',
    faqs: [
      { q: 'Why is my PNG bigger than the JPG?', a: 'PNG is lossless. For photographs with lots of colour variation that means much larger files. For logos and flat graphics the difference is smaller.' },
      { q: 'Will the PNG have a transparent background?', a: 'No — a JPG has no transparency to carry over, so the background stays as it was. Use a background remover first, then save as PNG.' },
    ],
  }),
  pair('png', 'jpg', {
    popular: true, kw: ['png to jpeg', 'reduce png size', 'png 2 jpg'],
    why: 'Converting PNG to JPG is the quickest way to shrink large screenshots and photos saved as PNG — a 5 MB PNG photo often becomes a few hundred KB as JPG — and to meet upload forms that only accept JPG.',
    caveat: 'JPG cannot store transparency. Any transparent area is filled with the background colour you choose (white by default). Text and sharp lines may show slight blur at lower quality, so keep quality at 90% or more for screenshots.',
    faqs: [
      { q: 'What happens to transparent areas?', a: 'They are filled with the background colour picked in the settings. White is the default; choose another colour to match where the image will be used.' },
      { q: 'What quality should I use?', a: 'Around 85–92% keeps photos looking identical to the eye while cutting size dramatically. Use 92%+ for screenshots with small text.' },
    ],
  }),
  pair('webp', 'jpg', {
    popular: true, kw: ['webp to jpeg', 'open webp', 'save webp as jpg'],
    why: 'Many websites serve images as WebP, but some older apps, print services and upload forms still reject it. Converting WebP to JPG gives you a file that opens absolutely everywhere.',
    caveat: 'Animated WebP files are converted using their first frame. Transparent areas are filled with the background colour you choose.',
    faqs: [
      { q: 'Why can’t I open a WebP file?', a: 'Some older image viewers and editors don’t support WebP yet. Converting to JPG solves this for photos; use WebP to PNG if the image has transparency.' },
      { q: 'Is WebP better than JPG?', a: 'For websites, usually — it is smaller at the same quality. For sharing, printing and compatibility, JPG is still the safest choice.' },
    ],
  }),
  pair('webp', 'png', {
    kw: ['webp to png transparent', 'save webp as png'],
    why: 'Convert WebP to PNG when you need a widely compatible file that keeps transparency — for example a logo or sticker downloaded from a website that you want to use in a design tool.',
    caveat: 'The PNG will usually be larger than the WebP, because PNG compression is lossless and less efficient for photos.',
    faqs: [
      { q: 'Is transparency kept?', a: 'Yes. Transparent pixels in the WebP stay transparent in the PNG.' },
      { q: 'What about animated WebP?', a: 'Only the first frame is saved, because PNG files here are single images.' },
    ],
  }),
  pair('png', 'webp', {
    kw: ['png to webp transparent', 'convert png for website'],
    why: 'PNG to WebP is one of the easiest wins for website speed: transparent PNG graphics often shrink by more than half as WebP while keeping their transparency.',
    caveat: 'All modern browsers support WebP. If you also need to email the image or open it in older software, keep the PNG as well.',
    faqs: [
      { q: 'Does WebP keep transparency?', a: 'Yes. WebP supports an alpha channel, so transparent backgrounds are preserved.' },
      { q: 'Which quality should I pick for graphics?', a: 'Start at 90%. Flat graphics and logos stay crisp, and files are still much smaller than PNG.' },
    ],
  }),
  pair('jpg', 'webp', {
    kw: ['jpeg to webp', 'optimize images for website', 'convert photos to webp'],
    why: 'Switching website photos from JPG to WebP reduces page weight, which helps loading speed and Core Web Vitals. At 80–85% quality, the difference is rarely visible.',
    caveat: 'Keep your original JPGs as masters; re-saving lossy files repeatedly slowly reduces quality.',
    faqs: [
      { q: 'How much smaller will my images be?', a: 'Commonly 25–35% smaller than JPG at similar visual quality, sometimes more. The exact saving depends on the photo.' },
      { q: 'Do all browsers show WebP?', a: 'All current versions of Chrome, Safari, Firefox and Edge support WebP.' },
    ],
  }),
  {
    slug: 'image-compressor', name: 'Image Compressor', category: 'image', engine: 'image', updated, popular: true,
    defaults: { mode: 'compress' },
    title: 'Image Compressor – Reduce JPG, PNG & WebP Size Online',
    description: 'Compress images to a smaller file size without visible quality loss. Batch compress JPG, PNG and WebP, cap the width and see the savings. Free & private.',
    lead: `Shrink photos and graphics for email, websites and upload limits — see exactly how many KB you save. ${PRIVATE}`,
    keywords: ['compress image', 'reduce image size', 'compress jpg', 'image size reducer', 'compress photo to 100kb', 'optimize images'],
    about: [
      'Most photos straight from a phone are 3–8 MB and 4,000+ pixels wide — far bigger than any screen needs. Two things shrink them: lowering the pixel dimensions, and saving with stronger compression.',
      'The defaults here cap width at 2,000 px and use 72% quality, which typically cuts phone photos by 80–90% with no visible difference on screen. Choose WebP output for the smallest web files.',
      'PNG is lossless, so the quality slider does not apply to it. To make PNG photos dramatically smaller, change the output to JPG or WebP.',
    ],
    howTo: ['Add your images.', 'Keep “Keep original” format, or choose WebP for the smallest files.', 'Adjust quality — lower means smaller files.', 'Set a maximum width (e.g. 1600 px for websites, 1200 px for email).', 'Compress and download.'],
    faqs: [
      { q: 'How do I compress a photo to under 100 KB?', a: 'Set max width to about 1,200 px, choose JPG or WebP, and lower quality to around 60–70%. Check the size shown, and lower it a little more if needed.' },
      { q: 'Will compression make my photo blurry?', a: 'Between roughly 70% and 90% quality, most people cannot see a difference on screen. Below about 50%, blockiness becomes visible.' },
      { q: 'Why did my PNG barely shrink?', a: 'PNG compression is lossless. Resize it, or convert it to WebP (keeps transparency) or JPG for much bigger savings.' },
    ],
    related: ['image-resizer', 'image-converter', 'png-to-webp', 'jpg-to-webp'],
  },
  {
    slug: 'image-resizer', name: 'Image Resizer', category: 'image', engine: 'image', updated,
    defaults: { mode: 'resize' },
    title: 'Image Resizer – Resize Photos by Pixels or Percentage',
    description: 'Resize images to exact pixel dimensions or by percentage, keep the aspect ratio, and batch process JPG, PNG and WebP. Free, fast and private.',
    lead: `Resize one image or a whole batch to exact pixels or a percentage — aspect ratio locked by default. ${PRIVATE}`,
    keywords: ['resize image', 'change image size', 'resize photo pixels', 'image dimensions', 'scale image', 'resize for instagram'],
    about: [
      'Resizing changes the pixel dimensions of an image. Making images smaller is lossless in practice and also cuts file size; making them bigger cannot add real detail and will look softer.',
      'Common targets: 1080×1080 for Instagram posts, 1200×630 for Facebook and LinkedIn link previews, 1920 px wide for full-width website banners, and 600–800 px wide for email.',
    ],
    howTo: ['Add images.', 'Enter a width or height in pixels (the other side is calculated when aspect ratio is locked), or enter a percentage.', 'Choose an output format and quality.', 'Click Resize and download.'],
    faqs: [
      { q: 'How do I resize without stretching?', a: 'Keep “Keep aspect ratio” ticked and enter just the width or just the height. To fit an exact shape like a square, crop first.' },
      { q: 'Can I make a small image bigger?', a: 'You can, but enlarging cannot invent detail, so it will look softer. Start from the largest original you have.' },
      { q: 'Does resizing reduce file size?', a: 'Yes. Halving width and height leaves a quarter of the pixels, so files typically shrink by around 70–75%.' },
    ],
    related: ['image-compressor', 'image-converter', 'jpg-to-webp', 'png-to-jpg'],
  },
];

// ---------------- Unit converters ----------------
export const unitTools: ToolContent[] = [
  {
    slug: 'length-converter', name: 'Length Converter', category: 'convert', engine: 'unit', updated,
    defaults: { kind: 'length', from: 'm', to: 'ft', value: '1' },
    title: 'Length Converter – cm, m, km, inches, feet, miles',
    description: 'Convert between millimetres, centimetres, metres, kilometres, inches, feet, yards and miles instantly, with exact factors and a quick reference table.',
    lead: 'Convert any length between metric and imperial units — instantly, both ways.',
    keywords: ['length conversion', 'metric to imperial', 'meters to feet', 'km to miles', 'mm to inches', 'unit converter'],
    about: [
      'Imperial lengths are defined exactly in metric: 1 inch is exactly 2.54 cm, 1 foot is 30.48 cm, 1 yard is 0.9144 m and 1 mile is 1,609.344 m. The converter uses these exact definitions, so results are precise rather than rounded rules of thumb.',
    ],
    howTo: ['Type a number.', 'Choose the unit you have and the unit you want.', 'Use the swap button to reverse, or click a row in the table.'],
    formula: { expression: 'Result = Value × (from-unit in metres) ÷ (to-unit in metres)', explanation: ['Every unit is converted through metres, so any pair works.'] },
    faqs: [
      { q: 'How many feet are in a metre?', a: 'About 3.2808 feet. One foot is exactly 0.3048 metres.' },
      { q: 'How many km in a mile?', a: 'One mile is exactly 1.609344 km, and one km is about 0.6214 miles.' },
    ],
    related: ['cm-to-inches', 'inches-to-cm', 'weight-converter', 'temperature-converter'],
  },
  {
    slug: 'cm-to-inches', name: 'CM to Inches Converter', category: 'convert', engine: 'unit', updated, popular: true,
    defaults: { kind: 'length', from: 'cm', to: 'in', value: '30' },
    title: 'CM to Inches Converter – Centimetres to Inches',
    description: 'Convert centimetres to inches instantly. 1 cm = 0.3937 in. Includes a cm to inches chart for heights, screens and clothing sizes.',
    lead: 'Turn centimetres into inches for heights, screen sizes, clothing and DIY measurements.',
    keywords: ['cm to in', 'centimeters to inches', 'cm in inches', 'convert cm', 'height cm to inches'],
    about: [
      'An inch is defined as exactly 2.54 centimetres, so to convert cm to inches you divide by 2.54 (or multiply by about 0.3937).',
      'For heights, convert to total inches first and then split into feet: 175 cm ÷ 2.54 = 68.9 in, which is 5 ft 8.9 in.',
    ],
    howTo: ['Enter the length in centimetres.', 'Read the result in inches.', 'Use the table for common values.'],
    formula: { expression: 'inches = cm ÷ 2.54', explanation: ['Example: 30 cm ÷ 2.54 = 11.81 in.'] },
    faqs: [
      { q: 'How many inches is 1 cm?', a: 'About 0.3937 inches.' },
      { q: 'What is 170 cm in feet and inches?', a: '170 ÷ 2.54 = 66.93 inches, which is 5 feet 6.9 inches.' },
    ],
    related: ['inches-to-cm', 'length-converter', 'kg-to-lbs', 'tile-calculator'],
  },
  {
    slug: 'inches-to-cm', name: 'Inches to CM Converter', category: 'convert', engine: 'unit', updated,
    defaults: { kind: 'length', from: 'in', to: 'cm', value: '12' },
    title: 'Inches to CM Converter – Inches to Centimetres',
    description: 'Convert inches to centimetres instantly. 1 inch = 2.54 cm exactly. Includes a quick inches to cm chart for screens, sizes and measurements.',
    lead: 'Convert inches to centimetres exactly — handy for screens, waist sizes, paper and furniture.',
    keywords: ['in to cm', 'inch to centimeter', 'inches in cm', 'convert inches'],
    about: [
      'Since 1959 the inch has been defined as exactly 2.54 cm, so multiplying by 2.54 gives an exact answer, not an approximation.',
      'Screen sizes are measured diagonally: a 55-inch TV is 139.7 cm corner to corner, not wide.',
    ],
    howTo: ['Enter inches.', 'Read the centimetre value.', 'Swap to convert back.'],
    formula: { expression: 'cm = inches × 2.54', explanation: ['Example: 12 in × 2.54 = 30.48 cm.'] },
    faqs: [
      { q: 'How many cm is 1 inch?', a: 'Exactly 2.54 cm.' },
      { q: 'How many cm is a foot?', a: '12 inches × 2.54 = 30.48 cm.' },
    ],
    related: ['cm-to-inches', 'length-converter', 'lbs-to-kg', 'flooring-calculator'],
  },
  {
    slug: 'weight-converter', name: 'Weight Converter', category: 'convert', engine: 'unit', updated,
    defaults: { kind: 'weight', from: 'kg', to: 'lb', value: '1' },
    title: 'Weight Converter – kg, g, lbs, oz, stone',
    description: 'Convert weights between grams, kilograms, tonnes, ounces, pounds and stone using exact international definitions. Includes a reference table.',
    lead: 'Convert any weight between metric and imperial units, including stone.',
    keywords: ['weight conversion', 'mass converter', 'grams to ounces', 'kg to stone', 'pounds to grams'],
    about: [
      'The international pound is defined as exactly 0.45359237 kg. An ounce is 1/16 of a pound and a stone is 14 pounds. These exact definitions are used here.',
    ],
    howTo: ['Enter a weight.', 'Pick the units.', 'Swap or use the table as needed.'],
    formula: { expression: 'Result = Value × (from-unit in grams) ÷ (to-unit in grams)', explanation: [] },
    faqs: [
      { q: 'How many grams in an ounce?', a: 'About 28.35 grams.' },
      { q: 'How many pounds in a stone?', a: 'Exactly 14 pounds, which is about 6.35 kg.' },
    ],
    related: ['kg-to-lbs', 'lbs-to-kg', 'length-converter', 'temperature-converter'],
  },
  {
    slug: 'kg-to-lbs', name: 'KG to LBS Converter', category: 'convert', engine: 'unit', updated, popular: true,
    defaults: { kind: 'weight', from: 'kg', to: 'lb', value: '70' },
    title: 'KG to LBS Converter – Kilograms to Pounds',
    description: 'Convert kilograms to pounds instantly. 1 kg = 2.2046 lb. With a kg to lbs chart for body weight, luggage and shipping.',
    lead: 'Convert kilograms to pounds for body weight, luggage allowances and parcel shipping.',
    keywords: ['kg to lb', 'kilograms to pounds', 'kg in pounds', 'convert kg', 'luggage kg to lbs'],
    about: [
      'One kilogram is about 2.20462 pounds. A quick mental shortcut is to double the kilograms and add 10%: 70 kg → 140 + 14 = 154 lb (exact: 154.32 lb).',
      'Airline allowances are often 23 kg checked baggage, which is about 50.7 lb.',
    ],
    howTo: ['Enter kilograms.', 'Read pounds.', 'Swap to convert pounds back to kg.'],
    formula: { expression: 'lb = kg × 2.20462', explanation: ['Exact: lb = kg ÷ 0.45359237.'] },
    faqs: [
      { q: 'What is 1 kg in pounds?', a: 'About 2.2046 pounds.' },
      { q: 'How do I convert kg to stone and pounds?', a: 'Convert to pounds, divide by 14 for stone, and the remainder is pounds. 70 kg = 154.3 lb = 11 st 0.3 lb.' },
    ],
    related: ['lbs-to-kg', 'weight-converter', 'cm-to-inches', 'percentage-calculator'],
  },
  {
    slug: 'lbs-to-kg', name: 'LBS to KG Converter', category: 'convert', engine: 'unit', updated,
    defaults: { kind: 'weight', from: 'lb', to: 'kg', value: '150' },
    title: 'LBS to KG Converter – Pounds to Kilograms',
    description: 'Convert pounds to kilograms instantly. 1 lb = 0.4536 kg exactly. Includes a lbs to kg table for body weight and shipping.',
    lead: 'Convert pounds to kilograms exactly — for gym weights, body weight and parcels.',
    keywords: ['lb to kg', 'pounds to kilograms', 'lbs in kg', 'convert pounds'],
    about: [
      'A pound is exactly 0.45359237 kg, so multiply pounds by 0.4536 (or divide by 2.2046) to get kilograms.',
      'Shortcut: halve the pounds and subtract 10% of that: 150 lb → 75 − 7.5 = 67.5 kg (exact: 68.04 kg).',
    ],
    howTo: ['Enter pounds.', 'Read kilograms.', 'Use the chart for common values.'],
    formula: { expression: 'kg = lb × 0.45359237', explanation: [] },
    faqs: [
      { q: 'What is 1 lb in kg?', a: 'Exactly 0.45359237 kg — about 0.4536 kg.' },
      { q: 'What is 200 lbs in kg?', a: 'About 90.72 kg.' },
    ],
    related: ['kg-to-lbs', 'weight-converter', 'inches-to-cm', 'percentage-change-calculator'],
  },
  {
    slug: 'temperature-converter', name: 'Temperature Converter', category: 'convert', engine: 'unit', updated,
    defaults: { kind: 'temperature', from: 'c', to: 'f', value: '20' },
    title: 'Temperature Converter – Celsius, Fahrenheit, Kelvin',
    description: 'Convert temperatures between Celsius, Fahrenheit and Kelvin with the exact formulas, plus a reference table for cooking, weather and fever.',
    lead: 'Convert temperatures between °C, °F and K — for weather, cooking, science and health.',
    keywords: ['celsius fahrenheit kelvin', 'temperature conversion', 'convert temperature', 'degrees converter'],
    about: [
      'Temperature scales do not share a zero point, so conversion needs an offset as well as a scale factor. Celsius and Kelvin have the same step size; Fahrenheit steps are 5/9 the size.',
      'Useful anchors: water freezes at 0 °C (32 °F, 273.15 K) and boils at 100 °C (212 °F) at sea level. −40 is the same in Celsius and Fahrenheit.',
    ],
    howTo: ['Enter a temperature.', 'Choose the scales.', 'Read the result, or click a table row.'],
    formula: { expression: '°F = °C × 9/5 + 32   ·   K = °C + 273.15', explanation: ['°C = (°F − 32) × 5/9.'] },
    faqs: [
      { q: 'Is −40 °C the same as −40 °F?', a: 'Yes — it is the one temperature where both scales match.' },
      { q: 'What is normal body temperature?', a: 'Around 37 °C, which is 98.6 °F. Normal ranges vary slightly by person and time of day.' },
    ],
    related: ['celsius-to-fahrenheit', 'fahrenheit-to-celsius', 'length-converter', 'weight-converter'],
  },
  {
    slug: 'celsius-to-fahrenheit', name: 'Celsius to Fahrenheit Converter', category: 'convert', engine: 'unit', updated, popular: true,
    defaults: { kind: 'temperature', from: 'c', to: 'f', value: '25' },
    title: 'Celsius to Fahrenheit Converter – °C to °F',
    description: 'Convert Celsius to Fahrenheit instantly with the exact formula °F = °C × 9/5 + 32. Includes a °C to °F chart for weather, ovens and fever.',
    lead: 'Convert °C to °F for weather forecasts, oven temperatures and fever checks.',
    keywords: ['c to f', 'celsius to fahrenheit formula', 'degrees c to f', 'convert celsius'],
    about: [
      'Multiply Celsius by 1.8 and add 32. Quick estimate: double it and add 30 — 25 °C → 80 °F (exact 77 °F).',
      'Common oven settings: 180 °C ≈ 356 °F (recipes often round to 350 °F), 200 °C ≈ 392 °F (≈ 400 °F), 220 °C ≈ 428 °F (≈ 425 °F).',
    ],
    howTo: ['Enter °C.', 'Read °F.', 'Swap to go the other way.'],
    formula: { expression: '°F = °C × 9/5 + 32', explanation: ['Example: 25 × 1.8 + 32 = 77 °F.'] },
    faqs: [
      { q: 'What is 30 °C in Fahrenheit?', a: '86 °F.' },
      { q: 'What is 0 °C in Fahrenheit?', a: '32 °F — the freezing point of water.' },
    ],
    related: ['fahrenheit-to-celsius', 'temperature-converter', 'cm-to-inches', 'kg-to-lbs'],
  },
  {
    slug: 'fahrenheit-to-celsius', name: 'Fahrenheit to Celsius Converter', category: 'convert', engine: 'unit', updated,
    defaults: { kind: 'temperature', from: 'f', to: 'c', value: '98.6' },
    title: 'Fahrenheit to Celsius Converter – °F to °C',
    description: 'Convert Fahrenheit to Celsius instantly using °C = (°F − 32) × 5/9. Includes a °F to °C chart for weather, cooking and body temperature.',
    lead: 'Convert °F to °C for US recipes, weather and thermometer readings.',
    keywords: ['f to c', 'fahrenheit to celsius formula', 'degrees f to c', 'convert fahrenheit'],
    about: [
      'Subtract 32, then multiply by 5/9. Quick estimate: subtract 30 and halve — 80 °F → 25 °C (exact 26.7 °C).',
      'A US recipe at 350 °F needs about 177 °C; most European ovens would be set to 175–180 °C.',
    ],
    howTo: ['Enter °F.', 'Read °C.', 'Use the chart for common values.'],
    formula: { expression: '°C = (°F − 32) × 5/9', explanation: ['Example: (98.6 − 32) × 5/9 = 37 °C.'] },
    faqs: [
      { q: 'What is 100 °F in Celsius?', a: 'About 37.8 °C.' },
      { q: 'What is 350 °F in Celsius?', a: 'About 176.7 °C, usually rounded to 180 °C on oven dials.' },
    ],
    related: ['celsius-to-fahrenheit', 'temperature-converter', 'inches-to-cm', 'lbs-to-kg'],
  },
];

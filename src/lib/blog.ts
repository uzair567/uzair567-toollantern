// Blog guides. Each post answers a question people already reach ToolLantern for (from Search Console),
// explains the method with worked numbers, and links to the matching calculator.

export type BlogPost = {
  slug: string;
  title: string; // <title>, ≤60 chars, contains focusKeyword
  metaDescription: string; // 70–155 chars, contains focusKeyword
  focusKeyword: string;
  h1: string;
  published: string;
  updated: string;
  tools: string[]; // tool slugs this guide supports (first = main CTA)
  summary: string; // short answer shown at the top (plain text)
  body: { h2: string; html: string }[];
  faqs: { q: string; a: string }[];
};

const L = (slug: string, text: string) => `<a href="/${slug}/">${text}</a>`;
const table = (head: string[], rows: (string | number)[][]) =>
  `<div class="not-prose overflow-x-auto rounded-2xl border border-line my-4"><table class="w-full text-sm"><thead class="surface-2 text-left"><tr>${head.map((h) => `<th scope="col" class="px-4 py-2.5 font-bold">${h}</th>`).join('')}</tr></thead><tbody class="divide-y divide-[var(--line)]">${rows.map((r) => `<tr>${r.map((c, i) => `<td class="px-4 py-2 tabular-nums${i === 0 ? ' font-semibold' : ''}">${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

export const posts: BlogPost[] = [
  {
    slug: 'how-many-bags-of-mulch-in-a-yard',
    title: 'How Many Bags of Mulch in a Yard? (2 & 3 cu ft)',
    metaDescription: 'How many bags of mulch in a yard: 13.5 bags of 2 cu ft or 9 bags of 3 cu ft. Plus how to work out mulch from square feet and depth.',
    focusKeyword: 'how many bags of mulch in a yard',
    h1: 'How many bags of mulch are in a yard?',
    published: '2026-10-20', updated: '2026-10-20',
    tools: ['mulch-calculator', 'topsoil-calculator', 'gravel-calculator'],
    summary: 'One cubic yard of mulch is 27 cubic feet. That is 13.5 bags of 2 cubic feet, or 9 bags of 3 cubic feet. A yard covers about 108 square feet at 3 inches deep.',
    body: [
      { h2: 'The short answer', html: `<p>Mulch is sold two ways: loose by the <strong>cubic yard</strong> from a landscape yard, or in <strong>bags</strong> measured in cubic feet at garden centres. The link between them is simple — one cubic yard is 3 ft × 3 ft × 3 ft = <strong>27 cubic feet</strong>. Divide 27 by the bag size and you have the number of bags in a yard.</p>
${table(['Bag size', 'Bags in 1 cubic yard', 'Bags in 2 cubic yards', 'Bags in 3 cubic yards'], [['1.5 cu ft', 18, 36, 54], ['2 cu ft', 13.5, 27, 40.5], ['3 cu ft', 9, 18, 27]])}
<p>Going the other way, <strong>bags to yards</strong> = number of bags × bag size ÷ 27. Twenty 2-cubic-foot bags are 40 cubic feet, which is 1.48 cubic yards.</p>` },
      { h2: 'How much mulch do you actually need?', html: `<p>Knowing the bag count per yard only helps once you know how many yards your beds need. The volume is area × depth:</p>
<ol><li>Measure the bed in feet and work out the area in square feet (length × width for a rectangle).</li><li>Choose a depth in inches. Two to three inches is the usual recommendation for garden beds; go thinner over existing mulch and keep it pulled back from tree trunks and stems.</li><li>Cubic feet = square feet × depth in inches ÷ 12.</li><li>Cubic yards = cubic feet ÷ 27. Bags = cubic feet ÷ bag size, rounded up.</li></ol>
<p><strong>Example:</strong> a 20 ft × 10 ft bed is 200 sq ft. At 3 inches: 200 × 3 ÷ 12 = 50 cubic feet = 1.85 cubic yards. That is 25 bags of 2 cu ft or 17 bags of 3 cu ft.</p>
<p>The ${L('mulch-calculator', 'mulch calculator')} does these steps for you — enter length and width, or type the total square footage if you already know it.</p>` },
      { h2: 'Coverage per yard and per bag', html: `<p>This is the table to keep on your phone at the garden centre:</p>
${table(['Depth', '1 cubic yard covers', 'One 2 cu ft bag covers', 'One 3 cu ft bag covers'], [['1 inch', '324 sq ft', '24 sq ft', '36 sq ft'], ['2 inches', '162 sq ft', '12 sq ft', '18 sq ft'], ['3 inches', '108 sq ft', '8 sq ft', '12 sq ft'], ['4 inches', '81 sq ft', '6 sq ft', '9 sq ft']])}` },
      { h2: 'Round beds and odd shapes', html: `<p>For a circle around a tree, area = 3.14 × radius². A ring 6 ft across has a 3 ft radius, so 3.14 × 9 = 28.3 sq ft. At 3 inches deep that is 7.1 cubic feet — four 2-cubic-foot bags.</p>
<p>For L-shaped or curved beds, split them into rectangles and circles, add the areas, then calculate once. Small errors in measuring matter less than people think; adding about 5–10% covers settling and uneven ground.</p>` },
      { h2: 'Bags or bulk: which is cheaper?', html: `<p>Bulk mulch is usually cheaper per cubic yard but often has a delivery fee or a minimum order. Bags cost more per yard but you can carry them in a car and buy exactly what you need. A useful rule: compare the price of 13.5 two-cubic-foot bags (or 9 three-cubic-foot bags) with the delivered price of one yard. Above roughly 2–3 yards, bulk generally wins; for a single bed, bags are simpler.</p>
<p>Doing a full bed refresh? Many people add soil at the same time — the ${L('topsoil-calculator', 'topsoil calculator')} uses the same area and depth method, and the ${L('gravel-calculator', 'gravel calculator')} covers stone paths and borders.</p>` },
    ],
    faqs: [
      { q: 'How many 2 cubic foot bags of mulch make a yard?', a: '13.5 bags. A cubic yard is 27 cubic feet, and 27 ÷ 2 = 13.5, so buy 14 to be safe.' },
      { q: 'How many 3 cubic foot bags of mulch are in a yard?', a: 'Exactly 9, because 27 ÷ 3 = 9.' },
      { q: 'How many square feet does a bag of mulch cover?', a: 'A 2 cubic foot bag covers 12 sq ft at 2 inches deep or 8 sq ft at 3 inches. A 3 cubic foot bag covers 18 sq ft at 2 inches or 12 sq ft at 3 inches.' },
      { q: 'How deep should mulch be?', a: 'Two to three inches is the common recommendation for beds. Keep it a few inches away from trunks and stems.' },
    ],
  },
  {
    slug: 'how-many-tons-of-gravel-in-a-yard',
    title: 'How Many Tons of Gravel in a Yard? Yards to Tons',
    metaDescription: 'How many tons of gravel in a yard: about 1.4 tons per cubic yard for typical gravel. Convert yards to tons and tons to yards with tables.',
    focusKeyword: 'how many tons of gravel in a yard',
    h1: 'How many tons of gravel are in a yard?',
    published: '2026-10-20', updated: '2026-10-20',
    tools: ['gravel-calculator', 'concrete-calculator', 'mulch-calculator'],
    summary: 'A cubic yard of typical gravel weighs about 1.4 US tons (roughly 2,800 lb). Crushed stone is closer to 1.5 tons and river rock about 1.2. So one ton of gravel is about 0.71 cubic yards.',
    body: [
      { h2: 'Why gravel is sold in tons and yards', html: `<p>Quarries weigh trucks, so many suppliers price gravel by the <strong>ton</strong>. Your project, though, is measured in length, width and depth — a <strong>volume</strong>. To order the right amount you need to convert one into the other, and the conversion depends on how heavy the stone is.</p>
<p>The formula is: <strong>tons = cubic yards × tons per cubic yard</strong>. And the reverse: <strong>cubic yards = tons ÷ tons per cubic yard</strong>.</p>` },
      { h2: 'Weight per cubic yard by material', html: `<p>These are typical dry weights in US short tons (2,000 lb). Wet stone is heavier, and every quarry is a little different, so use your supplier’s figure if they give one.</p>
${table(['Material', 'Tons per cubic yard', 'Cubic yards per ton'], [['Pea gravel / crushed gravel', '1.4', '0.71'], ['Crushed stone #57', '1.5', '0.67'], ['River rock', '1.2', '0.83'], ['Sand', '1.35', '0.74']])}` },
      { h2: 'Cubic yards to tons', html: `${table(['Cubic yards', 'Typical gravel (1.4)', '#57 stone (1.5)', 'River rock (1.2)'], [1, 2, 3, 5, 10, 15, 20].map((y) => [y, (y * 1.4).toFixed(1) + ' t', (y * 1.5).toFixed(1) + ' t', (y * 1.2).toFixed(1) + ' t']))}
<p>So 10 cubic yards of typical gravel is about 14 tons — a common size for a tandem dump truck load.</p>` },
      { h2: 'Tons to cubic yards', html: `${table(['Tons', 'Typical gravel', '#57 stone', 'River rock'], [1, 2, 5, 10, 15, 20].map((t) => [t, (t / 1.4).toFixed(2) + ' yd³', (t / 1.5).toFixed(2) + ' yd³', (t / 1.2).toFixed(2) + ' yd³']))}` },
      { h2: 'Worked example: a gravel driveway', html: `<p>A driveway 50 ft long and 10 ft wide, 4 inches deep:</p>
<ol><li>Area: 50 × 10 = 500 sq ft.</li><li>Volume: 500 × 4 ÷ 12 = 166.7 cubic feet.</li><li>Cubic yards: 166.7 ÷ 27 = 6.17 yd³.</li><li>Tons: 6.17 × 1.4 = <strong>8.6 tons</strong> of typical gravel.</li></ol>
<p>Order a little extra — around 5–10% — because gravel compacts and the base is rarely perfectly level. The ${L('gravel-calculator', 'gravel calculator')} does this from area and depth, or converts cubic yards you already know straight to tons.</p>
<p>Pouring a slab next to the drive? Use the ${L('concrete-calculator', 'concrete calculator')}. For planting beds, the ${L('mulch-calculator', 'mulch calculator')} works the same way in cubic yards and bags.</p>` },
    ],
    faqs: [
      { q: 'How many yards are in a ton of gravel?', a: 'About 0.71 cubic yards of typical gravel (1 ÷ 1.4). For #57 crushed stone it is about 0.67, and for river rock about 0.83.' },
      { q: 'How much does a cubic yard of gravel weigh in pounds?', a: 'About 2,800 lb for typical gravel, 3,000 lb for #57 crushed stone and 2,400 lb for river rock, when dry.' },
      { q: 'How many tons is 10 yards of gravel?', a: 'About 14 tons of typical gravel, 15 tons of #57 stone or 12 tons of river rock.' },
    ],
  },
  {
    slug: 'how-much-does-it-cost-to-run-an-air-conditioner',
    title: 'How Much Does It Cost to Run an Air Conditioner?',
    metaDescription: 'How much does it cost to run an air conditioner per hour, day and month? Formula, real examples for window, split and central AC, and savings tips.',
    focusKeyword: 'cost to run an air conditioner',
    h1: 'How much does it cost to run an air conditioner?',
    published: '2026-10-20', updated: '2026-10-20',
    tools: ['electricity-cost-calculator/ac', 'electricity-cost-calculator/ceiling-fan', 'electricity-cost-calculator'],
    summary: 'Cost = watts ÷ 1,000 × hours × electricity rate. A 1,200 W split AC running 8 hours a day with the compressor on 70% of the time uses 6.7 kWh — about $1.14 a day or $34 a month at $0.17/kWh.',
    body: [
      { h2: 'The formula', html: `<p>Every electricity cost calculation comes down to energy used (kilowatt-hours) times what you pay per kilowatt-hour:</p>
<p class="formula">Cost = watts ÷ 1,000 × hours used × duty cycle × price per kWh</p>
<p>The <strong>duty cycle</strong> is the share of time the compressor actually runs. An air conditioner cycles on and off to hold the temperature, so on a mild day it might run 40% of the time and on a very hot day close to 100%. Ignoring this is the most common reason estimates come out too high.</p>
<p>Your price per kWh is on your electricity bill. The examples below use $0.17/kWh — swap in your own rate.</p>` },
      { h2: 'How many watts does an AC use?', html: `<p>Look on the unit’s label or manual for the rated input power in watts. If you only know the size in BTU or tons, a rough estimate is cooling capacity ÷ efficiency ratio (EER). One “ton” is 12,000 BTU/h; at an EER of 10 that is about 1,200 W. Inverter units draw much less once the room has cooled.</p>
${table(['Type', 'Typical running power'], [['Small window unit', '500–900 W'], ['1–1.5 ton split / mini-split', '1,000–1,800 W'], ['Central air (whole house)', '3,000–5,000 W']])}` },
      { h2: 'Real examples', html: `<p>All at 8 hours a day, 70% duty cycle, $0.17/kWh, 30 days:</p>
${table(['AC', 'kWh per day', 'Cost per day', 'Cost per month'], [['700 W window unit', '3.9', '$0.67', '$20'], ['1,200 W split unit', '6.7', '$1.14', '$34'], ['3,500 W central air', '19.6', '$3.33', '$100']])}
<p>Per hour of actual running, a 1,200 W unit costs 1.2 × $0.17 = about 20¢. Plug your own wattage, hours and rate into the ${L('electricity-cost-calculator/ac', 'AC electricity cost calculator')} for a figure that matches your bill.</p>` },
      { h2: 'How to cut AC running costs', html: `<ul><li><strong>Raise the set point.</strong> The US Department of Energy says setting the thermostat back 7–10°F for 8 hours a day can save up to 10% a year on heating and cooling.</li><li><strong>Use a fan with the AC.</strong> A ceiling fan uses around 50–75 W, a fraction of an AC, and lets you feel comfortable at a higher temperature. Check it with the ${L('electricity-cost-calculator/ceiling-fan', 'ceiling fan cost calculator')}.</li><li><strong>Clean or replace filters.</strong> A clogged filter makes the compressor work longer.</li><li><strong>Block afternoon sun.</strong> Closing blinds on south and west windows reduces the heat the AC has to remove.</li><li><strong>Size matters.</strong> An oversized unit short-cycles; an undersized one runs flat out. An inverter unit sized for the room is usually the cheapest to run.</li></ul>
<p>Want to compare other appliances? The main ${L('electricity-cost-calculator', 'electricity cost calculator')} works for anything with a watt rating.</p>` },
    ],
    faqs: [
      { q: 'How much does it cost to run an AC for 1 hour?', a: 'Watts ÷ 1,000 × your rate. A 1,200 W unit at $0.17/kWh costs about 20¢ per hour while the compressor runs; less on average because it cycles.' },
      { q: 'Is it cheaper to leave the AC on all day?', a: 'Usually not. Turning the set point up while you are out means the AC removes less heat overall, which is why the Department of Energy recommends setting it back.' },
      { q: 'How many kWh does an AC use per month?', a: 'A 1,200 W split unit running 8 hours a day at a 70% duty cycle uses about 200 kWh a month. A central system can use 500–600 kWh or more.' },
    ],
  },
  {
    slug: 'electric-water-heater-cost-per-month',
    title: 'Electric Water Heater Cost per Month (and vs Propane)',
    metaDescription: 'Electric water heater cost per month, worked out from daily hot water use, plus how it compares with propane and heat pump water heaters.',
    focusKeyword: 'electric water heater cost per month',
    h1: 'How much does an electric water heater cost per month?',
    published: '2026-10-20', updated: '2026-10-20',
    tools: ['electricity-cost-calculator/water-heater', 'electricity-cost-calculator/washing-machine', 'electricity-cost-calculator/dishwasher'],
    summary: 'A household using about 64 gallons of hot water a day needs roughly 11 kWh a day to heat it, which is about 357 kWh and $61 a month at $0.17/kWh for a standard electric tank. A heat pump water heater can do the same job for around $16.',
    body: [
      { h2: 'Two ways to estimate it', html: `<p><strong>1. From element wattage and hours.</strong> A standard 40–50 gallon electric tank has elements rated around 4,500–5,500 W. If the element runs about 3 hours a day in total: 4,500 W × 3 h = 13.5 kWh a day, or about $2.30 a day and $69 a month at $0.17/kWh. The ${L('electricity-cost-calculator/water-heater', 'water heater cost calculator')} uses this method.</p>
<p><strong>2. From how much hot water you use.</strong> This is more accurate if you know your usage. Heating one gallon of water by 1°F takes 8.34 BTU, and 3,412 BTU equals 1 kWh.</p>` },
      { h2: 'Worked example from hot water use', html: `<p>The US Department of Energy puts typical household hot water use at up to 64 gallons a day. Heating that from 50°F to 120°F (a 70°F rise):</p>
<ol><li>64 × 8.34 × 70 = 37,363 BTU a day.</li><li>37,363 ÷ 3,412 = 11 kWh a day of heat.</li><li>A standard electric tank is roughly 92% efficient once standby losses are counted, so it draws about 11.9 kWh a day, or 357 kWh a month.</li><li>357 kWh × $0.17 = <strong>about $61 a month</strong>.</li></ol>
<p>Smaller households, lower thermostat settings and warmer incoming water all bring this down.</p>` },
      { h2: 'Electric vs propane vs heat pump', html: `<p>To compare fuels fairly, start from the same heat need (about 1.12 million BTU a month in the example) and divide by each heater’s efficiency. Fuel prices vary a lot by region, so treat the prices below as examples and use your own.</p>
${table(['Water heater', 'Efficiency used', 'Fuel per month', 'Example price', 'Cost per month'], [['Standard electric tank', '0.92', '357 kWh', '$0.17/kWh', '$61'], ['Propane tank', '0.62', '19.8 gallons', '$2.50/gallon', '$49'], ['Heat pump (hybrid) electric', '3.5', '94 kWh', '$0.17/kWh', '$16']])}
<p>One gallon of propane contains about 91,500 BTU. Whether propane beats standard electric depends entirely on the two prices you pay — at $3.10 a gallon the propane figure above would roughly match electric. A heat pump water heater moves heat from the air rather than creating it, which is why it uses a fraction of the electricity.</p>` },
      { h2: 'Ways to lower the bill', html: `<ul><li>Set the tank to 120°F — hotter settings increase standby losses.</li><li>Fix dripping hot taps and fit low-flow shower heads.</li><li>Wash clothes in cold water: most of a ${L('electricity-cost-calculator/washing-machine', 'washing machine’s running cost')} is heating water.</li><li>Run the ${L('electricity-cost-calculator/dishwasher', 'dishwasher')} only when full.</li><li>Insulate the first few feet of hot water pipe from the tank.</li></ul>` },
    ],
    faqs: [
      { q: 'How many kWh does an electric water heater use per day?', a: 'Commonly 10–15 kWh for a family household. The exact figure depends on how much hot water you use and the tank temperature.' },
      { q: 'Is propane or electric cheaper for a water heater?', a: 'It depends on local prices. Divide each fuel’s price by its heat content and the heater’s efficiency; a heat pump electric model is usually cheapest to run.' },
      { q: 'How much does it cost to run a 4,500 watt water heater?', a: '4.5 kW × hours of heating × your rate. At 3 hours a day and $0.17/kWh, about $2.30 a day or $69 a month.' },
    ],
  },
  {
    slug: 'how-much-does-it-cost-to-run-a-dryer',
    title: 'How Much Does It Cost to Run a Dryer per Load?',
    metaDescription: 'How much does it cost to run a dryer? The per-load formula, worked examples (including a 5 kW dryer for 90 minutes) and ways to cut the cost.',
    focusKeyword: 'cost to run a dryer',
    h1: 'How much does it cost to run a dryer?',
    published: '2026-10-20', updated: '2026-10-20',
    tools: ['electricity-cost-calculator/dryer', 'electricity-cost-calculator/washing-machine', 'electricity-cost-calculator'],
    summary: 'Cost per load = kW × hours × electricity rate. A 3,000 W dryer with its heater on about 75% of a one-hour cycle uses 2.25 kWh — about 38¢ a load at $0.17/kWh, or roughly $99 a year at five loads a week.',
    body: [
      { h2: 'The per-load formula', html: `<p class="formula">Cost per load = watts ÷ 1,000 × cycle hours × share of time heating × price per kWh</p>
<p>Electric dryers are rated anywhere from about 1,800 to 5,000 W, and almost all of that is the heating element. The element switches on and off to hold the drum temperature, and towards the end of a sensor-dry cycle it barely runs, so the real average draw is lower than the label.</p>` },
      { h2: 'Worked examples', html: `${table(['Dryer and cycle', 'Energy', 'Rate', 'Cost'], [['3,000 W, 60 min, heater on 75%', '2.25 kWh', '$0.17', '$0.38'], ['5,000 W, 45 min, heater on 80%', '3.0 kWh', '$0.17', '$0.51'], ['5 kW, 90 min, heater on throughout', '7.5 kWh', '$0.18', '$1.35']])}
<p>The last row is a common textbook question: “at 18 cents per kilowatt-hour, a 5 kW clothes dryer runs for 90 minutes — what does it cost?” The working is 5 kW × 1.5 h = 7.5 kWh, then 7.5 × $0.18 = <strong>$1.35</strong>. It assumes the heater runs the whole time; a real dryer cycling its element would cost somewhat less.</p>
<p>Put your own dryer’s wattage and your rate into the ${L('electricity-cost-calculator/dryer', 'dryer cost calculator')} to get cost per load, month and year.</p>` },
      { h2: 'Cost per month and per year', html: `<p>Multiply the per-load cost by how often you dry. At 38¢ a load:</p>
${table(['Loads per week', 'Per month', 'Per year'], [[3, '$5.00', '$60'], [5, '$8.30', '$99'], [8, '$13.30', '$159']])}` },
      { h2: 'How to dry for less', html: `<ul><li><strong>Spin faster in the washer.</strong> Water removed by spinning is far cheaper to remove than water evaporated by heat.</li><li><strong>Clean the lint filter every load</strong> and check the vent for blockages; restricted airflow lengthens cycles.</li><li><strong>Use the moisture sensor</strong> instead of a fixed timer so the dryer stops when clothes are dry.</li><li><strong>Dry full loads back to back</strong> so the drum is already warm.</li><li>Pair with cold washes — see what the wash itself costs with the ${L('electricity-cost-calculator/washing-machine', 'washing machine cost calculator')}.</li></ul>` },
    ],
    faqs: [
      { q: 'How much does it cost to run a dryer for an hour?', a: 'Rated kW × your rate, times the share of time the heater is on. A 3 kW dryer at $0.17/kWh costs up to 51¢ an hour, typically closer to 38¢.' },
      { q: 'How many kWh does a dryer use per load?', a: 'Usually 2–4 kWh for a normal electric dryer load. Heat pump dryers use roughly half that or less.' },
      { q: 'A 5 kW dryer runs 90 minutes at 18¢/kWh — what is the cost?', a: '5 × 1.5 = 7.5 kWh, and 7.5 × $0.18 = $1.35.' },
    ],
  },
  {
    slug: 'how-to-calculate-percentage-increase',
    title: 'How to Calculate Percentage Increase (With Examples)',
    metaDescription: 'How to calculate percentage increase and decrease: the formula, step-by-step examples, percent vs percentage points, and common mistakes.',
    focusKeyword: 'how to calculate percentage increase',
    h1: 'How to calculate percentage increase',
    published: '2026-10-20', updated: '2026-10-20',
    tools: ['percentage-change-calculator', 'percentage-calculator', 'discount-calculator'],
    summary: 'Percentage increase = (new value − old value) ÷ old value × 100. A price going from $80 to $100 is a (100 − 80) ÷ 80 × 100 = 25% increase. If the result is negative, it is a percentage decrease.',
    body: [
      { h2: 'The formula', html: `<p class="formula">Percentage change = (new − old) ÷ old × 100</p>
<ol><li>Subtract the old value from the new value to get the change.</li><li>Divide the change by the <strong>old</strong> (starting) value.</li><li>Multiply by 100 to turn it into a percentage.</li></ol>
<p>A positive answer is an increase; a negative answer is a decrease. The ${L('percentage-change-calculator', 'percentage increase calculator')} does this instantly and shows the working.</p>` },
      { h2: 'Examples', html: `${table(['Old', 'New', 'Working', 'Result'], [['80', '100', '20 ÷ 80 × 100', '+25%'], ['100', '80', '−20 ÷ 100 × 100', '−20%'], ['1,250', '1,500', '250 ÷ 1,250 × 100', '+20%'], ['40,000', '43,000', '3,000 ÷ 40,000 × 100', '+7.5%'], ['0.50', '2.00', '1.50 ÷ 0.50 × 100', '+300%']])}
<p>Notice the first two rows: going from 80 to 100 is +25%, but going back from 100 to 80 is only −20%. The percentage always uses the starting value as its base, so increases and decreases between the same two numbers are not equal.</p>` },
      { h2: 'Reverse it: find the original value', html: `<p>If you know the final value and the percentage increase, divide instead of subtracting: <strong>original = new ÷ (1 + percent ÷ 100)</strong>. A salary of $43,000 after a 7.5% raise was $43,000 ÷ 1.075 = $40,000. A common mistake is taking 7.5% off $43,000, which gives $39,775.</p>
<p>For a discount it works the other way: the sale price is original × (1 − percent ÷ 100). The ${L('discount-calculator', 'discount calculator')} handles that, and the ${L('percentage-calculator', 'percentage calculator')} covers “what is X% of Y”.</p>` },
      { h2: 'Percent vs percentage points', html: `<p>If an interest rate goes from 4% to 5%, it rose by <strong>1 percentage point</strong> but by <strong>25 percent</strong> (1 ÷ 4 × 100). News reports and dashboards mix these up all the time; say which one you mean.</p>` },
      { h2: 'Percentage change vs percentage difference', html: `<p>Percentage change has a direction — from old to new. <strong>Percentage difference</strong> compares two values with no “before” and “after”, using their average as the base: |a − b| ÷ ((a + b) ÷ 2) × 100. For 80 and 100 that is 20 ÷ 90 × 100 = 22.2%. Use it when comparing two prices from different shops, not a price over time.</p>` },
    ],
    faqs: [
      { q: 'What is the formula for percentage increase?', a: '(New value − old value) ÷ old value × 100.' },
      { q: 'How do I calculate a percentage decrease?', a: 'Use the same formula. The result is negative: from 100 to 80 is (80 − 100) ÷ 100 × 100 = −20%.' },
      { q: 'Can a percentage increase be more than 100%?', a: 'Yes. Doubling is a 100% increase and tripling is 200%. From 0.50 to 2.00 is a 300% increase.' },
    ],
  },
  {
    slug: 'how-much-electricity-does-a-gaming-pc-use',
    title: 'How Much Electricity Does a Gaming PC Use? (Cost)',
    metaDescription: 'How much electricity does a gaming PC use? Typical watts while gaming and idle, cost per hour and month, and how to measure and cut your PC’s power draw.',
    focusKeyword: 'how much electricity does a gaming pc use',
    h1: 'How much electricity does a gaming PC use?',
    published: '2026-10-21', updated: '2026-10-21',
    tools: ['electricity-cost-calculator/gaming-pc', 'electricity-cost-calculator/tv', 'electricity-cost-calculator'],
    summary: 'A mid-range gaming PC typically draws 300–500 W while gaming and 50–100 W at idle. At 400 W for 4 hours a day (averaging 80% of that), it uses 1.28 kWh — about 22¢ a day or $6.50 a month at $0.17/kWh.',
    body: [
      { h2: 'Watts while gaming, idle and asleep', html: `<p>A PC’s power use changes constantly. The graphics card does most of the work in games, so total draw depends mainly on the GPU, then the CPU, with the rest (motherboard, memory, drives, fans) adding a smaller, steadier load.</p>
${table(['Build', 'While gaming', 'Idle / desktop', 'Sleep'], [['Entry-level (budget GPU)', '150–250 W', '40–60 W', 'under 5 W'], ['Mid-range', '300–500 W', '50–100 W', 'under 5 W'], ['High-end (top GPU)', '550–800 W', '80–150 W', 'under 5 W']])}
<p>These are typical ranges, not specs — two PCs with the same parts can differ by 100 W depending on settings, frame rate and the game itself. Your monitor adds roughly 20–60 W on top.</p>` },
      { h2: 'Your power supply rating is not your usage', html: `<p>A 750 W or 850 W power supply is the <strong>maximum</strong> it can deliver, not what the PC draws. Builders leave headroom for spikes and efficiency, so a PC with an 850 W supply often uses 350–500 W in games. Using the PSU rating in a cost calculation can overstate the cost by half or more.</p>
<p>The most accurate number comes from a plug-in power meter between the wall and the PC. Software readings (GPU and CPU package power) are useful too, but leave out the rest of the system and power-supply losses.</p>` },
      { h2: 'What it costs: worked examples', html: `<p class="formula">Cost = watts ÷ 1,000 × hours × average load × price per kWh</p>
<p>All at 4 hours of gaming a day, an 80% average load, and $0.17/kWh:</p>
${table(['PC while gaming', 'kWh per day', 'Per day', 'Per month (30 days)'], [['150 W', '0.48', '$0.08', '$2.45'], ['400 W', '1.28', '$0.22', '$6.50'], ['700 W', '2.24', '$0.38', '$11.40']])}
<p>Per hour, a 400 W PC costs about 7¢ at that rate. Heavy weekend sessions or leaving the PC on overnight change the total more than the parts do — enter your own numbers in the ${L('electricity-cost-calculator/gaming-pc', 'gaming PC electricity cost calculator')}.</p>` },
      { h2: 'How to lower your PC’s power use', html: `<ul><li><strong>Cap the frame rate</strong> at your monitor’s refresh rate (or use V-Sync/adaptive sync). Rendering frames you can’t see wastes power.</li><li><strong>Set a GPU power limit or undervolt.</strong> Many cards lose only a few percent of performance at 80–90% of their stock power.</li><li><strong>Let it sleep.</strong> Sleep uses a few watts; idling on the desktop overnight can use 50–100 W for hours.</li><li><strong>Use a balanced power plan</strong> rather than maximum performance when you are not gaming.</li></ul>
<p>Gaming on a TV? Add the screen with the ${L('electricity-cost-calculator/tv', 'TV electricity cost calculator')}.</p>` },
    ],
    faqs: [
      { q: 'Does a gaming PC use a lot of electricity?', a: 'More than a laptop or console, but usually less than people expect: a mid-range PC gaming 4 hours a day costs around $5–8 a month at $0.17/kWh.' },
      { q: 'Does a 750 W power supply use 750 W?', a: 'No. That is the maximum it can supply. The PC only draws what its parts need, often 300–500 W while gaming.' },
      { q: 'Is it expensive to leave a gaming PC on 24/7?', a: 'At 80 W idle, 24 hours a day is about 1.9 kWh — roughly 33¢ a day or $10 a month at $0.17/kWh. Sleep mode cuts that to almost nothing.' },
    ],
  },
  {
    slug: 'navy-tape-test-body-fat',
    title: 'Navy Tape Test: How the Navy Body Fat Method Works',
    metaDescription: 'The Navy tape test explained: where to measure your neck, waist and hips, the US Navy body fat formula, a worked example and how accurate it is.',
    focusKeyword: 'navy tape test',
    h1: 'The Navy tape test: how the Navy body fat method works',
    published: '2026-10-21', updated: '2026-10-21',
    tools: ['body-fat-calculator', 'bmi-calculator', 'ideal-weight-calculator'],
    summary: 'The Navy tape test estimates body fat from height and a few tape measurements: neck and waist for men, plus hips for women. A man 178 cm tall with a 38 cm neck and 86 cm waist comes out at about 17% body fat.',
    body: [
      { h2: 'What the Navy tape test is', html: `<p>The US Navy method (sometimes called the circumference or “tape” method) estimates body fat percentage without scales, calipers or a scan. The idea is simple: fat tends to collect around the waist and hips, while the neck mostly reflects frame size, so the difference between them — scaled for height — tracks body fat reasonably well.</p>
<p>It is used by the US military for body composition screening, and widely by people tracking progress at home because it only needs a flexible tape measure.</p>` },
      { h2: 'How to take the measurements', html: `<ol><li><strong>Height:</strong> barefoot, standing straight against a wall.</li><li><strong>Neck:</strong> just below the larynx (Adam’s apple), with the tape sloping slightly downward to the front. Don’t flare the neck.</li><li><strong>Waist — men:</strong> horizontally around the abdomen at the level of the navel, relaxed, at the end of a normal breath out.</li><li><strong>Waist — women:</strong> at the narrowest point of the natural waist.</li><li><strong>Hips — women only:</strong> around the widest part of the buttocks.</li></ol>
<p>Keep the tape snug but not compressing the skin, take each measurement twice, and use the average. Measuring at the same time of day each time makes changes easier to trust.</p>` },
      { h2: 'The Navy body fat formula', html: `<p>With measurements in inches:</p>
<p class="formula">Men: 86.010 × log10(waist − neck) − 70.041 × log10(height) + 36.76</p>
<p class="formula">Women: 163.205 × log10(waist + hip − neck) − 97.684 × log10(height) − 78.387</p>
<p>The metric version, used by the ${L('body-fat-calculator', 'Navy body fat calculator')}, gives the same results from centimetres. You don’t need to do the logarithms by hand — enter your measurements and the calculator shows the working, plus fat mass and lean mass if you add your weight.</p>` },
      { h2: 'Worked example', html: `<p>A man 178 cm (70.1 in) tall with a 38 cm (15.0 in) neck and an 86 cm (33.9 in) waist:</p>
<ol><li>Waist − neck = 18.9 in; log10(18.9) = 1.277.</li><li>log10(70.1) = 1.846.</li><li>86.010 × 1.277 − 70.041 × 1.846 + 36.76 ≈ <strong>17.3% body fat</strong>.</li></ol>
<p>A one-inch error in the waist measurement shifts this by roughly 2 percentage points, which is why careful, repeated measuring matters more than anything else.</p>` },
      { h2: 'How accurate is it?', html: `<p>For most people the tape method lands within about 3–4 percentage points of lab methods such as DEXA. It tends to be less accurate for very muscular people (a thick neck lowers the estimate) and for people who carry fat mainly outside the waist. Its real strength is <strong>consistency</strong>: the same person measuring the same way every few weeks gets a reliable trend.</p>
<p>For a second view, compare with your ${L('bmi-calculator', 'BMI')}, which ignores body composition, or a target from the ${L('ideal-weight-calculator', 'ideal weight calculator')}. Military standards and allowable limits vary by service, age and sex and are revised from time to time, so check the current official guidance if you are preparing for an assessment.</p>
<p class="text-sm text-muted">This is an estimate for healthy adults, not medical advice.</p>` },
    ],
    faqs: [
      { q: 'What do they measure in the Navy tape test?', a: 'Height and neck circumference for everyone, waist at the navel for men, and waist at its narrowest plus hips at their widest for women.' },
      { q: 'Is the Navy method accurate?', a: 'It is usually within about 3–4 percentage points of DEXA and is most useful for tracking change over time.' },
      { q: 'Can I do the Navy tape test at home?', a: 'Yes — you only need a flexible tape measure. Enter your measurements in a Navy body fat calculator to get the result.' },
    ],
  },
  {
    slug: 'how-much-does-it-cost-to-run-a-dehumidifier',
    title: 'How Much Does It Cost to Run a Dehumidifier?',
    metaDescription: 'How much does it cost to run a dehumidifier per hour, day and month? Typical watts, worked examples, running it 24/7 and how to spend less.',
    focusKeyword: 'cost to run a dehumidifier',
    h1: 'How much does it cost to run a dehumidifier?',
    published: '2026-10-21', updated: '2026-10-21',
    tools: ['electricity-cost-calculator/dehumidifier', 'electricity-cost-calculator/ac', 'electricity-cost-calculator'],
    summary: 'A 500 W dehumidifier running 8 hours a day with the compressor on 70% of the time uses 2.8 kWh — about 48¢ a day or $14 a month at $0.17/kWh. Run around the clock at a 50% duty cycle, it is about $31 a month.',
    body: [
      { h2: 'How many watts does a dehumidifier use?', html: `<p>Most home dehumidifiers are compressor models that work like a small air conditioner. Power draw rises with capacity (pints of water removed per day):</p>
${table(['Type', 'Typical power'], [['Small compressor unit (20–35 pint)', '250–400 W'], ['Large compressor unit (50–70 pint)', '450–700 W'], ['Desiccant unit', '300–650 W']])}
<p>The exact figure is on the label or in the manual. Like an AC, a compressor dehumidifier switches off when it reaches the humidity you set, so it rarely draws full power all day.</p>` },
      { h2: 'Cost formula and examples', html: `<p class="formula">Cost = watts ÷ 1,000 × hours × duty cycle × price per kWh</p>
${table(['Scenario', 'kWh per day', 'Per day', 'Per month'], [['300 W, 8 h, 70% on', '1.7', '$0.29', '$8.60'], ['500 W, 8 h, 70% on', '2.8', '$0.48', '$14.30'], ['500 W, 24 h, 50% on', '6.0', '$1.02', '$30.60']])}
<p>All at $0.17/kWh. Swap in your own wattage, hours and rate with the ${L('electricity-cost-calculator/dehumidifier', 'dehumidifier electricity cost calculator')}.</p>` },
      { h2: 'Is it expensive to run a dehumidifier all day?', html: `<p>Running 24 hours a day doesn’t mean the compressor runs 24 hours. In a damp basement in summer it may run most of the time; in a dry spell it may cycle on only occasionally. That is why the duty cycle matters — a reasonable starting point is 50–70%, then adjust once you see how often yours actually runs.</p>
<p>Desiccant models are different: they use a heater to dry their absorbent wheel, keep running more steadily, and work better in cold spaces such as unheated garages, where compressor units lose efficiency.</p>` },
      { h2: 'How to spend less', html: `<ul><li><strong>Set a sensible target.</strong> The US EPA recommends keeping indoor humidity below 60%, ideally 30–50%. Setting 35% instead of 50% makes the unit run far longer.</li><li><strong>Close doors and windows</strong> in the room you are drying.</li><li><strong>Clean the filter</strong> regularly so air moves freely over the coils.</li><li><strong>Use a drain hose</strong> so the unit doesn’t stop when the bucket fills and then work extra hard later.</li><li><strong>Choose an efficient model</strong> — look for the energy factor (litres per kWh) when buying.</li></ul>
<p>In summer, an air conditioner also removes moisture; compare with the ${L('electricity-cost-calculator/ac', 'AC electricity cost calculator')}.</p>` },
    ],
    faqs: [
      { q: 'How much does a dehumidifier cost to run per hour?', a: 'Watts ÷ 1,000 × your rate while the compressor runs. A 500 W unit at $0.17/kWh costs about 8.5¢ an hour, less on average because it cycles.' },
      { q: 'Do dehumidifiers use a lot of electricity?', a: 'Moderately. A typical unit uses 1.5–6 kWh a day depending on size and how damp the room is — roughly $8–31 a month at $0.17/kWh.' },
      { q: 'What humidity should I set a dehumidifier to?', a: 'Between 30% and 50% is the usual target. Lower settings make it run longer without much benefit.' },
    ],
  },
  {
    slug: 'how-much-gravel-for-a-driveway',
    title: 'How Much Gravel for a Driveway? Tons & Yards',
    metaDescription: 'How much gravel for a driveway: a step-by-step method, tons and cubic yards for common driveway sizes at 4 and 6 inches, and how to layer it.',
    focusKeyword: 'how much gravel for a driveway',
    h1: 'How much gravel do you need for a driveway?',
    published: '2026-10-21', updated: '2026-10-21',
    tools: ['gravel-calculator', 'concrete-calculator', 'mulch-calculator'],
    summary: 'Multiply length × width in feet by depth in inches, divide by 12 for cubic feet and by 27 for cubic yards, then × 1.4 for tons. A 60 × 12 ft driveway at 4 inches needs about 8.9 cubic yards — roughly 12.4 tons of gravel.',
    body: [
      { h2: 'The method in four steps', html: `<ol><li><strong>Measure</strong> the length and width in feet. Split curves or a turnaround into rectangles.</li><li><strong>Pick a depth.</strong> Most gravel driveways are 4–8 inches built in layers; resurfacing an existing drive usually needs 2–3 inches.</li><li><strong>Volume:</strong> length × width × depth (in) ÷ 12 = cubic feet; ÷ 27 = cubic yards.</li><li><strong>Weight:</strong> cubic yards × about 1.4 = US tons for typical gravel (crushed stone is nearer 1.5).</li></ol>
<p>Add around 10% for compaction and uneven ground. The ${L('gravel-calculator', 'gravel calculator')} does all four steps and lets you pick the material.</p>` },
      { h2: 'Gravel for common driveway sizes', html: `<p>Typical gravel at 1.4 tons per cubic yard, before the extra 10%:</p>
${table(['Driveway', '4 inches deep', '6 inches deep'], [[10, 40], [12, 50], [12, 60], [12, 100], [20, 50]].map(([w, l]) => { const y4 = (l * w * 4) / 12 / 27, y6 = (l * w * 6) / 12 / 27; return [`${w} × ${l} ft`, `${y4.toFixed(1)} yd³ · ${(y4 * 1.4).toFixed(1)} t`, `${y6.toFixed(1)} yd³ · ${(y6 * 1.4).toFixed(1)} t`]; }))}
<p>A standard dump truck carries roughly 10–15 tons, so most single driveways are one delivery.</p>` },
      { h2: 'How to layer a gravel driveway', html: `<p>A driveway lasts longer when it is built in layers rather than one deep pile of the same stone:</p>
<ul><li><strong>Base:</strong> larger crushed stone, compacted, to spread the load and drain water.</li><li><strong>Middle (optional):</strong> medium crushed stone on soft ground.</li><li><strong>Top:</strong> a finer, angular gravel 2–3 inches deep. Angular stone locks together; round pea gravel rolls and ruts under tyres.</li></ul>
<p>On soft or clay soil, geotextile fabric under the base stops stone sinking into the mud. Calculate each layer separately with its own depth, then add the tons.</p>` },
      { h2: 'Worked example', html: `<p>A 12 × 60 ft driveway with a 4-inch base and a 2-inch top layer:</p>
<ol><li>Base: 12 × 60 × 4 ÷ 12 ÷ 27 = 8.9 yd³ × 1.5 = 13.3 tons of crushed stone.</li><li>Top: 12 × 60 × 2 ÷ 12 ÷ 27 = 4.4 yd³ × 1.4 = 6.2 tons of gravel.</li><li>Plus 10%: about <strong>14.7 + 6.8 tons</strong>.</li></ol>
<p>Pouring a concrete apron at the road end? Size it with the ${L('concrete-calculator', 'concrete calculator')}. For the beds along the edge, the ${L('mulch-calculator', 'mulch calculator')} uses the same area-and-depth method.</p>` },
    ],
    faqs: [
      { q: 'How many tons of gravel do I need for a 100 ft driveway?', a: 'For a 12 ft wide, 100 ft driveway at 4 inches: about 14.8 cubic yards, or roughly 20.7 tons of typical gravel before adding 10% extra.' },
      { q: 'How deep should gravel be for a driveway?', a: 'Usually 4–8 inches in total, in layers. Resurfacing a sound existing driveway often needs only 2–3 inches.' },
      { q: 'What is the best gravel for a driveway?', a: 'Angular crushed stone that locks together, with a coarser base layer underneath. Avoid round pea gravel as the top surface on slopes.' },
    ],
  },
  {
    slug: 'how-much-does-it-cost-to-run-a-space-heater',
    title: 'How Much Does It Cost to Run a Space Heater?',
    metaDescription: 'How much does it cost to run a space heater per hour, night and month? Real examples for 750 W and 1,500 W heaters, and ways to heat for less.',
    focusKeyword: 'cost to run a space heater',
    h1: 'How much does it cost to run a space heater?',
    published: '2026-10-21', updated: '2026-10-21',
    tools: ['electricity-cost-calculator/space-heater', 'electricity-cost-calculator/ac', 'electricity-cost-calculator'],
    summary: 'A 1,500 W space heater at full power costs about 26¢ an hour at $0.17/kWh. With the thermostat cycling it 80% of the time, 5 hours a day is about $1.02 a day or $31 a month.',
    body: [
      { h2: 'The formula', html: `<p class="formula">Cost = watts ÷ 1,000 × hours × share of time heating × price per kWh</p>
<p>Almost every plug-in electric heater — fan, ceramic, oil-filled radiator or infrared — turns electricity into heat at close to 100% efficiency. So for the same wattage and running time they cost the same; the difference is how they spread the heat and how often the thermostat cuts in.</p>` },
      { h2: 'What a space heater costs', html: `${table(['Heater and use', 'kWh', 'Cost'], [['1,500 W, 1 hour at full power', '1.5', '$0.26'], ['1,500 W, 1 hour, cycling 80%', '1.2', '$0.20'], ['1,500 W, 8 hours overnight (80%)', '9.6', '$1.63'], ['750 W low setting, 8 hours (80%)', '4.8', '$0.82'], ['1,500 W, 5 h/day for 30 days (80%)', '180', '$30.60']])}
<p>All at $0.17/kWh. Plug in your own heater, hours and rate with the ${L('electricity-cost-calculator/space-heater', 'space heater cost calculator')}.</p>` },
      { h2: 'Is a space heater cheaper than central heating?', html: `<p>It can be, when you heat <strong>one room</strong> and turn the central thermostat down for the rest of the house. Heating a whole home with plug-in heaters is usually more expensive than a gas furnace or a heat pump.</p>
<p>A heat pump moves heat instead of making it, so it typically delivers 2–4 units of heat per unit of electricity. In mild weather, running a heat pump or a reverse-cycle ${L('electricity-cost-calculator/ac', 'air conditioner')} on heat mode can cost a third to half as much as a resistance heater for the same warmth.</p>` },
      { h2: 'How to spend less (and stay safe)', html: `<ul><li>Use the <strong>thermostat</strong>, not just high/low: it switches the heater off once the room is warm.</li><li>Close the door of the room you are heating and block draughts.</li><li>Use the 750 W setting once the room is up to temperature.</li><li>Plug the heater directly into a wall outlet, not an extension lead, and keep it about 3 feet from bedding, curtains and furniture.</li><li>Pick a model with tip-over and overheat shut-off.</li></ul>` },
    ],
    faqs: [
      { q: 'How much does a 1,500 watt heater cost per hour?', a: '1.5 kWh × your rate. At $0.17/kWh that is about 26¢ an hour at full power, and around 20¢ on average when the thermostat cycles.' },
      { q: 'Do oil-filled heaters use less electricity?', a: 'Not per hour at the same wattage. They hold heat longer and feel gentler, which can mean the thermostat cycles less.' },
      { q: 'Is it cheaper to leave a space heater on low all night?', a: 'A 750 W setting for 8 hours at 80% uses about 4.8 kWh — around 82¢ at $0.17/kWh, half the cost of 1,500 W.' },
    ],
  },
  {
    slug: 'how-much-topsoil-do-i-need',
    title: 'How Much Topsoil Do I Need? Yards, Bags & Tons',
    metaDescription: 'How much topsoil do I need: the formula, depths for lawns and raised beds, cubic yards to bags and tons, and worked examples you can copy.',
    focusKeyword: 'how much topsoil do i need',
    h1: 'How much topsoil do I need?',
    published: '2026-10-21', updated: '2026-10-21',
    tools: ['topsoil-calculator', 'mulch-calculator', 'gravel-calculator'],
    summary: 'Square feet × depth in inches ÷ 12 = cubic feet; ÷ 27 = cubic yards. A 300 sq ft lawn area at 4 inches needs 100 cubic feet — about 3.7 cubic yards, which weighs roughly 3.7–4.8 tons.',
    body: [
      { h2: 'The topsoil formula', html: `<p class="formula">Cubic yards = length (ft) × width (ft) × depth (in) ÷ 12 ÷ 27</p>
<p>Bulk topsoil is sold by the cubic yard (sometimes by the ton), and bagged topsoil usually comes in 0.75 or 1 cubic foot bags. One cubic yard is 27 cubic feet — 27 one-cubic-foot bags or 36 bags of 0.75 cu ft.</p>
<p>The ${L('topsoil-calculator', 'topsoil calculator')} works out yards, bags and approximate tons from your measurements.</p>` },
      { h2: 'How deep should topsoil be?', html: `${table(['Project', 'Typical depth', 'One cubic yard covers'], [['Top-dressing an existing lawn', '¼–½ inch', '650–1,300 sq ft'], ['Levelling low spots', '1–2 inches', '160–325 sq ft'], ['New lawn from seed or turf', '4–6 inches', '54–81 sq ft'], ['Flower and vegetable beds', '8–12 inches', '27–40 sq ft']])}
<p>Less than about 2 inches for a new lawn tends to dry out quickly; deeper is better on poor or compacted subsoil.</p>` },
      { h2: 'Worked examples', html: `<p><strong>New lawn:</strong> 15 × 20 ft = 300 sq ft at 4 inches → 300 × 4 ÷ 12 = 100 cu ft → 3.7 cubic yards. At roughly 1–1.3 tons per yard, that is 3.7–4.8 tons.</p>
<p><strong>Raised bed:</strong> 4 × 8 ft, 12 inches deep → 4 × 8 × 1 = 32 cubic feet → 1.19 cubic yards, or 32 one-cubic-foot bags (43 bags of 0.75 cu ft). Many gardeners fill raised beds with a mix of about 60% topsoil and 40% compost — calculate the total, then split it.</p>` },
      { h2: 'Bulk or bags, and how much it weighs', html: `<p>Dry screened topsoil is often around 1 ton per cubic yard, but wet soil can weigh far more, so suppliers that sell by the ton may deliver less volume after rain. Ask whether the price is per yard or per ton.</p>
<p>For more than about one cubic yard, bulk delivery is usually cheaper than bags. Finishing the beds afterwards? Work out the top layer with the ${L('mulch-calculator', 'mulch calculator')}, and paths with the ${L('gravel-calculator', 'gravel calculator')}.</p>` },
    ],
    faqs: [
      { q: 'How many bags of topsoil make a yard?', a: '27 bags of 1 cubic foot, or 36 bags of 0.75 cubic foot.' },
      { q: 'How much does a yard of topsoil cover?', a: 'About 81 sq ft at 4 inches, 54 sq ft at 6 inches, or 324 sq ft at 1 inch.' },
      { q: 'How many tons is a yard of topsoil?', a: 'Roughly 1 to 1.3 tons when dry, more when wet.' },
    ],
  },
  {
    slug: 'how-to-calculate-tdee',
    title: 'How to Calculate TDEE (Maintenance Calories)',
    metaDescription: 'How to calculate TDEE step by step: BMR with the Mifflin-St Jeor equation, activity multipliers, worked examples and how to adjust the result.',
    focusKeyword: 'how to calculate tdee',
    h1: 'How to calculate your TDEE (maintenance calories)',
    published: '2026-10-21', updated: '2026-10-21',
    tools: ['tdee-calculator', 'bmr-calculator', 'macro-calculator'],
    summary: 'TDEE = BMR × activity factor. For a 35-year-old man, 80 kg and 178 cm: BMR (Mifflin-St Jeor) ≈ 1,743 kcal, and at a moderate activity factor of 1.55 his TDEE is about 2,700 kcal a day.',
    body: [
      { h2: 'What TDEE means', html: `<p><strong>Total daily energy expenditure</strong> is an estimate of the calories you burn in a day: your basal metabolic rate (BMR — energy to keep you alive at rest), plus everything you do on top. Eating around your TDEE keeps weight roughly stable, which is why it is also called maintenance calories.</p>` },
      { h2: 'Step 1: work out your BMR', html: `<p>The Mifflin-St Jeor equation is the most widely used today:</p>
<p class="formula">Men: 10 × weight (kg) + 6.25 × height (cm) − 5 × age + 5</p>
<p class="formula">Women: 10 × weight (kg) + 6.25 × height (cm) − 5 × age − 161</p>
<p>Example: a 35-year-old man, 80 kg, 178 cm → 800 + 1,112.5 − 175 + 5 = <strong>1,743 kcal</strong>. A 35-year-old woman, 65 kg, 165 cm → 650 + 1,031 − 175 − 161 = <strong>1,345 kcal</strong>. The ${L('bmr-calculator', 'BMR calculator')} does this in pounds and inches too.</p>` },
      { h2: 'Step 2: multiply by your activity level', html: `${table(['Activity level', 'Factor', 'Man in example', 'Woman in example'], [['Sedentary (desk job, little exercise)', '1.2', '2,091', '1,614'], ['Light (exercise 1–3 days/week)', '1.375', '2,396', '1,850'], ['Moderate (3–5 days/week)', '1.55', '2,701', '2,085'], ['Very active (6–7 days/week)', '1.725', '3,006', '2,321']])}
<p>Most people overestimate their activity. If you are unsure between two levels, start with the lower one. The ${L('tdee-calculator', 'TDEE calculator')} shows your number and the working.</p>` },
      { h2: 'Step 3: check it against real life', html: `<p>Any formula is an estimate — individual metabolism can differ by a few hundred calories. Track your intake and weight for two to three weeks: if your weight is stable, that intake is your real maintenance. Adjust from there rather than trusting the formula to the last calorie.</p>
<p>For a goal, many guidelines suggest a modest adjustment of a few hundred calories a day and slow, steady change. The ${L('macro-calculator', 'macro calculator')} splits a calorie target into protein, carbs and fat.</p>
<p class="text-sm text-muted">Estimates for healthy adults, not medical advice. Talk to a doctor or registered dietitian before major diet changes, especially if you are pregnant or have a health condition.</p>` },
    ],
    faqs: [
      { q: 'What is the formula for TDEE?', a: 'TDEE = BMR × activity factor, where the factor ranges from 1.2 (sedentary) to about 1.9 (very physical job plus training).' },
      { q: 'Is TDEE the same as BMR?', a: 'No. BMR is energy at complete rest; TDEE adds daily movement and exercise, so it is always higher.' },
      { q: 'How accurate is a TDEE calculator?', a: 'It is a starting estimate, often within about 10% for most people. Your weight trend over a few weeks is the real test.' },
    ],
  },
  {
    slug: 'how-much-electricity-does-a-dishwasher-use',
    title: 'How Much Electricity Does a Dishwasher Use?',
    metaDescription: 'How much electricity does a dishwasher use per cycle, month and year? Typical kWh, what each load costs, and how eco mode and air-dry cut the bill.',
    focusKeyword: 'how much electricity does a dishwasher use',
    h1: 'How much electricity does a dishwasher use?',
    published: '2026-10-22', updated: '2026-10-22',
    tools: ['electricity-cost-calculator/dishwasher', 'electricity-cost-calculator/water-heater', 'electricity-cost-calculator/washing-machine'],
    summary: 'A typical dishwasher uses about 1–1.5 kWh per normal cycle. At $0.17/kWh that is roughly 17–26¢ a load — about $4 a month if you run it five times a week.',
    body: [
      { h2: 'kWh per cycle', html: `<p>A dishwasher’s heating element is rated around 1,200–2,400 W, but it only runs for part of the cycle: to heat the wash water and, if you choose it, to dry the dishes. The motor and pump use far less. That is why a full one- to two-hour programme usually adds up to about <strong>1–1.5 kWh</strong>.</p>
<p>In the US, the yellow EnergyGuide label lists estimated yearly kWh, based on a standard number of loads a year (215 in the test). Divide the yearly figure by 215 for a per-cycle estimate — 270 kWh a year works out to about 1.26 kWh per load.</p>` },
      { h2: 'What each load costs', html: `<p class="formula">Cost per load = kWh per cycle × price per kWh</p>
${table(['Energy per cycle', 'Per load', 'Per month (30 loads)', 'Per year (365 loads)'], [['1.0 kWh', '$0.17', '$5.10', '$62'], ['1.3 kWh', '$0.22', '$6.63', '$81'], ['1.5 kWh', '$0.26', '$7.65', '$93']])}
<p>All at $0.17/kWh. If you know the wattage and cycle length instead, the ${L('electricity-cost-calculator/dishwasher', 'dishwasher electricity cost calculator')} estimates cost per cycle, month and year — the default 1,800 W, one-hour cycle at a 60% average load comes to about 1.1 kWh, or 18¢.</p>` },
      { h2: 'Where the energy goes', html: `<ul><li><strong>Heating water</strong> is the biggest share. Most dishwashers heat their own water internally; if yours fills with hot water from the tap, part of the cost moves to your ${L('electricity-cost-calculator/water-heater', 'water heater')}.</li><li><strong>Heated dry</strong> runs the element again at the end of the cycle. Air-dry or “no heat” options skip it.</li><li><strong>Pump and motor</strong> use a small, steady amount for the whole cycle.</li></ul>` },
      { h2: 'How to use less', html: `<ul><li><strong>Run full loads.</strong> A half-empty machine uses nearly the same energy.</li><li><strong>Use eco mode.</strong> It runs longer but at a lower temperature, which usually uses less energy overall.</li><li><strong>Turn off heated dry</strong> or open the door at the end and let the dishes air-dry.</li><li><strong>Skip the pre-rinse</strong> under hot water — scrape plates instead. Modern detergents handle the rest.</li><li><strong>Run it off-peak</strong> if your tariff is cheaper at night.</li></ul>
<p>The same habits apply to laundry: most of a ${L('electricity-cost-calculator/washing-machine', 'washing machine’s running cost')} is heating water too.</p>` },
    ],
    faqs: [
      { q: 'How many kWh does a dishwasher use per load?', a: 'Usually about 1–1.5 kWh for a normal cycle, less on eco programmes and without heated dry.' },
      { q: 'Does a dishwasher use a lot of electricity?', a: 'Not much: at five loads a week and 1.08 kWh per cycle, it is about $4 a month at $0.17/kWh.' },
      { q: 'Is it cheaper to run a dishwasher at night?', a: 'Only if your electricity tariff is cheaper at night. The energy used is the same; the price per kWh changes.' },
    ],
  },
];

export const postBySlug = new Map(posts.map((p) => [p.slug, p]));
export const postPath = (p: BlogPost | string) => `/blog/${typeof p === 'string' ? p : p.slug}/`;
export const postsForTool = (toolSlug: string) => posts.filter((p) => p.tools.includes(toolSlug));

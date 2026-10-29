// Original illustrations for blog guides.
// covers: full-scene SVGs (1200×630) rendered to PNG at build time (/blog/<slug>/cover.png) — no text, so they render anywhere.
// figures: inline SVG diagrams/charts placed inside articles; they use currentColor so they follow light/dark mode.

const INK = '#0e1726', AMBER = '#ffb547', CREAM = '#fff8ee', BLUE = '#5b8def';
const S = `stroke="${INK}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;

const wrap = (bg: string, inner: string, dark = false) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">` +
  `<rect width="1200" height="630" fill="${bg}"/>` +
  `<circle cx="1090" cy="70" r="170" fill="#fff" opacity="${dark ? 0.05 : 0.35}"/>` +
  `<circle cx="110" cy="580" r="210" fill="#fff" opacity="${dark ? 0.04 : 0.3}"/>` +
  `<circle cx="180" cy="120" r="10" fill="${AMBER}"/><circle cx="1040" cy="520" r="14" fill="${AMBER}"/><circle cx="230" cy="170" r="5" fill="${dark ? '#fff' : INK}" opacity=".5"/>` +
  inner + `</svg>`;

// deterministic pseudo-random for textures
const rand = (seed: number) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

function mulch() {
  const r = rand(7);
  let chips = '';
  for (let i = 0; i < 70; i++) {
    const x = 400 + r() * 380, y = 360 + r() * 140;
    const top = 520 - (1 - Math.abs((x - 590) / 200)) * 190;
    if (y < top + 20) continue;
    chips += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${(14 + r() * 16).toFixed(0)}" height="6" rx="3" fill="${r() > 0.5 ? '#b47b52' : '#6e432a'}" transform="rotate(${(r() * 180).toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})"/>`;
  }
  const bag = (x: number, y: number, w: number, h: number, band: string) =>
    `<path d="M${x} ${y + 26} Q${x} ${y} ${x + 26} ${y} L${x + w - 26} ${y} Q${x + w} ${y} ${x + w} ${y + 26} L${x + w + 8} ${y + h - 20} Q${x + w + 8} ${y + h} ${x + w - 14} ${y + h} L${x - 6} ${y + h} Q${x - 26} ${y + h} ${x - 22} ${y + h - 22} Z" fill="#fff" ${S}/>` +
    `<path d="M${x + 6} ${y + 16} L${x + 18} ${y + 4} L${x + 30} ${y + 16} L${x + 42} ${y + 4} L${x + 54} ${y + 16} L${x + 66} ${y + 4} L${x + 78} ${y + 16} L${x + 90} ${y + 4} L${x + 102} ${y + 16} L${x + 114} ${y + 4} L${x + 126} ${y + 16}" fill="none" stroke="${INK}" stroke-width="4" opacity=".35"/>` +
    `<rect x="${x - 4}" y="${y + h * 0.38}" width="${w + 8}" height="${h * 0.28}" fill="${band}" ${S}/>` +
    `<path d="M${x + w / 2} ${y + h * 0.43} q 26 18 0 44 q -26 -26 0 -44z" fill="#6ab04c" stroke="${INK}" stroke-width="4"/>`;
  const cube = `<g transform="translate(860 110)"><path d="M0 40 L80 0 L160 40 L80 80 Z" fill="${AMBER}" ${S}/><path d="M0 40 L80 80 L80 170 L0 130 Z" fill="#ffd48a" ${S}/><path d="M160 40 L80 80 L80 170 L160 130 Z" fill="#f59e0b" ${S}/></g>`;
  return wrap('#dff3b8',
    `<ellipse cx="600" cy="540" rx="470" ry="30" fill="${INK}" opacity=".08"/>` +
    `<path d="M380 525 Q470 330 600 330 Q730 330 820 525 Z" fill="#8a5a3b" ${S}/>` + chips +
    bag(200, 300, 150, 225, AMBER) + bag(850, 330, 130, 195, '#cdeee0') + cube +
    `<path d="M560 300 l14 -120" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><path d="M548 330 q26 -50 52 0 q-26 20 -52 0z" fill="#9aa3ad" ${S}/>`);
}

function gravel() {
  const r = rand(11);
  let stones = '';
  for (let i = 0; i < 48; i++) {
    const x = 300 + r() * 380, y = 200 + r() * 70, rr = 12 + r() * 12;
    const c = ['#9aa3ad', '#c3c9cf', '#7d8691', '#b4bcc4'][Math.floor(r() * 4)];
    stones += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${rr.toFixed(0)}" ry="${(rr * 0.8).toFixed(0)}" fill="${c}" stroke="${INK}" stroke-width="3"/>`;
  }
  let pile = '';
  for (let i = 0; i < 26; i++) {
    const x = 930 + r() * 170, y = 440 + r() * 70; if (y < 520 - (1 - Math.abs((x - 1015) / 90)) * 90) continue;
    pile += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="11" ry="9" fill="${['#9aa3ad', '#c3c9cf', '#7d8691'][i % 3]}" stroke="${INK}" stroke-width="3"/>`;
  }
  return wrap('#d3e6ff',
    `<ellipse cx="600" cy="560" rx="520" ry="26" fill="${INK}" opacity=".08"/>` +
    `<path d="M290 250 Q480 150 690 250 Z" fill="#aab2bb" ${S}/>` + stones +
    `<path d="M250 250 L720 250 L690 430 L290 430 Z" fill="${AMBER}" ${S}/>` +
    `<path d="M330 290 L660 290 M320 340 L650 340 M310 390 L640 390" stroke="${INK}" stroke-width="5" opacity=".25"/>` +
    `<path d="M720 300 L860 300 L900 360 L900 440 L720 440 Z" fill="#fff" ${S}/><path d="M745 320 L845 320 L875 365 L745 365 Z" fill="#9cc8ff" ${S}/>` +
    `<rect x="260" y="430" width="660" height="34" rx="10" fill="${INK}"/>` +
    `<circle cx="370" cy="500" r="54" fill="${INK}"/><circle cx="370" cy="500" r="20" fill="#fff"/><circle cx="800" cy="500" r="54" fill="${INK}"/><circle cx="800" cy="500" r="20" fill="#fff"/>` +
    `<path d="M930 520 Q1015 400 1100 520 Z" fill="#aab2bb" ${S}/>` + pile);
}

function ac() {
  const wave = (y: number) => `<path d="M400 ${y} q 50 -24 100 0 t 100 0 t 100 0 t 100 0" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"/>`;
  const flake = (cx: number, cy: number, s: number) => [0, 60, 120].map((a) => `<line x1="${cx - s}" y1="${cy}" x2="${cx + s}" y2="${cy}" stroke="${INK}" stroke-width="8" stroke-linecap="round" transform="rotate(${a} ${cx} ${cy})"/>`).join('') + `<circle cx="${cx}" cy="${cy}" r="10" fill="${AMBER}" stroke="${INK}" stroke-width="5"/>`;
  return wrap('#d3e6ff',
    `<rect x="290" y="120" width="620" height="190" rx="40" fill="#fff" ${S}/>` +
    `<rect x="330" y="250" width="540" height="28" rx="14" fill="${INK}" opacity=".15"/><rect x="330" y="160" width="300" height="14" rx="7" fill="${INK}" opacity=".1"/>` +
    `<circle cx="860" cy="170" r="12" fill="${AMBER}" stroke="${INK}" stroke-width="4"/>` +
    wave(360) + wave(420) + wave(480) + flake(950, 450, 60) +
    `<circle cx="250" cy="460" r="72" fill="${AMBER}" ${S}/><circle cx="250" cy="460" r="48" fill="none" stroke="${INK}" stroke-width="5" opacity=".4"/>` +
    `<path d="M268 432 q-18 -12 -34 0 q-12 14 16 26 q30 12 16 28 q-16 12 -36 -2 M251 420 v84" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`);
}

function waterHeater() {
  return wrap('#ffd9c8',
    `<ellipse cx="600" cy="555" rx="300" ry="22" fill="${INK}" opacity=".08"/>` +
    `<rect x="540" y="60" width="18" height="80" fill="${INK}"/><rect x="642" y="60" width="18" height="80" fill="${INK}"/>` +
    `<rect x="470" y="120" width="260" height="400" rx="70" fill="#fff" ${S}/>` +
    `<rect x="470" y="330" width="260" height="70" fill="${AMBER}" ${S}/>` +
    `<circle cx="600" cy="225" r="42" fill="${CREAM}" ${S}/><path d="M600 225 L624 205" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M572 240 A32 32 0 0 1 628 240" fill="none" stroke="#ff7a59" stroke-width="6"/>` +
    `<rect x="510" y="515" width="30" height="34" rx="6" fill="${INK}"/><rect x="660" y="515" width="30" height="34" rx="6" fill="${INK}"/>` +
    `<path d="M300 210 L250 330 L300 330 L270 450 L370 290 L315 290 L350 210 Z" fill="${AMBER}" ${S}/>` +
    `<path d="M930 450 Q850 400 880 320 Q900 350 915 340 Q900 270 960 220 Q960 290 1000 320 Q1030 400 930 450 Z" fill="#ff7a59" ${S}/><path d="M932 430 Q895 400 915 360 Q935 385 950 370 Q975 405 932 430Z" fill="${AMBER}"/>` +
    `<path d="M600 430 Q570 470 600 490 Q630 470 600 430Z" fill="${BLUE}" stroke="${INK}" stroke-width="4"/>`);
}

function dryer() {
  return wrap('#e4ddff',
    `<ellipse cx="600" cy="560" rx="290" ry="22" fill="${INK}" opacity=".08"/>` +
    `<rect x="400" y="110" width="400" height="440" rx="40" fill="#fff" ${S}/><line x1="400" y1="200" x2="800" y2="200" ${S}/>` +
    `<circle cx="720" cy="155" r="22" fill="${CREAM}" ${S}/><circle cx="460" cy="155" r="9" fill="${AMBER}"/><circle cx="495" cy="155" r="9" fill="${AMBER}" opacity=".5"/>` +
    `<circle cx="600" cy="370" r="135" fill="#cfd8ea" stroke="${INK}" stroke-width="8"/><circle cx="600" cy="370" r="100" fill="#b9c6df" stroke="${INK}" stroke-width="5"/>` +
    `<path d="M530 400 Q560 310 640 330 Q690 350 660 410 Q620 450 570 430" fill="#ffd5e1" stroke="${INK}" stroke-width="5"/><path d="M560 360 Q600 300 650 360" fill="none" stroke="${AMBER}" stroke-width="16" stroke-linecap="round"/>` +
    `<path d="M560 330 L640 330" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".6"/>` +
    [270, 310, 350].map((x) => `<path d="M${x} 420 q-20 -30 0 -60 t0 -60 t0 -60" fill="none" stroke="${AMBER}" stroke-width="12" stroke-linecap="round"/>`).join('') +
    `<circle cx="950" cy="250" r="78" fill="#fff" ${S}/><path d="M950 250 L950 200 M950 250 L985 270" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`);
}

function percent() {
  const bars = [[300, 120], [420, 190], [540, 250], [660, 330]].map(([x, h], i) => `<rect x="${x}" y="${500 - h}" width="90" height="${h}" rx="14" fill="${i === 3 ? AMBER : '#fff'}" ${S}/>`).join('');
  return wrap('#ffe6b3',
    `<line x1="250" y1="500" x2="800" y2="500" ${S}/>` + bars +
    `<path d="M300 400 L450 330 L560 300 L760 150" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="M720 140 L770 140 L770 190" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<circle cx="920" cy="300" r="44" fill="#fff" ${S}/><circle cx="1040" cy="460" r="44" fill="#fff" ${S}/><line x1="1060" y1="260" x2="900" y2="500" stroke="${INK}" stroke-width="16" stroke-linecap="round"/>`);
}

function gamingPc() {
  const E = `stroke="#3b4660" stroke-width="6" stroke-linejoin="round"`;
  return wrap('#1b2335',
    `<rect x="230" y="130" width="500" height="300" rx="22" fill="#0e1726" ${E}/><rect x="255" y="155" width="450" height="250" rx="10" fill="#2b3a67"/>` +
    `<path d="M255 405 L380 280 L450 340 L550 230 L705 380 L705 405 Z" fill="#c084fc" opacity=".8"/><path d="M255 405 L420 330 L520 380 L705 300 L705 405 Z" fill="${AMBER}" opacity=".85"/><circle cx="640" cy="210" r="22" fill="#fff" opacity=".8"/>` +
    `<rect x="440" y="430" width="80" height="50" fill="#3b4660"/><rect x="380" y="476" width="200" height="16" rx="8" fill="#3b4660"/>` +
    `<rect x="300" y="510" width="380" height="40" rx="10" fill="#2a3550"/>` + Array.from({ length: 12 }, (_, i) => `<rect x="${314 + i * 30}" y="520" width="22" height="8" rx="3" fill="#475578"/>`).join('') +
    `<rect x="800" y="120" width="210" height="430" rx="24" fill="#0e1726" ${E}/><rect x="822" y="142" width="166" height="386" rx="14" fill="#141c2e" stroke="#2a3550" stroke-width="3"/>` +
    [[905, 230, '#7dd3fc'], [905, 350, '#c084fc'], [905, 465, AMBER]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="48" fill="none" stroke="${c}" stroke-width="8"/><circle cx="${x}" cy="${y}" r="12" fill="${c}"/>`).join('') +
    `<path d="M150 300 L110 400 L150 400 L125 500 L210 360 L165 360 L195 300 Z" fill="${AMBER}" stroke="#fff" stroke-width="5" stroke-linejoin="round"/>`, true);
}

function navy() {
  let ticks = '';
  for (let i = 0; i < 9; i++) ticks += `<line x1="${510 + i * 22}" y1="${336}" x2="${510 + i * 22}" y2="${348}" stroke="${INK}" stroke-width="3"/>`;
  return wrap('#c8eef0',
    `<ellipse cx="600" cy="565" rx="260" ry="20" fill="${INK}" opacity=".08"/>` +
    `<circle cx="600" cy="130" r="56" fill="#fff" ${S}/><rect x="572" y="182" width="56" height="44" fill="#fff" ${S}/>` +
    `<path d="M470 240 Q600 210 730 240 L740 300 L705 300 L700 430 Q600 455 500 430 L495 300 L460 300 Z" fill="#fff" ${S}/>` +
    `<path d="M505 430 L520 560 L585 560 L600 450 L615 560 L680 560 L695 430" fill="#fff" ${S}/>` +
    `<ellipse cx="600" cy="208" rx="40" ry="11" fill="none" stroke="${AMBER}" stroke-width="12"/>` +
    `<ellipse cx="600" cy="342" rx="108" ry="18" fill="none" stroke="${AMBER}" stroke-width="16"/>` + ticks +
    `<ellipse cx="600" cy="425" rx="104" ry="16" fill="none" stroke="${AMBER}" stroke-width="10" stroke-dasharray="22 12" opacity=".8"/>` +
    `<path d="M708 345 Q820 360 880 420" fill="none" stroke="${AMBER}" stroke-width="16"/>` +
    `<circle cx="920" cy="450" r="72" fill="${AMBER}" ${S}/><circle cx="920" cy="450" r="26" fill="#fff" ${S}/><rect x="860" y="510" width="40" height="18" rx="6" fill="${INK}"/>`);
}

function dehumidifier() {
  const drop = (x: number, y: number, s = 1) => `<path d="M${x} ${y} Q${x - 24 * s} ${y + 36 * s} ${x} ${y + 52 * s} Q${x + 24 * s} ${y + 36 * s} ${x} ${y}Z" fill="${BLUE}" stroke="${INK}" stroke-width="5"/>`;
  return wrap('#e8efff',
    `<ellipse cx="600" cy="560" rx="230" ry="20" fill="${INK}" opacity=".08"/>` +
    `<path d="M550 120 Q600 80 650 120" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>` +
    `<rect x="470" y="120" width="260" height="430" rx="34" fill="#fff" ${S}/>` +
    [170, 195, 220, 245].map((y) => `<rect x="505" y="${y}" width="190" height="10" rx="5" fill="${INK}" opacity=".18"/>`).join('') +
    `<rect x="530" y="285" width="140" height="60" rx="12" fill="${INK}"/><rect x="548" y="303" width="60" height="24" rx="5" fill="${AMBER}"/><circle cx="640" cy="315" r="9" fill="${AMBER}" opacity=".6"/>` +
    `<rect x="500" y="390" width="200" height="130" rx="18" fill="#cfe3ff" ${S}/><path d="M503 470 Q550 455 600 470 T697 470 L697 505 Q697 517 685 517 L515 517 Q503 517 503 505 Z" fill="${BLUE}" opacity=".85"/>` +
    `<circle cx="280" cy="280" r="86" fill="#fff" ${S}/><path d="M220 300 A64 64 0 0 1 340 300" fill="none" stroke="#e5e7eb" stroke-width="14"/><path d="M220 300 A64 64 0 0 1 300 230" fill="none" stroke="${AMBER}" stroke-width="14"/><path d="M280 300 L312 250" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><circle cx="280" cy="300" r="10" fill="${INK}"/>` +
    drop(880, 170) + drop(960, 280, 0.8) + drop(860, 360, 1.1) + drop(1000, 420, 0.7) + drop(250, 430, 0.8));
}

function driveway() {
  const r = rand(23);
  let stones = '';
  for (let i = 0; i < 160; i++) {
    const y = 330 + r() * 260, t = (y - 330) / 260, half = 60 + t * 260, x = 600 + (r() * 2 - 1) * half;
    stones += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${(4 + t * 7).toFixed(1)}" ry="${(3 + t * 5).toFixed(1)}" fill="${['#9aa3ad', '#c3c9cf', '#7d8691', '#b4bcc4'][i % 4]}"/>`;
  }
  return wrap('#dff3b8',
    `<path d="M540 330 L660 330 L920 630 L280 630 Z" fill="#d7d2c8"/>` + stones +
    `<path d="M540 330 L660 330 L920 630 L280 630 Z" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>` +
    `<rect x="470" y="170" width="260" height="160" fill="#fff" ${S}/><path d="M440 180 L600 80 L760 180 Z" fill="${AMBER}" ${S}/>` +
    `<rect x="560" y="240" width="80" height="90" rx="6" fill="#9cc8ff" ${S}/><line x1="600" y1="240" x2="600" y2="330" stroke="${INK}" stroke-width="4"/>` +
    `<rect x="490" y="200" width="44" height="40" rx="4" fill="#9cc8ff" stroke="${INK}" stroke-width="4"/><rect x="666" y="200" width="44" height="40" rx="4" fill="#9cc8ff" stroke="${INK}" stroke-width="4"/>` +
    `<circle cx="300" cy="330" r="70" fill="#6ab04c" ${S}/><rect x="292" y="390" width="16" height="70" fill="#8a5a3b"/>` +
    `<circle cx="940" cy="320" r="60" fill="#6ab04c" ${S}/><rect x="932" y="370" width="16" height="70" fill="#8a5a3b"/>` +
    `<g transform="translate(980 470)"><rect x="0" y="0" width="120" height="70" rx="12" fill="#fff" ${S}/><path d="M18 46 L102 46 M18 26 L80 26" stroke="${INK}" stroke-width="6" stroke-linecap="round" opacity=".3"/></g>`);
}

function spaceHeater() {
  const fins = Array.from({ length: 7 }, (_, i) => `<rect x="${430 + i * 50}" y="200" width="40" height="270" rx="20" fill="${i % 2 ? '#fff' : CREAM}" ${S}/>`).join('');
  return wrap('#ffd9c8',
    `<ellipse cx="600" cy="545" rx="280" ry="22" fill="${INK}" opacity=".08"/>` + fins +
    `<rect x="420" y="470" width="360" height="30" rx="12" fill="${INK}"/><circle cx="460" cy="520" r="18" fill="${INK}"/><circle cx="740" cy="520" r="18" fill="${INK}"/>` +
    `<rect x="760" y="250" width="70" height="110" rx="14" fill="${AMBER}" ${S}/><circle cx="795" cy="290" r="16" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="795" cy="334" r="6" fill="#ff7a59"/>` +
    [470, 560, 650].map((x) => `<path d="M${x} 170 q-20 -28 0 -56 t0 -56" fill="none" stroke="#ff7a59" stroke-width="12" stroke-linecap="round"/>`).join('') +
    `<g transform="translate(240 200)"><rect x="-22" y="0" width="44" height="200" rx="22" fill="#fff" ${S}/><circle cx="0" cy="220" r="38" fill="#ff7a59" ${S}/><rect x="-8" y="70" width="16" height="140" fill="#ff7a59"/></g>` +
    `<circle cx="960" cy="440" r="64" fill="${AMBER}" ${S}/><path d="M976 416 q-16 -11 -30 0 q-11 12 14 23 q27 11 14 25 q-14 11 -32 -2 M961 404 v74" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`);
}

function topsoil() {
  const r = rand(5);
  let crumbs = '';
  for (let i = 0; i < 40; i++) crumbs += `<circle cx="${(330 + r() * 300).toFixed(0)}" cy="${(250 + r() * 50).toFixed(0)}" r="${(4 + r() * 6).toFixed(0)}" fill="${r() > 0.5 ? '#4a3222' : '#6e4a32'}"/>`;
  const sprout = (x: number) => `<path d="M${x} 330 v-40" stroke="#3f8f3a" stroke-width="6" stroke-linecap="round"/><path d="M${x} 300 q-26 -6 -30 -30 q26 2 30 30z M${x} 296 q24 -8 28 -32 q-26 4 -28 32z" fill="#6ab04c" stroke="${INK}" stroke-width="3"/>`;
  return wrap('#ffe6b3',
    `<ellipse cx="600" cy="560" rx="500" ry="24" fill="${INK}" opacity=".08"/>` +
    `<path d="M300 300 Q480 210 660 300 Z" fill="#5a3b27" ${S}/>` + crumbs +
    `<path d="M280 300 L680 300 L620 430 L340 430 Z" fill="${AMBER}" ${S}/>` +
    `<path d="M300 330 L170 400" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><path d="M320 310 L200 360" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>` +
    `<circle cx="480" cy="490" r="52" fill="${INK}"/><circle cx="480" cy="490" r="18" fill="#fff"/><path d="M400 430 L460 470 M560 430 L500 470" stroke="${INK}" stroke-width="8"/>` +
    `<rect x="800" y="420" width="300" height="110" rx="10" fill="#b47b52" ${S}/><rect x="812" y="410" width="276" height="26" rx="6" fill="#5a3b27" stroke="${INK}" stroke-width="4"/>` +
    `<line x1="900" y1="420" x2="900" y2="530" stroke="${INK}" stroke-width="4" opacity=".4"/><line x1="1000" y1="420" x2="1000" y2="530" stroke="${INK}" stroke-width="4" opacity=".4"/>` +
    `<g transform="translate(0 80)">${sprout(860)}${sprout(950)}${sprout(1040)}</g>`);
}

function tdee() {
  return wrap('#cdeee0',
    `<ellipse cx="600" cy="560" rx="440" ry="22" fill="${INK}" opacity=".08"/>` +
    `<circle cx="600" cy="330" r="190" fill="#fff" ${S}/><circle cx="600" cy="330" r="140" fill="${CREAM}" stroke="${INK}" stroke-width="4"/>` +
    `<path d="M470 330 A130 130 0 0 1 730 330" fill="none" stroke="#e5e7eb" stroke-width="22"/><path d="M470 330 A130 130 0 0 1 680 230" fill="none" stroke="${AMBER}" stroke-width="22" stroke-linecap="round"/>` +
    `<path d="M600 330 L668 262" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><circle cx="600" cy="330" r="16" fill="${INK}"/>` +
    `<path d="M560 420 Q600 380 640 420 Q630 470 600 480 Q570 470 560 420Z" fill="#ff7a59" stroke="${INK}" stroke-width="5"/><path d="M584 440 Q600 418 616 440 Q612 462 600 464 Q588 462 584 440Z" fill="${AMBER}"/>` +
    `<g transform="translate(200 360)"><path d="M0 60 q0 -70 60 -70 q60 0 60 70 q0 60 -60 70 q-60 -10 -60 -70z" fill="#ff7a59" ${S}/><path d="M60 -10 q4 -26 24 -34" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M66 -20 q26 -18 40 4 q-26 10 -40 -4z" fill="#6ab04c" stroke="${INK}" stroke-width="4"/></g>` +
    `<g transform="translate(880 400)"><rect x="0" y="40" width="200" height="22" rx="8" fill="${INK}"/><rect x="10" y="0" width="36" height="102" rx="10" fill="${AMBER}" ${S}/><rect x="154" y="0" width="36" height="102" rx="10" fill="${AMBER}" ${S}/><rect x="-14" y="22" width="22" height="58" rx="8" fill="${INK}"/><rect x="192" y="22" width="22" height="58" rx="8" fill="${INK}"/></g>`);
}

function dishwasher() {
  const plates = [0, 1, 2, 3, 4].map((i) => `<ellipse cx="${480 + i * 60}" cy="250" rx="14" ry="56" fill="#fff" stroke="${INK}" stroke-width="5"/>`).join('');
  const bubble = (x: number, y: number, r: number) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${BLUE}" stroke-width="5" opacity=".9"/>`;
  return wrap('#d3e6ff',
    `<ellipse cx="600" cy="560" rx="300" ry="22" fill="${INK}" opacity=".08"/>` +
    `<rect x="400" y="110" width="400" height="330" rx="30" fill="#fff" ${S}/><rect x="400" y="110" width="400" height="56" rx="30" fill="${CREAM}" ${S}/>` +
    `<circle cx="740" cy="138" r="12" fill="${AMBER}" stroke="${INK}" stroke-width="4"/><rect x="440" y="130" width="120" height="16" rx="8" fill="${INK}" opacity=".15"/>` +
    `<rect x="430" y="190" width="340" height="230" rx="16" fill="#e8efff" stroke="${INK}" stroke-width="4"/>` + plates +
    `<path d="M440 320 L760 320" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M450 330 L470 400 M750 330 L730 400" stroke="${INK}" stroke-width="5"/>` +
    `<path d="M400 440 L800 440 L860 540 L340 540 Z" fill="${AMBER}" ${S}/><path d="M420 470 L780 470" stroke="${INK}" stroke-width="5" opacity=".25"/>` +
    bubble(880, 200, 34) + bubble(950, 290, 22) + bubble(900, 360, 14) + bubble(320, 240, 26) + bubble(270, 320, 16) +
    `<path d="M1000 380 L960 470 L995 470 L975 560 L1050 440 L1012 440 L1035 380 Z" fill="${AMBER}" ${S}/>`);
}

function dateDiff() {
  // calendar grid with a start and end day circled, linked by an arc; hourglass at the side
  let cells = '';
  for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) {
    const x = 330 + c * 66, y = 250 + r * 54, idx = r * 7 + c;
    const inRange = idx >= 9 && idx <= 25, weekend = c >= 5;
    cells += `<rect x="${x}" y="${y}" width="54" height="42" rx="10" fill="${inRange ? (weekend ? '#ffe2b0' : '#ffd48a') : weekend ? '#eef1f5' : '#fff'}" stroke="${INK}" stroke-width="3"/>`;
  }
  const ring = (idx: number) => { const x = 330 + (idx % 7) * 66 + 27, y = 250 + Math.floor(idx / 7) * 54 + 21; return `<circle cx="${x}" cy="${y}" r="34" fill="none" stroke="${BLUE}" stroke-width="7"/>`; };
  return wrap('#ffe9d6',
    `<ellipse cx="600" cy="560" rx="380" ry="22" fill="${INK}" opacity=".08"/>` +
    `<rect x="300" y="130" width="520" height="410" rx="34" fill="#fff" ${S}/>` +
    `<path d="M300 210 L300 164 Q300 130 334 130 L786 130 Q820 130 820 164 L820 210 Z" fill="#ff7a59" ${S}/>` +
    `<rect x="380" y="96" width="22" height="70" rx="11" fill="${INK}"/><rect x="718" y="96" width="22" height="70" rx="11" fill="${INK}"/>` +
    cells + ring(9) + ring(25) +
    `<path d="M905 140 L1015 140 M905 380 L1015 380" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>` +
    `<path d="M915 145 Q915 230 960 260 Q1005 230 1005 145 Z M915 375 Q915 290 960 260 Q1005 290 1005 375 Z" fill="${CREAM}" ${S}/>` +
    `<path d="M935 175 Q960 215 985 175 Z" fill="${AMBER}"/><path d="M925 370 Q960 320 995 370 Z" fill="${AMBER}"/><path d="M960 262 L960 340" stroke="${AMBER}" stroke-width="5"/>` +
    `<g transform="translate(150 330)"><circle cx="0" cy="0" r="70" fill="${AMBER}" ${S}/><circle cx="0" cy="0" r="52" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M0 0 L0 -34 M0 0 L26 14" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><circle cx="0" cy="0" r="7" fill="${INK}"/></g>`);
}

export const covers: Record<string, { svg: () => string; alt: string }> = {
  'how-many-bags-of-mulch-in-a-yard': { svg: mulch, alt: 'Illustration of a mulch pile next to 2 and 3 cubic foot mulch bags and a one-cubic-yard cube' },
  'how-many-tons-of-gravel-in-a-yard': { svg: gravel, alt: 'Illustration of a dump truck carrying gravel beside a small gravel pile' },
  'how-much-does-it-cost-to-run-an-air-conditioner': { svg: ac, alt: 'Illustration of a wall air conditioner blowing cool air with a snowflake and a coin' },
  'electric-water-heater-cost-per-month': { svg: waterHeater, alt: 'Illustration of a hot water tank between an electricity bolt and a propane flame' },
  'how-much-does-it-cost-to-run-a-dryer': { svg: dryer, alt: 'Illustration of a clothes dryer with laundry tumbling, heat waves and a timer' },
  'how-to-calculate-percentage-increase': { svg: percent, alt: 'Illustration of rising bars with an upward arrow and a percent sign' },
  'how-much-electricity-does-a-gaming-pc-use': { svg: gamingPc, alt: 'Illustration of a gaming PC tower with RGB fans, a monitor, keyboard and a power bolt' },
  'navy-tape-test-body-fat': { svg: navy, alt: 'Illustration of a figure with a tape measure around the neck and waist for the Navy body fat method' },
  'how-much-does-it-cost-to-run-a-dehumidifier': { svg: dehumidifier, alt: 'Illustration of a dehumidifier with a water tank, a humidity gauge and water droplets' },
  'how-much-gravel-for-a-driveway': { svg: driveway, alt: 'Illustration of a gravel driveway leading up to a house between two trees' },
  'how-much-does-it-cost-to-run-a-space-heater': { svg: spaceHeater, alt: 'Illustration of an oil-filled space heater giving off heat beside a thermometer and a coin' },
  'how-much-topsoil-do-i-need': { svg: topsoil, alt: 'Illustration of a wheelbarrow full of topsoil next to a raised bed with seedlings' },
  'how-to-calculate-tdee': { svg: tdee, alt: 'Illustration of a calorie gauge with a flame, an apple and a dumbbell' },
  'how-to-calculate-days-between-two-dates': { svg: dateDiff, alt: 'Illustration of a calendar page with a start and end date circled and the days between them highlighted, next to a clock and an hourglass' },
  'how-much-electricity-does-a-dishwasher-use': { svg: dishwasher, alt: 'Illustration of an open dishwasher with plates in the rack, bubbles and an electricity bolt' },
};

/* ---------- inline figures ---------- */

type Bar = { label: string; value: number; text: string };
export function barChart(bars: Bar[], unit = '') {
  const max = Math.max(...bars.map((b) => b.value));
  const rowH = 58, W = 640, labelW = 210, barW = W - labelW - 90;
  const rows = bars.map((b, i) => {
    const y = 20 + i * rowH, w = Math.max(6, (b.value / max) * barW);
    return `<text x="0" y="${y + 26}" font-size="15" font-weight="700" fill="currentColor">${b.label}</text>` +
      `<rect x="${labelW}" y="${y + 6}" width="${barW}" height="30" rx="15" fill="currentColor" opacity=".07"/>` +
      `<rect x="${labelW}" y="${y + 6}" width="${w.toFixed(1)}" height="30" rx="15" fill="${i === bars.length - 1 ? AMBER : '#f59e0b'}" opacity="${i === bars.length - 1 ? 1 : 0.55}"/>` +
      `<text x="${labelW + w + 10}" y="${y + 27}" font-size="15" font-weight="800" fill="currentColor">${b.text}${unit}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${20 + bars.length * rowH}" role="img" xmlns="http://www.w3.org/2000/svg">${rows}</svg>`;
}

const cubeFig = `<svg viewBox="0 0 640 270" role="img" xmlns="http://www.w3.org/2000/svg" font-weight="700" fill="currentColor">
<g transform="translate(40 30)" stroke="currentColor" stroke-width="3" stroke-linejoin="round">
<path d="M0 50 L100 0 L200 50 L100 100 Z" fill="${AMBER}"/><path d="M0 50 L100 100 L100 200 L0 150 Z" fill="#ffd48a"/><path d="M200 50 L100 100 L100 200 L200 150 Z" fill="#f59e0b"/></g>
<text x="22" y="70" font-size="14" transform="rotate(-27 22 70)">3 ft</text><text x="190" y="242" font-size="14">3 ft</text><text x="250" y="140" font-size="14">3 ft</text>
<text x="300" y="70" font-size="22" font-weight="800">1 yd³ = 27 cu ft</text>
<g transform="translate(300 95)">${Array.from({ length: 14 }, (_, i) => `<rect x="${(i % 7) * 40}" y="${Math.floor(i / 7) * 34}" width="${i === 13 ? 16 : 32}" height="26" rx="6" fill="${AMBER}" stroke="currentColor" stroke-width="2"/>`).join('')}</g>
<text x="300" y="185" font-size="15">13.5 bags of 2 cu ft</text>
<g transform="translate(300 198)">${Array.from({ length: 9 }, (_, i) => `<rect x="${i * 34}" y="0" width="28" height="30" rx="6" fill="#cdeee0" stroke="currentColor" stroke-width="2"/>`).join('')}</g>
<text x="300" y="258" font-size="15">9 bags of 3 cu ft</text></svg>`;

const pctFig = `<svg viewBox="0 0 640 220" role="img" xmlns="http://www.w3.org/2000/svg" fill="currentColor" font-weight="700">
<rect x="40" y="110" width="90" height="80" rx="10" fill="currentColor" opacity=".15"/><rect x="200" y="90" width="90" height="100" rx="10" fill="${AMBER}"/>
<text x="85" y="100" font-size="18" text-anchor="middle">80</text><text x="245" y="80" font-size="18" text-anchor="middle">100</text>
<path d="M95 60 Q165 10 235 50" fill="none" stroke="currentColor" stroke-width="3"/><path d="M225 40 L237 52 L221 56" fill="none" stroke="currentColor" stroke-width="3"/>
<text x="165" y="22" font-size="20" font-weight="800" text-anchor="middle">+25%</text><text x="165" y="212" font-size="13" text-anchor="middle" opacity=".7">20 ÷ 80 × 100</text>
<rect x="360" y="90" width="90" height="100" rx="10" fill="${AMBER}"/><rect x="520" y="110" width="90" height="80" rx="10" fill="currentColor" opacity=".15"/>
<text x="405" y="80" font-size="18" text-anchor="middle">100</text><text x="565" y="100" font-size="18" text-anchor="middle">80</text>
<path d="M415 50 Q485 10 555 60" fill="none" stroke="currentColor" stroke-width="3"/><path d="M541 58 L556 62 L553 47" fill="none" stroke="currentColor" stroke-width="3"/>
<text x="485" y="22" font-size="20" font-weight="800" text-anchor="middle">−20%</text><text x="485" y="212" font-size="13" text-anchor="middle" opacity=".7">20 ÷ 100 × 100</text></svg>`;

const navyFig = `<svg viewBox="0 0 640 360" role="img" xmlns="http://www.w3.org/2000/svg" fill="currentColor" font-weight="700" font-size="15">
<g stroke="currentColor" stroke-width="3" fill="none" stroke-linejoin="round">
<circle cx="200" cy="50" r="34"/><path d="M182 82 L182 108 M218 82 L218 108"/>
<path d="M120 120 Q200 102 280 120 L286 160 L262 160 L258 250 Q200 266 142 250 L138 160 L114 160 Z"/><path d="M144 250 L152 340 M256 250 L248 340 M200 268 L200 340"/></g>
<ellipse cx="200" cy="100" rx="26" ry="7" fill="none" stroke="${AMBER}" stroke-width="6"/>
<ellipse cx="200" cy="200" rx="62" ry="11" fill="none" stroke="${AMBER}" stroke-width="7"/>
<ellipse cx="200" cy="252" rx="64" ry="11" fill="none" stroke="${AMBER}" stroke-width="5" stroke-dasharray="10 6"/>
<path d="M230 100 L360 70 M266 200 L360 160 M268 252 L360 260" stroke="currentColor" stroke-width="1.5" opacity=".5"/>
<text x="370" y="66">Neck</text><text x="370" y="86" font-size="13" font-weight="500" opacity=".75">just below the larynx</text>
<text x="370" y="156">Waist</text><text x="370" y="176" font-size="13" font-weight="500" opacity=".75">men: at the navel</text><text x="370" y="194" font-size="13" font-weight="500" opacity=".75">women: narrowest point</text>
<text x="370" y="258">Hips (women only)</text><text x="370" y="278" font-size="13" font-weight="500" opacity=".75">widest part of the buttocks</text></svg>`;

export const figures: Record<string, Record<string, { svg: string; caption: string; alt: string }>> = {
  'how-many-bags-of-mulch-in-a-yard': {
    'The short answer': { svg: cubeFig, caption: 'One cubic yard holds 27 cubic feet — 13.5 two-cubic-foot bags or 9 three-cubic-foot bags.', alt: 'Diagram of a 3 by 3 by 3 foot cube equal to 13.5 bags of 2 cubic feet or 9 bags of 3 cubic feet' },
    'Coverage per yard and per bag': { svg: barChart([{ label: '1 inch deep', value: 324, text: '324' }, { label: '2 inches deep', value: 162, text: '162' }, { label: '3 inches deep', value: 108, text: '108' }, { label: '4 inches deep', value: 81, text: '81' }], ' sq ft'), caption: 'Area one cubic yard of mulch covers at each depth.', alt: 'Bar chart: one cubic yard of mulch covers 324 sq ft at 1 inch, 162 at 2 inches, 108 at 3 inches and 81 at 4 inches' },
  },
  'how-many-tons-of-gravel-in-a-yard': {
    'Weight per cubic yard by material': { svg: barChart([{ label: 'River rock', value: 1.2, text: '1.2' }, { label: 'Sand', value: 1.35, text: '1.35' }, { label: 'Pea / crushed gravel', value: 1.4, text: '1.4' }, { label: 'Crushed stone #57', value: 1.5, text: '1.5' }], ' t/yd³'), caption: 'Typical dry weight of one cubic yard, in US tons.', alt: 'Bar chart of tons per cubic yard: river rock 1.2, sand 1.35, pea gravel 1.4, crushed stone 1.5' },
  },
  'how-much-does-it-cost-to-run-an-air-conditioner': {
    'Real examples': { svg: barChart([{ label: '700 W window unit', value: 20, text: '$20' }, { label: '1,200 W split unit', value: 34, text: '$34' }, { label: '3,500 W central air', value: 100, text: '$100' }], ' /mo'), caption: 'Monthly cost at 8 hours a day, 70% duty cycle and $0.17/kWh.', alt: 'Bar chart of monthly AC cost: window unit $20, split unit $34, central air $100' },
  },
  'electric-water-heater-cost-per-month': {
    'Electric vs propane vs heat pump': { svg: barChart([{ label: 'Heat pump electric', value: 16, text: '$16' }, { label: 'Propane tank', value: 49, text: '$49' }, { label: 'Standard electric', value: 61, text: '$61' }], ' /mo'), caption: 'Monthly cost for the same hot water use, at the example prices in the table.', alt: 'Bar chart of monthly water heating cost: heat pump $16, propane $49, standard electric $61' },
  },
  'how-much-does-it-cost-to-run-a-dryer': {
    'Worked examples': { svg: barChart([{ label: '3,000 W, 60 min', value: 0.38, text: '$0.38' }, { label: '5,000 W, 45 min', value: 0.51, text: '$0.51' }, { label: '5 kW, 90 min @ 18¢', value: 1.35, text: '$1.35' }], ' /load'), caption: 'Cost per load for the three worked examples.', alt: 'Bar chart of dryer cost per load: 38 cents, 51 cents and $1.35' },
  },
  'how-to-calculate-percentage-increase': {
    'Examples': { svg: pctFig, caption: 'The base is always the starting value, so +25% and −20% connect the same two numbers.', alt: 'Diagram: 80 to 100 is a 25% increase, 100 to 80 is a 20% decrease' },
  },
  'how-much-electricity-does-a-gaming-pc-use': {
    'What it costs: worked examples': { svg: barChart([{ label: 'Entry-level, 150 W', value: 2.45, text: '$2.45' }, { label: 'Mid-range, 400 W', value: 6.5, text: '$6.50' }, { label: 'High-end, 700 W', value: 11.4, text: '$11.40' }], ' /mo'), caption: 'Monthly cost at 4 hours of gaming a day, 80% average load and $0.17/kWh.', alt: 'Bar chart of gaming PC monthly electricity cost: $2.45, $6.50 and $11.40' },
  },
  'navy-tape-test-body-fat': {
    'How to take the measurements': { svg: navyFig, caption: 'Where to place the tape for the Navy method.', alt: 'Diagram of a figure showing tape positions at the neck, waist and hips' },
  },
  'how-much-does-it-cost-to-run-a-dehumidifier': {
    'Cost formula and examples': { svg: barChart([{ label: '300 W, 8 h/day', value: 8.6, text: '$8.60' }, { label: '500 W, 8 h/day', value: 14.3, text: '$14.30' }, { label: '500 W, 24 h/day', value: 30.6, text: '$30.60' }], ' /mo'), caption: 'Monthly cost for each scenario at $0.17/kWh.', alt: 'Bar chart of dehumidifier monthly cost: $8.60, $14.30 and $30.60' },
  },
  'how-much-gravel-for-a-driveway': {
    'Gravel for common driveway sizes': { svg: barChart([[10, 40], [12, 50], [12, 60], [12, 100], [20, 50]].map(([w, l]) => { const t = (l * w * 4) / 12 / 27 * 1.4; return { label: `${w} × ${l} ft`, value: t, text: t.toFixed(1) }; }), ' tons'), caption: 'Tons of typical gravel at 4 inches deep (1.4 t/yd³), before adding 10% extra.', alt: 'Bar chart of gravel tons for driveway sizes at 4 inches deep' },
  },
  'how-much-does-it-cost-to-run-a-space-heater': {
    'What a space heater costs': { svg: barChart([{ label: '2 hours a day', value: 12.24, text: '$12' }, { label: '5 hours a day', value: 30.6, text: '$31' }, { label: '8 hours a day', value: 48.96, text: '$49' }], ' /mo'), caption: 'Monthly cost of a 1,500 W heater cycling 80% of the time, at $0.17/kWh.', alt: 'Bar chart of space heater monthly cost: $12, $31 and $49' },
  },
  'how-much-topsoil-do-i-need': {
    'How deep should topsoil be?': { svg: barChart([{ label: '1 inch', value: 324, text: '324' }, { label: '2 inches', value: 162, text: '162' }, { label: '4 inches', value: 81, text: '81' }, { label: '6 inches', value: 54, text: '54' }, { label: '12 inches', value: 27, text: '27' }], ' sq ft'), caption: 'Area one cubic yard of topsoil covers at each depth.', alt: 'Bar chart of square feet covered by one cubic yard of topsoil at different depths' },
  },
  'how-to-calculate-tdee': {
    'Step 2: multiply by your activity level': { svg: barChart([{ label: 'Sedentary ×1.2', value: 2091, text: '2,091' }, { label: 'Light ×1.375', value: 2396, text: '2,396' }, { label: 'Moderate ×1.55', value: 2701, text: '2,701' }, { label: 'Very active ×1.725', value: 3006, text: '3,006' }], ' kcal'), caption: 'TDEE for the example man (BMR 1,743 kcal) at each activity level.', alt: 'Bar chart of TDEE by activity level from 2,091 to 3,006 kcal' },
  },
  'how-to-calculate-days-between-two-dates': {
    'Days between dates in Excel and Google Sheets': { svg: barChart([{ label: 'Days, end excluded', value: 80, text: '80' }, { label: 'Days, both included', value: 81, text: '81' }, { label: 'Weekdays (Mon–Fri)', value: 57, text: '57' }], ' days'), caption: '14 March to 2 June 2026 counted three ways. The weekday count includes both dates, like NETWORKDAYS.', alt: 'Bar chart: 80 days with the end date excluded, 81 with both dates included, 57 weekdays' },
  },
  'how-much-electricity-does-a-dishwasher-use': {
    'What each load costs': { svg: barChart([{ label: '3 loads a week', value: 2.39, text: '$2.39' }, { label: '5 loads a week', value: 3.98, text: '$3.98' }, { label: '7 loads a week', value: 5.57, text: '$5.57' }], ' /mo'), caption: 'Monthly cost at 1.08 kWh per cycle and $0.17/kWh.', alt: 'Bar chart of dishwasher monthly cost: $2.39, $3.98 and $5.57' },
  },
};

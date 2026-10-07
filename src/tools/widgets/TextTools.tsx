'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CopyButton } from '@/components/CopyButton';

const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold">{children}</label>
);

const STOP = new Set('a an and are as at be but by for from has have he her his i in is it its of on or our she so that the their them they this to was we were will with you your not can do if my me no up out about into than then there what when which who how all just more also been would could should'.split(' '));

// ---------------- Word counter ----------------
export function WordCounter() {
  const [text, setText] = useState('');
  const s = useMemo(() => {
    const t = text;
    const words = t.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || [];
    const sentences = t.split(/(?<=[.!?])\s+|\n+/).filter((x) => /[\p{L}\p{N}]/u.test(x)).length;
    const paragraphs = t.split(/\n\s*\n/).filter((x) => x.trim()).length;
    const freq: Record<string, number> = {};
    for (const w of words) { const k = w.toLowerCase(); if (k.length > 2 && !STOP.has(k)) freq[k] = (freq[k] || 0) + 1; }
    const top = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 8);
    return {
      words: words.length, chars: [...t].length, noSpace: [...t.replace(/\s/g, '')].length, sentences, paragraphs,
      read: words.length / 238, speak: words.length / 140, top,
      avg: sentences ? words.length / sentences : 0,
    };
  }, [text]);
  const mins = (m: number) => (m < 1 ? `${Math.max(0, Math.round(m * 60))} sec` : `${Math.floor(m)} min ${Math.round((m % 1) * 60)} sec`);
  const stats: [string, string][] = [
    ['Words', s.words.toLocaleString()], ['Characters', s.chars.toLocaleString()], ['Characters (no spaces)', s.noSpace.toLocaleString()],
    ['Sentences', s.sentences.toLocaleString()], ['Paragraphs', s.paragraphs.toLocaleString()], ['Reading time', mins(s.read)],
    ['Speaking time', mins(s.speak)], ['Avg. words / sentence', s.avg ? s.avg.toFixed(1) : '0'],
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <Label htmlFor="wc-in">Type or paste your text</Label>
        <textarea id="wc-in" className="input h-80 !font-sans !text-base" placeholder="Start typing — counts update instantly." value={text} onChange={(e) => setText(e.target.value)} />
        <div className="mt-2 flex gap-2"><button className="btn-ghost" onClick={() => setText('')}>Clear</button><CopyButton text={text} label="Copy text" /></div>
      </div>
      <div className="grid content-start gap-3">
        <div className="grid grid-cols-2 gap-2">
          {stats.map(([k, v], i) => (
            <div key={k} className={`rounded-xl p-3 ${i === 0 ? 'col-span-2 bg-glow-soft dark:bg-[#2a2210]' : 'surface'}`}>
              <p className="text-xs text-muted">{k}</p><p className={`${i === 0 ? 'text-3xl' : 'text-lg'} font-bold tabular-nums`}>{v}</p>
            </div>
          ))}
        </div>
        {s.top.length > 0 && (
          <div className="rounded-xl surface p-3">
            <p className="mb-2 text-sm font-semibold">Most used words</p>
            <ul className="space-y-1 text-sm">{s.top.map(([w, n]) => <li key={w} className="flex justify-between"><span>{w}</span><span className="tabular-nums text-muted">{n} · {((n / s.words) * 100).toFixed(1)}%</span></li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------- Case converter ----------------
const wordsOf = (t: string) => t.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(/[^\p{L}\p{N}]+/u).filter(Boolean);
const SMALL = new Set('a an and as at but by for in nor of on or so the to up yet vs via'.split(' '));
const cases: [string, (t: string) => string][] = [
  ['UPPER CASE', (t) => t.toUpperCase()],
  ['lower case', (t) => t.toLowerCase()],
  ['Title Case', (t) => t.toLowerCase().replace(/[\p{L}\p{N}'’]+/gu, (w, i: number) => (i > 0 && SMALL.has(w) ? w : w[0].toUpperCase() + w.slice(1)))],
  ['Sentence case', (t) => t.toLowerCase().replace(/(^\s*\p{L}|[.!?]\s+\p{L})/gu, (m) => m.toUpperCase()).replace(/\bi\b/g, 'I')],
  ['camelCase', (t) => wordsOf(t).map((w, i) => (i ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase())).join('')],
  ['PascalCase', (t) => wordsOf(t).map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('')],
  ['snake_case', (t) => wordsOf(t).map((w) => w.toLowerCase()).join('_')],
  ['kebab-case', (t) => wordsOf(t).map((w) => w.toLowerCase()).join('-')],
  ['CONSTANT_CASE', (t) => wordsOf(t).map((w) => w.toUpperCase()).join('_')],
  ['aLtErNaTiNg', (t) => [...t].map((c, i) => (i % 2 ? c.toUpperCase() : c.toLowerCase())).join('')],
];
export function CaseConverter() {
  const [text, setText] = useState('the quick brown fox jumps over the lazy dog');
  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="cc-in">Your text</Label>
        <textarea id="cc-in" className="input h-32 !font-sans !text-base" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {cases.map(([name, fn]) => {
          const out = fn(text);
          return (
            <div key={name} className="rounded-xl surface p-3">
              <div className="mb-1 flex items-center justify-between"><span className="text-sm font-semibold">{name}</span><CopyButton text={out} /></div>
              <p className="break-words font-mono text-sm text-muted">{out || '—'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------- Slug generator ----------------
export function slugify(t: string, sep = '-', stop = false, max = 0) {
  let words = t.normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss').replace(/æ/g, 'ae').replace(/ø/g, 'o')
    .replace(/&/g, ' and ').toLowerCase().replace(/['’]/g, '').split(/[^a-z0-9]+/).filter(Boolean);
  if (stop) { const f = words.filter((w) => !STOP.has(w)); if (f.length) words = f; }
  let s = words.join(sep);
  if (max > 0 && s.length > max) s = s.slice(0, max).replace(new RegExp(`\\${sep}[^\\${sep}]*$`), '') || s.slice(0, max);
  return s;
}
export function SlugGenerator() {
  const [text, setText] = useState('10 Best Café Spots in São Paulo — 2026 Guide!');
  const [sep, setSep] = useState('-');
  const [stop, setStop] = useState(false);
  const [max, setMax] = useState(0);
  const lines = text.split('\n');
  const out = lines.map((l) => slugify(l, sep, stop, max)).join('\n');
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <Label htmlFor="slug-in">Title or text (one per line for bulk)</Label>
        <textarea id="slug-in" className="input h-40 !font-sans" value={text} onChange={(e) => setText(e.target.value)} />
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <select aria-label="Separator" className="input w-auto" value={sep} onChange={(e) => setSep(e.target.value)}><option value="-">Hyphen (-)</option><option value="_">Underscore (_)</option></select>
          <label className="flex items-center gap-2"><input type="checkbox" checked={stop} onChange={(e) => setStop(e.target.checked)} /> Remove stop words</label>
          <label className="flex items-center gap-2">Max length <input className="input w-20" type="number" min={0} value={max} onChange={(e) => setMax(Number(e.target.value))} /></label>
        </div>
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between"><span className="text-sm font-semibold">Slug</span><CopyButton text={out} /></div>
        <textarea aria-label="Slug output" readOnly className="input h-40" value={out} />
        <p className="mt-2 text-xs text-muted">Accents are transliterated (é → e, ß → ss), “&” becomes “and”, and everything else that isn’t a letter or number becomes a separator.</p>
      </div>
    </div>
  );
}

// ---------------- UTM builder ----------------
export function UtmBuilder() {
  const [f, setF] = useState({ url: 'https://example.com/pricing', source: 'newsletter', medium: 'email', campaign: 'october_launch', term: '', content: '', id: '' });
  const [lower, setLower] = useState(true);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });
  const res = useMemo(() => {
    let u: URL;
    try { u = new URL(/^https?:\/\//i.test(f.url) ? f.url : `https://${f.url}`); } catch { return { error: 'Enter a valid website URL.' }; }
    const map: [string, string][] = [['utm_source', f.source], ['utm_medium', f.medium], ['utm_campaign', f.campaign], ['utm_term', f.term], ['utm_content', f.content], ['utm_id', f.id]];
    for (const [k, v] of map) { const val = v.trim().replace(/\s+/g, '_'); if (val) u.searchParams.set(k, lower ? val.toLowerCase() : val); else u.searchParams.delete(k); }
    const warn: string[] = [];
    if (!f.source.trim()) warn.push('utm_source is required by Google Analytics.');
    if (!f.medium.trim()) warn.push('Add utm_medium so traffic lands in the right channel (e.g. email, cpc, social).');
    if (!f.campaign.trim()) warn.push('Add utm_campaign to tell campaigns apart in reports.');
    return { out: u.toString(), warn };
  }, [f, lower]);
  const fields: [keyof typeof f, string, string][] = [
    ['url', 'Website URL *', 'https://example.com/page'], ['source', 'Campaign source (utm_source) *', 'google, newsletter, facebook'],
    ['medium', 'Campaign medium (utm_medium)', 'cpc, email, social'], ['campaign', 'Campaign name (utm_campaign)', 'spring_sale'],
    ['term', 'Campaign term (utm_term)', 'paid keyword'], ['content', 'Campaign content (utm_content)', 'banner_a / text_link'], ['id', 'Campaign ID (utm_id)', 'optional'],
  ];
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
        {fields.map(([k, l, ph]) => (<div key={k}><Label htmlFor={`utm-${k}`}>{l}</Label><input id={`utm-${k}`} className="input" placeholder={ph} value={f[k]} onChange={set(k)} /></div>))}
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} /> Force lowercase (recommended — GA4 is case-sensitive)</label>
      </form>
      <div className="grid content-start gap-3">
        <div className="rounded-2xl bg-glow-soft p-4 dark:bg-[#2a2210]">
          <div className="mb-2 flex items-center justify-between"><span className="text-sm font-semibold">Tagged URL</span>{'out' in res && <CopyButton text={res.out!} />}</div>
          <p className="break-all font-mono text-sm">{'out' in res ? res.out : res.error}</p>
        </div>
        {'warn' in res && res.warn!.length > 0 && <ul className="list-disc space-y-1 pl-5 text-sm text-muted">{res.warn!.map((w) => <li key={w}>{w}</li>)}</ul>}
      </div>
    </div>
  );
}

// ---------------- SERP snippet preview ----------------
const TITLE_PX = 600, DESC_PX = 920;
export function SerpPreview() {
  const [title, setTitle] = useState('Paint Calculator: How Much Paint Do I Need? | ToolLantern');
  const [desc, setDesc] = useState('Work out exactly how many gallons or litres of paint a room needs. Subtracts doors and windows, handles multiple coats and ceilings. Free, no sign-up.');
  const [url, setUrl] = useState('https://toollantern.com/paint-calculator/');
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [w, setW] = useState({ t: 0, d: 0 });
  useEffect(() => {
    if (!canvas.current) canvas.current = document.createElement('canvas');
    const ctx = canvas.current.getContext('2d');
    if (!ctx) return;
    ctx.font = '20px Arial'; const t = ctx.measureText(title).width;
    ctx.font = '14px Arial'; const d = ctx.measureText(desc).width;
    setW({ t, d });
  }, [title, desc]);
  const cut = (s: string, px: number, font: string) => {
    const ctx = canvas.current?.getContext('2d'); if (!ctx) return s;
    ctx.font = font; if (ctx.measureText(s).width <= px) return s;
    let lo = 0, hi = s.length;
    while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (ctx.measureText(s.slice(0, mid) + ' ...').width <= px) lo = mid; else hi = mid - 1; }
    return s.slice(0, lo).replace(/\s+\S*$/, '') + ' ...';
  };
  let crumb = url;
  try { const u = new URL(url); crumb = `${u.hostname}${u.pathname.replace(/\/$/, '').split('/').filter(Boolean).map((p) => ` › ${p}`).join('')}`; } catch { /* keep */ }
  const bar = (v: number, max: number) => (
    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full surface-2"><div className={`h-full ${v > max ? 'bg-red-500' : v > max * 0.9 ? 'bg-amber-glow' : 'bg-glow'}`} style={{ width: `${Math.min(100, (v / max) * 100)}%` }} /></div>
  );
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="grid content-start gap-4">
        <div><Label htmlFor="serp-t">Title tag</Label><input id="serp-t" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
          {bar(w.t, TITLE_PX)}<p className="mt-1 text-xs text-muted">{title.length} characters · {Math.round(w.t)} / {TITLE_PX} px</p></div>
        <div><Label htmlFor="serp-d">Meta description</Label><textarea id="serp-d" className="input h-28 !font-sans" value={desc} onChange={(e) => setDesc(e.target.value)} />
          {bar(w.d, DESC_PX)}<p className="mt-1 text-xs text-muted">{desc.length} characters · {Math.round(w.d)} / {DESC_PX} px</p></div>
        <div><Label htmlFor="serp-u">URL</Label><input id="serp-u" className="input" value={url} onChange={(e) => setUrl(e.target.value)} /></div>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold">Desktop preview</p>
        <div className="rounded-xl bg-white p-5 text-left shadow-sm ring-1 ring-black/5" style={{ fontFamily: 'Arial, sans-serif' }}>
          <p className="truncate text-[14px] text-[#202124]">{crumb}</p>
          <p className="mt-1 text-[20px] leading-[1.3] text-[#1a0dab]">{cut(title, TITLE_PX, '20px Arial')}</p>
          <p className="mt-1 text-[14px] leading-[1.58] text-[#4d5156]">{cut(desc, DESC_PX, '14px Arial')}</p>
        </div>
        <p className="mt-3 text-xs text-muted">Google truncates by pixel width, not characters. Widths are measured with the same font Google uses (Arial 20px / 14px). Google may still rewrite titles and descriptions.</p>
      </div>
    </div>
  );
}

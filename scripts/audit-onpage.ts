// On-page audit of the built site: title, meta, H1, focus keyword placement.
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';
import { toolSeo } from '../src/lib/seo-data';
import { tools, toolPath } from '../src/lib/tools';

const out = 'out';
const pages: string[] = [];
const walk = (d: string) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) { if (f !== '_next') walk(p); } else if (f === 'index.html') pages.push(p); } };
walk(out);
const kwOf: Record<string, string> = {};
for (const t of tools) { const s = toolSeo[t.slug]; if (s) kwOf[toolPath(t)] = s.primaryKeyword; }
const dec = (s: string) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/<[^>]+>/g, '');
const rows: string[] = [];
let bad = 0;
for (const p of pages.sort()) {
  const url = '/' + p.slice(out.length + 1).replace(/index\.html$/, '');
  const h = readFileSync(p, 'utf8');
  const title = dec(h.match(/<title>(.*?)<\/title>/)?.[1] ?? '');
  const meta = dec(h.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const h1 = dec(h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '');
  const canon = h.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';
  const kw = kwOf[url];
  const has = (s: string) => !kw || s.toLowerCase().includes(kw.toLowerCase());
  const issues = [
    !title && 'no title', title.length > 60 && `title ${title.length}ch`,
    !meta && 'no meta', meta && (meta.length < 70 || meta.length > 160) && `meta ${meta.length}ch`,
    !h1 && 'no h1', !canon && 'no canonical',
    kw && !has(title) && 'kw!title', kw && !has(meta) && 'kw!meta', kw && !has(h1) && 'kw!h1',
  ].filter(Boolean);
  if (url.startsWith('/404') || url.startsWith('/embed/')) continue;
  if (issues.length) bad++;
  rows.push([url, kw ?? '-', title.length, meta.length, issues.join(', ') || 'OK'].join(' | '));
}
console.log(rows.join('\n'));
console.log(`\n${pages.length} pages, ${bad} with issues`);

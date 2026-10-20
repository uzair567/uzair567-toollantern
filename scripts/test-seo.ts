import { tools } from '../src/lib/tools.ts';
import { toolSeo, categorySeo } from '../src/lib/seo-data.ts';

let fail = 0;
const bad = (m: string) => { fail++; console.error('✗', m); };
const slugs = new Set(tools.map((t) => t.slug));
const titles = new Map<string, string>(), metas = new Map<string, string>();

for (const t of tools) {
  const s = toolSeo[t.slug];
  if (!s) { bad(`${t.slug}: no SEO entry`); continue; }
  const title = s.title ?? t.title, meta = s.metaDescription ?? t.description;
  if (title.length > 65) bad(`${t.slug}: title ${title.length} chars`);
  if (meta.length > 160 || meta.length < 70) bad(`${t.slug}: meta ${meta.length} chars`);
  if (titles.has(title)) bad(`${t.slug}: duplicate title with ${titles.get(title)}`); titles.set(title, t.slug);
  if (metas.has(meta)) bad(`${t.slug}: duplicate meta with ${metas.get(meta)}`); metas.set(meta, t.slug);
  for (const [, href] of s.answer.matchAll(/href="\/([^"]+)\/"/g)) if (!slugs.has(href)) bad(`${t.slug}: answer links to missing /${href}/`);
  const kw = s.primaryKeyword.toLowerCase();
  if (!title.toLowerCase().includes(kw)) bad(`${t.slug}: focus keyword "${kw}" missing from title`);
  if (!meta.toLowerCase().includes(kw)) bad(`${t.slug}: focus keyword "${kw}" missing from meta`);
  if (title.length > 60) bad(`${t.slug}: title ${title.length} chars (>60)`);
  if (meta.length > 155) bad(`${t.slug}: meta ${meta.length} chars (>155)`);
  if (s.answer.length > 420) bad(`${t.slug}: answer too long (${s.answer.replace(/<[^>]+>/g, '').length})`);
}
for (const k of Object.keys(toolSeo)) if (!slugs.has(k)) bad(`seo entry for unknown tool ${k}`);
for (const [id, c] of Object.entries(categorySeo)) {
  if (c.title.length > 65) bad(`category ${id}: title ${c.title.length}`);
  if (c.metaDescription.length > 160) bad(`category ${id}: meta ${c.metaDescription.length}`);
}
import { posts } from '../src/lib/blog.ts';
for (const p of posts) {
  const kw = p.focusKeyword.toLowerCase();
  if (p.title.length > 60) bad(`blog ${p.slug}: title ${p.title.length} chars`);
  if (p.metaDescription.length < 70 || p.metaDescription.length > 155) bad(`blog ${p.slug}: meta ${p.metaDescription.length} chars`);
  if (!p.title.toLowerCase().includes(kw)) bad(`blog ${p.slug}: keyword missing from title`);
  if (!p.metaDescription.toLowerCase().includes(kw)) bad(`blog ${p.slug}: keyword missing from meta`);
  if (titles.has(p.title)) bad(`blog ${p.slug}: duplicate title`); titles.set(p.title, p.slug);
  for (const t of p.tools) if (!slugs.has(t)) bad(`blog ${p.slug}: unknown tool ${t}`);
  for (const s of p.body) for (const [, href] of s.html.matchAll(/href="\/([^"]+)\/"/g)) if (!slugs.has(href)) bad(`blog ${p.slug}: links to missing /${href}/`);
}
console.log(fail ? `${fail} SEO problems` : `SEO data OK for ${tools.length} tools`);
process.exit(fail ? 1 : 0);

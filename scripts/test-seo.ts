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
  if (s.answer.length > 420) bad(`${t.slug}: answer too long (${s.answer.replace(/<[^>]+>/g, '').length})`);
}
for (const k of Object.keys(toolSeo)) if (!slugs.has(k)) bad(`seo entry for unknown tool ${k}`);
for (const [id, c] of Object.entries(categorySeo)) {
  if (c.title.length > 65) bad(`category ${id}: title ${c.title.length}`);
  if (c.metaDescription.length > 160) bad(`category ${id}: meta ${c.metaDescription.length}`);
}
console.log(fail ? `${fail} SEO problems` : `SEO data OK for ${tools.length} tools`);
process.exit(fail ? 1 : 0);

import type { ToolContent, CategoryId } from './types';
import { businessTools } from './content/business';
import { everydayTools, homeTools } from './content/everyday-home';
import { energyTools } from './content/energy';
import { devTools, textTools } from './content/dev-text';

export const tools: ToolContent[] = [...businessTools, ...homeTools, ...energyTools, ...everydayTools, ...devTools, ...textTools];

export const toolBySlug = new Map(tools.map((t) => [t.slug, t]));
export const getTool = (slug: string) => toolBySlug.get(slug);
export const toolPath = (t: ToolContent | string) => `/${typeof t === 'string' ? t : t.slug}/`;
export const engineOf = (t: ToolContent) => t.engine ?? t.slug;

/** Top-level tools (pSEO child pages are listed under their parent) */
export const primaryTools = tools.filter((t) => !t.parent);
export const childrenOf = (slug: string) => tools.filter((t) => t.parent === slug);
export const toolsInCategory = (c: CategoryId) => tools.filter((t) => t.category === c);
export const popularTools = tools.filter((t) => t.popular);

/** Lightweight index shipped to the client for search */
export const searchIndex = tools.map((t) => ({
  s: t.slug, n: t.name, c: t.category, l: t.lead.split('. ')[0],
  k: [t.name, ...t.keywords].join(' ').toLowerCase(),
}));
export type SearchEntry = (typeof searchIndex)[number];

// Fail the build early if content references a tool that doesn't exist.
for (const t of tools) {
  for (const r of t.related) if (!toolBySlug.has(r)) throw new Error(`${t.slug}: related tool "${r}" not found`);
  if (t.parent && !toolBySlug.has(t.parent)) throw new Error(`${t.slug}: parent not found`);
  if (t.title.length > 70) console.warn(`[seo] long title (${t.title.length}): ${t.slug}`);
  if (t.description.length > 165) console.warn(`[seo] long description (${t.description.length}): ${t.slug}`);
}

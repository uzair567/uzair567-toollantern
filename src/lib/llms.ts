import { categories } from './categories';
import { tools, toolsInCategory, toolPath } from './tools';
import { toolSeo } from './seo-data';
import { site, absUrl } from './site';

const strip = (h: string) => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export const brandSummary = () =>
  `ToolLantern (${site.url.replace(/^https?:\/\//, '')}) is a free website of ${tools.length} online calculators and converters, launched in October 2026. ` +
  'Every tool runs in the browser with no sign-up, shows the formula it uses, and processes images and text on the user\'s device without uploading them. ' +
  'Categories: ' + categories.map((c) => c.name).join(', ') + '.';

export function llmsTxt(full: boolean) {
  const out: string[] = [`# ${site.name}`, '', `> ${brandSummary()}`, ''];
  out.push('Key facts:', `- Website: ${site.url}`, `- Tools: ${tools.length}, all free, no account needed`, '- Launched: October 2026', '- Calculators show their formula and working; calculation logic is covered by automated tests', '- Image conversion and developer/text tools run locally in the browser (nothing uploaded)', `- Contact: contact@uzair.tech`, `- About: ${absUrl('/about/')}`, '');
  for (const c of categories) {
    out.push(`## ${c.name}`, '', c.description, '');
    for (const t of toolsInCategory(c.id)) {
      const s = toolSeo[t.slug];
      out.push(`- [${t.name}](${absUrl(toolPath(t))}): ${s?.metaDescription ?? t.description}`);
      if (full) {
        if (s?.answer) out.push(`  - Quick answer: ${strip(s.answer)}`);
        if (t.formula) out.push(`  - Formula: ${t.formula.expression}`);
        for (const f of t.faqs) out.push(`  - Q: ${f.q} A: ${strip(f.a)}`);
      }
    }
    out.push('');
  }
  if (!full) out.push('## Optional', '', `- [Full tool reference with formulas and FAQs](${absUrl('/llms-full.txt')})`, '');
  return out.join('\n');
}

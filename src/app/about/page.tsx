import Link from '@/components/A';
import { pageMeta, breadcrumbSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { categories } from '@/lib/categories';
import { tools, toolsInCategory } from '@/lib/tools';
import { site, absUrl } from '@/lib/site';

export const metadata = pageMeta({
  title: 'About ToolLantern – Free Online Calculators & Converters',
  description: `ToolLantern is a free website of ${tools.length} online calculators and converters, launched in October 2026. How tools are built, checked and kept private.`,
  path: '/about/',
});

const crumbs = [{ name: 'Home', href: '/' }, { name: 'About', href: '/about/' }];

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-6"><div className="rounded-[26px] card p-6 sm:p-10">
      <JsonLd data={[breadcrumbSchema(crumbs), { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About ToolLantern', url: absUrl('/about/'), about: { '@id': `${site.url}/#organization` } }]} />
      <Breadcrumbs items={crumbs} />
      <div className="prose-tl">
        <h1 className="display !mt-0 text-4xl sm:text-5xl">About ToolLantern</h1>
        <p><strong>ToolLantern is a free website of {tools.length} online calculators and converters</strong> for questions that come up in everyday work: converting a photo to JPG, pricing a product, estimating tiles for a floor, checking what an appliance costs to run, or working out daily calories. It launched in October 2026. Every tool is free, needs no account and works on phones and computers.</p>

        <h2>What you can do on ToolLantern</h2>
        <ul>
          {categories.map((c) => (
            <li key={c.id}><Link href={`/category/${c.id}/`}>{c.name}</Link> ({toolsInCategory(c.id).length} tools) — {c.description}</li>
          ))}
        </ul>

        <h2>How the tools are built and checked</h2>
        <p>Each calculator states the formula it uses and can show its working step by step, so you can check the answer instead of trusting a black box. The calculation logic is covered by automated tests with known results — for example, 70 kg must convert to 154.32 lb and a 10 × 10 ft slab 4 inches deep must need 1.23 cubic yards — and the tests run before every release.</p>
        <p>Where a result depends on figures that vary, the default is editable and the page explains it. Appliance pages start from typical wattages (for example, EPA ranges for dryers, dishwashers and water heaters); fee calculators use published standard rates that you can change; fitness calculators use established equations such as Mifflin-St Jeor for metabolic rate and the US Navy method for body fat.</p>

        <h2>Privacy</h2>
        <p>Image converters and developer and text tools process everything in your browser. Photos, JSON, tokens and text are never uploaded. See the <Link href="/privacy/">privacy policy</Link> for details.</p>

        <h2>Contact and corrections</h2>
        <p>If a result looks wrong or you would like a new tool, email <a href="mailto:contact@uzair.tech">contact@uzair.tech</a> with the tool name and the values you entered. Corrections are fixed and re-tested before the next release.</p>
      </div>
    </div></div>
  );
}

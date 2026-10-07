import { pageMeta } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata = pageMeta({ title: 'About ToolLantern', description: 'Why ToolLantern exists, how our calculators are built and checked, and how to report a problem with a tool.', path: '/about/' });

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-6"><div className="rounded-2xl card p-6 sm:p-10">
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'About', href: '/about/' }]} />
      <div className="prose-tl">
        <h1 className="display !mt-0 text-4xl sm:text-5xl">About ToolLantern</h1>
        <p>ToolLantern is a growing collection of free calculators and utilities for questions that come up every day — pricing a product, buying tiles, estimating an electricity bill or tidying a JSON file.</p>
        <h2>How tools are built</h2>
        <p>Every calculator states its formula and can show its working, so you can check the result rather than trust a black box. Calculation logic is covered by automated tests that run before each release.</p>
        <p>Where a figure depends on something that changes — payment processor fees, material densities, typical appliance wattages — the default is editable and the page says where to find the current value.</p>
        <h2>Your privacy</h2>
        <p>Developer and text tools process everything in your browser. Nothing you paste is sent to our servers. See the <a href="/privacy/">privacy policy</a> for details on analytics.</p>
        <h2>Found a mistake?</h2>
        <p>Accuracy matters to us. If a result looks wrong, email <a href="mailto:contact@uzair.tech">contact@uzair.tech</a> with the tool name and the values you entered.</p>
      </div>
    </div></div>
  );
}

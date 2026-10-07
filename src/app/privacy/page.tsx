import { pageMeta } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata = pageMeta({ title: 'Privacy Policy | ToolLantern', description: 'How ToolLantern handles data: tools run in your browser, what analytics we use and how cookies work.', path: '/privacy/' });

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-6">
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Privacy', href: '/privacy/' }]} />
      <div className="prose-tl">
        <h1 className="text-3xl font-bold tracking-tight">Privacy policy</h1>
        <p>Last updated 7 October 2026.</p>
        <h2>What you enter into tools</h2>
        <p>All calculators and utilities run in your web browser. Numbers, text, JSON, tokens and other input are processed on your device and are not sent to or stored on our servers.</p>
        <h2>Stored on your device</h2>
        <p>We store two small preferences in your browser’s local storage: your light/dark theme and a list of tools you recently opened. You can clear them at any time through your browser settings.</p>
        <h2>Analytics and advertising</h2>
        <p>We may use Google Analytics to understand which pages are used, and may show ads through Google AdSense. These services can set cookies and collect usage data such as pages viewed and approximate location. Where required by law, we ask for consent before enabling them. See Google’s privacy policy for how it handles this data.</p>
        <h2>Contact</h2>
        <p>Questions about privacy: <a href="mailto:contact@uzair.tech">contact@uzair.tech</a>.</p>
      </div>
    </div>
  );
}

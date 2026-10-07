import { pageMeta } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata = pageMeta({ title: 'Terms of Use | ToolLantern', description: 'Terms for using ToolLantern’s free online tools, including accuracy and liability.', path: '/terms/' });

export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-6">
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Terms', href: '/terms/' }]} />
      <div className="prose-tl">
        <h1 className="text-3xl font-bold tracking-tight">Terms of use</h1>
        <p>Last updated 7 October 2026.</p>
        <p>ToolLantern provides free tools for general information and planning. We work to keep them accurate, but results are estimates and are provided “as is”, without warranty of any kind.</p>
        <p>Do not rely on these tools as your only source for financial, legal, engineering, medical or safety decisions. Check important figures with a qualified professional, your supplier or the official source (for example, your payment provider’s current fee schedule).</p>
        <p>To the extent permitted by law, ToolLantern is not liable for losses arising from use of the tools.</p>
        <p>You may link to any page and share results. You may not copy the site’s content or code wholesale to republish it as your own.</p>
      </div>
    </div>
  );
}

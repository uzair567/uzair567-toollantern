import Link from 'next/link';
import { popularTools, toolPath } from '@/lib/tools';

export const metadata = { title: 'Page not found | ToolLantern', robots: { index: false } };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-sm font-semibold text-amber-700">404</p>
      <h1 className="mt-2 text-3xl font-bold">We couldn’t find that page</h1>
      <p className="mt-3 text-muted">The tool may have moved. Try one of these, or browse <Link className="underline" href="/all-tools/">all tools</Link>.</p>
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {popularTools.slice(0, 6).map((t) => <li key={t.slug}><Link href={toolPath(t)} className="inline-block rounded-full surface px-3 py-1.5 text-sm">{t.name}</Link></li>)}
      </ul>
    </div>
  );
}

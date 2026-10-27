import { CopyButton } from './CopyButton';
import { absUrl } from '@/lib/site';

// "Embed this calculator" box: other sites paste the code; the link under the iframe credits ToolLantern.
export function EmbedCode({ slug, name, height = 900 }: { slug: string; name: string; height?: number }) {
  const code = `<iframe src="${absUrl(`/embed/${slug}/`)}" title="${name}" width="100%" height="${height}" style="border:0;max-width:760px" loading="lazy"></iframe>\n<p style="font-size:13px"><a href="${absUrl(`/${slug}/`)}">${name}</a> by ToolLantern</p>`;
  return (
    <details className="not-prose group mt-8 rounded-2xl border border-line p-4 sm:p-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold">
        <span>Embed this {name.toLowerCase().includes('converter') ? 'converter' : 'calculator'} on your website — free</span>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full surface-2 transition group-open:rotate-45" aria-hidden>+</span>
      </summary>
      <p className="mt-3 text-sm text-muted">Copy this code into any page. It works on WordPress, Wix, Squarespace and plain HTML, updates automatically and has no ads.</p>
      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-all rounded-xl surface-2 p-3 text-xs"><code>{code}</code></pre>
      <div className="mt-3"><CopyButton text={code} label="Copy embed code" /></div>
    </details>
  );
}

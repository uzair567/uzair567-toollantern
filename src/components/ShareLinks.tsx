'use client';
import { useState } from 'react';
import { Icon } from './Icon';

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url), t = encodeURIComponent(title);
  const btn = 'grid h-10 w-10 place-items-center rounded-full card text-sm font-extrabold transition hover:bg-[var(--surface-2)]';
  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm font-bold text-muted">Share</span>
      <a className={btn} href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">X</a>
      <a className={btn} href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">f</a>
      <a className={btn} href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">W</a>
      <button type="button" className={btn} aria-label="Copy link" onClick={() => { navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }); }}>
        {copied ? <Icon name="check" className="h-4 w-4" /> : <Icon name="link" className="h-4 w-4" />}
      </button>
    </div>
  );
}

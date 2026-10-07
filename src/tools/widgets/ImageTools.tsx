'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';

type Fmt = 'jpeg' | 'png' | 'webp';
type Mode = 'convert' | 'compress' | 'resize';

interface Item {
  id: string;
  file: File;
  srcUrl: string;
  w: number;
  h: number;
  out?: { url: string; size: number; w: number; h: number; name: string };
  error?: string;
}

const EXT: Record<Fmt, string> = { jpeg: 'jpg', png: 'png', webp: 'webp' };
const LABEL: Record<Fmt, string> = { jpeg: 'JPG', png: 'PNG', webp: 'WebP' };
const kb = (n: number) => (n >= 1048576 ? `${(n / 1048576).toFixed(2)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
const baseName = (n: string) => n.replace(/\.[^.]+$/, '');
const fmtOfFile = (f: File): Fmt => (f.type === 'image/png' ? 'png' : f.type === 'image/webp' ? 'webp' : 'jpeg');

async function loadBitmap(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if ('createImageBitmap' in window) {
    try { return await createImageBitmap(file, { imageOrientation: 'from-image' } as ImageBitmapOptions); } catch { /* fall back */ }
  }
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = () => rej(new Error('This file could not be read as an image.'));
    img.src = URL.createObjectURL(file);
  });
}

export function ImageTool({ mode = 'convert', from, to = 'png' }: { mode?: Mode; from?: string; to?: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [format, setFormat] = useState<Fmt | 'same'>(mode === 'convert' ? ((to === 'jpg' ? 'jpeg' : to) as Fmt) : mode === 'compress' ? 'same' : 'same');
  const [quality, setQuality] = useState(mode === 'compress' ? 72 : 92);
  const [bg, setBg] = useState('#ffffff');
  const [maxW, setMaxW] = useState(mode === 'compress' ? '2000' : '');
  const [rw, setRw] = useState('1200');
  const [rh, setRh] = useState('');
  const [lock, setLock] = useState(true);
  const [pctScale, setPctScale] = useState('');
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const accept = from === 'jpg' ? 'image/jpeg,.jpg,.jpeg' : from === 'png' ? 'image/png,.png' : from === 'webp' ? 'image/webp,.webp' : 'image/*';

  const add = useCallback(async (files: FileList | File[]) => {
    const list = [...files].filter((f) => f.type.startsWith('image/') || /\.(jpe?g|png|webp|gif|bmp|avif)$/i.test(f.name)).slice(0, 30);
    const next: Item[] = [];
    for (const file of list) {
      const srcUrl = URL.createObjectURL(file);
      try {
        const bmp = await loadBitmap(file);
        next.push({ id: crypto.randomUUID(), file, srcUrl, w: bmp.width, h: bmp.height });
      } catch {
        next.push({ id: crypto.randomUUID(), file, srcUrl, w: 0, h: 0, error: 'Your browser cannot read this image format.' });
      }
    }
    setItems((p) => [...p, ...next]);
  }, []);

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => { const f = e.clipboardData?.files; if (f?.length) add(f); };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [add]);

  useEffect(() => () => items.forEach((i) => { URL.revokeObjectURL(i.srcUrl); if (i.out) URL.revokeObjectURL(i.out.url); }), []); // eslint-disable-line react-hooks/exhaustive-deps

  const targetSize = (w: number, h: number) => {
    if (mode === 'resize') {
      const p = parseFloat(pctScale);
      if (p > 0) return { w: Math.round((w * p) / 100), h: Math.round((h * p) / 100) };
      const W = parseInt(rw), H = parseInt(rh);
      if (lock) {
        if (W > 0) return { w: W, h: Math.round((h * W) / w) };
        if (H > 0) return { w: Math.round((w * H) / h), h: H };
      } else if (W > 0 || H > 0) return { w: W > 0 ? W : w, h: H > 0 ? H : h };
      return { w, h };
    }
    const M = parseInt(maxW);
    if (M > 0 && w > M) return { w: M, h: Math.round((h * M) / w) };
    return { w, h };
  };

  const process = async () => {
    setBusy(true);
    const out: Item[] = [];
    for (const it of items) {
      if (it.error) { out.push(it); continue; }
      try {
        const bmp = await loadBitmap(it.file);
        const { w, h } = targetSize(bmp.width, bmp.height);
        const fmt: Fmt = format === 'same' ? fmtOfFile(it.file) : format;
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, w); canvas.height = Math.max(1, h);
        const ctx = canvas.getContext('2d')!;
        if (fmt === 'jpeg') { ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h); }
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(bmp, 0, 0, w, h);
        const blob: Blob | null = await new Promise((r) => canvas.toBlob(r, `image/${fmt}`, fmt === 'png' ? undefined : quality / 100));
        if (!blob) throw new Error('Your browser could not encode this format.');
        if (it.out) URL.revokeObjectURL(it.out.url);
        out.push({ ...it, out: { url: URL.createObjectURL(blob), size: blob.size, w, h, name: `${baseName(it.file.name)}.${EXT[fmt]}` } });
      } catch (e) {
        out.push({ ...it, error: (e as Error).message });
      }
    }
    setItems(out);
    setBusy(false);
  };

  const downloadAll = () => {
    items.filter((i) => i.out).forEach((i, n) => setTimeout(() => { const a = document.createElement('a'); a.href = i.out!.url; a.download = i.out!.name; a.click(); }, n * 250));
  };
  const clear = () => { items.forEach((i) => { URL.revokeObjectURL(i.srcUrl); if (i.out) URL.revokeObjectURL(i.out.url); }); setItems([]); };

  const done = items.filter((i) => i.out);
  const totalIn = done.reduce((s, i) => s + i.file.size, 0), totalOut = done.reduce((s, i) => s + i.out!.size, 0);
  const showQuality = format !== 'png';
  const actionLabel = mode === 'compress' ? 'Compress' : mode === 'resize' ? 'Resize' : `Convert to ${format === 'same' ? 'original format' : LABEL[format]}`;

  return (
    <div className="grid gap-5">
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); }}
        className={`relative grid place-items-center rounded-3xl border-2 border-dashed px-6 py-10 text-center transition ${drag ? 'border-[var(--ink)] bg-glow-soft' : 'border-line surface-2'}`}
      >
        <span className="tile mb-3 h-14 w-14 bg-t-rose"><Icon name="upload" className="h-6 w-6" /></span>
        <p className="text-lg font-bold">Drop images here</p>
        <p className="mt-1 text-sm text-muted">or paste from clipboard · up to 30 files · {from ? `${from.toUpperCase()} files` : 'JPG, PNG, WebP, GIF, BMP, AVIF'}</p>
        <button type="button" className="btn mt-4" onClick={() => input.current?.click()}>Choose files <span className="dot-icon h-6 w-6"><Icon name="arrow-up-right" className="h-3.5 w-3.5" /></span></button>
        <input ref={input} type="file" accept={accept} multiple hidden onChange={(e) => { if (e.target.files) add(e.target.files); e.target.value = ''; }} />
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted"><Icon name="lock" className="h-3.5 w-3.5" /> Files never leave your device — conversion happens in your browser.</p>
      </div>

      <div className="grid gap-4 rounded-3xl surface-2 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm font-semibold">Output format
          <select className="input mt-1.5 bg-[var(--surface)]" value={format} onChange={(e) => setFormat(e.target.value as Fmt | 'same')}>
              {mode !== 'convert' && <option value="same">Keep original</option>}
              <option value="jpeg">JPG</option><option value="png">PNG</option><option value="webp">WebP</option>
            </select>
          </label>
        {showQuality && (
          <label className="text-sm font-semibold">Quality: {quality}%
            <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(+e.target.value)} className="mt-3 w-full accent-[var(--color-glow)]" />
            <span className="block text-xs font-normal text-muted">Applies to JPG &amp; WebP. PNG is lossless.</span>
          </label>
        )}
        {mode === 'resize' ? (
          <>
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
              <label>Width (px)<input className="input mt-1.5 bg-[var(--surface)]" inputMode="numeric" value={rw} onChange={(e) => { setRw(e.target.value); setPctScale(''); }} /></label>
              <label>Height (px)<input className="input mt-1.5 bg-[var(--surface)]" inputMode="numeric" value={rh} placeholder={lock ? 'auto' : ''} onChange={(e) => { setRh(e.target.value); setPctScale(''); }} /></label>
              <label className="col-span-2 flex items-center gap-2 font-normal"><input type="checkbox" checked={lock} onChange={(e) => setLock(e.target.checked)} /> Keep aspect ratio</label>
            </div>
            <label className="text-sm font-semibold">…or scale by %
              <input className="input mt-1.5 bg-[var(--surface)]" inputMode="numeric" placeholder="e.g. 50" value={pctScale} onChange={(e) => setPctScale(e.target.value)} />
            </label>
          </>
        ) : (
          <label className="text-sm font-semibold">Max width (px)
            <input className="input mt-1.5 bg-[var(--surface)]" inputMode="numeric" placeholder="Keep original size" value={maxW} onChange={(e) => setMaxW(e.target.value)} />
            <span className="block text-xs font-normal text-muted">Larger images are scaled down.</span>
          </label>
        )}
        {(format === 'jpeg') && (
          <label className="text-sm font-semibold">Background for transparency
            <span className="mt-1.5 flex items-center gap-2"><input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-11 w-14 cursor-pointer rounded-xl border border-line bg-transparent" /><span className="text-xs font-normal text-muted">JPG has no transparency, so clear areas get this colour.</span></span>
          </label>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className="btn" disabled={!items.length || busy} onClick={process}>{busy ? 'Working…' : actionLabel}<span className="dot-icon h-6 w-6"><Icon name="sparkle" className="h-3.5 w-3.5" /></span></button>
        {done.length > 1 && <button type="button" className="btn-ghost" onClick={downloadAll}><Icon name="download" className="h-4 w-4" /> Download all ({done.length})</button>}
        {items.length > 0 && <button type="button" className="btn-ghost" onClick={clear}>Clear</button>}
        {done.length > 0 && <span className="ml-auto text-sm font-semibold">{kb(totalIn)} → {kb(totalOut)} <span className={totalOut <= totalIn ? 'text-emerald-600' : 'text-muted'}>({totalOut <= totalIn ? '−' : '+'}{Math.abs(Math.round((1 - totalOut / totalIn) * 100))}%)</span></span>}
      </div>

      {items.length > 0 && (
        <ul className="grid gap-3" aria-live="polite">
          {items.map((it) => {
            const pct = it.out ? Math.round((1 - it.out.size / it.file.size) * 100) : 0;
            return (
              <li key={it.id} className="flex items-center gap-4 rounded-2xl surface p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.out?.url ?? it.srcUrl} alt="" className="h-16 w-16 flex-shrink-0 rounded-xl object-cover surface-2" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{it.out?.name ?? it.file.name}</p>
                  {it.error ? <p className="text-sm text-red-600">{it.error}</p> : (
                    <p className="text-sm text-muted">
                      {it.w}×{it.h} · {kb(it.file.size)}
                      {it.out && <> → <span className="font-semibold text-ink">{it.out.w}×{it.out.h} · {kb(it.out.size)}</span> <span className={pct >= 0 ? 'text-emerald-600' : 'text-amber-700'}>({pct >= 0 ? `−${pct}` : `+${-pct}`}%)</span></>}
                    </p>
                  )}
                </div>
                {it.out ? (
                  <a href={it.out.url} download={it.out.name} className="btn-ghost"><Icon name="download" className="h-4 w-4" /> <span className="hidden sm:inline">Download</span></a>
                ) : !it.error && <span className="text-xs text-muted">Ready</span>}
                <button type="button" aria-label={`Remove ${it.file.name}`} className="text-muted hover:text-[var(--ink)]" onClick={() => setItems((p) => p.filter((x) => x.id !== it.id))}><Icon name="close" className="h-4 w-4" /></button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

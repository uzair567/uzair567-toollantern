'use client';

import { useEffect, useMemo, useState } from 'react';
import { CopyButton } from '@/components/CopyButton';

const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold">{children}</label>
);
const Err = ({ children }: { children: React.ReactNode }) => (
  <p role="alert" className="mt-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">{children}</p>
);

// ---------------- JSON Formatter ----------------
function sortKeys(x: unknown): unknown {
  if (Array.isArray(x)) return x.map(sortKeys);
  if (x && typeof x === 'object') {
    return Object.keys(x as object).sort().reduce((o, k) => { (o as Record<string, unknown>)[k] = sortKeys((x as Record<string, unknown>)[k]); return o; }, {});
  }
  return x;
}
function locate(src: string, msg: string) {
  const m = /position (\d+)/i.exec(msg);
  if (!m) return '';
  const pos = +m[1];
  const before = src.slice(0, pos);
  const line = before.split('\n').length;
  const col = pos - before.lastIndexOf('\n');
  return ` (line ${line}, column ${col})`;
}

export function JsonFormatter() {
  const [input, setInput] = useState('{"name":"ToolLantern","tools":["json","base64"],"free":true,"meta":{"version":1}}');
  const [indent, setIndent] = useState('2');
  const [sort, setSort] = useState(false);
  const [mode, setMode] = useState<'pretty' | 'min'>('pretty');
  const res = useMemo(() => {
    if (!input.trim()) return { out: '', error: '' };
    try {
      let v = JSON.parse(input);
      if (sort) v = sortKeys(v);
      const sp = indent === 'tab' ? '\t' : Number(indent);
      return { out: mode === 'min' ? JSON.stringify(v) : JSON.stringify(v, null, sp), error: '' };
    } catch (e) {
      const msg = (e as Error).message;
      return { out: '', error: `Invalid JSON: ${msg}${/line \d/i.test(msg) ? '' : locate(input, msg)}` };
    }
  }, [input, indent, sort, mode]);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <Label htmlFor="json-in">Paste JSON</Label>
        <textarea id="json-in" className="input h-80" spellCheck={false} value={input} onChange={(e) => setInput(e.target.value)} />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button className={mode === 'pretty' ? 'btn' : 'btn-ghost'} onClick={() => setMode('pretty')}>Format</button>
          <button className={mode === 'min' ? 'btn' : 'btn-ghost'} onClick={() => setMode('min')}>Minify</button>
          <select aria-label="Indentation" className="input w-auto" value={indent} onChange={(e) => setIndent(e.target.value)}>
            <option value="2">2 spaces</option><option value="4">4 spaces</option><option value="tab">Tabs</option>
          </select>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={sort} onChange={(e) => setSort(e.target.checked)} /> Sort keys</label>
          <button className="btn-ghost" onClick={() => setInput('')}>Clear</button>
        </div>
        {res.error ? <Err>{res.error}</Err> : input.trim() && <p className="mt-2 text-sm font-medium text-brand-700 dark:text-brand-200">✓ Valid JSON</p>}
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between"><span className="text-sm font-semibold">Output</span><CopyButton text={res.out} /></div>
        <textarea aria-label="Formatted JSON" readOnly className="input h-80" value={res.out} />
        {res.out && <p className="mt-2 text-xs text-muted">{res.out.length.toLocaleString()} characters · {new Blob([res.out]).size.toLocaleString()} bytes</p>}
      </div>
    </div>
  );
}

// ---------------- Base64 ----------------
const b64enc = (s: string, urlSafe: boolean) => {
  const bytes = new TextEncoder().encode(s);
  let bin = ''; bytes.forEach((b) => (bin += String.fromCharCode(b)));
  const out = btoa(bin);
  return urlSafe ? out.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') : out;
};
const b64dec = (s: string) => {
  let t = s.trim().replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
  while (t.length % 4) t += '=';
  const bin = atob(t);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
};

export function Base64Tool() {
  const [mode, setMode] = useState<'enc' | 'dec'>('enc');
  const [input, setInput] = useState('Hello, world! Ünïcödé works too ✓');
  const [urlSafe, setUrlSafe] = useState(false);
  const res = useMemo(() => {
    if (!input) return { out: '', error: '' };
    try { return { out: mode === 'enc' ? b64enc(input, urlSafe) : b64dec(input), error: '' }; }
    catch { return { out: '', error: mode === 'dec' ? 'This is not valid Base64, or it decodes to binary data rather than UTF-8 text.' : 'Could not encode input.' }; }
  }, [input, mode, urlSafe]);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <div className="mb-3 flex flex-wrap gap-2">
          <button className={mode === 'enc' ? 'btn' : 'btn-ghost'} onClick={() => setMode('enc')}>Encode</button>
          <button className={mode === 'dec' ? 'btn' : 'btn-ghost'} onClick={() => setMode('dec')}>Decode</button>
          <button className="btn-ghost" onClick={() => { setInput(res.out); setMode(mode === 'enc' ? 'dec' : 'enc'); }} disabled={!res.out}>⇄ Swap</button>
        </div>
        <Label htmlFor="b64-in">{mode === 'enc' ? 'Text to encode' : 'Base64 to decode'}</Label>
        <textarea id="b64-in" className="input h-56" spellCheck={false} value={input} onChange={(e) => setInput(e.target.value)} />
        {mode === 'enc' && <label className="mt-2 flex items-center gap-2 text-sm"><input type="checkbox" checked={urlSafe} onChange={(e) => setUrlSafe(e.target.checked)} /> URL-safe (Base64URL, no padding)</label>}
        {res.error && <Err>{res.error}</Err>}
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between"><span className="text-sm font-semibold">Result</span><CopyButton text={res.out} /></div>
        <textarea aria-label="Result" readOnly className="input h-56" value={res.out} />
      </div>
    </div>
  );
}

// ---------------- URL encoder ----------------
export function UrlEncoder() {
  const [mode, setMode] = useState<'component' | 'full' | 'decode'>('component');
  const [input, setInput] = useState('name=Ali & Sons / café?q=50% off');
  const res = useMemo(() => {
    try {
      if (mode === 'component') return { out: encodeURIComponent(input), error: '' };
      if (mode === 'full') return { out: encodeURI(input), error: '' };
      return { out: decodeURIComponent(input.replace(/\+/g, ' ')), error: '' };
    } catch { return { out: '', error: 'Malformed percent-encoding — check for a stray % sign.' }; }
  }, [input, mode]);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <div className="mb-3 flex flex-wrap gap-2">
          <button className={mode === 'component' ? 'btn' : 'btn-ghost'} onClick={() => setMode('component')}>Encode value</button>
          <button className={mode === 'full' ? 'btn' : 'btn-ghost'} onClick={() => setMode('full')}>Encode full URL</button>
          <button className={mode === 'decode' ? 'btn' : 'btn-ghost'} onClick={() => setMode('decode')}>Decode</button>
        </div>
        <Label htmlFor="url-in">Input</Label>
        <textarea id="url-in" className="input h-48" spellCheck={false} value={input} onChange={(e) => setInput(e.target.value)} />
        <p className="mt-2 text-xs text-muted">{mode === 'component' ? 'Encodes every reserved character (& = ? / #) — use for query-string values.' : mode === 'full' ? 'Keeps URL structure (: / ? & =) intact — use for a whole address with spaces or accents.' : 'Turns %20, %26 etc. back into readable characters. “+” is treated as a space.'}</p>
        {res.error && <Err>{res.error}</Err>}
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between"><span className="text-sm font-semibold">Result</span><CopyButton text={res.out} /></div>
        <textarea aria-label="Result" readOnly className="input h-48" value={res.out} />
      </div>
    </div>
  );
}

// ---------------- JWT decoder ----------------
const sample = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggRGV2Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU5ODIwMDAwLCJleHAiOjE3OTEzNTYwMDB9.sample-signature-not-verified';
export function JwtDecoder() {
  const [token, setToken] = useState(sample);
  const res = useMemo(() => {
    const t = token.trim().replace(/^Bearer\s+/i, '');
    if (!t) return null;
    const parts = t.split('.');
    if (parts.length < 2) return { error: 'A JWT has three parts separated by dots: header.payload.signature' };
    try {
      const header = JSON.parse(b64dec(parts[0]));
      const payload = JSON.parse(b64dec(parts[1]));
      return { header, payload, sig: parts[2] || '' };
    } catch { return { error: 'Could not decode — the header or payload is not valid Base64URL-encoded JSON.' }; }
  }, [token]);
  const now = Math.floor(Date.now() / 1000);
  const time = (k: string, v: unknown) => (typeof v === 'number' && ['exp', 'iat', 'nbf', 'auth_time'].includes(k) ? new Date(v * 1000).toUTCString() : null);
  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="jwt-in">Paste a JWT (the “Bearer ” prefix is fine)</Label>
        <textarea id="jwt-in" className="input h-28 break-all" spellCheck={false} value={token} onChange={(e) => setToken(e.target.value)} />
        <p className="mt-1 text-xs text-muted">Decoding happens in your browser — the token is never sent anywhere. This tool does not verify the signature.</p>
      </div>
      {res && 'error' in res && res.error && <Err>{res.error}</Err>}
      {res && 'payload' in res && (
        <>
          {typeof res.payload.exp === 'number' && (
            <p className={`rounded-lg px-3 py-2 text-sm font-semibold ${res.payload.exp < now ? 'bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200' : 'bg-brand-50 text-brand-700 dark:bg-[#10201e] dark:text-brand-200'}`}>
              {res.payload.exp < now ? `Expired ${new Date(res.payload.exp * 1000).toUTCString()}` : `Valid until ${new Date(res.payload.exp * 1000).toUTCString()}`}
            </p>
          )}
          <div className="grid gap-4 lg:grid-cols-2">
            {(['header', 'payload'] as const).map((k) => (
              <div key={k}>
                <div className="mb-1.5 flex items-center justify-between"><span className="text-sm font-semibold capitalize">{k}</span><CopyButton text={JSON.stringify(res[k], null, 2)} /></div>
                <pre className="formula max-h-80 overflow-auto whitespace-pre-wrap break-all">{JSON.stringify(res[k], null, 2)}</pre>
              </div>
            ))}
          </div>
          <table className="w-full text-sm">
            <caption className="mb-2 text-left font-semibold">Claims</caption>
            <tbody>
              {Object.entries(res.payload as Record<string, unknown>).map(([k, v]) => (
                <tr key={k} className="border-t border-line"><td className="py-1.5 pr-3 font-mono">{k}</td><td className="py-1.5 break-all">{JSON.stringify(v)}{time(k, v) && <span className="block text-xs text-muted">{time(k, v)}</span>}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

// ---------------- Timestamp converter ----------------
export function TimestampConverter() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const [ts, setTs] = useState('1767225600');
  const [dt, setDt] = useState('2026-10-07T12:00');
  const fromTs = useMemo(() => {
    const raw = ts.trim();
    if (!/^-?\d+(\.\d+)?$/.test(raw)) return null;
    let n = Number(raw);
    let unit = 'seconds';
    if (Math.abs(n) >= 1e14) { n = n / 1e6; unit = 'microseconds'; }
    else if (Math.abs(n) >= 1e11) { unit = 'milliseconds'; }
    else n = n * 1000;
    const d = new Date(n);
    if (isNaN(d.getTime())) return null;
    return { d, unit };
  }, [ts]);
  const toTs = useMemo(() => { const d = new Date(dt); return isNaN(d.getTime()) ? null : d; }, [dt]);
  const rel = (d: Date) => {
    const s = Math.round((d.getTime() - Date.now()) / 1000);
    const a = Math.abs(s);
    const [v, u] = a < 60 ? [a, 'second'] : a < 3600 ? [Math.round(a / 60), 'minute'] : a < 86400 ? [Math.round(a / 3600), 'hour'] : [Math.round(a / 86400), 'day'];
    return s >= 0 ? `in ${v} ${u}${v === 1 ? '' : 's'}` : `${v} ${u}${v === 1 ? '' : 's'} ago`;
  };
  return (
    <div className="grid gap-6">
      <div className="rounded-xl surface p-4">
        <p className="text-sm text-muted">Current Unix timestamp</p>
        <p className="font-mono text-2xl font-bold tabular-nums">{now === null ? '…' : Math.floor(now / 1000)}</p>
        <div className="mt-2 flex gap-2"><CopyButton text={now ? String(Math.floor(now / 1000)) : ''} label="Copy seconds" /><CopyButton text={now ? String(now) : ''} label="Copy milliseconds" /></div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <Label htmlFor="ts-in">Timestamp → date</Label>
          <input id="ts-in" className="input font-mono" inputMode="numeric" value={ts} onChange={(e) => setTs(e.target.value)} />
          <p className="mt-1 text-xs text-muted">Seconds, milliseconds or microseconds — detected automatically.</p>
          {fromTs ? (
            <dl className="mt-3 divide-y divide-[var(--line)] rounded-xl surface text-sm">
              <Row k="Detected unit" v={fromTs.unit} />
              <Row k="UTC" v={fromTs.d.toUTCString()} />
              <Row k="Your local time" v={fromTs.d.toLocaleString()} />
              <Row k="ISO 8601" v={fromTs.d.toISOString()} />
              <Row k="Relative" v={rel(fromTs.d)} />
            </dl>
          ) : ts && <Err>Enter digits only, e.g. 1767225600</Err>}
        </div>
        <div>
          <Label htmlFor="dt-in">Date → timestamp (your local time zone)</Label>
          <input id="dt-in" type="datetime-local" className="input" value={dt} onChange={(e) => setDt(e.target.value)} />
          {toTs && (
            <dl className="mt-3 divide-y divide-[var(--line)] rounded-xl surface text-sm">
              <Row k="Unix seconds" v={String(Math.floor(toTs.getTime() / 1000))} />
              <Row k="Milliseconds" v={String(toTs.getTime())} />
              <Row k="ISO 8601 (UTC)" v={toTs.toISOString()} />
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}
const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between gap-4 px-4 py-2"><dt className="text-muted">{k}</dt><dd className="break-all text-right font-mono">{v}</dd></div>
);

// ---------------- UUID generator ----------------
export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [upper, setUpper] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [list, setList] = useState<string[]>([]);
  const gen = () => {
    const n = Math.max(1, Math.min(500, count || 1));
    setList(Array.from({ length: n }, () => crypto.randomUUID()));
  };
  useEffect(gen, []); // eslint-disable-line react-hooks/exhaustive-deps
  const shown = list.map((u) => { let x = hyphens ? u : u.replace(/-/g, ''); if (upper) x = x.toUpperCase(); return x; });
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-end gap-3">
        <div><Label htmlFor="uuid-n">How many</Label><input id="uuid-n" className="input w-28" type="number" min={1} max={500} value={count} onChange={(e) => setCount(Number(e.target.value))} /></div>
        <label className="flex items-center gap-2 pb-2.5 text-sm"><input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} /> Uppercase</label>
        <label className="flex items-center gap-2 pb-2.5 text-sm"><input type="checkbox" checked={hyphens} onChange={(e) => setHyphens(e.target.checked)} /> Hyphens</label>
        <button className="btn" onClick={gen}>Generate</button>
        <CopyButton text={shown.join('\n')} label="Copy all" />
      </div>
      <textarea aria-label="Generated UUIDs" readOnly className="input h-64" value={shown.join('\n')} />
      <p className="text-xs text-muted">Version 4 UUIDs from your browser’s cryptographically secure random generator (<code>crypto.randomUUID</code>).</p>
    </div>
  );
}

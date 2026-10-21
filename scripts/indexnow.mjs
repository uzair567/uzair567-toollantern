// After a production build on Vercel, submit every sitemap URL to IndexNow (Bing, Yandex, Seznam, Naver…).
// Never fails the build: any error is logged and ignored.
import { readFileSync } from 'fs';

const KEY = '3dff310b31f4b5f98db7568109fb8e21';
const HOST = 'toollantern.com';

if (process.env.VERCEL_ENV !== 'production') { console.log('[indexnow] skipped (not a production deploy)'); process.exit(0); }
try {
  const xml = readFileSync('out/sitemap.xml', 'utf8');
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => u.startsWith(`https://${HOST}/`));
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
    signal: AbortSignal.timeout(15000),
  });
  console.log(`[indexnow] submitted ${urlList.length} URLs → HTTP ${res.status}`);
} catch (e) {
  console.log('[indexnow] failed (ignored):', e?.message ?? e);
}

# ToolLantern – setup & operations

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # calculator math + search ranking tests
npm run build        # static export to ./out
```

## Where tracking IDs go

Never hard-code IDs. Set them as environment variables (Netlify → Site configuration → Environment variables), then trigger a redeploy. All are read in `src/lib/site.ts`.

| What | Variable | Where it's used |
|---|---|---|
| Live domain | `NEXT_PUBLIC_SITE_URL` | canonical tags, sitemap, Open Graph, schema |
| GA4 Measurement ID | `NEXT_PUBLIC_GA4_ID` | `src/components/Analytics.tsx` (gtag.js) |
| Google Tag Manager | `NEXT_PUBLIC_GTM_ID` | `src/components/Analytics.tsx` — when set, GA4 should be configured inside GTM instead |
| Search Console (HTML tag method) | `NEXT_PUBLIC_GSC_VERIFICATION` | `<meta name="google-site-verification">` via `src/app/layout.tsx` |
| AdSense | `NEXT_PUBLIC_ADSENSE_CLIENT` | `src/components/Analytics.tsx` (loaded lazily) |
| Google Ads conversions | add inside GTM | keep marketing tags in GTM rather than in code |

## Google Search Console

1. Buy the domain and point it at Netlify (Netlify → Domain management → Add domain; follow its DNS records).
2. Set `NEXT_PUBLIC_SITE_URL` to `https://yourdomain.com` and redeploy — otherwise canonicals point to the netlify.app address.
3. In Search Console add a **Domain property** and verify with the DNS TXT record (preferred), or a URL-prefix property using the HTML tag → put the `content` value in `NEXT_PUBLIC_GSC_VERIFICATION`.
4. Submit `https://yourdomain.com/sitemap.xml` under Sitemaps.
5. Use URL Inspection → Request indexing for the homepage and top 10 tools.

## Adding a tool

1. **Logic** – a calculator: add a `CalcDef` to `src/tools/calc-defs.ts` (fields + pure `compute`). Anything else: add a client component in `src/tools/widgets/` and register it in `src/components/ToolWidget.tsx`.
2. **Content** – add a `ToolContent` entry in `src/lib/content/*.ts` (title ≤ 60 chars, description ≤ 155, about, howTo, formula, example, 3+ FAQs, 4 related tools).
3. Add a test case to `scripts/test-calcs.ts`.
4. The page, sitemap entry, schema, breadcrumbs, search entry and internal links are generated automatically.

Programmatic child pages (like `/electricity-cost-calculator/ac/`) are normal entries with `parent` and `engine` set and their own `defaults`. Only add one when it has its own search intent, different defaults/results and genuinely different copy.

## Redirects

Add permanent redirects to `netlify.toml` (`[[redirects]]` with `status = 301`) whenever a URL changes.

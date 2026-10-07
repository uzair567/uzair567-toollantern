# ToolLantern – SEO & Google Search Console guide

## Key URLs

| What | URL |
| --- | --- |
| Site | https://toollantern.com/ |
| XML sitemap | https://toollantern.com/sitemap.xml |
| robots.txt | https://toollantern.com/robots.txt |

`toollantern.vercel.app` (and the other `*.vercel.app` aliases) permanently redirect to `toollantern.com` via `vercel.json`, so Google sees one host.

## Where SEO settings live

- `src/lib/seo-data.ts` — one entry per tool: primary/secondary keywords, intent, priority (1–4), the "Quick answer" shown under the H1, and optional title / meta description / H1 overrides. Category titles, metas, H1s and intros are in the same file.
- `src/lib/content/*.ts` — the page copy (about, how-to, formula, example, FAQs, related tools).
- `npm test` fails if a tool is missing SEO data, a title is over 65 characters, a meta description is outside 70–160 characters, titles or metas are duplicated, or a Quick-answer link points to a page that doesn't exist.

## Domain verification

The property `https://toollantern.com/` (URL prefix) is verified with an HTML meta tag. The token is stored in the Vercel environment variable `NEXT_PUBLIC_GSC_VERIFICATION` and rendered by `src/app/layout.tsx`. Do not remove that variable or verification is lost on the next deploy.

Optional: also add a **Domain** property (covers http/https and www) by adding the TXT record Search Console gives you in Hostinger → DNS.

## Indexing process

1. Search Console → **Sitemaps** → submit `sitemap.xml`. A "Couldn't fetch" status in the first 1–2 days on a new domain is normal; resubmit if it persists after 48 hours.
2. **URL inspection** → paste a URL → **Test live URL** → **Request indexing**. Daily quota is limited; prioritise priority-1 and priority-2 pages from `seo-data.ts`:
   - /electricity-cost-calculator/ac/, /electricity-cost-calculator/space-heater/, /electricity-cost-calculator/washing-machine/, /electricity-cost-calculator/ceiling-fan/, /electricity-cost-calculator/refrigerator/
   - /electricity-cost-calculator/, /gravel-calculator/, /paypal-fee-calculator/, /stripe-fee-calculator/, /break-even-calculator/
3. **Pages** report (Indexing → Pages): check "Why pages aren't indexed". "Discovered – currently not indexed" on a new site usually clears with time and internal links; "Duplicate without user-selected canonical" should not appear (every page has a canonical).
4. After adding new tools, the sitemap updates on deploy automatically; request indexing for the new URLs.

## Monitoring queries

Search Console → **Performance** → Search results:

- Turn on **Total clicks, Total impressions, Average CTR, Average position**.
- **Queries** tab shows what people searched; **Pages** tab shows which URL appeared.
- Set the date range to **Last 28 days** and compare to the previous period (Date → Compare).

### Pages gaining impressions
Performance → Pages → Date → Compare "Last 28 days" vs "Previous period" → sort by **Impressions difference**. Pages rising here are the ones Google is testing; strengthen them first (better answer, example, internal links from related tools).

### High impressions, low CTR
Performance → Pages (or Queries) → sort by **Impressions** → look at rows with CTR under ~2% and average position under 10. Fix by rewriting the `title` / `metaDescription` override in `seo-data.ts` to match the exact query wording, then deploy. Re-check after 2–3 weeks.

### Queries ranking 8–20 ("striking distance")
Performance → Queries → filter **Position** greater than 7 → sort by impressions. For each, make sure the matching page answers that exact question (often a new FAQ or a line in the Quick answer). These are the fastest wins.

## Ground rules

- Don't create pages without a real calculator or a real reason to exist (no doorway pages).
- Don't reuse paragraphs across pages.
- Don't add FAQ entries just for schema; FAQ rich results are now limited by Google to a few site types, so FAQs are there for readers.
- Keep pages static and light: no new heavy dependencies, no pop-ups.

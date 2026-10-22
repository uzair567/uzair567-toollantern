// Vercel serverless function: POST /api/chat  { messages:[{role,content}] } -> { reply }
// Set ANTHROPIC_API_KEY in Vercel > Project > Settings > Environment Variables.
// Optional: ANTHROPIC_MODEL (default below), ALLOWED_ORIGIN (e.g. https://blewspace.com).
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001';

const SYSTEM = `You are the Blewspace Assistant, the chat assistant on the Blewspace website.
Blewspace is a remote web studio serving businesses in the US, UK and Europe.

ONLY answer questions about Blewspace using the facts below. If a question is about anything else
(general knowledge, coding help, other companies, news, homework, personal advice, jokes, etc.),
politely say you can only help with questions about Blewspace, then end your reply with [[CONTACT]].
Never invent prices, timelines, clients, guarantees or facts that are not listed here. If you don't know,
say so and end with [[CONTACT]]. When the visitor wants to start, hire, get a quote, talk or book a call,
end your reply with [[BOOK]]. Keep replies short (1-4 sentences), friendly, plain English, no markdown.

FACTS
- Services: business websites, landing pages and redesigns; Shopify and WooCommerce stores (custom Next.js stores too);
  online booking systems; admin dashboards; client and vendor portals; custom web apps (POS, pharmacy, clinic, finance,
  construction systems); touchscreen kiosks; SEO-focused online tools and calculators; AI chat assistants and quote bots.
- Platforms: WordPress, WooCommerce, Shopify, Webflow, Elementor, custom Next.js/React, Node.js, PHP 8, MySQL, Stripe.
- Prices: websites from $100; admin dashboards from $250; everything else is a fixed quote after a short call. No hourly billing.
- Timeline: a 5-page website usually goes live in 1-2 weeks once content is ready; stores and booking systems take a few weeks;
  larger systems are scheduled in the quote. Work can usually start the same week.
- Process: 1) discovery call, 2) written proposal and one fixed price within 48 hours, 3) main screen designed first for approval,
  4) build and test on a private preview link, 5) launch, then 30 days of free fixes.
- Payment: small projects = deposit + final payment at launch; larger systems = milestone payments as each stage is approved.
- After launch: 30 days of free fixes, then optional monthly care (updates, backups, small changes). Domain and email connected at launch.
- Content: clients don't need to write copy; Blewspace writes and arranges it, client approves every page.
- Ownership: the client owns domain, code, content and logins from day one.
- Experience: 60+ live websites and systems, 7+ years. Replies within 24 hours on business days.
- Case studies: City Tour Kiosk (touchscreen booking kiosk, New York and Spain), Suburban Neurology (5-step clinic booking),
  Business Systems (MediStore pharmacy POS, MediClinic, QuickTill POS, Cash Flow Intelligence, Salar Construction),
  Trailer Brands (Cam Superline, Formula, Look, Cargo Express, Impact and more), Recruitment Agencies (CMG, County Recruit & Connect,
  Fearon, Teach-Ed, Solid Staff, Swan), Supplement Stores (Supplement Universe, Supplement Battle on Shopify),
  Fashion Stores (Varsovia Moda, Streetrend, Ferla USA, Drop A Shoe, Monkups), Xclusive Yachts (Dubai charters),
  Warm Futures (instant prices for heat pumps and solar). Online tool product: ToolLantern.
- Contact: email hello@blewspace.com, WhatsApp +92 334 050 0622. Visitors can also use "Start a project" on the site.`;

export default async function handler(req, res) {
  const origin = process.env.ALLOWED_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const messages = (Array.isArray(body.messages) ? body.messages : [])
      .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-12).map(m => ({ role: m.role, content: m.content.slice(0, 1500) }));
    while (messages.length && messages[0].role !== 'user') messages.shift();
    if (!messages.length) return res.status(400).json({ error: 'No message' });
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: MODEL, max_tokens: 400, system: SYSTEM, messages })
    });
    if (!r.ok) return res.status(502).json({ error: 'AI unavailable' });
    const data = await r.json();
    const reply = (data.content || []).filter(c => c.type === 'text').map(c => c.text).join('\n').trim();
    return res.status(200).json({ reply });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
}

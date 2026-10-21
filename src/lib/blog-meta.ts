import type { BlogPost } from './blog';
import { getTool } from './tools';

const TOPIC: Record<string, string> = { home: 'Home & garden', energy: 'Energy costs', fitness: 'Fitness', everyday: 'Maths & money', business: 'Maths & money' };
export const topicOf = (p: BlogPost) => TOPIC[getTool(p.tools[0])?.category ?? ''] ?? 'Guides';
export const topics = (ps: BlogPost[]) => [...new Set(ps.map(topicOf))];

const words = (p: BlogPost) => [p.summary, ...p.body.map((b) => b.html), ...p.faqs.map((f) => f.q + ' ' + f.a)].join(' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
export const readMins = (p: BlogPost) => Math.max(2, Math.round(words(p) / 220));
export const anchor = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const fmtDate = (d: string) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
export const coverPath = (p: BlogPost) => `/blog/${p.slug}/cover.png`;

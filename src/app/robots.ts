import type { MetadataRoute } from 'next';
import { absUrl } from '@/lib/site';

export const dynamic = 'force-static';

// Search engines and AI assistants are explicitly welcome: ToolLantern wants to be
// cited by ChatGPT, Perplexity, Claude, Copilot and Google AI features.
const aiAndSearchBots = [
  'Googlebot', 'Bingbot', 'Google-Extended', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User',
  'Applebot', 'Applebot-Extended', 'DuckDuckBot', 'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }, { userAgent: aiAndSearchBots, allow: '/' }],
    sitemap: absUrl('/sitemap.xml'),
  };
}

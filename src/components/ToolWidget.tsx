'use client';

import dynamic from 'next/dynamic';
import { calcDefs } from '@/tools/calc-defs';
import { Calculator } from './Calculator';

const loading = () => <div className="h-64 animate-pulse rounded-2xl surface-2" aria-hidden />;

// Each widget is code-split so a tool page only ships the JS it needs.
const widgets: Record<string, React.ComponentType> = {
  'json-formatter': dynamic(() => import('@/tools/widgets/DevTools').then((m) => m.JsonFormatter), { loading }),
  'base64-encode-decode': dynamic(() => import('@/tools/widgets/DevTools').then((m) => m.Base64Tool), { loading }),
  'url-encode-decode': dynamic(() => import('@/tools/widgets/DevTools').then((m) => m.UrlEncoder), { loading }),
  'jwt-decoder': dynamic(() => import('@/tools/widgets/DevTools').then((m) => m.JwtDecoder), { loading }),
  'unix-timestamp-converter': dynamic(() => import('@/tools/widgets/DevTools').then((m) => m.TimestampConverter), { loading }),
  'uuid-generator': dynamic(() => import('@/tools/widgets/DevTools').then((m) => m.UuidGenerator), { loading }),
  'word-counter': dynamic(() => import('@/tools/widgets/TextTools').then((m) => m.WordCounter), { loading }),
  'case-converter': dynamic(() => import('@/tools/widgets/TextTools').then((m) => m.CaseConverter), { loading }),
  'slug-generator': dynamic(() => import('@/tools/widgets/TextTools').then((m) => m.SlugGenerator), { loading }),
  'utm-builder': dynamic(() => import('@/tools/widgets/TextTools').then((m) => m.UtmBuilder), { loading }),
  'serp-snippet-preview': dynamic(() => import('@/tools/widgets/TextTools').then((m) => m.SerpPreview), { loading }),
};

export function ToolWidget({ engine, defaults }: { engine: string; defaults?: Record<string, string | number> }) {
  if (calcDefs[engine]) return <Calculator engine={engine} defaults={defaults} />;
  const W = widgets[engine];
  if (!W) throw new Error(`No widget for engine "${engine}"`);
  return <W />;
}

export const hasWidget = (engine: string) => Boolean(calcDefs[engine] || widgets[engine]);

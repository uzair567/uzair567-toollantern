import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return { name: site.name, short_name: site.name, description: site.description, start_url: '/', display: 'standalone', background_color: '#fafaf7', theme_color: '#0f766e', icons: [{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' }] };
}

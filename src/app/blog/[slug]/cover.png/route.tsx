import { ImageResponse } from 'next/og';
import { posts } from '@/lib/blog';
import { covers } from '@/lib/blog-art';

export const dynamic = 'force-static';
export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

// Cover illustration for each guide, rendered to a static PNG at build time.
export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svg = covers[slug].svg();
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  // eslint-disable-next-line @next/next/no-img-element
  return new ImageResponse(<img src={src} width={1200} height={630} alt="" />, { width: 1200, height: 630 });
}

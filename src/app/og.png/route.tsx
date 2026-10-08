import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

// Social share image, rendered to a static PNG at build time.
export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px', background: '#f6f3ee' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: 52, fontWeight: 800, color: '#0e1726' }}>
          <div style={{ width: 96, height: 96, borderRadius: 24, background: '#0e1726', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="68" height="68" viewBox="0 0 48 48" fill="none" stroke="#ffb547" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 9h12M24 9v4m-8 4h16l2 6v12l-2 5H16l-2-5V23z" /><path d="M24 25v7" /></svg>
          </div>
          ToolLantern
        </div>
        <div style={{ marginTop: 56, fontSize: 76, fontWeight: 800, color: '#0e1726', lineHeight: 1.05, letterSpacing: '-2px' }}>Free online tools for</div>
        <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, color: '#0e1726', lineHeight: 1.05, letterSpacing: '-2px' }}>
          <span style={{ background: '#ffd48a', padding: '0 12px' }}>everyday work.</span>
        </div>
        <div style={{ marginTop: 40, fontSize: 32, color: '#6b645a' }}>Image converters · Calculators · Fitness · Developer & SEO tools</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

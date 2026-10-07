import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

// Social share image, rendered to a static PNG at build time.
export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px', background: '#fafaf7', borderBottom: '24px solid #0f766e' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: 52, fontWeight: 700, color: '#14161a' }}>
          <div style={{ width: 88, height: 88, borderRadius: 22, background: '#0f766e', display: 'flex', alignItems: 'center', justifyContent: 'center', }}><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6M12 3v2m-4 2h8l1 3v7l-1 3H8l-1-3v-7z" /><path d="M12 11v4" stroke="#f59e0b" strokeWidth="2.4" /></svg></div>
          ToolLantern
        </div>
        <div style={{ marginTop: 60, fontSize: 68, fontWeight: 700, color: '#14161a', lineHeight: 1.1 }}>Free online tools that solve</div>
        <div style={{ fontSize: 68, fontWeight: 700, color: '#0f766e', lineHeight: 1.1 }}>everyday problems</div>
        <div style={{ marginTop: 40, fontSize: 32, color: '#5b616b' }}>Calculators · Converters · Developer & SEO tools</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

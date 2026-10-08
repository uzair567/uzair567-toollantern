import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0e1726' }}>
        <svg width="35" height="35" viewBox="0 0 48 48" fill="none" stroke="#ffb547" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 9h12M24 9v4m-8 4h16l2 6v12l-2 5H16l-2-5V23z" /><path d="M24 25v7" /></svg>
      </div>
    ),
    { width: 48, height: 48 },
  );
}

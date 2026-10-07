import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f766e', }}><svg width="360" height="360" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6M12 3v2m-4 2h8l1 3v7l-1 3H8l-1-3v-7z" /><path d="M12 11v4" stroke="#f59e0b" strokeWidth="2.4" /></svg></div>
    ),
    { width: 512, height: 512 },
  );
}

const paths: Record<string, string> = {
  chart: 'M4 19h16M7 16V10m5 6V6m5 10v-4',
  home: 'M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-5H9v5H5a1 1 0 0 1-1-1z',
  bolt: 'M13 3L5 14h6l-1 7 8-11h-6z',
  calc: 'M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 3h8v3H8zm0 6h2m3 0h3m-8 4h2m3 0h3',
  code: 'M9 8l-4 4 4 4m6-8l4 4-4 4',
  text: 'M5 6h14M5 12h14M5 18h9',
  image: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 11l5-5 4 4 3-3 4 4M15.5 9.5h.01',
  ruler: 'M3 17L17 3l4 4L7 21zm4-4l2 2m1-5l2 2m1-5l2 2',
  search: 'M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm9 2l-4.35-4.35',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-15v2m0 16v2M4.2 4.2l1.4 1.4m12.8 12.8l1.4 1.4M2 12h2m16 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
  arrow: 'M5 12h14m-6-6l6 6-6 6',
  'arrow-up-right': 'M7 17L17 7M8 7h9v9',
  chevron: 'M6 9l6 6 6-6',
  grid: 'M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  lock: 'M6 11h12v10H6zm2 0V8a4 4 0 0 1 8 0v3',
  lantern: 'M9 3h6M12 3v2m-4 2h8l1 3v7l-1 3H8l-1-3v-7zm4 4v4',
  upload: 'M12 16V4m-5 5l5-5 5 5M4 20h16',
  download: 'M12 4v12m-5-5l5 5 5-5M4 20h16',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z',
  check: 'M5 12l5 5L20 7',
};

export function Icon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={paths[name] ?? paths.calc} />
    </svg>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { Icon } from './Icon';

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);
  useEffect(() => { setDark(document.documentElement.dataset.theme === 'dark'); }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try { localStorage.setItem('tl-theme', next ? 'dark' : 'light'); } catch { /* storage blocked */ }
  };
  return (
    <button type="button" onClick={toggle} className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted hover:text-[var(--ink)]" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <Icon name={dark ? 'sun' : 'moon'} className="h-4 w-4" />
    </button>
  );
}

// Runs before paint to avoid a flash of the wrong theme.
export const themeScript = `(function(){try{var t=localStorage.getItem('tl-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})();`;

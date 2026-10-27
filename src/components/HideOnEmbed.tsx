'use client';
import { usePathname } from 'next/navigation';

// Hides site chrome (header/footer) on /embed/ pages, which are shown inside other sites' iframes.
export function HideOnEmbed({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return path?.startsWith('/embed/') ? null : <>{children}</>;
}

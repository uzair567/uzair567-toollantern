import Link from 'next/link';

export interface Crumb { name: string; href: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {i === items.length - 1 ? <span aria-current="page" className="text-[var(--ink)]">{c.name}</span> : <Link href={c.href} className="hover:text-[var(--ink)]">{c.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

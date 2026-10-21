import Link from '@/components/A';
import { Icon } from './Icon';

export type CardPost = { slug: string; h1: string; summary: string; topic: string; mins: number; date: string; cover: string; alt: string };

export function BlogCard({ p, priority = false }: { p: CardPost; priority?: boolean }) {
  return (
    <Link href={`/blog/${p.slug}/`} className="group flex flex-col overflow-hidden rounded-[24px] card transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_rgba(14,23,38,.25)]">
      <div className="overflow-hidden">
        <img src={p.cover} alt={p.alt} width={1200} height={630} loading={priority ? 'eager' : 'lazy'} decoding="async" className="aspect-[1200/630] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="w-fit rounded-full surface-2 px-3 py-1 text-xs font-bold">{p.topic}</span>
        <h3 className="mt-3 text-lg font-extrabold leading-snug tracking-tight sm:text-xl">{p.h1}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
        <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-muted"><Icon name="clock" className="h-3.5 w-3.5" />{p.mins} min read<span aria-hidden>·</span>{p.date}</p>
      </div>
    </Link>
  );
}

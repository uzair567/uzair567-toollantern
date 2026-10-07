import NextLink from 'next/link';
import type { ComponentProps } from 'react';

/**
 * Site-wide link: same as next/link but without viewport prefetching.
 * Prefetching every visible tool link downloaded dozens of page payloads on the
 * homepage; pages are static and load fast on click anyway.
 */
export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}

export type CategoryId = 'business' | 'everyday' | 'home' | 'energy' | 'developer' | 'text-seo';

export interface Category {
  id: CategoryId;
  name: string;
  short: string;
  description: string;
  icon: string; // single emoji-free glyph key used by Icon component
}

export interface FAQ { q: string; a: string }

export interface ToolContent {
  slug: string;
  name: string;
  category: CategoryId;
  /** <title> — kept under ~60 chars */
  title: string;
  /** meta description — kept under ~155 chars */
  description: string;
  /** short line under the H1 */
  lead: string;
  /** extra search terms for on-site search (not shown) */
  keywords: string[];
  /** paragraphs, simple HTML allowed (<code>, <strong>, <a>) */
  about: string[];
  howTo: string[];
  formula?: { expression: string; explanation: string[] };
  example?: { title: string; steps: string[] };
  faqs: FAQ[];
  related: string[];
  popular?: boolean;
  /** for programmatic child pages, e.g. electricity-cost-calculator/ac */
  parent?: string;
  /** default values to seed the interactive tool with */
  defaults?: Record<string, string | number>;
  /** which interactive component renders this tool (defaults to slug) */
  engine?: string;
  updated: string;
}

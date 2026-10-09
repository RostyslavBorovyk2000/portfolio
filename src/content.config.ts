import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const kv = z.object({ value: z.string(), label: z.string() });
const node = z.object({ code: z.string(), name: z.string(), sub: z.string() });
const qa = z.object({ q: z.string(), a: z.string() });

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    meta: z.string(),
    summary: z.string(),
    category: z.array(z.string()).default([]),
    order: z.number().default(10),
    featured: z.boolean().default(false),
    has_page: z.boolean().default(true),
    cover: z.string().optional(),
    thumb: z.string().optional(),
    video: z.object({ src: z.string(), poster: z.string().optional(), caption: z.string().optional() }).optional(),
    cover_alt: z.string().default(''),
    images: z.array(z.object({ src: z.string(), alt: z.string(), caption: z.string() })).default([]),
    kpis: z.array(kv).default([]),
    stack: z.array(z.string()).default([]),
    facts: z.array(kv).default([]),
    task_title: z.string().optional(),
    task: z.string().optional(),
    solution_title: z.string().optional(),
    solution: z.string().optional(),
    solution_points: z.array(z.string()).default([]),
    flow: z.array(node).default([]),
    nodes: z.array(node).default([]),
    quote: z.string().optional(),
    cta_title: z.string().optional(),
    cta_text: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    seo_title: z.string(),
    description: z.string(),
    code: z.string(),
    short: z.string(),
    items: z.array(z.string()).default([]),
    price: z.string().default(''),
    order: z.number().default(10),
    has_page: z.boolean().default(false),
    lead: z.string().optional(),
    problem_title: z.string().optional(),
    problem: z.string().optional(),
    includes: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
    steps: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
    related_case: z.string().optional(),
    price_note: z.string().optional(),
    chat_demo: z.boolean().default(false),
    faq: z.array(qa).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    read_minutes: z.number().default(5),
    lead: z.string().optional(),
    related_case: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { cases, services, blog };

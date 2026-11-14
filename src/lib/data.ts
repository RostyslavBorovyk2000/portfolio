import { getCollection } from 'astro:content';
import type { Lang } from '../i18n';

const files = import.meta.glob('../data/*/*.json', { eager: true, import: 'default' }) as Record<string, any>;

/** JSON-дані сторінки: src/data/{lang}/{name}.json */
export function data(lang: Lang, name: string): any {
  const d = files[`../data/${lang}/${name}.json`];
  if (!d) throw new Error(`Немає даних: ${lang}/${name}.json`);
  return d;
}

export const slugOf = (id: string) => id.split('/').slice(1).join('/');
export const langOf = (id: string) => id.split('/')[0] as Lang;

export async function cases(lang: Lang) {
  return (await getCollection('cases', (e) => langOf(e.id) === lang && !e.data.draft))
    .sort((a, b) => a.data.order - b.data.order);
}
export async function services(lang: Lang) {
  return (await getCollection('services', (e) => langOf(e.id) === lang))
    .sort((a, b) => a.data.order - b.data.order);
}
export async function niches(lang: Lang) {
  return (await getCollection('niches', (e) => langOf(e.id) === lang))
    .sort((a, b) => a.data.order - b.data.order);
}
export async function posts(lang: Lang) {
  return (await getCollection('blog', (e) => langOf(e.id) === lang && !e.data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function reviews() {
  return (await getCollection('reviews', (e) => e.data.published))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** **жирний** → <strong>, решта екранується */
export function inline(s = ''): string {
  const esc = s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
  return esc.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
/** Абзаци з порожнім рядком між ними */
export function paras(s = ''): string[] {
  return s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

/** Схожі статті: спершу та сама ніша/кейс, потім спільні теги, потім найновіші */
export async function relatedPosts(lang: Lang, o: { exclude?: string; niche?: string; related_case?: string; tags?: string[] }, limit = 3) {
  const list = (await posts(lang)).filter((p) => p.id !== o.exclude);
  const score = (p: any) =>
    (o.niche && p.data.niche === o.niche ? 4 : 0) +
    (o.related_case && p.data.related_case === o.related_case ? 3 : 0) +
    (o.tags ?? []).filter((t) => p.data.tags.includes(t)).length;
  return list.map((p, i) => ({ p, s: score(p), i })).sort((a, b) => b.s - a.s || a.i - b.i).slice(0, limit).map((x) => x.p);
}

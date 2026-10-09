export const LANGS = ['uk', 'en'] as const;
export type Lang = (typeof LANGS)[number];

/** Шлях сторінки для мови: українська без префікса, англійська з /en */
export function url(lang: Lang, path = '/'): string {
  const p = path.startsWith('/') ? path : '/' + path;
  const withSlash = p.endsWith('/') ? p : p + '/';
  return lang === 'uk' ? withSlash : '/en' + (withSlash === '/' ? '/' : withSlash);
}

/** Той самий шлях без мовного префікса */
export function stripLang(pathname: string): string {
  return pathname.replace(/^\/en(?=\/|$)/, '') || '/';
}

export const OG_LOCALE: Record<Lang, string> = { uk: 'uk_UA', en: 'en_US' };

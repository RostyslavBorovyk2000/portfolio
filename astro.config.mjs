import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://borovyk-automation.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin/') && !page.endsWith('/404/'),
      i18n: { defaultLocale: 'uk', locales: { uk: 'uk-UA', en: 'en-US' } },
    }),
  ],
});

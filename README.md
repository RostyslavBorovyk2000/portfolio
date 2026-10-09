# borovyk-automation.com

Сайт-портфоліо Ростислава Боровика: AI-автоматизація, Telegram-боти, Make.com.

**Стек:** [Astro 5](https://astro.build) (статичний сайт) · Sveltia CMS (адмінка на `/admin/`) · Cloudflare Workers зі static assets (хостинг + форма заявки → Telegram).

## Запуск у себе

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # збірка в dist/
npm run preview  # перегляд зібраного сайту
```

Потрібен Node.js 20+.

## Структура

```
src/
  content/            ← контент у Markdown (редагується і з адмінки)
    cases/{uk,en}/      кейси
    services/{uk,en}/   послуги
    blog/{uk,en}/       статті
  data/{uk,en}/       ← тексти сторінок (JSON): site, home, pages
  views/              ← шаблони сторінок (одні на обидві мови)
  components/         ← кнопки, картки, FAQ, заклик…
  layouts/Base.astro  ← <head>, SEO, шапка, футер
  pages/              ← маршрути: українська без префікса, англійська в /en/
  styles/global.css   ← дизайн Graphite (токени на :root)
  scripts/app.js      ← анімації, кнопки «Магніт», калькулятор, форма
worker/index.js       ← Cloudflare Worker: роздає dist/ і приймає POST /api/lead → Telegram
wrangler.jsonc        ← налаштування Worker
public/
  admin/              ← Sveltia CMS
  img/                ← фото, og.jpg для превʼю в соцмережах
```

## Як додати кейс

- **З адмінки:** `/admin/` → Кейси → New. Заповни українську і англійську вкладки.
- **У коді:** скопіюй `src/content/cases/uk/autohunter.md` у новий файл з тим самим імʼям в `uk/` і `en/`.

Кейс без окремої сторінки: `has_page: false` (картка покаже «Кейс готується»).

## Деплой (Cloudflare Workers)

1. Cloudflare → Workers & Pages → Create application → Import a repository → цей репозиторій.
2. Settings → Build: **Build command** `npm run build`, **Deploy command** `npx wrangler deploy`.
3. Settings → Variables and Secrets → додай **секрети**:
   - `TG_BOT_TOKEN` — токен бота для заявок (@BotFather)
   - `TG_CHAT_ID` — твій chat id
4. Domains → Add custom domain → `borovyk-automation.com`.

Кожен push у `main` автоматично оновлює сайт.

Локально з Worker: створи `.dev.vars` з тими самими змінними і запусти `npm run cf:dev`.

## Адмінка

`/admin/` → **Sign In with Token**: GitHub → Settings → Developer settings → Fine-grained tokens → доступ лише до цього репозиторію, **Contents: Read and write**. Токен зберігається тільки у твоєму браузері.

Локально: запусти `npm run dev`, відкрий `http://localhost:4321/admin/` у Chrome → **Work with Local Repository** → вибери папку проєкту.

## SEO

- окремі `title`/`description` на кожній сторінці, `canonical`, `hreflang` uk/en
- schema.org: Person, ProfessionalService, Service, FAQPage, BreadcrumbList, BlogPosting
- `sitemap-index.xml` генерується автоматично, `robots.txt` закриває `/admin/`
- після запуску: додати сайт у Google Search Console і надіслати sitemap

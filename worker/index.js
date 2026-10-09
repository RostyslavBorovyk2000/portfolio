/**
 * Cloudflare Worker: роздає статичний сайт (dist/) і приймає POST /api/lead —
 * заявку з форми → повідомлення в Telegram.
 * Секрети задаються в Cloudflare (Worker → Settings → Variables and Secrets):
 *   TG_BOT_TOKEN — токен бота для заявок (від @BotFather)
 *   TG_CHAT_ID   — твій chat id (куди надсилати заявки)
 * Make не потрібен: 0 кредитів на заявку.
 */
const MAX = { name: 100, contact: 120, phone: 30, channels: 120, budget: 40, task: 3000 };

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8' } });

const clean = (v, n) => String(v ?? '').replace(/\s+\n/g, '\n').trim().slice(0, n);
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

// Спільні перевірки для форм: секрети, Origin, JSON, антиспам. Повертає body або Response.
async function readForm(request, env) {
  if (!env.TG_BOT_TOKEN || !env.TG_CHAT_ID) return json({ ok: false, error: 'not_configured' }, 500);
  const origin = request.headers.get('Origin') || '';
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ ok: false, error: 'origin' }, 403);
  let body;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'bad_json' }, 400); }
  if (body.website || Number(body.elapsed) < 3000) return json({ ok: true });
  return body;
}

async function sendTg(env, text) {
  const r = await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TG_CHAT_ID, text, parse_mode: 'HTML', disable_web_page_preview: true }),
  });
  return r.ok ? json({ ok: true }) : json({ ok: false, error: 'telegram' }, 502);
}

// Відгук → тобі в Telegram на перевірку. На сайт потрапляє лише після публікації в /admin.
async function handleReview(request, env) {
  const body = await readForm(request, env);
  if (body instanceof Response) return body;
  const rv = {
    name: clean(body.name, 100),
    role: clean(body.role, 120),
    project: clean(body.project, 120),
    text: clean(body.text, 2000),
    rating: Math.min(5, Math.max(1, parseInt(body.rating, 10) || 5)),
  };
  if (!rv.name || !rv.text || body.consent !== 'yes') return json({ ok: false, error: 'required' }, 422);
  const host = new URL(request.url).origin;
  const text = [
    `<b>⭐ Новий відгук з сайту</b> ${'★'.repeat(rv.rating)}${'☆'.repeat(5 - rv.rating)}`,
    '',
    `<b>Ім'я:</b> ${esc(rv.name)}`,
    `<b>Компанія/роль:</b> ${esc(rv.role || '—')}`,
    `<b>Проєкт:</b> ${esc(rv.project || '—')}`,
    '',
    `<b>Відгук:</b>\n${esc(rv.text)}`,
    '',
    `✅ Дозвіл на публікацію: так`,
    `Опублікувати: ${host}/admin/#/collections/reviews/new`,
  ].join('\n');
  return sendTg(env, text);
}

async function handleLead(request, env) {
  if (!env.TG_BOT_TOKEN || !env.TG_CHAT_ID) return json({ ok: false, error: 'not_configured' }, 500);

  // Приймаємо лише запити з нашого сайту
  const origin = request.headers.get('Origin') || '';
  const host = new URL(request.url).host;
  if (origin && new URL(origin).host !== host) return json({ ok: false, error: 'origin' }, 403);

  let body;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'bad_json' }, 400); }

  // Антиспам: приховане поле + надто швидке заповнення (менше 3 с)
  if (body.website || Number(body.elapsed) < 3000) return json({ ok: true });

  const lead = {
    name: clean(body.name, MAX.name),
    contact: clean(body.contact, MAX.contact),
    phone: clean(body.phone, MAX.phone),
    channels: clean(body.channels, MAX.channels),
    budget: clean(body.budget, MAX.budget),
    task: clean(body.task, MAX.task),
  };
  if (!lead.name || !lead.contact || !lead.task) return json({ ok: false, error: 'required' }, 422);

  const page = clean(body.page, 200);
  const lang = body.lang === 'en' ? 'EN' : 'UA';
  const text = [
    '<b>🟡 Нова заявка з сайту</b>',
    '',
    `<b>Ім'я:</b> ${esc(lead.name)}`,
    `<b>Контакт:</b> ${esc(lead.contact)}`,
    `<b>Телефон:</b> ${esc(lead.phone || '—')}`,
    `<b>Зручно:</b> ${esc(lead.channels || '—')}`,
    `<b>Бюджет:</b> ${esc(lead.budget || '—')}`,
    '',
    `<b>Задача:</b>\n${esc(lead.task)}`,
    '',
    `<i>${lang} · ${esc(page)}</i>`,
  ].join('\n');

  const r = await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TG_CHAT_ID, text, parse_mode: 'HTML', disable_web_page_preview: true }),
  });
  if (!r.ok) return json({ ok: false, error: 'telegram' }, 502);
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/lead' || pathname === '/api/lead/') {
      if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405);
      try { return await handleLead(request, env); }
      catch { return json({ ok: false, error: 'server' }, 500); }
    }
    if (pathname === '/api/review' || pathname === '/api/review/') {
      if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405);
      try { return await handleReview(request, env); }
      catch { return json({ ok: false, error: 'server' }, 500); }
    }
    // SEO: одна адреса для кожної сторінки — www → без www, і завжди зі слешем у кінці (301)
    const url = new URL(request.url);
    let moved = false;
    if (url.hostname.startsWith('www.')) { url.hostname = url.hostname.slice(4); moved = true; }
    if (!url.pathname.endsWith('/') && !/\.[a-z0-9]+$/i.test(url.pathname)) { url.pathname += '/'; moved = true; }
    if (moved && (request.method === 'GET' || request.method === 'HEAD')) return Response.redirect(url.toString(), 301);
    return env.ASSETS.fetch(request);
  },
};

/**
 * Cloudflare Worker: роздає статичний сайт (dist/) і приймає POST /api/lead —
 * заявку з форми → повідомлення в Telegram.
 * Секрети задаються в Cloudflare (Worker → Settings → Variables and Secrets):
 *   TG_BOT_TOKEN — токен бота для заявок (від @BotFather)
 *   TG_CHAT_ID   — твій chat id (куди надсилати заявки)
 * Make не потрібен: 0 кредитів на заявку.
 */
const MAX = { name: 100, contact: 120, budget: 40, task: 3000 };

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8' } });

const clean = (v, n) => String(v ?? '').replace(/\s+\n/g, '\n').trim().slice(0, n);
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

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
    // SEO: одна адреса для кожної сторінки — www → без www, і завжди зі слешем у кінці (301)
    const url = new URL(request.url);
    let moved = false;
    if (url.hostname.startsWith('www.')) { url.hostname = url.hostname.slice(4); moved = true; }
    if (!url.pathname.endsWith('/') && !/\.[a-z0-9]+$/i.test(url.pathname)) { url.pathname += '/'; moved = true; }
    if (moved && (request.method === 'GET' || request.method === 'HEAD')) return Response.redirect(url.toString(), 301);
    return env.ASSETS.fetch(request);
  },
};

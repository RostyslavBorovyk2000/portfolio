"""Генератор обкладинок постів 1080×1350 у стилі сайту.
Запуск: python3 tools/covers/render.py [id ...]   (без аргументів — усі з bank.json)
Результат: public/img/posts/post-NN.jpg → https://borovyk-automation.com/img/posts/post-NN.jpg
"""
import json, os, sys, html
from pathlib import Path
from playwright.sync_api import sync_playwright
HERE = Path(__file__).resolve().parent
OUT = HERE.parent.parent / 'public' / 'img' / 'posts'
CSS = (HERE / 'cover.css').read_text()
e = html.escape
RUB = {'Кейс':'d','Ідея для бізнесу':'e','Практика':'f'}

def block(b):
    t = b['type']
    if t == 'list':
        return '<ol class="ls blk" style="--top:620px">' + ''.join(f'<li><b>{i:02d}</b>{e(x)}</li>' for i, x in enumerate(b['items'], 1)) + '</ol>'
    if t == 'term':
        rows = ''.join(f'<p class="{l[2] if len(l)>2 else ""}">' + (f'<span>{e(l[0])}</span>' if l[0] else '') + f'{e(l[1])}</p>' for l in b['lines'])
        return f'<div class="term blk" style="--top:640px">{rows}</div>'
    if t == 'stats':
        n = len(b['items'])
        return f'<div class="stats blk n{n}" style="--top:640px">' + ''.join(f'<div><b>{e(v)}</b><small>{e(l)}</small></div>' for v, l in b['items']) + '</div>'
    if t == 'flow':
        return '<div class="flow blk" style="--top:640px">' + ''.join(f'<div><code>{e(c)}</code><b>{e(n)}</b><span>{e(s)}</span></div>' for c, n, s in b['items']) + '</div>'
    if t == 'chat':
        return '<div class="chat blk" style="--top:600px">' + ''.join(
            f'<p class="{w}">' + (f'<small>{e(m)}</small>' if m else '') + f'{e(x)}</p>' for w, m, x in b['items']) + '</div>'
    if t == 'vs':
        return '<div class="vs blk" style="--top:640px">' + ''.join(f'<div><h3>{e(h)}</h3>' + ''.join(f'<p>{e(p)}</p>' for p in ps) + '</div>' for h, ps in b['cols']) + '</div>'
    return ''

def page(p):
    return (f'<!doctype html><html><head><meta charset="utf-8"><base href="file://{HERE}/"><style>{CSS}</style></head>'
            f'<body><div class="grid"></div><div class="glow"></div><div class="in"><p class="k"><i></i>{e(p["kicker"])}</p>'
            f'<h1>{p["title"]}</h1><p class="sub">{e(p["sub"])}</p></div>{block(p["block"])}'
            f'<div class="ft"><span><i>B</i>BOROVYK AUTOMATION</span><em>borovyk-automation.com</em></div></body></html>')

def main(ids):
    bank = json.loads((HERE / 'bank.json').read_text())
    todo = [p for p in bank if not ids or p['id'] in ids]
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as s:
        b = s.chromium.launch(); pg = b.new_page(viewport={'width': 1080, 'height': 1350})
        for p in todo:
            tmp = HERE / '_tmp.html'; tmp.write_text(page(p))
            pg.goto(tmp.as_uri()); pg.wait_for_timeout(500)
            # блок по центру вільного місця між заголовком і футером
            pg.evaluate("""()=>{const k=document.querySelector('.blk'); if(!k) return;
              const h=document.querySelector('.in').getBoundingClientRect().bottom+50,
                    f=document.querySelector('.ft').getBoundingClientRect().top-50,
                    kh=k.getBoundingClientRect().height;
              k.style.top=Math.max(h, h+(f-h-kh)/2)+'px'}""")
            # перевірка: блок не має залазити на футер, заголовок — на блок
            ov = pg.evaluate("""()=>{const r=s=>document.querySelector(s)?.getBoundingClientRect();
              const a=r('.in'),k=r('.blk'),f=r('.ft');return {head:a.bottom, top:k?k.top:0, bottom:k?k.bottom:0, foot:f.top}}""")
            warn = []
            if ov['head'] > ov['top'] - 30: warn.append(f"заголовок наїжджає на блок ({ov['head']:.0f}>{ov['top']:.0f})")
            if ov['bottom'] > ov['foot'] - 30: warn.append(f"блок наїжджає на футер ({ov['bottom']:.0f}>{ov['foot']:.0f})")
            f = OUT / f"post-{p['id']:02d}.jpg"
            pg.screenshot(path=str(f), type='jpeg', quality=88)
            print(f.name, 'OK' if not warn else '⚠ ' + '; '.join(warn))
        b.close(); tmp.unlink(missing_ok=True)

if __name__ == '__main__':
    main([int(x) for x in sys.argv[1:]])

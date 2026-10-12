# Обкладинки постів

Банк тем і дані для обкладинок — `bank.json` (id, дата, рубрика, тема, заголовок, підзаголовок, блок, brief для AI).

```bash
python3 tools/covers/render.py          # усі
python3 tools/covers/render.py 12 13    # вибрані id
```

Результат: `public/img/posts/post-NN.jpg` (1080×1350, JPG — підходить для Telegram, LinkedIn, Facebook, Instagram).
Після push Cloudflare публікує їх на `https://borovyk-automation.com/img/posts/post-NN.jpg`.

Типи блоків: `list`, `term`, `stats`, `flow`, `chat`, `vs`. У `title` можна `<em>` для золотого акценту.

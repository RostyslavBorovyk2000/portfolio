---
title: "AI-дайджест новин у Telegram"
description: "Сценарій стежить за RSS-стрічками, очищає статті від HTML, AI коротко переказує суть і розсилає новини в Telegram за темами."
meta: "КОНТЕНТ · МОНІТОРИНГ"
summary: "Нова стаття в RSS → AI коротко переказує суть → повідомлення в потрібний Telegram-чат залежно від теми."
category: ["cnt", "mon"]
order: 9
has_page: true
thumb: /img/cases/cover-news.jpg
cover_alt: "AI-дайджест новин у Telegram"
stack: ["MAKE.COM", "RSS", "OPENAI", "TELEGRAM"]
facts:
  - { label: РОЛЬ, value: "Проєкт і розробка" }
  - { label: ТИП, value: "Навчальний проєкт AI LAB" }
  - { label: РІК, value: "2026" }
task_title: "Новини треба читати, а не шукати"
task: "Щоб бути в темі, доводиться щодня переглядати кілька сайтів і читати довгі статті, хоча потрібна лише суть."
solution_title: "Коротко і одразу в Telegram"
solution: "Сценарій реагує на нові статті в RSS, очищає текст від HTML і передає його AI, який робить короткий переказ українською. Роутер розсилає новини в різні чати залежно від теми."
solution_points: ["Моніторинг RSS-стрічок", "Очищення статті від HTML", "Короткий AI-переказ українською", "Розсилка за темами в різні чати"]
flow:
  - { code: "RSS", name: "Нова стаття", sub: "стрічки джерел" }
  - { code: "HTML", name: "Очищення", sub: "лише текст" }
  - { code: "OPENAI", name: "Переказ", sub: "суть у кількох реченнях" }
  - { code: "TELEGRAM", name: "Розсилка", sub: "чат за темою" }
images:
  - { src: /img/cases/news-make.jpg, alt: "Сценарій у Make: RSS → AI → Telegram", caption: "01 · Сценарій у Make: RSS → AI → Telegram" }
cta_title: "Потрібен моніторинг новин?"
cta_text: "Ринок, конкуренти, тендери — розкажіть, за чим треба стежити."
---

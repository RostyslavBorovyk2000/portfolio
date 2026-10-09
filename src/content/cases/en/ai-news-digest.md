---
title: "AI news digest in Telegram"
description: "A scenario watches RSS feeds, strips articles of HTML, has AI summarise them briefly and sends the news to Telegram by topic."
meta: "CONTENT · MONITORING"
summary: "A new RSS article → AI summarises the gist → a message in the right Telegram chat depending on the topic."
category: ["cnt", "mon"]
order: 9
has_page: true
thumb: /img/cases/cover-news-en.jpg
cover_alt: "AI news digest in Telegram"
stack: ["MAKE.COM", "RSS", "OPENAI", "TELEGRAM"]
facts:
  - { label: ROLE, value: "Design and development" }
  - { label: TYPE, value: "AI LAB training project" }
  - { label: YEAR, value: "2026" }
task_title: "News should be read, not searched for"
task: "Staying up to date means checking several sites every day and reading long articles when only the gist is needed."
solution_title: "Short and straight to Telegram"
solution: "The scenario reacts to new RSS articles, strips the HTML and passes the text to AI, which writes a short summary in Ukrainian. A router sends the news to different chats depending on the topic."
solution_points: ["RSS feed monitoring", "Article cleaned of HTML", "A short AI summary", "Routing by topic to different chats"]
flow:
  - { code: "RSS", name: "New article", sub: "source feeds" }
  - { code: "HTML", name: "Clean-up", sub: "text only" }
  - { code: "OPENAI", name: "Summary", sub: "the gist in a few sentences" }
  - { code: "TELEGRAM", name: "Delivery", sub: "chat by topic" }
images:
  - { src: /img/cases/news-make.jpg, alt: "Make scenario: RSS → AI → Telegram", caption: "01 · Make scenario: RSS → AI → Telegram" }
cta_title: "Need news monitoring?"
cta_text: "Market, competitors, tenders — tell me what you need to track."
---

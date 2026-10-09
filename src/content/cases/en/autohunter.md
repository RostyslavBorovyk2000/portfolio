---
title: AutoHunter
description: How I built an AI bot that monitors AUTO.RIA, rates cars against the market, and cut Make usage from 158 to 39 credits per run.
meta: FLAGSHIP · MAKE · SUPABASE · OPENAI · TELEGRAM
summary: An AI hunter for good car deals on AUTO.RIA. It checks new listings every 2 hours, compares the price with the market and sends a Telegram card with advice on what to inspect.
category: [bot, mon]
order: 1
featured: true
cover: /img/card.jpg
cover_alt: Car card in the AutoHunter bot
images:
  - { src: /img/card.jpg, alt: Car card with AI review, caption: 01 · Car card with AI review }
  - { src: /img/monitor.jpg, alt: Monitoring and statistics, caption: 02 · Monitoring and statistics }
kpis:
  - { value: "158 → 39", label: Make credits per run }
  - { value: "622", label: listings processed on day one }
  - { value: "$0.54", label: total AI cost for a day of testing }
  - { value: "≤ 2 h", label: from listing to notification }
stack: [MAKE.COM, SUPABASE, OPENAI, TELEGRAM, PG_CRON]
facts:
  - { label: ROLE, value: Design and development }
  - { label: TYPE, value: "Graduation project, AI LAB" }
  - { label: YEAR, value: "2026" }
task_title: Good deals disappear within hours
task: |
  Good offers on AUTO.RIA go fast. Catching them means scanning hundreds of listings by hand several times a day, comparing prices and filtering out doubtful ones.

  The goal: a system that does it on its own, runs around the clock and costs pennies to maintain.
solution_title: Three scenarios, a database, and AI only where needed
solution: |
  The user sets filters in plain words in Telegram, and AI turns them into search parameters. Every 2 hours the system pulls new listings, calculates the average market price and keeps the ones below market.

  Only the shortlisted cars go to AI for review: pros, risks and an inspection checklist. All heavy logic lives in Supabase SQL functions, so Make spends a minimum of credits.
solution_points:
  - Natural-language filters with a "does this car exist" check
  - Rated against the market, not just "cheap"
  - Invite-code access and a user limit
  - A "nothing found" message so the bot never goes silent
flow:
  - { code: TRIGGER, name: pg_cron, sub: every 2 hours }
  - { code: MAKE · 01, name: Monitoring, sub: AUTO.RIA → new listings }
  - { code: SUPABASE, name: SQL functions, sub: "market price, selection, duplicates" }
  - { code: OPENAI, name: Review, sub: "pros, risks, checklist" }
nodes:
  - { code: MAKE · 02, name: Bot, sub: "dialogue, natural-language filters, saved cars" }
  - { code: MAKE · 03, name: Directory, sub: AUTO.RIA makes and models for precise filters }
  - { code: TELEGRAM, name: Car card, sub: "photo, price vs market, advice, save button" }
quote: By moving the logic into the database, I cut Make usage from 158 to 39 credits per run. AI is called only for cars that have already passed selection.
cta_title: Need similar monitoring?
cta_text: "AutoHunter adapts easily to other marketplaces: real estate, electronics, tenders. Tell me what you need to track."
---

---
title: "AI filter for important email"
description: "AI reviews new Gmail messages in a batch, picks the important ones (security, payments, documents), sends a short digest to Telegram and logs everything to a sheet."
meta: "AI FILTER · GMAIL · TELEGRAM"
summary: "AI reads new emails in one batch, picks the truly important ones — account security, payments, documents — and sends a short digest to Telegram."
category: ["ana", "bot"]
order: 6
has_page: true
thumb: /img/cases/cover-email-en.jpg
cover_alt: "AI filter for important email"
stack: ["MAKE.COM", "GMAIL", "OPENAI", "TELEGRAM", "GOOGLE SHEETS"]
facts:
  - { label: ROLE, value: "Design and development" }
  - { label: TYPE, value: "AI LAB training project" }
  - { label: YEAR, value: "2026" }
task_title: "Important email drowns among newsletters"
task: "Sign-in codes, payment notices and documents get lost among dozens of newsletters and notifications. Checking email every hour is a waste of time."
solution_title: "Only what matters, in Telegram"
solution: "New emails are collected in a batch, so AI is called once for the whole batch instead of once per email. The first step normalises date, sender and text; the second classifies importance by clear criteria.\n\nImportant emails arrive in Telegram as one short message, and the full log goes into Google Sheets."
solution_points: ["Batch processing: one AI call for all new emails", "Clear importance criteria in the prompt", "A Telegram digest in one message", "A log of all emails in a sheet"]
flow:
  - { code: "GMAIL", name: "New emails", sub: "batch for the period" }
  - { code: "OPENAI", name: "Parsing", sub: "date, sender, subject, text" }
  - { code: "OPENAI", name: "Classification", sub: "important or not" }
  - { code: "TELEGRAM", name: "Digest", sub: "important only" }
cta_title: "Drowning in email?"
cta_text: "Tell me which emails are critical for you, and I'll set up a filter for your inbox."
---

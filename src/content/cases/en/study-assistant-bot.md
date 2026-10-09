---
title: "AI study assistant in Telegram"
description: "A Telegram bot that takes tasks in plain language, works out the deadline (\"by Saturday\" → a date), saves it to a sheet and tells you what is still unfinished."
meta: "TELEGRAM · AI ASSISTANT"
summary: "You write \"hand in English homework by Saturday\" — the bot works out the date, saves the task to a sheet and shows what is still unfinished on request."
category: ["bot"]
order: 7
has_page: true
thumb: /img/cases/cover-study-en.jpg
cover_alt: "AI study assistant in Telegram"
stack: ["MAKE.COM", "OPENAI", "TELEGRAM", "GOOGLE SHEETS"]
facts:
  - { label: ROLE, value: "Design and development" }
  - { label: TYPE, value: "AI LAB training project" }
  - { label: YEAR, value: "2026" }
task_title: "Tasks scattered across chats and notes"
task: "Homework and deadlines come from different places, and entering each task into a form with a date is inconvenient, so they get lost."
solution_title: "One message and the task is on the list"
solution: "AI first detects the intent: add a task or show what is unfinished. For a new task it extracts the name, deadline and status, turning \"tomorrow\" or \"next week\" into an exact date.\n\nThe task goes into Google Sheets, and when asked \"what haven't I done?\" the bot lists open tasks with deadlines."
solution_points: ["Intent detection: add or list", "Deadlines in words → exact date", "Google Sheets as the task base", "Open tasks in a single message"]
flow:
  - { code: "TELEGRAM", name: "Message", sub: "task in plain language" }
  - { code: "OPENAI", name: "Intent", sub: "add / list" }
  - { code: "OPENAI", name: "Data", sub: "name, deadline, status" }
  - { code: "SHEETS", name: "List", sub: "save or query" }
images:
  - { src: /img/cases/study-make.jpg, alt: "Make scenario: two bot routes", caption: "01 · Make scenario: two bot routes" }
cta_title: "Need an assistant bot?"
cta_text: "Team tasks, requests, reminders — describe the process and I'll show how to simplify it."
---

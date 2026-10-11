---
title: "AI business cockpit"
description: "One page where the owner and an AI assistant run the week's tasks, content plan, clients and finances together. Interactive demo right on the page."
meta: "COCKPIT · AI ASSISTANT · DASHBOARD"
summary: "The week's tasks, content plan, clients and finances on one screen. The owner ticks things off, the AI assistant updates tasks and statuses by itself. Try the demo below."
category: ["dev", "ana"]
order: 4
has_page: true
thumb: /img/cases/cover-pult.jpg
cover_alt: "Business cockpit: weekly tasks, content, clients and finances"
demo: { src: "/demo/pult/", height: 820 }
stack: ["CLAUDE", "JAVASCRIPT", "REALTIME DB", "TELEGRAM", "MAKE.COM"]
facts:
  - { label: ROLE, value: "Idea, design and development" }
  - { label: TYPE, value: "Own tool, demo for clients" }
  - { label: YEAR, value: "2026" }
task_title: "The business is scattered across ten places"
task: "Tasks in notes, the content plan in a spreadsheet, clients in messengers, expenses in your head. To see how the week is going you open five services, and something always slips."
solution_title: "One screen that updates itself"
solution: "The cockpit gathers what an owner needs every day: the week's tasks, the publishing plan, the client pipeline and the month's balance. Four numbers on top show the state of things at a glance.\n\nData lives in a database, so the cockpit is the same on desktop and phone. The AI assistant has access too: it drafts the weekly plan, ticks off finished work, updates post statuses and logs new clients from incoming requests."
solution_points: ["Owner's and AI assistant's tasks in one list", "Content plan with statuses for autoposting", "Client pipeline: lead, talks, in progress, delivered", "Income, expenses and month balance", "Works on a phone, syncs in real time"]
flow:
  - { code: "OWNER", name: "Owner", sub: "ticks, new rows" }
  - { code: "DB", name: "Database", sub: "tasks, posts, clients, money" }
  - { code: "AI", name: "AI assistant", sub: "plan, statuses, reports" }
  - { code: "AUTO", name: "Automations", sub: "autoposting, leads" }
cta_title: "Want a cockpit like this for your business?"
cta_text: "I'll set it up around your processes: which tasks, which numbers, where leads come from and what the AI should update."
---

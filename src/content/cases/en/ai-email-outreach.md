---
title: "Personalised AI outreach"
description: "New contacts from Google Sheets get a personal email: AI writes a question-style subject with their name and a short text for that specific person."
meta: "CONTENT · EMAIL MARKETING"
summary: "A new row in the sheet → AI writes a personal subject and email for that person → Gmail sends it on your behalf."
category: ["cnt"]
order: 10
has_page: true
thumb: /img/cases/cover-outreach-en.jpg
cover_alt: "Personalised AI outreach"
stack: ["MAKE.COM", "GOOGLE SHEETS", "OPENAI", "GMAIL"]
facts:
  - { label: ROLE, value: "Design and development" }
  - { label: TYPE, value: "AI LAB training project" }
  - { label: YEAR, value: "2026" }
task_title: "Nobody opens template emails"
task: "A mass mailing with the same text looks like spam and gets almost no replies, while writing to everyone by hand takes too long."
solution_title: "Every email reads as if written by hand"
solution: "As soon as a new contact appears in the sheet, AI writes a short question-style subject with the recipient's name, then the email itself, built around their situation without a hard sell. Gmail sends it automatically."
solution_points: ["Trigger: a new row in Google Sheets", "A question-style subject with the recipient's name", "An email for the specific person, no templates", "Sent via Gmail"]
flow:
  - { code: "SHEETS", name: "New contact", sub: "name and details" }
  - { code: "OPENAI", name: "Subject", sub: "a question with the name" }
  - { code: "OPENAI", name: "Email", sub: "personal text" }
  - { code: "GMAIL", name: "Send", sub: "on your behalf" }
images:
  - { src: /img/cases/outreach-make.jpg, alt: "Make scenario: sheet → AI → Gmail", caption: "01 · Make scenario: sheet → AI → Gmail" }
cta_title: "Need personalised outreach?"
cta_text: "Describe who you're writing to and why, and I'll set up emails that get opened."
---

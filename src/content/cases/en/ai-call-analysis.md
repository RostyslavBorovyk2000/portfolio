---
title: "AI analysis of sales calls"
description: "Automatic analysis of sales call recordings: AssemblyAI transcription, an AI summary and sentiment, recommendations to the manager in Telegram and an alert to the head about negative calls."
meta: "AI ANALYTICS · SALES"
summary: "Call recording → transcript → AI summary, sentiment and next steps in a sheet. The manager gets recommendations in Telegram, the head gets an email about negative calls."
category: ["ana", "bot"]
order: 4
has_page: true
thumb: /img/cases/cover-calls-en.jpg
cover_alt: "AI analysis of sales calls"
stack: ["MAKE.COM", "ASSEMBLYAI", "OPENAI", "GOOGLE SHEETS", "TELEGRAM", "GMAIL"]
facts:
  - { label: ROLE, value: "Design and development" }
  - { label: TYPE, value: "AI LAB training project" }
  - { label: YEAR, value: "2026" }
task_title: "The head of sales can't listen to every call"
task: "Managers make dozens of calls, and the head finds out about a problem client when it is already too late. There is no time to re-listen to recordings by hand."
solution_title: "Every call analysed a minute after upload"
solution: "A new recording in a Google Drive folder triggers the scenario: AssemblyAI transcribes it, and AI reviews it like a sales analyst — who is speaking, what was agreed, the sentiment and what to do next. Everything goes into a calls sheet.\n\nThe manager gets a summary with concrete recommendations in Telegram. If the call went badly, the head gets an email right away."
solution_points: ["Audio transcription with speaker detection", "Summary, sentiment and next steps for the CRM", "Recommendations to the manager in Telegram", "Email to the head only about negative calls"]
flow:
  - { code: "GOOGLE DRIVE", name: "New recording", sub: "calls folder" }
  - { code: "ASSEMBLYAI", name: "Transcript", sub: "audio → text" }
  - { code: "OPENAI", name: "Analysis", sub: "summary, sentiment, steps" }
  - { code: "ROUTER", name: "Alerts", sub: "Telegram to manager / email to head" }
images:
  - { src: /img/cases/calls-make.jpg, alt: "Make scenario: from recording to alerts", caption: "01 · Make scenario: from recording to alerts" }
cta_title: "Need call quality control?"
cta_text: "Tell me where your recordings are stored and what matters to track, and I'll show you how to automate it."
---

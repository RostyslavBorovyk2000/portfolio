---
title: "Jarvis — a voice assistant for Windows"
description: "My own voice assistant in Python: wakes up on \"Hey, Jarvis\", understands Ukrainian, replies by voice and controls the computer — apps, volume, media, files, weather, news."
meta: "PYTHON · VOICE AI · CLAUDE"
summary: "A personal Python voice assistant: wakes on \"Hey, Jarvis\", understands Ukrainian, answers by voice and controls the computer."
category: ["dev"]
order: 8
has_page: true
thumb: /img/cases/cover-jarvis-en.jpg
cover_alt: "Jarvis — a voice assistant for Windows"
stack: ["PYTHON", "CLAUDE API", "OPENWAKEWORD", "EDGE TTS", "WINDOWS"]
facts:
  - { label: ROLE, value: "Design and development" }
  - { label: TYPE, value: "Personal project" }
  - { label: YEAR, value: "2026" }
task_title: "I wanted an assistant that really works in Ukrainian"
task: "Off-the-shelf voice assistants understand Ukrainian poorly and can't do what I actually need on my computer."
solution_title: "Python + Claude + voice"
solution: "Jarvis listens for the \"Hey, Jarvis\" wake word locally, with no cloud. Then it records the command, transcribes it, and Claude decides what to do and phrases the answer, which the assistant speaks in a natural Ukrainian voice.\n\nIt opens and closes apps, finds files, controls volume and media, takes screenshots, tells the weather and news and can send a Telegram message. It lives in the Windows tray and starts with the system."
solution_points: ["\"Hey, Jarvis\" wake word detected locally", "Claude API as the brain, Edge TTS as the voice", "Controls apps, files, volume and media", "Weather, news, Telegram messages"]
flow:
  - { code: "WAKE WORD", name: "Hey, Jarvis", sub: "local, no cloud" }
  - { code: "STT", name: "Recognition", sub: "speech → text" }
  - { code: "CLAUDE", name: "Decision", sub: "what to do and say" }
  - { code: "TTS + WINDOWS", name: "Action", sub: "voice and PC control" }
cta_title: "Need your own AI assistant?"
cta_text: "Voice, Telegram or website — tell me what it should be able to do."
---

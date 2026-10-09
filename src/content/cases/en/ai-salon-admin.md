---
title: AI administrator for a beauty salon
description: "A Telegram bot that books clients into a nail studio 24/7: services and masters from Google Sheets, free slots from calendars, AI that understands dates in plain words, reminders a day and an hour before."
meta: AI ASSISTANT · TELEGRAM · MAKE · OPENAI
summary: The bot books clients 24/7, shows masters' free slots, reminds them about the visit and keeps the booking sheet instead of an administrator.
category: [bot]
order: 2
has_page: true
thumb: /img/cases/cover-salon-en.jpg
cover_alt: AI salon administrator — scenario diagram and bot dialogue
kpis:
  - { value: "97 + 6", label: modules in two Make scenarios }
  - { value: "14", label: "logic branches: booking, rescheduling, cancelling" }
  - { value: "24/7", label: bookings without an administrator }
  - { value: "8–10 h", label: "per month freed from messaging (estimate at 30–40 bookings)" }
stack: [MAKE.COM, OPENAI, TELEGRAM BOT API, GOOGLE SHEETS, GOOGLE CALENDAR]
facts:
  - { label: ROLE, value: Design and development }
  - { label: TYPE, value: Case for a nail studio }
  - { label: YEAR, value: "2026" }
task_title: Manual booking eats hours every week and causes mistakes
task: |
  Every booking is a separate chat in Telegram or Instagram: say hello, find out the service, agree on a time, confirm. Then enter it into a spreadsheet by hand.

  Clients write in the evening or at the weekend and wait until morning for an answer. Two clients at the same time, forgotten reschedules, no-shows because people simply forgot.
solution_title: The bot handles every booking conversation
solution: |
  The client picks a service, a master, a date and a free slot with buttons. The date can be typed in words: "on Friday", "in a week", "15.10" — AI works it out. The bot shows only truly free slots, taking the master's schedule, service length and already booked time into account.

  Before saving, the bot checks the calendar once more, so there are never two clients at the same time. Every booking goes to Google Sheets and the right master's calendar automatically. Returning clients aren't asked again: the bot remembers their name and phone.
solution_points:
  - Services, prices, masters and schedules live in Google Sheets, no developer needed
  - "AI understands dates in plain language: \"next Monday\", \"in a week\""
  - Reminders 24 hours and 1 hour before, with a "Reschedule or cancel" button
  - Clients reschedule or cancel on their own in "My bookings"
  - "Protection against double bookings, stale buttons and invalid phone numbers"
flow:
  - { code: TELEGRAM, name: Client, sub: "service, master, date" }
  - { code: OPENAI, name: Dates and slots, sub: "\"on Friday\" → 03.10, free slots" }
  - { code: CALENDAR, name: Check, sub: master's calendar before booking }
  - { code: SHEETS, name: Booking, sub: "Bookings sheet + calendar event" }
nodes:
  - { code: MAKE · MAIN, name: Main scenario, sub: "97 modules: booking, My bookings, reschedule, cancel" }
  - { code: MAKE · REMINDERS, name: Reminders, sub: "every 15 min: 24 h and 1 h before the visit" }
  - { code: DATA STORE, name: Dialogue state, sub: "client step, name, phone, chosen slot" }
images:
  - { src: /img/cases/salon-start.jpg, alt: "Greeting and service choice in the bot (Ukrainian)", caption: "01 · Greeting and services with prices" }
  - { src: /img/cases/salon-slots.jpg, alt: "Choosing a master, date and free time", caption: "02 · Master, date and only free slots" }
  - { src: /img/cases/salon-confirm.jpg, alt: "Booking confirmation and booking list", caption: "03 · Confirmation and My bookings" }
  - { src: /img/cases/salon-reminders.jpg, alt: "Reminders and cancellation", caption: "04 · Reminders and cancellation" }
  - { src: /img/cases/salon-schema.jpg, alt: "Main scenario diagram in Make", caption: "05 · The real scenario diagram in Make" }
quote: "Reminders a day and an hour before plus easy rescheduling reduce no-shows: a client whose plans changed reschedules instead of skipping the visit."
cta_title: Need a booking bot?
cta_text: "Salon, barbershop, clinic, tutor — the logic is the same. Tell me how your clients book today."
---

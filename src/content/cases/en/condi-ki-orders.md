---
title: "Order bot for an air-conditioning installer"
description: "Telegram bot for condi-KI: a manager types or dictates an order, AI turns it into a spreadsheet row and a calendar event, crews get tomorrow's plan every evening, and the owner sees a report in a second."
meta: TELEGRAM BOT · MAKE · OPENAI · GOOGLE
summary: "A manager types or dictates an order by voice. The bot adds it to the spreadsheet and calendar, sends crews their plan for tomorrow and gives the owner a report without phone calls."
category: [bot]
order: 2
featured: true
has_page: true
review_form: true
kpis:
  - { value: "40–60 min", label: "a day freed up for managers (estimate at 8–10 orders)" }
  - { value: "1–2 min", label: "to log an order instead of 5–7 min by hand" }
  - { value: "19:00", label: "every day: tomorrow's plan for each crew" }
  - { value: "1 tap", label: "owner report: today, week, month" }
stack: [MAKE.COM, OPENAI, TELEGRAM BOT API, GOOGLE SHEETS, GOOGLE CALENDAR]
facts:
  - { label: CLIENT, value: "condi-KI, AC installation and service" }
  - { label: ROLE, value: Design and development }
  - { label: YEAR, value: "2026" }
task_title: Orders lived in chats and notebooks
task: |
  Managers took orders in messengers and by phone, then copied them by hand into a spreadsheet and a calendar and forwarded them to crews separately. Some orders got lost and dates got mixed up.

  The owner had no overview: how many orders, for how much, who goes where. Finding out meant calling the managers.
solution_title: One message from a manager, and the order is everywhere it needs to be
solution: |
  A manager writes the order to the bot in plain words or dictates it by voice. AI picks out the client, phone, address, district, date, job and price. The manager checks the card and taps "Save": the order goes into the Google Sheet and the calendar, and the managers' group gets a notification.

  The manager then assigns a crew with a button and can edit an order by simply replying to its card. In the evening the bot reminds what's on for tomorrow and, with one tap, sends each crew its list in their work group.
solution_points:
  - "Orders by text or voice: AI understands natural language"
  - The spreadsheet and calendar fill themselves, no copying by hand
  - "Crew, status, pause or cancel — with buttons"
  - "Every evening, tomorrow's plan goes to each crew's group"
  - "Owner report: count and total for today, the week and the month"
  - "Access for company managers only; owner and managers see different menus"
flow:
  - { code: TELEGRAM, name: Manager, sub: "text or voice" }
  - { code: OPENAI, name: Order parsing, sub: "client, address, date, price" }
  - { code: SHEETS + CALENDAR, name: Record, sub: "sheet row + event" }
  - { code: TELEGRAM, name: Crews and owner, sub: "tomorrow's plan, reports" }
nodes:
  - { code: MAKE · MAIN, name: Main scenario, sub: "intake, edits, crews, report, dispatch" }
  - { code: MAKE · 19:00, name: Evening reminder, sub: "tomorrow's orders + dispatch button" }
  - { code: GOOGLE SHEETS, name: Data and settings, sub: "orders, crews, managers, report formula" }
quote: "Forecast at launch: data is entered once, so no lost orders or date mix-ups, and the owner sees the numbers without a single call."
cta_title: Still taking orders by hand?
cta_text: "Installation, repairs, delivery, cleaning — the logic is the same. Tell me how an order travels from the first call to the job today."
---

---
title: "An AI administrator for a salon: how a bot books clients 24/7"
description: "A breakdown of a Telegram booking bot for a nail studio on Make.com: how AI understands \"on Friday\", why the bot checks the calendar twice, and the pitfalls I hit during launch."
date: 2026-10-09
category: CASE STUDIES
read_minutes: 6
lead: Salon clients write in the evening and at weekends, and the administrator answers in the morning. I built a bot that books on its own — here's how it turned out.
related_case: ai-salon-admin
tags: [TELEGRAM, MAKE.COM, OPENAI, GOOGLE CALENDAR]
---

## Where the routine comes from

For a studio with 30–40 bookings a month, every booking is a separate conversation: say hello, find out the service, pick a master, agree on a time, confirm, enter it into a sheet. By my estimate that's about 15 minutes per booking, or 8–10 hours a month on messaging alone.

Then there are the mistakes: two clients at the same time, forgotten reschedules and no-shows because people simply forgot.

## Six steps from "hi" to a booking

The bot guides the client with buttons: a service with length and price → a master → a date → a free slot → contact details → confirmation. Returning clients aren't asked again because the bot remembers their name and phone.

Services, prices, masters and schedules live in an ordinary Google Sheet. Add a service or change a price and the bot shows it right away. Set "Active: No" and the service disappears from the list. No developer needed.

## Where AI is actually needed

AI isn't here to "chat". It does two things buttons can't:

- understands dates in plain language: "next Monday", "in a week", "15.10";
- calculates truly free slots, taking the master's schedule, service length and already booked time into account.

Everything else is ordinary logic in Make. That's cheaper and more predictable.

## Checking the calendar twice

Between the moment a client sees a free slot and the moment they tap "Confirm", someone else may have taken it. So before saving, the bot checks the master's calendar again. If the slot was just taken, the client sees "Sorry, this time was just booked" and picks another.

> There will never be two clients at the same time, even if they book simultaneously.

## Reminders instead of no-shows

A separate scenario checks the sheet every 15 minutes and sends reminders a day and an hour before the visit. The first one has a "Reschedule or cancel" button: a client whose plans changed reschedules on their own, and the freed slot is immediately available to others.

## Pitfalls

A few things that cost me the most time:

- **Time zone.** It must match in Make (both profile and organisation), in the sheet and in the calendars. Otherwise slots shift by 2–3 hours.
- **Calendar ID.** After connecting Google, Make clears this field. If you pick a calendar from the list, every booking goes to one master. The right way is to map the ID from the masters sheet.
- **One webhook per bot.** If the same bot is connected to another scenario, messages simply won't arrive.
- **Stale buttons.** A client may tap a time button from yesterday's message. The bot ignores it and doesn't create an extra booking.

## The outcome

Booking works at night, at weekends and while the masters are with clients. The sheet is always up to date, with colour-coded statuses and reschedule history. And the administrator spends time on clients in the salon instead of in chats.

The full breakdown with screenshots is in the case study below.

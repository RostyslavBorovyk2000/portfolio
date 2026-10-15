---
title: Auto-posting to Telegram, Facebook and LinkedIn from Google Sheets
description: "How to set up auto-posting to Telegram, Facebook and LinkedIn with Make.com and a Google Sheet: scenario layout, fields, common errors and the credit cost."
date: 2026-10-15
category: MAKE.COM
read_minutes: 6
lead: I write posts once a week in a spreadsheet, and Make publishes them at 10:00 to three networks at once. Here is the setup I built for my own content plan, and the mistakes that cost me an evening.
related_case: ai-autopost
tags: [MAKE.COM, AUTO-POSTING, TELEGRAM, FACEBOOK, LINKEDIN]
---

## Why a small business needs auto-posting

Regular posts are the easiest way to stay on your clients' radar. The hard part isn't what to write — it's publishing every day, in several places, on time. Skip one week and the channel goes quiet.

The fix: write texts in batches when you have time and hand publishing over to automation. No paid SMM tools needed — a Google Sheet and the free Make.com plan are enough.

## How it works

The whole system is one sheet and one Make scenario with five modules:

1. **Google Sheet** — the content plan. One row is one post.
2. **Make, every weekday at 10:00**, looks for a row with today's date and the status "Ready".
3. **A router** sends the post to Telegram, LinkedIn and Facebook — only where the checkbox is ticked.
4. **The last step** sets the status to "Published" and writes the publishing time.

The status protects against duplicates: once published, the scenario won't pick the post again, even if you run it twice.

## The sheet you need

Minimum set of columns:

| Column | Contents |
|---|---|
| date | publishing date as 2026-10-16 |
| text_tg | text for Telegram and Facebook |
| text_li | separate text for LinkedIn |
| image_url | direct link to the image |
| tg / li / fb | checkboxes: where to publish |
| status | Draft → Ready → Published |
| published_at | filled in by Make |

Tip: keep the first row technical (short Latin names) and put human-friendly labels in the second. Make handles short column names better.

## Setting up the scenario in Make

**Finding the post.** Google Sheets → Search Rows, limit 1. Two filters: date equals today and status is "Ready". Always format the date to match the sheet:

```
{{formatDate(now; "YYYY-MM-DD"; "Europe/Kyiv")}}
```

Without it Make compares the sheet with its own date format and finds nothing.

**Telegram.** Telegram Bot → Send a Photo. The bot must be a channel admin. Photo by URL from image_url, caption from text_tg.

**LinkedIn.** LinkedIn → Create a User Image Post. You can pass the image straight from the sheet URL — no need to download the file first. Use "Connections" visibility for the first test, then "Public".

**Facebook.** Facebook Pages → Create a Post with Photos. Photo by URL, caption from text_tg.

**Status update.** Google Sheets → Update a Row, with the row number from the search module.

## Common errors (and how I fixed them)

**"Access Denied" in Facebook.** Make sees your account but not the Page. Fix: in Facebook → Settings → "Apps and websites" remove Make, then create the connection again in Make and tick your Page at the page-selection step.

**Empty page list in Facebook.** You can only publish to a Page, not a personal profile. No Page yet — create one, it takes five minutes.

**"rowNumber missing" error.** The search found nothing, but the update step ran anyway. Add a "row number exists" filter on the update route, and on days without a post the scenario ends quietly.

**Status changed but the post didn't go out.** The update route runs before the social routes. Order: Telegram → LinkedIn → Facebook → sheet update.

**Filter in the wrong place.** The "tg = TRUE" condition belongs on the line before the Telegram module, not before the router. Otherwise a post without the Telegram box won't reach LinkedIn either.

## What it costs

Make counts every step as a credit. A day without a post costs 1 credit (just the search). A day with a post to three networks costs about 5. With three posts a week that's roughly 80 credits a month, while the free Make plan gives 1,000. Auto-posting for one business fits inside the free limit.

## What's next

The same setup extends easily: AI can write drafts into the sheet, and you only review them and set "Ready". That's how [my AI auto-posting case for a Telegram channel](/en/cases/ai-autopost/) works.

Want the same for your business? [Get in touch](/en/contact/) and I'll set it up for your networks.

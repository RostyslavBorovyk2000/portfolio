---
title: AI autoposting for a Telegram channel
description: "Telegram channel automation on Make.com: collecting competitor posts, ranking them by audience reaction, an AI digest with an image and publishing after one tap."
meta: CLIENT · CONTENT · MAKE · OPENAI
summary: Every day the system finds the most engaging AI news from competitors, writes a digest in the channel's voice, draws an image and publishes it after one tap.
category: [cnt, bot]
order: 3
has_page: true
thumb: /img/cases/cover-autopost-en.jpg
cover_alt: AI autoposting — diagram and post draft
kpis:
  - { value: "3", label: Make scenarios working as a pipeline }
  - { value: "Top 5", label: posts by audience reaction every day }
  - { value: "1 tap", label: "from draft to a published post" }
  - { value: "$400", label: "turnkey setup + $75/mo including services" }
stack: [MAKE.COM, OPENAI, TELEGRAM BOT API, GOOGLE SHEETS]
facts:
  - { label: ROLE, value: Design and development }
  - { label: TYPE, value: Client project }
  - { label: YEAR, value: "2026" }
task_title: A daily post takes hours of manual work
task: |
  The owner of an AI channel had to go through dozens of posts in several channels every day, find what actually resonated, rewrite the news in their own voice without copying, and find an image for every post.
solution_title: A pipeline from collection to publishing
solution: |
  At 21:00 the first scenario reads the public pages of source channels, counts views and reactions and filters duplicates. At 21:15 the second one picks the top 5 posts by engagement (ER = reactions ÷ views, so a small channel's viral post doesn't lose to a big one), and OpenAI writes a digest in the channel's style and draws an image.

  The draft goes to the owner's bot. Nothing is published without a "yes": approve, regenerate the text or regenerate only the image. The third scenario reacts to the buttons instantly and publishes the post.
solution_points:
  - "Sources live in Google Sheets: add or disable a channel without touching the scenarios"
  - Ranked by real audience reaction, not by view count
  - In Ukrainian, in the channel's voice, with no copying or made-up facts
  - History of every digest with sources, image prompt and status
flow:
  - { code: "21:00 · MAKE", name: Collect, sub: "new posts from source channels" }
  - { code: "21:15 · ER", name: Rank, sub: top 5 by engagement }
  - { code: OPENAI, name: Digest, sub: "text in channel style + image" }
  - { code: TELEGRAM, name: Approval, sub: "buttons → publish to channel" }
images:
  - { src: /img/cases/autopost-draft.jpg, alt: "Post draft in the bot with approval buttons (Ukrainian)", caption: "01 · Draft in the bot: approve or redo" }
  - { src: /img/cases/autopost-post.jpg, alt: "Published post with an AI image in the channel", caption: "02 · The finished post in the channel" }
quote: "You just tap \"Approve\". The system does the rest."
cta_title: Need autoposting?
cta_text: Send me 10–20 of your posts and a list of sources, and I'll show you what the digests would look like for your channel.
---

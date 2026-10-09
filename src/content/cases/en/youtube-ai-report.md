---
title: "Monthly AI report for a YouTube channel"
description: "A monthly report on YouTube comments: collection via Apify, AI analysis of sentiment, questions and video ideas, a sheet and an HTML email to the author."
meta: "AI ANALYTICS · REPORTS"
summary: "Once a month the system collects comments, AI finds the sentiment, viewers' questions and ideas for new videos, and the author gets a ready report by email."
category: ["ana"]
order: 5
has_page: true
thumb: /img/cases/cover-youtube-en.jpg
cover_alt: "Monthly AI report for a YouTube channel"
stack: ["MAKE.COM", "APIFY", "OPENAI", "GOOGLE SHEETS", "GMAIL"]
facts:
  - { label: ROLE, value: "Design and development" }
  - { label: TYPE, value: "AI LAB training project" }
  - { label: YEAR, value: "2026" }
task_title: "Hundreds of comments nobody reads systematically"
task: "Viewers ask questions and suggest topics for the next videos in the comments, but the author doesn't have time to read everything and draw conclusions."
solution_title: "A ready report by email once a month"
solution: "Apify collects the month's videos and their comments. AI reviews every comment: sentiment (positive, neutral, negative), viewer questions and topic suggestions, including indirect ones like \"it would be great to see…\".\n\nThe results go into a sheet per video, and the author gets a clean HTML email with a summary and recommendations. If the report could not be built, a separate notice is sent so nothing gets lost."
solution_points: ["Videos and comments for the period via Apify", "AI sentiment, questions and video ideas", "A sheet broken down by video", "HTML report by email and a failure notice"]
flow:
  - { code: "APIFY", name: "Collect", sub: "videos and comments for the month" }
  - { code: "OPENAI", name: "Analysis", sub: "sentiment, questions, ideas" }
  - { code: "SHEETS", name: "Sheet", sub: "report per video" }
  - { code: "GMAIL", name: "Email", sub: "HTML report to the author" }
images:
  - { src: /img/cases/youtube-make.jpg, alt: "Make scenario: monthly report", caption: "01 · Make scenario: monthly report" }
cta_title: "Need regular reports?"
cta_text: "YouTube, reviews, CRM or sales — describe what you want to see every month."
---

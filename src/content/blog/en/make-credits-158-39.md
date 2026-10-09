---
title: How I cut Make usage from 158 to 39 credits
description: "A practical breakdown: moving logic from Make.com scenarios into Supabase SQL functions. What changed, how much it saved and when not to do it."
date: 2026-10-06
category: MAKE.COM
read_minutes: 4
lead: One AutoHunter monitoring run used to cost 158 operations. After moving the logic into the database it costs 39. Here's exactly what I changed.
related_case: autohunter
tags: [MAKE.COM, SUPABASE, OPTIMISATION]
---

## The problem

Make bills every module operation. When a scenario loops over hundreds of listings with an iterator and queries the database for each one, credits disappear fast.

## Where the credits went

Three places were the most expensive: duplicate checks, market price calculation and filtering. Each was a separate module running for every listing.

```sql
-- one function instead of three modules per car
select * from pick_deals(:batch);
```

## Logic in SQL

Now Make sends the whole batch of listings to the database in a single request. A Supabase function drops duplicates, calculates the average price and returns only the candidates.

> Make should be the conductor, not the calculator.

## The result

One monitoring run: 158 credits before, 39 after. And when no user has active filters, monitoring doesn't run at all and spends no credits.

## When not to do it

If a scenario handles a few records a day, rewriting it in SQL isn't worth it: the savings will be smaller than the development time.

# PRD — Pest Free

## Problem

Pest-control agencies manage bookings, worker dispatch, and trust/verification
manually. Customers have no visibility into arrival time, worker identity verification,
or live tracking. Pest Free digitizes this for a single agency, end-to-end.

## Goals

- Give the agency a production-ready, Play-Store-launchable app for its owner, workers,
  and customers.
- Slot-based booking with a worker arriving within ~3–6 hours of the slot.
- Full KYC-backed trust: every worker verified before they can accept jobs.
- Live, Rapido/Zomato-style tracking once a job is underway.
- Customer privacy: worker never sees real customer contact/location until the owner
  explicitly permits it, in two separate approval steps.

## Non-goals

- Multiple agencies on one platform / marketplace features (ranking, commission,
  payouts, promotions) — this app is scoped to a single agency.

## User roles

1. **Agency owner** — onboards with a generated unique agency ID + KYC; approves
   worker applications; approves every incoming booking (two-step: assignment, then
   contact release); sees worker-activity analytics.
2. **Worker** — registers on a separate web flow (KYC + license + owner's reference
   ID), approved by the owner, then logs into the worker app with the same mobile
   number; receives masked job details until the owner releases real contact info.
3. **Customer** — existing agency customers onboard directly; new/unknown customers
   discover the agency, view details, and book; sees live tracking once assigned.
4. **Internal admin/developer** — hidden, full-access support view. Not discoverable
   by any other role.

## Core flows

### Booking
Customer books a slot → booking status `pending_owner_approval` → owner approves →
nearest available worker assigned (falls to next-nearest by rating if busy) → worker
sees masked contact only → owner grants second permission → worker gets real
contact/location → job in progress → completed.

### Owner-approval reminders
Automated WhatsApp message + a second channel (SMS/push) + email when a booking is
waiting on the owner.

## Success metrics (suggested — confirm before launch)

- % of bookings approved within X minutes of submission
- Worker arrival-within-window rate (target: 3–6 hours)
- KYC approval turnaround time for new workers
- App crash-free session rate pre-launch

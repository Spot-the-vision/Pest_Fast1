# Implementation Plan — Pest Free

Single-agency build. Target: working prototype in 1 week, full app in 2 weeks, built heavily with AI IDE
agents (each agent should read the root `AGENTS.md` + its app's `AGENTS.md` first).

## Week 1 — shared baseline + parallel builds

**Day 1 (all three, together):** agree on `packages/shared-types` v0 (Booking, Agency,
Worker, Customer — already scaffolded in this repo) and the auth/role model. This is
the one thing that must be shared before splitting off, so nobody builds against a
guess.

**Days 2–7 (parallel):**
- **C:** auth (4 role spaces), booking state machine + two approval gates, worker
  dispatch (PostGIS nearest-worker query), KYC provider integration skeleton, base
  NestJS project structure in `apps/api`.
- **A:** `agency-dashboard` — owner onboarding + KYC submission UI, worker approval
  queue, booking approval queue (two-step), analytics view (against mocked data using
  `packages/shared-types`). `admin-dashboard` — internal auth + base search screens.
- **B:** `customer-app` — agency discovery, booking flow, live-tracking screen shell
  (against mocked data). `worker-app` — login flow, job list with masked/real contact
  states, live-tracking sender shell.

## Week 2 — integration + real backend

- Swap mocked data for real `apps/api` calls in all four frontends (should be
  near-drop-in since everyone built against `packages/shared-types` from day one).
- Wire Socket.IO live tracking end-to-end.
- Wire WhatsApp + SMS/push + email reminders (BullMQ jobs).
- UPI payment integration.
- Security pass: confirm no raw KYC documents anywhere in logs/DB/responses; confirm
  admin-dashboard is unreachable from other surfaces; confirm the two-step contact
  release can't be skipped by a crafted client request.
- Play Store checklist (`docs/shared/play-store-checklist.md`).

## Definition of done

- Owner can onboard, get KYC-verified, and approve workers.
- Customer can discover an agency (or use their existing one), book, and see the job
  through to completion with live tracking.
- Worker never sees real customer contact until the second, separate owner permission.
- Admin/developer view exists but is unreachable from any public-facing surface.
- App builds and runs via `pnpm dev` / `pnpm build` across all four apps without
  cross-app file edits in the git history (a quick check that ownership boundaries
  held).

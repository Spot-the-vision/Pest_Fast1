# AGENTS.md — admin-dashboard

Owner: **Person A**. Read the root `AGENTS.md` first — these rules add to it, not replace it.

## What this app is

The hidden, developer/super-admin surface. It is **not** the agency owner's dashboard
(that's `apps/agency-dashboard`). This app must:

- Be reachable only by the internal team (Pintu's team) — no discoverable link, no
  shared login flow with agency owners/workers/customers, no shared nav bar component
  that could leak a route to it.
- Provide full-access views for support/debugging: agencies, workers, bookings, KYC
  status, live worker-activity counts by location.
- Never expose customer PII beyond what's needed for support (mask by default, reveal
  on explicit action + audit log).

## Boundaries

- Only edit files under `apps/admin-dashboard/`.
- Consume types from `packages/shared-types` — never redefine a `Booking`, `Agency`,
  `Worker`, etc. locally. If a type is missing a field you need, flag it for C.
- Shared UI components go through `packages/ui-kit`; don't fork a component from
  `agency-dashboard` — extract it to `ui-kit` if both need it (and say so, since
  `ui-kit` is shared with B too).

## Auth model to implement

Internal-team-only auth (separate role/credential space from agency owner logins).
Do not reuse the agency owner's auth flow or session shape for this app's login.

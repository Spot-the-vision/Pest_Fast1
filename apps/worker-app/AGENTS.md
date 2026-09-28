# AGENTS.md — worker-app

Owner: **Person B**. Read the root `AGENTS.md` first — these rules add to it, not replace it.

## What this app is

React Native (Expo/EAS) app for pest-control workers. Core flows:

- **No in-app signup.** Workers register on a separate website (KYC + license number +
  the agency owner's reference ID), get approved by the owner, and only then log into
  this app using the same mobile number. Do not add a "become a worker" entry point
  inside this app or inside `customer-app`.
- **Job/booking view:** once the agency owner approves + assigns a booking, the worker
  sees a masked customer name and a proxy/masked phone number — **no location yet**.
  Real phone number + location only unlock after the owner's second, separate
  permission. Build the UI to reflect both states distinctly (e.g. a visible
  "waiting for location release" state), not as one screen that always shows everything.
- **Live tracking:** worker's live location streamed via Socket.IO once a job is active
  and released, similar to Rapido/Zomato.
- **Ratings:** worker rating affects assignment priority when the nearest worker is busy.

## Boundaries

- Only edit files under `apps/worker-app/`.
- No backend or migration work — ever. If a screen needs new data, request the field/
  endpoint from C via `packages/shared-types`, don't implement it yourself.
- Consume types from `packages/shared-types`; never define your own `Booking`/`Worker`
  shapes locally.
- Shared components live in `packages/ui-kit` — coordinate with A before changing one
  that admin/agency-dashboard also uses.

# AGENTS.md — api

Owner: **Person C** (sole owner of backend, DB, and contracts). Read the root
`AGENTS.md` first — these rules add to it, not replace it.

## What this app is

NestJS/TypeScript backend for Pest Free. Responsibilities:

- Auth (separate role spaces: customer, worker, agency owner, internal admin — do not
  share session/token shape across roles).
- Booking lifecycle: create → pending owner approval → approved → worker assigned
  (masked contact) → real contact released (second owner permission) → in progress →
  completed. Enforce both approval gates server-side, never trust the client to have
  respected them.
- Worker/agency dispatch: nearest available worker by geo (PostGIS), fallback to next
  nearest by rating if busy.
- Live tracking via Socket.IO.
- KYC: integrate e-KYC provider, store only verification tokens/status — never raw
  Aadhaar/PAN/voter ID (see `docs/shared/security-privacy.md`).
- Payments: UPI via payment gateway.
- Notifications: WhatsApp + secondary channel + email for owner-approval reminders.

## Boundaries

- You own `apps/api/`, `packages/db/`, and `packages/shared-types/` — no one else edits
  these directly.
- When A or B requests a new field/endpoint, add it to `packages/shared-types` first
  (as its own small PR) so they can build against it before the real implementation
  lands.
- Review and merge every migration PR, including ones A drafted under
  `packages/db/migrations/` — check against the live schema before merging.
- Do not let frontend concerns (formatting, display strings) leak into
  `shared-types` — that package is data shape only.

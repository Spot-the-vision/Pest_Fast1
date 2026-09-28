# AGENTS.md — agency-dashboard

Owner: **Person A**. Read the root `AGENTS.md` first — these rules add to it, not replace it.

## What this app is

The agency owner's web dashboard. Core flows:

- **Owner onboarding:** unique agency ID generated on signup; owner submits KYC
  (Aadhaar, PAN, bank account, voter ID) via the e-KYC provider — never store raw
  documents/numbers, only the provider's verification token/status.
- **Worker management:** approve worker applications (worker submits KYC + owner's
  reference ID); fully manage workers under the agency.
- **Booking approval (two-step):**
  1. Every incoming customer booking lands here first for approval — nothing is
     auto-assigned.
  2. After the owner approves, the worker is assigned but only sees a masked name +
     proxy phone number, no location.
  3. The owner must grant a **second, separate** permission before the worker receives
     the real phone number and location. Do not collapse these two steps into one.
- **Owner-approval reminders:** trigger WhatsApp + another channel (SMS/push) + email
  when a booking is waiting on the owner.
- **Analytics view:** live/daily worker-activity counts by location (how many workers
  active today in a given state/area).

## Boundaries

- Only edit files under `apps/agency-dashboard/`.
- Consume types from `packages/shared-types` — request new fields from C rather than
  redefining shapes locally.
- May draft migration files under `packages/db/migrations/` when a screen needs a new
  column/table (e.g. analytics aggregates) — open a PR but do not merge it; C reviews
  and merges.
- Shared components live in `packages/ui-kit`; flag before editing one worker-app/
  customer-app also uses.

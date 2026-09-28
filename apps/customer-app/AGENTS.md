# AGENTS.md — customer-app

Owner: **Person B**. Read the root `AGENTS.md` first — these rules add to it, not replace it.

## What this app is

React Native (Expo/EAS) app for customers. Opening the app always shows customer UI
directly — **there is no "sign up as worker/rider" option anywhere in this app**;
that's a separate flow entirely (see `apps/worker-app/AGENTS.md`).

Core flows:

- **Existing agency customers:** onboard directly onto the platform under their agency.
- **New/unknown customers:** discover top-rated agencies (ranked by location — nearest
  top agency differs by area), view agency details + nearby verified workers, and book.
- **Booking:** slot-based; on submit, the booking goes to the agency owner for approval
  first (not auto-assigned). After approval + worker assignment, the customer sees
  live end-to-end tracking of the worker (Rapido/Zomato-style), arrival target
  ~3–6 hours from slot.
- **Payments:** UPI via payment gateway.

## Boundaries

- Only edit files under `apps/customer-app/`.
- No backend or migration work — ever. Request new fields/endpoints from C via
  `packages/shared-types`.
- Consume types from `packages/shared-types`; never define local `Booking`/`Agency`
  shapes.
- Shared components live in `packages/ui-kit` — coordinate with A before changing one
  that admin/agency-dashboard also uses.

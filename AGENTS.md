# AGENTS.md — Pest Free monorepo

Instructions for any AI coding agent (Claude Code, Cursor, Google Antigravity, etc.)
working in this repository. App-specific agents should also read the `AGENTS.md`
inside the app folder they're working in — it takes precedence over this file for
anything specific to that app.

## What this project is

Pest Free connects a pest-control agency, its workers, and its customers — booking,
dispatch, KYC-verified workers, and live tracking, for a single agency. Full specs
live in `docs/`. **Read the relevant PRD and TRD before generating code for a feature
you haven't seen before.**

## Hard boundaries — do not cross these

- Never edit files outside the app/package you were asked to work in. This repo's
  merge strategy depends on ownership staying clean:
  - `apps/admin-dashboard`, `apps/agency-dashboard` → owned by person A
  - `apps/worker-app`, `apps/customer-app` → owned by person B
  - `apps/api`, `packages/db`, `packages/shared-types` → owned by person C
- If a task seems to require changing `packages/shared-types`, **stop and propose the
  type change as its own, separate diff** rather than editing it inline — that package
  has a single owner (C) by design.
- Never invent a new top-level folder. If something doesn't fit the existing structure,
  say so instead of restructuring the repo.

## Domain rules the code must respect (do not silently drop these)

- Every customer booking goes to the agency owner for approval first — nothing is
  auto-assigned to a worker.
- Once approved, the assigned worker sees only a **masked name and proxy phone number**,
  no location. The owner must grant a **second, separate** permission before the worker
  receives the real phone number and location.
- KYC: never store raw Aadhaar/PAN/voter ID — only e-KYC provider tokens/verification
  status, per `docs/shared/security-privacy.md`.
- The developer/super-admin view inside `admin-dashboard` must be unreachable from any
  agency owner, worker, or customer surface — no visible link, no shared nav, no shared
  auth role that could expose it accidentally.
- Workers register through a separate flow (KYC + license + agency owner's reference ID,
  approved by the owner) before they ever see the worker app — do not add a "sign up as
  worker" option inside `customer-app`.

## Before you generate code

1. Check `packages/shared-types` for the data shape you need. If it doesn't exist yet,
   flag it rather than guessing the shape.
2. Check the relevant file in `docs/` (PRD, TRD, workflow, ui-ux, backend-schema) for
   the intended flow — don't infer behavior from folder/file names alone.
3. Match the existing patterns in the app you're working in rather than introducing a new
   library or pattern for something already solved elsewhere in that app.

## When you're unsure

Prefer asking (or leaving a `// TODO(agent): confirm with C — ...` comment for
backend/schema questions) over guessing on anything involving money (UPI/payments),
KYC/PII, or the masked-contact/approval logic above.

# AGENTS.md — Pest Free Monorepo

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
  - `apps/admin-dashboard`, `apps/agency-dashboard` ➔ owned by Person A (web frontend)
  - `apps/worker-app`, `apps/customer-app` ➔ owned by Person B (mobile/web frontend)
  - `apps/api`, `packages/db`, `packages/shared-types` ➔ owned by Person C (backend/schema)
- If a task seems to require changing `packages/shared-types`, **stop and propose the
  type change as its own, separate diff** rather than editing existing contracts inline — that package
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

---

## 📜 Full Changelog, Issue Resolution & Architecture Ledger

### 1. Initial State & Discovered Issues
- **Orphan Codebase**: Functional frontend dashboards existed in a temporary folder (`proj/pest-fast`) disconnected from the official GitHub collaboration repository (`Spot-the-vision/Pest_Fast1`).
- **Missing Module Resolutions**:
  - The shared packages (`ui-kit` and `shared-types`) were not linked in the root workspace, causing `Rolldown failed to resolve import "ui-kit"`.
  - Vite bundlers by default failed resolving JSX entrypoints (`index.jsx`) from package directories.
- **Port Collisions**:
  - All four applications were defaulting to port `5173`, making concurrent local testing impossible.
- **Windows Process Spawning Failures**:
  - Running `npm run dev --workspaces` on Windows exited with code 1 due to non-interactive stdin closure and nested `.cmd` shim path resolution bugs.
- **UTF-8 BOM Corruption**:
  - Early PowerShell-generated JSON files wrote UTF-8 Byte Order Marks (`\uFEFF`), which crashed Node.js and PostCSS parsers (`SyntaxError: Unexpected token '﻿', "﻿{"`).

### 2. Engineering Solutions Implemented
- **Direct Orchestrator Runner (`dev.mjs`)**:
  - Created a unified Node.js process runner (`dev.mjs`) utilizing native `child_process.spawn`.
  - Reliably spawns all four apps with colored terminal logging and clean SIGINT/SIGTERM shutdown handling.
  - Supports running all apps concurrently (`node dev.mjs all` or `npm run dev`) or individually (`node dev.mjs <app>`).
- **Dedicated Port Architecture**:
  - **Customer App**: Moved to **Port 3000** (supports dynamic override via `$env:CUSTOMER_PORT` or CLI argument).
  - **Admin Dashboard**: Fixed to **Port 5174**.
  - **Agency Dashboard**: Fixed to **Port 5175**.
  - **Worker App**: Fixed to **Port 5176**.
- **Robust Vite Path Aliasing**:
  - Added deterministic resolve aliases in each app's `vite.config.js`:
    - `ui-kit` and `@pest-free/ui-kit` ➔ `../../packages/ui-kit/index.jsx`
    - `shared-types` and `@pest-free/shared-types` ➔ `../../packages/shared-types/index.ts`
  - Eliminates dependency on hoisting quirks across different package managers.
- **Shared Types & UI-Kit Integration**:
  - **`packages/shared-types`**: Kept all existing Person C schemas (`booking.ts`, `agency.ts`, `worker.ts`, `customer.ts`) intact and introduced `mock.ts` re-exported in `index.ts` for standalone frontend development.
  - **`packages/ui-kit`**: Created `index.d.ts` type declarations and configured `package.json` with clean dependencies (`react`, `lucide-react`).
- **Official Repo Shift (`Pest_Fast1-main` / `Spot-the-vision/Pest_Fast1`)**:
  - Initialized Git tracking linked to `https://github.com/Spot-the-vision/Pest_Fast1.git`.
  - Created and checked out feature branch: `feat/frontend-dashboards-integration`.
  - Migrated frontend apps into their designated folders:
    - `apps/admin-dashboard/`
    - `apps/agency-dashboard/`
    - `apps/customer-app/`
    - `apps/worker-app/`
  - Preserved existing app-level `AGENTS.md` files in every app folder.
  - Preserved backend (`apps/api/`), database (`packages/db/`), and documentation (`docs/`) untouched.
  - Cleaned all UTF-8 BOM characters across the repo.
  - Verified production build: All 4 apps successfully built with 0 errors via `vite build`.

---

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

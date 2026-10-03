# AGENTS.md — Pest Free Workday Auto-Apply Bot & App

Scope: **Workday only** for the bot. **Pest Free customer-app + worker-app** for the marketplace.

---

## Current Application State

### ✅ Completed — Customer App (`apps/customer-app` — Port 3000)
- **Book tab**: 5-step wizard (pest → size+plan → schedule → address → confirm)
  - 6 pest types, 5 property sizes, 3 treatment plans
  - Zod-validated address (min 10 chars)
  - AI smart plan suggestion via `generateSmartQuoteRecommendation()`
  - Live price calculator with GST breakdown
  - Inspection mode (₹0 advance) vs Treat-on-arrival
- **Track tab**: 7-state live timeline (BOOKING_PLACED → COMPLETED)
  - Animated technician dot on SVG map
  - 4-digit OTP shown ONLY when status = ARRIVED
  - Cancel button ONLY before ON_THE_WAY
  - Technician card with KYC badge
- **History tab**: Past bookings, 1-5 star rating, Rebook button
- **PWA-ready**: Manifest configured, fonts loaded, theme-color set
- **Design system**: `#FFF4C2` canvas, `#1F5B3A` primary, Bricolage Grotesque + Figtree

### ✅ Completed — Worker App (`apps/worker-app` — Port 5176)
- **Job tab**: State-gated flow across all 7 booking states
  - BOOKING_PLACED: "Awaiting agency approval" spinner
  - AGENCY_APPROVED: Masked name/phone/area + Accept button
  - TECHNICIAN_ACCEPTED: "Waiting for contact unlock" with prep checklist
  - ON_THE_WAY: Full address unlocked, ETA countdown, Mark Arrived (disabled until ETA=0)
  - ARRIVED: 4-digit OTP input (4 separate digit fields, auto-advance, backspace)
  - IN_PROGRESS: 6-step safety checklist + after-photo capture
  - COMPLETED: Payout confirmation
- **Route tab**: Today's stops with status badges and payout
- **Earnings tab**: Today/week stats, safety bonus, UPI link, instant payout with confirmation sheet
- **Safety tab**: CSDS sheets, emergency exposure protocol, AI chat assistant
- **Header**: Duty toggle (On duty / On job / Off duty) + Emergency SOS confirmation sheet
- **State sync**: Polls `/api/state` every 3 s for customer-app cross-port sync

### ✅ Completed — Admin Dashboard (`apps/admin-dashboard` — Port 5174)
- **Multi-Desk Operations Console**: System Core, Agency KYC Audit Desk, Customer Dispute Desk, and Platform Financials & Take-Rate Settlements
- **Platform Overview Engine**: Live telemetry, cluster node latency, PostGIS queries, worker telemetry modal, masked PII inspector, and dynamic Voronoi mesh routing calculator
- **Security & Hub Controls**: Super-Admin modal, Hubs management, Two-Step Security Audit modal, API & Socket.IO streams, and Redis cache flusher

### ✅ Completed — Agency Dashboard (`apps/agency-dashboard` — Port 5175)
- **Live Ops Map & Dispatch**: Real-time worker position tracking, target focus, dynamic rerouting, and booking assignment
- **Worker Fleet & Rosters**: Active technician roster, shift management, license compliance, and safety equipment verification
- **Interactive Controls**: Dispatcher profile modal, toast notifications, and client service history view

### ✅ Completed — Shared Business Logic (`apps/customer-app/src/lib/api/index.ts`)
- `calculatePrice()` — base × size × plan + 18% GST, ₹0 for inspection
- `scoreAndRankWorkers()` — filters non-KYC/OFF_DUTY, scores distance 50% + rating 35% + load 15%
- `transitionBooking()` — enforces all legal/illegal state machine transitions
- `SAFETY_CHECKLIST_STEPS` — 6 PPE/protocol steps
- `BUNDLED_CHEMICAL_SHEETS` — Deltamethrin, Imidacloprid, Fipronil CSDS data
- `generateSmartQuoteRecommendation()` — AI suggestion (object param)
- `answerWorkerSafetyQuestion()` — CSDS-only answers, explicit "don't know" for unknowns
- `TIME_SLOTS`, `PLANS` (alias for TREATMENT_PLANS)

### ✅ Completed — Cross-Port Sync
- Both Vite servers expose `/api/state` (GET/POST) via middleware plugin
- Shared file: `.pest-free-live-state.json` at project root
- Worker app polls every 3 s

### ✅ Completed — Unit Tests (`apps/customer-app/src/lib/api/__tests__/api.test.ts`)
- `calculatePrice()` — inspection=₹0, GST calculation, size/plan multipliers
- `scoreAndRankWorkers()` — KYC filter, OFF_DUTY filter, ranking
- `transitionBooking()` — 8 legal + 6 illegal transitions
- `generateSmartQuoteRecommendation()` — pest/size combos
- `answerWorkerSafetyQuestion()` — known + unknown chemicals

---

## Workflow Rules

- **Smallest diff per phase** — no speculative scope.
- **Test before marking done** — live Workday URL only for bot; build+vitest for app.
- **No paid tools** — flag before adding.
- **Ask if ambiguous** — check docs or ask project owner.
- **Update STATE.md after every commit.**
- **Update CODEBASE-ANALYSIS.md at every commit** touching lib/, cli.mjs, or config/.

---

## Code Generation Tool

**Antigravity CLI (`agy`)** is the sole code generation tool for this project.

---

## Scope Boundary

- **In scope (Local Phase — Bot):** `lib/discovery.mjs`, `scanner.mjs`, `workdayDom.mjs`, `planner.mjs`, `fields.mjs`, `engine.mjs`, `workday.mjs`, `qaStore.mjs`, `learner.mjs`, `reporter.mjs`, `cli.mjs`, `config/*.yml`
- **In scope (App Phase — complete):** `apps/customer-app`, `apps/worker-app`
- **Out of scope permanently:** non-Workday ATS adapters, any UI beyond Telegram for bot, resume-content-generation

---

## Workday-Specific Rules (Bot)

- Authentication before scanning
- Post-signup redirect handling
- Multi-step wizard loop (3–5 pages, vary per requisition)
- DOM-first `[data-automation-id]` patterns
- Force clicks for modals `{ force: true }`
- Honeypot filtering: skip `data-automation-id="beecatcher"`, `name="website"`, `type="hidden"`
- Fuzzy-match Q&A cache before escalation
- Compliance questions always require human-sourced answer

---

## Checkpoint Pattern

```
Given [precondition],
When  [action],
Then  [result].
```

Checkpoint must pass on a real Workday URL before commit. No mocks.

---

## Git & Branching

- Branch: `fix/workday-{issue}` or `feat/workday-{feature}` or `feat/pest-free-{feature}`
- Commit: `[Workday]`, `[Customer]`, `[Worker]`, `[Shared]`, `[Tests]`, `[Docs]`
- No merge until checkpoint passes

---

*Last updated: 2026-10-03 — Admin + Agency dashboards integrated, monorepo refactored to Turborepo 2.x standards, unused boilerplate & dead screens purged, 28/28 unit tests passing.*
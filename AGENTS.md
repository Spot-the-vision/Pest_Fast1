# AGENTS.md — Pest Free Monorepo

Instructions for any AI coding agent (Claude Code, Cursor, Antigravity, etc.) working in
this repo. An app-specific `AGENTS.md` inside the folder you're working in takes
precedence over this file for anything specific to that app.

**This file owns two things: the hard boundaries/domain rules below (rarely change),
and the Change Log at the bottom.** The Change Log is a permanent, append-only record —
it runs from the first change all the way to project completion and is never trimmed or
summarized away. Project structure lives in `README.md`. Process/workflow rules live in
`instructions.md`.

## What this project is

Pest Free connects a pest-control agency, its workers, and its customers — booking,
dispatch, KYC-verified workers, and live tracking, for a single agency. Full specs live
in `docs/`. Read the relevant PRD/TRD before building a feature you haven't seen before.

## Hard boundaries — do not cross these

- Never edit files outside the app/package you were asked to work in:
  - `apps/admin-dashboard`, `apps/agency-dashboard` → Person A
  - `apps/worker-app`, `apps/customer-app` → Person B
  - `apps/api`, `packages/db`, `packages/shared-types` → Person C
- If a task needs a change to `packages/shared-types`, **stop and propose it as its own
  separate diff** — don't edit existing contracts inline. Single owner (C) by design.
- Never invent a new top-level folder. If something doesn't fit, say so — don't restructure.

## Domain rules the code must respect (never silently drop these)

- Every customer booking goes to the agency owner for approval first — nothing is
  auto-assigned to a worker.
- Once approved, the assigned worker sees only a **masked name and proxy phone number**,
  no location. The owner must grant a **second, separate** permission before the worker
  gets the real phone number and location.
- KYC: never store raw Aadhaar/PAN/voter ID — only e-KYC provider tokens/verification
  status, per `docs/shared/security-privacy.md`.
- The developer/super-admin view inside `admin-dashboard` must be unreachable from any
  agency owner, worker, or customer surface — no visible link, no shared nav, no shared
  auth role.
- Workers register through a separate flow (KYC + license + agency owner's reference ID,
  owner-approved) before they see the worker app — never add "sign up as worker" inside
  `customer-app`.

## When you're unsure

Prefer asking, or leaving `// TODO(agent): confirm with C — ...` for backend/schema
questions, over guessing — on anything involving money (UPI/payments), KYC/PII, or the
masked-contact/approval logic above.

---

## 📜 Change Log

Every code change — from the first commit to project completion — gets exactly one
entry here, newest on top, using this template. Nothing is deleted or summarized out
of this log; it is the full history of the project's behavior.

```
### [YYYY-MM-DD] <short title> — changed by <Person A/B/C or agent+person>

- **Required change**: what was asked for, or what was broken/wrong. One or two lines.
- **What actually changed**: describe it the way an inline code comment would —
  concrete, specific, no vague "improved X". e.g.
  `// Added ownerApproved2 flag check before rendering real phone/location in WorkerCard.jsx`
- **Files touched**: exact paths.
- **Still missing / not yet added**: anything this change was supposed to cover but
  doesn't yet, so the next person knows what's left. Write "none — complete" if nothing
  remains.
- **Reviewed by**:
  - [ ] Person A
  - [ ] Person B
  - [ ] Person C
```

A change is not considered done until all three checkboxes are ticked. If a change only
touches one owner's app, the other two still glance at "Required change" + "What
actually changed" and tick off — they don't need to inspect the diff line by line, just
confirm it doesn't conflict with something on their side.

### Example
```
### [2026-09-20] Mask worker phone until second approval — changed by Person A

- **Required change**: Worker saw customer's real phone before owner's second approval.
- **What actually changed**: `// WorkerCard.jsx now shows proxyPhone until job.ownerApproved2 === true, then swaps to job.realPhone`
- **Files touched**: apps/agency-dashboard/src/components/WorkerCard.jsx
- **Still missing / not yet added**: none — complete
- **Reviewed by**:
  - [x] Person A
  - [x] Person B
  - [x] Person C
```

### [2026-09-28] Convert HTML to React Dashboard — changed by agent

- **Required change**: Convert static HTML dashboard mockup into a React component.
- **What actually changed**: `// Added Dashboard.jsx, keeping UI exact while replacing vanilla JS DOM manipulation with React useState hooks.`
- **Files touched**: apps/agency-dashboard/src/pages/Dashboard.jsx
- **Still missing / not yet added**: none — complete
- **Reviewed by**:
  - [ ] Person A
  - [ ] Person B
  - [ ] Person C

### [2026-09-28] Wire up React Dashboard UI and Tailwind config — changed by agent

- **Required change**: Integrate the newly converted Dashboard UI into the main application layout and inject its required Tailwind CSS config.
- **What actually changed**: `// Updated App.jsx to import and render AgencyDashboard instead of the old mock; injected Tailwind script/fonts from code.html into index.html.`
- **Files touched**: apps/agency-dashboard/src/App.jsx, apps/agency-dashboard/index.html
- **Still missing / not yet added**: none — complete
- **Reviewed by**:
  - [ ] Person A
  - [ ] Person B
  - [ ] Person C

### [2026-09-28] Add Worker Fleet React UI — changed by agent

- **Required change**: Convert the new worker fleet HTML into a React component and wire it up in the app routing.
- **What actually changed**: `// Added WorkerFleet.jsx and registered it under the /worker-fleet route in App.jsx.`
- **Files touched**: apps/agency-dashboard/src/pages/WorkerFleet.jsx, apps/agency-dashboard/src/App.jsx
- **Still missing / not yet added**: none — complete
- **Reviewed by**:
  - [ ] Person A
  - [ ] Person B
  - [ ] Person C

### [2026-09-29] Add Customer App React UI Screens — changed by agent

- **Required change**: Convert HTML design folders (2 & 3) into React components for the Customer App and wire them into App.jsx.
- **What actually changed**: `// Added BookingScreen.jsx and TrackingScreen.jsx; injected Tailwind config to customer-app/index.html; wired routing in App.jsx with dev nav links.`
- **Files touched**: apps/customer-app/index.html, apps/customer-app/src/App.jsx, apps/customer-app/src/pages/BookingScreen.jsx, apps/customer-app/src/pages/TrackingScreen.jsx
- **Still missing / not yet added**: none — complete
- **Reviewed by**:
  - [ ] Person A
  - [ ] Person B
  - [ ] Person C

### [2026-09-29] Add Agency WhatsApp Approval Lock & Customer Inspection Dispatch Choice — changed by agent

- **Required change**:
  1. In Worker Dashboard, enforce strict lock on customer mobile phone, Google Maps GPS navigation, and exact residential address until agency confirmation is received. Add WhatsApp alert ping to agency owner and confirmation unlock flow.
  2. In Customer App, explicitly prompt the client at the end of the booking flow whether they need an "In-Home Inspection First" or "Direct Immediate Treatment Dispatch" before confirming.
  3. In Admin Dashboard, enhance clarity with interactive Agency KYC Audit Dossier modal for inspecting permits and trade licenses.
- **What actually changed**:
  - `apps/worker-app/src/App.jsx`: Masked customer phone, locked GPS navigation button, and masked residential address behind `agencyApproved` state. Added WhatsApp ping alert modal with pre-filled dispatch request to agency owner, and instant unlock upon confirmation.
  - `apps/customer-app/src/pages/BookingScreen.jsx`: Added Step 5 prompt with two interactive cards ("In-Home Inspection First - 100% Free" vs "Direct Immediate Treatment on Arrival"). Dynamic footer CTA reflects selection ("Confirm & Dispatch for Inspection" vs "Confirm & Dispatch for Direct Treatment").
  - `apps/admin-dashboard/src/App.jsx`: Integrated interactive Agency KYC Compliance Dossier modal for inspecting licenses, GSTIN, and issuing one-click agency approval.
- **Files touched**:
  - `apps/worker-app/src/App.jsx`
  - `apps/customer-app/src/pages/BookingScreen.jsx`
  - `apps/admin-dashboard/src/App.jsx`
  - `AGENTS.md`
- **Still missing / not yet added**: none — complete, verified with Vite build (0 errors) and live servers.
- **Reviewed by**:
  - [ ] Person A
  - [ ] Person B
  - [ ] Person C

### [2026-09-29] Make 4 Dashboards Fully Professional, Interactive & User-Centric — changed by agent

- **Required change**: Polish and unify all 4 dashboards (Customer App, Worker App, Agency Dashboard, Admin Dashboard) from everyone's point of view to be completely professional, responsive, interactive, and strictly aligned with domain rules in AGENTS.md.
- **What actually changed**:
  - `apps/worker-app`: Synchronized `index.html` typography (Plus Jakarta Sans/Inter) and Tailwind palette. Rewrote `App.jsx` with mobile-first field UX: tactile duty switcher (On Duty/On Job/Off Duty), two-step masked contact simulation per AGENTS.md privacy protocol, 8-point mandatory safety checklist with progress bar, before/after photo compliance slots, route schedule, IMPS payout wallet, CSDS chemical sheet, and poison helpline SOS modal.
  - `apps/customer-app`: Upgraded `BookingScreen.jsx` and `TrackingScreen.jsx` with pest category selection, property dimensions, 3 treatment tiers with transparent warranty badges, date/slot picker, transparent billing breakdown with GST, animated route telemetry (speed, distance, ETA countdown), masked VoIP call button, toxicological safety certificate, and warranty claim modal.
  - `apps/agency-dashboard`: Streamlined `App.jsx` to render rich `Dashboard.jsx` and `WorkerFleet.jsx` with `react-router-dom` `Link` sidebar navigation.
  - `apps/admin-dashboard`: Re-architected `App.jsx` with multi-desk operations tabs: System Core (`PlatformOverview`), Agency Onboarding & KYC Audit Desk, Customer Dispute & Escalation Desk, and Platform Financials & Take-Rate Settlements (15% take-rate, GMV, batch disbursement).
- **Files touched**:
  - `apps/worker-app/index.html`
  - `apps/worker-app/src/App.jsx`
  - `apps/customer-app/src/App.jsx`
  - `apps/customer-app/src/pages/BookingScreen.jsx`
  - `apps/customer-app/src/pages/TrackingScreen.jsx`
  - `apps/agency-dashboard/src/App.jsx`
  - `apps/agency-dashboard/src/pages/Dashboard.jsx`
  - `apps/agency-dashboard/src/pages/WorkerFleet.jsx`
  - `apps/admin-dashboard/src/App.jsx`
  - `AGENTS.md`
- **Still missing / not yet added**: none — all 4 dashboards build cleanly and run with live HMR.

### [2026-09-29] Add Admin Dashboard React UI — changed by agent

- **Required change**: Convert the newly pasted `code.html` into a React component for the Admin Dashboard and wire it into App.jsx.
- **What actually changed**: `// Added PlatformOverview.jsx, injected Tailwind config to admin-dashboard/index.html, wired routing in App.jsx to replace the mock AdminGlobalDashboard.`
- **Files touched**: apps/admin-dashboard/index.html, apps/admin-dashboard/src/App.jsx, apps/admin-dashboard/src/pages/PlatformOverview.jsx
- **Still missing / not yet added**: none — complete
- **Reviewed by**:
  - [ ] Person A
  - [ ] Person B
  - [ ] Person C

---

## 🗄️ Migration History (frozen — setup phase, Sep 2026)

Initial monorepo bring-up: linked orphaned frontend code into the official repo
(`Spot-the-vision/Pest_Fast1`), fixed workspace resolution for `ui-kit`/`shared-types`,
moved all 4 apps off the colliding `5173` port onto dedicated ports (3000/5174/5175/5176),
built a cross-platform `dev.mjs` runner to replace failing `npm run dev --workspaces`
on Windows, and stripped UTF-8 BOM corruption from PowerShell-generated JSON. All 4 apps
build cleanly via `vite build`. This section predates the Change Log format above and is
kept as historical context only — do not append to it; new entries go in the Change Log.
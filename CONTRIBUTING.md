# CONTRIBUTING.md ? Team Governance & Workflow Rules

This document establishes the collaboration rules for our 3-person engineering team (**Engineer A**, **Engineer B**, and **Engineer C**).

---

## 1. Ownership Boundaries

| Team Member | Domain & Paths | Permissions & Responsibilities |
|---|---|---|
| **Engineer A** | `apps/agency-dashboard/`<br>`apps/admin-dashboard/` | Full frontend ownership of Agency & Admin dashboards. May draft DB migrations in `packages/db/migrations/` via PR, but **never merges them**. Never edits backend code directly. |
| **Engineer B** | `apps/customer-app/`<br>`apps/worker-app/` | Full frontend ownership of Customer & Worker mobile web apps. Consumes `@pest-free/shared-types` and `@pest-free/api-client`. No backend edits, no DB migrations. |
| **Engineer C** | `apps/api/`<br>`packages/db/`<br>`packages/shared-types/`<br>`packages/api-client/`<br>`dev.mjs` | Sole owner of backend APIs, PostgreSQL + PostGIS schemas, DB migrations, and shared API contracts. Sole person authorized to merge database migrations. |
| **Shared** | `packages/ui-kit/`<br>`packages/shared-hooks/`<br>`packages/shared-utils/`<br>`packages/shared-config/` | Maintained collaboratively. **Rule:** Post in the team channel before editing any shared component that another developer's app depends upon. |

---

## 2. Branching Strategy

- `main`: Protected production branch. Always deployable and verified.
- `dev`: Integration branch for daily development.
- Feature branches prefixed by author:
  - `a/<feature-name>` (e.g. `a/agency-fleet-roster`)
  - `b/<feature-name>` (e.g. `b/customer-upi-qr`)
  - `c/<feature-name>` (e.g. `c/postgis-hex-schema`)

---

## 3. 3-Step Feature Workflow

When building a feature that touches both frontend and backend:
1. **Contract First (Engineer C):** C defines or updates the shared model in `packages/shared-types` and opens a small PR.
2. **UI Implementation (Engineer A or B):** A or B builds the UI against the shared schema using mock data.
3. **Endpoint Connection (Engineer C -> A/B):** C builds the real backend endpoint. A or B replaces the mock with the live call and verifies.

---

## 4. Pull Request & Code Review Checklist

Every PR must be reviewed by at least one other team member. Before approving, check off:
- [ ] **UI Unchanged:** UI is pixel-identical to the agreed designs.
- [ ] **Labels & Copy Unchanged:** Word-for-word match on all copy, titles, and placeholders.
- [ ] **Shared Components Reused:** Used `@pest-free/ui-kit` instead of creating ad-hoc buttons/modals.
- [ ] **Zero Dead Code:** No commented-out code, unused imports, or leftover console logs.
- [ ] **Responsive & App-Ready:** Tested on mobile viewport (`375px`) and desktop viewport (`1280px`).
- [ ] **Pure JavaScript:** Strictly no raw HTML or TypeScript files introduced.
- [ ] **Build & Tests Pass:** `npm run build` and `npm test` exit with code 0.

### Commit Message Format
`<area>: <what changed>`
Examples:
- `ui-kit: Add responsive bottom sheet behavior to Modal`
- `customer: Reorganize booking steps into modular feature components`
- `api: Add atomic state merge lock to live state sync`

---

## 5. Who is Working on What (Active Roster)

| Engineer | Active Branch | Feature / Area | Status | Target Date |
|---|---|---|---|---|
| **Engineer A** | `a/admin-modularization` | Agency & Admin Dashboards UI refactoring | In Progress | Q4 2026 |
| **Engineer B** | `b/app-ready-mobile` | Customer & Worker app feature modularization | In Progress | Q4 2026 |
| **Engineer C** | `c/api-client-sync` | Real-time state persistence & PostGIS integration | In Progress | Q4 2026 |

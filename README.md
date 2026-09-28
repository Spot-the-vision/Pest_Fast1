# Pest_Fast (Pest Free Monorepo)

A production-oriented platform connecting a pest-control agency, its field workers, and
customers — single-agency booking, dispatch, KYC-verified workers, and live tracking.

**This file is the single source of truth for structure and status.** If you need to
understand what the project is or where something lives, read this file — not the code.
For *why* something is built a certain way or *what changed recently*, see `AGENTS.md`.
For *how to work on this repo as an agent*, see `instructions.md`.

---

## 👥 Team & Ownership Boundaries

| Role / Person | Owns | Responsibilities |
|---|---|---|
| **Person A** | `apps/admin-dashboard`, `apps/agency-dashboard` | Super-admin & agency owner dashboards (Web, React + Vite) |
| **Person B** | `apps/worker-app`, `apps/customer-app` | Worker portal & customer booking app (React / Expo) |
| **Person C** | `apps/api`, `packages/db`, `packages/shared-types` | NestJS backend, PostgreSQL/Prisma schemas, contracts |

Full boundary rules (what you may/may not touch) live in `AGENTS.md` — don't duplicate them here.

---

## 🌐 Running Applications & Ports

| Application | URL | Port | Notes |
| :--- | :--- | :--- | :--- |
| **Customer App** | http://localhost:3000/ | `3000` | Customer browsing & booking |
| **Admin Dashboard** | http://localhost:5174/ | `5174` | Hidden developer & super-admin metrics |
| **Agency Dashboard** | http://localhost:5175/ | `5175` | Agency dispatch, worker approvals, bookings |
| **Worker App** | http://localhost:5176/ | `5176` | Worker registration, KYC, job dispatch |

---

## 🔑 Login Credentials (mock auth — dev only)

**Admin Dashboard (5174)** — Super-admin: `admin@pestfast.com` / any password. Agency-sim mode: any other email / any password.
**Agency Dashboard (5175)** — Any agency email (e.g. `ecopest@pestfast.com`) / any password.
**Worker App (5176)** — Any name + 10-digit mobile → PAN `ABCDE1234F`, Aadhaar `123456789012`, Voter ID `VOTER12345` → Verify.
**Customer App (3000)** — Name + mobile → Send OTP → any 4-digit OTP → Verify.

---

## 🏗️ Monorepo Structure

**Convention:** every entry below has a comment — what it is, and *why* it exists if
that isn't obvious from the name alone. When you add a new file or folder, add its
comment here, in the tree, at the moment you add it — don't leave it for someone else
to guess later. If a folder has subfolders whose purpose isn't self-evident (e.g. a new
migration), list and comment those too, going only as deep as needed to explain the why.

```
pest-free/ (Pest_Fast1)
├── apps/
│   ├── admin-dashboard/     # Person A — Super-admin & platform metrics (5174)
│   ├── agency-dashboard/    # Person A — Agency operations & worker dispatch (5175)
│   ├── customer-app/        # Person B — Customer booking experience (3000)
│   ├── worker-app/          # Person B — Worker onboarding, KYC & active jobs (5176)
│   └── api/                 # Person C — NestJS backend API
├── packages/
│   ├── shared-types/        # Person C — Type contracts (booking, agency, worker, customer, mock)
│   ├── ui-kit/              # Person A + B — Shared buttons, alerts, theme tokens
│   ├── db/                  # Person C — Prisma/PostgreSQL schema & migrations
│   │   └── prisma/migrations/
│   │       # ↑ One subfolder per migration. Comment each one when it's added, e.g.:
│   │       # migration1_init/       — initial schema: users, agencies, bookings
│   │       # migration2_add_kyc/    — added worker KYC status + e-KYC token columns
│   │       # (replace with the real migration folder names once they exist —
│   │       #  this is the format to follow, not literal current files)
│   └── config/               # Shared tooling configs (oxlint, tsconfig)
├── docs/                     # PRD, TRD, workflow, UI-UX, backend schema
├── dev.mjs                   # Multi-app process runner — why: npm's built-in
│                             #   `--workspaces` runner hung on Windows and all 4 apps
│                             #   collided on port 5173; this spawns them directly on
│                             #   dedicated ports with clean SIGINT/SIGTERM shutdown.
├── AGENTS.md                 # Boundaries, domain rules, ongoing code-change log
├── instructions.md           # How an AI agent should work in this repo
└── package.json
```

### Rule for adding a new feature
A new feature must slot into the **existing** structure above — inside the owning app's
existing folders, using the existing shared packages. Do not invent new top-level
folders or restructure. If a feature genuinely needs a new shared type or a new package,
that is a separate, explicitly-flagged proposal (see `AGENTS.md` → Hard Boundaries),
not something bundled into the feature diff.

### Rule for documenting a new file/folder
Whenever you add a file or folder anywhere in the tree above, add a `#` comment on that
line (or a short comment block above it, like `dev.mjs`'s) saying:
1. **What it is** — one phrase.
2. **Why it exists** — only if that's not obvious from "what it is" alone (a plain new
   React page doesn't need a "why"; a workaround for a tooling bug does).

Do this in the same change that adds the file — not as a follow-up, and not in
`AGENTS.md` (that file logs *behavior* changes, not file additions).

---

## 💻 Development Commands

```bash
npm install                # install all deps
npm run dev                 # run all 4 apps concurrently
npm run dev:customer        # Customer App → 3000
npm run dev:admin           # Admin Dashboard → 5174
npm run dev:agency          # Agency Dashboard → 5175
npm run dev:worker          # Worker App → 5176
npm run build                # build all apps for production
```

---

## 🚀 Path to Production (status tracker)

| Item | Status |
|---|---|
| Monorepo + workspace linking | ✅ Done |
| 4 apps integrated on dedicated ports | ✅ Done |
| Unified dev runner (`dev.mjs`) | ✅ Done |
| Connect `apps/api` (NestJS) to frontend clients | ⬜ Not started |
| Replace mock booking/service data with live DB queries | ⬜ Not started |
| Real-time Socket.IO dispatch (worker-app + agency-dashboard) | ⬜ Not started |
| Redis GEO + BullMQ live tracking | ⬜ Not started |
| e-KYC provider integration (store tokens only, never raw IDs) | ⬜ Not started |
| UPI / payment gateway on booking confirmation | ⬜ Not started |
| End-to-end JWT auth | ⬜ Not started |

Update this table whenever an item's status changes. This table — not a re-read of the
codebase — is how anyone (human or agent) checks project progress at a glance.
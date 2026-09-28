# Pest_Fast

A platform connecting a pest-control agency, its workers, and its customers —
single-agency booking, dispatch, KYC-verified workers, and live tracking.

## Team & Ownership

| Person | Owns |
|---|---|
| **A** | `apps/admin-dashboard`, `apps/agency-dashboard` (frontend) + drafts DB migrations (reviewed/merged by C) |
| **B** | `apps/worker-app`, `apps/customer-app` (frontend, React Native) |
| **C** | `apps/api` (backend), `packages/db` (schema + migrations), `packages/shared-types` (contracts) |

Read `CONTRIBUTING.md` before your first PR, and read `AGENTS.md` (root + your app's own
`AGENTS.md`) before pointing any AI coding agent at this repo.

## Repo layout

```
pest-free/
├── apps/
│   ├── admin-dashboard/     # A — hidden super-admin/developer view
│   ├── agency-dashboard/    # A — agency owner web dashboard
│   ├── worker-app/          # B — React Native, worker-facing
│   ├── customer-app/        # B — React Native, customer-facing
│   └── api/                 # C — NestJS backend
├── packages/
│   ├── shared-types/        # C-owned. The contract between frontend and backend.
│   ├── ui-kit/               # A + B shared components. Announce changes before editing.
│   ├── config/               # shared eslint/tsconfig/tailwind base
│   └── db/                   # C-owned. Prisma/TypeORM schema + migrations.
├── docs/
│   ├── PRD.md / TRD.md / workflow.md / ui-ux.md / backend-schema.md / Implementation.md
│   └── shared/               # security-privacy, Play Store checklist
├── AGENTS.md                  # root-level agent instructions
├── CONTRIBUTING.md
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Getting started

```bash
pnpm install
pnpm dev            # runs all apps in parallel via Turborepo
pnpm dev --filter=agency-dashboard   # run just your app
```

## Stack

- **Frontend (mobile):** React Native (Expo/EAS) — customer-app, worker-app
- **Frontend (web):** React — admin-dashboard, agency-dashboard
- **Backend:** NestJS/TypeScript
- **Database:** PostgreSQL + PostGIS
- **Real-time / geo:** Redis (GEO + BullMQ), Socket.IO for live tracking
- **Payments:** UPI via payment gateway
- **KYC:** e-KYC provider (no raw Aadhaar stored)

See `docs/TRD.md` for the full technical rationale.

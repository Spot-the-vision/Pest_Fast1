# Pest_Fast (Pest Free Monorepo)

A comprehensive, production-oriented platform connecting a pest-control agency, its field workers, and customers — single-agency booking, dispatch, KYC-verified workers, and live tracking.

---

## 👥 Team & Ownership Boundaries

| Role / Person | Owns | Responsibilities |
|---|---|---|
| **Person A** | `apps/admin-dashboard`, `apps/agency-dashboard` | Super-admin & agency owner dashboards (Web, React + Vite) |
| **Person B** | `apps/worker-app`, `apps/customer-app` | Worker portal & customer booking app (React / Expo) |
| **Person C** | `apps/api`, `packages/db`, `packages/shared-types` | NestJS backend, PostgreSQL/Prisma schemas, contracts |

---

## 🌐 Running Applications & Ports

All four applications are independently hosted on distinct local ports to enable simultaneous local development and cross-role workflow testing:

| Application | URL | Port | Default Role / Notes |
| :--- | :--- | :--- | :--- |
| **Customer App** | [http://localhost:3000/](http://localhost:3000/) | `3000` | Customer service browsing, card flipping & booking |
| **Admin Dashboard** | [http://localhost:5174/](http://localhost:5174/) | `5174` | Hidden developer & super-admin metrics |
| **Agency Dashboard** | [http://localhost:5175/](http://localhost:5175/) | `5175` | Agency dispatch, worker approvals & booking management |
| **Worker App** | [http://localhost:5176/](http://localhost:5176/) | `5176` | Worker registration, KYC submission & job dispatch |

---

## 🔑 Login Credentials

The frontend currently uses mock authentication suitable for offline development and UI verification:

### 1. 🛡️ Admin Dashboard (Port 5174)
- **Super-Admin Mode**:
  - **Email**: `admin@pestfast.com`
  - **Password**: Any password (e.g. `admin123`)
- **Agency Simulation Mode**:
  - **Email**: Any other email (e.g. `agency@pestfast.com`)
  - **Password**: Any password

### 2. 🏢 Agency Dashboard (Port 5175)
- **Email**: Any valid agency email (e.g. `ecopest@pestfast.com` or `agency@test.com`)
- **Password**: Any password (e.g. `agency123`)

### 3. 👷 Worker App (Port 5176)
- **Step 1 (Basic Details)**:
  - **Full Name**: Any worker name (e.g. `Ramesh Kumar`)
  - **Mobile Number**: Any 10-digit number (e.g. `9876543210`)
- **Step 2 (KYC Document IDs)**:
  - **PAN Card**: `ABCDE1234F`
  - **Aadhaar Card**: `123456789012`
  - **Voter ID**: `VOTER12345`
  - Click **Verify & Access Portal**

### 4. 🛒 Customer App (Port 3000)
- **Step 1**: Name + Mobile Number ➔ Click **Send OTP**
- **Step 2**: Enter any 4-digit OTP (e.g. `1234`) ➔ Click **Verify & Login**

---

## 🏗️ Monorepo Architecture & Evolution

```
pest-free/ (Pest_Fast1)
├── apps/
│   ├── admin-dashboard/     # Person A — Super-admin & platform metrics (Port 5174)
│   ├── agency-dashboard/    # Person A — Agency operations & worker dispatch (Port 5175)
│   ├── customer-app/        # Person B — Customer booking experience (Port 3000)
│   ├── worker-app/          # Person B — Worker onboarding, KYC & active jobs (Port 5176)
│   └── api/                 # Person C — NestJS backend API
├── packages/
│   ├── shared-types/        # Person C — Type contracts (booking, agency, worker, customer, mock)
│   ├── ui-kit/              # Person A + B — Shared buttons, alerts, theme tokens
│   ├── db/                  # Person C — Prisma/PostgreSQL schema & migrations
│   └── config/              # Shared tooling configs (oxlint, tsconfig)
├── docs/                    # PRD, TRD, workflow, UI-UX, backend schema
├── dev.mjs                  # Multi-app process runner with dedicated ports
├── AGENTS.md                # Agent directives, ownership rules & full migration ledger
├── instructions.md          # Project instructions & feature checklist
├── turbo.json               # Turborepo task pipeline
└── package.json             # Root workspace definitions & unified scripts
```

---

## 💻 Development Commands

From the monorepo root:

```bash
# 1. Install all dependencies across all apps & packages
npm install   # or: pnpm install

# 2. Run all 4 applications concurrently
npm run dev

# 3. Run individual apps
npm run dev:customer   # Customer App on http://localhost:3000
npm run dev:admin      # Admin Dashboard on http://localhost:5174
npm run dev:agency     # Agency Dashboard on http://localhost:5175
npm run dev:worker     # Worker App on http://localhost:5176

# 4. Build all apps for production
npm run build
```

---

## 🚀 Path to Production

1. **Backend Integration**: Replace front-end mock data in `packages/shared-types/mock.ts` with HTTP/WebSocket calls to `apps/api` (NestJS).
2. **Real-time Geo-Tracking**: Connect Redis GEO + BullMQ + Socket.IO for live worker dispatch and location updates.
3. **KYC Verification**: Integrate third-party e-KYC API (storing only provider verification tokens, never raw Aadhaar numbers).
4. **Payments**: Wire up UPI / payment gateway on booking confirmation.

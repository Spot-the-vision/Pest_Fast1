# Easy HiCare — Technical Context

## 1. Tech Stack Overview

| Category | Technology | Version / Spec |
|---|---|---|
| **Runtime & Language** | Node.js (v18+ / v20+), JavaScript (ESM `.js`, `.jsx`, `.mjs`) | Modern ES2022+ |
| **Monorepo Tooling** | PNPM Workspaces, Turborepo (`turbo ^2.0.0`) | `pnpm-workspace.yaml`, `turbo.json` |
| **Frontend Framework** | React 19 (`^19.2.8`), React DOM (`^19.2.8`) | Single Page Apps |
| **Routing** | React Router DOM (`^7.18.4`) | Client-side routing |
| **Bundler & Dev Server** | Vite (`^6.0.0` / `^8.0.0`) | Fast HMR dev servers |
| **State Management** | Zustand (`^5.0.15`) | Cross-port synchronized stores |
| **Animations & Gestures** | Framer Motion (`^13.4.6`) | Smooth micro-animations |
| **UI Components & Icons** | Lucide React (`^0.400.0`), Material Symbols Outlined | Responsive SVG icons |
| **Maps & Geolocation** | Leaflet 1.9.4 & React Leaflet | Custom radar pulse & polyline maps |
| **Validation** | Zod (`^4.6.5`) | Schema & form validations |
| **Testing** | Vitest (`^5.0.2`), Playwright (`^1.63.0`) | Unit tests & E2E smoke suites |

---

## 2. Commands & Scripts

### Development Commands
```bash
# Start all 4 servers concurrently (Recommended)
node dev.mjs all

# Start individual applications
node dev.mjs customer   # Customer App on http://localhost:3000
node dev.mjs admin      # Admin Dashboard on http://localhost:5174
node dev.mjs agency     # Agency Dashboard on http://localhost:5175
node dev.mjs worker     # Worker App on http://localhost:5176

# Turborepo concurrent dev (alternative)
npm run dev:turbo
```

### Verification & Build Commands
```bash
# Run unit test suite (28 Vitest unit tests in pure JavaScript)
npm --prefix apps/customer-app test

# Run build across all workspaces
npm run build

# Run linting check
npm run lint

# Run full flow verification script
node test_ui_and_flow.cjs
```

---

## 3. Key File Locations

| Functional Area | Path | Responsibility |
|---|---|---|
| **Dev Orchestration** | `dev.mjs` | Multi-app concurrent child process spawner |
| **Live State Store** | `.pest-free-live-state.json` | Single source of truth for local mock state |
| **Customer App** | `apps/customer-app/src/App.jsx` | 4-step booking wizard, live radar, UPI checkout |
| **Worker App** | `apps/worker-app/src/App.jsx` | Real-time dispatch, route, OTP keypad, safety checklist |
| **Agency Dashboard** | `apps/agency-dashboard/src/App.jsx` | Operations radar, KYC queue, stock tracker |
| **Admin Dashboard** | `apps/admin-dashboard/src/App.jsx` | Kernel controls, PII vault, PostGIS inspector |
| **UI Kit Package** | `packages/ui-kit/` | `Button.jsx`, `Modal.jsx`, `Card.jsx`, `RadarMap.jsx`, `primitives.jsx` |
| **Shared Config** | `packages/shared-config/` | Theme tokens, chemical sheets, domain constants |
| **Shared Utils** | `packages/shared-utils/` | Pricing engine, booking state machine, CSV export |
| **Shared Hooks** | `packages/shared-hooks/` | `useToast.js`, `useMediaQuery.js` |
| **API Client** | `packages/api-client/` | Synchronizer for `/api/state` |

---

## 4. Environment Variables & Ports

| Application | Default Port | Config / Env Var | Notes |
|---|---|---|---|
| **Customer App** | `3000` | `CUSTOMER_PORT=3000` | Hosts Vite dev proxy `/api/state` |
| **Admin Dashboard** | `5174` | Configured in `dev.mjs` | Super-admin kernel |
| **Agency Dashboard** | `5175` | Configured in `dev.mjs` | Agency operations |
| **Worker App** | `5176` | Configured in `dev.mjs` | Field technician console |

---

## 5. Deployment & Build Pipeline

1. **Monorepo Build:** `turbo run build` executes Vite builds for all 4 apps into their respective `dist/` directories.
2. **Static Asset Packaging:** Built `dist/` folders contain zero external server dependencies and can be served via any static CDN (Vercel, Netlify, Cloudflare Pages, S3).
3. **Mobile Wrapper Readiness:** `apps/customer-app/dist` and `apps/worker-app/dist` can be directly embedded into Capacitor or React Native WebViews without CSS refactoring.

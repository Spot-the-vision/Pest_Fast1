# AUDIT.md — Pest Fast Monorepo Comprehensive Production Audit

> **Audit Date:** October 2026  
> **Auditor Role:** Principal Software Engineer & Tech Lead  
> **Codebase Target:** `pest_fast1_main` (`C:\Users\ajith\Downloads\Pest_Fast1-main\Pest_Fast1-main`)  
> **Status:** Phase 0 Complete — Awaiting Approval for Phase 1 & 2 Execution  
> **The Golden Rule:** 100% Pixel-Identical UI, Zero Feature/Route/Copy Deviation

---

## Executive Summary

The `pest_fast1_main` codebase comprises four working applications and shared packages managed via PNPM workspaces and Turborepo. While functionally complete with real-time state synchronization across live dev servers, the codebase currently suffers from severe architectural anti-patterns:
- **Monolithic Component Files:** Three files account for over **7,600 lines of code** (`apps/customer-app/src/App.jsx` @ 2,907 lines, `apps/worker-app/src/App.jsx` @ 2,547 lines, `apps/admin-dashboard/src/App.jsx` @ 2,183 lines).
- **Massive Code Duplication:** Complete identical duplicates of domain logic, state management, and shims exist across apps (e.g. `lib/api/index.ts` is duplicated line-for-line across `customer-app` and `worker-app` [874 lines each]; `lib/rn.jsx` is duplicated line-for-line [324 lines each]; `store.js` is 90% duplicated [~470 lines each]).
- **Underutilized Shared Packages:** `packages/ui-kit` contains only 73 lines of a rudimentary Alert component while 50+ custom UI components (buttons, badges, modals, drawers, toasts) are reimplemented inline in application files.
- **Dead & Orphaned Code:** 863 lines of completely unreferenced legacy screens (`BookingScreen.jsx`, `TrackingScreen.jsx`) exist in `customer-app`.

---

## a) Current Folder Structure Per Dashboard

### 1. Root Structure
```
pest_fast1_main/
├── apps/
│   ├── admin-dashboard/       # Super-Admin Platform Kernel (Port 5174)
│   ├── agency-dashboard/      # Operations & Fleet Dispatch Portal (Port 5175)
│   ├── api/                   # API contracts & documentation (C-owned)
│   ├── customer-app/          # Easy HiCare Customer Booking & Radar (Port 3000)
│   └── worker-app/            # Easy HiCare Worker Console (Port 5176)
├── packages/
│   ├── db/                    # DB migrations & schema (C-owned)
│   ├── shared-types/          # Shared TypeScript type definitions (C-owned)
│   └── ui-kit/                # Shared UI component library
├── docs/                      # Architectural, UI/UX, TRD, and PRD specifications
├── .pest-free-live-state.json # Cross-port real-time state file
├── dev.mjs                    # Multi-server orchestrator script
├── package.json               # Root monorepo workspace configuration
├── pnpm-workspace.yaml        # Workspace definitions
└── turbo.json                 # Monorepo build pipeline configuration
```

### 2. Agency Dashboard (`apps/agency-dashboard`)
```
apps/agency-dashboard/
├── index.html                 # CDN Tailwind + Material Symbols + Fonts
├── package.json               # React 19, React Router DOM 7, Lucide React, Vite 8
├── vite.config.js             # Base: /agency/, path aliases to shared packages
└── src/
    ├── App.css
    ├── App.jsx                # Router, Auth guard, Login form, Dev Quick View
    ├── index.css
    ├── main.jsx               # React DOM entry point
    ├── assets/
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    └── pages/
        ├── Dashboard.jsx      # Monolith (1,578 lines) - Ops Map, KYC, Fleet, Invoices
        └── WorkerFleet.jsx    # Monolith (823 lines) - Roster, Schedule, Job Cards
```

### 3. Admin / Developer Dashboard (`apps/admin-dashboard`)
```
apps/admin-dashboard/
├── index.html                 # CDN Tailwind with custom design system tokens
├── package.json               # React 19, React Router DOM 7, Lucide React, Vite 8
├── vite.config.js             # Base: /admin/, path aliases to shared packages
└── src/
    ├── App.css
    ├── App.jsx                # Monolith (2,183 lines) - Top Bar, 7 Modals, KYC, Disputes, Financials
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    └── pages/
        └── PlatformOverview.jsx # Monolith (1,245 lines) - Analytics, Metrics, CSV export
```

### 4. Worker App (`apps/worker-app`)
```
apps/worker-app/
├── index.html                 # Leaflet CSS/JS, Bricolage Grotesque & Figtree fonts
├── package.json               # React 19, Framer Motion, Lucide React, Zod, Zustand
├── vite.config.js             # Port 5176, state sync middleware proxy, aliases
└── src/
    ├── App.css
    ├── App.jsx                # Monolith (2,547 lines) - Workspace, GPS radar, OTP, Safety
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    └── lib/
        ├── rn.jsx             # React Native Web shims (324 lines)
        └── api/
            ├── index.ts       # Domain constants & quote calculators (874 lines)
            └── store.js       # Zustand store with worker actions (472 lines)
```

### 5. Customer App (`apps/customer-app`)
```
apps/customer-app/
├── index.html                 # Leaflet CSS/JS, Bricolage Grotesque & Figtree fonts
├── package.json               # React 19, Framer Motion, Lucide React, Zod, Zustand
├── vite.config.js             # Port 3000, live-state HTTP REST endpoints (/api/state)
├── vitest.config.ts
└── src/
    ├── App.css
    ├── App.jsx                # Monolith (2,907 lines) - Booking, Radar, OTP, Payments
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    ├── lib/
    │   ├── rn.jsx             # React Native Web shims (324 lines)
    │   └── api/
    │       ├── index.ts       # Domain constants & quote calculators (874 lines)
    │       ├── store.js       # Zustand store with customer actions (460 lines)
    │       └── __tests__/
    │           └── api.test.ts # Vitest suite for quote calculation (204 lines)
    └── pages/
        ├── BookingScreen.jsx  # ORPHAN / DEAD CODE (546 lines)
        └── TrackingScreen.jsx # ORPHAN / DEAD CODE (317 lines)
```

---

## b) Inventory of Pages, Components, Hooks, Utils, Services, and Constants

| Dashboard / App | Pages / Top-Level Screens | Internal Components | Custom Hooks | Utils / Services | Constants |
|---|---|---|---|---|---|
| **Agency Dashboard** | `AgencyDashboard` (`/`), `WorkerFleet` (`/worker-fleet`), `Login` | `Toast`, `ProfileModal`, `SectionHeader`, `Sidebar`, `Header`, `StatCard`, `WorkerCard`, `JobCard` | Built-in React state (`useState`, `useEffect`) | Local state handlers, inline tab filtering | Mock worker list, Mock bookings queue, Mock client directory, Mock chemical inventory |
| **Admin Dashboard** | `App` (Super-Admin Shell), `PlatformOverview` (`/`) | `Toast`, `SystemConfigModal`, `AdminProfileModal`, `HubsModal`, `PiiVaultModal`, `StreamsModal`, `PostGisModal`, `AgencyJobsModal`, `KYCTab`, `DisputesTab`, `FinancialsTab` | Built-in React state | `exportToCSV`, metric calculators, toggle handlers | Platform metrics, Geo-mesh data, Hubs directory, KYC applications, Dispute logs |
| **Worker App** | `App` (Single-Page Shell with 5 bottom tabs: Workspace, Routes, Earnings, Safety, Profile) | `ToastStack`, `ModalDialog`, `WorkerMiniMap`, `WorkerOverviewSection`, `ActiveJobWorkspaceSection`, `RouteSection`, `EarningsSection`, `SafetySection` | `useToast`, `useAppStore` | Doorstep OTP verification, live coordinate updater, route calculator | `QUEUED_JOBS`, `CHEMICAL_SAFETY_PROTOCOLS`, `EARNINGS_RATES` |
| **Customer App** | `App` (Single-Page Shell with navigation tabs: Book, Track, History, Safety, Profile) | `ToastStack`, `ModalDialog`, `RealLeafletMap`, `BookSection`, `TrackSection`, `HistorySection`, `SafetyGuideSection` | `useToast`, `useAppStore` | `calculatePrice`, `calculateMultiServicePrice`, `generateSmartQuoteRecommendation`, Leaflet map init | `PEST_TYPES`, `PROPERTY_SIZES`, `PLANS`, `TIME_SLOTS`, `LIFECYCLE_STAGES`, `SAVED_ADDRESSES`, `PEST_IMAGES` |
| **Shared Packages** | N/A | `Alert`, `AlertTitle`, `AlertDescription` (`ui-kit`) | None | None | `theme` palette (`ui-kit`) |

---

## c) Duplicated & Near-Duplicated Components and Logic

### 1. Cross-Dashboard Duplication (Highest Priority for Extraction)
1. **`lib/api/index.ts` (100% Identical — 874 lines duplicated):**
   - Exact byte-for-byte duplicate in both `apps/customer-app/src/lib/api/index.ts` and `apps/worker-app/src/lib/api/index.ts`.
   - Contains `PEST_TYPES`, `PROPERTY_SIZES`, `PLANS`, `TIME_SLOTS`, `SAFETY_CHECKLIST_STEPS`, `BUNDLED_CHEMICAL_SHEETS`, `calculatePrice`, `calculateMultiServicePrice`, and `generateSmartQuoteRecommendation`.
   - **Target:** Extract to `packages/shared-config` (constants) and `packages/shared-utils` (price calculators).
2. **`lib/rn.jsx` (100% Identical — 324 lines duplicated):**
   - Exact byte-for-byte duplicate in `apps/customer-app/src/lib/rn.jsx` and `apps/worker-app/src/lib/rn.jsx`.
   - **Target:** Extract to `packages/ui-kit/primitives.jsx` or replace with semantic HTML5 elements.
3. **`lib/api/store.js` (90% Near-Duplicate — ~470 lines each):**
   - Both manage the exact same `.pest-free-live-state.json` via `/api/state`, same sync intervals, same booking status schema.
   - **Target:** Extract shared state slice and API sync engine to `packages/api-client`.
4. **Toast Notification Pattern (Duplicated across ALL 4 Apps):**
   - `admin-dashboard`: Inline `Toast` component (lines 6–18).
   - `agency-dashboard`: Inline `Toast` component (lines 5–18) repeated in both `Dashboard.jsx` and `WorkerFleet.jsx`.
   - `customer-app`: `useToast` hook + `ToastStack` component (lines 59–88).
   - `worker-app`: `useToast` hook + `ToastStack` component (lines 52–81).
   - **Target:** Standardize into `packages/ui-kit/Toast.jsx` and `packages/shared-hooks/useToast.js`.
5. **Modal / Dialog Wrapper Pattern (Duplicated across ALL 4 Apps):**
   - `ModalDialog` in `customer-app` (lines 90–136) and `worker-app` (lines 83–130) are 95% identical.
   - `admin-dashboard` implements 7 separate modal backdrops with the same blur and card styling.
   - `agency-dashboard` implements `ProfileModal` identically in two separate page files.
   - **Target:** Extract to `packages/ui-kit/Modal.jsx`.
6. **Leaflet GPS Radar Map (Duplicated in Customer & Worker Apps):**
   - `RealLeafletMap` (`customer-app`, lines 198–289) and `WorkerMiniMap` (`worker-app`, lines 132–214) share the same tile layer URL, custom marker icons, route polylines, and auto-centering logic.
   - **Target:** Extract to `packages/ui-kit/RadarMap.jsx`.

### 2. Intra-Dashboard Duplication
1. **`agency-dashboard`:**
   - `ProfileModal` is duplicated word-for-word in `Dashboard.jsx` (lines 20–218) and `WorkerFleet.jsx` (lines 20–215).
   - `Sidebar` is duplicated with minor variations in `Dashboard.jsx` (lines 245–499) and `WorkerFleet.jsx` (lines 217–407).
   - `Toast` is duplicated in both files.

---

## d) Dead Code, Unused Imports, Files, and Dependencies

### 1. Dead & Orphaned Files (Ready for Removal)
- **`apps/customer-app/src/pages/BookingScreen.jsx` (546 lines):** Never imported in `App.jsx` or `main.jsx`. Legacy standalone route superseded by `BookSection` inside `App.jsx`.
- **`apps/customer-app/src/pages/TrackingScreen.jsx` (317 lines):** Never imported. Superseded by `TrackSection` inside `App.jsx`.
- **Total Dead Code:** **863 lines** of orphaned code in `customer-app`.

### 2. Unused Dependencies
- `react-native-web` (`^0.21.3` in root `package.json`): Both apps use the local `src/lib/rn.jsx` bridge. The actual npm package is bypassed.

### 3. Console Statements & Cleanliness
- **`console.log` statements in `src/`:** **0 instances** found in production JSX code (clean).
- **Commented-out code:** Several commented debug blocks in `store.js` regarding localStorage persistence.

---

## e) Hardcoded Values That Belong in Constants / Config

1. **Brand Colors & Theme Hex Codes (Scattered across JSX):**
   - Deep Forest Green: `#003527`, `#064e3b`, `#143F28`, `#1F5B3A`
   - Amber / Gold: `#fea619`, `#855300`, `#ffddb8`
   - Surface Sand / Cream: `#fcf9f4`, `#f6f3ee`, `#f0ede9`, `#ebe8e3`, `#e5e2dd`
   - Neutral Ink: `#1c1c19`, `#404944`, `#707974`
   - Error Red: `#ba1a1a`, `#93000a`, `#ffdad6`
   - **Target:** Consolidate into `packages/shared-config/theme.js` / Tailwind design tokens.
2. **Hardcoded URLs & Endpoints:**
   - Cross-port state URL: `http://localhost:3000/api/state` hardcoded in `apps/worker-app/src/lib/api/store.js`.
   - Leaflet Tile Server: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` hardcoded in both maps.
   - Avatar placeholders: Google User Content image links hardcoded in `agency-dashboard` mock data.
   - **Target:** Extract to environment config (`packages/shared-config/env.js`).
3. **Hardcoded Coordinates & Magic Numbers:**
   - Default Bangalore GPS center: `[12.9250, 77.5938]` (Jayanagar Hub) repeated in customer and worker apps.
   - Default ETA interval: `3000ms`, live movement step: `0.0003` lat/lng.
   - Standard Doorstep OTP fallback: `'7391'`.
   - **Target:** Extract to `packages/shared-config/constants.js`.

---

## f) Code Smells

1. **Giant Monolithic Files (>200 lines threshold):**
   - `apps/customer-app/src/App.jsx`: **2,907 lines** (Smell: mixes booking wizard, GPS radar, reviews, payment modal, user profile drawer, navigation state).
   - `apps/worker-app/src/App.jsx`: **2,547 lines** (Smell: mixes active job workspace, chemical hazard checklist, OTP keypad, UPI QR generator, earnings ledger, route planning).
   - `apps/admin-dashboard/src/App.jsx`: **2,183 lines** (Smell: mixes 7 heavy modals including cryptographic vault and PostGIS density mesh inside root shell).
   - `apps/agency-dashboard/src/pages/Dashboard.jsx`: **1,578 lines** (Smell: full CRM, fleet dispatcher, and financial accounting in one file).
   - `apps/admin-dashboard/src/pages/PlatformOverview.jsx`: **1,245 lines**.
   - `apps/agency-dashboard/src/pages/WorkerFleet.jsx`: **823 lines**.
2. **Prop Drilling:**
   - `showToast` and `onToast` passed down 4–5 levels through modal hierarchies.
   - `onNavigate` passed manually to each tab section in customer and worker apps instead of using standard routing or tab context.
3. **Mixed Concerns (UI + API + Business Logic in JSX):**
   - Price calculation algorithms, chemical safety validation rules, and localStorage side effects are declared inside JSX render bodies.
4. **Missing Error Boundaries:**
   - None of the 4 applications have React Error Boundaries configured; any unhandled render exception in map rendering crashes the entire app shell.

---

## g) Behavior Snapshot (Golden Reference for 100% Behavioral Parity)

| Application | Screen / Section | Key Visuals & Interactions to Maintain Identically |
|---|---|---|
| **Agency Dashboard** (`:5175/agency/`) | **Ops Map & Overview** (`/`) | - Left permanent sidebar with active badge counters.<br>- Stat cards (Active Fleet: 18, Open Dispatches: 6, SLA Rate: 98.4%).<br>- Interactive Bangalore operations radar map with worker pulse markers.<br>- Live Bookings Queue table with status badges and technician dispatch dropdown.<br>- Worker KYC Applications table with "Approve" & "Inspect" buttons.<br>- Chemical Inventory tracker with volume progress bars.<br>- Profile drawer with Agency Hub credentials. |
| | **Fleet Roster** (`/worker-fleet`) | - Roster grid showing active technicians, ratings, phone numbers, and vehicle badges.<br>- Scheduling & assignment drawer.<br>- Dev Quick View pill at bottom-right for instant navigation. |
| **Admin Dashboard** (`:5174/admin/`) | **Platform Overview** (`/`) | - Super-Admin header with Live Kernel indicator and Hub selector.<br>- High-level metric summary cards with trend indicators and CSV Export button.<br>- Quick Access tool buttons triggering modals: System Config, Hubs, PII Vault, Streams, PostGIS.<br>- 3 Main Management Tabs: KYC Verification, Disputes & Chargebacks, Financial Settlement.<br>- Interactive PostGIS hexagonal density grid and real-time Socket.IO log stream inspector. |
| **Worker App** (`:5176`) | **Workspace (Active Job)** | - Status banner (En Route -> Arrived -> In Progress -> Completed).<br>- Leaflet mini radar showing customer location and live technician position.<br>- Navigation button triggering external Google Maps.<br>- Doorstep OTP numeric input keypad (4-digit code).<br>- Chemical safety mandatory checklist before job start.<br>- Work completion confirmation & UPI QR code generator for payment collection. |
| | **Routes, Earnings, Safety, Profile** | - Turn-by-turn route overview.<br>- Daily & weekly earnings ledger with payout breakdown.<br>- CIB&RC protocol guidelines with emergency exposure SOS modal.<br>- Online/Offline availability toggle switch in header. |
| **Customer App** (`:3000`) | **Book Service** | - Multi-step booking flow: Pest type selector (Cockroach, Termite, Bedbugs, Rodent), Property size selector (1BHK, 2BHK, 3BHK, Villa), Plan tier cards (Essential, Standard, Premium), Date & time slot picker.<br>- Real-time smart price quote card with instant calculation.<br>- "Confirm & Dispatch Technician" button triggering live state sync. |
| | **Live Radar & Track** | - Real-time Leaflet GPS radar map showing assigned technician approaching.<br>- Status progress stepper (Assigned -> En Route -> Arrived -> In Progress).<br>- Technician ID badge (Arjun Sharma, license, rating).<br>- 4-digit Doorstep Security PIN card.<br>- Completion popup with star rating, review comments, and instant UPI payment. |
| | **History, Safety, Profile** | - Past service records with "Rebook Service" button.<br>- Safety guide with chemical sheets, child/pet safety FAQs.<br>- Customer profile edit modal with address management. |

---

## h) Team Ownership Matrix (Proposed Production Structure)

| Monorepo Path | Proposed Contents | Owner | Permissions & Rules |
|---|---|---|---|
| `apps/agency-dashboard/` | Agency operations portal frontend | **Engineer A** | Full frontend ownership. May draft DB migrations in `packages/db` via PR, but never merges them. |
| `apps/admin-dashboard/` | Super-admin & developer kernel frontend | **Engineer A** | Full frontend ownership. Never touches backend endpoints directly. |
| `apps/customer-app/` | Customer booking & tracking web application | **Engineer B** | Full frontend ownership. Consumes `shared-types` and `api-client`. No backend edits. |
| `apps/worker-app/` | Worker console & field technician application | **Engineer B** | Full frontend ownership. Consumes `shared-types` and `api-client`. No backend edits. |
| `packages/ui-kit/` | Shared design system (Buttons, Modals, Cards, Toasts, Badges, RadarMap) | **Shared (A & B)** | Maintained collaboratively. Any change affecting another app requires approval. |
| `packages/shared-hooks/` | Reusable React hooks (`useToast`, `useDebounce`, `useGeolocation`) | **Shared (A & B)** | Reusable client hooks across all apps. |
| `packages/shared-utils/` | Formatters, price quote calculators, coordinate helpers | **Shared (A, B, C)** | Pure helper functions and calculators. |
| `packages/shared-config/` | Enums, constants, theme tokens, route definitions | **Shared (A, B, C)** | Standardized configuration. |
| `packages/shared-types/` | Booking, Agency, Worker, Customer TypeScript schemas | **Engineer C (Sole Owner)** | A & B consume types. Only C may modify or add fields. |
| `packages/db/` | PostgreSQL schema, PostGIS definitions, Prisma/SQL migrations | **Engineer C (Sole Owner)** | Only C merges migrations after testing against live DB. |
| `apps/api/` & `dev.mjs` | Backend endpoints, state sync server, socket streams | **Engineer C (Sole Owner)** | Backend server logic and state persistence contracts. |

---

## Conclusion & Next Steps

This audit establishes the baseline facts for the refactoring program.
**No code has been altered.** We await your review and approval of this audit and the proposed Phase 1 migration plan before executing any refactoring steps.

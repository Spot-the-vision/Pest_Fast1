# AGENTS.md — Master AI Orchestrator Guide for Easy HiCare Monorepo

Scope: **Workday-style operational rigor for Easy HiCare Pest Management Platform.**
Applications: 4 unified portals (Customer Web App, Worker Field App, Agency Dispatch Portal, Super-Admin Platform Kernel).

---

## 1. Context Loading Hierarchy

### Always Load First (Mandatory for Every Session)

Before inspecting code or proposing changes, AI agents MUST read these 6 files in sequence:

| Priority | File Path | Purpose |
|:---:|---|---|
| **1** | [`rules.md`](file:///c:/Users/ajith/Downloads/Pest_Fast1-main/Pest_Fast1-main/rules.md) | The 4 Andrej Karpathy behavioral coding principles. |
| **2** | [`.ai/projectbrief.md`](file:///c:/Users/ajith/Downloads/Pest_Fast1-main/Pest_Fast1-main/.ai/projectbrief.md) | Mission, roles, problem definition, non-negotiables, out-of-scope boundaries. |
| **3** | [`.ai/systemPatterns.md`](file:///c:/Users/ajith/Downloads/Pest_Fast1-main/Pest_Fast1-main/.ai/systemPatterns.md) | Architecture diagram, booking state machine, data models, and invariants. |
| **4** | [`.ai/techContext.md`](file:///c:/Users/ajith/Downloads/Pest_Fast1-main/Pest_Fast1-main/.ai/techContext.md) | Tech stack versions, CLI commands, key file mapping, and environment configs. |
| **5** | [`.ai/activeContext.md`](file:///c:/Users/ajith/Downloads/Pest_Fast1-main/Pest_Fast1-main/.ai/activeContext.md) | Active sprint focus, recent decisions in flight, and immediate blockers. |
| **6** | [`.ai/progress.md`](file:///c:/Users/ajith/Downloads/Pest_Fast1-main/Pest_Fast1-main/.ai/progress.md) | Shipped features, in-progress items, backlog, and known gotchas. |

---

### Load by Task (Contextual Deep Dives)

| If you are working on... | Read these files first |
|---|---|
| **Customer App / Booking Flow** | `apps/customer-app/src/App.jsx`, `packages/shared-utils/pricing.js`, `packages/shared-utils/booking.js`, `packages/ui-kit/primitives.jsx` |
| **Worker App / Field Console** | `apps/worker-app/src/App.jsx`, `packages/shared-config/chemicals.js`, `packages/ui-kit/primitives.jsx` |
| **Agency / Franchise Ops** | `apps/agency-dashboard/src/App.jsx`, `apps/agency-dashboard/src/pages/Dashboard.jsx`, `apps/agency-dashboard/src/pages/WorkerFleet.jsx` |
| **Admin Kernel / PostGIS** | `apps/admin-dashboard/src/App.jsx`, `apps/admin-dashboard/src/pages/PlatformOverview.jsx`, `packages/db/README.md` |
| **UI Components & Styling** | `packages/ui-kit/`, `packages/shared-config/theme.js`, `apps/customer-app/src/index.css` |
| **Live State Synchronization** | `packages/api-client/`, `apps/customer-app/vite.config.js`, `.pest-free-live-state.json` |
| **Unit Testing & Test Suite** | `apps/customer-app/src/lib/api/__tests__/api.test.js`, `apps/customer-app/vitest.config.js` |

---

## 2. Hard Rules for AI Working in This Codebase

1. **THE GOLDEN RULE:** Never arbitrarily change UI layout, brand colors (Emerald `#003527`, Gold `#F8E7C9`), font sizes, line heights, button copy, route URLs, or existing feature behavior.
2. **ZERO TYPESCRIPT / ZERO RAW HTML:** All code MUST be modern JavaScript (`.js`, `.jsx`, `.mjs`) and React. Strictly no `.ts` or `.tsx` files.
3. **APP-READY ARCHITECTURE:** Write clean, modular, mobile-first responsive components using `@pest-free/ui-kit` primitives (`View`, `Text`, `TouchableOpacity`, `ScrollView`, `Modal`) so wrapping into native mobile apps (Capacitor / React Native) requires zero rewrites.
4. **REUSE BEFORE WRITING:** Always check and reuse components from `packages/ui-kit`, `packages/shared-hooks`, and `packages/shared-utils` before writing any new component or helper.
5. **STRICT CODE BOUNDARIES:**
   - When acting for Engineer A: Never touch customer/worker apps or backend code.
   - When acting for Engineer B: Never touch agency/admin dashboards or backend code.
   - When acting for Engineer C: Only C may edit `packages/shared-types`, `packages/db`, or backend endpoints.
6. **NO HARDCODED VALUES:** Hex colors, pest prices, slot strings, and chemical guidelines belong in `@pest-free/shared-config` or `@pest-free/shared-utils`.
7. **DOORSTEP VERIFICATION & PRIVACY INVARIANTS:** Never bypass the customer arrival OTP, the mandatory review gate before completion PIN, or customer contact masking on worker dispatches.
8. **VERIFY BEFORE DECLARING DONE:** Run `npm --prefix apps/customer-app test` and `npm run build` before declaring any task complete.

---

## 3. Session Startup Protocol

At the start of every session or task:
1. **Load Rules & Behavioral Principles:** Read `rules.md` and verify all Karpathy principles are acknowledged.
2. **Read Current State:** Read `.ai/activeContext.md` and `.ai/progress.md` to establish current state, blockers, and recent changes.
3. **Formulate Goal-Driven Plan:** Before touching any code, articulate:
   - Specific goal to achieve.
   - Files to be modified.
   - Verifiable success criteria.

---

## 4. End-of-Session Protocol (Mandatory Before Closing)

Before completing any task or ending a session:
1. **Run Verification Commands:**
   ```bash
   npm --prefix apps/customer-app test   # Vitest unit tests (must pass 28/28)
   npm run build                        # Turborepo build check across all 4 apps
   ```
2. **Update `.ai/` Project Documentation:**
   - Completed feature → update `.ai/progress.md` (move to ✅ Fully Shipped).
   - New bug or gotcha discovered → add to `.ai/progress.md` (Known Bugs section).
   - Sprint focus shifted → update `.ai/activeContext.md` (Current Focus).
   - Blockers resolved or discovered → update `.ai/activeContext.md` (Immediate Blockers).
   - Schema / migration added → update `.ai/systemPatterns.md`.
   - New env var or script added → update `.ai/techContext.md`.
3. **Provide Concise Summary:** Present changes made, verification results, and updated documentation status to the user.

---

## 5. Applications & Ports Overview

| Application | Path | Port | Target Audience | Primary Functionality |
|---|---|---|---|---|
| **Customer App** | `apps/customer-app` | `:3000` | Property Owners & Residents | 4-step booking flow, instant quote calculators, live radar technician tracking, doorstep PIN, UPI payment & reviews. |
| **Worker App** | `apps/worker-app` | `:5176` | Field Technicians & Applicators | Real-time dispatch alerts, route overview, OTP keypad, mandatory chemical safety checklist, UPI payment QR collection, earnings ledger. |
| **Agency Dashboard** | `apps/agency-dashboard` | `:5175` | Franchise & Agency Ops Managers | Fleet dispatching, technician KYC approvals, Bangalore ops radar map, client directory, chemical stock volume tracking. |
| **Admin Dashboard** | `apps/admin-dashboard` | `:5174` | Super-Admins & Platform Engineers | Live kernel controls, partner hubs directory, PII tokenization vault, Socket stream inspector, PostGIS density mesh, dispute resolution. |

---

## 6. Monorepo Folder Map & Ownership

```text
Pest_Fast1-main/
├── apps/
│   ├── customer-app/          # [Owner: Engineer B] Port 3000
│   ├── worker-app/            # [Owner: Engineer B] Port 5176
│   ├── agency-dashboard/      # [Owner: Engineer A] Port 5175
│   ├── admin-dashboard/       # [Owner: Engineer A] Port 5174
│   └── api/                   # [Owner: Engineer C] NestJS Backend
├── packages/
│   ├── ui-kit/                # [Shared: A & B] Button, Modal, Card, Badge, RadarMap, ToastStack, primitives
│   ├── shared-hooks/          # [Shared: A & B] useToast, useMediaQuery
│   ├── shared-utils/          # [Shared: A, B, C] Pricing, formatters, safety, booking, exportToCSV
│   ├── shared-config/         # [Shared: A, B, C] Constants, chemicals, theme tokens
│   ├── shared-types/          # [Owner: Engineer C] Data schemas and models
│   ├── api-client/            # [Owner: Engineer C] Cross-port /api/state live synchronization
│   └── db/                    # [Owner: Engineer C] PostgreSQL + PostGIS schema migrations
├── .ai/                       # AI context & persistent memory system
│   ├── projectbrief.md
│   ├── systemPatterns.md
│   ├── techContext.md
│   ├── activeContext.md
│   └── progress.md
├── architecture.md            # High-level architecture and subsystem diagram
├── rules.md                   # Behavioral coding principles (Karpathy)
└── docs/                      # PRD, TRD, UI/UX, and workflow specifications
```

---

## 7. Component Registry

| Component Name | Package / Path | Props Summary | Consuming Apps |
|---|---|---|---|
| `Button` | `@pest-free/ui-kit/Button.jsx` | `variant` (primary, secondary, accent, outline, danger, ghost), `size` (sm, md, lg), `icon`, `disabled`, `onClick` | All 4 Apps |
| `Modal` / `ModalDialog` | `@pest-free/ui-kit/Modal.jsx` | `open`, `onClose`, `title`, `icon`, `danger`, `maxWidth`, `children` | All 4 Apps |
| `Badge` | `@pest-free/ui-kit/Badge.jsx` | `variant` (default, primary, success, warning, danger, dark), `size`, `children` | All 4 Apps |
| `Card` | `@pest-free/ui-kit/Card.jsx` | `hover`, `onClick`, `className`, `children` | All 4 Apps |
| `StatCard` | `@pest-free/ui-kit/StatCard.jsx` | `icon`, `iconBg`, `iconColor`, `label`, `value`, `sub`, `badge`, `progress`, `progressValue`, `onClick` | Agency, Admin |
| `SectionHeader` | `@pest-free/ui-kit/SectionHeader.jsx` | `icon`, `title`, `subtitle`, `badge`, `action` | Agency, Admin |
| `RadarMap` | `@pest-free/ui-kit/RadarMap.jsx` | `customerCoords`, `workerCoords`, `height`, `workerName`, `destinationTitle`, `showPolyline` | Customer, Worker |
| `ToastStack` / `Toast` | `@pest-free/ui-kit/ToastStack.jsx` | `toasts`, `onDismiss` / `message`, `onClose`, `type` | All 4 Apps |
| `Alert` | `@pest-free/ui-kit/Alert.jsx` | `variant`, `children` (`AlertTitle`, `AlertDescription`) | All 4 Apps |
| `View`, `Text`, `TouchableOpacity` | `@pest-free/ui-kit/primitives.jsx` | Semantic app-ready cross-platform layout primitives | Customer, Worker |

---

## 8. Execution Commands

```bash
# Start all 4 servers concurrently
node dev.mjs all

# Start individual servers
node dev.mjs customer  # Port 3000
node dev.mjs admin     # Port 5174
node dev.mjs agency    # Port 5175
node dev.mjs worker    # Port 5176

# Run unit tests
npm --prefix apps/customer-app test

# Build all applications
npm run build
```

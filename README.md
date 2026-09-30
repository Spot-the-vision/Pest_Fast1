# 🌿 Pest Free — Rapido-style Pest Control Marketplace

A full-stack, mobile-first PWA marketplace connecting customers, agency owners, and field technicians for certified pest control.

---

## 🏗️ Architecture

```
Pest_Fast1-main/
├── apps/
│   ├── customer-app/     → Port 3000  (Customer PWA: Book · Track · History)
│   ├── worker-app/       → Port 5176  (Worker PWA: Job · Route · Earnings · Safety)
│   ├── agency-dashboard/ → Port 5175  (Agency owner: Approve · Dispatch)
│   └── admin-dashboard/  → Port 5174  (Platform admin)
├── packages/
│   ├── shared-types/     → Shared TypeScript types
│   └── ui-kit/           → Shared React component primitives
└── docs/                 → PRD, RD, workflow, UI-UX, backend-schema docs
```

## 🎨 Design System

| Token | Value | Use |
|---|---|---|
| `--canvas` | `#FFF4C2` | Page background |
| `--surface` | `#FFFBE6` | App shell |
| `--card` | `#FFFFFF` | Cards |
| `--primary` | `#1F5B3A` | Brand green |
| `--accent` | `#E8A317` | Amber CTA |
| `--success` | `#2E9E5B` | Positive state |
| `--danger` | `#C93B2B` | Destructive |

Fonts: **Bricolage Grotesque** (headings/prices) + **Figtree** (body)

---

## 🚀 Quick Start

```bash
# Install all deps
npm install

# Start all 4 apps simultaneously
node dev.mjs all

# Or start individually
cd apps/customer-app && npm run dev   # :3000
cd apps/worker-app && npm run dev     # :5176
```

---

## 🛤️ Complete User Flow

```
Customer places booking (Book tab)
  ↓ 8 seconds (mock) — Agency owner approves
Worker sees MASKED name+phone+area only (Job tab)
  ↓ Worker accepts job
  ↓ 6 seconds (mock) — Owner unlocks full contact
Worker sees real address + phone (ON_THE_WAY)
  ↓ ETA countdown (90s → 0)
Worker marks ARRIVED (only when ETA = 0)
  ↓ Customer sees 4-digit OTP
Worker enters OTP → Treatment starts (IN_PROGRESS)
  ↓ Worker ticks all 6 safety steps + captures photo
Worker marks COMPLETED
  ↓ Customer rates 1–5 stars → History
  ↓ Worker payout added to Earnings
```

---

## 📱 Customer App (`apps/customer-app` — :3000)

### Tabs
- **Book** — 5-step wizard: pest type → size+plan → schedule → address → confirm
  - 6 pest types with real base prices
  - 3 plans: Standard / Barrier / Shield (×1, ×1.5, ×2)
  - 5 property sizes (1BHK→Commercial)
  - 🤖 AI smart plan suggestion on step 2
  - Inspection mode (₹0 advance) vs Treat-on-arrival (price shown live with GST)
- **Track** — 7-state live timeline with animated technician dot on map
  - Technician card with KYC badge
  - 4-digit OTP shown only when ARRIVED
  - Cancel button only before ON_THE_WAY
- **History** — Past bookings with rating and Rebook button

---

## 👷 Worker App (`apps/worker-app` — :5176)

### Header
- Duty toggle: **On duty / Off duty** (auto "On job" when active)
- 🚨 Emergency SOS button with confirmation sheet

### Tabs
- **Job** — Full state-gated flow:
  1. `BOOKING_PLACED` → spinning "awaiting agency approval"
  2. `AGENCY_APPROVED` → masked customer info, Accept button
  3. `TECHNICIAN_ACCEPTED` → waiting for owner to unlock
  4. `ON_THE_WAY` → full address, mini-map, ETA countdown, Mark Arrived (disabled until ETA=0)
  5. `ARRIVED` → 4-input OTP entry, Verify → Start
  6. `IN_PROGRESS` → 6-step safety checklist + after-photo → Complete
  7. `COMPLETED` → payout confirmation
- **Route** — Today's stops with status and payout
- **Earnings** — Today/week stats, safety bonus, UPI link, instant payout with confirmation sheet
- **Safety** — CSDS sheets, emergency protocol, AI chat assistant

---

## 🤖 AI Features

| Feature | Where | How |
|---|---|---|
| Smart quote | Customer Book tab step 2 | `generateSmartQuoteRecommendation()` from bundled logic |
| Safety assistant | Worker Safety tab | `answerWorkerSafetyQuestion()` from bundled CSDS data |
| Dispatch scoring | Store/mock | `scoreAndRankWorkers()` pure function |

---

## 🧪 Tests

```bash
cd apps/customer-app
npx vitest run

# Tests cover:
# - calculatePrice() with all size/plan combos
# - scoreAndRankWorkers() KYC/duty filtering + ranking
# - transitionBooking() ALL legal + illegal state transitions
# - generateSmartQuoteRecommendation()
# - answerWorkerSafetyQuestion() including unknown chemicals
```

---

## 🔄 Cross-Port State Sync

The customer app (`:3000`) and worker app (`:5176`) share state via a file-based API:

```
POST/GET http://localhost:3000/api/state
→ reads/writes .pest-free-live-state.json at project root
→ both Vite servers expose this endpoint
→ worker-app polls every 3s via syncFromRemote()
```

In production, replace with **Socket.IO** or **Supabase Realtime**.

---

## 📋 State Machine

```
BOOKING_PLACED → AGENCY_APPROVED → TECHNICIAN_ACCEPTED → ON_THE_WAY → ARRIVED → IN_PROGRESS → COMPLETED
                                ↘                      ↗
                                       CANCELLED (allowed before ON_THE_WAY)
```

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `react` 19 | UI framework |
| `framer-motion` | Tab transitions, sheet animations |
| `zustand` | Global state management |
| `zod` | Form validation (BookingInputSchema) |
| `vite` 8 | Dev server + build |
| `vitest` | Unit tests |
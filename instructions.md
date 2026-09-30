# Pest Free — Instructions & Review Guide

## App URLs (all running via `node dev.mjs all`)

| App | URL | Who uses it |
|---|---|---|
| Customer App | http://localhost:3000 | Customers booking pest control |
| Worker App | http://localhost:5176 | Field technicians |
| Agency Dashboard | http://localhost:5175 | Agency owner (approve/dispatch) |
| Admin Dashboard | http://localhost:5174 | Platform administrator |

---

## How to Start

```
node dev.mjs all
```

Then open both tabs side by side to see the live cross-app flow.

---

## How to Test the Full Flow

### Step-by-step (open both :3000 and :5176 side by side)

1. **Customer App — Book tab**
   - Pick pest type (e.g. Cockroaches)
   - Pick property size + plan (AI suggestion appears on step 2)
   - Pick day + slot
   - Enter a full address (min 10 chars)
   - Choose "Treat on arrival" or "Inspection first"
   - Click **Confirm booking**

2. **Both apps — Wait 8 seconds**
   - Agency auto-approves (simulated timer)
   - Customer Track tab: status moves to "Agency approved"
   - Worker Job tab: shows masked customer name/phone/area with Accept button

3. **Worker App — Click "Accept job"**
   - Status moves to TECHNICIAN_ACCEPTED
   - "Waiting for contact unlock" screen appears

4. **Both apps — Wait 6 seconds**
   - Owner auto-unlocks contact (simulated)
   - Worker Job tab: full address + phone unlocked
   - ETA countdown (90s) starts on both apps

5. **Worker App — Wait for ETA to reach 0**
   - "Mark arrived" button enables
   - Click it

6. **Customer App — Track tab**
   - 4-digit OTP appears (show to technician)
   - OTP is hidden until ARRIVED status

7. **Worker App — Enter OTP**
   - Type the OTP shown on customer's screen
   - Click "Verify & start treatment"

8. **Worker App — IN_PROGRESS screen**
   - Tick all 6 safety/protocol checkboxes
   - Click "Capture after-photo"
   - Click "Complete and submit proof" (enabled only when all 6 done + photo)

9. **Customer App — Rating prompt**
   - 1-5 star rating appears
   - Submit → booking moves to History tab

10. **Worker App — Earnings tab**
    - Today's earnings increase by 55% of booking total
    - Click "Instant payout" to test payout flow

---

## Worker App Special Features

### Emergency SOS
- Click 🚨 red button in header
- Shows emergency contacts (Fire: 101, Ambulance: 108, Agency number)
- Click "Call Emergency" to dial 108

### Safety Tab
- **Chemical data sheets** — swipe-up sheet with Deltamethrin, Imidacloprid, Fipronil CSDS
- **Emergency exposure protocol** — 6 first-aid steps for skin/eye/inhalation/ingestion
- **Safety AI assistant** — type any chemical handling question, get answers from bundled CSDS only

---

## Key Business Rules Enforced

| Rule | Where enforced |
|---|---|
| Worker sees ONLY masked data until agency approves | `store.js` — incomingJob populated only on AGENCY_APPROVED |
| Full address unlocked only after OWNER_UNLOCK_CONTACT | `store.js` — contactUnlocked flag |
| Mark Arrived disabled until ETA = 0 | `canWorkerMarkArrived()` in store |
| OTP shown to customer ONLY when ARRIVED | Customer Track tab conditional |
| Treatment can only start with correct OTP | `workerStartTreatment()` verifies OTP |
| Complete only when all 6 steps + photo | `canWorkerComplete()` in store |
| Cancel only before ON_THE_WAY | `canCancel()` in store |
| State machine throws on illegal transitions | `transitionBooking()` in index.ts |

---

## Unit Tests

```bash
cd apps/customer-app
npx vitest run --config vitest.config.ts
```

**28 tests, all passing:**
- `calculatePrice` — GST, size multiplier, plan multiplier
- `scoreAndRankWorkers` — KYC filter, availability filter, ranking
- `transitionBooking` — 7 legal + 6 illegal transitions
- `generateSmartQuoteRecommendation` — termite/commercial → shield
- `answerWorkerSafetyQuestion` — CSDS answers + explicit unknowns

---

## File Map

```
apps/customer-app/
  src/
    App.jsx              — Customer app (Book/Track/History tabs)
    index.css            — Design system (tokens + utilities)
    lib/api/
      index.ts           — All types, business logic, state machine, AI functions
      store.js           — Zustand store with mock timers + cross-port sync
      __tests__/
        api.test.ts      — 28 unit tests

apps/worker-app/
  src/
    App.jsx              — Worker app (Job/Route/Earnings/Safety tabs + header)
    index.css            — Worker design system
    lib/api/
      index.ts           — Copy of customer-app/src/lib/api/index.ts
      store.js           — Worker-specific Zustand store (syncs from /api/state)

.pest-free-live-state.json  — Shared state file between :3000 and :5176
```
# INSTRUCTIONS.md ? Developer Onboarding & Engineering Handbook

Welcome to the Easy HiCare Monorepo. This handbook guides developers (Engineers A, B, and C) on setup, conventions, shared packages, and extending the platform.

---

## 1. Setup from Zero

### Prerequisites
- Node.js >= 20.0.0
- PNPM >= 9.0.0 (`npm install -g pnpm`)

### Installation & Launch
```bash
# 1. Clone repository and navigate to root
cd Pest_Fast1-main

# 2. Install workspace dependencies
pnpm install

# 3. Start all 4 dashboards concurrently
node dev.mjs all
```

Access the applications in your browser:
- **Customer App:** [http://localhost:3000](http://localhost:3000)
- **Worker App:** [http://localhost:5176](http://localhost:5176)
- **Agency Dashboard:** [http://localhost:5175/agency/](http://localhost:5175/agency/)
- **Admin Dashboard:** [http://localhost:5174/admin/](http://localhost:5174/admin/)

---

## 2. Architecture & Design System

### The Shared Packages Ecosystem
All common domain knowledge and visual components live in `packages/`:
- `@pest-free/ui-kit`: Common accessible, app-ready components (`Button`, `Modal`, `Card`, `Badge`, `RadarMap`, `ToastStack`, `View`, `Text`, `TouchableOpacity`).
- `@pest-free/shared-hooks`: Common React hooks (`useToast`, `useMediaQuery`).
- `@pest-free/shared-utils`: Pure business logic (`calculatePrice`, `calculateMultiServicePrice`, `formatCurrency`, `exportToCSV`).
- `@pest-free/shared-config`: Design tokens (`colors`, `theme`), domain lists (`PEST_TYPES`, `PROPERTY_SIZES`, `PLANS`, `TIME_SLOTS`, `BUNDLED_CHEMICAL_SHEETS`).
- `@pest-free/api-client`: Cross-port live state synchronization client (`fetchLiveState`, `pushLiveState`).

### App-Ready Mobile Architecture
To allow effortless transition into iOS/Android mobile apps in the future:
1. Always import primitives from `@pest-free/ui-kit`:
   ```javascript
   import { View, Text, TouchableOpacity, ScrollView, Modal } from '@pest-free/ui-kit';
   ```
2. Keep layouts flexible using responsive Tailwind classes (`w-full max-w-md mx-auto sm:max-w-xl`).
3. Ensure tap targets are at least `44x44px` for touch ergonomics.

---

## 3. How-To Guide: Step-by-Step

### How to Add a New Shared UI Component
1. Create your component in `packages/ui-kit/<ComponentName>.jsx`.
2. Export it from `packages/ui-kit/index.jsx`.
3. Add an entry to the **Component Registry** in `AGENTS.md`.
4. Import and use it in any app:
   ```javascript
   import { Button, Modal, Card } from '@pest-free/ui-kit';
   ```

### How to Add a New Custom Hook
1. Create `packages/shared-hooks/<useHookName>.js`.
2. Export it in `packages/shared-hooks/index.js`.
3. Import in your feature:
   ```javascript
   import { useToast, useMediaQuery } from '@pest-free/shared-hooks';
   ```

### How to Add an API Call or State Action
1. All API contracts are owned by **Engineer C**.
2. If state needs to sync across dashboards:
   - Engineer C updates `/api/state` endpoint in `customer-app/vite.config.js`.
   - Engineer C updates `@pest-free/api-client`.
   - Engineers A and B consume the action in their respective store or feature hook.

---

## 4. Testing & Troubleshooting

### Running Tests
```bash
# Run unit test suite
npm --prefix apps/customer-app test

# Run build check across all packages
npm run build
```

### Common Issues & Solutions
- **Port Conflict (EADDRINUSE):** Kill lingering node processes using PowerShell:
  ```powershell
  Get-Process node | Stop-Process -Force
  ```
- **Live State Desync:** Reset `.pest-free-live-state.json` via HTTP:
  ```bash
  curl -X POST http://localhost:3000/api/state/reset
  ```
- **Import Alias Errors:** Ensure you use standard monorepo aliases (`@pest-free/ui-kit`, `@pest-free/shared-config`, `@pest-free/shared-utils`).

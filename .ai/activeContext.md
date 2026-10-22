# Easy HiCare — Active Context

## 1. Current Sprint & Focus
- **Primary Objective:** Monorepo governance stabilization, AI pair programming context bootstrap, and end-to-end flow integrity verification.
- **Current Workspace Target:** `c:\Users\ajith\Downloads\Pest_Fast1-main\Pest_Fast1-main` confirmed as the primary active codebase (containing full git history, latest UI polish, and production dist builds).
- **Secondary Focus:** Verifying that all 4 portals (`:3000`, `:5174`, `:5175`, `:5176`) boot and synchronize seamlessly without port collisions.

---

## 2. Recent Decisions in Flight
- **Folder Selection Resolution:** Confirmed `Pest_Fast1-main` is the latest and most complete codebase compared to `Pest_Portal` (which was an older mirror from refactor task REF-09 lacking `.git` and subsequent UI/build updates).
- **Strict JavaScript Preservation:** Maintained zero TypeScript and zero raw HTML across all apps and shared packages.
- **Shared Package Convergence:** Replaced scattered duplicate code with centralized `@pest-free/ui-kit`, `@pest-free/shared-config`, `@pest-free/shared-utils`, `@pest-free/shared-hooks`, and `@pest-free/api-client`.
- **Flow Enhancements:** Shipped arrival-triggered start OTP, mandatory customer review gate before completion PIN unlock, and automated UPI payment QR generation.

---

## 3. Immediate Blockers & Known Risks
- **Port Collisions (EADDRINUSE):** Lingering background Node/Vite processes on ports 3000, 5174, 5175, or 5176 can block server startup.
  - *Mitigation:* Run `Get-Process node | Stop-Process -Force` in PowerShell before launching `node dev.mjs all`.
- **Live State Desynchronization:** If `.pest-free-live-state.json` gets corrupted or holds stale booking IDs, UI transitions may fail.
  - *Mitigation:* Reset state using `curl -X POST http://localhost:3000/api/state/reset` or delete and regenerate the file.

---

## 4. Next Logical Steps
1. **Continuous Verification:** Run Vitest unit tests (`npm --prefix apps/customer-app test`) and flow checks (`node test_ui_and_flow.cjs`).
2. **Capacitor Mobile Packaging:** Evaluate wrapping `apps/customer-app` and `apps/worker-app` into native Android APKs via Capacitor.
3. **Backend Transition Planning:** As outlined in `docs/Implementation.md`, prepare for swapping local mock state (`.pest-free-live-state.json`) with the production NestJS + PostgreSQL / PostGIS backend in `apps/api`.

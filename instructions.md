# Instructions & Project Directives

Use this document to track high-level instructions, milestones, and requirements for the **Pest_Fast** platform.

---

## 📋 General Guidelines & Rules

1. **Strict Ownership Boundaries**:
   - **Person A**: `apps/admin-dashboard`, `apps/agency-dashboard`
   - **Person B**: `apps/worker-app`, `apps/customer-app`
   - **Person C**: `apps/api`, `packages/db`, `packages/shared-types`
   - When modifying shared components in `packages/ui-kit`, verify impact across all consuming frontends.

2. **Security & Privacy**:
   - Customer phone number and address are masked by default.
   - Worker sees masked proxy details until the agency owner grants explicit second-step permission.
   - Never log or persist raw Aadhaar/PAN/KYC documents in client state or plain database columns.

3. **Code Style & Tooling**:
   - All client apps run on Vite with React 19.
   - Imports from shared packages should use `@pest-free/ui-kit` / `ui-kit` and `@pest-free/shared-types` / `shared-types`.
   - Never commit UTF-8 BOM characters in configuration or code files.

---

## 📌 Active Tasks & Feature Checklist

- [x] Initial monorepo setup & workspace dependency linking.
- [x] Integrate 4 frontend apps (Admin, Agency, Customer, Worker) with dedicated ports (5174, 5175, 3000, 5176).
- [x] Create multi-app runner (`dev.mjs`) supporting unified or individual execution.
- [x] Create feature branch `feat/frontend-dashboards-integration` on GitHub repo.
- [ ] Connect `apps/api` NestJS backend endpoints to frontend client services.
- [ ] Replace mock booking & service data with live database queries.
- [ ] Implement live Socket.IO client in worker-app and agency-dashboard for job dispatch.
- [ ] Set up end-to-end authentication with JWT / refresh tokens.

---

## 📝 User Notes & Custom Instructions

*(Add any specific instructions, requirements, or architecture notes here)*

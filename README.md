# Easy HiCare ? Enterprise Pest Solutions Monorepo

Production-grade, app-ready monorepo powering 4 integrated pest management applications:
1. **Customer Web App** (`:3000`): Instant quotes, booking wizard, live GPS radar tracking, doorstep security PIN, and instant UPI payments.
2. **Worker Field App** (`:5176`): Real-time job dispatches, turn-by-turn route overview, OTP keypad, mandatory chemical safety checklist, and payment QR collection.
3. **Agency Operations Portal** (`:5175`): Bangalore operations radar map, technician roster, KYC verification queue, and chemical inventory stock tracking.
4. **Super-Admin Platform Kernel** (`:5174`): Platform engine toggles, partner hubs matrix, PII cryptographic tokenization vault, real-time socket stream inspector, and PostGIS geospatial mesh.

---

## Architecture Highlights
- **Pure JavaScript & React:** Zero raw HTML, zero TypeScript dependencies.
- **Shared Package Ecosystem:**
  - `@pest-free/ui-kit`: Common app-ready UI components and cross-platform primitives (`Button`, `Modal`, `Card`, `Badge`, `RadarMap`, `ToastStack`, `View`, `Text`, `TouchableOpacity`).
  - `@pest-free/shared-hooks`: Common React hooks (`useToast`, `useMediaQuery`).
  - `@pest-free/shared-utils`: Pricing calculators, currency/time formatters, CSV export, and booking state machine.
  - `@pest-free/shared-config`: Design tokens, brand colors, chemical sheets, and domain constants.
  - `@pest-free/api-client`: Cross-port live state synchronization against `/api/state`.
- **App-Ready Design:** Responsive mobile-first viewports, capacitive tap ergonomics, and semantic layout primitives allowing effortless wrapping into native iOS/Android apps (Capacitor / React Native).

---

## Quick Start
```bash
# Install dependencies
pnpm install

# Run all 4 applications concurrently
node dev.mjs all
```

---

## Documentation Index
- [AGENTS.md](./AGENTS.md): Coding rules, architecture map, component registry, and AI agent instructions.
- [INSTRUCTIONS.md](./INSTRUCTIONS.md): Developer onboarding and step-by-step how-to guide.
- [CONTRIBUTING.md](./CONTRIBUTING.md): Team ownership boundaries (Engineers A, B, C), branching strategy, and code review checklist.
- [CHANGELOG.md](./CHANGELOG.md): Chronological history of refactoring changes.
- [docs/WORK_LOG.md](./docs/WORK_LOG.md): Live engineering task tracking board.
- [AUDIT.md](./AUDIT.md): Comprehensive Phase 0 audit report.

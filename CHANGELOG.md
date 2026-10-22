# CHANGELOG.md ? Monorepo Refactoring History

All notable refactoring changes to the Easy HiCare platform are recorded here chronologically.

---

## [Phase 1 & 2 Refactor] - 2026-10-04

### Architect & Lead
- Principal Software Engineer (Refactoring Lead)

### Packages Established (Pure JavaScript / MJS)
- **`packages/shared-config/`**:
  - `constants.js`: Centralized `PEST_TYPES`, `PROPERTY_SIZES`, `TREATMENT_PLANS`, `TIME_SLOTS`, `DAY_OPTS`, `SAVED_ADDRESSES`, `LIFECYCLE_STAGES`, `CANDIDATE_WORKERS`, `SAFETY_STEPS_TEMPLATE`.
  - `chemicals.js`: CIB&RC formulations (`BUNDLED_CHEMICAL_SHEETS`).
  - `theme.js`: Centralized brand colors (`#003527`, `#fea619`, `#fcf9f4`) and theme tokens.
- **`packages/shared-utils/`**:
  - `pricing.js`: `calculatePrice`, `calculateMultiServicePrice`, `generateSmartQuoteRecommendation`.
  - `formatters.js`: `formatCurrency`, `formatDistance`, `formatTimeSeconds`, `extractAreaFromAddress`.
  - `safety.js`: `answerWorkerSafetyQuestion`.
  - `booking.js`: `scoreAndRankWorkers`, `transitionBooking`, `createBookingFromInput`, `InvalidTransitionError`.
  - `export.js`: `exportToCSV`.
- **`packages/shared-hooks/`**:
  - `useToast.js`: Unified non-blocking toast hook.
  - `useMediaQuery.js`: Mobile-first responsive layout detection.
- **`packages/ui-kit/`**:
  - `primitives.jsx`: Cross-platform app-ready layout primitives (`View`, `Text`, `TouchableOpacity`, `Pressable`, `TextInput`, `ScrollView`, `Image`, `ActivityIndicator`).
  - `Button.jsx`: Universal responsive button (primary, secondary, accent, outline, danger, ghost).
  - `Modal.jsx`: Accessible modal / mobile bottom sheet with backdrop click dismiss.
  - `ToastStack.jsx`: Fixed bottom-center responsive notification stack.
  - `StatCard.jsx`: Metric summary card with progress bars.
  - `SectionHeader.jsx`: Responsive section title with icon and badge.
  - `Badge.jsx`: Status pill with color indicators.
  - `Card.jsx`: Container with elevation tokens.
  - `RadarMap.jsx`: Unified Leaflet GPS real-time radar tracking map.
  - `Alert.jsx`: Accessible alert banner.
- **`packages/api-client/`**:
  - Unified HTTP client for live state synchronization against `/api/state`.

### Files Deleted / Dead Code Removed
- `apps/customer-app/src/pages/BookingScreen.jsx` (546 lines): Deleted (unreferenced legacy file).
- `apps/customer-app/src/pages/TrackingScreen.jsx` (317 lines): Deleted (unreferenced legacy file).
- `apps/customer-app/src/lib/rn.jsx` (324 lines): Deleted (migrated to `@pest-free/ui-kit`).
- `apps/worker-app/src/lib/rn.jsx` (324 lines): Deleted (migrated to `@pest-free/ui-kit`).
- `apps/customer-app/src/lib/api/index.ts` (874 lines): Deleted (replaced by pure JS `@pest-free/shared-config` and `@pest-free/shared-utils`).
- `apps/worker-app/src/lib/api/index.ts` (874 lines): Deleted (replaced by pure JS `@pest-free/shared-config` and `@pest-free/shared-utils`).
- `apps/customer-app/src/lib/api/__tests__/api.test.ts`: Converted to pure JS `api.test.js`.
- `apps/customer-app/vitest.config.ts`: Converted to pure JS `vitest.config.js`.
- **Net Code Reduction:** Over **2,900+ lines of duplicate and dead code eliminated.**

### Testing & Verification
- Unit test suite: 28 tests passing (`100% pass rate`).
- Production builds: All 4 applications build with exit code 0.
- Live servers: Ports 3000, 5174, 5175, 5176 verified returning HTTP 200 OK.
- Mirrored into `Pest_Portal` container.

# Easy HiCare — Project Brief

## 1. What This Is
Easy HiCare is a production-grade, on-demand pest control and management platform for residential and commercial properties. It operates as a unified monorepo powering four distinct applications: Customer Web App, Worker Field App, Agency Operations Portal, and Super-Admin Platform Kernel.

## 2. Target Users & Roles
- **Customers (Property Owners & Residents):** Discover certified pest treatments, calculate transparent instant quotes, schedule time slots, track arriving technicians with live GPS radar, securely verify arrivals with doorstep PINs, and complete instant UPI settlements with post-service ratings.
- **Workers (Field Technicians & Applicators):** Receive real-time job dispatches with masked customer contact, view turn-by-turn routes, complete mandatory CIB&RC chemical safety checklists, verify arrival via doorstep OTP, collect UPI payments via dynamic QR, and track earnings.
- **Agency Operations Managers (Franchise Owners):** Manage fleet dispatches, onboard and verify technician KYC and government licenses, monitor the Bangalore operations radar mesh, track chemical stock volumes, and execute the critical two-step customer contact release gate.
- **Platform Super-Admins & Engineers:** Control platform kernel engine toggles, manage partner hub registries, inspect live WebSocket event streams, oversee PII cryptographic tokenization vaults, and monitor PostGIS geospatial density meshes.

## 3. Core Problem Solved
Traditional pest control services suffer from opaque pricing, unverified freelance workers, lack of arrival visibility, privacy leaks of customer addresses/phone numbers, and hazardous chemical compliance risks. Easy HiCare digitizes and enforces trust across the entire lifecycle through:
- Sub-60-minute dispatch capability with automated GPS tracking.
- Mandatory KYC verification and CIB&RC-approved odorless chemical certifications.
- Two-step privacy isolation (technicians cannot see unmasked customer location/phone until the agency grants explicit arrival permissions).
- Strict verification gates (start OTP at doorstep, mandatory review gate before completion PIN, and automated UPI payment QR generation).

## 4. Hard Constraints (Non-Negotiable)
- **Zero TypeScript & Zero Raw HTML:** All application and shared code MUST be modern JavaScript (`.js`, `.jsx`, `.mjs`) and React. No `.ts` or `.tsx` files.
- **100% UI & Behavioral Preservation:** Brand colors (Emerald `#003527`, Gold `#F8E7C9`), typography, layouts, routes, button copy, and existing user journeys must never be broken or speculatively modified.
- **App-Ready Architecture:** All viewports must use mobile-first responsive styling and semantic layout primitives (`View`, `Text`, `TouchableOpacity`, `ScrollView`, `Modal`) from `@pest-free/ui-kit` to allow seamless packaging into mobile webviews/apps (Capacitor / React Native).
- **Two-Step Privacy Gate:** Real customer address and phone number must remain tokenized/masked on the worker interface until the agency grants explicit second-step clearance upon dispatch/arrival.
- **Strict Chemical Compliance:** Workers cannot start or complete a job without passing the interactive CIB&RC safety checklist and recording chemical usage.

## 5. Explicit Out of Scope
- Multi-agency open marketplace (bidding wars, variable commission cuts, multi-tenant competition) — platform is scoped strictly to single-agency / managed partner networks.
- External paid SMS/IVR telephony gateways beyond standard WhatsApp/direct URI intents.
- Cryptocurrency or overseas payment rails (restricted strictly to Indian Rupee INR via UPI / QR / Cash / Net Banking).

## 6. Input / Output Mappings

| Subsystem | Primary Input | Expected Output | Verification Method |
|---|---|---|---|
| **Quote Calculator** | Pest type, BHK/SqFt size, frequency plan | Instant itemized quote with 18% GST breakdown & smart chemical recommendations | Vitest `calculatePrice` unit test suite |
| **Worker Dispatch** | Booking slot, geolocation coordinates | Ranked eligible KYC-verified technicians sorted by proximity & ratings | Vitest `scoreAndRankWorkers` unit test suite |
| **Booking State Machine** | Action triggers (`CONFIRM`, `DISPATCH`, `START_OTP`, `COMPLETE_PIN`) | State transitions (`PENDING` → `ASSIGNED` → `IN_PROGRESS` → `COMPLETED`) | Vitest `transitionBooking` unit test suite |
| **Doorstep Verification** | 4-digit customer arrival OTP & completion PIN | Secure state unlock; triggers mandatory rating modal & UPI QR display | End-to-end flow test (`test_ui_and_flow.cjs`) |
| **Cross-Port State Sync** | State mutation on any dashboard port | Synchronized `.pest-free-live-state.json` via `/api/state` | HTTP polling / API state broadcast across all 4 apps |

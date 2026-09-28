# Workflow — Pest Free

## Owner onboarding

1. Owner signs up → unique agency ID generated.
2. Owner submits KYC (Aadhaar, PAN, bank account, voter ID) via e-KYC provider.
3. Owner logs in via email or mobile number (OTP) going forward.

## Worker onboarding

1. Worker registers on the separate worker-signup website: KYC documents + license +
   the owner's agency reference ID.
2. Owner reviews and approves the worker application in `agency-dashboard`.
3. Worker logs into `worker-app` using the same mobile number used at signup — no
   in-app "become a worker" flow inside `customer-app` or `worker-app` itself.

## Booking (end to end)

1. **Existing customer:** already onboarded under the agency, opens `customer-app`,
   books a slot directly.
   **New customer:** discovers the agency (top-rated, location-based ranking), views
   agency details + nearby verified workers, books a slot.
2. Booking created → status `pending_owner_approval`. Owner is notified via WhatsApp +
   a secondary channel + email.
3. Owner approves in `agency-dashboard` → status `approved` → backend dispatches to the
   nearest available worker (next-nearest by rating if busy) → status
   `worker_assigned_masked`.
4. Worker sees the job in `worker-app` with a **masked name + proxy phone number**, no
   location.
5. Owner grants a second, separate permission in `agency-dashboard` → status
   `contact_released` → worker now sees the real customer name, phone, and location.
6. Worker travels to the job; live location streamed to the customer (and owner) via
   Socket.IO, Rapido/Zomato-style. Target arrival: 3–6 hours from the slot.
7. Job marked `in_progress` → `completed`. Customer rates the worker; rating feeds
   future dispatch priority.

## Owner analytics

Owner views live/daily active-worker counts by location in `agency-dashboard` (e.g.
"workers active today in [area]"), mirroring how ride-hailing apps expose rider counts
to fleet owners.

## Admin/developer (internal only)

Full-access support view in `admin-dashboard` for agencies, workers, bookings, and KYC
status — reachable only via internal credentials, never linked from any other surface.

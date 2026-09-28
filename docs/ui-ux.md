# UI/UX — Pest Free

## Principle: role-first, no cross-role affordances

Each app opens directly into its role's home screen. No app offers a way to "become"
another role from inside it (e.g. no "sign up as worker" button inside `customer-app`).

## customer-app (B)

- Home: existing customers see their agency + quick "book a slot"; new customers see
  agency discovery (top-rated, nearest-first).
- Agency detail screen: basic info/description, nearby verified workers, rating.
- Booking screen: slot picker → confirmation → status tracker (pending → approved →
  worker assigned → tracking → completed), mirroring familiar ride-hailing status UI.
- Live tracking screen: map + worker's live position once released, ETA.
- Payment: UPI flow at booking confirmation or on completion (confirm timing with C).

## worker-app (B)

- No signup inside the app — login only, via the mobile number used on the separate
  worker-registration website.
- Job list: incoming jobs after owner approval, shown with masked contact + a clear
  "waiting for customer details" state until the owner's second permission lands.
- Active job screen: once contact is released — real name, phone (tap-to-call), map
  with route to customer.
- Rating history / activity screen.

## agency-dashboard (A)

- Booking approval queue: clear two-step actions — "Approve & Assign" then, separately,
  "Release contact to worker" — never combine these into a single button.
- Worker management: pending applications (approve/reject), active roster.
- Analytics: live/daily active-worker count by location, simple chart/table view.
- Owner-approval alerts surfaced prominently (badge/notification), matching the
  WhatsApp/SMS/email reminder cadence.

## admin-dashboard (A)

- Internal-only styling/branding distinct from the other three apps (so it's never
  mistaken for a customer-facing surface if screenshotted).
- Search across agencies/workers/bookings/KYC status; audit log for any PII reveal.

## Shared visual language

Common design tokens (color, spacing, typography) live in `packages/ui-kit` and
`packages/config` so all four apps feel like one product family, even though
admin-dashboard is functionally hidden from the public.

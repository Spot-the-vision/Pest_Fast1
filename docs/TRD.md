# TRD — Pest Free

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Mobile (customer, worker) | React Native (Expo/EAS) | two separate app bundles/listings |
| Web (admin, agency) | React | admin-dashboard is hidden/internal-only |
| Backend | NestJS + TypeScript | REST + WebSocket (Socket.IO) |
| Database | PostgreSQL + PostGIS | geo queries for nearest-worker dispatch |
| Cache / queue / geo | Redis (GEO + BullMQ) | worker geo-index, background jobs (reminders, notifications) |
| Real-time tracking | Socket.IO | worker → customer/owner live location stream |
| Payments | UPI via payment gateway | tokenized, no raw bank data stored |
| KYC | e-KYC provider | tokens/status only, never raw documents |
| Notifications | WhatsApp Business API + SMS/push + email | owner-approval reminders |

## Architecture (high level)

```
apps/customer-app  ─┐
apps/worker-app     ├─▶  apps/api (NestJS)  ──▶ PostgreSQL+PostGIS
apps/agency-dashboard┤        │                └▶ Redis (geo, queues)
apps/admin-dashboard─┘        └──▶ Socket.IO gateway (live tracking)
```

All four frontends talk to `apps/api` only through the shapes defined in
`packages/shared-types`. No frontend talks to the database directly.

## Key backend responsibilities

- **Auth:** four separate role/session spaces (customer, worker, owner, internal
  admin) — see `docs/shared/security-privacy.md`.
- **Dispatch:** on owner approval, query PostGIS for nearest available worker; if busy,
  fall back to next-nearest ranked by rating.
- **Two-step contact release:** enforced server-side (see `booking.ts` status enum in
  `packages/shared-types`) — never trust a client flag for this.
- **KYC:** integrate e-KYC provider webhook/callback to update `kycStatus`.
- **Notifications:** BullMQ job triggers WhatsApp + secondary channel + email when a
  booking enters `pending_owner_approval`.

## Non-functional requirements

- Booking-approval and dispatch paths must be idempotent (retries from flaky mobile
  networks shouldn't double-assign a worker).
- Live-location updates throttled/debounced (e.g. every 5–10s) to control Socket.IO and
  battery load.
- All KYC-adjacent endpoints audited/logged (who viewed what, when) — required for
  Play Store data-safety compliance.

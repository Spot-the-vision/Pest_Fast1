# Backend Schema — Pest Free

Owned by Person C. This is the narrative version of the schema — the executable
version (Prisma/TypeORM) lives in `packages/db`. Keep both in sync.

## Core tables (single agency)

### `agencies`
- `id`, `name`, `owner_id` (FK → users), `kyc_status`, `rating`, `location (geography)`,
  `created_at`

### `users`
- `id`, `role` (`owner | worker | customer | internal_admin`), `phone`, `email`,
  `kyc_status`, `created_at`
- Role-specific profile tables (`worker_profiles`, `customer_profiles`) hang off this
  by `user_id` rather than overloading one wide table.

### `worker_profiles`
- `user_id` (FK), `agency_id` (FK), `owner_reference_id`, `license_verified`,
  `rating`, `is_active_today`, `current_location (geography, nullable)`

### `bookings`
- `id`, `customer_id` (FK), `agency_id` (FK), `worker_id` (FK, nullable until
  assigned), `status` (enum — matches `BookingStatus` in `packages/shared-types`),
  `scheduled_slot`, `created_at`, `updated_at`
- `status` transitions are enforced in the API layer, not just the DB — the two
  approval gates (assign, then release contact) must be explicit state changes.

### `contact_releases`
- `booking_id` (FK), `released_by` (owner user_id), `released_at`
- Kept as its own audit table rather than a boolean flag on `bookings`, so the
  two-step approval is auditable.

### `kyc_records`
- `user_id` (FK), `provider_ref` (token from e-KYC provider), `status`,
  `verified_at`
- **No raw document numbers stored here or anywhere else.**

### `payments`
- `booking_id` (FK), `upi_ref`, `amount`, `status`, `created_at`

### `notifications_log`
- `booking_id` (FK), `channel` (`whatsapp | sms | email | push`), `sent_at`, `status`

## Indexes worth calling out

- Geo index (PostGIS `GIST`) on `worker_profiles.current_location` and
  `agencies.location` for nearest-worker/agency queries.
- Index on `bookings.status` (queue queries, e.g. "all pending_owner_approval for this
  agency").

## Migration ownership

A may draft new migration files (e.g. for a new analytics column) under
`packages/db/migrations/` and open a PR, but C reviews and merges every migration
against the live schema.

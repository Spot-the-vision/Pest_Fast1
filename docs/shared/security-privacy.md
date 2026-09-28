# Security & Privacy

## Identity data (KYC)

- Owners submit: Aadhaar, PAN, bank account, voter ID.
- Workers submit: the same documents, plus the owner's reference ID.
- **Raw documents/numbers are never stored in our database.** KYC is verified through
  an e-KYC provider; we store only the provider's verification token and status
  (`not_submitted | pending | verified | rejected`).
- Login is via email or mobile number (OTP), not the KYC identifiers.

## Contact masking (customer ↔ worker)

- On booking approval, the worker is assigned but sees only a masked display name and
  proxy phone number — no location.
- The agency owner must grant a **second, separate** permission before the worker
  receives the real phone number and live location.
- The customer never sees the worker's real phone number directly either — routed
  through the same proxy/masking layer, mirrored from the worker's side.

## Access control

- Four distinct role/session spaces: customer, worker, agency owner, internal
  admin/developer. No shared session shape, no shared login screen.
- The internal admin/developer view (`apps/admin-dashboard`) must be unreachable from
  any customer/worker/agency-owner surface — no visible link, no shared nav component.

## Data retention & deletion

- Define retention windows for booking history, location traces, and KYC verification
  tokens before Play Store submission (required for the data-safety form).
- Support account/data deletion requests (Play Store policy requirement).

## Payments

- UPI via a payment gateway — we do not store raw bank details beyond what the
  gateway/KYC provider tokenizes for us.

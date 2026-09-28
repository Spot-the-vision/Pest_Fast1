// Owned by Person C. Do not edit from apps/admin-dashboard, apps/agency-dashboard,
// apps/worker-app, or apps/customer-app. Request new fields via a PR here instead.

export type BookingStatus =
  | "pending_owner_approval"
  | "approved"
  | "worker_assigned_masked" // owner approved; worker sees masked contact only
  | "contact_released"       // owner's second permission granted; real contact visible
  | "in_progress"
  | "completed"
  | "cancelled";

export interface MaskedContact {
  displayName: string; // e.g. "Worker #4521" — never the real name
  proxyPhone: string;  // masked/proxy number, not the real one
}

export interface RealContact {
  name: string;
  phone: string;
  liveLocation: { lat: number; lng: number };
}

export interface Booking {
  id: string;
  customerId: string;
  agencyId: string;
  status: BookingStatus;
  scheduledSlot: string; // ISO datetime
  workerId?: string;     // set once approved + assigned
  contact?: MaskedContact | RealContact; // shape depends on status — check status first
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  customerId: string;
  agencyId: string;
  scheduledSlot: string;
}

export interface CreateBookingResponse {
  booking: Booking;
}

export interface ApproveBookingRequest {
  bookingId: string;
  ownerId: string;
}

export interface ApproveBookingResponse {
  booking: Booking;
}

export interface ReleaseContactRequest {
  bookingId: string;
  ownerId: string;
}

export interface ReleaseContactResponse {
  booking: Booking; // status becomes "contact_released", contact becomes RealContact
}

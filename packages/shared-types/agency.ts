// Owned by Person C.

export type KycStatus = "not_submitted" | "pending" | "verified" | "rejected";

export interface Agency {
  id: string;
  name: string;
  ownerId: string;
  kycStatus: KycStatus; // backed by e-KYC provider token, never raw documents
  rating: number;
  location: { lat: number; lng: number };
  isTopRated?: boolean; // used for customer-facing discovery ranking
  createdAt: string;
}

export interface AgencyWorkerActivity {
  agencyId: string;
  date: string; // YYYY-MM-DD
  location: string; // state/area label
  activeWorkerCount: number;
}

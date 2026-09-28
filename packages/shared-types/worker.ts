// Owned by Person C.

import type { KycStatus } from "./agency";

export interface Worker {
  id: string;
  agencyId: string;
  ownerReferenceId: string; // reference ID from the agency owner at signup
  kycStatus: KycStatus;
  licenseVerified: boolean;
  rating: number;
  isActiveToday: boolean;
  currentLocation?: { lat: number; lng: number }; // only populated when on an active job
}

// Owned by Person C.

export interface Customer {
  id: string;
  name: string;
  phone: string;
  homeAgencyId?: string; // set if they're an existing customer of a specific agency
  createdAt: string;
}

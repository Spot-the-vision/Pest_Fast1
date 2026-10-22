import {
  FileText,
  ShieldCheck,
  UserCheck,
  Navigation,
  MapPin,
  SprayCan,
  Award,
} from 'lucide-react';

export const PEST_IMAGES = {
  cockroaches: '/assets/services/service-cockroach.png',
  termites: '/assets/services/service-termite.png',
  bedbugs: '/assets/services/service-bedbug.png',
  rodents: '/assets/services/service-rodent.png',
  mosquitoes: '/assets/services/service-mosquito.png',
  sanitization: '/assets/services/service-sanitization.png',
};

export const DAY_OPTS = [
  { id: 'today', label: 'Today (Priority)' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'weekend', label: 'This Weekend' },
];

export const SAVED_ADDRESSES = [
  {
    label: 'Home - Jayanagar',
    text: 'Flat 402, Palm Grove Residency, 11th Main Rd, Jayanagar 4th Block, Bengaluru 560011',
    coords: { lat: 12.9250, lng: 77.5938 },
  },
  {
    label: 'Parents - Indiranagar',
    text: 'House 18, 100ft Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
    coords: { lat: 12.9784, lng: 77.6408 },
  },
  {
    label: 'Office - HSR Layout',
    text: '2nd Floor, Lotus Tech Park, 27th Main, HSR Layout Sector 2, Bengaluru 560102',
    coords: { lat: 12.9116, lng: 77.6389 },
  },
];

export const LIFECYCLE_STAGES = [
  {
    key: 'BOOKING_PLACED',
    step: '01',
    label: 'Order Placed',
    sub: 'Customer Request Logged',
    badge: 'Verified',
    icon: FileText,
  },
  {
    key: 'AGENCY_APPROVED',
    step: '02',
    label: 'Agency Ready',
    sub: 'Dispatch Cleared & Routed',
    badge: 'Approved',
    icon: ShieldCheck,
  },
  {
    key: 'TECHNICIAN_ACCEPTED',
    step: '03',
    label: 'Tech Assigned',
    sub: 'Chemical Vehicle Prepped',
    badge: 'Assigned',
    icon: UserCheck,
  },
  {
    key: 'ON_THE_WAY',
    step: '04',
    label: 'En Route',
    sub: 'Live GPS Satellite Transit',
    badge: 'Live ETA',
    icon: Navigation,
  },
  {
    key: 'ARRIVED',
    step: '05',
    label: 'At Doorstep',
    sub: '4-Digit Start OTP Check',
    badge: 'Doorstep',
    icon: MapPin,
  },
  {
    key: 'IN_PROGRESS',
    step: '06',
    label: 'In Progress',
    sub: '6-Step CIB Barrier Safety',
    badge: 'Treating',
    icon: SprayCan,
  },
  {
    key: 'COMPLETED',
    step: '07',
    label: 'Completed',
    sub: 'PIN, Review & UPI Settled',
    badge: 'Closed',
    icon: Award,
  },
];

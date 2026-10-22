/**
 * Shared Domain Constants for Easy HiCare
 * Pure JavaScript module without TypeScript or HTML.
 */

export const PEST_TYPES = [
  {
    id: 'cockroaches',
    name: 'Cockroaches & ants',
    basePrice: 799,
    tagline: 'Odorless gel baiting + crevice spray',
    chemicalUsed: 'Fipronil 0.05% Gel & Deltamethrin 2.5% EC',
  },
  {
    id: 'termites',
    name: 'Termites & woodborers',
    basePrice: 1499,
    tagline: 'Drill-inject-seal sub-floor & woodwork barrier',
    chemicalUsed: 'Imidacloprid 30.5% SC (CIB&RC Approved)',
  },
  {
    id: 'bedbugs',
    name: 'Bedbugs',
    basePrice: 1699,
    tagline: '180°C dry steam + dual-contact seam treatment',
    chemicalUsed: 'Deltamethrin 2.5% EC + Thermal Steam',
  },
  {
    id: 'rodents',
    name: 'Rodents & mice',
    basePrice: 999,
    tagline: 'Tamper-proof bait stations + copper mesh sealing',
    chemicalUsed: 'Bromadiolone 0.005% Wax Blocks (Locked Stations)',
  },
  {
    id: 'mosquitoes',
    name: 'Mosquitoes & flies',
    basePrice: 699,
    tagline: 'Cold ULV misting + balcony drain larvicide',
    chemicalUsed: 'Cypermethrin 10% EC Water-Emulsion',
  },
  {
    id: 'sanitization',
    name: 'Full home sanitization',
    basePrice: 1199,
    tagline: 'Food-safe hospital-grade surface & air misting',
    chemicalUsed: 'Quaternary Ammonium Compound (Eco-Bio Grade)',
  },
];

export const PROPERTY_SIZES = [
  { id: '1bhk', label: '1 BHK', areaHint: 'Up to 600 sq ft', multiplier: 1.0 },
  { id: '2bhk', label: '2 BHK', areaHint: '600–1,050 sq ft', multiplier: 1.3 },
  { id: '3bhk', label: '3 BHK', areaHint: '1,050–1,600 sq ft', multiplier: 1.6 },
  { id: '4bhk', label: '4+ BHK / Villa', areaHint: '1,600–2,800 sq ft', multiplier: 2.1 },
  { id: 'commercial', label: 'Office / Shop', areaHint: 'Commercial space', multiplier: 2.5 },
];

export const TREATMENT_PLANS = [
  {
    id: 'standard',
    name: 'Eco standard',
    multiplier: 1.0,
    warrantyDays: 30,
    description: 'Low-odor botanical & targeted treatment for mild activity. 30-day free re-service warranty.',
  },
  {
    id: 'barrier',
    name: 'Dual-layer barrier',
    multiplier: 1.4,
    warrantyDays: 90,
    badge: 'Most popular',
    description: 'Bayer gel matrix + micro-encapsulated perimeter seal for active colonies. 90-day warranty.',
  },
  {
    id: 'shield',
    name: 'Annual 360° shield',
    multiplier: 2.4,
    warrantyDays: 365,
    badge: 'Year-round cover',
    description: '4 quarterly treatments + unlimited free emergency callouts for 365 days.',
  },
];

export const PLANS = TREATMENT_PLANS;

export const TIME_SLOTS = [
  '09:00 - 11:00 AM',
  '01:00 - 03:00 PM',
  '05:00 - 07:00 PM',
];

export const DAY_OPTS = [
  { id: 'today', label: 'Today', sub: 'Arrival in 60 mins' },
  { id: 'tomorrow', label: 'Tomorrow', sub: 'Flexible slots' },
  { id: 'weekend', label: 'Weekend', sub: 'Saturday / Sunday' },
];

export const SAVED_ADDRESSES = [
  'Flat 402, Green Glen Layout, Bellandur, Bangalore',
  'Villa 18, Palm Meadows, Whitefield, Bangalore',
  'No. 88, 4th Main, Indiranagar, Bangalore',
];

export const LIFECYCLE_STAGES = [
  { key: 'BOOKING_PLACED', label: 'Requested', desc: 'Booking received by system' },
  { key: 'AGENCY_APPROVED', label: 'Dispatched', desc: 'Assigned to nearest licensed tech' },
  { key: 'TECHNICIAN_ACCEPTED', label: 'Accepted', desc: 'Technician confirmed arrival route' },
  { key: 'EN_ROUTE', label: 'En Route', desc: 'Live GPS radar active' },
  { key: 'ARRIVED', label: 'At Doorstep', desc: 'Waiting for safety clearance' },
  { key: 'IN_PROGRESS', label: 'Treating', desc: 'CIB&RC formulation in progress' },
  { key: 'COMPLETED', label: 'Protected', desc: 'Signed, verified & warranty active' },
];

export const SAFETY_STEPS_TEMPLATE = [
  { id: 'ppe', label: 'Put on respirator mask, nitrile gloves and eye shield', completed: false },
  { id: 'inspect', label: 'Inspect crevices, moisture pockets and entry points', completed: false },
  { id: 'clear_zone', label: 'Confirm children, pets and open food are clear of spray zone', completed: false },
  { id: 'mix_batch', label: 'Calibrate CIB&RC-approved formulation to 50 ml/m² ratio', completed: false },
  { id: 'apply_barrier', label: 'Apply perimeter barrier and targeted gel bait points', completed: false },
  { id: 'ventilate', label: 'Ventilate treated rooms and place re-entry caution tags', completed: false },
];

export const SAFETY_CHECKLIST_STEPS = [
  { title: 'Don PPE gear', description: 'Gloves, goggles, respirator, and coverall must be worn before opening any chemical.' },
  { title: 'Read CSDS label', description: 'Verify chemical, dilution ratio, and application method match the job card.' },
  { title: 'Prepare dilution', description: 'Mix at the prescribed ratio. Use calibrated measuring cylinder only.' },
  { title: 'Seal food & pets area', description: 'Confirm customer has covered food, water, and removed pets from treatment zone.' },
  { title: 'Apply treatment', description: 'Follow prescribed spray pattern / gel placement. Do not exceed label dose.' },
  { title: 'Post-treatment ventilation', description: 'Open windows. Confirm re-entry wait time with customer before leaving.' },
];

export const CANDIDATE_WORKERS = [
  {
    id: 'WRK-101',
    name: 'Vikram Rathore',
    rating: 4.95,
    completedJobsCount: 428,
    activeLoad: 0,
    kycVerified: true,
    available: true,
    licenseCode: 'CHL-2024-889',
    proxyPhone: '+91 80 4912 3456 (Ext 81)',
    realPhone: '+91 98765 43210',
    lat: 12.925,
    lng: 77.5938,
  },
  {
    id: 'WRK-102',
    name: 'Rahul Deshmukh',
    rating: 4.78,
    completedJobsCount: 215,
    activeLoad: 2,
    kycVerified: true,
    available: true,
    licenseCode: 'CHL-2023-512',
    proxyPhone: '+91 80 4912 3456 (Ext 44)',
    realPhone: '+91 98111 22334',
    lat: 12.935,
    lng: 77.61,
  },
  {
    id: 'WRK-103',
    name: 'Suresh Nair',
    rating: 4.85,
    completedJobsCount: 310,
    activeLoad: 1,
    kycVerified: false,
    available: true,
    licenseCode: 'CHL-2024-109',
    proxyPhone: '+91 80 4912 3456 (Ext 19)',
    realPhone: '+91 98222 33445',
    lat: 12.918,
    lng: 77.585,
  },
];

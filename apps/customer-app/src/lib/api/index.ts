import { z } from 'zod';

export type PestTypeId =
  | 'cockroaches'
  | 'termites'
  | 'bedbugs'
  | 'rodents'
  | 'mosquitoes'
  | 'sanitization';

export type PropertySizeId = '1bhk' | '2bhk' | '3bhk' | '4bhk' | 'commercial';

export type PlanId = 'standard' | 'barrier' | 'shield';

export type DaySlotId = 'today' | 'tomorrow' | 'weekend';

export type TimeSlotId =
  | '09:00 - 11:00 AM'
  | '01:00 - 03:00 PM'
  | '05:00 - 07:00 PM';

export type DispatchMode = 'inspection' | 'treat_on_arrival';

export type BookingStatus =
  | 'BOOKING_PLACED'
  | 'AGENCY_APPROVED'
  | 'TECHNICIAN_ACCEPTED'
  | 'ON_THE_WAY'
  | 'ARRIVED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export type DutyStatus = 'ON_DUTY' | 'ON_JOB' | 'OFF_DUTY';

export interface PestTypeOption {
  id: PestTypeId;
  name: string;
  basePrice: number;
  tagline: string;
  chemicalUsed: string;
  image?: string;
}

export interface PropertySizeOption {
  id: PropertySizeId;
  label: string;
  areaHint: string;
  multiplier: number;
}

export interface PlanOption {
  id: PlanId;
  name: string;
  multiplier: number;
  warrantyDays: number;
  badge?: string;
  description: string;
}

export const PEST_TYPES: PestTypeOption[] = [
  {
    id: 'cockroaches',
    name: 'Cockroaches & ants',
    basePrice: 799,
    tagline: 'Odorless gel baiting + crevice spray',
    chemicalUsed: 'Fipronil 0.05% Gel & Deltamethrin 2.5% EC',
    image: '/images/ants.jpeg',
  },
  {
    id: 'termites',
    name: 'Termites & woodborers',
    basePrice: 1499,
    tagline: 'Drill-inject-seal sub-floor & woodwork barrier',
    chemicalUsed: 'Imidacloprid 30.5% SC (CIB&RC Approved)',
    image: '/images/termites.jpeg',
  },
  {
    id: 'bedbugs',
    name: 'Bedbugs',
    basePrice: 1699,
    tagline: '180°C dry steam + dual-contact seam treatment',
    chemicalUsed: 'Deltamethrin 2.5% EC + Thermal Steam',
    image: '/images/bedbugs.jpeg',
  },
  {
    id: 'rodents',
    name: 'Rodents & mice',
    basePrice: 999,
    tagline: 'Tamper-proof bait stations + copper mesh sealing',
    chemicalUsed: 'Bromadiolone 0.005% Wax Blocks (Locked Stations)',
    image: '/images/rodents.jpeg',
  },
  {
    id: 'mosquitoes',
    name: 'Mosquitoes & flies',
    basePrice: 699,
    tagline: 'Cold ULV misting + balcony drain larvicide',
    chemicalUsed: 'Cypermethrin 10% EC Water-Emulsion',
    image: '/images/mosquitoes.jpeg',
  },
];

export const PROPERTY_SIZES: PropertySizeOption[] = [
  { id: '1bhk', label: '1 BHK', areaHint: 'Up to 600 sq ft', multiplier: 1.0 },
  { id: '2bhk', label: '2 BHK', areaHint: '600–1,050 sq ft', multiplier: 1.3 },
  { id: '3bhk', label: '3 BHK', areaHint: '1,050–1,600 sq ft', multiplier: 1.6 },
  { id: '4bhk', label: '4+ BHK / Villa', areaHint: '1,600–2,800 sq ft', multiplier: 2.1 },
  { id: 'commercial', label: 'Office / Shop', areaHint: 'Commercial space', multiplier: 2.5 },
];

export const TREATMENT_PLANS: PlanOption[] = [
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

export const SAFETY_STEPS_TEMPLATE = [
  { id: 'ppe', label: 'Put on respirator mask, nitrile gloves and eye shield', completed: false },
  { id: 'inspect', label: 'Inspect crevices, moisture pockets and entry points', completed: false },
  { id: 'clear_zone', label: 'Confirm children, pets and open food are clear of spray zone', completed: false },
  { id: 'mix_batch', label: 'Calibrate CIB&RC-approved formulation to 50 ml/m² ratio', completed: false },
  { id: 'apply_barrier', label: 'Apply perimeter barrier and targeted gel bait points', completed: false },
  { id: 'ventilate', label: 'Ventilate treated rooms and place re-entry caution tags', completed: false },
] as const;

export type SafetyStepId = (typeof SAFETY_STEPS_TEMPLATE)[number]['id'];

export interface SafetyStep {
  id: SafetyStepId;
  label: string;
  completed: boolean;
}

export interface PriceBreakdown {
  basePrice: number;
  sizeMultiplier: number;
  planMultiplier: number;
  subtotal: number;
  gst: number;
  total: number;
  payableNow: number;
}

/**
 * Pure pricing function: base * size * plan + 18% GST.
 * Inspection-first requires Rs 0 advance.
 */
export function calculatePrice(
  pestType: PestTypeId,
  propertySize: PropertySizeId,
  plan: PlanId,
  dispatchMode: DispatchMode
): PriceBreakdown {
  const pest = PEST_TYPES.find((p) => p.id === pestType) ?? PEST_TYPES[0];
  const size = PROPERTY_SIZES.find((s) => s.id === propertySize) ?? PROPERTY_SIZES[0];
  const planObj = TREATMENT_PLANS.find((pl) => pl.id === plan) ?? TREATMENT_PLANS[0];

  const subtotal = Math.round(pest.basePrice * size.multiplier * planObj.multiplier);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;
  const payableNow = dispatchMode === 'inspection' ? 0 : total;

  return {
    basePrice: pest.basePrice,
    sizeMultiplier: size.multiplier,
    planMultiplier: planObj.multiplier,
    subtotal,
    gst,
    total,
    payableNow,
  };
}


/**
 * Multi-service pricing calculator:
 * Sums base prices of all selected pests (with 15% bundle discount if 2+ pests),
 * then applies size & plan multipliers + 18% GST.
 */
export function calculateMultiServicePrice(
  pestTypes: PestTypeId[],
  propertySize: PropertySizeId,
  plan: PlanId,
  dispatchMode: DispatchMode
): PriceBreakdown & { bundleDiscount: number; pests: PestTypeOption[] } {
  if (!pestTypes || pestTypes.length === 0) {
    const size = PROPERTY_SIZES.find((s) => s.id === propertySize) ?? PROPERTY_SIZES[0];
    const planObj = TREATMENT_PLANS.find((pl) => pl.id === plan) ?? TREATMENT_PLANS[0];
    return {
      basePrice: 0,
      sizeMultiplier: size ? size.multiplier : 1,
      planMultiplier: planObj ? planObj.multiplier : 1,
      subtotal: 0,
      gst: 0,
      total: 0,
      payableNow: 0,
      bundleDiscount: 0,
      pests: [],
    };
  }
  const selectedPests = pestTypes.map((id) => PEST_TYPES.find((p) => p.id === id) ?? PEST_TYPES[0]);

  const rawSum = selectedPests.reduce((acc, p) => acc + p.basePrice, 0);
  const bundleDiscount = selectedPests.length > 1 ? Math.round(rawSum * 0.15) : 0;
  const effectiveBase = rawSum - bundleDiscount;

  const size = PROPERTY_SIZES.find((s) => s.id === propertySize) ?? PROPERTY_SIZES[0];
  const planObj = TREATMENT_PLANS.find((pl) => pl.id === plan) ?? TREATMENT_PLANS[0];

  const subtotal = Math.round(effectiveBase * size.multiplier * planObj.multiplier);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;
  const payableNow = dispatchMode === 'inspection' ? 0 : total;

  return {
    basePrice: effectiveBase,
    sizeMultiplier: size.multiplier,
    planMultiplier: planObj.multiplier,
    subtotal,
    gst,
    total,
    payableNow,
    bundleDiscount,
    pests: selectedPests,
  };
}

export const BookingInputSchema = z.object({
  pestType: z.enum(['cockroaches', 'termites', 'bedbugs', 'rodents', 'mosquitoes', 'sanitization']),
  propertySize: z.enum(['1bhk', '2bhk', '3bhk', '4bhk', 'commercial']),
  plan: z.enum(['standard', 'barrier', 'shield']),
  day: z.enum(['today', 'tomorrow', 'weekend']),
  slot: z.enum(['09:00 - 11:00 AM', '01:00 - 03:00 PM', '05:00 - 07:00 PM']),
  address: z
    .string()
    .trim()
    .min(10, 'Please enter a complete flat/house number, street and locality (at least 10 characters).')
    .max(200, 'Address must be under 200 characters.'),
  note: z.string().max(280, 'Note must be under 280 characters.').optional().default(''),
  dispatchMode: z.enum(['inspection', 'treat_on_arrival']),
});

export type BookingInput = z.infer<typeof BookingInputSchema>;

export interface WorkerCandidate {
  id: string;
  name: string;
  rating: number;
  completedJobsCount: number;
  activeLoad: number;
  kycVerified: boolean;
  available: boolean;
  licenseCode: string;
  proxyPhone: string;
  realPhone: string;
  lat: number;
  lng: number;
}

export interface ScoredWorker extends WorkerCandidate {
  distanceKm: number;
  score: number;
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Pure dispatch scoring function (AI Feature #3).
 * Ranks available, KYC-verified workers by distance (50%), rating (35%) and current load (15%).
 */
export function scoreAndRankWorkers(
  workers: WorkerCandidate[],
  target: { lat: number; lng: number }
): ScoredWorker[] {
  return workers
    .filter((w) => w.available && w.kycVerified)
    .map((w) => {
      const distanceKm = Number(haversineKm(w.lat, w.lng, target.lat, target.lng).toFixed(2));
      const distanceScore = Math.max(0, 50 * (1 - distanceKm / 15));
      const ratingScore = Math.max(0, Math.min(35, ((w.rating - 3.5) / 1.5) * 35));
      const loadScore = Math.max(0, 15 * (1 - w.activeLoad / 5));
      const score = Number((distanceScore + ratingScore + loadScore).toFixed(2));
      return { ...w, distanceKm, score };
    })
    .sort((a, b) => b.score - a.score || a.distanceKm - b.distanceKm);
}

export const CANDIDATE_WORKERS: WorkerCandidate[] = [
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
    lat: 28.425,
    lng: 77.041,
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
    lat: 28.465,
    lng: 77.082,
  },
  {
    id: 'WRK-103',
    name: 'Suresh Nair',
    rating: 4.85,
    completedJobsCount: 310,
    activeLoad: 1,
    kycVerified: false, // Unverified KYC must never be dispatched
    available: true,
    licenseCode: 'CHL-2024-109',
    proxyPhone: '+91 80 4912 3456 (Ext 19)',
    realPhone: '+91 98222 33445',
    lat: 28.421,
    lng: 77.039,
  },
];

export interface ActiveBooking {
  id: string;
  createdAt: string;
  status: BookingStatus;
  pestType: PestTypeId;
  propertySize: PropertySizeId;
  plan: PlanId;
  day: DaySlotId;
  slot: TimeSlotId;
  address: string;
  areaOnly: string;
  note: string;
  dispatchMode: DispatchMode;
  pricing: PriceBreakdown;
  customerMaskedName: string;
  customerFullName: string;
  customerProxyPhone: string;
  customerRealPhone: string;
  ownerApproved: boolean;
  ownerUnlockedContact: boolean;
  whatsappPingCount: number;
  etaSeconds: number;
  initialEtaSeconds: number;
  routeProgress: number; // 0 to 1
  startOtp: string;
  otpVerified: boolean;
  technician: ScoredWorker | null;
  safetySteps: SafetyStep[];
  afterPhotoDataUrl: string | null;
  workerPayout: number;
  rating: number | null;
  reviewComment: string;
}

export interface RouteStop {
  id: string;
  time: string;
  title: string;
  area: string;
  payout: number;
  status: 'Completed' | 'Active' | 'Upcoming';
}

export interface PayoutRecord {
  id: string;
  amount: number;
  requestedAt: string;
  upiId: string;
  status: 'Transferred via IMPS';
}

export type BookingEvent =
  | { type: 'AGENCY_APPROVE'; worker?: ScoredWorker }
  | { type: 'WORKER_ACCEPT' }
  | { type: 'PING_OWNER_WHATSAPP' }
  | { type: 'OWNER_UNLOCK_CONTACT' }
  | { type: 'TICK_ETA'; seconds?: number }
  | { type: 'WORKER_ARRIVE' }
  | { type: 'VERIFY_OTP_AND_START'; otp: string }
  | { type: 'TOGGLE_SAFETY_STEP'; stepId: SafetyStepId }
  | { type: 'CAPTURE_AFTER_PHOTO'; dataUrl: string }
  | { type: 'COMPLETE_TREATMENT' }
  | { type: 'CANCEL_BOOKING' }
  | { type: 'RATE_BOOKING'; rating: number; comment?: string };

export class InvalidTransitionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidTransitionError';
  }
}

export function extractAreaFromAddress(address: string): string {
  const parts = address
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    return parts.slice(-2).join(', ');
  }
  return 'Sector 48, Gurgaon';
}

export function createBookingFromInput(input: BookingInput, id = 'PF-8842'): ActiveBooking {
  const parsed = BookingInputSchema.parse(input);
  const pricing = calculatePrice(
    parsed.pestType,
    parsed.propertySize,
    parsed.plan,
    parsed.dispatchMode
  );
  const workerPayout = Math.max(350, Math.round(pricing.subtotal * 0.32));

  return {
    id,
    createdAt: new Date().toISOString(),
    status: 'BOOKING_PLACED',
    pestType: parsed.pestType,
    propertySize: parsed.propertySize,
    plan: parsed.plan,
    day: parsed.day,
    slot: parsed.slot,
    address: parsed.address,
    areaOnly: extractAreaFromAddress(parsed.address),
    note: parsed.note ?? '',
    dispatchMode: parsed.dispatchMode,
    pricing,
    customerMaskedName: 'Aarav S.',
    customerFullName: 'Aarav Sharma',
    customerProxyPhone: '+91 80 4912 3400 (Proxy)',
    customerRealPhone: '+91 98765 43210',
    ownerApproved: false,
    ownerUnlockedContact: false,
    whatsappPingCount: 0,
    etaSeconds: 12,
    initialEtaSeconds: 12,
    routeProgress: 0,
    startOtp: '4829',
    otpVerified: false,
    technician: null,
    safetySteps: SAFETY_STEPS_TEMPLATE.map((s) => ({ ...s })),
    afterPhotoDataUrl: null,
    workerPayout,
    rating: null,
    reviewComment: '',
  };
}

/**
 * Pure, deterministic Booking State Machine.
 * Enforces every domain rule & throws InvalidTransitionError on any illegal transition.
 */
export function transitionBooking(booking: ActiveBooking, event: BookingEvent): ActiveBooking {
  switch (event.type) {
    case 'AGENCY_APPROVE': {
      if (booking.status !== 'BOOKING_PLACED') {
        throw new InvalidTransitionError(
          `Cannot approve booking from status ${booking.status}. Must be BOOKING_PLACED.`
        );
      }
      const ranked = scoreAndRankWorkers(CANDIDATE_WORKERS, { lat: 28.42, lng: 77.04 });
      const assigned = event.worker ?? ranked[0];
      if (!assigned) {
        throw new InvalidTransitionError('No available KYC-verified worker found.');
      }
      return {
        ...booking,
        status: 'AGENCY_APPROVED',
        ownerApproved: true,
        technician: assigned,
        routeProgress: 0.08,
      };
    }

    case 'WORKER_ACCEPT': {
      if (booking.status !== 'AGENCY_APPROVED') {
        throw new InvalidTransitionError(
          `Worker cannot accept job in status ${booking.status}. Must be AGENCY_APPROVED.`
        );
      }
      return {
        ...booking,
        status: 'TECHNICIAN_ACCEPTED',
        routeProgress: 0.15,
      };
    }

    case 'PING_OWNER_WHATSAPP': {
      if (booking.status !== 'TECHNICIAN_ACCEPTED') {
        throw new InvalidTransitionError(
          `Can only ping owner for contact unlock in TECHNICIAN_ACCEPTED status.`
        );
      }
      return {
        ...booking,
        whatsappPingCount: booking.whatsappPingCount + 1,
      };
    }

    case 'OWNER_UNLOCK_CONTACT': {
      if (booking.status !== 'TECHNICIAN_ACCEPTED') {
        throw new InvalidTransitionError(
          `Owner can only grant second permission after worker accepts (current: ${booking.status}).`
        );
      }
      return {
        ...booking,
        status: 'ON_THE_WAY',
        ownerUnlockedContact: true,
        routeProgress: 0.25,
      };
    }

    case 'TICK_ETA': {
      if (booking.status !== 'ON_THE_WAY') {
        throw new InvalidTransitionError(`Cannot tick ETA when status is ${booking.status}.`);
      }
      const delta = event.seconds ?? 1;
      const nextEta = Math.max(0, booking.etaSeconds - delta);
      const ratio =
        booking.initialEtaSeconds > 0
          ? 1 - nextEta / booking.initialEtaSeconds
          : 1;
      const nextProgress = Number(Math.min(0.95, 0.25 + ratio * 0.7).toFixed(2));
      return {
        ...booking,
        etaSeconds: nextEta,
        routeProgress: nextProgress,
      };
    }

    case 'WORKER_ARRIVE': {
      if (booking.status !== 'ON_THE_WAY') {
        throw new InvalidTransitionError(
          `Worker can only mark arrived from ON_THE_WAY (current: ${booking.status}).`
        );
      }
      if (!booking.ownerUnlockedContact) {
        throw new InvalidTransitionError(
          'Worker cannot arrive before owner grants second permission.'
        );
      }
      if (booking.etaSeconds > 0) {
        throw new InvalidTransitionError(
          `Worker cannot mark arrived until ETA finishes (${booking.etaSeconds}s remaining).`
        );
      }
      return {
        ...booking,
        status: 'ARRIVED',
        etaSeconds: 0,
        routeProgress: 1,
      };
    }

    case 'VERIFY_OTP_AND_START': {
      if (booking.status !== 'ARRIVED') {
        throw new InvalidTransitionError(
          `Cannot start treatment before worker arrives (current: ${booking.status}).`
        );
      }
      if (event.otp.trim() !== booking.startOtp) {
        throw new InvalidTransitionError('Incorrect 4-digit start OTP. Ask the customer for the code on their Track screen.');
      }
      return {
        ...booking,
        status: 'IN_PROGRESS',
        otpVerified: true,
      };
    }

    case 'TOGGLE_SAFETY_STEP': {
      if (booking.status !== 'IN_PROGRESS') {
        throw new InvalidTransitionError(
          `Safety checklist can only be updated during IN_PROGRESS (current: ${booking.status}).`
        );
      }
      return {
        ...booking,
        safetySteps: booking.safetySteps.map((step) =>
          step.id === event.stepId ? { ...step, completed: !step.completed } : step
        ),
      };
    }

    case 'CAPTURE_AFTER_PHOTO': {
      if (booking.status !== 'IN_PROGRESS') {
        throw new InvalidTransitionError(
          `After-photo can only be captured during IN_PROGRESS (current: ${booking.status}).`
        );
      }
      if (!event.dataUrl || !event.dataUrl.trim()) {
        throw new InvalidTransitionError('Valid photo proof is required.');
      }
      return {
        ...booking,
        afterPhotoDataUrl: event.dataUrl,
      };
    }

    case 'COMPLETE_TREATMENT': {
      if (booking.status !== 'IN_PROGRESS') {
        throw new InvalidTransitionError(
          `Cannot complete treatment from status ${booking.status}. Must be IN_PROGRESS.`
        );
      }
      const allSixChecked = booking.safetySteps.every((s) => s.completed);
      if (!allSixChecked) {
        throw new InvalidTransitionError(
          'All 6 safety and protocol steps must be ticked before completing.'
        );
      }
      if (!booking.afterPhotoDataUrl) {
        throw new InvalidTransitionError(
          'An after-treatment photo must be captured before completing.'
        );
      }
      return {
        ...booking,
        status: 'COMPLETED',
      };
    }

    case 'CANCEL_BOOKING': {
      const cancellableStatuses: BookingStatus[] = [
        'BOOKING_PLACED',
        'AGENCY_APPROVED',
        'TECHNICIAN_ACCEPTED',
      ];
      if (!cancellableStatuses.includes(booking.status)) {
        throw new InvalidTransitionError(
          `Cancellation is not allowed once the technician is ${booking.status.replace(/_/g, ' ').toLowerCase()}.`
        );
      }
      return {
        ...booking,
        status: 'CANCELLED',
      };
    }

    case 'RATE_BOOKING': {
      if (booking.status !== 'COMPLETED') {
        throw new InvalidTransitionError('Can only rate a completed booking.');
      }
      if (event.rating < 1 || event.rating > 5) {
        throw new InvalidTransitionError('Rating must be between 1 and 5 stars.');
      }
      return {
        ...booking,
        rating: event.rating,
        reviewComment: event.comment?.trim() ?? '',
      };
    }

    default:
      throw new InvalidTransitionError('Unknown booking event.');
  }
}

/**
 * Bundled Chemical Safety Data Sheets (CSDS) for Safety Tab & AI Safety Assistant
 */
export interface ChemicalSheet {
  id: string;
  name: string;
  activeIngredient: string;
  cibrcReg: string;
  targetPests: string;
  dilutionRatio: string;
  reEntryMinutes: number;
  requiredPpe: string[];
  firstAidInhalation: string;
  firstAidSkinEye: string;
  firstAidIngestion: string;
  antidote: string;
}

export const BUNDLED_CHEMICAL_SHEETS: ChemicalSheet[] = [
  {
    id: 'deltamethrin',
    name: 'Deltamethrin 2.5% EC (Flow)',
    activeIngredient: 'Deltamethrin 2.5% w/w Emulsifiable Concentrate',
    cibrcReg: 'CIR-10428/2022-Deltamethrin(EC)',
    targetPests: 'Cockroaches, bedbugs, ants and crawling insects',
    dilutionRatio: '20 ml per 1 litre of water (apply 50 ml emulsion per sq metre)',
    reEntryMinutes: 90,
    requiredPpe: ['Nitrile gloves', 'N95 / organic vapor respirator', 'Wrap-around eye shield'],
    firstAidInhalation: 'Move person to fresh air immediately. Keep warm and at rest. Seek medical care if coughing persists.',
    firstAidSkinEye: 'Wash skin with plenty of soap and cool water for 15 minutes. Flush eyes with clean water for 15 minutes.',
    firstAidIngestion: 'Do NOT induce vomiting. Rinse mouth with water and transport to hospital with this data sheet.',
    antidote: 'No specific antidote. Treat symptomatically with antihistamines and dermal vitamin E cream for paresthesia.',
  },
  {
    id: 'imidacloprid',
    name: 'Imidacloprid 30.5% SC (Termite Shield)',
    activeIngredient: 'Imidacloprid 30.5% w/w Suspension Concentrate',
    cibrcReg: 'CIR-88219/2023-Imidacloprid(SC)',
    targetPests: 'Subterranean termites and woodborers',
    dilutionRatio: '2.1 ml per 1 litre of water for sub-floor drill holes',
    reEntryMinutes: 60,
    requiredPpe: ['Heavy-duty nitrile gloves', 'Splash goggles', 'Long-sleeve cotton coverall'],
    firstAidInhalation: 'Remove to fresh air immediately. Administer oxygen if breathing is difficult.',
    firstAidSkinEye: 'Remove contaminated clothing. Wash skin thoroughly with soap and water. Irrigate eyes for 15 minutes.',
    firstAidIngestion: 'Never give anything by mouth to an unconscious person. Call National Poison Centre (1800-11-2233).',
    antidote: 'No specific antidote; do NOT administer oximes or atropine unless organophosphate co-exposure is confirmed.',
  },
  {
    id: 'fipronil',
    name: 'Fipronil 0.05% Odorless Gel Bait',
    activeIngredient: 'Fipronil 0.05% w/w Ready-to-use Bait Matrix',
    cibrcReg: 'CIR-55190/2023-Fipronil(Gel)',
    targetPests: 'German and American cockroaches in kitchens and electrical hinges',
    dilutionRatio: 'Ready to use — apply 1–2 pea-sized dots (0.03 g) per sq metre',
    reEntryMinutes: 0,
    requiredPpe: ['Disposable nitrile gloves'],
    firstAidInhalation: 'Not volatile; inhalation hazard is negligible under normal use.',
    firstAidSkinEye: 'Wipe off gel with dry cloth, then wash skin with soap and water.',
    firstAidIngestion: 'Rinse mouth thoroughly. Drink 1 glass of water and consult poison control.',
    antidote: 'Symptomatic and supportive therapy.',
  },
];

/**
 * Deterministic Smart Quote Helper (AI Feature #1).
 */
export function generateSmartQuoteRecommendation(params: {
  pestType: PestTypeId;
  propertySize: PropertySizeId;
  note: string;
}): { recommendedPlan: PlanId; reason: string } {
  const noteLower = (params.note || '').toLowerCase();
  const isRecurringOrSevere =
    noteLower.includes('everywhere') ||
    noteLower.includes('months') ||
    noteLower.includes('recurring') ||
    noteLower.includes('heavy') ||
    noteLower.includes('severe') ||
    noteLower.includes('wood') ||
    noteLower.includes('furniture');

  if (params.propertySize === 'commercial' || (params.pestType === 'termites' && isRecurringOrSevere)) {
    return {
      recommendedPlan: 'shield',
      reason:
        'For structural termite activity or commercial premises, Annual 360° shield covers 4 quarterly inspections and free emergency re-visits all year.',
    };
  }

  if (
    params.pestType === 'bedbugs' ||
    params.pestType === 'termites' ||
    isRecurringOrSevere ||
    params.propertySize === '3bhk' ||
    params.propertySize === '4bhk'
  ) {
    return {
      recommendedPlan: 'barrier',
      reason:
        'Dual-layer barrier combines targeted baiting with a 90-day residual seal to stop hidden eggs and secondary nesting.',
    };
  }

  return {
    recommendedPlan: 'standard',
    reason:
      'Eco standard gives odorless botanical knockdown with a 30-day re-service guarantee—ideal for mild or first-time sightings.',
  };
}

/**
 * Grounded Worker Safety Assistant (AI Feature #2).
 * Answers ONLY from BUNDLED_CHEMICAL_SHEETS and explicitly says when it doesn't know.
 */
export function answerWorkerSafetyQuestion(question: string): {
  answer: string;
  matchedSheetId: string | null;
  known: boolean;
} {
  const q = question.toLowerCase().trim();
  if (!q) {
    return {
      answer: 'Ask me about dilution ratios, required PPE, re-entry time, or first-aid from the bundled Deltamethrin, Imidacloprid, or Fipronil data sheets.',
      matchedSheetId: null,
      known: false,
    };
  }

  // Identify target chemical sheet
  let sheet: ChemicalSheet | undefined;
  if (q.includes('deltamethrin') || q.includes('bedbug') || q.includes('2.5%')) {
    sheet = BUNDLED_CHEMICAL_SHEETS[0];
  } else if (q.includes('imidacloprid') || q.includes('termite') || q.includes('30.5%') || q.includes('drill')) {
    sheet = BUNDLED_CHEMICAL_SHEETS[1];
  } else if (q.includes('fipronil') || q.includes('gel') || q.includes('cockroach') || q.includes('kitchen')) {
    sheet = BUNDLED_CHEMICAL_SHEETS[2];
  }

  // Check topic
  const asksDilution = q.includes('dilut') || q.includes('mix') || q.includes('ratio') || q.includes('ml') || q.includes('water');
  const asksPpe = q.includes('ppe') || q.includes('glove') || q.includes('mask') || q.includes('wear') || q.includes('goggle');
  const asksFirstAid =
    q.includes('eye') ||
    q.includes('skin') ||
    q.includes('splash') ||
    q.includes('inhale') ||
    q.includes('swallow') ||
    q.includes('ingest') ||
    q.includes('first aid') ||
    q.includes('antidote') ||
    q.includes('spill');
  const asksReEntry = q.includes('re-entry') || q.includes('reentry') || q.includes('wait') || q.includes('enter') || q.includes('minutes');

  if (sheet) {
    if (asksDilution) {
      return {
        answer: `${sheet.name}: ${sheet.dilutionRatio} (Reg: ${sheet.cibrcReg}).`,
        matchedSheetId: sheet.id,
        known: true,
      };
    }
    if (asksPpe) {
      return {
        answer: `${sheet.name} requires: ${sheet.requiredPpe.join(', ')}.`,
        matchedSheetId: sheet.id,
        known: true,
      };
    }
    if (asksReEntry) {
      return {
        answer: `${sheet.name} re-entry time: ${
          sheet.reEntryMinutes === 0
            ? '0 minutes (immediate re-entry safe)'
            : `${sheet.reEntryMinutes} minutes of ventilation before residents re-enter`
        }.`,
        matchedSheetId: sheet.id,
        known: true,
      };
    }
    if (asksFirstAid) {
      return {
        answer: `${sheet.name} First Aid — Skin/Eye: ${sheet.firstAidSkinEye} Inhalation: ${sheet.firstAidInhalation} Antidote: ${sheet.antidote}`,
        matchedSheetId: sheet.id,
        known: true,
      };
    }
    return {
      answer: `${sheet.name} (${sheet.cibrcReg}): Mix at ${sheet.dilutionRatio}. PPE: ${sheet.requiredPpe.join(', ')}. Re-entry: ${sheet.reEntryMinutes} mins. First-aid: ${sheet.firstAidSkinEye}`,
      matchedSheetId: sheet.id,
      known: true,
    };
  }

  // General first aid or PPE across all bundled sheets
  if (asksFirstAid) {
    return {
      answer:
        'From bundled sheets: Flush skin or eyes with clean running water for 15 minutes. Move to fresh air if inhaled. Do NOT induce vomiting if ingested. Call National Poison Centre at 1800-11-2233. Specify Deltamethrin, Imidacloprid, or Fipronil for exact antidote notes.',
      matchedSheetId: null,
      known: true,
    };
  }
  if (asksDilution) {
    return {
      answer:
        'Bundled dilution ratios: Deltamethrin 2.5% EC = 20 ml/L water; Imidacloprid 30.5% SC = 2.1 ml/L water; Fipronil 0.05% Gel = ready-to-use (0.03 g dots).',
      matchedSheetId: null,
      known: true,
    };
  }

  return {
    answer:
      "I don't know based on the bundled safety data sheets. I only have verified data for Deltamethrin 2.5% EC, Imidacloprid 30.5% SC, and Fipronil 0.05% Gel. For other chemicals, contact the Agency Safety Desk or Poison Control (1800-11-2233).",
    matchedSheetId: null,
    known: false,
  };
}
// ─── Time slots array ─────────────────────────────────────────────────────

export const TIME_SLOTS: string[] = [
  '09:00 - 11:00 AM',
  '01:00 - 03:00 PM',
  '05:00 - 07:00 PM',
];

// ─── Safety checklist steps ───────────────────────────────────────────────

export interface SafetyStep {
  title: string;
  description: string;
}

export const SAFETY_CHECKLIST_STEPS: SafetyStep[] = [
  { title: 'Don PPE gear', description: 'Gloves, goggles, respirator, and coverall must be worn before opening any chemical.' },
  { title: 'Read CSDS label', description: 'Verify chemical, dilution ratio, and application method match the job card.' },
  { title: 'Prepare dilution', description: 'Mix at the prescribed ratio. Use calibrated measuring cylinder only.' },
  { title: 'Seal food & pets area', description: 'Confirm customer has covered food, water, and removed pets from treatment zone.' },
  { title: 'Apply treatment', description: 'Follow prescribed spray pattern / gel placement. Do not exceed label dose.' },
  { title: 'Post-treatment ventilation', description: 'Open windows. Confirm re-entry wait time with customer before leaving.' },
];

// Alias exports for UI compatibility
export const PLANS = TREATMENT_PLANS;

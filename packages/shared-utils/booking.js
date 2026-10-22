import {
  CANDIDATE_WORKERS,
  SAFETY_STEPS_TEMPLATE,
} from '@pest-free/shared-config';
import { calculatePrice } from './pricing.js';
import { extractAreaFromAddress } from './formatters.js';

export class InvalidTransitionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidTransitionError';
  }
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Pure dispatch scoring function.
 * Ranks available, KYC-verified workers by distance (50%), rating (35%) and current load (15%).
 */
export function scoreAndRankWorkers(workers, target) {
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

export function createBookingFromInput(input, id = 'PF-8842') {
  const pricing = calculatePrice(
    input.pestType,
    input.propertySize,
    input.plan,
    input.dispatchMode
  );
  const workerPayout = Math.max(350, Math.round(pricing.subtotal * 0.32));

  return {
    id,
    createdAt: new Date().toISOString(),
    status: 'BOOKING_PLACED',
    pestType: input.pestType,
    propertySize: input.propertySize,
    plan: input.plan,
    day: input.day,
    slot: input.slot,
    address: input.address,
    areaOnly: extractAreaFromAddress(input.address),
    note: input.note || '',
    dispatchMode: input.dispatchMode,
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
export function transitionBooking(booking, event) {
  switch (event.type) {
    case 'AGENCY_APPROVE': {
      if (booking.status !== 'BOOKING_PLACED') {
        throw new InvalidTransitionError(
          `Cannot approve booking from status ${booking.status}. Must be BOOKING_PLACED.`
        );
      }
      const ranked = scoreAndRankWorkers(CANDIDATE_WORKERS, { lat: 28.42, lng: 77.04 });
      const assigned = event.worker || ranked[0];
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
        throw new InvalidTransitionError(
          'Incorrect 4-digit start OTP. Ask the customer for the code on their Track screen.'
        );
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
      const cancellableStatuses = [
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
        reviewComment: event.comment || '',
      };
    }

    default:
      return booking;
  }
}

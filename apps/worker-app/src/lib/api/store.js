/**
 * Worker-app Zustand store. Reads & writes remote state from /api/state
 * Synchronizes completionPin, paymentQrGenerated, customerReview, and liveCustomerLocation.
 */
import { create } from 'zustand';
import {
  transitionBooking,
  calculatePrice,
  calculateMultiServicePrice,
  PEST_TYPES,
  PROPERTY_SIZES,
  PLANS,
} from './index.ts';

function safeTransition(booking, targetOrEvent) {
  if (!booking) return booking;
  if (typeof targetOrEvent === 'string') {
    return { ...booking, status: targetOrEvent };
  }
  try {
    return transitionBooking(booking, targetOrEvent);
  } catch (_) {
    return booking;
  }
}

async function syncRemote(state) {
  try {
    await fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        booking: state.booking,
        workerPosition: state.workerPosition,
        assignedWorker: state.assignedWorker,
        contactUnlocked: state.contactUnlocked,
        incomingJob: state.incomingJob,
        startOtp: state.startOtp,
        completionPin: state.completionPin,
        workCompletedByWorker: state.workCompletedByWorker,
        pinVerifiedByWorker: state.pinVerifiedByWorker,
        paymentQrGenerated: state.paymentQrGenerated,
        customerPaid: state.customerPaid,
        customerReview: state.customerReview,
        etaSeconds: state.etaSeconds,
        liveCustomerLocation: state.liveCustomerLocation,
      }),
    });
  } catch (_) {}
}

async function fetchRemote() {
  try {
    const r = await fetch('/api/state');
    if (r.ok) {
      const text = await r.text();
      return text ? JSON.parse(text) : null;
    }
  } catch (_) {}
  return null;
}

const initialRouteStops = [
  {
    id: 'PF-8810',
    time: '09:00 - 11:00 AM',
    customer: 'Meera Krishnan',
    area: 'Indiranagar 100ft Rd, HAL 2nd Stage',
    service: 'Cockroaches & Ants - Dual-layer Barrier (2 BHK)',
    chemical: 'Fipronil 0.05% Gel & Deltamethrin 2.5% EC',
    payout: 640,
    status: 'Completed',
  },
  {
    id: 'PF-8824',
    time: '11:30 - 01:00 PM',
    customer: 'Rohan Kulkarni',
    area: 'Koramangala 4th Block, 80ft Road',
    service: 'Mosquitoes & Flies - Eco Standard (1 BHK)',
    chemical: 'Cypermethrin 10% EC Water-Emulsion',
    payout: 410,
    status: 'Completed',
  },
  {
    id: 'PF-8842',
    time: '01:00 - 03:00 PM',
    customer: 'Ravi Kumar',
    area: 'Jayanagar 4th Block, 11th Main Road',
    service: 'Termites & Woodborers - Dual-layer Barrier (3 BHK)',
    chemical: 'Imidacloprid 30.5% SC (CIB&RC Approved)',
    payout: 920,
    status: 'Active',
  },
  {
    id: 'PF-8859',
    time: '05:00 - 07:00 PM',
    customer: 'Priya Nair',
    area: 'HSR Layout Sector 2, 27th Main',
    service: 'Bedbugs - Dual-layer Barrier (2 BHK)',
    chemical: 'Deltamethrin 2.5% EC + Thermal Steam',
    payout: 860,
    status: 'Upcoming',
  },
];

const initialPayoutHistory = [
  { id: 'PO-9921', date: 'Yesterday, 07:45 PM', amount: 1420, upiId: 'arjun.sharma@okaxis', status: 'Settled via IMPS', utr: 'UTR4291804412' },
  { id: 'PO-9884', date: '28 Sep, 08:12 PM', amount: 1180, upiId: 'arjun.sharma@okaxis', status: 'Settled via IMPS', utr: 'UTR4290118823' },
  { id: 'PO-9840', date: '27 Sep, 06:50 PM', amount: 1600, upiId: 'arjun.sharma@okaxis', status: 'Settled via IMPS', utr: 'UTR4288901245' },
];

let etaTimerId = null;

const initialState = {
  booking: null,
  workerPosition: { lat: 12.9720, lng: 77.5940 },
  assignedWorker: {
    id: 'WRK-101',
    name: 'Arjun Sharma',
    phone: '+91-98765-43210',
    rating: 4.92,
    completedJobsCount: 428,
    licenseCode: 'CHL-2024-889',
    kycVerified: true,
  },
  dutyStatus: 'ON_DUTY',
  incomingJob: null,
  contactUnlocked: false,
  startOtp: '4829',
  completionPin: '7391',
  workCompletedByWorker: false,
  pinVerifiedByWorker: false,
  paymentQrGenerated: false,
  customerPaid: false,
  customerReview: null,
  liveCustomerLocation: { lat: 12.9250, lng: 77.5938 },
  etaSeconds: 15,
  safetyChecklist: [false, false, false, false, false, false],
  afterPhotoTaken: false,
  whatsappPings: 0,
  routeStops: initialRouteStops,
  payoutHistory: initialPayoutHistory,
  earnings: {
    today: 1050,
    week: 5250,
    month: 21400,
    safetyBonus: 250,
    incentiveTarget: 5,
    completedToday: 2,
    upiId: 'arjun.sharma@okaxis',
    pendingPayout: false,
  },
};

export const useAppStore = create((set, get) => ({
  ...initialState,

  setDutyStatus: (status) => set({ dutyStatus: status }),

  updateUpiId: (newUpi) =>
    set((s) => ({ earnings: { ...s.earnings, upiId: newUpi } })),

  simulateIncomingJob: async (presetStatus = 'AGENCY_APPROVED') => {
    if (etaTimerId) clearInterval(etaTimerId);
    const price = calculateMultiServicePrice(['termites'], '3bhk', 'barrier', 'treat_on_arrival');
    const payout = Math.round(price.total * 0.55);
    const otp = '4829';
    const compPin = '7391';
    const custLoc = { lat: 12.9250, lng: 77.5938 };

    const booking = {
      id: 'PF-' + Math.floor(1000 + Math.random() * 9000),
      status: presetStatus,
      pestType: 'termites',
      pestLabel: 'Termites & Woodborers',
      propertySize: '3bhk',
      sizeLabel: '3 BHK (1,050 - 1,600 sq ft)',
      plan: 'barrier',
      planLabel: 'Dual-layer Barrier (90-day warranty)',
      dispatchMode: 'treat_on_arrival',
      address: 'Flat 402, Palm Grove Residency, 11th Main Rd, Jayanagar 4th Block, Bengaluru 560011',
      areaOnly: 'Jayanagar 4th Block',
      coords: custLoc,
      note: 'Heavy termite mud tubes noticed behind kitchen cabinets and master bedroom wooden wardrobe.',
      slot: '01:00 - 03:00 PM',
      day: 'today',
      price,
      pricing: price,
      customerMaskedName: 'Aarav S.',
      customerFullName: 'Aarav Sharma',
      customerProxyPhone: '+91 80 4912 3400 (Ext 81)',
      customerRealPhone: '+91 98450 67890',
      createdAt: new Date().toISOString(),
      rating: null,
    };

    const incomingJob = {
      bookingId: booking.id,
      area: 'Jayanagar 4th Block',
      pestLabel: booking.pestLabel,
      sizeLabel: booking.sizeLabel,
      planLabel: booking.planLabel,
      maskedName: 'Aarav S.',
      maskedPhone: '+91-984-XXX-7890',
      slot: booking.slot,
      coords: custLoc,
      payout,
    };

    const unlocked = ['ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'COMPLETED'].includes(presetStatus);
    const isComp = presetStatus === 'COMPLETED';

    set({
      booking,
      incomingJob,
      startOtp: otp,
      completionPin: compPin,
      workCompletedByWorker: isComp,
      paymentQrGenerated: isComp,
      customerPaid: isComp,
      customerReview: isComp ? { rating: 5, comment: 'Punctual & thorough' } : null,
      contactUnlocked: unlocked,
      etaSeconds: presetStatus === 'ON_THE_WAY' ? 12 : 0,
      liveCustomerLocation: custLoc,
      dutyStatus: isComp ? 'ON_DUTY' : 'ON_JOB',
      safetyChecklist: isComp ? [true, true, true, true, true, true] : [false, false, false, false, false, false],
      afterPhotoTaken: isComp,
      whatsappPings: 0,
    });

    await syncRemote(get());
    if (presetStatus === 'ON_THE_WAY') {
      get()._startEtaCountdown();
    }
  },

  workerDeclineJob: async () => {
    if (etaTimerId) clearInterval(etaTimerId);
    set({
      booking: null,
      incomingJob: null,
      contactUnlocked: false,
      dutyStatus: 'ON_DUTY',
    });
    await syncRemote(get());
  },

  
  agencyApproveBooking: async () => {
    const { booking } = get();
    if (!booking) return;
    const next = safeTransition(booking, 'AGENCY_APPROVED');
    set({
      booking: next,
      contactUnlocked: true, // One-time agency approval directly unlocks actual phone and address!
    });
    await syncRemote(get());
  },

  workerAcceptAndNavigate: async () => {
    const { booking } = get();
    if (!booking) return;
    const next = safeTransition(booking, 'ON_THE_WAY');
    set({
      booking: next,
      contactUnlocked: true,
      dutyStatus: 'ON_JOB',
      etaSeconds: 15,
    });
    await syncRemote(get());
    get()._startEtaCountdown();
  },

  workerAcceptJob: async () => {
    const { booking } = get();
    if (!booking) return;
    const next = safeTransition(booking, 'TECHNICIAN_ACCEPTED');
    set({ booking: next, dutyStatus: 'ON_JOB' });
    await syncRemote(get());

    setTimeout(async () => {
      const b = get().booking;
      if (!b || b.status !== 'TECHNICIAN_ACCEPTED') return;
      get().forceAgencyUnlock();
    }, 5000);
  },

  pingAgencyWhatsApp: () => {
    set((s) => ({ whatsappPings: s.whatsappPings + 1 }));
  },

  forceAgencyUnlock: async () => {
    const { booking } = get();
    if (!booking) return;
    const next = safeTransition(booking, 'ON_THE_WAY');
    set({ booking: next, contactUnlocked: true, etaSeconds: 12 });
    await syncRemote(get());
    get()._startEtaCountdown();
  },

  _startEtaCountdown: () => {
    if (etaTimerId) clearInterval(etaTimerId);
    etaTimerId = setInterval(() => {
      const { etaSeconds, booking } = get();
      if (!booking || booking.status !== 'ON_THE_WAY') {
        clearInterval(etaTimerId);
        return;
      }
      if (etaSeconds <= 0) {
        clearInterval(etaTimerId);
        return;
      }
      set({ etaSeconds: etaSeconds - 1 });
      syncRemote(get());
    }, 1000);
  },

  fastForwardEta: async () => {
    if (etaTimerId) clearInterval(etaTimerId);
    set({ etaSeconds: 0 });
    await syncRemote(get());
  },

  workerMarkArrived: async () => {
    const { booking, etaSeconds } = get();
    if (!booking) return;
    const next = safeTransition(booking, 'ARRIVED');
    set({ booking: next, etaSeconds: 0 });
    await syncRemote(get());
  },

  workerStartTreatment: async (enteredOtp) => {
    const { booking, startOtp } = get();
    if (!booking) return { ok: false, error: 'No active booking found.' };
    const expected = startOtp || booking.startOtp || '4829';
    if (enteredOtp.trim() !== expected) {
      return { ok: false, error: `Incorrect 4-digit Start OTP. (Customer OTP is ${expected})` };
    }
    const next = safeTransition(booking, 'IN_PROGRESS');
    set({ booking: next });
    await syncRemote(get());
    return { ok: true };
  },

  toggleSafetyStep: (idx) => {
    const { safetyChecklist } = get();
    const updated = [...safetyChecklist];
    updated[idx] = !updated[idx];
    set({ safetyChecklist: updated });
  },

  checkAllSafetySteps: () => {
    set({ safetyChecklist: [true, true, true, true, true, true] });
  },

  captureAfterPhoto: () => set({ afterPhotoTaken: true }),

  workerMarkWorkFinished: async () => {
    const { booking } = get();
    if (!booking) return { ok: false, error: 'No active booking.' };
    set({
      workCompletedByWorker: true,
      safetyChecklist: [true, true, true, true, true, true],
      afterPhotoTaken: true,
    });
    await syncRemote(get());
    return { ok: true };
  },

  
  workerSimulateCustomerReview: async (rating = 5, comment = 'Punctual, eco-safe, and very thorough treatment!') => {
    set({
      customerReview: { rating, comment },
      pinVerifiedByWorker: true,
      // paymentQrGenerated will be true after customer review is given
      paymentQrGenerated: !!get().customerReview,
    });
    await syncRemote(get());
  },

  workerConfirmPaymentReceived: async () => {
    set({ customerPaid: true });
    await syncRemote(get());
  },

  workerVerifyCustomerCompletionPin: async (enteredPin) => {
    const { booking, completionPin } = get();
    if (!booking) return { ok: false, error: 'No active booking.' };
    const expected = completionPin || '7391';
    if (enteredPin.trim() !== expected) {
      return { ok: false, error: `Incorrect Completion PIN. Customer screen displays PIN: ${expected}` };
    }
    const next = safeTransition(booking, 'COMPLETED');
    const rawTotal = typeof booking.price === 'number' ? booking.price : (booking.price?.total ?? booking.pricing?.total ?? 1600);
    const jobPayout = Math.round(rawTotal * 0.55);

    set({
      booking: next,
      pinVerifiedByWorker: true,
      paymentQrGenerated: true,
      dutyStatus: 'ON_DUTY',
      incomingJob: null,
      contactUnlocked: false,
      earnings: {
        ...get().earnings,
        today: get().earnings.today + jobPayout,
        week: get().earnings.week + jobPayout,
        month: get().earnings.month + jobPayout,
        completedToday: get().earnings.completedToday + 1,
      },
    });
    await syncRemote(get());
    return { ok: true, payout: jobPayout };
  },

  requestInstantPayout: () => {
    const { earnings, payoutHistory } = get();
    if (earnings.today <= 0 || earnings.pendingPayout) return;
    const amt = earnings.today;
    set((s) => ({ earnings: { ...s.earnings, pendingPayout: true } }));
    setTimeout(() => {
      const newRecord = {
        id: 'PO-' + Math.floor(1000 + Math.random() * 9000),
        date: 'Just now',
        amount: amt,
        upiId: get().earnings.upiId,
        status: 'Settled via IMPS',
        utr: 'UTR' + Math.floor(1000000000 + Math.random() * 9000000000),
      };
      set((s) => ({
        earnings: { ...s.earnings, today: 0, pendingPayout: false },
        payoutHistory: [newRecord, ...s.payoutHistory],
      }));
    }, 1500);
  },

  syncFromRemote: async () => {
    const remote = await fetchRemote();
    if (!remote || !remote.booking) return;
    set((s) => {
      const statusChanged = remote.booking?.status !== s.booking?.status;
      return {
        booking: remote.booking ?? s.booking,
        workerPosition: remote.workerPosition ?? s.workerPosition,
        assignedWorker: remote.assignedWorker ?? s.assignedWorker,
        contactUnlocked: remote.contactUnlocked ?? s.contactUnlocked,
        incomingJob: remote.incomingJob ?? s.incomingJob,
        startOtp: remote.startOtp ?? s.startOtp ?? '4829',
        completionPin: remote.completionPin ?? s.completionPin ?? '7391',
        workCompletedByWorker: remote.workCompletedByWorker ?? s.workCompletedByWorker,
        pinVerifiedByWorker: remote.pinVerifiedByWorker ?? s.pinVerifiedByWorker,
      paymentQrGenerated: remote.paymentQrGenerated ?? Boolean(remote.customerReview),
        customerPaid: remote.customerPaid ?? s.customerPaid,
        customerReview: remote.customerReview ?? s.customerReview,
        liveCustomerLocation: remote.liveCustomerLocation ?? s.liveCustomerLocation,
        etaSeconds: statusChanged ? (remote.etaSeconds ?? s.etaSeconds) : s.etaSeconds,
      };
    });
  },

  canWorkerMarkArrived: () => {
    const { booking, etaSeconds } = get();
    return booking?.status === 'ON_THE_WAY' && etaSeconds === 0;
  },
  canWorkerStart: () => get().booking?.status === 'ARRIVED',
  canWorkerMarkFinished: () => {
    const { safetyChecklist, afterPhotoTaken } = get();
    return safetyChecklist.every(Boolean) && afterPhotoTaken;
  },
}));
if (typeof window !== 'undefined') { window.__WORKER_STORE__ = useAppStore; }

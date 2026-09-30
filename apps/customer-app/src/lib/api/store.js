/**
 * Customer-app Zustand store + interactive live simulation adapter.
 * Synchronizes across ports via /api/state (served by vite.config.js middleware).
 */
import { create } from 'zustand';
import {
  transitionBooking,
  calculatePrice,
  calculateMultiServicePrice,
  scoreAndRankWorkers,
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

const MOCK_WORKERS = [
  {
    id: 'WRK-101',
    name: 'Arjun Sharma',
    phone: '+91 98765 43210',
    proxyPhone: '+91 80 4912 3456 (Ext 81)',
    rating: 4.92,
    completedJobsCount: 428,
    licenseCode: 'CHL-2024-889',
    kycVerified: true,
    available: true,
    activeLoad: 1,
    lat: 12.9720,
    lng: 77.5940,
  },
  {
    id: 'WRK-102',
    name: 'Deepak Yadav',
    phone: '+91 91234 56789',
    proxyPhone: '+91 80 4912 3456 (Ext 44)',
    rating: 4.78,
    completedJobsCount: 215,
    licenseCode: 'CHL-2023-512',
    kycVerified: true,
    available: true,
    activeLoad: 0,
    lat: 12.9750,
    lng: 77.6000,
  },
];

const INITIAL_HISTORY = [
  {
    id: 'PF-8419',
    status: 'COMPLETED',
    pestType: 'cockroaches',
    pestLabel: 'Cockroaches & Ants',
    propertySize: '2bhk',
    sizeLabel: '2 BHK',
    plan: 'barrier',
    planLabel: 'Dual-layer Barrier',
    dispatchMode: 'treat_on_arrival',
    address: 'Flat 304, Brigade Harmony, Indiranagar 100ft Road, Bengaluru 560038',
    note: 'Kitchen cabinets and sink drain area.',
    slot: '09:00 - 11:00 AM',
    day: 'today',
    price: calculatePrice('cockroaches', '2bhk', 'barrier', 'treat_on_arrival'),
    createdAt: '2026-09-18T09:30:00.000Z',
    technicianName: 'Arjun Sharma',
    licenseCode: 'CHL-2024-889',
    chemicalUsed: 'Fipronil 0.05% Gel & Deltamethrin 2.5% EC',
    warrantyDays: 90,
    rating: 5,
    reviewComment: 'Superb odorless treatment, zero cockroaches since the visit.',
  },
  {
    id: 'PF-7902',
    status: 'COMPLETED',
    pestType: 'mosquitoes',
    pestLabel: 'Mosquitoes & Flies',
    propertySize: '3bhk',
    sizeLabel: '3 BHK',
    plan: 'standard',
    planLabel: 'Eco Standard',
    dispatchMode: 'treat_on_arrival',
    address: 'Villa 12, Palm Meadows, Whitefield Main Road, Bengaluru 560066',
    note: 'Balcony planters and garden utility perimeter.',
    slot: '05:00 - 07:00 PM',
    day: 'weekend',
    price: calculatePrice('mosquitoes', '3bhk', 'standard', 'treat_on_arrival'),
    createdAt: '2026-08-29T17:15:00.000Z',
    technicianName: 'Deepak Yadav',
    licenseCode: 'CHL-2023-512',
    chemicalUsed: 'Cypermethrin 10% EC Water-Emulsion',
    warrantyDays: 30,
    rating: 5,
    reviewComment: 'Arrived right on time and explained ventilation wait clearly.',
  },
];

function generateBookingId() {
  return 'PF-' + Math.floor(1000 + Math.random() * 9000);
}

function generateOtp() {
  return String(Math.floor(1000 + Math.random() * 9000));
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
    if (r.ok) return r.json();
  } catch (_) {}
  return null;
}

let etaInterval = null;
let workerMoveInterval = null;

const initialState = {
  booking: null,
  workerPosition: { lat: 12.9720, lng: 77.5940 },
  assignedWorker: MOCK_WORKERS[0],
  dutyStatus: 'ON_DUTY',
  incomingJob: null,
  contactUnlocked: false,
  history: INITIAL_HISTORY,
  rebookDraft: null,
  isLoading: false,
  error: null,
  safetyChecklist: [false, false, false, false, false, false],
  afterPhotoTaken: false,
  startOtp: '4829',
  completionPin: '7391',
  workCompletedByWorker: false,
  paymentQrGenerated: false,
  customerPaid: false,
  customerReview: null,
  etaSeconds: 20,
  liveCustomerLocation: { lat: 12.9250, lng: 77.5938 }, // Jayanagar 4th Block
};

export const useAppStore = create((set, get) => ({
  ...initialState,

  clearRebookDraft: () => set({ rebookDraft: null }),

  setCustomerLocation: (loc) => {
    set({ liveCustomerLocation: loc });
    syncRemote(get());
  },

  placeBooking: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const pestList = Array.isArray(formData.pestTypes) && formData.pestTypes.length > 0
        ? formData.pestTypes
        : [formData.pestType || 'cockroaches'];

      const size = PROPERTY_SIZES.find((s) => s.id === formData.propertySize) ?? PROPERTY_SIZES[0];
      const plan = PLANS.find((p) => p.id === formData.plan) ?? PLANS[0];
      const priceCalc = calculateMultiServicePrice(
        pestList,
        formData.propertySize,
        formData.plan,
        formData.dispatchMode
      );
      const otp = generateOtp();
      const compPin = generateOtp();

      const pestNames = priceCalc.pests.map((p) => p.name).join(' + ');
      const chemNames = priceCalc.pests.map((p) => p.chemicalUsed).join(' | ');

      const customerCoords = formData.coords || get().liveCustomerLocation || { lat: 12.9250, lng: 77.5938 };

      const booking = {
        id: generateBookingId(),
        status: 'BOOKING_PLACED',
        pestType: pestList[0],
        pestTypes: pestList,
        pestLabel: pestNames,
        chemicalUsed: chemNames,
        propertySize: formData.propertySize,
        sizeLabel: size.label,
        plan: formData.plan,
        planLabel: plan.name,
        warrantyDays: plan.warrantyDays,
        dispatchMode: formData.dispatchMode,
        address: formData.address,
        note: formData.note ?? '',
        slot: formData.slot,
        day: formData.day,
        coords: customerCoords,
        price: priceCalc,
        pricing: priceCalc,
        createdAt: new Date().toISOString(),
        rating: null,
        reviewComment: '',
      };

      const incomingJob = {
        bookingId: booking.id,
        area: formData.address.split(',').slice(-2).join(', ').trim() || 'Jayanagar 4th Block',
        pestLabel: booking.pestLabel,
        sizeLabel: booking.sizeLabel,
        planLabel: booking.planLabel,
        maskedName: 'Aarav S.',
        maskedPhone: '+91-984-XXX-3210',
        slot: booking.slot,
        coords: customerCoords,
        payout: Math.round(priceCalc.total * 0.55),
      };

      set({
        booking,
        incomingJob,
        startOtp: otp,
        completionPin: compPin,
        workCompletedByWorker: false,
        paymentQrGenerated: false,
        customerPaid: false,
        customerReview: null,
        workerPosition: { lat: 12.9720, lng: 77.5940 },
        assignedWorker: MOCK_WORKERS[0],
        contactUnlocked: false,
        safetyChecklist: [false, false, false, false, false, false],
        afterPhotoTaken: false,
        etaSeconds: 20,
        liveCustomerLocation: customerCoords,
        isLoading: false,
        error: null,
      });

      await syncRemote(get());

      setTimeout(() => {
        if (get().booking?.status === 'BOOKING_PLACED') {
          get().simulateCustomerStage('AGENCY_APPROVED');
        }
      }, 5000);
    } catch (e) {
      set({ isLoading: false, error: e.message });
    }
  },

  simulateCustomerStage: async (targetStatus) => {
    if (etaInterval) clearInterval(etaInterval);
    if (workerMoveInterval) clearInterval(workerMoveInterval);

    let currentBooking = get().booking;
    if (!currentBooking) {
      const priceCalc = calculateMultiServicePrice(['termites'], '3bhk', 'barrier', 'treat_on_arrival');
      currentBooking = {
        id: generateBookingId(),
        status: targetStatus,
        pestType: 'termites',
        pestTypes: ['termites'],
        pestLabel: 'Termites & Woodborers',
        chemicalUsed: 'Imidacloprid 30.5% SC (CIB&RC Approved)',
        propertySize: '3bhk',
        sizeLabel: '3 BHK',
        plan: 'barrier',
        planLabel: 'Dual-layer Barrier',
        warrantyDays: 90,
        dispatchMode: 'treat_on_arrival',
        address: 'Flat 402, Palm Grove Residency, 11th Main Rd, Jayanagar 4th Block, Bengaluru',
        coords: { lat: 12.9250, lng: 77.5938 },
        note: 'Termite mud tubes behind kitchen woodwork.',
        slot: '01:00 - 03:00 PM',
        day: 'today',
        price: priceCalc,
        pricing: priceCalc,
        createdAt: new Date().toISOString(),
        rating: null,
      };
    } else {
      currentBooking = { ...currentBooking, status: targetStatus };
    }

    const unlocked = ['ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'COMPLETED'].includes(targetStatus);
    const isCompleted = targetStatus === 'COMPLETED';
    const isInProgress = targetStatus === 'IN_PROGRESS';

    set({
      booking: currentBooking,
      assignedWorker: MOCK_WORKERS[0],
      contactUnlocked: unlocked,
      workCompletedByWorker: isCompleted,
      paymentQrGenerated: isCompleted,
      etaSeconds: targetStatus === 'ON_THE_WAY' ? 15 : 0,
      safetyChecklist: isCompleted
        ? [true, true, true, true, true, true]
        : isInProgress
        ? [true, true, true, true, false, false]
        : [false, false, false, false, false, false],
      afterPhotoTaken: isCompleted,
    });

    await syncRemote(get());

    if (targetStatus === 'ON_THE_WAY') {
      get()._startEtaCountdown();
      get()._startWorkerMovement();
    }
  },

  _startEtaCountdown: () => {
    if (etaInterval) clearInterval(etaInterval);
    etaInterval = setInterval(() => {
      const { etaSeconds, booking } = get();
      if (!booking || booking.status !== 'ON_THE_WAY') {
        clearInterval(etaInterval);
        return;
      }
      if (etaSeconds <= 0) {
        clearInterval(etaInterval);
        return;
      }
      set({ etaSeconds: etaSeconds - 1 });
      syncRemote(get());
    }, 1000);
  },

  _startWorkerMovement: () => {
    if (workerMoveInterval) clearInterval(workerMoveInterval);
    const startLat = 12.9720;
    const startLng = 77.5940;
    const target = get().liveCustomerLocation || { lat: 12.9250, lng: 77.5938 };
    let step = 0;
    const totalSteps = 15;
    workerMoveInterval = setInterval(() => {
      step++;
      const t = Math.min(step / totalSteps, 1);
      set({
        workerPosition: {
          lat: startLat + (target.lat - startLat) * t,
          lng: startLng + (target.lng - startLng) * t,
        },
      });
      syncRemote(get());
      if (t >= 1) clearInterval(workerMoveInterval);
    }, 1000);
  },

  submitCustomerReviewAndPay: async (stars, comment = '') => {
    const { booking, history, assignedWorker } = get();
    if (!booking) return;
    const completedRecord = {
      ...booking,
      status: 'COMPLETED',
      rating: stars,
      reviewComment: comment || 'Service completed thoroughly and verified.',
      technicianName: assignedWorker?.name || 'Arjun Sharma',
      licenseCode: assignedWorker?.licenseCode || 'CHL-2024-889',
    };
    set({
      customerReview: { rating: stars, comment },
      customerPaid: true,
      booking: null,
      history: [completedRecord, ...history],
    });
    await syncRemote(get());
  },

  cancelBooking: async () => {
    const { booking, history } = get();
    if (!booking) return;
    if (etaInterval) clearInterval(etaInterval);
    if (workerMoveInterval) clearInterval(workerMoveInterval);
    const cancelled = {
      ...booking,
      status: 'CANCELLED',
      rating: null,
    };
    set({
      booking: null,
      history: [cancelled, ...history],
    });
    await syncRemote(get());
  },

  rebookFromHistory: (historyItem) => {
    set({
      booking: null,
      rebookDraft: {
        pestTypes: historyItem.pestTypes || [historyItem.pestType || 'cockroaches'],
        propertySize: historyItem.propertySize || '2bhk',
        plan: historyItem.plan || 'barrier',
        day: 'today',
        slot: historyItem.slot || '09:00 - 11:00 AM',
        address: historyItem.address || '',
        note: historyItem.note || '',
        dispatchMode: historyItem.dispatchMode || 'treat_on_arrival',
      },
    });
    return historyItem;
  },

  syncFromRemote: async () => {
    const remote = await fetchRemote();
    if (!remote || !remote.booking) return;
    set((s) => ({
      booking: remote.booking ?? s.booking,
      workerPosition: remote.workerPosition ?? s.workerPosition,
      assignedWorker: remote.assignedWorker ?? s.assignedWorker,
      contactUnlocked: remote.contactUnlocked ?? s.contactUnlocked,
      incomingJob: remote.incomingJob ?? s.incomingJob,
      startOtp: remote.startOtp ?? s.startOtp,
      completionPin: remote.completionPin ?? s.completionPin ?? '7391',
      workCompletedByWorker: remote.workCompletedByWorker ?? s.workCompletedByWorker,
      paymentQrGenerated: remote.paymentQrGenerated ?? s.paymentQrGenerated,
      customerPaid: remote.customerPaid ?? s.customerPaid,
      customerReview: remote.customerReview ?? s.customerReview,
      etaSeconds: remote.etaSeconds ?? s.etaSeconds,
      liveCustomerLocation: remote.liveCustomerLocation ?? s.liveCustomerLocation,
    }));
  },

  canCancel: () => {
    const { booking } = get();
    if (!booking) return false;
    return ['BOOKING_PLACED', 'AGENCY_APPROVED', 'TECHNICIAN_ACCEPTED'].includes(booking.status);
  },
}));
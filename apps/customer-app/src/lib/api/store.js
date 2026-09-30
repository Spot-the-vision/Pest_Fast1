/**
 * Shared Zustand store + mock adapter.
 * The mock adapter simulates:
 *   - Agency owner auto-approving after 8 s
 *   - Owner unlocking contact after 6 s (post worker-accept)
 *   - Worker ETA counting down to 0
 *   - Cross-port state sync via /api/state (see vite.config.js)
 *
 * Replace `syncRemote` calls with real Socket.IO events to swap to NestJS.
 */
import { create } from 'zustand';
import {
  transitionBooking,
  calculatePrice,
  scoreAndRankWorkers,
  PEST_TYPES,
  PROPERTY_SIZES,
  PLANS,
  TIME_SLOTS,
} from './index.ts';

// ─── Mock data ──────────────────────────────────────────────────────────────

const MOCK_WORKERS = [
  {
    id: 'w1',
    name: 'Arjun Sharma',
    phone: '+91-98765-43210',
    rating: 4.8,
    kyc: true,
    lat: 12.972,
    lng: 77.594,
    currentLoad: 1,
    dutyStatus: 'ON_DUTY',
  },
  {
    id: 'w2',
    name: 'Deepak Yadav',
    phone: '+91-91234-56789',
    rating: 4.5,
    kyc: true,
    lat: 12.975,
    lng: 77.600,
    currentLoad: 0,
    dutyStatus: 'ON_DUTY',
  },
];

const MOCK_OWNER = {
  id: 'agency-1',
  name: 'PestPro Services',
  whatsappNumber: '+91-99999-00001',
};

// ─── State shape ─────────────────────────────────────────────────────────────

const initialState = {
  // Active booking
  booking: null,           // full Booking object or null
  workerPosition: null,    // { lat, lng } live position
  assignedWorker: null,    // WorkerPublic or null

  // Worker-side
  dutyStatus: 'OFF_DUTY',  // 'ON_DUTY' | 'ON_JOB' | 'OFF_DUTY'
  incomingJob: null,       // masked job info (after AGENCY_APPROVED)
  contactUnlocked: false,  // true after OWNER_UNLOCK_CONTACT

  // History
  history: [],

  // UI
  isLoading: false,
  error: null,

  // Earnings (mock)
  earnings: {
    today: 850,
    week: 4200,
    safetyBonus: 150,
    upiId: 'worker@upi',
    pendingPayout: false,
  },

  // Safety checklist progress (worker side)
  safetyChecklist: [false, false, false, false, false, false],
  afterPhotoTaken: false,

  // OTP (4 digits, shown to customer when ARRIVED)
  startOtp: null,

  // ETA in seconds (counts down)
  etaSeconds: 90,
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function generateBookingId() {
  return 'BK' + Date.now().toString(36).toUpperCase();
}

function generateOtp() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function maskPhone(phone) {
  return phone.replace(/(\+91-)(\d{3})\d{3}(\d{4})/, '$1$2-XXX-$3');
}

function maskName(name) {
  const parts = name.split(' ');
  return parts[0] + (parts[1] ? ' ' + parts[1][0] + '.' : '');
}

async function syncRemote(state) {
  try {
    await fetch('http://localhost:3000/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        booking: state.booking,
        workerPosition: state.workerPosition,
        assignedWorker: state.assignedWorker,
        contactUnlocked: state.contactUnlocked,
        incomingJob: state.incomingJob,
        startOtp: state.startOtp,
        etaSeconds: state.etaSeconds,
      }),
    });
  } catch (_) {
    // cross-origin or server not ready — silent
  }
}

async function fetchRemote() {
  try {
    const r = await fetch('http://localhost:3000/api/state');
    if (r.ok) return r.json();
  } catch (_) {}
  return null;
}

// ─── Store ───────────────────────────────────────────────────────────────────

let etaInterval = null;
let workerMoveInterval = null;

export const useAppStore = create((set, get) => ({
  ...initialState,

  // ── Customer: place booking ──────────────────────────────────────────────
  placeBooking: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const pest = PEST_TYPES.find(p => p.id === formData.pestType);
      const size = PROPERTY_SIZES.find(s => s.id === formData.propertySize);
      const plan = PLANS.find(p => p.id === formData.plan);
      const price = calculatePrice(formData.pestType, formData.propertySize, formData.plan, formData.dispatchMode);
      const otp = generateOtp();

      const booking = {
        id: generateBookingId(),
        status: 'BOOKING_PLACED',
        pestType: formData.pestType,
        pestLabel: pest?.name ?? formData.pestType,
        propertySize: formData.propertySize,
        sizeLabel: size?.label ?? formData.propertySize,
        plan: formData.plan,
        planLabel: plan?.name ?? formData.plan,
        dispatchMode: formData.dispatchMode,
        address: formData.address,
        note: formData.note ?? '',
        slot: formData.slot,
        day: formData.day,
        price,
        createdAt: new Date().toISOString(),
        rating: null,
      };

      set({
        booking,
        startOtp: otp,
        workerPosition: null,
        assignedWorker: null,
        contactUnlocked: false,
        safetyChecklist: [false, false, false, false, false, false],
        afterPhotoTaken: false,
        etaSeconds: 90,
        isLoading: false,
        error: null,
      });

      await syncRemote(get());

      // Simulate: agency owner approves after 8 s
      setTimeout(() => get()._agencyApprove(), 8000);
    } catch (e) {
      set({ isLoading: false, error: e.message });
    }
  },

  // ── Mock: agency owner approves ──────────────────────────────────────────
  _agencyApprove: async () => {
    const { booking } = get();
    if (!booking) return;
    // Pick best worker
    const customerLat = 12.971;
    const customerLng = 77.593;
    const ranked = scoreAndRankWorkers(MOCK_WORKERS, customerLat, customerLng);
    const worker = ranked[0];
    if (!worker) return;

    const next = transitionBooking(booking, 'AGENCY_APPROVED');
    const maskedJob = {
      bookingId: booking.id,
      area: 'Jayanagar 4th Block',
      pestLabel: booking.pestLabel,
      sizeLabel: booking.sizeLabel,
      planLabel: booking.planLabel,
      maskedName: maskName('Ravi Kumar'),
      maskedPhone: maskPhone('+91-98000-12345'),
      slot: booking.slot,
      payout: Math.round(booking.price * 0.55),
    };

    set({
      booking: next,
      assignedWorker: worker,
      incomingJob: maskedJob,
      dutyStatus: 'ON_DUTY',
    });
    await syncRemote(get());
  },

  // ── Worker: accept job ───────────────────────────────────────────────────
  workerAcceptJob: async () => {
    const { booking } = get();
    if (!booking) return;
    const next = transitionBooking(booking, 'TECHNICIAN_ACCEPTED');
    set({ booking: next, dutyStatus: 'ON_JOB' });
    await syncRemote(get());

    // After 6 s, owner unlocks contact
    setTimeout(() => get()._ownerUnlockContact(), 6000);
  },

  // ── Mock: owner unlocks contact (releases real phone + address) ──────────
  _ownerUnlockContact: async () => {
    const { booking } = get();
    if (!booking) return;
    const next = transitionBooking(booking, 'ON_THE_WAY');

    set({ booking: next, contactUnlocked: true });
    await syncRemote(get());

    // Start ETA countdown
    get()._startEtaCountdown();
    // Start worker dot movement
    get()._startWorkerMovement();
  },

  // ── ETA countdown ────────────────────────────────────────────────────────
  _startEtaCountdown: () => {
    if (etaInterval) clearInterval(etaInterval);
    etaInterval = setInterval(() => {
      const { etaSeconds } = get();
      if (etaSeconds <= 0) {
        clearInterval(etaInterval);
        return;
      }
      set({ etaSeconds: etaSeconds - 1 });
      syncRemote(get());
    }, 1000);
  },

  // ── Animate technician dot ───────────────────────────────────────────────
  _startWorkerMovement: () => {
    if (workerMoveInterval) clearInterval(workerMoveInterval);
    const startLat = 12.972;
    const startLng = 77.594;
    const endLat = 12.971;
    const endLng = 77.593;
    let step = 0;
    const totalSteps = 90;
    workerMoveInterval = setInterval(() => {
      step++;
      const t = Math.min(step / totalSteps, 1);
      set({
        workerPosition: {
          lat: startLat + (endLat - startLat) * t,
          lng: startLng + (endLng - startLng) * t,
        },
      });
      syncRemote(get());
      if (t >= 1) clearInterval(workerMoveInterval);
    }, 1000);
  },

  // ── Worker: mark arrived (only when etaSeconds === 0) ────────────────────
  workerMarkArrived: async () => {
    const { booking, etaSeconds } = get();
    if (!booking || etaSeconds > 0) return;
    const next = transitionBooking(booking, 'ARRIVED');
    set({ booking: next });
    await syncRemote(get());
  },

  // ── Worker: verify OTP and start treatment ───────────────────────────────
  workerStartTreatment: async (enteredOtp) => {
    const { booking, startOtp } = get();
    if (!booking) return { ok: false, error: 'No active booking' };
    if (enteredOtp !== startOtp) return { ok: false, error: 'Incorrect OTP' };
    const next = transitionBooking(booking, 'IN_PROGRESS');
    set({ booking: next });
    await syncRemote(get());
    return { ok: true };
  },

  // ── Worker: toggle safety step ───────────────────────────────────────────
  toggleSafetyStep: (idx) => {
    const { safetyChecklist } = get();
    const updated = [...safetyChecklist];
    updated[idx] = !updated[idx];
    set({ safetyChecklist: updated });
  },

  // ── Worker: capture after-photo (mock) ───────────────────────────────────
  captureAfterPhoto: () => set({ afterPhotoTaken: true }),

  // ── Worker: complete booking ──────────────────────────────────────────────
  workerCompleteBooking: async () => {
    const { booking, safetyChecklist, afterPhotoTaken } = get();
    if (!booking) return;
    if (!safetyChecklist.every(Boolean) || !afterPhotoTaken) return;
    const next = transitionBooking(booking, 'COMPLETED');
    set({
      booking: next,
      dutyStatus: 'ON_DUTY',
      incomingJob: null,
      contactUnlocked: false,
      earnings: {
        ...get().earnings,
        today: get().earnings.today + Math.round((booking.price ?? 0) * 0.55),
      },
    });
    await syncRemote(get());
  },

  // ── Customer: rate booking ────────────────────────────────────────────────
  rateBooking: async (stars) => {
    const { booking, history } = get();
    if (!booking) return;
    const rated = { ...booking, rating: stars };
    set({ booking: null, history: [rated, ...history], assignedWorker: null });
    await syncRemote(get());
  },

  // ── Customer: cancel booking ──────────────────────────────────────────────
  cancelBooking: async () => {
    const { booking } = get();
    if (!booking) return;
    const next = transitionBooking(booking, 'CANCELLED');
    const cancelled = { ...next, rating: null };
    set({ booking: null, history: [cancelled, ...get().history] });
    await syncRemote(get());
  },

  // ── Customer: rebook ──────────────────────────────────────────────────────
  rebookFromHistory: (historyItem) => {
    set({ booking: null }); // clear any current, let BookTab open fresh
    return historyItem;
  },

  // ── Worker: duty toggle ───────────────────────────────────────────────────
  setDutyStatus: (status) => set({ dutyStatus: status }),

  // ── Worker: instant payout ────────────────────────────────────────────────
  requestInstantPayout: () => {
    set(s => ({ earnings: { ...s.earnings, pendingPayout: true } }));
    setTimeout(() => {
      set(s => ({ earnings: { ...s.earnings, today: 0, pendingPayout: false } }));
    }, 3000);
  },

  // ── Sync from remote (called by worker-app on mount + polling) ────────────
  syncFromRemote: async () => {
    const remote = await fetchRemote();
    if (!remote) return;
    set(s => ({
      booking: remote.booking ?? s.booking,
      workerPosition: remote.workerPosition ?? s.workerPosition,
      assignedWorker: remote.assignedWorker ?? s.assignedWorker,
      contactUnlocked: remote.contactUnlocked ?? s.contactUnlocked,
      incomingJob: remote.incomingJob ?? s.incomingJob,
      startOtp: remote.startOtp ?? s.startOtp,
      etaSeconds: remote.etaSeconds ?? s.etaSeconds,
    }));
  },

  // ── Getters / derived ─────────────────────────────────────────────────────
  canCancel: () => {
    const { booking } = get();
    if (!booking) return false;
    const cancelBefore = ['BOOKING_PLACED', 'AGENCY_APPROVED', 'TECHNICIAN_ACCEPTED'];
    return cancelBefore.includes(booking.status);
  },

  canWorkerMarkArrived: () => {
    const { booking, etaSeconds } = get();
    return booking?.status === 'ON_THE_WAY' && etaSeconds === 0;
  },

  canWorkerStart: () => get().booking?.status === 'ARRIVED',

  canWorkerComplete: () => {
    const { safetyChecklist, afterPhotoTaken } = get();
    return safetyChecklist.every(Boolean) && afterPhotoTaken;
  },
}));
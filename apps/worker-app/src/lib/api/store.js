/**
 * Worker-app Zustand store. Reads remote state from its own /api/state
 * (served by vite.config.js middleware on port 5176) which reads/writes
 * the shared .pest-free-live-state.json file.
 */
import { create } from 'zustand';
import { transitionBooking, SAFETY_CHECKLIST_STEPS } from './index.ts';

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
        etaSeconds: state.etaSeconds,
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

const initialState = {
  booking: null,
  workerPosition: null,
  assignedWorker: null,
  dutyStatus: 'OFF_DUTY',
  incomingJob: null,
  contactUnlocked: false,
  startOtp: null,
  etaSeconds: 90,
  safetyChecklist: [false, false, false, false, false, false],
  afterPhotoTaken: false,
  earnings: {
    today: 850,
    week: 4200,
    safetyBonus: 150,
    upiId: 'worker@upi',
    pendingPayout: false,
  },
};

export const useAppStore = create((set, get) => ({
  ...initialState,

  setDutyStatus: (status) => set({ dutyStatus: status }),

  workerAcceptJob: async () => {
    const { booking } = get();
    if (!booking) return;
    const next = transitionBooking(booking, 'TECHNICIAN_ACCEPTED');
    set({ booking: next, dutyStatus: 'ON_JOB' });
    await syncRemote(get());

    // Simulate: owner unlocks contact in 6 s
    setTimeout(async () => {
      const b = get().booking;
      if (!b) return;
      const n2 = transitionBooking(b, 'ON_THE_WAY');
      set({ booking: n2, contactUnlocked: true });
      await syncRemote(get());
      get()._startEtaCountdown();
    }, 6000);
  },

  _startEtaCountdown: () => {
    const id = setInterval(() => {
      const { etaSeconds } = get();
      if (etaSeconds <= 0) { clearInterval(id); return; }
      set({ etaSeconds: etaSeconds - 1 });
      syncRemote(get());
    }, 1000);
  },

  workerMarkArrived: async () => {
    const { booking, etaSeconds } = get();
    if (!booking || etaSeconds > 0) return;
    const next = transitionBooking(booking, 'ARRIVED');
    set({ booking: next });
    await syncRemote(get());
  },

  workerStartTreatment: async (enteredOtp) => {
    const { booking, startOtp } = get();
    if (!booking) return { ok: false, error: 'No active booking' };
    if (enteredOtp !== startOtp) return { ok: false, error: 'Incorrect OTP — check with customer' };
    const next = transitionBooking(booking, 'IN_PROGRESS');
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

  captureAfterPhoto: () => set({ afterPhotoTaken: true }),

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
        today: get().earnings.today + Math.round((booking.price?.total ?? 0) * 0.55),
      },
    });
    await syncRemote(get());
  },

  requestInstantPayout: () => {
    set(s => ({ earnings: { ...s.earnings, pendingPayout: true } }));
    setTimeout(() => set(s => ({ earnings: { ...s.earnings, today: 0, pendingPayout: false } })), 3000);
  },

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

  canCancel: () => {
    const { booking } = get();
    if (!booking) return false;
    return ['BOOKING_PLACED', 'AGENCY_APPROVED', 'TECHNICIAN_ACCEPTED'].includes(booking.status);
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
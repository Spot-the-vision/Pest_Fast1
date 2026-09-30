import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Briefcase,
  MapPin,
  Wallet,
  AlertTriangle,
  Phone,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  Navigation,
  Camera,
  Sparkles,
  FileText,
  Send,
  ChevronRight,
  RefreshCw,
  UserCheck,
  Star,
  Award,
  IndianRupee,
  Edit3,
  Check,
  X,
  Play,
  FastForward,
  MessageSquare,
  Building2,
  Calendar,
  SprayCan,
  HeartPulse,
  Bot,
} from 'lucide-react';
import { useAppStore } from './lib/api/store.js';
import {
  SAFETY_CHECKLIST_STEPS,
  BUNDLED_CHEMICAL_SHEETS,
  answerWorkerSafetyQuestion,
} from './lib/api/index.ts';

function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = (msg, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };
  return { toasts, show };
}

function ToastStack({ toasts }) {
  return (
    <div className="toast-stack" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            className={`toast-item ${t.type}`}
          >
            <CheckCircle2 size={16} />
            <span>{t.msg}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function ModalDialog({ open, onClose, title, icon: Icon, danger, children }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {Icon && (
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: danger ? 'var(--danger-light)' : 'var(--primary-light)',
                  color: danger ? 'var(--danger)' : 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={20} />
              </div>
            )}
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{title}</h3>
          </div>
          <button
            className="btn btn-outline btn-sm"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={16} /> Close
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </motion.div>
    </div>
  );
}

function SosModal({ open, onClose, toast }) {
  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title="Emergency SOS & Rapid Support"
      icon={AlertTriangle}
      danger
    >
      <p style={{ color: 'var(--ink-muted)', marginBottom: 18, lineHeight: 1.5 }}>
        Immediate emergency escalation for field technicians. Clicking any hotline below logs your live GPS coordinates with the Agency Safety Desk.
      </p>
      <div style={{ display: 'grid', gap: 12 }}>
        <a
          href="tel:1800112233"
          className="btn btn-danger btn-lg btn-block"
          onClick={() => toast('Dialling National Poison Control (1800-11-2233)...', 'error')}
        >
          <Phone size={18} /> Call National Poison Control (1800-11-2233)
        </a>
        <a
          href="tel:108"
          className="btn btn-outline btn-lg btn-block"
          onClick={() => toast('Dialling Emergency Ambulance (108)...', 'error')}
        >
          <HeartPulse size={18} /> Emergency Medical Ambulance (108)
        </a>
        <button
          className="btn btn-outline btn-lg btn-block"
          onClick={() => {
            toast('Live GPS alert sent to Agency Control Desk!', 'success');
            onClose();
          }}
        >
          <Send size={18} /> Alert Agency Control Desk & Share Live Location
        </button>
      </div>
    </ModalDialog>
  );
}

const LIFECYCLE_STAGES = [
  { key: 'BOOKING_PLACED', label: 'Booking Placed' },
  { key: 'AGENCY_APPROVED', label: 'Agency Approved' },
  { key: 'TECHNICIAN_ACCEPTED', label: 'Worker Accepted' },
  { key: 'ON_THE_WAY', label: 'En Route (Unlocked)' },
  { key: 'ARRIVED', label: 'Arrived at Site' },
  { key: 'IN_PROGRESS', label: 'Treatment Active' },
  { key: 'COMPLETED', label: 'Job Completed' },
];

function LifecycleStepper({ currentStatus }) {
  const currentIdx = LIFECYCLE_STAGES.findIndex((s) => s.key === currentStatus);
  return (
    <div className="lifecycle-stepper">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Dispatch State Machine Progress
        </span>
        <span className="badge badge-green">
          Stage {Math.max(1, currentIdx + 1)} of {LIFECYCLE_STAGES.length}
        </span>
      </div>
      <div className="stepper-track">
        {LIFECYCLE_STAGES.map((st, idx) => {
          const isDone = idx < currentIdx || currentStatus === 'COMPLETED';
          const isCurrent = idx === currentIdx && currentStatus !== 'COMPLETED';
          return (
            <div
              key={st.key}
              className={`stepper-node ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
            >
              <div className="stepper-index">
                {isDone ? 'Done' : `Step 0${idx + 1}`}
              </div>
              <div className="stepper-name">{st.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function ActiveJobSection({ toast, onNavigate }) {
  const {
    booking,
    incomingJob,
    contactUnlocked,
    startOtp,
    etaSeconds,
    whatsappPings,
    safetyChecklist,
    afterPhotoTaken,
    simulateIncomingJob,
    workerAcceptJob,
    workerDeclineJob,
    pingOwnerWhatsApp,
    forceOwnerUnlock,
    fastForwardEta,
    workerMarkArrived,
    workerStartTreatment,
    toggleSafetyStep,
    checkAllSafetySteps,
    captureAfterPhoto,
    workerCompleteBooking,
    canWorkerMarkArrived,
    canWorkerComplete,
  } = useAppStore();

  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleOtpChange = (index, val) => {
    const clean = val.replace(/\D/g, '').slice(-1);
    const updated = [...otpDigits];
    updated[index] = clean;
    setOtpDigits(updated);
    setOtpError('');
    if (clean && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const code = otpDigits.join('');
    const res = await workerStartTreatment(code);
    if (!res.ok) {
      setOtpError(res.error);
      toast(res.error, 'error');
      return;
    }
    toast('Customer OTP verified! Treatment started.', 'success');
    setOtpDigits(['', '', '', '']);
  };

  const fillDemoOtp = () => {
    const expected = (startOtp || booking?.startOtp || '4829').split('');
    setOtpDigits(expected);
    setOtpError('');
  };

  const rawPrice =
    typeof booking?.price === 'number'
      ? booking.price
      : booking?.price?.total ?? booking?.pricing?.total ?? 1600;
  const workerPayout = incomingJob?.payout ?? Math.round(rawPrice * 0.55);

  return (
    <div>
      <div className="demo-toolbar">
        <div className="demo-toolbar-label">
          <Sparkles size={16} />
          <span>Interactive Job State Simulator:</span>
        </div>
        <div className="demo-stage-pills">
          {LIFECYCLE_STAGES.map((st) => (
            <button
              key={st.key}
              className={`stage-pill-btn ${booking?.status === st.key ? 'active' : ''}`}
              onClick={() => {
                simulateIncomingJob(st.key);
                toast(`Loaded job in ${st.label} state`, 'info');
              }}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {(!booking || booking.status === 'CANCELLED') && (
        <div className="web-card" style={{ textAlign: 'center', padding: '56px 32px' }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 20,
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px',
            }}
          >
            <Briefcase size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 8 }}>
            No Active Dispatch Assigned Right Now
          </h2>
          <p style={{ color: 'var(--ink-muted)', maxWidth: 520, margin: '0 auto 24px', lineHeight: 1.5 }}>
            You are currently online and visible to nearby agency dispatchers. Book a treatment from the Customer App (port 3000) or load a live simulated dispatch below.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                simulateIncomingJob('AGENCY_APPROVED');
                toast('New incoming job assigned by Agency!', 'success');
              }}
            >
              <Play size={18} /> Load Incoming Dispatch Job
            </button>
            <button
              className="btn btn-outline btn-lg"
              onClick={() => onNavigate('route')}
            >
              <MapPin size={18} /> View Today's Route Schedule
            </button>
          </div>
        </div>
      )}

      {booking && booking.status !== 'CANCELLED' && (
        <>
          <LifecycleStepper currentStatus={booking.status} />

          <div className="dashboard-grid-2">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="web-card">
                <div className="card-header-row">
                  <div>
                    <span className="badge badge-neutral" style={{ marginBottom: 6 }}>
                      Booking ID #{booking.id}
                    </span>
                    <h2 className="card-title" style={{ fontSize: '1.35rem' }}>
                      {booking.pestLabel || 'Termites & Woodborers'} Treatment
                    </h2>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                      Technician Payout
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary)' }}>
                      Rs. {workerPayout}
                    </div>
                  </div>
                </div>

                <div className="field-grid">
                  <div className="field-box">
                    <div className="field-label">
                      <SprayCan size={14} /> Treatment Plan
                    </div>
                    <div className="field-value">{booking.planLabel || 'Dual-layer Barrier'}</div>
                    <div className="field-sub">CIB&RC certified formulation</div>
                  </div>

                  <div className="field-box">
                    <div className="field-label">
                      <Building2 size={14} /> Property Size
                    </div>
                    <div className="field-value">{booking.sizeLabel || '3 BHK Apartment'}</div>
                    <div className="field-sub">Mode: {booking.dispatchMode === 'inspection' ? 'Inspection First' : 'Treat on Arrival'}</div>
                  </div>

                  <div className="field-box">
                    <div className="field-label">
                      <Calendar size={14} /> Scheduled Time Slot
                    </div>
                    <div className="field-value">{booking.slot || '01:00 - 03:00 PM'}</div>
                    <div className="field-sub">Priority Same-Day Dispatch</div>
                  </div>

                  <div className="field-box">
                    <div className="field-label">
                      <MapPin size={14} /> Locality / Zone
                    </div>
                    <div className="field-value">{incomingJob?.area || booking.areaOnly || 'Jayanagar 4th Block'}</div>
                    <div className="field-sub">3.2 km from current base</div>
                  </div>
                </div>

                {booking.note && (
                  <div className="field-box" style={{ marginTop: 14 }}>
                    <div className="field-label">Customer Site Notes</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.45 }}>
                      "{booking.note}"
                    </div>
                  </div>
                )}
              </div>

              <div className="web-card">
                <div className="card-header-row">
                  <h3 className="card-title">
                    {contactUnlocked ? (
                      <Unlock size={20} color="var(--success)" />
                    ) : (
                      <Lock size={20} color="var(--accent)" />
                    )}
                    <span>Customer Contact & Address Gate</span>
                  </h3>
                  <span className={`badge ${contactUnlocked ? 'badge-green' : 'badge-amber'}`}>
                    {contactUnlocked ? '2nd Approval Granted - Unlocked' : 'Masked until Owner 2nd Approval'}
                  </span>
                </div>

                <div className="field-grid">
                  <div className="field-box">
                    <div className="field-label">Customer Name</div>
                    <div className="field-value">
                      {contactUnlocked
                        ? booking.customerFullName || 'Ravi Kumar'
                        : incomingJob?.maskedName || booking.customerMaskedName || 'Ravi K.'}
                    </div>
                    <div className="field-sub">
                      {contactUnlocked ? 'Verified Homeowner' : 'Full name hidden for privacy'}
                    </div>
                  </div>

                  <div className="field-box">
                    <div className="field-label">Phone Number</div>
                    <div className="field-value">
                      {contactUnlocked
                        ? booking.customerRealPhone || '+91 98450 67890'
                        : incomingJob?.maskedPhone || '+91-984-XXX-7890 (Proxy)'}
                    </div>
                    <div className="field-sub">
                      {contactUnlocked ? 'Direct line unlocked' : 'Routed via agency proxy bridge'}
                    </div>
                  </div>
                </div>

                <div className="field-box" style={{ marginTop: 14 }}>
                  <div className="field-label">Service Address</div>
                  <div className="field-value">
                    {contactUnlocked
                      ? booking.address
                      : `${incomingJob?.area || 'Jayanagar 4th Block'} (Exact flat & building locked until owner grants 2nd permission)`}
                  </div>
                </div>

                {contactUnlocked && (
                  <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                    <a
                      href="tel:+919845067890"
                      className="btn btn-outline btn-sm"
                      onClick={() => toast('Calling customer...', 'info')}
                    >
                      <Phone size={15} /> Call Customer
                    </a>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => toast('Opening turn-by-turn navigation...', 'info')}
                    >
                      <Navigation size={15} /> Open Maps Navigation
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="web-card" style={{ borderTop: '4px solid var(--primary)' }}>
              {booking.status === 'BOOKING_PLACED' && (
                <div>
                  <span className="badge badge-amber" style={{ marginBottom: 12 }}>
                    Step 1 of 7 - Awaiting Agency First Approval
                  </span>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: 8 }}>
                    Agency Owner is Reviewing Booking
                  </h3>
                  <p style={{ color: 'var(--ink-muted)', lineHeight: 1.5, marginBottom: 20 }}>
                    The customer just placed this booking. Once the agency owner approves and dispatches you, you will be able to accept the job.
                  </p>
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    onClick={() => {
                      simulateIncomingJob('AGENCY_APPROVED');
                      toast('Agency approved booking! Ready for your acceptance.', 'success');
                    }}
                  >
                    <FastForward size={18} /> Simulate Agency Owner Approval Now
                  </button>
                </div>
              )}

              {booking.status === 'AGENCY_APPROVED' && (
                <div>
                  <span className="badge badge-amber" style={{ marginBottom: 12 }}>
                    Step 2 of 7 - Action Required
                  </span>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: 8 }}>
                    New Dispatch Assigned to You
                  </h3>
                  <p style={{ color: 'var(--ink-muted)', lineHeight: 1.5, marginBottom: 20 }}>
                    Review the treatment type, area, and Rs. {workerPayout} payout on the left. Accept the job to request final contact unlock from the agency owner.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      onClick={async () => {
                        await workerAcceptJob();
                        toast('Job accepted! Requesting contact unlock from agency owner...', 'success');
                      }}
                    >
                      <CheckCircle2 size={18} /> Accept Job (Rs. {workerPayout} Payout)
                    </button>
                    <button
                      className="btn btn-outline btn-block"
                      onClick={async () => {
                        await workerDeclineJob();
                        toast('Job declined and returned to agency queue.', 'info');
                      }}
                    >
                      <X size={16} /> Pass / Decline Dispatch
                    </button>
                  </div>
                </div>
              )}

              {booking.status === 'TECHNICIAN_ACCEPTED' && (
                <div>
                  <span className="badge badge-amber" style={{ marginBottom: 12 }}>
                    Step 3 of 7 - Waiting for 2nd Permission
                  </span>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: 8 }}>
                    Awaiting Owner Contact Unlock
                  </h3>
                  <p style={{ color: 'var(--ink-muted)', lineHeight: 1.5, marginBottom: 18 }}>
                    You accepted the job! For customer privacy, the agency owner must grant second permission to release the exact house number and phone number.
                  </p>

                  <div className="web-card-surface" style={{ marginBottom: 18 }}>
                    <div style={{ fontWeight: 700, marginBottom: 8, fontSize: '0.9rem' }}>
                      Pre-Departure Vehicle Check:
                    </div>
                    <ul style={{ paddingLeft: 18, color: 'var(--ink-muted)', fontSize: '0.86rem', lineHeight: 1.7 }}>
                      <li>Verify CIB&RC chemical batch & measuring cylinder</li>
                      <li>Pack nitrile gloves, N95 respirator & eye shield</li>
                      <li>Keep ID card & CHL license badge visible</li>
                    </ul>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <button
                      className="btn btn-accent btn-lg btn-block"
                      onClick={() => {
                        pingOwnerWhatsApp();
                        toast('Sent WhatsApp reminder ping to Agency Owner!', 'success');
                      }}
                    >
                      <MessageSquare size={18} /> Ping Agency Owner on WhatsApp
                      {whatsappPings > 0 && ` (${whatsappPings} sent)`}
                    </button>
                    <button
                      className="btn btn-primary btn-block"
                      onClick={async () => {
                        await forceOwnerUnlock();
                        toast('Owner unlocked customer address & phone! You are On The Way.', 'success');
                      }}
                    >
                      <Unlock size={16} /> Unlock Contact & Start Route Now
                    </button>
                  </div>
                </div>
              )}
              {booking.status === 'ON_THE_WAY' && (
                <div>
                  <span className="badge badge-green" style={{ marginBottom: 12 }}>
                    Step 4 of 7 - En Route to Customer
                  </span>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: 8 }}>
                    Navigating to Customer Location
                  </h3>
                  <p style={{ color: 'var(--ink-muted)', lineHeight: 1.5, marginBottom: 18 }}>
                    Customer contact and exact flat address are now unlocked. Proceed to the location safely.
                  </p>

                  <div
                    className="web-card-surface"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 20,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Clock size={28} color="var(--primary)" />
                      <div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--ink-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                          Live Travel ETA
                        </div>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800 }}>
                          {etaSeconds > 0 ? `${etaSeconds} seconds remaining` : 'Arrived at Gate (0s)'}
                        </div>
                      </div>
                    </div>
                    {etaSeconds > 0 && (
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          fastForwardEta();
                          toast('Fast-forwarded travel timer to 0s!', 'info');
                        }}
                      >
                        <FastForward size={14} /> Skip Timer
                      </button>
                    )}
                  </div>

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    disabled={!canWorkerMarkArrived()}
                    onClick={async () => {
                      await workerMarkArrived();
                      toast('Marked as Arrived! Ask customer for 4-digit start OTP.', 'success');
                    }}
                  >
                    <MapPin size={18} />
                    {etaSeconds > 0
                      ? `Wait ${etaSeconds}s (or click Skip Timer) to Mark Arrived`
                      : 'Mark Arrived at Customer Doorstep'}
                  </button>
                </div>
              )}

              {booking.status === 'ARRIVED' && (
                <div>
                  <span className="badge badge-amber" style={{ marginBottom: 12 }}>
                    Step 5 of 7 - Customer Handshake Gate
                  </span>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: 6 }}>
                    Enter Customer 4-Digit Start OTP
                  </h3>
                  <p style={{ color: 'var(--ink-muted)', lineHeight: 1.5, marginBottom: 16 }}>
                    Ask the customer for the 4-digit Start OTP displayed on their Track screen before opening any chemical seal.
                  </p>

                  <div
                    className="web-card-surface"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      marginBottom: 16,
                    }}
                  >
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                      Customer's Active OTP Code: <strong>{startOtp || booking.startOtp || '4829'}</strong>
                    </span>
                    <button className="btn btn-outline btn-sm" onClick={fillDemoOtp}>
                      Auto-Fill OTP
                    </button>
                  </div>

                  <div className="otp-row">
                    {otpDigits.map((digit, i) => (
                      <input
                        key={i}
                        ref={otpRefs[i]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        aria-label={`OTP digit ${i + 1}`}
                        className="otp-box"
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !digit && i > 0) {
                            otpRefs[i - 1].current?.focus();
                          }
                        }}
                      />
                    ))}
                  </div>

                  {otpError && (
                    <div
                      style={{
                        background: 'var(--danger-light)',
                        color: 'var(--danger)',
                        padding: '10px 14px',
                        borderRadius: 10,
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        marginBottom: 14,
                        textAlign: 'center',
                      }}
                    >
                      {otpError}
                    </div>
                  )}

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    disabled={otpDigits.join('').length < 4}
                    onClick={handleVerifyOtp}
                  >
                    <CheckCircle2 size={18} /> Verify OTP & Start Treatment
                  </button>
                </div>
              )}

              {booking.status === 'IN_PROGRESS' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span className="badge badge-green">
                      Step 6 of 7 - Treatment In Progress
                    </span>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        checkAllSafetySteps();
                        toast('All 6 safety steps ticked!', 'success');
                      }}
                    >
                      <Check size={14} /> Check All 6 Steps
                    </button>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: 6 }}>
                    Mandatory Safety & Protocol Checklist
                  </h3>
                  <p style={{ color: 'var(--ink-muted)', fontSize: '0.88rem', marginBottom: 16 }}>
                    All 6 protocol steps and an after-treatment photo are strictly required to unlock job completion.
                  </p>

                  <div className="checklist-stack">
                    {SAFETY_CHECKLIST_STEPS.map((step, i) => {
                      const isChecked = safetyChecklist[i];
                      return (
                        <div
                          key={i}
                          className={`checklist-row ${isChecked ? 'checked' : ''}`}
                          onClick={() => toggleSafetyStep(i)}
                        >
                          <div className="custom-checkbox">
                            {isChecked && <Check size={15} strokeWidth={3} />}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                              {i + 1}. {step.title}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                              {step.description}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="web-card-surface" style={{ marginTop: 18, marginBottom: 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                          Post-Treatment Barrier Photo Proof
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                          {afterPhotoTaken
                            ? 'Timestamped photo proof attached and verified.'
                            : 'Required before closing the job.'}
                        </div>
                      </div>
                      {afterPhotoTaken ? (
                        <span className="badge badge-green">
                          <CheckCircle2 size={14} /> Photo Attached
                        </span>
                      ) : (
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => {
                            captureAfterPhoto();
                            toast('After-treatment photo captured and attached!', 'success');
                          }}
                        >
                          <Camera size={15} /> Capture Photo
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    className="btn btn-success btn-lg btn-block"
                    disabled={!canWorkerComplete()}
                    onClick={async () => {
                      await workerCompleteBooking();
                      toast(`Job completed! Rs. ${workerPayout} credited to today's earnings.`, 'success');
                    }}
                  >
                    <CheckCircle2 size={18} />
                    {canWorkerComplete()
                      ? `Complete Treatment & Claim Rs. ${workerPayout} Payout`
                      : `Complete (${safetyChecklist.filter(Boolean).length}/6 steps, ${
                          afterPhotoTaken ? '1/1' : '0/1'
                        } photo)`}
                  </button>
                </div>
              )}

              {booking.status === 'COMPLETED' && (
                <div style={{ textAlign: 'center', padding: '16px 8px' }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'var(--success-light)',
                      color: 'var(--success)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    <Award size={34} />
                  </div>
                  <span className="badge badge-green" style={{ marginBottom: 10 }}>
                    Treatment Verified & Closed
                  </span>
                  <h3 style={{ fontSize: '1.45rem', marginBottom: 8 }}>
                    Great Work! Rs. {workerPayout} Added to Wallet
                  </h3>
                  <p style={{ color: 'var(--ink-muted)', marginBottom: 22, lineHeight: 1.5 }}>
                    All 6 safety protocols and photo evidence have been logged. Your payout is immediately available for UPI withdrawal.
                  </p>
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => onNavigate('earnings')}
                    >
                      <Wallet size={16} /> Go to Earnings & Withdraw
                    </button>
                    <button
                      className="btn btn-outline"
                      onClick={() => {
                        simulateIncomingJob('AGENCY_APPROVED');
                        toast('Loaded next dispatch job!', 'info');
                      }}
                    >
                      <RefreshCw size={16} /> Take Next Dispatch
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
function RouteSection({ toast, onNavigate }) {
  const { routeStops, simulateIncomingJob } = useAppStore();
  const [filter, setFilter] = useState('All');

  const filteredStops = routeStops.filter((s) =>
    filter === 'All' ? true : s.status === filter
  );

  const totalRoutePayout = routeStops.reduce((acc, s) => acc + s.payout, 0);

  return (
    <div>
      <div className="dashboard-grid-3" style={{ marginBottom: 24 }}>
        <div className="kpi-card">
          <div className="kpi-top">
            <span>Assigned Stops Today</span>
            <MapPin size={18} color="var(--primary)" />
          </div>
          <div className="kpi-value">{routeStops.length} Jobs</div>
          <div className="kpi-foot">Bengaluru South & East Cluster</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span>Completed Stops</span>
            <CheckCircle2 size={18} color="var(--success)" />
          </div>
          <div className="kpi-value">
            {routeStops.filter((s) => s.status === 'Completed').length} of {routeStops.length}
          </div>
          <div className="kpi-foot">100% on-time arrival SLA</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span>Estimated Route Value</span>
            <IndianRupee size={18} color="var(--accent)" />
          </div>
          <div className="kpi-value">Rs. {totalRoutePayout}</div>
          <div className="kpi-foot">Includes base share + travel allowance</div>
        </div>
      </div>

      <div className="web-card">
        <div className="card-header-row" style={{ flexWrap: 'wrap' }}>
          <div>
            <h2 className="card-title">Today's Dispatch Manifest & Route Table</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginTop: 2 }}>
              Click "Open in Workspace" on any active or upcoming stop to load it into your Active Job console.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['All', 'Active', 'Upcoming', 'Completed'].map((tab) => (
              <button
                key={tab}
                className={`stage-pill-btn ${filter === tab ? 'active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="web-table-wrap">
          <table className="web-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Time Slot</th>
                <th>Customer & Locality</th>
                <th>Treatment & Chemical</th>
                <th>Payout</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStops.map((stop) => (
                <tr key={stop.id}>
                  <td style={{ fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                    #{stop.id}
                  </td>
                  <td style={{ fontWeight: 600 }}>{stop.time}</td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{stop.customer}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                      {stop.area}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{stop.service}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                      {stop.chemical}
                    </div>
                  </td>
                  <td style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>
                    Rs. {stop.payout}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        stop.status === 'Completed'
                          ? 'badge-green'
                          : stop.status === 'Active'
                          ? 'badge-amber'
                          : 'badge-neutral'
                      }`}
                    >
                      {stop.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        const targetState =
                          stop.status === 'Completed'
                            ? 'COMPLETED'
                            : stop.status === 'Active'
                            ? 'AGENCY_APPROVED'
                            : 'BOOKING_PLACED';
                        simulateIncomingJob(targetState);
                        onNavigate('job');
                        toast(`Loaded ${stop.id} into Active Job Workspace`, 'info');
                      }}
                    >
                      Open in Workspace <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function EarningsSection({ toast }) {
  const { earnings, payoutHistory, requestInstantPayout, updateUpiId } = useAppStore();
  const [editingUpi, setEditingUpi] = useState(false);
  const [upiDraft, setUpiDraft] = useState(earnings.upiId);

  const saveUpi = () => {
    if (!upiDraft.includes('@')) {
      toast('Please enter a valid UPI ID containing @', 'error');
      return;
    }
    updateUpiId(upiDraft.trim());
    setEditingUpi(false);
    toast('UPI ID updated successfully!', 'success');
  };

  return (
    <div>
      <div className="dashboard-grid-4" style={{ marginBottom: 24 }}>
        <div className="kpi-card">
          <div className="kpi-top">
            <span>Withdrawable Today</span>
            <Wallet size={18} color="var(--primary)" />
          </div>
          <div className="kpi-value" style={{ color: 'var(--primary)' }}>
            Rs. {earnings.today}
          </div>
          <div className="kpi-foot">Available for zero-fee IMPS transfer</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span>This Week's Earnings</span>
            <IndianRupee size={18} color="var(--ink)" />
          </div>
          <div className="kpi-value">Rs. {earnings.week}</div>
          <div className="kpi-foot">Across 9 completed treatments</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span>Safety & PPE Bonus</span>
            <ShieldCheck size={18} color="var(--success)" />
          </div>
          <div className="kpi-value" style={{ color: 'var(--success)' }}>
            +Rs. {earnings.safetyBonus}
          </div>
          <div className="kpi-foot">100% checklist compliance streak</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top">
            <span>Monthly Gross</span>
            <Award size={18} color="var(--accent)" />
          </div>
          <div className="kpi-value">Rs. {earnings.month}</div>
          <div className="kpi-foot">Top 5% technician tier in Bengaluru</div>
        </div>
      </div>

      <div className="dashboard-grid-2">
        <div className="web-card">
          <div className="card-header-row">
            <h2 className="card-title">Instant UPI Settlement</h2>
            <span className="badge badge-green">Zero Commission Cut on Tips</span>
          </div>

          <div className="web-card-surface" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="field-label">Linked Bank UPI Handle</div>
                {!editingUpi ? (
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink)' }}>
                    {earnings.upiId}
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <input
                      type="text"
                      value={upiDraft}
                      onChange={(e) => setUpiDraft(e.target.value)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1px solid var(--border-strong)',
                        fontWeight: 600,
                      }}
                    />
                    <button className="btn btn-primary btn-sm" onClick={saveUpi}>
                      Save
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => setEditingUpi(false)}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              {!editingUpi && (
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setUpiDraft(earnings.upiId);
                    setEditingUpi(true);
                  }}
                >
                  <Edit3 size={14} /> Change UPI
                </button>
              )}
            </div>
          </div>

          <button
            className="btn btn-primary btn-lg btn-block"
            disabled={earnings.today === 0 || earnings.pendingPayout}
            onClick={() => {
              requestInstantPayout();
              toast(`Initiated IMPS transfer of Rs. ${earnings.today} to ${earnings.upiId}`, 'success');
            }}
          >
            <IndianRupee size={18} />
            {earnings.pendingPayout
              ? 'Processing IMPS Transfer to Bank...'
              : earnings.today === 0
              ? 'All Earnings Settled (Rs. 0 Pending)'
              : `Withdraw Rs. ${earnings.today} Instantly to UPI`}
          </button>
        </div>

        <div className="web-card">
          <div className="card-header-row">
            <h2 className="card-title">Recent Settlement Ledger</h2>
          </div>
          <div className="web-table-wrap">
            <table className="web-table">
              <thead>
                <tr>
                  <th>Ref ID</th>
                  <th>Date & Time</th>
                  <th>Amount</th>
                  <th>Status / UTR</th>
                </tr>
              </thead>
              <tbody>
                {payoutHistory.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 700 }}>{item.id}</td>
                    <td>
                      <div>{item.date}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                        {item.upiId}
                      </div>
                    </td>
                    <td style={{ fontWeight: 800, color: 'var(--success)' }}>
                      Rs. {item.amount}
                    </td>
                    <td>
                      <span className="badge badge-green">{item.status}</span>
                      <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: 3 }}>
                        {item.utr}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
function SafetySection({ toast }) {
  const [selectedChem, setSelectedChem] = useState(BUNDLED_CHEMICAL_SHEETS[0]);
  const [protocolModal, setProtocolModal] = useState(false);
  const [question, setQuestion] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      role: 'assistant',
      text: 'Hello Arjun! I am your Grounded Chemical Safety Assistant. Ask me about dilution ratios, required PPE, re-entry wait times, or first-aid for Deltamethrin 2.5% EC, Imidacloprid 30.5% SC, or Fipronil 0.05% Gel.',
    },
  ]);

  const askAi = (customPrompt) => {
    const q = (customPrompt ?? question).trim();
    if (!q) return;
    const res = answerWorkerSafetyQuestion(q);
    setChatLog((prev) => [
      ...prev,
      { role: 'user', text: q },
      { role: 'assistant', text: res.answer, known: res.known },
    ]);
    if (!customPrompt) setQuestion('');
  };

  return (
    <div>
      <div className="dashboard-grid-2">
        <div className="web-card">
          <div className="card-header-row">
            <div>
              <h2 className="card-title">
                <FileText size={20} color="var(--primary)" />
                <span>CIB&RC Chemical Safety Data Sheets (CSDS)</span>
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                Select any approved formulation below to inspect dilution, PPE, and antidote rules.
              </p>
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => setProtocolModal(true)}
            >
              <HeartPulse size={15} /> Emergency Exposure Protocol
            </button>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
            {BUNDLED_CHEMICAL_SHEETS.map((sheet) => (
              <button
                key={sheet.id}
                className={`stage-pill-btn ${selectedChem.id === sheet.id ? 'active' : ''}`}
                onClick={() => setSelectedChem(sheet)}
              >
                {sheet.name}
              </button>
            ))}
          </div>

          {selectedChem && (
            <div className="web-card-surface">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <h3 style={{ fontSize: '1.18rem', color: 'var(--primary-dark)' }}>
                    {selectedChem.name}
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                    Reg No: <strong>{selectedChem.cibrcReg}</strong> - {selectedChem.activeIngredient}
                  </div>
                </div>
                <span className="badge badge-amber">
                  Re-entry: {selectedChem.reEntryMinutes} mins
                </span>
              </div>

              <div className="field-grid" style={{ marginBottom: 14 }}>
                <div className="field-box" style={{ background: '#FFFFFF' }}>
                  <div className="field-label">Prescribed Dilution Ratio</div>
                  <div className="field-value" style={{ fontSize: '0.9rem' }}>
                    {selectedChem.dilutionRatio}
                  </div>
                </div>
                <div className="field-box" style={{ background: '#FFFFFF' }}>
                  <div className="field-label">Target Pests</div>
                  <div className="field-value" style={{ fontSize: '0.9rem' }}>
                    {selectedChem.targetPests}
                  </div>
                </div>
              </div>

              <div className="field-box" style={{ background: '#FFFFFF', marginBottom: 14 }}>
                <div className="field-label">Mandatory PPE Gear</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
                  {selectedChem.requiredPpe.map((ppe, idx) => (
                    <span key={idx} className="badge badge-green">
                      <ShieldCheck size={13} /> {ppe}
                    </span>
                  ))}
                </div>
              </div>

              <div className="field-box" style={{ background: '#FFFFFF' }}>
                <div className="field-label" style={{ color: 'var(--danger)' }}>
                  First-Aid & Medical Antidote Guidance
                </div>
                <div style={{ fontSize: '0.86rem', lineHeight: 1.55, marginTop: 6 }}>
                  <p><strong>Skin / Eye Contact:</strong> {selectedChem.firstAidSkinEye}</p>
                  <p style={{ marginTop: 4 }}><strong>Inhalation:</strong> {selectedChem.firstAidInhalation}</p>
                  <p style={{ marginTop: 4 }}><strong>Antidote:</strong> {selectedChem.antidote}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="web-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="card-header-row">
            <div>
              <h2 className="card-title">
                <Bot size={22} color="var(--primary)" />
                <span>AI Chemical Safety Assistant</span>
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                Strictly grounded in CIB&RC sheets - never guesses or hallucinates
              </p>
            </div>
            <span className="badge badge-green">Grounded Mode</span>
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
            {[
              'What is the dilution ratio for Deltamethrin?',
              'What PPE is required for Imidacloprid?',
              'First aid for Fipronil gel eye splash?',
              'Re-entry time for Termite Shield?',
            ].map((q, idx) => (
              <button
                key={idx}
                className="stage-pill-btn"
                onClick={() => askAi(q)}
              >
                {q}
              </button>
            ))}
          </div>

          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: 16,
              height: 320,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              marginBottom: 14,
            }}
          >
            {chatLog.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '12px 16px',
                  borderRadius: 14,
                  background: m.role === 'user' ? 'var(--primary)' : '#FFFFFF',
                  color: m.role === 'user' ? '#FFFFFF' : 'var(--ink)',
                  border: m.role === 'user' ? 'none' : '1px solid var(--border-strong)',
                  fontSize: '0.9rem',
                  lineHeight: 1.45,
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && askAi()}
              placeholder="Ask about dilution, PPE, re-entry time, or first-aid..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: 12,
                border: '1px solid var(--border-strong)',
                background: 'var(--surface)',
                fontSize: '0.92rem',
              }}
            />
            <button className="btn btn-primary" onClick={() => askAi()}>
              <Send size={16} /> Ask AI
            </button>
          </div>
        </div>
      </div>

      <ModalDialog
        open={protocolModal}
        onClose={() => setProtocolModal(false)}
        title="6-Step Emergency Chemical Exposure Protocol"
        icon={HeartPulse}
        danger
      >
        <div style={{ display: 'grid', gap: 12 }}>
          {[
            { step: '1. Immediate Evacuation', detail: 'Move the technician or resident to fresh air immediately. Open all windows and doors.' },
            { step: '2. Dermal / Skin Exposure', detail: 'Remove contaminated clothing immediately. Wash affected skin with soap and cool running water for 15 minutes.' },
            { step: '3. Ocular / Eye Splash', detail: 'Hold eyelids open and flush slowly with clean running water for at least 15 minutes. Remove contact lenses if present.' },
            { step: '4. Accidental Ingestion', detail: 'Do NOT induce vomiting. Rinse mouth thoroughly with water. Never give anything by mouth to an unconscious person.' },
            { step: '5. Respiratory Inhalation', detail: 'Keep patient propped up and calm. Loosen tight collar or belt. Call 108 if breathing is irregular.' },
            { step: '6. Poison Control Handover', detail: 'Dial 1800-11-2233 and quote the exact CIB&RC registration number from the CSDS panel.' },
          ].map((item, i) => (
            <div key={i} className="field-box">
              <div style={{ fontWeight: 800, color: 'var(--danger)', marginBottom: 4 }}>
                {item.step}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--ink)' }}>{item.detail}</div>
            </div>
          ))}
        </div>
      </ModalDialog>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('job');
  const [sosOpen, setSosOpen] = useState(false);
  const {
    booking,
    dutyStatus,
    setDutyStatus,
    assignedWorker,
    earnings,
    routeStops,
    syncFromRemote,
  } = useAppStore();
  const { toasts, show: toast } = useToast();

  useEffect(() => {
    syncFromRemote();
    const id = setInterval(() => syncFromRemote(), 3000);
    return () => clearInterval(id);
  }, [syncFromRemote]);

  const effectiveDuty =
    booking && ['TECHNICIAN_ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS'].includes(booking.status)
      ? 'ON_JOB'
      : dutyStatus;

  const navItems = [
    {
      id: 'job',
      label: 'Active Job Workspace',
      icon: Briefcase,
      badge: booking && booking.status !== 'CANCELLED' ? booking.status.replace(/_/g, ' ') : 'Idle',
    },
    {
      id: 'route',
      label: "Today's Route & Stops",
      icon: MapPin,
      badge: `${routeStops.length} Stops`,
    },
    {
      id: 'earnings',
      label: 'Earnings & UPI Payout',
      icon: Wallet,
      badge: `Rs. ${earnings.today}`,
    },
    {
      id: 'safety',
      label: 'Safety Hub & AI CSDS',
      icon: ShieldCheck,
      badge: '3 Sheets',
    },
  ];

  const sectionHeaders = {
    job: {
      title: 'Technician Dispatch & Job Execution Workspace',
      subtitle: 'Real-time state machine, privacy-gated customer details, OTP verification, and 6-step safety compliance',
    },
    route: {
      title: "Today's Assigned Route & Manifest",
      subtitle: 'Bengaluru South cluster schedule, chemical load-out requirements, and stop payouts',
    },
    earnings: {
      title: 'Technician Earnings & Instant UPI Settlement',
      subtitle: 'Track daily payouts, safety compliance bonuses, and instant IMPS bank transfers',
    },
    safety: {
      title: 'CIB&RC Chemical Safety Data Sheets & AI Assistant',
      subtitle: 'Verified dilution ratios, mandatory PPE checklists, and emergency exposure protocols',
    },
  };

  return (
    <div className="web-layout">
      <ToastStack toasts={toasts} />
      <SosModal open={sosOpen} onClose={() => setSosOpen(false)} toast={toast} />

      <aside className="web-sidebar" aria-label="Technician Portal Navigation">
        <div className="sidebar-brand">
          <div className="brand-logo-box">
            <ShieldCheck size={24} />
          </div>
          <div>
            <div className="brand-title">Pest Free</div>
            <div className="brand-subtitle">Technician Web Portal</div>
          </div>
        </div>

        <div className="sidebar-worker-card">
          <div className="worker-avatar-row">
            <div className="worker-avatar">AS</div>
            <div>
              <div className="worker-name">{assignedWorker?.name || 'Arjun Sharma'}</div>
              <div className="worker-meta">Lic: {assignedWorker?.licenseCode || 'CHL-2024-889'}</div>
            </div>
          </div>
          <div className="worker-badges">
            <span className="sidebar-badge">
              <UserCheck size={12} /> KYC Verified
            </span>
            <span className="sidebar-badge">
              <Star size={12} /> 4.92 Rating
            </span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Operations Console</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon size={19} />
                <span>{item.label}</span>
                <span className="nav-pill-count">{item.badge}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button
            className="sidebar-sos-btn"
            onClick={() => setSosOpen(true)}
          >
            <AlertTriangle size={18} /> Emergency SOS Hotline
          </button>
        </div>
      </aside>

      <div className="web-main">
        <header className="web-topbar">
          <div className="topbar-left">
            <div>
              <h1 className="topbar-title">{sectionHeaders[activeSection].title}</h1>
              <div className="topbar-subtitle">{sectionHeaders[activeSection].subtitle}</div>
            </div>
          </div>

          <div className="topbar-right">
            <div className="duty-switcher" role="group" aria-label="Duty status toggle">
              <button
                className={`duty-btn ${effectiveDuty === 'ON_DUTY' ? 'active-on' : ''}`}
                onClick={() => {
                  setDutyStatus('ON_DUTY');
                  toast('Status set to On Duty - Ready for dispatches', 'success');
                }}
              >
                <span className="status-dot" /> On Duty
              </button>
              <button
                className={`duty-btn ${effectiveDuty === 'ON_JOB' ? 'active-job' : ''}`}
                onClick={() => toast('Currently assigned to an active job', 'info')}
              >
                <span className="status-dot" /> On Job
              </button>
              <button
                className={`duty-btn ${effectiveDuty === 'OFF_DUTY' ? 'active-off' : ''}`}
                onClick={() => {
                  if (effectiveDuty === 'ON_JOB') {
                    toast('Cannot go Off Duty while a treatment is active', 'error');
                    return;
                  }
                  setDutyStatus('OFF_DUTY');
                  toast('Status set to Off Duty', 'info');
                }}
              >
                <span className="status-dot" /> Off Duty
              </button>
            </div>
          </div>
        </header>

        <main className="web-page">
          {activeSection === 'job' && (
            <ActiveJobSection toast={toast} onNavigate={setActiveSection} />
          )}
          {activeSection === 'route' && (
            <RouteSection toast={toast} onNavigate={setActiveSection} />
          )}
          {activeSection === 'earnings' && <EarningsSection toast={toast} />}
          {activeSection === 'safety' && <SafetySection toast={toast} />}
        </main>
      </div>
    </div>
  );
}

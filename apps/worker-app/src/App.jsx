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
  KeyRound,
  QrCode,
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
        className="modal-card"
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
            <h2 className="modal-title">{title}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </motion.div>
    </div>
  );
}

function SosModal({ open, onClose, toast }) {
  const [called, setCalled] = useState(false);
  const handleCall = (title, num) => {
    setCalled(true);
    toast(`Initiating emergency contact with ${title} (${num})...`, 'error');
  };

  return (
    <ModalDialog open={open} onClose={onClose} title="Emergency Assistance & Safety Hotline" icon={AlertTriangle} danger>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
          If an acute chemical spill, adverse skin contact, pet exposure, or customer escalation occurs, use the one-touch hotline below immediately.
        </p>

        <div className="web-card-surface" style={{ borderLeft: '4px solid var(--danger)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--ink)' }}>National Poison Information Centre (AIIMS)</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>24x7 Toxicology Guidance Toll-Free</div>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => handleCall('AIIMS Toxicology', '1800-116-117')}>
              <Phone size={14} /> 1800-116-117
            </button>
          </div>
        </div>

        <div className="web-card-surface" style={{ borderLeft: '4px solid var(--accent)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--ink)' }}>Agency Operations Dispatch Desk</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>Immediate route supervisor override</div>
            </div>
            <button className="btn btn-accent btn-sm" onClick={() => handleCall('Agency Ops', '+91 80 4912 3450')}>
              <Phone size={14} /> Call Ops Desk
            </button>
          </div>
        </div>

        <button className="btn btn-outline btn-block" style={{ marginTop: 6 }} onClick={onClose}>
          Dismiss / Back to Safety Hub
        </button>
      </div>
    </ModalDialog>
  );
}

const LIFECYCLE_STAGES = [
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

function LifecycleStepper({ currentStatus }) {
  const currentIndex = LIFECYCLE_STAGES.findIndex((s) => s.key === currentStatus);
  const activeIdx = currentIndex === -1 ? 0 : currentIndex;
  const progressPct = Math.round(((activeIdx + 1) / LIFECYCLE_STAGES.length) * 100);

  return (
    <div className="lifecycle-stepper-v2" aria-label="Job Lifecycle Progress">
      {/* Top Header Row with Motion Graphics Meta */}
      <div className="stepper-header-row">
        <div className="stepper-live-indicator">
          <span className="pulse-indicator-dot" />
          <span>Live Operations Progression &bull; Stage {activeIdx + 1} of {LIFECYCLE_STAGES.length}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)' }}>
            Mission Execution:
          </span>
          <span className="badge badge-green" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
            {progressPct}% Completed
          </span>
        </div>
      </div>

      {/* Glowing Liquid Progress Bar */}
      <div className="stepper-progress-bar-wrap">
        <div
          className="stepper-progress-bar-fill"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* 7 Motion Graphic Stage Cards */}
      <div className="stepper-grid-v2">
        {LIFECYCLE_STAGES.map((st, i) => {
          const isDone = i < activeIdx;
          const isCurrent = i === activeIdx;
          const isUpcoming = i > activeIdx;
          const Icon = st.icon;

          return (
            <div
              key={st.key}
              className={`step-card-v2 ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''} ${isUpcoming ? 'upcoming' : ''}`}
            >
              {/* Top Row: Step # and Status Badge */}
              <div className="step-card-top-row">
                <span className="step-num-pill">STEP {st.step}</span>
                <span
                  className="step-badge-pill"
                  style={{
                    background: isCurrent ? 'rgba(255,255,255,0.22)' : isDone ? 'rgba(16,185,129,0.15)' : 'rgba(0,0,0,0.05)',
                    color: isCurrent ? '#FFFFFF' : isDone ? '#065F46' : 'var(--ink-muted)',
                  }}
                >
                  {isDone ? '✓ Done' : isCurrent ? 'Live Now' : st.badge}
                </span>
              </div>

              {/* Center Motion Icon Bubble */}
              <div className="step-icon-bubble">
                <Icon size={20} strokeWidth={isCurrent ? 2.5 : 2} />
              </div>

              {/* Stage Title and Micro Content */}
              <div>
                <div className="step-title-v2">{st.label}</div>
                <div className="step-sub-v2">{st.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WorkerMiniMap({ customerCoords, workerCoords, height = '220px' }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const cLat = customerCoords?.lat || 12.9250;
  const cLng = customerCoords?.lng || 77.5938;
  const wLat = workerCoords?.lat || 12.9352;
  const wLng = workerCoords?.lng || 77.6245;

  useEffect(() => {
    if (!mapContainerRef.current || !window.L) return;

    if (!mapInstanceRef.current) {
      const map = window.L.map(mapContainerRef.current, {
        center: [cLat, cLng],
        zoom: 14,
        zoomControl: false,
      });

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 18,
      }).addTo(map);

      // Customer Destination Pin
      const custIcon = window.L.divIcon({
        className: 'custom-pin-icon',
        html: `<div style="background:#E8A317; color:#1D2B1A; border:2px solid #FFFFFF; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 10px rgba(0,0,0,0.3); font-weight:800; font-size:15px;">🏠</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
      window.L.marker([cLat, cLng], { icon: custIcon })
        .addTo(map)
        .bindPopup('<b>Customer Destination Pinned</b>');

      // Worker Live Scooter Pin
      const techIcon = window.L.divIcon({
        className: 'custom-pin-icon',
        html: `<div style="position:relative; width:36px; height:36px; display:flex; align-items:center; justify-content:center;">
          <div style="position:absolute; width:100%; height:100%; border-radius:50%; background:rgba(31,91,58,0.35); animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
          <div style="background:#1F5B3A; color:#FFFFFF; border:2px solid #FFFFFF; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 10px rgba(0,0,0,0.3); font-size:13px;">🛵</div>
        </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });
      const m = window.L.marker([wLat, wLng], { icon: techIcon }).addTo(map);
      markerRef.current = m;

      window.L.polyline([[wLat, wLng], [cLat, cLng]], {
        color: '#1F5B3A',
        weight: 3,
        dashArray: '6, 6',
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      if (markerRef.current) markerRef.current.setLatLng([wLat, wLng]);
    }
  }, [cLat, cLng, wLat, wLng]);

  return (
    <div
      style={{
        width: '100%',
        height,
        borderRadius: 14,
        overflow: 'hidden',
        border: '1.5px solid var(--border-strong)',
        marginTop: 12,
        position: 'relative',
      }}
    >
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function ActiveJobSection({ toast, onNavigate }) {
  const {
    booking,
    incomingJob,
    contactUnlocked,
    startOtp,
    completionPin,
    workCompletedByWorker,
    pinVerifiedByWorker,
    paymentQrGenerated,
    customerPaid,
    customerReview,
    liveCustomerLocation,
    workerPosition,
    etaSeconds,
    safetyChecklist,
    afterPhotoTaken,
    simulateIncomingJob,
    agencyApproveBooking,
    workerAcceptAndNavigate,
    workerDeclineJob,
    fastForwardEta,
    workerMarkArrived,
    workerStartTreatment,
    toggleSafetyStep,
    checkAllSafetySteps,
    captureAfterPhoto,
    workerMarkWorkFinished,
    workerVerifyCustomerCompletionPin,
    workerSimulateCustomerReview,
    workerConfirmPaymentReceived,
    canWorkerMarkArrived,
  } = useAppStore();

  // Navigation / Dedicated Execution Console View
  const [inExecutionView, setInExecutionView] = useState(false);

  // Auto-switch to execution view if en route or past en route
  useEffect(() => {
    if (booking && ['ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'COMPLETED'].includes(booking.status)) {
      setInExecutionView(true);
    }
  }, [booking?.status]);

  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const [compPinDigits, setCompPinDigits] = useState(['', '', '', '']);
  const [compPinError, setCompPinError] = useState('');
  const compPinRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

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
    toast('Customer Doorstep OTP verified! Chemical treatment started.', 'success');
    setOtpDigits(['', '', '', '']);
  };

  const fillDemoOtp = () => {
    const expected = (startOtp || booking?.startOtp || '4829').split('');
    setOtpDigits(expected);
    setOtpError('');
  };

  const handleCompPinChange = (index, val) => {
    const clean = val.replace(/\D/g, '').slice(-1);
    const updated = [...compPinDigits];
    updated[index] = clean;
    setCompPinDigits(updated);
    setCompPinError('');
    if (clean && index < 3) {
      compPinRefs[index + 1].current?.focus();
    }
  };

  const handleVerifyCompPin = async () => {
    const code = compPinDigits.join('');
    const res = await workerVerifyCustomerCompletionPin(code);
    if (!res.ok) {
      setCompPinError(res.error);
      toast(res.error, 'error');
      return;
    }
    toast('Completion PIN verified! Customer must now submit review to generate payment QR.', 'success');
    setCompPinDigits(['', '', '', '']);
  };

  const fillDemoCompPin = () => {
    const expected = (completionPin || '7391').split('');
    setCompPinDigits(expected);
    setCompPinError('');
  };

  const rawPrice =
    typeof booking?.price === 'number'
      ? booking.price
      : booking?.price?.total ?? booking?.pricing?.total ?? 1600;
  const workerPayout = incomingJob?.payout ?? Math.round(rawPrice * 0.55);

  const canMarkWorkFinished = safetyChecklist.every(Boolean) && afterPhotoTaken;

  const lat = booking?.coords?.lat || liveCustomerLocation?.lat || 12.9250;
  const lng = booking?.coords?.lng || liveCustomerLocation?.lng || 77.5938;

  return (
    <div>
      {/* High-Tech Dispatch Simulator Console */}
      <div
        className="demo-toolbar"
        style={{
          background: 'linear-gradient(135deg, rgba(31,91,58,0.06), rgba(232,163,23,0.06))',
          border: '1.5px solid rgba(31,91,58,0.2)',
          padding: '14px 18px',
          borderRadius: 16,
          marginBottom: 20,
        }}
      >
        <div className="demo-toolbar-label" style={{ color: 'var(--primary-dark)', fontSize: '0.86rem' }}>
          <Sparkles size={18} color="#E8A317" style={{ filter: 'drop-shadow(0 0 6px #E8A317)' }} />
          <span>Interactive Dispatch State Simulator:</span>
        </div>
        <div className="demo-stage-pills">
          {LIFECYCLE_STAGES.map((st) => (
            <button
              key={st.key}
              className={`stage-pill-btn ${booking?.status === st.key ? 'active' : ''}`}
              style={
                booking?.status === st.key
                  ? {
                      background: 'var(--primary)',
                      color: '#FFFFFF',
                      borderColor: 'var(--primary)',
                      boxShadow: '0 4px 12px rgba(31,91,58,0.25)',
                    }
                  : {}
              }
              onClick={() => {
                simulateIncomingJob(st.key);
                toast(`Loaded job in ${st.label} state`, 'info');
              }}
            >
              <span>{st.step}. {st.label}</span>
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
            You are currently online. Place a booking from the Customer App (port 3000) or simulate an incoming booking below.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                simulateIncomingJob('BOOKING_PLACED');
                toast('New incoming booking placed! Waiting for Agency 1-time approval.', 'info');
              }}
            >
              <Play size={18} /> Load New Incoming Booking (Awaiting Agency)
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

          {/* DEDICATED LIVE NAVIGATION & EXECUTION DASHBOARD (Opens upon Accept & Navigate) */}
          {inExecutionView && ['ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'COMPLETED'].includes(booking.status) ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Navigation Header Bar */}
              <div
                className="web-card"
                style={{
                  background: 'linear-gradient(135deg, #1F5B3A, #123C25)',
                  color: '#FFFFFF',
                  padding: '18px 24px',
                  borderRadius: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 12,
                }}
              >
                <div>
                  <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#FFFFFF', marginBottom: 6 }}>
                    Live Active Execution Console
                  </span>
                  <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>
                    {booking.customerFullName || 'Aarav Sharma'} &bull; {booking.pestLabel}
                  </h2>
                  <div style={{ fontSize: '0.84rem', opacity: 0.85, marginTop: 4 }}>
                    {booking.address} &bull; <a href={`tel:${booking.customerRealPhone || '+919845067890'}`} style={{ color: '#FDE047', fontWeight: 700 }}>{booking.customerRealPhone || '+91 98450 67890'}</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    className="btn btn-sm"
                    style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)' }}
                    onClick={() => setInExecutionView(false)}
                  >
                    Minimize to Overview
                  </button>
                  <a
                    href={`tel:${booking.customerRealPhone || '+919845067890'}`}
                    className="btn btn-sm"
                    style={{ background: '#E8A317', color: '#1D2B1A', fontWeight: 800 }}
                  >
                    <Phone size={15} /> Call Customer
                  </a>
                </div>
              </div>

              {/* REAL INTERACTIVE MAP DISPLAYED IN THIS OPENED EXECUTION VIEW */}
              <div className="web-card" style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Navigation size={18} color="var(--primary)" />
                    <span>Real-Time Turn-by-Turn GPS Map (OpenStreetMap)</span>
                  </div>
                  <span className="badge badge-green">Live Satellite Sync Active</span>
                </div>
                <WorkerMiniMap
                  customerCoords={booking.coords || liveCustomerLocation || { lat, lng }}
                  workerCoords={workerPosition || { lat: 12.9352, lng: 77.6245 }}
                  height="280px"
                />
              </div>

              {/* ACTION EXECUTION DECK */}
              <div className="web-card">
                {/* Stage 1: En Route */}
                {booking.status === 'ON_THE_WAY' && (
                  <div>
                    <span className="badge badge-green" style={{ marginBottom: 10 }}>
                      En Route to Customer Doorstep
                    </span>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: 6 }}>
                      Travel in Progress &bull; Approaching Destination
                    </h3>
                    <p style={{ color: 'var(--ink-muted)', fontSize: '0.86rem', marginBottom: 16 }}>
                      Navigate to {booking.address}. Once parked at gate, mark arrival to prompt customer for Start OTP.
                    </p>

                    <div
                      className="web-card-surface"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 16,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Clock size={28} color="var(--primary)" />
                        <div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--ink-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                            Live ETA Remaining
                          </div>
                          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
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
                        toast('Marked Arrived! Enter customer 4-digit start OTP.', 'success');
                      }}
                    >
                      <MapPin size={18} />
                      {etaSeconds > 0
                        ? `Wait ${etaSeconds}s (or click Skip Timer) to Mark Arrived`
                        : 'Mark Arrived at Customer Doorstep'}
                    </button>
                  </div>
                )}

                {/* Stage 2: Arrived - Enter Doorstep Start OTP */}
                {booking.status === 'ARRIVED' && (
                  <div>
                    <span className="badge badge-amber" style={{ marginBottom: 10 }}>
                      Doorstep Arrival &bull; OTP Verification
                    </span>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: 6 }}>
                      Enter Customer 4-Digit Treatment Start OTP
                    </h3>
                    <p style={{ color: 'var(--ink-muted)', fontSize: '0.86rem', marginBottom: 16 }}>
                      Ask homeowner for the 4-digit Treatment Start OTP shown on their screen to begin chemical application.
                    </p>

                    <div
                      className="web-card-surface"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 16,
                        borderLeft: '4px solid var(--accent)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <KeyRound size={20} color="var(--accent)" />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Customer OTP Prompt</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                            Required before opening chemical seals
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-outline btn-sm" onClick={fillDemoOtp}>
                        Demo Quick Fill ({startOtp || booking?.startOtp || '4829'})
                      </button>
                    </div>

                    <div className="otp-row" style={{ marginBottom: 16 }}>
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
                      <CheckCircle2 size={18} /> Verify Start OTP & Begin Treatment
                    </button>
                  </div>
                )}

                {/* Stage 3: Treatment In Progress + Below that Completion PIN */}
                {booking.status === 'IN_PROGRESS' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span className="badge badge-green">
                        Chemical Treatment In Progress
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
                      Mandatory Safety Checklist & Protocol
                    </h3>
                    <p style={{ color: 'var(--ink-muted)', fontSize: '0.86rem', marginBottom: 16 }}>
                      Complete all 6 steps and capture post-treatment photo proof to unlock completion.
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

                    <div className="web-card-surface" style={{ marginTop: 16, marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                            Post-Treatment Barrier Photo Proof
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                            {afterPhotoTaken
                              ? 'Timestamped photo attached and verified.'
                              : 'Required before marking completed.'}
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

                    {/* Step A: Worker clicks Completed */}
                    {!workCompletedByWorker ? (
                      <div>
                        <button
                          className="btn btn-success btn-lg btn-block"
                          disabled={!canMarkWorkFinished}
                          onClick={async () => {
                            const res = await workerMarkWorkFinished();
                            if (res.ok) {
                              toast('Work completed! Customer dashboard now reveals the 4-digit Completion PIN.', 'success');
                            } else {
                              toast(res.error, 'error');
                            }
                          }}
                        >
                          <CheckCircle2 size={18} />
                          {canMarkWorkFinished
                            ? 'Complete My Work (Reveal Customer PIN)'
                            : `Complete (${safetyChecklist.filter(Boolean).length}/6 steps, ${
                                afterPhotoTaken ? '1/1' : '0/1'
                              } photo)`}
                        </button>
                        <p style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', textAlign: 'center', marginTop: 8 }}>
                          Clicking this unlocks and displays the Completion PIN on the customer's phone.
                        </p>
                      </div>
                    ) : (
                      /* Step B: Below that, enter Completion PIN */
                      <div className="web-card-surface" style={{ border: '2px solid var(--primary)', padding: 18, borderRadius: 12, marginTop: 14 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                          <div>
                            <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>
                              Enter Customer 4-Digit Completion PIN
                            </div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>
                              Ask customer for the 4-digit PIN now displayed on their screen.
                            </div>
                          </div>
                          <button className="btn btn-outline btn-sm" onClick={fillDemoCompPin}>
                            Demo Fill ({completionPin || '7391'})
                          </button>
                        </div>

                        <div className="otp-row" style={{ marginBottom: 14 }}>
                          {compPinDigits.map((digit, i) => (
                            <input
                              key={i}
                              ref={compPinRefs[i]}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={digit}
                              aria-label={`Completion PIN digit ${i + 1}`}
                              className="otp-box"
                              onChange={(e) => handleCompPinChange(i, e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Backspace' && !digit && i > 0) {
                                  compPinRefs[i - 1].current?.focus();
                                }
                              }}
                            />
                          ))}
                        </div>

                        {compPinError && (
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
                            {compPinError}
                          </div>
                        )}

                        <button
                          className="btn btn-primary btn-lg btn-block"
                          disabled={compPinDigits.join('').length < 4}
                          onClick={handleVerifyCompPin}
                        >
                          <Award size={18} /> Verify Completion PIN (Proceed to Review & Payout)
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Stage 4: Completed - Review & Automatic Payment QR */}
                {booking.status === 'COMPLETED' && (
                  <div>
                    <div style={{ textAlign: 'center', padding: '12px 8px' }}>
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: 'var(--success-light)',
                          color: 'var(--success)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 12px',
                        }}
                      >
                        <Award size={32} />
                      </div>
                      <span className="badge badge-green" style={{ marginBottom: 8 }}>
                        Treatment & Completion PIN Verified
                      </span>
                      <h3 style={{ fontSize: '1.35rem', marginBottom: 6 }}>
                        Great Work! Rs. {workerPayout} Payout Earned
                      </h3>
                    </div>

                    {/* Waiting for Customer Review */}
                    {!customerReview && (
                      <div
                        className="web-card-surface"
                        style={{
                          borderLeft: '4px solid #E8A317',
                          padding: 18,
                          borderRadius: 12,
                          marginBottom: 16,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                          <Clock size={22} color="#E8A317" />
                          <div>
                            <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--ink)' }}>
                              Awaiting Customer Review
                            </div>
                            <div style={{ fontSize: '0.80rem', color: 'var(--ink-muted)' }}>
                              Payment QR will generate automatically once client gives review
                            </div>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', lineHeight: 1.5, marginBottom: 12 }}>
                          The client is submitting their service review in their UI. As soon as the client gives review, the UPI Payment QR code will generate here automatically!
                        </p>
                        <button
                          className="btn btn-outline btn-sm btn-block"
                          onClick={async () => {
                            await workerSimulateCustomerReview(5, 'Punctual, eco-safe, and very thorough treatment!');
                            toast('Simulated customer review! Payment QR generated.', 'success');
                          }}
                        >
                          <Sparkles size={15} /> Quick Demo: Submit Customer Review (5★)
                        </button>
                      </div>
                    )}

                    {/* Customer Review Given -> QR Generated Automatically */}
                    {customerReview && !customerPaid && (
                      <div
                        className="web-card-surface"
                        style={{
                          border: '2px solid var(--primary)',
                          padding: 20,
                          borderRadius: 14,
                          textAlign: 'center',
                          marginBottom: 16,
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            color: 'var(--primary)',
                            fontWeight: 800,
                            fontSize: '1.05rem',
                            marginBottom: 4,
                          }}
                        >
                          <QrCode size={22} />
                          <span>UPI Payment QR Generated Automatically</span>
                        </div>
                        <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginBottom: 14 }}>
                          Client completed review! Show this QR to customer for instant UPI payment.
                        </p>

                        <div
                          style={{
                            display: 'inline-block',
                            padding: 14,
                            background: '#FFFFFF',
                            borderRadius: 16,
                            border: '2px dashed var(--primary)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                            marginBottom: 12,
                          }}
                        >
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                              `upi://pay?pa=pestfast.billing@icici&pn=PestFast&am=${rawPrice}&cu=INR&tn=Booking-${booking.id}`
                            )}`}
                            alt="UPI Payment QR Code"
                            style={{ width: 180, height: 180, display: 'block', margin: '0 auto' }}
                          />
                          <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)', marginTop: 8 }}>
                            Rs. {rawPrice}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                            UPI ID: pestfast.billing@icici
                          </div>
                        </div>

                        <div
                          style={{
                            background: 'var(--bg-canvas)',
                            borderRadius: 10,
                            padding: '10px 14px',
                            maxWidth: 380,
                            margin: '0 auto 16px',
                            textAlign: 'left',
                            border: '1px solid var(--border)',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: '0.84rem', color: 'var(--accent)' }}>
                            <Star size={15} fill="var(--accent)" /> {customerReview.rating} / 5 Stars Client Review
                          </div>
                          <div style={{ fontSize: '0.80rem', color: 'var(--ink)', fontStyle: 'italic', marginTop: 3 }}>
                            "{customerReview.comment || 'Punctual, thorough, and highly professional!'}"
                          </div>
                        </div>

                        <button
                          className="btn btn-success btn-lg btn-block"
                          onClick={async () => {
                            await workerConfirmPaymentReceived();
                            toast(`Payment of Rs. ${rawPrice} confirmed! Payout settled.`, 'success');
                          }}
                        >
                          <CheckCircle2 size={18} /> Confirm Payment Received (Rs. {rawPrice})
                        </button>
                      </div>
                    )}

                    {/* Payment Confirmed */}
                    {customerPaid && (
                      <div
                        className="web-card-surface"
                        style={{
                          borderLeft: '4px solid var(--success)',
                          padding: 18,
                          borderRadius: 12,
                          textAlign: 'left',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--success)', fontWeight: 800, fontSize: '1rem', marginBottom: 4 }}>
                          <CheckCircle2 size={20} />
                          <span>Payment Confirmed & Settled</span>
                        </div>
                        <div style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginBottom: 12 }}>
                          Client paid Rs. {rawPrice} via UPI. Rs. {workerPayout} credited to wallet.
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => onNavigate('earnings')}
                          >
                            <Wallet size={15} /> Go to Earnings & Withdraw
                          </button>
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => {
                              setInExecutionView(false);
                              simulateIncomingJob('BOOKING_PLACED');
                              toast('Ready for next dispatch!', 'info');
                            }}
                          >
                            <RefreshCw size={15} /> Close & Take Next Dispatch
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* MAIN OPERATIONS OVERVIEW (Before Clicking Accept & Navigate) */
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

                {/* Customer Contact & Address Card */}
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
                      {contactUnlocked ? 'Agency Confirmed — Actual Details Unlocked' : 'Masked (Waiting for Agency to Permit)'}
                    </span>
                  </div>

                  <div className="field-grid">
                    <div className="field-box">
                      <div className="field-label">Customer Name</div>
                      <div className="field-value">
                        {contactUnlocked
                          ? booking.customerFullName || 'Aarav Sharma'
                          : incomingJob?.maskedName || booking.customerMaskedName || 'Aarav S.'}
                      </div>
                      <div className="field-sub">
                        {contactUnlocked ? 'Actual Verified Name' : 'Masked until Agency approves'}
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
                        {contactUnlocked ? 'Actual Direct Phone' : 'Masked proxy bridge'}
                      </div>
                    </div>
                  </div>

                  <div className="field-box" style={{ marginTop: 14 }}>
                    <div className="field-label">Service Address</div>
                    <div className="field-value">
                      {contactUnlocked
                        ? booking.address
                        : `${incomingJob?.area || 'Jayanagar 4th Block'} (Exact address locked until agency approval)`}
                    </div>
                  </div>

                  {/* GPS LOCATION AS A LINK ONLY (NO MAP ON THIS PAGE) */}
                  {contactUnlocked && (
                    <div className="field-box" style={{ marginTop: 14, background: 'var(--primary-light)', border: '1.5px solid var(--primary)' }}>
                      <div className="field-label" style={{ color: 'var(--primary-dark)', fontWeight: 800 }}>
                        <MapPin size={15} /> Actual Live GPS Coordinates (Link Only)
                      </div>
                      <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 700 }}>
                          Lat: {lat}&deg; N, Lng: {lng}&deg; E
                        </div>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm"
                        >
                          <Navigation size={14} /> Open Live GPS Location Link
                        </a>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--ink-muted)', marginTop: 4 }}>
                        Map will open inside the live navigation console when you accept & navigate.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Agency One-Time Approval & Accept/Navigate Action */}
              <div className="web-card">
                {!contactUnlocked ? (
                  <div>
                    <span className="badge badge-amber" style={{ marginBottom: 12 }}>
                      Awaiting Agency One-Time Approval
                    </span>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: 8 }}>
                      Waiting for Agency Permission
                    </h3>
                    <p style={{ color: 'var(--ink-muted)', lineHeight: 1.5, marginBottom: 20 }}>
                      Client booked this treatment. Waiting for the agency to approve and assign this job to you. All contact numbers and exact GPS coordinates remain masked until agency confirms.
                    </p>
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      onClick={async () => {
                        await agencyApproveBooking();
                        toast('Agency approved job! Actual customer details & GPS link unlocked.', 'success');
                      }}
                    >
                      <CheckCircle2 size={18} /> Agency Approve Job (1-Time Approval)
                    </button>
                  </div>
                ) : (
                  <div>
                    <span className="badge badge-green" style={{ marginBottom: 12 }}>
                      Agency Confirmed &bull; Ready for Route
                    </span>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: 8 }}>
                      Agency Permission Granted
                    </h3>
                    <p style={{ color: 'var(--ink-muted)', lineHeight: 1.5, marginBottom: 20 }}>
                      Actual customer number and GPS link are unlocked above. Click below to accept the dispatch, open the live map navigation console, and proceed to the customer doorstep.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <button
                        className="btn btn-primary btn-lg btn-block"
                        onClick={async () => {
                          await workerAcceptAndNavigate();
                          setInExecutionView(true);
                          toast('En route! Live navigation console opened with real map.', 'success');
                        }}
                      >
                        <Navigation size={18} /> Accept & Start Navigation (Open Live Map Console)
                      </button>
                      <button
                        className="btn btn-outline btn-block"
                        onClick={async () => {
                          await workerDeclineJob();
                          toast('Job passed back to agency dispatch queue.', 'info');
                        }}
                      >
                        <X size={16} /> Pass / Decline Dispatch
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
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

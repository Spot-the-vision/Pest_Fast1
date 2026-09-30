import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Phone,
  Lock,
  Unlock,
  Navigation,
  FileText,
  History,
  Bug,
  Home,
  Building2,
  Star,
  Award,
  RefreshCw,
  X,
  ChevronRight,
  AlertCircle,
  KeyRound,
  UserCheck,
  SprayCan,
  IndianRupee,
  HelpCircle,
  QrCode,
  Check,
} from 'lucide-react';
import { useAppStore } from './lib/api/store.js';
import {
  PEST_TYPES,
  PROPERTY_SIZES,
  PLANS,
  TIME_SLOTS,
  SAFETY_CHECKLIST_STEPS,
  BUNDLED_CHEMICAL_SHEETS,
  calculatePrice,
  calculateMultiServicePrice,
  generateSmartQuoteRecommendation,
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

function ModalDialog({ open, onClose, title, icon: Icon, children }) {
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
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
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
          <button className="btn btn-outline btn-sm" onClick={onClose}>
            <X size={16} /> Close
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </motion.div>
    </div>
  );
}

const LIFECYCLE_STAGES = [
  { key: 'BOOKING_PLACED', label: 'Booking Placed' },
  { key: 'AGENCY_APPROVED', label: 'Agency Approved' },
  { key: 'TECHNICIAN_ACCEPTED', label: 'Tech Accepted' },
  { key: 'ON_THE_WAY', label: 'On The Way' },
  { key: 'ARRIVED', label: 'Arrived (Start OTP)' },
  { key: 'IN_PROGRESS', label: 'In Progress' },
  { key: 'COMPLETED', label: 'Completed (PIN & QR)' },
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
          <span>Live Service Progression &bull; Stage {activeIdx + 1} of {LIFECYCLE_STAGES.length}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)' }}>
            Service Status:
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
          const isDone = i < activeIdx || currentStatus === 'COMPLETED';
          const isCurrent = i === activeIdx && currentStatus !== 'COMPLETED';
          const isUpcoming = i > activeIdx && currentStatus !== 'COMPLETED';

          return (
            <div
              key={st.key}
              className={`step-card-v2 ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''} ${isUpcoming ? 'upcoming' : ''}`}
            >
              {/* Top Row: Step # and Status Badge */}
              <div className="step-card-top-row">
                <span className="step-num-pill">STEP 0{i + 1}</span>
                <span
                  className="step-badge-pill"
                  style={{
                    background: isCurrent ? 'rgba(255,255,255,0.22)' : isDone ? 'rgba(16,185,129,0.15)' : 'rgba(0,0,0,0.05)',
                    color: isCurrent ? '#FFFFFF' : isDone ? '#065F46' : 'var(--ink-muted)',
                  }}
                >
                  {isDone ? '✓ Done' : isCurrent ? 'Live Now' : 'Queued'}
                </span>
              </div>

              {/* Center Motion Icon Bubble */}
              <div className="step-icon-bubble">
                <CheckCircle2 size={20} strokeWidth={isCurrent ? 2.5 : 2} />
              </div>

              {/* Stage Title and Micro Content */}
              <div>
                <div className="step-title-v2">{st.label}</div>
                <div className="step-sub-v2">Stage 0{i + 1} Verified</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function TrackSection({ toast, onNavigate }) {
  const {
    booking,
    assignedWorker,
    workerPosition,
    contactUnlocked,
    startOtp,
    completionPin,
    workCompletedByWorker,
    paymentQrGenerated,
    customerPaid,
    customerReview,
    liveCustomerLocation,
    etaSeconds,
    safetyChecklist,
    simulateCustomerStage,
    cancelBooking,
    submitCustomerReview,
    confirmCustomerPayment,
    submitCustomerReviewAndPay,
    pinVerifiedByWorker,
    canCancel,
  } = useAppStore();

  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState('');
  const [qrModal, setQrModal] = useState(false);
  useEffect(() => {
    if (paymentQrGenerated && !customerPaid) {
      setQrModal(true);
    }
  }, [paymentQrGenerated, customerPaid]);

  const rawTotal =
    typeof booking?.price === 'number'
      ? booking.price
      : booking?.price?.total ?? booking?.pricing?.total ?? 1600;

  return (
    <div>
      {/* Interactive Stage Switcher */}
      <div className="demo-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '0.84rem', color: 'var(--primary-dark)' }}>
          <Sparkles size={16} />
          <span>Interactive Tracking State Simulator:</span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {LIFECYCLE_STAGES.map((st) => (
            <button
              key={st.key}
              type="button"
              className={`stage-pill-btn ${booking?.status === st.key ? 'active' : ''}`}
              onClick={() => {
                simulateCustomerStage(st.key);
                toast(`Switched live tracker to ${st.label}`, 'info');
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
            <Navigation size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 8 }}>No Active Treatment in Progress</h2>
          <p style={{ color: 'var(--ink-muted)', maxWidth: 500, margin: '0 auto 24px', lineHeight: 1.5 }}>
            Place a new booking in the configurator or click any stage in the simulator bar above to preview real OpenStreetMap tracking, live doorstep OTP, and end-of-service PIN handshake.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => onNavigate('book')}>
              <Bug size={18} /> Book a New Pest Treatment
            </button>
            <button
              className="btn btn-outline btn-lg"
              onClick={() => {
                simulateCustomerStage('ON_THE_WAY');
                toast('Loaded live technician radar on OpenStreetMap!', 'success');
              }}
            >
              <Sparkles size={18} /> Preview Live Real Map Radar
            </button>
          </div>
        </div>
      )}

      {booking && booking.status !== 'CANCELLED' && (
        <>
          <LifecycleStepper currentStatus={booking.status} />

          <div className="dashboard-grid-2">
            {/* LEFT COLUMN: Real OpenStreetMap + Live Safety Feed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="web-card">
                <div className="card-header-row">
                  <div>
                    <span className="badge badge-neutral" style={{ marginBottom: 4 }}>
                      Booking #{booking.id}
                    </span>
                    <h2 className="card-title" style={{ fontSize: '1.3rem' }}>
                      Real Live Technician GPS Radar (OpenStreetMap)
                    </h2>
                  </div>
                  {booking.status === 'ON_THE_WAY' && (
                    <span className="badge badge-green">
                      <Clock size={14} /> ETA: {etaSeconds}s remaining
                    </span>
                  )}
                  {booking.status === 'ARRIVED' && (
                    <span className="badge badge-amber">Technician at Doorstep</span>
                  )}
                  {['IN_PROGRESS', 'COMPLETED'].includes(booking.status) && (
                    <span className="badge badge-green">On-Site Treatment Active</span>
                  )}
                </div>

                {/* Real OpenStreetMap View */}
                <RealLeafletMap
                  customerCoords={booking.coords || liveCustomerLocation}
                  workerCoords={workerPosition}
                  isLiveMove={booking.status === 'ON_THE_WAY'}
                  height="340px"
                />

                <div className="field-grid" style={{ marginTop: 16 }}>
                  <div className="field-box">
                    <div className="field-label">Target Treatment & Services</div>
                    <div className="field-value">{booking.pestLabel}</div>
                    <div className="field-sub">
                      {booking.planLabel} ({booking.sizeLabel})
                    </div>
                  </div>
                  <div className="field-box">
                    <div className="field-label">Pinned Customer Coordinates</div>
                    <div className="field-value">
                      Lat: {booking.coords?.lat || liveCustomerLocation.lat}, Lng: {booking.coords?.lng || liveCustomerLocation.lng}
                    </div>
                    <div className="field-sub">{booking.address}</div>
                  </div>
                </div>
              </div>

              {/* Live Safety Protocol Checklist */}
              {['IN_PROGRESS', 'COMPLETED'].includes(booking.status) && (
                <div className="web-card">
                  <div className="card-header-row">
                    <h3 className="card-title">
                      <ShieldCheck size={20} color="var(--success)" />
                      <span>Live Technician Safety Protocol Feed</span>
                    </h3>
                    <span className="badge badge-green">
                      {safetyChecklist.filter(Boolean).length} of 6 Verified
                    </span>
                  </div>
                  <div style={{ display: 'grid', gap: 10 }}>
                    {SAFETY_CHECKLIST_STEPS.map((st, idx) => {
                      const done = safetyChecklist[idx] || booking.status === 'COMPLETED';
                      return (
                        <div
                          key={idx}
                          className="field-box"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: done ? 'var(--success-light)' : 'var(--surface)',
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                              {idx + 1}. {st.title}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                              {st.description}
                            </div>
                          </div>
                          <span className={`badge ${done ? 'badge-green' : 'badge-neutral'}`}>
                            {done ? 'Verified' : 'Pending'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Doorstep OTP Handshake, End-of-Service Completion PIN, QR Payment & Review */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* 1. Doorstep Start OTP Card */}
              <div
                className="web-card"
                style={{
                  borderTop: '4px solid var(--accent)',
                  background: booking.status === 'ARRIVED' ? 'var(--accent-light)' : 'var(--card)',
                }}
              >
                <div className="card-header-row">
                  <h3 className="card-title">
                    <KeyRound size={20} color="var(--primary)" />
                    <span>Doorstep Treatment Start OTP</span>
                  </h3>
                  <span className="badge badge-amber">Share on Arrival</span>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', lineHeight: 1.45, marginBottom: 14 }}>
                  Share this 4-digit code with your technician only when they arrive at your doorstep with their PPE kit.
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: 12,
                    justifyContent: 'center',
                    padding: '14px',
                    background: '#FFFFFF',
                    borderRadius: 14,
                    border: '2px dashed var(--border-strong)',
                  }}
                >
                  {String(startOtp || '4829')
                    .split('')
                    .map((d, i) => (
                      <div
                        key={i}
                        style={{
                          width: 54,
                          height: 60,
                          borderRadius: 12,
                          background: 'var(--surface)',
                          border: '1px solid var(--border-strong)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.75rem',
                          fontWeight: 800,
                          color: 'var(--primary-dark)',
                        }}
                      >
                        {d}
                      </div>
                    ))}
                </div>
              </div>

              {/* 2. End-of-Service Completion PIN Card (Mocked until worker finishes work) */}
              <div
                className="web-card"
                style={{
                  borderTop: '4px solid var(--primary)',
                  background: workCompletedByWorker || booking.status === 'COMPLETED' ? 'var(--primary-light)' : 'var(--surface)',
                }}
              >
                <div className="card-header-row">
                  <h3 className="card-title">
                    <Award size={20} color="var(--primary)" />
                    <span>End-of-Service Completion Security PIN</span>
                  </h3>
                  <span className={`badge ${workCompletedByWorker || booking.status === 'COMPLETED' ? 'badge-green' : 'badge-neutral'}`}>
                    {workCompletedByWorker || booking.status === 'COMPLETED' ? 'Work Finished — PIN Unlocked' : 'Mocked (Locked until technician clicks Complete)'}
                  </span>
                </div>

                {workCompletedByWorker || booking.status === 'COMPLETED' ? (
                  <div>
                    <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', lineHeight: 1.45, marginBottom: 12 }}>
                      The technician has completed all 6 treatment steps and photo proof. Provide this 4-digit Completion PIN so they can close the ticket and generate your payment invoice QR.
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        gap: 12,
                        justifyContent: 'center',
                        padding: '14px',
                        background: '#FFFFFF',
                        borderRadius: 14,
                        border: '2px solid var(--primary)',
                      }}
                    >
                      {String(completionPin || '7391')
                        .split('')
                        .map((d, i) => (
                          <div
                            key={i}
                            style={{
                              width: 54,
                              height: 60,
                              borderRadius: 12,
                              background: 'var(--primary)',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontFamily: 'var(--font-heading)',
                              fontSize: '1.75rem',
                              fontWeight: 800,
                            }}
                          >
                            {d}
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '16px', background: '#FFFFFF', borderRadius: 12, border: '1px dashed var(--border-strong)' }}>
                    <Lock size={28} color="var(--ink-muted)" style={{ margin: '0 auto 8px' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>PIN is Mocked / Hidden</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginTop: 4 }}>
                      This PIN will reveal here as soon as the worker ticks all 6 safety steps and clicks "Finish Treatment" on their dashboard.
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Assigned Technician & Contact Card */}
              <div className="web-card">
                <div className="card-header-row">
                  <h3 className="card-title">
                    <UserCheck size={20} color="var(--primary)" />
                    <span>Assigned Technician & Agency Verification</span>
                  </h3>
                  <span className="badge badge-green">KYC Verified</span>
                </div>

                <div className="field-grid" style={{ marginBottom: 14 }}>
                  <div className="field-box">
                    <div className="field-label">Technician Name</div>
                    <div className="field-value">{assignedWorker?.name || 'Arjun Sharma'}</div>
                    <div className="field-sub">
                      Rating: {assignedWorker?.rating || 4.92} Stars (428 jobs)
                    </div>
                  </div>
                  <div className="field-box">
                    <div className="field-label">Government License</div>
                    <div className="field-value">{assignedWorker?.licenseCode || 'CHL-2024-889'}</div>
                    <div className="field-sub">CIB&RC Registered Applicator</div>
                  </div>
                </div>

                <div className="field-box" style={{ marginBottom: 16 }}>
                  <div className="field-label">
                    {contactUnlocked ? <Unlock size={13} /> : <Lock size={13} />}
                    <span>Agency Communication Line</span>
                  </div>
                  <div className="field-value">
                    {contactUnlocked
                      ? assignedWorker?.phone || '+91 98765 43210 (Direct Unlocked)'
                      : assignedWorker?.proxyPhone || '+91 80 4912 3456 (Masked Agency Proxy)'}
                  </div>
                  <div className="field-sub">
                    {contactUnlocked
                      ? 'Agency approved - Direct communication active'
                      : 'Personal phone is protected through agency bridge'}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <a
                    href="tel:+919876543210"
                    className="btn btn-outline btn-sm"
                    onClick={() => toast('Connecting call to technician...', 'info')}
                  >
                    <Phone size={15} /> Call Technician
                  </a>
                  {canCancel() ? (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={async () => {
                        await cancelBooking();
                        toast('Booking cancelled with zero penalty.', 'info');
                      }}
                    >
                      <X size={15} /> Cancel Booking
                    </button>
                  ) : (
                    <span className="badge badge-neutral" style={{ marginLeft: 'auto' }}>
                      Cancellation locked once technician is en route
                    </span>
                  )}
                </div>
              </div>

              {/* 4. Review & Payment QR Trigger (Mandatory Review before Payment) */}
              {(booking.status === 'COMPLETED' || pinVerifiedByWorker || paymentQrGenerated) && (
                <div className="web-card" style={{ borderTop: '4px solid var(--primary)', background: 'var(--surface)' }}>
                  <div className="card-header-row">
                    <h3 className="card-title">
                      <Award size={22} color="var(--primary)" />
                      <span>{paymentQrGenerated ? 'Service Review Submitted' : 'Step 4: Rate Service to Unlock Payment QR'}</span>
                    </h3>
                    <span className={`badge ${paymentQrGenerated ? 'badge-green' : 'badge-amber'}`}>
                      {paymentQrGenerated ? 'Review Given &bull; Payment Unlocked' : 'Review Required Before Payment'}
                    </span>
                  </div>

                  {!customerReview ? (
                    <div>
                      <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', marginBottom: 14, lineHeight: 1.5 }}>
                        The technician verified your Completion PIN! <b>Submitting your rating & review is required to generate the official UPI payment invoice</b> for Rs. {rawTotal}.
                      </p>

                      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <button
                            key={n}
                            type="button"
                            className={`btn ${stars >= n ? 'btn-accent' : 'btn-outline'} btn-sm`}
                            onClick={() => setStars(n)}
                          >
                            <Star size={16} fill={stars >= n ? 'currentColor' : 'none'} /> {n} Star{n > 1 ? 's' : ''}
                          </button>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                        {['Punctual & Polite', 'Thorough 6-Step Safety', '100% Eco-Safe', 'Spotless Cleanup'].map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            className="badge badge-neutral"
                            style={{ cursor: 'pointer', border: '1px solid var(--border-strong)', padding: '5px 9px' }}
                            onClick={() => setComment((prev) => prev ? `${prev}, ${tag}` : tag)}
                          >
                            + {tag}
                          </button>
                        ))}
                      </div>

                      <input
                        type="text"
                        className="form-input"
                        style={{ marginBottom: 14 }}
                        placeholder="Feedback for technician & agency (e.g. prompt arrival, odorless formulation)..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />

                      <button
                        type="button"
                        className="btn btn-primary btn-block btn-lg"
                        onClick={async () => {
                          await submitCustomerReview(stars, comment || 'Excellent and thorough treatment!');
                          toast('Review submitted! Redirecting to UPI Payment QR...', 'success');
                          setQrModal(true);
                        }}
                      >
                        <QrCode size={18} /> Submit Review & Unlock Payment QR (Rs. {rawTotal})
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <CheckCircle2 size={18} color="var(--success)" />
                        <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                          Your {customerReview.rating}★ Review is Recorded
                        </span>
                      </div>
                      <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', fontStyle: 'italic', marginBottom: 14 }}>
                        "{customerReview.comment || 'Punctual, eco-safe, and very thorough treatment!'}"
                      </p>
                      <button
                        type="button"
                        className="btn btn-success btn-block"
                        onClick={() => setQrModal(true)}
                      >
                        <QrCode size={18} /> Open UPI Payment QR Code (Rs. {rawTotal})
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
{/* Interactive Payment QR & Warranty Modal */}
          <ModalDialog
            open={qrModal}
            onClose={() => setQrModal(false)}
            title={`Scan UPI QR & Complete Payment (Rs. ${rawTotal})`}
            icon={QrCode}
          >
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div
                style={{
                  width: 200,
                  height: 200,
                  margin: '0 auto 16px',
                  background: '#FFFFFF',
                  borderRadius: 16,
                  border: '2px solid var(--border-strong)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=pestfree@okaxis&pn=PestFree&am=${rawTotal}&cu=INR`}
                  alt="UPI Payment QR Code"
                  style={{ width: 170, height: 170 }}
                />
              </div>

              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: 4 }}>
                Rs. {rawTotal} Total Payable
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: 18 }}>
                Scan using Google Pay, PhonePe, Paytm, or BHIM UPI
              </div>

              <button
                type="button"
                className="btn btn-success btn-lg btn-block"
                onClick={async () => {
                  await confirmCustomerPayment();
                  setQrModal(false);
                  toast('Payment confirmed & 90-Day Warranty Certificate saved to History!', 'success');
                  onNavigate('history');
                }}
              >
                <CheckCircle2 size={18} /> Confirm Payment & Save Warranty Certificate
              </button>
            </div>
          </ModalDialog>
        </>
      )}
    </div>
  );
}
function HistorySection({ toast, onNavigate }) {
  const { history, rebookFromHistory } = useAppStore();
  const [certModalItem, setCertModalItem] = useState(null);

  return (
    <div>
      <div className="dashboard-grid-3" style={{ marginBottom: 24 }}>
        <div className="web-card">
          <div className="field-label">Total Treatments</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, marginTop: 6 }}>
            {history.length} Bookings
          </div>
          <div className="field-sub">100% CIB&RC Eco-Safe Formulations</div>
        </div>

        <div className="web-card">
          <div className="field-label">Active Warranty Cover</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--success)', marginTop: 6 }}>
            Protected
          </div>
          <div className="field-sub">Free emergency re-service included</div>
        </div>

        <div className="web-card">
          <div className="field-label">Homeowner Loyalty Tier</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginTop: 6 }}>
            Shield Member
          </div>
          <div className="field-sub">Priority dispatch in under 60 mins</div>
        </div>
      </div>

      <div className="web-card">
        <div className="card-header-row">
          <div>
            <h2 className="card-title">Past Bookings, Warranty Certificates & 1-Click Rebook</h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 2 }}>
              Inspect your chemical warranty certificates or pre-fill a repeat treatment in 1 click.
            </p>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('book')}>
            <Bug size={15} /> Book New Service
          </button>
        </div>

        <div className="web-table-wrap">
          <table className="web-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Treatment & Plan</th>
                <th>Service Address</th>
                <th>Technician</th>
                <th>Amount</th>
                <th>Status & Rating</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => {
                const amt =
                  typeof item.price === 'number'
                    ? item.price
                    : item.price?.total ?? item.pricing?.total ?? 1299;
                return (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                      #{item.id}
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{item.pestLabel}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                        {item.planLabel} • {item.sizeLabel}
                      </div>
                    </td>
                    <td style={{ maxWidth: 260 }}>
                      <div style={{ fontSize: '0.84rem' }}>{item.address}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{item.technicianName || 'Arjun Sharma'}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                        {item.licenseCode || 'CHL-2024-889'}
                      </div>
                    </td>
                    <td style={{ fontWeight: 800, color: 'var(--primary)' }}>Rs. {amt}</td>
                    <td>
                      <span
                        className={`badge ${
                          item.status === 'COMPLETED' ? 'badge-green' : 'badge-red'
                        }`}
                      >
                        {item.status}
                      </span>
                      {item.rating && (
                        <div style={{ fontSize: '0.78rem', color: '#8A5A00', fontWeight: 700, marginTop: 4 }}>
                          ★ {item.rating}/5 Rated
                        </div>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 8 }}>
                        {item.status === 'COMPLETED' && (
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => setCertModalItem(item)}
                          >
                            <Award size={14} /> Warranty Certificate
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            rebookFromHistory(item);
                            onNavigate('book');
                            toast(`Pre-filled booking form from #${item.id}!`, 'success');
                          }}
                        >
                          <RefreshCw size={14} /> Rebook
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Warranty Certificate Modal */}
      <ModalDialog
        open={Boolean(certModalItem)}
        onClose={() => setCertModalItem(null)}
        title={`CIB&RC Treatment & Warranty Certificate (#${certModalItem?.id})`}
        icon={Award}
      >
        {certModalItem && (
          <div style={{ display: 'grid', gap: 14 }}>
            <div
              className="web-card-surface"
              style={{
                border: '2px solid var(--primary)',
                background: 'var(--primary-light)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)' }}>
                    Official Warranty Coverage
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: 2 }}>
                    {certModalItem.warrantyDays || 90}-Day Free Re-Service Guarantee
                  </div>
                </div>
                <span className="badge badge-green">Active Cover</span>
              </div>
            </div>

            <div className="field-grid">
              <div className="field-box">
                <div className="field-label">Treatment Performed</div>
                <div className="field-value">{certModalItem.pestLabel}</div>
                <div className="field-sub">{certModalItem.planLabel}</div>
              </div>
              <div className="field-box">
                <div className="field-label">Certified Technician</div>
                <div className="field-value">{certModalItem.technicianName || 'Arjun Sharma'}</div>
                <div className="field-sub">Govt License: {certModalItem.licenseCode || 'CHL-2024-889'}</div>
              </div>
            </div>

            <div className="field-box">
              <div className="field-label">Approved Chemical Formulation Used</div>
              <div className="field-value">
                {certModalItem.chemicalUsed || 'Fipronil 0.05% Odorless Gel & Deltamethrin 2.5% EC'}
              </div>
            </div>

            <div className="field-box">
              <div className="field-label">Protected Property Address</div>
              <div className="field-value">{certModalItem.address}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  rebookFromHistory(certModalItem);
                  setCertModalItem(null);
                  onNavigate('book');
                  toast('Loaded warranty re-service into booking configurator!', 'success');
                }}
              >
                <RefreshCw size={16} /> Book Free Warranty Re-Visit
              </button>
            </div>
          </div>
        )}
      </ModalDialog>
    </div>
  );
}

function SafetyGuideSection() {
  const [selectedSheet, setSelectedSheet] = useState(BUNDLED_CHEMICAL_SHEETS[0]);

  return (
    <div>
      <div className="dashboard-grid-2">
        <div className="web-card">
          <div className="card-header-row">
            <div>
              <h2 className="card-title">
                <ShieldCheck size={20} color="var(--primary)" />
                <span>Homeowner Chemical Transparency & CIB&RC Guide</span>
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                Every chemical used in your home is Government of India CIB&RC registered. Inspect child, pet, and re-entry safety notes below.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
            {BUNDLED_CHEMICAL_SHEETS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`stage-pill-btn ${selectedSheet.id === s.id ? 'active' : ''}`}
                onClick={() => setSelectedSheet(s)}
              >
                {s.name}
              </button>
            ))}
          </div>

          {selectedSheet && (
            <div className="web-card-surface">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)' }}>
                    {selectedSheet.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                    CIB&RC Reg: <strong>{selectedSheet.cibrcReg}</strong>
                  </div>
                </div>
                <span className="badge badge-green">
                  Safe Re-Entry:{' '}
                  {selectedSheet.reEntryMinutes === 0
                    ? 'Immediate (0 mins)'
                    : `${selectedSheet.reEntryMinutes} mins`}
                </span>
              </div>

              <div className="field-grid" style={{ marginBottom: 12 }}>
                <div className="field-box" style={{ background: '#FFFFFF' }}>
                  <div className="field-label">Active Ingredient</div>
                  <div className="field-value" style={{ fontSize: '0.9rem' }}>
                    {selectedSheet.activeIngredient}
                  </div>
                </div>
                <div className="field-box" style={{ background: '#FFFFFF' }}>
                  <div className="field-label">Target Pests Controlled</div>
                  <div className="field-value" style={{ fontSize: '0.9rem' }}>
                    {selectedSheet.targetPests}
                  </div>
                </div>
              </div>

              <div className="field-box" style={{ background: '#FFFFFF' }}>
                <div className="field-label">Homeowner First-Aid & Precaution Note</div>
                <div style={{ fontSize: '0.86rem', lineHeight: 1.5, marginTop: 4 }}>
                  {selectedSheet.firstAidSkinEye}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="web-card">
          <h2 className="card-title" style={{ marginBottom: 14 }}>
            <CheckCircle2 size={20} color="var(--success)" />
            <span>6-Step Homeowner Preparation & Post-Care Checklist</span>
          </h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {SAFETY_CHECKLIST_STEPS.map((step, i) => (
              <div key={i} className="field-box">
                <div style={{ fontWeight: 800, color: 'var(--primary-dark)' }}>
                  Step {i + 1}: {step.title}
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 3 }}>
                  {step.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('book');
  const [helpOpen, setHelpOpen] = useState(false);
  const { booking, history, syncFromRemote } = useAppStore();
  const { toasts, show: toast } = useToast();

  useEffect(() => {
    syncFromRemote();
    const id = setInterval(() => syncFromRemote(), 3000);
    return () => clearInterval(id);
  }, [syncFromRemote]);

  const navItems = [
    {
      id: 'book',
      label: 'Book Treatment',
      icon: Bug,
      badge: 'AI Quote',
    },
    {
      id: 'track',
      label: 'Live Tracking & OTP',
      icon: Navigation,
      badge: booking && booking.status !== 'CANCELLED' ? booking.status.replace(/_/g, ' ') : 'Idle',
    },
    {
      id: 'history',
      label: 'History & Warranty',
      icon: History,
      badge: `${history.length} Past`,
    },
    {
      id: 'safety',
      label: 'Chemical Safety & Care',
      icon: ShieldCheck,
      badge: 'CIB&RC',
    },
  ];

  const headers = {
    book: {
      title: 'Book Certified Home & Office Pest Control',
      subtitle: 'Instant AI smart quote, transparent GST breakdown, and Agency homeowner privacy protection',
    },
    track: {
      title: 'Real OpenStreetMap GPS Radar, Doorstep OTP & Completion PIN',
      subtitle: 'Follow your KYC-verified technician on real interactive maps, verify OTP, and pay via UPI QR after review',
    },
    history: {
      title: 'Service History, Warranty Certificates & 1-Click Rebooking',
      subtitle: 'Download CIB&RC chemical certificates and schedule free warranty re-visits',
    },
    safety: {
      title: 'Homeowner Chemical Safety & Preparation Guide',
      subtitle: 'Inspect government-approved formulations, safe re-entry times, and pet/child precautions',
    },
  };

  return (
    <div className="web-layout">
      <ToastStack toasts={toasts} />

      <ModalDialog
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        title="24x7 Customer Support & Safety Helpline"
        icon={HelpCircle}
      >
        <p style={{ color: 'var(--ink-muted)', marginBottom: 16, lineHeight: 1.5 }}>
          Need assistance with an active booking, technician arrival, or warranty claim? Our Bengaluru dispatch desk is available 24x7.
        </p>
        <div style={{ display: 'grid', gap: 12 }}>
          <a
            href="tel:18001239999"
            className="btn btn-primary btn-lg btn-block"
            onClick={() => toast('Calling Pest Free 24x7 Concierge Desk...', 'info')}
          >
            <Phone size={18} /> Call Customer Care (1800-123-9999)
          </a>
          <a
            href="tel:1800112233"
            className="btn btn-outline btn-lg btn-block"
            onClick={() => toast('Calling CIB&RC Chemical Safety Desk...', 'info')}
          >
            <ShieldCheck size={18} /> CIB&RC Chemical Safety Helpline (1800-11-2233)
          </a>
        </div>
      </ModalDialog>

      {/* Left Sidebar Navigation */}
      <aside className="web-sidebar" aria-label="Customer Website Navigation">
        <div className="sidebar-brand">
          <div className="brand-logo-box">
            <ShieldCheck size={24} />
          </div>
          <div>
            <div className="brand-title">Pest Free</div>
            <div className="brand-subtitle">Customer Web Portal</div>
          </div>
        </div>

        <div className="sidebar-customer-card">
          <div className="customer-avatar-row">
            <div className="customer-avatar">AK</div>
            <div>
              <div className="customer-name">Aarav Sharma</div>
              <div className="customer-meta">Jayanagar 4th Block, BLR</div>
            </div>
          </div>
          <div className="customer-badges">
            <span className="sidebar-badge">
              <Lock size={11} /> Agency Verified
            </span>
            <span className="sidebar-badge">
              <Award size={11} /> 90d Warranty
            </span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Customer Portal</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
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
            type="button"
            className="btn btn-accent btn-block"
            onClick={() => setHelpOpen(true)}
          >
            <Phone size={16} /> 24x7 Customer Helpline
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="web-main">
        <header className="web-topbar">
          <div>
            <h1 className="topbar-title">{headers[activeSection].title}</h1>
            <div className="topbar-subtitle">{headers[activeSection].subtitle}</div>
          </div>

          <div className="topbar-right">
            {booking && booking.status !== 'CANCELLED' ? (
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setActiveSection('track')}
              >
                <Navigation size={14} /> Active Booking #{booking.id} • {booking.status.replace(/_/g, ' ')}
              </button>
            ) : (
              <span className="badge badge-green">
                <ShieldCheck size={14} /> 100% CIB&RC Certified Technicians
              </span>
            )}
          </div>
        </header>

        <main className="web-page">
          {activeSection === 'book' && (
            <BookSection toast={toast} onNavigate={setActiveSection} />
          )}
          {activeSection === 'track' && (
            <TrackSection toast={toast} onNavigate={setActiveSection} />
          )}
          {activeSection === 'history' && (
            <HistorySection toast={toast} onNavigate={setActiveSection} />
          )}
          {activeSection === 'safety' && <SafetyGuideSection />}
        </main>
      </div>
    </div>
  );
}

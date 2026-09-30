import React, { useState, useEffect } from 'react';
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
  { key: 'ARRIVED', label: 'Arrived (OTP)' },
  { key: 'IN_PROGRESS', label: 'In Progress' },
  { key: 'COMPLETED', label: 'Completed' },
];

function LifecycleStepper({ currentStatus }) {
  const currentIdx = LIFECYCLE_STAGES.findIndex((s) => s.key === currentStatus);
  return (
    <div className="lifecycle-stepper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Live Service Progression
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
              <div className="stepper-index">{isDone ? 'Done' : `Step 0${idx + 1}`}</div>
              <div className="stepper-name">{st.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
const DAY_OPTS = [
  { id: 'today', label: 'Today (Priority)' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'weekend', label: 'This Weekend' },
];

const SAVED_ADDRESSES = [
  {
    label: 'Home - Jayanagar',
    text: 'Flat 402, Palm Grove Residency, 11th Main Rd, Jayanagar 4th Block, Bengaluru 560011',
  },
  {
    label: 'Parents - Indiranagar',
    text: 'House 18, 100ft Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
  },
  {
    label: 'Office - HSR Layout',
    text: '2nd Floor, Lotus Tech Park, 27th Main, HSR Layout Sector 2, Bengaluru 560102',
  },
];

function BookSection({ toast, onNavigate }) {
  const { placeBooking, isLoading, booking, rebookDraft, clearRebookDraft } = useAppStore();

  const [form, setForm] = useState({
    pestType: 'cockroaches',
    propertySize: '2bhk',
    plan: 'barrier',
    day: 'today',
    slot: TIME_SLOTS[0],
    address: SAVED_ADDRESSES[0].text,
    note: 'Sightings near kitchen cabinets and utility drain.',
    dispatchMode: 'treat_on_arrival',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (rebookDraft) {
      setForm(rebookDraft);
      clearRebookDraft();
    }
  }, [rebookDraft, clearRebookDraft]);

  const aiRecommendation = generateSmartQuoteRecommendation({
    pestType: form.pestType,
    propertySize: form.propertySize,
    note: form.note || '',
  });

  const selectedPest = PEST_TYPES.find((p) => p.id === form.pestType) ?? PEST_TYPES[0];
  const selectedSize = PROPERTY_SIZES.find((s) => s.id === form.propertySize) ?? PROPERTY_SIZES[0];
  const selectedPlan = PLANS.find((p) => p.id === form.plan) ?? PLANS[0];
  const price = calculatePrice(form.pestType, form.propertySize, form.plan, form.dispatchMode);

  const handleSubmit = async () => {
    const newErr = {};
    if (!form.address || form.address.trim().length < 10) {
      newErr.address = 'Please enter a complete flat/house number, street, and locality (at least 10 characters).';
    }
    setErrors(newErr);
    if (Object.keys(newErr).length > 0) {
      toast('Please complete your service address before booking.', 'error');
      return;
    }

    await placeBooking(form);
    toast('Booking confirmed! Redirecting to Live Tracking & OTP Radar...', 'success');
    onNavigate('track');
  };

  return (
    <div>
      {booking && booking.status !== 'CANCELLED' && (
        <div
          className="demo-toolbar"
          style={{ background: 'var(--primary-light)', borderColor: 'var(--primary)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sparkles size={18} color="var(--primary)" />
            <span style={{ fontWeight: 700 }}>
              Active Booking #{booking.id} ({booking.pestLabel}) is currently in{' '}
              <u>{booking.status.replace(/_/g, ' ')}</u> state.
            </span>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('track')}>
            Open Live Tracking & OTP <ChevronRight size={15} />
          </button>
        </div>
      )}

      <div className="booking-layout">
        {/* LEFT COLUMN: 4-Step Interactive Configurator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {/* STEP 1: Pest Selection */}
          <div className="web-card">
            <div className="card-header-row">
              <h2 className="card-title">
                <Bug size={20} color="var(--primary)" />
                <span>1. Select Target Pest Problem</span>
              </h2>
              <span className="badge badge-green">CIB&RC Approved Formulations</span>
            </div>

            <div className="select-grid-3">
              {PEST_TYPES.map((p) => {
                const isSel = form.pestType === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    className={`select-card ${isSel ? 'selected' : ''}`}
                    onClick={() => setForm((f) => ({ ...f, pestType: p.id }))}
                  >
                    <div>
                      <div className="select-card-title">{p.name}</div>
                      <div className="select-card-desc" style={{ marginTop: 4 }}>
                        {p.tagline}
                      </div>
                    </div>
                    <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                      <div className="select-card-price">Rs. {p.basePrice} base</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                        {p.chemicalUsed}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Property Size & AI Smart Plan */}
          <div className="web-card">
            <div className="card-header-row">
              <h2 className="card-title">
                <Building2 size={20} color="var(--primary)" />
                <span>2. Property Size & Treatment Plan</span>
              </h2>
            </div>

            <div className="form-label" style={{ marginBottom: 8 }}>
              Choose Property Configuration
            </div>
            <div className="select-grid-5" style={{ marginBottom: 22 }}>
              {PROPERTY_SIZES.map((s) => {
                const isSel = form.propertySize === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`select-card ${isSel ? 'selected' : ''}`}
                    onClick={() => setForm((f) => ({ ...f, propertySize: s.id }))}
                  >
                    <div className="select-card-title">{s.label}</div>
                    <div className="select-card-desc">{s.areaHint}</div>
                    <div className="select-card-price">x{s.multiplier}</div>
                  </button>
                );
              })}
            </div>

            {/* AI Smart Quote Banner */}
            <div
              className="web-card-surface"
              style={{
                background: 'var(--primary-light)',
                borderColor: 'rgba(31, 91, 58, 0.3)',
                marginBottom: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.76rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>
                  <Sparkles size={15} /> AI Smart Quote Recommendation
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.96rem', marginTop: 4 }}>
                  Recommended Tier:{' '}
                  <span style={{ color: 'var(--primary-dark)', textDecoration: 'underline' }}>
                    {PLANS.find((pl) => pl.id === aiRecommendation.recommendedPlan)?.name}
                  </span>
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                  {aiRecommendation.reason}
                </div>
              </div>
              {form.plan !== aiRecommendation.recommendedPlan ? (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setForm((f) => ({ ...f, plan: aiRecommendation.recommendedPlan }));
                    toast('Applied AI recommended treatment plan!', 'success');
                  }}
                >
                  Apply Recommended Plan
                </button>
              ) : (
                <span className="badge badge-green">
                  <CheckCircle2 size={14} /> Active Selection
                </span>
              )}
            </div>

            <div className="form-label" style={{ marginBottom: 8 }}>
              Select Protection Plan
            </div>
            <div className="select-grid-3">
              {PLANS.map((pl) => {
                const isSel = form.plan === pl.id;
                return (
                  <button
                    key={pl.id}
                    type="button"
                    className={`select-card ${isSel ? 'selected' : ''}`}
                    onClick={() => setForm((f) => ({ ...f, plan: pl.id }))}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
                        <span className="select-card-title">{pl.name}</span>
                        {pl.badge && <span className="badge badge-amber">{pl.badge}</span>}
                      </div>
                      <div className="select-card-desc" style={{ marginTop: 6 }}>
                        {pl.description}
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                      <span className="badge badge-neutral">{pl.warrantyDays}-Day Warranty</span>
                      <span className="select-card-price">x{pl.multiplier}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Schedule & Dispatch Mode */}
          <div className="web-card">
            <div className="card-header-row">
              <h2 className="card-title">
                <Calendar size={20} color="var(--primary)" />
                <span>3. Schedule & Dispatch Mode</span>
              </h2>
            </div>

            <div className="field-grid" style={{ marginBottom: 18 }}>
              <div>
                <label className="form-label">Preferred Day</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {DAY_OPTS.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      className={`stage-pill-btn ${form.day === d.id ? 'active' : ''}`}
                      style={{ padding: '10px 14px', fontSize: '0.86rem' }}
                      onClick={() => setForm((f) => ({ ...f, day: d.id }))}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label">2-Hour Arrival Window</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {TIME_SLOTS.map((sl) => (
                    <button
                      key={sl}
                      type="button"
                      className={`stage-pill-btn ${form.slot === sl ? 'active' : ''}`}
                      style={{ padding: '10px 14px', fontSize: '0.84rem' }}
                      onClick={() => setForm((f) => ({ ...f, slot: sl }))}
                    >
                      {sl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-label">Dispatch Mode</div>
            <div className="field-grid">
              <button
                type="button"
                className={`select-card ${form.dispatchMode === 'treat_on_arrival' ? 'selected' : ''}`}
                onClick={() => setForm((f) => ({ ...f, dispatchMode: 'treat_on_arrival' }))}
              >
                <div className="select-card-title">Treat on Arrival (Instant Dispatch)</div>
                <div className="select-card-desc">
                  Technician arrives fully equipped with calibrated chemical batch and begins treatment immediately after OTP verification.
                </div>
              </button>

              <button
                type="button"
                className={`select-card ${form.dispatchMode === 'inspection' ? 'selected' : ''}`}
                onClick={() => setForm((f) => ({ ...f, dispatchMode: 'inspection' }))}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="select-card-title">Inspection First</span>
                  <span className="badge badge-green">Rs. 0 Advance Now</span>
                </div>
                <div className="select-card-desc">
                  Pay Rs. 0 now. Technician inspects moisture pockets and colony severity first; pay full quote only after approving on-site.
                </div>
              </button>
            </div>
          </div>

          {/* STEP 4: Service Address & Notes */}
          <div className="web-card">
            <div className="card-header-row">
              <h2 className="card-title">
                <MapPin size={20} color="var(--primary)" />
                <span>4. Service Address & Infestation Notes</span>
              </h2>
            </div>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)' }}>
                Quick Fill Saved Address:
              </span>
              {SAVED_ADDRESSES.map((addr, i) => (
                <button
                  key={i}
                  type="button"
                  className="stage-pill-btn"
                  onClick={() => {
                    setForm((f) => ({ ...f, address: addr.text }));
                    setErrors({});
                    toast(`Filled ${addr.label} address`, 'info');
                  }}
                >
                  <Home size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                  {addr.label}
                </button>
              ))}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="address-input">
                Complete Flat / House No., Building, Street & Locality
              </label>
              <input
                id="address-input"
                type="text"
                className="form-input"
                value={form.address}
                onChange={(e) => {
                  setForm((f) => ({ ...f, address: e.target.value }));
                  setErrors({});
                }}
                placeholder="e.g. Flat 402, Palm Grove Residency, 11th Main Rd, Jayanagar 4th Block"
              />
              {errors.address && <div className="form-error">{errors.address}</div>}
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="note-input">
                Infestation Notes for Technician (Triggers AI Plan Suggestion)
              </label>
              <textarea
                id="note-input"
                rows={2}
                className="form-textarea"
                value={form.note}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                placeholder="Describe where you noticed activity (e.g. heavy termites in wooden wardrobe, kitchen sink, pets at home)..."
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Live Quote & Privacy Guarantee Card */}
        <div className="web-card sticky-summary" style={{ borderTop: '4px solid var(--primary)' }}>
          <div className="card-header-row">
            <h3 className="card-title">Live Treatment Quote</h3>
            <span className="badge badge-green">{selectedPlan.warrantyDays}-Day Warranty</span>
          </div>

          <div className="web-card-surface" style={{ marginBottom: 18 }}>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary-dark)' }}>
              {selectedPest.name}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginTop: 2 }}>
              Chemical: {selectedPest.chemicalUsed}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              <span className="badge badge-neutral">{selectedSize.label}</span>
              <span className="badge badge-neutral">{selectedPlan.name}</span>
              <span className="badge badge-amber">{form.slot}</span>
            </div>
          </div>

          {/* Transparent Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.92rem', marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--ink-muted)' }}>Base Treatment Price</span>
              <span style={{ fontWeight: 700 }}>Rs. {price.basePrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--ink-muted)' }}>
                Property Size ({selectedSize.label} x{price.sizeMultiplier})
              </span>
              <span style={{ fontWeight: 700 }}>
                Rs. {Math.round(price.basePrice * price.sizeMultiplier)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--ink-muted)' }}>
                Plan Tier ({selectedPlan.name} x{price.planMultiplier})
              </span>
              <span style={{ fontWeight: 700 }}>Rs. {price.subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--ink-muted)' }}>GST (18% Govt Tax)</span>
              <span style={{ fontWeight: 700 }}>Rs. {price.gst}</span>
            </div>

            <div
              style={{
                borderTop: '2px solid var(--border)',
                paddingTop: 12,
                marginTop: 4,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <span style={{ fontWeight: 800, fontSize: '1rem' }}>Total Estimate</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
                Rs. {price.total}
              </span>
            </div>

            <div
              style={{
                background: form.dispatchMode === 'inspection' ? 'var(--success-light)' : 'var(--accent-light)',
                padding: '10px 14px',
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: 800,
              }}
            >
              <span>Payable Now ({form.dispatchMode === 'inspection' ? 'Inspection Mode' : 'Full Booking'})</span>
              <span style={{ fontSize: '1.2rem', color: 'var(--primary-dark)' }}>
                Rs. {price.payableNow}
              </span>
            </div>
          </div>

          <div
            className="field-box"
            style={{ marginBottom: 18, fontSize: '0.8rem', color: 'var(--ink-muted)', lineHeight: 1.45 }}
          >
            <strong style={{ color: 'var(--ink)', display: 'block', marginBottom: 3 }}>
              <Lock size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              Dual-Approval Homeowner Privacy Guarantee:
            </strong>
            Your phone number and flat number remain masked until an agency owner approves the booking AND unlocks contact for a KYC-verified technician.
          </div>

          <button
            type="button"
            className="btn btn-primary btn-lg btn-block"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            <CheckCircle2 size={18} />
            {isLoading
              ? 'Dispatching Booking...'
              : form.dispatchMode === 'inspection'
              ? 'Confirm Free Inspection Booking (Rs. 0 Now)'
              : `Confirm & Dispatch Technician (Rs. ${price.payableNow})`}
          </button>
        </div>
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
    etaSeconds,
    safetyChecklist,
    simulateCustomerStage,
    cancelBooking,
    rateBooking,
    canCancel,
  } = useAppStore();

  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState('');

  const dotProgress = workerPosition
    ? {
        x: Math.min(82, Math.max(12, 18 + (77.598 - workerPosition.lng) * 9000)),
        y: Math.min(78, Math.max(18, 22 + (12.975 - workerPosition.lat) * 9000)),
      }
    : { x: 25, y: 35 };

  return (
    <div>
      {/* Interactive Stage Switcher so user can preview every customer tracking state */}
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
            Place a new booking in the configurator or click any stage in the simulator bar above to preview the live technician radar and 4-digit OTP handshake.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => onNavigate('book')}>
              <Bug size={18} /> Book a New Pest Treatment
            </button>
            <button
              className="btn btn-outline btn-lg"
              onClick={() => {
                simulateCustomerStage('ON_THE_WAY');
                toast('Loaded live technician radar simulation!', 'success');
              }}
            >
              <Sparkles size={18} /> Preview Live Technician Radar
            </button>
          </div>
        </div>
      )}

      {booking && booking.status !== 'CANCELLED' && (
        <>
          <LifecycleStepper currentStatus={booking.status} />

          <div className="dashboard-grid-2">
            {/* LEFT COLUMN: Live GPS Radar Map + Booking & Safety Progress */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="web-card">
                <div className="card-header-row">
                  <div>
                    <span className="badge badge-neutral" style={{ marginBottom: 4 }}>
                      Booking #{booking.id}
                    </span>
                    <h2 className="card-title" style={{ fontSize: '1.3rem' }}>
                      Live Technician GPS Radar
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
                </div>

                {/* Interactive SVG Radar Map */}
                <div className="gps-map-canvas">
                  <div className="gps-map-grid" />
                  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                    <path
                      d="M 70 65 Q 240 130 460 195"
                      stroke="var(--primary)"
                      strokeWidth="3"
                      strokeDasharray="8 6"
                      fill="none"
                    />
                  </svg>

                  {/* Agency Dispatch Hub Pin */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '48px',
                      top: '44px',
                      background: '#FFFFFF',
                      border: '2px solid var(--primary)',
                      padding: '4px 10px',
                      borderRadius: 99,
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    Agency Dispatch Base
                  </div>

                  {/* Animated Technician Marker */}
                  {['TECHNICIAN_ACCEPTED', 'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'COMPLETED'].includes(
                    booking.status
                  ) && (
                    <motion.div
                      animate={{
                        left:
                          booking.status === 'ARRIVED' ||
                          booking.status === 'IN_PROGRESS' ||
                          booking.status === 'COMPLETED'
                            ? '74%'
                            : `${dotProgress.x}%`,
                        top:
                          booking.status === 'ARRIVED' ||
                          booking.status === 'IN_PROGRESS' ||
                          booking.status === 'COMPLETED'
                            ? '68%'
                            : `${dotProgress.y}%`,
                      }}
                      transition={{ type: 'spring', stiffness: 60, damping: 18 }}
                      style={{
                        position: 'absolute',
                        background: 'var(--primary)',
                        color: '#FFFFFF',
                        padding: '6px 12px',
                        borderRadius: 99,
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        boxShadow: '0 6px 16px rgba(31,91,58,0.35)',
                      }}
                    >
                      <Navigation size={13} />
                      {assignedWorker?.name || 'Arjun Sharma'}
                    </motion.div>
                  )}

                  {/* Customer Home Pin */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '42px',
                      bottom: '34px',
                      background: 'var(--accent)',
                      color: 'var(--ink)',
                      padding: '6px 14px',
                      borderRadius: 99,
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <Home size={14} /> Your Home
                  </div>
                </div>

                <div className="field-grid">
                  <div className="field-box">
                    <div className="field-label">Treatment & Plan</div>
                    <div className="field-value">{booking.pestLabel}</div>
                    <div className="field-sub">
                      {booking.planLabel} ({booking.sizeLabel})
                    </div>
                  </div>
                  <div className="field-box">
                    <div className="field-label">Scheduled Arrival Slot</div>
                    <div className="field-value">{booking.slot}</div>
                    <div className="field-sub">{booking.address}</div>
                  </div>
                </div>
              </div>

              {/* Live 6-Step Safety Protocol Feed (Visible during IN_PROGRESS & COMPLETED) */}
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

            {/* RIGHT COLUMN: Start OTP Handshake Card, Technician Profile & Cancellation/Rating */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* 4-Digit Start OTP Card */}
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
                    <span>Your 4-Digit Treatment Start OTP</span>
                  </h3>
                  <span className="badge badge-amber">Required at Doorstep</span>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', lineHeight: 1.45, marginBottom: 14 }}>
                  Share this 4-digit security code with your technician only after they arrive at your doorstep and show their KYC & PPE kit.
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

              {/* Assigned Technician & Dual-Approval Contact Card */}
              <div className="web-card">
                <div className="card-header-row">
                  <h3 className="card-title">
                    <UserCheck size={20} color="var(--primary)" />
                    <span>Assigned CIB&RC Technician</span>
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
                    <div className="field-sub">Background & Police Verified</div>
                  </div>
                </div>

                <div className="field-box" style={{ marginBottom: 16 }}>
                  <div className="field-label">
                    {contactUnlocked ? <Unlock size={13} /> : <Lock size={13} />}
                    <span>Technician Phone Line</span>
                  </div>
                  <div className="field-value">
                    {contactUnlocked
                      ? assignedWorker?.phone || '+91 98765 43210 (Direct Unlocked)'
                      : assignedWorker?.proxyPhone || '+91 80 4912 3456 (Masked Proxy Bridge)'}
                  </div>
                  <div className="field-sub">
                    {contactUnlocked
                      ? '2nd Approval granted - Direct contact active'
                      : 'Your personal phone number is hidden from the technician'}
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

              {/* Rating Card when COMPLETED */}
              {booking.status === 'COMPLETED' && (
                <div className="web-card" style={{ borderTop: '4px solid var(--success)' }}>
                  <h3 className="card-title" style={{ marginBottom: 8 }}>
                    <Award size={22} color="var(--success)" />
                    <span>Rate Your Treatment & Claim Warranty Certificate</span>
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', marginBottom: 14 }}>
                    How was your experience with {assignedWorker?.name || 'Arjun Sharma'}? Submitting your review stores your 90-day warranty certificate in History.
                  </p>

                  <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={`btn ${stars >= n ? 'btn-accent' : 'btn-outline'} btn-sm`}
                        onClick={() => setStars(n)}
                      >
                        <Star size={16} fill={stars >= n ? 'currentColor' : 'none'} /> {n}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    className="form-input"
                    style={{ marginBottom: 12 }}
                    placeholder="Optional feedback (e.g. arrived on time, odorless gel)..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <button
                    type="button"
                    className="btn btn-success btn-block"
                    onClick={async () => {
                      await rateBooking(stars, comment);
                      toast('Thank you! Warranty certificate saved to Service History.', 'success');
                      onNavigate('history');
                    }}
                  >
                    <CheckCircle2 size={18} /> Submit Rating & View Warranty Certificate
                  </button>
                </div>
              )}
            </div>
          </div>
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
      subtitle: 'Instant AI smart quote, transparent GST breakdown, and Dual-Approval homeowner privacy protection',
    },
    track: {
      title: 'Live Technician GPS Radar & 4-Digit Start OTP',
      subtitle: 'Follow your KYC-verified technician in real time and verify their 6-step safety compliance',
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
              <Lock size={11} /> Privacy Protected
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

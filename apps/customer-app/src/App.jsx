import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from './lib/api/store.js';
import {
  PEST_TYPES, PROPERTY_SIZES, PLANS, TIME_SLOTS,
  calculatePrice, generateSmartQuoteRecommendation,
} from './lib/api/index.ts';
import './index.css';

// â”€â”€â”€ Icons (inline SVG to keep deps minimal) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const Icon = ({ d, size = 22, stroke = 'currentColor', fill = 'none', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d={d} />
  </svg>
);

const icons = {
  book:    'M12 2a10 10 0 1 1 0 20A10 10 0 0 1 12 2zm0 6v4l3 3',
  map:     'M3 6l9-4 9 4v14l-9 4-9-4V6zm9-4v18M3 6l9 4 9-4',
  history: 'M12 8v4l3 2M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0',
  check:   'M20 6L9 17l-5-5',
  x:       'M18 6L6 18M6 6l12 12',
  star:    'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  phone:   'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4 2 2 0 0 1 3.06 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91A16 16 0 0 0 13 15.86l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16.92z',
  bug:     'M8 2v4M16 2v4M9 11h6M9 15h4M12 21c-4.418 0-8-3.582-8-8V8h16v5c0 4.418-3.582 8-8 8z',
  nav:     'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  ai:      'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
};

// â”€â”€â”€ Toast â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((msg, type = 'default') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);
  return { toasts, show };
}

function ToastLayer({ toasts }) {
  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id} className={`toast ${t.type}`}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// â”€â”€â”€ Book Tab â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const DAY_OPTS = [
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'weekend', label: 'Weekend' },
];

function BookTab({ toast }) {
  const { placeBooking, isLoading, booking } = useAppStore();
  const [step, setStep] = useState(0); // 0=pest 1=plan 2=size 3=slot 4=address 5=confirm
  const [form, setForm] = useState({
    pestType: '', propertySize: '', plan: '', day: 'today',
    slot: '09:00 - 11:00 AM', address: '', note: '', dispatchMode: 'treat_on_arrival',
  });
  const [errors, setErrors] = useState({});
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (form.pestType && form.propertySize && form.note !== undefined && step >= 2) {
      setAiLoading(true);
      const t = setTimeout(() => {
        const rec = generateSmartQuoteRecommendation({ pestType: form.pestType, propertySize: form.propertySize, note: form.note ?? "" });
        setAiSuggestion(rec);
        setAiLoading(false);
      }, 900);
      return () => clearTimeout(t);
    }
  }, [form.pestType, form.propertySize, form.note, step]);

  const price = form.pestType && form.propertySize && form.plan
    ? calculatePrice(form.pestType, form.propertySize, form.plan, form.dispatchMode)
    : null;

  function validate() {
    const e = {};
    if (!form.pestType) e.pestType = 'Select a pest type';
    if (!form.propertySize) e.propertySize = 'Select property size';
    if (!form.plan) e.plan = 'Select a plan';
    if (!form.address || form.address.trim().length < 10) e.address = 'Full address required (min 10 chars)';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleBook() {
    if (!validate()) { toast('Please fix the errors', 'danger'); return; }
    await placeBooking(form);
    toast('Booking placed! Waiting for approvalâ€¦', 'success');
  }

  if (booking) {
    return (
      <div className="content-area" style={{ textAlign: 'center', paddingTop: 40 }}>
        <div style={{ fontSize: '3rem' }}>ðŸ“‹</div>
        <h2 style={{ marginTop: 12 }}>Booking active</h2>
        <p className="text-muted mt-8">Switch to the Track tab to follow your technician.</p>
        <div className="card mt-12" style={{ textAlign: 'left' }}>
          <div className="flex-between">
            <span className="text-muted" style={{ fontSize: '.82rem' }}>Booking ID</span>
            <strong>{booking.id}</strong>
          </div>
          <div className="flex-between mt-8">
            <span className="text-muted" style={{ fontSize: '.82rem' }}>Status</span>
            <StatusBadge status={booking.status} />
          </div>
        </div>
      </div>
    );
  }

  const stepTitles = ['Pest type', 'Size & plan', 'Schedule', 'Address', 'Confirm'];

  return (
    <div className="content-area">
      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, justifyContent: 'center' }}>
        {stepTitles.map((s, i) => (
          <div key={i} style={{
            width: i === step ? 24 : 8, height: 8, borderRadius: 4,
            background: i <= step ? 'var(--primary)' : 'var(--border)',
            transition: 'all .2s'
          }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2>What's bugging you?</h2>
            <p className="text-muted" style={{ fontSize: '.88rem', margin: '6px 0 14px' }}>Choose the pest you're dealing with</p>
            <div className="chip-grid">
              {PEST_TYPES.map(p => (
                <button key={p.id} className={`chip ${form.pestType === p.id ? 'selected' : ''}`}
                  onClick={() => { setForm(f => ({ ...f, pestType: p.id })); setErrors(e => ({ ...e, pestType: '' })); }}>
                  <span className="chip-title">{p.name}</span>
                  <span className="chip-sub">â‚¹{p.basePrice} base</span>
                  <span className="chip-sub" style={{ fontSize: '.7rem' }}>{p.tagline}</span>
                </button>
              ))}
            </div>
            {errors.pestType && <p className="form-error">{errors.pestType}</p>}
            <button className="btn btn-primary mt-12" disabled={!form.pestType} onClick={() => setStep(1)}>
              Continue â†’
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2>Property size</h2>
            <p className="text-muted" style={{ fontSize: '.88rem', margin: '6px 0 14px' }}>Select the size of your property</p>
            <div className="chip-grid chip-grid-3">
              {PROPERTY_SIZES.map(s => (
                <button key={s.id} className={`chip ${form.propertySize === s.id ? 'selected' : ''}`}
                  onClick={() => { setForm(f => ({ ...f, propertySize: s.id })); setErrors(e => ({ ...e, propertySize: '' })); }}>
                  <span className="chip-title">{s.label}</span>
                  <span className="chip-sub">{s.areaHint}</span>
                </button>
              ))}
            </div>
            {errors.propertySize && <p className="form-error">{errors.propertySize}</p>}

            <p className="section-label" style={{ marginTop: 20 }}>Treatment plan</p>

            {/* AI suggestion */}
            {form.propertySize && (
              <div style={{ background: 'rgba(31,91,58,.06)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 14px', marginBottom: 12 }}>
                {aiLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                    <span style={{ fontSize: '.82rem', color: 'var(--ink-muted)' }}>AI analysing your situationâ€¦</span>
                  </div>
                ) : aiSuggestion ? (
                  <div>
                    <div style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4 }}>
                      ðŸ¤– Smart suggestion
                    </div>
                    <div style={{ fontSize: '.88rem', fontWeight: 600 }}>{aiSuggestion.recommendedPlan}</div>
                    <div style={{ fontSize: '.8rem', color: 'var(--ink-muted)' }}>{aiSuggestion.reason}</div>
                  </div>
                ) : null}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PLANS.map(p => (
                <button key={p.id} className={`chip ${form.plan === p.id ? 'selected' : ''}`}
                  style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                  onClick={() => { setForm(f => ({ ...f, plan: p.id })); setErrors(e => ({ ...e, plan: '' })); }}>
                  <div>
                    <span className="chip-title">{p.name}</span>
                    {p.badge && <span className="badge badge-success" style={{ marginLeft: 6, fontSize: '.7rem' }}>{p.badge}</span>}
                    <div className="chip-sub">{p.description}</div>
                    <div className="chip-sub">{p.warrantyDays}-day warranty</div>
                  </div>
                  <span className="price" style={{ fontSize: '1rem' }}>Ã—{p.multiplier}</span>
                </button>
              ))}
            </div>
            {errors.plan && <p className="form-error">{errors.plan}</p>}

            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setStep(0)}>â† Back</button>
              <button className="btn btn-primary" style={{ flex: 2 }} disabled={!form.propertySize || !form.plan} onClick={() => setStep(2)}>Continue â†’</button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2>Pick a day & slot</h2>
            <p className="text-muted" style={{ fontSize: '.88rem', margin: '6px 0 14px' }}>When should the technician visit?</p>

            <p className="section-label">Day</p>
            <div className="chip-grid chip-grid-3">
              {DAY_OPTS.map(d => (
                <button key={d.id} className={`chip ${form.day === d.id ? 'selected' : ''}`}
                  style={{ textAlign: 'center', alignItems: 'center' }}
                  onClick={() => setForm(f => ({ ...f, day: d.id }))}>
                  <span className="chip-title">{d.label}</span>
                </button>
              ))}
            </div>

            <p className="section-label" style={{ marginTop: 16 }}>Time slot</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {TIME_SLOTS.map(s => (
                <button key={s} className={`chip ${form.slot === s ? 'selected' : ''}`}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onClick={() => setForm(f => ({ ...f, slot: s }))}>
                  ðŸ• {s}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setStep(1)}>â† Back</button>
              <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => setStep(3)}>Continue â†’</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2>Service address</h2>
            <p className="text-muted" style={{ fontSize: '.88rem', margin: '6px 0 14px' }}>Where should the technician come?</p>

            <div className="form-group">
              <label className="form-label">Full address *</label>
              <textarea className={`form-textarea ${errors.address ? 'error' : ''}`}
                placeholder="e.g. Flat 204, Prestige Oak Park, Banashankari 3rd Stage, Bengaluru â€“ 560085"
                value={form.address}
                onChange={e => { setForm(f => ({ ...f, address: e.target.value })); setErrors(er => ({ ...er, address: '' })); }}
                style={{ minHeight: 100 }} />
              {errors.address && <p className="form-error">{errors.address}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Note (optional)</label>
              <textarea className="form-textarea"
                placeholder="e.g. Use the rear entrance, dog on premises"
                value={form.note}
                onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                style={{ minHeight: 70 }} />
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setStep(2)}>â† Back</button>
              <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => {
                if (!form.address || form.address.trim().length < 10) { setErrors({ address: 'Full address required (min 10 chars)' }); return; }
                setStep(4);
              }}>Continue â†’</button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2>Confirm booking</h2>

            <div className="card" style={{ marginTop: 12 }}>
              <div className="flex-between">
                <span className="text-muted" style={{ fontSize: '.82rem' }}>Pest</span>
                <strong>{PEST_TYPES.find(p=>p.id===form.pestType)?.name}</strong>
              </div>
              <div className="divider" />
              <div className="flex-between">
                <span className="text-muted" style={{ fontSize: '.82rem' }}>Property</span>
                <strong>{PROPERTY_SIZES.find(s=>s.id===form.propertySize)?.label}</strong>
              </div>
              <div className="divider" />
              <div className="flex-between">
                <span className="text-muted" style={{ fontSize: '.82rem' }}>Plan</span>
                <strong>{PLANS.find(p=>p.id===form.plan)?.name}</strong>
              </div>
              <div className="divider" />
              <div className="flex-between">
                <span className="text-muted" style={{ fontSize: '.82rem' }}>Schedule</span>
                <strong>{form.day} Â· {form.slot}</strong>
              </div>
              <div className="divider" />
              <div style={{ fontSize: '.82rem', color: 'var(--ink-muted)' }}>Address</div>
              <div style={{ fontSize: '.9rem', marginTop: 2 }}>{form.address}</div>
            </div>

            {/* Inspection vs Treat */}
            <p className="section-label" style={{ marginTop: 16 }}>How do you want to proceed?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button className={`chip ${form.dispatchMode === 'treat_on_arrival' ? 'selected' : ''}`}
                onClick={() => setForm(f => ({ ...f, dispatchMode: 'treat_on_arrival' }))}>
                <span className="chip-title">ðŸ¦Ÿ Treat on arrival <span className="badge badge-success" style={{ fontSize: '.7rem' }}>Recommended</span></span>
                <span className="chip-sub">Technician brings all chemicals and treats the same visit</span>
              </button>
              <button className={`chip ${form.dispatchMode === 'inspection' ? 'selected' : ''}`}
                onClick={() => setForm(f => ({ ...f, dispatchMode: 'inspection' }))}>
                <span className="chip-title">ðŸ” Inspection first â€” â‚¹0 advance</span>
                <span className="chip-sub">Technician inspects and quotes before treatment; you pay at confirmation</span>
              </button>
            </div>

            {/* Live price */}
            {price !== null && (
              <div className="card" style={{ marginTop: 12, background: 'rgba(31,91,58,.04)' }}>
                <div className="flex-between">
                  <span style={{ fontSize: '.88rem' }}>Base price (with size)</span>
                  <span>â‚¹{price.baseWithSize.toFixed(0)}</span>
                </div>
                <div className="flex-between mt-8">
                  <span style={{ fontSize: '.88rem' }}>Plan multiplier (Ã—{price.planMultiplier})</span>
                  <span>â‚¹{price.afterPlan.toFixed(0)}</span>
                </div>
                <div className="flex-between mt-8">
                  <span style={{ fontSize: '.88rem' }}>GST (18%)</span>
                  <span>â‚¹{price.gst.toFixed(0)}</span>
                </div>
                <div className="divider" />
                <div className="flex-between">
                  <span className="price" style={{ fontSize: '1.1rem' }}>
                    {form.dispatchMode === 'inspection' ? 'Advance' : 'Total'}
                  </span>
                  <span className="price" style={{ fontSize: '1.4rem' }}>
                    {form.dispatchMode === 'inspection' ? 'â‚¹0' : `â‚¹${price.total.toFixed(0)}`}
                  </span>
                </div>
                {form.dispatchMode === 'inspection' && (
                  <p className="text-muted" style={{ fontSize: '.78rem', marginTop: 4 }}>Full payment after inspection & your confirmation</p>
                )}
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setStep(3)}>â† Back</button>
              <button className="btn btn-primary" style={{ flex: 2 }} onClick={handleBook} disabled={isLoading}>
                {isLoading ? <span className="spinner" style={{ width:18,height:18,borderWidth:2 }} /> : 'Confirm booking'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// â”€â”€â”€ Status Badge â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function StatusBadge({ status }) {
  const map = {
    BOOKING_PLACED:     ['Placed', 'badge-warning'],
    AGENCY_APPROVED:    ['Approved', 'badge-success'],
    TECHNICIAN_ACCEPTED:['Accepted', 'badge-success'],
    ON_THE_WAY:         ['On the way', 'badge-primary'],
    ARRIVED:            ['Arrived', 'badge-primary'],
    IN_PROGRESS:        ['In progress', 'badge-primary'],
    COMPLETED:          ['Completed', 'badge-success'],
    CANCELLED:          ['Cancelled', 'badge-danger'],
  };
  const [label, cls] = map[status] ?? ['Unknown', 'badge-neutral'];
  return <span className={`badge ${cls}`}>{label}</span>;
}

// â”€â”€â”€ Track Tab â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const TRACK_STEPS = [
  'BOOKING_PLACED', 'AGENCY_APPROVED', 'TECHNICIAN_ACCEPTED',
  'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'COMPLETED',
];
const TRACK_LABELS = {
  BOOKING_PLACED:     'Booking placed',
  AGENCY_APPROVED:    'Agency approved',
  TECHNICIAN_ACCEPTED:'Technician accepted',
  ON_THE_WAY:         'On the way',
  ARRIVED:            'Arrived at your door',
  IN_PROGRESS:        'Treatment in progress',
  COMPLETED:          'Treatment complete',
};

function TechMap({ workerPosition, status }) {
  const progress = workerPosition
    ? { x: 10 + (workerPosition.lng - 77.593) * 8000, y: 120 - (workerPosition.lat - 12.971) * 8000 }
    : { x: 10, y: 30 };

  return (
    <div className="map-mock">
      <div className="map-mock-grid" />
      {/* Route line */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <path d={`M ${Math.max(10, progress.x)} ${Math.max(10, progress.y)} Q 120 110 160 140`}
          stroke="var(--primary)" strokeWidth="2.5" fill="none" strokeDasharray="6 4" />
      </svg>
      {/* Worker dot */}
      {status !== 'BOOKING_PLACED' && status !== 'AGENCY_APPROVED' && (
        <motion.div className="map-worker-dot"
          animate={{ left: `${Math.max(5, progress.x)}px`, top: `${Math.max(5, progress.y)}px` }}
          transition={{ type: 'spring', stiffness: 60, damping: 20 }}
          style={{ position: 'absolute' }} />
      )}
      <div className="map-pin-dest">ðŸ“</div>
      {/* ETA label */}
    </div>
  );
}

function TrackTab({ toast }) {
  const {
    booking, assignedWorker, workerPosition, startOtp, etaSeconds,
    cancelBooking, rateBooking, canCancel,
  } = useAppStore();

  const [stars, setStars] = useState(0);
  const [rated, setRated] = useState(false);

  if (!booking) {
    return (
      <div className="content-area">
        <div className="empty-state">
          <div className="empty-icon">ðŸ“­</div>
          <h2>No active booking</h2>
          <p className="text-muted mt-8">Place a booking and your technician's live location will appear here.</p>
        </div>
      </div>
    );
  }

  const currentIdx = TRACK_STEPS.indexOf(booking.status);

  const formatEta = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
  };

  if (booking.status === 'COMPLETED' && !rated) {
    return (
      <div className="content-area" style={{ textAlign: 'center', paddingTop: 32 }}>
        <div style={{ fontSize: '3.5rem' }}>ðŸŽ‰</div>
        <h2 style={{ marginTop: 12 }}>Treatment complete!</h2>
        <p className="text-muted mt-8">How was your experience with {assignedWorker?.name ?? 'the technician'}?</p>
        <div className="star-row" style={{ justifyContent: 'center', marginTop: 20 }}>
          {[1,2,3,4,5].map(n => (
            <button key={n} className={`star-btn ${stars >= n ? 'filled' : ''}`}
              onClick={() => setStars(n)}>
              {stars >= n ? 'â­' : 'â˜†'}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" style={{ marginTop: 20, maxWidth: 240, margin: '20px auto 0' }}
          disabled={!stars}
          onClick={() => { rateBooking(stars); setRated(true); toast('Thank you for your rating!', 'success'); }}>
          Submit rating
        </button>
      </div>
    );
  }

  return (
    <div className="content-area">
      {/* Map */}
      <TechMap workerPosition={workerPosition} status={booking.status} />

      {/* ETA chip */}
      {(booking.status === 'ON_THE_WAY') && (
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <span className="badge badge-primary" style={{ fontSize: '.88rem', padding: '6px 14px' }}>
            ðŸ• ETA: {etaSeconds > 0 ? formatEta(etaSeconds) : 'Arriving now'}
          </span>
        </div>
      )}

      {/* Technician card */}
      {assignedWorker && booking.status !== 'BOOKING_PLACED' && (
        <div className="card mt-12">
          <div className="flex-between">
            <div>
              <div style={{ fontWeight: 700 }}>{assignedWorker.name}</div>
              <div style={{ fontSize: '.82rem', color: 'var(--ink-muted)' }}>
                â­ {assignedWorker.rating} Â· PestPro Services
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {assignedWorker.kyc && <span className="badge badge-success">KYC âœ“</span>}
              <a href={`tel:+911800000000`} className="btn btn-ghost btn-sm" title="Masked call">
                ðŸ“ž
              </a>
            </div>
          </div>
        </div>
      )}

      {/* OTP (ARRIVED only) */}
      {booking.status === 'ARRIVED' && startOtp && (
        <div className="card mt-12" style={{ textAlign: 'center', background: 'rgba(31,91,58,.04)' }}>
          <p style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--ink-muted)', marginBottom: 8 }}>
            Share this OTP with your technician to start
          </p>
          <div className="otp-box">
            {startOtp.split('').map((d, i) => (
              <div key={i} className="otp-digit">{d}</div>
            ))}
          </div>
          <p className="text-muted" style={{ fontSize: '.75rem' }}>Valid for this session only</p>
        </div>
      )}

      {/* Timeline */}
      <div className="card mt-12">
        <h3 style={{ marginBottom: 14 }}>Live status</h3>
        <div className="timeline">
          {TRACK_STEPS.map((s, i) => {
            const isDone = i < currentIdx;
            const isActive = i === currentIdx;
            return (
              <div key={s} className="timeline-step" style={{ paddingBottom: i < TRACK_STEPS.length - 1 ? 8 : 0 }}>
                <div className="timeline-connector">
                  <div className={`tl-dot ${isDone ? 'done' : isActive ? 'active' : 'pending'}`} />
                  {i < TRACK_STEPS.length - 1 && <div className="tl-line" />}
                </div>
                <div style={{ paddingBottom: i < TRACK_STEPS.length - 1 ? 24 : 0 }}>
                  <div style={{ fontWeight: isActive ? 700 : 500, color: isDone ? 'var(--success)' : isActive ? 'var(--primary)' : 'var(--ink-muted)', fontSize: '.9rem' }}>
                    {TRACK_LABELS[s]}
                  </div>
                  {isActive && (
                    <div style={{ fontSize: '.78rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                      {s === 'BOOKING_PLACED' && 'Agency is reviewing (approves in ~8 s)â€¦'}
                      {s === 'AGENCY_APPROVED' && 'Waiting for technician to acceptâ€¦'}
                      {s === 'TECHNICIAN_ACCEPTED' && 'Owner unlocking address (6 s)â€¦'}
                      {s === 'ON_THE_WAY' && `ETA: ${etaSeconds > 0 ? formatEta(etaSeconds) : 'Arriving now'}`}
                      {s === 'ARRIVED' && 'Share your OTP above to start treatment'}
                      {s === 'IN_PROGRESS' && 'Treatment underway. Please stay nearby.'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cancel */}
      {canCancel() && (
        <button className="btn btn-danger" style={{ marginTop: 14, width: '100%' }}
          onClick={async () => { await cancelBooking(); toast('Booking cancelled', 'danger'); }}>
          Cancel booking
        </button>
      )}
    </div>
  );
}

// â”€â”€â”€ History Tab â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function HistoryTab({ toast, setTab }) {
  const { history } = useAppStore();

  if (!history.length) {
    return (
      <div className="content-area">
        <div className="empty-state">
          <div className="empty-icon">ðŸ“œ</div>
          <h2>No past bookings</h2>
          <p className="text-muted mt-8">Your completed and cancelled bookings will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-area">
      <h2 style={{ marginBottom: 14 }}>Booking history</h2>
      {history.map((b, i) => (
        <div key={b.id + i} className="card" style={{ marginBottom: 10 }}>
          <div className="flex-between">
            <div>
              <div style={{ fontWeight: 700 }}>{b.pestLabel}</div>
              <div style={{ fontSize: '.82rem', color: 'var(--ink-muted)' }}>{b.planLabel} Â· {b.sizeLabel}</div>
              <div style={{ fontSize: '.78rem', color: 'var(--ink-muted)' }}>{b.day} Â· {b.slot}</div>
            </div>
            <StatusBadge status={b.status} />
          </div>
          <div className="divider" />
          <div className="flex-between">
            <span className="price" style={{ fontSize: '1.1rem' }}>â‚¹{b.price?.total?.toFixed(0) ?? 'â€”'}</span>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {b.rating && <span style={{ fontSize: '.88rem' }}>{'â­'.repeat(b.rating)}</span>}
              <button className="btn btn-ghost btn-sm" onClick={() => { setTab(0); toast('Fill in new booking details'); }}>
                Rebook
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// â”€â”€â”€ Root App â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function App() {
  const [tab, setTab] = useState(0);
  const { toasts, show: toast } = useToast();

  const tabs = [
    { label: 'Book',    iconD: icons.bug,     comp: <BookTab toast={toast} /> },
    { label: 'Track',   iconD: icons.map,     comp: <TrackTab toast={toast} /> },
    { label: 'History', iconD: icons.history, comp: <HistoryTab toast={toast} setTab={setTab} /> },
  ];

  return (
    <div className="app-shell">
      <ToastLayer toasts={toasts} />

      {/* Header */}
      <header className="app-header">
        <div className="logo">
          <span style={{ fontSize: '1.4rem' }}>ðŸŒ¿</span> Pest Free
        </div>
        <span className="badge badge-success">Customer</span>
      </header>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {tabs[tab].comp}
        </motion.div>
      </AnimatePresence>

      {/* Tab bar */}
      <nav className="tab-bar" role="tablist">
        {tabs.map((t, i) => (
          <button key={i} role="tab" aria-selected={i === tab} className={`tab-btn ${i === tab ? 'active' : ''}`}
            onClick={() => setTab(i)}>
            <Icon d={t.iconD} size={22} />
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
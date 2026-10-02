import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet, Platform } from './lib/rn.jsx';
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
    <View className="toast-stack" aria-live="polite">
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
            <Text style={{ color: 'inherit' }}>{t.msg}</Text>
          </motion.div>
        ))}
      </AnimatePresence>
    </View>
  );
}

function ModalDialog({ open, onClose, title, icon: Icon, children }) {
  if (!open) return null;
  return (
    <View className="modal-backdrop" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <View className="modal-header">
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {Icon && (
              <View
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
              </View>
            )}
            <Text className="modal-title" style={{ fontSize: '1.15rem', fontWeight: 800 }}>{title}</Text>
          </View>
          <TouchableOpacity
            className="btn-icon"
            onClick={onClose}
            onPress={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </TouchableOpacity>
        </View>
        <View className="modal-body">{children}</View>
      </motion.div>
    </View>
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
    <View className="lifecycle-stepper-v2" aria-label="Job Lifecycle Progress">
      <View className="stepper-header-row">
        <View className="stepper-live-indicator">
          <View className="pulse-indicator-dot" />
          <Text style={{ fontWeight: 700 }}>Live Service Progression &bull; Stage {activeIdx + 1} of {LIFECYCLE_STAGES.length}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)' }}>
            Service Status:
          </Text>
          <Text className="badge badge-green" style={{ fontSize: '0.75rem', fontWeight: 800 }}>
            {progressPct}% Completed
          </Text>
        </View>
      </View>

      <View className="stepper-progress-bar-wrap">
        <View
          className="stepper-progress-bar-fill"
          style={{ width: `${progressPct}%` }}
        />
      </View>

      <View className="stepper-grid-v2">
        {LIFECYCLE_STAGES.map((st, i) => {
          const isDone = i < activeIdx || currentStatus === 'COMPLETED';
          const isCurrent = i === activeIdx && currentStatus !== 'COMPLETED';
          const isUpcoming = i > activeIdx && currentStatus !== 'COMPLETED';

          return (
            <View
              key={st.key}
              className={`step-card-v2 ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''} ${isUpcoming ? 'upcoming' : ''}`}
            >
              <View className="step-card-top-row">
                <Text className="step-num-pill">STEP 0{i + 1}</Text>
                <Text
                  className="step-badge-pill"
                  style={{
                    background: isCurrent ? 'rgba(255,255,255,0.22)' : isDone ? 'rgba(16,185,129,0.15)' : 'rgba(0,0,0,0.05)',
                    color: isCurrent ? '#FFFFFF' : isDone ? '#065F46' : 'var(--ink-muted)',
                  }}
                >
                  {isDone ? '✓ Done' : isCurrent ? 'Live Now' : 'Queued'}
                </Text>
              </View>

              <View className="step-icon-bubble">
                <CheckCircle2 size={20} strokeWidth={isCurrent ? 2.5 : 2} />
              </View>

              <View>
                <Text className="step-title-v2">{st.label}</Text>
                <Text className="step-sub-v2">Stage 0{i + 1} Verified</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

// ─── Real Leaflet Map Component with Live Moving Technician Marker ───────────
function RealLeafletMap({ customerCoords, workerCoords, isLiveMove, height = '320px' }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const workerMarkerRef = useRef(null);
  const lineRef = useRef(null);

  const cLat = customerCoords?.lat || 12.9250;
  const cLng = customerCoords?.lng || 77.5938;
  const wLat = workerCoords?.lat || 12.9720;
  const wLng = workerCoords?.lng || 77.5940;

  useEffect(() => {
    if (!mapContainerRef.current || !window.L) return;

    if (!mapInstanceRef.current) {
      const map = window.L.map(mapContainerRef.current, {
        center: [(cLat + wLat) / 2, (cLng + wLng) / 2],
        zoom: 13,
        zoomControl: false,
      });

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      // Customer Home Marker
      const homeIcon = window.L.divIcon({
        className: 'custom-map-icon',
        html: `<View style="background:#E8A317; color:#1D2B1A; border:2px solid #FFFFFF; border-radius:50%; width:34px; height:34px; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.3); font-weight:800; font-size:16px;">🏠</View>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });
      window.L.marker([cLat, cLng], { icon: homeIcon })
        .addTo(map)
        .bindPopup('<b>Customer Destination</b><br>Service location pinned here')
        .openPopup();

      // Worker Moving Marker with Pulse Effect
      const techIcon = window.L.divIcon({
        className: 'custom-map-icon',
        html: `<View style="position:relative; width:40px; height:40px; display:flex; align-items:center; justify-content:center;">
          <View style="position:absolute; width:100%; height:100%; border-radius:50%; background:rgba(31,91,58,0.35); animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></View>
          <View style="background:#1F5B3A; color:#FFFFFF; border:2px solid #FFFFFF; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(31,91,58,0.5); font-size:14px;">🛵</View>
        </View>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
      const wMarker = window.L.marker([wLat, wLng], { icon: techIcon }).addTo(map);
      wMarker.bindPopup('<b>Field Technician (Arjun Sharma)</b><br>Live GPS route en route');
      workerMarkerRef.current = wMarker;

      // Connecting Route Line
      const routeLine = window.L.polyline([[wLat, wLng], [cLat, cLng]], {
        color: '#1F5B3A',
        weight: 4,
        dashArray: '8, 8',
        opacity: 0.8,
      }).addTo(map);
      lineRef.current = routeLine;

      mapInstanceRef.current = map;
    } else {
      if (workerMarkerRef.current) {
        workerMarkerRef.current.setLatLng([wLat, wLng]);
      }
      if (lineRef.current) {
        lineRef.current.setLatLngs([[wLat, wLng], [cLat, cLng]]);
      }
    }
  }, [cLat, cLng, wLat, wLng]);

  return (
    <View
      style={{
        width: '100%',
        height,
        borderRadius: 16,
        overflow: 'hidden',
        border: '1.5px solid var(--border-strong)',
        boxShadow: 'var(--shadow-sm)',
        position: 'relative',
      }}
    >
      <View ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </View>
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
    coords: { lat: 12.9250, lng: 77.5938 },
  },
  {
    label: 'Parents - Indiranagar',
    text: 'House 18, 100ft Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
    coords: { lat: 12.9784, lng: 77.6408 },
  },
  {
    label: 'Office - HSR Layout',
    text: '2nd Floor, Lotus Tech Park, 27th Main, HSR Layout Sector 2, Bengaluru 560102',
    coords: { lat: 12.9116, lng: 77.6389 },
  },
];

function BookSection({ toast, onNavigate }) {
  const { placeBooking, isLoading, booking, rebookDraft, clearRebookDraft, setCustomerLocation } = useAppStore();

  const [form, setForm] = useState({
    pestTypes: ['cockroaches'],
    propertySize: '2bhk',
    plan: 'barrier',
    day: 'today',
    slot: TIME_SLOTS[0],
    address: SAVED_ADDRESSES[0].text,
    coords: SAVED_ADDRESSES[0].coords,
    note: 'Sightings near kitchen cabinets and utility drain.',
    dispatchMode: 'treat_on_arrival',
  });
  const [errors, setErrors] = useState({});
  const [geoLocating, setGeoLocating] = useState(false);

  useEffect(() => {
    if (rebookDraft) {
      setForm({
        ...rebookDraft,
        pestTypes: rebookDraft.pestTypes || [rebookDraft.pestType || 'cockroaches'],
        coords: rebookDraft.coords || SAVED_ADDRESSES[0].coords,
      });
      clearRebookDraft();
    }
  }, [rebookDraft, clearRebookDraft]);

  const togglePest = (pestId) => {
    setForm((prev) => {
      const current = prev.pestTypes || [];
      const exists = current.includes(pestId);
      const next = exists ? current.filter((id) => id !== pestId) : [...current, pestId];
      return { ...prev, pestTypes: next };
    });
  };

  const captureLiveGps = () => {
    if (!navigator.geolocation) {
      toast('Geolocation is not supported by your browser', 'error');
      return;
    }
    setGeoLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newCoords = {
          lat: Number(pos.coords.latitude.toFixed(4)),
          lng: Number(pos.coords.longitude.toFixed(4)),
        };
        setForm((f) => ({
          ...f,
          coords: newCoords,
          address: f.address || `Live Pin: ${newCoords.lat}, ${newCoords.lng} (Auto-Detected GPS)`,
        }));
        setCustomerLocation(newCoords);
        setGeoLocating(false);
        toast(`Live GPS coordinates pinned: Lat ${newCoords.lat}, Lng ${newCoords.lng}!`, 'success');
      },
      (err) => {
        setGeoLocating(false);
        const fallback = { lat: 12.9250, lng: 77.5938 };
        setForm((f) => ({ ...f, coords: fallback }));
        toast('Using verified Bengaluru GPS pin coordinates', 'info');
      },
      { timeout: 8000 }
    );
  };

  const primaryPest = (form.pestTypes && form.pestTypes[0]) || 'cockroaches';

  const aiRecommendation = generateSmartQuoteRecommendation({
    pestType: primaryPest,
    propertySize: form.propertySize,
    note: form.note || '',
  });

  const selectedSize = PROPERTY_SIZES.find((s) => s.id === form.propertySize) ?? PROPERTY_SIZES[0];
  const selectedPlan = PLANS.find((p) => p.id === form.plan) ?? PLANS[0];
  const price = calculateMultiServicePrice(
    form.pestTypes || ['cockroaches'],
    form.propertySize,
    form.plan || 'standard',
    form.dispatchMode || 'treat_on_arrival'
  );

  const handleSubmit = async () => {
    const newErr = {};
    if (!form.pestTypes || form.pestTypes.length === 0) {
      newErr.pestTypes = 'Please select at least one treatment service.';
    }
    if (!form.propertySize) {
      newErr.propertySize = 'Please select your property configuration.';
    }
    if (!form.plan) {
      newErr.plan = 'Please select a protection plan.';
    }
    if (!form.day) {
      newErr.day = 'Please select a preferred date.';
    }
    if (!form.slot) {
      newErr.slot = 'Please select a preferred time slot.';
    }
    if (!form.dispatchMode) {
      newErr.dispatchMode = 'Please select a dispatch mode.';
    }
    if (!form.address || form.address.trim().length < 10) {
      newErr.address = 'Mandatory: Enter exact flat/house number, street, and locality (min 10 characters).';
    }
    setErrors(newErr);
    if (Object.keys(newErr).length > 0) {
      toast('Please complete all mandatory fields and address.', 'error');
      return;
    }

    await placeBooking(form);
    toast('Booking confirmed! Redirecting to Live Tracking & OTP Radar...', 'success');
    onNavigate('track');
  };

  return (
    <View>
      {booking && booking.status !== 'CANCELLED' && (
        <View
          className="demo-toolbar"
          style={{ background: 'var(--primary-light)', borderColor: 'var(--primary)' }}
        >
          <View style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sparkles size={18} color="var(--primary)" />
            <Text style={{ fontWeight: 700 }}>
              Active Booking #{booking.id} ({booking.pestLabel}) is currently in{' '}
              <u>{booking.status.replace(/_/g, ' ')}</u> state.
            </Text>
          </View>
          <TouchableOpacity className="btn btn-primary btn-sm" onClick={() => onNavigate('track')}>
            Open Live Tracking & OTP <ChevronRight size={15} />
          </TouchableOpacity>
        </View>
      )}

      <View className="booking-layout">
        {/* LEFT COLUMN: Interactive Configurator */}
        <View style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {/* STEP 1: Multi-Select Pest Selection */}
          <View className="web-card">
            <View className="card-header-row" style={{ flexWrap: 'wrap', gap: 8 }}>
              <View>
                <h2 className="card-title">
                  <Bug size={20} color="var(--primary)" />
                  <Text>1. Select Treatment Services (Multi-Select Supported)</Text>
                </h2>
                <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                  Need multiple treatments? Select two or more services to receive an automatic <strong>15% combo bundle discount</strong>. (Click any option to select, click again to deselect).
                </p>
              </View>
              <View style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <TouchableOpacity
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setForm((f) => ({ ...f, pestTypes: PEST_TYPES.map((p) => p.id) }));
                    toast('Selected Full Home Protection Combo (15% bundle discount applied)', 'success');
                  }}
                >
                  <CheckCircle2 size={14} /> Select All (6 Pests)
                </TouchableOpacity>
                {form.pestTypes?.length > 1 && (
                  <TouchableOpacity
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => setForm((f) => ({ ...f, pestTypes: ['cockroaches'] }))}
                  >
                    Reset to 1
                  </TouchableOpacity>
                )}
                <Text className="badge badge-green">
                  {form.pestTypes?.length || 1} Service{form.pestTypes?.length > 1 ? 's' : ''} Selected
                </Text>
              </View>
            </View>

            <View className="select-grid-3">
              {PEST_TYPES.map((p) => {
                const isSel = (form.pestTypes || []).includes(p.id);
                return (
                  <TouchableOpacity
                    key={p.id}
                    type="button"
                    className={`select-card ${isSel ? 'selected' : ''}`}
                    onClick={() => togglePest(p.id)}
                    style={{ position: 'relative' }}
                  >
                    <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <View className="select-card-title">{p.name}</View>
                      <View
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          border: isSel ? '2px solid var(--primary)' : '2px solid var(--border-strong)',
                          background: isSel ? 'var(--primary)' : '#FFFFFF',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 900,
                          flexShrink: 0,
                          marginLeft: 6,
                        }}
                      >
                        {isSel ? '✓' : ''}
                      </View>
                    </View>
                    <View className="select-card-desc" style={{ marginTop: 4 }}>
                      {p.tagline}
                    </View>
                    <View style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                      <View className="select-card-price">Rs. {p.basePrice} base</View>
                      <View style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                        {p.chemicalUsed}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            {errors.pestTypes && <View className="form-error">{errors.pestTypes}</View>}
          </View>

          {/* STEP 2: Property Size & Protection Plan with Prices Displayed */}
          <View className="web-card">
            <View className="card-header-row">
              <h2 className="card-title">
                <Building2 size={20} color="var(--primary)" />
                <Text>2. Property Size & Protection Plan</Text>
              </h2>
            </View>

            <View className="form-label" style={{ marginBottom: 8 }}>
              Choose Property Configuration (Click to select, click again to deselect)
            </View>
            <View className="select-grid-5" style={{ marginBottom: 22 }}>
              {PROPERTY_SIZES.map((s) => {
                const isSel = form.propertySize === s.id;
                return (
                  <TouchableOpacity
                    key={s.id}
                    type="button"
                    className={`select-card ${isSel ? 'selected' : ''}`}
                    onClick={() => setForm((f) => ({ ...f, propertySize: f.propertySize === s.id ? '' : s.id }))}
                  >
                    <View className="select-card-title">{s.label}</View>
                    <View className="select-card-desc">{s.areaHint}</View>
                    <View className="select-card-price">x{s.multiplier} Multiplier</View>
                  </TouchableOpacity>
                );
              })}
            </View>
            {errors.propertySize && <View className="form-error" style={{ marginBottom: 16 }}>{errors.propertySize}</View>}

            {/* AI Smart Quote Banner */}
            <View
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
              <View style={{ flex: 1 }}>
                <View style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.76rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>
                  <Sparkles size={15} /> AI Smart Quote Recommendation
                </View>
                <View style={{ fontWeight: 700, fontSize: '0.96rem', marginTop: 4 }}>
                  Recommended Tier:{' '}
                  <Text style={{ color: 'var(--primary-dark)', textDecoration: 'underline' }}>
                    {PLANS.find((pl) => pl.id === aiRecommendation.recommendedPlan)?.name}
                  </Text>
                </View>
                <View style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                  {aiRecommendation.reason}
                </View>
              </View>
              {form.plan !== aiRecommendation.recommendedPlan ? (
                <TouchableOpacity
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setForm((f) => ({ ...f, plan: aiRecommendation.recommendedPlan }));
                    toast('Applied AI recommended treatment plan!', 'success');
                  }}
                >
                  Apply Recommended Plan
                </TouchableOpacity>
              ) : (
                <Text className="badge badge-green">
                  <CheckCircle2 size={14} /> Active Selection
                </Text>
              )}
            </View>

            <View className="form-label" style={{ marginBottom: 8 }}>
              Select Protection Plan (Click to select, click again to deselect) — Estimated Prices Displayed Below
            </View>
            <View className="select-grid-3">
              {PLANS.map((pl) => {
                const isSel = form.plan === pl.id;
                const planEstimatedCost = Math.round(price.basePrice * selectedSize.multiplier * pl.multiplier * 1.18);
                return (
                  <TouchableOpacity
                    key={pl.id}
                    type="button"
                    className={`select-card ${isSel ? 'selected' : ''}`}
                    onClick={() => setForm((f) => ({ ...f, plan: f.plan === pl.id ? '' : pl.id }))}
                    
                  >
                    <View>
                      <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
                        <Text className="select-card-title">{pl.name}</Text>
                        {pl.badge && <Text className="badge badge-amber">{pl.badge}</Text>}
                      </View>
                      <View className="select-card-desc" style={{ marginTop: 6 }}>
                        {pl.description}
                      </View>
                    </View>
                    <View style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                      <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <Text className="badge badge-neutral">{pl.warrantyDays}-Day Warranty</Text>
                        <View style={{ textAlign: 'right' }}>
                          <Text style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', display: 'block' }}>Inc. GST</Text>
                          <Text style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>
                            Rs. {planEstimatedCost}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            {errors.plan && <View className="form-error">{errors.plan}</View>}
          </View>

          {/* STEP 3: Schedule & Dispatch Mode */}
          <View className="web-card">
            <View className="card-header-row">
              <h2 className="card-title">
                <Calendar size={20} color="var(--primary)" />
                <Text>3. Schedule & Dispatch Mode (Click to select, click again to deselect)</Text>
              </h2>
            </View>

            <View className="field-grid" style={{ marginBottom: 18 }}>
              <View>
                <label className="form-label">Preferred Day</label>
                <View style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {DAY_OPTS.map((d) => (
                    <TouchableOpacity
                      key={d.id}
                      type="button"
                      className={`stage-pill-btn ${form.day === d.id ? 'active' : ''}`}
                      style={{ padding: '10px 14px', fontSize: '0.86rem' }}
                      onClick={() => setForm((f) => ({ ...f, day: f.day === d.id ? '' : d.id }))}
                      
                    >
                      {d.label}
                    </TouchableOpacity>
                  ))}
                </View>
                {errors.day && <View className="form-error" style={{ marginTop: 6 }}>{errors.day}</View>}
              </View>

              <View>
                <label className="form-label">2-Hour Arrival Window</label>
                <View style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {TIME_SLOTS.map((sl) => (
                    <TouchableOpacity
                      key={sl}
                      type="button"
                      className={`stage-pill-btn ${form.slot === sl ? 'active' : ''}`}
                      style={{ padding: '10px 14px', fontSize: '0.84rem' }}
                      onClick={() => setForm((f) => ({ ...f, slot: f.slot === sl ? '' : sl }))}
                      
                    >
                      {sl}
                    </TouchableOpacity>
                  ))}
                </View>
                {errors.slot && <View className="form-error" style={{ marginTop: 6 }}>{errors.slot}</View>}
              </View>
            </View>

            <View className="form-label">Dispatch Mode (Click to select, click again to deselect)</View>
            <View className="field-grid">
              <TouchableOpacity
                type="button"
                className={`select-card ${form.dispatchMode === 'treat_on_arrival' ? 'selected' : ''}`}
                onClick={() => setForm((f) => ({ ...f, dispatchMode: f.dispatchMode === 'treat_on_arrival' ? '' : 'treat_on_arrival' }))}
                
              >
                <View className="select-card-title">Treat on Arrival (Instant Dispatch)</View>
                <View className="select-card-desc">
                  Technician arrives fully equipped with calibrated chemical batch and begins treatment immediately after OTP verification.
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                type="button"
                className={`select-card ${form.dispatchMode === 'inspection' ? 'selected' : ''}`}
                onClick={() => setForm((f) => ({ ...f, dispatchMode: f.dispatchMode === 'inspection' ? '' : 'inspection' }))}
                
              >
                <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text className="select-card-title">Inspection First</Text>
                  <Text className="badge badge-green">Rs. 0 Advance Now</Text>
                </View>
                <View className="select-card-desc">
                  Pay Rs. 0 now. Technician inspects moisture pockets and colony severity first; pay full quote only after approving on-site.
                </View>
              </TouchableOpacity>
            </View>
            {errors.dispatchMode && <View className="form-error" style={{ marginTop: 8 }}>{errors.dispatchMode}</View>}
          </View>

          {/* STEP 4: Mandatory Exact Location Pinning & Address */}
          <View className="web-card">
            <View className="card-header-row">
              <View>
                <h2 className="card-title">
                  <MapPin size={20} color="var(--primary)" />
                  <Text>4. Service Address & Mandatory Exact Live Location</Text>
                </h2>
                <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                  Exact coordinates (Latitude & Longitude) are recorded live and pinned for accurate technician routing.
                </p>
              </View>
              <TouchableOpacity
                type="button"
                className="btn btn-primary btn-sm"
                onClick={captureLiveGps}
                disabled={geoLocating}
              >
                <Navigation size={14} />
                {geoLocating ? 'Detecting Live GPS...' : 'Use My Current Live Location'}
              </TouchableOpacity>
            </View>

            {/* Quick Fill Saved Address Pills */}
            <View style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
              <Text style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)' }}>
                Quick Saved Address:
              </Text>
              {SAVED_ADDRESSES.map((addr, i) => (
                <TouchableOpacity
                  key={i}
                  type="button"
                  className="stage-pill-btn"
                  onClick={() => {
                    setForm((f) => ({ ...f, address: addr.text, coords: addr.coords }));
                    setCustomerLocation(addr.coords);
                    setErrors({});
                    toast(`Loaded ${addr.label} & pinned GPS (Lat: ${addr.coords.lat}, Lng: ${addr.coords.lng})`, 'info');
                  }}
                >
                  <Home size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                  {addr.label}
                </TouchableOpacity>
              ))}
            </View>

            {/* Live GPS Coordinates Banner */}
            <View
              className="web-card-surface"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                marginBottom: 16,
                background: 'var(--primary-light)',
                border: '1.5px solid rgba(31, 91, 58, 0.3)',
              }}
            >
              <View>
                <Text style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)' }}>
                  Active Geo-Coordinates Pinned
                </Text>
                <View style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 800, marginTop: 2 }}>
                  Latitude: {form.coords?.lat || 12.9250} | Longitude: {form.coords?.lng || 77.5938}
                </View>
              </View>
              <Text className="badge badge-green">
                <CheckCircle2 size={13} /> GPS Anchored
              </Text>
            </View>

            <View className="form-group">
              <label className="form-label" htmlFor="address-input">
                Mandatory Exact Flat / House No., Building, Street & Locality
              </label>
              <TextInput
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
              {errors.address && <View className="form-error">{errors.address}</View>}
            </View>

            <View className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="note-input">
                Infestation Notes for Technician (Triggers AI Plan Suggestion)
              </label>
              <TextInput multiline
                id="note-input"
                rows={2}
                className="form-textarea"
                value={form.note}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                placeholder="Describe where you noticed activity (e.g. heavy termites in wooden wardrobe, kitchen sink, pets at home)..."
              />
            </View>
          </View>
        </View>

        {/* RIGHT COLUMN: Sticky Live Quote & Multi-Service Bundle Summary */}
        <View className="web-card sticky-summary" style={{ borderTop: '4px solid var(--primary)' }}>
          <View className="card-header-row">
            <h3 className="card-title">Live Treatment Quote</h3>
            <Text className="badge badge-green">{selectedPlan.warrantyDays}-Day Warranty</Text>
          </View>

          <View className="web-card-surface" style={{ marginBottom: 18 }}>
            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <Text style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)' }}>
                Selected Services ({price.pests.length})
              </Text>
              {price.bundleDiscount > 0 && (
                <Text className="badge badge-green" style={{ fontSize: '0.72rem' }}>
                  15% Combo Saved
                </Text>
              )}
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {price.pests.map((p) => (
                <View key={p.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <Text style={{ fontWeight: 700 }}>• {p.name}</Text>
                  <Text style={{ color: 'var(--ink-muted)' }}>Rs. {p.basePrice}</Text>
                </View>
              ))}
            </View>

            <View style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
              <Text className="badge badge-neutral">{selectedSize.label}</Text>
              <Text className="badge badge-neutral">{selectedPlan.name}</Text>
              <Text className="badge badge-amber">{form.slot}</Text>
            </View>
          </View>

          {/* Transparent Breakdown */}
          <View style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.92rem', marginBottom: 18 }}>
            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text style={{ color: 'var(--ink-muted)' }}>Base Services Total</Text>
              <Text style={{ fontWeight: 700 }}>
                Rs. {price.pests.reduce((a, b) => a + b.basePrice, 0)}
              </Text>
            </View>

            {price.bundleDiscount > 0 && (
              <View style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)', fontWeight: 700 }}>
                <Text>Multi-Service Combo Discount (15%)</Text>
                <Text>-Rs. {price.bundleDiscount}</Text>
              </View>
            )}

            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text style={{ color: 'var(--ink-muted)' }}>
                Property Size ({selectedSize.label} x{price.sizeMultiplier})
              </Text>
              <Text style={{ fontWeight: 700 }}>
                Rs. {Math.round(price.basePrice * price.sizeMultiplier)}
              </Text>
            </View>

            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text style={{ color: 'var(--ink-muted)' }}>
                Plan Tier ({selectedPlan.name} x{price.planMultiplier})
              </Text>
              <Text style={{ fontWeight: 700 }}>Rs. {price.subtotal}</Text>
            </View>

            <View style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text style={{ color: 'var(--ink-muted)' }}>GST (18% Govt Tax)</Text>
              <Text style={{ fontWeight: 700 }}>Rs. {price.gst}</Text>
            </View>

            <View
              style={{
                borderTop: '2px solid var(--border)',
                paddingTop: 12,
                marginTop: 4,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <Text style={{ fontWeight: 800, fontSize: '1rem' }}>Total Estimate</Text>
              <Text style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
                Rs. {price.total}
              </Text>
            </View>

            <View
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
              <Text>Payable Now ({form.dispatchMode === 'inspection' ? 'Inspection Mode' : 'Full Booking'})</Text>
              <Text style={{ fontSize: '1.2rem', color: 'var(--primary-dark)' }}>
                Rs. {price.payableNow}
              </Text>
            </View>
          </View>

          <View
            className="field-box"
            style={{ marginBottom: 18, fontSize: '0.8rem', color: 'var(--ink-muted)', lineHeight: 1.45 }}
          >
            <strong style={{ color: 'var(--ink)', display: 'block', marginBottom: 3 }}>
              <Lock size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              Agency Homeowner Privacy & Route Security:
            </strong>
            Your personal phone and exact flat coordinates remain locked until the Agency confirms the booking and dispatches a KYC-verified technician.
          </View>

          <TouchableOpacity
            type="button"
            className="btn btn-primary btn-lg btn-block"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            <CheckCircle2 size={18} />
            {isLoading
              ? 'Dispatching Booking...'
              : form.dispatchMode === 'inspection'
              ? `Confirm Free Inspection for ${price.pests.length} Services (Rs. 0 Now)`
              : `Confirm & Dispatch for ${price.pests.length} Services (Rs. ${price.payableNow})`}
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    if (paymentQrGenerated && !customerPaid && booking?.status === 'COMPLETED') {
      setQrModal(true);
    }
  }, [paymentQrGenerated, customerPaid]);

  const rawTotal =
    typeof booking?.price === 'number'
      ? booking.price
      : booking?.price?.total ?? booking?.pricing?.total ?? 1600;

  return (
    <View>
      {/* Interactive Stage Switcher */}
      <View className="demo-toolbar">
        <View style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '0.84rem', color: 'var(--primary-dark)' }}>
          <Sparkles size={16} />
          <Text>Interactive Tracking State Simulator:</Text>
        </View>
        <View style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {LIFECYCLE_STAGES.map((st) => (
            <TouchableOpacity
              key={st.key}
              type="button"
              className={`stage-pill-btn ${booking?.status === st.key ? 'active' : ''}`}
              onClick={() => {
                simulateCustomerStage(st.key);
                toast(`Switched live tracker to ${st.label}`, 'info');
              }}
            >
              {st.label}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {(!booking || booking.status === 'CANCELLED') && (
        <View className="web-card" style={{ textAlign: 'center', padding: '56px 32px' }}>
          <View
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
          </View>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 8 }}>No Active Treatment in Progress</h2>
          <p style={{ color: 'var(--ink-muted)', maxWidth: 500, margin: '0 auto 24px', lineHeight: 1.5 }}>
            Place a new booking in the configurator or click any stage in the simulator bar above to preview real OpenStreetMap tracking, live doorstep OTP, and end-of-service PIN handshake.
          </p>
          <View style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <TouchableOpacity className="btn btn-primary btn-lg" onClick={() => onNavigate('book')}>
              <Bug size={18} /> Book a New Pest Treatment
            </TouchableOpacity>
            <TouchableOpacity
              className="btn btn-outline btn-lg"
              onClick={() => {
                simulateCustomerStage('ON_THE_WAY');
                toast('Loaded live technician radar on OpenStreetMap!', 'success');
              }}
            >
              <Sparkles size={18} /> Preview Live Real Map Radar
            </TouchableOpacity>
          </View>
        </View>
      )}

      {booking && booking.status !== 'CANCELLED' && (
        <>
          <LifecycleStepper currentStatus={booking.status} />

          <View className="dashboard-grid-2">
            {/* LEFT COLUMN: Real OpenStreetMap + Live Safety Feed */}
            <View style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <View className="web-card">
                <View className="card-header-row">
                  <View>
                    <Text className="badge badge-neutral" style={{ marginBottom: 4 }}>
                      Booking #{booking.id}
                    </Text>
                    <h2 className="card-title" style={{ fontSize: '1.3rem' }}>
                      Real Live Technician GPS Radar (OpenStreetMap)
                    </h2>
                  </View>
                  {booking.status === 'ON_THE_WAY' && (
                    <Text className="badge badge-green">
                      <Clock size={14} /> ETA: {etaSeconds}s remaining
                    </Text>
                  )}
                  {booking.status === 'ARRIVED' && (
                    <Text className="badge badge-amber">Technician at Doorstep</Text>
                  )}
                  {['IN_PROGRESS', 'COMPLETED'].includes(booking.status) && (
                    <Text className="badge badge-green">On-Site Treatment Active</Text>
                  )}
                </View>

                {/* Real OpenStreetMap View */}
                <RealLeafletMap
                  customerCoords={booking.coords || liveCustomerLocation}
                  workerCoords={workerPosition}
                  isLiveMove={booking.status === 'ON_THE_WAY'}
                  height="340px"
                />

                <View className="field-grid" style={{ marginTop: 16 }}>
                  <View className="field-box">
                    <View className="field-label">Target Treatment & Services</View>
                    <View className="field-value">{booking.pestLabel}</View>
                    <View className="field-sub">
                      {booking.planLabel} ({booking.sizeLabel})
                    </View>
                  </View>
                  <View className="field-box">
                    <View className="field-label">Pinned Customer Coordinates</View>
                    <View className="field-value">
                      Lat: {booking.coords?.lat || liveCustomerLocation.lat}, Lng: {booking.coords?.lng || liveCustomerLocation.lng}
                    </View>
                    <View className="field-sub">{booking.address}</View>
                  </View>
                </View>
              </View>

              {/* Live Safety Protocol Checklist */}
              {['IN_PROGRESS', 'COMPLETED'].includes(booking.status) && (
                <View className="web-card">
                  <View className="card-header-row">
                    <h3 className="card-title">
                      <ShieldCheck size={20} color="var(--success)" />
                      <Text>Live Technician Safety Protocol Feed</Text>
                    </h3>
                    <Text className="badge badge-green">
                      {safetyChecklist.filter(Boolean).length} of 6 Verified
                    </Text>
                  </View>
                  <View style={{ display: 'grid', gap: 10 }}>
                    {SAFETY_CHECKLIST_STEPS.map((st, idx) => {
                      const done = safetyChecklist[idx] || booking.status === 'COMPLETED';
                      return (
                        <View
                          key={idx}
                          className="field-box"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: done ? 'var(--success-light)' : 'var(--surface)',
                          }}
                        >
                          <View>
                            <View style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                              {idx + 1}. {st.title}
                            </View>
                            <View style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                              {st.description}
                            </View>
                          </View>
                          <Text className={`badge ${done ? 'badge-green' : 'badge-neutral'}`}>
                            {done ? 'Verified' : 'Pending'}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              )}
            </View>

            {/* RIGHT COLUMN: Doorstep OTP Handshake, End-of-Service Completion PIN, QR Payment & Review */}
            <View className="sticky-summary" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* 1. Doorstep Start OTP Card (Mocked until worker clicks Arrived) */}
              <View
                className="web-card"
                style={{
                  borderTop: '4px solid var(--accent)',
                  background: booking.status === 'ARRIVED' ? 'rgba(232, 163, 23, 0.12)' : 'var(--card)',
                }}
              >
                <View className="card-header-row">
                  <h3 className="card-title">
                    <KeyRound size={20} color="var(--primary)" />
                    <Text>Doorstep Treatment Start OTP</Text>
                  </h3>
                  <Text className={`badge ${['IN_PROGRESS', 'COMPLETED'].includes(booking.status) ? 'badge-green' : booking.status === 'ARRIVED' ? 'badge-amber' : 'badge-neutral'}`}>
                    {['IN_PROGRESS', 'COMPLETED'].includes(booking.status)
                      ? '✓ Verified by Tech'
                      : booking.status === 'ARRIVED'
                      ? '✓ Tech at Doorstep'
                      : 'Mocked • Tech En Route'}
                  </Text>
                </View>
                <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', lineHeight: 1.45, marginBottom: 14 }}>
                  {['IN_PROGRESS', 'COMPLETED'].includes(booking.status)
                    ? 'Technician verified this OTP upon doorstep arrival. Chemical treatment is active.'
                    : booking.status === 'ARRIVED'
                    ? 'Technician Arjun Sharma has arrived at your doorstep! Share this 4-digit OTP with the technician to begin treatment:'
                    : 'Technician is en route. This Start OTP is mocked/locked and will automatically reveal on your screen when technician clicks "I Have Arrived" at your doorstep.'}
                </p>

                {/* Live digits shown ONLY when worker has arrived or verified */}
                {['ARRIVED', 'IN_PROGRESS', 'COMPLETED'].includes(booking.status) ? (
                  <View
                    style={{
                      display: 'flex',
                      gap: 12,
                      justifyContent: 'center',
                      padding: '14px',
                      background: '#FFFFFF',
                      borderRadius: 14,
                      border: ['IN_PROGRESS', 'COMPLETED'].includes(booking.status) ? '2px solid var(--success)' : '2.5px solid var(--accent)',
                    }}
                  >
                    {String(startOtp || booking?.startOtp || '4829')
                      .split('')
                      .map((d, i) => (
                        <View
                          key={i}
                          style={{
                            width: 54,
                            height: 60,
                            borderRadius: 12,
                            background: ['IN_PROGRESS', 'COMPLETED'].includes(booking.status) ? 'var(--primary-light)' : 'rgba(232, 163, 23, 0.15)',
                            border: '1.5px solid var(--border-strong)',
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
                        </View>
                      ))}
                  </View>
                ) : (
                  /* Mocked dots before arrival */
                  <View
                    style={{
                      display: 'flex',
                      gap: 12,
                      justifyContent: 'center',
                      padding: '14px',
                      background: 'var(--surface)',
                      borderRadius: 14,
                      border: '2px dashed var(--border-strong)',
                    }}
                  >
                    {['•', '•', '•', '•'].map((dot, i) => (
                      <View
                        key={i}
                        style={{
                          width: 54,
                          height: 60,
                          borderRadius: 12,
                          background: '#FFFFFF',
                          border: '1px solid var(--border-strong)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.8rem',
                          color: 'var(--ink-muted)',
                          fontWeight: 800,
                        }}
                      >
                        {dot}
                      </View>
                    ))}
                  </View>
                )}
              </View>

              {/* 2. End-of-Service Completion Security PIN Card */}
              <View
                className="web-card"
                style={{
                  borderTop: '4px solid var(--primary)',
                  background: (customerReview || booking.status === 'COMPLETED')
                    ? 'var(--primary-light)'
                    : workCompletedByWorker
                    ? 'rgba(232, 163, 23, 0.08)'
                    : 'var(--surface)',
                }}
              >
                <View className="card-header-row">
                  <h3 className="card-title">
                    <Award size={20} color="var(--primary)" />
                    <Text>End-of-Service Completion Security PIN</Text>
                  </h3>
                  <Text className={`badge ${(customerReview || booking.status === 'COMPLETED') ? 'badge-green' : workCompletedByWorker ? 'badge-amber' : 'badge-neutral'}`}>
                    {(customerReview || booking.status === 'COMPLETED')
                      ? '✓ Review Submitted — PIN Unlocked'
                      : workCompletedByWorker
                      ? 'Work Finished — Review Required'
                      : 'Mocked (Locked)'}
                  </Text>
                </View>

                {/* State A: Treatment in progress, work not completed yet */}
                {!workCompletedByWorker && booking.status !== 'COMPLETED' && (
                  <View style={{ textAlign: 'center', padding: '16px', background: '#FFFFFF', borderRadius: 12, border: '1px dashed var(--border-strong)' }}>
                    <Lock size={26} color="var(--ink-muted)" style={{ margin: '0 auto 8px' }} />
                    <View style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--ink)' }}>
                      PIN is Mocked & Locked
                    </View>
                    <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginTop: 4, lineHeight: 1.45 }}>
                      Technician Arjun Sharma is performing the treatment. Once technician clicks "Complete Work" in their dashboard, you will be prompted to submit your review to reveal this PIN.
                    </p>
                    <View style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 12 }}>
                      {['•', '•', '•', '•'].map((dot, i) => (
                        <View
                          key={i}
                          style={{
                            width: 50,
                            height: 54,
                            borderRadius: 10,
                            background: 'var(--surface)',
                            border: '1px solid var(--border-strong)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.8rem',
                            color: 'var(--ink-muted)',
                            fontWeight: 800,
                          }}
                        >
                          {dot}
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {/* State B: Work marked completed by technician -> customer must give review to unlock PIN */}
                {workCompletedByWorker && !customerReview && booking.status !== 'COMPLETED' && (
                  <View style={{ background: '#FFFFFF', padding: '16px', borderRadius: 12, border: '1.5px solid var(--accent)' }}>
                    <View style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: 'var(--primary-dark)', fontWeight: 800, fontSize: '0.94rem' }}>
                      <Sparkles size={18} color="var(--accent)" />
                      <Text>Technician Completed Work! Submit Review to View PIN</Text>
                    </View>
                    <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginBottom: 12, lineHeight: 1.45 }}>
                      Technician Arjun Sharma finished all treatment steps. <b>Please rate your service below to reveal your 4-digit Completion PIN:</b>
                    </p>

                    {/* Star Rating Buttons */}
                    <View style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <TouchableOpacity
                          key={n}
                          type="button"
                          className={`btn ${stars >= n ? 'btn-accent' : 'btn-outline'} btn-sm`}
                          onClick={() => setStars(n)}
                        >
                          <Star size={15} fill={stars >= n ? 'currentColor' : 'none'} /> {n}★
                        </TouchableOpacity>
                      ))}
                    </View>

                    {/* Feedback Tags */}
                    <View style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                      {['Punctual & Polite', 'Thorough 6-Step Safety', '100% Eco-Safe', 'Spotless Cleanup'].map((tag) => (
                        <TouchableOpacity
                          key={tag}
                          type="button"
                          className="badge badge-neutral"
                          style={{ cursor: 'pointer', border: '1px solid var(--border-strong)', padding: '4px 8px', fontSize: '0.76rem' }}
                          onClick={() => setComment((prev) => prev ? `${prev}, ${tag}` : tag)}
                        >
                          + {tag}
                        </TouchableOpacity>
                      ))}
                    </View>

                    <TextInput
                      type="text"
                      className="form-input"
                      style={{ marginBottom: 12 }}
                      placeholder="Add review feedback for technician & agency..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />

                    <TouchableOpacity
                      type="button"
                      className="btn btn-primary btn-block btn-lg"
                      onClick={async () => {
                        await submitCustomerReview(stars, comment || 'Punctual, eco-safe, and very thorough treatment!');
                        toast('Review submitted! Completion PIN unlocked and revealed below.', 'success');
                      }}
                    >
                      <CheckCircle2 size={18} /> Submit Review & Reveal Completion PIN
                    </TouchableOpacity>

                    <View style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12 }}>
                      {['•', '•', '•', '•'].map((dot, i) => (
                        <View
                          key={i}
                          style={{
                            width: 44,
                            height: 48,
                            borderRadius: 8,
                            background: 'var(--surface)',
                            border: '1px dashed var(--border-strong)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.6rem',
                            color: 'var(--ink-muted)',
                            fontWeight: 800,
                          }}
                        >
                          {dot}
                        </View>
                      ))}
                    </View>
                    <Text style={{ display: 'block', textAlign: 'center', fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: 4 }}>
                      (PIN reveals immediately after clicking submit above)
                    </Text>
                  </View>
                )}

                {/* State C: Customer submitted review OR status is COMPLETED -> PIN is REVEALED */}
                {(customerReview || booking.status === 'COMPLETED') && (
                  <View>
                    <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', lineHeight: 1.45, marginBottom: 12 }}>
                      Thank you for your {customerReview?.rating || 5}★ review! Share this 4-digit Completion PIN with your technician so they can verify completion:
                    </p>
                    <View
                      style={{
                        display: 'flex',
                        gap: 12,
                        justifyContent: 'center',
                        padding: '14px',
                        background: '#FFFFFF',
                        borderRadius: 14,
                        border: '2px solid var(--primary)',
                        marginBottom: 14,
                      }}
                    >
                      {String(completionPin || '7391')
                        .split('')
                        .map((d, i) => (
                          <View
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
                          </View>
                        ))}
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <TouchableOpacity
                        type="button"
                        className="btn btn-success btn-block btn-lg"
                        onClick={() => setQrModal(true)}
                      >
                        <QrCode size={18} /> Open Payment Scanner Link / Pay UPI (Rs. {rawTotal})
                      </TouchableOpacity>
                      <View style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                        Scan the official UPI QR code on technician's phone or click above to pay online
                      </View>
                    </View>
                  </View>
                )}
              </View>

              {/* 3. Assigned Technician & Agency Verification */}
              <View className="web-card">
                <View className="card-header-row">
                  <h3 className="card-title">
                    <UserCheck size={20} color="var(--primary)" />
                    <Text>Assigned Technician & Agency Verification</Text>
                  </h3>
                  <Text className="badge badge-green">KYC Verified</Text>
                </View>

                <View className="field-grid" style={{ marginBottom: 14 }}>
                  <View className="field-box">
                    <View className="field-label">Technician Name</View>
                    <View className="field-value">{assignedWorker?.name || 'Arjun Sharma'}</View>
                    <View className="field-sub">
                      Rating: {assignedWorker?.rating || 4.92} Stars (428 jobs)
                    </View>
                  </View>
                  <View className="field-box">
                    <View className="field-label">Government License</View>
                    <View className="field-value">{assignedWorker?.licenseCode || 'CHL-2024-889'}</View>
                    <View className="field-sub">CIB&RC Registered Applicator</View>
                  </View>
                </View>

                <View className="field-box" style={{ marginBottom: 16 }}>
                  <View className="field-label">
                    {contactUnlocked ? <Unlock size={13} /> : <Lock size={13} />}
                    <Text>Agency Communication Line</Text>
                  </View>
                  <View className="field-value">
                    {contactUnlocked
                      ? assignedWorker?.phone || '+91 98765 43210 (Direct Unlocked)'
                      : assignedWorker?.proxyPhone || '+91 80 4912 3456 (Masked Agency Proxy)'}
                  </View>
                  <View className="field-sub">
                    {contactUnlocked
                      ? 'Agency approved - Direct communication active'
                      : 'Personal phone is protected through agency bridge'}
                  </View>
                </View>

                <View style={{ display: 'flex', gap: 10 }}>
                  <a
                    href="tel:+919876543210"
                    className="btn btn-outline btn-sm"
                    onClick={() => toast('Connecting call to technician...', 'info')}
                  >
                    <Phone size={15} /> Call Technician
                  </a>
                  {canCancel() ? (
                    <TouchableOpacity
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={async () => {
                        await cancelBooking();
                        toast('Booking cancelled with zero penalty.', 'info');
                      }}
                    >
                      <X size={15} /> Cancel Booking
                    </TouchableOpacity>
                  ) : (
                    <Text className="badge badge-neutral" style={{ marginLeft: 'auto' }}>
                      Cancellation locked once technician is en route
                    </Text>
                  )}
                </View>
              </View>

              {/* 4. Payment Card (Direct Trigger) */}
              {(booking.status === 'COMPLETED' || pinVerifiedByWorker || paymentQrGenerated || customerPaid) && (
                <View className="web-card" style={{ borderTop: '4px solid var(--success)', background: '#FFFFFF' }}>
                  <View className="card-header-row">
                    <h3 className="card-title">
                      <QrCode size={20} color="var(--success)" />
                      <Text>Doorstep Payment & Invoice</Text>
                    </h3>
                    <Text className={`badge ${customerPaid ? 'badge-green' : 'badge-amber'}`}>
                      {customerPaid ? '✓ Paid & Settled' : 'Payment Ready'}
                    </Text>
                  </View>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: 14 }}>
                    {customerPaid
                      ? 'Payment has been settled successfully! 90-Day Warranty Certificate is active in History.'
                      : `Scan the UPI QR code on technician's phone or click below to settle Rs. ${rawTotal}:`}
                  </p>
                  {!customerPaid ? (
                    <TouchableOpacity
                      type="button"
                      className="btn btn-success btn-lg btn-block"
                      onClick={() => setQrModal(true)}
                    >
                      <QrCode size={18} /> Open UPI Payment QR Code (Rs. {rawTotal})
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      type="button"
                      className="btn btn-outline btn-block"
                      onClick={() => onNavigate('history')}
                    >
                      <Award size={16} /> View 90-Day Warranty Certificate
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>
          {/* Interactive Payment QR & Warranty Modal */}
          <ModalDialog
            open={qrModal}
            onClose={() => setQrModal(false)}
            title={`Scan UPI QR & Complete Payment (Rs. ${rawTotal})`}
            icon={QrCode}
          >
            <View style={{ textAlign: 'center', padding: '10px 0' }}>
              <View
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
                <Image
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=pestfree@okaxis&pn=PestFree&am=${rawTotal}&cu=INR`}
                  alt="UPI Payment QR Code"
                  style={{ width: 170, height: 170 }}
                />
              </View>

              <View style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: 4 }}>
                Rs. {rawTotal} Total Payable
              </View>
              <View style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: 18 }}>
                Scan using Google Pay, PhonePe, Paytm, or BHIM UPI
              </View>

              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
          </ModalDialog>
        </>
      )}
    </View>
  );
}
function HistorySection({ toast, onNavigate }) {
  const { history, rebookFromHistory } = useAppStore();
  const [certModalItem, setCertModalItem] = useState(null);

  return (
    <View>
      <View className="dashboard-grid-3" style={{ marginBottom: 24 }}>
        <View className="web-card">
          <View className="field-label">Total Treatments</View>
          <View style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, marginTop: 6 }}>
            {history.length} Bookings
          </View>
          <View className="field-sub">100% CIB&RC Eco-Safe Formulations</View>
        </View>

        <View className="web-card">
          <View className="field-label">Active Warranty Cover</View>
          <View style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--success)', marginTop: 6 }}>
            Protected
          </View>
          <View className="field-sub">Free emergency re-service included</View>
        </View>

        <View className="web-card">
          <View className="field-label">Homeowner Loyalty Tier</View>
          <View style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginTop: 6 }}>
            Shield Member
          </View>
          <View className="field-sub">Priority dispatch in under 60 mins</View>
        </View>
      </View>

      <View className="web-card">
        <View className="card-header-row">
          <View>
            <h2 className="card-title">Past Bookings, Warranty Certificates & 1-Click Rebook</h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 2 }}>
              Inspect your chemical warranty certificates or pre-fill a repeat treatment in 1 click.
            </p>
          </View>
          <TouchableOpacity className="btn btn-primary btn-sm" onClick={() => onNavigate('book')}>
            <Bug size={15} /> Book New Service
          </TouchableOpacity>
        </View>

        <View className="web-table-wrap">
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
                      <View style={{ fontWeight: 700 }}>{item.pestLabel}</View>
                      <View style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                        {item.planLabel} • {item.sizeLabel}
                      </View>
                    </td>
                    <td style={{ maxWidth: 260 }}>
                      <View style={{ fontSize: '0.84rem' }}>{item.address}</View>
                    </td>
                    <td>
                      <View style={{ fontWeight: 600 }}>{item.technicianName || 'Arjun Sharma'}</View>
                      <View style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                        {item.licenseCode || 'CHL-2024-889'}
                      </View>
                    </td>
                    <td style={{ fontWeight: 800, color: 'var(--primary)' }}>Rs. {amt}</td>
                    <td>
                      <Text
                        className={`badge ${
                          item.status === 'COMPLETED' ? 'badge-green' : 'badge-red'
                        }`}
                      >
                        {item.status}
                      </Text>
                      {item.rating && (
                        <View style={{ fontSize: '0.78rem', color: '#8A5A00', fontWeight: 700, marginTop: 4 }}>
                          ★ {item.rating}/5 Rated
                        </View>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <View style={{ display: 'inline-flex', gap: 8 }}>
                        {item.status === 'COMPLETED' && (
                          <TouchableOpacity
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => setCertModalItem(item)}
                          >
                            <Award size={14} /> Warranty Certificate
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            rebookFromHistory(item);
                            onNavigate('book');
                            toast(`Pre-filled booking form from #${item.id}!`, 'success');
                          }}
                        >
                          <RefreshCw size={14} /> Rebook
                        </TouchableOpacity>
                      </View>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </View>
      </View>

      {/* Warranty Certificate Modal */}
      <ModalDialog
        open={Boolean(certModalItem)}
        onClose={() => setCertModalItem(null)}
        title={`CIB&RC Treatment & Warranty Certificate (#${certModalItem?.id})`}
        icon={Award}
      >
        {certModalItem && (
          <View style={{ display: 'grid', gap: 14 }}>
            <View
              className="web-card-surface"
              style={{
                border: '2px solid var(--primary)',
                background: 'var(--primary-light)',
              }}
            >
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <View style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)' }}>
                    Official Warranty Coverage
                  </View>
                  <View style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: 2 }}>
                    {certModalItem.warrantyDays || 90}-Day Free Re-Service Guarantee
                  </View>
                </View>
                <Text className="badge badge-green">Active Cover</Text>
              </View>
            </View>

            <View className="field-grid">
              <View className="field-box">
                <View className="field-label">Treatment Performed</View>
                <View className="field-value">{certModalItem.pestLabel}</View>
                <View className="field-sub">{certModalItem.planLabel}</View>
              </View>
              <View className="field-box">
                <View className="field-label">Certified Technician</View>
                <View className="field-value">{certModalItem.technicianName || 'Arjun Sharma'}</View>
                <View className="field-sub">Govt License: {certModalItem.licenseCode || 'CHL-2024-889'}</View>
              </View>
            </View>

            <View className="field-box">
              <View className="field-label">Approved Chemical Formulation Used</View>
              <View className="field-value">
                {certModalItem.chemicalUsed || 'Fipronil 0.05% Odorless Gel & Deltamethrin 2.5% EC'}
              </View>
            </View>

            <View className="field-box">
              <View className="field-label">Protected Property Address</View>
              <View className="field-value">{certModalItem.address}</View>
            </View>

            <View style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ModalDialog>
    </View>
  );
}

function SafetyGuideSection() {
  const [selectedSheet, setSelectedSheet] = useState(BUNDLED_CHEMICAL_SHEETS[0]);

  return (
    <View>
      <View className="dashboard-grid-2">
        <View className="web-card">
          <View className="card-header-row">
            <View>
              <h2 className="card-title">
                <ShieldCheck size={20} color="var(--primary)" />
                <Text>Homeowner Chemical Transparency & CIB&RC Guide</Text>
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                Every chemical used in your home is Government of India CIB&RC registered. Inspect child, pet, and re-entry safety notes below.
              </p>
            </View>
          </View>

          <View style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
            {BUNDLED_CHEMICAL_SHEETS.map((s) => (
              <TouchableOpacity
                key={s.id}
                type="button"
                className={`stage-pill-btn ${selectedSheet.id === s.id ? 'active' : ''}`}
                onClick={() => setSelectedSheet(s)}
              >
                {s.name}
              </TouchableOpacity>
            ))}
          </View>

          {selectedSheet && (
            <View className="web-card-surface">
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <View>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)' }}>
                    {selectedSheet.name}
                  </h3>
                  <View style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                    CIB&RC Reg: <strong>{selectedSheet.cibrcReg}</strong>
                  </View>
                </View>
                <Text className="badge badge-green">
                  Safe Re-Entry:{' '}
                  {selectedSheet.reEntryMinutes === 0
                    ? 'Immediate (0 mins)'
                    : `${selectedSheet.reEntryMinutes} mins`}
                </Text>
              </View>

              <View className="field-grid" style={{ marginBottom: 12 }}>
                <View className="field-box" style={{ background: '#FFFFFF' }}>
                  <View className="field-label">Active Ingredient</View>
                  <View className="field-value" style={{ fontSize: '0.9rem' }}>
                    {selectedSheet.activeIngredient}
                  </View>
                </View>
                <View className="field-box" style={{ background: '#FFFFFF' }}>
                  <View className="field-label">Target Pests Controlled</View>
                  <View className="field-value" style={{ fontSize: '0.9rem' }}>
                    {selectedSheet.targetPests}
                  </View>
                </View>
              </View>

              <View className="field-box" style={{ background: '#FFFFFF' }}>
                <View className="field-label">Homeowner First-Aid & Precaution Note</View>
                <View style={{ fontSize: '0.86rem', lineHeight: 1.5, marginTop: 4 }}>
                  {selectedSheet.firstAidSkinEye}
                </View>
              </View>
            </View>
          )}
        </View>

        <View className="web-card">
          <h2 className="card-title" style={{ marginBottom: 14 }}>
            <CheckCircle2 size={20} color="var(--success)" />
            <Text>6-Step Homeowner Preparation & Post-Care Checklist</Text>
          </h2>
          <View style={{ display: 'grid', gap: 10 }}>
            {SAFETY_CHECKLIST_STEPS.map((step, i) => (
              <View key={i} className="field-box">
                <View style={{ fontWeight: 800, color: 'var(--primary-dark)' }}>
                  Step {i + 1}: {step.title}
                </View>
                <View style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 3 }}>
                  {step.description}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('book');
  const [helpOpen, setHelpOpen] = useState(false);
  const [hasStartedBooking, setHasStartedBooking] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { booking, history, syncFromRemote } = useAppStore();
  const { toasts, show: toast } = useToast();

  useEffect(() => {
    syncFromRemote();
    const id = setInterval(() => syncFromRemote(), 3000);
    return () => clearInterval(id);
  }, [syncFromRemote]);

  // If active booking exists, auto-route to live tracking on refresh/mount and enable portal mode
  useEffect(() => {
    if (booking && booking.status !== 'CANCELLED') {
      setHasStartedBooking(true);
      if (['CONFIRMED', 'ASSIGNED', 'ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'COMPLETED'].includes(booking.status)) {
        setActiveSection('track');
      }
    }
  }, [booking?.status]);

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

  const isLandingView = !hasStartedBooking && (!booking || booking.status === 'CANCELLED');

  return (
    <View style={{ minHeight: '100vh', background: 'var(--canvas)' }}>
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
        <View style={{ display: 'grid', gap: 12 }}>
          <a
            href="tel:18001239999"
            className="btn btn-primary btn-lg btn-block"
            onClick={() => toast('Calling Easy HiCare 24x7 Concierge Desk...', 'info')}
          >
            <Phone size={18} /> Call Customer Support (1800-123-9999)
          </a>
          <a
            href="tel:1800112233"
            className="btn btn-outline btn-lg btn-block"
            onClick={() => toast('Calling CIB&RC Chemical Safety Desk...', 'info')}
          >
            <ShieldCheck size={18} /> CIB&RC Chemical Safety Helpline (1800-11-2233)
          </a>
        </View>
      </ModalDialog>

      {/* ────────────────────────────────────────────────────────────────────────── */}
      {/* 1. HERO LANDING PAGE (When Not Booked & Not In Booking Mode) - NO NAVBAR   */}
      {/* ────────────────────────────────────────────────────────────────────────── */}
      {isLandingView ? (
        <View style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* Top Brand Header */}
          <nav
            style={{
              padding: '16px 28px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border)',
              background: 'var(--surface)',
            }}
          >
            <View style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Image
                src="/easyhicare-logo.png"
                alt="Easy HiCare Logo"
                style={{ width: 46, height: 46, borderRadius: 12, objectFit: 'contain', background: '#FFFFFF', padding: 3, border: '1px solid var(--border)' }}
              />
              <View>
                <Text style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 900, color: 'var(--ink)' }}>
                  Easy HiCare
                </Text>
                <Text style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', fontWeight: 600 }}>
                  Pest Solutions &bull; Official Customer Portal
                </Text>
              </View>
            </View>

            <View style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Text className="badge badge-green" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>
                <ShieldCheck size={14} /> Govt Approved CIB&RC &bull; ISO 9001:2015
              </Text>
              <TouchableOpacity
                className="btn btn-outline btn-sm"
                onClick={() => setHelpOpen(true)}
              >
                <Phone size={14} /> 24x7 Helpline
              </TouchableOpacity>
            </View>
          </nav>

          {/* Hero Content Section */}
          <View className="hero-landing-wrap">
            <View className="hero-badge-pill">
              <Sparkles size={16} color="var(--accent)" />
              <Text>100% Odorless & Eco-Safe &bull; Safe for Children & Pets</Text>
            </View>

            <h1 className="hero-title">
              India's Most Trusted Certified Pest Solutions
            </h1>

            <p className="hero-subtitle">
              Guaranteed eradication with 60-minute doorstep arrival, background-checked certified applicators, government-approved CIB&RC odorless formulations, and an unconditional 90-day warranty.
            </p>

            {/* 4 Agency Stats Cards */}
            <View className="hero-stats-grid">
              <View className="kpi-card" style={{ borderLeft: '4px solid var(--primary)', textAlign: 'center', padding: '20px' }}>
                <View style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                  50,000+
                </View>
                <View style={{ fontWeight: 800, fontSize: '0.95rem', marginTop: 4 }}>Homes & Offices Treated</View>
                <View style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: 2 }}>Across Bengaluru South & Central</View>
              </View>

              <View className="kpi-card" style={{ borderLeft: '4px solid #E8A317', textAlign: 'center', padding: '20px' }}>
                <View style={{ fontSize: '2.1rem', fontWeight: 900, color: '#B87F0D', fontFamily: 'var(--font-heading)' }}>
                  99.4%
                </View>
                <View style={{ fontWeight: 800, fontSize: '0.95rem', marginTop: 4 }}>Customer Satisfaction</View>
                <View style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: 2 }}>Over 4.9★ Average Rating</View>
              </View>

              <View className="kpi-card" style={{ borderLeft: '4px solid var(--success)', textAlign: 'center', padding: '20px' }}>
                <View style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--success)', fontFamily: 'var(--font-heading)' }}>
                  120+
                </View>
                <View style={{ fontWeight: 800, fontSize: '0.95rem', marginTop: 4 }}>Licensed Applicators</View>
                <View style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: 2 }}>100% Police & KYC Verified</View>
              </View>

              <View className="kpi-card" style={{ borderLeft: '4px solid var(--primary-dark)', textAlign: 'center', padding: '20px' }}>
                <View style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--primary-dark)', fontFamily: 'var(--font-heading)' }}>
                  100%
                </View>
                <View style={{ fontWeight: 800, fontSize: '0.95rem', marginTop: 4 }}>CIB&RC Registered</View>
                <View style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: 2 }}>Non-toxic, low odor formulations</View>
              </View>
            </View>

            {/* Popular Treatments Showcase */}
            <View style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, width: '100%', marginBottom: 36 }}>
              {[
                { name: 'Cockroach Herbal Gel', tag: 'Top Seller', price: '₹1,199', desc: 'Dual-layer odorless baiting & crevice shield' },
                { name: 'Termite Drill & Inject', tag: 'Heavy Duty', price: '₹2,499', desc: 'Subterranean barrier with 3-year warranty' },
                { name: 'Bedbug Thermal Fogging', tag: 'Intensive', price: '₹1,699', desc: 'Double-coat mattress & seam deep steam' },
                { name: 'Mosquito Mist & Fogging', tag: 'Fast Action', price: '₹899', desc: 'Outdoor perimeter & drain larvicide spray' },
              ].map((svc, idx) => (
                <View
                  key={idx}
                  style={{
                    background: 'var(--surface)',
                    border: '1.5px solid var(--border)',
                    borderRadius: 14,
                    padding: 16,
                    textAlign: 'left',
                  }}
                >
                  <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <Text className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>{svc.tag}</Text>
                    <Text style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.95rem' }}>{svc.price}</Text>
                  </View>
                  <View style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--ink)' }}>{svc.name}</View>
                  <View style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: 4 }}>{svc.desc}</View>
                </View>
              ))}
            </View>

            {/* Central Call to Action */}
            <TouchableOpacity
              className="hero-cta-btn"
              testID="hero-book-demo-btn"
              onPress={() => {
                setHasStartedBooking(true);
                setActiveSection('book');
              }}
              onClick={() => {
                setHasStartedBooking(true);
                setActiveSection('book');
              }}
            >
              <Bug size={22} />
              <Text style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '1.2rem' }}>
                Book a Demo / Book Treatment →
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        /* ────────────────────────────────────────────────────────────────────────── */
        /* 2. CUSTOMER PORTAL / BOOKING & LIVE TRACKING WORKSPACE (WITH SIDEBAR)      */
        /* ────────────────────────────────────────────────────────────────────────── */
        <View className="web-layout">
          {/* Left Sidebar Navigation */}
          <View className={`web-sidebar ${mobileNavOpen ? 'mobile-open' : ''}`} accessibilityRole="navigation" aria-label="Customer Website Navigation">
            <View className="sidebar-brand">
              <Image
                src="/easyhicare-logo.png"
                alt="Easy HiCare Logo"
                style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'contain', background: '#FFFFFF', padding: 3 }}
              />
              <View>
                <Text className="brand-title" style={{ fontSize: '1.15rem', fontWeight: 800 }}>Easy HiCare</Text>
                <Text className="brand-subtitle" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)' }}>Pest Solutions &bull; Customer</Text>
              </View>
            </View>

            <View className="sidebar-customer-card">
              <View className="customer-avatar-row">
                <View className="customer-avatar">AK</View>
                <View>
                  <Text className="customer-name">Aarav Sharma</Text>
                  <Text className="customer-meta">Jayanagar 4th Block, BLR</Text>
                </View>
              </View>
              <View className="customer-badges">
                <Text className="sidebar-badge">
                  <Lock size={11} /> Agency Verified
                </Text>
                <Text className="sidebar-badge">
                  <Award size={11} /> 90d Warranty
                </Text>
              </View>
            </View>

            <View className="sidebar-nav">
              <Text className="nav-section-label">Customer Portal</Text>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
                    onPress={() => {
                      setActiveSection(item.id);
                      setMobileNavOpen(false);
                    }}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileNavOpen(false);
                    }}
                    accessibilityRole="button"
                  >
                    <Icon size={19} />
                    <Text style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.label}</Text>
                    <Text className="nav-pill-count">{item.badge}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={{ padding: '0 14px 14px' }}>
              <TouchableOpacity
                className="btn btn-outline btn-block"
                style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)', marginBottom: 8 }}
                onClick={() => setHasStartedBooking(false)}
              >
                ← Back to Home
              </TouchableOpacity>
              <TouchableOpacity
                className="btn btn-accent btn-block"
                onPress={() => setHelpOpen(true)}
                onClick={() => setHelpOpen(true)}
                accessibilityRole="button"
              >
                <Phone size={16} /> <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>24x7 Customer Helpline</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Main Content */}
          <View className="web-main">
            <View className="web-topbar">
              <View style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <TouchableOpacity
                  className="btn btn-outline btn-sm mobile-menu-btn"
                  style={{ display: 'none', padding: '6px 10px' }}
                  onClick={() => setMobileNavOpen(!mobileNavOpen)}
                >
                  <Menu size={18} />
                </TouchableOpacity>
                <View>
                  <View style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                    <Text className="topbar-title" style={{ fontSize: '1.45rem', fontWeight: 800 }}>
                      {headers[activeSection]?.title || 'Customer Portal'}
                    </Text>
                    <Text className="badge badge-green" style={{ fontSize: '0.75rem', padding: '3px 8px' }}>
                      Govt Approved CIB&RC &bull; 100% Eco-Safe Formulations
                    </Text>
                  </View>
                  <Text className="topbar-subtitle">
                    {headers[activeSection]?.subtitle || 'Certified Pest Solutions'}
                  </Text>
                </View>
              </View>

              <View className="topbar-right">
                {booking && booking.status !== 'CANCELLED' ? (
                  <TouchableOpacity
                    className="btn btn-primary btn-sm"
                    onPress={() => setActiveSection('track')}
                    onClick={() => setActiveSection('track')}
                    accessibilityRole="button"
                  >
                    <Navigation size={14} /> <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Active Booking #{booking.id} &bull; {booking.status.replace(/_/g, ' ')}</Text>
                  </TouchableOpacity>
                ) : (
                  <Text className="badge badge-green">
                    <ShieldCheck size={14} /> 100% CIB&RC Certified Technicians
                  </Text>
                )}
              </View>
            </View>

            <View className="web-page">
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
            </View>
          </View>
        </View>
      )}
    </View>
  );
}


import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, StyleSheet, Platform } from './lib/rn.jsx';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Briefcase,
  MapPin,
  Wallet,
  AlertTriangle,
  AlertCircle,
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
          <Text style={{ fontWeight: 700 }}>Live Operations Progression &bull; Stage {activeIdx + 1} of {LIFECYCLE_STAGES.length}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)' }}>
            Mission Execution:
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
          const Icon = st.icon || CheckCircle2;

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
                <Icon size={20} strokeWidth={isCurrent ? 2.5 : 2} />
              </View>

              <View>
                <Text className="step-title-v2">{st.label}</Text>
                <Text className="step-sub-v2">{st.sub}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
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
        html: `<View style="background:#E8A317; color:#1D2B1A; border:2px solid #FFFFFF; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 10px rgba(0,0,0,0.3); font-weight:800; font-size:15px;">🏠</View>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
      window.L.marker([cLat, cLng], { icon: custIcon })
        .addTo(map)
        .bindPopup('<b>Customer Destination Pinned</b>');

      // Worker Live Scooter Pin
      const techIcon = window.L.divIcon({
        className: 'custom-pin-icon',
        html: `<View style="position:relative; width:36px; height:36px; display:flex; align-items:center; justify-content:center;">
          <View style="position:absolute; width:100%; height:100%; border-radius:50%; background:rgba(31,91,58,0.35); animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></View>
          <View style="background:#1F5B3A; color:#FFFFFF; border:2px solid #FFFFFF; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 10px rgba(0,0,0,0.3); font-size:13px;">🛵</View>
        </View>`,
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
    <View
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
      <View ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </View>
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
    <View>
      {/* High-Tech Dispatch Simulator Console */}
      <View
        className="demo-toolbar"
        style={{
          background: 'linear-gradient(135deg, rgba(31,91,58,0.06), rgba(232,163,23,0.06))',
          border: '1.5px solid rgba(31,91,58,0.2)',
          padding: '14px 18px',
          borderRadius: 16,
          marginBottom: 20,
        }}
      >
        <View className="demo-toolbar-label" style={{ color: 'var(--primary-dark)', fontSize: '0.86rem' }}>
          <Sparkles size={18} color="#E8A317" style={{ filter: 'drop-shadow(0 0 6px #E8A317)' }} />
          <Text>Interactive Dispatch State Simulator:</Text>
        </View>
        <View className="demo-stage-pills">
          {LIFECYCLE_STAGES.map((st) => (
            <TouchableOpacity
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
              <Text>{st.step}. {st.label}</Text>
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
            <Briefcase size={32} />
          </View>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 8 }}>
            No Active Dispatch Assigned Right Now
          </h2>
          <p style={{ color: 'var(--ink-muted)', maxWidth: 520, margin: '0 auto 24px', lineHeight: 1.5 }}>
            You are currently online. Place a booking from the Customer App (port 3000) or simulate an incoming booking below.
          </p>
          <View style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <TouchableOpacity
              className="btn btn-primary btn-lg"
              onClick={() => {
                simulateIncomingJob('BOOKING_PLACED');
                toast('New incoming booking placed! Waiting for Agency 1-time approval.', 'info');
              }}
            >
              <Play size={18} /> Load New Incoming Booking (Awaiting Agency)
            </TouchableOpacity>
            <TouchableOpacity
              className="btn btn-outline btn-lg"
              onClick={() => onNavigate('route')}
            >
              <MapPin size={18} /> View Today's Route Schedule
            </TouchableOpacity>
          </View>
        </View>
      )}

      {booking && booking.status !== 'CANCELLED' && (
        <>
          <LifecycleStepper currentStatus={booking.status} />

          {/* DEDICATED LIVE NAVIGATION & EXECUTION DASHBOARD (Opens upon Accept & Navigate) */}
          {inExecutionView && ['ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'COMPLETED'].includes(booking.status) ? (
            <View className="dashboard-grid-2">
              {/* LEFT COLUMN: Map Radar & Safety Checklist */}
              <View style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* 1. Map Radar Card */}
                <View className="web-card">
                  <View className="card-header-row">
                    <View>
                      <Text className="badge badge-neutral" style={{ marginBottom: 4 }}>
                        Booking #{booking.id}
                      </Text>
                      <h2 className="card-title" style={{ fontSize: '1.25rem' }}>
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

                  {/* Leaflet Map (Height 340px) */}
                  <WorkerMiniMap
                    customerCoords={booking.coords || liveCustomerLocation || { lat, lng }}
                    workerCoords={workerPosition || { lat: 12.9352, lng: 77.6245 }}
                    height="340px"
                  />

                  {/* 2 sub-boxes below map */}
                  <View className="field-grid" style={{ marginTop: 16 }}>
                    <View className="field-box">
                      <View className="field-label">TARGET TREATMENT & SERVICES</View>
                      <View className="field-value">{booking.pestLabel}</View>
                      <View className="field-sub">
                        {booking.planLabel} ({booking.sizeLabel})
                      </View>
                    </View>
                    <View className="field-box">
                      <View className="field-label">PINNED CUSTOMER COORDINATES</View>
                      <View className="field-value">
                        Lat: {Number(lat).toFixed(4)}, Lng: {Number(lng).toFixed(4)}
                      </View>
                      <View className="field-sub">{booking.address}</View>
                    </View>
                  </View>
                </View>

                {/* 2. Travel Action Bar (When ON_THE_WAY) */}
                {booking.status === 'ON_THE_WAY' && (
                  <View className="web-card">
                    <View className="card-header-row">
                      <h3 className="card-title">
                        <Navigation size={18} color="var(--primary)" />
                        <Text>En Route to Customer Doorstep</Text>
                      </h3>
                      {etaSeconds > 0 && (
                        <TouchableOpacity
                          className="btn btn-outline btn-sm"
                          onClick={() => {
                            fastForwardEta();
                            toast('Fast-forwarded travel timer to 0s!', 'info');
                          }}
                        >
                          <FastForward size={14} /> Skip Timer
                        </TouchableOpacity>
                      )}
                    </View>
                    <p style={{ color: 'var(--ink-muted)', fontSize: '0.85rem', marginBottom: 14 }}>
                      Travel in progress to {booking.address}. Once parked at gate, click below to mark arrival.
                    </p>
                    <TouchableOpacity
                      className="btn btn-primary btn-lg btn-block"
                      disabled={!canWorkerMarkArrived()}
                      onClick={async () => {
                        await workerMarkArrived();
                        toast('Marked Arrived! Ask homeowner for 4-digit Treatment Start OTP.', 'success');
                      }}
                    >
                      <MapPin size={18} />
                      {etaSeconds > 0
                        ? `Wait ${etaSeconds}s (or click Skip Timer) to Mark Arrived`
                        : 'Mark Arrived at Customer Doorstep'}
                    </TouchableOpacity>
                  </View>
                )}

                {/* 3. Safety Protocol Checklist (When ARRIVED, IN_PROGRESS, or COMPLETED) */}
                {['ARRIVED', 'IN_PROGRESS', 'COMPLETED'].includes(booking.status) && (
                  <View className="web-card">
                    <View className="card-header-row">
                      <h3 className="card-title">
                        <ShieldCheck size={20} color="var(--success)" />
                        <Text>Mandatory Safety Checklist & Protocol</Text>
                      </h3>
                      {booking.status === 'IN_PROGRESS' && (
                        <TouchableOpacity
                          className="btn btn-outline btn-sm"
                          onClick={() => {
                            checkAllSafetySteps();
                            toast('All 6 safety steps ticked!', 'success');
                          }}
                        >
                          <Check size={14} /> Check All 6 Steps
                        </TouchableOpacity>
                      )}
                    </View>

                    <View className="checklist-stack" style={{ marginTop: 10 }}>
                      {SAFETY_CHECKLIST_STEPS.map((step, i) => {
                        const isChecked = safetyChecklist[i];
                        return (
                          <View
                            key={i}
                            className={`checklist-row ${isChecked ? 'checked' : ''}`}
                            onClick={() => {
                              if (booking.status === 'IN_PROGRESS') toggleSafetyStep(i);
                            }}
                          >
                            <View className="custom-checkbox">
                              {isChecked && <Check size={15} strokeWidth={3} />}
                            </View>
                            <View>
                              <View style={{ fontWeight: 700, fontSize: '0.90rem' }}>
                                {i + 1}. {step.title}
                              </View>
                              <View style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                                {step.description}
                              </View>
                            </View>
                          </View>
                        );
                      })}
                    </View>

                    <View className="web-card-surface" style={{ marginTop: 14 }}>
                      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View>
                          <View style={{ fontWeight: 700, fontSize: '0.90rem' }}>
                            Post-Treatment Barrier Photo Proof
                          </View>
                          <View style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                            {afterPhotoTaken
                              ? 'Timestamped photo attached & verified.'
                              : 'Required before unlocking completion PIN.'}
                          </View>
                        </View>
                        {afterPhotoTaken ? (
                          <Text className="badge badge-green">
                            <CheckCircle2 size={14} /> Photo Attached
                          </Text>
                        ) : (
                          <TouchableOpacity
                            className="btn btn-outline btn-sm"
                            disabled={booking.status !== 'IN_PROGRESS'}
                            onClick={() => {
                              captureAfterPhoto();
                              toast('After-treatment photo captured and attached!', 'success');
                            }}
                          >
                            <Camera size={15} /> Capture Photo
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                )}
              </View>

              {/* RIGHT COLUMN: Start OTP, Completion PIN, Agency Info, and Payment QR */}
              <View className="sticky-summary" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* 0. Top Action Button: Arrive at Doorstep (When En Route) */}
                {booking.status === 'ON_THE_WAY' && (
                  <TouchableOpacity
                    type="button"
                    className="btn btn-primary btn-block btn-lg"
                    style={{ background: 'var(--primary)', color: '#FFFFFF', boxShadow: '0 6px 18px rgba(31,91,58,0.35)' }}
                    onClick={async () => {
                      await workerMarkArrived();
                      toast('Technician arrived at doorstep! Ask customer for Start OTP.', 'success');
                    }}
                  >
                    <MapPin size={20} /> I Have Arrived / Reached Doorstep
                  </TouchableOpacity>
                )}

                {/* 1. Doorstep Treatment Start OTP */}
                <View className="web-card">
                  <View className="card-header-row">
                    <h3 className="card-title">
                      <KeyRound size={20} color="var(--primary)" />
                      <Text>Doorstep Treatment Start OTP</Text>
                    </h3>
                    <Text className={`badge ${['IN_PROGRESS', 'COMPLETED'].includes(booking.status) ? 'badge-green' : booking.status === 'ARRIVED' ? 'badge-amber' : 'badge-neutral'}`}>
                      {['IN_PROGRESS', 'COMPLETED'].includes(booking.status) ? '✓ Verified & Started' : booking.status === 'ARRIVED' ? 'Enter Customer OTP' : 'Awaiting Doorstep Arrival'}
                    </Text>
                  </View>
                  <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginBottom: 14, lineHeight: 1.45 }}>
                    {['IN_PROGRESS', 'COMPLETED'].includes(booking.status)
                      ? 'Customer Doorstep OTP was verified successfully. Chemical treatment active.'
                      : booking.status === 'ARRIVED'
                      ? 'Ask homeowner for the 4-digit code shown on their tracking screen, then enter it below:'
                      : 'Reach customer location and click "I Have Arrived" above to enter customer Start OTP.'}
                  </p>

                  {/* State 1: Verified */}
                  {['IN_PROGRESS', 'COMPLETED'].includes(booking.status) ? (
                    <View
                      style={{
                        display: 'flex',
                        gap: 12,
                        justifyContent: 'center',
                        padding: '12px',
                        background: 'var(--primary-light)',
                        borderRadius: 14,
                        border: '1.5px solid var(--primary)',
                      }}
                    >
                      {String(startOtp || booking?.startOtp || '4829')
                        .split('')
                        .map((d, i) => (
                          <View
                            key={i}
                            style={{
                              width: 48,
                              height: 54,
                              borderRadius: 10,
                              background: 'var(--primary)',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontFamily: 'var(--font-heading)',
                              fontSize: '1.6rem',
                              fontWeight: 800,
                            }}
                          >
                            {d}
                          </View>
                        ))}
                    </View>
                  ) : booking.status === 'ARRIVED' ? (
                    /* State 2: At doorstep -> Input fields to enter customer's OTP */
                    <View>
                      <View style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                        <TouchableOpacity className="btn btn-outline btn-sm" onClick={fillDemoOtp}>
                          Auto-Fill Customer OTP ({startOtp || booking?.startOtp || '4829'})
                        </TouchableOpacity>
                      </View>
                      <View className="otp-row" style={{ marginBottom: 12 }}>
                        {otpDigits.map((digit, i) => (
                          <TextInput
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
                      </View>
                      {otpError && (
                        <View style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: '8px 12px', borderRadius: 8, fontSize: '0.82rem', marginBottom: 10, textAlign: 'center' }}>
                          {otpError}
                        </View>
                      )}
                      <TouchableOpacity
                        className="btn btn-primary btn-block btn-lg"
                        disabled={otpDigits.join('').length < 4}
                        onClick={handleVerifyOtp}
                      >
                        <CheckCircle2 size={18} /> Verify Start OTP & Begin Treatment
                      </TouchableOpacity>
                    </View>
                  ) : (
                    /* State 3: Not arrived yet -> placeholder boxes */
                    <View style={{ textAlign: 'center', padding: '16px', background: 'var(--surface)', borderRadius: 12, border: '1px dashed var(--border-strong)' }}>
                      <Text style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>
                        Input slots unlock when you click "I Have Arrived / Reached Doorstep" above.
                      </Text>
                      <View style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 10 }}>
                        {['•', '•', '•', '•'].map((dot, i) => (
                          <View
                            key={i}
                            style={{
                              width: 44,
                              height: 48,
                              borderRadius: 8,
                              background: '#FFFFFF',
                              border: '1px solid var(--border-strong)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.4rem',
                              color: 'var(--ink-muted)',
                            }}
                          >
                            {dot}
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </View>

                {/* 2. End-of-Service Completion Security PIN */}
                <View className="web-card">
                  <View className="card-header-row">
                    <h3 className="card-title">
                      <Award size={20} color="var(--success)" />
                      <Text>End-of-Service Completion Security PIN</Text>
                    </h3>
                    <Text className={`badge ${pinVerifiedByWorker || booking.status === 'COMPLETED' ? 'badge-green' : workCompletedByWorker ? 'badge-amber' : 'badge-neutral'}`}>
                      {pinVerifiedByWorker || booking.status === 'COMPLETED' ? '✓ PIN Verified & Closed' : workCompletedByWorker ? 'Enter Customer PIN' : 'Treatment in Progress'}
                    </Text>
                  </View>

                  {pinVerifiedByWorker || booking.status === 'COMPLETED' ? (
                    /* State 1: Verified */
                    <View>
                      <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginBottom: 12, lineHeight: 1.45 }}>
                        Customer Completion PIN verified! Chemical treatment ticket is officially closed.
                      </p>
                      <View
                        style={{
                          display: 'flex',
                          gap: 12,
                          justifyContent: 'center',
                          padding: '12px',
                          background: 'var(--primary-light)',
                          borderRadius: 14,
                          border: '1.5px solid var(--primary)',
                        }}
                      >
                        {String(completionPin || '7391')
                          .split('')
                          .map((d, i) => (
                            <View
                              key={i}
                              style={{
                                width: 48,
                                height: 54,
                                borderRadius: 10,
                                background: 'var(--primary)',
                                color: '#FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.6rem',
                                fontWeight: 800,
                              }}
                            >
                              {d}
                            </View>
                          ))}
                      </View>
                    </View>
                  ) : workCompletedByWorker ? (
                    /* State 2: Work finished -> Worker inputs customer's completion PIN */
                    <View>
                      <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginBottom: 12, lineHeight: 1.45 }}>
                        {customerReview
                          ? 'Customer has submitted their review! Ask them for the 4-digit Completion PIN displayed on their screen and enter it below:'
                          : 'Waiting for customer to submit review in Customer App. Once customer reviews, enter their 4-digit PIN below:'}
                      </p>
                      <View style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8, gap: 6, flexWrap: 'wrap' }}>
                        {!customerReview && (
                          <TouchableOpacity
                            className="btn btn-outline btn-sm"
                            onClick={async () => {
                              await workerSimulateCustomerReview();
                              toast('Simulated customer 5-star review! PIN is now unlocked.', 'success');
                            }}
                          >
                            Simulate Customer Review
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity className="btn btn-outline btn-sm" onClick={fillDemoCompPin}>
                          Auto-Fill PIN ({completionPin || '7391'})
                        </TouchableOpacity>
                      </View>
                      <View className="otp-row" style={{ marginBottom: 12 }}>
                        {compPinDigits.map((digit, i) => (
                          <TextInput
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
                      </View>
                      {compPinError && (
                        <View style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: '8px 12px', borderRadius: 8, fontSize: '0.82rem', marginBottom: 10, textAlign: 'center' }}>
                          {compPinError}
                        </View>
                      )}
                      <TouchableOpacity
                        className="btn btn-success btn-block btn-lg"
                        disabled={compPinDigits.join('').length < 4}
                        onClick={handleVerifyCompPin}
                      >
                        <CheckCircle2 size={18} /> Verify Completion PIN & Generate Payment QR
                      </TouchableOpacity>
                    </View>
                  ) : booking.status === 'IN_PROGRESS' ? (
                    /* State 3: Treatment in progress -> Worker completes work */
                    <View>
                      <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginBottom: 14, lineHeight: 1.45 }}>
                        Carry out chemical barrier treatment and PPE checks. When finished, click below to notify customer to submit review and reveal their 4-digit PIN:
                      </p>
                      <TouchableOpacity
                        type="button"
                        className="btn btn-primary btn-block btn-lg"
                        onClick={async () => {
                          await workerMarkWorkFinished();
                          toast('Treatment completed! Customer notified to submit review.', 'success');
                        }}
                      >
                        <CheckCircle2 size={18} /> Complete My Work (Request Customer Review)
                      </TouchableOpacity>
                    </View>
                  ) : (
                    /* State 4: Not yet in progress */
                    <View style={{ textAlign: 'center', padding: '14px', background: 'var(--surface)', borderRadius: 12, border: '1px dashed var(--border-strong)' }}>
                      <Text style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>
                        PIN locked until chemical treatment is active and marked complete.
                      </Text>
                    </View>
                  )}
                </View>

                {/* 2B. Official Payment QR Code (Generated in Worker UI after Completion PIN is verified) */}
                {(pinVerifiedByWorker || paymentQrGenerated || Boolean(customerReview) || booking.status === 'COMPLETED') && (
                  <View className="web-card" style={{ borderTop: '4px solid var(--success)', background: '#FFFFFF' }}>
                    <View className="card-header-row">
                      <h3 className="card-title">
                        <QrCode size={20} color="var(--success)" />
                        <Text>Doorstep Payment Invoice & UPI QR</Text>
                      </h3>
                      <Text className={`badge ${customerPaid ? 'badge-green' : 'badge-amber'}`}>
                        {customerPaid ? 'Paid & Settled' : 'Awaiting Payment'}
                      </Text>
                    </View>
                    <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginBottom: 14, lineHeight: 1.45 }}>
                      Show this official QR code to the customer for instant doorstep settlement via Google Pay, PhonePe, Paytm, or BHIM:
                    </p>

                    <View style={{ textAlign: 'center', padding: '12px 0' }}>
                      <View
                        style={{
                          width: 190,
                          height: 190,
                          margin: '0 auto 12px',
                          background: '#FFFFFF',
                          borderRadius: 14,
                          border: '2px solid var(--border-strong)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                      >
                        <Image
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=upi://pay?pa=pestfree.dispatch@icici&pn=PestFree&am=${rawPrice}&cu=INR`}
                          alt="UPI QR Code"
                          style={{ width: 165, height: 165 }}
                        />
                      </View>

                      <View style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: 4 }}>
                        Rs. {rawPrice} Total Invoice
                      </View>
                      <View style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginBottom: 14 }}>
                        UPI ID: pestfree.dispatch@icici &bull; Technician Payout: Rs. {workerPayout}
                      </View>

                      {!customerPaid ? (
                        <TouchableOpacity
                          type="button"
                          className="btn btn-success btn-block btn-lg"
                          onClick={async () => {
                            await workerConfirmPaymentReceived();
                            toast('Payment confirmed! Job settled and payout credited.', 'success');
                          }}
                        >
                          <CheckCircle2 size={18} /> Confirm Payment Received (UPI / Cash)
                        </TouchableOpacity>
                      ) : (
                        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--success)', fontWeight: 800 }}>
                          <CheckCircle2 size={20} /> Payment Confirmed & Settled to Wallet!
                        </View>
                      )}
                    </View>
                  </View>
                )}

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
                      <View className="field-label">TECHNICIAN NAME</View>
                      <View className="field-value">Arjun Sharma</View>
                      <View className="field-sub">Rating: 4.92 Stars (428 jobs)</View>
                    </View>
                    <View className="field-box">
                      <View className="field-label">GOVERNMENT LICENSE</View>
                      <View className="field-value">CHL-2024-889</View>
                      <View className="field-sub">CIB&RC Registered Applicator</View>
                    </View>
                  </View>

                  <View className="field-box" style={{ marginBottom: 14 }}>
                    <View className="field-label">
                      <Lock size={12} style={{ display: 'inline', marginRight: 4 }} />
                      AGENCY COMMUNICATION LINE
                    </View>
                    <View className="field-value">{booking.customerRealPhone || '+91 98450 67890'}</View>
                    <View className="field-sub">Agency approved &bull; Direct communication active</View>
                  </View>

                  <View style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <a
                      href={`tel:${booking.customerRealPhone || '+919845067890'}`}
                      className="btn btn-outline btn-sm"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <Phone size={14} /> Call Customer
                    </a>
                    <TouchableOpacity
                      className="btn btn-outline btn-sm"
                      style={{ flex: 1, justifyContent: 'center' }}
                      onClick={() => setInExecutionView(false)}
                    >
                      Minimize to Overview
                    </TouchableOpacity>
                  </View>
                </View>

                {/* 4. Service Review & Automatic Payment QR (When COMPLETED) */}
                {booking.status === 'COMPLETED' && (
                  <View className="web-card" style={{ borderTop: '4px solid var(--primary)' }}>
                    <View className="card-header-row">
                      <h3 className="card-title">
                        <Award size={20} color="var(--primary)" />
                        <Text>Service Review & Payout</Text>
                      </h3>
                      <Text className={`badge ${customerReview ? 'badge-green' : 'badge-amber'}`}>
                        {customerReview ? 'Review Given &bull; Payment Unlocked' : 'Awaiting Customer Review'}
                      </Text>
                    </View>

                    {customerReview ? (
                      <View>
                        <View style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <Text
                              key={n}
                              className="badge btn-accent"
                              style={{ padding: '4px 8px', fontSize: '0.78rem' }}
                            >
                              ★ {n} Star{n > 1 ? 's' : ''}
                            </Text>
                          ))}
                        </View>

                        <View style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                          {['Punctual & Polite', 'Thorough 6-Step Safety', '100% Eco-Safe'].map((tag) => (
                            <Text key={tag} className="badge badge-neutral" style={{ fontSize: '0.74rem' }}>
                              + {tag}
                            </Text>
                          ))}
                        </View>

                        <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', fontStyle: 'italic', marginBottom: 16 }}>
                          "{customerReview.comment || 'Punctual, eco-safe, and very thorough treatment!'}"
                        </p>

                        {/* UPI Payment QR Code */}
                        <View
                          className="web-card-surface"
                          style={{
                            border: '2px solid var(--primary)',
                            padding: 16,
                            borderRadius: 14,
                            textAlign: 'center',
                            marginBottom: 14,
                          }}
                        >
                          <View style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--primary)', marginBottom: 2 }}>
                            <QrCode size={18} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                            UPI Payment QR Generated Automatically
                          </View>
                          <View style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginBottom: 12 }}>
                            Customer verified! Scan with any UPI app for payment of Rs. {rawPrice}
                          </View>

                          <View
                            style={{
                              display: 'inline-block',
                              padding: 10,
                              background: '#FFFFFF',
                              borderRadius: 12,
                              border: '1.5px dashed var(--primary)',
                              marginBottom: 10,
                            }}
                          >
                            <Image
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                                `upi://pay?pa=pestfast.billing@icici&pn=PestFast&am=${rawPrice}&cu=INR&tn=Booking-${booking.id}`
                              )}`}
                              alt="UPI Payment QR Code"
                              style={{ width: 160, height: 160, display: 'block', margin: '0 auto' }}
                            />
                            <View style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)', marginTop: 6 }}>
                              Rs. {rawPrice}
                            </View>
                            <View style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                              UPI: pestfast.billing@icici
                            </View>
                          </View>

                          {!customerPaid ? (
                            <TouchableOpacity
                              className="btn btn-success btn-lg btn-block"
                              onClick={async () => {
                                await workerConfirmPaymentReceived();
                                toast(`Payment of Rs. ${rawPrice} confirmed! Payout settled.`, 'success');
                              }}
                            >
                              <CheckCircle2 size={18} /> Confirm Payment Received (Rs. {rawPrice})
                            </TouchableOpacity>
                          ) : (
                            <View className="badge badge-green" style={{ width: '100%', padding: '10px', fontSize: '0.88rem' }}>
                              <CheckCircle2 size={16} /> Payment Confirmed & Settled (Rs. {rawPrice})
                            </View>
                          )}
                        </View>
                      </View>
                    ) : (
                      <View>
                        <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', lineHeight: 1.5, marginBottom: 14 }}>
                          The technician verified the Completion PIN! Submitting rating & review in customer UI is required to generate the official payment QR for Rs. {rawPrice}.
                        </p>
                        <TouchableOpacity
                          className="btn btn-outline btn-sm btn-block"
                          onClick={async () => {
                            await workerSimulateCustomerReview(5, 'Punctual, eco-safe, and very thorough treatment!');
                            toast('Simulated customer review! Payment QR generated.', 'success');
                          }}
                        >
                          <Sparkles size={14} /> Quick Demo: Submit Customer Review (5★)
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>
          ) : (
            /* MAIN OPERATIONS OVERVIEW (Before Clicking Accept & Navigate) */
            <View className="dashboard-grid-2">
              <View style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <View className="web-card">
                  <View className="card-header-row">
                    <View>
                      <Text className="badge badge-neutral" style={{ marginBottom: 6 }}>
                        Booking ID #{booking.id}
                      </Text>
                      <h2 className="card-title" style={{ fontSize: '1.35rem' }}>
                        {booking.pestLabel || 'Termites & Woodborers'} Treatment
                      </h2>
                    </View>
                    <View style={{ textAlign: 'right' }}>
                      <View style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                        Technician Payout
                      </View>
                      <View style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary)' }}>
                        Rs. {workerPayout}
                      </View>
                    </View>
                  </View>

                  <View className="field-grid">
                    <View className="field-box">
                      <View className="field-label">
                        <SprayCan size={14} /> Treatment Plan
                      </View>
                      <View className="field-value">{booking.planLabel || 'Dual-layer Barrier'}</View>
                      <View className="field-sub">CIB&RC certified formulation</View>
                    </View>

                    <View className="field-box">
                      <View className="field-label">
                        <Building2 size={14} /> Property Size
                      </View>
                      <View className="field-value">{booking.sizeLabel || '3 BHK Apartment'}</View>
                      <View className="field-sub">Mode: {booking.dispatchMode === 'inspection' ? 'Inspection First' : 'Treat on Arrival'}</View>
                    </View>

                    <View className="field-box">
                      <View className="field-label">
                        <Calendar size={14} /> Scheduled Time Slot
                      </View>
                      <View className="field-value">{booking.slot || '01:00 - 03:00 PM'}</View>
                      <View className="field-sub">Priority Same-Day Dispatch</View>
                    </View>

                    <View className="field-box">
                      <View className="field-label">
                        <MapPin size={14} /> Locality / Zone
                      </View>
                      <View className="field-value">{incomingJob?.area || booking.areaOnly || 'Jayanagar 4th Block'}</View>
                      <View className="field-sub">3.2 km from current base</View>
                    </View>
                  </View>

                  {booking.note && (
                    <View className="field-box" style={{ marginTop: 14 }}>
                      <View className="field-label">Customer Site Notes</View>
                      <View style={{ fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.45 }}>
                        "{booking.note}"
                      </View>
                    </View>
                  )}
                </View>

                {/* Customer Contact & Address Card */}
                <View className="web-card">
                  <View className="card-header-row">
                    <h3 className="card-title">
                      {contactUnlocked ? (
                        <Unlock size={20} color="var(--success)" />
                      ) : (
                        <Lock size={20} color="var(--accent)" />
                      )}
                      <Text>Customer Contact & Address Gate</Text>
                    </h3>
                    <Text className={`badge ${contactUnlocked ? 'badge-green' : 'badge-amber'}`}>
                      {contactUnlocked ? 'Agency Confirmed — Actual Details Unlocked' : 'Masked (Waiting for Agency to Permit)'}
                    </Text>
                  </View>

                  <View className="field-grid">
                    <View className="field-box">
                      <View className="field-label">Customer Name</View>
                      <View className="field-value">
                        {contactUnlocked
                          ? booking.customerFullName || 'Aarav Sharma'
                          : incomingJob?.maskedName || booking.customerMaskedName || 'Aarav S.'}
                      </View>
                      <View className="field-sub">
                        {contactUnlocked ? 'Actual Verified Name' : 'Masked until Agency approves'}
                      </View>
                    </View>

                    <View className="field-box">
                      <View className="field-label">Phone Number</View>
                      <View className="field-value">
                        {contactUnlocked
                          ? booking.customerRealPhone || '+91 98450 67890'
                          : incomingJob?.maskedPhone || '+91-984-XXX-7890 (Proxy)'}
                      </View>
                      <View className="field-sub">
                        {contactUnlocked ? 'Actual Direct Phone' : 'Masked proxy bridge'}
                      </View>
                    </View>
                  </View>

                  <View className="field-box" style={{ marginTop: 14 }}>
                    <View className="field-label">Service Address</View>
                    <View className="field-value">
                      {contactUnlocked
                        ? booking.address
                        : `${incomingJob?.area || 'Jayanagar 4th Block'} (Exact address locked until agency approval)`}
                    </View>
                  </View>

                  {/* GPS LOCATION AS A LINK ONLY (NO MAP ON THIS PAGE) */}
                  {contactUnlocked && (
                    <View className="field-box" style={{ marginTop: 14, background: 'var(--primary-light)', border: '1.5px solid var(--primary)' }}>
                      <View className="field-label" style={{ color: 'var(--primary-dark)', fontWeight: 800 }}>
                        <MapPin size={15} /> Actual Live GPS Coordinates (Link Only)
                      </View>
                      <View style={{ marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                        <View style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 700 }}>
                          Lat: {lat}&deg; N, Lng: {lng}&deg; E
                        </View>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm"
                        >
                          <Navigation size={14} /> Open Live GPS Location Link
                        </a>
                      </View>
                      <View style={{ fontSize: '0.74rem', color: 'var(--ink-muted)', marginTop: 4 }}>
                        Map will open inside the live navigation console when you accept & navigate.
                      </View>
                    </View>
                  )}
                </View>
              </View>

              {/* Right Column: Agency One-Time Approval & Accept/Navigate Action */}
              <View className="web-card sticky-summary" style={{ borderTop: '4px solid var(--primary)' }}>
                {!contactUnlocked ? (
                  <View>
                    <Text className="badge badge-amber" style={{ marginBottom: 12 }}>
                      Awaiting Agency One-Time Approval
                    </Text>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: 8 }}>
                      Waiting for Agency Permission
                    </h3>
                    <p style={{ color: 'var(--ink-muted)', lineHeight: 1.5, marginBottom: 20 }}>
                      Client booked this treatment. Waiting for the agency to approve and assign this job to you. All contact numbers and exact GPS coordinates remain masked until agency confirms.
                    </p>
                    <TouchableOpacity
                      className="btn btn-primary btn-lg btn-block"
                      onClick={async () => {
                        await agencyApproveBooking();
                        toast('Agency approved job! Actual customer details & GPS link unlocked.', 'success');
                      }}
                    >
                      <CheckCircle2 size={18} /> Agency Approve Job (1-Time Approval)
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <Text className="badge badge-green" style={{ marginBottom: 12 }}>
                      Agency Confirmed &bull; Ready for Route
                    </Text>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: 8 }}>
                      Agency Permission Granted
                    </h3>
                    <p style={{ color: 'var(--ink-muted)', lineHeight: 1.5, marginBottom: 20 }}>
                      Actual customer number and GPS link are unlocked above. Click below to accept the dispatch, open the live map navigation console, and proceed to the customer doorstep.
                    </p>

                    <View style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <TouchableOpacity
                        className="btn btn-primary btn-lg btn-block"
                        onClick={async () => {
                          await workerAcceptAndNavigate();
                          setInExecutionView(true);
                          toast('En route! Live navigation console opened with real map.', 'success');
                        }}
                      >
                        <Navigation size={18} /> Accept & Start Navigation (Open Live Map Console)
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="btn btn-outline btn-block"
                        onClick={async () => {
                          await workerDeclineJob();
                          toast('Job passed back to agency dispatch queue.', 'info');
                        }}
                      >
                        <X size={16} /> Pass / Decline Dispatch
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}
        </>
      )}
    </View>
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
    <View>
      <View className="dashboard-grid-3" style={{ marginBottom: 24 }}>
        <View className="kpi-card">
          <View className="kpi-top">
            <Text>Assigned Stops Today</Text>
            <MapPin size={18} color="var(--primary)" />
          </View>
          <View className="kpi-value">{routeStops.length} Jobs</View>
          <View className="kpi-foot">Bengaluru South & East Cluster</View>
        </View>

        <View className="kpi-card">
          <View className="kpi-top">
            <Text>Completed Stops</Text>
            <CheckCircle2 size={18} color="var(--success)" />
          </View>
          <View className="kpi-value">
            {routeStops.filter((s) => s.status === 'Completed').length} of {routeStops.length}
          </View>
          <View className="kpi-foot">100% on-time arrival SLA</View>
        </View>

        <View className="kpi-card">
          <View className="kpi-top">
            <Text>Estimated Route Value</Text>
            <IndianRupee size={18} color="var(--accent)" />
          </View>
          <View className="kpi-value">Rs. {totalRoutePayout}</View>
          <View className="kpi-foot">Includes base share + travel allowance</View>
        </View>
      </View>

      <View className="web-card">
        <View className="card-header-row" style={{ flexWrap: 'wrap' }}>
          <View>
            <h2 className="card-title">Today's Dispatch Manifest & Route Table</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginTop: 2 }}>
              Click "Open in Workspace" on any active or upcoming stop to load it into your Active Job console.
            </p>
          </View>
          <View style={{ display: 'flex', gap: 8 }}>
            {['All', 'Active', 'Upcoming', 'Completed'].map((tab) => (
              <TouchableOpacity
                key={tab}
                className={`stage-pill-btn ${filter === tab ? 'active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="web-table-wrap">
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
                    <View style={{ fontWeight: 700 }}>{stop.customer}</View>
                    <View style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                      {stop.area}
                    </View>
                  </td>
                  <td>
                    <View style={{ fontWeight: 600 }}>{stop.service}</View>
                    <View style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                      {stop.chemical}
                    </View>
                  </td>
                  <td style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>
                    Rs. {stop.payout}
                  </td>
                  <td>
                    <Text
                      className={`badge ${
                        stop.status === 'Completed'
                          ? 'badge-green'
                          : stop.status === 'Active'
                          ? 'badge-amber'
                          : 'badge-neutral'
                      }`}
                    >
                      {stop.status}
                    </Text>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <TouchableOpacity
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
                    </TouchableOpacity>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </View>
      </View>
    </View>
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
    <View>
      <View className="dashboard-grid-4" style={{ marginBottom: 24 }}>
        <View className="kpi-card">
          <View className="kpi-top">
            <Text>Withdrawable Today</Text>
            <Wallet size={18} color="var(--primary)" />
          </View>
          <View className="kpi-value" style={{ color: 'var(--primary)' }}>
            Rs. {earnings.today}
          </View>
          <View className="kpi-foot">Available for zero-fee IMPS transfer</View>
        </View>

        <View className="kpi-card">
          <View className="kpi-top">
            <Text>This Week's Earnings</Text>
            <IndianRupee size={18} color="var(--ink)" />
          </View>
          <View className="kpi-value">Rs. {earnings.week}</View>
          <View className="kpi-foot">Across 9 completed treatments</View>
        </View>

        <View className="kpi-card">
          <View className="kpi-top">
            <Text>Safety & PPE Bonus</Text>
            <ShieldCheck size={18} color="var(--success)" />
          </View>
          <View className="kpi-value" style={{ color: 'var(--success)' }}>
            +Rs. {earnings.safetyBonus}
          </View>
          <View className="kpi-foot">100% checklist compliance streak</View>
        </View>

        <View className="kpi-card">
          <View className="kpi-top">
            <Text>Monthly Gross</Text>
            <Award size={18} color="var(--accent)" />
          </View>
          <View className="kpi-value">Rs. {earnings.month}</View>
          <View className="kpi-foot">Top 5% technician tier in Bengaluru</View>
        </View>
      </View>

      <View className="dashboard-grid-2">
        <View className="web-card">
          <View className="card-header-row">
            <h2 className="card-title">Instant UPI Settlement</h2>
            <Text className="badge badge-green">Zero Commission Cut on Tips</Text>
          </View>

          <View className="web-card-surface" style={{ marginBottom: 20 }}>
            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <View className="field-label">Linked Bank UPI Handle</View>
                {!editingUpi ? (
                  <View style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink)' }}>
                    {earnings.upiId}
                  </View>
                ) : (
                  <View style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <TextInput
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
                    <TouchableOpacity className="btn btn-primary btn-sm" onClick={saveUpi}>
                      Save
                    </TouchableOpacity>
                    <TouchableOpacity className="btn btn-outline btn-sm" onClick={() => setEditingUpi(false)}>
                      Cancel
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {!editingUpi && (
                <TouchableOpacity
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setUpiDraft(earnings.upiId);
                    setEditingUpi(true);
                  }}
                >
                  <Edit3 size={14} /> Change UPI
                </TouchableOpacity>
              )}
            </View>
          </View>

          <TouchableOpacity
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
          </TouchableOpacity>
        </View>

        <View className="web-card">
          <View className="card-header-row">
            <h2 className="card-title">Recent Settlement Ledger</h2>
          </View>
          <View className="web-table-wrap">
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
                      <View>{item.date}</View>
                      <View style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                        {item.upiId}
                      </View>
                    </td>
                    <td style={{ fontWeight: 800, color: 'var(--success)' }}>
                      Rs. {item.amount}
                    </td>
                    <td>
                      <Text className="badge badge-green">{item.status}</Text>
                      <View style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: 3 }}>
                        {item.utr}
                      </View>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </View>
        </View>
      </View>
    </View>
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
    <View>
      <View className="dashboard-grid-2">
        <View className="web-card">
          <View className="card-header-row">
            <View>
              <h2 className="card-title">
                <FileText size={20} color="var(--primary)" />
                <Text>CIB&RC Chemical Safety Data Sheets (CSDS)</Text>
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                Select any approved formulation below to inspect dilution, PPE, and antidote rules.
              </p>
            </View>
            <TouchableOpacity
              className="btn btn-danger btn-sm"
              onClick={() => setProtocolModal(true)}
            >
              <HeartPulse size={15} /> Emergency Exposure Protocol
            </TouchableOpacity>
          </View>

          <View style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
            {BUNDLED_CHEMICAL_SHEETS.map((sheet) => (
              <TouchableOpacity
                key={sheet.id}
                className={`stage-pill-btn ${selectedChem.id === sheet.id ? 'active' : ''}`}
                onClick={() => setSelectedChem(sheet)}
              >
                {sheet.name}
              </TouchableOpacity>
            ))}
          </View>

          {selectedChem && (
            <View className="web-card-surface">
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <View>
                  <h3 style={{ fontSize: '1.18rem', color: 'var(--primary-dark)' }}>
                    {selectedChem.name}
                  </h3>
                  <View style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                    Reg No: <strong>{selectedChem.cibrcReg}</strong> - {selectedChem.activeIngredient}
                  </View>
                </View>
                <Text className="badge badge-amber">
                  Re-entry: {selectedChem.reEntryMinutes} mins
                </Text>
              </View>

              <View className="field-grid" style={{ marginBottom: 14 }}>
                <View className="field-box" style={{ background: '#FFFFFF' }}>
                  <View className="field-label">Prescribed Dilution Ratio</View>
                  <View className="field-value" style={{ fontSize: '0.9rem' }}>
                    {selectedChem.dilutionRatio}
                  </View>
                </View>
                <View className="field-box" style={{ background: '#FFFFFF' }}>
                  <View className="field-label">Target Pests</View>
                  <View className="field-value" style={{ fontSize: '0.9rem' }}>
                    {selectedChem.targetPests}
                  </View>
                </View>
              </View>

              <View className="field-box" style={{ background: '#FFFFFF', marginBottom: 14 }}>
                <View className="field-label">Mandatory PPE Gear</View>
                <View style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
                  {selectedChem.requiredPpe.map((ppe, idx) => (
                    <Text key={idx} className="badge badge-green">
                      <ShieldCheck size={13} /> {ppe}
                    </Text>
                  ))}
                </View>
              </View>

              <View className="field-box" style={{ background: '#FFFFFF' }}>
                <View className="field-label" style={{ color: 'var(--danger)' }}>
                  First-Aid & Medical Antidote Guidance
                </View>
                <View style={{ fontSize: '0.86rem', lineHeight: 1.55, marginTop: 6 }}>
                  <p><strong>Skin / Eye Contact:</strong> {selectedChem.firstAidSkinEye}</p>
                  <p style={{ marginTop: 4 }}><strong>Inhalation:</strong> {selectedChem.firstAidInhalation}</p>
                  <p style={{ marginTop: 4 }}><strong>Antidote:</strong> {selectedChem.antidote}</p>
                </View>
              </View>
            </View>
          )}
        </View>

        <View className="web-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <View className="card-header-row">
            <View>
              <h2 className="card-title">
                <Bot size={22} color="var(--primary)" />
                <Text>AI Chemical Safety Assistant</Text>
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                Strictly grounded in CIB&RC sheets - never guesses or hallucinates
              </p>
            </View>
            <Text className="badge badge-green">Grounded Mode</Text>
          </View>

          <View style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
            {[
              'What is the dilution ratio for Deltamethrin?',
              'What PPE is required for Imidacloprid?',
              'First aid for Fipronil gel eye splash?',
              'Re-entry time for Termite Shield?',
            ].map((q, idx) => (
              <TouchableOpacity
                key={idx}
                className="stage-pill-btn"
                onClick={() => askAi(q)}
              >
                {q}
              </TouchableOpacity>
            ))}
          </View>

          <View
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
              <View
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
              </View>
            ))}
          </View>

          <View style={{ display: 'flex', gap: 10 }}>
            <TextInput
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
            <TouchableOpacity className="btn btn-primary" onClick={() => askAi()}>
              <Send size={16} /> Ask AI
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ModalDialog
        open={protocolModal}
        onClose={() => setProtocolModal(false)}
        title="6-Step Emergency Chemical Exposure Protocol"
        icon={HeartPulse}
        danger
      >
        <View style={{ display: 'grid', gap: 12 }}>
          {[
            { step: '1. Immediate Evacuation', detail: 'Move the technician or resident to fresh air immediately. Open all windows and doors.' },
            { step: '2. Dermal / Skin Exposure', detail: 'Remove contaminated clothing immediately. Wash affected skin with soap and cool running water for 15 minutes.' },
            { step: '3. Ocular / Eye Splash', detail: 'Hold eyelids open and flush slowly with clean running water for at least 15 minutes. Remove contact lenses if present.' },
            { step: '4. Accidental Ingestion', detail: 'Do NOT induce vomiting. Rinse mouth thoroughly with water. Never give anything by mouth to an unconscious person.' },
            { step: '5. Respiratory Inhalation', detail: 'Keep patient propped up and calm. Loosen tight collar or belt. Call 108 if breathing is irregular.' },
            { step: '6. Poison Control Handover', detail: 'Dial 1800-11-2233 and quote the exact CIB&RC registration number from the CSDS panel.' },
          ].map((item, i) => (
            <View key={i} className="field-box">
              <View style={{ fontWeight: 800, color: 'var(--danger)', marginBottom: 4 }}>
                {item.step}
              </View>
              <View style={{ fontSize: '0.9rem', color: 'var(--ink)' }}>{item.detail}</View>
            </View>
          ))}
        </View>
      </ModalDialog>
    </View>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('job');
  const [sosModalOpen, setSosModalOpen] = useState(false);
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
  const toggleDuty = (st) => setDutyStatus(st);

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
    <View className="web-layout">
      <ToastStack toasts={toasts} />

      <ModalDialog
        open={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
        title="Emergency Spill, Exposure & SOS Hotline"
        icon={AlertCircle}
        danger
      >
        <p style={{ color: 'var(--ink-muted)', marginBottom: 16, lineHeight: 1.5 }}>
          In the event of accidental chemical ingestion, skin contact, or ocular exposure, follow CSDS protocols immediately and contact poison control.
        </p>
        <View style={{ display: 'grid', gap: 12 }}>
          <a
            href="tel:108"
            className="btn btn-danger btn-lg btn-block"
            onClick={() => toast('Dialing 108 Emergency Ambulance...', 'error')}
          >
            <Phone size={18} /> Dial 108 Emergency Ambulance
          </a>
          <a
            href="tel:1800112233"
            className="btn btn-outline btn-lg btn-block"
            onClick={() => toast('Calling National Poisons Information Centre...', 'info')}
          >
            <HeartPulse size={18} /> National Poisons Centre (1800-116-117)
          </a>
        </View>
      </ModalDialog>

      {/* Left Sidebar Navigation (React Native Primitives) */}
      <View className="web-sidebar" accessibilityRole="navigation" aria-label="Technician Operations Navigation">
        <View className="sidebar-brand">
          <View className="brand-logo-box">
            <ShieldCheck size={24} />
          </View>
          <View>
            <Text className="brand-title">Pest Free</Text>
            <Text className="brand-subtitle">Technician Web Portal</Text>
          </View>
        </View>

        <View className="sidebar-customer-card">
          <View className="customer-avatar-row">
            <View className="customer-avatar">AS</View>
            <View>
              <Text className="customer-name">Arjun Sharma</Text>
              <Text className="customer-meta">Lic: CHL-2024-889</Text>
            </View>
          </View>
          <View className="customer-badges">
            <Text className="sidebar-badge">
              <Lock size={11} /> KYC Verified
            </Text>
            <Text className="sidebar-badge">
              <Star size={11} /> 4.92 Rating
            </Text>
          </View>
        </View>

        <View className="sidebar-nav">
          <Text className="nav-section-label">Operations Console</Text>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
                onPress={() => setActiveSection(item.id)}
                onClick={() => setActiveSection(item.id)}
                accessibilityRole="button"
              >
                <Icon size={19} />
                <Text style={{ color: 'inherit', fontWeight: 'inherit' }}>{item.label}</Text>
                <Text className="nav-pill-count">{item.badge}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="sidebar-footer">
          <TouchableOpacity
            className="btn btn-danger btn-block"
            onPress={() => setSosModalOpen(true)}
            onClick={() => setSosModalOpen(true)}
            accessibilityRole="button"
          >
            <AlertCircle size={16} /> <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Emergency SOS Hotline</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Operations Workdeck (React Native Primitives) */}
      <View className="web-main">
        <View className="web-topbar">
          <View>
            <Text className="topbar-title" style={{ fontSize: '1.45rem', fontWeight: 800 }}>{sectionHeaders[activeSection].title}</Text>
            <Text className="topbar-subtitle">{sectionHeaders[activeSection].subtitle}</Text>
          </View>

          <View className="topbar-right">
            <View className="duty-toggle-group">
              <TouchableOpacity
                className={`duty-btn ${dutyStatus === 'ON_DUTY' ? 'active-green' : ''}`}
                onPress={() => toggleDuty('ON_DUTY')}
                onClick={() => toggleDuty('ON_DUTY')}
                accessibilityRole="button"
              >
                <Text style={{ color: 'inherit', fontWeight: '700' }}>&bull; On Duty</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`duty-btn ${dutyStatus === 'ON_JOB' ? 'active-amber' : ''}`}
                onPress={() => toggleDuty('ON_JOB')}
                onClick={() => toggleDuty('ON_JOB')}
                accessibilityRole="button"
              >
                <Text style={{ color: 'inherit', fontWeight: '700' }}>&bull; On Job</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`duty-btn ${dutyStatus === 'OFF_DUTY' ? 'active-red' : ''}`}
                onPress={() => toggleDuty('OFF_DUTY')}
                onClick={() => toggleDuty('OFF_DUTY')}
                accessibilityRole="button"
              >
                <Text style={{ color: 'inherit', fontWeight: '700' }}>&bull; Off Duty</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="web-page">
          {activeSection === 'job' && (
            <ActiveJobSection toast={toast} onNavigate={setActiveSection} />
          )}
          {activeSection === 'route' && (
            <RouteSection toast={toast} onNavigate={setActiveSection} />
          )}
          {activeSection === 'earnings' && <EarningsSection toast={toast} />}
          {activeSection === 'safety' && <SafetySection toast={toast} />}
        </View>
      </View>
    </View>
  );
}

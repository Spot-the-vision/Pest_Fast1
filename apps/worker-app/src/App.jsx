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
  Sliders,
  LogOut,
  HelpCircle,
  Menu,
  Home,
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

function ModalDialog({ open, onClose, title, icon: Icon, danger, children }) {
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
        style={{ maxWidth: 580 }}
      >
        <View className="modal-header">
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {Icon && (
              <View
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

// 2 Queued Jobs Constant
const QUEUED_JOBS = [
  {
    id: 'JOB-9021',
    customerMasked: 'Mrs. Ananya Sen',
    phoneMasked: '+91-973-XXX-4412 (Proxy)',
    area: 'Plot 42, Indiranagar 100ft Rd, BLR',
    distance: '2.8 km away',
    scheduledTime: '04:30 PM - 06:30 PM',
    service: 'Termite Eradication Drill & Inject',
    plan: 'Dual-Layer Chemical Barrier',
    propertySize: '3 BHK Independent Villa (2,100 sq.ft)',
    payout: 2400,
    priceTotal: 4360,
    inspection: 'Mandatory Pre-Treatment Moisture Meter & Timber Acoustic Audit',
    siteNotes: 'Wooden flooring in master bedroom, drill holes along skirtings only.',
    lat: 12.9784,
    lng: 77.6408,
  },
  {
    id: 'JOB-9022',
    customerMasked: 'Mr. Rajesh Verma',
    phoneMasked: '+91-988-XXX-9011 (Proxy)',
    area: 'Road 12, Koramangala 4th Block, BLR',
    distance: '5.1 km away',
    scheduledTime: '07:00 PM - 09:00 PM',
    service: 'Bedbug Thermal Fogging & Crack Treatment',
    plan: 'Intensive Double-Coat Eradication',
    propertySize: '2 BHK Residential Flat (1,150 sq.ft)',
    payout: 1650,
    priceTotal: 3000,
    inspection: 'Post-Treatment Mattress Seam & Bed Frame Micro-Inspection',
    siteNotes: 'Toddler and cat in house; use odorless CIB&RC approved formulation only.',
    lat: 12.9345,
    lng: 77.6256,
  },
];

// OPTION 1: WORKER OVERVIEW & STATS
function WorkerOverviewSection({ toast, onNavigate }) {
  const { booking, incomingJob, contactUnlocked, agencyApproveBooking } = useAppStore();
  const [period, setPeriod] = useState('Today');

  const periodStats = {
    Today: {
      jobs: '4 Jobs',
      jobsSub: '100% on-time arrival SLA',
      rating: '4.92 ★',
      ratingSub: 'Across 428 customer ratings',
      success: '99.4%',
      successSub: 'Zero re-treatment claims',
      payout: 'Rs. 1,050',
      payoutSub: 'Direct bank transfer via IMPS',
    },
    'This Week': {
      jobs: '28 Jobs',
      jobsSub: 'Top applicator in South Cluster',
      rating: '4.93 ★',
      ratingSub: '98.8% 5-Star customer reviews',
      success: '99.6%',
      successSub: '100% CIB&RC safety compliance',
      payout: 'Rs. 7,420',
      payoutSub: 'Credited to ICICI A/c ...4819',
    },
    'This Month': {
      jobs: '112 Jobs',
      jobsSub: 'Star Performer of the Month',
      rating: '4.92 ★',
      ratingSub: '428 Lifetime 5-Star ratings',
      success: '99.5%',
      successSub: 'Zero chemical spill incidents',
      payout: 'Rs. 29,800',
      payoutSub: 'Includes performance bonuses',
    },
  };

  const curr = periodStats[period] || periodStats.Today;

  const rawPrice =
    typeof booking?.price === 'number'
      ? booking.price
      : booking?.price?.total ?? booking?.pricing?.total ?? 1600;
  const workerPayout = incomingJob?.payout ?? Math.round(rawPrice * 0.55);

  const lat = booking?.coords?.lat || 12.9250;
  const lng = booking?.coords?.lng || 77.5938;

  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Controls: Filter Toggle */}
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          background: 'var(--card)',
          padding: '16px 20px',
          borderRadius: 16,
          border: '1px solid var(--border)',
        }}
      >
        <View>
          <Text style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>
            Technician Performance Metrics
          </Text>
          <Text style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>
            Real-time analytics for Arjun Sharma (CHL-2024-889)
          </Text>
        </View>

        {/* Toggle [ Today ] [ This Week ] [ This Month ] */}
        <View style={{ display: 'flex', background: 'var(--surface)', padding: 4, borderRadius: 12, border: '1px solid var(--border-strong)' }}>
          {['Today', 'This Week', 'This Month'].map((p) => (
            <TouchableOpacity
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: period === p ? 'var(--primary)' : 'transparent',
                color: period === p ? '#FFFFFF' : 'var(--ink)',
                border: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {p}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 4 Responsive Metric Cards */}
      <View className="dashboard-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <View className="kpi-card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>Jobs Accomplished</Text>
            <Briefcase size={18} color="var(--primary)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)' }}>{curr.jobs}</View>
          <View className="kpi-foot">{curr.jobsSub}</View>
        </View>

        <View className="kpi-card" style={{ borderLeft: '4px solid #E8A317' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>Technician Rating</Text>
            <Star size={18} color="#E8A317" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#B87F0D' }}>{curr.rating}</View>
          <View className="kpi-foot">{curr.ratingSub}</View>
        </View>

        <View className="kpi-card" style={{ borderLeft: '4px solid var(--success)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>Safety & SLA Rate</Text>
            <ShieldCheck size={18} color="var(--success)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--success)' }}>{curr.success}</View>
          <View className="kpi-foot">{curr.successSub}</View>
        </View>

        <View className="kpi-card" style={{ borderLeft: '4px solid var(--primary-dark)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>Total Payout Accrued</Text>
            <IndianRupee size={18} color="var(--primary-dark)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{curr.payout}</View>
          <View className="kpi-foot">{curr.payoutSub}</View>
        </View>
      </View>

      {/* SUBHEADING: Active Job */}
      <View style={{ marginTop: 8 }}>
        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <View style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <View style={{ width: 8, height: 24, background: 'var(--primary)', borderRadius: 4 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Active Job</h3>
            <Text className="badge badge-green" style={{ fontSize: '0.78rem' }}>
              {booking?.status ? booking.status.replace(/_/g, ' ') : 'READY TO DISPATCH'}
            </Text>
          </View>
          <TouchableOpacity
            className="btn btn-outline btn-sm"
            onClick={() => onNavigate('workspace')}
          >
            Open in Workspace <ChevronRight size={14} />
          </TouchableOpacity>
        </View>

        {/* Merged 50/50 Dual Card */}
        <View className="web-card" style={{ padding: 0, overflow: 'hidden', border: '1.5px solid var(--border-strong)' }}>
          <View className="dual-card-50">
            {/* Left 50%: Customer Contact & Address Gate */}
            <View style={{ padding: 24, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {contactUnlocked ? <Unlock size={18} color="var(--success)" /> : <Lock size={18} color="var(--accent)" />}
                  <Text style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--ink)' }}>
                    Customer Contact & Address Gate
                  </Text>
                </View>
                <Text className={`badge ${contactUnlocked ? 'badge-green' : 'badge-amber'}`}>
                  {contactUnlocked ? 'Unlocked & Verified' : 'Agency Clearance Required'}
                </Text>
              </View>

              <View className="field-grid">
                <View className="field-box">
                  <View className="field-label">Customer Name</View>
                  <View className="field-value">
                    {contactUnlocked
                      ? booking?.customerFullName || 'Aarav Sharma'
                      : incomingJob?.maskedName || booking?.customerMaskedName || 'Aarav S.'}
                  </View>
                  <View className="field-sub">
                    {contactUnlocked ? 'Actual Customer Name' : 'Masked until Agency approves'}
                  </View>
                </View>

                <View className="field-box">
                  <View className="field-label">Phone Number</View>
                  <View className="field-value">
                    {contactUnlocked
                      ? booking?.customerRealPhone || '+91 98450 67890'
                      : incomingJob?.maskedPhone || '+91-984-XXX-7890 (Proxy)'}
                  </View>
                  <View className="field-sub">
                    {contactUnlocked ? 'Direct Line Unlocked' : 'Masked Proxy Bridge'}
                  </View>
                </View>
              </View>

              <View className="field-box">
                <View className="field-label">Service Address</View>
                <View className="field-value">
                  {contactUnlocked
                    ? booking?.address || 'Flat 402, Green Glen Layout, Jayanagar 4th Block, Bengaluru'
                    : `${incomingJob?.area || 'Jayanagar 4th Block, Bengaluru'} (Exact flat number locked until agency permits)`}
                </View>
              </View>

              {/* GPS Link (Locked / Unlocked) */}
              <View
                className="field-box"
                style={{
                  background: contactUnlocked ? 'var(--primary-light)' : 'var(--surface)',
                  border: contactUnlocked ? '1.5px solid var(--primary)' : '1px dashed var(--border-strong)',
                }}
              >
                <View className="field-label" style={{ color: contactUnlocked ? 'var(--primary-dark)' : 'var(--ink-muted)', fontWeight: 800 }}>
                  <MapPin size={14} style={{ display: 'inline', marginRight: 4 }} />
                  GPS Location & Navigation Link
                </View>
                {contactUnlocked ? (
                  <View style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Text style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700 }}>
                      Lat: {Number(lat).toFixed(4)}°, Lng: {Number(lng).toFixed(4)}°
                    </Text>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      <Navigation size={13} /> Open Live GPS Link
                    </a>
                  </View>
                ) : (
                  <View style={{ marginTop: 4, fontSize: '0.82rem', color: 'var(--ink-muted)' }}>
                    🔒 Map and GPS coordinates locked. Click Agency 1-Time Approval to unlock navigation.
                  </View>
                )}
              </View>

              {!contactUnlocked && (
                <TouchableOpacity
                  className="btn btn-primary btn-block"
                  onClick={async () => {
                    await agencyApproveBooking();
                    toast('Agency approved job! Actual customer details & GPS unlocked.', 'success');
                  }}
                >
                  <CheckCircle2 size={16} /> Grant Agency 1-Time Approval
                </TouchableOpacity>
              )}
            </View>

            {/* Right 50%: Job Details */}
            <View style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--surface)' }}>
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View>
                  <Text style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                    Target Treatment & Service
                  </Text>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)', margin: '2px 0 0' }}>
                    {booking?.pestLabel || 'Severe Cockroach Infestation & German Roach Colony'}
                  </h4>
                  <Text style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700 }}>
                    {booking?.planLabel || 'Dual-Layer Odorless Gel & Chemical Barrier'}
                  </Text>
                </View>
                <View style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                    Technician Payout
                  </Text>
                  <Text style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>
                    Rs. {workerPayout}
                  </Text>
                  <Text style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
                    Customer Price: Rs. {rawPrice}
                  </Text>
                </View>
              </View>

              <View className="field-grid">
                <View className="field-box" style={{ background: '#FFFFFF' }}>
                  <View className="field-label">Property Size</View>
                  <View className="field-value">{booking?.sizeLabel || '2 BHK Apartment (1,250 sq.ft)'}</View>
                  <View className="field-sub">Pre & Post Treatment Quality Audit</View>
                </View>

                <View className="field-box" style={{ background: '#FFFFFF' }}>
                  <View className="field-label">Scheduled Time Slot</View>
                  <View className="field-value">{booking?.slot || '01:00 PM - 03:00 PM'}</View>
                  <View className="field-sub">Priority Same-Day Dispatch</View>
                </View>
              </View>

              <View className="field-box" style={{ background: '#FFFFFF' }}>
                <View className="field-label">Inspection & Chemical Requirement</View>
                <View className="field-value" style={{ fontSize: '0.88rem' }}>
                  Mandatory Pre-Treatment Inspection & Post-Treatment Seam Check
                </View>
                <View className="field-sub">
                  Chemical: Fipronil 0.05% Gel + Deltamethrin 2.5% EC (CIB&RC Certified)
                </View>
              </View>

              <View className="field-box" style={{ background: '#FFFFFF' }}>
                <View className="field-label">Customer Site Notes</View>
                <View style={{ fontSize: '0.86rem', color: 'var(--ink)', fontStyle: 'italic', lineHeight: 1.4 }}>
                  "{booking?.note || 'Pet friendly herbal gel, kitchen deep crevice treatment, do not spray near aquarium.'}"
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* SUBHEADING: Queue State */}
      <View style={{ marginTop: 8 }}>
        <View style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <View style={{ width: 8, height: 24, background: 'var(--accent)', borderRadius: 4 }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Queue State</h3>
          <Text className="badge badge-neutral" style={{ fontSize: '0.78rem' }}>
            Exactly 2 Scheduled Jobs In Queue
          </Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {QUEUED_JOBS.map((job, idx) => (
            <View
              key={job.id}
              className="web-card"
              style={{ padding: 0, overflow: 'hidden', border: '1.5px solid var(--border)' }}
            >
              <View className="dual-card-50">
                {/* Left 50%: Masked Customer Preview */}
                <View style={{ padding: 20, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Text className="badge badge-neutral" style={{ fontWeight: 800 }}>Queue #{idx + 1}</Text>
                      <Text style={{ fontWeight: 800, fontSize: '0.95rem' }}>{job.id}</Text>
                    </View>
                    <Text className="badge badge-amber">Scheduled: {job.scheduledTime.split(' - ')[0]}</Text>
                  </View>

                  <View className="field-grid">
                    <View className="field-box">
                      <View className="field-label">Customer Name</View>
                      <View className="field-value">{job.customerMasked}</View>
                      <View className="field-sub">Locked until active job completion</View>
                    </View>
                    <View className="field-box">
                      <View className="field-label">Contact Proxy</View>
                      <View className="field-value">{job.phoneMasked}</View>
                      <View className="field-sub">Direct line masked</View>
                    </View>
                  </View>

                  <View className="field-box">
                    <View className="field-label">Locality & Distance</View>
                    <View className="field-value">{job.area}</View>
                    <View className="field-sub">📍 {job.distance} from South Central Hub</View>
                  </View>
                </View>

                {/* Right 50%: Job Details */}
                <View style={{ padding: 20, background: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View>
                      <Text style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                        Treatment
                      </Text>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '2px 0 0' }}>{job.service}</h4>
                      <Text style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>{job.plan}</Text>
                    </View>
                    <View style={{ textAlign: 'right' }}>
                      <Text style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                        Est. Payout
                      </Text>
                      <Text style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
                        Rs. {job.payout}
                      </Text>
                    </View>
                  </View>

                  <View className="field-grid">
                    <View className="field-box" style={{ background: '#FFFFFF' }}>
                      <View className="field-label">Property</View>
                      <View className="field-value" style={{ fontSize: '0.85rem' }}>{job.propertySize}</View>
                    </View>
                    <View className="field-box" style={{ background: '#FFFFFF' }}>
                      <View className="field-label">Slot</View>
                      <View className="field-value" style={{ fontSize: '0.85rem' }}>{job.scheduledTime}</View>
                    </View>
                  </View>

                  <View className="field-box" style={{ background: '#FFFFFF' }}>
                    <View className="field-label">Inspection & Site Notes</View>
                    <View style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>{job.inspection}</View>
                    <View style={{ fontSize: '0.82rem', color: 'var(--ink)', fontStyle: 'italic', marginTop: 4 }}>
                      "{job.siteNotes}"
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

// OPTION 2: ACTIVE JOBS & WORKSPACE
function ActiveJobWorkspaceSection({ toast, onNavigate }) {
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

  const [inExecutionView, setInExecutionView] = useState(false);

  // Auto-switch to execution view if en route or later
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
    const expected = (startOtp || booking?.startOtp || '4058').split('');
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
    const expected = (completionPin || '1666').split('');
    setCompPinDigits(expected);
    setCompPinError('');
  };

  const rawPrice =
    typeof booking?.price === 'number'
      ? booking.price
      : booking?.price?.total ?? booking?.pricing?.total ?? 1600;
  const workerPayout = incomingJob?.payout ?? Math.round(rawPrice * 0.55);

  const lat = booking?.coords?.lat || liveCustomerLocation?.lat || 12.9250;
  const lng = booking?.coords?.lng || liveCustomerLocation?.lng || 77.5938;

  // IF IN DEDICATED EXECUTION VIEW: (OpenStreetMap Left, Steps & Payments Right)
  if (inExecutionView && booking && ['ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'COMPLETED'].includes(booking.status)) {
    return (
      <View style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Top Control Bar with Back to Overview */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--card)',
            padding: '14px 20px',
            borderRadius: 14,
            border: '1px solid var(--border)',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <View style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <TouchableOpacity
              className="btn btn-outline btn-sm"
              onClick={() => setInExecutionView(false)}
            >
              ← Back to Workspace Overview
            </TouchableOpacity>
            <Text style={{ fontWeight: 800, fontSize: '1.05rem' }}>
              Doorstep Execution Console &bull; #{booking.id}
            </Text>
          </View>

          <View style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Text className="badge badge-green" style={{ fontSize: '0.82rem' }}>
              {booking.status.replace(/_/g, ' ')}
            </Text>
          </View>
        </View>

        <View className="dashboard-grid-2">
          {/* LEFT COLUMN: OpenStreetMap GPS Radar & Safety Checklist */}
          <View style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Map Radar Card */}
            <View className="web-card">
              <View className="card-header-row">
                <View>
                  <Text className="badge badge-neutral" style={{ marginBottom: 4 }}>
                    Booking #{booking.id}
                  </Text>
                  <h2 className="card-title" style={{ fontSize: '1.25rem' }}>
                    Live GPS Radar (OpenStreetMap)
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

              <WorkerMiniMap
                customerCoords={booking.coords || liveCustomerLocation || { lat, lng }}
                workerCoords={workerPosition || { lat: 12.9352, lng: 77.6245 }}
                height="340px"
              />

              <View className="field-grid" style={{ marginTop: 16 }}>
                <View className="field-box">
                  <View className="field-label">TARGET TREATMENT</View>
                  <View className="field-value">{booking.pestLabel}</View>
                  <View className="field-sub">{booking.planLabel} ({booking.sizeLabel})</View>
                </View>
                <View className="field-box">
                  <View className="field-label">DESTINATION COORDINATES</View>
                  <View className="field-value">
                    Lat: {Number(lat).toFixed(4)}, Lng: {Number(lng).toFixed(4)}
                  </View>
                  <View className="field-sub">{booking.address}</View>
                </View>
              </View>
            </View>

            {/* Travel Action Bar (When ON_THE_WAY) */}
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
                    : 'I Have Arrived at Customer Doorstep'}
                </TouchableOpacity>
              </View>
            )}

            {/* Safety Protocol Checklist (When ARRIVED, IN_PROGRESS, or COMPLETED) */}
            {['ARRIVED', 'IN_PROGRESS', 'COMPLETED'].includes(booking.status) && (
              <View className="web-card">
                <View className="card-header-row">
                  <h3 className="card-title">
                    <ShieldCheck size={20} color="var(--success)" />
                    <Text>Mandatory Safety Protocol (6 Steps)</Text>
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
                          <View style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                            {step.desc}
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>

                {/* Post-Treatment Photo Verification */}
                <View style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                  <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                      <View style={{ fontWeight: 700, fontSize: '0.90rem' }}>
                        Post-Treatment Site Photo Evidence
                      </View>
                      <View style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                        Required for CIB&RC warranty certificate activation
                      </View>
                    </View>
                    {afterPhotoTaken ? (
                      <Text className="badge badge-green">
                        <Check size={12} /> Captured
                      </Text>
                    ) : (
                      <TouchableOpacity
                        className="btn btn-outline btn-sm"
                        disabled={booking.status !== 'IN_PROGRESS'}
                        onClick={() => {
                          captureAfterPhoto();
                          toast('Site photo captured & uploaded!', 'success');
                        }}
                      >
                        <Camera size={14} /> Capture Photo
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* RIGHT COLUMN: Doorstep OTP, Complete Work, Review, and Payment QR */}
          <View style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* 1. Doorstep Treatment Start OTP */}
            <View className="web-card">
              <View className="card-header-row">
                <h3 className="card-title">
                  <KeyRound size={20} color="var(--primary)" />
                  <Text>Doorstep Treatment Start OTP</Text>
                </h3>
                <Text
                  className={`badge ${
                    booking.status === 'IN_PROGRESS' || booking.status === 'COMPLETED'
                      ? 'badge-green'
                      : booking.status === 'ARRIVED'
                      ? 'badge-amber'
                      : 'badge-neutral'
                  }`}
                >
                  {booking.status === 'IN_PROGRESS' || booking.status === 'COMPLETED'
                    ? '✓ OTP Verified'
                    : booking.status === 'ARRIVED'
                    ? 'Ask Customer for OTP'
                    : 'Locked (Mark Arrived First)'}
                </Text>
              </View>

              {booking.status === 'IN_PROGRESS' || booking.status === 'COMPLETED' ? (
                <View>
                  <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginBottom: 12 }}>
                    Doorstep Start OTP verified! Chemical application is active and authenticated.
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
                    {String(startOtp || booking?.startOtp || '4058')
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
              ) : booking.status === 'ARRIVED' ? (
                <View>
                  <View style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                    <TouchableOpacity className="btn btn-outline btn-sm" onClick={fillDemoOtp}>
                      Auto-Fill Customer OTP ({startOtp || booking?.startOtp || '4058'})
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
                <View style={{ textAlign: 'center', padding: '16px', background: 'var(--surface)', borderRadius: 12, border: '1px dashed var(--border-strong)' }}>
                  <Text style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>
                    Input slots unlock when you click "I Have Arrived" on the left.
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

            {/* Complete Work Button (When IN_PROGRESS) */}
            {booking.status === 'IN_PROGRESS' && (
              <View className="web-card" style={{ borderTop: '4px solid var(--primary)' }}>
                <View className="card-header-row">
                  <h3 className="card-title">
                    <Sparkles size={20} color="var(--primary)" />
                    <Text>Treatment Execution in Progress</Text>
                  </h3>
                  <Text className="badge badge-amber">Service Active</Text>
                </View>
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.85rem', marginBottom: 14 }}>
                  Follow the 6 safety protocol steps on the left. Once chemical treatment and cleanup are done, click below to mark completed and trigger customer review.
                </p>
                <TouchableOpacity
                  className="btn btn-primary btn-lg btn-block"
                  onClick={async () => {
                    await workerMarkWorkFinished();
                    toast('Treatment marked complete! Customer dashboard prompted for mandatory review.', 'success');
                  }}
                >
                  <CheckCircle2 size={18} /> Complete My Work & Request Customer Review
                </TouchableOpacity>
              </View>
            )}

            {/* 2. End-of-Service Completion Security PIN */}
            {(workCompletedByWorker || booking.status === 'COMPLETED') && (
              <View className="web-card">
                <View className="card-header-row">
                  <h3 className="card-title">
                    <Award size={20} color="var(--success)" />
                    <Text>End-of-Service Completion Security PIN</Text>
                  </h3>
                  <Text className={`badge ${pinVerifiedByWorker || booking.status === 'COMPLETED' ? 'badge-green' : 'badge-amber'}`}>
                    {pinVerifiedByWorker || booking.status === 'COMPLETED' ? '✓ PIN Verified' : 'Enter Customer PIN'}
                  </Text>
                </View>

                {pinVerifiedByWorker || booking.status === 'COMPLETED' ? (
                  <View>
                    <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginBottom: 12 }}>
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
                      {String(completionPin || '1666')
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
                ) : (
                  <View>
                    <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginBottom: 12 }}>
                      {customerReview
                        ? 'Customer submitted their review! Ask them for the 4-digit Completion PIN displayed on their screen:'
                        : 'Waiting for homeowner to submit mandatory review in Customer App. Once reviewed, PIN unlocks on customer screen:'}
                    </p>
                    <View style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8, gap: 6, flexWrap: 'wrap' }}>
                      {!customerReview && (
                        <TouchableOpacity
                          className="btn btn-outline btn-sm"
                          onClick={async () => {
                            await workerSimulateCustomerReview();
                            toast('Simulated customer 5-star review! PIN unlocked on customer dashboard.', 'success');
                          }}
                        >
                          Simulate Customer Review
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity className="btn btn-outline btn-sm" onClick={fillDemoCompPin}>
                        Auto-Fill PIN ({completionPin || '1666'})
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
                      className="btn btn-primary btn-block btn-lg"
                      disabled={compPinDigits.join('').length < 4}
                      onClick={handleVerifyCompPin}
                    >
                      <CheckCircle2 size={18} /> Verify Completion PIN & Generate Payment QR
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {/* 3. Automatic Dynamic UPI Payment QR Code */}
            {booking.status === 'COMPLETED' && (
              <View className="web-card" style={{ borderTop: '4px solid var(--primary)' }}>
                <View className="card-header-row">
                  <h3 className="card-title">
                    <QrCode size={20} color="var(--primary)" />
                    <Text>Official UPI Payment QR Code</Text>
                  </h3>
                  <Text className={`badge ${customerPaid ? 'badge-green' : 'badge-amber'}`}>
                    {customerPaid ? '✓ Payment Confirmed' : 'Scan to Pay'}
                  </Text>
                </View>

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
                    Official Easy HiCare UPI Soundbox Terminal
                  </View>
                  <View style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginBottom: 12 }}>
                    Customer verified! Scan with PhonePe / GPay / Paytm for Rs. {rawPrice}
                  </View>

                  <View
                    style={{
                      display: 'inline-block',
                      padding: 12,
                      background: '#FFFFFF',
                      borderRadius: 14,
                      border: '2px dashed var(--primary)',
                      marginBottom: 10,
                    }}
                  >
                    <Image
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                        `upi://pay?pa=easyhicare.ops@icici&pn=EasyHiCare&am=${rawPrice}&cu=INR&tn=Booking-${booking.id}`
                      )}`}
                      alt="UPI Payment QR Code"
                      style={{ width: 180, height: 180, display: 'block', margin: '0 auto' }}
                    />
                    <View style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--primary)', marginTop: 8 }}>
                      Rs. {rawPrice}
                    </View>
                    <View style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                      VPA: easyhicare.ops@icici
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
                    <View className="badge badge-green" style={{ width: '100%', padding: '12px', fontSize: '0.92rem', justifyContent: 'center' }}>
                      <CheckCircle2 size={18} /> Payment Confirmed & Settled to Wallet!
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }

  // DEFAULT WORKSPACE VIEW (Before clicking Continue & Navigate):
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Subheading: Active Job */}
      <View>
        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <View style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <View style={{ width: 8, height: 24, background: 'var(--primary)', borderRadius: 4 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Active Job</h3>
            <Text className="badge badge-green" style={{ fontSize: '0.78rem' }}>
              {booking?.status ? booking.status.replace(/_/g, ' ') : 'ASSIGNED'}
            </Text>
          </View>
        </View>

        {/* 50/50 Card: Left Map Preview, Right Job Details */}
        <View className="web-card" style={{ padding: 0, overflow: 'hidden', border: '1.5px solid var(--border-strong)' }}>
          <View className="dual-card-50">
            {/* Left 50%: Map and GPS preview */}
            <View style={{ padding: 24, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MapPin size={18} color="var(--primary)" />
                  <Text style={{ fontWeight: 800, fontSize: '1rem' }}>
                    Doorstep GPS & Map Radar
                  </Text>
                </View>
                <Text className={`badge ${contactUnlocked ? 'badge-green' : 'badge-amber'}`}>
                  {contactUnlocked ? 'Agency Clearance Granted' : 'Map Locked'}
                </Text>
              </View>

              {!contactUnlocked ? (
                /* State: Locked until agency clearance */
                <View
                  style={{
                    height: 220,
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, rgba(31,91,58,0.06), rgba(232,163,23,0.08))',
                    border: '1.5px dashed var(--border-strong)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                    textAlign: 'center',
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'var(--surface)',
                      border: '1px solid var(--border-strong)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Lock size={22} color="var(--accent)" />
                  </View>
                  <Text style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--ink)' }}>
                    Map & GPS Locked until Agency Clearance
                  </Text>
                  <Text style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', maxWidth: 320 }}>
                    Homeowner address and turn-by-turn navigation radar unlock as soon as the Agency grants 1-time clearance.
                  </Text>
                  <TouchableOpacity
                    className="btn btn-primary btn-sm"
                    onClick={async () => {
                      await agencyApproveBooking();
                      toast('Agency cleared dispatch! Map and GPS navigation unlocked.', 'success');
                    }}
                  >
                    <CheckCircle2 size={14} /> Grant Agency Clearance
                  </TouchableOpacity>
                </View>
              ) : (
                /* State: Unlocked -> Mini map preview + Continue & Navigate button */
                <View>
                  <WorkerMiniMap
                    customerCoords={booking?.coords || liveCustomerLocation || { lat, lng }}
                    workerCoords={workerPosition || { lat: 12.9352, lng: 77.6245 }}
                    height="200px"
                  />
                  <View style={{ marginTop: 14 }}>
                    <TouchableOpacity
                      className="btn btn-primary btn-lg btn-block"
                      onClick={async () => {
                        await workerAcceptAndNavigate();
                        setInExecutionView(true);
                        toast('En route! Live navigation console opened with real map.', 'success');
                      }}
                    >
                      <Navigation size={18} /> Continue & Navigate to Location
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Customer Contact & Address Info */}
              <View className="field-grid">
                <View className="field-box">
                  <View className="field-label">Customer Name</View>
                  <View className="field-value">
                    {contactUnlocked
                      ? booking?.customerFullName || 'Aarav Sharma'
                      : incomingJob?.maskedName || booking?.customerMaskedName || 'Aarav S.'}
                  </View>
                  <View className="field-sub">{contactUnlocked ? 'Verified' : 'Masked'}</View>
                </View>
                <View className="field-box">
                  <View className="field-label">Contact Phone</View>
                  <View className="field-value">
                    {contactUnlocked
                      ? booking?.customerRealPhone || '+91 98450 67890'
                      : incomingJob?.maskedPhone || '+91-984-XXX-7890 (Proxy)'}
                  </View>
                  <View className="field-sub">{contactUnlocked ? 'Direct Line' : 'Masked Proxy'}</View>
                </View>
              </View>
            </View>

            {/* Right 50%: Job Details */}
            <View style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--surface)' }}>
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View>
                  <Text style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                    Assigned Treatment
                  </Text>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)', margin: '2px 0 0' }}>
                    {booking?.pestLabel || 'Severe Cockroach Infestation & German Roach Colony'}
                  </h4>
                  <Text style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700 }}>
                    {booking?.planLabel || 'Dual-Layer Odorless Gel & Chemical Barrier'}
                  </Text>
                </View>
                <View style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                    Technician Payout
                  </Text>
                  <Text style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>
                    Rs. {workerPayout}
                  </Text>
                </View>
              </View>

              <View className="field-grid">
                <View className="field-box" style={{ background: '#FFFFFF' }}>
                  <View className="field-label">Property Size</View>
                  <View className="field-value">{booking?.sizeLabel || '2 BHK Apartment (1,250 sq.ft)'}</View>
                  <View className="field-sub">Inspection required</View>
                </View>
                <View className="field-box" style={{ background: '#FFFFFF' }}>
                  <View className="field-label">Scheduled Slot</View>
                  <View className="field-value">{booking?.slot || '01:00 PM - 03:00 PM'}</View>
                  <View className="field-sub">Priority Same-Day</View>
                </View>
              </View>

              <View className="field-box" style={{ background: '#FFFFFF' }}>
                <View className="field-label">Service Address</View>
                <View className="field-value">
                  {contactUnlocked
                    ? booking?.address || 'Flat 402, Green Glen Layout, Jayanagar 4th Block, Bengaluru'
                    : `${incomingJob?.area || 'Jayanagar 4th Block, Bengaluru'} (Exact flat locked until clearance)`}
                </View>
              </View>

              <View className="field-box" style={{ background: '#FFFFFF' }}>
                <View className="field-label">Customer Site Notes</View>
                <View style={{ fontSize: '0.86rem', color: 'var(--ink)', fontStyle: 'italic', lineHeight: 1.4 }}>
                  "{booking?.note || 'Pet friendly herbal gel, kitchen deep crevice treatment, do not spray near aquarium.'}"
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Subheading: Queue State */}
      <View style={{ marginTop: 8 }}>
        <View style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <View style={{ width: 8, height: 24, background: 'var(--accent)', borderRadius: 4 }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Queue State</h3>
          <Text className="badge badge-neutral" style={{ fontSize: '0.78rem' }}>
            Exactly 2 Scheduled Jobs In Queue
          </Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {QUEUED_JOBS.map((job, idx) => (
            <View
              key={job.id}
              className="web-card"
              style={{ padding: 0, overflow: 'hidden', border: '1.5px solid var(--border)' }}
            >
              <View className="dual-card-50">
                {/* Left 50%: Locked Preview Map */}
                <View style={{ padding: 20, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Text className="badge badge-neutral" style={{ fontWeight: 800 }}>Queue #{idx + 1}</Text>
                      <Text style={{ fontWeight: 800, fontSize: '0.95rem' }}>{job.id}</Text>
                    </View>
                    <Text className="badge badge-amber">{job.scheduledTime.split(' - ')[0]}</Text>
                  </View>

                  {/* Locked preview radar */}
                  <View
                    style={{
                      height: 140,
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, rgba(31,91,58,0.04), rgba(232,163,23,0.06))',
                      border: '1px dashed var(--border-strong)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                    }}
                  >
                    <Lock size={18} color="var(--ink-muted)" />
                    <Text style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)' }}>
                      Locked in Queue ({job.distance})
                    </Text>
                    <Text style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                      {job.area}
                    </Text>
                  </View>

                  <View className="field-grid">
                    <View className="field-box">
                      <View className="field-label">Customer</View>
                      <View className="field-value">{job.customerMasked}</View>
                    </View>
                    <View className="field-box">
                      <View className="field-label">Contact</View>
                      <View className="field-value">{job.phoneMasked}</View>
                    </View>
                  </View>
                </View>

                {/* Right 50%: Job Details */}
                <View style={{ padding: 20, background: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View>
                      <Text style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                        Treatment
                      </Text>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '2px 0 0' }}>{job.service}</h4>
                      <Text style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>{job.plan}</Text>
                    </View>
                    <View style={{ textAlign: 'right' }}>
                      <Text style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                        Est. Payout
                      </Text>
                      <Text style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
                        Rs. {job.payout}
                      </Text>
                    </View>
                  </View>

                  <View className="field-grid">
                    <View className="field-box" style={{ background: '#FFFFFF' }}>
                      <View className="field-label">Property</View>
                      <View className="field-value" style={{ fontSize: '0.85rem' }}>{job.propertySize}</View>
                    </View>
                    <View className="field-box" style={{ background: '#FFFFFF' }}>
                      <View className="field-label">Slot</View>
                      <View className="field-value" style={{ fontSize: '0.85rem' }}>{job.scheduledTime}</View>
                    </View>
                  </View>

                  <View className="field-box" style={{ background: '#FFFFFF' }}>
                    <View className="field-label">Inspection & Notes</View>
                    <View style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>{job.inspection}</View>
                    <View style={{ fontSize: '0.82rem', color: 'var(--ink)', fontStyle: 'italic', marginTop: 4 }}>
                      "{job.siteNotes}"
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

// OPTION 3: TODAY'S ROUTE & STOPS (Completed Jobs Only)
function RouteSection({ toast, onNavigate }) {
  const completedStops = [
    {
      id: 'PF-7801',
      time: '09:00 AM - 10:30 AM',
      customer: 'Smt. Priya Rao',
      area: 'JP Nagar 6th Phase, Bengaluru',
      service: 'Cockroach Herbal Gel Eradication',
      chemical: 'Fipronil 0.05% Gel (CIB&RC Reg 2021-08)',
      payout: 550,
      status: 'COMPLETED',
      warranty: '90 Days Warranty',
      expiryDate: '28-Dec-2026',
    },
    {
      id: 'PF-7802',
      time: '11:00 AM - 12:30 PM',
      customer: 'Dr. K. Venkatesh',
      area: 'BTM Layout 2nd Stage, Bengaluru',
      service: 'Termite Spot Injection & Wood Shield',
      chemical: 'Imidacloprid 30.5% SC (CIB&RC Reg 2019-44)',
      payout: 850,
      status: 'COMPLETED',
      warranty: '180 Days Warranty',
      expiryDate: '28-Mar-2027',
    },
    {
      id: 'PF-7803',
      time: '01:30 PM - 02:45 PM',
      customer: 'M/s Urban Roast Cafe',
      area: 'Indiranagar 12th Main, Bengaluru',
      service: 'Commercial Kitchen Disinfestation',
      chemical: 'Deltamethrin 2.5% EC (CIB&RC Reg 2020-12)',
      payout: 650,
      status: 'COMPLETED',
      warranty: '60 Days Commercial Warranty',
      expiryDate: '28-Nov-2026',
    },
    {
      id: 'PF-7804',
      time: '03:30 PM - 05:00 PM',
      customer: 'Sri Anand Kumar',
      area: 'Whitefield Borewell Rd, Bengaluru',
      service: 'Mosquito Ultra Low Volume Fogging',
      chemical: 'Deltamethrin 1.25% ULV Formulation',
      payout: 700,
      status: 'COMPLETED',
      warranty: '30 Days Community Warranty',
      expiryDate: '28-Oct-2026',
    },
  ];

  const totalPayout = completedStops.reduce((sum, s) => sum + s.payout, 0);

  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 3 KPI Cards for Completed Stops */}
      <View className="dashboard-grid-3">
        <View className="kpi-card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>
              Stops Completed Today
            </Text>
            <CheckCircle2 size={18} color="var(--primary)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)' }}>
            {completedStops.length} Stops
          </View>
          <View className="kpi-foot">Audit log of 100% finished treatments</View>
        </View>

        <View className="kpi-card" style={{ borderLeft: '4px solid var(--success)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>
              Quality & Customer Reviews
            </Text>
            <Star size={18} color="var(--success)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--success)' }}>
            100% 5-Star
          </View>
          <View className="kpi-foot">Verified homeowner signatures & OTPs</View>
        </View>

        <View className="kpi-card" style={{ borderLeft: '4px solid var(--primary-dark)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>
              Settled Route Payout
            </Text>
            <IndianRupee size={18} color="var(--primary-dark)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
            Rs. {totalPayout}
          </View>
          <View className="kpi-foot">Includes travel allowance & safety bonus</View>
        </View>
      </View>

      {/* Completed Stops Table */}
      <View className="web-card">
        <View className="card-header-row" style={{ flexWrap: 'wrap' }}>
          <View>
            <h2 className="card-title">Completed Route History & Warranty Registry</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginTop: 2 }}>
              Official audit log of jobs completed by Arjun Sharma (CHL-2024-889) today.
            </p>
          </View>
          <Text className="badge badge-green">4 Verified Closures</Text>
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
                <th>Warranty Period & Expiry</th>
              </tr>
            </thead>
            <tbody>
              {completedStops.map((stop) => (
                <tr key={stop.id}>
                  <td style={{ fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>
                    #{stop.id}
                  </td>
                  <td style={{ fontWeight: 600 }}>{stop.time}</td>
                  <td>
                    <View style={{ fontWeight: 700 }}>{stop.customer}</View>
                    <View style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>{stop.area}</View>
                  </td>
                  <td>
                    <View style={{ fontWeight: 600 }}>{stop.service}</View>
                    <View style={{ fontSize: '0.76rem', color: 'var(--ink-muted)' }}>{stop.chemical}</View>
                  </td>
                  <td style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>
                    Rs. {stop.payout}
                  </td>
                  <td>
                    <Text className="badge badge-green">
                      <Check size={12} /> {stop.status}
                    </Text>
                  </td>
                  <td>
                    <View style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--ink)' }}>{stop.warranty}</View>
                    <View style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>Expires: {stop.expiryDate}</View>
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

// OPTION 4: EARNINGS & UPI PAYOUT
function EarningsSection({ toast }) {
  const { earnings, payoutHistory, requestInstantPayout, updateUpiId } = useAppStore();
  const [editingUpi, setEditingUpi] = useState(false);
  const [upiDraft, setUpiDraft] = useState(earnings.upiId || 'arjun.sharma@okaxis');

  const saveUpi = () => {
    if (!upiDraft.includes('@')) {
      toast('Please enter a valid UPI VPA (e.g. name@okhdfcbank)', 'error');
      return;
    }
    updateUpiId(upiDraft);
    setEditingUpi(false);
    toast('UPI ID updated successfully!', 'success');
  };

  const handleWithdraw = async () => {
    if (earnings.availableBalance < 500) {
      toast('Minimum withdrawal threshold is Rs. 500', 'error');
      return;
    }
    const res = await requestInstantPayout(earnings.availableBalance);
    if (res.ok) {
      toast(`IMPS instant transfer of Rs. ${earnings.availableBalance} initiated! UTR: ${res.utr}`, 'success');
    }
  };

  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <View className="dashboard-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <View className="kpi-card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>Available for Withdrawal</Text>
            <Wallet size={18} color="var(--primary)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)' }}>
            Rs. {earnings.availableBalance}
          </View>
          <View className="kpi-foot">Instant IMPS to Bank A/c</View>
        </View>

        <View className="kpi-card" style={{ borderLeft: '4px solid var(--success)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>Today's Accrued</Text>
            <IndianRupee size={18} color="var(--success)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--success)' }}>
            Rs. {earnings.today}
          </View>
          <View className="kpi-foot">4 completed stops today</View>
        </View>

        <View className="kpi-card" style={{ borderLeft: '4px solid #E8A317' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>This Week</Text>
            <Calendar size={18} color="#E8A317" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#B87F0D' }}>
            Rs. {earnings.thisWeek}
          </View>
          <View className="kpi-foot">Includes Rs. 600 safety incentive</View>
        </View>

        <View className="kpi-card" style={{ borderLeft: '4px solid var(--primary-dark)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>Lifetime Earnings</Text>
            <Award size={18} color="var(--primary-dark)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
            Rs. {earnings.totalLifetime}
          </View>
          <View className="kpi-foot">Across 428 treatments</View>
        </View>
      </View>

      <View className="dashboard-grid-2">
        {/* Instant IMPS Settlement Card */}
        <View className="web-card">
          <View className="card-header-row">
            <h3 className="card-title">
              <Wallet size={20} color="var(--primary)" />
              <Text>Instant IMPS Settlement Terminal</Text>
            </h3>
            <Text className="badge badge-green">Zero Transfer Fee</Text>
          </View>

          <p style={{ color: 'var(--ink-muted)', fontSize: '0.88rem', marginBottom: 18, lineHeight: 1.5 }}>
            Withdraw your earned commissions directly to your verified bank UPI VPA or account. Funds settle in 30 seconds via NPCI IMPS.
          </p>

          <View style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 16, marginBottom: 18 }}>
            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <Text style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                Primary UPI ID (VPA)
              </Text>
              {!editingUpi && (
                <TouchableOpacity
                  className="btn btn-outline btn-sm"
                  onClick={() => setEditingUpi(true)}
                >
                  <Edit3 size={13} /> Edit UPI
                </TouchableOpacity>
              )}
            </View>

            {editingUpi ? (
              <View style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <TextInput
                  type="text"
                  value={upiDraft}
                  onChange={(e) => setUpiDraft(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid var(--border-strong)',
                    fontFamily: 'var(--font-mono)',
                  }}
                />
                <TouchableOpacity className="btn btn-primary btn-sm" onClick={saveUpi}>
                  Save
                </TouchableOpacity>
                <TouchableOpacity className="btn btn-outline btn-sm" onClick={() => setEditingUpi(false)}>
                  Cancel
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <QrCode size={18} color="var(--primary)" />
                <Text style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 800 }}>
                  {earnings.upiId || 'arjun.sharma@okaxis'}
                </Text>
                <Text className="badge badge-green" style={{ fontSize: '0.72rem' }}>Verified</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            className="btn btn-primary btn-lg btn-block"
            disabled={earnings.availableBalance < 500}
            onClick={handleWithdraw}
          >
            <Send size={18} /> Transfer Rs. {earnings.availableBalance} Instantly
          </TouchableOpacity>
        </View>

        {/* UTR Settlement Ledger */}
        <View className="web-card">
          <View className="card-header-row">
            <h3 className="card-title">
              <FileText size={20} color="var(--primary)" />
              <Text>Recent Bank Settlement Ledger</Text>
            </h3>
            <Text className="badge badge-neutral">IMPS UTR Audit</Text>
          </View>

          <View className="web-table-wrap">
            <table className="web-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Amount</th>
                  <th>Destination</th>
                  <th>Status & UTR</th>
                </tr>
              </thead>
              <tbody>
                {payoutHistory.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontSize: '0.82rem' }}>{item.date}</td>
                    <td style={{ fontWeight: 800, color: 'var(--primary)' }}>Rs. {item.amount}</td>
                    <td style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>{item.upiId}</td>
                    <td>
                      <Text className="badge badge-green">{item.status}</Text>
                      <View style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: 2 }}>{item.utr}</View>
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

// OPTION 5: SAFETY HUB & PRECAUTIONS (Clean CIB&RC Sheets, No Clumsy Inline Chat)
function SafetySection({ toast, openExposureModal }) {
  const [selectedChem, setSelectedChem] = useState(BUNDLED_CHEMICAL_SHEETS[0]);

  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <View className="web-card">
        <View className="card-header-row" style={{ flexWrap: 'wrap', gap: 12 }}>
          <View>
            <h2 className="card-title">
              <FileText size={22} color="var(--primary)" />
              <Text>CIB&RC Chemical Safety Data Sheets (CSDS)</Text>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginTop: 2 }}>
              Official government-approved formulations, exact dilution ratios, mandatory PPE gear, and emergency antidotes.
            </p>
          </View>
          <TouchableOpacity
            className="btn btn-danger btn-sm"
            onClick={openExposureModal}
          >
            <HeartPulse size={15} /> Emergency Exposure Protocol
          </TouchableOpacity>
        </View>

        {/* Formulation Selector Pills */}
        <View style={{ display: 'flex', gap: 8, margin: '16px 0', flexWrap: 'wrap' }}>
          {BUNDLED_CHEMICAL_SHEETS.map((sheet) => (
            <TouchableOpacity
              key={sheet.id}
              className={`stage-pill-btn ${selectedChem.id === sheet.id ? 'active' : ''}`}
              onClick={() => setSelectedChem(sheet)}
              style={selectedChem.id === sheet.id ? { background: 'var(--primary)', color: '#FFFFFF', borderColor: 'var(--primary)' } : {}}
            >
              {sheet.name}
            </TouchableOpacity>
          ))}
        </View>

        {selectedChem && (
          <View className="web-card-surface" style={{ padding: 20, borderRadius: 16 }}>
            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <View>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)', margin: 0 }}>
                  {selectedChem.name}
                </h3>
                <View style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginTop: 3 }}>
                  Govt Reg No: <strong>{selectedChem.cibrcReg}</strong> &bull; Active: {selectedChem.activeIngredient}
                </View>
              </View>
              <Text className="badge badge-amber" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                Re-entry Safe Time: {selectedChem.reEntryMinutes} mins
              </Text>
            </View>

            <View className="field-grid" style={{ marginBottom: 16 }}>
              <View className="field-box" style={{ background: '#FFFFFF' }}>
                <View className="field-label">Prescribed Dilution Ratio</View>
                <View className="field-value" style={{ fontSize: '0.95rem' }}>
                  {selectedChem.dilutionRatio}
                </View>
                <View className="field-sub">Never exceed prescribed active concentration</View>
              </View>

              <View className="field-box" style={{ background: '#FFFFFF' }}>
                <View className="field-label">Target Pests</View>
                <View className="field-value" style={{ fontSize: '0.95rem' }}>
                  {selectedChem.targetPests}
                </View>
                <View className="field-sub">Indoor & perimeter crevice application</View>
              </View>
            </View>

            <View className="field-box" style={{ background: '#FFFFFF', marginBottom: 16 }}>
              <View className="field-label">Mandatory Personal Protective Equipment (PPE)</View>
              <View style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                {selectedChem.requiredPpe.map((ppe, idx) => (
                  <Text key={idx} className="badge badge-green" style={{ padding: '6px 12px', fontSize: '0.82rem' }}>
                    <ShieldCheck size={14} /> {ppe}
                  </Text>
                ))}
              </View>
            </View>

            <View className="field-box" style={{ background: '#FFFFFF', border: '1.5px solid var(--danger-light)' }}>
              <View className="field-label" style={{ color: 'var(--danger)', fontWeight: 800 }}>
                First-Aid & Medical Antidote Protocol
              </View>
              <View style={{ fontSize: '0.88rem', lineHeight: 1.6, marginTop: 8 }}>
                <p><strong>Dermal / Eye Contact:</strong> {selectedChem.firstAidSkinEye}</p>
                <p style={{ marginTop: 4 }}><strong>Respiratory Inhalation:</strong> {selectedChem.firstAidInhalation}</p>
                <p style={{ marginTop: 4 }}><strong>Specific Antidote:</strong> <span style={{ color: 'var(--danger)', fontWeight: 700 }}>{selectedChem.antidote}</span></p>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

// MAIN WORKER PORTAL APP
export default function App() {
  const [activeSection, setActiveSection] = useState('overview'); // 'overview' | 'workspace' | 'route' | 'earnings' | 'safety'
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    booking,
    dutyStatus,
    setDutyStatus,
    earnings,
    syncFromRemote,
  } = useAppStore();
  const { toasts, show: toast } = useToast();

  useEffect(() => {
    syncFromRemote();
    const id = setInterval(() => syncFromRemote(), 3000);
    return () => clearInterval(id);
  }, [syncFromRemote]);

  const toggleDuty = (st) => setDutyStatus(st);

  const navItems = [
    {
      id: 'overview',
      label: 'Worker Overview & Stats',
      icon: Award,
      badge: '99.4% SLA',
    },
    {
      id: 'workspace',
      label: 'Active Jobs & Workspace',
      icon: Briefcase,
      badge: booking && booking.status !== 'CANCELLED' ? booking.status.replace(/_/g, ' ') : 'Idle',
    },
    {
      id: 'route',
      label: "Today's Route & Stops",
      icon: MapPin,
      badge: '4 Completed',
    },
    {
      id: 'earnings',
      label: 'Earnings & UPI Payout',
      icon: Wallet,
      badge: `Rs. ${earnings.today}`,
    },
    {
      id: 'safety',
      label: 'Safety Hub & Precautions',
      icon: ShieldCheck,
      badge: '3 Sheets',
    },
  ];

  const sectionHeaders = {
    overview: {
      title: 'Worker Operations & Performance Overview',
      subtitle: 'Dynamic performance analytics, active doorstep dispatch gate, and prioritized service queue',
    },
    workspace: {
      title: 'Active Jobs & Doorstep Route Workspace',
      subtitle: 'Live Leaflet OpenStreetMap navigation, arrival OTP verification, and end-of-service PIN settlement',
    },
    route: {
      title: "Today's Completed Route History & Warranty Registry",
      subtitle: 'Verified audit log of completed treatments with client locality, chemical formulations, and warranties',
    },
    earnings: {
      title: 'Technician Earnings & Instant UPI Settlement',
      subtitle: 'Track daily commission payouts, safety compliance bonuses, and instant IMPS transfers',
    },
    safety: {
      title: 'CIB&RC Chemical Safety Data Sheets & AI Assistant',
      subtitle: 'Verified dilution ratios, mandatory PPE checklists, and emergency exposure protocols',
    },
  };

  // AI Assistant Chat State for Modal
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiChatLog, setAiChatLog] = useState([
    {
      role: 'assistant',
      text: 'Hello Arjun! I am your Grounded Chemical Safety Assistant. Ask me about dilution ratios, required PPE, re-entry wait times, or first-aid for Deltamethrin 2.5% EC, Imidacloprid 30.5% SC, or Fipronil 0.05% Gel.',
    },
  ]);

  const askAiModal = (customPrompt) => {
    const q = (customPrompt ?? aiQuestion).trim();
    if (!q) return;
    const res = answerWorkerSafetyQuestion(q);
    setAiChatLog((prev) => [
      ...prev,
      { role: 'user', text: q },
      { role: 'assistant', text: res.answer, known: res.known },
    ]);
    if (!customPrompt) setAiQuestion('');
  };

  return (
    <View className="web-layout">
      <ToastStack toasts={toasts} />

      {/* EMERGENCY SOS MODAL */}
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

      {/* TECHNICIAN SETTINGS & KYC MODAL */}
      <ModalDialog
        open={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        title="Technician Profile & Compliance Settings"
        icon={Sliders}
      >
        <View style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <View style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'var(--primary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: 800,
                border: '2px solid #FFFFFF',
                boxShadow: '0 4px 12px rgba(31,91,58,0.25)',
              }}
            >
              AS
            </View>
            <View>
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Arjun Sharma</h3>
              <Text style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>
                Certified Applicator &bull; Easy HiCare South Central Hub
              </Text>
            </View>
          </View>

          <View className="field-grid">
            <View className="field-box">
              <View className="field-label">Aadhaar Card</View>
              <View className="field-value">XXXX-XXXX-4819</View>
              <View className="field-sub">Govt UIDAI Verified</View>
            </View>
            <View className="field-box">
              <View className="field-label">PAN Number</View>
              <View className="field-value">ABCPS1234K</View>
              <View className="field-sub">Tax ID Linked</View>
            </View>
            <View className="field-box">
              <View className="field-label">Mobile Number</View>
              <View className="field-value">+91 98765 43210</View>
              <View className="field-sub">SMS Dispatch Active</View>
            </View>
            <View className="field-box">
              <View className="field-label">Email ID</View>
              <View className="field-value">arjun.sharma@easyhicare.in</View>
              <View className="field-sub">Corporate Email</View>
            </View>
          </View>

          <View className="field-box">
            <View className="field-label">CIB&RC Government Applicator License</View>
            <View className="field-value">CHL-2024-889 (Valid till Oct 2029)</View>
            <View className="field-sub">Class 1 Chemical Safety Certified</View>
          </View>

          <TouchableOpacity
            className="btn btn-outline btn-block"
            onClick={() => {
              setSettingsModalOpen(false);
              toast('Settings & documents are up to date.', 'info');
            }}
          >
            Close Settings
          </TouchableOpacity>
        </View>
      </ModalDialog>

      {/* AI CHEMICAL SAFETY ASSISTANT MODAL (Opened via floating bubble) */}
      <ModalDialog
        open={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        title="AI Grounded Chemical Safety Assistant"
        icon={Bot}
      >
        <View style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <View style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[
              'Dilution ratio for Deltamethrin?',
              'What PPE for Imidacloprid?',
              'First aid for Fipronil eye splash?',
              'Re-entry time for Termite Shield?',
            ].map((q, idx) => (
              <TouchableOpacity
                key={idx}
                className="stage-pill-btn"
                style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                onClick={() => askAiModal(q)}
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
              padding: 14,
              height: 280,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {aiChatLog.map((m, i) => (
              <View
                key={i}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                  padding: '10px 14px',
                  borderRadius: 12,
                  background: m.role === 'user' ? 'var(--primary)' : '#FFFFFF',
                  color: m.role === 'user' ? '#FFFFFF' : 'var(--ink)',
                  border: m.role === 'user' ? 'none' : '1px solid var(--border-strong)',
                  fontSize: '0.88rem',
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
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && askAiModal()}
              placeholder="Ask about dilution, PPE, re-entry time, or first aid..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 10,
                border: '1px solid var(--border-strong)',
                background: 'var(--surface)',
                fontSize: '0.9rem',
              }}
            />
            <TouchableOpacity className="btn btn-primary" onClick={() => askAiModal()}>
              <Send size={15} /> Ask
            </TouchableOpacity>
          </View>
        </View>
      </ModalDialog>

      {/* FLOATING CIRCULAR AI ASSISTANT BUBBLE (Bottom-Right with Airy Pulse) */}
      <View
        className="floating-ai-bubble"
        onClick={() => setAiModalOpen(true)}
        title="Ask AI Chemical Safety Assistant"
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          width: 62,
          height: 62,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1F5B3A, #143F28)',
          boxShadow: '0 8px 24px rgba(31,91,58,0.38)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1000,
          border: '2.5px solid rgba(255,255,255,0.9)',
          transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        <Bot size={28} color="#FFFFFF" />
        <View
          style={{
            position: 'absolute',
            top: -2,
            right: -2,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#E8A317',
            border: '2px solid #FFFFFF',
            boxShadow: '0 0 8px #E8A317',
          }}
        />
        <View
          className="pulse-ring"
          style={{
            position: 'absolute',
            inset: -6,
            borderRadius: '50%',
            border: '2px solid rgba(31,91,58,0.5)',
            animation: 'aiPulse 2s cubic-bezier(0.24, 0, 0.38, 1) infinite',
            pointerEvents: 'none',
          }}
        />
      </View>

      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <View className={`web-sidebar ${sidebarOpen ? 'mobile-open' : ''}`} accessibilityRole="navigation" aria-label="Technician Operations Navigation">
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px 4px', gap: 8 }}>
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,0.08)',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.2)',
              fontWeight: 700,
              padding: '8px 12px',
              borderRadius: 10,
              textDecoration: 'none',
              fontSize: '0.82rem',
              cursor: 'pointer',
              flex: 1
            }}
          >
            <Home size={15} />
            <span>&larr; Universal Home</span>
          </a>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: 'none',
              color: '#FFFFFF',
              padding: '7px 8px',
              borderRadius: 8,
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </View>

        {/* Brand Header with Easy HiCare Logo */}
        <View className="sidebar-brand">
          <Image
            src="/easyhicare-logo.png"
            alt="Easy HiCare Logo"
            style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'contain', background: '#FFFFFF', padding: 3 }}
          />
          <View>
            <Text className="brand-title" style={{ fontSize: '1.15rem', fontWeight: 800 }}>Easy HiCare</Text>
            <Text className="brand-subtitle" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)' }}>Pest Solutions &bull; Technician</Text>
          </View>
        </View>

        {/* 5 Navigation Items */}
        <View className="sidebar-nav">
          <Text className="nav-section-label">Operations Console</Text>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
                onPress={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
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

        {/* BOTTOM LEFT: Technician Profile & KYC Card (Replacing Emergency SOS) */}
        <View
          style={{
            margin: '12px 14px',
            padding: '14px',
            borderRadius: 14,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <View style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'var(--accent)',
                color: 'var(--ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              AS
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '0.95rem' }}>Arjun Sharma</Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem' }}>Lic: CHL-2024-889</Text>
            </View>
            <Text className="badge badge-green" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>KYC ✓</Text>
          </View>

          <View style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.72)', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Text>Aadhaar: <strong style={{ color: '#FFFFFF' }}>XXXX-XXXX-4819</strong></Text>
            <Text>PAN: <strong style={{ color: '#FFFFFF' }}>ABCPS1234K</strong></Text>
            <Text>Hub: South Central BLR Hub</Text>
          </View>

          <View style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                padding: '6px 8px',
                borderRadius: 8,
                background: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 700,
                border: 'none',
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={() => setSettingsModalOpen(true)}
            >
              Settings
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                padding: '6px 8px',
                borderRadius: 8,
                background: 'rgba(201,59,43,0.25)',
                color: '#FCA5A5',
                fontSize: '0.75rem',
                fontWeight: 700,
                border: '1px solid rgba(201,59,43,0.4)',
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                toast('Logged out of session.', 'info');
              }}
            >
              Log Out
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              padding: '4px 8px',
              background: 'transparent',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.7rem',
              border: 'none',
              textAlign: 'center',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => setSosModalOpen(true)}
          >
            Spill / Exposure SOS Hotline
          </TouchableOpacity>
        </View>
      </View>

      {/* MAIN OPERATIONS WORKDECK */}
      <View className="web-main">
        {/* TOPBAR with Easy HiCare Certifications */}
        <View className="web-topbar">
          <View style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity
              className="btn btn-outline btn-sm mobile-menu-btn"
              style={{ padding: '6px 10px' }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={18} />
            </TouchableOpacity>
            <View>
              <View style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                <Text className="topbar-title" style={{ fontSize: '1.45rem', fontWeight: 800 }}>
                  {sectionHeaders[activeSection]?.title || 'Technician Portal'}
                </Text>
                <Text className="badge badge-green" style={{ fontSize: '0.75rem', padding: '3px 8px' }}>
                  Govt Approved CIB&RC &bull; ISO 9001:2015
                </Text>
              </View>
              <Text className="topbar-subtitle">
                {sectionHeaders[activeSection]?.subtitle || 'Certified Pest Solutions'}
              </Text>
            </View>
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

        {/* PAGE CONTENT */}
        <View className="web-page">
          {activeSection === 'overview' && (
            <WorkerOverviewSection toast={toast} onNavigate={setActiveSection} />
          )}
          {activeSection === 'workspace' && (
            <ActiveJobWorkspaceSection toast={toast} onNavigate={setActiveSection} />
          )}
          {activeSection === 'route' && (
            <RouteSection toast={toast} onNavigate={setActiveSection} />
          )}
          {activeSection === 'earnings' && <EarningsSection toast={toast} />}
          {activeSection === 'safety' && (
            <SafetySection toast={toast} openExposureModal={() => setSosModalOpen(true)} />
          )}
        </View>
      </View>
    </View>
  );
}

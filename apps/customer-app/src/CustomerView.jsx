import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ModalDialog } from '@pest-free/ui-kit';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Sparkles,
  Navigation,
  History,
  Bug,
  Award,
  Phone,
  Lock,
  User,
  Edit3,
  LogOut,
  Menu,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { useAppStore } from './lib/api/store.js';
import { BookSection } from './pages/BookSection.jsx';
import { TrackSection } from './pages/TrackSection.jsx';
import { HistorySection } from './pages/HistorySection.jsx';
import { SafetyGuideSection } from './pages/SafetyGuideSection.jsx';

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

export default function CustomerView() {
  const [isLandingView, setIsLandingView] = useState(true);
  const [activeSection, setActiveSection] = useState('book');
  const [helpOpen, setHelpOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Verified Customer Profile & Primary Location state
  const [userProfile, setUserProfile] = useState({
    name: 'Aarav Sharma',
    phone: '+91 98402 11982',
    email: 'aarav.sharma@gmail.com',
    addressText: 'Flat 402, Palm Grove Residency, 11th Main Rd, Jayanagar 4th Block, Bengaluru 560011',
    locality: 'Jayanagar 4th Block, BLR',
    coords: { lat: 12.9250, lng: 77.5938 },
  });
  const [profileDraft, setProfileDraft] = useState({
    name: 'Aarav Sharma',
    phone: '+91 98402 11982',
    email: 'aarav.sharma@gmail.com',
    addressText: 'Flat 402, Palm Grove Residency, 11th Main Rd, Jayanagar 4th Block, Bengaluru 560011',
    locality: 'Jayanagar 4th Block, BLR',
    coords: { lat: 12.9250, lng: 77.5938 },
  });
  const [detectingProfileGps, setDetectingProfileGps] = useState(false);

  const { booking, history, syncFromRemote } = useAppStore();
  const { toasts, show: toast } = useToast();

  useEffect(() => {
    syncFromRemote();
    const id = setInterval(() => syncFromRemote(), 3000);
    return () => clearInterval(id);
  }, [syncFromRemote]);

  // Ensure scroll is reset to the top whenever section or view switches (especially for Live Tracking)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [activeSection, isLandingView]);

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

  return (
    <View style={{ minHeight: '100vh', background: 'var(--canvas)' }}>
      <ToastStack toasts={toasts} />

      {/* ─── Modern Customer Profile & Location Modal ─────────────────────────────── */}
      <ModalDialog
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        title="Customer Profile & Primary Residence"
        icon={User}
      >
        <View style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Top Agency Branding Bar with Logo */}
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              padding: '12px 16px',
              background: 'linear-gradient(135deg, rgba(31,91,58,0.08), rgba(232,163,23,0.12))',
              borderRadius: 14,
              border: '1.5px solid var(--border-strong)',
              flexWrap: 'wrap',
            }}
          >
            <View style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Image
                src="/easyhicare-logo.png"
                alt="Easy HiCare Pest Solutions"
                style={{
                  height: 44,
                  width: 'auto',
                  maxWidth: 96,
                  borderRadius: 8,
                  objectFit: 'contain',
                  background: '#FFFFFF',
                  padding: '2px 6px',
                  border: '1px solid var(--border)',
                }}
              />
              <View>
                <Text style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 900, color: 'var(--ink)' }}>
                  Easy HiCare Pest Solutions
                </Text>
                <Text style={{ fontSize: '0.74rem', color: 'var(--ink-muted)', fontWeight: 600 }}>
                  Govt CIB&RC Approved • Official Customer Registry
                </Text>
              </View>
            </View>
            <View style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <Text className="badge badge-green" style={{ fontSize: '0.72rem' }}>
                <CheckCircle2 size={12} /> Agency Verified
              </Text>
              <Text className="badge badge-amber" style={{ fontSize: '0.72rem' }}>
                <ShieldCheck size={12} /> 90d Warranty
              </Text>
            </View>
          </View>

          {/* Customer Avatar & Quick Status */}
          <View style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '4px 2px' }}>
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'var(--primary)',
                border: '3px solid var(--accent)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '1.2rem',
                boxShadow: '0 4px 12px rgba(31,91,58,0.25)',
                flexShrink: 0,
              }}
            >
              {profileDraft.name
                ? profileDraft.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()
                : 'AK'}
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink)' }}>
                {profileDraft.name || 'Aarav Sharma'}
              </Text>
              <Text style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                {profileDraft.locality || 'Jayanagar 4th Block, BLR'}
              </Text>
            </View>
          </View>

          {/* Form Fields Grid */}
          <View style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {/* Field 1: Full Name */}
            <View className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="profile-name">
                Full Name (Editable)
              </label>
              <TextInput
                id="profile-name"
                className="form-input"
                style={{ width: '100%' }}
                value={profileDraft.name}
                onChange={(e) => setProfileDraft((p) => ({ ...p, name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </View>

            {/* Field 2: Email Address */}
            <View className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="profile-email">
                Email Address (Editable)
              </label>
              <TextInput
                id="profile-email"
                type="email"
                className="form-input"
                style={{ width: '100%' }}
                value={profileDraft.email}
                onChange={(e) => setProfileDraft((p) => ({ ...p, email: e.target.value }))}
                placeholder="e.g. aarav.sharma@gmail.com"
              />
            </View>
          </View>

          {/* Field 3: Mobile Number (STRICTLY LOCKED / NON-EDITABLE) */}
          <View className="form-group" style={{ marginBottom: 0 }}>
            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <label className="form-label" htmlFor="profile-phone" style={{ marginBottom: 0 }}>
                Mobile Number (Locked for Security & OTP Handshake)
              </label>
              <Text className="badge badge-neutral" style={{ fontSize: '0.7rem', gap: 4 }}>
                <Lock size={11} /> Non-Editable
              </Text>
            </View>
            <View style={{ position: 'relative' }}>
              <TextInput
                id="profile-phone"
                className="form-input"
                value={profileDraft.phone}
                disabled
                readOnly
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.05)',
                  cursor: 'not-allowed',
                  color: 'var(--ink-muted)',
                  borderColor: 'var(--border)',
                  paddingRight: 36,
                  fontWeight: 700,
                }}
              />
              <Lock
                size={16}
                color="var(--ink-muted)"
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}
              />
            </View>
            <p style={{ fontSize: '0.74rem', color: 'var(--ink-muted)', marginTop: 4 }}>
              🔒 Mobile number is permanently locked to your verified Easy HiCare account for doorstep start OTP verification and compliance certificates.
            </p>
          </View>

          {/* Field 4: House Location in Text */}
          <View className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="profile-address">
              House Location in Text (Flat/House No., Building, Street, Locality)
            </label>
            <TextInput multiline
              id="profile-address"
              rows={2}
              className="form-textarea"
              style={{ width: '100%' }}
              value={profileDraft.addressText}
              onChange={(e) => {
                const val = e.target.value;
                setProfileDraft((p) => ({
                  ...p,
                  addressText: val,
                  locality: val.split(',')[1]?.trim() || val.split(',')[0]?.trim() || 'Bengaluru',
                }));
              }}
              placeholder="e.g. Flat 402, Palm Grove Residency, 11th Main Rd, Jayanagar 4th Block, Bengaluru 560011"
            />
          </View>

          {/* Field 5: House Location in GPS Coordinates */}
          <View
            className="web-card-surface"
            style={{
              padding: '14px 16px',
              borderRadius: 12,
              background: 'var(--primary-light)',
              border: '1.5px solid rgba(31, 91, 58, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <View style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Navigation size={15} color="var(--primary)" />
                <Text style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary-dark)', textTransform: 'uppercase' }}>
                  House Location in GPS (Latitude & Longitude)
                </Text>
              </View>
              <TouchableOpacity
                type="button"
                className="btn btn-primary btn-sm"
                style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                disabled={detectingProfileGps}
                onClick={() => {
                  if (!navigator.geolocation) {
                    toast('Geolocation is not supported by your browser', 'error');
                    return;
                  }
                  setDetectingProfileGps(true);
                  navigator.geolocation.getCurrentPosition(
                    (pos) => {
                      const lat = parseFloat(pos.coords.latitude.toFixed(6));
                      const lng = parseFloat(pos.coords.longitude.toFixed(6));
                      setProfileDraft((p) => ({ ...p, coords: { lat, lng } }));
                      setDetectingProfileGps(false);
                      toast(`Live GPS coordinates locked: ${lat}, ${lng}`, 'success');
                    },
                    () => {
                      setDetectingProfileGps(false);
                      toast('Could not fetch device GPS. Keeping current pin coordinates.', 'info');
                    },
                    { enableHighAccuracy: true, timeout: 6000 }
                  );
                }}
              >
                <Navigation size={13} />
                {detectingProfileGps ? 'Detecting Live GPS...' : 'Detect Live Device GPS'}
              </TouchableOpacity>
            </View>

            <View style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
              <View>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-muted)' }}>
                  Latitude
                </label>
                <TextInput
                  type="number"
                  step="0.0001"
                  className="form-input"
                  style={{ width: '100%', padding: '8px 12px', fontSize: '0.88rem', fontWeight: 700 }}
                  value={profileDraft.coords?.lat ?? 12.9250}
                  onChange={(e) =>
                    setProfileDraft((p) => ({
                      ...p,
                      coords: { ...p.coords, lat: parseFloat(e.target.value) || 0 },
                    }))
                  }
                />
              </View>
              <View>
                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-muted)' }}>
                  Longitude
                </label>
                <TextInput
                  type="number"
                  step="0.0001"
                  className="form-input"
                  style={{ width: '100%', padding: '8px 12px', fontSize: '0.88rem', fontWeight: 700 }}
                  value={profileDraft.coords?.lng ?? 77.5938}
                  onChange={(e) =>
                    setProfileDraft((p) => ({
                      ...p,
                      coords: { ...p.coords, lng: parseFloat(e.target.value) || 0 },
                    }))
                  }
                />
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
            <TouchableOpacity
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setProfileDraft({ ...userProfile });
                setProfileModalOpen(false);
              }}
            >
              Cancel
            </TouchableOpacity>
            <TouchableOpacity
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setUserProfile({ ...profileDraft });
                setProfileModalOpen(false);
                toast('✓ Customer profile and house location updated successfully!', 'success');
              }}
            >
              <CheckCircle2 size={16} /> Save Profile & Location
            </TouchableOpacity>
          </View>
        </View>
      </ModalDialog>

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
                style={{ height: 48, width: 'auto', maxWidth: 110, borderRadius: 8, objectFit: 'contain', background: '#FFFFFF', padding: '3px 8px', border: '1px solid var(--border)' }}
              />
              <View style={{ display: 'flex', flexDirection: 'column' }}>
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

          {/* Active Booking Live Notification Banner (If active job exists) */}
          {booking && booking.status !== 'CANCELLED' && (
            <View
              style={{
                background: 'linear-gradient(90deg, #064E3B 0%, #047857 100%)',
                padding: '12px 28px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12,
                boxShadow: '0 4px 14px rgba(6,78,59,0.25)',
              }}
            >
              <View style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#34D399',
                    boxShadow: '0 0 10px #34D399',
                  }}
                />
                <Text style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.92rem' }}>
                  Active Service In Progress &bull; Booking #{booking.id} ({booking.status.replace(/_/g, ' ')}) &bull; Technician Arjun Sharma
                </Text>
              </View>
              <TouchableOpacity
                className="btn btn-sm"
                style={{
                  background: '#FFFFFF',
                  color: '#065F46',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  padding: '7px 18px',
                  borderRadius: 8,
                  border: 'none',
                }}
                onClick={() => {
                  setIsLandingView(false);
                  setActiveSection('track');
                }}
              >
                <Navigation size={14} style={{ marginRight: 6 }} /> Open Live Tracking & OTP Handshake →
              </TouchableOpacity>
            </View>
          )}

          {/* Hero Content Section */}
          <View className="hero-landing-wrap">
            <View className="hero-badge-pill" style={{ marginBottom: 14 }}>
              <Sparkles size={16} color="var(--accent)" />
              <Text style={{ fontWeight: 800 }}>Easy HiCare Pest Control &bull; Govt Approved CIB&RC &bull; 100% Odorless & Eco-Safe</Text>
            </View>

            <h1 className="hero-title" style={{ textAlign: 'center', marginBottom: 12 }}>
              <span style={{ color: 'var(--primary)', display: 'block', fontSize: 'clamp(2.3rem, 5vw, 3.4rem)', fontWeight: 900, letterSpacing: '-0.5px' }}>
                Easy HiCare Pest Control
              </span>
              <span style={{ fontSize: 'clamp(1.3rem, 3.2vw, 2rem)', fontWeight: 800, color: 'var(--ink)' }}>
                India's Most Trusted Certified Pest Solutions
              </span>
            </h1>

            <p className="hero-subtitle" style={{ maxWidth: 840, margin: '0 auto 24px', textAlign: 'center' }}>
              Guaranteed eradication with 60-minute doorstep arrival, background-checked certified applicators, government-approved CIB&RC odorless formulations, and an unconditional 90-day warranty.
            </p>

            {/* Featured House Spraying & Misting Showcase Banner */}
            <View
              style={{
                width: '100%',
                maxWidth: 1040,
                margin: '0 auto 32px',
                borderRadius: 20,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 16px 40px rgba(6, 78, 59, 0.16)',
                border: '1.5px solid var(--border)',
                background: '#FFFFFF',
              }}
            >
              <img
                src="/assets/services/house-spraying-hero.png"
                alt="Easy HiCare Professional In-Home House Spraying & Misting"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 440,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  insetInline: 0,
                  background: 'linear-gradient(180deg, transparent 0%, rgba(6, 78, 59, 0.94) 100%)',
                  padding: '24px 28px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  flexWrap: 'wrap',
                  gap: 12,
                }}
              >
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text style={{ color: '#A7F3D0', fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: 1 }}>
                    Live Precision House Spraying Operation
                  </Text>
                  <Text style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.35rem', marginTop: 2, fontFamily: 'var(--font-heading)' }}>
                    Easy HiCare Whole-Home Odorless Misting & Smart Monitoring
                  </Text>
                  <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', marginTop: 4 }}>
                    Certified applicators treating living rooms, baseboards, stairs & furniture seams with zero evacuation needed.
                  </Text>
                </View>
                <View style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Text className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
                    ✓ CIB&RC Certified
                  </Text>
                  <Text className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
                    ✓ 100% Eco-Safe Formulations
                  </Text>
                </View>
              </View>
            </View>

            {/* 4 Agency Trust Metrics */}
            <View className="hero-stats-grid" style={{ marginBottom: 36 }}>
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

            {/* Central Call to Action */}
            <View style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: 780, margin: '10px auto 30px' }}>
              <TouchableOpacity
                className="hero-cta-btn"
                testID="hero-book-demo-btn"
                style={{
                  flex: '1 1 320px',
                  padding: '16px 28px',
                  borderRadius: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  boxShadow: '0 8px 24px rgba(6, 78, 59, 0.28)',
                }}
                onPress={() => {
                  setIsLandingView(false);
                  setActiveSection('book');
                }}
                onClick={() => {
                  setIsLandingView(false);
                  setActiveSection('book');
                }}
              >
                <Sparkles size={20} color="#FBBF24" />
                <Text style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '1.1rem' }}>
                  Book a Demo / Book Treatment →
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        /* ────────────────────────────────────────────────────────────────────────── */
        /* 2. CUSTOMER PORTAL / BOOKING & LIVE TRACKING WORKSPACE (WITH SIDEBAR)      */
        /* ────────────────────────────────────────────────────────────────────────── */
        <View className="web-layout">
          {/* Mobile Overlay Backdrop */}
          {mobileNavOpen && (
            <div
              className="mobile-backdrop-overlay"
              onClick={() => setMobileNavOpen(false)}
            />
          )}

          {/* Left Sidebar Navigation */}
          <View className={`web-sidebar ${mobileNavOpen ? 'mobile-open' : ''}`} accessibilityRole="navigation" aria-label="Customer Website Navigation">
            <TouchableOpacity
              className="sidebar-brand"
              onClick={() => setIsLandingView(true)}
              style={{ cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12 }}
              title="Return to Easy HiCare Home Landing Page"
            >
              <Image
                src="/easyhicare-logo.png"
                alt="Easy HiCare Logo"
                style={{ height: 44, width: 'auto', maxWidth: 96, borderRadius: 8, objectFit: 'contain', background: '#FFFFFF', padding: '2px 6px' }}
              />
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <Text className="brand-title" style={{ fontSize: '1.15rem', fontWeight: 800 }}>Easy HiCare</Text>
                <Text className="brand-subtitle" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)' }}>Pest Solutions &bull; Customer</Text>
              </View>
            </TouchableOpacity>

            <div className="sidebar-customer-wrapper">
              <button
                type="button"
                className="sidebar-customer-card"
                onClick={() => {
                  setProfileDraft({ ...userProfile });
                  setProfileModalOpen(true);
                }}
                title="Click to view & edit Customer Profile & Residence in popup"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', minWidth: 0 }}>
                  <div className="customer-avatar" style={{ flexShrink: 0 }}>
                    {userProfile.name
                      ? userProfile.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()
                      : 'AS'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#FFFFFF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                      {userProfile.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2 }}>
                      {userProfile.locality || 'Jayanagar 4th Block, BLR'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 8, background: 'rgba(255,255,255,0.1)', color: '#fea619', flexShrink: 0 }}>
                    <Edit3 size={13} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: 'rgba(16, 185, 129, 0.2)', color: '#6EE7B7', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                    <Lock size={10} /> Agency Verified
                  </span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: 'rgba(232, 163, 23, 0.2)', color: '#FCD34D', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                    <Award size={10} /> 90d Warranty
                  </span>
                </div>
              </button>
            </div>

            <View className="sidebar-nav">
              <Text className="nav-section-label">Customer Portal</Text>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === 'home' ? isLandingView : (!isLandingView && activeSection === item.id);
                return (
                  <TouchableOpacity
                    key={item.id}
                    className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
                    onPress={() => {
                      if (item.id === 'home') {
                        setIsLandingView(true);
                      } else {
                        setIsLandingView(false);
                        setActiveSection(item.id);
                      }
                      setMobileNavOpen(false);
                    }}
                    onClick={() => {
                      if (item.id === 'home') {
                        setIsLandingView(true);
                      } else {
                        setIsLandingView(false);
                        setActiveSection(item.id);
                      }
                      setMobileNavOpen(false);
                    }}
                    accessibilityRole="button"
                    title={item.label}
                  >
                    <Icon size={18} style={{ flexShrink: 0 }} />
                    <span className="sidebar-nav-label">{item.label}</span>
                    {item.badge && <Text className="nav-pill-count">{item.badge}</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={{ padding: '0 14px 14px' }}>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '11px 16px',
                  borderRadius: 12,
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  background: 'rgba(239, 68, 68, 0.12)',
                  color: '#FCA5A5',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  marginBottom: 8,
                  transition: 'all 0.15s ease',
                }}
                onClick={() => {
                  setIsLandingView(true);
                  setMobileNavOpen(false);
                  toast('Logged out successfully. Returned to Home.', 'info');
                }}
                title="Logout from Customer Portal"
              >
                <LogOut size={16} color="#FCA5A5" /> <Text style={{ color: '#FCA5A5', fontWeight: '700' }}>Logout</Text>
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
            <View className="web-topbar" style={{ padding: '12px 24px', background: '#FFFFFF', borderBottom: '1px solid #ebe8e3', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 0 }}>
                <button
                  type="button"
                  className="btn btn-outline btn-sm mobile-menu-btn"
                  style={{ padding: '8px 10px', borderRadius: 9 }}
                  onClick={() => setMobileNavOpen(!mobileNavOpen)}
                  title="Toggle Mobile Navigation"
                >
                  <Menu size={18} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
                  <img
                    src="/easyhicare-logo.png"
                    alt="Easy HiCare Logo"
                    style={{ height: 46, width: 'auto', maxWidth: 100, borderRadius: 8, objectFit: 'contain', background: '#FFFFFF', padding: '3px 6px', border: '1.5px solid #ebe8e3', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 3 }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#003527', letterSpacing: '-0.02em', fontFamily: 'var(--font-heading)', whiteSpace: 'nowrap' }}>
                        Easy HiCare Pest Solutions
                      </span>
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 whitespace-nowrap shrink-0">
                        <ShieldCheck size={12} className="text-emerald-700" /> Govt CIB&RC Certified
                      </span>
                      <span className="hidden xl:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200 whitespace-nowrap shrink-0">
                        <Award size={12} className="text-blue-700" /> ISO 9001:2015
                      </span>
                      <span className="hidden 2xl:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 whitespace-nowrap shrink-0">
                        <Sparkles size={12} className="text-amber-600" /> 100% Odorless
                      </span>
                    </div>
                    <span style={{ fontSize: '0.76rem', color: '#707974', fontWeight: 600, display: 'block', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Instant AI Smart Quote • Govt Lic #AG-PST-2024 • Doorstep OTP &amp; Privacy Guaranteed
                    </span>
                  </div>
                </div>
              </div>

              <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold shadow-2xs whitespace-nowrap shrink-0">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                  </span>
                  <span>100% Certified Technicians</span>
                </span>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setHelpOpen(true)}
                  style={{ borderRadius: 10, padding: '7px 14px', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}
                >
                  <Phone size={14} /> 24x7 Support
                </button>
              </div>
            </View>

            <View className="web-page">
              {activeSection === 'book' && (
                <BookSection toast={toast} onNavigate={setActiveSection} userProfile={userProfile} />
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

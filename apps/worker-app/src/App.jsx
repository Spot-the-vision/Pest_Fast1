import { View, Text, TouchableOpacity, TextInput, Image } from '@pest-free/ui-kit';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Briefcase,
  MapPin,
  Wallet,
  Award,
  AlertCircle,
  Phone,
  HeartPulse,
  Sliders,
  Send,
  X,
  Bot,
  Menu,
  CheckCircle2,
} from 'lucide-react';
import { useAppStore } from './lib/api/store.js';
import { answerWorkerSafetyQuestion } from './lib/api/index.js';

import WorkerOverviewSection from './pages/WorkerOverviewSection.jsx';
import ActiveJobWorkspaceSection from './pages/ActiveJobWorkspaceSection.jsx';
import RouteSection from './pages/RouteSection.jsx';
import EarningsSection from './pages/EarningsSection.jsx';
import SafetySection from './pages/SafetySection.jsx';

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

      {/* Mobile Overlay Backdrop */}
      {sidebarOpen && (
        <div
          className="mobile-backdrop-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <View className={`web-sidebar ${sidebarOpen ? 'mobile-open' : ''}`} accessibilityRole="navigation" aria-label="Technician Operations Navigation">
        {/* Brand Header with Easy HiCare Logo */}
        <View className="sidebar-brand" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Image
            src="/easyhicare-logo.png"
            alt="Easy HiCare Logo"
            style={{ height: 44, width: 'auto', maxWidth: 96, borderRadius: 8, objectFit: 'contain', background: '#FFFFFF', padding: '2px 6px' }}
          />
          <View style={{ display: 'flex', flexDirection: 'column' }}>
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
                title={item.label}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                <span className="sidebar-nav-label">{item.label}</span>
                {item.badge && <Text className="nav-pill-count">{item.badge}</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* BOTTOM LEFT: Technician Profile & KYC Card */}
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
              style={{ padding: '8px 10px', borderRadius: 9 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title="Toggle Technician Menu"
            >
              <Menu size={18} />
            </TouchableOpacity>
            <Image
              src="/easyhicare-logo.png"
              alt="Easy HiCare Logo"
              style={{ height: 38, width: 'auto', maxWidth: 84, borderRadius: 6, objectFit: 'contain', background: '#FFFFFF', padding: '2px 5px', border: '1px solid var(--border)' }}
            />
            <View style={{ display: 'flex', flexDirection: 'column' }}>
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
            <View className="duty-toggle-group" style={{ display: 'flex', alignItems: 'center', background: '#FFFFFF', padding: 4, borderRadius: 14, border: '1.5px solid var(--border-strong)', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <TouchableOpacity
                className={`duty-btn ${dutyStatus === 'ON_DUTY' ? 'active-on' : ''}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 16px',
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  background: dutyStatus === 'ON_DUTY' ? '#003527' : 'transparent',
                  color: dutyStatus === 'ON_DUTY' ? '#FFFFFF' : '#707974',
                  boxShadow: dutyStatus === 'ON_DUTY' ? '0 2px 8px rgba(0, 53, 39, 0.25)' : 'none',
                }}
                onPress={() => {
                  toggleDuty('ON_DUTY');
                  toast('Technician Status: ON DUTY (Radar Active & Ready for Assignment)', 'success');
                }}
                onClick={() => {
                  toggleDuty('ON_DUTY');
                  toast('Technician Status: ON DUTY (Radar Active & Ready for Assignment)', 'success');
                }}
                accessibilityRole="button"
                title="Active On Duty Status"
              >
                <span style={{ position: 'relative', display: 'flex', height: 12, width: 12, alignItems: 'center', justifyContent: 'center' }}>
                  {dutyStatus === 'ON_DUTY' && (
                    <span style={{ position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', background: '#34D399', opacity: 0.8, animation: 'ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                  )}
                  <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: 9, width: 9, background: dutyStatus === 'ON_DUTY' ? '#10B981' : '#9CA3AF', boxShadow: dutyStatus === 'ON_DUTY' ? '0 0 10px #10B981, 0 0 4px #34D399' : 'none' }} />
                </span>
                <Text style={{ color: 'inherit', fontWeight: '800' }}>On Duty</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`duty-btn ${dutyStatus === 'ON_JOB' ? 'active-job' : ''}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 16px',
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  background: dutyStatus === 'ON_JOB' ? '#FEA619' : 'transparent',
                  color: dutyStatus === 'ON_JOB' ? '#1C1C19' : '#707974',
                  boxShadow: dutyStatus === 'ON_JOB' ? '0 2px 8px rgba(254, 166, 25, 0.3)' : 'none',
                }}
                onPress={() => {
                  toggleDuty('ON_JOB');
                  toast('Technician Status: ON JOB (Active Doorstep Treatment)', 'info');
                }}
                onClick={() => {
                  toggleDuty('ON_JOB');
                  toast('Technician Status: ON JOB (Active Doorstep Treatment)', 'info');
                }}
                accessibilityRole="button"
                title="On Active Job Status"
              >
                <span style={{ position: 'relative', display: 'flex', height: 12, width: 12, alignItems: 'center', justifyContent: 'center' }}>
                  {dutyStatus === 'ON_JOB' && (
                    <span style={{ position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', background: '#FBBF24', opacity: 0.8, animation: 'ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                  )}
                  <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: 9, width: 9, background: dutyStatus === 'ON_JOB' ? '#D97706' : '#9CA3AF', boxShadow: dutyStatus === 'ON_JOB' ? '0 0 10px #F59E0B' : 'none' }} />
                </span>
                <Text style={{ color: 'inherit', fontWeight: '800' }}>On Job</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`duty-btn ${dutyStatus === 'OFF_DUTY' ? 'active-off' : ''}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 16px',
                  borderRadius: 10,
                  fontWeight: 800,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  background: dutyStatus === 'OFF_DUTY' ? '#1C1C19' : 'transparent',
                  color: dutyStatus === 'OFF_DUTY' ? '#FFFFFF' : '#707974',
                }}
                onPress={() => {
                  toggleDuty('OFF_DUTY');
                  toast('Technician Status: OFF DUTY (Standby / Off Shift)', 'info');
                }}
                onClick={() => {
                  toggleDuty('OFF_DUTY');
                  toast('Technician Status: OFF DUTY (Standby / Off Shift)', 'info');
                }}
                accessibilityRole="button"
                title="Off Duty Status"
              >
                <span style={{ display: 'inline-flex', borderRadius: '50%', height: 9, width: 9, background: dutyStatus === 'OFF_DUTY' ? '#EF4444' : '#D1D5DB', boxShadow: dutyStatus === 'OFF_DUTY' ? '0 0 8px rgba(239, 68, 68, 0.6)' : 'none' }} />
                <Text style={{ color: 'inherit', fontWeight: '800' }}>Off Duty</Text>
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

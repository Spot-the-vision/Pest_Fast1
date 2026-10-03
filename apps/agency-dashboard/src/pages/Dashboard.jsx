import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ─── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ message, type = 'info' }) {
  if (!message) return null;
  const bg = type === 'success' ? 'bg-[#003527]' : type === 'warning' ? 'bg-[#fea619]' : 'bg-[#1c1c19]';
  const textCol = type === 'warning' ? 'text-[#1c1c19]' : 'text-white';
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl ${bg} ${textCol} font-semibold text-sm border border-white/10 animate-in slide-in-from-bottom-4 duration-300`}>
      <span className="material-symbols-outlined text-[18px]">
        {type === 'success' ? 'check_circle' : type === 'warning' ? 'warning' : 'info'}
      </span>
      {message}
    </div>
  );
}

// ─── Profile Modal ─────────────────────────────────────────────────────────────
function ProfileModal({ open, onClose, showToast, onLogout, profile, onSaveProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || 'Marcus Sterling',
    email: profile?.email || 'marcus@ecopest.com',
    phone: profile?.phone || '+91 98001 12345',
    agencyCode: profile?.agencyCode || 'EcoPest Solutions #PF-8821',
    role: profile?.role || 'Chief Operations Dispatcher',
    shift: profile?.shift || 'Shift A (07:00 - 19:00 IST)',
  });

  React.useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || 'Marcus Sterling',
        email: profile.email || 'marcus@ecopest.com',
        phone: profile.phone || '+91 98001 12345',
        agencyCode: profile.agencyCode || 'EcoPest Solutions #PF-8821',
        role: profile.role || 'Chief Operations Dispatcher',
        shift: profile.shift || 'Shift A (07:00 - 19:00 IST)',
      });
    }
  }, [profile]);

  if (!open) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveProfile && onSaveProfile(formData);
    setIsEditing(false);
    showToast('✅ Profile updated successfully!', 'success');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#003527] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
            <div>
              <h3 className="font-bold text-[#003527] text-base">{formData.name}</h3>
              <p className="text-[12px] text-[#707974]">{formData.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-2.5 py-1.5 rounded-xl bg-[#003527]/10 hover:bg-[#003527] hover:text-white text-[#003527] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                title="Edit Profile"
              >
                <span className="material-symbols-outlined text-[15px]">edit</span>
                <span>Edit</span>
              </button>
            )}
            <button type="button" onClick={onClose} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#707974] uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#ebe8e3] text-xs bg-[#fcf9f4] focus:outline-none focus:ring-2 focus:ring-[#003527]/30 font-semibold"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#707974] uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#ebe8e3] text-xs bg-[#fcf9f4] focus:outline-none focus:ring-2 focus:ring-[#003527]/30"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#707974] uppercase tracking-wider">Direct Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#ebe8e3] text-xs bg-[#fcf9f4] focus:outline-none focus:ring-2 focus:ring-[#003527]/30 font-mono"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#707974] uppercase tracking-wider">Active Shift</label>
              <input
                type="text"
                value={formData.shift}
                onChange={e => setFormData({ ...formData, shift: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#ebe8e3] text-xs bg-[#fcf9f4] focus:outline-none focus:ring-2 focus:ring-[#003527]/30"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#707974] uppercase tracking-wider">Authority / Title</label>
              <input
                type="text"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#ebe8e3] text-xs bg-[#fcf9f4] focus:outline-none focus:ring-2 focus:ring-[#003527]/30"
                required
              />
            </div>
            <div className="flex gap-2 pt-2 border-t border-[#ebe8e3]">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#003527] text-white font-bold text-xs hover:bg-[#064e3b] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">save</span>
                <span>Save Profile Changes</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#ebe8e3] text-[#707974] hover:text-[#1c1c19] font-bold text-xs hover:bg-[#f6f3ee] transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2 py-4 bg-[#fcf9f4] rounded-2xl border border-[#ebe8e3] p-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#003527] text-[#fea619] flex items-center justify-center text-xl font-black shadow-md border-2 border-white/20">
                {formData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-bold text-[#003527] text-base">{formData.name}</div>
                <div className="text-xs text-[#707974]">{formData.email}</div>
                <div className="flex items-center justify-center gap-1.5 mt-2 bg-white px-3 py-1 rounded-full border border-[#ebe8e3] shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] text-[#003527] font-bold">Online · EcoPest Central Hub</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-[#ebe8e3] bg-white shadow-xs space-y-2 text-xs">
              {[
                ['Direct Line', formData.phone],
                ['Agency Code', formData.agencyCode],
                ['Authority', formData.role],
                ['Active Shift', formData.shift],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1 border-b border-[#ebe8e3] last:border-0">
                  <span className="text-[#707974]">{k}</span>
                  <span className="font-semibold text-[#1c1c19] text-right">{v}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full py-2.5 rounded-xl bg-[#003527] text-white font-bold text-xs hover:bg-[#064e3b] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>Edit Profile Information
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`Password reset link sent to ${formData.email}`, 'success');
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] font-bold text-xs hover:bg-[#f6f3ee] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">lock</span>Change Password
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLogout && onLogout();
                }}
                className="w-full py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Section Header ──────────────────────────────────────────────────────────
function SectionHeader({ icon, title, subtitle, badge, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-[#ebe8e3] mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#003527]/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[#003527] text-[22px]">{icon}</span>
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-black text-[#003527] text-base tracking-tight">{title}</h2>
            {badge && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#fbf7ee] text-[#003527] border border-[#ebe8e3] text-[11px] font-bold">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-[12px] text-[#707974] mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
    </div>
  );
}

// ─── Permanent Left Sidebar (Responsive Slide Drawer on Mobile/Tablet) ─────────
function Sidebar({ activeSection, onSelectSection, workerKycCount = 0, bookingsCount = 4, showToast, onOpenProfile, profile, mobileOpen = false, onClose }) {
  const initials = profile?.name
    ? profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'MS';

  const handleNavClick = (sec) => {
    onSelectSection(sec);
    if (onClose) onClose();
  };

  return (
    <aside className={`fixed left-0 top-0 h-full w-64 bg-[#003527] text-white z-50 flex flex-col border-r border-[#064e3b] shadow-2xl transition-transform duration-200 ease-in-out ${
      mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2.5">
          <img
            src="/easyhicare-logo.png"
            alt="Easy HiCare Logo"
            className="h-9 w-auto max-w-[76px] rounded-lg bg-white p-1 object-contain shadow-xs border border-white/20"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-white text-sm tracking-tight">Easy HiCare</span>
            <span className="text-[10px] text-[#80bea6] uppercase tracking-widest font-semibold">Agency Ops OS</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full bg-[#fea619] text-[#1c1c19] text-[9px] font-black">HUB #4</span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
              aria-label="Close sidebar"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Universal Home Shortcut */}
      <a
        href="/"
        className="mx-3 mt-3 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white flex items-center gap-2 font-bold text-xs border border-white/10 transition-colors"
      >
        <span className="material-symbols-outlined text-[16px] text-[#fea619]">home</span>
        <span>&larr; Universal Home</span>
      </a>

      {/* Agency Identity Card */}
      <div className="mx-3 mt-2 p-3 rounded-2xl bg-[#064e3b]/80 border border-white/10 shadow-xs shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#003527] border border-white/15 flex items-center justify-center text-[#fea619] shadow-xs font-bold text-xs">
            EP
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-white text-[13px] truncate">EcoPest Solutions</div>
            <div className="text-[11px] text-[#80bea6] truncate">Metro Hub #PF-8821</div>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
          <span className="text-[#c2ebdc] flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Dispatch Live
          </span>
          <span className="bg-[#fea619] text-[#1c1c19] px-2 py-0.5 rounded-full font-bold">VERIFIED</span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-3 flex flex-col gap-1 overflow-y-auto">
        <p className="text-[10px] uppercase tracking-widest text-[#80bea6] font-bold px-3 mb-1 mt-1 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[13px] text-[#fea619]">speed</span>
          Operations Bar
        </p>

        <button
          type="button"
          onClick={() => handleNavClick('all')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all text-left cursor-pointer ${
            activeSection === 'all'
              ? 'bg-[#064e3b] text-white font-bold shadow-xs border border-white/15'
              : 'text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className={`material-symbols-outlined text-[20px] ${activeSection === 'all' ? 'text-[#fea619]' : 'text-[#80bea6]'}`}>dashboard</span>
          <span>All Operations View</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('stats')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all text-left cursor-pointer ${
            activeSection === 'stats'
              ? 'bg-[#064e3b] text-white font-bold shadow-xs border border-white/15'
              : 'text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className={`material-symbols-outlined text-[20px] ${activeSection === 'stats' ? 'text-[#fea619]' : 'text-[#80bea6]'}`}>query_stats</span>
          <span>Stats &amp; Telemetry</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('tracking')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all text-left cursor-pointer ${
            activeSection === 'tracking'
              ? 'bg-[#064e3b] text-white font-bold shadow-xs border border-white/15'
              : 'text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className={`material-symbols-outlined text-[20px] ${activeSection === 'tracking' ? 'text-[#fea619]' : 'text-[#80bea6]'}`}>map</span>
          <span>Dashboard &amp; Live Map</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('bookings')}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all text-left cursor-pointer ${
            activeSection === 'bookings'
              ? 'bg-[#064e3b] text-white font-bold shadow-xs border border-white/15'
              : 'text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className="flex items-center gap-3">
            <span className={`material-symbols-outlined text-[20px] ${activeSection === 'bookings' ? 'text-[#fea619]' : 'text-[#80bea6]'}`}>approval_delegation</span>
            <span>Operations Bar</span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#fea619] text-[#1c1c19] text-[11px] font-bold">{bookingsCount}</span>
        </button>

        <p className="text-[10px] uppercase tracking-widest text-[#80bea6] font-bold px-3 mb-1 mt-3 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[13px] text-[#fea619]">tune</span>
          Management
        </p>

        <Link
          to="/worker-fleet"
          onClick={() => onClose && onClose()}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white font-medium text-sm transition-all"
        >
          <span className="material-symbols-outlined text-[20px] text-[#80bea6]">electric_moped</span>
          <span>Management (Fleet &amp; Rosters)</span>
        </Link>

        <button
          type="button"
          onClick={() => handleNavClick('kyc')}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all text-left cursor-pointer ${
            activeSection === 'kyc'
              ? 'bg-[#064e3b] text-white font-bold shadow-xs border border-white/15'
              : 'text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className="flex items-center gap-3">
            <span className={`material-symbols-outlined text-[20px] ${activeSection === 'kyc' ? 'text-[#fea619]' : 'text-[#80bea6]'}`}>how_to_reg</span>
            <span>Worker KYC</span>
          </span>
          {workerKycCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#fea619] text-[#1c1c19] text-[11px] font-bold">
              {workerKycCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('clients')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all text-left cursor-pointer ${
            activeSection === 'clients'
              ? 'bg-[#064e3b] text-white font-bold shadow-xs border border-white/15'
              : 'text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className={`material-symbols-outlined text-[20px] ${activeSection === 'clients' ? 'text-[#fea619]' : 'text-[#80bea6]'}`}>business</span>
          <span>Client Directory</span>
        </button>

        <p className="text-[10px] uppercase tracking-widest text-[#80bea6] font-bold px-3 mb-1 mt-3 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[13px] text-[#fea619]">hub</span>
          System Core
        </p>

        <button
          type="button"
          onClick={() => handleNavClick('analytics')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all text-left cursor-pointer ${
            activeSection === 'analytics'
              ? 'bg-[#064e3b] text-white font-bold shadow-xs border border-white/15'
              : 'text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className={`material-symbols-outlined text-[20px] ${activeSection === 'analytics' ? 'text-[#fea619]' : 'text-[#80bea6]'}`}>bar_chart</span>
          <span>Analytics &amp; Reports</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all text-left cursor-pointer ${
            activeSection === 'settings'
              ? 'bg-[#064e3b] text-white font-bold shadow-xs border border-white/15'
              : 'text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className={`material-symbols-outlined text-[20px] ${activeSection === 'settings' ? 'text-[#fea619]' : 'text-[#80bea6]'}`}>tune</span>
          <span>Settings</span>
        </button>
      </nav>

      {/* Fleet Utilization, Helpline & Profile at bottom of Menu Bar */}
      <div className="p-3 border-t border-white/10 space-y-2 shrink-0 bg-[#00291e]">
        <button
          type="button"
          onClick={() => showToast && showToast('📞 Operations Helpline: Connected to Central Command (1800-PEST-DISPATCH)', 'success')}
          className="w-full py-2.5 px-3 rounded-xl bg-[#fea619] hover:bg-[#e09110] text-[#1c1c19] font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[16px]">call</span>
          <span>24x7 Ops Helpline</span>
        </button>

        {/* Profile Card (Editable, Placed at Bottom of Menu Bar) */}
        <button
          type="button"
          onClick={onOpenProfile}
          className="w-full p-2.5 rounded-2xl bg-[#064e3b]/80 hover:bg-[#064e3b] border border-white/10 transition-all text-left cursor-pointer shadow-xs group"
          title="Click to view and edit profile"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#003527] border border-white/15 flex items-center justify-center text-[#fea619] shadow-xs font-bold text-xs">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white text-xs truncate group-hover:text-[#fea619] transition-colors">
                {profile?.name || 'Marcus Sterling'}
              </div>
              <div className="text-[10px] text-[#80bea6] truncate">
                {profile?.role || 'Chief Operations Dispatcher'}
              </div>
            </div>
            <span className="material-symbols-outlined text-white/50 text-[16px] group-hover:text-[#fea619]">edit</span>
          </div>
          <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px]">
            <span className="text-[#c2ebdc] flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Dispatch Online
            </span>
            <span className="bg-[#fea619] text-[#1c1c19] px-1.5 py-0.2 rounded font-black">EDIT PROFILE</span>
          </div>
        </button>
      </div>
    </aside>
  );
}

// ─── Header (No Switch, No Profile in Top Bar) ────────────────────────────────
function Header({ onSelectSection, onToast, onOpenSidebar }) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-[#fcf9f4]/95 backdrop-blur-md border-b border-[#ebe8e3] z-40 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-2.5">
        {onOpenSidebar && (
          <button
            type="button"
            onClick={onOpenSidebar}
            className="lg:hidden p-2 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] flex items-center justify-center cursor-pointer shadow-xs hover:bg-[#f6f3ee]"
            aria-label="Open sidebar navigation"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>
        )}
        {/* Agency Partner Identity Pill */}
        <button
          type="button"
          onClick={() => onToast('EcoPest Solutions #PF-8821 — CIB&RC Verified Commercial Partner')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-[#f6f3ee] transition-colors text-left border border-[#ebe8e3] shadow-xs cursor-pointer"
        >
          <img
            src="/easyhicare-logo.png"
            alt="Easy HiCare Logo"
            className="h-6 w-auto max-w-[50px] object-contain rounded p-0.5 bg-white border border-[#ebe8e3]"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xs sm:text-sm font-bold text-[#003527]">EcoPest Solutions</span>
            <span className="text-[10px] text-[#707974] flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[11px] text-[#003527]">verified</span>Hub #PF-8821
            </span>
          </div>
        </button>

        {/* Signature Live Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#003527] text-white text-xs font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Fleet Active: 18 Techs Online</span>
        </div>

        {/* Metrics Pill */}
        <div className="hidden xl:flex items-center gap-3 pl-1">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#ebe8e3] shadow-xs">
            <span className="material-symbols-outlined text-[#fea619] text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="text-xs font-bold text-[#1c1c19]">4.9</span>
            <span className="text-[11px] text-[#707974]">(318 reviews)</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex flex-col leading-tight">
              <span className="text-[9px] uppercase tracking-wider text-[#707974] font-bold">SLA Response</span>
              <span className="font-bold text-[#003527]">14m Avg</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Operations Bar Quick Button */}
        <button
          type="button"
          aria-label="Operations Bar queue"
          onClick={() => onSelectSection('bookings')}
          className="relative px-3 py-1.5 rounded-xl bg-white hover:bg-[#f6f3ee] flex items-center gap-2 text-[#003527] font-bold text-xs transition-colors border border-[#ebe8e3] shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">approval_delegation</span>
          <span>Operations Bar</span>
          <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#fea619] text-[#1c1c19] text-[10px] font-black">4</span>
        </button>
      </div>
    </header>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, iconBg, iconColor, label, value, sub, badge, progress, progressValue, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col p-5 rounded-3xl bg-white border border-[#ebe8e3] shadow-xs hover:shadow-md hover:border-[#003527]/30 transition-all text-left w-full cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] uppercase tracking-wider text-[#707974] font-bold">{label}</span>
        <div className={`w-9 h-9 rounded-xl ${iconBg || 'bg-[#fbf7ee]'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <span className={`material-symbols-outlined text-[18px] ${iconColor || 'text-[#003527]'}`}>{icon}</span>
        </div>
      </div>
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="text-3xl sm:text-4xl font-black text-[#003527] leading-none tracking-tight">{value}</span>
        {sub && <span className="text-xs sm:text-sm text-[#707974] font-semibold">{sub}</span>}
      </div>
      {progress && (
        <div className="w-full bg-[#f0ede9] h-1.5 rounded-full overflow-hidden mb-1.5">
          <div className="bg-[#003527] h-full rounded-full transition-all duration-500" style={{ width: `${progressValue}%` }} />
        </div>
      )}
      {badge && <div className="flex items-center gap-1.5 text-xs text-[#707974] mt-auto pt-1 font-medium">{badge}</div>}
    </button>
  );
}

// ─── Worker Card ──────────────────────────────────────────────────────────────
function WorkerCard({ worker, onFocus, focused, recentering, onToast }) {
  const statusStyles = {
    'En Route': { bg: 'bg-[#fea619]/15 text-[#855300] border border-[#fea619]/30', dot: 'bg-[#fea619] animate-pulse' },
    'On Job Site': { bg: 'bg-emerald-50 text-emerald-800 border border-emerald-200', dot: 'bg-emerald-500' },
    'Active Drill': { bg: 'bg-emerald-50 text-emerald-800 border border-emerald-200', dot: 'bg-emerald-600' },
  };
  const s = statusStyles[worker.status] || { bg: 'bg-[#f0ede9] text-[#707974] border border-[#ebe8e3]', dot: 'bg-gray-400' };

  return (
    <div className={`p-4 rounded-2xl border transition-all duration-300 ${focused ? 'border-[#003527] shadow-md ring-2 ring-[#003527]/10' : 'border-[#ebe8e3] shadow-xs hover:shadow-md hover:border-[#003527]/20'} bg-white`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img src={worker.avatar} alt={worker.name} className="w-11 h-11 rounded-xl object-cover border border-[#ebe8e3]" />
            <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-white ${s.dot}`} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#1c1c19] text-sm">{worker.name}</span>
              <span className="px-2 py-0.5 rounded-md bg-[#fbf7ee] text-[#003527] text-[11px] font-bold border border-[#ebe8e3]">{worker.role}</span>
            </div>
            <span className="text-[12px] text-[#707974] flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[13px] text-[#003527]">phone</span>{worker.phone}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <div className="flex items-center gap-0.5 text-[#fea619]">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="text-sm font-bold text-[#1c1c19]">{worker.rating}</span>
            <span className="text-[11px] text-[#707974]">({worker.reviews})</span>
          </div>
          <span className="text-[11px] text-[#707974] font-medium">{worker.jobs} Jobs</span>
        </div>
      </div>

      <div className={`mt-3 flex items-center justify-between px-3 py-1.5 rounded-xl ${s.bg}`}>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${s.dot}`} />
          <span className="text-[11px] font-bold uppercase tracking-wider">{worker.status}</span>
        </div>
        <span className="text-[11px] font-medium truncate max-w-[140px]">{worker.location}</span>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => onFocus(worker.id, worker.name)}
          className={`flex-1 py-2 rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            focused
              ? 'bg-[#003527] text-white shadow-xs'
              : 'bg-[#fbf7ee] hover:bg-[#f0ede9] text-[#003527] border border-[#ebe8e3]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">location_searching</span>
          {focused ? 'Tracking Live...' : 'Track on Map'}
        </button>
        <button
          type="button"
          onClick={() => onToast(`${worker.name} — ${worker.tasks} tasks active on dispatch schedule`, 'success')}
          className="flex-1 py-2 rounded-xl bg-[#003527] text-white text-[12px] font-bold hover:bg-[#064e3b] transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px]">task_alt</span>Tasks ({worker.tasks})
        </button>
      </div>
    </div>
  );
}

// ─── Main Agency Dashboard ────────────────────────────────────────────────────
export default function AgencyDashboard({ onLogout }) {
  const [timeframe, setTimeframe] = useState('today');
  const [focusedWorker, setFocusedWorker] = useState(null);
  const [targetStatus, setTargetStatus] = useState('Central Dispatch Node');
  const [isRecentering, setIsRecentering] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedKycDossier, setSelectedKycDossier] = useState(null);
  const [toast, setToast] = useState({ message: null, type: 'info' });
  const [activeSectionFilter, setActiveSectionFilter] = useState('all'); // 'all' | 'stats' | 'tracking' | 'bookings' | 'kyc' | 'clients' | 'analytics' | 'settings'
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Marcus Sterling',
    email: 'marcus@ecopest.com',
    phone: '+91 98001 12345',
    agencyCode: 'EcoPest Solutions #PF-8821',
    role: 'Chief Operations Dispatcher',
    shift: 'Shift A (07:00 - 19:00 IST)',
  });

  // Settings state
  const [settingsState, setSettingsState] = useState({
    notifications: true,
    gpsSync: true,
    bioCertAlerts: true,
    darkMode: false,
    autoDispatch: true,
  });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: null, type: 'info' }), 3000);
  };

  // ── Bookings Queue Data ──
  const [bookings, setBookings] = useState([
    { id: 'BK-4021', client: 'Priya Nair', address: 'Tower B, Prestige Lakeside, Varthur', service: 'Mosquito Fogging', time: 'Today, 4:00 PM', priority: 'urgent', status: 'Pending Assignment' },
    { id: 'BK-4022', client: 'Amit Sharma', address: 'Plot 12, HRBR Layout, Kalyan Nagar', service: 'Cockroach Gel Treatment', time: 'Today, 6:30 PM', priority: 'normal', status: 'Pending Assignment' },
    { id: 'BK-4023', client: 'Sunita Reddy', address: 'Flat 5A, Brigade Cosmos, Nagavara', service: 'Termite Inspection', time: 'Tomorrow, 10:00 AM', priority: 'normal', status: 'Awaiting Confirmation' },
    { id: 'BK-4024', client: 'Kiran Mehta', address: 'Villa 9, Sobha City, Thanisandra', service: 'Rodent Perimeter Defense', time: 'Tomorrow, 2:00 PM', priority: 'critical', status: 'Urgent — Critical Infestation' },
  ]);

  // ── Worker Applications (Received from Worker Module) ──
  const [workerApplications, setWorkerApplications] = useState([
    {
      id: 'WK-KYC-201',
      name: 'Suresh Patil',
      phone: '+91 93212 44511',
      email: 'suresh.patil@gmail.com',
      applied: 'Today, 9:15 AM',
      city: 'Indiranagar, Bangalore',
      specialization: 'Termite Drill & Inject',
      experience: '4 Years',
      aadhaar: '****  ****  8821',
      pan: 'ABCDE1234F',
      pestLicense: 'PL-KA-2024-8812',
      licenseStatus: 'Verified Active',
      references: 'Ramesh Kumar, BioSafe Hub',
      vehicle: 'Electric Scooter (Ola S1)',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZukDRTejlh_FFQ0BTP1KltQEx25abYLOf91fBjfPTP5ziTyXg-jYQKUN6X1dsXKOX9iY41LAiAtxVaPHp1lOIJD8wFZEuJ93bCiEvUqOZPvrhoM4AXEzT3MLiYKTKH_YdePFYWtc2SDA1PlWmaUK-4DZvtCg3nF382rehBClqg4ue4esUM4CWVwrdd9Nh5XEYcxpMlVIVz5fIw2tdvTcSaHxo7O7spWDtARNX99ipjhhMRTuMKaqZuA'
    },
    {
      id: 'WK-KYC-202',
      name: 'Fatima Shaikh',
      phone: '+91 99001 77234',
      email: 'fatima.shaikh@gmail.com',
      applied: 'Today, 10:40 AM',
      city: 'Whitefield, Bangalore',
      specialization: 'Mosquito Bio-Fogging',
      experience: '2 Years',
      aadhaar: '****  ****  4490',
      pan: 'FGHIJ5678K',
      pestLicense: 'PL-KA-2024-9901',
      licenseStatus: 'Verified Active',
      references: 'Anita Desai, EcoPest Solutions',
      vehicle: 'Electric Scooter (Ather 450)',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkaPzIIoO_vRIVtFyi4s_zxbN1g2yz6liZRQGDo1gHSjH5x0S129nsvXC9bjJxVXYZxafWrhRQ7CjExwbKHztDqniWZVmqGPWio_ItXFUDKvy2IA6zVVAhJcJ-J_nH3Yz58VbJ35DaL4iOaKyy2FkL_YB4t_qR-sYQmmlOBbUSjNjuqNqLDO9PbeOIhmvai0_hi8UuPE_e6Gr57HwHV9eMG7dRr3t3o0unluwZGb_W3wF1ztb7XU2P-Q'
    },
    {
      id: 'WK-KYC-203',
      name: 'Arun Nambiar',
      phone: '+91 88012 30012',
      email: 'arun.nambiar@gmail.com',
      applied: 'Yesterday, 5:00 PM',
      city: 'Koramangala, Bangalore',
      specialization: 'Cockroach Gel Treatment',
      experience: '6 Years',
      aadhaar: '****  ****  7710',
      pan: 'KLMNO9012P',
      pestLicense: 'PL-KA-2023-4481',
      licenseStatus: 'Expiring in 30 days',
      references: 'Vikram Solanki, EcoPest Solutions',
      vehicle: 'Petrol Bike (Honda Activa)',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoRsJ_V_oP6EAIozS1snSEgA5HohnU-xZbGWU71ZQvQ2ZUpfG5FaANjh9GFbm4LxACR-WBLGDufaQNiO1mFq4QTBYTW_HuFc2TBrpWWzEt60Qr0AJaxp1cg0TELsjANQBDwT7cPXkvycQA5kW0RyE_dqrsf9Y8p9InFdlIV4vGlbtWqBAVV37HiaCjTfIKwjDwjw_wCrbeVghDAJqkIP3tKjvSXAsO3Z04XDf8JE1cOgz7hhx1VUV_uA'
    }
  ]);

  // ── Active Fleet Technicians ──
  const [workers, setWorkers] = useState([
    { id: 1, name: 'Rajesh Kumar', role: 'Sr. Tech', phone: '+91 98765 43210', rating: '4.9', reviews: 142, jobs: 184, tasks: 3, status: 'En Route', location: 'Sector 4, Indiranagar', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuxXXV1jSNUTXU41FXe-ba2wm-yh3SQqTmGNaAzsq7zpDOpfqxL6en2hA6lwFVq3VPmM8gjG9iHolEgfNAVHt6caHvUx8YdMQKrEgGohtqxuebI1Vnq2-kgMRQazq5oQD9WjycPYgittV2pouwUegwchEjF97nd1_qA41sbIUlT8BaaWsRjf873RX-lmoWAoQeLJPeMd9HJ_id66kUCWWnvg2Npc6hQ6s0yh3AtYVC2CbWoAbpscfhPA' },
    { id: 2, name: 'Anita Desai', role: 'Gel Specialist', phone: '+91 97123 88491', rating: '5.0', reviews: 98, jobs: 112, tasks: 2, status: 'On Job Site', location: 'Palm Meadows Villa 18', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrC9rrAJYVTRqQ_Oxh3qJJ0vv8yBc1LYbR-ijWb7mt55USG8ahSKFzTTlmp2LF9Yi2iS5ScP69as2vCxXdpfOHtVKqjRqnqr8DnKPZIxZpV6YSh2tBL_T5jxLwnJ_BOL4Z0bpYxe5fY76Xn1a9HqGVQrTTdDqeqog3ZK7_DoEoasUAU88PdvV6PUfHt3WJi2JrSPHHwlMifsvCXsqDHOaJvIJEa3A8sRA-ZYFYqol7cCckZtmTv4Wn0Q' },
    { id: 3, name: 'Vikram Solanki', role: 'Termite Lead', phone: '+91 94560 11234', rating: '4.8', reviews: 210, jobs: 235, tasks: 4, status: 'Active Drill', location: 'Koramangala 5th Block', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoVlUSKBUsHDH0wML_zIBiMWolKYsV-pyk2TeO4IT6XK6yWWL_DS8avVlBAdr88R6Vty0-K1ppdRFXq82I4wx6AhWDv7RgQ6GzIn4E7HjN28nlX5793EiQhNKGYjWpA61mScDJQqOICLnawzJYCY8UVYrtpWkpoQMgZcI0pirkzo-5A8aBb6qxf7IXzT0Xmr0SMD-PiOPOdSP14QuFkWQnUbMI9zMe4ByMghqxpULcS8RM1n10_UifFA' },
  ]);

  const handleApproveWorkerKYC = (app) => {
    setWorkerApplications(prev => prev.filter(a => a.id !== app.id));
    setSelectedKycDossier(null);
    const newWorker = {
      id: Date.now(),
      name: app.name,
      role: app.specialization.split(' ')[0] + ' Specialist',
      phone: app.phone,
      rating: '5.0',
      reviews: 1,
      jobs: 1,
      tasks: 2,
      status: 'On Job Site',
      location: app.city,
      avatar: app.avatar
    };
    setWorkers(prev => [newWorker, ...prev]);
    showToast(`✅ ${app.name} (${app.id}) KYC Approved & Deployed to Active Fleet!`, 'success');
  };

  const handleRejectWorkerKYC = (appId, appName) => {
    setWorkerApplications(prev => prev.filter(a => a.id !== appId));
    setSelectedKycDossier(null);
    showToast(`❌ ${appName}'s registration rejected & applicant notified.`);
  };

  const handleFocusWorker = (workerId, workerName) => {
    setFocusedWorker(workerId);
    setTargetStatus(`Tracking: ${workerName}`);
    showToast(`Tracking ${workerName} on the map`, 'success');
    setTimeout(() => { setFocusedWorker(null); setTargetStatus('Central Dispatch Node'); }, 3200);
  };

  const handleRecenter = () => {
    setTargetStatus('Central Dispatch Node (Whitefield & Indiranagar)');
    setIsRecentering(true);
    showToast('Map recentered to Central Dispatch Node', 'success');
    setTimeout(() => setIsRecentering(false), 1200);
  };

  // ── Client Directory Data ──
  const clients = [
    { name: 'Meera Venkatesh', phone: '+91 99801 23412', treatment: 'Termite Eradication - Drill & Inject', tech: 'Rajesh Kumar', techInitials: 'RK', techBg: 'bg-[#003527] text-white', warranty: '2-Year Standard Bio-Shield', statusLabel: 'Active • 688 Days Left', statusBg: 'bg-emerald-50 text-emerald-800 border border-emerald-200', statusDot: 'bg-emerald-500', address: 'Apt 402, Green Glen Palms, Bellandur, Bangalore' },
    { name: 'Siddharth Rao', phone: '+91 98450 78201', treatment: 'Cockroach Odorless Gel Treatment', tech: 'Anita Desai', techInitials: 'AD', techBg: 'bg-[#fea619] text-[#1c1c19]', warranty: '90-Day Kitchen Warranty', statusLabel: 'Expiring Soon • 5 Days', statusBg: 'bg-[#fea619]/20 text-[#855300] border border-[#fea619]/30', statusDot: 'bg-[#fea619] animate-pulse', address: 'Flat 11B, Prestige Ozone, Whitefield, Bangalore' },
    { name: 'Rohan & Priya Sen', phone: '+91 97401 55320', treatment: 'Mosquito Barrier Fogging', tech: 'Vikram Solanki', techInitials: 'VS', techBg: 'bg-[#064e3b] text-white', warranty: '45-Day Lawn Blanket', statusLabel: 'Active • Expires in 31 Days', statusBg: 'bg-emerald-50 text-emerald-800 border border-emerald-200', statusDot: 'bg-emerald-500', address: 'Villa 34, Palm Meadows, Airport Road, Bangalore' },
    { name: 'Dr. Ananya Murthy', phone: '+91 96112 00983', treatment: 'Rodent Ultrasonic Perimeter Defense', tech: 'Rajesh Kumar', techInitials: 'RK', techBg: 'bg-[#003527] text-white', warranty: '1-Year Commercial Warranty', statusLabel: 'Renewed • Active', statusBg: 'bg-emerald-50 text-emerald-800 border border-emerald-200', statusDot: 'bg-emerald-500', address: 'Bungalow 7, Defence Colony, Indiranagar, Bangalore' },
  ];

  return (
    <div className="bg-[#fcf9f4] text-[#1c1c19] text-sm min-h-screen flex selection:bg-[#fea619]/30">
      {/* ── Mobile Sidebar Backdrop ── */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ── Signature Dark Forest Green Sidebar ── */}
      <Sidebar
        activeSection={activeSectionFilter}
        onSelectSection={sec => setActiveSectionFilter(sec)}
        workerKycCount={workerApplications.length}
        bookingsCount={bookings.length}
        showToast={showToast}
        onOpenProfile={() => setShowProfileModal(true)}
        profile={profile}
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <Toast message={toast.message} type={toast.type} />
      <ProfileModal
        open={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        showToast={showToast}
        onLogout={onLogout}
        profile={profile}
        onSaveProfile={setProfile}
      />

      {/* ── Main Dashboard View (pl-0 lg:pl-64 Responsive) ── */}
      <div className="w-full pl-0 lg:pl-64 flex flex-col min-h-screen">
        <Header
          onSelectSection={sec => setActiveSectionFilter(sec)}
          onToast={showToast}
          onOpenSidebar={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 pt-16 px-6 pb-12 bg-[#fcf9f4]">
          {/* ── Page Title + Timeframe ── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b border-[#ebe8e3] mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] uppercase tracking-wider text-[#855300] font-bold bg-[#fea619]/20 px-2.5 py-0.5 rounded-full border border-[#fea619]/30">
                  Operational Command v4.2
                </span>
                <span className="w-1 h-1 rounded-full bg-[#fea619]" />
                <span className="text-[11px] text-[#707974] font-medium">Central Bio-Dispatch Hub</span>
              </div>
              <h1 className="text-2xl font-black text-[#003527] tracking-tight leading-tight">EcoPest Agency Dashboard</h1>
              <p className="text-sm text-[#707974] mt-0.5">Live telemetry, field personnel tracking, worker module approvals, and active warranty ledgers.</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center p-1 rounded-xl bg-white border border-[#ebe8e3] shadow-xs">
                {['today', 'week', 'month'].map(t => (
                  <button key={t} type="button"
                    onClick={() => { setTimeframe(t); showToast(`Viewing ${t === 'today' ? 'Today' : t === 'week' ? 'This Week' : 'This Month'}`); }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize cursor-pointer ${
                      timeframe === t
                        ? 'bg-[#003527] text-white shadow-xs'
                        : 'text-[#707974] hover:text-[#1c1c19] hover:bg-[#f6f3ee]'
                    }`}
                  >
                    {t === 'today' ? 'Today' : t === 'week' ? 'This Week' : 'This Month'}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#ebe8e3] shadow-xs">
                <span className="material-symbols-outlined text-[#fea619] text-[18px]">calendar_today</span>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] uppercase tracking-wider text-[#707974] font-semibold">Schedule Window</span>
                  <span className="text-xs font-bold text-[#1c1c19]">Oct 24, 2024 · Shift A</span>
                </div>
                <button type="button" onClick={() => setActiveSectionFilter('bookings')} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fea619]/20 text-[#855300] text-[11px] font-bold hover:bg-[#fea619] hover:text-[#1c1c19] transition-colors cursor-pointer border border-[#fea619]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fea619] animate-ping" />4 Pending
                </button>
              </div>
            </div>
          </div>

          {/* Contextual Filter Indicator when a specific section is selected from left menu */}
          {activeSectionFilter !== 'all' && (
            <div className="flex items-center justify-between p-3.5 mb-6 rounded-2xl bg-white border border-[#ebe8e3] shadow-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-[#003527]/10 flex items-center justify-center text-[#003527]">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                </span>
                <div>
                  <div className="text-xs font-bold text-[#003527]">
                    Active View: <span className="capitalize">{
                      activeSectionFilter === 'stats' ? 'Executive Stats & Telemetry' :
                      activeSectionFilter === 'tracking' ? 'Live Urban GPS Tracking' :
                      activeSectionFilter === 'bookings' ? 'Operations Bar' :
                      activeSectionFilter === 'kyc' ? 'Worker KYC Approvals' :
                      activeSectionFilter === 'clients' ? 'Client Directory' :
                      activeSectionFilter === 'analytics' ? 'Analytics & Reports' :
                      activeSectionFilter === 'settings' ? 'System Settings' : activeSectionFilter
                    }</span>
                  </div>
                  <div className="text-[11px] text-[#707974]">Filtered via left navigation menu</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveSectionFilter('all');
                  showToast('Showing all operational sections', 'info');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-[#003527] text-white text-xs font-bold hover:bg-[#064e3b] transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-[15px]">dashboard</span>
                Show All Sections
              </button>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════════
              SECTION 1: Executive Telemetry & Performance Stats
          ═══════════════════════════════════════════════════════════════════════ */}
          {(activeSectionFilter === 'all' || activeSectionFilter === 'stats') && (
            <section className="rounded-3xl border border-[#ebe8e3] bg-white p-6 flex flex-col mb-8 shadow-xs">
              <SectionHeader
                icon="analytics"
                title="Executive Telemetry & Performance Metrics"
                subtitle="Real-time service velocity, dispatch SLAs, and commercial contract diagnostics"
                badge="Live Core"
                action={
                  <button
                    type="button"
                    onClick={() => setActiveSectionFilter('analytics')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#fbf7ee] border border-[#ebe8e3] hover:bg-[#f0ede9] text-[#003527] font-bold text-xs transition-all cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[15px]">bar_chart</span>
                    Detailed Analytics View
                  </button>
                }
              />
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard label="Active Fleet Roster" icon="electric_moped" iconBg="bg-[#003527]/10" iconColor="text-[#003527]" value={workers.length.toString()} sub="/ 22 Units"
                  badge={<><span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" /></span>{workers.length} Active · 4 Offline</>}
                  onClick={() => setActiveSectionFilter('tracking')} />
                <StatCard label="Jobs Dispatched" icon="assignment_turned_in" iconBg="bg-[#fea619]/20" iconColor="text-[#855300]" value="42" sub="Allotted Today"
                  badge={<><span className="material-symbols-outlined text-[14px] text-[#fea619]">priority_high</span>6 Critical · Avg 2.3/tech</>}
                  onClick={() => setActiveSectionFilter('bookings')} />
                <StatCard label="Total Completed" icon="verified" iconBg="bg-[#003527]/10" iconColor="text-[#003527]" value="36" sub="Done" progress progressValue={85.7}
                  badge={<>85.7% Completion · <span className="text-[#707974]">6 in-progress</span></>}
                  onClick={() => setActiveSectionFilter('analytics')} />
                <StatCard label="Client Directory" icon="domain" iconBg="bg-[#f0ede9]" iconColor="text-[#003527]" value="128" sub="Subscribed"
                  badge={<><span className="material-symbols-outlined text-[14px] text-[#003527]">nest_eco_leaf</span>100% Bio-Certified · 14 Sectors</>}
                  onClick={() => setActiveSectionFilter('clients')} />
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════════════════════════════════
              SECTION 2: Live Urban GPS Tracking & Fleet Operations
          ═══════════════════════════════════════════════════════════════════════ */}
          {(activeSectionFilter === 'all' || activeSectionFilter === 'tracking') && (
            <section className="rounded-3xl border border-[#ebe8e3] bg-white p-6 flex flex-col mb-8 shadow-xs">
              <SectionHeader
                icon="location_searching"
                title="Live Urban Fleet GPS Tracking & Field Dispatch"
                subtitle="Continuous 15-second geo-lock telemetry across Bangalore urban sectors"
                badge={`${workers.length} Field Units Deployed`}
                action={
                  <div className="flex items-center gap-2">
                    <Link
                      to="/worker-fleet"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#ebe8e3] hover:bg-[#f6f3ee] text-[#003527] font-bold text-xs transition-all shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[15px]">electric_moped</span>
                      Full Fleet Rosters
                    </Link>
                    <button
                      type="button"
                      onClick={handleRecenter}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#003527] text-white font-bold text-xs hover:bg-[#064e3b] transition-all cursor-pointer shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[15px]">my_location</span>
                      Recenter Map
                    </button>
                  </div>
                }
              />

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Map */}
                <div className="xl:col-span-7 flex flex-col gap-3">
                  <div className="relative w-full h-[460px] rounded-2xl overflow-hidden bg-[#e5e2dd] border border-[#ebe8e3] shadow-xs">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBRs8gDCt8ya7cA_eQmmbI1HAZ8nHR-irxaIk6u_YMA5Ho-grbr8nh18kAJjn8e_o-F4Ca3ZVV-tohIyal-ccC5ETual5uDUasczBIs956Z-PoAYwlCuJy-87rCojpfHuBvsumVXl67GUDUCF18YScouDpdl_b6NPDCZ8SEPzmk2p57Bc6hwrbdMQVVXBEs9FWYbICRPS2z17TyyJr3sRzdH66O4zWBaE1PDTXx8nLQrdsyq0omLcn-eA')" }} />
                    <div className="absolute inset-0 bg-[#003527]/10" />

                    {/* HUD */}
                    <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-white/95 backdrop-blur-md shadow-md flex items-center gap-4 z-20 border border-[#ebe8e3]">
                      {[['bg-emerald-500', `Active: ${workers.length}`], ['bg-[#fea619]', 'En Route: 4'], ['bg-gray-400', 'Idle: 4']].map(([color, label]) => (
                        <div key={label} className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${color}`} />
                          <span className="font-bold text-[#1c1c19] text-[11px]">{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Worker Pins */}
                    {workers.map((w, i) => {
                      const positions = [
                        { top: '28%', left: '34%' },
                        { top: '52%', left: '62%' },
                        { top: '70%', left: '22%' },
                        { top: '40%', left: '75%' },
                        { top: '65%', left: '50%' }
                      ];
                      const pos = positions[i % positions.length];
                      return (
                        <div key={w.id} className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all duration-300 hover:scale-110 ${focusedWorker === w.id ? 'scale-125' : ''} ${isRecentering ? 'animate-bounce' : ''}`}
                          style={pos} onClick={() => handleFocusWorker(w.id, w.name)}>
                          <div className="relative flex flex-col items-center">
                            {focusedWorker === w.id && <div className="absolute w-14 h-14 rounded-full bg-[#003527]/25 animate-ping" />}
                            <div className="w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center p-0.5 border-2 border-[#003527]">
                              <img src={w.avatar} alt={w.name} className="w-full h-full rounded-full object-cover" />
                            </div>
                            <div className="mt-1 px-2.5 py-0.5 rounded-full bg-white text-[#003527] text-[10px] font-bold shadow-md whitespace-nowrap border border-[#ebe8e3]">
                              {w.name.split(' ')[0]} · {w.location.split(',')[0]}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Cluster Badge */}
                    <div className="absolute top-[38%] left-[78%] z-10">
                      <div className="px-3 py-1 rounded-full bg-[#003527] text-white text-[11px] font-bold flex items-center gap-1.5 shadow-md border border-white/20">
                        <span className="material-symbols-outlined text-[13px] text-[#fea619]">nest_eco_leaf</span>Cluster 4: High Density
                      </div>
                    </div>

                    {/* Dispatch Banner */}
                    <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-between gap-3 z-20 border border-[#ebe8e3]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#fea619]/20 text-[#855300] flex items-center justify-center shrink-0 border border-[#fea619]/30">
                          <span className="material-symbols-outlined text-[20px]">electric_scooter</span>
                        </div>
                        <div className="flex flex-col leading-tight">
                          <span className="text-xs sm:text-sm font-bold text-[#003527]">{targetStatus}</span>
                          <span className="text-[11px] text-[#707974]">ETA: 12 mins · Flat 402, Green Glen Palms</span>
                        </div>
                      </div>
                      <button type="button" onClick={() => showToast('Route ping sent to nearest technician', 'success')} className="px-4 py-2 rounded-xl bg-[#003527] text-white text-xs font-bold hover:bg-[#064e3b] transition-all whitespace-nowrap cursor-pointer shadow-xs">
                        Direct Route Ping
                      </button>
                    </div>
                  </div>
                </div>

                {/* Worker Fleet Cards */}
                <div className="xl:col-span-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[#003527] text-base">Active Technician Units</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#003527]/10 text-[#003527] text-[11px] font-bold">{workers.length} Online</span>
                    </div>
                    <button type="button" onClick={() => showToast('Technicians sorted by GPS proximity to central hub')} className="flex items-center gap-1 text-[#707974] hover:text-[#003527] text-[12px] font-semibold transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[16px]">tune</span>By Proximity
                    </button>
                  </div>
                  <div className="flex flex-col gap-3 max-h-[460px] overflow-y-auto pr-1">
                    {workers.map(w => (
                      <WorkerCard key={w.id} worker={w} onFocus={handleFocusWorker} focused={focusedWorker === w.id} recentering={isRecentering} onToast={showToast} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════════════════════════════════
              SECTION 3: Operations Bar (Bookings Queue - Opens Inline Like KYC)
          ═══════════════════════════════════════════════════════════════════════ */}
          {(activeSectionFilter === 'all' || activeSectionFilter === 'bookings') && (
            <section className="rounded-3xl border border-[#ebe8e3] bg-white p-6 flex flex-col mb-8 shadow-xs" id="sec-bookings">
              <SectionHeader
                icon="approval_delegation"
                title="Operations Bar · Bookings Dispatch Queue"
                subtitle="Immediate customer appointments requiring field technician assignment and slot confirmation"
                badge={`${bookings.length} Pending Assignment`}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {bookings.map(b => (
                  <div key={b.id} className="rounded-2xl border border-[#ebe8e3] bg-[#fcf9f4] hover:bg-white p-4 flex flex-col justify-between gap-3 shadow-xs hover:border-[#003527]/30 transition-all">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="font-bold text-[#1c1c19] text-sm">{b.client}</div>
                          <div className="text-[11px] text-[#707974] flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-[13px] text-[#003527]">home_pin</span>{b.address}
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-[#003527] bg-[#fbf7ee] border border-[#ebe8e3] px-2 py-0.5 rounded-lg shrink-0">{b.id}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#003527]/10 text-[#003527]">
                          <span className="material-symbols-outlined text-[13px]">pest_control</span>{b.service}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-[#707974]">
                          <span className="material-symbols-outlined text-[13px]">schedule</span>{b.time}
                        </span>
                      </div>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold ${b.priority === 'urgent' ? 'bg-[#fea619]/20 text-[#855300] border border-[#fea619]/30' : b.priority === 'critical' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-[#f0ede9] text-[#707974] border border-[#ebe8e3]'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${b.priority === 'urgent' ? 'bg-[#fea619] animate-pulse' : b.priority === 'critical' ? 'bg-red-500 animate-pulse' : 'bg-[#707974]'}`} />
                        {b.status}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-[#ebe8e3]">
                      <button
                        type="button"
                        onClick={() => showToast(`Technician assigned for ${b.id}`, 'success')}
                        className="flex-1 py-2 rounded-xl bg-[#003527] text-white text-[12px] font-bold hover:bg-[#064e3b] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[15px]">person_add</span>Assign Tech
                      </button>
                      <button
                        type="button"
                        onClick={() => showToast(`${b.id} confirmed for ${b.time}`, 'success')}
                        className="flex-1 py-2 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] text-[12px] font-bold hover:bg-[#f6f3ee] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[15px]">check</span>Confirm
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════════════════════════════════
              SECTION 4: Worker Module KYC Approvals (Inline Section)
          ═══════════════════════════════════════════════════════════════════════ */}
          {(activeSectionFilter === 'all' || activeSectionFilter === 'kyc') && (
            <section className="rounded-3xl border border-[#ebe8e3] bg-white p-6 flex flex-col mb-8 shadow-xs" id="sec-kyc">
              <SectionHeader
                icon="how_to_reg"
                title="Worker Module KYC Approvals & Registration Queue"
                subtitle="Direct applications submitted by field technicians via the Worker Mobile Module. Inspect CIB&RC permits and approve to grant live dispatch rights."
                badge={`${workerApplications.length} Awaiting Verification`}
              />

              {workerApplications.length === 0 ? (
                <div className="p-10 rounded-2xl bg-[#fcf9f4] border border-dashed border-[#ebe8e3] text-center flex flex-col items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[#003527] text-[44px]">task_alt</span>
                  <h3 className="font-bold text-[#003527] text-base">All Worker Applications Vetted!</h3>
                  <p className="text-xs text-[#707974] max-w-md">
                    Zero pending KYC reviews from the worker module. All registered technicians are actively certified and deployed into the field roster.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {workerApplications.map(app => (
                    <div key={app.id} className="rounded-2xl border border-[#ebe8e3] bg-[#fcf9f4] hover:bg-white p-5 flex flex-col justify-between gap-4 transition-all shadow-xs hover:shadow-md hover:border-[#003527]/30">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="relative shrink-0">
                              <img src={app.avatar} alt={app.name} className="w-12 h-12 rounded-2xl object-cover border border-[#ebe8e3]" />
                              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#fea619] ring-2 ring-white animate-pulse" />
                            </div>
                            <div>
                              <h3 className="font-black text-[#1c1c19] text-sm">{app.name}</h3>
                              <div className="text-[11px] text-[#707974] flex items-center gap-1 mt-0.5">
                                <span className="material-symbols-outlined text-[12px] text-[#003527]">location_on</span>
                                {app.city}
                              </div>
                              <div className="text-[10px] text-[#707974] font-mono mt-0.5">{app.id} • {app.applied}</div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-[#fea619]/20 text-[#855300] text-[10px] font-bold shrink-0 border border-[#fea619]/30">
                            Worker KYC
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#003527]/10 text-[#003527] text-[11px] font-bold">
                            <span className="material-symbols-outlined text-[12px]">pest_control</span>
                            {app.specialization}
                          </span>
                          <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-[#ebe8e3] text-[#707974] text-[11px] font-semibold">
                            <span className="material-symbols-outlined text-[12px]">work_history</span>
                            {app.experience}
                          </span>
                          <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-[#ebe8e3] text-[#707974] text-[11px] font-semibold">
                            <span className="material-symbols-outlined text-[12px]">two_wheeler</span>
                            {app.vehicle.split('(')[0]}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-white border border-[#ebe8e3] text-[11px] space-y-1.5 shadow-2xs">
                          <div className="flex justify-between items-center">
                            <span className="text-[#707974]">Pest Permit License:</span>
                            <span className="font-mono font-bold text-[#003527]">{app.pestLicense}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#707974]">License Status:</span>
                            <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[13px]">verified</span>
                              {app.licenseStatus}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#707974]">Direct Phone:</span>
                            <span className="font-mono font-semibold text-[#1c1c19]">{app.phone}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#707974]">Aadhaar (Audited):</span>
                            <span className="font-mono text-[#707974]">{app.aadhaar}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 pt-2 border-t border-[#ebe8e3]">
                        <button
                          type="button"
                          onClick={() => setSelectedKycDossier(app)}
                          className="w-full py-1.5 rounded-xl bg-white hover:bg-[#f6f3ee] text-[#003527] font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer border border-[#ebe8e3] shadow-xs"
                        >
                          <span className="material-symbols-outlined text-[15px]">policy</span>
                          Inspect Full Dossier
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleRejectWorkerKYC(app.id, app.name)}
                            className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer border border-red-200"
                          >
                            <span className="material-symbols-outlined text-[14px]">close</span>
                            Reject
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApproveWorkerKYC(app)}
                            className="flex-1 py-2 rounded-xl bg-[#003527] hover:bg-[#064e3b] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[15px]">check_circle</span>
                            Approve &amp; Deploy
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ═══════════════════════════════════════════════════════════════════════
              SECTION 5: Client Directory (Specifically displays Name, Mobile No,
              Service Conducted, Name of Worker, Warranty, Address as requested!)
          ═══════════════════════════════════════════════════════════════════════ */}
          {(activeSectionFilter === 'all' || activeSectionFilter === 'clients') && (
            <section className="rounded-3xl border border-[#ebe8e3] bg-white p-6 flex flex-col mb-8 shadow-xs" id="sec-clients">
              <SectionHeader
                icon="policy"
                title="Client Directory & Active Warranty Ledgers"
                subtitle="Complete verified client registry with assigned technician records, warranty validities, and treatment locations"
                badge="128 Verified Contracts"
              />

              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-sm">
                    <input type="text" placeholder="Search client, mobile no, service, address..." className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#ebe8e3] text-[#1c1c19] text-xs focus:outline-none focus:ring-2 focus:ring-[#003527]/20 transition-all shadow-xs" />
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-[17px] text-[#707974]">search</span>
                  </div>
                  <button type="button" onClick={() => showToast('Filtered: Clients with warranty expiring within 30 days', 'warning')} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#ebe8e3] text-[#1c1c19] text-xs font-semibold hover:bg-[#f6f3ee] transition-colors cursor-pointer shadow-xs">
                    <span className="material-symbols-outlined text-[17px] text-[#fea619]">filter_list</span>Expiring Soon
                  </button>
                </div>

                {/* Table with EXACTLY the requested fields:
                    Name, Mobile No, Service Conducted, Name of Worker, Warranty, Address of Client */}
                <div className="overflow-x-auto rounded-2xl border border-[#ebe8e3] shadow-xs">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#fcf9f4] border-b border-[#ebe8e3] text-[11px] uppercase tracking-wider text-[#707974] font-bold">
                        <th className="py-3 px-5">Name</th>
                        <th className="py-3 px-4">Mobile No</th>
                        <th className="py-3 px-4">Service Conducted</th>
                        <th className="py-3 px-4">Name of Worker</th>
                        <th className="py-3 px-4">Warranty</th>
                        <th className="py-3 px-5">Address of Client</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ebe8e3] bg-white">
                      {clients.map((c, idx) => (
                        <tr key={idx} className="hover:bg-[#fcf9f4]/60 transition-colors text-xs">
                          {/* 1. Name */}
                          <td className="py-4 px-5">
                            <span className="font-bold text-[#1c1c19] text-sm">{c.name}</span>
                          </td>
                          {/* 2. Mobile No */}
                          <td className="py-4 px-4 font-mono font-semibold text-[#003527]">
                            <a href={`tel:${c.phone}`} className="hover:underline flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">call</span>
                              {c.phone}
                            </a>
                          </td>
                          {/* 3. Service Conducted */}
                          <td className="py-4 px-4 font-semibold text-[#1c1c19]">
                            {c.treatment}
                          </td>
                          {/* 4. Name of Worker */}
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-7 h-7 rounded-full ${c.techBg} flex items-center justify-center text-[10px] font-bold shrink-0 shadow-xs`}>
                                {c.techInitials}
                              </div>
                              <span className="font-bold text-[#1c1c19]">{c.tech}</span>
                            </div>
                          </td>
                          {/* 5. Warranty */}
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${c.statusBg}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${c.statusDot}`} />
                              {c.warranty}
                            </span>
                          </td>
                          {/* 6. Address of Client */}
                          <td className="py-4 px-5 text-[#707974] max-w-xs">
                            <div className="flex items-start gap-1">
                              <span className="material-symbols-outlined text-[14px] text-[#003527] shrink-0 mt-0.5">home_pin</span>
                              <span>{c.address}</span>
                            </div>
                          </td>
                          {/* Action */}
                          <td className="py-4 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedClient(c)}
                              className="px-3.5 py-1.5 rounded-xl bg-[#fbf7ee] hover:bg-[#003527] hover:text-white text-[#003527] text-xs font-bold border border-[#ebe8e3] transition-all cursor-pointer shadow-xs"
                            >
                              History
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════════════════════════════════
              SECTION 6: Analytics & Reports (Opens Inline Like KYC)
          ═══════════════════════════════════════════════════════════════════════ */}
          {(activeSectionFilter === 'all' || activeSectionFilter === 'analytics') && (
            <section className="rounded-3xl border border-[#ebe8e3] bg-white p-6 flex flex-col mb-8 shadow-xs" id="sec-analytics">
              <SectionHeader
                icon="bar_chart"
                title="Analytics & Executive Performance Reports"
                subtitle="Monthly dispatch velocity, customer rating indices, and revenue metrics"
                badge="October 2024"
                action={
                  <button
                    type="button"
                    onClick={() => showToast('Full monthly analytics report exported as PDF', 'success')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#003527] text-white font-bold text-xs hover:bg-[#064e3b] transition-all cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[15px]">download</span>
                    Export PDF
                  </button>
                }
              />

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
                {[
                  { label: 'Jobs This Month', value: '184', change: '+12%', up: true, icon: 'task_alt' },
                  { label: 'Revenue Generated', value: '₹2.4L', change: '+8%', up: true, icon: 'payments' },
                  { label: 'Avg Response Time', value: '14 min', change: '-3 min', up: true, icon: 'timer' },
                  { label: 'Client Satisfaction', value: '4.9 ★', change: '+0.1', up: true, icon: 'star' },
                  { label: 'Warranty Renewals', value: '34', change: '+5', up: true, icon: 'autorenew' },
                  { label: 'Cancellation Rate', value: '1.2%', change: '-0.4%', up: true, icon: 'cancel' },
                ].map(s => (
                  <div key={s.label} className="p-3.5 rounded-2xl border border-[#ebe8e3] bg-[#fcf9f4] shadow-xs">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="material-symbols-outlined text-[#003527] text-[16px]">{s.icon}</span>
                      <span className="text-[10px] uppercase tracking-wider text-[#707974] font-bold">{s.label}</span>
                    </div>
                    <div className="text-xl font-black text-[#003527]">{s.value}</div>
                    <div className={`flex items-center gap-0.5 text-[10px] font-bold mt-0.5 ${s.up ? 'text-emerald-700' : 'text-[#855300]'}`}>
                      <span className="material-symbols-outlined text-[12px]">{s.up ? 'trending_up' : 'trending_down'}</span>
                      {s.change} vs last month
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Performers */}
                <div className="rounded-2xl border border-[#ebe8e3] bg-[#fcf9f4] p-5 shadow-xs">
                  <h3 className="font-bold text-[#003527] text-sm mb-3">🏆 Top Performers — October</h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { name: 'Rajesh Kumar', jobs: 52, rating: '4.9', revenue: '₹68K' },
                      { name: 'Anita Desai', jobs: 41, rating: '5.0', revenue: '₹54K' },
                      { name: 'Vikram Solanki', jobs: 38, rating: '4.8', revenue: '₹49K' },
                    ].map((w, i) => (
                      <div key={w.name} className="flex items-center justify-between py-2 border-b border-[#ebe8e3] last:border-0 text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${i === 0 ? 'bg-[#fea619] text-[#1c1c19]' : 'bg-[#f0ede9] text-[#707974]'}`}>#{i + 1}</span>
                          <span className="font-bold text-[#1c1c19]">{w.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#707974]">
                          <span>{w.jobs} jobs</span>
                          <span className="text-[#855300] font-bold">{w.rating} ★</span>
                          <span className="text-[#003527] font-bold">{w.revenue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Jobs Completed Chart */}
                <div className="rounded-2xl border border-[#ebe8e3] bg-[#fcf9f4] p-5 shadow-xs flex flex-col justify-between">
                  <h3 className="font-bold text-[#003527] text-sm mb-3">Jobs Completed — Last 7 Days</h3>
                  <div className="flex items-end gap-2 h-28 pt-2">
                    {[28, 35, 42, 38, 51, 46, 36].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-t-lg bg-[#003527] transition-all duration-500 hover:bg-[#064e3b]" style={{ height: `${(val / 55) * 88}px` }} />
                        <span className="text-[10px] text-[#707974] font-medium">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════════════════════════════════
              SECTION 7: Settings (Opens Inline Like KYC)
          ═══════════════════════════════════════════════════════════════════════ */}
          {(activeSectionFilter === 'all' || activeSectionFilter === 'settings') && (
            <section className="rounded-3xl border border-[#ebe8e3] bg-white p-6 flex flex-col mb-8 shadow-xs" id="sec-settings">
              <SectionHeader
                icon="tune"
                title="Agency Configuration & Operating Preferences"
                subtitle="Dispatch automation rules, push notifications, and bio-certification alerts"
                badge="Active Hub"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Agency info */}
                <div className="p-5 rounded-2xl border border-[#ebe8e3] bg-[#fcf9f4] shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-[#003527] text-sm mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#003527] text-[18px]">business</span>Agency Hub Info
                    </h3>
                    <div className="flex flex-col gap-2.5 text-xs">
                      <div className="flex items-center justify-between py-1 border-b border-[#ebe8e3]">
                        <span className="text-[#707974]">Agency Name</span>
                        <span className="font-bold text-[#1c1c19]">EcoPest Solutions</span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-[#ebe8e3]">
                        <span className="text-[#707974]">Agency ID</span>
                        <span className="font-bold text-[#003527]">#PF-8821</span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-[#ebe8e3]">
                        <span className="text-[#707974]">Operating License Tier</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#fea619]/20 text-[#855300] font-bold">Commercial Pro</span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-[#707974]">Registered Base City</span>
                        <span className="font-bold text-[#1c1c19]">Bangalore Urban, Karnataka</span>
                      </div>
                    </div>
                  </div>
                  <button type="button" onClick={() => showToast('Agency profile update request submitted to Root Admin', 'success')} className="mt-4 w-full py-2.5 rounded-xl bg-[#003527] text-white text-xs font-bold hover:bg-[#064e3b] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs">
                    <span className="material-symbols-outlined text-[16px]">save</span>Save Agency Profile
                  </button>
                </div>

                {/* Toggles */}
                <div className="p-5 rounded-2xl border border-[#ebe8e3] bg-[#fcf9f4] shadow-xs">
                  <h3 className="font-bold text-[#003527] text-sm mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#003527] text-[18px]">notifications_active</span>System Preferences
                  </h3>
                  {[
                    { k: 'notifications', label: 'Push Notifications', sub: 'New bookings, critical infestation alerts' },
                    { k: 'gpsSync', label: 'GPS Auto-Sync (15s)', sub: 'Live worker position continuous refresh' },
                    { k: 'bioCertAlerts', label: 'Bio-Cert Expiry Alerts', sub: 'Notify 7 days before warranty expires' },
                    { k: 'autoDispatch', label: 'Auto-Dispatch Mode', sub: 'Auto-assign nearest available technician' },
                    { k: 'darkMode', label: 'Dark Mode Theme', sub: 'Switch interface contrast' },
                  ].map(t => (
                    <div key={t.k} className="flex items-center justify-between py-2.5 border-b border-[#ebe8e3] last:border-0">
                      <div>
                        <div className="font-bold text-[#1c1c19] text-xs">{t.label}</div>
                        <div className="text-[10px] text-[#707974]">{t.sub}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSettingsState(s => ({ ...s, [t.k]: !s[t.k] }));
                          showToast(`${t.label} ${!settingsState[t.k] ? 'enabled' : 'disabled'}`);
                        }}
                        className={`relative w-10 h-5 rounded-full transition-colors duration-200 cursor-pointer ${settingsState[t.k] ? 'bg-[#003527]' : 'bg-[#e5e2dd]'}`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${settingsState[t.k] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* ── Worker KYC Dossier Modal ── */}
      {selectedKycDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={e => e.target === e.currentTarget && setSelectedKycDossier(null)}>
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#ebe8e3] p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-3 border-b border-[#ebe8e3] pb-3">
              <div className="flex items-center gap-3">
                <img src={selectedKycDossier.avatar} alt={selectedKycDossier.name} className="w-12 h-12 rounded-2xl object-cover border border-[#ebe8e3]" />
                <div>
                  <h3 className="font-black text-[#003527] text-base">{selectedKycDossier.name}</h3>
                  <p className="text-[12px] text-[#707974]">Worker Dossier ID: <span className="font-mono font-bold text-[#003527]">{selectedKycDossier.id}</span></p>
                </div>
              </div>
              <button type="button" onClick={() => setSelectedKycDossier(null)} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#707974] hover:text-[#1c1c19] transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#fcf9f4] border border-[#ebe8e3] flex flex-col gap-2.5 text-xs">
              {[
                ['Operating Territory', selectedKycDossier.city],
                ['Bio-Specialization', selectedKycDossier.specialization],
                ['Field Experience', selectedKycDossier.experience],
                ['Pest Control License', selectedKycDossier.pestLicense],
                ['Permit Audit Status', `✅ ${selectedKycDossier.licenseStatus}`],
                ['Registered Vehicle', selectedKycDossier.vehicle],
                ['Contact Phone', selectedKycDossier.phone],
                ['Contact Email', selectedKycDossier.email],
                ['Govt ID (Aadhaar)', selectedKycDossier.aadhaar],
                ['Tax PAN', selectedKycDossier.pan],
                ['Agency Reference', selectedKycDossier.references],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between text-xs">
                  <span className="text-[#707974] font-medium">{k}:</span>
                  <span className="font-semibold text-[#1c1c19] text-right">{v}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleRejectWorkerKYC(selectedKycDossier.id, selectedKycDossier.name)}
                className="px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 font-bold text-xs hover:bg-red-100 transition-all cursor-pointer"
              >
                Reject Application
              </button>
              <button
                type="button"
                onClick={() => handleApproveWorkerKYC(selectedKycDossier)}
                className="flex-1 py-2.5 rounded-xl bg-[#003527] text-white font-bold text-xs hover:bg-[#064e3b] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Approve &amp; Deploy to Fleet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Client History Modal ── */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={e => e.target === e.currentTarget && setSelectedClient(null)}>
          <div className="relative w-full max-w-xl rounded-3xl bg-white border border-[#ebe8e3] p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-3 border-b border-[#ebe8e3] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#003527]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#003527] text-[22px]">person</span>
                </div>
                <div>
                  <h3 className="font-black text-[#003527] text-base">{selectedClient.name}</h3>
                  <p className="text-[12px] text-[#707974] flex items-center gap-1"><span className="material-symbols-outlined text-[13px] text-[#003527]">home_pin</span>{selectedClient.address}</p>
                </div>
              </div>
              <button type="button" onClick={() => setSelectedClient(null)} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#707974] hover:text-[#1c1c19] transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: 'pest_control', label: 'Service Conducted', value: selectedClient.treatment },
                { icon: 'badge', label: 'Assigned Technician', value: selectedClient.tech },
                { icon: 'verified', label: 'Warranty Status', value: selectedClient.warranty },
                { icon: 'phone', label: 'Client Mobile No', value: selectedClient.phone },
              ].map(item => (
                <div key={item.label} className="p-3 rounded-2xl bg-[#fcf9f4] border border-[#ebe8e3]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="material-symbols-outlined text-[#003527] text-[15px]">{item.icon}</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#707974] font-bold">{item.label}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#1c1c19]">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-[#fcf9f4] border border-[#ebe8e3] p-4">
              <h4 className="text-[11px] uppercase tracking-wider text-[#707974] font-bold mb-3">Service History Milestones</h4>
              <div className="flex flex-col gap-2">
                {['Initial On-Site Inspection & Bio-Safety Audit', 'Chemical Barrier Treatment Applied (Bio-Permethrin)', '48-Hour Colony Neutralization Verified', 'Warranty Bio-Shield Certificate Registered'].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#003527] flex items-center justify-center shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-white text-[12px]">check</span>
                    </div>
                    <span className="text-xs sm:text-sm text-[#1c1c19] font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => { showToast(`Warranty renewal scheduled for ${selectedClient.name}`, 'success'); setSelectedClient(null); }} className="flex-1 py-2.5 rounded-xl bg-[#003527] text-white font-bold text-xs sm:text-sm hover:bg-[#064e3b] transition-all cursor-pointer shadow-xs">
                Schedule Renewal
              </button>
              <button type="button" onClick={() => { showToast(`Audit Certificate PDF generated for ${selectedClient.name}`, 'success'); setSelectedClient(null); }} className="flex-1 py-2.5 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] font-bold text-xs sm:text-sm hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs">
                Download Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

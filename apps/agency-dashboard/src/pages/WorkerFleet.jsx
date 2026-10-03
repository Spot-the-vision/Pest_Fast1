import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ─── Toast ──────────────────────────────────────────────────────────────────
function Toast({ message, type = 'info' }) {
  if (!message) return null;
  const bg = type === 'success' ? 'bg-[#003527]' : type === 'warning' ? 'bg-[#fea619]' : 'bg-[#1c1c19]';
  const text = type === 'warning' ? 'text-[#1c1c19]' : 'text-white';
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl ${bg} ${text} font-semibold text-sm border border-white/10 animate-in slide-in-from-bottom-4 duration-300`}>
      <span className="material-symbols-outlined text-[18px]">
        {type === 'success' ? 'check_circle' : type === 'warning' ? 'warning' : 'info'}
      </span>
      {message}
    </div>
  );
}

// ─── Profile Modal ─────────────────────────────────────────────────────────────
function ProfileModal({ open, onClose, showToast, profile, onSaveProfile }) {
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
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>Close Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Signature Dark Forest Green Sidebar (Responsive Slide Drawer on Mobile/Tablet) ────────────
function Sidebar({ onToast, onOpenProfile, profile, mobileOpen = false, onClose }) {
  const handleNavClick = () => {
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

        <Link
          to="/"
          onClick={handleNavClick}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white font-medium text-sm transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">map</span>
          <span>Dashboard &amp; Live Map</span>
        </Link>

        <Link
          to="/"
          onClick={handleNavClick}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white font-medium text-sm transition-all text-left"
        >
          <span className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px]">approval_delegation</span>
            <span>Operations Bar</span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#fea619] text-[#1c1c19] text-[11px] font-bold">4</span>
        </Link>

        <p className="text-[10px] uppercase tracking-widest text-[#80bea6] font-bold px-3 mb-1 mt-3 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[13px] text-[#fea619]">tune</span>
          Management
        </p>

        <Link
          to="/worker-fleet"
          onClick={handleNavClick}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#064e3b] text-white font-bold text-sm shadow-xs border border-white/15 transition-all"
        >
          <span className="material-symbols-outlined text-[20px] text-[#fea619]">electric_moped</span>
          <span>Management (Fleet &amp; Rosters)</span>
        </Link>

        <Link
          to="/"
          onClick={handleNavClick}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white font-medium text-sm transition-all text-left"
        >
          <span className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
            <span>Worker KYC</span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#fea619] text-[#1c1c19] text-[11px] font-bold">3</span>
        </Link>

        <Link
          to="/"
          onClick={handleNavClick}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white font-medium text-sm transition-all text-left cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">business</span>
          <span>Client Directory</span>
        </Link>

        <Link
          to="/"
          onClick={handleNavClick}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white font-medium text-sm transition-all text-left cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">bar_chart</span>
          <span>Analytics &amp; Reports</span>
        </Link>

        <Link
          to="/"
          onClick={handleNavClick}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white font-medium text-sm transition-all text-left cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">tune</span>
          <span>Settings</span>
        </Link>
      </nav>

      {/* Fleet Utilization, Helpline & Profile at bottom of Menu Bar */}
      <div className="p-3 border-t border-white/10 space-y-2 shrink-0 bg-[#00291e]">
        <button
          type="button"
          onClick={() => onToast('📞 Operations Helpline: Connected to Central Command (1800-PEST-DISPATCH)', 'success')}
          className="w-full py-2.5 px-3 rounded-xl bg-[#fea619] hover:bg-[#e09110] text-[#1c1c19] font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[16px]">call</span>
          <span>24x7 Ops Helpline</span>
        </button>

        {/* Profile Card (Editable, Moved to Bottom of Sidebar) */}
        <button
          type="button"
          onClick={onOpenProfile}
          className="w-full p-2.5 rounded-2xl bg-[#064e3b]/80 hover:bg-[#064e3b] border border-white/10 transition-all text-left cursor-pointer shadow-xs group"
          title="Click to view and edit profile"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#003527] border border-white/15 flex items-center justify-center text-[#fea619] shadow-xs font-bold text-xs">
              {(profile?.name || 'Marcus Sterling').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
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

// ─── Dispatch Job Card ────────────────────────────────────────────────────────
function JobCard({ job, onToast, accent }) {
  const accentBorder = accent === 'primary' ? 'border-l-[#003527]' : accent === 'secondary' ? 'border-l-[#fea619]' : 'border-l-[#707974]';
  return (
    <div className={`rounded-3xl border border-[#ebe8e3] bg-white shadow-xs hover:shadow-md transition-all overflow-hidden border-l-4 ${accentBorder}`}>
      {/* Job header */}
      <div className="px-5 pt-4 pb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#ebe8e3]/60 bg-[#fcf9f4]/50">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-white border border-[#ebe8e3] text-[#003527] text-[11px] font-bold tracking-wider shadow-2xs">{job.id}</span>
          <span className="flex items-center gap-1 text-[12px] text-[#707974] font-medium">
            <span className="material-symbols-outlined text-[#003527] text-[14px]">schedule</span>
            {job.time}
          </span>
          <span className="flex items-center gap-1 text-[12px] text-[#707974] font-medium">
            <span className="material-symbols-outlined text-[#003527] text-[14px]">route</span>
            {job.distance}
          </span>
        </div>
        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${job.statusBg}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${job.statusDot}`} />
          {job.status}
        </span>
      </div>

      {/* Job body */}
      <div className="px-5 py-4">
        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#fcf9f4] border border-[#ebe8e3]">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-white border border-[#ebe8e3] shadow-xs`}>
            <span className={`material-symbols-outlined text-[24px] ${job.iconColor || 'text-[#003527]'}`}>{job.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[#1c1c19] text-sm">{job.title}</div>
            <div className="text-[12px] text-[#707974] mt-0.5 truncate">{job.address}</div>
            {job.client && (
              <div className="flex items-center gap-1.5 mt-1 text-[12px]">
                <span className="text-[#003527] font-bold">{job.client}</span>
                {job.extra && <><span className="text-[#707974]">·</span><span className="text-[#707974]">{job.extra}</span></>}
              </div>
            )}
          </div>
          <div className="flex flex-col items-end shrink-0 text-right">
            <span className="text-[10px] uppercase tracking-wider text-[#707974] font-bold">{job.metaLabel}</span>
            <span className="text-sm font-black text-[#003527]">{job.metaValue}</span>
            {job.metaSub && <span className="text-[11px] text-emerald-800 font-semibold flex items-center gap-0.5 mt-0.5"><span className="material-symbols-outlined text-[12px]">eco</span>{job.metaSub}</span>}
          </div>
        </div>
      </div>

      {/* Job actions */}
      <div className="px-5 pb-4 flex items-center justify-between gap-3 border-t border-[#ebe8e3]/60 pt-3">
        <div className="flex items-center gap-2 text-[12px] text-[#707974]">
          {job.phone && (
            <a href={`tel:${job.phone}`} className="flex items-center gap-1 text-[#003527] font-bold hover:underline">
              <span className="material-symbols-outlined text-[#003527] text-[14px]">call</span>
              {job.phone}
            </a>
          )}
          {job.note && (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[#707974] text-[14px]">info</span>
              {job.note}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => onToast(`${job.actionLabel} initiated for ${job.id}`, 'success')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-xs ${
            job.actionPrimary
              ? 'bg-[#003527] text-white hover:bg-[#064e3b]'
              : 'bg-white border border-[#ebe8e3] text-[#003527] hover:bg-[#f6f3ee]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">{job.actionIcon}</span>
          {job.actionLabel}
        </button>
      </div>
    </div>
  );
}

// ─── Main WorkerFleet Page ────────────────────────────────────────────────────
export default function WorkerFleet() {
  const [timeFilter, setTimeFilter] = useState('Day');
  const [toast, setToast] = useState({ message: null, type: 'info' });
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Marcus Sterling',
    email: 'marcus@ecopest.com',
    phone: '+91 98001 12345',
    agencyCode: 'EcoPest Solutions #PF-8821',
    role: 'Chief Operations Dispatcher',
    shift: 'Shift A (07:00 - 19:00 IST)',
  });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: null, type: 'info' }), 3000);
  };

  const jobs = [
    {
      id: 'JOB-9021', time: 'Today, 2:00 PM', distance: '3.2 km away',
      status: 'Contact Released', statusBg: 'bg-emerald-50 text-emerald-800 border border-emerald-200', statusDot: 'bg-emerald-500',
      icon: 'pest_control_rodent', iconColor: 'text-[#003527]',
      title: 'Termite Eradication', address: '742 Evergreen Terrace, Sector 7-C',
      client: 'David K. Chen', extra: 'Pre-authorized Keybox #8491',
      metaLabel: 'Est. Service', metaValue: '75 Minutes', metaSub: 'Subterranean colony',
      phone: '+91 98450 18239', note: 'Gate Code: #4820',
      actionLabel: 'Navigate & Start', actionIcon: 'near_me', actionPrimary: true,
    },
    {
      id: 'JOB-9022', time: 'Today, 5:30 PM', distance: '5.1 km away',
      status: 'Awaiting Owner Approval', statusBg: 'bg-[#fea619]/20 text-[#855300] border border-[#fea619]/30', statusDot: 'bg-[#fea619] animate-pulse',
      icon: 'yard', iconColor: 'text-[#855300]',
      title: 'Mosquito Pest Control', address: '4100 ••••••• Avenue, Unit •••',
      client: null, extra: null,
      metaLabel: 'Treatment Area', metaValue: 'Exterior Yard', metaSub: 'Eco Mist (Pet-safe)',
      phone: null, note: 'Owner notified at 1:15 PM',
      actionLabel: 'View Masked Details', actionIcon: 'visibility', actionPrimary: false,
    },
    {
      id: 'JOB-9023', time: 'Today, 7:15 PM', distance: '1.8 km away',
      status: 'Queued — Evening', statusBg: 'bg-[#f0ede9] text-[#707974] border border-[#ebe8e3]', statusDot: 'bg-[#707974]',
      icon: 'bug_report', iconColor: 'text-[#707974]',
      title: 'Cockroach Deep Treatment', address: '889 Northwood Plaza, Suite 210',
      client: 'Commercial Kitchen', extra: 'Night Dispatch Window',
      metaLabel: 'Method', metaValue: 'Gel + Thermal Seal', metaSub: null,
      phone: null, note: 'Contact manager upon back door arrival',
      actionLabel: 'Navigate', actionIcon: 'directions', actionPrimary: false,
    },
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

      <Sidebar
        onToast={showToast}
        onOpenProfile={() => setProfileModalOpen(true)}
        profile={profile}
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />
      <Toast message={toast.message} type={toast.type} />
      <ProfileModal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        showToast={showToast}
        profile={profile}
        onSaveProfile={setProfile}
      />

      <div className="w-full flex flex-col min-h-screen pl-0 lg:pl-64">
        {/* Header (Responsive left-0 lg:left-64) */}
        <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-[#fcf9f4]/95 backdrop-blur-md border-b border-[#ebe8e3] z-40 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] flex items-center justify-center cursor-pointer shadow-xs hover:bg-[#f6f3ee]"
              aria-label="Open sidebar navigation"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>
            {/* Division Pill */}
            <button
              type="button"
              onClick={() => showToast('EcoPest Solutions — Metropolitan Field Division #4')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-[#f6f3ee] border border-[#ebe8e3] transition-colors shadow-xs cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <img
                  src="/easyhicare-logo.png"
                  alt="Easy HiCare Logo"
                  className="h-8 w-auto max-w-[50px] object-contain rounded-lg p-0.5 bg-white border border-[#ebe8e3]"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs sm:text-sm font-bold text-[#003527]">EcoPest Solutions</span>
                  <span className="text-[10px] text-[#707974]">Metropolitan Division #4</span>
                </div>
              </div>
            </button>

            {/* Live Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#003527] text-white text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Fleet Active: 18 Techs Online</span>
            </div>

            <div className="hidden xl:flex items-center gap-3 pl-1 text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#ebe8e3] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-[#003527]">98.4% SLA</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="relative px-3.5 py-2 rounded-xl bg-[#003527] hover:bg-[#064e3b] text-white flex items-center gap-2 text-xs font-bold transition-colors shadow-xs cursor-pointer"
              title="Return to Main Map & Dashboard"
            >
              <span className="material-symbols-outlined text-[18px]">map</span>
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 pt-16 px-6 pb-10 bg-[#fcf9f4]">
          {/* Page title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b border-[#ebe8e3] mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] uppercase tracking-wider text-[#855300] font-bold bg-[#fea619]/20 px-2 py-0.5 rounded-full border border-[#fea619]/30">
                  Operational Command · Fleet Dispatch
                </span>
                <span className="w-1 h-1 rounded-full bg-[#fea619]" />
                <span className="text-[11px] text-[#707974] font-medium">Urban Unit Manifest</span>
              </div>
              <h1 className="text-2xl font-black text-[#003527] tracking-tight">Worker Fleet &amp; Rosters</h1>
              <p className="text-sm text-[#707974] mt-0.5">Live GPS telemetry, assigned job queue, and field technician performance.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => showToast('Refreshing telemetry from all 18 technician beacons...', 'success')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#003527] text-white text-xs font-bold hover:bg-[#064e3b] transition-all cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[17px]">sync</span>
                Refresh Fleet
              </button>
              <button
                type="button"
                onClick={() => showToast('Connecting to Central Dispatch frequency channel...', 'info')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] text-xs font-bold hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[17px]">radio</span>
                Dispatch Channel
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left: Worker profile panel */}
            <div className="xl:col-span-4 flex flex-col gap-4">
              {/* Worker card */}
              <div className="p-5 rounded-3xl bg-white border border-[#ebe8e3] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#003527] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                    ER
                  </div>
                  <div>
                    <div className="font-bold text-[#1c1c19] text-base">Elena Rostova</div>
                    <div className="text-[12px] text-[#707974] flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[#003527] text-[14px]">verified</span>
                      Lead Certified Technician (Bio-IV)
                    </div>
                  </div>
                </div>

                {/* Time filter */}
                <div className="flex items-center p-1 rounded-xl bg-[#fcf9f4] border border-[#ebe8e3] mb-4">
                  {['Day', 'Week', 'Month'].map(f => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => { setTimeFilter(f); showToast(`Viewing ${f}ly performance`); }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                        timeFilter === f
                          ? 'bg-[#003527] text-white shadow-xs'
                          : 'text-[#707974] hover:text-[#1c1c19] hover:bg-white'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: 'Success Rate', value: '100%', sub: 'Zero Defect Run', icon: 'check_circle', color: 'text-emerald-700' },
                    { label: 'Avg Rating', value: '★ 5.0', sub: 'Flawless Feedback', icon: 'star', color: 'text-[#855300]' },
                  ].map(s => (
                    <div key={s.label} className="p-3.5 rounded-2xl bg-[#fcf9f4] border border-[#ebe8e3]">
                      <div className="text-[10px] uppercase tracking-wider text-[#707974] font-bold mb-1">{s.label}</div>
                      <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                      <div className={`text-[11px] ${s.color} font-medium flex items-center gap-0.5 mt-0.5`}>
                        <span className="material-symbols-outlined text-[12px]">{s.icon}</span>
                        {s.sub}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress */}
                <div className="p-3.5 rounded-2xl bg-[#fcf9f4] border border-[#ebe8e3] mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#707974] font-bold">Today's Route Progress</span>
                    <span className="text-xs font-black text-[#003527]">3 / 6 Jobs</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#f0ede9] overflow-hidden">
                    <div className="h-full bg-[#003527] rounded-full w-1/2 transition-all duration-700" />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[11px] text-[#707974]">
                    <span>Est. Finish: 8:45 PM</span>
                    <span className="text-emerald-700 font-bold">On Target</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => showToast('Calling Elena Rostova (+91 98450 18239)...', 'success')}
                    className="flex-1 py-2.5 rounded-xl bg-[#003527] text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#064e3b] transition-all cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    Call
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Opening bio-certification profile for Elena Rostova', 'info')}
                    className="flex-1 py-2.5 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">badge</span>
                    Profile
                  </button>
                </div>
              </div>

              {/* Map telemetry mini card */}
              <div className="rounded-3xl border border-[#ebe8e3] bg-white shadow-xs overflow-hidden">
                <div className="relative h-40 bg-[#f0ede9]">
                  {/* SVG map simulation */}
                  <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'radial-gradient(circle, #bfc9c3 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
                  <svg className="absolute inset-0 w-full h-full opacity-40 text-[#707974]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-10,40 Q100,30 220,70 T450,60" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path d="M60,-10 Q80,100 160,200" fill="none" stroke="currentColor" strokeDasharray="5 5" strokeWidth="2" />
                    <path d="M300,140 Q310,120 390,160" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>

                  {/* Tech pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-12 h-12 rounded-full bg-[#003527]/20 animate-ping" />
                      <div className="w-9 h-9 rounded-full bg-[#003527] text-white flex items-center justify-center shadow-xl border-2 border-white">
                        <span className="material-symbols-outlined text-[18px]">navigation</span>
                      </div>
                    </div>
                  </div>

                  {/* Job pin */}
                  <div className="absolute top-[35%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-7 h-7 rounded-full bg-[#fea619] text-[#1c1c19] flex items-center justify-center shadow-md border-2 border-white font-bold text-xs">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                    </div>
                  </div>

                  {/* HUD overlay */}
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[10px] font-bold text-[#003527] flex items-center gap-1.5 border border-[#ebe8e3] shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live GPS Lock
                  </div>
                </div>
                <div className="px-4 py-3 flex items-center justify-between border-t border-[#ebe8e3]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#003527] text-[16px]">eco</span>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#707974] font-bold">Active Kit</div>
                      <div className="text-[12px] font-bold text-[#003527]">Bio-Safe Organic Pyrethrin</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-[#707974] font-bold">Battery</div>
                    <div className="text-[12px] font-black text-[#1c1c19]">88% · 164km</div>
                  </div>
                </div>
                <div className="px-4 pb-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => showToast('Zooming in on active route vector...')}
                    className="flex-1 py-2 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[15px]">add</span>Zoom In
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Recentering to Sector 4 Indiranagar hub...')}
                    className="flex-1 py-2 rounded-xl bg-[#003527] text-white text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#064e3b] transition-all cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[15px]">my_location</span>Recenter
                  </button>
                </div>
              </div>

              {/* Dispatch helper */}
              <div className="p-5 rounded-3xl bg-[#003527] text-white border border-[#064e3b] shadow-sm">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#fea619] font-bold mb-2">
                  <span className="material-symbols-outlined text-[15px]">contact_support</span>
                  Central Dispatch Desk
                </div>
                <div className="font-bold text-white text-sm mb-1">Need chemical resupply or route realignment?</div>
                <p className="text-[12px] text-[#c2ebdc]/80 mb-3">Marcus is monitoring Sector 7 frequencies. SLA under 60 seconds.</p>
                <button
                  type="button"
                  onClick={() => showToast('Frequency Channel 4 Open — Connected to Dispatch Desk', 'success')}
                  className="w-full py-2.5 rounded-xl bg-[#fea619] hover:bg-[#e09110] text-[#1c1c19] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[18px]">radio</span>
                  Open Frequency Channel
                </button>
              </div>
            </div>

            {/* Right: Job queue */}
            <div className="xl:col-span-8 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="font-black text-[#003527] text-base tracking-tight">Assigned Job Queue</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#003527]/10 text-[#003527] text-[11px] font-bold">3 Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => showToast('Queue sorted by distance from current technician GPS')}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] text-xs font-bold hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">near_me</span>
                    By Proximity
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Job queue refreshed from central dispatcher', 'success')}
                    className="w-9 h-9 rounded-xl bg-white border border-[#ebe8e3] flex items-center justify-center text-[#707974] hover:text-[#003527] hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[18px]">sync</span>
                  </button>
                </div>
              </div>

              {jobs.map((job, i) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onToast={showToast}
                  accent={i === 0 ? 'primary' : i === 1 ? 'secondary' : 'tertiary'}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

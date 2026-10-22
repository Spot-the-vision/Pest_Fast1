import React from 'react';
const easyHiCareLogo = '/easyhicare-logo.png';

export default function Sidebar({
  activeSection,
  onSelectSection,
  workerKycCount = 0,
  bookingsCount = 4,
  showToast,
  onOpenProfile,
  profile,
  mobileOpen = false,
  onClose
}) {
  const initials = profile?.name
    ? profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'MS';

  const handleNavClick = (sec) => {
    onSelectSection(sec);
    if (onClose) onClose();
  };

  return (
    <aside className={`fixed left-0 top-0 h-full w-64 lg:w-72 bg-[#003527] text-white z-50 flex flex-col border-r border-[#064e3b] shadow-2xl transition-transform duration-200 ease-in-out box-border overflow-x-hidden ${
      mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      {/* Brand Header with Easy HiCare Logo */}
      <div style={{ padding: '18px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1, overflow: 'hidden' }}>
          <img
            src={easyHiCareLogo}
            alt="Easy HiCare Logo"
            style={{
              height: 44,
              width: 'auto',
              maxWidth: 96,
              borderRadius: 8,
              objectFit: 'contain',
              background: '#FFFFFF',
              padding: '2px 6px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              flexShrink: 0
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Easy HiCare</span>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Pest Solutions &bull; Agency Portal</span>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer shrink-0"
            aria-label="Close sidebar"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      {/* Agency Identity Card */}
      <div className="mx-3 mt-3 p-3 rounded-2xl bg-[#064e3b]/80 border border-white/10 shadow-xs shrink-0 overflow-hidden">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#003527] border border-white/15 flex items-center justify-center text-[#fea619] shadow-xs font-bold text-xs shrink-0">
            EP
          </div>
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="font-bold text-white text-[13px] truncate">EcoPest Solutions</div>
            <div className="text-[11px] text-[#80bea6] truncate">Metro Hub #PF-8821</div>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
          <span className="text-[#c2ebdc] flex items-center gap-1 font-semibold truncate min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" /> Dispatch Live
          </span>
          <span className="bg-[#fea619] text-[#1c1c19] px-2 py-0.5 rounded-full font-bold shrink-0">VERIFIED</span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-3 flex flex-col gap-1 overflow-y-auto overflow-x-hidden min-w-0">
        <p className="text-[10px] uppercase tracking-widest text-[#80bea6] font-bold px-3 mb-1 mt-1 flex items-center gap-1.5 truncate">
          <span className="material-symbols-outlined text-[13px] text-[#fea619] shrink-0">speed</span>
          <span className="truncate">Operations Bar</span>
        </p>

        <button
          type="button"
          onClick={() => handleNavClick('all')}
          title="All Operations View"
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium text-sm transition-all text-left cursor-pointer min-w-0 box-border overflow-hidden ${
            activeSection === 'all'
              ? 'bg-[#064e3b] text-white font-bold shadow-xs border border-white/15'
              : 'text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className={`material-symbols-outlined text-[19px] shrink-0 ${activeSection === 'all' ? 'text-[#fea619]' : 'text-[#80bea6]'}`}>dashboard</span>
          <span className="truncate min-w-0 flex-1">All Operations View</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('stats')}
          title="Stats & Telemetry"
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium text-sm transition-all text-left cursor-pointer min-w-0 box-border overflow-hidden ${
            activeSection === 'stats'
              ? 'bg-[#064e3b] text-white font-bold shadow-xs border border-white/15'
              : 'text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className={`material-symbols-outlined text-[19px] shrink-0 ${activeSection === 'stats' ? 'text-[#fea619]' : 'text-[#80bea6]'}`}>query_stats</span>
          <span className="truncate min-w-0 flex-1">Stats &amp; Telemetry</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('bookings')}
          title="Operations Bar"
          className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl font-medium text-sm transition-all text-left cursor-pointer min-w-0 box-border overflow-hidden ${
            activeSection === 'bookings'
              ? 'bg-[#064e3b] text-white font-bold shadow-xs border border-white/15'
              : 'text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
            <span className={`material-symbols-outlined text-[19px] shrink-0 ${activeSection === 'bookings' ? 'text-[#fea619]' : 'text-[#80bea6]'}`}>approval_delegation</span>
            <span className="truncate min-w-0 flex-1">Operations Bar</span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#fea619] text-[#1c1c19] text-[11px] font-bold shrink-0 ml-auto whitespace-nowrap">{bookingsCount}</span>
        </button>

        <p className="text-[10px] uppercase tracking-widest text-[#80bea6] font-bold px-3 mb-1 mt-3 flex items-center gap-1.5 truncate">
          <span className="material-symbols-outlined text-[13px] text-[#fea619] shrink-0">tune</span>
          <span className="truncate">Management</span>
        </p>

        <button
          type="button"
          onClick={() => handleNavClick('kyc')}
          title="Worker KYC"
          className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl font-medium text-sm transition-all text-left cursor-pointer min-w-0 box-border overflow-hidden ${
            activeSection === 'kyc'
              ? 'bg-[#064e3b] text-white font-bold shadow-xs border border-white/15'
              : 'text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
            <span className={`material-symbols-outlined text-[19px] shrink-0 ${activeSection === 'kyc' ? 'text-[#fea619]' : 'text-[#80bea6]'}`}>how_to_reg</span>
            <span className="truncate min-w-0 flex-1">Worker KYC</span>
          </span>
          {workerKycCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#fea619] text-[#1c1c19] text-[11px] font-bold shrink-0 ml-auto whitespace-nowrap">
              {workerKycCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('clients')}
          title="Client Directory"
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium text-sm transition-all text-left cursor-pointer min-w-0 box-border overflow-hidden ${
            activeSection === 'clients'
              ? 'bg-[#064e3b] text-white font-bold shadow-xs border border-white/15'
              : 'text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className={`material-symbols-outlined text-[19px] shrink-0 ${activeSection === 'clients' ? 'text-[#fea619]' : 'text-[#80bea6]'}`}>business</span>
          <span className="truncate min-w-0 flex-1">Client Directory</span>
        </button>

        <p className="text-[10px] uppercase tracking-widest text-[#80bea6] font-bold px-3 mb-1 mt-3 flex items-center gap-1.5 truncate">
          <span className="material-symbols-outlined text-[13px] text-[#fea619] shrink-0">hub</span>
          <span className="truncate">System Core</span>
        </p>

        <button
          type="button"
          onClick={() => handleNavClick('analytics')}
          title="Analytics & Reports"
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium text-sm transition-all text-left cursor-pointer min-w-0 box-border overflow-hidden ${
            activeSection === 'analytics'
              ? 'bg-[#064e3b] text-white font-bold shadow-xs border border-white/15'
              : 'text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className={`material-symbols-outlined text-[19px] shrink-0 ${activeSection === 'analytics' ? 'text-[#fea619]' : 'text-[#80bea6]'}`}>bar_chart</span>
          <span className="truncate min-w-0 flex-1">Analytics &amp; Reports</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('settings')}
          title="Settings"
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium text-sm transition-all text-left cursor-pointer min-w-0 box-border overflow-hidden ${
            activeSection === 'settings'
              ? 'bg-[#064e3b] text-white font-bold shadow-xs border border-white/15'
              : 'text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span className={`material-symbols-outlined text-[19px] shrink-0 ${activeSection === 'settings' ? 'text-[#fea619]' : 'text-[#80bea6]'}`}>tune</span>
          <span className="truncate min-w-0 flex-1">Settings</span>
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

        {/* Profile Card */}
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

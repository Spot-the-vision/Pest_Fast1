const easyHiCareLogo = '/easyhicare-logo.png';
import React, { useState } from 'react';
import PlatformOverview from './pages/PlatformOverview';
import KycTab from './pages/KycTab';
import DisputesTab from './pages/DisputesTab';
import FinancialsTab from './pages/FinancialsTab';
import {
  SystemConfigModal,
  AdminProfileModal,
  HubsModal,
  PiiVaultModal,
  StreamsModal,
  PostGisModal,
  AgencyJobsModal
} from './components/modals/AdminModals';
import './index.css';

// ─── Toast ──────────────────────────────────────────────────────────────────
function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl bg-[#003527] text-white font-semibold text-sm min-w-[320px] border border-[#064e3b] animate-in fade-in slide-in-from-bottom-4 duration-200">
      <span className="material-symbols-outlined text-[#fea619] text-[20px]">check_circle</span>
      <span className="flex-1">{message}</span>
      <button type="button" onClick={onClose} className="text-white/70 hover:text-white transition-colors ml-2 cursor-pointer">
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
}

// ─── Main Admin Application ──────────────────────────────────────────────────
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState('telemetry');
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedDossier, setSelectedDossier] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'settings' | 'profile' | 'agencies' | 'vault' | 'socket' | 'postgis'
  const [selectedAgencyForJobs, setSelectedAgencyForJobs] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [pendingAgencies, setPendingAgencies] = useState([
    { id: 'AGY-104', name: 'Apex Pest Bangalore', owner: 'Ramesh Naidu', license: 'CIB-KA-2024-419', gstin: '29AABCU9603R1ZM', status: 'Pending Review', city: 'Bangalore' },
    { id: 'AGY-105', name: 'CleanShield NCR', owner: 'Deepak Sharma', license: 'CIB-HR-2023-882', gstin: '06AABCC1234F1Z8', status: 'Pending Review', city: 'Gurgaon' },
  ]);

  const [approvedAgencies, setApprovedAgencies] = useState([
    {
      id: 'PF-HUB-8821',
      name: 'EcoPest Solutions',
      city: 'Bangalore (Whitefield & Indiranagar)',
      owner: 'Vikramaditya Roy',
      license: 'CIB-KA-2021-9921',
      gstin: '29AAECE8821M1Z5',
      techs: 18,
      jobsCompleted: 184,
      sla: '98.4%',
      approvedDate: '12 Jan 2024',
      status: 'Approved & Active',
    },
    {
      id: 'PF-HUB-4402',
      name: 'Apex Pest Bangalore',
      city: 'Bangalore (Bellandur & ORR)',
      owner: 'Ramesh Naidu',
      license: 'CIB-KA-2022-7731',
      gstin: '29AABCU9603R1ZM',
      techs: 12,
      jobsCompleted: 92,
      sla: '97.1%',
      approvedDate: '28 Mar 2024',
      status: 'Approved & Active',
    },
    {
      id: 'PF-HUB-1109',
      name: 'CleanShield NCR',
      city: 'Gurgaon (Cyber City & DLF)',
      owner: 'Deepak Sharma',
      license: 'CIB-HR-2023-5510',
      gstin: '06AABCC1234F1Z8',
      techs: 9,
      jobsCompleted: 64,
      sla: '99.0%',
      approvedDate: '15 Jul 2024',
      status: 'Approved & Active',
    },
  ]);

  const [disputes, setDisputes] = useState([
    {
      id: 'DSP-882',
      client: 'Rohit Verma',
      customerType: 'Old Customer',
      customerDetails: 'Returning Client · 4th Service Contract (High LTV)',
      agency: 'EcoPest Solutions',
      issue: 'Termite reappeared in kitchen baseboards after 2 weeks',
      claim: 'Free Re-treatment',
      date: '24 Oct 2024'
    },
    {
      id: 'DSP-884',
      client: 'Meera Iyer',
      customerType: 'New Customer',
      customerDetails: 'First-time Customer · Onboarding Booking #BK-9104',
      agency: 'Apex Pest Bangalore',
      issue: 'Technician arrived 40 mins late due to rain',
      claim: '₹300 Courtesy Refund',
      date: '23 Oct 2024'
    },
    {
      id: 'DSP-886',
      client: 'Kavita Sundaram',
      customerType: 'Old Customer',
      customerDetails: 'Returning Client · Annual AMC Subscriber',
      agency: 'CleanShield NCR',
      issue: 'Cockroach odor spray requested odorless bio-treatment',
      claim: 'Odorless Bio Re-spray',
      date: '22 Oct 2024'
    },
    {
      id: 'DSP-889',
      client: 'Arjun Nambiar',
      customerType: 'New Customer',
      customerDetails: 'First-time Customer · App Promo Discount User',
      agency: 'EcoPest Solutions',
      issue: 'Balcony netting anchor came loose after storm',
      claim: 'Free Anchor Re-tightening',
      date: '21 Oct 2024'
    }
  ]);

  const showToast = (msg) => { setToastMessage(msg); setTimeout(() => setToastMessage(null), 3500); };

  const navItems = [
    { id: 'telemetry', label: 'System Core', icon: 'analytics' },
    { id: 'kyc', label: `Agency KYC (${pendingAgencies.length})`, icon: 'how_to_reg', count: pendingAgencies.length },
    { id: 'disputes', label: `Disputes (${disputes.length})`, icon: 'gavel', count: disputes.length },
    { id: 'financials', label: 'Settlements & GMV', icon: 'payments' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fcf9f4] p-4">
        <form onSubmit={e => { e.preventDefault(); setIsAuthenticated(true); }} className="bg-[#ffffff] border border-[#ebe8e3] p-8 rounded-3xl shadow-xl w-full max-w-sm flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <img
              src={easyHiCareLogo}
              alt="Easy HiCare Logo"
              className="h-12 w-auto max-w-[96px] rounded-xl bg-white p-1.5 object-contain border border-[#ebe8e3] shadow-md"
            />
            <div>
              <h2 className="font-bold text-base text-[#003527]">Super-Admin Console</h2>
              <p className="text-[11px] text-[#707974]">Kernel &amp; Marketplace Control</p>
            </div>
          </div>
          <div className="bg-[#fbf7ee] p-3 rounded-xl text-[12px] text-[#707974] border border-[#ebe8e3] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#003527]">lock</span>
            Developer &amp; Super-Admin Root Access
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-[#707974]">Root Admin Email</label>
            <input defaultValue="admin@pestfast.com" type="email" className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#ebe8e3] bg-[#fcf9f4] focus:outline-none focus:ring-2 focus:ring-[#003527]/30" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-[#707974]">Password</label>
            <input defaultValue="••••••••" type="password" className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#ebe8e3] bg-[#fcf9f4] focus:outline-none focus:ring-2 focus:ring-[#003527]/30" />
          </div>
          <button type="submit" className="w-full py-3 bg-[#003527] text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#064e3b] transition-all shadow-xs cursor-pointer">
            Access Core Console
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-[#fcf9f4] text-[#1c1c19] min-h-screen flex text-sm selection:bg-[#fea619]/30">
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* ── Modals for Management & Core ── */}
      <SystemConfigModal open={activeModal === 'settings'} onClose={() => setActiveModal(null)} showToast={showToast} />
      <AdminProfileModal open={activeModal === 'profile'} onClose={() => setActiveModal(null)} showToast={showToast} onLogout={() => setIsAuthenticated(false)} />
      <HubsModal open={activeModal === 'agencies'} onClose={() => setActiveModal(null)} showToast={showToast} />
      <PiiVaultModal open={activeModal === 'vault'} onClose={() => setActiveModal(null)} showToast={showToast} />
      <StreamsModal open={activeModal === 'socket'} onClose={() => setActiveModal(null)} showToast={showToast} />
      <PostGisModal open={activeModal === 'postgis'} onClose={() => setActiveModal(null)} showToast={showToast} />
      <AgencyJobsModal agencyName={selectedAgencyForJobs} onClose={() => setSelectedAgencyForJobs(null)} showToast={showToast} />

      {/* ── Mobile Sidebar Backdrop ── */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ── Left Side Menubar (Responsive Slide Drawer on Mobile/Tablet) ── */}
      <aside className={`fixed left-0 top-0 h-full w-64 lg:w-72 bg-[#003527] text-white z-50 flex flex-col border-r border-[#064e3b] shadow-2xl transition-transform duration-200 ease-in-out box-border overflow-x-hidden ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Brand Header with Easy HiCare Logo */}
        <div style={{ padding: '18px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15 }}>Easy HiCare</span>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>Pest Solutions &bull; Admin Console</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
            aria-label="Close sidebar"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Menu Bar Navigation Items */}
        <nav className="flex-1 px-3 py-3 flex flex-col gap-1.5 overflow-y-auto overflow-x-hidden min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-[#80bea6] font-bold px-3 mb-1 flex items-center gap-1.5 truncate">
            <span className="material-symbols-outlined text-[13px] text-[#fea619] shrink-0">dashboard</span>
            <span className="truncate">Operations Menu</span>
          </p>
          {navItems.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveTab(item.id);
                setMobileSidebarOpen(false);
              }}
              title={item.label}
              className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl font-medium text-[13px] transition-all text-left cursor-pointer min-w-0 box-border overflow-hidden ${
                activeTab === item.id
                  ? 'bg-[#064e3b] text-white shadow-xs font-bold border border-white/15'
                  : 'text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
                <span className={`material-symbols-outlined text-[19px] shrink-0 ${activeTab === item.id ? 'text-[#fea619]' : 'text-[#80bea6]'}`}>{item.icon}</span>
                <span className="truncate leading-tight min-w-0 flex-1">{item.label}</span>
              </div>
              {item.count !== undefined && item.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ml-auto whitespace-nowrap ${activeTab === item.id ? 'bg-[#fea619] text-[#1c1c19]' : 'bg-white/20 text-white'}`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom of Sidebar: 24x7 Helpline + Root Admin Profile */}
        <div className="p-3 border-t border-white/10 flex flex-col gap-2.5 shrink-0 bg-[#00291e]">
          <button
            type="button"
            onClick={() => showToast('📞 Operations Helpline: Connecting to Regional Dispatch Command...')}
            className="w-full py-2.5 px-3 rounded-xl bg-[#fea619] hover:bg-[#e09110] text-[#1c1c19] font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            <span>24x7 Operations Helpline</span>
          </button>

          {/* Profile Card */}
          <button
            type="button"
            onClick={() => setActiveModal('profile')}
            className="w-full p-2.5 rounded-2xl bg-[#064e3b]/80 hover:bg-[#064e3b] border border-white/10 transition-all text-left cursor-pointer shadow-xs group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#003527] border border-white/15 flex items-center justify-center text-[#fea619] shadow-xs font-bold text-xs">
                RA
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-xs truncate group-hover:text-[#fea619] transition-colors">Root Administrator</div>
                <div className="text-[10px] text-[#80bea6] truncate">admin@pestfast.com</div>
              </div>
              <span className="material-symbols-outlined text-white/50 text-[16px]">chevron_right</span>
            </div>
            <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px]">
              <span className="text-[#c2ebdc] flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Level-3 Root
              </span>
              <span className="bg-[#fea619] text-[#1c1c19] px-1.5 py-0.2 rounded font-black">ROOT</span>
            </div>
          </button>
        </div>
      </aside>

      {/* ── Main Application Content (Responsive pl-0 lg:pl-72) ── */}
      <div className="w-full pl-0 lg:pl-72 flex flex-col min-h-screen">
        {/* ── Top Header with Management & Core ── */}
        <header className="bg-[#fcf9f4]/95 backdrop-blur-md border-b border-[#ebe8e3] sticky top-0 z-40 px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Active section title with mobile menu toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] flex items-center justify-center cursor-pointer shadow-xs hover:bg-[#f6f3ee]"
                aria-label="Open sidebar navigation"
              >
                <span className="material-symbols-outlined text-[20px]">menu</span>
              </button>
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
                border: '1.5px solid #ebe8e3',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-black text-[#003527]">Easy HiCare Pest Solutions</span>
              <span className="text-[11px] text-[#707974] font-semibold">Central Master Administration &bull; Kernel v4.2</span>
            </div>
          </div>

          {/* Management & Core Controls */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[#ffffff] p-1 rounded-2xl border border-[#ebe8e3] shadow-xs">
            <div className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-[#003527] bg-[#f0ede9] rounded-xl border border-[#ebe8e3]">
              <span className="material-symbols-outlined text-[15px] text-[#fea619]">admin_panel_settings</span>
              <span className="text-[11px] uppercase tracking-wider">Management &amp; Core:</span>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal('agencies')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeModal === 'agencies'
                  ? 'bg-[#003527] text-white shadow-xs'
                  : 'text-[#404944] hover:text-[#003527] hover:bg-[#f6f3ee]'
              }`}
              title="Partner Agency Hubs"
            >
              <span className={`material-symbols-outlined text-[17px] ${activeModal === 'agencies' ? 'text-[#fea619]' : 'text-[#003527]'}`}>apartment</span>
              <span>Hubs</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModal('vault')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeModal === 'vault'
                  ? 'bg-[#003527] text-white shadow-xs'
                  : 'text-[#404944] hover:text-[#003527] hover:bg-[#f6f3ee]'
              }`}
              title="Cryptographic PII Vault"
            >
              <span className={`material-symbols-outlined text-[17px] ${activeModal === 'vault' ? 'text-[#fea619]' : 'text-[#003527]'}`}>security</span>
              <span>PII Vault</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModal('socket')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeModal === 'socket'
                  ? 'bg-[#003527] text-white shadow-xs'
                  : 'text-[#404944] hover:text-[#003527] hover:bg-[#f6f3ee]'
              }`}
              title="Socket.IO Live Streams"
            >
              <span className={`material-symbols-outlined text-[17px] ${activeModal === 'socket' ? 'text-[#fea619]' : 'text-[#855300]'}`}>stream</span>
              <span>Streams</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModal('postgis')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeModal === 'postgis'
                  ? 'bg-[#003527] text-white shadow-xs'
                  : 'text-[#404944] hover:text-[#003527] hover:bg-[#f6f3ee]'
              }`}
              title="PostGIS Spatial Engine"
            >
              <span className={`material-symbols-outlined text-[17px] ${activeModal === 'postgis' ? 'text-[#fea619]' : 'text-[#003527]'}`}>dataset</span>
              <span>PostGIS</span>
            </button>

            <a
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#003527] bg-[#fbf7ee] hover:bg-[#f0ede9] border border-[#ebe8e3] transition-all shadow-2xs"
              title="Return to Universal Home"
            >
              <span className="material-symbols-outlined text-[17px] text-[#003527]">home</span>
              <span>Universal Home</span>
            </a>

            <button
              type="button"
              onClick={() => setActiveModal('settings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                activeModal === 'settings'
                  ? 'bg-[#003527] text-white shadow-xs'
                  : 'text-[#003527] bg-[#fbf7ee] hover:bg-[#f0ede9] border border-[#ebe8e3]'
              }`}
              title="System Configuration (Live Kernel)"
            >
              <span className={`material-symbols-outlined text-[17px] ${activeModal === 'settings' ? 'text-[#fea619]' : 'text-[#003527]'}`}>settings_input_component</span>
              <span>System Configuration</span>
            </button>
          </div>

          {/* Right Status Pill & Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#003527] text-white text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>System Core · Production Live</span>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal('settings')}
              className="lg:hidden w-10 h-10 rounded-xl bg-white border border-[#ebe8e3] flex items-center justify-center text-[#003527] shadow-xs cursor-pointer"
              title="System Configuration"
            >
              <span className="material-symbols-outlined text-[20px]">settings_input_component</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-xl font-bold transition-colors border border-red-200 cursor-pointer shadow-xs"
            >
              Lock
            </button>
          </div>
        </header>

        {/* ── Main Content Area ── */}
        <main className="flex-1 bg-[#fcf9f4]">
          {activeTab === 'telemetry' && <PlatformOverview showToast={showToast} openSettings={() => setActiveModal('settings')} />}
          {activeTab === 'kyc' && (
            <KycTab
              pendingAgencies={pendingAgencies}
              setPendingAgencies={setPendingAgencies}
              approvedAgencies={approvedAgencies}
              setApprovedAgencies={setApprovedAgencies}
              showToast={showToast}
              selectedDossier={selectedDossier}
              setSelectedDossier={setSelectedDossier}
              onSelectAgency={setSelectedAgencyForJobs}
            />
          )}
          {activeTab === 'disputes' && (
            <DisputesTab
              disputes={disputes}
              showToast={showToast}
              onSelectAgency={setSelectedAgencyForJobs}
            />
          )}
          {activeTab === 'financials' && <FinancialsTab showToast={showToast} />}
        </main>
      </div>
    </div>
  );
}
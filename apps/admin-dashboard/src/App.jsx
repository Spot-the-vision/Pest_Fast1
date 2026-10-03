import React, { useState } from 'react';
import PlatformOverview from './pages/PlatformOverview';
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

// ─── System Configuration Modal (Opens like other functions in Management & Core) ──
function SystemConfigModal({ open, onClose, showToast }) {
  const [vals, setVals] = useState({
    geoLock: true,
    autoDispatch: true,
    webhooks: true,
    fraudDetect: true,
    maintenanceMode: false,
    betaFeatures: false
  });

  if (!open) return null;

  const toggle = (key) => {
    setVals(v => ({ ...v, [key]: !v[key] }));
    showToast(`${key.replace(/([A-Z])/g, ' $1')} ${!vals[key] ? 'enabled' : 'disabled'}`);
  };

  const Toggle = ({ label, sub, k }) => (
    <div className="flex items-center justify-between py-3 border-b border-[#ebe8e3] last:border-0">
      <div>
        <div className="font-bold text-[#1c1c19] text-xs sm:text-sm">{label}</div>
        {sub && <div className="text-[11px] text-[#707974] mt-0.5">{sub}</div>}
      </div>
      <button type="button" onClick={() => toggle(k)} className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${vals[k] ? 'bg-[#003527]' : 'bg-[#e5e2dd]'}`}>
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${vals[k] ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-xl w-full p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#003527] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">settings_input_component</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#003527] text-base">System Configuration</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#fea619]/20 text-[#855300] font-bold text-[10px] border border-[#fea619]/30">Live Kernel</span>
              </div>
              <p className="text-[12px] text-[#707974]">Platform Controls, Geo-Fencing, and API Routing</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl border border-[#ebe8e3] bg-[#fcf9f4] shadow-xs">
          <h4 className="font-bold text-[#003527] text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fea619] text-[16px]">tune</span>
            Platform Engine Controls
          </h4>
          <Toggle label="Geo-Lock Enforcement" sub="Technicians must be within 500m of job site to check-in" k="geoLock" />
          <Toggle label="Auto-Dispatch Engine" sub="AI nearest-worker proximity route allocation" k="autoDispatch" />
          <Toggle label="Webhook Notifications" sub="Real-time push events to connected agency hubs" k="webhooks" />
          <Toggle label="Fraud Detection Layer" sub="Flag suspicious concurrent booking patterns" k="fraudDetect" />
          <Toggle label="Maintenance Mode" sub="Block customer bookings during kernel upgrades" k="maintenanceMode" />
          <Toggle label="Beta Features (Staging)" sub="Enable experimental Voronoi mesh routing" k="betaFeatures" />
        </div>

        <div className="p-4 rounded-2xl border border-[#ebe8e3] bg-[#ffffff] shadow-xs">
          <h4 className="font-bold text-[#003527] text-xs uppercase tracking-wider mb-2">API Runtime Environment</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              ['API Version', 'v4.2-live'],
              ['Cluster Node', 'asia-south1-prod'],
              ['DB Pool Size', '50 connections'],
              ['Cache TTL', '300s (Redis BullMQ)'],
            ].map(([k, v]) => (
              <div key={k} className="p-2.5 rounded-xl bg-[#fbf7ee] border border-[#ebe8e3] flex flex-col justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#707974] font-semibold">{k}</span>
                <span className="font-mono font-bold text-[#003527] text-xs mt-0.5">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              showToast('✅ System configuration changes saved and broadcasted to all nodes');
              onClose();
            }}
            className="flex-1 py-3 rounded-xl bg-[#003527] text-white font-bold text-xs sm:text-sm hover:bg-[#064e3b] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>Save Settings
          </button>
          <button
            type="button"
            onClick={() => {
              showToast('🧹 Redis Cache flushed — 2,840 keys cleared & re-indexed');
            }}
            className="flex-1 py-3 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] font-bold text-xs sm:text-sm hover:bg-[#f6f3ee] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">cleaning_services</span>Flush Cache
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Profile Modal ──────────────────────────────────────────────────────
function AdminProfileModal({ open, onClose, showToast, onLogout }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#003527] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
            </div>
            <div>
              <h3 className="font-bold text-[#003527] text-base">Root Administrator</h3>
              <p className="text-[12px] text-[#707974]">Kernel Security Profile</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col items-center gap-3 py-4 bg-[#fcf9f4] rounded-2xl border border-[#ebe8e3] p-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#003527] text-[#fea619] flex items-center justify-center text-xl font-black shadow-md border-2 border-white/20">
            RA
          </div>
          <div>
            <div className="font-bold text-[#003527] text-base">Root Administrator</div>
            <div className="text-xs text-[#707974] font-mono">admin@pestfast.com</div>
            <div className="flex items-center justify-center gap-1.5 mt-2 bg-white px-3 py-1 rounded-full border border-[#ebe8e3] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] text-[#003527] font-bold">Level-3 Global Root Kernel</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-[#ebe8e3] bg-white shadow-xs space-y-2 text-xs">
          {[
            ['Role Tier', 'Super Administrator'],
            ['2FA Authentication', 'Active (TOTP Hardware Key)'],
            ['Last Session Refresh', 'Today, 8:14 AM (Bangalore)'],
            ['IP Access Whitelist', '192.168.1.0/24 (Secured)'],
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
            onClick={() => {
              showToast('Security audit log exported: audit_root_admin.json');
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] font-bold text-xs hover:bg-[#f6f3ee] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">history</span>Download Security Audit Log
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="w-full py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>Lock Terminal &amp; Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Partner Agency Hubs Modal ────────────────────────────────────────────────
function HubsModal({ open, onClose, showToast }) {
  const [selectedHub, setSelectedHub] = useState(null);
  const [showKey, setShowKey] = useState(false);
  const [search, setSearch] = useState('');

  if (!open) return null;

  const hubs = [
    {
      id: 'PF-HUB-8821',
      name: 'EcoPest Solutions',
      city: 'Bangalore (Whitefield & Indiranagar)',
      techs: 18,
      license: 'CIB-KA-9921',
      sla: '98.4%',
      status: 'Active · Online',
      apiKey: 'pf_live_sk_8821_a9f82d1c7e90',
      webhookSec: 'whsec_8821_9df3e4810a44',
      certExpiry: '2027-04-12 (mTLS Valid)',
      latency: '14ms'
    },
    {
      id: 'PF-HUB-4402',
      name: 'Apex Pest Solutions',
      city: 'Bangalore (Bellandur & ORR)',
      techs: 12,
      license: 'CIB-KA-7731',
      sla: '97.1%',
      status: 'Active · Online',
      apiKey: 'pf_live_sk_4402_b7c29e41d882',
      webhookSec: 'whsec_4402_1ca84e92b312',
      certExpiry: '2026-11-20 (mTLS Valid)',
      latency: '18ms'
    },
    {
      id: 'PF-HUB-1109',
      name: 'CleanShield Pro',
      city: 'Bangalore (Koramangala & HSR)',
      techs: 9,
      license: 'CIB-KA-5510',
      sla: '99.0%',
      status: 'Active · Online',
      apiKey: 'pf_live_sk_1109_c4e88a12d901',
      webhookSec: 'whsec_1109_7ea91c44e902',
      certExpiry: '2027-01-15 (mTLS Valid)',
      latency: '12ms'
    }
  ];

  const filteredHubs = hubs.filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.city.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-2xl w-full p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#003527] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">apartment</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#003527] text-base">Partner Agency Hubs</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">3 Certified Hubs</span>
              </div>
              <p className="text-[12px] text-[#707974]">Commercial Dispatch Centers &amp; Franchise Infrastructure Nodes</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#707974]">search</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search agency hub by name or territory..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#ebe8e3] bg-[#fcf9f4] text-xs focus:outline-none focus:ring-2 focus:ring-[#003527]/30"
          />
        </div>

        {/* Hub List */}
        <div className="flex flex-col gap-3">
          {filteredHubs.map(hub => (
            <div key={hub.id} className="p-4 rounded-2xl border border-[#ebe8e3] bg-[#fcf9f4] hover:border-[#003527]/30 transition-all flex flex-col gap-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#003527] text-[#fea619] font-black text-xs flex items-center justify-center shadow-xs">
                    {hub.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#1c1c19] text-sm">{hub.name}</span>
                      <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-[#ebe8e3] text-[#003527]">{hub.id}</span>
                    </div>
                    <div className="text-[11px] text-[#707974]">{hub.city}</div>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {hub.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-white p-2.5 rounded-xl border border-[#ebe8e3] text-center text-xs">
                <div>
                  <div className="text-[10px] uppercase text-[#707974] font-semibold">Active Fleet</div>
                  <div className="font-bold text-[#003527] mt-0.5">{hub.techs} Techs</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#707974] font-semibold">SLA Compliance</div>
                  <div className="font-bold text-[#003527] mt-0.5">{hub.sla}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-[#707974] font-semibold">Node Ping</div>
                  <div className="font-bold text-emerald-700 mt-0.5">{hub.latency}</div>
                </div>
              </div>

              {selectedHub?.id === hub.id && (
                <div className="p-3 bg-white rounded-xl border border-[#ebe8e3] space-y-2 text-xs animate-in fade-in duration-150">
                  <div className="flex justify-between items-center py-1 border-b border-[#ebe8e3]">
                    <span className="text-[#707974]">API Secret:</span>
                    <span className="font-mono text-[11px] font-bold text-[#1c1c19]">
                      {showKey ? hub.apiKey : 'pf_live_sk_••••••••••••••••'}
                    </span>
                    <button type="button" onClick={() => setShowKey(!showKey)} className="text-[#003527] text-[11px] font-bold hover:underline cursor-pointer">
                      {showKey ? 'Hide' : 'Reveal'}
                    </button>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-[#ebe8e3]">
                    <span className="text-[#707974]">mTLS Certificate:</span>
                    <span className="font-mono text-[11px] text-[#003527] font-semibold">{hub.certExpiry}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#707974]">CIB Permit:</span>
                    <span className="font-bold text-[#1c1c19]">{hub.license}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedHub(selectedHub?.id === hub.id ? null : hub)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#ebe8e3] hover:bg-[#f6f3ee] text-[#003527] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[15px]">key</span>
                  {selectedHub?.id === hub.id ? 'Hide Credentials' : 'View Credentials'}
                </button>
                <button
                  type="button"
                  onClick={() => showToast(`📡 Ping sent to ${hub.name}: Node responded in ${hub.latency}`)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#ebe8e3] hover:bg-[#f6f3ee] text-[#003527] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[15px]">sensors</span>
                  Ping Node
                </button>
                <button
                  type="button"
                  onClick={() => showToast(`🔍 Dispatch telemetry synced for ${hub.name}`)}
                  className="px-3 py-1.5 rounded-lg bg-[#003527] hover:bg-[#064e3b] text-white text-xs font-bold transition-all flex items-center gap-1 ml-auto cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  Health Check
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex gap-2 pt-2 border-t border-[#ebe8e3]">
          <button
            type="button"
            onClick={() => showToast('📡 Broadcast Ping Sent: 3/3 Regional Hubs acknowledged within 16ms')}
            className="flex-1 py-2.5 rounded-xl bg-[#003527] text-white font-bold text-xs hover:bg-[#064e3b] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">podcasts</span>Broadcast Hub Ping
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] font-bold text-xs hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Cryptographic PII Vault Modal ────────────────────────────────────────────
function PiiVaultModal({ open, onClose, showToast }) {
  const [decrypted, setDecrypted] = useState(false);

  if (!open) return null;

  const records = [
    {
      id: 'REC-9021',
      person: 'Elena Rostova',
      role: 'Lead Field Technician',
      aadhaarMasked: '•••• •••• 8841',
      aadhaarPlain: '5829 4819 8841',
      phoneMasked: '+91 98••• ••239',
      phonePlain: '+91 98450 18239',
      reason: 'Job Site Dispatch #JOB-9021',
      releasedAt: '14:20 IST'
    },
    {
      id: 'REC-4402',
      person: 'Rajesh Kumar',
      role: 'Commercial Lead Specialist',
      aadhaarMasked: '•••• •••• 1204',
      aadhaarPlain: '7412 9931 1204',
      phoneMasked: '+91 99••• ••811',
      phonePlain: '+91 99801 23811',
      reason: 'Biocide Chemical Requisition',
      releasedAt: '12:05 IST'
    },
    {
      id: 'REC-8812',
      person: 'David K. Chen',
      role: 'Residential Customer',
      aadhaarMasked: '•••• •••• 9920',
      aadhaarPlain: '9120 3341 9920',
      phoneMasked: '+91 98••• ••102',
      phonePlain: '+91 98450 11102',
      reason: 'Emergency Keybox Access Code',
      releasedAt: '11:42 IST'
    }
  ];

  const handleExport = () => {
    const data = JSON.stringify({
      vault: 'Cryptographic PII Audit Vault',
      kmsKeyId: 'arn:aws:kms:ap-south-1:71829381:key/pf-vault-master',
      encryption: 'AES-256-GCM',
      timestamp: new Date().toISOString(),
      auditOfficer: 'admin@pestfast.com (Level-3 Root)',
      records: records.map(r => ({ ...r, aadhaarPlain: decrypted ? r.aadhaarPlain : '[MASKED_IN_EXPORT]' }))
    }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pii_audit_vault_${Date.now()}.json`;
    a.click();
    showToast('📥 PII Security Audit Log downloaded securely');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-2xl w-full p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#003527] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">security</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#003527] text-base">Cryptographic PII Vault</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#003527]/10 text-[#003527] font-bold text-[10px] border border-[#003527]/20">AES-256 GCM</span>
              </div>
              <p className="text-[12px] text-[#707974]">Zero-Leak Field Identity Protection &amp; Masked Telemetry Ledger</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Security Metrics Banner */}
        <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#fcf9f4] border border-[#ebe8e3] text-center text-xs">
          <div>
            <div className="text-[10px] uppercase text-[#707974] font-bold">KMS HSM Key</div>
            <div className="font-bold text-[#003527] mt-0.5 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online (FIPS 140-3)
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-[#707974] font-bold">Releases Today</div>
            <div className="font-black text-[#003527] mt-0.5">42 Authorized</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-[#707974] font-bold">Unreleased Leaks</div>
            <div className="font-black text-emerald-700 mt-0.5">0 Breaches (100%)</div>
          </div>
        </div>

        {/* Decryption Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#fbf7ee] border border-[#ebe8e3]">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#855300] text-[20px]">
              {decrypted ? 'lock_open' : 'lock'}
            </span>
            <div>
              <div className="text-xs font-bold text-[#1c1c19]">
                {decrypted ? 'Live Decrypted View (Root Authorized)' : 'Masked Production View'}
              </div>
              <div className="text-[10px] text-[#707974]">
                {decrypted ? 'All access logged to audit trail' : 'Full Aadhaar & Phone hashes masked'}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setDecrypted(!decrypted);
              showToast(!decrypted ? '🔓 Audited decryption unlocked for Level-3 Root Admin' : '🔒 PII re-masked with AES-256');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
              decrypted ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-[#003527] hover:bg-[#064e3b] text-white'
            }`}
          >
            {decrypted ? 'Re-Mask Records' : 'Authorize Decrypt'}
          </button>
        </div>

        {/* Records Table */}
        <div className="border border-[#ebe8e3] rounded-2xl overflow-hidden bg-white shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fcf9f4] border-b border-[#ebe8e3] text-[#707974] text-[10px] uppercase font-bold">
              <tr>
                <th className="py-2.5 px-3">Subject &amp; Role</th>
                <th className="py-2.5 px-3">Identity Hash</th>
                <th className="py-2.5 px-3">Phone Token</th>
                <th className="py-2.5 px-3">Audit Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ebe8e3]">
              {records.map(r => (
                <tr key={r.id} className="hover:bg-[#fcf9f4] transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-[#1c1c19]">{r.person}</div>
                    <div className="text-[10px] text-[#707974]">{r.role}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`font-mono text-[11px] font-bold ${decrypted ? 'text-[#003527] bg-[#fbf7ee] px-2 py-0.5 rounded border border-[#ebe8e3]' : 'text-[#707974]'}`}>
                      {decrypted ? r.aadhaarPlain : r.aadhaarMasked}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`font-mono text-[11px] font-bold ${decrypted ? 'text-[#003527]' : 'text-[#707974]'}`}>
                      {decrypted ? r.phonePlain : r.phoneMasked}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-[11px] text-[#1c1c19]">{r.reason}</div>
                    <div className="text-[9px] text-[#707974]">{r.releasedAt}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex gap-2 pt-2 border-t border-[#ebe8e3]">
          <button
            type="button"
            onClick={handleExport}
            className="flex-1 py-2.5 rounded-xl bg-[#003527] text-white font-bold text-xs hover:bg-[#064e3b] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>Download Compliance Audit Dossier
          </button>
          <button
            type="button"
            onClick={() => showToast('🔄 Master KMS Key rotated: New 256-bit entropy generated')}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] font-bold text-xs hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs"
          >
            Rotate KMS Key
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] font-bold text-xs hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Socket.IO Live Streams Modal ─────────────────────────────────────────────
function StreamsModal({ open, onClose, showToast }) {
  const [throttle, setThrottle] = useState('5s');
  const [isPaused, setIsPaused] = useState(false);
  const [logs, setLogs] = useState([
    { id: 1, time: '18:41:02', channel: 'fleet:telemetry', msg: 'ACK from Tech ER-9021 (lat: 12.9716, lng: 77.5946, ping: 28ms)' },
    { id: 2, time: '18:41:04', channel: 'bookings:dispatch', msg: 'PUSH to Agency #PF-8821: JOB-9021 accepted' },
    { id: 3, time: '18:41:06', channel: 'heartbeat:cluster', msg: 'Node asia-south1-prod OK. 1,420 connected sockets' },
    { id: 4, time: '18:41:08', channel: 'fleet:telemetry', msg: 'ACK from Tech RK-4402 (lat: 12.9279, lng: 77.6271, ping: 34ms)' },
    { id: 5, time: '18:41:10', channel: 'voronoi:recluster', msg: 'PostGIS ST_DWithin mesh refreshed for Bellandur cluster' },
  ]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-2xl w-full p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#003527] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">stream</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#003527] text-base">Socket.IO Live Streams Gateway</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">1,420 Streams Active</span>
              </div>
              <p className="text-[12px] text-[#707974]">Bidirectional WebSockets Telemetry Mesh &amp; Real-Time Heartbeats</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2.5 p-3 rounded-2xl bg-[#fcf9f4] border border-[#ebe8e3] text-center text-xs">
          <div>
            <div className="text-[10px] uppercase text-[#707974] font-bold">Total Pipes</div>
            <div className="font-black text-[#003527] mt-0.5">1,420</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-[#707974] font-bold">RTT Latency</div>
            <div className="font-black text-emerald-700 mt-0.5">32ms avg</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-[#707974] font-bold">Drop Rate</div>
            <div className="font-black text-emerald-700 mt-0.5">0.000%</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-[#707974] font-bold">Throttle Rate</div>
            <div className="font-black text-[#855300] mt-0.5">{throttle}</div>
          </div>
        </div>

        {/* Throttle Rate Controls */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#fbf7ee] border border-[#ebe8e3] text-xs">
          <span className="font-bold text-[#707974]">Telemetry Throttling:</span>
          <div className="flex items-center gap-1.5">
            {['1s (Turbo)', '5s (Standard)', '10s (Eco)'].map(t => {
              const val = t.split(' ')[0];
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setThrottle(val);
                    showToast(`WebSocket throttle rate adjusted to ${val}`);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    throttle === val ? 'bg-[#003527] text-white shadow-xs' : 'bg-white border border-[#ebe8e3] text-[#707974] hover:bg-[#f6f3ee]'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Terminal Packet Log */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#003527] flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
              Live Telemetry Packet Log {isPaused && '(Paused)'}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="text-xs font-bold text-[#003527] hover:underline cursor-pointer"
              >
                {isPaused ? 'Resume Stream' : 'Pause Stream'}
              </button>
              <button
                type="button"
                onClick={() => setLogs([])}
                className="text-xs font-bold text-[#707974] hover:underline cursor-pointer"
              >
                Clear Log
              </button>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#1c1c19] text-white font-mono text-xs max-h-52 overflow-y-auto space-y-1.5 shadow-inner">
            {logs.length === 0 ? (
              <div className="text-white/40 italic">Log stream cleared. Waiting for packet ACK...</div>
            ) : (
              logs.map(l => (
                <div key={l.id} className="leading-relaxed flex items-start gap-2">
                  <span className="text-white/40 shrink-0">[{l.time}]</span>
                  <span className="text-[#fea619] shrink-0">[{l.channel}]</span>
                  <span className="text-white/90">{l.msg}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 pt-2 border-t border-[#ebe8e3]">
          <button
            type="button"
            onClick={() => {
              showToast('🧹 Socket memory buffer flushed: 1,420 stream pipes re-synchronized');
              setLogs(prev => [
                { id: Date.now(), time: 'Just Now', channel: 'system:flush', msg: 'Socket memory buffer cleared and re-indexed' },
                ...prev
              ]);
            }}
            className="flex-1 py-2.5 rounded-xl bg-[#003527] text-white font-bold text-xs hover:bg-[#064e3b] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">cleaning_services</span>Flush Socket Buffer
          </button>
          <button
            type="button"
            onClick={() => {
              showToast('📡 Test Ping Packet emitted to all active worker beacons');
            }}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] font-bold text-xs hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs"
          >
            Emit Test Ping
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] font-bold text-xs hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PostGIS Spatial Engine Modal ─────────────────────────────────────────────
function PostGisModal({ open, onClose, showToast }) {
  const [radius, setRadius] = useState(8.5);

  if (!open) return null;

  const nearestWorkers = [
    { name: 'Elena Rostova', id: 'TECH-9021', dist: (radius * 0.38).toFixed(1), eta: '8 mins', status: 'Available', cert: 'Lead Bio-IV' },
    { name: 'Anita Desai', id: 'TECH-8814', dist: (radius * 0.60).toFixed(1), eta: '14 mins', status: 'Available', cert: 'Chemical Shield' },
    { name: 'Rajesh Kumar', id: 'TECH-4402', dist: (radius * 0.80).toFixed(1), eta: '19 mins', status: 'In Transit', cert: 'Commercial Lead' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-2xl w-full p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#003527] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">dataset</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#003527] text-base">PostGIS Spatial Engine</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#fea619]/20 text-[#855300] font-bold text-[10px] border border-[#fea619]/30">18.4 QPS</span>
              </div>
              <p className="text-[12px] text-[#707974]">PostgreSQL 16 + PostGIS 3.4 Spatial Indexing &amp; Proximity Allocation</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Engine Specs */}
        <div className="grid grid-cols-4 gap-2.5 p-3 rounded-2xl bg-[#fcf9f4] border border-[#ebe8e3] text-center text-xs">
          <div>
            <div className="text-[10px] uppercase text-[#707974] font-bold">Query Rate</div>
            <div className="font-black text-[#003527] mt-0.5">18.4 QPS</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-[#707974] font-bold">Spatial Index</div>
            <div className="font-bold text-[#003527] mt-0.5">GiST (R-Tree)</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-[#707974] font-bold">Query Latency</div>
            <div className="font-black text-emerald-700 mt-0.5">4.2ms avg</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-[#707974] font-bold">Cluster Mesh</div>
            <div className="font-black text-[#855300] mt-0.5">{radius} km Radius</div>
          </div>
        </div>

        {/* SQL Query Inspector */}
        <div className="p-3.5 rounded-2xl bg-[#1c1c19] text-white space-y-1.5 shadow-inner">
          <div className="flex items-center justify-between text-[11px] text-[#fea619] font-bold font-mono">
            <span>ST_DWithin PROXIMITY DISPATCH QUERY</span>
            <span className="text-emerald-400">PLAN TIME: 0.12ms</span>
          </div>
          <pre className="font-mono text-[11px] text-[#c2ebdc] overflow-x-auto leading-relaxed">
{`SELECT id, name, ST_Distance(geom, ST_MakePoint(77.5946, 12.9716)::geography) AS dist_m
FROM fleet_technicians
WHERE ST_DWithin(geom, ST_MakePoint(77.5946, 12.9716)::geography, ${(radius * 1000).toFixed(0)})
  AND status IN ('AVAILABLE', 'IN_TRANSIT')
ORDER BY dist_m ASC LIMIT 3;`}
          </pre>
        </div>

        {/* Interactive Radius Selector */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#fbf7ee] border border-[#ebe8e3] text-xs">
          <span className="font-bold text-[#707974]">ST_DWithin Cluster Radius:</span>
          <div className="flex items-center gap-1.5">
            {[5.0, 8.5, 12.0, 15.0].map(r => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRadius(r);
                  showToast(`PostGIS ST_DWithin search radius updated to ${r}km`);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  radius === r ? 'bg-[#003527] text-white shadow-xs' : 'bg-white border border-[#ebe8e3] text-[#707974] hover:bg-[#f6f3ee]'
                }`}
              >
                {r} km
              </button>
            ))}
          </div>
        </div>

        {/* Result Candidates */}
        <div className="border border-[#ebe8e3] rounded-2xl overflow-hidden bg-white shadow-2xs">
          <div className="p-3 bg-[#fcf9f4] border-b border-[#ebe8e3] flex items-center justify-between text-xs">
            <span className="font-bold text-[#003527]">Top 3 Nearest Technicians by PostGIS Geospatial Distance</span>
            <span className="text-[11px] text-[#707974]">Center: (12.9716° N, 77.5946° E)</span>
          </div>
          <div className="divide-y divide-[#ebe8e3]">
            {nearestWorkers.map((w, idx) => (
              <div key={w.id} className="p-3 flex items-center justify-between text-xs hover:bg-[#fcf9f4] transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#003527] text-white font-bold text-[10px] flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-[#1c1c19]">{w.name}</div>
                    <div className="text-[10px] text-[#707974]">{w.cert} · {w.id}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="font-black text-[#003527]">{w.dist} km</div>
                    <div className="text-[10px] text-[#707974]">ETA ~ {w.eta}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast(`📍 Focused on ${w.name}'s GPS coordinate mesh`)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-[#ebe8e3] hover:bg-[#f6f3ee] text-[#003527] font-bold text-[11px] transition-all cursor-pointer"
                  >
                    Locate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 pt-2 border-t border-[#ebe8e3]">
          <button
            type="button"
            onClick={() => showToast('⚙️ REINDEX TABLE fleet_technicians spatial GiST index executed (2.8ms)')}
            className="flex-1 py-2.5 rounded-xl bg-[#003527] text-white font-bold text-xs hover:bg-[#064e3b] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>Reindex GiST Spatial Mesh
          </button>
          <button
            type="button"
            onClick={() => showToast('📐 Voronoi service coverage polygons recalculated across all active hubs')}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] font-bold text-xs hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs"
          >
            Recalculate Voronoi
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] font-bold text-xs hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Detailed Agency Jobs Done & Assigned Workers Data ────────────────────────
const AGENCY_JOBS = {
  'EcoPest Solutions': [
    {
      id: 'JOB-9021',
      title: 'Termite Deep Eradication (Drill & Inject)',
      customer: 'David K. Chen',
      address: '742 Evergreen Terrace, Bellandur',
      worker: { name: 'Elena Rostova', id: 'TECH-9021', role: 'Lead Bio-IV Specialist', rating: '5.0', phone: '+91 98450 18239' },
      status: 'Completed · Warranty Active',
      statusBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      date: 'Today, 2:00 PM',
      duration: '75 mins',
      chemical: 'Fipronil 2.5% EC (CIB-9921)'
    },
    {
      id: 'JOB-9022',
      title: 'Mosquito Barrier Ultra-Low Volume Fogging',
      customer: 'Sunita Rao',
      address: '4100 Palm Meadows, Whitefield',
      worker: { name: 'Anita Desai', id: 'TECH-8814', role: 'Bio-Safety Technician', rating: '4.9', phone: '+91 97401 55320' },
      status: 'In Transit · Dispatched',
      statusBg: 'bg-blue-50 text-blue-800 border-blue-200',
      date: 'Today, 5:30 PM',
      duration: '45 mins',
      chemical: 'Deltamethrin 1.25% ULV'
    },
    {
      id: 'JOB-9018',
      title: 'Cockroach Odorless Gel Micro-Dot Application',
      customer: 'Rohit Verma',
      address: 'Flat 402, Green Glen Palms, Bellandur',
      worker: { name: 'Vikram Solanki', id: 'TECH-7721', role: 'Senior Technician', rating: '4.8', phone: '+91 99801 23412' },
      status: 'Completed (Dispute Logged)',
      statusBg: 'bg-red-50 text-red-700 border-red-200',
      date: '10 Oct 2024',
      duration: '60 mins',
      chemical: 'Imidacloprid 2.15% Gel'
    },
    {
      id: 'JOB-8995',
      title: 'Rodent Ultrasonic Perimeter Defense & Bait Station',
      customer: 'Dr. Ananya Murthy',
      address: 'Bungalow 7, Defence Colony, Indiranagar',
      worker: { name: 'Rajesh Kumar', id: 'TECH-4402', role: 'Commercial Lead', rating: '5.0', phone: '+91 99801 23811' },
      status: 'Completed · 1-Year Commercial Warranty',
      statusBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      date: '02 Oct 2024',
      duration: '90 mins',
      chemical: 'Bromadiolone 0.005% Tamper-Proof Blocks'
    }
  ],
  'Apex Pest Bangalore': [
    {
      id: 'JOB-8840',
      title: 'Residential Bedbug Thermal & Chemical Treatment',
      customer: 'Meera Iyer',
      address: 'Flat 11B, Prestige Ozone, Whitefield',
      worker: { name: 'Karthik Raja', id: 'TECH-6612', role: 'Thermal Fumigator', rating: '4.7', phone: '+91 98450 78201' },
      status: 'Completed (Late Arrival Flagged)',
      statusBg: 'bg-amber-50 text-amber-800 border-amber-200',
      date: '23 Oct 2024, 04:40 PM',
      duration: '80 mins',
      chemical: 'Clothianidin + Metofluthrin Spray'
    },
    {
      id: 'JOB-8835',
      title: 'Commercial Restaurant Cockroach Barrier Cleanse',
      customer: 'Flavors of Malabar',
      address: '92 Outer Ring Road, Bellandur',
      worker: { name: 'Suresh Gowda', id: 'TECH-6619', role: 'Commercial Sanitizer', rating: '4.9', phone: '+91 96112 00983' },
      status: 'Completed · Monthly Retainer Active',
      statusBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      date: '18 Oct 2024',
      duration: '110 mins',
      chemical: 'Hydramethylnon Gel + Drain Foam'
    }
  ],
  'CleanShield NCR': [
    {
      id: 'JOB-8720',
      title: 'Whole House Termite Drilling Barrier',
      customer: 'Kavita Sundaram',
      address: 'Sector 43, DLF Phase 5, Gurgaon',
      worker: { name: 'Amitabh Sen', id: 'TECH-5501', role: 'Lead Termite Assessor', rating: '4.8', phone: '+91 97401 88200' },
      status: 'Completed · 2-Year Bio-Shield Active',
      statusBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      date: '20 Oct 2024',
      duration: '120 mins',
      chemical: 'Chlorantraniliprole 18.5% SC'
    },
    {
      id: 'JOB-8715',
      title: 'Apartment Mosquito Mist Guard',
      customer: 'Prakash Hegde',
      address: 'Cyber City Residences, Gurgaon',
      worker: { name: 'Deepak S.', id: 'TECH-5504', role: 'Eco-Mist Operator', rating: '4.9', phone: '+91 99801 77123' },
      status: 'Completed',
      statusBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      date: '16 Oct 2024',
      duration: '40 mins',
      chemical: 'Pyrethrum Organic Fog'
    }
  ],
  'CleanShield Pro': [
    {
      id: 'JOB-8720',
      title: 'Whole House Termite Drilling Barrier',
      customer: 'Kavita Sundaram',
      address: 'Villa 18, Koramangala 4th Block',
      worker: { name: 'Amitabh Sen', id: 'TECH-5501', role: 'Lead Termite Assessor', rating: '4.8', phone: '+91 97401 88200' },
      status: 'Completed · 2-Year Bio-Shield Active',
      statusBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      date: '20 Oct 2024',
      duration: '120 mins',
      chemical: 'Chlorantraniliprole 18.5% SC'
    },
    {
      id: 'JOB-8715',
      title: 'Apartment Mosquito Mist Guard',
      customer: 'Prakash Hegde',
      address: 'Tower C, HSR Layout Sector 2',
      worker: { name: 'Deepak S.', id: 'TECH-5504', role: 'Eco-Mist Operator', rating: '4.9', phone: '+91 99801 77123' },
      status: 'Completed',
      statusBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      date: '16 Oct 2024',
      duration: '40 mins',
      chemical: 'Pyrethrum Organic Fog'
    }
  ]
};

// ─── Agency Detailed Jobs Done & Assigned Worker Modal ────────────────────────
function AgencyJobsModal({ agencyName, onClose, showToast }) {
  if (!agencyName) return null;
  const jobs = AGENCY_JOBS[agencyName] || [
    {
      id: 'JOB-9100',
      title: 'Pest Eradication Service Protocol',
      customer: 'General Customer',
      address: 'Central District Hub',
      worker: { name: 'Assigned Senior Technician', id: 'TECH-101', role: 'Certified Field Tech', rating: '4.9', phone: '+91 98000 00000' },
      status: 'Completed · Active',
      statusBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      date: 'Recent Service',
      duration: '60 mins',
      chemical: 'Standard CIB Bio-Compound'
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-2xl w-full p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#003527] text-[#fea619] font-black text-sm flex items-center justify-center shadow-xs">
              {agencyName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#003527] text-base">{agencyName}</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                  {jobs.length} Verified Field Jobs on Record
                </span>
              </div>
              <p className="text-[12px] text-[#707974]">Detailed Jobs Done, Assigned Field Workers, and Efficacy Records</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Jobs List */}
        <div className="flex flex-col gap-3">
          {jobs.map(job => (
            <div key={job.id} className="p-4 rounded-2xl bg-[#fcf9f4] border border-[#ebe8e3] flex flex-col gap-3 shadow-2xs hover:border-[#003527]/30 transition-all">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-white border border-[#ebe8e3] font-mono text-[11px] font-bold text-[#003527]">
                      {job.id}
                    </span>
                    <h4 className="font-bold text-sm text-[#1c1c19]">{job.title}</h4>
                  </div>
                  <div className="text-[12px] text-[#707974] mt-0.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-[#003527]">person</span>
                    <span>Client: <strong className="text-[#1c1c19]">{job.customer}</strong></span>
                    <span>·</span>
                    <span className="truncate">{job.address}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border shrink-0 ${job.statusBg}`}>
                  {job.status}
                </span>
              </div>

              {/* Assigned Worker Box */}
              <div className="p-3 bg-white rounded-xl border border-[#ebe8e3] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#003527] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    {job.worker.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-[#003527]">{job.worker.name}</span>
                      <span className="text-[10px] bg-[#f0ede9] text-[#707974] font-mono px-1.5 py-0.2 rounded border border-[#ebe8e3] font-bold">
                        {job.worker.id}
                      </span>
                      <span className="text-[11px] font-bold text-[#855300] flex items-center">
                        ★ {job.worker.rating}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#707974]">{job.worker.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => showToast && showToast(`📞 Calling Technician ${job.worker.name} (${job.worker.phone})`)}
                    className="px-3 py-1.5 rounded-lg bg-[#fcf9f4] hover:bg-[#f0ede9] border border-[#ebe8e3] text-[#003527] font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">call</span>
                    <span>Contact Worker</span>
                  </button>
                </div>
              </div>

              {/* Protocol Specs */}
              <div className="flex items-center justify-between text-[11px] text-[#707974] pt-1 border-t border-[#ebe8e3]/60">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-[#003527]">science</span>
                  {job.chemical}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-[#003527]">schedule</span>
                  {job.date} ({job.duration})
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-2 border-t border-[#ebe8e3]">
          <span className="text-xs text-[#707974]">
            Data synchronized with central dispatch telemetry ledger
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#003527] text-white font-bold text-xs hover:bg-[#064e3b] transition-all cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Agency Module (KYC Audits & Approved Agencies Inline) ────────────────────
function KYCTab({ pendingAgencies, setPendingAgencies, approvedAgencies, setApprovedAgencies, showToast, selectedDossier, setSelectedDossier, onSelectAgency }) {
  const handleApprove = (id, name) => {
    const toApprove = pendingAgencies.find(a => a.id === id);
    if (toApprove) {
      setApprovedAgencies(prev => [
        {
          ...toApprove,
          techs: 8,
          jobsCompleted: 0,
          sla: '100.0%',
          approvedDate: 'Just Now',
          status: 'Approved & Active'
        },
        ...prev
      ]);
    }
    setPendingAgencies(prev => prev.filter(a => a.id !== id));
    setSelectedDossier(null);
    showToast(`✅ ${name} (${id}) — KYC Approved, License Certified & Activated Inline!`);
  };

  const handleReject = (id, name) => {
    setPendingAgencies(prev => prev.filter(a => a.id !== id));
    showToast(`❌ ${name} (${id}) — Application rejected & notified`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-8">
      {/* Module Overview Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#ebe8e3]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] uppercase tracking-wider text-[#855300] font-bold bg-[#fea619]/20 px-2.5 py-0.5 rounded-full border border-[#fea619]/30">
              Agency Operations Core
            </span>
            <span className="w-1 h-1 rounded-full bg-[#fea619]" />
            <span className="text-[11px] text-[#707974] font-medium">CIB&amp;RC Verified Network</span>
          </div>
          <h2 className="text-2xl font-black text-[#003527] tracking-tight">Agency Module · KYC Audits &amp; Approved Network</h2>
          <p className="text-sm text-[#707974] mt-0.5">Review Trade Licenses and CIB&amp;RC Chemical Permits, and oversee operational certified partner hubs.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-[#fea619]/20 text-[#855300] border border-[#fea619]/30 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#fea619]" />
            {pendingAgencies.length} Pending
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {approvedAgencies?.length || 0} Approved
          </span>
        </div>
      </div>

      {/* ── Headline 1: Pending KYC Applications ── */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#ebe8e3]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#fea619]/20 flex items-center justify-center text-[#855300]">
              <span className="material-symbols-outlined text-[18px]">pending_actions</span>
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1c1c19]">Pending KYC Verification &amp; Onboarding</h3>
              <p className="text-[11px] text-[#707974]">Applications undergoing identity, trade license, and insecticide audit</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#fea619]/20 text-[#855300] border border-[#fea619]/30 text-[11px] font-bold">
            {pendingAgencies.length} Awaiting Audit
          </span>
        </div>

        {pendingAgencies.length === 0 ? (
          <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl p-10 text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#003527]/10 text-[#003527] flex items-center justify-center mx-auto mb-2">
              <span className="material-symbols-outlined text-[28px]">task_alt</span>
            </div>
            <h4 className="font-bold text-sm text-[#003527]">All Pending Applications Vetted!</h4>
            <p className="text-xs text-[#707974] mt-0.5">Zero pending audits in queue. All submitted dossiers have been processed.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {pendingAgencies.map(agency => (
              <div key={agency.id} className="bg-[#ffffff] border border-[#ebe8e3] rounded-2xl p-5 shadow-xs hover:border-[#003527]/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-lg bg-[#f0ede9] text-[#003527] text-[11px] font-bold font-mono border border-[#ebe8e3]">{agency.id}</span>
                      <h4 className="font-bold text-base text-[#1c1c19]">{agency.name}</h4>
                      <span className="text-[12px] font-semibold text-[#707974]">({agency.city})</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#fea619]/20 text-[#855300] border border-[#fea619]/30 text-[11px] font-bold">Pending Review</span>
                    </div>
                    <div className="text-sm text-[#707974]">
                      Managing Director: <strong className="text-[#1c1c19]">{agency.owner}</strong>
                      <span className="mx-2 text-[#bfc9c3]">·</span>
                      GSTIN: <code className="bg-[#f0ede9] px-2 py-0.5 rounded text-[11px] text-[#003527] font-mono border border-[#ebe8e3]">{agency.gstin}</code>
                    </div>
                    <div className="text-[12px] text-[#003527] font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
                      CIB License: {agency.license}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button type="button" onClick={() => setSelectedDossier(agency)} className="px-3.5 py-2 rounded-xl bg-[#ffffff] border border-[#ebe8e3] hover:bg-[#f6f3ee] text-[#003527] font-bold text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-xs">
                      <span className="material-symbols-outlined text-[16px]">policy</span>Inspect Dossier
                    </button>
                    <button type="button" onClick={() => handleReject(agency.id, agency.name)} className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-xs">
                      <span className="material-symbols-outlined text-[16px]">cancel</span>Reject
                    </button>
                    <button type="button" onClick={() => handleApprove(agency.id, agency.name)} className="px-4 py-2 rounded-xl bg-[#003527] hover:bg-[#064e3b] text-white font-bold text-sm flex items-center gap-1.5 shadow-xs transition-all cursor-pointer">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>Approve Inline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Headline 2: Approved & Certified Partner Agencies (Inline) ── */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#ebe8e3]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1c1c19]">Approved &amp; Certified Partner Agencies (Inline)</h3>
              <p className="text-[11px] text-[#707974]">Commercial hubs with active dispatch licenses, verified fleet personnel, and escrow routing</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
            {approvedAgencies?.length || 0} Certified Hubs
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {(approvedAgencies || []).map(agency => (
            <div key={agency.id} className="bg-[#ffffff] border border-[#ebe8e3] rounded-2xl p-5 shadow-xs hover:border-[#003527]/30 transition-all flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#003527] text-[#fea619] font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                    {agency.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-lg bg-[#f0ede9] text-[#003527] text-[11px] font-bold font-mono border border-[#ebe8e3]">
                        {agency.id}
                      </span>
                      <h4 className="font-bold text-base text-[#1c1c19]">{agency.name}</h4>
                      <span className="text-xs text-[#707974]">({agency.city})</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Approved &amp; Active
                      </span>
                    </div>
                    <div className="text-xs text-[#707974] mt-1 flex items-center gap-2 flex-wrap">
                      <span>Director: <strong className="text-[#1c1c19]">{agency.owner}</strong></span>
                      <span>·</span>
                      <span>GSTIN: <code className="bg-[#f0ede9] px-2 py-0.5 rounded text-[10px] text-[#003527] font-mono border border-[#ebe8e3]">{agency.gstin}</code></span>
                      <span>·</span>
                      <span>CIB License: <strong className="text-[#003527]">{agency.license}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Inline Action Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelectAgency(agency.name)}
                    className="px-3.5 py-2 rounded-xl bg-[#003527] hover:bg-[#064e3b] text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    title="View Detailed Jobs Done & Assigned Field Workers"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#fea619]">work_history</span>
                    <span>View Jobs Done</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDossier(agency)}
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#ebe8e3] hover:bg-[#f6f3ee] text-[#003527] font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">policy</span>
                    <span>Inspect Dossier</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast(`🔐 mTLS Keypair & Credentials confirmed valid for ${agency.name}`)}
                    className="px-3 py-2 rounded-xl bg-[#fcf9f4] border border-[#ebe8e3] hover:bg-[#f0ede9] text-[#707974] hover:text-[#1c1c19] font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">key</span>
                  </button>
                </div>
              </div>

              {/* Inline Fleet Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-[#fcf9f4] border border-[#ebe8e3] text-xs">
                <div>
                  <span className="text-[10px] uppercase text-[#707974] font-bold block">Active Fleet</span>
                  <span className="font-bold text-[#003527] text-sm mt-0.5 block">{agency.techs} Technicians Online</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#707974] font-bold block">Lifetime Volume</span>
                  <span className="font-bold text-[#1c1c19] text-sm mt-0.5 block">{agency.jobsCompleted} Jobs Completed</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#707974] font-bold block">SLA Compliance</span>
                  <span className="font-bold text-emerald-700 text-sm mt-0.5 block">{agency.sla} Guaranteed</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#707974] font-bold block">Certification Date</span>
                  <span className="font-semibold text-[#707974] text-xs mt-0.5 block">{agency.approvedDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dossier Modal */}
      {selectedDossier && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && setSelectedDossier(null)}>
          <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#003527] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">policy</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#003527] text-base">KYC &amp; Compliance Dossier</h3>
                  <p className="text-[12px] text-[#707974]">{selectedDossier.name} — {selectedDossier.id}</p>
                </div>
              </div>
              <button type="button" onClick={() => setSelectedDossier(null)} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3] flex flex-col gap-2.5">
              {[
                ['Agency Name', selectedDossier.name],
                ['Registration ID', selectedDossier.id],
                ['Operating City', selectedDossier.city],
                ['Managing Director', selectedDossier.owner],
                ['GSTIN', selectedDossier.gstin],
                ['CIB License', selectedDossier.license],
                ['Identity Audit', 'e-KYC Token Confirmed (PII Masked)'],
                ['Insecticide Act 1968', '✅ Verified Active']
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between text-sm py-1 border-b border-[#ebe8e3]/60 last:border-0">
                  <span className="text-[#707974]">{k}</span>
                  <span className="font-semibold text-[#1c1c19] text-right max-w-[240px]">{v}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  handleApprove(selectedDossier.id, selectedDossier.name);
                }}
                className="flex-1 py-3 rounded-xl bg-[#003527] text-white font-bold text-sm hover:bg-[#064e3b] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>Approve &amp; Issue Certificate
              </button>
              <button
                type="button"
                onClick={() => setSelectedDossier(null)}
                className="px-5 py-3 rounded-xl bg-[#ffffff] border border-[#ebe8e3] text-[#003527] font-bold text-sm hover:bg-[#f6f3ee] transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Disputes Tab (With Jobs vs Failure Rate Bar Graph & Customer Differentiation) ──
function DisputesTab({ disputes, showToast, onSelectAgency }) {
  // Bar Graph Data: Jobs Accomplished vs Failure Rate
  const agencyStats = [
    { name: 'EcoPest Solutions', total: 880, accomplished: 864, failures: 16, successRate: 98.2, failRate: 1.8 },
    { name: 'Apex Pest Bangalore', total: 560, accomplished: 544, failures: 16, successRate: 97.1, failRate: 2.9 },
    { name: 'CleanShield NCR', total: 400, accomplished: 390, failures: 10, successRate: 97.5, failRate: 2.5 },
  ];

  const totalDispatched = agencyStats.reduce((acc, a) => acc + a.total, 0);
  const totalAccomplished = agencyStats.reduce((acc, a) => acc + a.accomplished, 0);
  const totalFailures = agencyStats.reduce((acc, a) => acc + a.failures, 0);
  const overallSuccessRate = ((totalAccomplished / totalDispatched) * 100).toFixed(1);
  const overallFailRate = ((totalFailures / totalDispatched) * 100).toFixed(1);

  const monthlyTrend = [
    { month: 'Jun', total: 240, successRate: 96.8, failRate: 3.2 },
    { month: 'Jul', total: 310, successRate: 97.2, failRate: 2.8 },
    { month: 'Aug', total: 380, successRate: 97.5, failRate: 2.5 },
    { month: 'Sep', total: 420, successRate: 97.8, failRate: 2.2 },
    { month: 'Oct', total: 490, successRate: 98.1, failRate: 1.9 },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] uppercase tracking-wider text-[#855300] font-bold bg-[#fea619]/20 px-2.5 py-0.5 rounded-full border border-[#fea619]/30">
              Quality Assurance &amp; Warranty Audits
            </span>
          </div>
          <h2 className="text-xl font-black text-[#003527]">Disputes &amp; SLA Compliance Desk</h2>
          <p className="text-sm text-[#707974] mt-0.5">Fleet accomplishment metrics, chemical guarantee escalations, and customer loyalty differentiation.</p>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-red-100 text-red-800 border border-red-200 text-sm font-bold flex items-center gap-1.5 w-fit">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          {disputes.length} Escalations Under Review
        </span>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════════
          BAR GRAPH: Jobs Accomplished vs Failure Rate
      ═════════════════════════════════════════════════════════════════════════ */}
      <div className="rounded-3xl border border-[#ebe8e3] bg-white p-6 shadow-xs flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#ebe8e3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#003527] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">bar_chart</span>
            </div>
            <div>
              <h3 className="font-bold text-[#003527] text-base">Fleet Performance · Jobs Accomplished vs Failure Rate</h3>
              <p className="text-xs text-[#707974]">Comparative ratio of jobs completed without incident versus warranty breach/dispute claims</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <span className="w-3 h-3 rounded-md bg-[#003527]" />
              Accomplished ({overallSuccessRate}%)
            </span>
            <span className="flex items-center gap-1.5 text-red-700">
              <span className="w-3 h-3 rounded-md bg-[#dc2626]" />
              Failure Rate ({overallFailRate}%)
            </span>
          </div>
        </div>

        {/* Top Metric Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#fcf9f4] border border-[#ebe8e3]">
            <span className="text-[10px] uppercase tracking-wider text-[#707974] font-bold block">Total Dispatched</span>
            <span className="text-2xl font-black text-[#1c1c19] mt-0.5 block">{totalDispatched.toLocaleString()}</span>
            <span className="text-[11px] text-[#707974] mt-0.5 block">Across all partner hubs</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-bold block">Jobs Accomplished</span>
            <span className="text-2xl font-black text-emerald-800 mt-0.5 block">{totalAccomplished.toLocaleString()}</span>
            <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">✓ {overallSuccessRate}% Flawless Run</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-red-50/60 border border-red-200">
            <span className="text-[10px] uppercase tracking-wider text-red-800 font-bold block">Failure / Dispute Rate</span>
            <span className="text-2xl font-black text-red-700 mt-0.5 block">{totalFailures}</span>
            <span className="text-[11px] text-red-700 font-semibold mt-0.5 block">⚠ {overallFailRate}% Escalation Ratio</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3]">
            <span className="text-[10px] uppercase tracking-wider text-[#855300] font-bold block">Mean Resolution SLA</span>
            <span className="text-2xl font-black text-[#855300] mt-0.5 block">4.2 hrs</span>
            <span className="text-[11px] text-[#707974] mt-0.5 block">Escrow Arbitration Target</span>
          </div>
        </div>

        {/* Agency-by-Agency Visual Stacked Bar Graph */}
        <div className="flex flex-col gap-4 pt-2">
          <span className="text-xs font-bold text-[#003527] uppercase tracking-wider">
            Agency Dispatch Volume &amp; Defect Ratio Breakdown
          </span>
          <div className="flex flex-col gap-3.5">
            {agencyStats.map(stat => (
              <div key={stat.name} className="flex flex-col gap-1.5 p-3 rounded-2xl bg-[#fcf9f4] border border-[#ebe8e3]">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectAgency(stat.name)}
                      className="font-bold text-[#003527] hover:underline flex items-center gap-1 cursor-pointer"
                      title="Click to view detailed jobs done"
                    >
                      <span className="material-symbols-outlined text-[15px] text-[#fea619]">apartment</span>
                      <span>{stat.name}</span>
                    </button>
                    <span className="text-[#707974] font-medium">({stat.total} Total Jobs)</span>
                  </div>
                  <div className="flex items-center gap-3 font-semibold">
                    <span className="text-emerald-700">{stat.accomplished} Accomplished ({stat.successRate}%)</span>
                    <span className="text-red-700">{stat.failures} Failures ({stat.failRate}%)</span>
                  </div>
                </div>

                {/* The Bar Graph Bar */}
                <div className="w-full h-3.5 rounded-full bg-[#f0ede9] overflow-hidden flex shadow-inner">
                  <div
                    style={{ width: `${stat.successRate}%` }}
                    className="h-full bg-[#003527] transition-all duration-700 relative group cursor-pointer"
                    title={`Accomplished: ${stat.accomplished} (${stat.successRate}%)`}
                  />
                  <div
                    style={{ width: `${stat.failRate}%` }}
                    className="h-full bg-red-600 transition-all duration-700 relative group cursor-pointer"
                    title={`Failures: ${stat.failures} (${stat.failRate}%)`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trend Bars */}
        <div className="pt-2 border-t border-[#ebe8e3]">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-[#707974] uppercase tracking-wider">5-Month Quality Progression (Platform-Wide)</span>
            <span className="text-emerald-800 font-bold">Trending Down in Defects (-1.3% since June)</span>
          </div>
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {monthlyTrend.map(m => (
              <div key={m.month} className="p-2.5 rounded-xl bg-[#fcf9f4] border border-[#ebe8e3] flex flex-col items-center gap-1">
                <span className="font-bold text-[#1c1c19] text-xs">{m.month} 2024</span>
                <div className="w-full h-16 bg-[#e5e2dd] rounded-lg relative overflow-hidden flex flex-col justify-end">
                  <div style={{ height: `${m.failRate * 12}%` }} className="w-full bg-red-500" title={`Failures: ${m.failRate}%`} />
                  <div style={{ height: `${m.successRate * 0.8}%` }} className="w-full bg-[#003527]" title={`Accomplished: ${m.successRate}%`} />
                </div>
                <div className="text-[10px] text-[#707974] mt-0.5">
                  <strong className="text-emerald-800">{m.successRate}%</strong> / <span className="text-red-700">{m.failRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════════
          DISPUTES LIST (Status and Action removed; Old vs New Customer differentiated; Clickable Agency)
      ═════════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#ebe8e3]">
          <h3 className="font-bold text-base text-[#003527] flex items-center gap-2">
            <span className="material-symbols-outlined text-red-600 text-[20px]">gavel</span>
            Client Escalations &amp; Claim Ledgers ({disputes.length})
          </h3>
          <span className="text-xs text-[#707974]">Click any agency to view detailed jobs done and assigned worker</span>
        </div>

        {disputes.length === 0 ? (
          <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl p-16 text-center shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-[#003527]/10 text-[#003527] flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[40px]">gavel</span>
            </div>
            <h3 className="font-bold text-lg text-[#003527]">Zero Open Disputes!</h3>
            <p className="text-sm text-[#707974] mt-1">All agency service warranties are operating at 100% SLA compliance.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {disputes.map(d => {
              const isOldCustomer = d.customerType === 'Old Customer' || d.customerType === 'old';
              return (
                <div key={d.id} className="bg-[#ffffff] border border-[#ebe8e3] rounded-2xl p-5 shadow-xs hover:border-[#003527]/30 transition-all flex flex-col gap-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 text-[11px] font-bold font-mono border border-red-200">
                        {d.id}
                      </span>

                      {/* Customer Name + Old vs New Differentiation Badge */}
                      <span className="font-bold text-base text-[#1c1c19]">{d.client}</span>

                      {isOldCustomer ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-[11px] font-bold flex items-center gap-1 shadow-2xs">
                          <span className="material-symbols-outlined text-[13px] text-purple-700">verified_user</span>
                          Returning Customer (Old)
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold flex items-center gap-1 shadow-2xs">
                          <span className="material-symbols-outlined text-[13px] text-amber-700">person_add</span>
                          New Customer (1st Booking)
                        </span>
                      )}

                      <span className="text-[#707974] text-xs">·</span>
                      <span className="text-xs text-[#707974] font-medium">{d.customerDetails || (isOldCustomer ? 'Returning Client' : 'First-time Client')}</span>
                    </div>

                    {/* Clickable Agency Column Button */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#707974]">Agency:</span>
                      <button
                        type="button"
                        onClick={() => onSelectAgency(d.agency)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#fbf7ee] hover:bg-[#003527] hover:text-white border border-[#ebe8e3] text-[#003527] font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs group"
                        title="Click to view detailed jobs done and assigned worker"
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#fea619]">apartment</span>
                        <span>{d.agency}</span>
                        <span className="text-[10px] text-[#855300] group-hover:text-white font-medium ml-1">
                          (View Jobs Done →)
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Issue & Claim Description */}
                  <div className="p-3.5 rounded-xl bg-[#fcf9f4] border border-[#ebe8e3] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="text-[#707974] font-semibold">Infestation / SLA Issue: </span>
                      <span className="text-[#1c1c19] font-medium">{d.issue}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#855300] font-bold shrink-0">
                      <span className="material-symbols-outlined text-[16px]">priority_high</span>
                      <span>Claim Demanded: {d.claim}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Financials Tab ───────────────────────────────────────────────────────────
function FinancialsTab({ showToast }) {
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [agenciesList, setAgenciesList] = useState([
    { name: 'EcoPest Solutions', account: 'HDFC •••• 9102', jobs: 184, gmv: '₹2,42,000', fee: '₹36,300', net: '₹2,05,700', status: 'Disbursed', date: '24 Oct 2024, 06:00 PM', utr: 'UTR-HDFC-99120842-EP' },
    { name: 'Apex Pest Bangalore', account: 'ICICI •••• 4421', jobs: 92, gmv: '₹1,18,000', fee: '₹17,700', net: '₹1,00,300', status: 'Pending Approval', date: 'Pending Escrow Release', utr: 'UTR-PENDING-APEX' },
    { name: 'CleanShield NCR', account: 'AXIS •••• 8812', jobs: 64, gmv: '₹84,500', fee: '₹12,675', net: '₹71,825', status: 'Pending Approval', date: 'Pending Escrow Release', utr: 'UTR-PENDING-CS' },
  ]);

  const handlePayNow = (name) => {
    setAgenciesList(prev => prev.map(a => a.name === name ? { ...a, status: 'Disbursed', date: 'Just now (Instant IMPS)', utr: `UTR-RAZORPAYX-${Date.now().toString().slice(-8)}` } : a));
    showToast(`✅ Disbursed payout to ${name} via RazorpayX Escrow API!`);
  };

  const handleDisburseAll = () => {
    setAgenciesList(prev => prev.map(a => ({ ...a, status: 'Disbursed', date: 'Batch Disbursed', utr: `UTR-BATCH-${Date.now().toString().slice(-8)}` })));
    showToast('🚀 All weekly agency payouts disbursed successfully!');
  };

  const totalGMV = agenciesList.reduce((acc, a) => acc + parseInt(a.gmv.replace(/[^0-9]/g, '')), 0);
  const totalFee = agenciesList.reduce((acc, a) => acc + parseInt(a.fee.replace(/[^0-9]/g, '')), 0);
  const totalNet = agenciesList.reduce((acc, a) => acc + parseInt(a.net.replace(/[^0-9]/g, '')), 0);

  const statusStyle = {
    'Disbursed': 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    'Pending Approval': 'bg-[#fea619]/20 text-[#855300] border border-[#fea619]/30',
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#003527]">Settlements, Escrow &amp; GMV Ledger</h2>
          <p className="text-sm text-[#707974] mt-0.5">Automated 15% platform take-rate deduction and weekly IMPS/NEFT agency payouts.</p>
        </div>
        <button
          type="button"
          onClick={handleDisburseAll}
          className="px-5 py-2.5 rounded-xl bg-[#003527] hover:bg-[#064e3b] text-white font-bold text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer w-fit"
        >
          <span className="material-symbols-outlined text-[18px]">payments</span>Disburse Weekly Payouts
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Monthly GMV', value: `₹${(totalGMV).toLocaleString('en-IN')}`, sub: '↑ +18.4% vs last month', icon: 'trending_up', color: 'text-[#003527]' },
          { label: 'Platform Take-Rate (15%)', value: `₹${(totalFee).toLocaleString('en-IN')}`, sub: 'Direct Platform Revenue', icon: 'account_balance', color: 'text-[#855300]' },
          { label: 'Agency Net Settlements', value: `₹${(totalNet).toLocaleString('en-IN')}`, sub: `${agenciesList.filter(a => a.status === 'Disbursed').length} of ${agenciesList.length} Settled`, icon: 'send_money', color: 'text-[#003527]' },
        ].map(k => (
          <div key={k.label} className="bg-[#ffffff] border border-[#ebe8e3] p-5 rounded-3xl shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#003527]/10 flex items-center justify-center text-[#003527]">
                <span className="material-symbols-outlined text-[18px]">{k.icon}</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#707974] font-bold">{k.label}</span>
            </div>
            <div className={`text-3xl font-black ${k.color}`}>{k.value}</div>
            <div className="text-[12px] text-[#003527] font-semibold mt-1">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-[#ebe8e3] overflow-hidden shadow-xs bg-[#ffffff]">
        <div className="bg-[#fcf9f4] px-6 py-4 flex items-center justify-between border-b border-[#ebe8e3]">
          <h3 className="font-bold text-[#003527] text-sm">Agency Settlement Breakdown</h3>
          <button
            type="button"
            onClick={() => showToast('📥 Exported settlements_gmv_october.csv')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#ffffff] border border-[#ebe8e3] text-[#003527] text-xs font-bold hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>Export CSV
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-[#707974] font-bold bg-[#fbf7ee] border-b border-[#ebe8e3]">
              <th className="py-3 px-5">Agency</th>
              <th className="py-3 px-4">Jobs</th>
              <th className="py-3 px-4">Gross GMV</th>
              <th className="py-3 px-4">Platform Fee (15%)</th>
              <th className="py-3 px-4">Net Settlement</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ebe8e3] bg-[#ffffff]">
            {agenciesList.map((a) => (
              <tr key={a.name} className="hover:bg-[#fcf9f4] transition-colors text-xs">
                <td className="py-4 px-5">
                  <div className="font-bold text-[#1c1c19] text-sm">{a.name}</div>
                  <div className="text-[11px] text-[#707974] font-mono">{a.account}</div>
                </td>
                <td className="py-4 px-4 text-[#707974] font-medium">{a.jobs}</td>
                <td className="py-4 px-4 font-bold text-[#1c1c19]">{a.gmv}</td>
                <td className="py-4 px-4 text-[#855300] font-semibold">{a.fee}</td>
                <td className="py-4 px-4 font-black text-[#003527]">{a.net}</td>
                <td className="py-4 px-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${statusStyle[a.status]}`}>{a.status}</span>
                </td>
                <td className="py-4 px-5 text-right">
                  {a.status === 'Disbursed' ? (
                    <button
                      type="button"
                      onClick={() => setSelectedReceipt(a)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#003527]/10 hover:bg-[#003527] hover:text-white text-[#003527] text-xs font-bold transition-all flex items-center gap-1.5 ml-auto cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">receipt_long</span>Receipt
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handlePayNow(a.name)}
                      className="px-4 py-1.5 rounded-xl bg-[#003527] hover:bg-[#064e3b] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ml-auto cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">send</span>Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedReceipt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && setSelectedReceipt(null)}>
          <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#003527] flex items-center justify-center text-white shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#003527] text-base">Payment Settlement Voucher</h3>
                  <p className="text-[12px] text-[#707974] font-mono">{selectedReceipt.utr}</p>
                </div>
              </div>
              <button type="button" onClick={() => setSelectedReceipt(null)} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3] flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-[#ebe8e3]/60"><span className="text-[#707974]">Agency:</span><span className="font-bold text-[#1c1c19]">{selectedReceipt.name}</span></div>
              <div className="flex justify-between py-1 border-b border-[#ebe8e3]/60"><span className="text-[#707974]">Account:</span><span className="font-mono text-[#1c1c19] font-bold">{selectedReceipt.account}</span></div>
              <div className="flex justify-between py-1 border-b border-[#ebe8e3]/60"><span className="text-[#707974]">Gross GMV:</span><span className="font-semibold text-[#1c1c19]">{selectedReceipt.gmv} ({selectedReceipt.jobs} Jobs)</span></div>
              <div className="flex justify-between py-1 border-b border-[#ebe8e3]/60"><span className="text-[#707974]">Take-Rate (15%):</span><span className="text-[#855300] font-semibold">- {selectedReceipt.fee}</span></div>
              <div className="flex justify-between py-1 pt-2"><span className="text-[#003527] font-bold">Net Settlement:</span><span className="text-[#003527] font-black text-sm">{selectedReceipt.net}</span></div>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => { window.print(); showToast('🖨️ Printing settlement voucher...'); }} className="flex-1 py-2.5 rounded-xl bg-[#003527] text-white font-bold text-xs hover:bg-[#064e3b] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs">
                <span className="material-symbols-outlined text-[16px]">print</span>Print Voucher
              </button>
              <button type="button" onClick={() => setSelectedReceipt(null)} className="px-5 py-2.5 rounded-xl bg-[#ffffff] border border-[#ebe8e3] text-[#003527] font-bold text-xs hover:bg-[#f6f3ee] transition-all cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
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
              src="/easyhicare-logo.png"
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
      <aside className={`fixed left-0 top-0 h-full w-64 bg-[#003527] text-white z-50 flex flex-col border-r border-[#064e3b] shadow-2xl transition-transform duration-200 ease-in-out ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <img
              src="/easyhicare-logo.png"
              alt="Easy HiCare Logo"
              className="h-9 w-auto max-w-[76px] rounded-lg bg-white p-1 object-contain shadow-xs border border-white/20"
            />
            <div>
              <div className="text-[13px] font-bold text-white tracking-tight leading-none">Easy HiCare OS</div>
              <div className="text-[10px] text-[#80bea6] font-semibold mt-0.5">Admin Dispatch Core</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-[#fea619] text-[#1c1c19] text-[9px] font-black">v4.2</span>
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
              aria-label="Close sidebar"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
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

        {/* Menu Bar Navigation Items */}
        <nav className="flex-1 px-3 py-3 flex flex-col gap-1.5 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-widest text-[#80bea6] font-bold px-3 mb-1 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[13px] text-[#fea619]">dashboard</span>
            Operations Menu
          </p>
          {navItems.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveTab(item.id);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-[13px] transition-all text-left cursor-pointer ${
                activeTab === item.id
                  ? 'bg-[#064e3b] text-white shadow-xs font-bold border border-white/15'
                  : 'text-[#c2ebdc]/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-[20px] ${activeTab === item.id ? 'text-[#fea619]' : 'text-[#80bea6]'}`}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && item.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeTab === item.id ? 'bg-[#fea619] text-[#1c1c19]' : 'bg-white/20 text-white'}`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom of Sidebar: 24x7 Helpline + Root Admin Profile (Moved from Top Header) */}
        <div className="p-3 border-t border-white/10 flex flex-col gap-2.5 shrink-0 bg-[#00291e]">
          <button
            type="button"
            onClick={() => showToast('📞 Operations Helpline: Connecting to Regional Dispatch Command...')}
            className="w-full py-2.5 px-3 rounded-xl bg-[#fea619] hover:bg-[#e09110] text-[#1c1c19] font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            <span>24x7 Operations Helpline</span>
          </button>

          {/* Profile Card (Moved to Left Navigation Bar at Bottom) */}
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

      {/* ── Main Application Content (Responsive pl-0 lg:pl-64) ── */}
      <div className="w-full pl-0 lg:pl-64 flex flex-col min-h-screen">
        {/* ── Top Header with Management & Core ── */}
        <header className="bg-[#fcf9f4]/95 backdrop-blur-md border-b border-[#ebe8e3] sticky top-0 z-40 px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Active section title with mobile menu toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] flex items-center justify-center cursor-pointer shadow-xs hover:bg-[#f6f3ee]"
              aria-label="Open sidebar navigation"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-[#003527] tracking-tight">
                  {activeTab === 'telemetry' && 'System Core · Telemetry'}
                  {activeTab === 'kyc' && 'Agency KYC Audits'}
                  {activeTab === 'disputes' && 'Dispute Arbitration'}
                  {activeTab === 'financials' && 'Settlements & GMV'}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#fea619]" />
                <span className="text-[11px] text-[#707974] font-medium hidden sm:inline">Kernel v4.2</span>
              </div>
            </div>
          </div>

          {/* Management & Core (Moved to Header as requested) */}
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

          {/* Right Status Pill & Actions (Profile moved to left menu bar!) */}
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
            <KYCTab
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
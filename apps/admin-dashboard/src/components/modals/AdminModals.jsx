import React, { useState } from 'react';

// ─── System Configuration Modal ──────────────────────────────────────────────
export function SystemConfigModal({ open, onClose, showToast }) {
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
export function AdminProfileModal({ open, onClose, showToast, onLogout }) {
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
export function HubsModal({ open, onClose, showToast }) {
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
export function PiiVaultModal({ open, onClose, showToast }) {
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
    a.download = `pii_compliance_dossier_${Date.now()}.json`;
    a.click();
    showToast('📁 Encrypted PII Compliance Dossier exported successfully');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-2xl w-full p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#003527] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">enhanced_encryption</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#003527] text-base">Cryptographic PII Audit Vault</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#fea619]/20 text-[#855300] font-bold text-[10px] border border-[#fea619]/30">AES-256-GCM</span>
              </div>
              <p className="text-[12px] text-[#707974]">DPDP Act 2023 &amp; Aadhaar Cryptographic Redaction Protocol</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
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
export function StreamsModal({ open, onClose, showToast }) {
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
export function PostGisModal({ open, onClose, showToast }) {
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

// ─── Detailed Agency Jobs Done Constant & Modal ──────────────────────────────
export const AGENCY_JOBS = {
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

export function AgencyJobsModal({ agencyName, onClose, showToast }) {
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
      chemical: 'Standard Formulation'
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-3xl w-full p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#003527] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">work_history</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#003527] text-base">{agencyName}</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                  {jobs.length} Verified Records
                </span>
              </div>
              <p className="text-[12px] text-[#707974]">Detailed Jobs Done, Client Locations &amp; Assigned Field Technicians</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Jobs List */}
        <div className="flex flex-col gap-3">
          {jobs.map(job => (
            <div key={job.id} className="p-4 rounded-2xl border border-[#ebe8e3] bg-[#fcf9f4] hover:border-[#003527]/30 transition-all flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-[#003527] text-white text-[10px] font-mono font-bold">
                      {job.id}
                    </span>
                    <h4 className="font-bold text-sm text-[#1c1c19]">{job.title}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${job.statusBg}`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#707974] mt-1 flex items-center gap-2">
                    <span>Client: <strong className="text-[#1c1c19]">{job.customer}</strong></span>
                    <span>·</span>
                    <span>{job.address}</span>
                  </div>
                </div>
              </div>

              {/* Assigned Worker Box */}
              <div className="p-3 bg-white rounded-xl border border-[#ebe8e3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#fea619]/20 text-[#855300] font-black text-xs flex items-center justify-center shrink-0">
                    {job.worker.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#1c1c19]">{job.worker.name}</span>
                      <span className="font-mono text-[10px] bg-[#f0ede9] px-1.5 py-0.5 rounded text-[#003527]">
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

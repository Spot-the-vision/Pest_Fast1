import React, { useState } from 'react';
import PlatformOverview from './pages/PlatformOverview';
import './index.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState('telemetry'); // telemetry, kyc, disputes, financials
  const [toastMessage, setToastMessage] = useState(null);

  // Interactive state for KYC approvals
  const [pendingAgencies, setPendingAgencies] = useState([
    { id: 'AGY-104', name: 'Apex Pest Bangalore', owner: 'Ramesh Naidu', license: 'CIB-KA-2024-419', gstin: '29AABCU9603R1ZM', status: 'Pending Review', city: 'Bangalore' },
    { id: 'AGY-105', name: 'CleanShield NCR', owner: 'Deepak Sharma', license: 'CIB-HR-2023-882', gstin: '06AABCC1234F1Z8', status: 'Pending Review', city: 'Gurgaon' },
  ]);

  // Interactive state for Disputes
  const [disputes, setDisputes] = useState([
    { id: 'DSP-882', client: 'Rohit Verma', agency: 'EcoPest Solutions', issue: 'Termite reappeared in kitchen baseboards after 2 weeks', claim: 'Free Re-treatment', status: 'Open Escalation' },
    { id: 'DSP-884', client: 'Meera Iyer', agency: 'Apex Pest Bangalore', issue: 'Technician arrived 40 mins late due to rain', claim: '₹300 Courtesy Refund', status: 'Pending Review' }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApproveAgency = (id, name) => {
    setPendingAgencies(prev => prev.filter(a => a.id !== id));
    showToast(`✅ Agency ${name} (${id}) KYC Approved & Activated in Platform Registry!`);
  };

  const handleResolveDispute = (id, resolution) => {
    setDisputes(prev => prev.filter(d => d.id !== id));
    showToast(`⚖️ Dispute ${id} Resolved: ${resolution}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface p-4">
        <form onSubmit={() => setIsAuthenticated(true)} className="bg-surface-container-lowest border border-surface-container-high p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[24px]">terminal</span>
            </div>
            <div>
              <h2 className="font-headline font-bold text-base text-primary">Super-Admin Console</h2>
              <p className="text-[11px] text-on-surface-variant">Kernel & Marketplace Control</p>
            </div>
          </div>
          <div className="bg-surface-container-low p-2.5 rounded-xl text-xs text-on-surface-variant">
            Developer / Super-Admin Access Only (Strictly isolated per AGENTS.md)
          </div>
          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">Root Admin Email</label>
            <input defaultValue="admin@pestfast.com" type="email" className="w-full px-3 py-2 text-xs rounded-lg border border-surface-container-high bg-surface-container-low" />
          </div>
          <button type="submit" className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-colors shadow-sm cursor-pointer">
            Access Core Console
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 inset-x-4 max-w-md mx-auto z-50 bg-primary text-on-primary px-4 py-3 rounded-xl shadow-lg flex items-center justify-between text-xs animate-bounce">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-on-primary/70 hover:text-on-primary">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Super-Admin Top Navigation Bar */}
      <header className="bg-surface-container-lowest border-b border-surface-container-high sticky top-0 z-40 px-4 py-2.5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
              <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline font-bold text-sm text-primary tracking-tight">Pest Free Global OS</span>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary text-[10px] font-bold">Kernel v4.2</span>
              </div>
              <p className="text-[10px] text-on-surface-variant">Isolated Super-Admin Console • Multi-Agency Operations</p>
            </div>
          </div>

          {/* Navigation Desks */}
          <div className="flex flex-wrap items-center gap-1.5 bg-surface-container-low p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('telemetry')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'telemetry' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">analytics</span>
              <span>System Core</span>
            </button>

            <button
              onClick={() => setActiveTab('kyc')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'kyc' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
              <span>Agency KYC ({pendingAgencies.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('disputes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'disputes' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">gavel</span>
              <span>Disputes Desk ({disputes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('financials')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'financials' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">payments</span>
              <span>Settlements & GMV</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>APIs 99.98% Healthy</span>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-2.5 py-1 text-xs text-error hover:bg-error-container/40 rounded-lg font-bold transition-colors cursor-pointer"
            >
              Lock Terminal
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1">
        {/* Tab 1: System Telemetry */}
        {activeTab === 'telemetry' && <PlatformOverview />}

        {/* Tab 2: Agency KYC Approvals Desk */}
        {activeTab === 'kyc' && (
          <div className="max-w-6xl mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline font-bold text-lg text-primary">Agency Onboarding & KYC Audit Desk</h2>
                <p className="text-xs text-on-surface-variant">Review Trade Licenses and CIB&RC Chemical Permits before granting agency dispatch rights.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-secondary-container text-on-surface text-xs font-bold">
                {pendingAgencies.length} Applications Awaiting Review
              </span>
            </div>

            {pendingAgencies.length === 0 ? (
              <div className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-12 text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[48px] text-emerald-600 mb-2">task_alt</span>
                <h3 className="font-headline font-bold text-base text-primary">All Agency Applications Vetted!</h3>
                <p className="text-xs mt-1">Zero pending KYC audits in the queue.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingAgencies.map(agency => (
                  <div key={agency.id} className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-surface-container text-primary text-[10px] font-bold">{agency.id}</span>
                        <h3 className="font-headline font-bold text-base text-primary">{agency.name}</h3>
                        <span className="text-xs font-semibold text-on-surface-variant">({agency.city})</span>
                      </div>
                      <p className="text-xs text-on-surface-variant">
                        Managing Director: <strong>{agency.owner}</strong> • GSTIN: <code className="bg-surface-container px-1 py-0.5 rounded text-[11px]">{agency.gstin}</code>
                      </p>
                      <p className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">verified</span>
                        Central Insecticides Board License: {agency.license}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button 
                        onClick={() => showToast(`Audit Report for ${agency.name} generated.`)}
                        className="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs cursor-pointer"
                      >
                        Inspect Dossier
                      </button>
                      <button 
                        onClick={() => handleApproveAgency(agency.id, agency.name)}
                        className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs flex items-center gap-1 shadow-sm cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        Approve Agency
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Disputes Desk */}
        {activeTab === 'disputes' && (
          <div className="max-w-6xl mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline font-bold text-lg text-primary">Customer Dispute & Escalation Desk</h2>
                <p className="text-xs text-on-surface-variant">Manage 90-day warranty claims, pest recurrence reports, and refund requests.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-error-container text-error text-xs font-bold">
                {disputes.length} Active Escalations
              </span>
            </div>

            {disputes.length === 0 ? (
              <div className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-12 text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[48px] text-emerald-600 mb-2">thumb_up</span>
                <h3 className="font-headline font-bold text-base text-primary">Zero Unresolved Disputes!</h3>
                <p className="text-xs mt-1">Platform customer satisfaction score: 99.4% CSAT.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {disputes.map(d => (
                  <div key={d.id} className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-5 shadow-sm space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-full bg-error-container text-error font-bold text-[10px]">{d.id}</span>
                          <span className="font-bold text-xs text-primary">{d.client}</span>
                          <span className="text-outline">vs</span>
                          <span className="font-semibold text-xs text-on-surface">{d.agency}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-1"><strong>Complaint:</strong> {d.issue}</p>
                        <p className="text-xs text-secondary font-semibold mt-0.5">Demanded Remedy: {d.claim}</p>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-error bg-error-container/40 px-2.5 py-1 rounded-full">
                        {d.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container-high">
                      <button 
                        onClick={() => handleResolveDispute(d.id, 'Ordered Free Re-service by Agency under 90-day guarantee')}
                        className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container cursor-pointer"
                      >
                        Enforce Free Re-Treatment
                      </button>
                      <button 
                        onClick={() => handleResolveDispute(d.id, 'Issued 100% Instant Escrow Refund to Customer')}
                        className="px-3 py-1.5 rounded-lg bg-surface-container text-error text-xs font-bold hover:bg-surface-container-high cursor-pointer"
                      >
                        Authorize Refund
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Financial Settlements & GMV */}
        {activeTab === 'financials' && (
          <div className="max-w-6xl mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline font-bold text-lg text-primary">Platform Financials & Take-Rate Settlements</h2>
                <p className="text-xs text-on-surface-variant">Automated 15% Platform Take-Rate accounting and agency settlement batches.</p>
              </div>
              <button 
                onClick={() => showToast('Batch Payout of ₹3,40,000 disbursed via RazorpayX Escrow!')}
                className="px-4 py-2 rounded-xl bg-secondary text-on-primary font-bold text-xs shadow-md hover:bg-secondary/90 transition-colors cursor-pointer"
              >
                Disburse Weekly Payouts (RazorpayX)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-surface-container-lowest border border-surface-container-high p-5 rounded-2xl shadow-sm">
                <p className="text-xs font-bold uppercase text-on-surface-variant">Monthly Gross Merchandise Value (GMV)</p>
                <h3 className="font-headline font-extrabold text-2xl text-primary mt-1">₹14,82,500</h3>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ +18.4% vs last month</p>
              </div>

              <div className="bg-surface-container-lowest border border-surface-container-high p-5 rounded-2xl shadow-sm">
                <p className="text-xs font-bold uppercase text-on-surface-variant">Platform Take-Rate (15% Net)</p>
                <h3 className="font-headline font-extrabold text-2xl text-primary mt-1">₹2,22,375</h3>
                <p className="text-[11px] text-on-surface-variant mt-1">Direct Platform Revenue</p>
              </div>

              <div className="bg-surface-container-lowest border border-surface-container-high p-5 rounded-2xl shadow-sm">
                <p className="text-xs font-bold uppercase text-on-surface-variant">Agency Net Settlements</p>
                <h3 className="font-headline font-extrabold text-2xl text-primary mt-1">₹12,60,125</h3>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">98.2% Auto-Disbursed</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
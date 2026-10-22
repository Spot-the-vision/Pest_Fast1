import React from 'react';

// ─── Agency Module (KYC Audits & Approved Agencies Inline) ────────────────────
export default function KycTab({
  pendingAgencies,
  setPendingAgencies,
  approvedAgencies,
  setApprovedAgencies,
  showToast,
  selectedDossier,
  setSelectedDossier,
  onSelectAgency
}) {
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

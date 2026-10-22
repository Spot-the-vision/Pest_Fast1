import React from 'react';

// ─── Worker KYC Dossier Modal ─────────────────────────────────────────────────
export function WorkerKycDossierModal({ selectedKycDossier, onClose, onApprove, onReject }) {
  if (!selectedKycDossier) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#ebe8e3] p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between gap-3 border-b border-[#ebe8e3] pb-3">
          <div className="flex items-center gap-3">
            <img src={selectedKycDossier.avatar} alt={selectedKycDossier.name} className="w-12 h-12 rounded-2xl object-cover border border-[#ebe8e3]" />
            <div>
              <h3 className="font-black text-[#003527] text-base">{selectedKycDossier.name}</h3>
              <p className="text-[12px] text-[#707974]">Worker Dossier ID: <span className="font-mono font-bold text-[#003527]">{selectedKycDossier.id}</span></p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#707974] hover:text-[#1c1c19] transition-colors cursor-pointer">
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
            onClick={() => onReject(selectedKycDossier.id, selectedKycDossier.name)}
            className="px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 font-bold text-xs hover:bg-red-100 transition-all cursor-pointer"
          >
            Reject Application
          </button>
          <button
            type="button"
            onClick={() => onApprove(selectedKycDossier)}
            className="flex-1 py-2.5 rounded-xl bg-[#003527] text-white font-bold text-xs hover:bg-[#064e3b] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Approve &amp; Deploy to Fleet
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Client History Modal ─────────────────────────────────────────────────────
export function ClientHistoryModal({ selectedClient, onClose, showToast }) {
  if (!selectedClient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={e => e.target === e.currentTarget && onClose()}>
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
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#707974] hover:text-[#1c1c19] transition-colors cursor-pointer">
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
          <button type="button" onClick={() => { showToast(`Warranty renewal scheduled for ${selectedClient.name}`, 'success'); onClose(); }} className="flex-1 py-2.5 rounded-xl bg-[#003527] text-white font-bold text-xs sm:text-sm hover:bg-[#064e3b] transition-all cursor-pointer shadow-xs">
            Schedule Renewal
          </button>
          <button type="button" onClick={() => { showToast(`Audit Certificate PDF generated for ${selectedClient.name}`, 'success'); onClose(); }} className="flex-1 py-2.5 rounded-xl bg-white border border-[#ebe8e3] text-[#003527] font-bold text-xs sm:text-sm hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs">
            Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
}

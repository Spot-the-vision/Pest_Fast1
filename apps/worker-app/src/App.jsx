import React, { useState } from 'react';

export default function App() {
  const [dutyStatus, setDutyStatus] = useState('ON_DUTY'); // ON_DUTY, ON_JOB, OFF_DUTY
  const [agencyUnlocked, setAgencyUnlocked] = useState(false); // Domain rule: agency 2nd approval
  const [activeTab, setActiveTab] = useState('job'); // 'job', 'route', 'earnings', 'safety'
  const [checklist, setChecklist] = useState({
    ppe: true,
    inspection: true,
    evacuation: false,
    chemicalMix: false,
    sprayBarrier: false,
    photoBefore: true,
    photoAfter: false,
    signOff: false
  });
  const [showSosModal, setShowSosModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleCheck = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedSteps = Object.values(checklist).filter(Boolean).length;
  const totalSteps = Object.keys(checklist).length;
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="bg-surface min-h-screen text-on-surface font-body flex flex-col max-w-md mx-auto shadow-2xl relative pb-20">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-4 inset-x-4 max-w-sm mx-auto z-50 bg-primary text-on-primary px-4 py-3 rounded-xl shadow-lg flex items-center justify-between text-sm animate-bounce">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-on-primary/70 hover:text-on-primary">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Top Professional Header */}
      <header className="bg-surface-container-lowest border-b border-surface-container-high px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-bold text-lg shadow-sm">
              VR
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-headline font-bold text-sm text-primary">Vikram Rathore</h1>
                <span className="material-symbols-outlined text-[15px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-on-surface-variant">
                <span className="font-medium">EcoPest Solutions</span>
                <span>•</span>
                <span className="text-secondary font-semibold">#CHL-2024-889</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowSosModal(true)} 
            className="w-9 h-9 rounded-full bg-error-container text-error flex items-center justify-center hover:bg-error hover:text-on-error transition-colors shadow-sm cursor-pointer"
            title="Emergency Chemical Spill / Safety SOS"
          >
            <span className="material-symbols-outlined text-[20px]">e911_emergency</span>
          </button>
        </div>

        {/* Tactile Duty Status Bar */}
        <div className="mt-3 grid grid-cols-3 gap-1.5 bg-surface-container-low p-1 rounded-xl">
          <button 
            onClick={() => { setDutyStatus('ON_DUTY'); showToast('Status: Available for Dispatches'); }}
            className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${dutyStatus === 'ON_DUTY' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>On Duty</span>
          </button>
          <button 
            onClick={() => { setDutyStatus('ON_JOB'); showToast('Status: In Active Treatment'); }}
            className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${dutyStatus === 'ON_JOB' ? 'bg-secondary-container text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>On Job</span>
          </button>
          <button 
            onClick={() => { setDutyStatus('OFF_DUTY'); showToast('Status: Off Duty / Offline'); }}
            className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${dutyStatus === 'OFF_DUTY' ? 'bg-surface-container-highest text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span>Off Duty</span>
          </button>
        </div>
      </header>

      {/* Main Tab Views */}
      <main className="p-4 flex-1 overflow-y-auto space-y-4">
        {activeTab === 'job' && (
          <>
            {/* Domain Security Banner: Masked vs Unmasked Contact Notice */}
            <div className="bg-surface-container-low border border-primary/20 rounded-2xl p-3.5 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-primary">security</span>
                  <span className="font-headline font-bold text-xs uppercase tracking-wide text-primary">
                    AGENTS.md Privacy Protocol
                  </span>
                </div>
                <button 
                  onClick={() => {
                    setAgencyUnlocked(!agencyUnlocked);
                    showToast(agencyUnlocked ? 'Contact reverted to Masked VoIP Proxy' : 'Agency 2nd Approval Granted: Exact Address & Direct Mobile Unlocked!');
                  }}
                  className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                >
                  {agencyUnlocked ? 'Lock Contact' : 'Simulate 2nd Approval'}
                </button>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-1.5 leading-relaxed">
                {agencyUnlocked 
                  ? '✅ Agency owner granted Stage-2 Dispatch Approval. Direct customer phone and destination coordinates are active.'
                  : '🔒 Stage-1 Active: Contact is masked via VoIP proxy and exact address is locked until agency grants en-route approval.'}
              </p>
            </div>

            {/* Current Active Assignment Card */}
            <div className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-4 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary font-bold text-xs">
                  #JOB-7491 • Priority Dispatch
                </span>
                <span className="text-xs font-semibold text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">schedule</span>
                  2:00 PM Slot
                </span>
              </div>

              <h2 className="font-headline font-bold text-base text-primary mb-1">
                Subterranean Termite Dual-Barrier Eradication
              </h2>
              <p className="text-xs text-on-surface-variant mb-4">
                Residential 3 BHK • Pre-Treatment Perimeter & Woodwork Drill Injection
              </p>

              {/* Customer & Location Card */}
              <div className="bg-surface-container-low rounded-xl p-3 space-y-2.5 mb-4 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">person</span>
                    <span className="font-bold">
                      {agencyUnlocked ? 'Johnathan Doe' : 'John D. (Masked Profile)'}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
                    {agencyUnlocked ? 'Direct Client' : 'Protected ID'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                    <span>
                      {agencyUnlocked ? '+91 98765 43210' : '+91 80 4912 3456 (Ext 81)'}
                    </span>
                  </div>
                  <a 
                    href={agencyUnlocked ? 'tel:+919876543210' : 'tel:+918049123456'} 
                    className="px-2.5 py-1 rounded-lg bg-primary text-on-primary font-semibold text-[11px] flex items-center gap-1 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[14px]">call</span>
                    Call
                  </a>
                </div>

                <div className="flex items-start justify-between pt-1 border-t border-surface-container-high/60">
                  <div className="flex items-start gap-2 flex-1 pr-2">
                    <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">location_on</span>
                    <div>
                      <p className="font-medium">
                        {agencyUnlocked 
                          ? 'Villa #14, Orchid Petals, Sector 48, Gurgaon' 
                          : 'Sector 48, Gurgaon (Approximate Zone)'}
                      </p>
                      {!agencyUnlocked && (
                        <p className="text-[10px] text-error font-medium mt-0.5">
                          Exact gate code & unit locked by agency security gate.
                        </p>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (!agencyUnlocked) {
                        showToast('Exact coordinates locked. Simulating 2nd approval...');
                        setAgencyUnlocked(true);
                      } else {
                        showToast('Opening turn-by-turn navigation in GPS...');
                      }
                    }}
                    className="px-2.5 py-1 rounded-lg bg-secondary text-on-primary font-semibold text-[11px] flex items-center gap-1 shadow-sm shrink-0 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">navigation</span>
                    {agencyUnlocked ? 'Navigate' : 'Request Unlock'}
                  </button>
                </div>
              </div>

              {/* Chemical Formulation & Kit Telemetry */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-surface-container-low p-2.5 rounded-xl border border-surface-container">
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant">Active Chemical</p>
                  <p className="font-bold text-xs text-primary mt-0.5">Deltamethrin 2.5% EC</p>
                  <p className="text-[10px] text-secondary font-medium mt-0.5">Batch #CIB-9921</p>
                </div>
                <div className="bg-surface-container-low p-2.5 rounded-xl border border-surface-container">
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant">Technician Payout</p>
                  <p className="font-bold text-xs text-primary mt-0.5">₹600.00</p>
                  <p className="text-[10px] text-emerald-600 font-medium mt-0.5">+ ₹50 Tip Potential</p>
                </div>
              </div>

              {/* Safety & Execution Checklist */}
              <div className="border-t border-surface-container-high pt-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-headline font-bold text-xs text-primary uppercase tracking-wide">
                    Safety & Protocol Steps ({completedSteps}/{totalSteps})
                  </h3>
                  <span className="font-bold text-xs text-primary">{progressPercent}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden mb-3">
                  <div 
                    className="h-full bg-primary transition-all duration-300" 
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                <div className="space-y-2 text-xs">
                  {[
                    { id: 'ppe', label: '1. Don Organic Vapor Respirator & Nitrile Gloves' },
                    { id: 'inspection', label: '2. Perform Thermal Moisture & Crevice Scan' },
                    { id: 'evacuation', label: '3. Confirm Pets & Children Evacuated from Zone' },
                    { id: 'chemicalMix', label: '4. Calibrate Formulation (50ml/m² Barrier)' },
                    { id: 'sprayBarrier', label: '5. Apply Injection & Cold Fogging Barrier' },
                    { id: 'photoBefore', label: '6. Capture Pre-Treatment Infestation Evidence' },
                    { id: 'photoAfter', label: '7. Capture Post-Treatment Verification Proof' },
                    { id: 'signOff', label: '8. Customer Digital Sign-off / OTP Verification' }
                  ].map(step => (
                    <label 
                      key={step.id} 
                      className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-container-low/60 hover:bg-surface-container-low cursor-pointer transition-colors"
                    >
                      <input 
                        type="checkbox" 
                        checked={checklist[step.id]} 
                        onChange={() => toggleCheck(step.id)}
                        className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                      />
                      <span className={`flex-1 text-[11px] ${checklist[step.id] ? 'line-through text-on-surface-variant font-normal' : 'font-medium text-on-surface'}`}>
                        {step.label}
                      </span>
                      {checklist[step.id] && (
                        <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Photo Evidence Dropzone */}
              <div className="mt-4 border-t border-surface-container-high pt-3">
                <h4 className="font-headline font-bold text-xs text-primary mb-2">Photographic Compliance Proof</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="border border-dashed border-primary/40 bg-surface-container-low p-3 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-colors">
                    <span className="material-symbols-outlined text-[24px] text-primary mb-1">camera_alt</span>
                    <span className="text-[11px] font-bold text-primary">Before Evidence</span>
                    <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">✓ Captured (1 Photo)</span>
                  </div>
                  <div 
                    onClick={() => {
                      toggleCheck('photoAfter');
                      showToast('Post-Treatment Photo Proof Attached!');
                    }}
                    className="border border-dashed border-secondary/50 bg-secondary-container/10 p-3 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-secondary-container/20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[24px] text-secondary mb-1">add_a_photo</span>
                    <span className="text-[11px] font-bold text-secondary">After Proof</span>
                    <span className="text-[10px] text-on-surface-variant mt-0.5">
                      {checklist.photoAfter ? '✓ Captured (1 Photo)' : 'Tap to Capture Proof'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Completion Button */}
              <button 
                onClick={() => {
                  if (progressPercent < 75) {
                    showToast('Please complete mandatory checklist items first!');
                  } else {
                    showToast('Job #JOB-7491 Completed! ₹600 credited to payout wallet.');
                  }
                }}
                className="w-full mt-4 py-3 bg-primary text-on-primary rounded-xl font-headline font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-primary-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">task_alt</span>
                Complete Treatment & Submit Proof
              </button>
            </div>
          </>
        )}

        {/* Tab 2: Today Route Schedule */}
        {activeTab === 'route' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-headline font-bold text-sm text-primary">Today's Route Schedule</h2>
              <span className="text-xs text-on-surface-variant">3 Stops • 14.8 km total</span>
            </div>

            {[
              { id: 'JOB-7489', time: '09:30 AM', title: 'Cockroach Odorless Gel Barrier', loc: 'Indiranagar 100ft Rd', payout: '₹450', status: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
              { id: 'JOB-7491', time: '02:00 PM', title: 'Subterranean Termite Treatment', loc: 'Sector 48, Gurgaon', payout: '₹600', status: 'In Progress', color: 'bg-amber-100 text-amber-800' },
              { id: 'JOB-7494', time: '05:30 PM', title: 'Rodent Bait Station Inspection', loc: 'Cyber Hub Phase 2', payout: '₹350', status: 'Upcoming', color: 'bg-slate-100 text-slate-800' }
            ].map(item => (
              <div key={item.id} className="bg-surface-container-lowest border border-surface-container-high p-3.5 rounded-xl shadow-sm flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.color}`}>
                      {item.status}
                    </span>
                    <span className="text-xs font-semibold text-on-surface-variant">{item.time}</span>
                  </div>
                  <h4 className="font-headline font-bold text-xs text-primary">{item.title}</h4>
                  <p className="text-[11px] text-on-surface-variant mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">location_on</span>
                    {item.loc}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm text-primary">{item.payout}</span>
                  <p className="text-[10px] text-on-surface-variant">Net Payout</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Earnings & Wallet */}
        {activeTab === 'earnings' && (
          <div className="space-y-4">
            <div className="bg-primary text-on-primary p-5 rounded-2xl shadow-md">
              <p className="text-xs uppercase font-medium text-on-primary/80">Today's Accumulated Payout</p>
              <h2 className="font-headline font-extrabold text-3xl mt-1">₹1,400.00</h2>
              <div className="mt-3 pt-3 border-t border-on-primary/20 flex items-center justify-between text-xs">
                <span>This Week: <strong>₹8,750</strong></span>
                <span>Safety Bonus: <strong>+₹500</strong></span>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-surface-container-high rounded-xl p-4 shadow-sm">
              <h3 className="font-headline font-bold text-xs text-primary uppercase mb-3">Direct Bank Transfer Status</h3>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-on-surface-variant">Linked UPI ID</span>
                <span className="font-semibold">vikram.rathore@okhdfcbank</span>
              </div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-on-surface-variant">Payout Frequency</span>
                <span className="font-semibold text-emerald-600">Daily 08:00 PM Auto-Settlement</span>
              </div>
              <button 
                onClick={() => showToast('Withdrawal request initiated for ₹1,400 via IMPS.')}
                className="w-full py-2 bg-secondary text-on-primary rounded-lg text-xs font-bold shadow-sm hover:bg-secondary/90 transition-colors cursor-pointer"
              >
                Instant Payout Request (IMPS)
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Safety Protocols */}
        {activeTab === 'safety' && (
          <div className="space-y-3">
            <h2 className="font-headline font-bold text-sm text-primary">Chemical Safety & Compliance Docs</h2>
            <div className="bg-surface-container-lowest border border-surface-container-high rounded-xl p-3.5 shadow-sm space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-primary">description</span>
                  <div>
                    <p className="font-bold">Deltamethrin 2.5% EC CSDS</p>
                    <p className="text-[10px] text-on-surface-variant">Chemical Safety Data Sheet • Rev 2024</p>
                  </div>
                </div>
                <button 
                  onClick={() => showToast('Downloading Safety Data Sheet PDF...')}
                  className="px-2 py-1 rounded bg-surface-container text-primary font-bold text-[11px] cursor-pointer"
                >
                  View
                </button>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-secondary">shield</span>
                  <div>
                    <p className="font-bold">Antidote Guide: Atropine Protocol</p>
                    <p className="text-[10px] text-on-surface-variant">Field Exposure Emergency Procedure</p>
                  </div>
                </div>
                <button 
                  onClick={() => showToast('Emergency Antidote Protocol Opened')}
                  className="px-2 py-1 rounded bg-error-container text-error font-bold text-[11px] cursor-pointer"
                >
                  Emergency
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Emergency SOS Modal */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-error">
            <div className="w-12 h-12 rounded-full bg-error-container text-error flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[28px]">warning</span>
            </div>
            <h3 className="font-headline font-bold text-center text-lg text-error mb-1">Field Emergency Helpline</h3>
            <p className="text-center text-xs text-on-surface-variant mb-4 leading-relaxed">
              For accidental pesticide splash, inhalation distress, or on-site physical confrontation.
            </p>
            <div className="space-y-2">
              <a 
                href="tel:1800112233" 
                className="w-full py-2.5 bg-error text-on-error rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                National Poison Info Centre (1800-11-2233)
              </a>
              <a 
                href="tel:+918049120000" 
                className="w-full py-2.5 bg-surface-container text-primary rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">support_agent</span>
                EcoPest Agency Dispatch Emergency Desk
              </a>
              <button 
                onClick={() => setShowSosModal(false)}
                className="w-full py-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Cancel / Return to Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Mobile Navigation */}
      <nav className="fixed bottom-0 inset-x-0 max-w-md mx-auto bg-surface-container-lowest border-t border-surface-container-high py-2 px-3 flex items-center justify-around z-40">
        <button 
          onClick={() => setActiveTab('job')}
          className={`flex flex-col items-center gap-0.5 text-xs transition-colors cursor-pointer ${activeTab === 'job' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
        >
          <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: activeTab === 'job' ? "'FILL' 1" : "'FILL' 0" }}>assignment</span>
          <span className="text-[10px]">Active Job</span>
        </button>
        <button 
          onClick={() => setActiveTab('route')}
          className={`flex flex-col items-center gap-0.5 text-xs transition-colors cursor-pointer ${activeTab === 'route' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
        >
          <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: activeTab === 'route' ? "'FILL' 1" : "'FILL' 0" }}>route</span>
          <span className="text-[10px]">Route</span>
        </button>
        <button 
          onClick={() => setActiveTab('earnings')}
          className={`flex flex-col items-center gap-0.5 text-xs transition-colors cursor-pointer ${activeTab === 'earnings' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
        >
          <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: activeTab === 'earnings' ? "'FILL' 1" : "'FILL' 0" }}>payments</span>
          <span className="text-[10px]">Earnings</span>
        </button>
        <button 
          onClick={() => setActiveTab('safety')}
          className={`flex flex-col items-center gap-0.5 text-xs transition-colors cursor-pointer ${activeTab === 'safety' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
        >
          <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: activeTab === 'safety' ? "'FILL' 1" : "'FILL' 0" }}>health_and_safety</span>
          <span className="text-[10px]">Safety</span>
        </button>
      </nav>
    </div>
  );
}
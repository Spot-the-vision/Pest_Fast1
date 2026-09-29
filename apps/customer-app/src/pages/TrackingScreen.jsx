import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrackingScreen() {
  const navigate = useNavigate();

  // State
  const [etaMinutes, setEtaMinutes] = useState(14);
  const [distanceKm, setDistanceKm] = useState(2.8);
  const [currentStep, setCurrentStep] = useState(3); // 1: Booked, 2: Approved, 3: En Route, 4: Treating, 5: Completed
  const [showCsdsModal, setShowCsdsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [callInitiated, setCallInitiated] = useState(false);

  // Live simulation tick
  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMinutes(prev => (prev > 1 ? prev - 1 : 1));
      setDistanceKm(prev => (prev > 0.3 ? parseFloat((prev - 0.2).toFixed(1)) : 0.3));
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-surface-container-high px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/')} 
              className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-primary cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div>
              <h1 className="font-headline font-bold text-sm text-primary">Live Technician Dispatch</h1>
              <p className="text-[11px] text-on-surface-variant">Booking #JOB-7491 • EcoPest Solutions</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed text-primary text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              En Route
            </span>
          </div>
        </div>
      </header>

      {/* Main Tracking Content */}
      <main className="max-w-3xl mx-auto px-4 pt-4 space-y-5">
        {/* Dynamic Simulated Map Widget */}
        <section className="bg-surface-container-lowest border border-surface-container-high rounded-2xl overflow-hidden shadow-sm relative">
          <div className="h-56 bg-slate-100 relative flex items-center justify-center overflow-hidden">
            {/* Map Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(#003527 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px'
              }}
            ></div>

            {/* Simulated Road Route Vector */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M 60 160 Q 180 80, 280 130 T 480 90" 
                fill="none" 
                stroke="#064e3b" 
                strokeWidth="4" 
                strokeDasharray="8,8"
                className="animate-pulse"
              />
            </svg>

            {/* Destination Pin */}
            <div className="absolute right-12 top-14 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-secondary text-on-primary flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[18px]">home</span>
              </div>
              <span className="text-[10px] font-bold bg-surface px-2 py-0.5 rounded shadow-xs mt-1 text-primary">
                Your Villa
              </span>
            </div>

            {/* Moving Technician Marker */}
            <div className="absolute left-20 bottom-14 flex flex-col items-center animate-bounce">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg border-2 border-primary-fixed">
                <span className="material-symbols-outlined text-[20px]">two_wheeler</span>
              </div>
              <span className="text-[10px] font-bold bg-primary text-on-primary px-2 py-0.5 rounded-full shadow-xs mt-1">
                Vikram (Tech)
              </span>
            </div>

            {/* Floating Live Telemetry Badge */}
            <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-surface-container-high shadow-sm text-xs flex items-center gap-3">
              <div className="flex items-center gap-1 font-bold text-primary">
                <span className="material-symbols-outlined text-[16px] text-secondary">speed</span>
                <span>28 km/h</span>
              </div>
              <span className="text-outline">|</span>
              <div className="text-on-surface-variant font-medium">
                Sector 48 Approach
              </div>
            </div>
          </div>

          {/* ETA & Distance Hero Strip */}
          <div className="p-4 bg-surface-container-low flex items-center justify-between border-t border-surface-container-high">
            <div>
              <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Estimated Arrival</p>
              <h2 className="font-headline font-extrabold text-2xl text-primary mt-0.5">
                {etaMinutes} Minutes <span className="text-xs font-normal text-on-surface-variant">({distanceKm} km away)</span>
              </h2>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setCallInitiated(true)}
                className="px-3 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-primary-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>Call Tech</span>
              </button>
            </div>
          </div>
        </section>

        {/* Technician Profile Card with AGENTS.md Privacy Protection */}
        <section className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-bold text-lg shadow-sm">
                VR
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-headline font-bold text-sm text-primary">Vikram Rathore</h3>
                  <span className="material-symbols-outlined text-[15px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Master Chemical Applicator • <span className="font-semibold text-secondary">★ 4.95 (420+ services)</span>
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px] font-bold">
                Bio-Safety Verified
              </span>
            </div>
          </div>

          {/* Privacy Notice Banner (AGENTS.md) */}
          <div className="bg-surface-container-low rounded-xl p-2.5 text-xs text-on-surface-variant flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[17px]">lock</span>
              <span className="text-[11px]">Protected VoIP Proxy Connection: Your personal phone number is encrypted.</span>
            </div>
            <span className="text-[10px] font-bold text-primary shrink-0">Secured</span>
          </div>

          {/* Safety & Protocol Certifications */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
            <div className="bg-surface-container-low p-2 rounded-lg">
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">masks</span>
              <p className="font-semibold text-[10px] mt-0.5">Full PPE Kit</p>
            </div>
            <div className="bg-surface-container-low p-2 rounded-lg">
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
              <p className="font-semibold text-[10px] mt-0.5">KYC Verified</p>
            </div>
            <div className="bg-surface-container-low p-2 rounded-lg">
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">sanitizer</span>
              <p className="font-semibold text-[10px] mt-0.5">Kit Sanitized</p>
            </div>
          </div>
        </section>

        {/* Multi-Step Service Progression Timeline */}
        <section className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="font-headline font-bold text-xs uppercase tracking-wider text-primary">Service Progress Milestones</h3>
          
          <div className="space-y-4 text-xs relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high">
            {[
              { step: 1, title: 'Booking Request Placed', time: '10:15 AM', done: true, desc: 'Subterranean Termite Dual-Barrier Tier selected' },
              { step: 2, title: 'Agency Approved & Tech Assigned', time: '10:18 AM', done: true, desc: 'EcoPest Operations assigned Vikram Rathore' },
              { step: 3, title: 'Technician En Route', time: '10:25 AM', done: true, current: true, desc: 'Traveling via Subhash Marg • ETA ~14 mins' },
              { step: 4, title: 'On-Site Inspection & Evacuation Check', time: 'Pending', done: false, desc: 'Thermal crevice scan & pet perimeter evacuation' },
              { step: 5, title: 'Barrier Application & 90-Day Guarantee', time: 'Pending', done: false, desc: 'Odorless micro-encapsulated spray & digital sign-off' },
            ].map(item => (
              <div key={item.step} className="relative">
                <span 
                  className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    item.done 
                      ? 'bg-primary text-on-primary' 
                      : 'bg-surface-container-high text-on-surface-variant'
                  } ${item.current ? 'ring-4 ring-primary/20' : ''}`}
                >
                  {item.done ? '✓' : item.step}
                </span>
                <div className="flex items-center justify-between">
                  <h4 className={`font-headline font-bold ${item.done ? 'text-primary' : 'text-on-surface-variant'}`}>
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-on-surface-variant font-medium">{item.time}</span>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Chemical Safety & CSDS Action */}
        <section className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">health_and_safety</span>
            </div>
            <div>
              <h4 className="font-headline font-bold text-xs text-primary">Chemical Safety Data Sheet (CSDS)</h4>
              <p className="text-[11px] text-on-surface-variant">Deltamethrin 2.5% EC • 100% Odorless & Safe</p>
            </div>
          </div>
          <button 
            onClick={() => setShowCsdsModal(true)}
            className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs transition-colors cursor-pointer"
          >
            View CSDS
          </button>
        </section>

        {/* Need Help or Cancel */}
        <div className="flex items-center justify-between text-xs px-2 pt-2 text-on-surface-variant">
          <button 
            onClick={() => setShowCancelModal(true)}
            className="text-error hover:underline font-semibold cursor-pointer"
          >
            Cancel / Reschedule Visit
          </button>
          <a href="tel:1800PESTFAST" className="hover:underline font-semibold text-primary">
            Call Agency Support (1800-PEST-FAST)
          </a>
        </div>
      </main>

      {/* Masked Call Virtual Proxy Simulation Modal */}
      {callInitiated && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-primary/20 text-center">
            <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center mx-auto mb-3 animate-pulse">
              <span className="material-symbols-outlined text-[24px]">phone_in_talk</span>
            </div>
            <h3 className="font-headline font-bold text-base text-primary mb-1">Connecting Virtual Proxy</h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Dialing technician Vikram Rathore via private bridge number <strong>+91 80 4912 3456</strong>...
            </p>
            <button 
              onClick={() => setCallInitiated(false)}
              className="w-full py-2 bg-error text-on-error rounded-xl font-bold text-xs cursor-pointer"
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {/* CSDS Modal */}
      {showCsdsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-md w-full p-5 shadow-2xl border border-primary/20 space-y-3">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
              <h3 className="font-headline font-bold text-sm text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Toxicological Safety Certificate
              </h3>
              <button onClick={() => setShowCsdsModal(false)} className="text-on-surface-variant hover:text-on-surface cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="space-y-2 text-xs text-on-surface-variant leading-relaxed">
              <p><strong>Formulation:</strong> Micro-Encapsulated Deltamethrin 2.5% EC (Suspension Concentrate)</p>
              <p><strong>CIB&RC Permit:</strong> #CIB-2023-8821 / Environmental Class III</p>
              <p><strong>Safety Precautions:</strong> Re-entry allowed after 90 minutes. Kitchen utensils and food prep surfaces require zero evacuation when targeted gel matrix is applied.</p>
              <p><strong>Antidote:</strong> Symptomatic relief / Antihistamines. Atropine not required.</p>
            </div>
            <button 
              onClick={() => setShowCsdsModal(false)}
              className="w-full py-2 bg-primary text-on-primary rounded-xl font-bold text-xs cursor-pointer"
            >
              Close Safety Sheet
            </button>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-error text-center">
            <h3 className="font-headline font-bold text-base text-error mb-2">Cancel Service Visit?</h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Technician is currently en-route (14 mins away). You can reschedule for a later slot today at zero penalty.
            </p>
            <div className="space-y-2">
              <button 
                onClick={() => {
                  alert('Visit rescheduled to 05:00 PM slot today.');
                  setShowCancelModal(false);
                }}
                className="w-full py-2 bg-secondary text-on-primary rounded-xl font-bold text-xs cursor-pointer"
              >
                Reschedule to Evening Slot (Free)
              </button>
              <button 
                onClick={() => {
                  alert('Booking cancelled. 100% refund initiated to source.');
                  setShowCancelModal(false);
                  navigate('/');
                }}
                className="w-full py-2 bg-surface-container text-error rounded-xl font-bold text-xs cursor-pointer"
              >
                Confirm Cancellation
              </button>
              <button 
                onClick={() => setShowCancelModal(false)}
                className="w-full py-1 text-xs text-on-surface-variant font-medium cursor-pointer"
              >
                Keep Active Visit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
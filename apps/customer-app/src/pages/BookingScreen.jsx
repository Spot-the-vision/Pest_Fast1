import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingScreen() {
  const navigate = useNavigate();

  // State
  const [selectedPest, setSelectedPest] = useState('termites');
  const [propertySize, setPropertySize] = useState('3bhk');
  const [selectedTier, setSelectedTier] = useState('intensive');
  const [selectedDate, setSelectedDate] = useState('today');
  const [selectedSlot, setSelectedSlot] = useState('afternoon');
  const [address, setAddress] = useState('Villa #14, Orchid Petals, Sector 48, Gurgaon');
  const [notes, setNotes] = useState('Infestation noticed near kitchen cabinets and wooden door frames.');
  const [promoCode, setPromoCode] = useState('PESTFREE150');
  const [promoApplied, setPromoApplied] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [showWarrantyModal, setShowWarrantyModal] = useState(false);

  // Pricing Matrix
  const pestRates = {
    termites: { name: 'Subterranean Termites', base: 1499, icon: 'pest_control' },
    cockroaches: { name: 'Cockroaches & Ants', base: 899, icon: 'bug_report' },
    bedbugs: { name: 'Bedbug Heat & Steam', base: 1899, icon: 'bed' },
    rodents: { name: 'Rodent Bait Stations', base: 1199, icon: 'pets' },
    mosquitoes: { name: 'Mosquito Thermal Fog', base: 799, icon: 'air' },
    sanitization: { name: 'Complete Bio-Sanitization', base: 1299, icon: 'cleaning_services' }
  };

  const sizeMultiplier = {
    '1bhk': 0.8,
    '2bhk': 1.0,
    '3bhk': 1.25,
    '4bhk': 1.6,
    'commercial': 2.2
  };

  const tierMultipliers = {
    standard: { name: 'Eco-Herbal Standard', mult: 1.0, warranty: '30-Day Re-Service Warranty', desc: 'Odorless herbal spray for mild infestations' },
    intensive: { name: 'Intensive Dual-Layer Barrier', mult: 1.45, warranty: '90-Day Guarantee + Free Re-visit', desc: 'Thermal injection + Bayer gel matrix (Most Popular)' },
    annual: { name: 'Annual 360° Shield (4 Visits)', mult: 2.8, warranty: '365-Day Unlimited Warranty', desc: 'Quarterly visits + free emergency callouts anytime' }
  };

  const calculatedBase = Math.round(pestRates[selectedPest].base * sizeMultiplier[propertySize] * tierMultipliers[selectedTier].mult);
  const discount = promoApplied ? 150 : 0;
  const gst = Math.round((calculatedBase - discount) * 0.18);
  const totalAmount = (calculatedBase - discount) + gst;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/tracking');
    }, 900);
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen pb-28">
      {/* Top Professional Sticky Header */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-surface-container-high px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
              <span className="material-symbols-outlined text-[22px]">nature_people</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-headline font-bold text-base text-primary tracking-tight">Pest Free</span>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary text-[10px] font-bold">Official</span>
              </div>
              <p className="text-[11px] text-on-surface-variant flex items-center gap-1">
                <span>EcoPest Solutions</span>
                <span>•</span>
                <span className="text-secondary font-semibold">★ 4.9 (318 reviews)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowWarrantyModal(true)}
              className="px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span className="hidden sm:inline">My Warranty</span>
            </button>
            <button 
              onClick={() => setShowSosModal(true)}
              className="w-9 h-9 rounded-full bg-error-container text-error flex items-center justify-center hover:bg-error hover:text-on-error transition-colors shadow-sm cursor-pointer"
              title="Emergency Pest SOS Hotline"
            >
              <span className="material-symbols-outlined text-[19px]">e911_emergency</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-3xl mx-auto px-4 pt-4 space-y-6">
        {/* Agency Reassurance Banner */}
        <section className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-headline font-bold text-xs uppercase tracking-wider text-primary">Live Dispatch Hub Active</span>
              </div>
              <h1 className="font-headline font-bold text-lg text-primary mt-1">
                Book Bio-Certified Pest Eradication
              </h1>
              <p className="text-xs text-on-surface-variant mt-0.5">
                CIB&RC Government Approved Chemicals • Child & Pet Safe • 100% Odorless
              </p>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-xl border border-surface-container">
              <span className="material-symbols-outlined text-secondary text-[24px]">bolt</span>
              <div>
                <p className="font-bold text-xs text-primary">Express 2-Hr Dispatch</p>
                <p className="text-[10px] text-on-surface-variant">Available in Gurgaon & NCR</p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 1: Select Pest Infestation */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="font-headline font-bold text-sm text-primary flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center">1</span>
              Select Pest Problem
            </h2>
            <span className="text-[11px] text-on-surface-variant">Tap to inspect pricing</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {Object.entries(pestRates).map(([key, data]) => {
              const isSelected = selectedPest === key;
              return (
                <div
                  key={key}
                  onClick={() => setSelectedPest(key)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-primary text-on-primary border-primary shadow-md scale-[1.01]' 
                      : 'bg-surface-container-lowest border-surface-container-high hover:border-primary/40 text-on-surface'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`material-symbols-outlined text-[24px] ${isSelected ? 'text-primary-fixed' : 'text-primary'}`}>
                      {data.icon}
                    </span>
                    {isSelected && (
                      <span className="material-symbols-outlined text-[16px] text-primary-fixed">check_circle</span>
                    )}
                  </div>
                  <h3 className="font-headline font-bold text-xs leading-tight">{data.name}</h3>
                  <p className={`text-[11px] mt-1 font-semibold ${isSelected ? 'text-on-primary/80' : 'text-secondary'}`}>
                    Starts ₹{data.base}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Step 2: Property Size */}
        <section className="space-y-2.5">
          <h2 className="font-headline font-bold text-sm text-primary flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center">2</span>
            Property Dimensions
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {[
              { id: '1bhk', label: '1 BHK / Studio', sqft: '<600 sq ft' },
              { id: '2bhk', label: '2 BHK Flat', sqft: '600-1100 sq ft' },
              { id: '3bhk', label: '3 BHK Flat', sqft: '1100-1600 sq ft' },
              { id: '4bhk', label: 'Villa / 4+ BHK', sqft: '1600-2500 sq ft' },
              { id: 'commercial', label: 'Commercial Office', sqft: 'Facilities' },
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPropertySize(item.id)}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  propertySize === item.id 
                    ? 'bg-primary-container text-on-primary border-primary-container shadow-sm' 
                    : 'bg-surface-container-lowest border-surface-container-high text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <div className="font-headline font-bold text-xs">{item.label}</div>
                <div className={`text-[10px] mt-0.5 ${propertySize === item.id ? 'text-on-primary/70' : 'text-on-surface-variant'}`}>
                  {item.sqft}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Step 3: Treatment Tier Selection */}
        <section className="space-y-2.5">
          <h2 className="font-headline font-bold text-sm text-primary flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center">3</span>
            Select Treatment Tier & Warranty Protection
          </h2>

          <div className="space-y-2.5">
            {Object.entries(tierMultipliers).map(([tierKey, tier]) => {
              const isSelected = selectedTier === tierKey;
              const isPopular = tierKey === 'intensive';
              return (
                <div
                  key={tierKey}
                  onClick={() => setSelectedTier(tierKey)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all relative ${
                    isSelected 
                      ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary' 
                      : 'border-surface-container-high bg-surface-container-lowest hover:border-primary/40'
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-2.5 right-4 bg-secondary text-on-primary text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                      ★ Recommended by Toxicologists
                    </span>
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          name="treatmentTier" 
                          checked={isSelected} 
                          onChange={() => setSelectedTier(tierKey)} 
                          className="w-4 h-4 text-primary accent-primary cursor-pointer"
                        />
                        <h3 className="font-headline font-bold text-sm text-primary">{tier.name}</h3>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1 ml-6">{tier.desc}</p>
                      <div className="flex items-center gap-1.5 mt-2 ml-6">
                        <span className="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
                        <span className="text-xs font-bold text-emerald-700">{tier.warranty}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-headline font-extrabold text-base text-primary">
                        ₹{Math.round(pestRates[selectedPest].base * sizeMultiplier[propertySize] * tier.mult)}
                      </span>
                      <p className="text-[10px] text-on-surface-variant">+ 18% GST</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Step 4: Schedule & Address */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface-container-lowest border border-surface-container-high rounded-xl p-4 space-y-3">
            <h3 className="font-headline font-bold text-xs uppercase tracking-wider text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px]">calendar_month</span>
              Date & Arrival Window
            </h3>
            
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {[
                { id: 'today', label: 'Today', sub: 'Instant' },
                { id: 'tomorrow', label: 'Tomorrow', sub: 'Next Day' },
                { id: 'weekend', label: 'Saturday', sub: 'Weekend' },
              ].map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDate(d.id)}
                  className={`py-2 px-1 rounded-lg border cursor-pointer font-bold ${
                    selectedDate === d.id ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container-low border-surface-container'
                  }`}
                >
                  <div>{d.label}</div>
                  <div className="text-[10px] opacity-75 font-normal">{d.sub}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
              {[
                { id: 'morning', label: '09 - 11 AM' },
                { id: 'afternoon', label: '01 - 03 PM' },
                { id: 'evening', label: '05 - 07 PM' },
              ].map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSlot(s.id)}
                  className={`py-1.5 px-1 rounded-lg border cursor-pointer text-[11px] font-semibold ${
                    selectedSlot === s.id ? 'bg-secondary text-on-primary border-secondary' : 'bg-surface-container-low border-surface-container'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-surface-container-high rounded-xl p-4 space-y-3">
            <h3 className="font-headline font-bold text-xs uppercase tracking-wider text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px]">location_on</span>
              Service Location & Notes
            </h3>
            
            <div>
              <label className="text-[11px] font-bold text-on-surface-variant block mb-1">Residential Address</label>
              <input 
                type="text" 
                value={address} 
                onChange={e => setAddress(e.target.value)} 
                className="w-full px-3 py-2 text-xs rounded-lg border border-surface-container-high bg-surface-container-low focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-on-surface-variant block mb-1">Specific Inspection Notes</label>
              <input 
                type="text" 
                value={notes} 
                onChange={e => setNotes(e.target.value)} 
                className="w-full px-3 py-2 text-xs rounded-lg border border-surface-container-high bg-surface-container-low focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </section>

        {/* Step 5: Transparent Billing Breakdown Card */}
        <section className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
            <h3 className="font-headline font-bold text-sm text-primary">Transparent Fee Breakdown</h3>
            <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              Zero Hidden Charges Guarantee
            </span>
          </div>

          <div className="space-y-2 text-xs text-on-surface-variant">
            <div className="flex justify-between">
              <span>{pestRates[selectedPest].name} ({propertySize.toUpperCase()})</span>
              <span className="font-medium text-on-surface">₹{calculatedBase}</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Promo Discount ({promoCode})</span>
                <span>-₹150</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>GST (18% Central + State)</span>
              <span className="font-medium text-on-surface">₹{gst}</span>
            </div>
            <div className="flex justify-between border-t border-surface-container-high pt-2 text-sm font-bold text-primary">
              <span>Total Payable Amount</span>
              <span className="text-base text-primary">₹{totalAmount}</span>
            </div>
          </div>

          <div className="bg-surface-container-low p-2.5 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
              <span className="text-[11px] font-medium text-on-surface">Pay via UPI / Card or Pay After Inspection</span>
            </div>
            <span className="text-[11px] font-bold text-primary">Safe Escrow</span>
          </div>
        </section>
      </main>

      {/* Bottom Sticky Confirmation CTA */}
      <footer className="fixed bottom-0 inset-x-0 bg-surface-container-lowest/95 backdrop-blur-md border-t border-surface-container-high p-3 z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-bold text-on-surface-variant">Estimated Total</div>
            <div className="font-headline font-extrabold text-lg text-primary">₹{totalAmount}</div>
          </div>
          <button
            onClick={handleBookingSubmit}
            disabled={isSubmitting}
            className="flex-1 max-w-xs py-3 bg-primary hover:bg-primary-container text-on-primary font-headline font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                <span>Dispatching Agency...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Confirm & Dispatch Tech</span>
              </>
            )}
          </button>
        </div>
      </footer>

      {/* Emergency SOS Modal */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-error">
            <div className="w-12 h-12 rounded-full bg-error-container text-error flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[28px]">e911_emergency</span>
            </div>
            <h3 className="font-headline font-bold text-center text-lg text-error mb-1">Emergency Pest SOS</h3>
            <p className="text-center text-xs text-on-surface-variant mb-4 leading-relaxed">
              Urgent poisonous insect bite, wasp swarm, or acute chemical ingestion.
            </p>
            <div className="space-y-2">
              <a 
                href="tel:1800112233" 
                className="w-full py-2.5 bg-error text-on-error rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                National Poison Helpline (1800-11-2233)
              </a>
              <a 
                href="tel:+918049120000" 
                className="w-full py-2.5 bg-surface-container text-primary rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">support_agent</span>
                EcoPest 24/7 Rapid Response Desk
              </a>
              <button 
                onClick={() => setShowSosModal(false)}
                className="w-full py-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                Close Hotline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Warranty Details Modal */}
      {showWarrantyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-primary/20">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[28px]">verified_user</span>
            </div>
            <h3 className="font-headline font-bold text-center text-lg text-primary mb-1">Active 90-Day Guarantee</h3>
            <p className="text-center text-xs text-on-surface-variant mb-3">
              Certificate #PF-WARR-88219 • EcoPest Solutions
            </p>
            <div className="bg-surface-container-low p-3 rounded-xl space-y-2 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Last Treatment:</span>
                <span className="font-semibold">Subterranean Termite Barrier</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Warranty Status:</span>
                <span className="font-bold text-emerald-600">Active (68 Days Left)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Coverage:</span>
                <span className="font-semibold">100% Free Re-treatment</span>
              </div>
            </div>
            <button 
              onClick={() => {
                alert('A warranty re-service dispatch request has been submitted to EcoPest Solutions at zero cost.');
                setShowWarrantyModal(false);
              }}
              className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs shadow-sm mb-2 cursor-pointer"
            >
              Claim Free Warranty Re-service
            </button>
            <button 
              onClick={() => setShowWarrantyModal(false)}
              className="w-full py-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
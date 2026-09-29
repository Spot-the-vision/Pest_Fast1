import React from 'react';

export default function BookingScreen() {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased">
<header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe"><div className="h-20 px-margin flex items-center justify-between gap-space-xs"><div className="flex items-center gap-space-sm min-w-0 flex-1"><img alt="Brand logo. - Primary color: #064e3b - Font: plusJakartaSans - Mode: light - Roundness: rounded-md" className="h-8 w-auto object-contain shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1U3O0kc8EHfIIJEgzuRRaOBvzdQaXESpsLEU5jl_aABgxoOaomh-UuOtxiHKnAeyup5cA440HHrEW4GnNTDaZBkS98Q-0cKejJJj5JODixDKAQF2KM0K4gHl9l6c3joxvG4PiTjLUTp8HYx8XigNgjFV5sJdjIZgZ8a6B2-bah5iAZx8HfDC4Rik166Hz5d7MNPQcroBCXmhfe22zRfUM-oLbhGSW8SERbY-Gxe69y6NTobLBgsSmtbNVU"/><div className="flex flex-col min-w-0"><div className="flex items-center gap-1"><span className="font-headline-sm text-headline-sm text-primary leading-tight font-bold tracking-tight truncate">Pest Free</span></div><div className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-primary-fixed/40 max-w-full"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span><span className="font-label-sm text-label-sm text-primary truncate">EcoPest Solutions ★ 4.9</span></div></div></div><div className="flex items-center gap-space-xs shrink-0"><button aria-label="Emergency SOS Support" className="w-11 h-11 rounded-full bg-error-container/50 text-error flex items-center justify-center hover:bg-error-container transition-colors"><span className="material-symbols-outlined text-[20px]">e911_emergency</span></button><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 ml-1"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="flex flex-col relative w-full pt-20 pb-24 bg-surface min-h-screen"><div className="flex flex-col w-full pb-8">
{/* Agency Overview Hero Banner */}
<section className="px-margin pt-space-sm pb-space-md">
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm relative overflow-hidden">
{/* Decorative Leaf Watermark */}
<div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none text-primary">
<span className="material-symbols-outlined text-[130px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
</div>
{/* Top Row: Agency Brand & Status Beacon */}
<div className="flex items-start justify-between gap-space-sm mb-space-sm relative z-10">
<div className="flex items-center gap-space-sm">
<div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm shrink-0">
<span className="material-symbols-outlined text-[26px]">potted_plant</span>
</div>
<div>
<div className="flex items-center gap-1.5 flex-wrap">
<h2 className="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">EcoPest Solutions</h2>
<span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold">#PF-8821</span>
</div>
<div className="flex items-center gap-1.5 mt-0.5">
<span className="material-symbols-outlined text-secondary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
<span className="font-label-md text-label-md text-on-surface font-bold">4.9</span>
<span className="font-body-sm text-body-sm text-outline">(318 organic reviews)</span>
</div>
</div>
</div>
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed/30 text-primary font-label-sm text-label-sm font-semibold">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Active Hub
        </span>
</div>
{/* Agency Badges: Bio-Certified & SLA */}
<div className="grid grid-cols-2 gap-2 pt-2 border-t-0 bg-surface-container-low/70 rounded-lg p-2.5 mb-space-sm">
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[16px]">verified</span>
</div>
<div className="min-w-0">
<p className="font-label-sm text-label-sm text-primary font-bold truncate">100% Bio-Certified</p>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">Zero Toxic Smell</p>
</div>
</div>
<div className="flex items-center gap-2">
<div className="w-7 h-7 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary shrink-0">
<span className="material-symbols-outlined text-[16px]">bolt</span>
</div>
<div className="min-w-0">
<p className="font-label-sm text-label-sm text-secondary font-bold truncate">Express Dispatch</p>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">3-6 Hr Response</p>
</div>
</div>
</div>
{/* Live Service Hub Beacon */}
<div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-primary text-[18px]">share_location</span>
<span className="truncate">Live Coverage: <strong className="text-on-surface font-medium">Sector 7 &amp; Indiranagar Hub Active</strong></span>
</div>
</div>
</section>
{/* Live Property Address Tile */}
<section className="px-margin mb-space-md">
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between gap-space-sm">
<div className="flex items-start gap-space-sm min-w-0">
<div className="w-9 h-9 rounded-full bg-primary-fixed/60 text-primary flex items-center justify-center shrink-0 mt-0.5 relative">
<span className="material-symbols-outlined text-[20px]">location_on</span>
<span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full animate-ping"></span>
<span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full"></span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-1.5">
<span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Service Address</span>
<span className="px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-[10px]">GPS Verified</span>
</div>
<p className="font-label-lg text-label-lg text-on-surface font-semibold truncate mt-0.5">Flat 402, Green Glen Palms</p>
<p className="font-body-sm text-body-sm text-on-surface-variant truncate">Bellandur, Sector 7, Bengaluru</p>
</div>
</div>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-primary font-label-md text-label-md font-semibold transition-colors shrink-0" type="button">
        Change
      </button>
</div>
</section>
{/* Service Selection Section */}
<section className="px-margin mb-space-lg">
<div className="flex items-end justify-between mb-space-sm">
<div>
<div className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm font-bold uppercase tracking-wider">
<span className="material-symbols-outlined text-[14px]">shield_with_heart</span>
          Guaranteed Protection
        </div>
<h3 className="font-headline-md text-headline-md text-on-surface font-bold">Select Bio-Treatment</h3>
</div>
<span className="font-body-sm text-body-sm text-outline">Tap card to expand</span>
</div>
{/* 6 Interactive Cards Container */}
<div className="flex flex-col gap-space-sm" id="servicesContainer">
{/* Card 1: Cockroach Gel */}
<div className="service-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all duration-200 cursor-pointer" data-id="1" data-name="Cockroach Odorless Gel &amp; Thermal Seal" data-price="89">
<div className="flex items-start justify-between gap-space-sm">
<div className="flex items-start gap-space-sm min-w-0">
<div className="w-11 h-11 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[24px]">pest_control</span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-2 flex-wrap">
<span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-bold">6 Mo Warranty</span>
<span className="font-body-sm text-body-sm text-outline">45 Mins</span>
</div>
<h4 className="font-label-lg text-label-lg text-on-surface font-bold mt-1 leading-snug">Cockroach Odorless Gel &amp; Thermal Seal</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">Smell-less food-grade herbal gel, no kitchen emptying</p>
</div>
</div>
<div className="flex flex-col items-end shrink-0 pl-1">
<span className="font-headline-sm text-headline-sm font-bold text-primary">$89</span>
<div className="w-6 h-6 rounded-full service-radio bg-primary flex items-center justify-center text-on-primary mt-1 shadow-sm">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
</div>
</div>
{/* Treatment Details Dropdown */}
<div className="details-content mt-space-sm pt-space-sm bg-surface-container-low/60 rounded-lg p-space-sm">
<div className="grid grid-cols-2 gap-2 text-on-surface">
<div>
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Formula</p>
<p className="font-body-sm text-body-sm font-medium">Boric-Herbal Bait Mix</p>
</div>
<div>
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Vacating Needed</p>
<p className="font-body-sm text-body-sm font-medium text-primary">None (100% Odorless)</p>
</div>
<div className="col-span-2">
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Protocol</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Micro-dot dotting across hinge cabinets, under-sink piping thermal seal, drain traps barrier.</p>
</div>
</div>
</div>
</div>
{/* Card 2: Termite Eradication */}
<div className="service-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all duration-200 cursor-pointer" data-id="2" data-name="Termite Eradication (Drill &amp; Inject)" data-price="249">
<div className="flex items-start justify-between gap-space-sm">
<div className="flex items-start gap-space-sm min-w-0">
<div className="w-11 h-11 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[24px]">carpenter</span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-2 flex-wrap">
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">1 Year Comprehensive</span>
<span className="font-body-sm text-body-sm text-outline">90 Mins</span>
</div>
<h4 className="font-label-lg text-label-lg text-on-surface font-bold mt-1 leading-snug">Termite Eradication (Drill &amp; Inject)</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">Subterranean botanical bio-permethrin barrier</p>
</div>
</div>
<div className="flex flex-col items-end shrink-0 pl-1">
<span className="font-headline-sm text-headline-sm font-bold text-primary">$249</span>
<div className="w-6 h-6 rounded-full service-radio bg-surface-container-highest flex items-center justify-center text-transparent mt-1">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
</div>
</div>
<div className="details-content hidden mt-space-sm pt-space-sm bg-surface-container-low/60 rounded-lg p-space-sm">
<div className="grid grid-cols-2 gap-2 text-on-surface">
<div>
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Active Inoculant</p>
<p className="font-body-sm text-body-sm font-medium">Bio-Permethrin Emulsion</p>
</div>
<div>
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Warranty Visits</p>
<p className="font-body-sm text-body-sm font-medium text-primary">Free Retreatment 365 Days</p>
</div>
<div className="col-span-2">
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Protocol</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Precision skirting-board micro-drills, high-pressure infusion, matching wood-wax sealing.</p>
</div>
</div>
</div>
</div>
{/* Card 3: Mosquito Barrier */}
<div className="service-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all duration-200 cursor-pointer" data-id="3" data-name="Mosquito Barrier &amp; Larva Misting" data-price="69">
<div className="flex items-start justify-between gap-space-sm">
<div className="flex items-start gap-space-sm min-w-0">
<div className="w-11 h-11 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[24px]">air</span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-2 flex-wrap">
<span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-bold">3 Mo Warranty</span>
<span className="font-body-sm text-body-sm text-outline">40 Mins</span>
</div>
<h4 className="font-label-lg text-label-lg text-on-surface font-bold mt-1 leading-snug">Mosquito Barrier &amp; Larva Misting</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">Citronella &amp; neem organic emulsion perimeter mist</p>
</div>
</div>
<div className="flex flex-col items-end shrink-0 pl-1">
<span className="font-headline-sm text-headline-sm font-bold text-primary">$69</span>
<div className="w-6 h-6 rounded-full service-radio bg-surface-container-highest flex items-center justify-center text-transparent mt-1">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
</div>
</div>
<div className="details-content hidden mt-space-sm pt-space-sm bg-surface-container-low/60 rounded-lg p-space-sm">
<div className="grid grid-cols-2 gap-2 text-on-surface">
<div>
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Compound</p>
<p className="font-body-sm text-body-sm font-medium">Cold-Pressed Neem + Citronella</p>
</div>
<div>
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Pet &amp; Plant Safe</p>
<p className="font-body-sm text-body-sm font-medium text-primary">100% Certified Safe</p>
</div>
<div className="col-span-2">
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Protocol</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">ULV ultra-fine droplet spray in balconies, dark curtain folds, yard foliage, and drain mouth larva blocks.</p>
</div>
</div>
</div>
</div>
{/* Card 4: Bedbug Multi-Phase */}
<div className="service-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all duration-200 cursor-pointer" data-id="4" data-name="Bedbug Multi-Phase Thermal Treatment" data-price="189">
<div className="flex items-start justify-between gap-space-sm">
<div className="flex items-start gap-space-sm min-w-0">
<div className="w-11 h-11 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[24px]">local_fire_department</span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-2 flex-wrap">
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">6 Mo Guarantee</span>
<span className="font-body-sm text-body-sm text-outline">2 Visits</span>
</div>
<h4 className="font-label-lg text-label-lg text-on-surface font-bold mt-1 leading-snug">Bedbug Multi-Phase Thermal Treatment</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">Superheated steam + amorphous silica eco-dusting</p>
</div>
</div>
<div className="flex flex-col items-end shrink-0 pl-1">
<span className="font-headline-sm text-headline-sm font-bold text-primary">$189</span>
<div className="w-6 h-6 rounded-full service-radio bg-surface-container-highest flex items-center justify-center text-transparent mt-1">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
</div>
</div>
<div className="details-content hidden mt-space-sm pt-space-sm bg-surface-container-low/60 rounded-lg p-space-sm">
<div className="grid grid-cols-2 gap-2 text-on-surface">
<div>
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Heat Steam</p>
<p className="font-body-sm text-body-sm font-medium">180°F Mattress Sanitization</p>
</div>
<div>
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Follow-up</p>
<p className="font-body-sm text-body-sm font-medium text-primary">Day 14 Free Check</p>
</div>
<div className="col-span-2">
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Protocol</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Deep mattress seam steam extraction, bed frame socket dusting, and secondary booster visit on Day 14.</p>
</div>
</div>
</div>
</div>
{/* Card 5: Rodent Perimeter Defense */}
<div className="service-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all duration-200 cursor-pointer" data-id="5" data-name="Rodent Perimeter Defense &amp; Smart Traps" data-price="139">
<div className="flex items-start justify-between gap-space-sm">
<div className="flex items-start gap-space-sm min-w-0">
<div className="w-11 h-11 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[24px]">sensors</span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-2 flex-wrap">
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">1 Year Warranty</span>
<span className="font-body-sm text-body-sm text-outline">60 Mins</span>
</div>
<h4 className="font-label-lg text-label-lg text-on-surface font-bold mt-1 leading-snug">Rodent Perimeter Defense &amp; Smart Traps</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">Non-toxic sensor traps + copper entry mesh sealing</p>
</div>
</div>
<div className="flex flex-col items-end shrink-0 pl-1">
<span className="font-headline-sm text-headline-sm font-bold text-primary">$139</span>
<div className="w-6 h-6 rounded-full service-radio bg-surface-container-highest flex items-center justify-center text-transparent mt-1">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
</div>
</div>
<div className="details-content hidden mt-space-sm pt-space-sm bg-surface-container-low/60 rounded-lg p-space-sm">
<div className="grid grid-cols-2 gap-2 text-on-surface">
<div>
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Sealing Tech</p>
<p className="font-body-sm text-body-sm font-medium">Anti-Chew Copper Mesh</p>
</div>
<div>
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Disposal Protocol</p>
<p className="font-body-sm text-body-sm font-medium text-primary">Humane Eco Catch</p>
</div>
<div className="col-span-2">
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Protocol</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Full inspection of false ceiling conduits, air-con sleeves, sensor trap network installation with monthly check-ins.</p>
</div>
</div>
</div>
</div>
{/* Card 6: Full Home Disinfection */}
<div className="service-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all duration-200 cursor-pointer" data-id="6" data-name="Full Home Deep Anti-Microbial Shield" data-price="119">
<div className="flex items-start justify-between gap-space-sm">
<div className="flex items-start gap-space-sm min-w-0">
<div className="w-11 h-11 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[24px]">sanitizer</span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-2 flex-wrap">
<span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-bold">90 Days Shield</span>
<span className="font-body-sm text-body-sm text-outline">50 Mins</span>
</div>
<h4 className="font-label-lg text-label-lg text-on-surface font-bold mt-1 leading-snug">Full Home Deep Anti-Microbial Shield</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">Hospital-grade thyme &amp; eucalyptus molecular fogging</p>
</div>
</div>
<div className="flex flex-col items-end shrink-0 pl-1">
<span className="font-headline-sm text-headline-sm font-bold text-primary">$119</span>
<div className="w-6 h-6 rounded-full service-radio bg-surface-container-highest flex items-center justify-center text-transparent mt-1">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
</div>
</div>
<div className="details-content hidden mt-space-sm pt-space-sm bg-surface-container-low/60 rounded-lg p-space-sm">
<div className="grid grid-cols-2 gap-2 text-on-surface">
<div>
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Active Agent</p>
<p className="font-body-sm text-body-sm font-medium">Thymol Complex 0.5%</p>
</div>
<div>
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Pathogen Kill Rate</p>
<p className="font-body-sm text-body-sm font-medium text-primary">99.99% Efficacy</p>
</div>
<div className="col-span-2">
<p className="font-label-sm text-label-sm text-outline uppercase font-semibold">Protocol</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Dry atomized aerosol creates long-lasting ionic barrier on door knobs, kitchen slabs, and bathroom corners.</p>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Inspection Preference Option */}
<section className="px-margin mb-space-lg">
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
<div className="flex items-center gap-2 mb-space-sm">
<span className="material-symbols-outlined text-primary text-[20px]">troubleshoot</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Preliminary Inspection?</h3>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">
        Our certified specialist can audit concealed nesting hubs before applying botanical concentrates.
      </p>
<div className="grid grid-cols-1 gap-2.5" id="inspectionGroup">
{/* Option 1: Yes Inspect */}
<label className="inspection-option flex items-start gap-space-sm p-3 rounded-xl bg-surface-container-high cursor-pointer transition-colors" data-inspect="yes">
<input checked="" className="hidden" name="inspection" type="radio" value="yes"/>
<div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-on-primary mt-0.5 shrink-0 radio-indicator shadow-sm">
<span className="material-symbols-outlined text-[14px]">check</span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-2 flex-wrap">
<p className="font-label-lg text-label-lg font-bold text-on-surface">Yes, Inspect First</p>
<span className="px-1.5 py-0.5 rounded bg-primary-fixed text-primary font-label-sm text-[10px] font-bold">FREE with treatment</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Technician completes a 15-min thermal scan and confirms formula quantity before start.</p>
</div>
</label>
{/* Option 2: Direct Treatment */}
<label className="inspection-option flex items-start gap-space-sm p-3 rounded-xl bg-surface-container-low cursor-pointer transition-colors" data-inspect="no">
<input className="hidden" name="inspection" type="radio" value="no"/>
<div className="w-5 h-5 rounded-full bg-surface-container-highest flex items-center justify-center text-transparent mt-0.5 shrink-0 radio-indicator">
<span className="material-symbols-outlined text-[14px]">check</span>
</div>
<div className="min-w-0">
<p className="font-label-lg text-label-lg font-bold text-on-surface">Direct Treatment</p>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Immediate intervention. Ideal if infestation locations are already known.</p>
</div>
</label>
</div>
</div>
</section>
{/* Rapido / Uber Style Dispatch Queue Arrival Selection */}
<section className="px-margin mb-space-lg">
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[22px]">route</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Arrival Window &amp; Dispatch</h3>
</div>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">Live Traffic Sync</span>
</div>
{/* Live Queue Telemetry Alert Card */}
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-sm overflow-hidden relative">
<div className="flex items-start gap-space-sm">
<div className="w-10 h-10 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px]">hourglass_top</span>
</div>
<div className="min-w-0 flex-1">
<div className="flex items-center gap-1.5 flex-wrap">
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">Operational Dispatch Queue</span>
<span className="px-1.5 py-0.2 rounded-full bg-surface-container-high text-on-surface font-label-sm text-[10px] font-bold">Queue Position #2</span>
</div>
<p className="font-body-md text-body-md text-on-surface font-medium mt-1 leading-snug">
            Technician <strong>Rajesh Kumar</strong> is in Sector 7 finishing job #PF-8819 by 5:30 PM.
          </p>
<div className="mt-2.5 p-2 rounded-lg bg-surface-container-low flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[18px]">cloud_download</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
              Estimated arrival: <strong className="text-primary font-semibold">~4 hours 45 mins</strong> (calibrated with chemical set time &amp; safe commute).
            </p>
</div>
</div>
</div>
</div>
{/* Dispatch Window Cards */}
<div className="grid grid-cols-1 gap-2.5" id="windowGroup">
{/* Window A: Express */}
<label className="window-option flex items-center justify-between p-space-md rounded-xl bg-surface-container-lowest shadow-sm cursor-pointer transition-all" data-window="express">
<input className="hidden" name="dispatch_window" type="radio" value="express"/>
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-9 h-9 rounded-full bg-secondary-fixed/50 text-secondary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">electric_bolt</span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-2">
<p className="font-label-lg text-label-lg font-bold text-on-surface">Express Rush Window</p>
<span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] font-bold">+$15 High Priority</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Guaranteed dispatch within 3 Hours</p>
</div>
</div>
<div className="w-5 h-5 rounded-full bg-surface-container-highest flex items-center justify-center text-transparent radio-check shrink-0">
<span className="material-symbols-outlined text-[14px]">check</span>
</div>
</label>
{/* Window B: Standard Window (Default) */}
<label className="window-option flex items-center justify-between p-space-md rounded-xl bg-primary-fixed/20 shadow-sm cursor-pointer transition-all" data-window="standard">
<input checked="" className="hidden" name="dispatch_window" type="radio" value="standard"/>
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-9 h-9 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">local_shipping</span>
</div>
<div className="min-w-0">
<div className="flex items-center gap-2">
<p className="font-label-lg text-label-lg font-bold text-primary">Standard Smart Window</p>
<span className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-[10px] font-semibold">Included</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Arrival in next 4-5 hrs via active queue</p>
</div>
</div>
<div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-on-primary radio-check shrink-0 shadow-sm">
<span className="material-symbols-outlined text-[14px]">check</span>
</div>
</label>
</div>
</section>
{/* Eco Commitment Notice */}
<section className="px-margin mb-space-lg">
<div className="rounded-xl p-space-md bg-tertiary text-on-tertiary flex items-center gap-space-sm shadow-sm">
<span className="material-symbols-outlined text-[28px] text-primary-fixed shrink-0">workspace_premium</span>
<div className="min-w-0">
<p className="font-label-md text-label-md font-bold text-primary-fixed uppercase tracking-wider">100% Money-Back &amp; Recoat Ledger</p>
<p className="font-body-sm text-body-sm text-on-tertiary-container mt-0.5">
          If any live infestation is detected within the warranty window, we re-treat free within 12 hours.
        </p>
</div>
</div>
</section>
{/* Sticky Bottom Scheduling Bar */}
<div className="sticky bottom-16 inset-x-0 z-40 bg-surface/95 backdrop-blur-md px-margin py-3 shadow-[0_-8px_20px_rgba(0,0,0,0.06)]">
<div className="flex items-center justify-between gap-space-sm mb-2">
<div>
<p className="font-body-sm text-body-sm text-outline leading-none">Total Package Price</p>
<div className="flex items-baseline gap-1 mt-1">
<span className="font-data-metric text-data-metric text-primary font-bold" id="totalPriceDisplay">$89</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">All-Inclusive</span>
</div>
</div>
<div className="text-right">
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary font-bold">
<span className="material-symbols-outlined text-[14px]">verified_user</span>
<span id="activeWarrantyDisplay">6 Mo Warranty</span>
</span>
<p className="font-body-sm text-[11px] text-outline">Digital warranty stored on ledger</p>
</div>
</div>
{/* Master Booking Dispatch Button */}
<button className="w-full h-12 rounded-lg bg-primary hover:bg-tertiary active:scale-[0.99] text-on-primary font-headline-sm text-headline-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all" id="scheduleBtn" type="button">
<span>Schedule Pest Control Slot</span>
<span className="material-symbols-outlined text-[20px]">arrow_forward</span>
</button>
</div>
</div>
</main><nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)]" data-active-classes="text-primary font-bold"><div className="flex items-center justify-around h-16 px-1"><a aria-current="page" className="flex flex-col items-center justify-center min-w-[64px] h-12 transition-colors text-primary font-bold" data-path="services" href="#"><span className="material-symbols-outlined text-[22px]">eco</span><span className="font-label-sm text-label-sm tracking-tight mt-0.5">Services</span></a><a className="flex flex-col items-center justify-center min-w-[64px] h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="my-bookings" href="#"><span className="material-symbols-outlined text-[22px]">calendar_month</span><span className="font-label-sm text-label-sm tracking-tight mt-0.5">Bookings</span></a><a className="flex flex-col items-center justify-center min-w-[64px] h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="live-track" href="#"><span className="material-symbols-outlined text-[22px]">near_me</span><span className="font-label-sm text-label-sm tracking-tight mt-0.5">Live Track</span></a><a className="flex flex-col items-center justify-center min-w-[64px] h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="warranty-&amp;-ledger" href="#"><span className="material-symbols-outlined text-[22px]">verified_user</span><span className="font-label-sm text-label-sm tracking-tight mt-0.5">Ledger</span></a><a className="flex flex-col items-center justify-center min-w-[64px] h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="account" href="#"><span className="material-symbols-outlined text-[22px]">manage_accounts</span><span className="font-label-sm text-label-sm tracking-tight mt-0.5">Account</span></a></div></nav>
    </div>
  );
}

import React from 'react';

export default function TrackingScreen() {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased">
<header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe"><div className="h-20 px-margin flex items-center justify-between gap-space-xs"><div className="flex items-center gap-space-sm min-w-0 flex-1"><img alt="Brand logo. - Primary color: #064e3b - Font: plusJakartaSans - Mode: light - Roundness: rounded-md" className="h-8 w-auto object-contain shrink-0" src="https://lh3.googleusercontent.com/aida/AEtjO1U3O0kc8EHfIIJEgzuRRaOBvzdQaXESpsLEU5jl_aABgxoOaomh-UuOtxiHKnAeyup5cA440HHrEW4GnNTDaZBkS98Q-0cKejJJj5JODixDKAQF2KM0K4gHl9l6c3joxvG4PiTjLUTp8HYx8XigNgjFV5sJdjIZgZ8a6B2-bah5iAZx8HfDC4Rik166Hz5d7MNPQcroBCXmhfe22zRfUM-oLbhGSW8SERbY-Gxe69y6NTobLBgsSmtbNVU"/><div className="flex flex-col min-w-0"><div className="flex items-center gap-1"><span className="font-headline-sm text-headline-sm text-primary leading-tight font-bold tracking-tight truncate">Pest Free</span></div><div className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-primary-fixed/40 max-w-full"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span><span className="font-label-sm text-label-sm text-primary truncate">EcoPest Solutions ★ 4.9</span></div></div></div><div className="flex items-center gap-space-xs shrink-0"><button aria-label="Emergency SOS Support" className="w-11 h-11 rounded-full bg-error-container/50 text-error flex items-center justify-center hover:bg-error-container transition-colors"><span className="material-symbols-outlined text-[20px]">e911_emergency</span></button><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 ml-1"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="flex flex-col relative w-full pt-20 pb-24 bg-surface min-h-screen"><div className="flex flex-col w-full">
{/* Map Container (Rapido/Uber High-Density Telemetry View) */}
<div className="relative w-full h-[320px] overflow-hidden bg-surface-container-high shadow-md">
{/* Static Map Simulation using data-location */}
<div className="w-full h-full bg-cover bg-center" data-location="Outer Ring Road, Green Glen Palms, Bangalore, India" style={{ backgroundImage: 'url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuD7IaoEd4_-HVI4Mut-81SsOS1GYkdWruByj-F-XlnNg6wus7gCoMMKKQmJubEKVA4w6AzXDHna-GP6XYWqrsE5rjwCJClXH2pe3rfjSzu0Du2erm--ZzYmri3qmrGqXbh6oTWNDrykgJmZzc8VFrljoh8LPFxLa8paeUOv2_puJeWYqBc85XZw80rMCkmFayZsY1n7_k6_aNJg0ObfSWImwCa6ZBxzo4Vn1pYwpFFN3wIs3Z3yVhQkjQ\")' }}></div>
{/* Map Ambience Gradient Overlays */}
<div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-surface pointer-events-none"></div>
{/* Top Telemetry Status Pill (Glassmorphic) */}
<div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none">
<div className="pointer-events-auto flex items-center gap-space-xs px-3 py-1.5 rounded-full bg-surface/90 backdrop-blur-md shadow-sm">
<span className="relative flex h-2.5 w-2.5">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
</span>
<span className="font-label-sm text-label-sm text-primary uppercase tracking-wide">LIVE GPS SYNCED</span>
</div>
<div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/90 backdrop-blur-md shadow-sm">
<span className="material-symbols-outlined text-secondary text-[16px]">traffic</span>
<span className="font-label-sm text-label-sm text-on-surface font-semibold">Moderate Traffic</span>
</div>
</div>
{/* Simulated Live Path SVG Overlay */}
<svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
<defs>
<lineargradient id="routeGrad" x1="0%" x2="100%" y1="100%" y2="0%">
<stop offset="0%" stop-color="#fea619"></stop>
<stop offset="100%" stop-color="#064e3b"></stop>
</lineargradient>
</defs>
{/* Dotted future route */}
<path d="M 90 230 C 130 190, 160 210, 210 140 S 260 110, 290 85" fill="none" opacity="0.6" stroke="#fea619" strokeDasharray="6,6" strokeLinecap="round" strokeWidth="4"></path>
{/* Solid active progress route */}
<path d="M 90 230 C 130 190, 150 200, 175 168" fill="none" stroke="url(#routeGrad)" strokeLinecap="round" strokeWidth="5"></path>
</svg>
{/* Moving Technician Marker */}
<div className="absolute left-[165px] top-[148px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
<div className="relative flex items-center justify-center">
<span className="animate-ping absolute -inset-1 rounded-full bg-secondary-container opacity-70"></span>
<div className="relative w-11 h-11 rounded-full bg-primary-container p-0.5 shadow-lg flex items-center justify-center">
<img className="w-10 h-10 rounded-full object-cover" data-alt="Close-up headshot portrait of Rajesh Kumar, a skilled senior bio-technician wearing a dark pine green pest control uniform polo and a confident, warm smile. Clean studio natural lighting with eco-heritage tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7Gv6Fb4D7rMwNIwgaCTNQvouZIn1VRisGMFyB61iaRsR0N-ivkY-8vPZw6sUAY-BhPWV4MQqe2d3GPSxgMhqzNYiuRCMJtWLYzfj4sh6yfABPoKuIAf72eVAAkquVbUpXg_geEiuKmZzWG4LQTYYvywLJrWUOW5tMKmMv8Rtfl8N2InqIacENX1Ag2bik8-68uhhhhcGelmt3Fn9JTEtQ3ikv76TpRb6zIiNq_e1QjXzIMcHqjSdrKQ"/>
<div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-secondary-container flex items-center justify-center shadow-xs">
<span className="material-symbols-outlined text-primary text-[10px] font-bold">local_shipping</span>
</div>
</div>
</div>
<div className="mt-1 px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-sm whitespace-nowrap">
        Rajesh • 1.8 km away
      </div>
</div>
{/* Customer Home Marker */}
<div className="absolute right-[50px] top-[65px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
<div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg">
<span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>home_pin</span>
</div>
<span className="mt-1 px-2 py-0.5 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-xs whitespace-nowrap font-bold">
        Flat 402
      </span>
</div>
{/* Recenter & Map Controls Floating Action Button */}
<button aria-label="Recenter map" className="absolute bottom-14 right-4 w-10 h-10 rounded-full bg-surface-container-lowest text-primary shadow-md flex items-center justify-center active:scale-95 transition-transform" id="recenterBtn">
<span className="material-symbols-outlined text-[20px]">my_location</span>
</button>
{/* Bottom ETA Overlay Bubble */}
<div className="absolute bottom-2 inset-x-4">
<div className="w-full bg-primary text-on-primary rounded-xl px-4 py-2.5 shadow-md flex items-center justify-between">
<div className="flex items-center gap-2.5 min-w-0">
<div className="w-7 h-7 rounded-lg bg-on-primary-container/20 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary-fixed text-[18px]">near_me</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
<span className="font-label-md text-label-md font-bold truncate">Technician En Route</span>
</div>
<span className="font-body-sm text-body-sm text-primary-fixed truncate">ETA: 42 mins (Traffic Adjusted)</span>
</div>
</div>
<div className="text-right shrink-0">
<span className="font-headline-sm text-headline-sm text-secondary-container leading-none font-bold">11:18</span>
<span className="block font-label-sm text-label-sm text-primary-fixed">AM ARRIVAL</span>
</div>
</div>
</div>
</div>
{/* Content Stream */}
<div className="px-margin flex flex-col gap-space-md -mt-1 pb-space-lg">
{/* Active Dispatch Queue Banner */}
<div className="bg-secondary-container/15 rounded-xl p-space-md flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
<span className="material-symbols-outlined text-[13px]">hourglass_top</span>
          DISPATCH QUEUE: #1 IN LINE
        </div>
<span className="font-label-sm text-label-sm text-secondary font-bold">Priority Slot</span>
</div>
<p className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
        Rajesh is en route to Flat 402
      </p>
<p className="font-body-md text-body-md text-on-surface-variant">
        Technician Rajesh has finished safe bio-sanitization and is scheduled to reach your location within 45 minutes.
      </p>
<div className="flex items-center gap-2 pt-1">
<span className="material-symbols-outlined text-secondary text-[16px] shrink-0">info</span>
<span className="font-body-sm text-body-sm text-secondary font-medium">
          Moderate traffic on Outer Ring Road factored into current arrival time.
        </span>
</div>
</div>
{/* Assigned Verified Technician Card */}
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
{/* Top Row: Tech info */}
<div className="flex items-start gap-space-sm justify-between">
<div className="flex items-center gap-space-sm min-w-0">
<div className="relative shrink-0">
<img className="w-14 h-14 rounded-full object-cover" data-alt="Verified technician headshot Rajesh Kumar, Indian male technician in mid 30s with friendly approachable expression, wearing green eco-pest uniform cap and embroidered ID badge. Soft natural day lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEgjWNFLA47Dwqcc8XEAWeDZQZJPNeH1OTtHK2qTEnP-prbVNOoCIMi6Qg___qAyqI35b0DE8xK_k85fDphM4wIROrMrLfjp4CtzDC_5lkE5V5OaQXSNF93LGs1nHSpY6wJzcgRpy8Fa9pKytAXTYSS_VVS6n4XgDsFDbmkMcBV5aQe278cidCDypBNdU56gGqgFYwR7-QkukGi8H2woYvqqqcL9DaE2ZJAJS2m2Lg93erLSC2uJykMA"/>
<div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined text-[13px]">verified</span>
</div>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1 flex-wrap">
<span className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">Rajesh Kumar</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Sr. Bio-Tech • 184 Jobs Done</span>
<div className="flex items-center gap-2 mt-0.5">
<div className="inline-flex items-center gap-0.5 text-secondary font-bold font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                4.9
              </div>
<span className="text-outline-variant font-body-sm text-body-sm">•</span>
<span className="px-1.5 py-0.2 rounded bg-primary-fixed/40 text-primary font-label-sm text-label-sm">2-Step KYC</span>
</div>
</div>
</div>
{/* Call & Chat Actions */}
<div className="flex items-center gap-1.5 shrink-0">
<a aria-label="Call Rajesh" className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xs active:scale-95 transition-transform" href="tel:5550192834">
<span className="material-symbols-outlined text-[19px]">call</span>
</a>
<button aria-label="Chat with Rajesh" className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center active:scale-95 transition-transform" id="chatToggleBtn">
<span className="material-symbols-outlined text-[19px]">chat</span>
</button>
</div>
</div>
{/* Vehicle & Equipment Details */}
<div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low text-on-surface">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">electric_meter</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Assigned Unit</span>
<span className="font-label-md text-label-md font-semibold text-on-surface">Eco-Van #14</span>
</div>
</div>
<div className="px-2.5 py-1 rounded bg-surface-variant font-label-md text-label-md tracking-wider text-on-surface font-mono font-bold">
          KA-01-EQ-4021
        </div>
</div>
{/* Service Start OTP Banner (Tactile Security Token) */}
<div className="p-3.5 rounded-xl bg-primary-fixed/30 flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Service Start OTP</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Share with Rajesh upon doorstep arrival</span>
</div>
<div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-on-primary font-data-metric text-data-metric font-bold tracking-widest">
<span>8</span><span>4</span><span>9</span><span>1</span>
</div>
</div>
</div>
{/* Live Step Timeline Tracker */}
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center justify-between mb-1">
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">Dispatch Progress</span>
<span className="font-label-sm text-label-sm text-primary bg-primary-fixed/50 px-2 py-0.5 rounded-full font-bold">Step 4 of 5</span>
</div>
{/* Timeline Step List */}
<div className="relative flex flex-col gap-space-md pl-2 pt-1">
{/* Connecting Line Background */}
<div className="absolute left-5 top-3 bottom-3 w-0.5 bg-surface-variant pointer-events-none"></div>
<div className="absolute left-5 top-3 h-[72%] w-0.5 bg-primary pointer-events-none transition-all"></div>
{/* Step 1: Completed */}
<div className="relative flex items-center gap-space-sm z-10">
<div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[14px] font-bold">check</span>
</div>
<div className="flex-1 flex items-center justify-between">
<span className="font-body-md text-body-md text-on-surface font-medium">Booking Confirmed</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">09:30 AM</span>
</div>
</div>
{/* Step 2: Completed */}
<div className="relative flex items-center gap-space-sm z-10">
<div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[14px] font-bold">check</span>
</div>
<div className="flex-1 flex items-center justify-between">
<span className="font-body-md text-body-md text-on-surface font-medium">Approved &amp; Assigned</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">09:55 AM</span>
</div>
</div>
{/* Step 3: Completed */}
<div className="relative flex items-center gap-space-sm z-10">
<div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[14px] font-bold">check</span>
</div>
<div className="flex-1 flex items-center justify-between">
<span className="font-body-md text-body-md text-on-surface font-medium">Contact Released</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">10:15 AM</span>
</div>
</div>
{/* Step 4: Active Pulse */}
<div className="relative flex items-center gap-space-sm z-10">
<div className="relative flex items-center justify-center shrink-0">
<span className="animate-ping absolute w-6 h-6 rounded-full bg-secondary-container opacity-75"></span>
<div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
<span className="material-symbols-outlined text-[14px] font-bold">near_me</span>
</div>
</div>
<div className="flex-1 flex items-center justify-between">
<div className="flex flex-col">
<span className="font-body-md text-body-md text-secondary font-bold">Worker En Route</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Outer Ring Road • 42m away</span>
</div>
<span className="font-label-sm text-label-sm text-secondary uppercase font-bold">Live</span>
</div>
</div>
{/* Step 5: Upcoming */}
<div className="relative flex items-center gap-space-sm z-10 opacity-60">
<div className="w-6 h-6 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[14px]">shield</span>
</div>
<div className="flex-1 flex items-center justify-between">
<div className="flex flex-col">
<span className="font-body-md text-body-md text-on-surface font-medium">Treatment &amp; Digital Warranty</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Requires 8491 OTP</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Pending</span>
</div>
</div>
</div>
</div>
{/* Service Details & Warranty Card */}
<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded-lg bg-primary-fixed/40 text-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">pest_control</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold">Treatment Package</span>
<span className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">Termite Drill &amp; Inject + Cockroach Gel</span>
</div>
</div>
{/* Warranty Guarantee Box */}
<div className="p-3 rounded-lg bg-surface-container-low flex items-start gap-space-xs">
<span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">1-Year Eco-Guarantee Activated</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Free re-treatment visits if pests reoccur within 365 days of service sign-off.</span>
</div>
</div>
{/* Pre-treatment Safety Checklist */}
<div className="flex flex-col gap-2 pt-1">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Required Pre-Treatment Prep</span>
<div className="flex flex-col gap-1.5">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[16px]">pets</span>
<span className="font-body-sm text-body-sm text-on-surface">Keep household pets in an isolated separate room.</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[16px]">chair</span>
<span className="font-body-sm text-body-sm text-on-surface">Clear kitchen furniture 2ft away from skirting borders.</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[16px]">sanitizer</span>
<span className="font-body-sm text-body-sm text-on-surface">Keep drinking water and food items covered or chilled.</span>
</div>
</div>
</div>
</div>
{/* Quick Help & Emergency Dispatch Bar */}
<div className="p-space-md rounded-xl bg-surface-container flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[22px]">contact_support</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-bold text-on-surface">Need to delay or reschedule?</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Live operations team active 24/7</span>
</div>
</div>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-highest text-primary font-label-md text-label-md font-semibold hover:bg-surface-variant transition-colors">
        Manage
      </button>
</div>
</div>
{/* Interactive Toast Overlay (Micro-interaction placeholder) */}
<div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm opacity-0 pointer-events-none transition-opacity duration-300 shadow-xl flex items-center gap-1.5" id="recenterToast">
<span className="material-symbols-outlined text-[16px]">gps_fixed</span>
<span>Map recentered to Rajesh's Eco-Van</span>
</div>
</div>
</main><nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)]" data-active-classes="text-primary font-bold"><div className="flex items-center justify-around h-16 px-1"><a className="flex flex-col items-center justify-center min-w-[64px] h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="services" href="#"><span className="material-symbols-outlined text-[22px]">eco</span><span className="font-label-sm text-label-sm tracking-tight mt-0.5">Services</span></a><a className="flex flex-col items-center justify-center min-w-[64px] h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="my-bookings" href="#"><span className="material-symbols-outlined text-[22px]">calendar_month</span><span className="font-label-sm text-label-sm tracking-tight mt-0.5">Bookings</span></a><a aria-current="page" className="flex flex-col items-center justify-center min-w-[64px] h-12 transition-colors text-primary font-bold" data-path="live-track" href="#"><span className="material-symbols-outlined text-[22px]">near_me</span><span className="font-label-sm text-label-sm tracking-tight mt-0.5">Live Track</span></a><a className="flex flex-col items-center justify-center min-w-[64px] h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="warranty-&amp;-ledger" href="#"><span className="material-symbols-outlined text-[22px]">verified_user</span><span className="font-label-sm text-label-sm tracking-tight mt-0.5">Ledger</span></a><a className="flex flex-col items-center justify-center min-w-[64px] h-12 text-on-surface-variant hover:text-on-surface transition-colors" data-path="account" href="#"><span className="material-symbols-outlined text-[22px]">manage_accounts</span><span className="font-label-sm text-label-sm tracking-tight mt-0.5">Account</span></a></div></nav>
    </div>
  );
}

import React from 'react';

export default function PlatformOverview() {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased">
<aside className="fixed left-0 top-0 h-full w-72 bg-tertiary text-on-tertiary z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.06)]"><div className="flex flex-col"><div className="h-16 px-space-md flex items-center gap-space-sm bg-tertiary-container"><img alt="Brand logo. - Primary color: #064e3b - Font: plusJakartaSans - Mode: light - Roundness: rounded-md" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1U3O0kc8EHfIIJEgzuRRaOBvzdQaXESpsLEU5jl_aABgxoOaomh-UuOtxiHKnAeyup5cA440HHrEW4GnNTDaZBkS98Q-0cKejJJj5JODixDKAQF2KM0K4gHl9l6c3joxvG4PiTjLUTp8HYx8XigNgjFV5sJdjIZgZ8a6B2-bah5iAZx8HfDC4Rik166Hz5d7MNPQcroBCXmhfe22zRfUM-oLbhGSW8SERbY-Gxe69y6NTobLBgsSmtbNVU"/><div className="flex flex-col"><span className="font-headline-sm text-headline-sm tracking-tight text-on-tertiary leading-none">Pest Free</span><span className="font-label-sm text-label-sm text-on-tertiary-container uppercase tracking-wider">Ops Kernel v4.2</span></div></div><div className="px-space-md pt-space-md pb-space-xs"><span className="font-label-sm text-label-sm uppercase text-on-tertiary-container tracking-wider">Core Systems</span></div><nav className="px-space-sm flex flex-col gap-space-xs" data-active-classes="bg-primary-container text-on-primary-container font-headline-sm font-semibold"><a aria-current="page" className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg transition-colors bg-primary-container text-on-primary-container font-headline-sm font-semibold" data-path="platform-overview" href="#"><span className="material-symbols-outlined text-[20px]">hub</span><span className="font-label-lg text-label-lg">Platform Overview</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-tertiary-container hover:bg-tertiary-container hover:text-on-tertiary transition-colors" data-path="agencies-and-fleet-hubs" href="#"><span className="material-symbols-outlined text-[20px]">local_shipping</span><span className="font-label-lg text-label-lg">Agencies &amp; Fleet Hubs</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-tertiary-container hover:bg-tertiary-container hover:text-on-tertiary transition-colors" data-path="worker-kyc-and-approvals" href="#"><span className="material-symbols-outlined text-[20px]">verified_user</span><span className="font-label-lg text-label-lg">Worker KYC &amp; Approvals</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-tertiary-container hover:bg-tertiary-container hover:text-on-tertiary transition-colors" data-path="two-step-security-audit" href="#"><span className="material-symbols-outlined text-[20px]">security</span><span className="font-label-lg text-label-lg">Two-Step Security Audit</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-tertiary-container hover:bg-tertiary-container hover:text-on-tertiary transition-colors" data-path="api-and-socketio-telemetry" href="#"><span className="material-symbols-outlined text-[20px]">stream</span><span className="font-label-lg text-label-lg">API &amp; Socket.IO Telemetry</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-tertiary-container hover:bg-tertiary-container hover:text-on-tertiary transition-colors" data-path="database-and-postgis-queries" href="#"><span className="material-symbols-outlined text-[20px]">dataset</span><span className="font-label-lg text-label-lg">Database &amp; PostGIS Queries</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-tertiary-container hover:bg-tertiary-container hover:text-on-tertiary transition-colors" data-path="system-settings" href="#"><span className="material-symbols-outlined text-[20px]">settings_input_component</span><span className="font-label-lg text-label-lg">System Settings</span></a></nav></div><div className="p-space-md bg-tertiary-container/50 mx-space-sm mb-space-md rounded-xl flex flex-col gap-space-xs"><div className="flex items-center justify-between"><span className="font-label-sm text-label-sm text-on-tertiary-container uppercase">Worker Pool</span><span className="font-label-sm text-label-sm text-secondary-fixed bg-secondary-fixed/20 px-space-xs rounded">ACTIVE</span></div><div className="flex items-center justify-between text-on-tertiary"><span className="font-body-sm text-body-sm">124 Units On-Duty</span><span className="font-label-md text-label-md text-primary-fixed">99.8% Geo-Lock</span></div></div></aside><div className="pl-72"><header className="fixed top-0 left-72 right-0 h-16 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg"><div className="flex items-center gap-space-md flex-1 max-w-xl"><div className="flex items-center gap-space-xs bg-surface-container-high px-space-sm py-1 rounded-full"><span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">DEV MODE</span><span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span></div><div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-1 rounded-lg"><span className="material-symbols-outlined text-[14px] text-primary">dns</span><span className="font-label-sm text-label-sm text-on-surface font-semibold">PROD / CLUSTER-01</span></div><div className="relative flex-1"><span className="material-symbols-outlined absolute left-space-sm top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span><input className="w-full pl-9 pr-space-md py-1.5 bg-surface-container-low rounded-lg text-body-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-colors" placeholder="Query trace, node, entity, worker..." type="text"/></div></div><div className="flex items-center gap-space-md"><div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-1 rounded-lg"><div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-surface-tint animate-pulse"></span><span className="font-label-sm text-label-sm text-on-surface-variant font-medium">LATENCY</span></div><span className="font-label-md text-label-md text-primary font-bold">18ms</span></div><div className="flex items-center gap-space-xs"><button className="h-8 w-8 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-[18px]">terminal</span></button><button className="h-8 w-8 flex items-center justify-center rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-[18px]">notifications</span></button></div><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></header><main className="relative pt-16 bg-surface min-h-screen px-space-lg py-space-md"><div className="flex flex-col w-full">
{/* Command Header & Breadcrumb Strip */}
<div className="flex flex-col gap-space-sm mb-space-lg">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex flex-col">
<div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-1">
<span>Internal Ops Console</span>
<span className="text-outline">/</span>
<span>Platform Overview</span>
<span className="text-outline">/</span>
<span className="text-primary font-bold">Agency Diagnostics</span>
</div>
<div className="flex items-center gap-space-sm">
<h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">System Core &amp; Fleet Operations Engine</h1>
<span className="px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase font-bold tracking-wide">Kernel v4.2-live</span>
</div>
</div>
{/* Timeframe Toggle & Quick Dev Triggers */}
<div className="flex flex-wrap items-center gap-space-sm">
<div className="flex items-center bg-surface-container-low p-1 rounded-lg shadow-sm" id="timeframe-selector">
<button className="timeframe-btn px-space-md py-1.5 rounded-md font-label-md text-label-md bg-primary-container text-on-primary font-semibold shadow-sm transition-all" data-frame="today" type="button">Today</button>
<button className="timeframe-btn px-space-md py-1.5 rounded-md font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all" data-frame="week" type="button">This Week</button>
<button className="timeframe-btn px-space-md py-1.5 rounded-md font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all" data-frame="month" type="button">This Month</button>
</div>
<div className="flex items-center gap-1.5">
<button className="flex items-center gap-1 px-space-sm py-2 bg-surface-container hover:bg-surface-container-high rounded-lg text-primary font-label-md text-label-md transition-colors shadow-sm"  type="button">
<span className="material-symbols-outlined text-[16px]">sync_alt</span>
<span>BullMQ Sync</span>
</button>
<button className="flex items-center gap-1 px-space-sm py-2 bg-surface-container hover:bg-surface-container-high rounded-lg text-primary font-label-md text-label-md transition-colors shadow-sm"  type="button">
<span className="material-symbols-outlined text-[16px]">cleaning_services</span>
<span>Flush Cache</span>
</button>
<button className="flex items-center gap-1 px-space-md py-2 bg-primary text-on-primary hover:bg-primary-container rounded-lg font-label-md text-label-md transition-colors shadow-sm"  type="button">
<span className="material-symbols-outlined text-[16px]">download</span>
<span>Export CSV</span>
</button>
</div>
</div>
</div>
{/* Micro System Telemetry Belt */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm p-space-sm bg-surface-container-low rounded-xl">
<div className="flex items-center gap-space-sm px-space-sm py-1">
<div className="w-2 h-2 rounded-full bg-surface-tint animate-pulse"></div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Cluster Node</span>
<span className="font-label-md text-label-md text-on-surface truncate font-semibold">asia-south1-prod (Active)</span>
</div>
</div>
<div className="flex items-center gap-space-sm px-space-sm py-1">
<span className="material-symbols-outlined text-primary text-[18px]">database</span>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">PostGIS &amp; PostgreSQL</span>
<span className="font-label-md text-label-md text-primary font-semibold">99.98% Health (18.4 QPS)</span>
</div>
</div>
<div className="flex items-center gap-space-sm px-space-sm py-1">
<span className="material-symbols-outlined text-secondary text-[18px]">sensors</span>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Socket.IO Pipes</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">1,420 Streams (32ms avg)</span>
</div>
</div>
<div className="flex items-center gap-space-sm px-space-sm py-1">
<span className="material-symbols-outlined text-primary-container text-[18px]">tune</span>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Redis Queue State</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">0 Lag • 100% SLA</span>
</div>
</div>
</div>
</div>
{/* Real-time Notification Banner (Dynamic Micro-Interaction) */}
<div className="hidden mb-space-md p-space-sm rounded-lg bg-tertiary text-on-tertiary flex items-center justify-between shadow-md transition-all" id="toast-message">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-[18px] text-secondary-container">bolt</span>
<span className="font-body-sm text-body-sm font-medium" id="toast-text">Command executed successfully.</span>
</div>
<button className="text-on-tertiary-container hover:text-on-tertiary" >
<span className="material-symbols-outlined text-[16px]">close</span>
</button>
</div>
{/* 5-Metric Executive System HUD Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-space-md mb-space-xl">
{/* Metric 1: Total Platform Agencies */}
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Agencies In Fleet</span>
<div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">apartment</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-data-metric text-data-metric text-on-surface">14</span>
<span className="font-label-md text-label-md text-primary font-semibold">Active</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Focus: <strong className="text-primary">EcoPest #PF-8821</strong></p>
</div>
<div className="mt-space-sm pt-space-xs flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">+2 In Sandbox Staging</span>
<span className="font-label-sm text-label-sm text-primary bg-primary-fixed/40 px-2 py-0.5 rounded-full font-bold">100% KYC</span>
</div>
</div>
{/* Metric 2: Worker Fleet Live Status */}
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Worker Deployment</span>
<div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">badge</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-data-metric text-data-metric text-on-surface">142</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">Active Units</span>
</div>
{/* Triple Status Visualizer */}
<div className="flex items-center gap-space-xs mt-2 text-on-surface">
<div className="flex items-center gap-1">
<span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
<span className="font-label-sm text-label-sm font-semibold">92 Site</span>
</div>
<span className="text-outline text-xs">•</span>
<div className="flex items-center gap-1">
<span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
<span className="font-label-sm text-label-sm font-semibold">38 Route</span>
</div>
<span className="text-outline text-xs">•</span>
<div className="flex items-center gap-1">
<span className="w-2.5 h-2.5 rounded-full bg-error"></span>
<span className="font-label-sm text-label-sm font-semibold">12 Idle</span>
</div>
</div>
</div>
<div className="mt-space-sm pt-space-xs">
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden flex">
<div className="bg-primary-container h-full" style={{width: '64.7%'}}></div>
<div className="bg-secondary-container h-full" style={{width: '26.8%'}}></div>
<div className="bg-error h-full" style={{width: '8.5%'}}></div>
</div>
</div>
</div>
{/* Metric 3: Jobs Allotted & Accomplished */}
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Today's Jobs Output</span>
<div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">verified</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-data-metric text-data-metric text-on-surface">328</span>
<span className="font-label-md text-label-md text-on-surface-variant font-semibold">/ 384 Allotted</span>
</div>
<p className="font-body-sm text-body-sm text-primary font-bold mt-1">85.4% Accomplished</p>
</div>
<div className="mt-space-sm pt-space-xs flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">56 in operational queue</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">14m Avg Arrival</span>
</div>
</div>
{/* Metric 4: Client Cohort & Split */}
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Client Portfolio</span>
<div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">groups</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-data-metric text-data-metric text-on-surface">2,840</span>
<span className="font-label-sm text-label-sm text-primary bg-primary-fixed px-1.5 py-0.5 rounded font-bold">+26%</span>
</div>
<div className="flex items-center justify-between mt-2 font-body-sm text-body-sm">
<span className="text-on-surface font-medium">740 New</span>
<span className="text-outline">/</span>
<span className="text-primary font-semibold">2,100 Subscribed (74%)</span>
</div>
</div>
<div className="mt-space-sm pt-space-xs">
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden flex">
<div className="bg-secondary h-full" style={{width: '26%'}}></div>
<div className="bg-primary-container h-full" style={{width: '74%'}}></div>
</div>
</div>
</div>
{/* Metric 5: Platform Success & Satisfaction */}
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Quality &amp; Satisfaction</span>
<div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-data-metric text-data-metric text-on-surface">99.1%</span>
<span className="font-headline-sm text-headline-sm text-secondary font-bold">4.91★</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">1st-Visit Clean Resolution</p>
</div>
<div className="mt-space-sm pt-space-xs flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">12,480 Lifetime Audits</span>
<span className="font-label-sm text-label-sm text-primary font-bold">0.8% Retreatment</span>
</div>
</div>
</div>
{/* Bento Section: Dispatch Map & Agency Focus Diagnostic */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-xl">
{/* Map Center: Interactive Telemetry View (8 cols) */}
<div className="lg:col-span-8 flex flex-col bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden">
{/* Map Header & Zone Filters */}
<div className="p-space-md flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-low">
<div className="flex items-center gap-space-sm">
<div className="w-3 h-3 rounded-full bg-primary-container animate-ping"></div>
<div>
<h2 className="font-headline-sm text-headline-sm text-primary font-bold">Multi-Agency Real-Time Fleet &amp; Dispatch Map</h2>
<span className="font-label-sm text-label-sm text-on-surface-variant">PostGIS 8.5km bounding • 5-sec Socket.IO throttled stream • Live refresh: <span className="font-bold text-primary" id="map-timer">10s</span></span>
</div>
</div>
<div className="flex items-center gap-1.5 bg-surface-container p-1 rounded-lg">
<button className="px-space-sm py-1 rounded bg-surface-container-lowest text-primary font-label-sm text-label-sm font-bold shadow-xs" type="button">All Zones</button>
<button className="px-space-sm py-1 rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm" type="button">Indiranagar</button>
<button className="px-space-sm py-1 rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm" type="button">Koramangala</button>
<button className="px-space-sm py-1 rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm" type="button">Bellandur S7</button>
<button className="px-space-sm py-1 rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm" type="button">Whitefield</button>
</div>
</div>
{/* Real Map Canvas Overlay */}
<div className="relative w-full h-[460px] bg-surface-dim overflow-hidden">
{/* Static Google Map Background via Pipeline Requirement */}
<div className="w-full h-full bg-cover bg-center" data-location="Indiranagar, Bangalore, India" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJMKsHLFiANcigON-4-zYyk8TQW8YLou_WlfeajwXIa50XWsPAQ6_19tn6BzuLI4iR1v31ncNy4yW92Y1xn7lDUDyn6ViThEfWWCUnxyItPtLZcPWUWPiLA-W-ZQIp4NrzbJ9T7bQ2XBTpqPOljwKblJISOBX9jZQxjtryQcOUeyKSc4HUAZ71G330_Xrby42GWn9HyhsDpp9LREsqs9tBiipBOq59vzr-Fr0WuJyB3ycEB3nDuXIGGg")'}}></div>
{/* Translucent Backdrop Shade to enhance tech markers */}
<div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
{/* Telemetry Floating Marker 1: Working on Site (Green) */}
<div className="absolute top-16 left-28 z-20 group cursor-pointer transition-transform hover:scale-105">
<div className="relative flex items-center">
<div className="w-10 h-10 rounded-full bg-surface-container-lowest p-1 shadow-xl flex items-center justify-center">
<img className="w-8 h-8 rounded-full object-cover" data-alt="Close-up portrait of female environmental pest control inspector Anita Desai wearing an organic field suit and smart visor." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkaPzIIoO_vRIVtFyi4s_zxbN1g2yz6liZRQGDo1gHSjH5x0S129nsvXC9bjJxVXYZxafWrhRQ7CjExwbKHztDqniWZVmqGPWio_ItXFUDKvy2IA6zVVAhJcJ-J_nH3Yz58VbJ35DaL4iOaKyy2FkL_YB4t_qR-sYQmmlOBbUSjNjuqNqLDO9PbeOIhmvai0_hi8UuPE_e6Gr57HwHV9eMG7dRr3t3o0unluwZGb_W3wF1ztb7XU2P-Q"/>
<span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-primary-container ring-2 ring-surface-container-lowest"></span>
</div>
<div className="ml-2 bg-surface-container-lowest/95 backdrop-blur-md px-space-sm py-1 rounded-lg shadow-md flex flex-col">
<div className="flex items-center gap-1.5">
<span className="font-label-sm text-label-sm font-bold text-on-surface">Anita Desai</span>
<span className="px-1.5 py-0.2 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[9px] uppercase font-bold">On Site</span>
</div>
<span className="font-body-sm text-[11px] text-on-surface-variant">Termite Inoculation • Villa 18</span>
</div>
</div>
</div>
{/* Telemetry Floating Marker 2: On the Way (Yellow) */}
<div className="absolute top-44 left-1/2 z-20 group cursor-pointer transition-transform hover:scale-105">
<div className="relative flex items-center">
<div className="w-10 h-10 rounded-full bg-surface-container-lowest p-1 shadow-xl flex items-center justify-center">
<img className="w-8 h-8 rounded-full object-cover" data-alt="Portrait of male field technician Rajesh Kumar in high visibility dark green tactical dispatch vest smiling in an urban Bangalore context." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi6SM45tLkVOcud4EjHMNeQZJJOuJIPcRA8aem3VtpP7XBzz-MhO3hCtLmTAx9H9MqslrN6ogVrFGSXNB2S0CdhxiDYISu1J7kDiBESr1jMea4W4nnS1N2PYIRNSQg0F2EC5eLAEOpYsF-mOtD374ORXPW6NRE-yaO-xstJCloX8l0p4I0EFYdT3Fjae7Hg4N9RdxiFkHwhcphjx5nurIJQbRy3JzhoFAKh3OO8CiaOuu6AaZP1bjnUw"/>
<span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-secondary-container ring-2 ring-surface-container-lowest animate-pulse"></span>
</div>
<div className="ml-2 bg-surface-container-lowest/95 backdrop-blur-md px-space-sm py-1 rounded-lg shadow-md flex flex-col">
<div className="flex items-center gap-1.5">
<span className="font-label-sm text-label-sm font-bold text-on-surface">Rajesh Kumar</span>
<span className="px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[9px] uppercase font-bold">En Route</span>
</div>
<span className="font-body-sm text-[11px] text-on-surface-variant">Flat 402, Oakwood • ETA 18m</span>
</div>
</div>
</div>
{/* Telemetry Floating Marker 3: Idle / Standby (Red) */}
<div className="absolute bottom-20 left-1/3 z-20 group cursor-pointer transition-transform hover:scale-105">
<div className="relative flex items-center">
<div className="w-10 h-10 rounded-full bg-surface-container-lowest p-1 shadow-xl flex items-center justify-center">
<img className="w-8 h-8 rounded-full object-cover" data-alt="Headshot of pest logistics technician Devendra Singh resting near an electric field operations vehicle." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzzlqGXVcYR6jzh0BbgsfsGzlBs-KrNrleqBsNXl-FL6OgRPV_sLMNq79qia_VGa9s9AsiH6PGDSKkMspobVImOEdr3ZFJaqZY1OdOgFE93t0s2C-PHLCiqxbpYkBbufPVZD4B6Yv9uKruNfdl1zUy32Yz8STKlLYZb7e7iMaz1n9GJ_kTj9m9glNVOLR6l0XmdXxUiU4-rxy7wGZXhbv0KqrjQXK3U6NrsA62PqavxbKTEwPEGOLJYg"/>
<span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-error ring-2 ring-surface-container-lowest"></span>
</div>
<div className="ml-2 bg-surface-container-lowest/95 backdrop-blur-md px-space-sm py-1 rounded-lg shadow-md flex flex-col">
<div className="flex items-center gap-1.5">
<span className="font-label-sm text-label-sm font-bold text-on-surface">Devendra Singh</span>
<span className="px-1.5 py-0.2 rounded-full bg-error-container text-on-error-container font-label-sm text-[9px] uppercase font-bold">Idle Base</span>
</div>
<span className="font-body-sm text-[11px] text-on-surface-variant">Indiranagar Depot Station</span>
</div>
</div>
</div>
{/* Telemetry Floating Marker 4: Working on site (Green) */}
<div className="absolute top-28 right-24 z-20 group cursor-pointer transition-transform hover:scale-105">
<div className="relative flex items-center">
<div className="w-10 h-10 rounded-full bg-surface-container-lowest p-1 shadow-xl flex items-center justify-center">
<img className="w-8 h-8 rounded-full object-cover" data-alt="Portrait of senior female extermination specialist Vikram Solanki in modern safety gear holding smart diagnostic device." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5MWxvqniNJoMuTaWamayOmnnbwUvBDEMx-xU_PmpnZOYvb7wmWAbWE95LLAQQGqFRlWVwmoFYV0gBJQ0H3lVe7cd3xsXgcq6J32VWdyDKiRBEAJ8Bq9meutkkDCoH0T_XAIim8qWobDsjWPXQpsJXcF0U0qc16DWCHcB-IMFJddctb6tML4h_EgLH8Qp6EluBNWyyN_TwIgZWlucasUj6GxWfUr0VhYwD17UJcHehnVGP6RUoIzb17Q"/>
<span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-primary-container ring-2 ring-surface-container-lowest"></span>
</div>
<div className="ml-2 bg-surface-container-lowest/95 backdrop-blur-md px-space-sm py-1 rounded-lg shadow-md flex flex-col">
<div className="flex items-center gap-1.5">
<span className="font-label-sm text-label-sm font-bold text-on-surface">Vikram Solanki</span>
<span className="px-1.5 py-0.2 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[9px] uppercase font-bold">On Site</span>
</div>
<span className="font-body-sm text-[11px] text-on-surface-variant">Eco-Gel Treatment • Tech Park B4</span>
</div>
</div>
</div>
{/* Floating Tactical Map HUD Sheet */}
<div className="absolute bottom-4 right-4 z-20 bg-surface-container-lowest/90 backdrop-blur-xl p-space-md rounded-xl shadow-xl max-w-xs">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-sm text-label-sm uppercase font-bold text-primary">Live Cluster HUD</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">GeoJSON Feed #39</span>
</div>
<div className="flex flex-col gap-1 font-body-sm text-body-sm text-on-surface">
<div className="flex justify-between">
<span className="text-on-surface-variant">Active Geo-Fences:</span>
<span className="font-semibold text-primary">4 Micro-Zones</span>
</div>
<div className="flex justify-between">
<span className="text-on-surface-variant">Avg Routing Velocity:</span>
<span className="font-semibold text-primary">22.4 km/h</span>
</div>
<div className="flex justify-between">
<span className="text-on-surface-variant">Buffer Breach Alerts:</span>
<span className="font-semibold text-surface-tint">0 Detected (Safe)</span>
</div>
</div>
</div>
</div>
{/* Map Footer Dispatch Velocity Indicators */}
<div className="p-space-md bg-surface-container-low flex flex-wrap items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-lg">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-primary-container"></span>
<span className="font-label-sm text-label-sm text-on-surface font-semibold">92 Working on Site (64.7%)</span>
</div>
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-secondary-container"></span>
<span className="font-label-sm text-label-sm text-on-surface font-semibold">38 On The Way (26.8%)</span>
</div>
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-error"></span>
<span className="font-label-sm text-label-sm text-on-surface font-semibold">12 Idle Standby (8.5%)</span>
</div>
</div>
<button className="font-label-sm text-label-sm text-primary hover:text-primary-container font-bold flex items-center gap-1"  type="button">
<span>Recalculate Optimal Mesh</span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>
{/* Right Side Rail: Monitored Agencies & Hub Deep-Dive (4 cols) */}
<div className="lg:col-span-4 flex flex-col gap-space-md">
{/* Primary Focused Agency Card: EcoPest Solutions */}
<div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-start justify-between mb-space-sm">
<div>
<span className="px-space-xs py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase font-bold">Selected Primary Hub</span>
<h3 className="font-headline-sm text-headline-sm text-primary mt-1 font-bold">EcoPest Solutions</h3>
<p className="font-label-md text-label-md text-on-surface-variant font-mono">Agency Code: #PF-8821 • Bangalore Central</p>
</div>
<div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary font-headline-sm font-bold">
              EP
            </div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
            Certified Organic bio-treatment specialist agency operating across East &amp; Central corridors. High tier dispatch clearance.
          </p>
{/* Core Agency Metrics */}
<div className="grid grid-cols-2 gap-space-sm mb-space-md">
<div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Active Technicians</span>
<div className="flex items-baseline gap-1 mt-0.5">
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">18</span>
<span className="font-body-sm text-body-sm text-surface-tint font-semibold">Online</span>
</div>
<span className="font-label-sm text-label-sm text-outline mt-0.5">4 Units Offline</span>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Today's Jobs</span>
<div className="flex items-baseline gap-1 mt-0.5">
<span className="font-headline-sm text-headline-sm text-on-surface font-bold">36</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">/ 42 Done</span>
</div>
<span className="font-label-sm text-label-sm text-primary font-semibold mt-0.5">6 Remaining</span>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Success Rate</span>
<div className="flex items-baseline gap-1 mt-0.5">
<span className="font-headline-sm text-headline-sm text-primary font-bold">98.4%</span>
</div>
<span className="font-label-sm text-label-sm text-surface-tint mt-0.5">0 Toxic Incidents</span>
</div>
<div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Customer Split</span>
<div className="flex items-baseline gap-1 mt-0.5">
<span className="font-headline-sm text-headline-sm text-secondary font-bold">34</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">New</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">94 Retained Subs</span>
</div>
</div>
</div>
<div className="pt-space-sm flex flex-col gap-space-xs">
<button className="w-full py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md font-semibold hover:bg-primary-container transition-colors flex items-center justify-center gap-2"  type="button">
<span className="material-symbols-outlined text-[16px]">fingerprint</span>
<span>Agency Security Key &amp; Audit</span>
</button>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm px-1">
<span>Primary Dispatch Lead: Ananya Sen</span>
<span className="font-mono text-primary font-semibold">+91 98402 11982</span>
</div>
</div>
</div>
{/* Secondary Agency Quick Selector Stack */}
<div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Other Active Partner Hubs</span>
<div className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer" >
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center font-bold text-on-surface text-xs">US</div>
<div>
<p className="font-label-md text-label-md font-bold text-on-surface">Urban Shield Technologies</p>
<p className="font-label-sm text-label-sm text-on-surface-variant">#PF-9014 • 24 Units • 99.0% Success</p>
</div>
</div>
<span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
</div>
<div className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer" >
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center font-bold text-on-surface text-xs">BS</div>
<div>
<p className="font-label-md text-label-md font-bold text-on-surface">BioSafe Eco Hub</p>
<p className="font-label-sm text-label-sm text-on-surface-variant">#PF-7720 • 31 Units • 98.7% Success</p>
</div>
</div>
<span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
</div>
</div>
</div>
</div>
{/* Developer Telemetry & TRD Compliance Row */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
{/* Socket.IO Telemetry */}
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">Socket.IO Gateway</span>
<span className="px-1.5 py-0.5 rounded bg-surface-tint/20 text-surface-tint font-label-sm text-[10px] font-bold">WebSockets</span>
</div>
<div className="font-headline-sm text-headline-sm font-bold text-primary">1,420 Streams</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
        Throttled interval: 5000ms. Avg round-trip latency: <strong className="text-on-surface">32ms</strong>.
      </p>
<div className="mt-space-sm pt-space-xs flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Heartbeat: 20s Ping</span>
<span className="text-primary font-bold">0 Dropped Frames</span>
</div>
</div>
{/* PostGIS Queries */}
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">PostGIS Engine</span>
<span className="px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-[10px] font-bold">Spatial Index</span>
</div>
<div className="font-headline-sm text-headline-sm font-bold text-primary">18.4 QPS</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
        ST_DWithin queries bound to 8.5km technician dispatch cluster radius.
      </p>
<div className="mt-space-sm pt-space-xs flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Execution: 4.2ms avg</span>
<span className="text-primary font-bold">GiST Indexed</span>
</div>
</div>
{/* BullMQ Notifications */}
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">BullMQ Notification</span>
<span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] font-bold">Redis Workers</span>
</div>
<div className="font-headline-sm text-headline-sm font-bold text-secondary">99.8% WhatsApp</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
        SMS OTP: 99.9% delivery | Transactional Email: 100% SLA clearance.
      </p>
<div className="mt-space-sm pt-space-xs flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Retry Backoff: Exp 3x</span>
<span className="text-secondary font-bold">0 Dead Letters</span>
</div>
</div>
{/* Two-Step Permission Security Audit */}
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">PII Security Vault</span>
<span className="px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-[10px] font-bold">2-Step Auth</span>
</div>
<div className="font-headline-sm text-headline-sm font-bold text-primary">42 Releases Today</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
        Worker contact decryption logged. Strict zero unreleased PII breaches recorded.
      </p>
<div className="mt-space-sm pt-space-xs flex items-center justify-between font-label-sm text-label-sm">
<span className="text-outline">Admin Dual-Sign: On</span>
<span className="text-primary font-bold">Audit Pass</span>
</div>
</div>
</div>
{/* Comprehensive Agency Fleet & Worker Performance Table */}
<div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden mb-space-xl">
<div className="p-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-low">
<div>
<h2 className="font-headline-sm text-headline-sm text-primary font-bold">Active Fleet Inspection &amp; Performance Ledger</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Real-time status tracking, job assignment logs, and administrator cryptographic contact releases.</p>
</div>
{/* Filters & Live Search */}
<div className="flex flex-wrap items-center gap-space-sm">
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[16px]">search</span>
<input className="pl-8 pr-space-md py-1.5 rounded-lg bg-surface-container-lowest font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary shadow-xs" id="workerSearchInput"  placeholder="Search technician, specialization..." type="text"/>
</div>
<select className="px-space-md py-1.5 rounded-lg bg-surface-container-lowest font-label-md text-label-md text-on-surface focus:outline-none shadow-xs" id="agencyFilter" >
<option value="ALL">All Agencies</option>
<option value="EcoPest Solutions">EcoPest Solutions</option>
<option value="Urban Shield">Urban Shield</option>
<option value="BioSafe Hub">BioSafe Hub</option>
</select>
<select className="px-space-md py-1.5 rounded-lg bg-surface-container-lowest font-label-md text-label-md text-on-surface focus:outline-none shadow-xs" id="statusFilter" >
<option value="ALL">All Statuses</option>
<option value="Working">Working On Site</option>
<option value="En Route">En Route</option>
<option value="Idle">Idle Standby</option>
</select>
</div>
</div>
{/* Responsive Table */}
<div className="overflow-x-auto">
<table className="w-full text-left" id="workersTable">
<thead className="bg-surface-container font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
<tr>
<th className="py-3 px-space-md">Worker Profile</th>
<th className="py-3 px-space-md">Agency &amp; Hub</th>
<th className="py-3 px-space-md">Admin Direct Mobile</th>
<th className="py-3 px-space-md">Current State</th>
<th className="py-3 px-space-md">Bio-Specialization</th>
<th className="py-3 px-space-md">Today's Jobs (Done/Q)</th>
<th className="py-3 px-space-md">Rating &amp; Totals</th>
<th className="py-3 px-space-md">Success Rate</th>
<th className="py-3 px-space-md text-right">Developer Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">
{/* Worker 1 */}
<tr className="hover:bg-surface-container-low transition-colors" data-agency="EcoPest Solutions" data-status="Working">
<td className="py-3 px-space-md">
<div className="flex items-center gap-space-sm">
<img className="w-9 h-9 rounded-full object-cover shadow-xs" data-alt="Portrait photo of female exterminator Anita Desai in dark green eco uniform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ56oiWfkhIP0j3xgHhiMRX6lp1HSpWYiJijpHpfhWOn9SGZBZGxlBcbAIjGiocCSQJY1DLegmSRJ_0mxFVs73Wc0FPOqnt0_Wq1dCEXvMHgnXwAntd6HfzlkIu7CHyo1-hiF3RztJeRZsLDn_XCrHyACy9KeQIF4frBZh994gtxVsrvsSZt9velX4m4OFax5HMTogW-mmH70WXNp_OjMAP1oJSQSFuloLvhQS3_MPhMU0dTkyFrbMLw"/>
<div>
<div className="font-label-md text-label-md font-bold text-on-surface">Anita Desai</div>
<div className="font-label-sm text-label-sm text-on-surface-variant font-mono">ID: #TECH-9401</div>
</div>
</div>
</td>
<td className="py-3 px-space-md">
<div className="font-semibold text-primary">EcoPest Solutions</div>
<div className="text-outline text-xs">Hub: #PF-8821 (Central)</div>
</td>
<td className="py-3 px-space-md font-mono text-xs font-semibold text-on-surface">
              +91 98450 18239
            </td>
<td className="py-3 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
                Working
              </span>
</td>
<td className="py-3 px-space-md">
<span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Termite Drill &amp; Inject</span>
</td>
<td className="py-3 px-space-md font-semibold">
<span className="text-primary font-bold">4 Done</span> <span className="text-on-surface-variant">/ 1 in Queue</span>
</td>
<td className="py-3 px-space-md">
<div className="flex items-center gap-1">
<span className="font-bold text-secondary">4.96★</span>
<span className="text-outline text-xs">(412 jobs)</span>
</div>
</td>
<td className="py-3 px-space-md">
<span className="font-bold text-primary font-label-md text-label-md">99.2%</span>
</td>
<td className="py-3 px-space-md text-right">
<div className="flex items-center justify-end gap-1.5">
<button className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-bold shadow-xs"  type="button">Telemetry</button>
<button className="px-2 py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm"  type="button">Audit PII</button>
</div>
</td>
</tr>
{/* Worker 2 */}
<tr className="hover:bg-surface-container-low transition-colors" data-agency="EcoPest Solutions" data-status="En Route">
<td className="py-3 px-space-md">
<div className="flex items-center gap-space-sm">
<img className="w-9 h-9 rounded-full object-cover shadow-xs" data-alt="Portrait photo of technician Rajesh Kumar wearing protective cap and green work polo." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoRsJ_V_oP6EAIozS1snSEgA5HohnU-xZbGWU71ZQvQ2ZUpfG5FaANjh9GFbm4LxACR-WBLGDufaQNiO1mFq4QTBYTW_HuFc2TBrpWWzEt60Qr0AJaxp1cg0TELsjANQBDwT7cPXkvycQA5kW0RyE_dqrsf9Y8p9InFdlIV4vGlbtWqBAVV37HiaCjTfIKwjDwjw_wCrbeVghDAJqkIP3tKjvSXAsO3Z04XDf8JE1cOgz7hhx1VUV_uA"/>
<div>
<div className="font-label-md text-label-md font-bold text-on-surface">Rajesh Kumar</div>
<div className="font-label-sm text-label-sm text-on-surface-variant font-mono">ID: #TECH-8842</div>
</div>
</div>
</td>
<td className="py-3 px-space-md">
<div className="font-semibold text-primary">EcoPest Solutions</div>
<div className="text-outline text-xs">Hub: #PF-8821 (Central)</div>
</td>
<td className="py-3 px-space-md font-mono text-xs font-semibold text-on-surface">
              +91 97312 90481
            </td>
<td className="py-3 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
<span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                En Route (18m)
              </span>
</td>
<td className="py-3 px-space-md">
<span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Cockroach Odorless Gel</span>
</td>
<td className="py-3 px-space-md font-semibold">
<span className="text-primary font-bold">3 Done</span> <span className="text-on-surface-variant">/ 2 in Queue</span>
</td>
<td className="py-3 px-space-md">
<div className="flex items-center gap-1">
<span className="font-bold text-secondary">4.89★</span>
<span className="text-outline text-xs">(320 jobs)</span>
</div>
</td>
<td className="py-3 px-space-md">
<span className="font-bold text-primary font-label-md text-label-md">98.5%</span>
</td>
<td className="py-3 px-space-md text-right">
<div className="flex items-center justify-end gap-1.5">
<button className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-bold shadow-xs"  type="button">Telemetry</button>
<button className="px-2 py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm"  type="button">Audit PII</button>
</div>
</td>
</tr>
{/* Worker 3 */}
<tr className="hover:bg-surface-container-low transition-colors" data-agency="Urban Shield" data-status="Working">
<td className="py-3 px-space-md">
<div className="flex items-center gap-space-sm">
<img className="w-9 h-9 rounded-full object-cover shadow-xs" data-alt="Portrait photo of pest control engineer Vikram Solanki outdoors in front of technical equipment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtpXqbohD8o_OtcnQE3JEb3k-xc34iCKci3o4x4gRdcmf5LaCLiNQ4Ji0F4zymRZvEt5jvjRWFQX1ToGEo5YfXi2tyRgAVtXaKZB-Wq-h-XfhI4U-emwIjvJrd6tZKsOCyTyWIFFKFL8tEvgZDWtYC5RUuQ86Td9vHR1Z74X1lwpxc-6F8B1UIa548YBzXg3WcOzNgFszXhO17EuCvVAQEkMF1g3PeLOcLgOdWCQXVS-JFB5bXU7tBLA"/>
<div>
<div className="font-label-md text-label-md font-bold text-on-surface">Vikram Solanki</div>
<div className="font-label-sm text-label-sm text-on-surface-variant font-mono">ID: #TECH-7104</div>
</div>
</div>
</td>
<td className="py-3 px-space-md">
<div className="font-semibold text-primary">Urban Shield</div>
<div className="text-outline text-xs">Hub: #PF-9014 (East)</div>
</td>
<td className="py-3 px-space-md font-mono text-xs font-semibold text-on-surface">
              +91 99014 34567
            </td>
<td className="py-3 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
                Working
              </span>
</td>
<td className="py-3 px-space-md">
<span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Mosquito Bio-Fogging</span>
</td>
<td className="py-3 px-space-md font-semibold">
<span className="text-primary font-bold">5 Done</span> <span className="text-on-surface-variant">/ 0 in Queue</span>
</td>
<td className="py-3 px-space-md">
<div className="flex items-center gap-1">
<span className="font-bold text-secondary">4.98★</span>
<span className="text-outline text-xs">(680 jobs)</span>
</div>
</td>
<td className="py-3 px-space-md">
<span className="font-bold text-primary font-label-md text-label-md">100.0%</span>
</td>
<td className="py-3 px-space-md text-right">
<div className="flex items-center justify-end gap-1.5">
<button className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-bold shadow-xs"  type="button">Telemetry</button>
<button className="px-2 py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm"  type="button">Audit PII</button>
</div>
</td>
</tr>
{/* Worker 4 */}
<tr className="hover:bg-surface-container-low transition-colors" data-agency="BioSafe Hub" data-status="Idle">
<td className="py-3 px-space-md">
<div className="flex items-center gap-space-sm">
<img className="w-9 h-9 rounded-full object-cover shadow-xs" data-alt="Portrait photo of Devendra Singh wearing an organic pest technician badge with clean neutral background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZukDRTejlh_FFQ0BTP1KltQEx25abYLOf91fBjfPTP5ziTyXg-jYQKUN6X1dsXKOX9iY41LAiAtxVaPHp1lOIJD8wFZEuJ93bCiEvUqOZPvrhoM4AXEzT3MLiYKTKH_YdePFYWtc2SDA1PlWmaUK-4DZvtCg3nF382rehBClqg4ue4esUM4CWVwrdd9Nh5XEYcxpMlVIVz5fIw2tdvTcSaHxo7O7spWDtARNX99ipjhhMRTuMKaqZuA"/>
<div>
<div className="font-label-md text-label-md font-bold text-on-surface">Devendra Singh</div>
<div className="font-label-sm text-label-sm text-on-surface-variant font-mono">ID: #TECH-5219</div>
</div>
</div>
</td>
<td className="py-3 px-space-md">
<div className="font-semibold text-primary">BioSafe Hub</div>
<div className="text-outline text-xs">Hub: #PF-7720 (West)</div>
</td>
<td className="py-3 px-space-md font-mono text-xs font-semibold text-on-surface">
              +91 94480 77123
            </td>
<td className="py-3 px-space-md">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
<span className="w-2 h-2 rounded-full bg-error"></span>
                Idle Standby
              </span>
</td>
<td className="py-3 px-space-md">
<span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Rodent Ultrasonic &amp; Barrier</span>
</td>
<td className="py-3 px-space-md font-semibold">
<span className="text-primary font-bold">2 Done</span> <span className="text-on-surface-variant">/ 0 in Queue</span>
</td>
<td className="py-3 px-space-md">
<div className="flex items-center gap-1">
<span className="font-bold text-secondary">4.82★</span>
<span className="text-outline text-xs">(194 jobs)</span>
</div>
</td>
<td className="py-3 px-space-md">
<span className="font-bold text-primary font-label-md text-label-md">98.1%</span>
</td>
<td className="py-3 px-space-md text-right">
<div className="flex items-center justify-end gap-1.5">
<button className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-bold shadow-xs"  type="button">Telemetry</button>
<button className="px-2 py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm"  type="button">Audit PII</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
{/* Table Footer Pagination / Quick Summary */}
<div className="p-space-md bg-surface-container flex flex-wrap items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
<span>Displaying 4 sampled field units across 3 verified agencies • Total platform: 142 Active Technicians</span>
<div className="flex items-center gap-2">
<button className="px-space-sm py-1 rounded bg-surface-container-lowest text-on-surface font-semibold shadow-xs" type="button">Previous</button>
<span className="text-on-surface font-bold">Page 1 of 36</span>
<button className="px-space-sm py-1 rounded bg-surface-container-lowest text-on-surface font-semibold shadow-xs" type="button">Next</button>
</div>
</div>
</div>
{/* Client Growth & Warranty Retention Ledger (Bento Dual Card) */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg mb-space-lg">
{/* Subscriptions vs New Clients Visual Breakdown */}
<div className="md:col-span-2 bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-sm">
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Customer Acquisition &amp; Retention Cohorts</span>
<h3 className="font-headline-sm text-headline-sm text-primary font-bold">2,840 Cumulative Active Clients</h3>
</div>
<span className="px-space-sm py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">+26% Month-on-Month</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
          High stickiness driven by bio-certified quarterly preventive pest protection. 74% recurrent recurring maintenance rate.
        </p>
{/* Inline SVG Multi-Bar Sparkline Visualization */}
<div className="w-full bg-surface-container-low p-space-md rounded-xl mb-space-md">
<div className="flex items-end justify-between h-28 gap-2">
{/* Week 1 */}
<div className="flex-1 flex flex-col items-center gap-1">
<div className="w-full flex flex-col gap-0.5 justify-end h-20">
<div className="w-full bg-secondary rounded-t" style={{height: '25%'}}></div>
<div className="w-full bg-primary-container rounded-b" style={{height: '55%'}}></div>
</div>
<span className="font-label-sm text-[10px] text-on-surface-variant">W1</span>
</div>
{/* Week 2 */}
<div className="flex-1 flex flex-col items-center gap-1">
<div className="w-full flex flex-col gap-0.5 justify-end h-20">
<div className="w-full bg-secondary rounded-t" style={{height: '28%'}}></div>
<div className="w-full bg-primary-container rounded-b" style={{height: '60%'}}></div>
</div>
<span className="font-label-sm text-[10px] text-on-surface-variant">W2</span>
</div>
{/* Week 3 */}
<div className="flex-1 flex flex-col items-center gap-1">
<div className="w-full flex flex-col gap-0.5 justify-end h-20">
<div className="w-full bg-secondary rounded-t" style={{height: '32%'}}></div>
<div className="w-full bg-primary-container rounded-b" style={{height: '65%'}}></div>
</div>
<span className="font-label-sm text-[10px] text-on-surface-variant">W3</span>
</div>
{/* Week 4 (Current) */}
<div className="flex-1 flex flex-col items-center gap-1">
<div className="w-full flex flex-col gap-0.5 justify-end h-20">
<div className="w-full bg-secondary rounded-t" style={{height: '38%'}}></div>
<div className="w-full bg-primary-container rounded-b" style={{height: '74%'}}></div>
</div>
<span className="font-label-sm text-[10px] text-primary font-bold">W4 (Now)</span>
</div>
</div>
</div>
<div className="grid grid-cols-2 gap-space-md">
<div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container">
<span className="w-3.5 h-3.5 rounded-full bg-secondary"></span>
<div>
<div className="font-label-md text-label-md font-bold text-on-surface">740 New Clients (26%)</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Organic search, referral code &amp; local dispatch</div>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container">
<span className="w-3.5 h-3.5 rounded-full bg-primary-container"></span>
<div>
<div className="font-label-md text-label-md font-bold text-on-surface">2,100 Subscribed (74%)</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Quarterly organic bio-shield contracts</div>
</div>
</div>
</div>
</div>
</div>
{/* SLA, Warranty & Retreatment Gauge */}
<div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between">
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Digital Warranty Guarantee</span>
<h3 className="font-headline-sm text-headline-sm text-primary font-bold mt-1">90-Day Bio-Warranty</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
          Zero chemical irritation policy. Every job carries a tamper-proof digital cryptographic certificate.
        </p>
{/* Inline Visual Radial Metric */}
<div className="my-space-md flex items-center justify-center">
<div className="relative w-36 h-36 flex items-center justify-center">
<svg className="w-full h-full transform -rotate-90" viewbox="0 0 100 100">
<circle className="text-surface-container" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
<circle className="text-primary-container transition-all duration-1000" cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" stroke-dashoffset="2.0" strokeLinecap="round" strokeWidth="8"></circle>
</svg>
<div className="absolute flex flex-col items-center">
<span className="font-data-metric text-data-metric text-primary leading-none">0.8%</span>
<span className="font-label-sm text-[10px] text-on-surface-variant uppercase mt-0.5">Re-treatment</span>
</div>
</div>
</div>
<div className="flex flex-col gap-1.5 font-label-sm text-label-sm">
<div className="flex justify-between p-2 rounded-lg bg-surface-container-low">
<span className="text-on-surface-variant">Average Dispatch Response SLA:</span>
<span className="font-bold text-primary">14 Minutes</span>
</div>
<div className="flex justify-between p-2 rounded-lg bg-surface-container-low">
<span className="text-on-surface-variant">Claims Auto-Resolved:</span>
<span className="font-bold text-primary">100% within 2 Hours</span>
</div>
</div>
</div>
<div className="mt-space-md pt-space-xs">
<button className="w-full py-2 bg-surface-container hover:bg-surface-container-high text-primary rounded-lg font-label-md text-label-md font-bold transition-colors flex items-center justify-center gap-1.5"  type="button">
<span className="material-symbols-outlined text-[16px]">verified_user</span>
<span>View Warranty Audit Registry</span>
</button>
</div>
</div>
</div>
{/* Interactive JavaScript Handling Filters, Timers and Actions */}

</div></main></div>
    </div>
  );
}

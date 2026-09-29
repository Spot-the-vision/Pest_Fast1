import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function WorkerFleet() {
  const [timeFilter, setTimeFilter] = useState('Day');

  return (
    <div className="bg-surface text-on-surface font-body-md text-body-md min-h-screen flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-space-lg flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">nature_people</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-none">Pest Free</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-0.5">Agency Ops OS</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-space-md py-space-md space-y-space-xs overflow-y-auto">
          <Link to="/" className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all">
            <span className="material-symbols-outlined text-[20px]">map</span>
            <span>Dashboard &amp; Live Map</span>
          </Link>
          <Link to="/worker-fleet" className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg bg-primary-container text-on-primary shadow-[0_1px_3px_rgba(2,44,34,0.04)] transition-all bg-primary-container text-on-primary shadow-sm">
            <span className="material-symbols-outlined text-[20px]">electric_moped</span>
            <span>Worker Fleet &amp; Rosters</span>
          </Link>
          <a href="#" className="flex items-center justify-between px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[20px]">approval_delegation</span>
              <span>Bookings Queue</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm font-bold">4</span>
          </a>
          <a href="#" className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all">
            <span className="material-symbols-outlined text-[20px]">business</span>
            <span>Client Directory &amp; History</span>
          </a>
          <a href="#" className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all">
            <span className="material-symbols-outlined text-[20px]">bar_chart</span>
            <span>Analytics &amp; Reports</span>
          </a>
          <a href="#" className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all">
            <span className="material-symbols-outlined text-[20px]">tune</span>
            <span>Settings</span>
          </a>
        </nav>

        <div className="p-space-md bg-surface-container-low">
          <div className="p-space-md rounded-xl bg-surface-container flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Fleet Utilization</span>
              <span className="font-label-sm text-label-sm font-bold text-primary">92%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
              <div className="h-full bg-primary-container rounded-full w-[92%]"></div>
            </div>
            <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
              <span>14 Active Techs</span>
              <span className="flex items-center text-primary">
                <span className="material-symbols-outlined text-[14px] mr-0.5">energy_savings_leaf</span>Bio Safe
              </span>
            </div>
          </div>
        </div>
      </aside>

      <div className="pl-72 w-full">
        {/* Header */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg">
          <div className="flex items-center gap-space-md">
            <button type="button" className="flex items-center gap-space-sm px-space-md py-1.5 rounded-xl bg-surface-container-lowest shadow-[0_1px_3px_rgba(2,44,34,0.04)] hover:bg-surface-container transition-colors text-left">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-lg text-label-lg text-on-surface">EcoPest Solutions</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">#PF-8821</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px] text-primary">verified</span>Verified Commercial Partner
                </span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px] ml-space-xs">unfold_more</span>
            </button>
            <div className="hidden xl:flex items-center gap-space-md pl-space-sm">
              <div className="flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container">
                <span className="material-symbols-outlined text-secondary text-[16px]">star</span>
                <span className="font-label-md text-label-md text-on-surface font-bold">4.9</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">(318 reviews)</span>
              </div>
              <div className="flex items-center gap-space-md">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Active Units</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">18/20</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">SLA Response</span>
                  <span className="font-headline-sm text-headline-sm text-primary">14m</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-space-md">
            <div className="relative">
              <button aria-label="Pending owner approvals" type="button" className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors relative">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm font-bold">3</span>
              </button>
            </div>
            <div className="flex items-center gap-space-sm pl-space-xs">
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="font-label-md text-label-md text-on-surface font-bold leading-tight">Marcus Sterling</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">Chief Dispatcher</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="w-full pt-16 bg-surface px-space-lg">
          <div className="flex flex-col w-full pb-space-2xl">
            {/* Agency Executive Overview Bar */}
            <section className="w-full bg-surface-container-low rounded-xl p-space-md mb-space-lg shadow-sm mt-space-md">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                {/* Left: Agency Identity & Connectivity */}
                <div className="flex items-center justify-between lg:justify-start gap-space-md">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm shadow-sm">
                      <span className="material-symbols-outlined text-[22px]">pest_control</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-space-xs">
                        <span className="font-headline-sm text-headline-sm text-primary">EcoPest Solutions</span>
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                          Online
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Metropolitan Field Division #4</span>
                    </div>
                  </div>
                  <button className="lg:hidden flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-md text-label-md transition-colors" type="button">
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    <span>Exit</span>
                  </button>
                </div>

                {/* Center: Key Operational Agency SLA Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm flex-1 lg:max-w-3xl lg:px-space-lg">
                  {/* Metric 1 */}
                  <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-2.5 rounded-xl shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                      <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Success Rate</span>
                      <span className="font-label-lg text-label-lg text-primary truncate">98.4% Dispatch Success</span>
                    </div>
                  </div>
                  {/* Metric 2 */}
                  <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-2.5 rounded-xl shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Agency Rating</span>
                      <span className="font-label-lg text-label-lg text-on-surface truncate">4.8 ★ <span className="font-body-sm text-body-sm text-on-surface-variant">(1,420+ Jobs)</span></span>
                    </div>
                  </div>
                  {/* Metric 3 */}
                  <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-2.5 rounded-xl shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                      <span className="material-symbols-outlined text-[18px]">bolt</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Fast-Response SLA</span>
                      <span className="font-label-lg text-label-lg text-tertiary truncate">Avg: Under 2.5 hrs</span>
                    </div>
                  </div>
                </div>

                {/* Right: Desktop Logout CTA */}
                <div className="hidden lg:flex items-center">
                  <button className="flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-md text-label-md transition-all" type="button">
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Interactive Map Telemetry Viewport */}
            <section className="w-full relative h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-md mb-space-xl bg-surface-container-high">
              {/* Dotted Map Surface Simulation */}
              <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'radial-gradient(var(--tw-colors-outline-variant, #bfc9c3) 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }}></div>
              
              {/* Vector Map Grid Arterials */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 text-outline-variant" xmlns="http://www.w3.org/2000/svg">
                <path d="M-50,80 Q200,60 450,140 T950,120 T1450,220" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
                <path d="M120,-30 Q160,200 320,400" fill="none" stroke="currentColor" strokeDasharray="6 6" strokeWidth="3"></path>
                <path d="M600,-20 Q540,160 780,420" fill="none" stroke="currentColor" strokeWidth="3"></path>
                <path d="M300,280 Q620,240 1020,340" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="5"></path>
                {/* Active navigation path from worker to target Job */}
                <path className="animate-pulse" d="M 50% 50% Q 62% 45% 72% 38%" fill="none" stroke="#fea619" strokeDasharray="8 6" strokeWidth="4"></path>
              </svg>

              {/* Map Top Floater / Status overlay */}
              <div className="absolute top-space-md left-space-md z-10 flex items-center gap-space-sm bg-surface-container-lowest/90 backdrop-blur-md px-space-md py-2 rounded-xl shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Live GPS Telemetry</span>
                <span className="text-on-surface-variant font-body-sm text-body-sm">| Sector 7 High-Density Zone</span>
              </div>

              {/* Map Zoom / Layer Controls */}
              <div className="absolute top-space-md right-space-md z-10 flex flex-col gap-1 shadow-md rounded-xl overflow-hidden bg-surface-container-lowest">
                <button aria-label="Zoom In" className="w-9 h-9 flex items-center justify-center hover:bg-surface-container text-on-surface transition-colors" type="button">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
                <button aria-label="Zoom Out" className="w-9 h-9 flex items-center justify-center hover:bg-surface-container text-on-surface transition-colors" type="button">
                  <span className="material-symbols-outlined text-[20px]">remove</span>
                </button>
                <button aria-label="Recenter" className="w-9 h-9 flex items-center justify-center hover:bg-surface-container text-primary transition-colors" type="button">
                  <span className="material-symbols-outlined text-[20px]">my_location</span>
                </button>
              </div>

              {/* Centered Technician "You Are Here" Radar Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                {/* Radiating Echo Ring */}
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-20 h-20 rounded-full bg-primary-container/20 animate-ping"></span>
                  <span className="absolute w-12 h-12 rounded-full bg-primary-container/30"></span>
                  {/* Central Icon Anchor */}
                  <div className="relative w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-xl">
                    <span className="material-symbols-outlined text-[22px]">navigation</span>
                  </div>
                </div>
                {/* Label Tag */}
                <div className="mt-2 px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shadow-lg whitespace-nowrap flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
                  <span>You are here (Tech Van #14)</span>
                </div>
              </div>

              {/* Next Job Destination Marker (JOB-9021) */}
              <div className="absolute top-[38%] left-[72%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                </div>
                <div className="mt-1 px-2 py-0.5 rounded bg-surface-container-lowest/95 backdrop-blur shadow text-on-surface font-label-sm text-label-sm font-bold flex items-center gap-1 whitespace-nowrap">
                  <span>JOB-9021</span>
                  <span className="text-on-surface-variant font-body-sm">(3.2km)</span>
                </div>
              </div>

              {/* Bottom Map Floating Status HUD */}
              <div className="absolute bottom-space-md left-space-md right-space-md sm:right-auto z-10 flex items-center justify-between sm:justify-start gap-space-md bg-surface-container-lowest/95 backdrop-blur-md px-space-md py-2.5 rounded-xl shadow-lg">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[20px]">eco</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Active Kit</span>
                    <span className="font-label-md text-label-md text-primary font-bold">Bio-Safe Organic Pyrethrin</span>
                  </div>
                </div>
                <div className="h-6 w-px bg-surface-container-high hidden sm:block"></div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">electric_bolt</span>
                  <span className="font-label-md text-label-md text-on-surface">Battery: <strong>88%</strong> (Range: 164 km)</span>
                </div>
              </div>
            </section>

            {/* Worker Dashboard & Assignment Controls Split Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
              {/* Left Column: Individual Worker Daily Telemetry & Shift Card */}
              <div className="xl:col-span-4 flex flex-col gap-space-lg">
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col">
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-12 h-12 rounded-xl bg-tertiary text-on-tertiary flex items-center justify-center font-headline-sm text-headline-sm shadow-sm">
                        <span className="material-symbols-outlined text-[26px]">person</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-headline-sm text-headline-sm text-on-surface">Elena Rostova</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-primary">verified</span>
                          Lead Certified Technician (Bio-IV)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Filter Pill Bar */}
                  <div className="w-full p-1 bg-surface-container rounded-xl flex items-center gap-1 mb-space-lg">
                    {['Day', 'Week', 'Month'].map(filter => (
                      <button 
                        key={filter}
                        onClick={() => setTimeFilter(filter)}
                        className={`flex-1 py-1.5 rounded-lg font-label-md text-label-md text-center transition-all ${timeFilter === filter ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`} 
                        type="button">
                        {filter}
                      </button>
                    ))}
                  </div>

                  {/* Individual Worker Daily Stats */}
                  <div className="flex flex-col gap-space-sm">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Daily Performance Shift</span>
                    <div className="grid grid-cols-2 gap-space-sm">
                      <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Success Rate</span>
                        <span className="font-data-metric text-data-metric text-primary my-1">100%</span>
                        <div className="flex items-center gap-1 text-primary font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          Zero Defect Run
                        </div>
                      </div>
                      <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Avg Rating</span>
                        <span className="font-data-metric text-data-metric text-secondary my-1">★ 5.0</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Flawless Feedback</span>
                      </div>
                    </div>

                    <div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-10 h-10 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                          <span className="material-symbols-outlined text-[22px]">task_alt</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-lg text-label-lg text-on-surface">3 Completed Today</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Estimated Finish: 8:45 PM</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-surface-container font-label-sm text-label-sm font-bold text-primary">On Target</span>
                    </div>
                  </div>

                  {/* Shift Route Telemetry Progress Bar */}
                  <div className="mt-space-lg pt-space-md bg-surface-container-lowest flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Today's Route Schedule</span>
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">3 of 6 Jobs Cleared (50%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                      <div className="h-full bg-primary-container rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>

                {/* Quick Dispatch Helper Box */}
                <div className="bg-primary-container text-on-primary p-space-lg rounded-xl shadow-sm flex flex-col gap-space-sm relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-primary-fixed-variant/40 blur-xl pointer-events-none"></div>
                  <div className="flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-wider text-on-primary-container">
                    <span className="material-symbols-outlined text-[16px]">contact_support</span>
                    <span>Central Dispatch Desk</span>
                  </div>
                  <span className="font-headline-sm text-headline-sm leading-snug">Need chemical resupply or route realignment?</span>
                  <p className="font-body-sm text-body-sm text-on-primary/80">Marcus is monitoring Sector 7 frequencies. Immediate assistance SLA is under 60 seconds.</p>
                  <button className="mt-2 w-full py-2.5 px-space-md rounded-lg bg-surface-container-lowest text-primary font-label-lg text-label-lg shadow-sm hover:bg-surface-container transition-all flex items-center justify-center gap-space-xs" type="button">
                    <span className="material-symbols-outlined text-[18px]">radio</span>
                    <span>Open Frequency Channel</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Assigned Queue Section */}
              <div className="xl:col-span-8 flex flex-col gap-space-md">
                <div className="flex items-center justify-between bg-surface-container-lowest px-space-lg py-space-md rounded-xl shadow-sm">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                    </div>
                    <div>
                      <span className="font-headline-sm text-headline-sm text-on-surface">Assigned Queue</span>
                      <span className="ml-2 font-label-sm text-label-sm text-on-surface-variant font-normal">(3 pending field interventions)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors" title="Sort by proximity" type="button">
                      <span className="material-symbols-outlined text-[18px]">near_me</span>
                    </button>
                    <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors" title="Refresh queue" type="button">
                      <span className="material-symbols-outlined text-[18px]">sync</span>
                    </button>
                  </div>
                </div>

                {/* DISPATCH CARD 1: JOB-9021 */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md hover:shadow-lg transition-all relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary-container"></div>
                  <div className="flex flex-col gap-space-md">
                    <div className="flex flex-wrap items-center justify-between gap-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm font-bold tracking-wider">JOB-9021</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                          Today, 2:00 PM
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-primary">route</span>
                          3.2 km away
                        </span>
                      </div>
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                        <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                        Customer Contact Released
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-low p-space-md rounded-xl">
                      <div className="flex items-start gap-space-md">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm shrink-0">
                          <span className="material-symbols-outlined text-[28px]">pest_control_rodent</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-headline-sm text-headline-sm text-on-surface">Termite Eradication</span>
                          <span className="font-body-md text-body-md text-on-surface-variant mt-0.5">742 Evergreen Terrace, Sector 7-C</span>
                          <div className="flex items-center gap-space-sm mt-1.5 font-label-sm text-label-sm">
                            <span className="text-primary font-bold">Client: David K. Chen</span>
                            <span className="text-on-surface-variant">•</span>
                            <span className="text-on-surface-variant">Pre-authorized Keybox #8491</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end gap-1 shrink-0">
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Estimated Service</span>
                        <span className="font-label-lg text-label-lg text-on-surface font-bold">75 Minutes</span>
                        <span className="font-label-sm text-label-sm text-primary flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">eco</span>
                          Target: Subterranean colony
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
                      <div className="flex items-center gap-space-md text-on-surface-variant font-body-sm text-body-sm">
                        <a className="flex items-center gap-1 hover:text-primary transition-colors" href="tel:+15550192834">
                          <span className="material-symbols-outlined text-[16px] text-primary">call</span>
                          +1 (555) 019-2834
                        </a>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-primary">pin_drop</span>
                          Gate Code: #4820
                        </span>
                      </div>
                      <button className="w-full sm:w-auto px-space-lg py-3 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-lg text-label-lg transition-all shadow-md flex items-center justify-center gap-space-sm" type="button">
                        <span className="material-symbols-outlined text-[20px]">near_me</span>
                        <span>Navigate &amp; Start Treatment</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* DISPATCH CARD 2: JOB-9022 */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex flex-wrap items-center justify-between gap-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm font-bold tracking-wider">JOB-9022</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">schedule</span>
                          Today, 5:30 PM
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">route</span>
                          5.1 km away
                        </span>
                      </div>
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                        Masked - Waiting for Owner Arrival Approval
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-low p-space-md rounded-xl">
                      <div className="flex items-start gap-space-md">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-lowest text-secondary flex items-center justify-center shadow-sm shrink-0">
                          <span className="material-symbols-outlined text-[28px]">yard</span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-space-xs">
                            <span className="font-headline-sm text-headline-sm text-on-surface">Mosquito Pest Control</span>
                            <span className="material-symbols-outlined text-on-surface-variant text-[16px]" title="Privacy Locked">lock</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-body-md text-body-md text-on-surface select-none">4100 ••••••••• Avenue, Unit •••</span>
                            <span className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded text-on-surface-variant">Geo-Locked</span>
                          </div>
                          <span className="font-label-sm text-label-sm text-on-surface-variant mt-1.5">Contact coordinates unlock when owner confirms arrival window.</span>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end gap-1 shrink-0">
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Bio Treatment Area</span>
                        <span className="font-label-lg text-label-lg text-on-surface font-bold">Exterior Yard Perimeter</span>
                        <span className="font-label-sm text-label-sm text-secondary flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">mic_detect_auto</span>
                          Eco Mist System (100% Pet-safe)
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
                      <div className="flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[18px] text-secondary">info</span>
                        <span>Owner notified at 1:15 PM • Awaiting arrival check-in</span>
                      </div>
                      <button className="w-full sm:w-auto px-space-lg py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-all flex items-center justify-center gap-space-sm" type="button">
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                        <span>View Masked Details</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* DISPATCH CARD 3: JOB-9023 */}
                <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                  <div className="flex flex-col gap-space-md">
                    <div className="flex flex-wrap items-center justify-between gap-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm font-bold tracking-wider">JOB-9023</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">schedule</span>
                          Today, 7:15 PM
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">route</span>
                          1.8 km away
                        </span>
                      </div>
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold">
                        <span className="w-2 h-2 rounded-full bg-outline"></span>
                        Queued for Evening
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-low p-space-md rounded-xl">
                      <div className="flex items-start gap-space-md">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-lowest text-tertiary flex items-center justify-center shadow-sm shrink-0">
                          <span className="material-symbols-outlined text-[28px]">bug_report</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-headline-sm text-headline-sm text-on-surface">Cockroach Deep Treatment</span>
                          <span className="font-body-md text-body-md text-on-surface-variant mt-0.5">889 Northwood Plaza, Suite 210</span>
                          <div className="flex items-center gap-space-sm mt-1.5 font-label-sm text-label-sm">
                            <span className="text-tertiary font-bold">Commercial Kitchen Facility</span>
                            <span className="text-on-surface-variant">•</span>
                            <span className="text-on-surface-variant">Night Dispatch Window</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end gap-1 shrink-0">
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Method Protocol</span>
                        <span className="font-label-lg text-label-lg text-on-surface font-bold">Gel Baiting &amp; Thermal Seal</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">verified</span>
                          Non-Residual Bio Compound
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
                      <div className="flex items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[18px]">storefront</span>
                        <span>Commercial Service • Contact manager upon back door arrival</span>
                      </div>
                      <button className="w-full sm:w-auto px-space-lg py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-lg text-label-lg transition-all flex items-center justify-center gap-space-sm" type="button">
                        <span className="material-symbols-outlined text-[18px]">directions</span>
                        <span>Navigate</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

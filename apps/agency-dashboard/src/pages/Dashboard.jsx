import React, { useState } from 'react';

export default function AgencyDashboard() {
  // State for interactive elements
  const [timeframe, setTimeframe] = useState('today');
  const [focusedWorker, setFocusedWorker] = useState(null);
  const [targetStatus, setTargetStatus] = useState('Target Focused: Central Dispatch Node');
  const [isRecentering, setIsRecentering] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Handlers
  const handleFocusWorker = (workerId, workerName) => {
    setFocusedWorker(workerId);
    setTargetStatus(`Target Focused: ${workerName}`);
    setTimeout(() => setFocusedWorker(null), 3200);
  };

  const handleRecenter = () => {
    setTargetStatus('Target Focused: Central Dispatch Node (Whitefield & Indiranagar)');
    setIsRecentering(true);
    setTimeout(() => setIsRecentering(false), 1200);
  };

  const handleOpenModal = (clientData) => {
    setSelectedClient(clientData);
  };

  const handleCloseModal = (e) => {
    if (e.target.id === 'client-history-modal' || e.target.id === 'close-client-modal') {
      setSelectedClient(null);
    }
  };

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
          <a href="#" className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all">
            <span className="material-symbols-outlined text-[20px]">map</span>
            <span>Dashboard &amp; Live Map</span>
          </a>
          <a href="#" className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all">
            <span className="material-symbols-outlined text-[20px]">electric_moped</span>
            <span>Worker Fleet &amp; Rosters</span>
          </a>
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
          <div className="flex flex-col w-full">
            {/* Interactive Operations Deck Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-lg">
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Operational Command v4.2</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Central Bio-Dispatch</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">EcoPest Agency Dashboard</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">Live telemetry, field personnel tracking, and active organic pest warranty ledger.</p>
              </div>
              
              {/* Timeframe Filters & Interactive Range Badge */}
              <div className="flex flex-wrap items-center gap-space-sm">
                <div className="flex items-center p-1 rounded-xl bg-surface-container shadow-sm">
                  <button 
                    type="button" 
                    onClick={() => setTimeframe('today')}
                    className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all ${timeframe === 'today' ? 'bg-primary-container text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`}
                  >Today</button>
                  <button 
                    type="button" 
                    onClick={() => setTimeframe('week')}
                    className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all ${timeframe === 'week' ? 'bg-primary-container text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`}
                  >This Week</button>
                  <button 
                    type="button" 
                    onClick={() => setTimeframe('month')}
                    className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all ${timeframe === 'month' ? 'bg-primary-container text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`}
                  >This Month</button>
                </div>
                <div className="flex items-center gap-space-sm px-space-md py-2 rounded-xl bg-surface-container-lowest shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px]">calendar_today</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase text-on-surface-variant leading-none">Schedule Window</span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Oct 24, 2024 • Shift A</span>
                  </div>
                  <div className="flex items-center gap-1 ml-space-xs px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                    2 Backlogs
                  </div>
                </div>
              </div>
            </div>

            {/* Telemetry Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md pb-space-xl">
              <div className="flex flex-col p-space-md rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Active Fleet Roster</span>
                  <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant">
                    <span className="material-symbols-outlined text-[18px]">electric_moped</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-space-xs mt-2">
                  <span className="font-data-metric text-data-metric text-primary">18</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface-variant font-medium">/ 22 Units</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">18 Active • 4 Offline</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold">81.8% Deploy</span>
                </div>
              </div>

              <div className="flex flex-col p-space-md rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Jobs Dispatched</span>
                  <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                    <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-space-xs mt-2">
                  <span className="font-data-metric text-data-metric text-on-surface">42</span>
                  <span className="font-body-md text-body-md text-on-surface-variant">Allotted Today</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2">
                  <div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[16px]">priority_high</span>
                    6 Critical Infestations
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Avg: 2.3/tech</span>
                </div>
              </div>

              <div className="flex flex-col p-space-md rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Total Completed</span>
                  <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-space-xs mt-2">
                  <span className="font-data-metric text-data-metric text-primary">36</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface-variant font-medium">Done</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full transition-all duration-500" style={{ width: '85.7%' }}></div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">85.7% Completion Rate</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">6 in-progress</span>
                </div>
              </div>

              <div className="flex flex-col p-space-md rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Client Directory</span>
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">domain</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-space-xs mt-2">
                  <span className="font-data-metric text-data-metric text-on-surface">128</span>
                  <span className="font-body-md text-body-md text-on-surface-variant">Total Subscribed</span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2">
                  <div className="flex items-center gap-1 text-primary font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[16px]">nest_eco_leaf</span>
                    100% Bio-Certified
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">14 Sectors Active</span>
                </div>
              </div>
            </div>

            {/* Live Interactive Fleet Map & Worker Tracking */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg pb-space-2xl">
              {/* Map View */}
              <div className="xl:col-span-7 flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-3 h-3 rounded-full bg-secondary animate-pulse"></div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">Live Urban Fleet Dispatch Map</h2>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-medium">GPS Auto-sync 15s</span>
                  </div>
                  <button type="button" onClick={handleRecenter} className="flex items-center gap-1 px-space-sm py-1 rounded-lg bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container font-label-sm text-label-sm transition-colors">
                    <span className="material-symbols-outlined text-[16px]">my_location</span>
                    Recenter City Grid
                  </button>
                </div>

                <div className="relative w-full h-[460px] rounded-3xl overflow-hidden bg-surface-container-high shadow-md">
                  <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBRs8gDCt8ya7cA_eQmmbI1HAZ8nHR-irxaIk6u_YMA5Ho-grbr8nh18kAJjn8e_o-F4Ca3ZVV-tohIyal-ccC5ETual5uDUasczBIs956Z-PoAYwlCuJy-87rCojpfHuBvsumVXl67GUDUCF18YScouDpdl_b6NPDCZ8SEPzmk2p57Bc6hwrbdMQVVXBEs9FWYbICRPS2z17TyyJr3sRzdH66O4zWBaE1PDTXx8nLQrdsyq0omLcn-eA')" }}></div>
                  <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px]"></div>
                  
                  {/* Floating HUD */}
                  <div className="absolute top-4 left-4 p-3 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md shadow-lg flex items-center gap-space-md z-20">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold">Active: 14</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold">En Route: 4</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-outline"></span>
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold">Idle: 4</span>
                    </div>
                  </div>

                  {/* Worker Pins */}
                  <div className={`map-worker-pin absolute top-[28%] left-[34%] transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all duration-300 hover:scale-110 ${focusedWorker === 1 ? 'ring-4 ring-secondary scale-125' : ''} ${isRecentering ? 'animate-bounce' : ''}`}>
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-12 h-12 rounded-full bg-secondary-container/40 animate-ping"></div>
                      <div className="w-10 h-10 rounded-full bg-surface-container-lowest shadow-xl flex items-center justify-center p-0.5">
                        <div className="w-full h-full rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold">RK</div>
                      </div>
                      <div className="absolute -bottom-6 px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold shadow-md whitespace-nowrap">
                        Rajesh • Sector 4
                      </div>
                    </div>
                  </div>

                  <div className={`map-worker-pin absolute top-[52%] left-[62%] transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all duration-300 hover:scale-110 ${focusedWorker === 2 ? 'ring-4 ring-secondary scale-125' : ''} ${isRecentering ? 'animate-bounce' : ''}`}>
                    <div className="relative flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-surface-container-lowest shadow-xl flex items-center justify-center p-0.5">
                        <div className="w-full h-full rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">AD</div>
                      </div>
                      <div className="absolute -bottom-6 px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold shadow-md whitespace-nowrap">
                        Anita • Eco Gel #2
                      </div>
                    </div>
                  </div>

                  <div className={`map-worker-pin absolute top-[70%] left-[22%] transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all duration-300 hover:scale-110 ${focusedWorker === 3 ? 'ring-4 ring-secondary scale-125' : ''} ${isRecentering ? 'animate-bounce' : ''}`}>
                    <div className="relative flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-surface-container-lowest shadow-xl flex items-center justify-center p-0.5">
                        <div className="w-full h-full rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">VS</div>
                      </div>
                      <div className="absolute -bottom-6 px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold shadow-md whitespace-nowrap">
                        Vikram • Termite Zone 7
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-[38%] left-[78%] z-10">
                    <div className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-md">
                      <span className="material-symbols-outlined text-[14px]">nest_eco_leaf</span>
                      <span>Cluster 4: High Density</span>
                    </div>
                  </div>

                  {/* Quick Dispatch Banner */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-md shadow-lg flex flex-col sm:flex-row items-center justify-between gap-space-sm z-20">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-8 h-8 rounded-lg bg-secondary-container/20 text-secondary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">electric_scooter</span>
                      </div>
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface font-bold block">{targetStatus}</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Live ETA: 12 mins to Flat 402, Green Glen Palms</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-xs w-full sm:w-auto">
                      <button type="button" className="w-full sm:w-auto px-space-md py-1.5 rounded-xl bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold shadow-sm hover:bg-primary transition-all">
                        Direct Route Ping
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Worker Fleet Roster */}
              <div className="xl:col-span-5 flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">Worker Fleet Status</h2>
                    <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold">18 Online</span>
                  </div>
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">tune</span>
                    <span className="font-label-sm text-label-sm font-medium">Sorted by Proximity</span>
                  </div>
                </div>

                <div className="flex flex-col gap-space-sm max-h-[460px] overflow-y-auto pr-1">
                  {/* Worker Card 1 */}
                  <div className="worker-card p-space-md rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-start justify-between gap-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <div className="relative">
                          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuxXXV1jSNUTXU41FXe-ba2wm-yh3SQqTmGNaAzsq7zpDOpfqxL6en2hA6lwFVq3VPmM8gjG9iHolEgfNAVHt6caHvUx8YdMQKrEgGohtqxuebI1Vnq2-kgMRQazq5oQD9WjycPYgittV2pouwUegwchEjF97nd1_qA41sbIUlT8BaaWsRjf873RX-lmoWAoQeLJPeMd9HJ_id66kUCWWnvg2Npc6hQ6s0yh3AtYVC2CbWoAbpscfhPA" alt="Worker" className="w-12 h-12 rounded-xl object-cover" />
                          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-secondary-container ring-2 ring-surface-container-lowest"></span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-label-lg text-label-lg text-on-surface font-bold">Rajesh Kumar</span>
                            <span className="px-1.5 py-0.2 rounded bg-surface-container text-primary font-label-sm text-label-sm font-semibold">Sr. Tech</span>
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">phone</span> +91 98765 43210
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-0.5 text-secondary">
                          <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="font-label-md text-label-md font-bold text-on-surface">4.9</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">(142)</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">184 Jobs Done</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 flex flex-wrap items-center justify-between gap-space-xs text-body-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                        <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">En Route</span>
                        <span className="text-on-surface-variant">• Sector 4, Indiranagar</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary font-label-sm text-label-sm font-semibold">
                        <span className="material-symbols-outlined text-[14px]">shield</span> 2-Step Verified
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-space-sm pt-2">
                      <button type="button" onClick={() => handleFocusWorker(1, 'Rajesh Kumar')} className="flex-1 py-1.5 px-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-bold flex items-center justify-center gap-1 transition-colors">
                        <span className="material-symbols-outlined text-[16px]">location_searching</span>
                        Focus on Map
                      </button>
                      <button type="button" className="py-1.5 px-space-md rounded-xl bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary transition-all">
                        View Tasks (3)
                      </button>
                    </div>
                  </div>

                  {/* Worker Card 2 */}
                  <div className="worker-card p-space-md rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-start justify-between gap-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <div className="relative">
                          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrC9rrAJYVTRqQ_Oxh3qJJ0vv8yBc1LYbR-ijWb7mt55USG8ahSKFzTTlmp2LF9Yi2iS5ScP69as2vCxXdpfOHtVKqjRqnqr8DnKPZIxZpV6YSh2tBL_T5jxLwnJ_BOL4Z0bpYxe5fY76Xn1a9HqGVQrTTdDqeqog3ZK7_DoEoasUAU88PdvV6PUfHt3WJi2JrSPHHwlMifsvCXsqDHOaJvIJEa3A8sRA-ZYFYqol7cCckZtmTv4Wn0Q" alt="Worker" className="w-12 h-12 rounded-xl object-cover" />
                          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-primary ring-2 ring-surface-container-lowest"></span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-label-lg text-label-lg text-on-surface font-bold">Anita Desai</span>
                            <span className="px-1.5 py-0.2 rounded bg-surface-container text-primary font-label-sm text-label-sm font-semibold">Gel Specialist</span>
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">phone</span> +91 97123 88491
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-0.5 text-secondary">
                          <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="font-label-md text-label-md font-bold text-on-surface">5.0</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">(98)</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">112 Jobs Done</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 flex flex-wrap items-center justify-between gap-space-xs text-body-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">On Job Site</span>
                        <span className="text-on-surface-variant">• Palm Meadows Villa 18</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary font-label-sm text-label-sm font-semibold">
                        <span className="material-symbols-outlined text-[14px]">shield</span> 2-Step Verified
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-space-sm pt-2">
                      <button type="button" onClick={() => handleFocusWorker(2, 'Anita Desai')} className="flex-1 py-1.5 px-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-bold flex items-center justify-center gap-1 transition-colors">
                        <span className="material-symbols-outlined text-[16px]">location_searching</span>
                        Focus on Map
                      </button>
                      <button type="button" className="py-1.5 px-space-md rounded-xl bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary transition-all">
                        View Tasks (2)
                      </button>
                    </div>
                  </div>

                  {/* Worker Card 3 */}
                  <div className="worker-card p-space-md rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-start justify-between gap-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <div className="relative">
                          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoVlUSKBUsHDH0wML_zIBiMWolKYsV-pyk2TeO4IT6XK6yWWL_DS8avVlBAdr88R6Vty0-K1ppdRFXq82I4wx6AhWDv7RgQ6GzIn4E7HjN28nlX5793EiQhNKGYjWpA61mScDJQqOICLnawzJYCY8UVYrtpWkpoQMgZcI0pirkzo-5A8aBb6qxf7IXzT0Xmr0SMD-PiOPOdSP14QuFkWQnUbMI9zMe4ByMghqxpULcS8RM1n10_UifFA" alt="Worker" className="w-12 h-12 rounded-xl object-cover" />
                          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-primary ring-2 ring-surface-container-lowest"></span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="font-label-lg text-label-lg text-on-surface font-bold">Vikram Solanki</span>
                            <span className="px-1.5 py-0.2 rounded bg-surface-container text-primary font-label-sm text-label-sm font-semibold">Termite Lead</span>
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">phone</span> +91 94560 11234
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-0.5 text-secondary">
                          <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span className="font-label-md text-label-md font-bold text-on-surface">4.8</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">(210)</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">235 Jobs Done</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 flex flex-wrap items-center justify-between gap-space-xs text-body-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Active Drill</span>
                        <span className="text-on-surface-variant">• Koramangala 5th Block</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary font-label-sm text-label-sm font-semibold">
                        <span className="material-symbols-outlined text-[14px]">shield</span> 2-Step Verified
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-space-sm pt-2">
                      <button type="button" onClick={() => handleFocusWorker(3, 'Vikram Solanki')} className="flex-1 py-1.5 px-space-sm rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-bold flex items-center justify-center gap-1 transition-colors">
                        <span className="material-symbols-outlined text-[16px]">location_searching</span>
                        Focus on Map
                      </button>
                      <button type="button" className="py-1.5 px-space-md rounded-xl bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary transition-all">
                        View Tasks (4)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Directory & Warranty Records */}
            <div className="flex flex-col gap-space-md pb-space-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline-md text-headline-md text-primary tracking-tight">Client Records &amp; Warranty Ledgers</h2>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">128 Contracts</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Live organic chemical validity certificates, inspection schedules, and warranty expiration statuses.</p>
                </div>
                <div className="flex items-center gap-space-sm">
                  <div className="relative">
                    <input type="text" placeholder="Search address, client, ID..." className="pl-9 pr-space-md py-2 rounded-xl bg-surface-container-lowest text-on-surface text-body-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-container w-64 transition-all" />
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-on-surface-variant">search</span>
                  </div>
                  <button type="button" className="flex items-center gap-1 px-space-md py-2 rounded-xl bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold shadow-sm hover:bg-surface-container transition-colors">
                    <span className="material-symbols-outlined text-[18px]">filter_list</span>
                    <span>Expiring Soon</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-3xl bg-surface-container-lowest shadow-md">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                      <th className="py-space-md px-space-lg">Client &amp; Property Address</th>
                      <th className="py-space-md px-space-md">Pest Treatment Taken</th>
                      <th className="py-space-md px-space-md">Technician Handled</th>
                      <th className="py-space-md px-space-md">Service &amp; Duration</th>
                      <th className="py-space-md px-space-md">Warranty Status</th>
                      <th className="py-space-md px-space-lg text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container text-body-sm">
                    {/* Record 1 */}
                    <tr className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-space-md px-space-lg">
                        <div className="flex flex-col">
                          <span className="font-label-lg text-label-lg text-on-surface font-bold">Meera Venkatesh</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-[14px]">home_pin</span>
                            Apt 402, Green Glen Palms, Bellandur
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant/80 mt-0.5">+91 99801 23412</span>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md">
                        <div className="flex flex-col gap-1">
                          <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-primary text-[16px]">bug_report</span>
                            Termite Drill &amp; Inject
                          </span>
                          <span className="font-label-sm text-label-sm text-primary flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[12px]">eco</span>
                            Botanical Bio-Permethrin
                          </span>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold">RK</div>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-on-surface font-semibold">Rajesh Kumar</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">Lead Specialist</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md">
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">12 Sep 2024</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">2-Year Standard Bio-Shield</span>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          Active • 688 Days Left
                        </span>
                      </td>
                      <td className="py-space-md px-space-lg text-right">
                        <button type="button" onClick={() => handleOpenModal({ name: "Meera Venkatesh", address: "Apt 402, Green Glen Palms, Bellandur", service: "Termite Eradication - Drill & Inject", status: "Active - 688 Days Left", tech: "Rajesh Kumar" })} className="px-space-md py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-bold transition-all">
                          Complete History
                        </button>
                      </td>
                    </tr>
                    {/* Record 2 */}
                    <tr className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-space-md px-space-lg">
                        <div className="flex flex-col">
                          <span className="font-label-lg text-label-lg text-on-surface font-bold">Siddharth Rao</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-[14px]">home_pin</span>
                            Flat 11B, Prestige Ozone, Whitefield
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant/80 mt-0.5">+91 98450 78201</span>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md">
                        <div className="flex flex-col gap-1">
                          <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-secondary text-[16px]">pest_control</span>
                            Cockroach Odorless Gel
                          </span>
                          <span className="font-label-sm text-label-sm text-secondary font-medium flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[12px]">nature</span>
                            Pheromone Bait Grid
                          </span>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">AD</div>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-on-surface font-semibold">Anita Desai</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">Bio Specialist</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md">
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">29 Jul 2024</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">90-Day Kitchen Warranty</span>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                          Expiring Soon • 5 Days
                        </span>
                      </td>
                      <td className="py-space-md px-space-lg text-right">
                        <button type="button" onClick={() => handleOpenModal({ name: "Siddharth Rao", address: "Flat 11B, Prestige Ozone, Whitefield", service: "Cockroach Odorless Gel Treatment", status: "Expiring Soon - 5 Days", tech: "Anita Desai" })} className="px-space-md py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-bold transition-all">
                          Complete History
                        </button>
                      </td>
                    </tr>
                    {/* Record 3 */}
                    <tr className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-space-md px-space-lg">
                        <div className="flex flex-col">
                          <span className="font-label-lg text-label-lg text-on-surface font-bold">Rohan &amp; Priya Sen</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-[14px]">home_pin</span>
                            Villa 34, Palm Meadows, Airport Road
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant/80 mt-0.5">+91 97401 55320</span>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md">
                        <div className="flex flex-col gap-1">
                          <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-primary text-[16px]">cloud</span>
                            Mosquito Barrier Fogging
                          </span>
                          <span className="font-label-sm text-label-sm text-primary flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[12px]">forest</span>
                            Citronella Organic Emulsion
                          </span>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold">VS</div>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-on-surface font-semibold">Vikram Solanki</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">Field Lead</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md">
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">10 Oct 2024</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">45-Day Lawn Blanket</span>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          Active • Expires in 31 Days
                        </span>
                      </td>
                      <td className="py-space-md px-space-lg text-right">
                        <button type="button" onClick={() => handleOpenModal({ name: "Rohan & Priya Sen", address: "Villa 34, Palm Meadows, Airport Road", service: "Mosquito Barrier Fogging", status: "Active - Expires in 31 Days", tech: "Vikram Solanki" })} className="px-space-md py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-bold transition-all">
                          Complete History
                        </button>
                      </td>
                    </tr>
                    {/* Record 4 */}
                    <tr className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="py-space-md px-space-lg">
                        <div className="flex flex-col">
                          <span className="font-label-lg text-label-lg text-on-surface font-bold">Dr. Ananya Murthy</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-[14px]">home_pin</span>
                            Bungalow 7, Defence Colony, Indiranagar
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant/80 mt-0.5">+91 96112 00983</span>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md">
                        <div className="flex flex-col gap-1">
                          <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-primary text-[16px]">sensors</span>
                            Rodent Perimeter Defense
                          </span>
                          <span className="font-label-sm text-label-sm text-primary flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[12px]">check_circle</span>
                            Smart Sensor Traps + Mint Barrier
                          </span>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-label-sm text-label-sm font-bold">RK</div>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-on-surface font-semibold">Rajesh Kumar</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">Lead Specialist</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md">
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">01 Oct 2024</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">1-Year Commercial Warranty</span>
                        </div>
                      </td>
                      <td className="py-space-md px-space-md">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                          Renewed • Active
                        </span>
                      </td>
                      <td className="py-space-md px-space-lg text-right">
                        <button type="button" onClick={() => handleOpenModal({ name: "Dr. Ananya Murthy", address: "Bungalow 7, Defence Colony, Indiranagar", service: "Rodent Ultrasonic Perimeter Defense", status: "Renewed - Active", tech: "Rajesh Kumar" })} className="px-space-md py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-bold transition-all">
                          Complete History
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {selectedClient && (
        <div id="client-history-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4" onClick={handleCloseModal}>
          <div className="relative w-full max-w-2xl rounded-3xl bg-surface-container-lowest p-space-lg shadow-2xl flex flex-col gap-space-md animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">folder_shared</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-headline-sm text-primary">{selectedClient.name}</h3>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{selectedClient.address}</span>
                </div>
              </div>
              <button id="close-client-modal" type="button" onClick={handleCloseModal} className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[20px] pointer-events-none">close</span>
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm p-space-md rounded-2xl bg-surface-container-low">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Active Treatment</span>
                <span className="font-label-md text-label-md text-primary font-bold mt-0.5">{selectedClient.service}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Primary Field Tech</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold mt-0.5">{selectedClient.tech}</span>
              </div>
              <div className="flex flex-col col-span-2 sm:col-span-1">
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">Warranty Level</span>
                <span className="font-label-md text-label-md text-secondary font-bold mt-0.5">{selectedClient.status}</span>
              </div>
            </div>

            <div className="flex flex-col gap-space-sm">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Past Service &amp; Chemical Dosing Log</span>
              <div className="space-y-3">
                <div className="flex items-start gap-space-sm p-3 rounded-xl bg-surface-container-low">
                  <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">verified_user</span>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-on-surface font-bold">Bio-Drill Perimeter Inspection Completed</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">12 Sep 2024</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Sub-slab injection of 45L organic barrier agent. Moisture telemetry sensor installed at main foundation beam.</p>
                  </div>
                </div>
                <div className="flex items-start gap-space-sm p-3 rounded-xl bg-surface-container-low">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">task_alt</span>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-on-surface font-bold">Quarterly Spot Audit &amp; Gel Booster</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">15 Jun 2024</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Zero live termite movement detected in skirting boards. Kitchen duct gel refreshed with organic peppermint compound.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-space-sm pt-2">
              <button type="button" className="flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold transition-colors">
                <span className="material-symbols-outlined text-[16px]">download</span>
                Export Warranty PDF
              </button>
              <button type="button" className="flex items-center gap-1.5 px-space-lg py-2 rounded-xl bg-primary-container text-on-primary hover:bg-primary font-label-sm text-label-sm font-bold shadow-sm transition-all">
                <span className="material-symbols-outlined text-[16px]">autorenew</span>
                Schedule Booster Visit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

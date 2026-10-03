import React, { useState } from 'react';

// ─── Helper: Trigger Real CSV Download ─────────────────────────────────────────
function exportToCSV(filename, headers, rows) {
  const processRow = (row) => row.map(val => {
    let text = (val === null || val === undefined) ? '' : String(val);
    text = text.replace(/"/g, '""');
    if (text.search(/("|,|\n)/g) >= 0) text = `"${text}"`;
    return text;
  }).join(',');
  const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map(processRow).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function PlatformOverview({ showToast, openPanel, activePanel }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeframe, setTimeframe] = useState('today');
  const [activeNav, setActiveNav] = useState('platform-overview');
  const [agencyFilter, setAgencyFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [workerSearch, setWorkerSearch] = useState('');
  const [focusedAgency, setFocusedAgency] = useState('EcoPest Solutions');
  const [mapZone, setMapZone] = useState('All Zones');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // Active Modals & Interactive States
  const [selectedTelemetryWorker, setSelectedTelemetryWorker] = useState(null);
  const [selectedPIIWorker, setSelectedPIIWorker] = useState(null);
  const [showMaskedPII, setShowMaskedPII] = useState(false);
  const [selectedSecurityAgency, setSelectedSecurityAgency] = useState(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedTelemetryCard, setSelectedTelemetryCard] = useState(null);
  const [isCalculatingMesh, setIsCalculatingMesh] = useState(false);
  const [meshStats, setMeshStats] = useState({ velocity: '22.4 km/h', breaches: '0 Detected', fences: '4 Micro-Zones' });

  const toast = showToast || (() => {});

  // ── All Workers Data ────────────────────────────────────────────────────────
  const allWorkers = [
    {
      id: '#TECH-9401',
      name: 'Anita Desai',
      agency: 'EcoPest Solutions',
      hub: '#PF-8821 (Central)',
      phone: '+91 98450 18239',
      status: 'Working',
      statusStyle: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
      statusDot: 'bg-emerald-500',
      spec: 'Termite Drill & Inject',
      done: 4,
      queue: 1,
      rating: '4.96★',
      jobs: 412,
      success: '99.2%',
      battery: '84%',
      ping: '24ms',
      lat: '12.9716° N',
      lng: '77.5946° E',
      currentJob: 'Villa 18, Palm Meadows (Whitefield)',
      address: '#42, 3rd Cross, Indiranagar, Bangalore - 560038',
      aadhaar: '5841 9920 9012',
      policeVerification: 'PV-KA-2024-9182',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ56oiWfkhIP0j3xgHhiMRX6lp1HSpWYiJijpHpfhWOn9SGZBZGxlBcbAIjGiocCSQJY1DLegmSRJ_0mxFVs73Wc0FPOqnt0_Wq1dCEXvMHgnXwAntd6HfzlkIu7CHyo1-hiF3RztJeRZsLDn_XCrHyACy9KeQIF4frBZh994gtxVsrvsSZt9velX4m4OFax5HMTogW-mmH70WXNp_OjMAP1oJSQSFuloLvhQS3_MPhMU0dTkyFrbMLw'
    },
    {
      id: '#TECH-8842',
      name: 'Rajesh Kumar',
      agency: 'EcoPest Solutions',
      hub: '#PF-8821 (Central)',
      phone: '+91 97312 90481',
      status: 'En Route',
      statusStyle: 'bg-[#fea619]/20 text-[#855300] border border-[#fea619]/30',
      statusDot: 'bg-[#fea619] animate-pulse',
      spec: 'Cockroach Odorless Gel',
      done: 3,
      queue: 2,
      rating: '4.89★',
      jobs: 320,
      success: '98.5%',
      battery: '72%',
      ping: '31ms',
      lat: '12.9352° N',
      lng: '77.6245° E',
      currentJob: 'Flat 402, Prestige Tower (Koramangala)',
      address: '#19, 5th Main, BTM 2nd Stage, Bangalore - 560076',
      aadhaar: '3910 8821 7741',
      policeVerification: 'PV-KA-2024-8841',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoRsJ_V_oP6EAIozS1snSEgA5HohnU-xZbGWU71ZQvQ2ZUpfG5FaANjh9GFbm4LxACR-WBLGDufaQNiO1mFq4QTBYTW_HuFc2TBrpWWzEt60Qr0AJaxp1cg0TELsjANQBDwT7cPXkvycQA5kW0RyE_dqrsf9Y8p9InFdlIV4vGlbtWqBAVV37HiaCjTfIKwjDwjw_wCrbeVghDAJqkIP3tKjvSXAsO3Z04XDf8JE1cOgz7hhx1VUV_uA'
    },
    {
      id: '#TECH-7104',
      name: 'Vikram Solanki',
      agency: 'Urban Shield',
      hub: '#PF-9014 (East)',
      phone: '+91 99014 34567',
      status: 'Working',
      statusStyle: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
      statusDot: 'bg-emerald-500',
      spec: 'Mosquito Bio-Fogging',
      done: 5,
      queue: 0,
      rating: '4.98★',
      jobs: 680,
      success: '100.0%',
      battery: '91%',
      ping: '19ms',
      lat: '12.9850° N',
      lng: '77.7280° E',
      currentJob: 'Tech Park B4, EPIP Zone (Whitefield)',
      address: '#8, Sunrise Enclave, Hoodi, Bangalore - 560048',
      aadhaar: '7412 0091 6634',
      policeVerification: 'PV-KA-2023-7104',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtpXqbohD8o_OtcnQE3JEb3k-xc34iCKci3o4x4gRdcmf5LaCLiNQ4Ji0F4zymRZvEt5jvjRWFQX1ToGEo5YfXi2tyRgAVtXaKZB-Wq-h-XfhI4U-emwIjvJrd6tZKsOCyTyWIFFKFL8tEvgZDWtYC5RUuQ86Td9vHR1Z74X1lwpxc-6F8B1UIa548YBzXg3WcOzNgFszXhO17EuCvVAQEkMF1g3PeLOcLgOdWCQXVS-JFB5bXU7tBLA'
    },
    {
      id: '#TECH-5219',
      name: 'Devendra Singh',
      agency: 'BioSafe Hub',
      hub: '#PF-7720 (West)',
      phone: '+91 94480 77123',
      status: 'Idle',
      statusStyle: 'bg-red-50 text-red-700 border border-red-200',
      statusDot: 'bg-red-500',
      spec: 'Rodent Ultrasonic & Barrier',
      done: 2,
      queue: 0,
      rating: '4.82★',
      jobs: 194,
      success: '98.1%',
      battery: '95%',
      ping: '22ms',
      lat: '12.9784° N',
      lng: '77.6408° E',
      currentJob: 'Standby at Indiranagar Depot Hub',
      address: '#102, Green Glen, Outer Ring Rd, Bangalore - 560103',
      aadhaar: '9081 2234 5519',
      policeVerification: 'PV-KA-2024-5219',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZukDRTejlh_FFQ0BTP1KltQEx25abYLOf91fBjfPTP5ziTyXg-jYQKUN6X1dsXKOX9iY41LAiAtxVaPHp1lOIJD8wFZEuJ93bCiEvUqOZPvrhoM4AXEzT3MLiYKTKH_YdePFYWtc2SDA1PlWmaUK-4DZvtCg3nF382rehBClqg4ue4esUM4CWVwrdd9Nh5XEYcxpMlVIVz5fIw2tdvTcSaHxo7O7spWDtARNX99ipjhhMRTuMKaqZuA'
    },
    {
      id: '#TECH-6302',
      name: 'Pooja Hegde',
      agency: 'EcoPest Solutions',
      hub: '#PF-8821 (Central)',
      phone: '+91 98860 12345',
      status: 'Working',
      statusStyle: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
      statusDot: 'bg-emerald-500',
      spec: 'Bedbug Thermal Treatment',
      done: 4,
      queue: 1,
      rating: '4.94★',
      jobs: 280,
      success: '99.5%',
      battery: '68%',
      ping: '27ms',
      lat: '12.9279° N',
      lng: '77.6271° E',
      currentJob: 'Apt 2B, Koramangala 4th Block',
      address: '#55, 1st Cross, Jayanagar 4th T Block, Bangalore',
      aadhaar: '4451 9801 2231',
      policeVerification: 'PV-KA-2024-6302',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: '#TECH-4190',
      name: 'Karthik Rao',
      agency: 'Urban Shield',
      hub: '#PF-9014 (East)',
      phone: '+91 98440 99882',
      status: 'En Route',
      statusStyle: 'bg-[#fea619]/20 text-[#855300] border border-[#fea619]/30',
      statusDot: 'bg-[#fea619] animate-pulse',
      spec: 'Commercial Kitchen Sanitation',
      done: 3,
      queue: 1,
      rating: '4.88★',
      jobs: 345,
      success: '98.9%',
      battery: '82%',
      ping: '35ms',
      lat: '12.9592° N',
      lng: '77.6974° E',
      currentJob: 'Café Bistro, Marathahalli',
      address: '#71, HAL 3rd Stage, Bangalore - 560075',
      aadhaar: '8821 3410 9901',
      policeVerification: 'PV-KA-2023-4190',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: '#TECH-3120',
      name: 'Sanjay Dutt',
      agency: 'BioSafe Hub',
      hub: '#PF-7720 (West)',
      phone: '+91 99801 44552',
      status: 'Working',
      statusStyle: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
      statusDot: 'bg-emerald-500',
      spec: 'Anti-Termite Soil Barrier',
      done: 5,
      queue: 0,
      rating: '4.91★',
      jobs: 512,
      success: '99.0%',
      battery: '60%',
      ping: '20ms',
      lat: '12.9810° N',
      lng: '77.5680° E',
      currentJob: 'Plot 88, Rajajinagar Industrial Area',
      address: '#12, West Park Road, Malleshwaram, Bangalore',
      aadhaar: '6610 2239 8812',
      policeVerification: 'PV-KA-2024-3120',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: '#TECH-2901',
      name: 'Manish Verma',
      agency: 'EcoPest Solutions',
      hub: '#PF-8821 (Central)',
      phone: '+91 97410 88219',
      status: 'Idle',
      statusStyle: 'bg-red-50 text-red-700 border border-red-200',
      statusDot: 'bg-red-500',
      spec: 'Wood-Borer Micro Spray',
      done: 1,
      queue: 0,
      rating: '4.78★',
      jobs: 140,
      success: '97.5%',
      battery: '88%',
      ping: '29ms',
      lat: '12.9611° N',
      lng: '77.5855° E',
      currentJob: 'Standby at Central Fleet Depot',
      address: '#89, Lalbagh Fort Road, Bangalore - 560004',
      aadhaar: '1290 8841 3320',
      policeVerification: 'PV-KA-2024-2901',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
    }
  ];

  // Filtering
  const filteredWorkers = allWorkers.filter(w => {
    const agencyOk = agencyFilter === 'ALL' || w.agency === agencyFilter;
    const statusOk = statusFilter === 'ALL' || w.status === statusFilter;
    const searchOk = !workerSearch || w.name.toLowerCase().includes(workerSearch.toLowerCase()) || w.spec.toLowerCase().includes(workerSearch.toLowerCase());
    return agencyOk && statusOk && searchOk;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredWorkers.length / pageSize) || 1;
  const paginatedWorkers = filteredWorkers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const agencies = [
    {
      code: 'EP',
      name: 'EcoPest Solutions',
      id: '#PF-8821',
      city: 'Bangalore Central',
      techs: 18,
      offlineUnits: 4,
      done: 36,
      total: 42,
      success: '98.4%',
      newClients: 34,
      retained: 94,
      apiKey: 'pf_live_sk_8f7a9d02e8c199042b89a1c4',
      webhookSec: 'whsec_99a812bf09e4d5882190c',
      certExpiry: '24 Oct 2027 (Valid)',
      qps: '18.4 / 100 QPS'
    },
    {
      code: 'US',
      name: 'Urban Shield',
      id: '#PF-9014',
      city: 'East Corridor',
      techs: 24,
      offlineUnits: 2,
      done: 22,
      total: 26,
      success: '99.0%',
      newClients: 18,
      retained: 80,
      apiKey: 'pf_live_sk_33b8a1c90ef229107cc14a90',
      webhookSec: 'whsec_1109ef32a890412bc448a',
      certExpiry: '15 Jan 2028 (Valid)',
      qps: '24.1 / 100 QPS'
    },
    {
      code: 'BS',
      name: 'BioSafe Eco Hub',
      id: '#PF-7720',
      city: 'West Zone',
      techs: 31,
      offlineUnits: 3,
      done: 28,
      total: 35,
      success: '98.7%',
      newClients: 22,
      retained: 110,
      apiKey: 'pf_live_sk_44299b80caef11904a883192',
      webhookSec: 'whsec_7734bc1290faef9081234',
      certExpiry: '08 Dec 2027 (Valid)',
      qps: '14.8 / 100 QPS'
    },
  ];

  const focused = agencies.find(a => a.name === focusedAgency) || agencies[0];

  // Actions
  const handleRecalculateMesh = () => {
    setIsCalculatingMesh(true);
    toast('Recalculating PostGIS ST_DWithin cluster mesh...');
    setTimeout(() => {
      setIsCalculatingMesh(false);
      setMeshStats({
        velocity: '25.1 km/h',
        breaches: '0 Detected (Optimized)',
        fences: '4 Micro-Zones'
      });
      toast('✅ Routing mesh optimized! Cross-zone travel reduced by 18.2%.');
    }, 1200);
  };

  const handleExportWorkers = () => {
    const headers = ['Tech ID', 'Name', 'Agency', 'Hub', 'Phone', 'Status', 'Specialization', 'Done', 'Queue', 'Rating', 'Lifetime Jobs', 'Success Rate'];
    const rows = filteredWorkers.map(w => [w.id, w.name, w.agency, w.hub, w.phone, w.status, w.spec, w.done, w.queue, w.rating, w.jobs, w.success]);
    exportToCSV('pestfast_fleet_performance.csv', headers, rows);
    toast('📥 CSV exported: pestfast_fleet_performance.csv');
  };

  return (
    <div className="w-full flex flex-col bg-[#fcf9f4]" id="top">
      {/* Sub-header Bar with Quick Toolbar */}
      <div className="sticky top-16 z-20 bg-[#fcf9f4]/95 backdrop-blur-md border-b border-[#ebe8e3] px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-[#707974] uppercase tracking-wider font-bold">
          <span>Platform Overview</span><span className="text-[#bfc9c3]">/</span>
          <span className="text-[#003527]">Core Telemetry &amp; Fleet Operations</span>
        </div>

          {/* Quick Toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center p-0.5 rounded-xl bg-[#ffffff] border border-[#ebe8e3] shadow-xs">
              {['today', 'week', 'month'].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => { setTimeframe(t); toast(`Viewing metrics for: ${t.toUpperCase()}`); }}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all capitalize cursor-pointer ${
                    timeframe === t ? 'bg-[#003527] text-white shadow-xs' : 'text-[#707974] hover:text-[#003527]'
                  }`}
                >
                  {t === 'today' ? 'Today' : t === 'week' ? 'This Week' : 'This Month'}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                toast('⚡ Redis BullMQ Sync triggered — 0 lag verified across all worker queues');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ffffff] border border-[#ebe8e3] text-[#003527] text-[12px] font-bold hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px] text-[#fea619]">sync_alt</span>BullMQ Sync
            </button>

            <button
              type="button"
              onClick={() => {
                toast('🧹 Redis Cache flushed — 2,840 keys cleared & re-indexed');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ffffff] border border-[#ebe8e3] text-[#003527] text-[12px] font-bold hover:bg-[#f6f3ee] transition-all cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px] text-[#003527]">cleaning_services</span>Flush Cache
            </button>

            <button
              type="button"
              onClick={handleExportWorkers}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#003527] text-white text-[12px] font-bold hover:bg-[#064e3b] transition-all shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>Export CSV
            </button>
          </div>
        </div>

        <main className="p-6 flex flex-col gap-6">
          {/* Recalculate Mesh Progress Banner */}
          {isCalculatingMesh && (
            <div className="p-4 rounded-3xl bg-[#003527]/10 border border-[#003527]/20 flex items-center justify-between animate-pulse shadow-xs">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#003527] text-[24px] animate-spin">refresh</span>
                <div>
                  <h4 className="font-bold text-[#003527] text-sm">PostGIS Spatial Mesh Optimization in Progress...</h4>
                  <p className="text-[12px] text-[#707974]">Computing Voronoi polygons &amp; ST_DWithin 8.5km technician routing bounds.</p>
                </div>
              </div>
              <span className="text-[12px] font-bold text-[#003527] bg-white px-3 py-1 rounded-full border border-[#003527]/20">Asia-South1 Cluster</span>
            </div>
          )}

          {/* ── Micro telemetry belt ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-[#ffffff] rounded-3xl border border-[#ebe8e3] shadow-xs">
            {[
              {
                icon: null,
                dot: true,
                label: 'Cluster Node',
                value: 'asia-south1-prod (Active)',
                action: () => toast('Cluster Node: asia-south1-prod. Uptime 99.998% with 3 availability zones.')
              },
              {
                icon: 'database',
                label: 'PostGIS & PostgreSQL',
                value: '99.98% Health (18.4 QPS)',
                color: 'text-[#003527]',
                action: () => setSelectedTelemetryCard({ title: 'PostGIS Spatial Engine', tag: 'Spatial Index', value: '18.4 QPS', desc: 'ST_DWithin spatial queries bounding 8.5km radius.', type: 'postgis' })
              },
              {
                icon: 'sensors',
                label: 'Socket.IO Pipes',
                value: '1,420 Streams (32ms avg)',
                color: 'text-[#855300]',
                action: () => setSelectedTelemetryCard({ title: 'Socket.IO Gateway', tag: 'WebSockets', value: '1,420 Streams', desc: '5-second throttled WebSocket telemetry streams.', type: 'socket' })
              },
              {
                icon: 'tune',
                label: 'Redis Queue State',
                value: '0 Lag • 100% SLA',
                color: 'text-[#003527]',
                action: () => setSelectedTelemetryCard({ title: 'BullMQ Notification Engine', tag: 'Redis Workers', value: '99.8% Delivery', desc: 'Transactional SMS, WhatsApp, and dispatch queue.', type: 'bullmq' })
              },
            ].map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={item.action}
                className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-[#fcf9f4] transition-colors text-left cursor-pointer border border-transparent hover:border-[#ebe8e3]"
              >
                {item.dot ? (
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-[#f0ede9] flex items-center justify-center shrink-0">
                    <span className={`material-symbols-outlined text-[18px] ${item.color || 'text-[#707974]'}`}>{item.icon}</span>
                  </div>
                )}
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#707974] font-bold">{item.label}</div>
                  <div className="text-[12px] font-bold text-[#1c1c19]">{item.value}</div>
                </div>
              </button>
            ))}
          </div>

          {/* ── 5 KPI Metrics ── */}
          <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
            {[
              { label: 'Agencies In Fleet', icon: 'apartment', value: '14', sub: 'Active Hubs', badge: '100% KYC Vetted', note: '+2 In Sandbox', onClick: () => toast('14 verified agencies — +2 in onboarding staging') },
              { label: 'Worker Deployment', icon: 'badge', value: '142', sub: 'Field Techs', badge: '92 Site · 38 Route · 12 Idle', note: null, onClick: () => { const el = document.getElementById('workers-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); } },
              { label: "Today's Jobs Output", icon: 'verified', value: '328', sub: '/ 384 Allotted', badge: '85.4% Accomplished', note: '14m Avg Arrival', onClick: () => toast('328 completed of 384 scheduled bookings today') },
              { label: 'Client Portfolio', icon: 'groups', value: '2,840', sub: '+26% MoM', badge: '740 New / 2,100 Subscribed (74%)', note: null, onClick: () => toast('2,840 active residential & commercial accounts') },
              { label: 'Quality & CSAT', icon: 'star', value: '99.1%', sub: '4.91★ Rating', badge: '12,480 Lifetime Audits', note: '0.8% Retreatment', onClick: () => toast('99.1% first-visit resolution across all 3 zones') },
            ].map(k => (
              <button
                key={k.label}
                type="button"
                onClick={k.onClick}
                className="p-5 rounded-3xl bg-[#ffffff] border border-[#ebe8e3] shadow-xs hover:shadow-md hover:border-[#003527]/30 transition-all text-left flex flex-col gap-2 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-[#707974] font-bold">{k.label}</span>
                  <div className="w-9 h-9 rounded-xl bg-[#003527]/10 flex items-center justify-center group-hover:bg-[#003527] group-hover:text-white transition-colors text-[#003527] shadow-2xs">
                    <span className="material-symbols-outlined text-[18px]">{k.icon}</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-[#1c1c19]">{k.value}</span>
                  {k.sub && <span className="text-xs font-bold text-[#003527]">{k.sub}</span>}
                </div>
                <div className="text-[11px] text-[#707974]">{k.badge}</div>
                {k.note && <div className="text-[11px] font-bold text-[#855300]">{k.note}</div>}
              </button>
            ))}
          </div>

          {/* ── Map + Agency Panel ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="map-section">
            {/* Map — 8 cols */}
            <div className="lg:col-span-8 rounded-3xl border border-[#ebe8e3] overflow-hidden bg-[#ffffff] shadow-xs flex flex-col">
              <div className="px-6 py-4 bg-[#fcf9f4] border-b border-[#ebe8e3] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <div>
                    <div className="font-bold text-[#003527] text-sm">Multi-Agency Real-Time Fleet &amp; Dispatch Map</div>
                    <div className="text-[11px] text-[#707974]">PostGIS 8.5km bounding · 5-sec Socket.IO throttled telemetry stream</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-[#f0ede9] p-0.5 rounded-2xl border border-[#ebe8e3]">
                  {['All Zones', 'Indiranagar', 'Koramangala', 'Bellandur S7', 'Whitefield'].map(z => (
                    <button
                      key={z}
                      type="button"
                      onClick={() => { setMapZone(z); toast(`Map focus filtered: ${z}`); }}
                      className={`px-3 py-1 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                        mapZone === z ? 'bg-[#003527] text-white shadow-xs' : 'text-[#707974] hover:text-[#003527]'
                      }`}
                    >
                      {z}
                    </button>
                  ))}
                </div>
              </div>

              {/* Map Canvas */}
              <div className="relative h-[420px] overflow-hidden bg-[#f0ede9]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJMKsHLFiANcigON-4-zYyk8TQW8YLou_WlfeajwXIa50XWsPAQ6_19tn6BzuLI4iR1v31ncNy4yW92Y1xn7lDUDyn6ViThEfWWCUnxyItPtLZcPWUWPiLA-W-ZQIp4NrzbJ9T7bQ2XBTpqPOljwKblJISOBX9jZQxjtryQcOUeyKSc4HUAZ71G330_Xrby42GWn9HyhsDpp9LREsqs9tBiipBOq59vzr-Fr0WuJyB3ycEB3nDuXIGGg')`
                  }}
                />
                <div className="absolute inset-0 bg-[#003527]/10 pointer-events-none" />

                {/* Worker Live Pins */}
                {allWorkers.slice(0, 4).map((w, i) => {
                  const positions = [
                    { top: '22%', left: '26%' },
                    { top: '44%', left: '52%' },
                    { top: '28%', left: '74%' },
                    { top: '68%', left: '35%' },
                  ];
                  const pos = positions[i] || { top: '50%', left: '50%' };
                  return (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setSelectedTelemetryWorker(w)}
                      className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 flex items-center group hover:scale-110 transition-transform cursor-pointer"
                      style={{ top: pos.top, left: pos.left }}
                    >
                      <div className="relative w-11 h-11 rounded-full bg-white p-0.5 shadow-2xl ring-2 ring-[#003527]">
                        <img src={w.avatar} alt={w.name} className="w-full h-full rounded-full object-cover" />
                        <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full ring-2 ring-white ${w.statusDot}`} />
                      </div>
                      <div className="ml-2.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-xl flex flex-col min-w-[140px] border border-[#ebe8e3] text-left">
                        <span className="font-bold text-[12px] text-[#1c1c19]">{w.name}</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${w.statusStyle}`}>{w.status}</span>
                          <span className="text-[10px] text-[#003527] font-mono font-bold">{w.ping}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* Top Status HUD */}
                <div className="absolute top-3 left-3 px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-md shadow-md flex items-center gap-4 z-10 border border-[#ebe8e3]">
                  {[['bg-emerald-500', '92 Working'], ['bg-[#fea619]', '38 En Route'], ['bg-red-500', '12 Idle']].map(([color, label]) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${color}`} />
                      <span className="text-[12px] font-bold text-[#1c1c19]">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Cluster HUD */}
                <div className="absolute bottom-3 right-3 z-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#ebe8e3] min-w-[210px]">
                  <div className="text-[11px] font-bold uppercase text-[#003527] mb-1.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#fea619]">scatter_plot</span>
                    Live Cluster HUD
                  </div>
                  {[
                    ['Active Geo-Fences', meshStats.fences],
                    ['Avg Routing Velocity', meshStats.velocity],
                    ['Buffer Breach Alerts', meshStats.breaches]
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 text-[11px] py-0.5">
                      <span className="text-[#707974]">{k}:</span>
                      <span className="font-bold text-[#1c1c19]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Footer Bar with Working Recalculate Button */}
              <div className="px-6 py-3.5 bg-[#fcf9f4] border-t border-[#ebe8e3] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-[12px]">
                  {[['bg-emerald-500', '92 Working on Site (64.7%)'], ['bg-[#fea619]', '38 En Route (26.8%)'], ['bg-red-500', '12 Standby (8.5%)']].map(([color, label]) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                      <span className="font-bold text-[#1c1c19]">{label}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleRecalculateMesh}
                  disabled={isCalculatingMesh}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003527] text-white text-[12px] font-bold hover:bg-[#064e3b] transition-all shadow-xs cursor-pointer disabled:opacity-60"
                >
                  <span className={`material-symbols-outlined text-[16px] ${isCalculatingMesh ? 'animate-spin' : ''}`}>alt_route</span>
                  {isCalculatingMesh ? 'Optimizing Mesh...' : 'Recalculate Optimal Mesh'}
                </button>
              </div>
            </div>

            {/* Focused Agency Card — 4 cols */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-6 rounded-3xl bg-[#ffffff] border border-[#ebe8e3] shadow-xs flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#003527]/10 text-[#003527] text-[11px] font-bold border border-[#003527]/20">Primary Partner Hub</span>
                  <div className="w-10 h-10 rounded-2xl bg-[#003527] text-white flex items-center justify-center font-bold text-sm shadow-xs">{focused.code}</div>
                </div>

                <div>
                  <h3 className="font-black text-base text-[#003527]">{focused.name}</h3>
                  <p className="text-[12px] text-[#707974] font-mono">{focused.id} · {focused.city}</p>
                </div>

                <p className="text-[12px] text-[#707974] leading-relaxed">
                  Certified Organic bio-treatment specialist agency operating across East &amp; Central corridors. High tier dispatch clearance.
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Active Techs', value: `${focused.techs} Online`, sub: `${focused.offlineUnits} Units Offline` },
                    { label: "Today's Jobs", value: `${focused.done} / ${focused.total} Done`, sub: `${focused.total - focused.done} Remaining` },
                    { label: 'Success Rate', value: focused.success, sub: '0 Incidents' },
                    { label: 'Client Split', value: `${focused.newClients} New`, sub: `${focused.retained} Retained` },
                  ].map(s => (
                    <div key={s.label} className="p-3 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3]">
                      <div className="text-[10px] uppercase tracking-wider text-[#707974] font-bold">{s.label}</div>
                      <div className="font-bold text-[#1c1c19] text-sm mt-0.5">{s.value}</div>
                      <div className="text-[11px] text-[#707974]">{s.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Opens Agency Security Key Modal */}
                <button
                  type="button"
                  onClick={() => setSelectedSecurityAgency(focused)}
                  className="w-full py-3 rounded-xl bg-[#003527] text-white font-bold text-sm hover:bg-[#064e3b] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-1"
                >
                  <span className="material-symbols-outlined text-[18px]">fingerprint</span>Agency Security Key &amp; Audit
                </button>

                <div className="text-[11px] text-[#707974] px-1 flex items-center justify-between border-t border-[#ebe8e3] pt-2.5">
                  <span>Dispatch Lead: Ananya Sen</span>
                  <a href="tel:+919840211982" className="font-mono text-[#003527] font-bold hover:underline">+91 98402 11982</a>
                </div>
              </div>

              {/* Other Partner Agencies */}
              <div className="p-5 rounded-3xl bg-[#ffffff] border border-[#ebe8e3] shadow-xs">
                <p className="text-[11px] uppercase tracking-wider text-[#707974] font-bold mb-2.5">Switch Active Hub</p>
                <div className="flex flex-col gap-2">
                  {agencies.filter(a => a.name !== focusedAgency).map(a => (
                    <button
                      key={a.name}
                      type="button"
                      onClick={() => { setFocusedAgency(a.name); toast(`Active hub switched to: ${a.name}`); }}
                      className="flex items-center justify-between p-3 rounded-2xl bg-[#fcf9f4] hover:bg-[#f0ede9] border border-[#ebe8e3] transition-colors w-full text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#003527]/10 flex items-center justify-center font-bold text-[#003527] text-[12px]">{a.code}</div>
                        <div>
                          <div className="font-bold text-[#1c1c19] text-sm">{a.name}</div>
                          <div className="text-[11px] text-[#707974]">{a.id} · {a.techs} Units · {a.success} Success</div>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[#707974] text-[18px]">chevron_right</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Developer Telemetry Row ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Socket.IO Gateway',
                tag: 'WebSockets',
                tagStyle: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
                value: '1,420 Streams',
                desc: 'Throttled interval: 5000ms. Avg round-trip latency: 32ms.',
                meta: ['Heartbeat: 20s Ping', '0 Dropped Frames'],
                type: 'socket'
              },
              {
                title: 'PostGIS Engine',
                tag: 'Spatial Index',
                tagStyle: 'bg-[#fea619]/20 text-[#855300] border border-[#fea619]/30',
                value: '18.4 QPS',
                desc: 'ST_DWithin queries bound to 8.5km technician dispatch cluster radius.',
                meta: ['Execution: 4.2ms avg', 'GiST Indexed'],
                type: 'postgis'
              },
              {
                title: 'BullMQ Notification',
                tag: 'Redis Workers',
                tagStyle: 'bg-[#f0ede9] text-[#707974] border border-[#ebe8e3]',
                value: '99.8% WhatsApp',
                desc: 'SMS OTP: 99.9% delivery | Transactional Email: 100% SLA.',
                meta: ['Retry Backoff: Exp 3x', '0 Dead Letters'],
                type: 'bullmq'
              },
              {
                title: 'PII Security Vault',
                tag: '2-Step Auth',
                tagStyle: 'bg-[#003527]/10 text-[#003527] border border-[#003527]/20',
                value: '42 Releases Today',
                desc: 'Worker contact decryption logged. Zero unreleased PII breaches.',
                meta: ['Admin Dual-Sign: On', 'Audit Pass'],
                type: 'vault'
              },
            ].map(card => (
              <button
                key={card.title}
                type="button"
                onClick={() => setSelectedTelemetryCard(card)}
                className="p-5 rounded-3xl bg-[#ffffff] border border-[#ebe8e3] shadow-xs hover:shadow-md hover:border-[#003527]/30 transition-all text-left flex flex-col gap-2 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase font-bold text-[#707974]">{card.title}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${card.tagStyle}`}>{card.tag}</span>
                </div>
                <div className="text-xl font-black text-[#003527]">{card.value}</div>
                <p className="text-[12px] text-[#707974] leading-relaxed">{card.desc}</p>
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#ebe8e3]">
                  <span className="text-[#707974]">{card.meta[0]}</span>
                  <span className="text-[#003527] font-bold">{card.meta[1]}</span>
                </div>
              </button>
            ))}
          </div>

          {/* ── Worker Performance Table (With Pagination & Real Modals) ── */}
          <div className="rounded-3xl border border-[#ebe8e3] overflow-hidden shadow-xs bg-[#ffffff]" id="workers-section">
            <div className="px-6 py-4 bg-[#fcf9f4] border-b border-[#ebe8e3] flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="font-bold text-[#003527] text-base">Active Fleet Inspection &amp; Performance Ledger</h2>
                <p className="text-[12px] text-[#707974]">Real-time status tracking, job assignment logs, and admin cryptographic contact releases.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search technician, spec..."
                    value={workerSearch}
                    onChange={e => { setWorkerSearch(e.target.value); setCurrentPage(1); }}
                    className="pl-8 pr-3 py-2 rounded-xl bg-[#ffffff] border border-[#ebe8e3] text-[#1c1c19] text-[12px] focus:outline-none focus:ring-2 focus:ring-[#003527]/30 w-52 shadow-xs"
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[16px] text-[#707974]">search</span>
                </div>
                <select
                  value={agencyFilter}
                  onChange={e => { setAgencyFilter(e.target.value); setCurrentPage(1); }}
                  className="px-3 py-2 rounded-xl bg-[#ffffff] border border-[#ebe8e3] text-[#1c1c19] text-[12px] focus:outline-none shadow-xs cursor-pointer"
                >
                  <option value="ALL">All Agencies</option>
                  <option value="EcoPest Solutions">EcoPest Solutions</option>
                  <option value="Urban Shield">Urban Shield</option>
                  <option value="BioSafe Hub">BioSafe Hub</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  className="px-3 py-2 rounded-xl bg-[#ffffff] border border-[#ebe8e3] text-[#1c1c19] text-[12px] focus:outline-none shadow-xs cursor-pointer"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Working">Working On Site</option>
                  <option value="En Route">En Route</option>
                  <option value="Idle">Idle Standby</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#fbf7ee] border-b border-[#ebe8e3] text-[11px] uppercase tracking-wider text-[#707974] font-bold">
                    {['Worker Profile', 'Agency & Hub', 'Direct Mobile', 'Current State', 'Bio-Specialization', "Today's Jobs", 'Rating & Totals', 'Success Rate', 'Developer Actions'].map((h, i) => (
                      <th key={h} className={`py-3.5 px-4 ${i === 8 ? 'text-right' : ''}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebe8e3] bg-[#ffffff]">
                  {paginatedWorkers.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-[#707974] text-sm">
                        No field technicians match the selected filters.
                      </td>
                    </tr>
                  ) : (
                    paginatedWorkers.map(w => (
                      <tr key={w.id} className="hover:bg-[#fcf9f4] transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <img src={w.avatar} alt={w.name} className="w-9 h-9 rounded-full object-cover border border-[#ebe8e3]" />
                            <div>
                              <div className="font-bold text-[#1c1c19] text-sm">{w.name}</div>
                              <div className="text-[11px] text-[#707974] font-mono">{w.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-[#003527] text-sm">{w.agency}</div>
                          <div className="text-[11px] text-[#707974]">Hub: {w.hub}</div>
                        </td>
                        <td className="py-3 px-4">
                          <a href={`tel:${w.phone}`} className="font-mono text-[12px] text-[#003527] font-bold hover:underline">{w.phone}</a>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${w.statusStyle}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${w.statusDot}`} />{w.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-0.5 rounded-lg bg-[#f0ede9] border border-[#ebe8e3] text-[#404944] text-[11px] font-medium">{w.spec}</span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span className="text-[#003527] font-bold">{w.done} Done</span>
                          <span className="text-[#707974]"> / {w.queue} Queue</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#855300] text-sm">{w.rating}</span>
                          <span className="text-[11px] text-[#707974] ml-1">({w.jobs})</span>
                        </td>
                        <td className="py-3 px-4 font-bold text-[#003527] text-sm">{w.success}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Real Telemetry Modal Trigger */}
                            <button
                              type="button"
                              onClick={() => setSelectedTelemetryWorker(w)}
                              className="px-3 py-1.5 rounded-xl bg-[#003527]/10 hover:bg-[#003527] hover:text-white text-[#003527] font-bold text-[12px] transition-all flex items-center gap-1 cursor-pointer"
                              title="Inspect Live Telemetry"
                            >
                              <span className="material-symbols-outlined text-[14px]">sensors</span>
                              Telemetry
                            </button>
                            {/* Real PII Audit Modal Trigger */}
                            <button
                              type="button"
                              onClick={() => { setSelectedPIIWorker(w); setShowMaskedPII(false); }}
                              className="px-3 py-1.5 rounded-xl bg-[#ffffff] border border-[#ebe8e3] hover:bg-[#f6f3ee] text-[#003527] font-bold text-[12px] transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                              title="Audit PII & Compliance"
                            >
                              <span className="material-symbols-outlined text-[14px]">encrypted</span>
                              Audit PII
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Functional Pagination Controls */}
            <div className="px-6 py-3.5 bg-[#fcf9f4] border-t border-[#ebe8e3] flex flex-wrap items-center justify-between gap-3 text-[12px] text-[#707974]">
              <span>
                Showing {filteredWorkers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredWorkers.length)} of {filteredWorkers.length} units
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="px-3.5 py-1.5 rounded-xl bg-[#ffffff] border border-[#ebe8e3] text-[#003527] font-bold hover:bg-[#f6f3ee] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs"
                >
                  Previous
                </button>
                <span className="font-bold text-[#1c1c19] px-2">Page {currentPage} of {totalPages}</span>
                <button
                  type="button"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="px-3.5 py-1.5 rounded-xl bg-[#ffffff] border border-[#ebe8e3] text-[#003527] font-bold hover:bg-[#f6f3ee] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* ── Client Growth Charts ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-6 rounded-3xl bg-[#ffffff] border border-[#ebe8e3] shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-[#707974] font-bold">Customer Acquisition &amp; Retention Cohorts</p>
                  <h3 className="font-bold text-[#003527] text-base">2,840 Cumulative Active Clients</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">+26% Month-on-Month</span>
              </div>
              <p className="text-[12px] text-[#707974] mb-4">High stickiness driven by bio-certified quarterly preventive pest protection. 74% recurrent maintenance rate.</p>
              <div className="w-full bg-[#fbf7ee] p-4 rounded-2xl mb-4 border border-[#ebe8e3]">
                <div className="flex items-end justify-between h-28 gap-2">
                  {[
                    { new: 25, sub: 55, week: 'W1' },
                    { new: 28, sub: 60, week: 'W2' },
                    { new: 32, sub: 65, week: 'W3' },
                    { new: 38, sub: 74, week: 'W4 (Now)', highlight: true },
                  ].map(w => (
                    <button key={w.week} type="button" onClick={() => toast(`${w.week}: ${w.new + w.sub} total clients — ${w.new}% new, ${w.sub}% subscribed`)} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer">
                      <div className="w-full flex flex-col gap-0.5 justify-end h-20">
                        <div className="w-full bg-[#fea619] rounded-t group-hover:opacity-80 transition-opacity" style={{ height: `${w.new}%` }} />
                        <div className="w-full bg-[#003527] rounded-b group-hover:opacity-80 transition-opacity" style={{ height: `${w.sub}%` }} />
                      </div>
                      <span className={`text-[10px] font-bold ${w.highlight ? 'text-[#003527]' : 'text-[#707974]'}`}>{w.week}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3]">
                  <span className="w-3 h-3 rounded-full bg-[#fea619] shrink-0" />
                  <div>
                    <div className="font-bold text-[#1c1c19] text-sm">740 New Clients (26%)</div>
                    <div className="text-[11px] text-[#707974]">Organic search, referral code &amp; local dispatch</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3]">
                  <span className="w-3 h-3 rounded-full bg-[#003527] shrink-0" />
                  <div>
                    <div className="font-bold text-[#1c1c19] text-sm">2,100 Subscribers (74%)</div>
                    <div className="text-[11px] text-[#707974]">Active quarterly bio-protection AMC plan</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#ffffff] border border-[#ebe8e3] shadow-xs flex flex-col gap-3.5">
              <h3 className="font-bold text-[#003527] text-base">Platform Quality Ledger</h3>
              {[
                { label: 'Chemical Safety Score', value: '100%', sub: 'Zero toxic incidents 90 days', icon: 'eco', color: 'text-[#003527]' },
                { label: 'Retreatment Rate', value: '0.8%', sub: '~10 per 1,250 jobs — Benchmark', icon: 'refresh', color: 'text-[#003527]' },
                { label: 'CSAT Platform Score', value: '99.4%', sub: '12,480 verified feedback forms', icon: 'thumb_up', color: 'text-[#855300]' },
                { label: 'Warranty Claims Filed', value: '1.2%', sub: '15 of 1,240 contracts', icon: 'policy', color: 'text-[#1c1c19]' },
              ].map(item => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => toast(`${item.label}: ${item.value} — ${item.sub}`)}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3] hover:border-[#003527]/30 transition-all text-left cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#003527]/10 flex items-center justify-center shrink-0">
                    <span className={`material-symbols-outlined text-[18px] ${item.color}`}>{item.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-[#707974]">{item.label}</div>
                    <div className={`font-black text-lg ${item.color}`}>{item.value}</div>
                    <div className="text-[11px] text-[#707974] truncate">{item.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>

      {/* ══════════════════════════════════════════════════════════════════════════
          REAL MODALS AND DRAWERS (100% FUNCTIONAL)
      ══════════════════════════════════════════════════════════════════════════ */}

      {/* ── 1. Worker Live Telemetry Modal ── */}
      {selectedTelemetryWorker && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && setSelectedTelemetryWorker(null)}>
          <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-xl w-full p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
              <div className="flex items-center gap-3">
                <img src={selectedTelemetryWorker.avatar} alt={selectedTelemetryWorker.name} className="w-12 h-12 rounded-2xl object-cover border border-[#ebe8e3]" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#003527] text-base">{selectedTelemetryWorker.name}</h3>
                    <span className="font-mono text-[11px] bg-[#f0ede9] px-2 py-0.5 rounded text-[#003527] font-bold border border-[#ebe8e3]">{selectedTelemetryWorker.id}</span>
                  </div>
                  <p className="text-[12px] text-[#707974]">{selectedTelemetryWorker.agency} · {selectedTelemetryWorker.hub}</p>
                </div>
              </div>
              <button type="button" onClick={() => setSelectedTelemetryWorker(null)} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Telemetry Status Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-3 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3] text-center">
                <span className="text-[10px] uppercase font-bold text-[#707974] block">State</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${selectedTelemetryWorker.statusStyle}`}>{selectedTelemetryWorker.status}</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3] text-center">
                <span className="text-[10px] uppercase font-bold text-[#707974] block">Battery</span>
                <span className="text-sm font-black text-[#003527] mt-0.5 block">{selectedTelemetryWorker.battery}</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3] text-center">
                <span className="text-[10px] uppercase font-bold text-[#707974] block">Socket RTT</span>
                <span className="text-sm font-black text-[#855300] mt-0.5 block">{selectedTelemetryWorker.ping}</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3] text-center">
                <span className="text-[10px] uppercase font-bold text-[#707974] block">GPS Accuracy</span>
                <span className="text-sm font-black text-[#1c1c19] mt-0.5 block">±2.4m</span>
              </div>
            </div>

            {/* Current Active Assignment */}
            <div className="p-4 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3] flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] uppercase font-bold text-[#003527]">
                <span>Active Target Assignment</span>
                <span className="flex items-center gap-1 text-emerald-700 font-bold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Live Tracking</span>
              </div>
              <div className="text-sm font-bold text-[#1c1c19]">{selectedTelemetryWorker.currentJob}</div>
              <div className="text-[12px] text-[#707974] flex items-center justify-between">
                <span>Specialization: <strong className="text-[#003527]">{selectedTelemetryWorker.spec}</strong></span>
                <span className="font-mono text-[11px] font-bold">{selectedTelemetryWorker.lat}, {selectedTelemetryWorker.lng}</span>
              </div>
            </div>

            {/* Live Socket Feed Console */}
            <div className="p-3.5 rounded-2xl bg-[#003527] text-[#c2ebdc] font-mono text-[11px] flex flex-col gap-1 overflow-x-auto max-h-32 border border-[#064e3b]">
              <div className="text-[#80bea6] flex items-center justify-between pb-1 border-b border-[#064e3b]">
                <span>🛰️ SOCKET.IO TELEMETRY PACKET LOG</span>
                <span className="text-[#fea619] font-bold">CONNECTED (TLS 1.3)</span>
              </div>
              <div>[17:42:01] PING: {selectedTelemetryWorker.ping} · WebSocket heartbeat ACK</div>
              <div>[17:42:06] GEO: ({selectedTelemetryWorker.lat}, {selectedTelemetryWorker.lng}) → PostGIS spatial buffer refreshed</div>
              <div>[17:42:11] TELEMETRY: Battery {selectedTelemetryWorker.battery} · Signal: -64 dBm · ETA: 12m</div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => toast(`📍 GPS ping transmitted to ${selectedTelemetryWorker.name}. Real-time coordinate refreshed.`)}
                className="flex-1 py-3 rounded-xl bg-[#003527] text-white font-bold text-sm hover:bg-[#064e3b] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">radar</span>Force Location Refresh
              </button>
              <button
                type="button"
                onClick={() => setSelectedTelemetryWorker(null)}
                className="px-5 py-3 rounded-xl bg-[#ffffff] border border-[#ebe8e3] text-[#003527] font-bold text-sm hover:bg-[#f6f3ee] transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. Cryptographic PII Audit Decryption Modal ── */}
      {selectedPIIWorker && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && setSelectedPIIWorker(null)}>
          <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#003527] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">policy</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#003527] text-base">Cryptographic PII Audit Vault</h3>
                  <p className="text-[12px] text-[#707974]">Dual-Sign Decryption Log · Root Super-Admin Session</p>
                </div>
              </div>
              <button type="button" onClick={() => setSelectedPIIWorker(null)} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#003527]/10 border border-[#003527]/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#003527] text-[18px]">verified_user</span>
                <span className="text-[12px] text-[#003527] font-bold">Level-3 Audit Clearance Confirmed</span>
              </div>
              <button
                type="button"
                onClick={() => { setShowMaskedPII(!showMaskedPII); toast(showMaskedPII ? 'PII data re-masked' : '🔓 PII data decrypted via Root Master Key'); }}
                className="px-3 py-1 rounded-xl bg-[#003527] text-white font-bold text-[11px] hover:bg-[#064e3b] transition-all cursor-pointer shadow-xs"
              >
                {showMaskedPII ? '🔒 Mask PII' : '🔓 Decrypt PII'}
              </button>
            </div>

            {/* PII Attributes */}
            <div className="p-4 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3] flex flex-col gap-2 text-sm">
              {[
                ['Legal Worker Name', selectedPIIWorker.name],
                ['Technician ID', selectedPIIWorker.id],
                ['Direct Mobile', showMaskedPII ? selectedPIIWorker.phone : '+91 ••••• ••239'],
                ['Aadhaar Hash Vault', showMaskedPII ? selectedPIIWorker.aadhaar : '•••• •••• ' + selectedPIIWorker.aadhaar.slice(-4)],
                ['Residential Address', showMaskedPII ? selectedPIIWorker.address : '••••••••••••••••••••••••••••••••'],
                ['Police Verification ID', showMaskedPII ? selectedPIIWorker.policeVerification : 'PV-KA-••••-•••• (Verified Clean)'],
                ['Digital Tamper Seal', 'SHA256: 7f88a912c0...44d9 (Immutable)'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between text-xs py-1 border-b border-[#ebe8e3]/60 last:border-0">
                  <span className="text-[#707974] font-medium">{k}</span>
                  <span className="font-bold text-[#1c1c19] font-mono">{v}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#707974]">
              Every decryption event is recorded on the immutable platform append-only ledger with timestamp, root IP address, and supervisor signature.
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  const data = JSON.stringify({ worker: selectedPIIWorker, auditLogId: 'AUDIT-' + Date.now(), accessedBy: 'admin@pestfast.com', timestamp: new Date().toISOString() }, null, 2);
                  const blob = new Blob([data], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `pii_audit_${selectedPIIWorker.id}.json`;
                  a.click();
                  toast(`📥 PII compliance record downloaded for ${selectedPIIWorker.id}`);
                }}
                className="flex-1 py-3 rounded-xl bg-[#003527] text-white font-bold text-sm hover:bg-[#064e3b] transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>Export Compliance Dossier
              </button>
              <button
                type="button"
                onClick={() => setSelectedPIIWorker(null)}
                className="px-5 py-3 rounded-xl bg-[#ffffff] border border-[#ebe8e3] text-[#003527] font-bold text-sm hover:bg-[#f6f3ee] transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. Agency Security Key & Audit Modal ── */}
      {selectedSecurityAgency && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && setSelectedSecurityAgency(null)}>
          <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#003527] text-white flex items-center justify-center font-bold text-base shadow-xs">
                  {selectedSecurityAgency.code}
                </div>
                <div>
                  <h3 className="font-bold text-[#003527] text-base">{selectedSecurityAgency.name}</h3>
                  <p className="text-[12px] text-[#707974]">API Keypair &amp; mTLS Dispatch Credentials</p>
                </div>
              </div>
              <button type="button" onClick={() => setSelectedSecurityAgency(null)} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* API Keys */}
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold uppercase text-[#707974]">Production API Secret Key</span>
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="text-[#003527] text-[11px] font-bold hover:underline cursor-pointer"
                  >
                    {showApiKey ? 'Hide' : 'Reveal'}
                  </button>
                </div>
                <div className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-[#ebe8e3] font-mono text-[12px]">
                  <span className="text-[#1c1c19]">{showApiKey ? selectedSecurityAgency.apiKey : 'pf_live_sk_••••••••••••••••••••'}</span>
                  <button
                    type="button"
                    onClick={() => { navigator.clipboard?.writeText(selectedSecurityAgency.apiKey); toast('📋 API Key copied to clipboard'); }}
                    className="text-[#003527] hover:opacity-70 transition-opacity ml-2 cursor-pointer"
                    title="Copy Key"
                  >
                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold uppercase text-[#707974]">Webhook HMAC Secret</span>
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">Active</span>
                </div>
                <div className="flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-[#ebe8e3] font-mono text-[12px]">
                  <span className="text-[#1c1c19]">{selectedSecurityAgency.webhookSec}</span>
                  <button
                    type="button"
                    onClick={() => { navigator.clipboard?.writeText(selectedSecurityAgency.webhookSec); toast('📋 Webhook secret copied'); }}
                    className="text-[#003527] hover:opacity-70 transition-opacity ml-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                  </button>
                </div>
              </div>

              {/* Certificate & Quotas */}
              <div className="p-4 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3] flex flex-col gap-2">
                {[
                  ['mTLS Certificate', selectedSecurityAgency.certExpiry],
                  ['Spatial API Rate Limit', selectedSecurityAgency.qps],
                  ['Cluster Permissions', 'READ_DISPATCH, WRITE_TELEMETRY, BILLING_EXEC']
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between text-xs py-1 border-b border-[#ebe8e3]/60 last:border-0">
                    <span className="text-[#707974]">{k}</span>
                    <span className="font-bold text-[#1c1c19]">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => toast(`🔄 Keypair rotated for ${selectedSecurityAgency.name}. New secret deployed via KMS.`)}
                className="flex-1 py-3 rounded-xl bg-[#003527] text-white font-bold text-sm hover:bg-[#064e3b] transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">sync</span>Rotate API Credentials
              </button>
              <button
                type="button"
                onClick={() => setSelectedSecurityAgency(null)}
                className="px-5 py-3 rounded-xl bg-[#ffffff] border border-[#ebe8e3] text-[#003527] font-bold text-sm hover:bg-[#f6f3ee] transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 4. Developer Telemetry Cards Inspect Modal ── */}
      {selectedTelemetryCard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4" onClick={e => e.target === e.currentTarget && setSelectedTelemetryCard(null)}>
          <div className="bg-[#ffffff] border border-[#ebe8e3] rounded-3xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#003527] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">developer_board</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#003527] text-base">{selectedTelemetryCard.title}</h3>
                  <p className="text-[12px] text-[#707974]">{selectedTelemetryCard.tag} · Real-time Inspector</p>
                </div>
              </div>
              <button type="button" onClick={() => setSelectedTelemetryCard(null)} className="w-9 h-9 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] flex items-center justify-center text-[#404944] transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#fbf7ee] border border-[#ebe8e3] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-[#707974]">Throughput / Status</span>
                <span className="text-base font-black text-[#003527]">{selectedTelemetryCard.value}</span>
              </div>
              <p className="text-xs text-[#707974] leading-relaxed">{selectedTelemetryCard.desc}</p>
            </div>

            {/* Live Inspection Console */}
            <div className="p-4 rounded-2xl bg-[#003527] text-[#c2ebdc] font-mono text-[11px] flex flex-col gap-1 overflow-x-auto max-h-40 border border-[#064e3b]">
              <div className="text-[#80bea6] pb-1 border-b border-[#064e3b] flex justify-between">
                <span>DIAGNOSTIC ENGINE LOG</span>
                <span className="text-[#fea619] font-bold">STATUS: NOMINAL</span>
              </div>
              <div>[QUERY PLAN] ST_DWithin(worker_geom, ST_MakePoint(77.5946, 12.9716), 8500)</div>
              <div>[INDEX] Index Scan using idx_workers_geom on technicians (cost=0.15..8.22)</div>
              <div>[BUFFER] Cache hit ratio: 99.94% · 0 cold misses in past 3,600s</div>
              <div>[SOCKET] Active pipes: 1,420 · Frame drop rate: 0.000%</div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => toast(`🩺 Full diagnostic self-test passed for ${selectedTelemetryCard.title}`)}
                className="flex-1 py-3 rounded-xl bg-[#003527] text-white font-bold text-sm hover:bg-[#064e3b] transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">play_circle</span>Run Diagnostics Check
              </button>
              <button
                type="button"
                onClick={() => setSelectedTelemetryCard(null)}
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

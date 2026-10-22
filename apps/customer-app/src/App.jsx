import React, { useState, useEffect, Suspense, lazy } from 'react';
import CustomerView from './CustomerView.jsx';

const WorkerApp = lazy(() => import('../../worker-app/src/App.jsx'));
const AgencyApp = lazy(() => import('../../agency-dashboard/src/App.jsx'));
const AdminApp = lazy(() => import('../../admin-dashboard/src/App.jsx'));

// Ensure all sub-portal stylesheet rules (KPI cards, grid layouts, labels) are loaded
import '../../worker-app/src/index.css';
import '../../agency-dashboard/src/index.css';
import '../../admin-dashboard/src/index.css';

/**
 * Universal Route Resolver
 * Maps browser pathname to one of the 4 unified portals with ZERO top bar overhead
 */
function resolvePortal(pathname) {
  const p = (pathname || '').toLowerCase();
  if (p.startsWith('/admin')) return 'admin';
  if (p.startsWith('/agency')) return 'agency';
  if (p.startsWith('/technician') || p.startsWith('/worker')) return 'technician';
  if (p.startsWith('/customer')) return 'customer';
  return 'customer'; // Default home is Customer Portal
}

export default function UnifiedPortalApp() {
  const [activePortal, setActivePortal] = useState(() => resolvePortal(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setActivePortal(resolvePortal(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="unified-portal-root min-h-screen bg-[#FFF4C2] text-[#1D2B1A]" style={{ backgroundColor: '#FFF4C2' }}>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-[#FFF4C2] text-[#003527] font-bold text-sm">
          Loading Easy HiCare Portal...
        </div>
      }>
        {activePortal === 'customer' && <CustomerView />}
        {activePortal === 'technician' && <WorkerApp />}
        {activePortal === 'agency' && <AgencyApp />}
        {activePortal === 'admin' && <AdminApp />}
      </Suspense>
    </div>
  );
}

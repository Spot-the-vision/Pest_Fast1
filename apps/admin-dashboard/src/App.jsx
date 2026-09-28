import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { theme, Button } from 'ui-kit';
import { UsersIcon, BriefcaseIcon, MapPinIcon, XIcon, ActivityIcon, PhoneIcon, GlobeIcon, TrendingUpIcon } from 'lucide-react';
import './index.css';

const MOCK_WORKERS = [
  { id: 1, name: 'Rahul Kumar', phone: '+91 9876543210', status: 'Active', location: 'Jubilee Hills - En route to Job', successRate: '98%', todayJobs: 3, weekJobs: 18, earnings: '₹14,500', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
  { id: 2, name: 'Amit Sharma', phone: '+91 9123456789', status: 'Active', location: 'Banjara Hills - At Location', successRate: '95%', todayJobs: 2, weekJobs: 14, earnings: '₹11,200', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
  { id: 3, name: 'Suresh Reddy', phone: '+91 9988776655', status: 'Inactive', location: 'Offline', successRate: '92%', todayJobs: 0, weekJobs: 8, earnings: '₹6,400', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop' }
];

export default function App() {
  const [authRole, setAuthRole] = useState(null); // 'admin' | 'agency' | null

  return (
    <Router>
      <div style={{ fontFamily: 'sans-serif', backgroundColor: theme.bgLight, minHeight: '100vh', color: theme.textDark }}>
        <Routes>
          <Route path="/" element={
            !authRole ? <Login onLogin={setAuthRole} /> : 
            (authRole === 'admin' ? <AdminGlobalDashboard onLogout={() => setAuthRole(null)} /> : <AgencyDashboard onLogout={() => setAuthRole(null)} />)
          } />
        </Routes>
      </div>
    </Router>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    // Smart Redirect Logic
    if (email === 'admin@pestfast.com') {
      onLogin('admin');
    } else {
      onLogin('agency');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleLogin} style={{ background: theme.cardBg, padding: '40px', borderRadius: '16px', border: `1px solid ${theme.border}`, width: '350px' }}>
        <h2 style={{ marginBottom: '5px', textAlign: 'center' }}>Portal Login</h2>
        <p style={{ textAlign: 'center', opacity: 0.7, marginBottom: '25px', fontSize: '13px' }}>Hint: Use admin@pestfast.com for Global Stats</p>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email Address</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}` }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}` }} />
        </div>
        <Button type="submit" style={{ width: '100%' }}>Login Securely</Button>
      </form>
    </div>
  );
}

function AdminGlobalDashboard({ onLogout }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <nav style={{ background: theme.bgDark, color: theme.textLight, padding: '15px 30px', borderBottom: `2px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px' }}><GlobeIcon /> Pest_Fast Global Admin</h2>
        <Button onClick={onLogout} style={{ padding: '8px 16px', background: '#dc2626', color: '#fff', border: 'none' }}>Logout</Button>
      </nav>

      <div style={{ padding: '30px', flex: 1, overflowY: 'auto' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}><TrendingUpIcon /> System Wide Accomplishments</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: theme.cardBg, padding: '25px', borderRadius: '12px', border: `1px solid ${theme.border}`, borderLeft: `5px solid ${theme.buttonBg}` }}>
            <p style={{ margin: '0 0 5px', opacity: 0.8 }}>Total Agency Jobs Accomplished</p>
            <h1 style={{ margin: 0, color: theme.buttonBg, fontSize: '42px' }}>14,208</h1>
          </div>
          <div style={{ background: theme.cardBg, padding: '25px', borderRadius: '12px', border: `1px solid ${theme.border}`, borderLeft: `5px solid #10b981` }}>
            <p style={{ margin: '0 0 5px', opacity: 0.8 }}>Global Success Rate</p>
            <h1 style={{ margin: 0, color: '#10b981', fontSize: '42px' }}>96.8%</h1>
          </div>
        </div>

        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}><ActivityIcon /> Velocity Metrics (Jobs Completed)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: theme.bgLight, padding: '20px', borderRadius: '12px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>Today</span>
            <h2 style={{ margin: '10px 0 0', color: theme.buttonBg }}>482</h2>
          </div>
          <div style={{ background: theme.bgLight, padding: '20px', borderRadius: '12px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>This Week</span>
            <h2 style={{ margin: '10px 0 0', color: theme.buttonBg }}>3,150</h2>
          </div>
          <div style={{ background: theme.bgLight, padding: '20px', borderRadius: '12px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>This Month</span>
            <h2 style={{ margin: '10px 0 0', color: theme.buttonBg }}>12,890</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <div>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}><UsersIcon /> Workforce Pool Across Agencies</h3>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1, background: theme.cardBg, padding: '20px', borderRadius: '12px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>842</div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>Active Workers</div>
              </div>
              <div style={{ flex: 1, background: theme.cardBg, padding: '20px', borderRadius: '12px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444' }}>125</div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>Inactive / On Leave</div>
              </div>
            </div>
          </div>
          <div>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}><BriefcaseIcon /> Client Demand</h3>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1, background: theme.cardBg, padding: '20px', borderRadius: '12px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6' }}>89%</div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>New Client Logins</div>
              </div>
              <div style={{ flex: 1, background: theme.cardBg, padding: '20px', borderRadius: '12px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6' }}>11%</div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>Existing Client Requests</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function AgencyDashboard({ onLogout }) {
  // Same content as the agency dashboard from before
  const [selectedWorker, setSelectedWorker] = useState(null);
  const activeWorkers = MOCK_WORKERS.filter(w => w.status === 'Active').length;
  const inactiveWorkers = MOCK_WORKERS.filter(w => w.status === 'Inactive').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <nav style={{ background: theme.cardBg, padding: '15px 30px', borderBottom: `2px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontWeight: '900' }}>Pest_Fast Agency</h2>
        <Button variant="secondary" onClick={onLogout} style={{ padding: '8px 16px' }}>Logout</Button>
      </nav>

      <div style={{ padding: '30px', flex: 1, overflowY: 'auto' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}><ActivityIcon /> Operations Overview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: theme.cardBg, padding: '20px', borderRadius: '12px', border: `1px solid ${theme.border}` }}>
            <p style={{ margin: '0 0 10px', fontSize: '14px', opacity: 0.8 }}>Active Jobs Today</p>
            <h2 style={{ margin: 0, color: theme.buttonBg, fontSize: '32px' }}>12</h2>
          </div>
          <div style={{ background: theme.cardBg, padding: '20px', borderRadius: '12px', border: `1px solid ${theme.border}` }}>
            <p style={{ margin: '0 0 10px', fontSize: '14px', opacity: 0.8 }}>Running Currently</p>
            <h2 style={{ margin: 0, color: '#f59e0b', fontSize: '32px' }}>4</h2>
          </div>
          <div style={{ background: theme.cardBg, padding: '20px', borderRadius: '12px', border: `1px solid ${theme.border}` }}>
            <p style={{ margin: '0 0 10px', fontSize: '14px', opacity: 0.8 }}>Scheduled Next 24h</p>
            <h2 style={{ margin: 0, color: '#3b82f6', fontSize: '32px' }}>28</h2>
          </div>
        </div>

        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}><UsersIcon /> Workforce Stats</h3>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: theme.buttonBg, color: '#fff', padding: '15px 30px', borderRadius: '12px', display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{activeWorkers}</div>
            <div>Active Workers</div>
          </div>
          <div style={{ background: '#ef4444', color: '#fff', padding: '15px 30px', borderRadius: '12px', display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{inactiveWorkers}</div>
            <div>Inactive Workers</div>
          </div>
        </div>

        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}><BriefcaseIcon /> Worker Directory</h3>
        <div style={{ background: theme.cardBg, borderRadius: '16px', border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: theme.bgLight }}>
              <tr>
                <th style={{ padding: '15px 20px', borderBottom: `1px solid ${theme.border}` }}>Profile</th>
                <th style={{ padding: '15px 20px', borderBottom: `1px solid ${theme.border}` }}>Status</th>
                <th style={{ padding: '15px 20px', borderBottom: `1px solid ${theme.border}` }}>Live Location</th>
                <th style={{ padding: '15px 20px', borderBottom: `1px solid ${theme.border}` }}>Success %</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_WORKERS.map(w => (
                <tr key={w.id} onClick={() => setSelectedWorker(w)} style={{ borderBottom: `1px solid ${theme.border}`, cursor: 'pointer' }} className="worker-row">
                  <td style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src={w.avatar} alt={w.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div><div style={{ fontWeight: 'bold' }}>{w.name}</div></div>
                  </td>
                  <td style={{ padding: '15px 20px' }}>{w.status}</td>
                  <td style={{ padding: '15px 20px' }}>{w.location}</td>
                  <td style={{ padding: '15px 20px', fontWeight: 'bold' }}>{w.successRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Slide-out Modal */}
      {selectedWorker && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 50, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '400px', background: theme.bgLight, height: '100%', padding: '30px', boxShadow: '-5px 0 20px rgba(0,0,0,0.1)', overflowY: 'auto', position: 'relative' }}>
            <button onClick={() => setSelectedWorker(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <XIcon size={24} color={theme.textDark} />
            </button>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <img src={selectedWorker.avatar} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', border: `4px solid ${theme.border}`, marginBottom: '15px' }} />
              <h2 style={{ margin: 0 }}>{selectedWorker.name}</h2>
              <p style={{ margin: '5px 0 20px', opacity: 0.8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}><PhoneIcon size={16}/> {selectedWorker.phone}</p>
            </div>
            <div style={{ marginTop: '20px', background: theme.cardBg, padding: '20px', borderRadius: '16px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
              <p style={{ margin: '0 0 5px', fontSize: '14px', opacity: 0.8 }}>Total Earnings Generated</p>
              <h1 style={{ margin: 0, color: theme.buttonBg }}>{selectedWorker.earnings}</h1>
            </div>
          </div>
        </div>
      )}
      <style>{`.worker-row:hover { background-color: #f1f5f9; }`}</style>
    </div>
  );
}

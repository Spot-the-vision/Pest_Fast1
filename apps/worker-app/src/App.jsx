import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { theme, Button, Alert, AlertTitle, AlertDescription } from 'ui-kit';
import { MapPinIcon, CheckCircle2Icon, BriefcaseIcon, ClockIcon } from 'lucide-react';
import './App.css';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div style={{ fontFamily: 'sans-serif', backgroundColor: theme.bgLight, minHeight: '100vh', color: theme.textDark }}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <WorkerDashboard onLogout={() => setIsAuthenticated(false)} /> : <WorkerOnboarding onLogin={() => setIsAuthenticated(true)} />} />
        </Routes>
      </div>
    </Router>
  );
}

function WorkerOnboarding({ onLogin }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', pan: '', aadhaar: '', voterId: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleVerify = (e) => {
    e.preventDefault();
    if (Object.values(formData).every(val => val.trim() !== '')) {
      onLogin();
    } else {
      alert("Please fill all documents for verification.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <div style={{ background: theme.cardBg, padding: '40px', borderRadius: '16px', border: `1px solid ${theme.border}`, width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Worker Registration</h2>
        
        {step === 1 ? (
          <div>
            <p style={{ marginBottom: '20px', opacity: 0.8 }}>Enter your details to check for agency pre-registration.</p>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}` }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Mobile Number</label>
              <input name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}` }} />
            </div>
            <Button onClick={() => setStep(2)} style={{ width: '100%' }}>Next</Button>
          </div>
        ) : (
          <form onSubmit={handleVerify}>
            <p style={{ marginBottom: '20px', opacity: 0.8 }}>Upload document IDs for KYC Verification.</p>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>PAN Card Number</label>
              <input name="pan" value={formData.pan} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}` }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Aadhaar Number</label>
              <input name="aadhaar" value={formData.aadhaar} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}` }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Voter ID</label>
              <input name="voterId" value={formData.voterId} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}` }} />
            </div>
            <Button type="submit" style={{ width: '100%' }}>Verify & Go Online</Button>
            <Button type="button" variant="secondary" onClick={() => setStep(1)} style={{ width: '100%', marginTop: '10px' }}>Back</Button>
          </form>
        )}
      </div>
    </div>
  );
}

function WorkerDashboard({ onLogout }) {
  const [period, setPeriod] = useState('Month');

  const stats = {
    Day: { success: '100%', rating: 5.0, jobs: 3 },
    Week: { success: '96%', rating: 4.8, jobs: 18 },
    Month: { success: '98%', rating: 4.9, jobs: 74 },
  };

  const currentStats = stats[period];

  const queuedJobs = [
    { id: 'JOB-9021', service: 'Termite Eradication', address: 'Plot 42, Jubilee Hills', time: 'Today, 2:00 PM', distance: '3.2 km' },
    { id: 'JOB-9022', service: 'Mosquito Pest Control', address: 'Banjara Hills, Road 12', time: 'Today, 5:30 PM', distance: '5.1 km' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top Header */}
      <nav style={{ background: theme.cardBg, padding: '15px 20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div>
          <span style={{ fontSize: '12px', opacity: 0.7, textTransform: 'uppercase', fontWeight: 'bold' }}>Active Agency</span>
          <h3 style={{ margin: 0, fontWeight: '900', color: theme.buttonBg }}>EcoPest Solutions</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></div>
          <span style={{ fontWeight: 'bold' }}>Online</span>
        </div>
        <Button variant="secondary" onClick={onLogout} style={{ padding: '8px 12px', fontSize: '13px' }}>Logout</Button>
      </nav>

      {/* Live Map Widget Area */}
      <div style={{ flex: 1, background: '#e5e7eb', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3, backgroundImage: 'radial-gradient(#064E3B 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div style={{ position: 'relative', background: theme.buttonBg, color: '#fff', padding: '10px 15px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
          <MapPinIcon size={20} />
          <span style={{ fontWeight: 'bold' }}>You are here</span>
        </div>
      </div>

      {/* Bottom Section: Queued Jobs & Metrics */}
      <div style={{ background: theme.cardBg, borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '25px', boxShadow: '0 -10px 30px rgba(0,0,0,0.1)', zIndex: 10, marginTop: '-20px', maxHeight: '55vh', overflowY: 'auto' }}>
        
        {/* Period Selector */}
        <div style={{ display: 'flex', background: theme.bgLight, borderRadius: '10px', padding: '5px', marginBottom: '20px' }}>
          {['Day', 'Week', 'Month'].map(p => (
            <div 
              key={p} 
              onClick={() => setPeriod(p)}
              style={{ flex: 1, textAlign: 'center', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', background: period === p ? theme.cardBg : 'transparent', boxShadow: period === p ? '0 2px 5px rgba(0,0,0,0.05)' : 'none', color: period === p ? theme.buttonBg : theme.textDark, transition: 'all 0.2s' }}
            >
              {p}
            </div>
          ))}
        </div>

        {/* Metrics Widget */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '25px' }}>
          <div style={{ background: theme.bgLight, padding: '15px', borderRadius: '12px', textAlign: 'center', border: `1px solid ${theme.border}` }}>
            <span style={{ fontSize: '12px', opacity: 0.8 }}>Success Rate</span>
            <h3 style={{ margin: '5px 0 0', color: theme.buttonBg, fontSize: '20px' }}>{currentStats.success}</h3>
          </div>
          <div style={{ background: theme.bgLight, padding: '15px', borderRadius: '12px', textAlign: 'center', border: `1px solid ${theme.border}` }}>
            <span style={{ fontSize: '12px', opacity: 0.8 }}>Avg Rating</span>
            <h3 style={{ margin: '5px 0 0', color: theme.buttonBg, fontSize: '20px' }}>⭐ {currentStats.rating}</h3>
          </div>
          <div style={{ background: theme.bgLight, padding: '15px', borderRadius: '12px', textAlign: 'center', border: `1px solid ${theme.border}` }}>
            <span style={{ fontSize: '12px', opacity: 0.8 }}>Jobs Done</span>
            <h3 style={{ margin: '5px 0 0', color: theme.buttonBg, fontSize: '20px' }}>{currentStats.jobs}</h3>
          </div>
        </div>

        {/* Queued Jobs */}
        <h3 style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><BriefcaseIcon size={20}/> Assigned Queue</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {queuedJobs.map(job => (
            <div key={job.id} style={{ border: `1px solid ${theme.border}`, padding: '15px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', background: theme.bgLight, padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{job.id}</span>
                <h4 style={{ margin: '8px 0', fontSize: '16px' }}>{job.service}</h4>
                <div style={{ display: 'flex', gap: '15px', fontSize: '13px', opacity: 0.8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ClockIcon size={14}/> {job.time}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPinIcon size={14}/> {job.distance}</span>
                </div>
              </div>
              <Button style={{ padding: '10px 15px', fontSize: '14px' }}>Navigate</Button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

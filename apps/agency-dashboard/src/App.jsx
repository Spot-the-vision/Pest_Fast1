const easyHiCareLogo = '/easyhicare-logo.png';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AgencyDashboard from './pages/Dashboard';
import WorkerFleet from './pages/WorkerFleet';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <div className="bg-[#fcf9f4] text-[#1c1c19] min-h-screen">
        <Routes>
          <Route path="/" element={<AgencyDashboard onLogout={() => setIsAuthenticated(false)} />} />
          <Route path="/agency" element={<AgencyDashboard onLogout={() => setIsAuthenticated(false)} />} />
          <Route path="/agency/*" element={<AgencyDashboard onLogout={() => setIsAuthenticated(false)} />} />
          <Route path="/worker-fleet" element={<WorkerFleet onLogout={() => setIsAuthenticated(false)} />} />
          <Route path="/agency/worker-fleet" element={<WorkerFleet onLogout={() => setIsAuthenticated(false)} />} />
          <Route path="*" element={<AgencyDashboard onLogout={() => setIsAuthenticated(false)} />} />
        </Routes>
      </div>
    </Router>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('agency@ecopest.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fcf9f4] p-4">
      <form onSubmit={handleLogin} className="bg-white border border-[#ebe8e3] p-8 rounded-3xl shadow-xl w-full max-w-sm space-y-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <img
            src={easyHiCareLogo}
            alt="Easy HiCare Logo"
            className="h-12 w-auto max-w-[105px] rounded-xl bg-white p-1.5 object-contain border border-[#ebe8e3] shadow-xs"
          />
          <div>
            <h2 className="font-black text-lg text-[#003527]">Easy HiCare Agency</h2>
            <p className="text-[11px] text-[#707974]">Operations &amp; Fleet Dispatch Portal</p>
          </div>
        </div>

        <div className="bg-[#fcf9f4] border border-[#ebe8e3] p-2.5 rounded-xl text-xs text-[#707974] text-center font-medium">
          EcoPest Solutions (Bangalore Hub #PF-8821)
        </div>

        <div>
          <label className="text-xs font-bold text-[#707974] block mb-1">Agency Email</label>
          <input 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            type="email" 
            className="w-full px-3 py-2 text-xs rounded-xl border border-[#ebe8e3] bg-white text-[#1c1c19] focus:outline-none focus:ring-2 focus:ring-[#003527]/20" 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#707974] block mb-1">Password</label>
          <input 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            type="password" 
            className="w-full px-3 py-2 text-xs rounded-xl border border-[#ebe8e3] bg-white text-[#1c1c19] focus:outline-none focus:ring-2 focus:ring-[#003527]/20" 
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-2.5 bg-[#003527] text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#064e3b] transition-all shadow-xs cursor-pointer active:scale-[0.98]"
        >
          Sign In to Dispatch Ops
        </button>
      </form>
    </div>
  );
}
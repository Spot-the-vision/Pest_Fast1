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
      <div className="bg-surface text-on-surface min-h-screen">
        <Routes>
          <Route path="/" element={<AgencyDashboard onLogout={() => setIsAuthenticated(false)} />} />
          <Route path="/worker-fleet" element={<WorkerFleet onLogout={() => setIsAuthenticated(false)} />} />
        </Routes>

        {/* Dev Quick View Toggle */}
        <div className="fixed bottom-3 right-3 z-50 flex items-center gap-1.5 bg-surface-container-lowest/90 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-surface-container-high text-xs">
          <Link 
            to="/" 
            className="px-2.5 py-1 rounded-full hover:bg-surface-container font-semibold text-primary transition-colors"
          >
            🗺️ Ops Map
          </Link>
          <span className="text-outline">/</span>
          <Link 
            to="/worker-fleet" 
            className="px-2.5 py-1 rounded-full hover:bg-surface-container font-semibold text-primary transition-colors"
          >
            🛵 Fleet Roster
          </Link>
          <span className="text-outline">|</span>
          <button 
            onClick={() => setIsAuthenticated(false)} 
            className="px-2.5 py-1 rounded-full text-error hover:bg-error-container/40 font-semibold cursor-pointer"
          >
            Logout
          </button>
        </div>
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
    <div className="flex items-center justify-center min-h-screen bg-surface p-4">
      <form onSubmit={handleLogin} className="bg-surface-container-lowest border border-surface-container-high p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined text-[24px]">nature_people</span>
          </div>
          <div>
            <h2 className="font-headline font-bold text-lg text-primary">Pest Free Agency</h2>
            <p className="text-[11px] text-on-surface-variant">Operations & Fleet Dispatch Portal</p>
          </div>
        </div>

        <div className="bg-surface-container-low p-2.5 rounded-xl text-xs text-on-surface-variant text-center">
          EcoPest Solutions (Bangalore & Gurgaon Hub)
        </div>

        <div>
          <label className="text-xs font-bold text-on-surface-variant block mb-1">Agency Email</label>
          <input 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            type="email" 
            className="w-full px-3 py-2 text-xs rounded-lg border border-surface-container-high bg-surface-container-low focus:outline-none focus:border-primary" 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-on-surface-variant block mb-1">Password</label>
          <input 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            type="password" 
            className="w-full px-3 py-2 text-xs rounded-lg border border-surface-container-high bg-surface-container-low focus:outline-none focus:border-primary" 
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
        >
          Sign In to Dispatch Ops
        </button>
      </form>
    </div>
  );
}
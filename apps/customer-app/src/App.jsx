import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookingScreen from './pages/BookingScreen';
import TrackingScreen from './pages/TrackingScreen';
import './index.css';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#fcf9f4', minHeight: '100vh', color: '#1c1c19' }}>
        <Routes>
          <Route path="/" element={
            <div>
               <BookingScreen />
               <Link to="/tracking" style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 1000, background: '#064e3b', color: '#fff', padding: '10px 20px', borderRadius: '20px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                 Dev: Jump to Tracking ➔
               </Link>
            </div>
          } />
          <Route path="/tracking" element={
            <div>
               <TrackingScreen />
               <Link to="/" style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 1000, background: '#ba1a1a', color: '#fff', padding: '10px 20px', borderRadius: '20px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                 ← Dev: Back to Booking
               </Link>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

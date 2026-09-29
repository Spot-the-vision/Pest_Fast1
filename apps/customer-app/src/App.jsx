import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookingScreen from './pages/BookingScreen';
import TrackingScreen from './pages/TrackingScreen';
import './index.css';

function App() {
  return (
    <Router>
      <div className="bg-surface min-h-screen text-on-surface">
        <Routes>
          <Route path="/" element={<BookingScreen />} />
          <Route path="/tracking" element={<TrackingScreen />} />
        </Routes>

        {/* Dev Quick View Navigator */}
        <div className="fixed bottom-3 right-3 z-50 flex items-center gap-1.5 bg-surface-container-lowest/90 backdrop-blur-md p-1 rounded-full shadow-lg border border-surface-container-high text-xs">
          <Link 
            to="/" 
            className="px-2.5 py-1 rounded-full hover:bg-surface-container font-semibold text-primary transition-colors"
          >
            📋 Book
          </Link>
          <span className="text-outline">/</span>
          <Link 
            to="/tracking" 
            className="px-2.5 py-1 rounded-full hover:bg-surface-container font-semibold text-primary transition-colors"
          >
            📍 Live Track
          </Link>
        </div>
      </div>
    </Router>
  );
}

export default App;
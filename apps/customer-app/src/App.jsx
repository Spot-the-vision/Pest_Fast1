import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { theme, Button, Alert, AlertTitle, AlertDescription } from 'ui-kit';
import { mockServices, mockAgencies } from 'shared-types';
import { CheckCircle2Icon, PhoneIcon } from 'lucide-react';
import './index.css';

const flipCardStyles = `
.flip-card {
  background-color: transparent;
  width: 100%;
  height: 350px;
  perspective: 1000px;
  margin-bottom: 20px;
}
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
}
.flip-card.flipped .flip-card-inner {
  transform: rotateY(180deg);
}
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid ${theme.border};
}
.flip-card-front {
  background-color: ${theme.cardBg};
  color: ${theme.textDark};
}
.flip-card-back {
  background-color: ${theme.bgLight};
  color: ${theme.textDark};
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
`;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <style>{flipCardStyles}</style>
      <div style={{ fontFamily: 'sans-serif', backgroundColor: theme.bgLight, minHeight: '100vh', color: theme.textDark }}>
        <nav style={{ background: theme.cardBg, padding: '15px 30px', borderBottom: `2px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, fontWeight: '900' }}>Pest_Fast</h2>
          {isAuthenticated && <Button variant="secondary" onClick={() => setIsAuthenticated(false)}>Logout</Button>}
        </nav>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Login onLogin={() => setIsAuthenticated(true)} />} />
        </Routes>
      </div>
    </Router>
  );
}

function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>
      <div style={{ background: theme.cardBg, padding: '40px', borderRadius: '16px', border: `1px solid ${theme.border}`, width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '20px' }}>Login / Register</h2>
        {step === 1 ? (
          <div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Full Name</label>
              <input 
                value={name} onChange={e => setName(e.target.value)} placeholder="e.g. John Doe"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}` }}
              />
            </div>
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Mobile Number</label>
              <input 
                value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. +91 9876543210"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}` }}
              />
            </div>
            <Button onClick={() => setStep(2)} style={{ width: '100%' }}>Send OTP</Button>
          </div>
        ) : (
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Enter OTP</label>
            <input 
              value={otp} 
              onChange={e => setOtp(e.target.value)} 
              placeholder="1234"
              style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: `1px solid ${theme.border}` }}
            />
            <Button onClick={onLogin} style={{ width: '100%' }}>Verify & Login</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function Dashboard() {
  const [selectedService, setSelectedService] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (selectedService) {
    return <BookingFlow service={selectedService} onBack={() => setSelectedService(null)} />;
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ background: theme.buttonBg, color: theme.textLight, padding: '30px', borderRadius: '16px', marginBottom: '40px' }}>
        <h2>Available Agencies in your Area</h2>
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          {mockAgencies.map(ag => (
            <div key={ag.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px' }}>
              <strong>{ag.name}</strong> - ⭐ {ag.rating} <br/>
              <small>{ag.tagline}</small>
            </div>
          ))}
        </div>
      </div>

      <h2>Pest Control Services</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        {mockServices.map(service => (
          <div key={service.id} className={`flip-card ${flippedCards[service.id] ? 'flipped' : ''}`} onClick={() => toggleFlip(service.id)}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={service.image} alt={service.name} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} />
                <h3>{service.name}</h3>
                <h4 style={{ color: theme.buttonHover }}>{service.price}</h4>
                <p style={{ fontSize: '12px', opacity: 0.7 }}>(Tap to see details & book)</p>
              </div>
              <div className="flip-card-back">
                <h3>{service.name}</h3>
                <ul style={{ textAlign: 'left', fontSize: '14px', marginBottom: '20px', paddingLeft: '20px' }}>
                  <li><strong>Warranty:</strong> {service.details.warranty}</li>
                  <li><strong>Type:</strong> {service.details.type}</li>
                  <li><strong>Note:</strong> {service.details.precautions}</li>
                </ul>
                <Button onClick={(e) => { e.stopPropagation(); setSelectedService(service); }} style={{ width: '80%' }}>
                  Book Pest Service for this
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <footer style={{ marginTop: '60px', borderTop: `1px solid ${theme.border}`, padding: '40px 0', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
          <span style={{ cursor: 'pointer' }}>Instagram</span>
          <span style={{ cursor: 'pointer' }}>Twitter</span>
          <span style={{ cursor: 'pointer' }}>WhatsApp</span>
          <span style={{ cursor: 'pointer' }}>Email</span>
          <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>Mobile: +91 1800-PEST</span>
        </div>
        <small>© 2026 Pest_Fast Customer App</small>
      </footer>
    </div>
  );
}

function BookingFlow({ service, onBack }) {
  const [inspection, setInspection] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [location, setLocation] = useState('');
  const [bookingStep, setBookingStep] = useState(1); // 1: Form, 2: OTP, 3: Success
  const [finalOtp, setFinalOtp] = useState('');

  const requestLocation = () => {
    setLocation('Fetching GPS...');
    setTimeout(() => setLocation('Plot 42, Jubilee Hills, Hyderabad'), 1000);
  };

  if (bookingStep === 3) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <Alert variant="default">
          <CheckCircle2Icon color={theme.buttonBg} />
          <AlertTitle>Booking Confirmed!</AlertTitle>
          <AlertDescription>Your {service.name} request has been placed securely for {location}. Nearest active worker will be assigned within the requested time slot.</AlertDescription>
        </Alert>
        <Button onClick={onBack} style={{ marginTop: '20px' }}>Back to Home</Button>
      </div>
    );
  }

  if (bookingStep === 2) {
    return (
      <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ background: theme.cardBg, padding: '40px', borderRadius: '16px', border: `1px solid ${theme.border}`, textAlign: 'center' }}>
          <h2>Final Confirmation</h2>
          <p style={{ opacity: 0.8, marginBottom: '20px' }}>Enter the OTP sent to your registered mobile to confirm the booking for {service.name}.</p>
          <input 
            value={finalOtp} onChange={e => setFinalOtp(e.target.value)} placeholder="1234"
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}`, marginBottom: '20px', textAlign: 'center', fontSize: '20px', letterSpacing: '4px' }}
          />
          <div style={{ display: 'flex', gap: '15px' }}>
            <Button variant="secondary" onClick={() => setBookingStep(1)} style={{ flex: 1 }}>Back</Button>
            <Button onClick={() => setBookingStep(3)} style={{ flex: 2 }}>Confirm Booking</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <Button variant="secondary" onClick={onBack} style={{ marginBottom: '20px' }}>← Back</Button>
      <div style={{ background: theme.cardBg, padding: '40px', borderRadius: '16px', border: `1px solid ${theme.border}` }}>
        <h2>Complete your booking</h2>
        <p><strong>Service:</strong> {service.name} ({service.price})</p>
        
        <div style={{ margin: '30px 0' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Service Location / Address</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              value={location} onChange={e => setLocation(e.target.value)} placeholder="Type address or use GPS"
              style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}` }}
            />
            <Button variant="secondary" onClick={requestLocation} style={{ padding: '0 15px' }}>📍 GPS</Button>
          </div>
        </div>

        <div style={{ margin: '30px 0' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Do you want an inspection first?</label>
          <div style={{ display: 'flex', gap: '15px' }}>
            <label><input type="radio" name="inspection" value="yes" onChange={() => setInspection('yes')} /> Yes, inspect first</label>
            <label><input type="radio" name="inspection" value="no" onChange={() => setInspection('no')} /> No, direct treatment</label>
          </div>
        </div>

        <div style={{ margin: '30px 0' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Select Time Slot</label>
          <select value={timeSlot} onChange={e => setTimeSlot(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px' }}>
            <option value="">-- Choose Slot --</option>
            <option value="3h">Within 3 Hours</option>
            <option value="6h">Within 6 Hours</option>
            <option value="24h">Within 24 Hours</option>
          </select>
        </div>

        <Button 
          disabled={!inspection || !timeSlot || !location} 
          onClick={() => setBookingStep(2)}
          style={{ width: '100%' }}
        >
          Proceed to OTP Confirmation
        </Button>
      </div>
    </div>
  );
}

export default App;

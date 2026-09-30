import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from './lib/api/store.js';
import { SAFETY_CHECKLIST_STEPS, answerWorkerSafetyQuestion, BUNDLED_CHEMICAL_SHEETS } from './lib/api/index.ts';
import './index.css';

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Toast Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((msg, type = 'default') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  }, []);
  return { toasts, show };
}

function ToastLayer({ toasts }) {
  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id} className={`toast ${t.type}`}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Bottom Sheet wrapper Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function Sheet({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="sheet-overlay" onClick={onClose}>
      <motion.div className="sheet" onClick={e => e.stopPropagation()}
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 35 }}>
        <div className="sheet-handle" />
        {children}
      </motion.div>
    </div>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Emergency SOS Sheet Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function SosSheet({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <Sheet open={open} onClose={onClose}>
          <h2 style={{ color: 'var(--danger)', marginBottom: 10 }}>Ã°Å¸Å¡Â¨ Emergency Alert</h2>
          <p style={{ fontSize: '.9rem', color: 'var(--ink-muted)', marginBottom: 16 }}>
            This will notify your agency supervisor, share your current GPS location, and call emergency services.
          </p>
          <div style={{ background: '#fee2e2', borderRadius: 12, padding: '12px 16px', marginBottom: 16 }}>
            <strong style={{ color: 'var(--danger)' }}>Emergency contacts:</strong>
            <div style={{ marginTop: 6, fontSize: '.88rem' }}>
              <div>Ã°Å¸Å¡â€™ Fire: 101</div>
              <div>Ã°Å¸Å¡â€˜ Ambulance: 108</div>
              <div>Ã°Å¸ÂÂ¢ Agency: +91-99999-00001</div>
            </div>
          </div>
          <button className="btn btn-danger" style={{ width: '100%' }}
            onClick={() => { window.open('tel:108'); onClose(); }}>
            Ã°Å¸Å¡Â¨ Call Emergency (108)
          </button>
          <button className="btn btn-ghost" style={{ width: '100%', marginTop: 8 }} onClick={onClose}>
            Cancel Ã¢â‚¬â€ I'm fine
          </button>
        </Sheet>
      )}
    </AnimatePresence>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Safety Assistant Chat Sheet Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function SafetyChatSheet({ open, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I can answer questions about chemical handling, PPE, and first-aid from our bundled safety data sheets. How can I help?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  async function send() {
    const q = input.trim();
    if (!q) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', text: q }]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const result = answerWorkerSafetyQuestion(q); const answer = typeof result === "object" ? result.answer : result;
    setMessages(m => [...m, { role: 'bot', text: answer }]);
    setLoading(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <Sheet open={open} onClose={onClose}>
          <h2 style={{ marginBottom: 8 }}>Ã°Å¸Â¤â€“ Safety Assistant</h2>
          <p style={{ fontSize: '.8rem', color: 'var(--ink-muted)', marginBottom: 10 }}>Answers from bundled CSDS sheets only</p>
          <div className="chat-area">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>{m.text}</div>
            ))}
            {loading && <div className="chat-msg bot">Ã¢â‚¬Â¦</div>}
            <div ref={bottomRef} />
          </div>
          <div className="chat-input-row">
            <input className="chat-inp" value={input} onChange={e => setInput(e.target.value)}
              placeholder="Ask a chemical safety questionÃ¢â‚¬Â¦"
              onKeyDown={e => e.key === 'Enter' && send()} />
            <button className="chat-send" onClick={send}>Ã¢Å¾Â¤</button>
          </div>
        </Sheet>
      )}
    </AnimatePresence>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ CSDS Sheet Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function CsdsSheet({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <Sheet open={open} onClose={onClose}>
          <h2 style={{ marginBottom: 12 }}>Ã°Å¸â€œâ€ž Chemical Data Sheets</h2>
          {BUNDLED_CHEMICAL_SHEETS.map((s, i) => (
            <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: i < BUNDLED_CHEMICAL_SHEETS.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>{s.chemical}</div>
              <div style={{ fontSize: '.82rem', color: 'var(--ink-muted)', marginBottom: 6 }}>{s.usedFor}</div>
              <div style={{ fontSize: '.82rem' }}><strong>PPE:</strong> {s.ppe}</div>
              <div style={{ fontSize: '.82rem', marginTop: 4 }}><strong>First aid:</strong> {s.firstAid}</div>
              {s.doNotMixWith && <div style={{ fontSize: '.78rem', color: 'var(--danger)', marginTop: 4 }}>Ã¢Å¡Â Ã¯Â¸Â Do NOT mix with: {s.doNotMixWith}</div>}
            </div>
          ))}
          <button className="btn btn-ghost" style={{ width: '100%' }} onClick={onClose}>Close</button>
        </Sheet>
      )}
    </AnimatePresence>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Emergency Protocol Sheet Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function EmergencyProtocolSheet({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <Sheet open={open} onClose={onClose}>
          <h2 style={{ color: 'var(--danger)', marginBottom: 12 }}>Ã°Å¸Â©Âº Exposure Protocol</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { step: '1. Remove from exposure', detail: 'Move affected person to fresh air immediately. Remove contaminated clothing.' },
              { step: '2. Skin contact', detail: 'Flush with water for 15+ minutes. Do not scrub.' },
              { step: '3. Eye contact', detail: 'Irrigate eyes with clean water for 15 minutes. Remove contacts first.' },
              { step: '4. Ingestion', detail: 'Do NOT induce vomiting. Give water only if person is conscious. Call 108.' },
              { step: '5. Inhalation', detail: 'Fresh air immediately. Loosen clothing. Administer OÃ¢â€šâ€š if trained.' },
              { step: '6. Call emergency', detail: 'Dial 108. Give the chemical name from the CSDS sheet to responders.' },
            ].map((p, i) => (
              <div key={i} style={{ background: 'var(--surface)', borderRadius: 10, padding: '10px 14px' }}>
                <div style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--primary)' }}>{p.step}</div>
                <div style={{ fontSize: '.82rem', color: 'var(--ink-muted)', marginTop: 4 }}>{p.detail}</div>
              </div>
            ))}
          </div>
          <button className="btn btn-ghost" style={{ width: '100%', marginTop: 12 }} onClick={onClose}>Close</button>
        </Sheet>
      )}
    </AnimatePresence>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Job Tab Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function JobTab({ toast }) {
  const {
    booking, incomingJob, contactUnlocked, startOtp, etaSeconds,
    dutyStatus, workerAcceptJob, workerMarkArrived, workerStartTreatment,
    workerCompleteBooking, toggleSafetyStep, captureAfterPhoto,
    safetyChecklist, afterPhotoTaken, canWorkerMarkArrived, canWorkerStart, canWorkerComplete,
    syncFromRemote,
  } = useAppStore();

  const [otpInput, setOtpInput] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  // Poll for state sync from customer app every 3 s
  useEffect(() => {
    const id = setInterval(() => syncFromRemote(), 3000);
    syncFromRemote();
    return () => clearInterval(id);
  }, [syncFromRemote]);

  function handleOtpInput(i, val) {
    const clean = val.replace(/\D/, '').slice(-1);
    const next = [...otpInput];
    next[i] = clean;
    setOtpInput(next);
    setOtpError('');
    if (clean && i < 3) otpRefs[i + 1].current?.focus();
  }

  async function handleVerifyOtp() {
    const code = otpInput.join('');
    const res = await workerStartTreatment(code);
    if (!res.ok) { setOtpError(res.error); return; }
    toast('OTP verified Ã¢â‚¬â€ treatment started!', 'success');
    setOtpInput(['','','','']);
  }

  // No job at all
  if (!booking || booking.status === 'CANCELLED') {
    return (
      <div className="content-area" style={{ textAlign: 'center', paddingTop: 40 }}>
        <div style={{ fontSize: '3rem' }}>Ã°Å¸â€œÂ­</div>
        <h2 style={{ marginTop: 12 }}>No active job</h2>
        <p className="text-muted mt-8">
          {dutyStatus === 'OFF_DUTY'
            ? 'Switch to "On duty" to receive jobs.'
            : 'Waiting for the agency to assign a bookingÃ¢â‚¬Â¦'}
        </p>
        {dutyStatus === 'OFF_DUTY' && (
          <button className="btn btn-primary" style={{ maxWidth: 220, margin: '16px auto 0' }}
            onClick={() => useAppStore.getState().setDutyStatus('ON_DUTY')}>
            Go on duty
          </button>
        )}
      </div>
    );
  }

  // Ã¢â€â‚¬Ã¢â€â‚¬ BOOKING_PLACED: Agency hasn't approved yet Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  if (booking.status === 'BOOKING_PLACED') {
    return (
      <div className="content-area" style={{ textAlign: 'center', paddingTop: 40 }}>
        <div style={{ fontSize: '3rem' }}>Ã¢ÂÂ³</div>
        <h2 style={{ marginTop: 12 }}>Awaiting agency approval</h2>
        <p className="text-muted mt-8">A new booking has been placed. The agency owner must approve it before you see details.</p>
        <div className="card mt-12" style={{ textAlign: 'left' }}>
          <div className="flex-between">
            <span className="text-muted" style={{ fontSize: '.82rem' }}>Status</span>
            <span className="badge badge-warning">Pending approval</span>
          </div>
        </div>
      </div>
    );
  }

  // Ã¢â€â‚¬Ã¢â€â‚¬ AGENCY_APPROVED: Show masked info, offer Accept Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  if (booking.status === 'AGENCY_APPROVED' && incomingJob) {
    return (
      <div className="content-area">
        <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: 14, padding: '12px 16px', marginBottom: 14 }}>
          <div style={{ fontWeight: 700, color: '#92400e', fontSize: '.88rem' }}>New job available</div>
          <div style={{ fontSize: '.8rem', color: '#78350f', marginTop: 2 }}>Agency approved. Review masked details before accepting.</div>
        </div>

        <div className="card">
          <div className="flex-between">
            <span className="text-muted" style={{ fontSize: '.82rem' }}>Customer</span>
            <strong>{incomingJob.maskedName}</strong>
          </div>
          <div className="flex-between mt-8">
            <span className="text-muted" style={{ fontSize: '.82rem' }}>Phone</span>
            <strong>{incomingJob.maskedPhone}</strong>
          </div>
          <div className="flex-between mt-8">
            <span className="text-muted" style={{ fontSize: '.82rem' }}>Area</span>
            <strong>{incomingJob.area}</strong>
          </div>
          <div className="divider" />
          <div className="flex-between">
            <span className="text-muted" style={{ fontSize: '.82rem' }}>Service</span>
            <span>{incomingJob.pestLabel} Ã‚Â· {incomingJob.sizeLabel}</span>
          </div>
          <div className="flex-between mt-8">
            <span className="text-muted" style={{ fontSize: '.82rem' }}>Plan</span>
            <span>{incomingJob.planLabel}</span>
          </div>
          <div className="flex-between mt-8">
            <span className="text-muted" style={{ fontSize: '.82rem' }}>Slot</span>
            <span>{incomingJob.slot}</span>
          </div>
          <div className="divider" />
          <div className="flex-between">
            <span style={{ fontWeight: 700 }}>Your payout</span>
            <span className="price" style={{ fontSize: '1.2rem' }}>Ã¢â€šÂ¹{incomingJob.payout}</span>
          </div>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px dashed var(--border)', borderRadius: 12, padding: '10px 14px', marginTop: 12, fontSize: '.8rem', color: 'var(--ink-muted)' }}>
          Ã°Å¸â€â€™ Exact address and full phone number will be unlocked after you accept AND the agency confirms dispatch.
        </div>

        <button className="btn btn-primary" style={{ marginTop: 14 }}
          onClick={async () => { await workerAcceptJob(); toast('Job accepted! Waiting for address unlockÃ¢â‚¬Â¦', 'success'); }}>
          Accept job
        </button>
      </div>
    );
  }

  // Ã¢â€â‚¬Ã¢â€â‚¬ TECHNICIAN_ACCEPTED: Waiting for owner to unlock contact Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  if (booking.status === 'TECHNICIAN_ACCEPTED') {
    return (
      <div className="content-area" style={{ textAlign: 'center', paddingTop: 32 }}>
        <div style={{ fontSize: '3rem' }}>Ã°Å¸â€â€œ</div>
        <h2 style={{ marginTop: 12 }}>Waiting for address unlock</h2>
        <p className="text-muted mt-8">
          The agency owner is reviewing your acceptance. Full address and phone will appear once they confirm.
        </p>
        <div className="card mt-12" style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '.82rem', color: 'var(--ink-muted)', marginBottom: 6 }}>In the meantime:</div>
          <div style={{ fontSize: '.88rem' }}>1. Ensure PPE kit is ready</div>
          <div style={{ fontSize: '.88rem', marginTop: 4 }}>2. Check chemical stock</div>
          <div style={{ fontSize: '.88rem', marginTop: 4 }}>3. Confirm your vehicle is fuelled</div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'center' }}>
          <div className="spinner" />
          <span className="text-muted" style={{ fontSize: '.88rem' }}>Auto-unlocks in ~6 sÃ¢â‚¬Â¦</span>
        </div>
      </div>
    );
  }

  // Ã¢â€â‚¬Ã¢â€â‚¬ ON_THE_WAY: Show full address, ETA countdown Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  if (booking.status === 'ON_THE_WAY') {
    const formatEta = (s) => { const m = Math.floor(s/60); const sec = s%60; return m>0 ? `${m}m ${sec}s` : `${sec}s`; };
    return (
      <div className="content-area">
        <div className="card" style={{ background: 'rgba(31,91,58,.04)', marginBottom: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 8, color: 'var(--primary)' }}>Ã°Å¸â€œÂ Full address (unlocked)</div>
          <div style={{ fontSize: '.95rem', lineHeight: 1.5 }}>{booking.address}</div>
          <div className="divider" />
          <div className="flex-between">
            <span className="text-muted" style={{ fontSize: '.82rem' }}>Customer phone</span>
            <a href={`tel:+919876543210`} style={{ fontWeight: 700, color: 'var(--primary)' }}>+91-98765-43210</a>
          </div>
        </div>

        {/* Map mini */}
        <div className="map-mini">
          <div className="map-mini-grid" />
          <div style={{ position: 'absolute', bottom: '30%', left: '50%', transform: 'translateX(-50%)', fontSize: '1.4rem' }}>Ã°Å¸â€œÂ</div>
          <div style={{ position: 'absolute', top: '20%', left: '20%', width: 14, height: 14, background: 'var(--primary)', border: '2px solid white', borderRadius: '50%' }} />
        </div>

        {/* ETA */}
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <div className="price" style={{ fontSize: '2rem' }}>{etaSeconds > 0 ? formatEta(etaSeconds) : '0s'}</div>
          <div className="text-muted" style={{ fontSize: '.82rem' }}>ETA to customer</div>
        </div>

        <button className="btn btn-primary"
          disabled={!canWorkerMarkArrived()}
          onClick={async () => { await workerMarkArrived(); toast('Marked as arrived!', 'success'); }}>
          {etaSeconds > 0 ? `Mark arrived (available in ${formatEta(etaSeconds)})` : 'Ã¢Å“â€œ Mark arrived'}
        </button>
      </div>
    );
  }

  // Ã¢â€â‚¬Ã¢â€â‚¬ ARRIVED: OTP entry Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  if (booking.status === 'ARRIVED') {
    return (
      <div className="content-area">
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: '2.5rem' }}>Ã°Å¸Å¡Âª</div>
          <h2 style={{ marginTop: 8 }}>You've arrived!</h2>
          <p className="text-muted mt-8">Ask the customer for their 4-digit OTP to start the treatment.</p>
        </div>

        <div className="card">
          <div style={{ textAlign: 'center', fontWeight: 600, marginBottom: 12, fontSize: '.88rem', color: 'var(--ink-muted)' }}>Enter customer OTP</div>
          <div className="otp-input">
            {otpInput.map((d, i) => (
              <input key={i} ref={otpRefs[i]} className="otp-digit-inp"
                type="tel" inputMode="numeric" maxLength={1} value={d}
                onChange={e => handleOtpInput(i, e.target.value)}
                onKeyDown={e => { if (e.key === 'Backspace' && !d && i > 0) otpRefs[i-1].current?.focus(); }} />
            ))}
          </div>
          {otpError && <p style={{ color: 'var(--danger)', fontSize: '.82rem', textAlign: 'center', marginBottom: 8 }}>{otpError}</p>}
          <button className="btn btn-primary" disabled={otpInput.join('').length < 4} onClick={handleVerifyOtp}>
            Verify & start treatment
          </button>
        </div>
      </div>
    );
  }

  // Ã¢â€â‚¬Ã¢â€â‚¬ IN_PROGRESS: Safety checklist + photo Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  if (booking.status === 'IN_PROGRESS') {
    return (
      <div className="content-area">
        <div style={{ background: 'rgba(31,91,58,.06)', borderRadius: 14, padding: '12px 16px', marginBottom: 14 }}>
          <div style={{ fontWeight: 700, color: 'var(--primary)' }}>Treatment in progress</div>
          <div style={{ fontSize: '.82rem', color: 'var(--ink-muted)', marginTop: 4 }}>Complete all 6 steps and capture proof photo to enable completion.</div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 8 }}>Safety & protocol checklist</h3>
          {SAFETY_CHECKLIST_STEPS.map((step, i) => (
            <div key={i} className="check-item" onClick={() => toggleSafetyStep(i)}>
              <div className={`check-box ${safetyChecklist[i] ? 'checked' : ''}`}>
                {safetyChecklist[i] && 'Ã¢Å“â€œ'}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '.9rem' }}>{step.title}</div>
                <div style={{ fontSize: '.78rem', color: 'var(--ink-muted)' }}>{step.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card mt-12">
          <h3>After-treatment photo</h3>
          <p className="text-muted" style={{ fontSize: '.82rem', margin: '6px 0 12px' }}>Capture proof of treatment completion</p>
          {afterPhotoTaken ? (
            <div style={{ background: '#d4f5e1', borderRadius: 12, padding: '12px 16px', textAlign: 'center', color: 'var(--success)', fontWeight: 700 }}>
              Ã°Å¸â€œÂ· Photo captured Ã¢Å“â€œ
            </div>
          ) : (
            <button className="btn btn-ghost" onClick={() => { captureAfterPhoto(); toast('Photo saved', 'success'); }}>
              Ã°Å¸â€œÂ· Capture after-photo
            </button>
          )}
        </div>

        <button className="btn btn-success" style={{ marginTop: 16 }}
          disabled={!canWorkerComplete()}
          onClick={async () => { await workerCompleteBooking(); toast('Job completed! Payout added.', 'success'); }}>
          Ã¢Å“â€œ Complete and submit proof
        </button>

        {!canWorkerComplete() && (
          <p className="text-muted" style={{ fontSize: '.78rem', textAlign: 'center', marginTop: 8 }}>
            {!safetyChecklist.every(Boolean) ? `${safetyChecklist.filter(Boolean).length}/6 steps done` : ''}{!afterPhotoTaken ? ' Ã‚Â· Photo needed' : ''}
          </p>
        )}
      </div>
    );
  }

  // Ã¢â€â‚¬Ã¢â€â‚¬ COMPLETED Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
  if (booking.status === 'COMPLETED') {
    return (
      <div className="content-area" style={{ textAlign: 'center', paddingTop: 40 }}>
        <div style={{ fontSize: '3.5rem' }}>Ã°Å¸Å½â€°</div>
        <h2 style={{ marginTop: 12 }}>Job complete!</h2>
        <p className="text-muted mt-8">Great work. Payout has been added to today's earnings.</p>
        <div className="card mt-12" style={{ textAlign: 'left' }}>
          <div className="flex-between">
            <span className="text-muted" style={{ fontSize: '.82rem' }}>Service</span>
            <strong>{booking.pestLabel}</strong>
          </div>
          <div className="flex-between mt-8">
            <span className="text-muted" style={{ fontSize: '.82rem' }}>Payout</span>
            <span className="price">Ã¢â€šÂ¹{Math.round((booking.price?.total ?? 0) * 0.55)}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Route Tab Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function RouteTab() {
  const { booking, etaSeconds } = useAppStore();
  const formatEta = (s) => { const m = Math.floor(s/60); const sec = s%60; return m>0?`${m}m ${sec}s`:`${sec}s`; };

  const stops = booking ? [{
    label: booking.address || 'Customer address',
    pestLabel: booking.pestLabel,
    status: booking.status,
    payout: Math.round((booking.price?.total ?? 0) * 0.55),
    slot: booking.slot,
  }] : [];

  return (
    <div className="content-area">
      <h2 style={{ marginBottom: 14 }}>Today's route</h2>

      {!stops.length ? (
        <div style={{ textAlign: 'center', paddingTop: 40 }}>
          <div style={{ fontSize: '2.5rem' }}>Ã°Å¸â€”ÂºÃ¯Â¸Â</div>
          <p className="text-muted mt-8">No stops scheduled yet</p>
        </div>
      ) : (
        stops.map((s, i) => (
          <div key={i} className="card">
            <div className="flex-between">
              <div>
                <div style={{ fontWeight: 700 }}>Stop {i+1}</div>
                <div style={{ fontSize: '.82rem', color: 'var(--ink-muted)', marginTop: 2 }}>{s.pestLabel} Ã‚Â· {s.slot}</div>
              </div>
              <StopBadge status={s.status} />
            </div>
            <div className="divider" />
            <div style={{ fontSize: '.88rem', color: 'var(--ink-muted)' }}>{s.label}</div>
            <div className="flex-between mt-8">
              <span style={{ fontSize: '.82rem', color: 'var(--ink-muted)' }}>Payout</span>
              <span className="price">Ã¢â€šÂ¹{s.payout}</span>
            </div>
            {s.status === 'ON_THE_WAY' && (
              <div style={{ marginTop: 8, fontSize: '.82rem', color: 'var(--primary)', fontWeight: 600 }}>
                ETA: {etaSeconds > 0 ? formatEta(etaSeconds) : 'Arriving now'}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

function StopBadge({ status }) {
  const map = {
    BOOKING_PLACED: ['Pending', 'badge-warning'],
    AGENCY_APPROVED: ['Approved', 'badge-warning'],
    TECHNICIAN_ACCEPTED: ['Accepted', 'badge-success'],
    ON_THE_WAY: ['En route', 'badge-primary'],
    ARRIVED: ['Arrived', 'badge-primary'],
    IN_PROGRESS: ['In progress', 'badge-primary'],
    COMPLETED: ['Done Ã¢Å“â€œ', 'badge-success'],
    CANCELLED: ['Cancelled', 'badge-danger'],
  };
  const [label, cls] = map[status] ?? ['Unknown', 'badge-neutral'];
  return <span className={`badge ${cls}`}>{label}</span>;
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Earnings Tab Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function EarningsTab({ toast }) {
  const { earnings, requestInstantPayout } = useAppStore();
  const [showPayoutSheet, setShowPayoutSheet] = useState(false);

  return (
    <div className="content-area">
      <h2 style={{ marginBottom: 14 }}>Earnings</h2>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-val">Ã¢â€šÂ¹{earnings.today}</div>
          <div className="stat-lbl">Today</div>
        </div>
        <div className="stat-card">
          <div className="stat-val">Ã¢â€šÂ¹{earnings.week}</div>
          <div className="stat-lbl">This week</div>
        </div>
        <div className="stat-card" style={{ gridColumn: '1 / -1' }}>
          <div className="flex-between">
            <div>
              <div className="stat-val" style={{ color: 'var(--success)' }}>Ã¢â€šÂ¹{earnings.safetyBonus}</div>
              <div className="stat-lbl">Safety bonus</div>
            </div>
            <span className="badge badge-success">On track Ã¢Å“â€œ</span>
          </div>
        </div>
      </div>

      <div className="card mt-12">
        <div className="flex-between">
          <div>
            <div style={{ fontWeight: 700 }}>UPI account</div>
            <div style={{ fontSize: '.82rem', color: 'var(--ink-muted)', marginTop: 2 }}>{earnings.upiId}</div>
          </div>
          <span className="badge badge-success">Linked Ã¢Å“â€œ</span>
        </div>
        <div className="divider" />
        <div style={{ fontSize: '.82rem', color: 'var(--ink-muted)' }}>
          Ã°Å¸â€™Â° Daily auto-settlement at 11 PM to your linked UPI
        </div>
      </div>

      <button className="btn btn-accent" style={{ marginTop: 16 }}
        disabled={earnings.pendingPayout || earnings.today === 0}
        onClick={() => setShowPayoutSheet(true)}>
        {earnings.pendingPayout ? 'Ã¢ÂÂ³ ProcessingÃ¢â‚¬Â¦' : 'Ã¢Å¡Â¡ Instant payout'}
      </button>

      <AnimatePresence>
        {showPayoutSheet && (
          <Sheet open={showPayoutSheet} onClose={() => setShowPayoutSheet(false)}>
            <h2 style={{ marginBottom: 12 }}>Confirm instant payout</h2>
            <div className="card" style={{ background: 'var(--surface)', marginBottom: 16 }}>
              <div className="flex-between">
                <span>Amount</span>
                <span className="price" style={{ fontSize: '1.4rem' }}>Ã¢â€šÂ¹{earnings.today}</span>
              </div>
              <div className="flex-between mt-8">
                <span>To</span>
                <strong>{earnings.upiId}</strong>
              </div>
              <div className="flex-between mt-8">
                <span style={{ fontSize: '.82rem', color: 'var(--ink-muted)' }}>Fee</span>
                <span style={{ fontSize: '.82rem' }}>Ã¢â€šÂ¹2 (instant)</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => { requestInstantPayout(); setShowPayoutSheet(false); toast('Payout initiated! Arrives in ~10 s', 'success'); }}>
              Confirm payout
            </button>
            <button className="btn btn-ghost" style={{ width: '100%', marginTop: 8 }} onClick={() => setShowPayoutSheet(false)}>
              Cancel
            </button>
          </Sheet>
        )}
      </AnimatePresence>
    </div>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Safety Tab Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
function SafetyTab() {
  const [showCsds, setShowCsds] = useState(false);
  const [showProtocol, setShowProtocol] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="content-area">
      <h2 style={{ marginBottom: 14 }}>Safety resources</h2>

      {[
        { emoji: 'Ã°Å¸â€œâ€ž', title: 'Chemical data sheets (CSDS)', desc: 'Fipronil, Imidacloprid, Deltamethrin, Cypermethrin + more', action: () => setShowCsds(true) },
        { emoji: 'Ã°Å¸Â©Âº', title: 'Emergency exposure protocol', desc: 'Step-by-step first aid for skin, eye, inhalation and ingestion', action: () => setShowProtocol(true) },
        { emoji: 'Ã°Å¸Â¤â€“', title: 'Safety assistant (AI)', desc: 'Ask chemical handling and first-aid questions', action: () => setShowChat(true) },
      ].map((item, i) => (
        <button key={i} className="card" style={{ width: '100%', textAlign: 'left', cursor: 'pointer', display: 'block', marginBottom: 10, border: 'none' }}
          onClick={item.action}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ fontSize: '2rem', lineHeight: 1 }}>{item.emoji}</div>
            <div>
              <div style={{ fontWeight: 700 }}>{item.title}</div>
              <div style={{ fontSize: '.82rem', color: 'var(--ink-muted)', marginTop: 2 }}>{item.desc}</div>
            </div>
            <div style={{ marginLeft: 'auto', color: 'var(--ink-muted)' }}>Ã¢â‚¬Âº</div>
          </div>
        </button>
      ))}

      <CsdsSheet open={showCsds} onClose={() => setShowCsds(false)} />
      <EmergencyProtocolSheet open={showProtocol} onClose={() => setShowProtocol(false)} />
      <SafetyChatSheet open={showChat} onClose={() => setShowChat(false)} />
    </div>
  );
}

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Root App Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export default function App() {
  const [tab, setTab] = useState(0);
  const [sosOpen, setSosOpen] = useState(false);
  const { dutyStatus, setDutyStatus, booking } = useAppStore();
  const { toasts, show: toast } = useToast();

  const tabs = [
    { label: 'Job',      icon: 'Ã°Å¸â€™Â¼', comp: <JobTab toast={toast} /> },
    { label: 'Route',    icon: 'Ã°Å¸â€”ÂºÃ¯Â¸Â',  comp: <RouteTab /> },
    { label: 'Earnings', icon: 'Ã°Å¸â€™Â°', comp: <EarningsTab toast={toast} /> },
    { label: 'Safety',   icon: 'Ã°Å¸â€ºÂ¡Ã¯Â¸Â',  comp: <SafetyTab /> },
  ];

  const dutyOpts = ['ON_DUTY', 'OFF_DUTY'];
  const dutyLabels = { ON_DUTY: 'On duty', ON_JOB: 'On job', OFF_DUTY: 'Off duty' };
  const effectiveDuty = booking && ['ON_THE_WAY','ARRIVED','IN_PROGRESS'].includes(booking.status) ? 'ON_JOB' : dutyStatus;

  return (
    <div className="app-shell">
      <ToastLayer toasts={toasts} />
      <SosSheet open={sosOpen} onClose={() => setSosOpen(false)} />

      {/* Worker header */}
      <header className="worker-header">
        <div className="logo">Ã°Å¸Å’Â¿ Pest Free</div>
        <div className="duty-pill">
          {dutyOpts.map(opt => (
            <button key={opt} className={`duty-opt ${effectiveDuty === opt || (opt === 'ON_DUTY' && effectiveDuty === 'ON_JOB') ? 'active' : ''}`}
              onClick={() => { if (effectiveDuty !== 'ON_JOB') setDutyStatus(opt); }}>
              {opt === 'ON_DUTY' && effectiveDuty === 'ON_JOB' ? 'On job' : dutyLabels[opt]}
            </button>
          ))}
        </div>
        <button className="sos-btn" onClick={() => setSosOpen(true)} aria-label="Emergency SOS">Ã°Å¸Å¡Â¨</button>
      </header>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {tabs[tab].comp}
        </motion.div>
      </AnimatePresence>

      {/* Tab bar */}
      <nav className="tab-bar" role="tablist">
        {tabs.map((t, i) => (
          <button key={i} role="tab" aria-selected={i === tab} className={`tab-btn ${i === tab ? 'active' : ''}`}
            onClick={() => setTab(i)}>
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
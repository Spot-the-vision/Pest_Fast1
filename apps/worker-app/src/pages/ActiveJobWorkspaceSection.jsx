import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from '@pest-free/ui-kit';
import {
  Clock,
  Navigation,
  Sparkles,
  CheckCircle2,
  Award,
  KeyRound,
  QrCode,
  Lock,
  FastForward,
  Check,
  MapPin,
} from 'lucide-react';
import { useAppStore } from '../lib/api/store.js';
import { WorkerMiniMap } from '../components/WorkerMiniMap.jsx';
import { QUEUED_JOBS } from '../constants.js';

export function ActiveJobWorkspaceSection({ toast, onNavigate }) {
  const {
    booking,
    incomingJob,
    contactUnlocked,
    startOtp,
    completionPin,
    workCompletedByWorker,
    pinVerifiedByWorker,
    paymentQrGenerated,
    customerPaid,
    customerReview,
    liveCustomerLocation,
    workerPosition,
    etaSeconds,
    safetyChecklist,
    afterPhotoTaken,
    agencyApproveBooking,
    workerAcceptAndNavigate,
    fastForwardEta,
    workerMarkArrived,
    workerStartTreatment,
    toggleSafetyStep,
    checkAllSafetySteps,
    captureAfterPhoto,
    workerMarkWorkFinished,
    workerVerifyCustomerCompletionPin,
    workerSimulateCustomerReview,
    workerConfirmPaymentReceived,
  } = useAppStore();

  const [inExecutionView, setInExecutionView] = useState(false);

  // Auto-switch to execution view if en route or later
  useEffect(() => {
    if (booking && ['ON_THE_WAY', 'ARRIVED', 'IN_PROGRESS', 'COMPLETED'].includes(booking.status)) {
      setInExecutionView(true);
    }
  }, [booking?.status]);

  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const [compPinDigits, setCompPinDigits] = useState(['', '', '', '']);
  const [compPinError, setCompPinError] = useState('');
  const compPinRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleOtpChange = (index, val) => {
    const clean = val.replace(/\D/g, '').slice(-1);
    const updated = [...otpDigits];
    updated[index] = clean;
    setOtpDigits(updated);
    setOtpError('');
    if (clean && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const code = otpDigits.join('');
    const res = await workerStartTreatment(code);
    if (!res.ok) {
      setOtpError(res.error);
      toast(res.error, 'error');
      return;
    }
    toast('Customer Doorstep OTP verified! Chemical treatment started.', 'success');
    setOtpDigits(['', '', '', '']);
  };

  const fillDemoOtp = () => {
    const expected = (startOtp || booking?.startOtp || '4058').split('');
    setOtpDigits(expected);
    setOtpError('');
  };

  const handleCompPinChange = (index, val) => {
    const clean = val.replace(/\D/g, '').slice(-1);
    const updated = [...compPinDigits];
    updated[index] = clean;
    setCompPinDigits(updated);
    setCompPinError('');
    if (clean && index < 3) {
      compPinRefs[index + 1].current?.focus();
    }
  };

  const handleVerifyCompPin = async () => {
    const code = compPinDigits.join('');
    const res = await workerVerifyCustomerCompletionPin(code);
    if (!res.ok) {
      setCompPinError(res.error);
      toast(res.error, 'error');
      return;
    }
    toast('Completion PIN verified! Customer must now submit review to generate payment QR.', 'success');
    setCompPinDigits(['', '', '', '']);
  };

  const fillDemoCompPin = () => {
    const expected = (completionPin || '1666').split('');
    setCompPinDigits(expected);
    setCompPinError('');
  };

  const rawPrice =
    typeof booking?.price === 'number'
      ? booking.price
      : booking?.price?.total ?? booking?.pricing?.total ?? 1600;
  const workerPayout = incomingJob?.payout ?? Math.round(rawPrice * 0.55);

  const lat = booking?.coords?.lat || liveCustomerLocation?.lat || 12.9250;
  const lng = booking?.coords?.lng || liveCustomerLocation?.lng || 77.5938;

  // IF IN DEDICATED EXECUTION VIEW: (OpenStreetMap Left, Steps & Payments Right)
  if (inExecutionView && booking) {
    return (
      <View style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Top Control Bar with Back to Overview */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--card)',
            padding: '14px 20px',
            borderRadius: 14,
            border: '1px solid var(--border)',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <View style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <TouchableOpacity
              className="btn btn-outline btn-sm"
              onClick={() => setInExecutionView(false)}
            >
              ← Back to Workspace Overview
            </TouchableOpacity>
            <Text style={{ fontWeight: 800, fontSize: '1.05rem' }}>
              Doorstep Execution Console &bull; #{booking.id}
            </Text>
          </View>

          <View style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Text className="badge badge-green" style={{ fontSize: '0.82rem' }}>
              {booking.status.replace(/_/g, ' ')}
            </Text>
          </View>
        </View>

        <View className="dashboard-grid-2">
          {/* LEFT COLUMN: OpenStreetMap GPS Radar & Safety Checklist */}
          <View style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Map Radar Card */}
            <View className="web-card">
              <View className="card-header-row">
                <View>
                  <Text className="badge badge-neutral" style={{ marginBottom: 4 }}>
                    Booking #{booking.id}
                  </Text>
                  <h2 className="card-title" style={{ fontSize: '1.25rem' }}>
                    Live GPS Radar (OpenStreetMap)
                  </h2>
                </View>
                {booking.status === 'ON_THE_WAY' && (
                  <Text className="badge badge-green">
                    <Clock size={14} /> ETA: {etaSeconds}s remaining
                  </Text>
                )}
                {booking.status === 'ARRIVED' && (
                  <Text className="badge badge-amber">Technician at Doorstep</Text>
                )}
                {['IN_PROGRESS', 'COMPLETED'].includes(booking.status) && (
                  <Text className="badge badge-green">On-Site Treatment Active</Text>
                )}
              </View>

              <WorkerMiniMap
                customerCoords={booking.coords || liveCustomerLocation || { lat, lng }}
                workerCoords={workerPosition || { lat: 12.9352, lng: 77.6245 }}
                height="340px"
              />

              <View className="field-grid" style={{ marginTop: 16 }}>
                <View className="field-box">
                  <View className="field-label">TARGET TREATMENT</View>
                  <View className="field-value">{booking.pestLabel}</View>
                  <View className="field-sub">{booking.planLabel} ({booking.sizeLabel})</View>
                </View>
                <View className="field-box">
                  <View className="field-label">DESTINATION COORDINATES</View>
                  <View className="field-value">
                    Lat: {Number(lat).toFixed(4)}, Lng: {Number(lng).toFixed(4)}
                  </View>
                  <View className="field-sub">{booking.address}</View>
                </View>
              </View>
            </View>

            {/* Ready to Depart (When not yet ON_THE_WAY) */}
            {['BOOKING_PLACED', 'CONFIRMED', 'ASSIGNED', 'AGENCY_APPROVED'].includes(booking.status) && (
              <View className="web-card" style={{ borderTop: '4px solid var(--primary)' }}>
                <View className="card-header-row">
                  <h3 className="card-title">
                    <Navigation size={18} color="var(--primary)" />
                    <Text>Ready to Depart for Customer Doorstep</Text>
                  </h3>
                  <Text className="badge badge-green">Agency Cleared</Text>
                </View>
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.85rem', marginBottom: 14 }}>
                  Vehicle and chemical safety gear prepped. Click below to start live satellite navigation radar en route to customer doorstep.
                </p>
                <TouchableOpacity
                  className="btn btn-primary btn-lg btn-block"
                  onClick={async () => {
                    await workerAcceptAndNavigate();
                    toast('En route! GPS satellite navigation radar active.', 'success');
                  }}
                >
                  <Navigation size={18} /> Start Navigation & Mark En Route
                </TouchableOpacity>
              </View>
            )}

            {/* Travel Action Bar (When ON_THE_WAY) */}
            {booking.status === 'ON_THE_WAY' && (
              <View className="web-card">
                <View className="card-header-row">
                  <h3 className="card-title">
                    <Navigation size={18} color="var(--primary)" />
                    <Text>En Route to Customer Doorstep</Text>
                  </h3>
                  {etaSeconds > 0 && (
                    <TouchableOpacity
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        fastForwardEta();
                        toast('Fast-forwarded travel timer to 0s!', 'info');
                      }}
                    >
                      <FastForward size={14} /> Skip Timer
                    </TouchableOpacity>
                  )}
                </View>
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.85rem', marginBottom: 14 }}>
                  Travel in progress to {booking.address}. Once parked at gate, click below to mark arrival.
                </p>
                <TouchableOpacity
                  className="btn btn-primary btn-lg btn-block"
                  onClick={async () => {
                    if (etaSeconds > 0) await fastForwardEta();
                    await workerMarkArrived();
                    toast('Marked Arrived! Ask homeowner for 4-digit Treatment Start OTP.', 'success');
                  }}
                >
                  <MapPin size={18} />
                  {etaSeconds > 0
                    ? `I Have Arrived at Doorstep (Skip ${etaSeconds}s)`
                    : 'I Have Arrived at Customer Doorstep'}
                </TouchableOpacity>
              </View>
            )}


          </View>

          {/* RIGHT COLUMN: Doorstep OTP, Complete Work, Review, and Payment QR */}
          <View style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* 1. Doorstep Treatment Start OTP */}
            <View className="web-card">
              <View className="card-header-row">
                <h3 className="card-title">
                  <KeyRound size={20} color="var(--primary)" />
                  <Text>Doorstep Treatment Start OTP</Text>
                </h3>
                <Text
                  className={`badge ${
                    booking.status === 'IN_PROGRESS' || booking.status === 'COMPLETED'
                      ? 'badge-green'
                      : booking.status === 'ARRIVED'
                      ? 'badge-amber'
                      : 'badge-neutral'
                  }`}
                >
                  {booking.status === 'IN_PROGRESS' || booking.status === 'COMPLETED'
                    ? '✓ OTP Verified'
                    : booking.status === 'ARRIVED'
                    ? 'Ask Customer for OTP'
                    : 'Locked (Mark Arrived First)'}
                </Text>
              </View>

              {booking.status === 'IN_PROGRESS' || booking.status === 'COMPLETED' ? (
                <View>
                  <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginBottom: 12 }}>
                    Doorstep Start OTP verified! Chemical application is active and authenticated.
                  </p>
                  <View
                    style={{
                      display: 'flex',
                      gap: 12,
                      justifyContent: 'center',
                      padding: '12px',
                      background: 'var(--primary-light)',
                      borderRadius: 14,
                      border: '1.5px solid var(--primary)',
                    }}
                  >
                    {String(startOtp || booking?.startOtp || '4058')
                      .split('')
                      .map((d, i) => (
                        <View
                          key={i}
                          style={{
                            width: 48,
                            height: 54,
                            borderRadius: 10,
                            background: 'var(--primary)',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.6rem',
                            fontWeight: 800,
                          }}
                        >
                          {d}
                        </View>
                      ))}
                  </View>
                </View>
              ) : booking.status === 'ARRIVED' ? (
                <View>
                  <View style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                    <TouchableOpacity className="btn btn-outline btn-sm" onClick={fillDemoOtp}>
                      Auto-Fill Customer OTP ({startOtp || booking?.startOtp || '4058'})
                    </TouchableOpacity>
                  </View>
                  <View className="otp-row" style={{ marginBottom: 12 }}>
                    {otpDigits.map((digit, i) => (
                      <TextInput
                        key={i}
                        ref={otpRefs[i]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        aria-label={`OTP digit ${i + 1}`}
                        className="otp-box"
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !digit && i > 0) {
                            otpRefs[i - 1].current?.focus();
                          }
                        }}
                      />
                    ))}
                  </View>
                  {otpError && (
                    <View style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: '8px 12px', borderRadius: 8, fontSize: '0.82rem', marginBottom: 10, textAlign: 'center' }}>
                      {otpError}
                    </View>
                  )}
                  <TouchableOpacity
                    className="btn btn-primary btn-block btn-lg"
                    disabled={otpDigits.join('').length < 4}
                    onClick={handleVerifyOtp}
                  >
                    <CheckCircle2 size={18} /> Verify Start OTP & Begin Treatment
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ textAlign: 'center', padding: '16px', background: 'var(--surface)', borderRadius: 12, border: '1px dashed var(--border-strong)' }}>
                  <Text style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>
                    Input slots unlock when you click "I Have Arrived" on the left.
                  </Text>
                  <View style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 10 }}>
                    {['•', '•', '•', '•'].map((dot, i) => (
                      <View
                        key={i}
                        style={{
                          width: 44,
                          height: 48,
                          borderRadius: 8,
                          background: '#FFFFFF',
                          border: '1px solid var(--border-strong)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.4rem',
                          color: 'var(--ink-muted)',
                        }}
                      >
                        {dot}
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>

            {/* Complete Work Button (When IN_PROGRESS) */}
            {booking.status === 'IN_PROGRESS' && (
              <View className="web-card" style={{ borderTop: '4px solid var(--primary)' }}>
                <View className="card-header-row">
                  <h3 className="card-title">
                    <Sparkles size={20} color="var(--primary)" />
                    <Text>Treatment Execution in Progress</Text>
                  </h3>
                  <Text className="badge badge-amber">Service Active</Text>
                </View>
                <p style={{ color: 'var(--ink-muted)', fontSize: '0.85rem', marginBottom: 14 }}>
                  Once chemical treatment and cleanup are done, click below to mark completed and trigger customer review.
                </p>
                <TouchableOpacity
                  className="btn btn-primary btn-lg btn-block"
                  onClick={async () => {
                    await workerMarkWorkFinished();
                    toast('Treatment marked complete! Customer dashboard prompted for mandatory review.', 'success');
                  }}
                >
                  <CheckCircle2 size={18} /> Complete My Work & Request Customer Review
                </TouchableOpacity>
              </View>
            )}

            {/* 2. End-of-Service Completion Security PIN */}
            {(workCompletedByWorker || booking.status === 'COMPLETED') && (
              <View className="web-card">
                <View className="card-header-row">
                  <h3 className="card-title">
                    <Award size={20} color="var(--success)" />
                    <Text>End-of-Service Completion Security PIN</Text>
                  </h3>
                  <Text className={`badge ${pinVerifiedByWorker || booking.status === 'COMPLETED' ? 'badge-green' : 'badge-amber'}`}>
                    {pinVerifiedByWorker || booking.status === 'COMPLETED' ? '✓ PIN Verified' : 'Enter Customer PIN'}
                  </Text>
                </View>

                {pinVerifiedByWorker || booking.status === 'COMPLETED' ? (
                  <View>
                    <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginBottom: 12 }}>
                      Customer Completion PIN verified! Chemical treatment ticket is officially closed.
                    </p>
                    <View
                      style={{
                        display: 'flex',
                        gap: 12,
                        justifyContent: 'center',
                        padding: '12px',
                        background: 'var(--primary-light)',
                        borderRadius: 14,
                        border: '1.5px solid var(--primary)',
                      }}
                    >
                      {String(completionPin || '1666')
                        .split('')
                        .map((d, i) => (
                          <View
                            key={i}
                            style={{
                              width: 48,
                              height: 54,
                              borderRadius: 10,
                              background: 'var(--primary)',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontFamily: 'var(--font-heading)',
                              fontSize: '1.6rem',
                              fontWeight: 800,
                            }}
                          >
                            {d}
                          </View>
                        ))}
                    </View>
                  </View>
                ) : (
                  <View>
                    <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginBottom: 12 }}>
                      {customerReview
                        ? 'Customer submitted their review! Ask them for the 4-digit Completion PIN displayed on their screen:'
                        : 'Waiting for homeowner to submit mandatory review in Customer App. Once reviewed, PIN unlocks on customer screen:'}
                    </p>
                    <View style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8, gap: 6, flexWrap: 'wrap' }}>
                      {!customerReview && (
                        <TouchableOpacity
                          className="btn btn-outline btn-sm"
                          onClick={async () => {
                            await workerSimulateCustomerReview();
                            toast('Simulated customer 5-star review! PIN unlocked on customer dashboard.', 'success');
                          }}
                        >
                          Simulate Customer Review
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity className="btn btn-outline btn-sm" onClick={fillDemoCompPin}>
                        Auto-Fill PIN ({completionPin || '1666'})
                      </TouchableOpacity>
                    </View>
                    <View className="otp-row" style={{ marginBottom: 12 }}>
                      {compPinDigits.map((digit, i) => (
                        <TextInput
                          key={i}
                          ref={compPinRefs[i]}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          aria-label={`Completion PIN digit ${i + 1}`}
                          className="otp-box"
                          onChange={(e) => handleCompPinChange(i, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !digit && i > 0) {
                              compPinRefs[i - 1].current?.focus();
                            }
                          }}
                        />
                      ))}
                    </View>
                    {compPinError && (
                      <View style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: '8px 12px', borderRadius: 8, fontSize: '0.82rem', marginBottom: 10, textAlign: 'center' }}>
                        {compPinError}
                      </View>
                    )}
                    <TouchableOpacity
                      className="btn btn-primary btn-block btn-lg"
                      disabled={compPinDigits.join('').length < 4}
                      onClick={handleVerifyCompPin}
                    >
                      <CheckCircle2 size={18} /> Verify Completion PIN & Generate Payment QR
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {/* 3. Automatic Dynamic UPI Payment QR Code */}
            {booking.status === 'COMPLETED' && (
              <View className="web-card" style={{ borderTop: '4px solid var(--primary)' }}>
                <View className="card-header-row">
                  <h3 className="card-title">
                    <QrCode size={20} color="var(--primary)" />
                    <Text>Official UPI Payment QR Code</Text>
                  </h3>
                  <Text className={`badge ${customerPaid ? 'badge-green' : 'badge-amber'}`}>
                    {customerPaid ? '✓ Payment Confirmed' : 'Scan to Pay'}
                  </Text>
                </View>

                <View
                  className="web-card-surface"
                  style={{
                    border: '2px solid var(--primary)',
                    padding: 16,
                    borderRadius: 14,
                    textAlign: 'center',
                    marginBottom: 14,
                  }}
                >
                  <View style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--primary)', marginBottom: 2 }}>
                    Official Easy HiCare UPI Soundbox Terminal
                  </View>
                  <View style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', marginBottom: 12 }}>
                    Customer verified! Scan with PhonePe / GPay / Paytm for Rs. {rawPrice}
                  </View>

                  <View
                    style={{
                      display: 'inline-block',
                      padding: 12,
                      background: '#FFFFFF',
                      borderRadius: 14,
                      border: '2px dashed var(--primary)',
                      marginBottom: 10,
                    }}
                  >
                    <Image
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                        `upi://pay?pa=easyhicare.ops@icici&pn=EasyHiCare&am=${rawPrice}&cu=INR&tn=Booking-${booking.id}`
                      )}`}
                      alt="UPI Payment QR Code"
                      style={{ width: 180, height: 180, display: 'block', margin: '0 auto' }}
                    />
                    <View style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--primary)', marginTop: 8 }}>
                      Rs. {rawPrice}
                    </View>
                    <View style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                      VPA: easyhicare.ops@icici
                    </View>
                  </View>

                  {!customerPaid ? (
                    <TouchableOpacity
                      className="btn btn-success btn-lg btn-block"
                      onClick={async () => {
                        await workerConfirmPaymentReceived();
                        toast(`Payment of Rs. ${rawPrice} confirmed! Payout settled.`, 'success');
                      }}
                    >
                      <CheckCircle2 size={18} /> Confirm Payment Received (Rs. {rawPrice})
                    </TouchableOpacity>
                  ) : (
                    <View className="badge badge-green" style={{ width: '100%', padding: '12px', fontSize: '0.92rem', justifyContent: 'center' }}>
                      <CheckCircle2 size={18} /> Payment Confirmed & Settled to Wallet!
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }

  // DEFAULT WORKSPACE VIEW (Before clicking Continue & Navigate):
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Subheading: Active Job */}
      <View>
        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <View style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <View style={{ width: 8, height: 24, background: 'var(--primary)', borderRadius: 4 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Active Job</h3>
            <Text className="badge badge-green" style={{ fontSize: '0.78rem' }}>
              {booking?.status ? booking.status.replace(/_/g, ' ') : 'ASSIGNED'}
            </Text>
          </View>
        </View>

        {/* 50/50 Card: Left Map Preview, Right Job Details */}
        <View className="web-card" style={{ padding: 0, overflow: 'hidden', border: '1.5px solid var(--border-strong)' }}>
          <View className="dual-card-50">
            {/* Left 50%: Map and GPS preview */}
            <View style={{ padding: 24, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MapPin size={18} color="var(--primary)" />
                  <Text style={{ fontWeight: 800, fontSize: '1rem' }}>
                    Doorstep GPS & Map Radar
                  </Text>
                </View>
                <Text className={`badge ${contactUnlocked ? 'badge-green' : 'badge-amber'}`}>
                  {contactUnlocked ? 'Agency Clearance Granted' : 'Map Locked'}
                </Text>
              </View>

              {!contactUnlocked ? (
                /* State: Locked until agency clearance */
                <View
                  style={{
                    height: 220,
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, rgba(31,91,58,0.06), rgba(232,163,23,0.08))',
                    border: '1.5px dashed var(--border-strong)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                    textAlign: 'center',
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'var(--surface)',
                      border: '1px solid var(--border-strong)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Lock size={22} color="var(--accent)" />
                  </View>
                  <Text style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--ink)' }}>
                    Map & GPS Locked until Agency Clearance
                  </Text>
                  <Text style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', maxWidth: 320 }}>
                    Homeowner address and turn-by-turn navigation radar unlock as soon as the Agency grants 1-time clearance.
                  </Text>
                  <TouchableOpacity
                    className="btn btn-primary btn-sm"
                    onClick={async () => {
                      await agencyApproveBooking();
                      toast('Agency cleared dispatch! Map and GPS navigation unlocked.', 'success');
                    }}
                  >
                    <CheckCircle2 size={14} /> Grant Agency Clearance
                  </TouchableOpacity>
                </View>
              ) : (
                /* State: Unlocked -> Mini map preview + Continue & Navigate button */
                <View>
                  <WorkerMiniMap
                    customerCoords={booking?.coords || liveCustomerLocation || { lat, lng }}
                    workerCoords={workerPosition || { lat: 12.9352, lng: 77.6245 }}
                    height="200px"
                  />
                  <View style={{ marginTop: 14 }}>
                    <TouchableOpacity
                      className="btn btn-primary btn-lg btn-block"
                      onClick={async () => {
                        await workerAcceptAndNavigate();
                        setInExecutionView(true);
                        toast('En route! Live navigation console opened with real map.', 'success');
                      }}
                    >
                      <Navigation size={18} /> Continue & Navigate to Location
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Customer Contact & Address Info */}
              <View className="field-grid">
                <View className="field-box">
                  <View className="field-label">Customer Name</View>
                  <View className="field-value">
                    {contactUnlocked
                      ? booking?.customerFullName || 'Aarav Sharma'
                      : incomingJob?.maskedName || booking?.customerMaskedName || 'Aarav S.'}
                  </View>
                  <View className="field-sub">{contactUnlocked ? 'Verified' : 'Masked'}</View>
                </View>
                <View className="field-box">
                  <View className="field-label">Contact Phone</View>
                  <View className="field-value">
                    {contactUnlocked
                      ? booking?.customerRealPhone || '+91 98450 67890'
                      : incomingJob?.maskedPhone || '+91-984-XXX-7890 (Proxy)'}
                  </View>
                  <View className="field-sub">{contactUnlocked ? 'Direct Line' : 'Masked Proxy'}</View>
                </View>
              </View>
            </View>

            {/* Right 50%: Job Details */}
            <View style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--surface)' }}>
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View>
                  <Text style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                    Assigned Treatment
                  </Text>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)', margin: '2px 0 0' }}>
                    {booking?.pestLabel || 'Severe Cockroach Infestation & German Roach Colony'}
                  </h4>
                  <Text style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700 }}>
                    {booking?.planLabel || 'Dual-Layer Odorless Gel & Chemical Barrier'}
                  </Text>
                </View>
                <View style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                    Technician Payout
                  </Text>
                  <Text style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>
                    Rs. {workerPayout}
                  </Text>
                </View>
              </View>

              <View className="field-grid">
                <View className="field-box" style={{ background: '#FFFFFF' }}>
                  <View className="field-label">Property Size</View>
                  <View className="field-value">{booking?.sizeLabel || '2 BHK Apartment (1,250 sq.ft)'}</View>
                  <View className="field-sub">Inspection required</View>
                </View>
                <View className="field-box" style={{ background: '#FFFFFF' }}>
                  <View className="field-label">Scheduled Slot</View>
                  <View className="field-value">{booking?.slot || '01:00 PM - 03:00 PM'}</View>
                  <View className="field-sub">Priority Same-Day</View>
                </View>
              </View>

              <View className="field-box" style={{ background: '#FFFFFF' }}>
                <View className="field-label">Service Address</View>
                <View className="field-value">
                  {contactUnlocked
                    ? booking?.address || 'Flat 402, Green Glen Layout, Jayanagar 4th Block, Bengaluru'
                    : `${incomingJob?.area || 'Jayanagar 4th Block, Bengaluru'} (Exact flat locked until clearance)`}
                </View>
              </View>

              <View className="field-box" style={{ background: '#FFFFFF' }}>
                <View className="field-label">Customer Site Notes</View>
                <View style={{ fontSize: '0.86rem', color: 'var(--ink)', fontStyle: 'italic', lineHeight: 1.4 }}>
                  "{booking?.note || 'Pet friendly herbal gel, kitchen deep crevice treatment, do not spray near aquarium.'}"
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Subheading: Queue State */}
      <View style={{ marginTop: 8 }}>
        <View style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <View style={{ width: 8, height: 24, background: 'var(--accent)', borderRadius: 4 }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Queue State</h3>
          <Text className="badge badge-neutral" style={{ fontSize: '0.78rem' }}>
            Exactly 2 Scheduled Jobs In Queue
          </Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {QUEUED_JOBS.map((job, idx) => (
            <View
              key={job.id}
              className="web-card"
              style={{ padding: 0, overflow: 'hidden', border: '1.5px solid var(--border)' }}
            >
              <View className="dual-card-50">
                {/* Left 50%: Locked Preview Map */}
                <View style={{ padding: 20, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Text className="badge badge-neutral" style={{ fontWeight: 800 }}>Queue #{idx + 1}</Text>
                      <Text style={{ fontWeight: 800, fontSize: '0.95rem' }}>{job.id}</Text>
                    </View>
                    <Text className="badge badge-amber">{job.scheduledTime.split(' - ')[0]}</Text>
                  </View>

                  {/* Locked preview radar */}
                  <View
                    style={{
                      height: 140,
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, rgba(31,91,58,0.04), rgba(232,163,23,0.06))',
                      border: '1px dashed var(--border-strong)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                    }}
                  >
                    <Lock size={18} color="var(--ink-muted)" />
                    <Text style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--ink)' }}>
                      Locked in Queue ({job.distance})
                    </Text>
                    <Text style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                      {job.area}
                    </Text>
                  </View>

                  <View className="field-grid">
                    <View className="field-box">
                      <View className="field-label">Customer</View>
                      <View className="field-value">{job.customerMasked}</View>
                    </View>
                    <View className="field-box">
                      <View className="field-label">Contact</View>
                      <View className="field-value">{job.phoneMasked}</View>
                    </View>
                  </View>
                </View>

                {/* Right 50%: Job Details */}
                <View style={{ padding: 20, background: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View>
                      <Text style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                        Treatment
                      </Text>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '2px 0 0' }}>{job.service}</h4>
                      <Text style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>{job.plan}</Text>
                    </View>
                    <View style={{ textAlign: 'right' }}>
                      <Text style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                        Est. Payout
                      </Text>
                      <Text style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
                        Rs. {job.payout}
                      </Text>
                    </View>
                  </View>

                  <View className="field-grid">
                    <View className="field-box" style={{ background: '#FFFFFF' }}>
                      <View className="field-label">Property</View>
                      <View className="field-value" style={{ fontSize: '0.85rem' }}>{job.propertySize}</View>
                    </View>
                    <View className="field-box" style={{ background: '#FFFFFF' }}>
                      <View className="field-label">Slot</View>
                      <View className="field-value" style={{ fontSize: '0.85rem' }}>{job.scheduledTime}</View>
                    </View>
                  </View>

                  <View className="field-box" style={{ background: '#FFFFFF' }}>
                    <View className="field-label">Inspection & Notes</View>
                    <View style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>{job.inspection}</View>
                    <View style={{ fontSize: '0.82rem', color: 'var(--ink)', fontStyle: 'italic', marginTop: 4 }}>
                      "{job.siteNotes}"
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default ActiveJobWorkspaceSection;

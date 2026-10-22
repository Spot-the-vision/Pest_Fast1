import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ModalDialog, TextInput } from '@pest-free/ui-kit';
import {
  Navigation,
  Bug,
  Clock,
  ShieldCheck,
  KeyRound,
  Award,
  Lock,
  Sparkles,
  Star,
  CheckCircle2,
  UserCheck,
  Unlock,
  Phone,
  X,
  QrCode,
} from 'lucide-react';
import { useAppStore } from '../lib/api/store.js';
import { SAFETY_CHECKLIST_STEPS } from '../lib/api/index.js';
import { CustomerRadarMap } from '../components/CustomerRadarMap.jsx';

export function TrackSection({ toast, onNavigate }) {
  const {
    booking,
    assignedWorker,
    workerPosition,
    contactUnlocked,
    startOtp,
    completionPin,
    workCompletedByWorker,
    paymentQrGenerated,
    customerPaid,
    customerReview,
    liveCustomerLocation,
    etaSeconds,
    safetyChecklist,
    simulateCustomerStage,
    cancelBooking,
    submitCustomerReview,
    confirmCustomerPayment,
    submitCustomerReviewAndPay,
    pinVerifiedByWorker,
    canCancel,
  } = useAppStore();

  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState('');
  const [qrModal, setQrModal] = useState(false);
  useEffect(() => {
    if (paymentQrGenerated && !customerPaid && booking?.status === 'COMPLETED') {
      setQrModal(true);
    }
  }, [paymentQrGenerated, customerPaid]);

  const rawTotal =
    typeof booking?.price === 'number'
      ? booking.price
      : booking?.price?.total ?? booking?.pricing?.total ?? 1600;

  return (
    <View>
      {(!booking || booking.status === 'CANCELLED') && (
        <View className="web-card" style={{ textAlign: 'center', padding: '56px 32px' }}>
          <View
            style={{
              width: 68,
              height: 68,
              borderRadius: 20,
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px',
            }}
          >
            <Navigation size={32} />
          </View>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 8 }}>No Active Treatment in Progress</h2>
          <p style={{ color: 'var(--ink-muted)', maxWidth: 500, margin: '0 auto 24px', lineHeight: 1.5 }}>
            Place a new booking to track live technician arrival on OpenStreetMap, view doorstep Start OTP, and complete the PIN handshake.
          </p>
          <View style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <TouchableOpacity className="btn btn-primary btn-lg" onClick={() => onNavigate('book')}>
              <Bug size={18} /> Book a New Pest Treatment
            </TouchableOpacity>
          </View>
        </View>
      )}

      {booking && booking.status !== 'CANCELLED' && (
        <>
          <View className="dashboard-grid-2">
            {/* LEFT COLUMN: Real OpenStreetMap + Live Safety Feed */}
            <View style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <View className="web-card">
                <View className="card-header-row">
                  <View>
                    <Text className="badge badge-neutral" style={{ marginBottom: 4 }}>
                      Booking #{booking.id}
                    </Text>
                    <h2 className="card-title" style={{ fontSize: '1.3rem' }}>
                      Real Live Technician GPS Radar (OpenStreetMap)
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

                {/* Real OpenStreetMap View */}
                <CustomerRadarMap
                  customerCoords={booking.coords || liveCustomerLocation}
                  workerCoords={workerPosition}
                  isLiveMove={booking.status === 'ON_THE_WAY'}
                  height="340px"
                />

                <View className="field-grid" style={{ marginTop: 16 }}>
                  <View className="field-box">
                    <View className="field-label">Target Treatment & Services</View>
                    <View className="field-value">{booking.pestLabel}</View>
                    <View className="field-sub">
                      {booking.planLabel} ({booking.sizeLabel})
                    </View>
                  </View>
                  <View className="field-box">
                    <View className="field-label">Pinned Customer Coordinates</View>
                    <View className="field-value">
                      Lat: {booking.coords?.lat || liveCustomerLocation.lat}, Lng: {booking.coords?.lng || liveCustomerLocation.lng}
                    </View>
                    <View className="field-sub">{booking.address}</View>
                  </View>
                </View>
              </View>

              {/* Live Safety Protocol Checklist */}
              {['IN_PROGRESS', 'COMPLETED'].includes(booking.status) && (
                <View className="web-card">
                  <View className="card-header-row">
                    <h3 className="card-title">
                      <ShieldCheck size={20} color="var(--success)" />
                      <Text>Live Technician Safety Protocol Feed</Text>
                    </h3>
                    <Text className="badge badge-green">
                      {safetyChecklist.filter(Boolean).length} of 6 Verified
                    </Text>
                  </View>
                  <View style={{ display: 'grid', gap: 10 }}>
                    {SAFETY_CHECKLIST_STEPS.map((st, idx) => {
                      const done = safetyChecklist[idx] || booking.status === 'COMPLETED';
                      return (
                        <View
                          key={idx}
                          className="field-box"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: done ? 'var(--success-light)' : 'var(--surface)',
                          }}
                        >
                          <View>
                            <View style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                              {idx + 1}. {st.title}
                            </View>
                            <View style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                              {st.description}
                            </View>
                          </View>
                          <Text className={`badge ${done ? 'badge-green' : 'badge-neutral'}`}>
                            {done ? 'Verified' : 'Pending'}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              )}
            </View>

            {/* RIGHT COLUMN: Doorstep OTP Handshake, End-of-Service Completion PIN, QR Payment & Review */}
            <View className="sticky-summary" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* 1. Doorstep Start OTP Card (Mocked until worker clicks Arrived) */}
              <View
                className="web-card"
                style={{
                  borderTop: '4px solid var(--accent)',
                  background: booking.status === 'ARRIVED' ? 'rgba(232, 163, 23, 0.12)' : 'var(--card)',
                }}
              >
                <View className="card-header-row">
                  <h3 className="card-title">
                    <KeyRound size={20} color="var(--primary)" />
                    <Text>Doorstep Treatment Start OTP</Text>
                  </h3>
                  <Text className={`badge ${['IN_PROGRESS', 'COMPLETED'].includes(booking.status) ? 'badge-green' : booking.status === 'ARRIVED' ? 'badge-amber' : 'badge-neutral'}`}>
                    {['IN_PROGRESS', 'COMPLETED'].includes(booking.status)
                      ? '✓ Verified by Tech'
                      : booking.status === 'ARRIVED'
                      ? '✓ Tech at Doorstep'
                      : 'Mocked • Tech En Route'}
                  </Text>
                </View>
                <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', lineHeight: 1.45, marginBottom: 14 }}>
                  {['IN_PROGRESS', 'COMPLETED'].includes(booking.status)
                    ? 'Technician verified this OTP upon doorstep arrival. Chemical treatment is active.'
                    : booking.status === 'ARRIVED'
                    ? 'Technician Arjun Sharma has arrived at your doorstep! Share this 4-digit OTP with the technician to begin treatment:'
                    : 'Technician is en route. This Start OTP is mocked/locked and will automatically reveal on your screen when technician clicks "I Have Arrived" at your doorstep.'}
                </p>

                {/* Live digits shown ONLY when worker has arrived or verified */}
                {['ARRIVED', 'IN_PROGRESS', 'COMPLETED'].includes(booking.status) ? (
                  <View
                    style={{
                      display: 'flex',
                      gap: 12,
                      justifyContent: 'center',
                      padding: '14px',
                      background: '#FFFFFF',
                      borderRadius: 14,
                      border: ['IN_PROGRESS', 'COMPLETED'].includes(booking.status) ? '2px solid var(--success)' : '2.5px solid var(--accent)',
                    }}
                  >
                    {String(startOtp || booking?.startOtp || '4829')
                      .split('')
                      .map((d, i) => (
                        <View
                          key={i}
                          style={{
                            width: 54,
                            height: 60,
                            borderRadius: 12,
                            background: ['IN_PROGRESS', 'COMPLETED'].includes(booking.status) ? 'var(--primary-light)' : 'rgba(232, 163, 23, 0.15)',
                            border: '1.5px solid var(--border-strong)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.75rem',
                            fontWeight: 800,
                            color: 'var(--primary-dark)',
                          }}
                        >
                          {d}
                        </View>
                      ))}
                  </View>
                ) : (
                  /* Mocked dots before arrival */
                  <View
                    style={{
                      display: 'flex',
                      gap: 12,
                      justifyContent: 'center',
                      padding: '14px',
                      background: 'var(--surface)',
                      borderRadius: 14,
                      border: '2px dashed var(--border-strong)',
                    }}
                  >
                    {['•', '•', '•', '•'].map((dot, i) => (
                      <View
                        key={i}
                        style={{
                          width: 54,
                          height: 60,
                          borderRadius: 12,
                          background: '#FFFFFF',
                          border: '1px solid var(--border-strong)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.8rem',
                          color: 'var(--ink-muted)',
                          fontWeight: 800,
                        }}
                      >
                        {dot}
                      </View>
                    ))}
                  </View>
                )}
              </View>

              {/* 2. End-of-Service Completion Security PIN Card */}
              <View
                className="web-card"
                style={{
                  borderTop: '4px solid var(--primary)',
                  background: (customerReview || booking.status === 'COMPLETED')
                    ? 'var(--primary-light)'
                    : workCompletedByWorker
                    ? 'rgba(232, 163, 23, 0.08)'
                    : 'var(--surface)',
                }}
              >
                <View className="card-header-row">
                  <h3 className="card-title">
                    <Award size={20} color="var(--primary)" />
                    <Text>End-of-Service Completion Security PIN</Text>
                  </h3>
                  <Text className={`badge ${(customerReview || booking.status === 'COMPLETED') ? 'badge-green' : workCompletedByWorker ? 'badge-amber' : 'badge-neutral'}`}>
                    {(customerReview || booking.status === 'COMPLETED')
                      ? '✓ Review Submitted — PIN Unlocked'
                      : workCompletedByWorker
                      ? 'Work Finished — Review Required'
                      : 'Mocked (Locked)'}
                  </Text>
                </View>

                {/* State A: Treatment in progress, work not completed yet */}
                {!workCompletedByWorker && booking.status !== 'COMPLETED' && (
                  <View style={{ textAlign: 'center', padding: '16px', background: '#FFFFFF', borderRadius: 12, border: '1px dashed var(--border-strong)' }}>
                    <Lock size={26} color="var(--ink-muted)" style={{ margin: '0 auto 8px' }} />
                    <View style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--ink)' }}>
                      PIN is Mocked & Locked
                    </View>
                    <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginTop: 4, lineHeight: 1.45 }}>
                      Technician Arjun Sharma is performing the treatment. Once technician clicks "Complete Work" in their dashboard, you will be prompted to submit your review to reveal this PIN.
                    </p>
                    <View style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 12 }}>
                      {['•', '•', '•', '•'].map((dot, i) => (
                        <View
                          key={i}
                          style={{
                            width: 50,
                            height: 54,
                            borderRadius: 10,
                            background: 'var(--surface)',
                            border: '1px solid var(--border-strong)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.8rem',
                            color: 'var(--ink-muted)',
                            fontWeight: 800,
                          }}
                        >
                          {dot}
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {/* State B: Work marked completed by technician -> customer must give review to unlock PIN */}
                {workCompletedByWorker && !customerReview && booking.status !== 'COMPLETED' && (
                  <View style={{ background: '#FFFFFF', padding: '16px', borderRadius: 12, border: '1.5px solid var(--accent)' }}>
                    <View style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: 'var(--primary-dark)', fontWeight: 800, fontSize: '0.94rem' }}>
                      <Sparkles size={18} color="var(--accent)" />
                      <Text>Technician Completed Work! Submit Review to View PIN</Text>
                    </View>
                    <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginBottom: 12, lineHeight: 1.45 }}>
                      Technician Arjun Sharma finished all treatment steps. <b>Please rate your service below to reveal your 4-digit Completion PIN:</b>
                    </p>

                    {/* Star Rating Buttons */}
                    <View style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <TouchableOpacity
                          key={n}
                          type="button"
                          className={`btn ${stars >= n ? 'btn-accent' : 'btn-outline'} btn-sm`}
                          onClick={() => setStars(n)}
                        >
                          <Star size={15} fill={stars >= n ? 'currentColor' : 'none'} /> {n}★
                        </TouchableOpacity>
                      ))}
                    </View>

                    {/* Feedback Tags */}
                    <View style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                      {['Punctual & Polite', 'Thorough 6-Step Safety', '100% Eco-Safe', 'Spotless Cleanup'].map((tag) => (
                        <TouchableOpacity
                          key={tag}
                          type="button"
                          className="badge badge-neutral"
                          style={{ cursor: 'pointer', border: '1px solid var(--border-strong)', padding: '4px 8px', fontSize: '0.76rem' }}
                          onClick={() => setComment((prev) => prev ? `${prev}, ${tag}` : tag)}
                        >
                          + {tag}
                        </TouchableOpacity>
                      ))}
                    </View>

                    <TextInput
                      type="text"
                      className="form-input"
                      style={{ marginBottom: 12 }}
                      placeholder="Add review feedback for technician & agency..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />

                    <TouchableOpacity
                      type="button"
                      className="btn btn-primary btn-block btn-lg"
                      onClick={async () => {
                        await submitCustomerReview(stars, comment || 'Punctual, eco-safe, and very thorough treatment!');
                        toast('Review submitted! Completion PIN unlocked and revealed below.', 'success');
                      }}
                    >
                      <CheckCircle2 size={18} /> Submit Review & Reveal Completion PIN
                    </TouchableOpacity>

                    <View style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12 }}>
                      {['•', '•', '•', '•'].map((dot, i) => (
                        <View
                          key={i}
                          style={{
                            width: 44,
                            height: 48,
                            borderRadius: 8,
                            background: 'var(--surface)',
                            border: '1px dashed var(--border-strong)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.6rem',
                            color: 'var(--ink-muted)',
                            fontWeight: 800,
                          }}
                        >
                          {dot}
                        </View>
                      ))}
                    </View>
                    <Text style={{ display: 'block', textAlign: 'center', fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: 4 }}>
                      (PIN reveals immediately after clicking submit above)
                    </Text>
                  </View>
                )}

                {/* State C: Customer submitted review OR status is COMPLETED -> PIN is REVEALED */}
                {(customerReview || booking.status === 'COMPLETED') && (
                  <View>
                    <p style={{ fontSize: '0.86rem', color: 'var(--ink-muted)', lineHeight: 1.45, marginBottom: 12 }}>
                      Thank you for your {customerReview?.rating || 5}★ review! Share this 4-digit Completion PIN with your technician so they can verify completion:
                    </p>
                    <View
                      style={{
                        display: 'flex',
                        gap: 12,
                        justifyContent: 'center',
                        padding: '14px',
                        background: '#FFFFFF',
                        borderRadius: 14,
                        border: '2px solid var(--primary)',
                        marginBottom: 14,
                      }}
                    >
                      {String(completionPin || '7391')
                        .split('')
                        .map((d, i) => (
                          <View
                            key={i}
                            style={{
                              width: 54,
                              height: 60,
                              borderRadius: 12,
                              background: 'var(--primary)',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontFamily: 'var(--font-heading)',
                              fontSize: '1.75rem',
                              fontWeight: 800,
                            }}
                          >
                            {d}
                          </View>
                        ))}
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <TouchableOpacity
                        type="button"
                        className="btn btn-success btn-block btn-lg"
                        onClick={() => setQrModal(true)}
                      >
                        <QrCode size={18} /> Open Payment Scanner Link / Pay UPI (Rs. {rawTotal})
                      </TouchableOpacity>
                      <View style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                        Scan the official UPI QR code on technician's phone or click above to pay online
                      </View>
                    </View>
                  </View>
                )}
              </View>

              {/* 3. Assigned Technician & Agency Verification */}
              <View className="web-card">
                <View className="card-header-row">
                  <h3 className="card-title">
                    <UserCheck size={20} color="var(--primary)" />
                    <Text>Assigned Technician & Agency Verification</Text>
                  </h3>
                  <Text className="badge badge-green">KYC Verified</Text>
                </View>

                <View className="field-grid" style={{ marginBottom: 14 }}>
                  <View className="field-box">
                    <View className="field-label">Technician Name</View>
                    <View className="field-value">{assignedWorker?.name || 'Arjun Sharma'}</View>
                    <View className="field-sub">
                      Rating: {assignedWorker?.rating || 4.92} Stars (428 jobs)
                    </View>
                  </View>
                  <View className="field-box">
                    <View className="field-label">Government License</View>
                    <View className="field-value">{assignedWorker?.licenseCode || 'CHL-2024-889'}</View>
                    <View className="field-sub">CIB&RC Registered Applicator</View>
                  </View>
                </View>

                <View className="field-box" style={{ marginBottom: 16 }}>
                  <View className="field-label">
                    {contactUnlocked ? <Unlock size={13} /> : <Lock size={13} />}
                    <Text>Agency Communication Line</Text>
                  </View>
                  <View className="field-value">
                    {contactUnlocked
                      ? assignedWorker?.phone || '+91 98765 43210 (Direct Unlocked)'
                      : assignedWorker?.proxyPhone || '+91 80 4912 3456 (Masked Agency Proxy)'}
                  </View>
                  <View className="field-sub">
                    {contactUnlocked
                      ? 'Agency approved - Direct communication active'
                      : 'Personal phone is protected through agency bridge'}
                  </View>
                </View>

                <View style={{ display: 'flex', gap: 10 }}>
                  <a
                    href="tel:+919876543210"
                    className="btn btn-outline btn-sm"
                    onClick={() => toast('Connecting call to technician...', 'info')}
                  >
                    <Phone size={15} /> Call Technician
                  </a>
                  {canCancel() ? (
                    <TouchableOpacity
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={async () => {
                        await cancelBooking();
                        toast('Booking cancelled with zero penalty.', 'info');
                      }}
                    >
                      <X size={15} /> Cancel Booking
                    </TouchableOpacity>
                  ) : (
                    <Text className="badge badge-neutral" style={{ marginLeft: 'auto' }}>
                      Cancellation locked once technician is en route
                    </Text>
                  )}
                </View>
              </View>

              {/* 4. Payment Card (Direct Trigger) */}
              {(booking.status === 'COMPLETED' || pinVerifiedByWorker || paymentQrGenerated || customerPaid) && (
                <View className="web-card" style={{ borderTop: '4px solid var(--success)', background: '#FFFFFF' }}>
                  <View className="card-header-row">
                    <h3 className="card-title">
                      <QrCode size={20} color="var(--success)" />
                      <Text>Doorstep Payment & Invoice</Text>
                    </h3>
                    <Text className={`badge ${customerPaid ? 'badge-green' : 'badge-amber'}`}>
                      {customerPaid ? '✓ Paid & Settled' : 'Payment Ready'}
                    </Text>
                  </View>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: 14 }}>
                    {customerPaid
                      ? 'Payment has been settled successfully! 90-Day Warranty Certificate is active in History.'
                      : `Scan the UPI QR code on technician's phone or click below to settle Rs. ${rawTotal}:`}
                  </p>
                  {!customerPaid ? (
                    <TouchableOpacity
                      type="button"
                      className="btn btn-success btn-lg btn-block"
                      onClick={() => setQrModal(true)}
                    >
                      <QrCode size={18} /> Open UPI Payment QR Code (Rs. {rawTotal})
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      type="button"
                      className="btn btn-outline btn-block"
                      onClick={() => onNavigate('history')}
                    >
                      <Award size={16} /> View 90-Day Warranty Certificate
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>

          {/* Interactive Payment QR & Warranty Modal */}
          <ModalDialog
            open={qrModal}
            onClose={() => setQrModal(false)}
            title={`Scan UPI QR & Complete Payment (Rs. ${rawTotal})`}
            icon={QrCode}
          >
            <View style={{ textAlign: 'center', padding: '10px 0' }}>
              <View
                style={{
                  width: 200,
                  height: 200,
                  margin: '0 auto 16px',
                  background: '#FFFFFF',
                  borderRadius: 16,
                  border: '2px solid var(--border-strong)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <Image
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=pestfree@okaxis&pn=PestFree&am=${rawTotal}&cu=INR`}
                  alt="UPI Payment QR Code"
                  style={{ width: 170, height: 170 }}
                />
              </View>

              <View style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: 4 }}>
                Rs. {rawTotal} Total Payable
              </View>
              <View style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: 18 }}>
                Scan using Google Pay, PhonePe, Paytm, or BHIM UPI
              </View>

              <TouchableOpacity
                type="button"
                className="btn btn-success btn-lg btn-block"
                onClick={async () => {
                  await confirmCustomerPayment();
                  setQrModal(false);
                  toast('Payment confirmed & 90-Day Warranty Certificate saved to History!', 'success');
                  onNavigate('history');
                }}
              >
                <CheckCircle2 size={18} /> Confirm Payment & Save Warranty Certificate
              </TouchableOpacity>
            </View>
          </ModalDialog>
        </>
      )}
    </View>
  );
}

export default TrackSection;

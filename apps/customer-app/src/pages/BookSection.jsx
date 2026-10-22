import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from '@pest-free/ui-kit';
import {
  Bug,
  Building2,
  Calendar,
  Clock,
  MapPin,
  Navigation,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Home,
  Lock,
} from 'lucide-react';
import { useAppStore } from '../lib/api/store.js';
import {
  PEST_TYPES,
  PROPERTY_SIZES,
  PLANS,
  TIME_SLOTS,
  calculateMultiServicePrice,
  generateSmartQuoteRecommendation,
} from '../lib/api/index.js';
import { PEST_IMAGES, DAY_OPTS, SAVED_ADDRESSES } from '../constants.js';

export function BookSection({ toast, onNavigate, userProfile }) {
  const { placeBooking, isLoading, booking, rebookDraft, clearRebookDraft, setCustomerLocation } = useAppStore();

  const [form, setForm] = useState({
    pestTypes: ['cockroaches'],
    propertySize: '2bhk',
    plan: 'barrier',
    day: 'today',
    slot: TIME_SLOTS[0],
    address: userProfile?.addressText || SAVED_ADDRESSES[0].text,
    coords: userProfile?.coords || SAVED_ADDRESSES[0].coords,
    note: 'Sightings near kitchen cabinets and utility drain.',
    dispatchMode: 'treat_on_arrival',
  });
  const [errors, setErrors] = useState({});
  const [geoLocating, setGeoLocating] = useState(false);

  useEffect(() => {
    if (userProfile?.addressText) {
      setForm((f) => ({
        ...f,
        address: userProfile.addressText,
        coords: userProfile.coords || f.coords,
      }));
    }
  }, [userProfile]);

  useEffect(() => {
    if (rebookDraft) {
      setForm({
        ...rebookDraft,
        pestTypes: rebookDraft.pestTypes || [rebookDraft.pestType || 'cockroaches'],
        coords: rebookDraft.coords || SAVED_ADDRESSES[0].coords,
      });
      clearRebookDraft();
    }
  }, [rebookDraft, clearRebookDraft]);

  const togglePest = (pestId) => {
    setForm((prev) => {
      const current = prev.pestTypes || [];
      const exists = current.includes(pestId);
      const next = exists ? current.filter((id) => id !== pestId) : [...current, pestId];
      return { ...prev, pestTypes: next };
    });
  };

  const captureLiveGps = () => {
    if (!navigator.geolocation) {
      toast('Geolocation is not supported by your browser', 'error');
      return;
    }
    setGeoLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newCoords = {
          lat: Number(pos.coords.latitude.toFixed(4)),
          lng: Number(pos.coords.longitude.toFixed(4)),
        };
        setForm((f) => ({
          ...f,
          coords: newCoords,
          address: f.address || `Live Pin: ${newCoords.lat}, ${newCoords.lng} (Auto-Detected GPS)`,
        }));
        setCustomerLocation(newCoords);
        setGeoLocating(false);
        toast(`Live GPS coordinates pinned: Lat ${newCoords.lat}, Lng ${newCoords.lng}!`, 'success');
      },
      (err) => {
        setGeoLocating(false);
        const fallback = { lat: 12.9250, lng: 77.5938 };
        setForm((f) => ({ ...f, coords: fallback }));
        toast('Using verified Bengaluru GPS pin coordinates', 'info');
      },
      { timeout: 8000 }
    );
  };

  const primaryPest = (form.pestTypes && form.pestTypes[0]) || 'cockroaches';

  const aiRecommendation = generateSmartQuoteRecommendation({
    pestType: primaryPest,
    propertySize: form.propertySize,
    note: form.note || '',
  });

  const selectedSize = PROPERTY_SIZES.find((s) => s.id === form.propertySize) ?? PROPERTY_SIZES[0];
  const selectedPlan = PLANS.find((p) => p.id === form.plan) ?? PLANS[0];
  const price = calculateMultiServicePrice(
    form.pestTypes || ['cockroaches'],
    form.propertySize,
    form.plan || 'standard',
    form.dispatchMode || 'treat_on_arrival'
  );

  const handleSubmit = async () => {
    const newErr = {};
    if (!form.pestTypes || form.pestTypes.length === 0) {
      newErr.pestTypes = 'Please select at least one treatment service.';
    }
    if (!form.propertySize) {
      newErr.propertySize = 'Please select your property configuration.';
    }
    if (!form.plan) {
      newErr.plan = 'Please select a protection plan.';
    }
    if (!form.day) {
      newErr.day = 'Please select a preferred date.';
    }
    if (!form.slot) {
      newErr.slot = 'Please select a preferred time slot.';
    }
    if (!form.dispatchMode) {
      newErr.dispatchMode = 'Please select a dispatch mode.';
    }
    if (!form.address || form.address.trim().length < 10) {
      newErr.address = 'Mandatory: Enter exact flat/house number, street, and locality (min 10 characters).';
    }
    setErrors(newErr);
    if (Object.keys(newErr).length > 0) {
      toast('Please complete all mandatory fields and address.', 'error');
      return;
    }

    await placeBooking(form);
    toast('Booking confirmed! Redirecting to Live Tracking & OTP Radar...', 'success');
    onNavigate('track');
  };

  return (
    <View>
      {booking && booking.status !== 'CANCELLED' && (
        <View
          className="demo-toolbar"
          style={{ background: 'var(--primary-light)', borderColor: 'var(--primary)' }}
        >
          <View style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sparkles size={18} color="var(--primary)" />
            <Text style={{ fontWeight: 700 }}>
              Active Booking #{booking.id} ({booking.pestLabel}) is currently in{' '}
              <u>{booking.status.replace(/_/g, ' ')}</u> state.
            </Text>
          </View>
          <TouchableOpacity className="btn btn-primary btn-sm" onClick={() => onNavigate('track')}>
            Open Live Tracking & OTP <ChevronRight size={15} />
          </TouchableOpacity>
        </View>
      )}

      <View className="booking-layout">
        {/* LEFT COLUMN: Interactive Configurator */}
        <View style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {/* STEP 1: Multi-Select Pest Selection */}
          <View className="web-card">
            <View className="card-header-row" style={{ flexWrap: 'wrap', gap: 8 }}>
              <View>
                <h2 className="card-title">
                  <Bug size={20} color="var(--primary)" />
                  <Text>1. Select Treatment Services (Multi-Select Supported)</Text>
                </h2>
                <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                  Need multiple treatments? Select two or more services to receive an automatic <strong>15% combo bundle discount</strong>. (Click any option to select, click again to deselect).
                </p>
              </View>
              <View style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <TouchableOpacity
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    setForm((f) => ({ ...f, pestTypes: PEST_TYPES.map((p) => p.id) }));
                    toast('Selected Full Home Protection Combo (15% bundle discount applied)', 'success');
                  }}
                >
                  <CheckCircle2 size={14} /> Select All (6 Pests)
                </TouchableOpacity>
                {form.pestTypes?.length > 1 && (
                  <TouchableOpacity
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => setForm((f) => ({ ...f, pestTypes: ['cockroaches'] }))}
                  >
                    Reset to 1
                  </TouchableOpacity>
                )}
                <Text className="badge badge-green">
                  {form.pestTypes?.length || 1} Service{form.pestTypes?.length > 1 ? 's' : ''} Selected
                </Text>
              </View>
            </View>

            <View className="select-grid-3">
              {PEST_TYPES.map((p) => {
                const isSel = (form.pestTypes || []).includes(p.id);
                return (
                  <TouchableOpacity
                    key={p.id}
                    type="button"
                    className={`select-card ${isSel ? 'selected' : ''}`}
                    onClick={() => togglePest(p.id)}
                    style={{
                      position: 'relative',
                      padding: 0,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      border: isSel ? '2px solid var(--primary)' : '1.5px solid var(--border)',
                      borderRadius: 14,
                      background: 'var(--surface)',
                      boxShadow: isSel ? '0 6px 20px rgba(6,78,59,0.14)' : '0 2px 8px rgba(0,0,0,0.04)',
                      transition: 'all 0.15s ease',
                      cursor: 'pointer',
                    }}
                  >
                    {/* Image on very top of card */}
                    <div style={{ position: 'relative', width: '100%', height: 130, overflow: 'hidden' }}>
                      <img
                        src={PEST_IMAGES[p.id]}
                        alt={p.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          width: 24,
                          height: 24,
                          borderRadius: 8,
                          border: isSel ? '2px solid var(--primary)' : '2px solid rgba(255,255,255,0.9)',
                          background: isSel ? 'var(--primary)' : 'rgba(0,0,0,0.45)',
                          backdropFilter: 'blur(4px)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8rem',
                          fontWeight: 900,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        }}
                      >
                        {isSel ? '✓' : ''}
                      </div>
                      {isSel && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 6,
                            left: 8,
                            background: 'rgba(6,78,59,0.92)',
                            color: '#A7F3D0',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: 6,
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          Selected Service
                        </div>
                      )}
                    </div>

                    {/* Card Content & Details */}
                    <View style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                      <View>
                        <View className="select-card-title" style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink)' }}>
                          {p.name}
                        </View>
                        <View className="select-card-desc" style={{ marginTop: 4, fontSize: '0.78rem', color: 'var(--ink-muted)', lineHeight: 1.4 }}>
                          {p.tagline}
                        </View>
                      </View>
                      <View style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                        <View className="select-card-price" style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.95rem' }}>
                          Rs. {p.basePrice} base
                        </View>
                        <View style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <ShieldCheck size={11} color="var(--primary)" /> {p.chemicalUsed}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            {errors.pestTypes && <View className="form-error">{errors.pestTypes}</View>}
          </View>

          {/* STEP 2: Property Size & Protection Plan with Prices Displayed */}
          <View className="web-card">
            <View className="card-header-row">
              <h2 className="card-title">
                <Building2 size={20} color="var(--primary)" />
                <Text>2. Property Size & Protection Plan</Text>
              </h2>
            </View>

            <View className="form-label" style={{ marginBottom: 8 }}>
              Choose Property Configuration (Click to select, click again to deselect)
            </View>
            <View className="select-grid-5" style={{ marginBottom: 22 }}>
              {PROPERTY_SIZES.map((s) => {
                const isSel = form.propertySize === s.id;
                return (
                  <TouchableOpacity
                    key={s.id}
                    type="button"
                    className={`select-card ${isSel ? 'selected' : ''}`}
                    onClick={() => setForm((f) => ({ ...f, propertySize: f.propertySize === s.id ? '' : s.id }))}
                  >
                    <View className="select-card-title">{s.label}</View>
                    <View className="select-card-desc">{s.areaHint}</View>
                    <View className="select-card-price">x{s.multiplier} Multiplier</View>
                  </TouchableOpacity>
                );
              })}
            </View>
            {errors.propertySize && <View className="form-error" style={{ marginBottom: 16 }}>{errors.propertySize}</View>}

            {/* AI Smart Quote Banner */}
            <View
              className="web-card-surface"
              style={{
                background: 'var(--primary-light)',
                borderColor: 'rgba(31, 91, 58, 0.3)',
                marginBottom: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <View style={{ flex: 1 }}>
                <View style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.76rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>
                  <Sparkles size={15} /> AI Smart Quote Recommendation
                </View>
                <View style={{ fontWeight: 700, fontSize: '0.96rem', marginTop: 4 }}>
                  Recommended Tier:{' '}
                  <Text style={{ color: 'var(--primary-dark)', textDecoration: 'underline' }}>
                    {PLANS.find((pl) => pl.id === aiRecommendation.recommendedPlan)?.name}
                  </Text>
                </View>
                <View style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                  {aiRecommendation.reason}
                </View>
              </View>
              {form.plan !== aiRecommendation.recommendedPlan ? (
                <TouchableOpacity
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setForm((f) => ({ ...f, plan: aiRecommendation.recommendedPlan }));
                    toast('Applied AI recommended treatment plan!', 'success');
                  }}
                >
                  Apply Recommended Plan
                </TouchableOpacity>
              ) : (
                <Text className="badge badge-green">
                  <CheckCircle2 size={14} /> Active Selection
                </Text>
              )}
            </View>

            <View className="form-label" style={{ marginBottom: 8 }}>
              Select Protection Plan (Click to select, click again to deselect) — Estimated Prices Displayed Below
            </View>
            <View className="select-grid-3">
              {PLANS.map((pl) => {
                const isSel = form.plan === pl.id;
                const planEstimatedCost = Math.round(price.basePrice * selectedSize.multiplier * pl.multiplier * 1.18);
                return (
                  <TouchableOpacity
                    key={pl.id}
                    type="button"
                    className={`select-card ${isSel ? 'selected' : ''}`}
                    onClick={() => setForm((f) => ({ ...f, plan: f.plan === pl.id ? '' : pl.id }))}
                  >
                    <View>
                      <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
                        <Text className="select-card-title">{pl.name}</Text>
                        {pl.badge && <Text className="badge badge-amber">{pl.badge}</Text>}
                      </View>
                      <View className="select-card-desc" style={{ marginTop: 6 }}>
                        {pl.description}
                      </View>
                    </View>
                    <View style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                      <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <Text className="badge badge-neutral">{pl.warrantyDays}-Day Warranty</Text>
                        <View style={{ textAlign: 'right' }}>
                          <Text style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', display: 'block' }}>Inc. GST</Text>
                          <Text style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>
                            Rs. {planEstimatedCost}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            {errors.plan && <View className="form-error">{errors.plan}</View>}
          </View>

          {/* STEP 3: Schedule & Dispatch Mode */}
          <View className="web-card">
            <View className="card-header-row" style={{ flexWrap: 'wrap', gap: 10 }}>
              <h2 className="card-title">
                <Calendar size={20} color="var(--primary)" />
                <Text>3. Schedule & Dispatch Mode (Click to select, click again to deselect)</Text>
              </h2>
            </View>

            <View className="field-grid" style={{ marginBottom: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
              {/* Preferred Day Section */}
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Calendar size={14} color="var(--primary)" /> Preferred Day
                </label>
                <View style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10 }}>
                  {DAY_OPTS.map((d) => {
                    const isSel = form.day === d.id;
                    return (
                      <TouchableOpacity
                        key={d.id}
                        type="button"
                        className={`select-card ${isSel ? 'selected' : ''}`}
                        style={{
                          padding: '12px 10px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          gap: 4,
                          margin: 0,
                          borderRadius: 12,
                        }}
                        onClick={() => setForm((f) => ({ ...f, day: f.day === d.id ? '' : d.id }))}
                      >
                        <Text style={{ fontWeight: 800, fontSize: '0.86rem', color: isSel ? 'var(--primary)' : 'var(--ink)' }}>
                          {d.label}
                        </Text>
                        <Text style={{ fontSize: '0.7rem', color: isSel ? 'var(--primary-dark)' : 'var(--ink-muted)', fontWeight: 600 }}>
                          {isSel ? '✓ Priority' : 'Available'}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                {errors.day && <View className="form-error" style={{ marginTop: 6 }}>{errors.day}</View>}
              </View>

              {/* 2-Hour Arrival Window Section */}
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Clock size={14} color="var(--primary)" /> 2-Hour Arrival Window
                </label>
                <View style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
                  {TIME_SLOTS.map((sl) => {
                    const isSel = form.slot === sl;
                    return (
                      <TouchableOpacity
                        key={sl}
                        type="button"
                        className={`select-card ${isSel ? 'selected' : ''}`}
                        style={{
                          padding: '12px 8px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          gap: 4,
                          margin: 0,
                          borderRadius: 12,
                        }}
                        onClick={() => setForm((f) => ({ ...f, slot: f.slot === sl ? '' : sl }))}
                      >
                        <Text style={{ fontWeight: 800, fontSize: '0.84rem', color: isSel ? 'var(--primary)' : 'var(--ink)' }}>
                          {sl}
                        </Text>
                        <Text style={{ fontSize: '0.7rem', color: isSel ? 'var(--primary-dark)' : 'var(--ink-muted)', fontWeight: 600 }}>
                          {isSel ? '✓ Selected' : 'Verified Slot'}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                {errors.slot && <View className="form-error" style={{ marginTop: 6 }}>{errors.slot}</View>}
              </View>
            </View>

            <View className="form-label">Dispatch Mode (Click to select, click again to deselect)</View>
            <View style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
              <TouchableOpacity
                type="button"
                className={`select-card ${form.dispatchMode === 'treat_on_arrival' ? 'selected' : ''}`}
                style={{ borderRadius: 14, margin: 0 }}
                onClick={() => setForm((f) => ({ ...f, dispatchMode: f.dispatchMode === 'treat_on_arrival' ? '' : 'treat_on_arrival' }))}
              >
                <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <Text className="select-card-title" style={{ fontSize: '0.98rem', fontWeight: 800 }}>
                    Treat on Arrival (Instant Dispatch)
                  </Text>
                  {form.dispatchMode === 'treat_on_arrival' && (
                    <Text className="badge badge-green" style={{ fontSize: '0.7rem' }}>✓ Selected</Text>
                  )}
                </View>
                <View className="select-card-desc" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
                  Technician arrives fully equipped with calibrated chemical batch and begins treatment immediately after OTP verification.
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                type="button"
                className={`select-card ${form.dispatchMode === 'inspection' ? 'selected' : ''}`}
                style={{ borderRadius: 14, margin: 0 }}
                onClick={() => setForm((f) => ({ ...f, dispatchMode: f.dispatchMode === 'inspection' ? '' : 'inspection' }))}
              >
                <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                  <Text className="select-card-title" style={{ fontSize: '0.98rem', fontWeight: 800 }}>
                    Inspection First
                  </Text>
                  <Text className="badge badge-green" style={{ fontSize: '0.7rem' }}>Rs. 0 Advance</Text>
                </View>
                <View className="select-card-desc" style={{ fontSize: '0.82rem', lineHeight: 1.45 }}>
                  Pay Rs. 0 now. Technician inspects moisture pockets and colony severity first; pay full quote only after approving on-site.
                </View>
              </TouchableOpacity>
            </View>
            {errors.dispatchMode && <View className="form-error" style={{ marginTop: 8 }}>{errors.dispatchMode}</View>}
          </View>

          {/* STEP 4: Mandatory Exact Location Pinning & Address */}
          <View className="web-card">
            <View className="card-header-row" style={{ flexWrap: 'wrap', gap: 14, alignItems: 'flex-start' }}>
              <View style={{ flex: 1, minWidth: 260 }}>
                <h2 className="card-title">
                  <MapPin size={20} color="var(--primary)" />
                  <Text>4. Service Address & Mandatory Exact Live Location</Text>
                </h2>
                <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 4, lineHeight: 1.45 }}>
                  Exact coordinates (Latitude & Longitude) are recorded live and pinned for accurate technician routing.
                </p>
              </View>
              <TouchableOpacity
                type="button"
                className="btn btn-primary"
                style={{ padding: '9px 16px', fontSize: '0.84rem', fontWeight: 800, flexShrink: 0 }}
                onClick={captureLiveGps}
                disabled={geoLocating}
              >
                <Navigation size={14} />
                {geoLocating ? 'Detecting Live GPS...' : 'Use My Current Live Location'}
              </TouchableOpacity>
            </View>

            {/* Quick Fill Saved Address Pills */}
            <View style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
              <Text style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)', marginRight: 2 }}>
                Quick Saved Address:
              </Text>
              {SAVED_ADDRESSES.map((addr, i) => (
                <TouchableOpacity
                  key={i}
                  type="button"
                  className="stage-pill-btn"
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    borderRadius: 9,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                  onClick={() => {
                    setForm((f) => ({ ...f, address: addr.text, coords: addr.coords }));
                    setCustomerLocation(addr.coords);
                    setErrors({});
                    toast(`Loaded ${addr.label} & pinned GPS (Lat: ${addr.coords.lat}, Lng: ${addr.coords.lng})`, 'info');
                  }}
                >
                  <Home size={13} color="var(--primary)" />
                  {addr.label}
                </TouchableOpacity>
              ))}
            </View>

            {/* Live GPS Coordinates Banner */}
            <View
              className="web-card-surface"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                marginBottom: 16,
                background: 'var(--primary-light)',
                border: '1.5px solid rgba(31, 91, 58, 0.3)',
                borderRadius: 14,
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <View>
                <Text style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.04em' }}>
                  Active Geo-Coordinates Pinned
                </Text>
                <View style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 800, marginTop: 3, color: 'var(--ink)' }}>
                  Latitude: {form.coords?.lat || 12.9250} &bull; Longitude: {form.coords?.lng || 77.5938}
                </View>
              </View>
              <Text className="badge badge-green" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>
                <CheckCircle2 size={14} /> GPS Anchored
              </Text>
            </View>

            <View className="form-group">
              <label className="form-label" htmlFor="address-input">
                Mandatory Exact Flat / House No., Building, Street & Locality
              </label>
              <TextInput
                id="address-input"
                type="text"
                className="form-input"
                style={{ width: '100%', fontSize: '0.92rem' }}
                value={form.address}
                onChange={(e) => {
                  setForm((f) => ({ ...f, address: e.target.value }));
                  setErrors({});
                }}
                placeholder="e.g. Flat 402, Palm Grove Residency, 11th Main Rd, Jayanagar 4th Block"
              />
              {errors.address && <View className="form-error">{errors.address}</View>}
            </View>

            <View className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="note-input">
                Infestation Notes for Technician (Triggers AI Plan Suggestion)
              </label>
              <TextInput multiline
                id="note-input"
                rows={2}
                className="form-textarea"
                style={{ width: '100%', fontSize: '0.9rem' }}
                value={form.note}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                placeholder="Describe where you noticed activity (e.g. heavy termites in wooden wardrobe, kitchen sink, pets at home)..."
              />
            </View>
          </View>
        </View>

        {/* RIGHT COLUMN: Sticky Live Quote & Multi-Service Bundle Summary */}
        <View className="web-card sticky-summary" style={{ borderTop: '4px solid var(--primary)' }}>
          <View className="card-header-row">
            <h3 className="card-title">Live Treatment Quote</h3>
            <Text className="badge badge-green">{selectedPlan.warrantyDays}-Day Warranty</Text>
          </View>

          <View className="web-card-surface" style={{ marginBottom: 18 }}>
            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <Text style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)' }}>
                Selected Services ({price.pests.length})
              </Text>
              {price.bundleDiscount > 0 && (
                <Text className="badge badge-green" style={{ fontSize: '0.72rem' }}>
                  15% Combo Saved
                </Text>
              )}
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {price.pests.map((p) => (
                <View key={p.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <Text>{p.name}</Text>
                  <Text style={{ fontWeight: 700 }}>Rs. {p.calculatedPrice}</Text>
                </View>
              ))}
            </View>

            <View style={{ borderTop: '1px solid var(--border)', marginTop: 10, paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.84rem' }}>
              <View style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-muted)' }}>
                <Text>Property Multiplier ({selectedSize.label})</Text>
                <Text>x{selectedSize.multiplier}</Text>
              </View>
              <View style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-muted)' }}>
                <Text>Tier Multiplier ({selectedPlan.name})</Text>
                <Text>x{selectedPlan.multiplier}</Text>
              </View>
              {price.bundleDiscount > 0 && (
                <View style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)', fontWeight: 700 }}>
                  <Text>15% Combo Bundle Discount</Text>
                  <Text>-Rs. {price.bundleDiscount}</Text>
                </View>
              )}
              <View style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--ink-muted)' }}>
                <Text>GST (18% Statutory Tax)</Text>
                <Text>Rs. {price.gst}</Text>
              </View>
            </View>

            <View
              style={{
                borderTop: '2px solid var(--border)',
                paddingTop: 12,
                marginTop: 4,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <Text style={{ fontWeight: 800, fontSize: '1rem' }}>Total Estimate</Text>
              <Text style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
                Rs. {price.total}
              </Text>
            </View>

            <View
              style={{
                background: form.dispatchMode === 'inspection' ? 'var(--success-light)' : 'var(--accent-light)',
                padding: '10px 14px',
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: 800,
              }}
            >
              <Text>Payable Now ({form.dispatchMode === 'inspection' ? 'Inspection Mode' : 'Full Booking'})</Text>
              <Text style={{ fontSize: '1.2rem', color: 'var(--primary-dark)' }}>
                Rs. {price.payableNow}
              </Text>
            </View>
          </View>

          <View
            className="field-box"
            style={{ marginBottom: 18, fontSize: '0.8rem', color: 'var(--ink-muted)', lineHeight: 1.45 }}
          >
            <strong style={{ color: 'var(--ink)', display: 'block', marginBottom: 3 }}>
              <Lock size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              Agency Homeowner Privacy & Route Security:
            </strong>
            Your personal phone and exact flat coordinates remain locked until the Agency confirms the booking and dispatches a KYC-verified technician.
          </View>

          <TouchableOpacity
            type="button"
            className="btn btn-primary btn-lg btn-block"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            <CheckCircle2 size={18} />
            {isLoading
              ? 'Dispatching Booking...'
              : form.dispatchMode === 'inspection'
              ? `Confirm Free Inspection for ${price.pests.length} Services (Rs. 0 Now)`
              : `Confirm & Dispatch for ${price.pests.length} Services (Rs. ${price.payableNow})`}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default BookSection;

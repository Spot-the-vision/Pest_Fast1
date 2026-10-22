import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from '@pest-free/ui-kit';
import {
  Briefcase,
  Star,
  ShieldCheck,
  IndianRupee,
  ChevronRight,
  Unlock,
  Lock,
  MapPin,
  Navigation,
  CheckCircle2,
} from 'lucide-react';
import { useAppStore } from '../lib/api/store.js';
import { QUEUED_JOBS } from '../constants.js';

export function WorkerOverviewSection({ toast, onNavigate }) {
  const { booking, incomingJob, contactUnlocked, agencyApproveBooking } = useAppStore();
  const [period, setPeriod] = useState('Today');

  const periodStats = {
    Today: {
      jobs: '4 Jobs',
      jobsSub: '100% on-time arrival SLA',
      rating: '4.92 ★',
      ratingSub: 'Across 428 customer ratings',
      success: '99.4%',
      successSub: 'Zero re-treatment claims',
      payout: 'Rs. 1,050',
      payoutSub: 'Direct bank transfer via IMPS',
    },
    'This Week': {
      jobs: '28 Jobs',
      jobsSub: 'Top applicator in South Cluster',
      rating: '4.93 ★',
      ratingSub: '98.8% 5-Star customer reviews',
      success: '99.6%',
      successSub: '100% CIB&RC safety compliance',
      payout: 'Rs. 7,420',
      payoutSub: 'Credited to ICICI A/c ...4819',
    },
    'This Month': {
      jobs: '112 Jobs',
      jobsSub: 'Star Performer of the Month',
      rating: '4.92 ★',
      ratingSub: '428 Lifetime 5-Star ratings',
      success: '99.5%',
      successSub: 'Zero chemical spill incidents',
      payout: 'Rs. 29,800',
      payoutSub: 'Includes performance bonuses',
    },
  };

  const curr = periodStats[period] || periodStats.Today;

  const rawPrice =
    typeof booking?.price === 'number'
      ? booking.price
      : booking?.price?.total ?? booking?.pricing?.total ?? 1600;
  const workerPayout = incomingJob?.payout ?? Math.round(rawPrice * 0.55);

  const lat = booking?.coords?.lat || 12.9250;
  const lng = booking?.coords?.lng || 77.5938;

  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Controls: Filter Toggle */}
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          background: 'var(--card)',
          padding: '16px 20px',
          borderRadius: 16,
          border: '1px solid var(--border)',
        }}
      >
        <View>
          <Text style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>
            Technician Performance Metrics
          </Text>
          <Text style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>
            Real-time analytics for Arjun Sharma (CHL-2024-889)
          </Text>
        </View>

        {/* Toggle [ Today ] [ This Week ] [ This Month ] */}
        <View style={{ display: 'flex', background: 'var(--surface)', padding: 4, borderRadius: 12, border: '1px solid var(--border-strong)' }}>
          {['Today', 'This Week', 'This Month'].map((p) => (
            <TouchableOpacity
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: period === p ? 'var(--primary)' : 'transparent',
                color: period === p ? '#FFFFFF' : 'var(--ink)',
                border: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {p}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 4 Responsive Metric Cards */}
      <View className="dashboard-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <View className="kpi-card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>Jobs Accomplished</Text>
            <Briefcase size={18} color="var(--primary)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)' }}>{curr.jobs}</View>
          <View className="kpi-foot">{curr.jobsSub}</View>
        </View>

        <View className="kpi-card" style={{ borderLeft: '4px solid #E8A317' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>Technician Rating</Text>
            <Star size={18} color="#E8A317" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#B87F0D' }}>{curr.rating}</View>
          <View className="kpi-foot">{curr.ratingSub}</View>
        </View>

        <View className="kpi-card" style={{ borderLeft: '4px solid var(--success)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>Safety & SLA Rate</Text>
            <ShieldCheck size={18} color="var(--success)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--success)' }}>{curr.success}</View>
          <View className="kpi-foot">{curr.successSub}</View>
        </View>

        <View className="kpi-card" style={{ borderLeft: '4px solid var(--primary-dark)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>Total Payout Accrued</Text>
            <IndianRupee size={18} color="var(--primary-dark)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{curr.payout}</View>
          <View className="kpi-foot">{curr.payoutSub}</View>
        </View>
      </View>

      {/* SUBHEADING: Active Job */}
      <View style={{ marginTop: 8 }}>
        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <View style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <View style={{ width: 8, height: 24, background: 'var(--primary)', borderRadius: 4 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Active Job</h3>
            <Text className="badge badge-green" style={{ fontSize: '0.78rem' }}>
              {booking?.status ? booking.status.replace(/_/g, ' ') : 'READY TO DISPATCH'}
            </Text>
          </View>
          <TouchableOpacity
            className="btn btn-outline btn-sm"
            onClick={() => onNavigate('workspace')}
          >
            Open in Workspace <ChevronRight size={14} />
          </TouchableOpacity>
        </View>

        {/* Merged 50/50 Dual Card */}
        <View className="web-card" style={{ padding: 0, overflow: 'hidden', border: '1.5px solid var(--border-strong)' }}>
          <View className="dual-card-50">
            {/* Left 50%: Customer Contact & Address Gate */}
            <View style={{ padding: 24, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {contactUnlocked ? <Unlock size={18} color="var(--success)" /> : <Lock size={18} color="var(--accent)" />}
                  <Text style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--ink)' }}>
                    Customer Contact & Address Gate
                  </Text>
                </View>
                <Text className={`badge ${contactUnlocked ? 'badge-green' : 'badge-amber'}`}>
                  {contactUnlocked ? 'Unlocked & Verified' : 'Agency Clearance Required'}
                </Text>
              </View>

              <View className="field-grid">
                <View className="field-box">
                  <View className="field-label">Customer Name</View>
                  <View className="field-value">
                    {contactUnlocked
                      ? booking?.customerFullName || 'Aarav Sharma'
                      : incomingJob?.maskedName || booking?.customerMaskedName || 'Aarav S.'}
                  </View>
                  <View className="field-sub">
                    {contactUnlocked ? 'Actual Customer Name' : 'Masked until Agency approves'}
                  </View>
                </View>

                <View className="field-box">
                  <View className="field-label">Phone Number</View>
                  <View className="field-value">
                    {contactUnlocked
                      ? booking?.customerRealPhone || '+91 98450 67890'
                      : incomingJob?.maskedPhone || '+91-984-XXX-7890 (Proxy)'}
                  </View>
                  <View className="field-sub">
                    {contactUnlocked ? 'Direct Line Unlocked' : 'Masked Proxy Bridge'}
                  </View>
                </View>
              </View>

              <View className="field-box">
                <View className="field-label">Service Address</View>
                <View className="field-value">
                  {contactUnlocked
                    ? booking?.address || 'Flat 402, Green Glen Layout, Jayanagar 4th Block, Bengaluru'
                    : `${incomingJob?.area || 'Jayanagar 4th Block, Bengaluru'} (Exact flat number locked until agency permits)`}
                </View>
              </View>

              {/* GPS Link (Locked / Unlocked) */}
              <View
                className="field-box"
                style={{
                  background: contactUnlocked ? 'var(--primary-light)' : 'var(--surface)',
                  border: contactUnlocked ? '1.5px solid var(--primary)' : '1px dashed var(--border-strong)',
                }}
              >
                <View className="field-label" style={{ color: contactUnlocked ? 'var(--primary-dark)' : 'var(--ink-muted)', fontWeight: 800 }}>
                  <MapPin size={14} style={{ display: 'inline', marginRight: 4 }} />
                  GPS Location & Navigation Link
                </View>
                {contactUnlocked ? (
                  <View style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <Text style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700 }}>
                      Lat: {Number(lat).toFixed(4)}°, Lng: {Number(lng).toFixed(4)}°
                    </Text>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      <Navigation size={13} /> Open Live GPS Link
                    </a>
                  </View>
                ) : (
                  <View style={{ marginTop: 4, fontSize: '0.82rem', color: 'var(--ink-muted)' }}>
                    🔒 Map and GPS coordinates locked. Click Agency 1-Time Approval to unlock navigation.
                  </View>
                )}
              </View>

              {!contactUnlocked ? (
                <TouchableOpacity
                  className="btn btn-primary btn-block"
                  onClick={async () => {
                    await agencyApproveBooking();
                    toast('Agency approved job! Actual customer details & GPS unlocked.', 'success');
                  }}
                >
                  <CheckCircle2 size={16} /> Grant Agency 1-Time Approval
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    onNavigate('workspace');
                    toast('Opening Active Job in Workspace Console...', 'info');
                  }}
                >
                  <Navigation size={16} /> Open & Navigate in Workspace →
                </TouchableOpacity>
              )}
            </View>

            {/* Right 50%: Job Details */}
            <View style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, background: 'var(--surface)' }}>
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View>
                  <Text style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                    Target Treatment & Service
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
                  <Text style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
                    Customer Price: Rs. {rawPrice}
                  </Text>
                </View>
              </View>

              <View className="field-grid">
                <View className="field-box" style={{ background: '#FFFFFF' }}>
                  <View className="field-label">Property Size</View>
                  <View className="field-value">{booking?.sizeLabel || '2 BHK Apartment (1,250 sq.ft)'}</View>
                  <View className="field-sub">Pre & Post Treatment Quality Audit</View>
                </View>

                <View className="field-box" style={{ background: '#FFFFFF' }}>
                  <View className="field-label">Scheduled Time Slot</View>
                  <View className="field-value">{booking?.slot || '01:00 PM - 03:00 PM'}</View>
                  <View className="field-sub">Priority Same-Day Dispatch</View>
                </View>
              </View>

              <View className="field-box" style={{ background: '#FFFFFF' }}>
                <View className="field-label">Inspection & Chemical Requirement</View>
                <View className="field-value" style={{ fontSize: '0.88rem' }}>
                  Mandatory Pre-Treatment Inspection & Post-Treatment Seam Check
                </View>
                <View className="field-sub">
                  Chemical: Fipronil 0.05% Gel + Deltamethrin 2.5% EC (CIB&RC Certified)
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

      {/* SUBHEADING: Queue State */}
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
                {/* Left 50%: Masked Customer Preview */}
                <View style={{ padding: 20, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Text className="badge badge-neutral" style={{ fontWeight: 800 }}>Queue #{idx + 1}</Text>
                      <Text style={{ fontWeight: 800, fontSize: '0.95rem' }}>{job.id}</Text>
                    </View>
                    <Text className="badge badge-amber">Scheduled: {job.scheduledTime.split(' - ')[0]}</Text>
                  </View>

                  <View className="field-grid">
                    <View className="field-box">
                      <View className="field-label">Customer Name</View>
                      <View className="field-value">{job.customerMasked}</View>
                      <View className="field-sub">Locked until active job completion</View>
                    </View>
                    <View className="field-box">
                      <View className="field-label">Contact Proxy</View>
                      <View className="field-value">{job.phoneMasked}</View>
                      <View className="field-sub">Direct line masked</View>
                    </View>
                  </View>

                  <View className="field-box">
                    <View className="field-label">Locality & Distance</View>
                    <View className="field-value">{job.area}</View>
                    <View className="field-sub">📍 {job.distance} from South Central Hub</View>
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
                    <View className="field-label">Inspection & Site Notes</View>
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

export default WorkerOverviewSection;

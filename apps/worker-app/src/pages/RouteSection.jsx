import React from 'react';
import { View, Text } from '@pest-free/ui-kit';
import { CheckCircle2, Star, IndianRupee, Check } from 'lucide-react';
import { COMPLETED_STOPS } from '../constants.js';

export function RouteSection({ toast, onNavigate }) {
  const completedStops = COMPLETED_STOPS;
  const totalPayout = completedStops.reduce((sum, s) => sum + s.payout, 0);

  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 3 KPI Cards for Completed Stops */}
      <View className="dashboard-grid-3">
        <View className="kpi-card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>
              Stops Completed Today
            </Text>
            <CheckCircle2 size={18} color="var(--primary)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)' }}>
            {completedStops.length} Stops
          </View>
          <View className="kpi-foot">Audit log of 100% finished treatments</View>
        </View>

        <View className="kpi-card" style={{ borderLeft: '4px solid var(--success)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>
              Quality & Customer Reviews
            </Text>
            <Star size={18} color="var(--success)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--success)' }}>
            100% 5-Star
          </View>
          <View className="kpi-foot">Verified homeowner signatures & OTPs</View>
        </View>

        <View className="kpi-card" style={{ borderLeft: '4px solid var(--primary-dark)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>
              Settled Route Payout
            </Text>
            <IndianRupee size={18} color="var(--primary-dark)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
            Rs. {totalPayout}
          </View>
          <View className="kpi-foot">Includes travel allowance & safety bonus</View>
        </View>
      </View>

      {/* Completed Stops Table */}
      <View className="web-card">
        <View className="card-header-row" style={{ flexWrap: 'wrap' }}>
          <View>
            <h2 className="card-title">Completed Route History & Warranty Registry</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginTop: 2 }}>
              Official audit log of jobs completed by Arjun Sharma (CHL-2024-889) today.
            </p>
          </View>
          <Text className="badge badge-green">4 Verified Closures</Text>
        </View>

        <View className="web-table-wrap">
          <table className="web-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Time Slot</th>
                <th>Customer & Locality</th>
                <th>Treatment & Chemical</th>
                <th>Payout</th>
                <th>Status</th>
                <th>Warranty Period & Expiry</th>
              </tr>
            </thead>
            <tbody>
              {completedStops.map((stop) => (
                <tr key={stop.id}>
                  <td style={{ fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>
                    #{stop.id}
                  </td>
                  <td style={{ fontWeight: 600 }}>{stop.time}</td>
                  <td>
                    <View style={{ fontWeight: 700 }}>{stop.customer}</View>
                    <View style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>{stop.area}</View>
                  </td>
                  <td>
                    <View style={{ fontWeight: 600 }}>{stop.service}</View>
                    <View style={{ fontSize: '0.76rem', color: 'var(--ink-muted)' }}>{stop.chemical}</View>
                  </td>
                  <td style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>
                    Rs. {stop.payout}
                  </td>
                  <td>
                    <Text className="badge badge-green">
                      <Check size={12} /> {stop.status}
                    </Text>
                  </td>
                  <td>
                    <View style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--ink)' }}>{stop.warranty}</View>
                    <View style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>Expires: {stop.expiryDate}</View>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </View>
      </View>
    </View>
  );
}

export default RouteSection;

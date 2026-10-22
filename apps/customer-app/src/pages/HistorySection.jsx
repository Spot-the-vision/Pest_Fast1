import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ModalDialog } from '@pest-free/ui-kit';
import { Bug, Award, RefreshCw } from 'lucide-react';
import { useAppStore } from '../lib/api/store.js';

export function HistorySection({ toast, onNavigate }) {
  const { history, rebookFromHistory } = useAppStore();
  const [certModalItem, setCertModalItem] = useState(null);

  return (
    <View>
      <View className="dashboard-grid-3" style={{ marginBottom: 24 }}>
        <View className="web-card">
          <View className="field-label">Total Treatments</View>
          <View style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, marginTop: 6 }}>
            {history.length} Bookings
          </View>
          <View className="field-sub">100% CIB&RC Eco-Safe Formulations</View>
        </View>

        <View className="web-card">
          <View className="field-label">Active Warranty Cover</View>
          <View style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--success)', marginTop: 6 }}>
            Protected
          </View>
          <View className="field-sub">Free emergency re-service included</View>
        </View>

        <View className="web-card">
          <View className="field-label">Homeowner Loyalty Tier</View>
          <View style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginTop: 6 }}>
            Shield Member
          </View>
          <View className="field-sub">Priority dispatch in under 60 mins</View>
        </View>
      </View>

      <View className="web-card">
        <View className="card-header-row">
          <View>
            <h2 className="card-title">Past Bookings, Warranty Certificates & 1-Click Rebook</h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 2 }}>
              Inspect your chemical warranty certificates or pre-fill a repeat treatment in 1 click.
            </p>
          </View>
          <TouchableOpacity className="btn btn-primary btn-sm" onClick={() => onNavigate('book')}>
            <Bug size={15} /> Book New Service
          </TouchableOpacity>
        </View>

        <View className="web-table-wrap">
          <table className="web-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Treatment & Plan</th>
                <th>Service Address</th>
                <th>Technician</th>
                <th>Amount</th>
                <th>Status & Rating</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => {
                const amt =
                  typeof item.price === 'number'
                    ? item.price
                    : item.price?.total ?? item.pricing?.total ?? 1299;
                return (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                      #{item.id}
                    </td>
                    <td>
                      <View style={{ fontWeight: 700 }}>{item.pestLabel}</View>
                      <View style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
                        {item.planLabel} • {item.sizeLabel}
                      </View>
                    </td>
                    <td style={{ maxWidth: 260 }}>
                      <View style={{ fontSize: '0.84rem' }}>{item.address}</View>
                    </td>
                    <td>
                      <View style={{ fontWeight: 600 }}>{item.technicianName || 'Arjun Sharma'}</View>
                      <View style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                        {item.licenseCode || 'CHL-2024-889'}
                      </View>
                    </td>
                    <td style={{ fontWeight: 800, color: 'var(--primary)' }}>Rs. {amt}</td>
                    <td>
                      <Text
                        className={`badge ${
                          item.status === 'COMPLETED' ? 'badge-green' : 'badge-red'
                        }`}
                      >
                        {item.status}
                      </Text>
                      {item.rating && (
                        <View style={{ fontSize: '0.78rem', color: '#8A5A00', fontWeight: 700, marginTop: 4 }}>
                          ★ {item.rating}/5 Rated
                        </View>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <View style={{ display: 'inline-flex', gap: 8 }}>
                        {item.status === 'COMPLETED' && (
                          <TouchableOpacity
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => setCertModalItem(item)}
                          >
                            <Award size={14} /> Warranty Certificate
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            rebookFromHistory(item);
                            onNavigate('book');
                            toast(`Pre-filled booking form from #${item.id}!`, 'success');
                          }}
                        >
                          <RefreshCw size={14} /> Rebook
                        </TouchableOpacity>
                      </View>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </View>
      </View>

      {/* Warranty Certificate Modal */}
      <ModalDialog
        open={Boolean(certModalItem)}
        onClose={() => setCertModalItem(null)}
        title={`CIB&RC Treatment & Warranty Certificate (#${certModalItem?.id})`}
        icon={Award}
      >
        {certModalItem && (
          <View style={{ display: 'grid', gap: 14 }}>
            <View
              className="web-card-surface"
              style={{
                border: '2px solid var(--primary)',
                background: 'var(--primary-light)',
              }}
            >
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <View style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)' }}>
                    Official Warranty Coverage
                  </View>
                  <View style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: 2 }}>
                    {certModalItem.warrantyDays || 90}-Day Free Re-Service Guarantee
                  </View>
                </View>
                <Text className="badge badge-green">Active Cover</Text>
              </View>
            </View>

            <View className="field-grid">
              <View className="field-box">
                <View className="field-label">Treatment Performed</View>
                <View className="field-value">{certModalItem.pestLabel}</View>
                <View className="field-sub">{certModalItem.planLabel}</View>
              </View>
              <View className="field-box">
                <View className="field-label">Certified Technician</View>
                <View className="field-value">{certModalItem.technicianName || 'Arjun Sharma'}</View>
                <View className="field-sub">Govt License: {certModalItem.licenseCode || 'CHL-2024-889'}</View>
              </View>
            </View>

            <View className="field-box">
              <View className="field-label">Approved Chemical Formulation Used</View>
              <View className="field-value">
                {certModalItem.chemicalUsed || 'Fipronil 0.05% Odorless Gel & Deltamethrin 2.5% EC'}
              </View>
            </View>

            <View className="field-box">
              <View className="field-label">Protected Property Address</View>
              <View className="field-value">{certModalItem.address}</View>
            </View>

            <View style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
              <TouchableOpacity
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  rebookFromHistory(certModalItem);
                  setCertModalItem(null);
                  onNavigate('book');
                  toast('Loaded warranty re-service into booking configurator!', 'success');
                }}
              >
                <RefreshCw size={16} /> Book Free Warranty Re-Visit
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ModalDialog>
    </View>
  );
}

export default HistorySection;

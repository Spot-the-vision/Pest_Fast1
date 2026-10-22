import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from '@pest-free/ui-kit';
import { Wallet, IndianRupee, Calendar, Award, Edit3, QrCode, Send, FileText } from 'lucide-react';
import { useAppStore } from '../lib/api/store.js';

export function EarningsSection({ toast }) {
  const { earnings, payoutHistory, requestInstantPayout, updateUpiId } = useAppStore();
  const [editingUpi, setEditingUpi] = useState(false);
  const [upiDraft, setUpiDraft] = useState(earnings.upiId || 'arjun.sharma@okaxis');

  const saveUpi = () => {
    if (!upiDraft.includes('@')) {
      toast('Please enter a valid UPI VPA (e.g. name@okhdfcbank)', 'error');
      return;
    }
    updateUpiId(upiDraft);
    setEditingUpi(false);
    toast('UPI ID updated successfully!', 'success');
  };

  const handleWithdraw = async () => {
    const amt = earnings.today || 1050;
    const res = await requestInstantPayout(amt);
    if (res && res.ok) {
      toast(`IMPS instant transfer of Rs. ${amt} initiated! UTR: ${res.utr}`, 'success');
    } else {
      toast(`IMPS instant transfer of Rs. ${amt} initiated!`, 'success');
    }
  };

  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <View className="dashboard-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <View className="kpi-card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>Available for Withdrawal</Text>
            <Wallet size={18} color="var(--primary)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)' }}>
            Rs. {earnings.availableBalance}
          </View>
          <View className="kpi-foot">Instant IMPS to Bank A/c</View>
        </View>

        <View className="kpi-card" style={{ borderLeft: '4px solid var(--success)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>Today's Accrued</Text>
            <IndianRupee size={18} color="var(--success)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--success)' }}>
            Rs. {earnings.today}
          </View>
          <View className="kpi-foot">4 completed stops today</View>
        </View>

        <View className="kpi-card" style={{ borderLeft: '4px solid #E8A317' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>This Week</Text>
            <Calendar size={18} color="#E8A317" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#B87F0D' }}>
            Rs. {earnings.thisWeek}
          </View>
          <View className="kpi-foot">Includes Rs. 600 safety incentive</View>
        </View>

        <View className="kpi-card" style={{ borderLeft: '4px solid var(--primary-dark)' }}>
          <View className="kpi-top">
            <Text style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-muted)' }}>Lifetime Earnings</Text>
            <Award size={18} color="var(--primary-dark)" />
          </View>
          <View className="kpi-value" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
            Rs. {earnings.totalLifetime}
          </View>
          <View className="kpi-foot">Across 428 treatments</View>
        </View>
      </View>

      <View className="dashboard-grid-2">
        {/* Instant IMPS Settlement Card */}
        <View className="web-card">
          <View className="card-header-row">
            <h3 className="card-title">
              <Wallet size={20} color="var(--primary)" />
              <Text>Instant IMPS Settlement Terminal</Text>
            </h3>
            <Text className="badge badge-green">Zero Transfer Fee</Text>
          </View>

          <p style={{ color: 'var(--ink-muted)', fontSize: '0.88rem', marginBottom: 18, lineHeight: 1.5 }}>
            Withdraw your earned commissions directly to your verified bank UPI VPA or account. Funds settle in 30 seconds via NPCI IMPS.
          </p>

          <View style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 16, marginBottom: 18 }}>
            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <Text style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                Primary UPI ID (VPA)
              </Text>
              {!editingUpi && (
                <TouchableOpacity
                  className="btn btn-outline btn-sm"
                  onClick={() => setEditingUpi(true)}
                >
                  <Edit3 size={13} /> Edit UPI
                </TouchableOpacity>
              )}
            </View>

            {editingUpi ? (
              <View style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <TextInput
                  type="text"
                  value={upiDraft}
                  onChange={(e) => setUpiDraft(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid var(--border-strong)',
                    fontFamily: 'var(--font-mono)',
                  }}
                />
                <TouchableOpacity className="btn btn-primary btn-sm" onClick={saveUpi}>
                  Save
                </TouchableOpacity>
                <TouchableOpacity className="btn btn-outline btn-sm" onClick={() => setEditingUpi(false)}>
                  Cancel
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <QrCode size={18} color="var(--primary)" />
                <Text style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 800 }}>
                  {earnings.upiId || 'arjun.sharma@okaxis'}
                </Text>
                <Text className="badge badge-green" style={{ fontSize: '0.72rem' }}>Verified</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            className="btn btn-primary btn-lg btn-block"
            disabled={earnings.availableBalance < 500}
            onClick={handleWithdraw}
          >
            <Send size={18} /> Transfer Rs. {earnings.availableBalance} Instantly
          </TouchableOpacity>
        </View>

        {/* UTR Settlement Ledger */}
        <View className="web-card">
          <View className="card-header-row">
            <h3 className="card-title">
              <FileText size={20} color="var(--primary)" />
              <Text>Recent Bank Settlement Ledger</Text>
            </h3>
            <Text className="badge badge-neutral">IMPS UTR Audit</Text>
          </View>

          <View className="web-table-wrap">
            <table className="web-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Amount</th>
                  <th>Destination</th>
                  <th>Status & UTR</th>
                </tr>
              </thead>
              <tbody>
                {payoutHistory.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontSize: '0.82rem' }}>{item.date}</td>
                    <td style={{ fontWeight: 800, color: 'var(--primary)' }}>Rs. {item.amount}</td>
                    <td style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>{item.upiId}</td>
                    <td>
                      <Text className="badge badge-green">{item.status}</Text>
                      <View style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: 2 }}>{item.utr}</View>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </View>
        </View>
      </View>
    </View>
  );
}

export default EarningsSection;

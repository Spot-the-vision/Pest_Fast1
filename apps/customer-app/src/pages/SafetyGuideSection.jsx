import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from '@pest-free/ui-kit';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BUNDLED_CHEMICAL_SHEETS, SAFETY_CHECKLIST_STEPS } from '../lib/api/index.js';

export function SafetyGuideSection() {
  const [selectedSheet, setSelectedSheet] = useState(BUNDLED_CHEMICAL_SHEETS[0]);

  return (
    <View>
      <View className="dashboard-grid-2">
        <View className="web-card">
          <View className="card-header-row">
            <View>
              <h2 className="card-title">
                <ShieldCheck size={20} color="var(--primary)" />
                <Text>Homeowner Chemical Transparency & CIB&RC Guide</Text>
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 2 }}>
                Every chemical used in your home is Government of India CIB&RC registered. Inspect child, pet, and re-entry safety notes below.
              </p>
            </View>
          </View>

          <View style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
            {BUNDLED_CHEMICAL_SHEETS.map((s) => (
              <TouchableOpacity
                key={s.id}
                type="button"
                className={`stage-pill-btn ${selectedSheet.id === s.id ? 'active' : ''}`}
                onClick={() => setSelectedSheet(s)}
              >
                {s.name}
              </TouchableOpacity>
            ))}
          </View>

          {selectedSheet && (
            <View className="web-card-surface">
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <View>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-dark)' }}>
                    {selectedSheet.name}
                  </h3>
                  <View style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                    CIB&RC Reg: <strong>{selectedSheet.cibrcReg}</strong>
                  </View>
                </View>
                <Text className="badge badge-green">
                  Safe Re-Entry:{' '}
                  {selectedSheet.reEntryMinutes === 0
                    ? 'Immediate (0 mins)'
                    : `${selectedSheet.reEntryMinutes} mins`}
                </Text>
              </View>

              <View className="field-grid" style={{ marginBottom: 12 }}>
                <View className="field-box" style={{ background: '#FFFFFF' }}>
                  <View className="field-label">Active Ingredient</View>
                  <View className="field-value" style={{ fontSize: '0.9rem' }}>
                    {selectedSheet.activeIngredient}
                  </View>
                </View>
                <View className="field-box" style={{ background: '#FFFFFF' }}>
                  <View className="field-label">Target Pests Controlled</View>
                  <View className="field-value" style={{ fontSize: '0.9rem' }}>
                    {selectedSheet.targetPests}
                  </View>
                </View>
              </View>

              <View className="field-box" style={{ background: '#FFFFFF' }}>
                <View className="field-label">Homeowner First-Aid & Precaution Note</View>
                <View style={{ fontSize: '0.86rem', lineHeight: 1.5, marginTop: 4 }}>
                  {selectedSheet.firstAidSkinEye}
                </View>
              </View>
            </View>
          )}
        </View>

        <View className="web-card">
          <h2 className="card-title" style={{ marginBottom: 14 }}>
            <CheckCircle2 size={20} color="var(--success)" />
            <Text>6-Step Homeowner Preparation & Post-Care Checklist</Text>
          </h2>
          <View style={{ display: 'grid', gap: 10 }}>
            {SAFETY_CHECKLIST_STEPS.map((step, i) => (
              <View key={i} className="field-box">
                <View style={{ fontWeight: 800, color: 'var(--primary-dark)' }}>
                  Step {i + 1}: {step.title}
                </View>
                <View style={{ fontSize: '0.84rem', color: 'var(--ink-muted)', marginTop: 3 }}>
                  {step.description}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

export default SafetyGuideSection;

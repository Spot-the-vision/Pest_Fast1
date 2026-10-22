import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from '@pest-free/ui-kit';
import { FileText, HeartPulse, ShieldCheck } from 'lucide-react';
import { BUNDLED_CHEMICAL_SHEETS } from '../lib/api/index.js';

export function SafetySection({ toast, openExposureModal }) {
  const [selectedChem, setSelectedChem] = useState(BUNDLED_CHEMICAL_SHEETS[0]);

  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <View className="web-card">
        <View className="card-header-row" style={{ flexWrap: 'wrap', gap: 12 }}>
          <View>
            <h2 className="card-title">
              <FileText size={22} color="var(--primary)" />
              <Text>CIB&RC Chemical Safety Data Sheets (CSDS)</Text>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginTop: 2 }}>
              Official government-approved formulations, exact dilution ratios, mandatory PPE gear, and emergency antidotes.
            </p>
          </View>
          <TouchableOpacity
            className="btn btn-danger btn-sm"
            onClick={openExposureModal}
          >
            <HeartPulse size={15} /> Emergency Exposure Protocol
          </TouchableOpacity>
        </View>

        {/* Formulation Selector Pills */}
        <View style={{ display: 'flex', gap: 8, margin: '16px 0', flexWrap: 'wrap' }}>
          {BUNDLED_CHEMICAL_SHEETS.map((sheet) => (
            <TouchableOpacity
              key={sheet.id}
              className={`stage-pill-btn ${selectedChem.id === sheet.id ? 'active' : ''}`}
              onClick={() => setSelectedChem(sheet)}
              style={selectedChem.id === sheet.id ? { background: 'var(--primary)', color: '#FFFFFF', borderColor: 'var(--primary)' } : {}}
            >
              {sheet.name}
            </TouchableOpacity>
          ))}
        </View>

        {selectedChem && (
          <View className="web-card-surface" style={{ padding: 20, borderRadius: 16 }}>
            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <View>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-dark)', margin: 0 }}>
                  {selectedChem.name}
                </h3>
                <View style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginTop: 3 }}>
                  Govt Reg No: <strong>{selectedChem.cibrcReg}</strong> &bull; Active: {selectedChem.activeIngredient}
                </View>
              </View>
              <Text className="badge badge-amber" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                Re-entry Safe Time: {selectedChem.reEntryMinutes} mins
              </Text>
            </View>

            <View className="field-grid" style={{ marginBottom: 16 }}>
              <View className="field-box" style={{ background: '#FFFFFF' }}>
                <View className="field-label">Prescribed Dilution Ratio</View>
                <View className="field-value" style={{ fontSize: '0.95rem' }}>
                  {selectedChem.dilutionRatio}
                </View>
                <View className="field-sub">Never exceed prescribed active concentration</View>
              </View>

              <View className="field-box" style={{ background: '#FFFFFF' }}>
                <View className="field-label">Target Pests</View>
                <View className="field-value" style={{ fontSize: '0.95rem' }}>
                  {selectedChem.targetPests}
                </View>
                <View className="field-sub">Indoor & perimeter crevice application</View>
              </View>
            </View>

            <View className="field-box" style={{ background: '#FFFFFF', marginBottom: 16 }}>
              <View className="field-label">Mandatory Personal Protective Equipment (PPE)</View>
              <View style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                {selectedChem.requiredPpe.map((ppe, idx) => (
                  <Text key={idx} className="badge badge-green" style={{ padding: '6px 12px', fontSize: '0.82rem' }}>
                    <ShieldCheck size={14} /> {ppe}
                  </Text>
                ))}
              </View>
            </View>

            <View className="field-box" style={{ background: '#FFFFFF', border: '1.5px solid var(--danger-light)' }}>
              <View className="field-label" style={{ color: 'var(--danger)', fontWeight: 800 }}>
                First-Aid & Medical Antidote Protocol
              </View>
              <View style={{ fontSize: '0.88rem', lineHeight: 1.6, marginTop: 8 }}>
                <p><strong>Dermal / Eye Contact:</strong> {selectedChem.firstAidSkinEye}</p>
                <p style={{ marginTop: 4 }}><strong>Respiratory Inhalation:</strong> {selectedChem.firstAidInhalation}</p>
                <p style={{ marginTop: 4 }}><strong>Specific Antidote:</strong> <span style={{ color: 'var(--danger)', fontWeight: 700 }}>{selectedChem.antidote}</span></p>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

export default SafetySection;

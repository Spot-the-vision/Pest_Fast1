import { BUNDLED_CHEMICAL_SHEETS } from '@pest-free/shared-config';

/**
 * Grounded Worker Safety Assistant
 * Answers strictly from CIB&RC data sheets.
 */
export function answerWorkerSafetyQuestion(question) {
  const q = (question || '').toLowerCase().trim();
  if (!q) {
    return {
      answer: 'Ask me about dilution ratios, required PPE, re-entry time, or first-aid from the bundled Deltamethrin, Imidacloprid, or Fipronil data sheets.',
      matchedSheetId: null,
      known: false,
    };
  }

  let sheet;
  if (q.includes('deltamethrin') || q.includes('bedbug') || q.includes('2.5%')) {
    sheet = BUNDLED_CHEMICAL_SHEETS[0];
  } else if (q.includes('imidacloprid') || q.includes('termite') || q.includes('30.5%') || q.includes('drill')) {
    sheet = BUNDLED_CHEMICAL_SHEETS[1];
  } else if (q.includes('fipronil') || q.includes('gel') || q.includes('cockroach') || q.includes('kitchen')) {
    sheet = BUNDLED_CHEMICAL_SHEETS[2];
  }

  const asksDilution = q.includes('dilut') || q.includes('mix') || q.includes('ratio') || q.includes('ml') || q.includes('water');
  const asksPpe = q.includes('ppe') || q.includes('glove') || q.includes('mask') || q.includes('wear') || q.includes('goggle');
  const asksFirstAid =
    q.includes('eye') ||
    q.includes('skin') ||
    q.includes('splash') ||
    q.includes('inhale') ||
    q.includes('swallow') ||
    q.includes('ingest') ||
    q.includes('first aid') ||
    q.includes('antidote') ||
    q.includes('spill');
  const asksReEntry = q.includes('re-entry') || q.includes('reentry') || q.includes('wait') || q.includes('enter') || q.includes('minutes');

  if (sheet) {
    if (asksDilution) {
      return {
        answer: `${sheet.name}: ${sheet.dilutionRatio} (Reg: ${sheet.cibrcReg}).`,
        matchedSheetId: sheet.id,
        known: true,
      };
    }
    if (asksPpe) {
      return {
        answer: `${sheet.name} requires: ${sheet.requiredPpe.join(', ')}.`,
        matchedSheetId: sheet.id,
        known: true,
      };
    }
    if (asksReEntry) {
      return {
        answer: `${sheet.name} re-entry time: ${
          sheet.reEntryMinutes === 0
            ? '0 minutes (immediate re-entry safe)'
            : `${sheet.reEntryMinutes} minutes of ventilation before residents re-enter`
        }.`,
        matchedSheetId: sheet.id,
        known: true,
      };
    }
    if (asksFirstAid) {
      return {
        answer: `${sheet.name} First Aid — Skin/Eye: ${sheet.firstAidSkinEye} Inhalation: ${sheet.firstAidInhalation} Antidote: ${sheet.antidote}`,
        matchedSheetId: sheet.id,
        known: true,
      };
    }
    return {
      answer: `${sheet.name} (${sheet.cibrcReg}): Mix at ${sheet.dilutionRatio}. PPE: ${sheet.requiredPpe.join(', ')}. Re-entry: ${sheet.reEntryMinutes} mins. First-aid: ${sheet.firstAidSkinEye}`,
      matchedSheetId: sheet.id,
      known: true,
    };
  }

  if (asksFirstAid) {
    return {
      answer:
        'From bundled sheets: Flush skin or eyes with clean running water for 15 minutes. Move to fresh air if inhaled. Do NOT induce vomiting if ingested. Call National Poison Centre at 1800-11-2233. Specify Deltamethrin, Imidacloprid, or Fipronil for exact antidote notes.',
      matchedSheetId: null,
      known: true,
    };
  }
  if (asksDilution) {
    return {
      answer:
        'Bundled dilution ratios: Deltamethrin 2.5% EC = 20 ml/L water; Imidacloprid 30.5% SC = 2.1 ml/L water; Fipronil 0.05% Gel = ready-to-use (0.03 g dots).',
      matchedSheetId: null,
      known: true,
    };
  }

  return {
    answer:
      "I don't know based on the bundled safety data sheets. I only have verified data for Deltamethrin 2.5% EC, Imidacloprid 30.5% SC, and Fipronil 0.05% Gel. For other chemicals, contact the Agency Safety Desk or Poison Control (1800-11-2233).",
    matchedSheetId: null,
    known: false,
  };
}

/**
 * Shared CIB&RC Chemical Safety Data Sheets & Knowledge Base
 * Pure JavaScript module without TypeScript or HTML.
 */

export const BUNDLED_CHEMICAL_SHEETS = [
  {
    id: 'deltamethrin_25ec',
    name: 'Deltamethrin 2.5% EC (Emulsifiable Concentrate)',
    activeIngredient: 'Deltamethrin 2.5% w/w',
    cibrcReg: 'CIR-14221/92/Deltamethrin(EC)-412',
    targetPests: 'Bedbugs, cockroaches, flies, mosquitoes (outdoor/perimeter)',
    dilutionRatio: '20 ml per 1 Litre of clean water (1:50)',
    reEntryMinutes: 120,
    requiredPpe: ['Nitrile gloves', 'Chemical goggles', 'Organic-vapour respirator (N95+)', 'Full sleeve coverall'],
    firstAidInhalation: 'Move victim to fresh air immediately. Keep warm and at rest. Seek urgent medical aid.',
    firstAidSkinEye: 'Flush with copious clean water for at least 15 minutes. Remove contaminated clothes.',
    firstAidIngestion: 'Do NOT induce vomiting. Rinse mouth with water. Call Poison Centre (1800-11-2233).',
    antidote: 'No specific antidote. Symptomatic therapy (Diazepam for tremors/convulsions).',
  },
  {
    id: 'imidacloprid_305sc',
    name: 'Imidacloprid 30.5% SC (Suspension Concentrate)',
    activeIngredient: 'Imidacloprid 30.5% w/w',
    cibrcReg: 'CIR-28901/98/Imidacloprid(SC)-810',
    targetPests: 'Subterranean termites, woodborers, post-construction barriers',
    dilutionRatio: '2.1 ml per 1 Litre of water (0.05% active concentration)',
    reEntryMinutes: 180,
    requiredPpe: ['Heavy-duty neoprene gloves', 'Safety goggles', 'Dust/mist half-mask', 'Rubber boots'],
    firstAidInhalation: 'Move to fresh air. If not breathing, give artificial respiration and call emergency.',
    firstAidSkinEye: 'Wash skin thoroughly with soap and copious water. Rinse eyes for 15 minutes.',
    firstAidIngestion: 'Rinse mouth. Give activated charcoal if conscious. Do NOT induce vomiting.',
    antidote: 'Supportive and symptomatic treatment. Monitor cardiac and respiratory vitals.',
  },
  {
    id: 'fipronil_005gel',
    name: 'Fipronil 0.05% Odorless Gel Bait',
    activeIngredient: 'Fipronil 0.05% w/w Ready-to-use Bait Matrix',
    cibrcReg: 'CIR-55190/2023-Fipronil(Gel)',
    targetPests: 'German and American cockroaches in kitchens and electrical hinges',
    dilutionRatio: 'Ready to use — apply 1–2 pea-sized dots (0.03 g) per sq metre',
    reEntryMinutes: 0,
    requiredPpe: ['Disposable nitrile gloves'],
    firstAidInhalation: 'Not volatile; inhalation hazard is negligible under normal use.',
    firstAidSkinEye: 'Wipe off gel with dry cloth, then wash skin with soap and water.',
    firstAidIngestion: 'Rinse mouth thoroughly. Drink 1 glass of water and consult poison control.',
    antidote: 'Symptomatic and supportive therapy.',
  },
];

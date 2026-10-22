import { PEST_TYPES, PROPERTY_SIZES, TREATMENT_PLANS } from '@pest-free/shared-config';

/**
 * Pure pricing function: base * size * plan + 18% GST.
 * Inspection-first requires Rs 0 advance.
 */
export function calculatePrice(pestType, propertySize, plan, dispatchMode) {
  const pest = PEST_TYPES.find((p) => p.id === pestType) ?? PEST_TYPES[0];
  const size = PROPERTY_SIZES.find((s) => s.id === propertySize) ?? PROPERTY_SIZES[0];
  const planObj = TREATMENT_PLANS.find((pl) => pl.id === plan) ?? TREATMENT_PLANS[0];

  const subtotal = Math.round(pest.basePrice * size.multiplier * planObj.multiplier);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;
  const payableNow = dispatchMode === 'inspection' ? 0 : total;

  return {
    basePrice: pest.basePrice,
    sizeMultiplier: size.multiplier,
    planMultiplier: planObj.multiplier,
    subtotal,
    gst,
    total,
    payableNow,
  };
}

/**
 * Multi-service pricing calculator:
 * Sums base prices of all selected pests (with 15% bundle discount if 2+ pests),
 * then applies size & plan multipliers + 18% GST.
 */
export function calculateMultiServicePrice(pestTypes, propertySize, plan, dispatchMode) {
  if (!pestTypes || pestTypes.length === 0) {
    const size = PROPERTY_SIZES.find((s) => s.id === propertySize) ?? PROPERTY_SIZES[0];
    const planObj = TREATMENT_PLANS.find((pl) => pl.id === plan) ?? TREATMENT_PLANS[0];
    return {
      basePrice: 0,
      sizeMultiplier: size ? size.multiplier : 1,
      planMultiplier: planObj ? planObj.multiplier : 1,
      subtotal: 0,
      gst: 0,
      total: 0,
      payableNow: 0,
      bundleDiscount: 0,
      pests: [],
    };
  }
  const selectedPests = pestTypes.map((id) => PEST_TYPES.find((p) => p.id === id) ?? PEST_TYPES[0]);

  const rawSum = selectedPests.reduce((acc, p) => acc + p.basePrice, 0);
  const bundleDiscount = selectedPests.length > 1 ? Math.round(rawSum * 0.15) : 0;
  const effectiveBase = rawSum - bundleDiscount;

  const size = PROPERTY_SIZES.find((s) => s.id === propertySize) ?? PROPERTY_SIZES[0];
  const planObj = TREATMENT_PLANS.find((pl) => pl.id === plan) ?? TREATMENT_PLANS[0];

  const subtotal = Math.round(effectiveBase * size.multiplier * planObj.multiplier);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;
  const payableNow = dispatchMode === 'inspection' ? 0 : total;

  return {
    basePrice: effectiveBase,
    sizeMultiplier: size.multiplier,
    planMultiplier: planObj.multiplier,
    subtotal,
    gst,
    total,
    payableNow,
    bundleDiscount,
    pests: selectedPests,
  };
}

/**
 * Deterministic Smart Quote Recommendation Engine
 */
export function generateSmartQuoteRecommendation({ pestType, propertySize, note = '' }) {
  const noteLower = (note || '').toLowerCase();
  const isRecurringOrSevere =
    noteLower.includes('everywhere') ||
    noteLower.includes('months') ||
    noteLower.includes('recurring') ||
    noteLower.includes('heavy') ||
    noteLower.includes('severe') ||
    noteLower.includes('wood') ||
    noteLower.includes('furniture');

  if (propertySize === 'commercial' || (pestType === 'termites' && isRecurringOrSevere)) {
    return {
      recommendedPlan: 'shield',
      reason:
        'For structural termite activity or commercial premises, Annual 360° shield covers 4 quarterly inspections and free emergency re-visits all year.',
    };
  }

  if (
    pestType === 'bedbugs' ||
    pestType === 'termites' ||
    isRecurringOrSevere ||
    propertySize === '3bhk' ||
    propertySize === '4bhk'
  ) {
    return {
      recommendedPlan: 'barrier',
      reason:
        'Dual-layer barrier combines targeted baiting with a 90-day residual seal to stop hidden eggs and secondary nesting.',
    };
  }

  return {
    recommendedPlan: 'standard',
    reason:
      'Eco standard gives odorless botanical knockdown with a 30-day re-service guarantee—ideal for mild or first-time sightings.',
  };
}

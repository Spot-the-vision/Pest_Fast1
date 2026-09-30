import { describe, it, expect } from 'vitest';
import {
  calculatePrice,
  scoreAndRankWorkers,
  transitionBooking,
  generateSmartQuoteRecommendation,
  answerWorkerSafetyQuestion,
  PEST_TYPES,
  PROPERTY_SIZES,
  TREATMENT_PLANS,
  SAFETY_STEPS_TEMPLATE,
} from '../index.ts';

// â”€â”€â”€ 1. calculatePrice â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

describe('calculatePrice', () => {
  it('inspection mode price object is defined with valid total', () => {
    const p = calculatePrice('cockroaches', '1bhk', 'standard', 'inspection');
    // The function returns the full quote; the store displays 0 advance for inspection
    expect(typeof p.total).toBe('number');
    expect(p.total).toBeGreaterThan(0);
  });

  it('treat_on_arrival: base x size x plan + 18% GST', () => {
    const pestBase = PEST_TYPES.find(p => p.id === 'cockroaches').basePrice;
    const sizeMul  = PROPERTY_SIZES.find(s => s.id === '1bhk').multiplier;
    const planMul  = TREATMENT_PLANS.find(p => p.id === 'standard').multiplier;
    const afterPlan = pestBase * sizeMul * planMul;
    const total = Math.round(afterPlan * 1.18);
    const p = calculatePrice('cockroaches', '1bhk', 'standard', 'treat_on_arrival');
    expect(p.total).toBeCloseTo(total, 0);
  });

  it('commercial size multiplier gives higher price than 1bhk', () => {
    const comm = calculatePrice('cockroaches', 'commercial', 'standard', 'treat_on_arrival');
    const bhk1 = calculatePrice('cockroaches', '1bhk', 'standard', 'treat_on_arrival');
    expect(comm.total).toBeGreaterThan(bhk1.total);
  });

  it('shield plan is more expensive than standard', () => {
    const shield = calculatePrice('cockroaches', '2bhk', 'shield', 'treat_on_arrival');
    const std    = calculatePrice('cockroaches', '2bhk', 'standard', 'treat_on_arrival');
    expect(shield.total).toBeGreaterThan(std.total);
  });
});

// â”€â”€â”€ 2. scoreAndRankWorkers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

describe('scoreAndRankWorkers', () => {
  const baseW = { licenseCode: 'LIC1', proxyPhone: '+91-1', realPhone: '+91-1', completedJobsCount: 10 };
  const workers = [
    { ...baseW, id: 'w1', name: 'Arjun', rating: 4.8, kycVerified: true, available: true, activeLoad: 0, lat: 12.97, lng: 77.59 },
    { ...baseW, id: 'w2', name: 'Deepak', rating: 4.5, kycVerified: false, available: true, activeLoad: 0, lat: 12.97, lng: 77.59 },
    { ...baseW, id: 'w3', name: 'Ravi', rating: 4.0, kycVerified: true, available: true, activeLoad: 2, lat: 12.98, lng: 77.60 },
    { ...baseW, id: 'w4', name: 'Suresh', rating: 4.9, kycVerified: true, available: false, activeLoad: 0, lat: 12.97, lng: 77.59 },
  ];

  function rank(ws, lat, lng) {
    try { return scoreAndRankWorkers(ws, { lat, lng }); }
    catch { return scoreAndRankWorkers(ws, lat, lng); }
  }

  it('excludes non-KYC workers', () => {
    const ranked = rank(workers, 12.97, 77.59);
    expect(ranked.find(w => w.id === 'w2')).toBeUndefined();
  });

  it('excludes unavailable workers', () => {
    const ranked = rank(workers, 12.97, 77.59);
    expect(ranked.find(w => w.id === 'w4')).toBeUndefined();
  });

  it('returns only KYC+available workers', () => {
    const ranked = rank(workers, 12.97, 77.59);
    expect(ranked.every(w => w.kycVerified && w.available)).toBe(true);
  });

  it('returns at least one worker from valid pool (w1 and w3 are KYC+available)', () => {
    const ranked = rank(workers, 12.97, 77.59);
    expect(ranked.length).toBeGreaterThan(0);
  });
});

// â”€â”€â”€ 3. transitionBooking â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function makeBooking(status) {
  return {
    id: 'BK001',
    status,
    pestType: 'cockroaches',
    pestLabel: 'Cockroaches',
    propertySize: '2bhk',
    sizeLabel: '2 BHK',
    plan: 'standard',
    planLabel: 'Standard',
    dispatchMode: 'treat_on_arrival',
    address: 'Flat 1, Test Road, Bengaluru - 560001',
    note: '',
    slot: '09:00 - 11:00 AM',
    day: 'today',
    price: { base: 799, total: 1410, gst: 216, baseWithSize: 1195, afterPlan: 1195, planMultiplier: 1 },
    createdAt: new Date().toISOString(),
    rating: null,
    ownerApproved: false,
    ownerUnlockedContact: false,
    whatsappPingCount: 0,
    etaSeconds: 12,
    initialEtaSeconds: 12,
    routeProgress: 0,
    startOtp: '4829',
    otpVerified: false,
    technician: null,
    safetySteps: (SAFETY_STEPS_TEMPLATE ?? []).map(s => ({ ...s })),
    afterPhotoDataUrl: null,
    workerPayout: 600,
    reviewComment: '',
  };
}

describe('transitionBooking - legal transitions', () => {
  it('BOOKING_PLACED to AGENCY_APPROVED', () => {
    const b = makeBooking('BOOKING_PLACED');
    const next = transitionBooking(b, { type: 'AGENCY_APPROVE' });
    expect(next.status).toBe('AGENCY_APPROVED');
  });

  it('AGENCY_APPROVED to TECHNICIAN_ACCEPTED', () => {
    const b = makeBooking('AGENCY_APPROVED');
    const next = transitionBooking(b, { type: 'WORKER_ACCEPT' });
    expect(next.status).toBe('TECHNICIAN_ACCEPTED');
  });

  it('TECHNICIAN_ACCEPTED to ON_THE_WAY via OWNER_UNLOCK_CONTACT', () => {
    const b = makeBooking('TECHNICIAN_ACCEPTED');
    const next = transitionBooking(b, { type: 'OWNER_UNLOCK_CONTACT' });
    expect(next.status).toBe('ON_THE_WAY');
  });

  it('ON_THE_WAY to ARRIVED when eta=0 and contact unlocked', () => {
    const b = { ...makeBooking('ON_THE_WAY'), etaSeconds: 0, ownerUnlockedContact: true };
    const next = transitionBooking(b, { type: 'WORKER_ARRIVE' });
    expect(next.status).toBe('ARRIVED');
  });

  it('ARRIVED to IN_PROGRESS with correct OTP', () => {
    const b = { ...makeBooking('ARRIVED'), ownerUnlockedContact: true, startOtp: '4829' };
    const next = transitionBooking(b, { type: 'VERIFY_OTP_AND_START', otp: '4829' });
    expect(next.status).toBe('IN_PROGRESS');
  });

  it('BOOKING_PLACED to CANCELLED', () => {
    const b = makeBooking('BOOKING_PLACED');
    const next = transitionBooking(b, { type: 'CANCEL_BOOKING' });
    expect(next.status).toBe('CANCELLED');
  });

  it('AGENCY_APPROVED to CANCELLED', () => {
    const b = makeBooking('AGENCY_APPROVED');
    const next = transitionBooking(b, { type: 'CANCEL_BOOKING' });
    expect(next.status).toBe('CANCELLED');
  });
});

describe('transitionBooking - illegal transitions', () => {
  it('BOOKING_PLACED to ON_THE_WAY throws', () => {
    const b = makeBooking('BOOKING_PLACED');
    expect(() => transitionBooking(b, { type: 'OWNER_UNLOCK_CONTACT' })).toThrow();
  });

  it('ON_THE_WAY to IN_PROGRESS without OTP throws', () => {
    const b = makeBooking('ON_THE_WAY');
    expect(() => transitionBooking(b, { type: 'VERIFY_OTP_AND_START', otp: '4829' })).toThrow();
  });

  it('COMPLETED to CANCEL_BOOKING throws', () => {
    const b = makeBooking('COMPLETED');
    expect(() => transitionBooking(b, { type: 'CANCEL_BOOKING' })).toThrow();
  });

  it('CANCELLED to AGENCY_APPROVE throws', () => {
    const b = makeBooking('CANCELLED');
    expect(() => transitionBooking(b, { type: 'AGENCY_APPROVE' })).toThrow();
  });

  it('ARRIVED to AGENCY_APPROVE throws', () => {
    const b = makeBooking('ARRIVED');
    expect(() => transitionBooking(b, { type: 'AGENCY_APPROVE' })).toThrow();
  });

  it('ON_THE_WAY with eta>0 to WORKER_ARRIVE throws (not arrived yet)', () => {
    const b = { ...makeBooking('ON_THE_WAY'), ownerUnlockedContact: true, etaSeconds: 5 };
    expect(() => transitionBooking(b, { type: 'WORKER_ARRIVE' })).toThrow();
  });
});

// â”€â”€â”€ 4. generateSmartQuoteRecommendation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

describe('generateSmartQuoteRecommendation', () => {
  it('recommends shield for termites in commercial property', () => {
    const rec = generateSmartQuoteRecommendation({ pestType: 'termites', propertySize: 'commercial', note: '' });
    expect(rec.recommendedPlan).toBe('shield');
  });

  it('recommends standard for cockroaches in 1bhk', () => {
    const rec = generateSmartQuoteRecommendation({ pestType: 'cockroaches', propertySize: '1bhk', note: '' });
    expect(rec.recommendedPlan).toBe('standard');
  });

  it('returns non-empty reason', () => {
    const rec = generateSmartQuoteRecommendation({ pestType: 'mosquitoes', propertySize: '2bhk', note: '' });
    expect(rec.reason.length).toBeGreaterThan(10);
  });
});

// â”€â”€â”€ 5. answerWorkerSafetyQuestion â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

describe('answerWorkerSafetyQuestion', () => {
  it('answers dilution from CSDS', () => {
    const res = answerWorkerSafetyQuestion('What is the dilution ratio for deltamethrin?');
    expect(res.known).toBe(true);
    expect(res.answer.toLowerCase()).toContain('deltamethrin');
  });

  it('answers first aid question', () => {
    const res = answerWorkerSafetyQuestion('First aid for fipronil skin contact');
    expect(res.known).toBe(true);
    expect(res.answer.length).toBeGreaterThan(20);
  });

  it('returns known=false for unrecognised question', () => {
    const res = answerWorkerSafetyQuestion('What is the weather like tomorrow in Tokyo?');
    expect(res.known).toBe(false);
  });

  it('declines out-of-scope chemical', () => {
    const res = answerWorkerSafetyQuestion('What about chlorpyrifos safety?');
    const lower = res.answer.toLowerCase();
    expect(lower.match(/don.t know|not know|bundled|contact|other chemical/i)).toBeTruthy();
  });
});
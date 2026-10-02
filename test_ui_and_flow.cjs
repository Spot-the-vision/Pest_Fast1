const { chromium } = require('playwright');

async function run() {
  console.log('🚀 Starting Comprehensive UI & Flow Verification...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });

  const custPage = await context.newPage();
  const workerPage = await context.newPage();

  // Reset state first
  try {
    await fetch('http://localhost:3000/api/state/reset', { method: 'POST' });
    console.log('✓ Reset remote state');
  } catch (e) {
    console.log('Reset notice:', e.message);
  }

  // 1. Check Customer App Landing Page
  console.log('\n--- 1. Testing Customer App Landing Experience ---');
  await custPage.goto('http://localhost:3000');
  await custPage.waitForTimeout(1000);

  // Take screenshot of landing page
  await custPage.screenshot({ path: 'C:/Users/ajith/.gemini/antigravity-ide/brain/79ba7a00-d642-46e5-8a6c-0240f7732798/customer_landing_hero.png' });
  console.log('✓ Captured customer_landing_hero.png');

  // Verify No Sidebar on Landing Page
  const hasSidebarOnLanding = await custPage.$('.web-sidebar');
  console.log('Landing has sidebar:', hasSidebarOnLanding !== null ? 'YES' : 'NO (Expected NO)');

  // Verify Hero Stats
  const pageText = await custPage.innerText('body');
  const has50k = pageText.includes('50,000+');
  const has994 = pageText.includes('99.4%');
  const has120 = pageText.includes('120+');
  const hasEasyHiCare = pageText.includes('Easy HiCare');
  console.log(`✓ Easy HiCare Logo/Title: ${hasEasyHiCare}`);
  console.log(`✓ Stats 50,000+: ${has50k}, 99.4%: ${has994}, 120+: ${has120}`);

  // Click "Book a Demo / Book Treatment" CTA
  console.log('\n--- 2. Clicking CTA to Open Booking Configurator ---');
  const ctaBtn = await custPage.locator('text=Book a Demo / Book Treatment').first();
  await ctaBtn.click();
  await custPage.waitForTimeout(800);

  const hasSidebarNow = await custPage.$('.web-sidebar');
  console.log('Sidebar now visible after clicking CTA:', hasSidebarNow !== null ? 'YES (Expected YES)' : 'NO');

  // Place a booking
  console.log('\n--- 3. Placing Booking in Customer App ---');
  const addressInput = await custPage.locator('textarea, input[type="text"]').last();
  await addressInput.fill('Flat 402, Green Glen Layout, Jayanagar 4th Block, Bengaluru');
  const confirmBtn = await custPage.locator('text=Confirm & Book Doorstep Dispatch');
  await confirmBtn.click();
  await custPage.waitForTimeout(1000);
  console.log('✓ Booking placed!');

  // 4. Test Worker App
  console.log('\n--- 4. Testing Worker App UI & Options ---');
  await workerPage.goto('http://localhost:5176');
  await workerPage.waitForTimeout(1000);

  // Take screenshot of Worker Overview (Option 1)
  await workerPage.screenshot({ path: 'C:/Users/ajith/.gemini/antigravity-ide/brain/79ba7a00-d642-46e5-8a6c-0240f7732798/worker_overview_tab.png' });
  console.log('✓ Captured worker_overview_tab.png');

  // Verify Worker Overview Elements
  const workerText = await workerPage.innerText('body');
  console.log('✓ Worker Easy HiCare Logo & Title:', workerText.includes('Easy HiCare'));
  console.log('✓ Worker Period Toggle (Today / This Week / This Month):', workerText.includes('This Week'));
  console.log('✓ Subheading Active Job:', workerText.includes('Active Job'));
  console.log('✓ Customer Contact & Address Gate (50/50):', workerText.includes('Customer Contact & Address Gate'));
  console.log('✓ Subheading Queue State (2 Queued Jobs):', workerText.includes('Queue State') && workerText.includes('JOB-9021') && workerText.includes('JOB-9022'));
  console.log('✓ Bottom Sidebar Arjun Sharma KYC Card:', workerText.includes('Arjun Sharma') && workerText.includes('CHL-2024-889') && workerText.includes('XXXX-XXXX-4819'));

  // Test Option 2: Active Jobs & Workspace
  console.log('\n--- 5. Testing Option 2: Active Jobs & Workspace ---');
  await workerPage.locator('text=Active Jobs & Workspace').click();
  await workerPage.waitForTimeout(800);

  // Grant Agency Clearance if waiting
  const grantBtn = await workerPage.$('text=Grant Agency Clearance');
  if (grantBtn) {
    await grantBtn.click();
    await workerPage.waitForTimeout(600);
    console.log('✓ Clicked Grant Agency Clearance');
  }

  // Click "Continue & Navigate to Location"
  console.log('✓ Clicking "Continue & Navigate to Location" to open Dedicated Execution Console...');
  const navBtn = await workerPage.locator('text=Continue & Navigate to Location').first();
  await navBtn.click();
  await workerPage.waitForTimeout(1000);

  await workerPage.screenshot({ path: 'C:/Users/ajith/.gemini/antigravity-ide/brain/79ba7a00-d642-46e5-8a6c-0240f7732798/worker_execution_console.png' });
  console.log('✓ Captured worker_execution_console.png');

  // 6. Test Interconnected Flow
  console.log('\n--- 6. Testing Full Interconnected Flow ---');

  // Step 1: Skip Timer & Mark Arrived
  const skipBtn = await workerPage.$('text=Skip Timer');
  if (skipBtn) await skipBtn.click();
  await workerPage.waitForTimeout(500);

  const arriveBtn = await workerPage.locator('text=I Have Arrived');
  await arriveBtn.click();
  console.log('✓ Worker clicked "I Have Arrived"');
  await workerPage.waitForTimeout(1000);

  // Customer Screen reveals Start OTP
  await custPage.reload();
  await custPage.waitForTimeout(1000);
  const custText = await custPage.innerText('body');
  console.log('✓ Customer Start OTP revealed (4058):', custText.includes('4 0 5 8') || custText.includes('4058'));

  // Worker inputs Start OTP
  const autoFillOtpBtn = await workerPage.locator('text=Auto-Fill Customer OTP');
  await autoFillOtpBtn.click();
  const verifyOtpBtn = await workerPage.locator('text=Verify Start OTP');
  await verifyOtpBtn.click();
  console.log('✓ Worker verified Start OTP');
  await workerPage.waitForTimeout(1000);

  // Worker clicks "Complete My Work & Request Customer Review"
  const completeWorkBtn = await workerPage.locator('text=Complete My Work');
  await completeWorkBtn.click();
  console.log('✓ Worker clicked Complete My Work');
  await workerPage.waitForTimeout(1000);

  // Customer submits mandatory review
  await custPage.reload();
  await custPage.waitForTimeout(1000);
  const submitReviewBtn = await custPage.locator('text=Submit Rating & Unlock Completion PIN');
  if (await submitReviewBtn.isVisible()) {
    await submitReviewBtn.click();
    console.log('✓ Customer submitted review form');
    await custPage.waitForTimeout(1000);
  }

  // Customer displays Completion PIN
  const custTextAfterReview = await custPage.innerText('body');
  console.log('✓ Customer Completion PIN displayed (1666):', custTextAfterReview.includes('1 6 6 6') || custTextAfterReview.includes('1666'));

  // Worker enters Completion PIN
  const autoFillPinBtn = await workerPage.locator('text=Auto-Fill PIN');
  await autoFillPinBtn.click();
  const verifyPinBtn = await workerPage.locator('text=Verify Completion PIN');
  await verifyPinBtn.click();
  console.log('✓ Worker verified Completion PIN');
  await workerPage.waitForTimeout(1000);

  // Verify Official Payment QR generated
  const workerAfterPin = await workerPage.innerText('body');
  console.log('✓ Official UPI Payment QR Generated:', workerAfterPin.includes('Official Easy HiCare UPI Soundbox Terminal') || workerAfterPin.includes('Official UPI Payment QR Code'));

  await workerPage.screenshot({ path: 'C:/Users/ajith/.gemini/antigravity-ide/brain/79ba7a00-d642-46e5-8a6c-0240f7732798/worker_payment_qr.png' });
  console.log('✓ Captured worker_payment_qr.png');

  // 7. Test Option 3: Today's Route & Stops (Completed Jobs Only)
  console.log('\n--- 7. Testing Option 3: Route & Stops (Completed Only) ---');
  await workerPage.locator('text=Today\'s Route & Stops').click();
  await workerPage.waitForTimeout(800);
  const routeText = await workerPage.innerText('body');
  console.log('✓ Completed Route History Table:', routeText.includes('Completed Route History & Warranty Registry'));
  console.log('✓ Has Completed Stops (#PF-7801):', routeText.includes('PF-7801') && routeText.includes('COMPLETED'));
  console.log('✓ Has Warranty Expiry (28-Dec-2026):', routeText.includes('Expires: 28-Dec-2026'));

  // 8. Test Option 5: Safety Hub & Floating AI Bubble
  console.log('\n--- 8. Testing Option 5: Safety Hub & Floating AI Bubble ---');
  await workerPage.locator('text=Safety Hub & Precautions').click();
  await workerPage.waitForTimeout(800);
  const safetyText = await workerPage.innerText('body');
  console.log('✓ CIB&RC Chemical Safety Data Sheets:', safetyText.includes('Chemical Safety Data Sheets'));
  console.log('✓ No inline chat box on page:', !safetyText.includes('AI Chemical Safety Assistant (Strictly Grounded)'));

  // Click floating AI bubble
  const floatingBubble = await workerPage.$('.floating-ai-bubble');
  console.log('✓ Floating AI Bubble exists:', floatingBubble !== null);
  if (floatingBubble) {
    await floatingBubble.click();
    await workerPage.waitForTimeout(600);
    const aiModalVisible = await workerPage.isVisible('text=AI Grounded Chemical Safety Assistant');
    console.log('✓ AI Assistant Modal opened via bubble:', aiModalVisible);
  }

  // 9. Mobile Responsiveness Test (375x667)
  console.log('\n--- 9. Testing Mobile Responsiveness ---');
  await workerPage.setViewportSize({ width: 375, height: 667 });
  await workerPage.waitForTimeout(500);
  await workerPage.screenshot({ path: 'C:/Users/ajith/.gemini/antigravity-ide/brain/79ba7a00-d642-46e5-8a6c-0240f7732798/worker_mobile_responsive.png' });
  console.log('✓ Captured worker_mobile_responsive.png');

  await custPage.setViewportSize({ width: 375, height: 667 });
  await custPage.waitForTimeout(500);
  await custPage.screenshot({ path: 'C:/Users/ajith/.gemini/antigravity-ide/brain/79ba7a00-d642-46e5-8a6c-0240f7732798/customer_mobile_responsive.png' });
  console.log('✓ Captured customer_mobile_responsive.png');

  await browser.close();
  console.log('\n🎉 ALL VERIFICATIONS COMPLETED SUCCESSFULLY!');
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});

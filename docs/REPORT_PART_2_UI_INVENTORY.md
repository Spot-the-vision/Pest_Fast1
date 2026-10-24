# REPORT PART 2 — Exhaustive UI Element & Form Inventory

**Target Document:** Section 2 Deep-Dive Annex for Easy HiCare Monorepo  
**Auditor:** Principal Software Architect & Technical Auditor  
**Date:** October 24, 2026  
**Repository:** `Pest_Fast1-main/Pest_Fast1-main`

---

## 1. Customer Web Application (`apps/customer-app` — Port 3000)

### 1.1 Complete UI Element Inventory

| Page/Screen | Element Label (Exact Copy) | Type | File:Line | What Happens on Click/Submit (Frontend) | State/Store Fields Changed | API Call / State Mutation Triggered | Backend/DB Effect (Mock vs Future Production) | Cross-Dashboard Visibility | Validation / Guards |
|---|---|---|---|---|---|---|---|---|---|
| Landing Page | `Easy HiCare` Logo Brand Link | Link | `CustomerView.jsx:482` | Returns view to hero landing page | `isLandingView = true` | None | None | None | None |
| Landing Page | `24x7 Helpline` | Button | `CustomerView.jsx:502` | Opens 24x7 Customer Support & Safety Helpline modal | `helpOpen = true` | None | None | None | None |
| Landing Page | `Open Live Tracking & OTP Handshake →` | Button | `CustomerView.jsx:539` | Transitions view from hero landing to track workspace | `isLandingView = false`, `activeSection = 'track'` | None | None | None | Only visible when `booking && booking.status !== 'CANCELLED'` |
| Landing Page | `Book a Demo / Book Treatment →` | Button | `CustomerView.jsx:678` | Transitions from hero landing to booking configurator | `isLandingView = false`, `activeSection = 'book'` | None | None | None | None |
| Modal (Help) | `Call Customer Support (1800-123-9999)` | Link (`tel:`) | `CustomerView.jsx:449` | Triggers browser telephony intent to 18001239999; shows info toast | None | None | Production: Twilio / Exotel IVR call log | None | None |
| Modal (Help) | `CIB&RC Chemical Safety Helpline (1800-11-2233)` | Link (`tel:`) | `CustomerView.jsx:456` | Triggers browser telephony intent to 1800112233; shows info toast | None | None | Production: Regulatory helpline intent | None | None |
| Modal (Profile) | `Full Name (Editable)` | Input (`text`) | `CustomerView.jsx:231` | Updates customer profile draft name in modal buffer | `profileDraft.name` | None | None | None | None |
| Modal (Profile) | `Email Address (Editable)` | Input (`email`) | `CustomerView.jsx:247` | Updates customer profile draft email in modal buffer | `profileDraft.email` | None | None | None | HTML5 email format |
| Modal (Profile) | `Mobile Number (Locked for Security & OTP Handshake)` | Input (`text`) | `CustomerView.jsx:270` | None (input is disabled and read-only) | None | None | None | None | `disabled`, `readOnly` |
| Modal (Profile) | `House Location in Text (Flat/House No., Building, Street, Locality)` | Input (`textarea`) | `CustomerView.jsx:301` | Updates customer address text and extracts locality | `profileDraft.addressText`, `profileDraft.locality` | None | None | None | None |
| Modal (Profile) | `Detect Live Device GPS` | Button | `CustomerView.jsx:340` | Calls `navigator.geolocation.getCurrentPosition`; updates coords | `profileDraft.coords`, `detectingProfileGps` | None | Production: PostGIS `ST_SetSRID(ST_MakePoint(...), 4326)` | None | Geolocation API support check |
| Modal (Profile) | `Latitude` | Input (`number`) | `CustomerView.jsx:376` | Updates latitude coordinate in profile draft | `profileDraft.coords.lat` | None | None | None | Step: 0.0001 |
| Modal (Profile) | `Longitude` | Input (`number`) | `CustomerView.jsx:394` | Updates longitude coordinate in profile draft | `profileDraft.coords.lng` | None | None | None | Step: 0.0001 |
| Modal (Profile) | `Cancel` | Button | `CustomerView.jsx:414` | Reverts draft to existing user profile and closes modal | `profileDraft`, `profileModalOpen = false` | None | None | None | None |
| Modal (Profile) | `Save Profile & Location` | Button | `CustomerView.jsx:424` | Commits profile draft to `userProfile` state; shows success toast | `userProfile`, `profileModalOpen = false` | None | Production: `PATCH /api/v1/customers/me` updates `customer_profiles` | None | None |
| Sidebar | `Easy HiCare` (Sidebar Brand) | Button | `CustomerView.jsx:724` | Returns to landing hero view | `isLandingView = true` | None | None | None | None |
| Sidebar | Profile Card (`Edit Profile`) | Button | `CustomerView.jsx:741` | Opens profile & location popup with current profile | `profileDraft`, `profileModalOpen = true` | None | None | None | None |
| Sidebar | `Book Treatment` | Button | `CustomerView.jsx:784` | Navigates to BookSection | `activeSection = 'book'`, `isLandingView = false` | None | None | None | None |
| Sidebar | `Live Tracking & OTP` | Button | `CustomerView.jsx:784` | Navigates to TrackSection | `activeSection = 'track'`, `isLandingView = false` | None | None | None | Badge shows live booking status |
| Sidebar | `History & Warranty` | Button | `CustomerView.jsx:784` | Navigates to HistorySection | `activeSection = 'history'`, `isLandingView = false` | None | None | None | Badge shows count of past jobs |
| Sidebar | `Chemical Safety & Care` | Button | `CustomerView.jsx:784` | Navigates to SafetyGuideSection | `activeSection = 'safety'`, `isLandingView = false` | None | None | None | None |
| Sidebar | `Logout` | Button | `CustomerView.jsx:823` | Resets view to landing page; shows info toast | `isLandingView = true`, `mobileNavOpen = false` | None | None | None | None |
| Sidebar | `24x7 Customer Helpline` | Button | `CustomerView.jsx:850` | Opens customer support modal | `helpOpen = true` | None | None | None | None |
| Topbar | Mobile Menu Button | Button | `CustomerView.jsx:866` | Toggles mobile navigation drawer | `mobileNavOpen` | None | None | None | None |
| Topbar | `24x7 Support` | Button | `CustomerView.jsx:912` | Opens customer support modal | `helpOpen = true` | None | None | None | None |
| BookSection | Treatment Card Checkboxes (`cockroaches`, `termites`, `bedbugs`, `rodents`, `mosquitoes`, `sanitization`) | Toggle / Card | `BookSection.jsx:66` | Toggles pest ID in `form.pestTypes`; recalculates multi-service price & 15% bundle discount | `form.pestTypes` | None | None | None | At least 1 required |
| BookSection | Property Configuration (`1bhk`, `2bhk`, `3bhk`, `4bhk`, `commercial`) | Card / Radio | `BookSection.jsx:196` | Updates property size; recalculates size multiplier | `form.propertySize` | None | None | None | Required field |
| BookSection | Protection Plan (`standard`, `barrier`, `shield`) | Card / Radio | `BookSection.jsx:21` | Updates protection plan; recalculates plan multiplier and warranty days | `form.plan` | None | None | None | Required field |
| BookSection | `Apply AI Recommendation ({plan})` | Button | `BookSection.jsx:25` | Sets `form.plan` to AI recommended plan | `form.plan` | None | None | None | Enabled when recommended != selected |
| BookSection | Preferred Date (`today`, `tomorrow`, `weekend`) | Pill / Radio | `BookSection.jsx:26` | Selects scheduled service day | `form.day` | None | None | None | Required field |
| BookSection | Preferred Time Slot (`09:00 - 11:00 AM`, `01:00 - 03:00 PM`, `05:00 - 07:00 PM`) | Pill / Radio | `BookSection.jsx:22` | Selects scheduled service time window | `form.slot` | None | None | None | Required field |
| BookSection | Dispatch Mode (`treat_on_arrival`, `inspection`) | Radio | `BookSection.jsx:40` | Sets dispatch mode; inspection mode sets `payableNow = 0` | `form.dispatchMode` | None | None | None | Required field |
| BookSection | Quick Address Chips (`Bellandur Apartment`, `Whitefield Villa`, `Indiranagar Bungalow`) | Chip | `BookSection.jsx:26` | Fills address textarea and sets associated coords | `form.address`, `form.coords` | None | None | None | None |
| BookSection | `Detect Live GPS Coordinates` | Button | `BookSection.jsx:75` | Fetches device coordinates via browser Geolocation; syncs to store | `form.coords`, `liveCustomerLocation` | `POST /api/state` | Coordinates written to `.pest-free-live-state.json` | Worker App sees updated destination coords | Geolocation support |
| BookSection | Address Textarea | Textarea | `BookSection.jsx:43` | Updates exact delivery address string | `form.address` | None | None | None | Min length: 10 chars |
| BookSection | Special Instructions Textarea | Textarea | `BookSection.jsx:39` | Updates technician guidance notes | `form.note` | None | None | None | Optional |
| BookSection | `Confirm & Book Treatment →` | Button | `BookSection.jsx:123` | Validates all fields, generates `id`, resets status to `BOOKING_PLACED`, initiates auto-dispatch simulation, switches to TrackSection | `booking`, `incomingJob`, `startOtp = '4058'`, `completionPin = '1666'`, `isLoading` | `POST /api/state` | Writes booking, startOtp, completionPin to `.pest-free-live-state.json`; Production: `POST /api/v1/bookings` | Worker App shows incoming job; Agency shows in queue | Form validation passes (7 checks) |
| TrackSection | `Book a New Pest Treatment` (Empty state) | Button | `TrackSection.jsx:86` | Navigates back to booking section | None | None | None | None | None |
| TrackSection | Star Rating Buttons (`1★`, `2★`, `3★`, `4★`, `5★`) | Button | `TrackSection.jsx:372` | Sets review star rating state | `stars` (local) | None | None | None | Value 1–5 |
| TrackSection | Review Feedback Chips (`+ Punctual & Polite`, etc.) | Chip | `TrackSection.jsx:385` | Appends preset feedback phrase to comment input | `comment` (local) | None | None | None | None |
| TrackSection | Review Feedback Text Input | Input (`text`) | `TrackSection.jsx:398` | Updates review text comment | `comment` (local) | None | None | None | None |
| TrackSection | `Submit Review & Reveal Completion PIN` | Button | `TrackSection.jsx:407` | Commits customer review to store; unlocks completion PIN display; sets `paymentQrGenerated = true` | `customerReview`, `paymentQrGenerated = true` | `POST /api/state` | Writes `customerReview` to live state; Production: `POST /api/v1/bookings/:id/reviews` | Worker App unlocks Stage 4 (Completion PIN input) | Visible only when `workCompletedByWorker && !customerReview` |
| TrackSection | `Open Payment Scanner Link / Pay UPI (Rs. {total})` | Button | `TrackSection.jsx:490` | Opens dynamic UPI QR modal | `qrModal = true` | None | None | None | Available when review submitted or completed |
| TrackSection | `Call Technician` | Link (`tel:`) | `TrackSection.jsx:548` | Calls technician phone (real if contact unlocked, proxy if masked) | None | None | Production: Proxied call via Exotel / Twilio bridge | None | None |
| TrackSection | `Cancel Booking` | Button | `TrackSection.jsx:555` | Cancels active booking without penalty; archives to history | `booking = null`, `history = [cancelled, ...]` | `POST /api/state` | Writes `CANCELLED` status to live state; Production: `POST /api/v1/bookings/:id/cancel` | Worker App sees job cancelled; Agency queue updates | Guard: `canCancel()` (only if status in `BOOKING_PLACED`, `AGENCY_APPROVED`, `TECHNICIAN_ACCEPTED`) |
| TrackSection | `Open UPI Payment QR Code (Rs. {total})` | Button | `TrackSection.jsx:592` | Opens dynamic UPI modal | `qrModal = true` | None | None | None | When `!customerPaid` |
| TrackSection | `View 90-Day Warranty Certificate` | Button | `TrackSection.jsx:600` | Navigates to history tab | None | None | None | None | When `customerPaid` |
| TrackSection | `Confirm Payment & Save Warranty Certificate` (Modal) | Button | `TrackSection.jsx:649` | Commits payment, generates transaction ID, moves job to completed history, closes modal, redirects to History | `customerPaid = true`, `booking = null`, `history = [completed, ...]` | `POST /api/state` | Writes `customerPaid = true` to live state; Production: `POST /api/v1/payments/confirm` | Worker App updates status to settled; Admin GMV updates | None |
| HistorySection | `Book New Service` | Button | `HistorySection.jsx:46` | Navigates to BookSection | None | None | None | None | None |
| HistorySection | `Warranty Certificate` | Button | `HistorySection.jsx:108` | Opens CIB&RC Warranty Certificate modal for specific job | `certModalItem = item` | None | None | None | Only for `COMPLETED` bookings |
| HistorySection | `Rebook` | Button | `HistorySection.jsx:117` | Pre-fills booking form from historic item; navigates to BookSection | `rebookDraft`, `booking = null` | None | None | None | None |
| HistorySection | `Download Official PDF Certificate` (Modal) | Button | `HistorySection.jsx:178` | Triggers print / PDF export dialog | None | None | Production: Generates signed S3 PDF URL | None | None |
| HistorySection | `Rebook This Service` (Modal) | Button | `HistorySection.jsx:189` | Pre-fills booking form and navigates to BookSection | `rebookDraft`, `certModalItem = null` | None | None | None | None |
| HistorySection | `Close` (Modal) | Button | `HistorySection.jsx:200` | Closes warranty certificate modal | `certModalItem = null` | None | None | None | None |
| SafetyGuideSection | Chemical Selection Pills (`Deltamethrin`, `Imidacloprid`, `Fipronil`) | Pill | `SafetyGuideSection.jsx:27` | Selects chemical data sheet to display | `selectedSheet` (local) | None | None | None | None |

---

## 2. Worker Field Application (`apps/worker-app` — Port 5176)

### 2.1 Complete UI Element Inventory

| Page/Screen | Element Label (Exact Copy) | Type | File:Line | What Happens on Click/Submit (Frontend) | State/Store Fields Changed | API Call / State Mutation Triggered | Backend/DB Effect (Mock vs Future Production) | Cross-Dashboard Visibility | Validation / Guards |
|---|---|---|---|---|---|---|---|---|---|
| Global Topbar | Duty Toggle Button (`ON DUTY` / `OFF DUTY`) | Toggle | `App.jsx:132` | Toggles worker duty availability | `dutyStatus` | None | Production: Updates `worker_profiles.is_active_today` | Agency Radar updates worker online marker | None |
| Global Topbar | `SOS Emergency` | Button | `App.jsx:112` | Opens SOS Emergency Protocol dialog | `sosModalOpen = true` | None | Production: Emits high-priority WebSocket alert | Agency sees critical emergency beacon | None |
| Global Topbar | Floating AI Assistant Bubble | Button | `App.jsx:114` | Opens AI Grounded Chemical Safety Assistant modal | `aiModalOpen = true` | None | None | None | None |
| Global Sidebar | `Worker Overview & Stats` | Button | `App.jsx:134` | Switches active view to overview | `activeSection = 'overview'` | None | None | None | None |
| Global Sidebar | `Active Jobs & Workspace` | Button | `App.jsx:142` | Switches active view to workspace | `activeSection = 'workspace'` | None | None | None | Badge shows live booking status |
| Global Sidebar | `Today's Route & Stops` | Button | `App.jsx:148` | Switches active view to route | `activeSection = 'route'` | None | None | None | None |
| Global Sidebar | `Earnings & UPI Payout` | Button | `App.jsx:153` | Switches active view to earnings | `activeSection = 'earnings'` | None | None | None | Badge shows today's earnings |
| Global Sidebar | `Safety Hub & Precautions` | Button | `App.jsx:159` | Switches active view to safety sheets | `activeSection = 'safety'` | None | None | None | None |
| Global Sidebar | `SOS Emergency Protocol` | Button | `App.jsx:165` | Opens SOS emergency modal | `sosModalOpen = true` | None | None | None | None |
| Global Sidebar | `Settings & Account` | Button | `App.jsx:171` | Opens worker settings modal | `settingsModalOpen = true` | None | None | None | None |
| Modal (SOS) | `Call National Poison Control Centre (1800-11-2233)` | Link (`tel:`) | `App.jsx:220` | Telephony intent to 1800112233; shows toast | None | None | None | None | None |
| Modal (SOS) | `Call Agency Operations Manager (Rajesh Kumar)` | Link (`tel:`) | `App.jsx:230` | Telephony intent to manager phone; shows toast | None | None | None | None | None |
| Modal (SOS) | `I Am Safe & In Control — Close Alert` | Button | `App.jsx:240` | Dismisses emergency modal | `sosModalOpen = false` | None | None | None | None |
| Modal (Settings) | `Worker Full Name` | Input (`text`) | `App.jsx:265` | Read-only identity display | None | None | None | None | Read-only |
| Modal (Settings) | `Primary Mobile Phone` | Input (`text`) | `App.jsx:275` | Read-only phone display | None | None | None | None | Read-only |
| Modal (Settings) | `CIB&RC Government Applicator License` | Input (`text`) | `App.jsx:285` | Read-only license code display | None | None | None | None | Read-only |
| Modal (Settings) | `Primary Settlement UPI ID` | Input (`text`) | `App.jsx:295` | Edits UPI ID in state buffer | `earnings.upiId` | None | Production: `PATCH /api/v1/workers/me/payout-profile` | None | None |
| Modal (Settings) | `Save Settings` | Button | `App.jsx:310` | Commits settings updates; closes modal | `settingsModalOpen = false` | None | None | None | None |
| Modal (AI Safety) | Query Input Textarea | Input (`text`) | `App.jsx:340` | Enters chemical question | `aiQuery` (local) | None | None | None | None |
| Modal (AI Safety) | Suggested Question Chips | Chip | `App.jsx:355` | Fills query textarea with preset question | `aiQuery` (local) | None | None | None | None |
| Modal (AI Safety) | `Ask AI Assistant` | Button | `App.jsx:370` | Calls `answerWorkerSafetyQuestion(q)`; displays grounded answer | `aiResponse` (local) | Optional `POST /api/ai/safety` | None | None | Query not empty |
| WorkerOverview | Period Toggle (`Today` / `This Week` / `This Month`) | Toggle | `WorkerOverviewSection.jsx:45` | Toggles analytics time period | `period` (local) | None | None | None | None |
| WorkerOverview | `Grant Agency Clearance (Simulate Step 1)` | Button | `WorkerOverviewSection.jsx:110` | Simulates agency unlocking customer contact & address | `contactUnlocked = true`, `booking.status = 'AGENCY_APPROVED'` | `POST /api/state` | Merges unmask clearance into live state | Customer sees tech assignment; Agency radar updates | Visible when `!contactUnlocked` |
| WorkerOverview | `Continue & Navigate to Location →` | Button | `WorkerOverviewSection.jsx:135` | Switches to dedicated execution console | `inExecutionView = true` | None | None | None | None |
| WorkerOverview | `Decline & Release` | Button | `WorkerOverviewSection.jsx:150` | Declines incoming job; releases to pool | `booking = null`, `incomingJob = null` | `POST /api/state` | Clears active job from state | Job returns to Agency unassigned queue | None |
| ActiveJobWorkspace | `← Back to Overview` | Button | `ActiveJobWorkspaceSection.jsx:145` | Exits execution view back to overview cards | `inExecutionView = false` | None | None | None | None |
| ActiveJobWorkspace | `Skip Timer` / `Fast Forward ETA` | Button | `ActiveJobWorkspaceSection.jsx:180` | Clears countdown timer; sets `etaSeconds = 0` | `etaSeconds = 0` | `POST /api/state` | Writes `etaSeconds = 0` to state | Customer radar displays 0s ETA | Visible when `etaSeconds > 0` |
| ActiveJobWorkspace | `I Have Arrived at Doorstep` | Button | `ActiveJobWorkspaceSection.jsx:210` | Transitions job status to `ARRIVED`; stops movement | `booking.status = 'ARRIVED'`, `etaSeconds = 0` | `POST /api/state` | Writes `ARRIVED` status to live state; Production: `POST /api/v1/bookings/:id/arrive` | Customer screen unmasks and displays Start OTP | Guard: `canWorkerMarkArrived()` (`status === 'ON_THE_WAY' && etaSeconds === 0`) |
| ActiveJobWorkspace | Doorstep OTP 4-Digit Inputs | Input (`text`) | `ActiveJobWorkspaceSection.jsx:68` | Collects 4-digit arrival OTP from customer | `otpDigits` (local) | None | None | None | Digits only (0–9) |
| ActiveJobWorkspace | `Auto-Fill Customer OTP` | Button | `ActiveJobWorkspaceSection.jsx:91` | Pre-fills expected OTP from store (`4058`) | `otpDigits = ['4','0','5','8']` | None | None | None | None |
| ActiveJobWorkspace | `Verify Start OTP` | Button | `ActiveJobWorkspaceSection.jsx:79` | Verifies OTP against `booking.startOtp`; transitions to `IN_PROGRESS` | `booking.status = 'IN_PROGRESS'` | `POST /api/state` | Writes `IN_PROGRESS` status to live state; Production: `POST /api/v1/bookings/:id/start` | Customer screen updates to "On-Site Treatment Active" | OTP must match `startOtp` exactly |
| ActiveJobWorkspace | 6 Safety Protocol Checkboxes | Checkbox | `ActiveJobWorkspaceSection.jsx:42` | Toggles individual checklist step completion | `safetyChecklist[idx]` | None | None | Customer sees live protocol feed checkboxes update | Disabled if not `IN_PROGRESS` |
| ActiveJobWorkspace | `Check All 6 Steps` | Button | `ActiveJobWorkspaceSection.jsx:43` | Marks all 6 safety checklist steps as completed | `safetyChecklist = [true,true,true,true,true,true]` | None | None | Customer protocol feed shows 6/6 verified | None |
| ActiveJobWorkspace | `Capture After-Treatment Photo Proof` | Button | `ActiveJobWorkspaceSection.jsx:44` | Simulates capturing treatment completion photograph | `afterPhotoTaken = true` | None | Production: Uploads photo proof to S3 bucket | None | None |
| ActiveJobWorkspace | `Complete My Work & Request Customer Review` | Button | `ActiveJobWorkspaceSection.jsx:45` | Marks technician work completed; prompts customer for review | `workCompletedByWorker = true`, `afterPhotoTaken = true` | `POST /api/state` | Writes `workCompletedByWorker = true` to live state | Customer screen unlocks review form | Guard: All 6 safety steps + after photo taken |
| ActiveJobWorkspace | Completion PIN 4-Digit Inputs | Input (`text`) | `ActiveJobWorkspaceSection.jsx:97` | Collects 4-digit completion PIN from customer | `compPinDigits` (local) | None | None | None | Digits only (0–9) |
| ActiveJobWorkspace | `Auto-Fill PIN (1666)` | Button | `ActiveJobWorkspaceSection.jsx:120` | Pre-fills expected completion PIN (`1666`) | `compPinDigits = ['1','6','6','6']` | None | None | None | None |
| ActiveJobWorkspace | `Verify Completion PIN & Unlock Payment QR` | Button | `ActiveJobWorkspaceSection.jsx:108` | Verifies PIN; transitions to `COMPLETED`; unlocks payment QR; credits earnings | `booking.status = 'COMPLETED'`, `pinVerifiedByWorker = true`, `paymentQrGenerated = true`, `earnings` | `POST /api/state` | Writes `COMPLETED` status to live state; Production: `POST /api/v1/bookings/:id/complete` | Customer screen reveals completion status & QR | PIN must match `completionPin` exactly |
| ActiveJobWorkspace | `Simulate Customer 5★ Review` | Button | `ActiveJobWorkspaceSection.jsx:47` | Simulates customer submitting review to bypass review wait | `customerReview = {rating: 5, comment: ...}`, `paymentQrGenerated = true` | `POST /api/state` | Writes review to live state | Customer screen shows review submitted | None |
| ActiveJobWorkspace | `Confirm Customer Payment Received (Cash/UPI)` | Button | `ActiveJobWorkspaceSection.jsx:48` | Confirms payment settlement; marks customer paid | `customerPaid = true` | `POST /api/state` | Writes `customerPaid = true` to live state; Production: `POST /api/v1/payments/settle` | Customer screen updates to Paid & Settled | None |
| RouteSection | `View Job Certificate` (Stops PF-8810, PF-8824, etc.) | Button | `RouteSection.jsx:85` | Shows job warranty and CIB&RC treatment details | None | None | None | None | None |
| EarningsSection | `Request Instant UPI IMPS Transfer (Rs. {amount})` | Button | `EarningsSection.jsx:95` | Generates IMPS payout record with random UTR; deducts from today balance | `earnings.today = 0`, `payoutHistory = [record, ...]` | None | Production: `POST /api/v1/payouts/instant` via RazorpayX | Admin Settlements ledger shows payout | `earnings.today > 0` |
| EarningsSection | `Edit Settlement UPI ID` | Button | `EarningsSection.jsx:125` | Opens prompt / modal to update settlement VPA | `earnings.upiId` | None | Production: `PATCH /api/v1/workers/me/payout` | None | Valid UPI VPA syntax |
| SafetySection | Chemical Sheet Tab Buttons (`Deltamethrin`, `Imidacloprid`, `Fipronil`) | Tab | `SafetySection.jsx:40` | Switches displayed CIB&RC chemical sheet | `selectedSheet` (local) | None | None | None | None |

---

## 3. Agency Operations Portal (`apps/agency-dashboard` — Port 5175)

### 3.1 Complete UI Element Inventory

| Page/Screen | Element Label (Exact Copy) | Type | File:Line | What Happens on Click/Submit (Frontend) | State/Store Fields Changed | API Call / State Mutation Triggered | Backend/DB Effect (Mock vs Future Production) | Cross-Dashboard Visibility | Validation / Guards |
|---|---|---|---|---|---|---|---|---|---|
| Login Screen | `Agency Email` | Input (`email`) | `App.jsx:60` | Updates email state | `email` (local) | None | None | None | Valid email |
| Login Screen | `Password` | Input (`password`) | `App.jsx:69` | Updates password state | `password` (local) | None | None | None | Non-empty |
| Login Screen | `Sign In to Dispatch Ops` | Button | `App.jsx:78` | Authenticates user; renders dashboard | `isAuthenticated = true` | None | Production: `POST /api/v1/auth/agency/login` (JWT) | None | None |
| Sidebar | `Dashboard & Live Map` | Nav Link | `Sidebar.jsx:45` | Navigates to `/` (main dashboard) | Route change | None | None | None | None |
| Sidebar | `Operations Bar` | Nav Link | `Sidebar.jsx:55` | Scrolls/filters to operations queue | Route change | None | None | None | Badge shows pending bookings (4) |
| Sidebar | `Management (Fleet & Rosters)` | Nav Link | `Sidebar.jsx:68` | Navigates to `/worker-fleet` | Route change | None | None | None | None |
| Sidebar | `Worker KYC` | Nav Link | `Sidebar.jsx:80` | Filters to worker KYC applications | `activeSectionFilter = 'kyc'` | None | None | None | Badge shows pending KYC (3) |
| Sidebar | `Client Directory` | Nav Link | `Sidebar.jsx:92` | Filters to client directory | `activeSectionFilter = 'clients'` | None | None | None | None |
| Sidebar | `Analytics & Reports` | Nav Link | `Sidebar.jsx:104` | Filters to analytics views | `activeSectionFilter = 'analytics'` | None | None | None | None |
| Sidebar | Profile Card | Button | `Sidebar.jsx:125` | Opens agency dispatcher profile modal | `showProfileModal = true` | None | None | None | None |
| Topbar | Mobile Menu Button | Button | `Header.jsx:25` | Toggles mobile navigation drawer | `mobileSidebarOpen` | None | None | None | None |
| Topbar | Quick Action (`Dispatch All`) | Button | `Header.jsx:42` | Auto-allocates available technicians to pending queue | `bookings` updated | None | Production: Triggers BullMQ batch dispatch job | Workers receive dispatches | None |
| Topbar | Quick Action (`Broadcast`) | Button | `Header.jsx:55` | Emits fleet notification announcement | None | None | Production: Socket.IO broadcast `announcement:broadcast` | All connected workers see banner | None |
| Topbar | Profile Avatar Button | Button | `Header.jsx:70` | Opens dispatcher profile modal | `showProfileModal = true` | None | None | None | None |
| Dashboard | Timeframe Toggle (`Today` / `Week` / `Month`) | Toggle | `Dashboard.jsx:15` | Filters dashboard KPI calculations | `timeframe` | None | None | None | None |
| Dashboard | `Recenter Node` | Button | `Dashboard.jsx:151` | Recenters Bangalore radar mesh coordinates | `targetStatus`, `isRecentering` | None | None | None | None |
| Dashboard | `Track Technician` (Worker cards) | Button | `Dashboard.jsx:144` | Centers map on specific technician; tracks live telemetry | `focusedWorker`, `targetStatus` | None | None | None | None |
| Dashboard | `Assign Tech` (Bookings BK-4021 to BK-4024) | Button | `Dashboard.jsx:50` | Opens dispatch modal or assigns nearest verified technician | `bookings` status updated | None | Production: `POST /api/v1/agency/bookings/:id/assign` | Customer sees assigned tech; Worker receives dispatch | Technician must be KYC verified |
| Dashboard | `Review Dossier` (KYC WK-KYC-201 to 203) | Button | `Dashboard.jsx:57` | Opens WorkerKycDossierModal for application vetting | `selectedKycDossier` | None | None | None | None |
| Dashboard | `View Dossier` (Client Directory) | Button | `Dashboard.jsx:159` | Opens ClientHistoryModal with past jobs & warranty terms | `selectedClient` | None | None | None | None |
| Modal (Profile) | Profile Form Inputs (`name`, `email`, `phone`, `role`, `shift`) | Inputs | `ProfileModal.jsx:35` | Edits agency dispatcher profile fields | `profile` | None | Production: `PATCH /api/v1/agency/profile` | None | None |
| Modal (Profile) | `Save Changes` | Button | `ProfileModal.jsx:75` | Commits dispatcher profile changes | `profile`, modal closed | None | None | None | None |
| Modal (Profile) | `Sign Out` | Button | `ProfileModal.jsx:85` | Logs out of agency portal | `isAuthenticated = false` | None | None | None | None |
| Modal (KYC) | `Approve & Deploy to Fleet` | Button | `Dashboard.jsx:118` | Approves worker KYC, removes from pending queue, adds to active fleet | `workerApplications`, `workers` | None | Production: `POST /api/v1/agency/workers/:id/approve-kyc` | Worker App allows login; eligible for dispatch | CIB&RC license valid |
| Modal (KYC) | `Reject Application` | Button | `Dashboard.jsx:138` | Rejects worker application; notifies applicant | `workerApplications` | None | Production: `POST /api/v1/agency/workers/:id/reject-kyc` | Applicant receives SMS notice | None |
| Modal (KYC) | `Close` | Button | `AgencyModals.jsx:85` | Dismisses KYC dossier modal | `selectedKycDossier = null` | None | None | None | None |
| Modal (Client) | `Download Service Certificate` | Button | `AgencyModals.jsx:140` | Exports PDF service warranty certificate | None | None | Production: Signed PDF generation | None | None |
| Modal (Client) | `Close` | Button | `AgencyModals.jsx:155` | Dismisses client history modal | `selectedClient = null` | None | None | None | None |
| WorkerFleet | Status Filter Dropdown (`All`, `Active`, `On Job`, `Offline`) | Dropdown | `WorkerFleet.jsx:45` | Filters technician roster by operational status | `statusFilter` (local) | None | None | None | None |
| WorkerFleet | Specialization Dropdown | Dropdown | `WorkerFleet.jsx:60` | Filters technician roster by chemical expertise | `specFilter` (local) | None | None | None | None |
| WorkerFleet | Search Technicians Input | Input (`text`) | `WorkerFleet.jsx:75` | Filters technician list by name, phone, or license code | `searchQuery` (local) | None | None | None | None |
| WorkerFleet | `Add New Technician` | Button | `WorkerFleet.jsx:95` | Opens technician onboarding registration dialog | `addTechModalOpen = true` | None | None | None | None |
| WorkerFleet | `View Telemetry` | Button | `WorkerFleet.jsx:180` | Shows real-time battery, GPS ping, and current job card | `selectedWorker` (local) | None | None | None | None |
| WorkerFleet | `Inspect License` | Button | `WorkerFleet.jsx:210` | Displays CIB&RC government certificate validity dates | None | None | None | None | None |

---

## 4. Super-Admin Platform Kernel (`apps/admin-dashboard` — Port 5174)

### 4.1 Complete UI Element Inventory

| Page/Screen | Element Label (Exact Copy) | Type | File:Line | What Happens on Click/Submit (Frontend) | State/Store Fields Changed | API Call / State Mutation Triggered | Backend/DB Effect (Mock vs Future Production) | Cross-Dashboard Visibility | Validation / Guards |
|---|---|---|---|---|---|---|---|---|---|
| Login Screen | Developer Root Login Form | Form | `App.jsx:144` | Authenticates administrator into root console | `isAuthenticated = true` | None | Production: Multi-factor TOTP root auth | None | Credentials verified |
| Sidebar | `System Core` | Nav Link | `App.jsx:135` | Switches to PlatformOverview telemetry tab | `activeTab = 'telemetry'` | None | None | None | None |
| Sidebar | `Agency KYC ({count})` | Nav Link | `App.jsx:136` | Switches to KycTab audit queue | `activeTab = 'kyc'` | None | None | None | Badge shows pending agencies |
| Sidebar | `Disputes ({count})` | Nav Link | `App.jsx:137` | Switches to DisputesTab | `activeTab = 'disputes'` | None | None | None | Badge shows dispute count |
| Sidebar | `Settlements & GMV` | Nav Link | `App.jsx:138` | Switches to FinancialsTab | `activeTab = 'financials'` | None | None | None | None |
| Sidebar | Admin Profile Button | Button | `App.jsx:165` | Opens AdminProfileModal | `activeModal = 'profile'` | None | None | None | None |
| Sidebar | `Logout` | Button | `App.jsx:180` | Logs out of root admin console | `isAuthenticated = false` | None | None | None | None |
| Header Badges | `Hubs Directory` | Badge / Button | `App.jsx:48` | Opens HubsModal with approved partner hubs | `activeModal = 'agencies'` | None | None | None | None |
| Header Badges | `PII Vault` | Badge / Button | `App.jsx:48` | Opens Cryptographic PII Vault modal | `activeModal = 'vault'` | None | None | None | None |
| Header Badges | `Socket Streams` | Badge / Button | `App.jsx:48` | Opens Socket.IO Live Streams Gateway inspector | `activeModal = 'socket'` | None | None | None | None |
| Header Badges | `PostGIS Mesh` | Badge / Button | `App.jsx:48` | Opens PostGIS Spatial Engine interactive modal | `activeModal = 'postgis'` | None | None | None | None |
| Header Badges | `System Config` | Badge / Button | `App.jsx:48` | Opens SystemConfigModal kernel controls | `activeModal = 'settings'` | None | None | None | None |
| PlatformOverview | Agency Filter Dropdown | Dropdown | `PlatformOverview.jsx:25` | Filters fleet table by operating franchise | `agencyFilter` | None | None | None | None |
| PlatformOverview | Status Filter Dropdown | Dropdown | `PlatformOverview.jsx:26` | Filters fleet table by technician status | `statusFilter` | None | None | None | None |
| PlatformOverview | Search Technicians Input | Input (`text`) | `PlatformOverview.jsx:27` | Filters fleet table by name, phone, or license code | `workerSearch` | None | None | None | None |
| PlatformOverview | Pagination Buttons (`Previous` / `Next`) | Button | `PlatformOverview.jsx:30` | Paginates through fleet telemetry table | `currentPage` | None | None | None | Guard: Bounds 1..maxPage |
| PlatformOverview | `Export CSV` | Button | `PlatformOverview.jsx:11` | Generates and downloads `technicians_telemetry.csv` file | None | None | Browser blob download | None | None |
| PlatformOverview | `Manage Hubs` (Card) | Button | `PlatformOverview.jsx:85` | Opens HubsModal | `activeModal = 'agencies'` | None | None | None | None |
| PlatformOverview | `Inspect Vault` (Card) | Button | `PlatformOverview.jsx:95` | Opens PiiVaultModal | `activeModal = 'vault'` | None | None | None | None |
| PlatformOverview | `View Sockets` (Card) | Button | `PlatformOverview.jsx:105` | Opens StreamsModal | `activeModal = 'socket'` | None | None | None | None |
| PlatformOverview | `Launch Spatial Tool` (Card) | Button | `PlatformOverview.jsx:115` | Opens PostGisModal | `activeModal = 'postgis'` | None | None | None | None |
| PlatformOverview | `Open Kernel Settings` (Card) | Button | `PlatformOverview.jsx:125` | Opens SystemConfigModal | `activeModal = 'settings'` | None | None | None | None |
| KycTab | `Approve Agency & Issue License` | Button | `KycTab.jsx:14` | Approves agency KYC; moves to approved list; notifies owner | `pendingAgencies`, `approvedAgencies` | None | Production: `POST /api/v1/admin/agencies/:id/approve` | Agency owner can now log in and dispatch | Valid CIB&RC and GSTIN |
| KycTab | `Reject Application` | Button | `KycTab.jsx:34` | Rejects agency onboarding application | `pendingAgencies` | None | Production: `POST /api/v1/admin/agencies/:id/reject` | Owner notified via email/SMS | None |
| KycTab | `View Trade Dossier` | Button | `KycTab.jsx:105` | Displays trade license, GSTIN, and insecticide permits | `selectedDossier` | None | None | None | None |
| DisputesTab | `Arbitrate / Issue Free Re-treatment` | Button | `DisputesTab.jsx:145` | Resolves dispute; grants complimentary warranty booking | `disputes` updated | None | Production: Creates re-service booking with `payableNow = 0` | Customer sees warranty re-service booked | None |
| DisputesTab | `Issue ₹300 Courtesy Refund` | Button | `DisputesTab.jsx:160` | Resolves dispute; initiates UPI refund | `disputes` updated | None | Production: `POST /api/v1/payments/refund` via Razorpay | Customer receives UPI refund credit | None |
| DisputesTab | `Reject Claim` | Button | `DisputesTab.jsx:175` | Closes dispute without liability | `disputes` updated | None | Production: Logs rejection in dispute audit ledger | Customer notified of dispute resolution | None |
| FinancialsTab | `Disburse Weekly Payouts` | Button | `FinancialsTab.jsx:17` | Batch disburses all pending agency settlements via RazorpayX | `agenciesList` updated to `Disbursed` | None | Production: Triggers batch IMPS transfer job | Agency balances updated to settled | None |
| FinancialsTab | `Pay Now via IMPS` | Button | `FinancialsTab.jsx:12` | Disburses instant IMPS settlement to specific agency | `agenciesList` status updated | None | Production: RazorpayX instant payout API call | Specific agency sees settlement UTR | None |
| FinancialsTab | `Export CSV` | Button | `FinancialsTab.jsx:71` | Generates download of `settlements_gmv_october.csv` | None | None | Browser blob download | None | None |
| Modal (SystemConfig) | `Geo-Lock Enforcement` | Toggle | `AdminModals.jsx:59` | Toggles 500m geofence lock for technician arrivals | `vals.geoLock` | None | Production: Updates global config in Redis | Disables arrival check bypass | None |
| Modal (SystemConfig) | `Auto-Dispatch Engine` | Toggle | `AdminModals.jsx:60` | Toggles AI nearest-worker auto-assignment | `vals.autoDispatch` | None | Production: Enables/disables BullMQ auto-match queue | Dispatches require manual agency approval | None |
| Modal (SystemConfig) | `Webhook Notifications` | Toggle | `AdminModals.jsx:61` | Toggles real-time push events to agency hubs | `vals.webhooks` | None | Production: Toggles webhook delivery queue | Agency webhook receivers stop receiving | None |
| Modal (SystemConfig) | `Fraud Detection Layer` | Toggle | `AdminModals.jsx:62` | Toggles automated velocity & concurrency checks | `vals.fraudDetect` | None | Production: Enables Redis sliding window rate limits | Suspicious bookings flagged | None |
| Modal (SystemConfig) | `Maintenance Mode` | Toggle | `AdminModals.jsx:63` | Blocks customer bookings during upgrades | `vals.maintenanceMode` | None | Production: API gateway returns 503 Service Unavailable | Customer App shows maintenance banner | None |
| Modal (SystemConfig) | `Beta Features (Staging)` | Toggle | `AdminModals.jsx:64` | Enables experimental Voronoi spatial mesh | `vals.betaFeatures` | None | Production: Feature flag evaluation via Unleash | Staging features visible | None |
| Modal (SystemConfig) | `Save Settings` | Button | `AdminModals.jsx:87` | Broadcasts config changes to all nodes; closes modal | Modal closed | None | Production: Emits `config:update` across cluster | All nodes update in-memory caches | None |
| Modal (SystemConfig) | `Flush Cache` | Button | `AdminModals.jsx:97` | Clears Redis cache keys; forces DB re-fetch | None | None | Production: Redis `FLUSHDB` or key pattern delete | All caches invalidated | None |
| Modal (AdminProfile) | `Sign Out` | Button | `AdminModals.jsx:165` | Logs out administrator | `isAuthenticated = false` | None | Production: Revokes admin JWT session | None | None |
| Modal (Hubs) | `View Credentials` / `Hide Credentials` | Button | `AdminModals.jsx:333` | Toggles display of API Secret and mTLS certificates | `selectedHub`, `showKey` | None | None | None | None |
| Modal (Hubs) | `Ping Node` | Button | `AdminModals.jsx:342` | Pings agency hub node; measures round-trip time | None | None | Production: ICMP / HTTP health ping | None | None |
| Modal (Hubs) | `Health Check` | Button | `AdminModals.jsx:349` | Synchronizes dispatch telemetry for specific hub | None | None | Production: Queries agency node status endpoint | None | None |
| Modal (Hubs) | `Broadcast Hub Ping` | Button | `AdminModals.jsx:364` | Emits ping to all regional hubs | None | None | Production: Cluster broadcast ping | All hubs respond with latency | None |
| Modal (PII Vault) | `Authorize Decrypt` / `Re-Mask Records` | Toggle Button | `AdminModals.jsx:481` | Toggles live audited decryption of Aadhaar and phone hashes | `decrypted` | None | Production: Logs decryption access to immutable audit log | Reveals plaintext PII on screen | Level-3 Root Admin permission |
| Modal (PII Vault) | `Download Compliance Audit Dossier` | Button | `AdminModals.jsx:534` | Exports encrypted JSON compliance dossier | None | None | Browser blob download of JSON audit dossier | None | None |
| Modal (PII Vault) | `Rotate KMS Key` | Button | `AdminModals.jsx:542` | Generates new 256-bit encryption entropy | None | None | Production: AWS KMS / Vault key rotation API | Future tokens encrypted under new key version | None |
| Modal (Streams) | Throttle Rate Buttons (`1s`, `5s`, `10s`) | Button | `AdminModals.jsx:623` | Adjusts WebSocket telemetry broadcast throttle interval | `throttle` | None | Production: Updates Redis pub/sub throttle rate | Controls mobile battery & network bandwidth | None |
| Modal (Streams) | `Pause Stream` / `Resume Stream` | Button | `AdminModals.jsx:649` | Pauses/resumes incoming packet terminal logging | `isPaused` | None | None | None | None |
| Modal (Streams) | `Clear Log` | Button | `AdminModals.jsx:657` | Clears terminal packet log display | `logs = []` | None | None | None | None |
| Modal (Streams) | `Flush Socket Buffer` | Button | `AdminModals.jsx:682` | Flushes socket memory buffer; re-syncs stream pipes | None | None | Production: Socket.IO cluster buffer reset | All sockets re-handshake | None |
| Modal (Streams) | `Emit Test Ping` | Button | `AdminModals.jsx:696` | Emits test ping packet to active worker beacons | None | None | Production: Socket.IO `worker:ping` event | Connected workers emit telemetry ACK | None |
| Modal (PostGIS) | Search Radius Buttons (`5.0`, `8.5`, `12.0`, `15.0` km) | Button | `AdminModals.jsx:790` | Updates `ST_DWithin` spatial query radius | `radius` | None | Production: Executes dynamic PostGIS spatial query | Updates candidate technician list | None |
| Modal (PostGIS) | `Locate` (Nearest technicians) | Button | `AdminModals.jsx:830` | Focuses on specific technician's GPS coordinate mesh | None | None | None | None | None |
| Modal (PostGIS) | `Reindex GiST Spatial Mesh` | Button | `AdminModals.jsx:844` | Triggers execution of `REINDEX TABLE fleet_technicians` | None | None | Production: PostgreSQL `REINDEX INDEX idx_worker_location_gist` | Optimizes spatial index R-Tree performance | None |

---

## 5. Summary of Form Fields & Validations Across All Apps

| Application | Form Name | Field Name | Input Type | Required? | Default Value | Validation Rule | Submission Target |
|---|---|---|---|---|---|---|---|
| Customer App | Treatment Configurator | `pestTypes` | Checkbox group | Yes | `['cockroaches']` | At least 1 valid pest ID from `PEST_TYPES` | `useAppStore.placeBooking` → `POST /api/state` |
| Customer App | Treatment Configurator | `propertySize` | Radio group | Yes | `'2bhk'` | Must match `PROPERTY_SIZES` enum ID | `useAppStore.placeBooking` → `POST /api/state` |
| Customer App | Treatment Configurator | `plan` | Radio group | Yes | `'barrier'` | Must match `TREATMENT_PLANS` enum ID | `useAppStore.placeBooking` → `POST /api/state` |
| Customer App | Treatment Configurator | `day` | Radio pills | Yes | `'today'` | Must match `DAY_OPTS` enum ID | `useAppStore.placeBooking` → `POST /api/state` |
| Customer App | Treatment Configurator | `slot` | Radio pills | Yes | `'09:00 - 11:00 AM'` | Must match `TIME_SLOTS` enum string | `useAppStore.placeBooking` → `POST /api/state` |
| Customer App | Treatment Configurator | `dispatchMode` | Radio | Yes | `'treat_on_arrival'` | Must be `'treat_on_arrival'` or `'inspection'` | `useAppStore.placeBooking` → `POST /api/state` |
| Customer App | Treatment Configurator | `address` | Textarea | Yes | Preset saved address | Min length 10 characters | `useAppStore.placeBooking` → `POST /api/state` |
| Customer App | Treatment Configurator | `coords` | Geo JSON | Yes | `{ lat: 12.9250, lng: 77.5938 }` | Latitude [-90, 90], Longitude [-180, 180] | `useAppStore.placeBooking` → `POST /api/state` |
| Customer App | Treatment Configurator | `note` | Textarea | No | `'Sightings near...'` | String (optional notes) | `useAppStore.placeBooking` → `POST /api/state` |
| Customer App | Customer Profile | `name` | Text input | Yes | `'Aarav Sharma'` | Non-empty string | `CustomerView.userProfile` (Local) |
| Customer App | Customer Profile | `email` | Email input | Yes | `'aarav.sharma@gmail.com'` | Standard email regex pattern | `CustomerView.userProfile` (Local) |
| Customer App | Customer Profile | `phone` | Text input | N/A | `'+91 98402 11982'` | Locked / Read-only (Non-editable) | Non-submittable (Locked) |
| Customer App | Customer Profile | `addressText` | Textarea | Yes | Primary residence address | Non-empty address string | `CustomerView.userProfile` (Local) |
| Customer App | Customer Profile | `coords.lat` | Number input | Yes | `12.9250` | Floating-point number | `CustomerView.userProfile` (Local) |
| Customer App | Customer Profile | `coords.lng` | Number input | Yes | `77.5938` | Floating-point number | `CustomerView.userProfile` (Local) |
| Customer App | Mandatory Review Form | `stars` | Star rating | Yes | `5` | Integer between 1 and 5 | `useAppStore.submitCustomerReview` → `POST /api/state` |
| Customer App | Mandatory Review Form | `comment` | Text input | No | `''` | String (optional customer review feedback) | `useAppStore.submitCustomerReview` → `POST /api/state` |
| Worker App | Arrival Verification | `otpDigits` | 4-box numeric | Yes | `['', '', '', '']` | Exactly 4 numeric digits matching `startOtp` | `useAppStore.workerStartTreatment` → `POST /api/state` |
| Worker App | Completion Verification | `compPinDigits` | 4-box numeric | Yes | `['', '', '', '']` | Exactly 4 numeric digits matching `completionPin` | `useAppStore.workerVerifyCustomerCompletionPin` → `POST /api/state` |
| Worker App | Settlement Settings | `upiId` | Text input | Yes | `'arjun.sharma@okaxis'` | Valid UPI VPA syntax (`username@handle`) | `useAppStore.updateUpiId` (Local store) |
| Worker App | AI Safety Assistant | `aiQuery` | Textarea | Yes | `''` | Non-empty question string | `answerWorkerSafetyQuestion` (Internal utility) |
| Agency Dashboard | Ops Login | `email` | Email input | Yes | `'agency@ecopest.com'` | Valid email address | `AgencyApp.isAuthenticated` |
| Agency Dashboard | Ops Login | `password` | Password input | Yes | `'password123'` | Non-empty password string | `AgencyApp.isAuthenticated` |
| Agency Dashboard | Dispatcher Profile | `name` | Text input | Yes | `'Marcus Sterling'` | Non-empty dispatcher name | `AgencyDashboard.profile` |
| Agency Dashboard | Dispatcher Profile | `email` | Email input | Yes | `'marcus@ecopest.com'` | Valid email address | `AgencyDashboard.profile` |
| Agency Dashboard | Dispatcher Profile | `phone` | Text input | Yes | `'+91 98001 12345'` | Valid phone number | `AgencyDashboard.profile` |
| Agency Dashboard | Dispatcher Profile | `role` | Text input | Yes | `'Chief Operations Dispatcher'` | Non-empty role description | `AgencyDashboard.profile` |
| Agency Dashboard | Dispatcher Profile | `shift` | Text input | Yes | `'Shift A (07:00 - 19:00 IST)'` | Non-empty shift specification | `AgencyDashboard.profile` |
| Admin Dashboard | System Config | `geoLock` | Switch toggle | Yes | `true` | Boolean flag | `SystemConfigModal.vals` |
| Admin Dashboard | System Config | `autoDispatch` | Switch toggle | Yes | `true` | Boolean flag | `SystemConfigModal.vals` |
| Admin Dashboard | System Config | `webhooks` | Switch toggle | Yes | `true` | Boolean flag | `SystemConfigModal.vals` |
| Admin Dashboard | System Config | `fraudDetect` | Switch toggle | Yes | `true` | Boolean flag | `SystemConfigModal.vals` |
| Admin Dashboard | System Config | `maintenanceMode`| Switch toggle | Yes | `false` | Boolean flag | `SystemConfigModal.vals` |
| Admin Dashboard | System Config | `betaFeatures` | Switch toggle | Yes | `false` | Boolean flag | `SystemConfigModal.vals` |
| Admin Dashboard | Spatial Mesh | `radius` | Numeric button | Yes | `8.5` | Must be one of `[5.0, 8.5, 12.0, 15.0]` | `PostGisModal.radius` |

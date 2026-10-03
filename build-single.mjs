import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIST = path.resolve(__dirname, 'dist');

console.log('\n======================================================');
console.log('  🏗️  Building PestFast Unified Single-Port Prototype');
console.log('======================================================\n');

function run(cmd, cwd) {
  console.log(`\x1b[36m> [${cwd || '.'}] ${cmd}\x1b[0m`);
  execSync(cmd, { cwd: cwd ? path.resolve(__dirname, cwd) : __dirname, stdio: 'inherit' });
}

// 1. Clean root dist
if (fs.existsSync(ROOT_DIST)) {
  fs.rmSync(ROOT_DIST, { recursive: true, force: true });
}
fs.mkdirSync(ROOT_DIST, { recursive: true });

// 2. Build Customer App (Universal Home & Booking) -> base /
console.log('\n📦 [1/4] Building Customer App & Universal Home (base: /)...');
run('npx vite build --base / apps/customer-app');

// 3. Build Worker App -> base /worker/
console.log('\n📦 [2/4] Building Worker Execution Console (base: /worker/)...');
run('npx vite build --base /worker/ apps/worker-app');

// 4. Build Agency Dashboard -> base /agency/
console.log('\n📦 [3/4] Building Agency Operations Dashboard (base: /agency/)...');
run('npx vite build --base /agency/ apps/agency-dashboard');

// 5. Build Admin Dashboard -> base /admin/
console.log('\n📦 [4/4] Building Admin Platform Kernel (base: /admin/)...');
run('npx vite build --base /admin/ apps/admin-dashboard');

// 6. Consolidate into root dist/
console.log('\n📂 Consolidating all portals into unified dist/ folder...');

// Copy Customer App into dist/
const customerDist = path.resolve(__dirname, 'apps/customer-app/dist');
fs.cpSync(customerDist, ROOT_DIST, { recursive: true });

// Copy Worker App into dist/worker
const workerDist = path.resolve(__dirname, 'apps/worker-app/dist');
fs.cpSync(workerDist, path.resolve(ROOT_DIST, 'worker'), { recursive: true });

// Copy Agency Dashboard into dist/agency
const agencyDist = path.resolve(__dirname, 'apps/agency-dashboard/dist');
fs.cpSync(agencyDist, path.resolve(ROOT_DIST, 'agency'), { recursive: true });

// Copy Admin Dashboard into dist/admin
const adminDist = path.resolve(__dirname, 'apps/admin-dashboard/dist');
fs.cpSync(adminDist, path.resolve(ROOT_DIST, 'admin'), { recursive: true });

// 7. Ensure live state file exists for demo
const stateFile = path.resolve(__dirname, '.pest-free-live-state.json');
if (!fs.existsSync(stateFile)) {
  fs.writeFileSync(stateFile, JSON.stringify({ initialized: true, updatedAt: new Date().toISOString() }, null, 2));
}

console.log('\n======================================================');
console.log('  ✅ Single-Port Prototype Build Complete!');
console.log('======================================================');
console.log('  📁 Output Directory: dist/');
console.log('  🌐 Routes on Single Port:');
console.log('     • /          -> Universal Home & Customer Portal');
console.log('     • /worker/   -> Worker Execution Console');
console.log('     • /agency/   -> Agency Operations Dispatch Hub');
console.log('     • /admin/    -> Super-Admin Platform Kernel');
console.log('======================================================');
console.log('  🚀 Run with: npm start  (or node server.mjs)');
console.log('======================================================\n');

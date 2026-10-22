import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import net from 'net';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const localVite = path.resolve(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');
const rootVite = path.resolve(__dirname, '..', '..', 'node_modules', 'vite', 'bin', 'vite.js');
const hasLocalVite = fs.existsSync(localVite);
const hasRootVite = fs.existsSync(rootVite);

// Check if a port is available
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, '0.0.0.0');
  });
}

// Find first available open port
async function findAvailablePort(startPort) {
  let port = startPort;
  while (!(await isPortAvailable(port))) {
    port++;
  }
  return port;
}

const requestedPort = parseInt(
  process.env.PORT || process.env.CUSTOMER_PORT || (process.argv[2] && !isNaN(parseInt(process.argv[2], 10)) ? process.argv[2] : '3000'),
  10
);

const isMultiMode = process.argv.includes('--multi');
const target = (process.argv[2] || 'unified').toLowerCase();

function spawnViteApp(appDir, port, name, apiUrl) {
  const env = {
    ...process.env,
    FORCE_COLOR: '1',
    VITE_API_URL: apiUrl || `http://localhost:${port}`,
  };

  let child;
  if (hasLocalVite) {
    child = spawn(process.execPath, [localVite, '--port', String(port), '--strictPort', 'false'], {
      cwd: appDir,
      stdio: 'inherit',
      env
    });
  } else if (hasRootVite) {
    child = spawn(process.execPath, [rootVite, '--port', String(port), '--strictPort', 'false'], {
      cwd: appDir,
      stdio: 'inherit',
      env
    });
  } else {
    child = spawn('npx', ['vite', '--port', String(port), '--strictPort', 'false'], {
      cwd: appDir,
      stdio: 'inherit',
      shell: true,
      env
    });
  }

  child.on('error', (err) => {
    console.error(`\x1b[31m[${name}] Error:\x1b[0m`, err);
  });

  return child;
}

async function main() {
  if (isMultiMode) {
    // Legacy multi-port mode (spawns 4 ports)
    const APPS = {
      customer: { name: 'Customer App', dir: 'apps/customer-app', defaultPort: 3000, port: 3000 },
      admin: { name: 'Admin Dashboard', dir: 'apps/admin-dashboard', defaultPort: 5174, port: 5174 },
      agency: { name: 'Agency Dashboard', dir: 'apps/agency-dashboard', defaultPort: 5175, port: 5175 },
      worker: { name: 'Worker App', dir: 'apps/worker-app', defaultPort: 5176, port: 5176 },
    };

    for (const [k, app] of Object.entries(APPS)) {
      app.port = await findAvailablePort(app.defaultPort);
    }

    const apiUrl = `http://localhost:${APPS.customer.port}`;
    console.log('\n======================================================');
    console.log('  🚀 Starting Multi-Port Legacy Mode');
    console.log('======================================================');
    Object.entries(APPS).forEach(([k, app]) => {
      console.log(`  • ${app.name.padEnd(18)}: http://localhost:${app.port}`);
    });
    console.log(`  • Shared State API  : ${apiUrl}/api/state`);
    console.log('======================================================\n');

    const children = Object.values(APPS).map(a => spawnViteApp(path.resolve(__dirname, a.dir), a.port, a.name, apiUrl));
    const cleanup = () => { children.forEach(c => { try { c.kill(); } catch (_) {} }); process.exit(0); };
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    return;
  }

  // DEFAULT / RECOMMENDED: Unified Single-Port Host
  const dynamicPort = await findAvailablePort(requestedPort);
  if (dynamicPort !== requestedPort) {
    console.log(`\x1b[33m[Notice]\x1b[0m Port ${requestedPort} is occupied. Dynamically allocated port ${dynamicPort}`);
  }

  const appDir = path.resolve(__dirname, 'apps/customer-app');
  const baseUrl = `http://localhost:${dynamicPort}`;

  console.log('\n========================================================================');
  console.log(`  🚀 Easy HiCare Unified Platform Running on Single Dynamic Port ${dynamicPort}`);
  console.log('========================================================================');
  console.log(`  • 🛒 Customer Portal    : ${baseUrl}/customer  (or ${baseUrl}/)`);
  console.log(`  • 🔧 Technician Field   : ${baseUrl}/technician`);
  console.log(`  • 🏢 Agency Operations  : ${baseUrl}/agency`);
  console.log(`  • 🛡️ Super-Admin Kernel : ${baseUrl}/admin`);
  console.log(`  • ⚡ Shared Live API     : ${baseUrl}/api/state`);
  console.log('========================================================================\n');

  const child = spawnViteApp(appDir, dynamicPort, 'Unified Easy HiCare Server', baseUrl);
  const cleanup = () => {
    try { child.kill(); } catch (_) {}
    process.exit(0);
  };
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
}

main().catch((err) => {
  console.error('Failed to initialize development runner:', err);
  process.exit(1);
});

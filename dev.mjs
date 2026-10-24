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
  // Enforce Unified Single-Port Host (All 4 dashboards accessible via single port + URL paths)
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


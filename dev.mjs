import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const localVite = path.resolve(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');
const rootVite = path.resolve(__dirname, '..', '..', 'node_modules', 'vite', 'bin', 'vite.js');
const hasLocalVite = fs.existsSync(localVite);
const hasRootVite = fs.existsSync(rootVite);

const customerPort = parseInt(process.env.CUSTOMER_PORT || (process.argv[2] === 'customer' && process.argv[3]) || '3000', 10);

const APPS = {
  customer: { name: 'Customer App', dir: 'apps/customer-app', port: customerPort },
  admin: { name: 'Admin Dashboard', dir: 'apps/admin-dashboard', port: 5174 },
  agency: { name: 'Agency Dashboard', dir: 'apps/agency-dashboard', port: 5175 },
  worker: { name: 'Worker App', dir: 'apps/worker-app', port: 5176 },
};

const target = (process.argv[2] || 'all').toLowerCase();

function startApp(key) {
  const app = APPS[key];
  if (!app) {
    console.error(`Unknown app: "${key}". Available options: all, ${Object.keys(APPS).join(', ')}`);
    return null;
  }
  const appDir = path.resolve(__dirname, app.dir);
  console.log(`\x1b[36m[${app.name}]\x1b[0m Starting on \x1b[32mhttp://localhost:${app.port}\x1b[0m...`);

  let child;
  if (hasLocalVite) {
    child = spawn(process.execPath, [localVite, '--port', String(app.port)], {
      cwd: appDir,
      stdio: 'inherit',
      env: { ...process.env, FORCE_COLOR: '1' }
    });
  } else if (hasRootVite) {
    child = spawn(process.execPath, [rootVite, '--port', String(app.port)], {
      cwd: appDir,
      stdio: 'inherit',
      env: { ...process.env, FORCE_COLOR: '1' }
    });
  } else {
    child = spawn('npx', ['vite', '--port', String(app.port)], {
      cwd: appDir,
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, FORCE_COLOR: '1' }
    });
  }

  child.on('error', (err) => {
    console.error(`\x1b[31m[${app.name}] Error:\x1b[0m`, err);
  });

  return child;
}

if (target === 'all') {
  console.log('\n======================================================');
  console.log('  🚀 Starting All PestFast Applications');
  console.log('======================================================');
  Object.entries(APPS).forEach(([k, app]) => {
    console.log(`  • ${app.name.padEnd(18)}: http://localhost:${app.port}`);
  });
  console.log('======================================================\n');

  const children = Object.keys(APPS).map(startApp).filter(Boolean);

  const cleanup = () => {
    console.log('\nShutting down dev servers...');
    children.forEach((c) => {
      try { c.kill(); } catch (e) {}
    });
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
} else {
  startApp(target);
}

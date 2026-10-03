import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import http from 'http';
import net from 'net';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const localVite = path.resolve(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');
const rootVite = path.resolve(__dirname, '..', '..', 'node_modules', 'vite', 'bin', 'vite.js');
const hasLocalVite = fs.existsSync(localVite);
const hasRootVite = fs.existsSync(rootVite);

const GATEWAY_PORT = parseInt(process.env.PORT || process.env.CUSTOMER_PORT || '3000', 10);
const rawArgs = process.argv.slice(2).flatMap(t => t.split(',')).map(t => t.trim().toLowerCase()).filter(Boolean);
const isSinglePortMode = rawArgs.includes('single') || rawArgs.length === 0;

const APPS = {
  customer: { name: 'Customer App', dir: 'apps/customer-app', port: isSinglePortMode ? 5173 : GATEWAY_PORT },
  admin: { name: 'Admin Dashboard', dir: 'apps/admin-dashboard', port: 5174 },
  agency: { name: 'Agency Dashboard', dir: 'apps/agency-dashboard', port: 5175 },
  worker: { name: 'Worker App', dir: 'apps/worker-app', port: 5176 },
};

const selectedTargets = (rawArgs.length === 0 || rawArgs.includes('all') || rawArgs.includes('single'))
  ? Object.keys(APPS)
  : rawArgs.filter(k => APPS[k]);

function startApp(key) {
  const app = APPS[key];
  if (!app) {
    console.error(`Unknown app: "${key}". Available options: single, all, ${Object.keys(APPS).join(', ')}`);
    return null;
  }
  const appDir = path.resolve(__dirname, app.dir);
  console.log(`\x1b[36m[${app.name}]\x1b[0m Starting internal server on port \x1b[32m${app.port}\x1b[0m...`);

  let child;
  const env = { ...process.env, FORCE_COLOR: '1' };

  if (hasLocalVite) {
    child = spawn(process.execPath, [localVite, '--port', String(app.port)], {
      cwd: appDir,
      stdio: 'inherit',
      env,
    });
  } else if (hasRootVite) {
    child = spawn(process.execPath, [rootVite, '--port', String(app.port)], {
      cwd: appDir,
      stdio: 'inherit',
      env,
    });
  } else {
    child = spawn('npx', ['vite', '--port', String(app.port)], {
      cwd: appDir,
      stdio: 'inherit',
      shell: true,
      env,
    });
  }

  child.on('error', (err) => {
    console.error(`\x1b[31m[${app.name}] Error:\x1b[0m`, err);
  });

  return child;
}

let gatewayServer = null;

function startGatewayProxy(port, targets) {
  const server = http.createServer((req, res) => {
    let targetPort = targets.customer;
    if (req.url.startsWith('/worker')) targetPort = targets.worker;
    else if (req.url.startsWith('/agency')) targetPort = targets.agency;
    else if (req.url.startsWith('/admin')) targetPort = targets.admin;

    const proxyReq = http.request({
      hostname: '127.0.0.1',
      port: targetPort,
      path: req.url,
      method: req.method,
      headers: { ...req.headers, host: `127.0.0.1:${targetPort}` },
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`Connecting to internal service on port ${targetPort}... please wait a second and refresh.`);
    });

    req.pipe(proxyReq);
  });

  server.on('upgrade', (req, socket, head) => {
    let targetPort = targets.customer;
    if (req.url.startsWith('/worker')) targetPort = targets.worker;
    else if (req.url.startsWith('/agency')) targetPort = targets.agency;
    else if (req.url.startsWith('/admin')) targetPort = targets.admin;

    const proxySocket = net.connect(targetPort, '127.0.0.1', () => {
      proxySocket.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`);
      for (let i = 0; i < req.rawHeaders.length; i += 2) {
        let key = req.rawHeaders[i];
        let val = req.rawHeaders[i + 1];
        if (key.toLowerCase() === 'host') val = `127.0.0.1:${targetPort}`;
        proxySocket.write(`${key}: ${val}\r\n`);
      }
      proxySocket.write('\r\n');
      proxySocket.write(head);
      socket.pipe(proxySocket);
      proxySocket.pipe(socket);
    });

    proxySocket.on('error', () => {
      socket.destroy();
    });
  });

  server.listen(port, () => {
    console.log('\n======================================================');
    console.log('  🚀 PestFast Unified Single-Port Dev Gateway Ready!');
    console.log('======================================================');
    console.log(`  🌐 SINGLE PORT URL: \x1b[32mhttp://localhost:${port}\x1b[0m`);
    console.log('');
    console.log(`  • Universal Home & Customer : http://localhost:${port}/`);
    console.log(`  • Worker Execution Console : http://localhost:${port}/worker/`);
    console.log(`  • Agency Dispatch Hub      : http://localhost:${port}/agency/`);
    console.log(`  • Super-Admin Kernel       : http://localhost:${port}/admin/`);
    console.log('======================================================\n');
  });

  return server;
}

const children = selectedTargets.map(startApp).filter(Boolean);

if (isSinglePortMode) {
  // Give internal Vite servers 1 second to bind then open the single-port gateway
  setTimeout(() => {
    gatewayServer = startGatewayProxy(GATEWAY_PORT, {
      customer: 5173,
      admin: 5174,
      agency: 5175,
      worker: 5176,
    });
  }, 1000);
} else {
  console.log('\n======================================================');
  console.log('  🚀 Starting Multi-Port Development Mode');
  console.log('======================================================');
  selectedTargets.forEach((k) => {
    const app = APPS[k];
    console.log(`  • ${app.name.padEnd(18)}: http://localhost:${app.port}`);
  });
  console.log('======================================================\n');
}

const cleanup = () => {
  console.log('\nShutting down dev servers...');
  if (gatewayServer) {
    try { gatewayServer.close(); } catch (_) {}
  }
  children.forEach((c) => {
    try { c.kill(); } catch (_) {}
  });
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

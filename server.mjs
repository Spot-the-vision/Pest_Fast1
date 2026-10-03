import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';
const DIST_DIR = path.resolve(__dirname, 'dist');
const STATE_FILE = path.resolve(__dirname, '.pest-free-live-state.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.webmanifest': 'application/manifest+json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
};

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function handleApi(req, res, pathname) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return true;
  }

  // State reset endpoint
  if (pathname === '/api/state/reset') {
    try {
      if (fs.existsSync(STATE_FILE)) fs.unlinkSync(STATE_FILE);
    } catch (_) {}
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, reset: true }));
    return true;
  }

  // Cross-dashboard live state sync
  if (pathname === '/api/state') {
    if (req.method === 'GET') {
      try {
        const data = fs.existsSync(STATE_FILE) ? fs.readFileSync(STATE_FILE, 'utf-8') : '{}';
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data || '{}');
      } catch {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('{}');
      }
      return true;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', (c) => { body += c; });
      req.on('end', () => {
        try {
          const incoming = JSON.parse(body || '{}');
          let existing = {};
          if (fs.existsSync(STATE_FILE)) {
            try { existing = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8')); } catch (_) {}
          }
          const merged = { ...existing, ...incoming };
          if (existing.workCompletedByWorker) merged.workCompletedByWorker = true;
          if (existing.customerReview) merged.customerReview = existing.customerReview;
          if (existing.pinVerifiedByWorker) merged.pinVerifiedByWorker = true;
          if (existing.paymentQrGenerated) merged.paymentQrGenerated = true;
          if (existing.customerPaid) merged.customerPaid = true;

          const STATUS_RANK = { DRAFT: 0, SEARCHING: 1, CONFIRMED: 2, ASSIGNED: 3, EN_ROUTE: 4, ON_THE_WAY: 4, ARRIVED: 5, IN_PROGRESS: 6, COMPLETED: 7, CANCELLED: -1 };
          if (existing.booking && incoming.booking) {
            const existRank = STATUS_RANK[existing.booking.status] || 0;
            const incRank = STATUS_RANK[incoming.booking.status] || 0;
            if (existRank > incRank && incoming.booking.status !== 'CANCELLED') {
              merged.booking = { ...incoming.booking, status: existing.booking.status };
            }
          }
          const tmp = `${STATE_FILE}.tmp.${process.pid}.${Date.now()}`;
          fs.writeFileSync(tmp, JSON.stringify(merged, null, 2), 'utf-8');
          fs.renameSync(tmp, STATE_FILE);
        } catch (_) {
          try { fs.writeFileSync(STATE_FILE, body, 'utf-8'); } catch (_) {}
        }
        res.writeHead(204);
        res.end();
      });
      return true;
    }
  }

  // AI quote endpoint
  if (pathname === '/api/ai/quote') {
    let body = '';
    req.on('data', (c) => { body += c; });
    req.on('end', () => {
      try {
        const { pestType, propertySize } = JSON.parse(body || '{}');
        const plans = { standard: 'Standard Plan', barrier: 'Barrier Plan', shield: 'Shield Plan' };
        const bestPlan = pestType === 'termites' || pestType === 'bedbugs' ? 'shield'
          : propertySize === 'commercial' ? 'barrier' : 'standard';
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          recommendedPlan: plans[bestPlan],
          reason: `Based on your ${pestType} issue and ${propertySize} property, ${plans[bestPlan]} offers the best protection-to-cost ratio.`,
        }));
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end('{}');
      }
    });
    return true;
  }

  // AI worker safety endpoint
  if (pathname === '/api/ai/safety') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      answer: 'Please refer to your bundled CSDS booklet or ask your supervisor. Government-approved formulations require mandatory PPE compliance.'
    }));
    return true;
  }

  return false;
}

function serveStatic(req, res, pathname) {
  if (!fs.existsSync(DIST_DIR)) {
    res.writeHead(503, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <html>
        <body style="font-family:sans-serif;padding:40px;text-align:center;">
          <h2>⚠️ Build artifacts not found</h2>
          <p>Please run <code>npm run build:single</code> (or <code>npm run build</code>) first to generate the single-port distribution bundle.</p>
        </body>
      </html>
    `);
    return;
  }

  // 1. Determine sub-app context for SPA routing
  let subApp = '';
  if (pathname.startsWith('/worker')) subApp = 'worker';
  else if (pathname.startsWith('/agency')) subApp = 'agency';
  else if (pathname.startsWith('/admin')) subApp = 'admin';

  // Normalize requested path relative to DIST_DIR
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(DIST_DIR, safePath);

  // If path exists and is a file, serve it
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
    });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // If directory requested or file does not exist, use SPA index fallback
  let spaIndex = path.join(DIST_DIR, 'index.html');
  if (subApp === 'worker') spaIndex = path.join(DIST_DIR, 'worker', 'index.html');
  else if (subApp === 'agency') spaIndex = path.join(DIST_DIR, 'agency', 'index.html');
  else if (subApp === 'admin') spaIndex = path.join(DIST_DIR, 'admin', 'index.html');

  if (fs.existsSync(spaIndex)) {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
    });
    fs.createReadStream(spaIndex).pipe(res);
    return;
  }

  // Fallback 404
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
}

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = urlObj.pathname;

  // Handle API endpoints
  if (pathname.startsWith('/api/')) {
    if (handleApi(req, res, pathname)) return;
  }

  // Handle Static files & SPA routes
  serveStatic(req, res, pathname);
});

server.listen(PORT, HOST, () => {
  console.log('\n======================================================');
  console.log('  🌐 PestFast Unified Single-Port Server Running');
  console.log('======================================================');
  console.log(`  🚀 Port: \x1b[32m${PORT}\x1b[0m`);
  console.log(`  🔗 Main URL: \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
  console.log('');
  console.log(`  • Universal Home & Customer : http://localhost:${PORT}/`);
  console.log(`  • Worker Execution Console : http://localhost:${PORT}/worker/`);
  console.log(`  • Agency Dispatch Hub      : http://localhost:${PORT}/agency/`);
  console.log(`  • Super-Admin Kernel       : http://localhost:${PORT}/admin/`);
  console.log('======================================================\n');
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATE_FILE = path.join(__dirname, '../../.pest-free-live-state.json');

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'pest-free-api',
      configureServer(server) {
        // Cross-port shared state
        // Reset shared state
        server.middlewares.use('/api/state/reset', (req, res) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
          if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
          try {
            if (fs.existsSync(STATE_FILE)) fs.unlinkSync(STATE_FILE);
          } catch (_) {}
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true, reset: true }));
        });

        server.middlewares.use('/api/state', (req, res) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

          if (req.method === 'GET') {
            try {
              const data = fs.existsSync(STATE_FILE) ? fs.readFileSync(STATE_FILE, 'utf-8') : '{}';
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(data);
            } catch { res.writeHead(200, { 'Content-Type': 'application/json' }); res.end('{}'); }
            return;
          }

          if (req.method === 'POST') {
            let body = '';
            req.on('data', c => { body += c; });
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
                const tmp = STATE_FILE + '.tmp.' + process.pid + '.' + Date.now();
                fs.writeFileSync(tmp, JSON.stringify(merged, null, 2), 'utf-8');
                fs.renameSync(tmp, STATE_FILE);
              } catch (_) {
                try { fs.writeFileSync(STATE_FILE, body, 'utf-8'); } catch (_) {}
              }
              res.writeHead(204);
              res.end();
            });
            return;
          }
          res.writeHead(405);
          res.end();
        });

        // AI: Smart quote (mock — replace with Gemini key on server)
        server.middlewares.use('/api/ai/quote', (req, res) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Content-Type', 'application/json');
          if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
          let body = '';
          req.on('data', c => { body += c; });
          req.on('end', () => {
            try {
              const { pestType, propertySize, note } = JSON.parse(body || '{}');
              const plans = { standard:'Standard Plan', barrier:'Barrier Plan', shield:'Shield Plan' };
              const bestPlan = pestType === 'termites' || pestType === 'bedbugs' ? 'shield'
                : propertySize === 'commercial' ? 'barrier' : 'standard';
              res.writeHead(200);
              res.end(JSON.stringify({
                recommendedPlan: plans[bestPlan],
                reason: `Based on your ${pestType} issue and ${propertySize} property, ${plans[bestPlan]} offers the best protection-to-cost ratio.`,
              }));
            } catch { res.writeHead(400); res.end('{}'); }
          });
        });
      },
    },
  ],
  resolve: {
    alias: {
      'react-native': path.resolve(__dirname, 'src/lib/rn.jsx'),
      'react-native-web': path.resolve(__dirname, 'src/lib/rn.jsx'),
      'ui-kit': path.resolve(__dirname, '../../packages/ui-kit/index.jsx'),
      '@pest-free/ui-kit': path.resolve(__dirname, '../../packages/ui-kit/index.jsx'),
      'shared-types': path.resolve(__dirname, '../../packages/shared-types/index.ts'),
      '@pest-free/shared-types': path.resolve(__dirname, '../../packages/shared-types/index.ts'),
    },
  },
});
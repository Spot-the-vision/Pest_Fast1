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
              try { fs.writeFileSync(STATE_FILE, body, 'utf-8'); } catch (_) {}
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
      'ui-kit': path.resolve(__dirname, '../../packages/ui-kit/index.jsx'),
      '@pest-free/ui-kit': path.resolve(__dirname, '../../packages/ui-kit/index.jsx'),
      'shared-types': path.resolve(__dirname, '../../packages/shared-types/index.ts'),
      '@pest-free/shared-types': path.resolve(__dirname, '../../packages/shared-types/index.ts'),
    },
  },
});
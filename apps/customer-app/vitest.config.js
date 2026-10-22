import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/__tests__/**/*.test.js'],
  },
  resolve: {
    alias: {
      '@pest-free/shared-types': path.resolve(__dirname, '../../packages/shared-types/index.js'),
      '@pest-free/shared-config': path.resolve(__dirname, '../../packages/shared-config/index.js'),
      '@pest-free/shared-utils': path.resolve(__dirname, '../../packages/shared-utils/index.js'),
      '@pest-free/shared-hooks': path.resolve(__dirname, '../../packages/shared-hooks/index.js'),
      '@pest-free/ui-kit': path.resolve(__dirname, '../../packages/ui-kit/index.jsx'),
      '@pest-free/api-client': path.resolve(__dirname, '../../packages/api-client/index.js'),
    },
  },
});

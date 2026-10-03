import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: process.env.VITE_BASE || '/admin/',
  plugins: [react()],
  resolve: {
    alias: {
      'ui-kit': path.resolve(__dirname, '../../packages/ui-kit/index.jsx'),
      '@pest-free/ui-kit': path.resolve(__dirname, '../../packages/ui-kit/index.jsx'),
      'shared-types': path.resolve(__dirname, '../../packages/shared-types/index.ts'),
      '@pest-free/shared-types': path.resolve(__dirname, '../../packages/shared-types/index.ts')
    }
  }
})

/**
 * Vetri Driving Academy — Vite Configuration
 * ===========================================
 * Role & Purpose:
 * - Configures React plugin with JSX fast-refresh.
 * - Sets up '@/' path alias resolving to the ./src directory.
 * - Configures development server on port 5173 with automatic /api proxy to FastAPI backend.
 * - Optimizes production build with code-splitting chunks (framer-motion, React vendor).
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('framer-motion')) {
            return 'motion';
          }
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
            return 'vendor';
          }
        },
      },
    },
  },
});

import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import * as path from 'path';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
const __dirname = fileURLToPath(new URL('.', import.meta.url));
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});

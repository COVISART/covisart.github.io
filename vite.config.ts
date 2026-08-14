import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// covisart.github.io is a user site served from the domain root, so no base path.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // three.js is deliberately split into its own lazy chunk; the default
    // 500 kB warning would fire on it every build and hide real regressions.
    chunkSizeWarningLimit: 700,
  },
});

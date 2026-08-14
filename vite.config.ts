import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// covisart.github.io is a user site served from the domain root, so no base path.
export default defineConfig({
  plugins: [react()],
  build: { outDir: 'dist' },
});

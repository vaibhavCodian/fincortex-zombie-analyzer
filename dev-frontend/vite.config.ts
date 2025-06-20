import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/dev-frontend/', // Set this to your repo name for GitHub Pages
  build: {
    outDir: 'dist'
  }
});

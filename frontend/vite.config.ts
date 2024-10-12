import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // Additional CSS settings can go here, e.g., preprocessors
  },
  build: {
    outDir: 'dist', // Specify your output directory if needed
    // Additional build settings
  },
});

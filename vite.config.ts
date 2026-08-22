import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// User GitHub Pages site (https://USERNAME.github.io/) is served from the domain root,
// so `base` must be "/". For a project site (https://USERNAME.github.io/repo/) change it to "/repo/".
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});

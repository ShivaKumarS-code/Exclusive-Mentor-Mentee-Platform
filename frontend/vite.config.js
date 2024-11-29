import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react(), tailwindcss(), autoprefixer()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',  // Proxy requests starting with '/api' to the backend
    },
  },
});

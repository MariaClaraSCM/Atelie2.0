// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      
      '/api/cep': {
        target: 'https://www.cepaberto.com', // O domínio da API
        changeOrigin: true, // Necessário para APIs externas
        rewrite: (path) => path.replace(/^\/api\/cep/, ''),
        secure: true, // Use false se a API for HTTP, mas para HTTPS use true
      },
    },
  },
});
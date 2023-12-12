import { defineConfig } from 'vite';
import unocss from 'unocss/vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    unocss(),
  ],
});

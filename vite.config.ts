import { defineConfig } from 'vite'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { fileURLToPath, URL } from 'node:url';
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './jest.setup.ts', // Укажите путь к вашему файлу настроек
  },
});

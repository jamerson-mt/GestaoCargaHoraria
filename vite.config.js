import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@root': path.resolve(fileURLToPath(new URL('.', import.meta.url))), // Adiciona o alias para @root
    },
  },
  define: {
    'process.env': {
      VITE_API_URL_DEV: 'http://localhost:5117/api/account/test-auth',
      VITE_API_URL_PROD: 'http://localhost:5117/api/account/test-auth', // Adiciona URL de produção
    },
  },
})

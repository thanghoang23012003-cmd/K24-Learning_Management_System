import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env file dựa trên mode (development | production)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_APP_BASE || '/', // lấy từ .env
    plugins: [react(), tailwindcss()],
    server: {
      host: '0.0.0.0', // Allow access from outside the container
      port: 5000,
      proxy: {
        '/api': {
          target: 'http://api:3000', // Use the service name from docker-compose
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix
        },
      },
    },
  }
})

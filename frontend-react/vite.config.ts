import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/K24-Learning_Management_System/",
  plugins: [react(), tailwindcss()],
  server: {
    port: 5000
  }
})

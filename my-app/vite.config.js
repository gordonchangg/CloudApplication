import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Ensure Vite listens on all network interfaces
    port: 5174,        // Make sure this matches the port you're trying to use
  },
})
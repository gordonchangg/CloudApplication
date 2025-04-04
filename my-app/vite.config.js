import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // Set to 5173 if you're still running Vite locally for testing
    host: '0.0.0.0', // Make sure Vite listens on all available network interfaces
  },
  build: {
    outDir: './build',  // Specifies the directory for the build files
    assetsDir: './',    // Ensures assets are in the root of the build directory
  },
  base: './',  // Ensures assets are loaded relative to the current path
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
    open: true,
    historyApiFallback: true,
  },
  preview: {
    port: 4173,
    historyApiFallback: true,  // <-- AGREGAR ESTO TAMBIÉN
  }
})


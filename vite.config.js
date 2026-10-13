import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Update 'base' with your GitHub repo name for GitHub Pages deployment
// Example: if repo is at github.com/arnavband321/portfolio, set base: '/portfolio/'
// For root domain (arnavband321.github.io), keep base: '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'motion';
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'vendor';
        },
      },
    },
  },
})

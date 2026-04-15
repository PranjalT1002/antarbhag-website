import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  server: {
    hmr: {
      overlay: false
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        getInvolved: resolve(__dirname, 'get-involved.html'),
        initiatives: resolve(__dirname, 'initiatives.html'),
        ngoCouncil: resolve(__dirname, 'ngo-council.html'),
        services: resolve(__dirname, 'services.html'),
        thematicAreas: resolve(__dirname, 'thematic-areas.html'),
      }
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from 'vite-jsconfig-paths'
import autoprefixer from 'autoprefixer'
// import path from 'path'
// import dns from 'dns'

// dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react(), jsconfigPaths()],
  build: {
    outDir: './build'
  },
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src')
  //   },
  // },
  // server: {
  //   host: 'localhost',
  //   port: 8000
  // },
  css: {
    preprocessorOptions: {
      scss: {
        // added to every scss file
        additionalData: `@import "./src/assets/sass/variables"; @import "./src/assets/sass/mixins"; `
      }
    },
    postcss: {
      plugins: [autoprefixer]
    }
  },
  optimizeDeps: {
    exclude: [
      'firebase',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      'firebase/analytics',
      'firebase/storage',
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/viteSetup.js',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
  }
})

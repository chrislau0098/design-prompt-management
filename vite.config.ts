import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // dialkit styles.css is not in the standard export conditions used by rolldown.
      // Map the dialkit CSS import to a direct file-system path.
      'dialkit/styles.css': path.resolve(__dirname, './node_modules/dialkit/dist/styles.css'),
    },
  },
  optimizeDeps: {
    include: ['dialkit'],
  },
  css: {
    // base-ui uses --spacing() CSS function which lightningcss doesn't support yet
    // disable minification for CSS to avoid build errors
    transformer: 'postcss',
  },
  build: {
    cssMinify: false,
  },
})

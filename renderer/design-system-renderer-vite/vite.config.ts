import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
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

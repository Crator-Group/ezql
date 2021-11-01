import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? './' : '.',
  build: {
    outDir: path.join(__dirname, 'build'),
  },
  plugins: [svelte()]
})

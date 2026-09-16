import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The site is a GitHub Pages project site, so in production it lives under
// /portfolio/. The deploy workflow sets BASE_PATH; local dev and preview stay
// at / so nothing here needs changing to run locally. The router reads the
// same value back through import.meta.env.BASE_URL, so base is set once.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
})

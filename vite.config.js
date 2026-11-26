import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Support both Vercel (root /) and GitHub Pages (/noteshare/ or relative ./)
export default defineConfig({
  base: process.env.VERCEL ? '/' : './',
  plugins: [
    react(),
    tailwindcss(),
  ],
})

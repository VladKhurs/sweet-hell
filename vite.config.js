import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/sweet-hell/",
  plugins: [
    react(),
    tailwindcss(),
  ],
})

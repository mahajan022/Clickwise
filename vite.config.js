import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://clicksnads.com',
      dynamicRoutes: ['/about', '/services', '/work', '/contact'],
      changefreq: 'weekly',
      priority: 0.8,
    }),
  ],
})
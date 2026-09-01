// genai-kids/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/claude': {
        target: 'https://api.anthropic.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/claude/, ''),
        headers: {
          'anthropic-version': '2023-06-01',
          'x-api-key': 'sk-ant-********************', // ← येथे तुझी real Anthropic API key टाक
          'anthropic-dangerous-direct-browser-access': 'true',
        }
      }
    }
  }
})
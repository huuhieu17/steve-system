import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      remotes: {
        ComputerControlMicroApp: 'https://cc.imsteve.dev/assets/remoteEntry.js',
        vue_app: 'http://localhost:3002/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom']  
    }),
  ],
  resolve: {
    alias: {
      // This should match the path in your tsconfig.json's paths.
      // __dirname typically points to the directory where vite.config.ts is.
      '@': path.resolve(__dirname, './src'),
    },
  },
})

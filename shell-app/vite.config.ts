import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      remotes: {
        ComputerControlMicroApp: 'http://localhost:4173/assets/remoteEntry.js',
        vue_app: 'http://localhost:3002/assets/remoteEntry.js',
        MovieApp: 'http://localhost:4173/assets/remoteEntry.js',
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
  build: {
    target: 'esnext' // or 'es2022'
  },
})

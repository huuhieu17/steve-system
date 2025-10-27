import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite';
import path from 'path'
export default defineConfig({
  plugins: [
    react(),
    federation  ({
      name: 'computer_control_app',
      filename: 'remoteEntry.js',
      exposes: {
        './ComputerControlMicroApp': './src/App.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5174
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
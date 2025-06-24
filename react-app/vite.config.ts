import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [
    react(),
    federation  ({
      name: 'react_app',
      filename: 'remoteEntry.js',
      exposes: {
        './ReactPage': './src/ReactPage.tsx',
      },
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
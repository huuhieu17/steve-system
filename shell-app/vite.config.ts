import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
export default defineConfig(({}) => {

  const API_URL = `${process.env.VITE_CONSOLE_API_URL ?? 'http://localhost:4173'}`
  return {
    server: {
      proxy: {
        '/console/api': {
          target: API_URL,
          changeOrigin: true,
          rewrite: (path) => {
            console.log('Proxying request to:', API_URL + path);
            return path.replace(/^\/console/, '')
          },
        },
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      federation({
        remotes: {
          ComputerControlMicroApp: 'https://cc.imsteve.dev/assets/remoteEntry.js',
          vue_app: 'http://localhost:3002/assets/remoteEntry.js',
          MovieApp: 'https://movie.imsteve.dev/assets/remoteEntry.js',
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
  }
}
)

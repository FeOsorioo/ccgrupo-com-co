import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      target: 'esnext',
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules/three')) return 'vendor-three';
            if (id.includes('node_modules/gsap') || id.includes('node_modules/@gsap')) return 'vendor-gsap';
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) return 'vendor-motion';
            if (id.includes('node_modules/lucide-react')) return 'vendor-lucide';
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/scheduler')) return 'vendor-react';
            if (id.includes('node_modules/lenis')) return 'vendor-lenis';
          },
        },
      },
    },
  };
});

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const isProd = mode === 'production';
  
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
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'motion/react',
        'lucide-react',
        'clsx',
        'tailwind-merge',
      ],
      exclude: ['three', 'ogl', 'gsap', '@gsap/react'],
    },
    esbuild: {
      legalComments: 'none',
      drop: isProd ? ['console', 'debugger'] : [],
    },
    build: {
      target: 'es2020',
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1500,
      assetsInlineLimit: 2048,
      cssCodeSplit: true,
      cssMinify: 'esbuild',
      minify: 'esbuild',
      sourcemap: false,
      terserOptions: isProd ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
          dead_code: true,
        },
      } : undefined,
      modulePreload: { polyfill: false },
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks: (id) => {
            if (!id.includes('node_modules')) return;
            if (id.includes('/three/')) return 'vendor-three';
            if (id.includes('/ogl/')) return 'vendor-ogl';
            if (id.includes('/gsap') || id.includes('/@gsap/')) return 'vendor-gsap';
            if (id.includes('/motion') || id.includes('/framer-motion')) return 'vendor-motion';
            if (id.includes('/lucide-react')) return 'vendor-lucide';
            if (id.includes('/@emailjs/')) return 'vendor-emailjs';
            if (id.includes('/react-dom') || id.includes('/scheduler')) return 'vendor-react-dom';
            if (id.includes('/react/')) return 'vendor-react';
          },
        },
      },
    },
  };
});

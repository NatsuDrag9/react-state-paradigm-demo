import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { analyzer } from 'vite-bundle-analyzer';

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [react(), analyzer()],
  base: '/react-state-paradigm-demo/',
  resolve: {
    alias: {
      '@services': '/src/services',
      '@assets': '/src/assets',
      '@store': '/src/store',
      '@components': '/src/components',
      '@modules': '/src/modules',
      '@hooks': '/src/hooks',
      '@layouts': '/src/layouts',
      '@pages': '/src/pages',
      '@mocks': '/src/mocks',
      '@stories': '/src/stories',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
      '@definitions': '/src/definitions',
      '@constants': '/src/constants',
      '@config': '/src/config',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'sass:color';@use "@styles/index" as *;`,
      },
    },
  },
});

export default viteConfig;

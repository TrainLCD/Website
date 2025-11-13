import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['app/**/__tests__/**/*.{test,spec}.{ts,tsx,js,jsx}'],
    pool: 'threads',
    watch: false,
  },
});

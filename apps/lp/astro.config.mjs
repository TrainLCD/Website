import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  output: 'static',
  srcDir: './src',
  integrations: [
    preact({
      compat: true,
    }),
  ],
});
